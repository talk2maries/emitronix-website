import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { resolveConversionEvent, ConversionEventConfigError } from "@/config/google-zoho-conversions";
import {
  IdempotencyConflictError,
  openGoogleZohoDatabase,
  type GoogleZohoDatabase,
} from "@/lib/googleZoho/database";
import { webhookEnvironment } from "@/lib/googleZoho/env";
import { validateConversionTimestamp } from "@/lib/googleZoho/googleDataManager";
import {
  canonicalLeadTransactionId,
  canonicalLeadLinkMatches,
  conversionRequestHash,
  requestHash,
  safeErrorMessage,
  verifyWebhookSignature,
  WebhookAuthenticationError,
} from "@/lib/googleZoho/security";
import { fetchZohoConversionRecord, ZohoApiError } from "@/lib/googleZoho/zohoClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_000;
const REPLAY_TTL_MS = 24 * 60 * 60_000;
const webhookSchema = z.object({
  module: z.enum(["Leads", "Deals"]).default("Leads"),
  recordId: z.string().regex(/^\d{6,30}$/),
  eventKey: z.enum(["qualified_lead", "meeting_booked", "quotation_submitted", "deal_won"]),
  occurredAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?\+04:00$/),
});
const excludedLeadStatuses = new Set(["junk", "spam", "unqualified", "invalid", "test"]);

let database: GoogleZohoDatabase | null = null;

function integrationDatabase() {
  if (!database) database = openGoogleZohoDatabase();
  return database;
}

function response(message: string, status: number, details: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: status >= 200 && status < 300, message, ...details }, { status });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return response("Webhook payload is too large.", 413);
  if (request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") {
    return response("Webhook content type must be application/json.", 415);
  }
  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) return response("Webhook payload is too large.", 413);
  const timestamp = request.headers.get("x-emitronix-timestamp") || "";
  const nonce = request.headers.get("x-emitronix-nonce") || "";
  const signature = request.headers.get("x-emitronix-signature") || "";

  try {
    const { secret } = webhookEnvironment();
    verifyWebhookSignature({ secret, timestamp, nonce, signature, rawBody });
  } catch (error) {
    const status = error instanceof WebhookAuthenticationError ? 401 : 503;
    console.warn("Zoho conversion webhook authentication failed", { error: safeErrorMessage(error) });
    return response(status === 401 ? "Webhook authentication failed." : "Webhook integration is not configured.", status);
  }

  const db = integrationDatabase();
  let parsedBody: z.infer<typeof webhookSchema>;
  try {
    parsedBody = webhookSchema.parse(JSON.parse(rawBody) as unknown);
  } catch {
    db.appendAuditEvent({ eventType: "zoho_webhook_invalid", outcome: "failure", details: { reason: "invalid_schema" } });
    return response("Webhook payload is invalid.", 400);
  }
  const bodyHash = requestHash(rawBody);
  try {
    const receipt = db.consumeWebhookNonce({ nonce, requestHash: bodyHash, ttlMs: REPLAY_TTL_MS });
    if (!receipt.accepted && !receipt.requestHashMatches) {
      db.appendAuditEvent({
        eventType: "zoho_webhook_replay",
        outcome: "ignored",
        entityType: "webhook_nonce",
        entityId: nonce,
        details: { request_hash_matches: receipt.requestHashMatches },
      });
      return response("Webhook nonce was reused with a different payload.", 409);
    }
    if (!receipt.accepted) {
      const priorJob = db.getConversionJobForEvent(parsedBody.recordId, parsedBody.eventKey);
      db.appendAuditEvent({
        eventType: "zoho_webhook_idempotent_retry",
        outcome: "info",
        entityType: "webhook_nonce",
        entityId: nonce,
        details: { request_hash_matches: true, prior_job_found: Boolean(priorJob) },
      });
      if (priorJob) {
        return response("Webhook was already accepted.", 202, {
          jobId: priorJob.id,
          status: priorJob.status,
          duplicate: true,
        });
      }
    }
  } catch (error) {
    console.error("Webhook replay store failed", { error: safeErrorMessage(error) });
    return response("Webhook could not be accepted safely.", 503);
  }

  try {
    if (
      (parsedBody.eventKey === "deal_won" && parsedBody.module !== "Deals") ||
      (parsedBody.eventKey !== "deal_won" && parsedBody.module !== "Leads")
    ) {
      return response("Webhook module does not match the conversion event.", 400);
    }
    const record = await fetchZohoConversionRecord(parsedBody.module, parsedBody.recordId, parsedBody.eventKey, {
      eventOccurredAt: parsedBody.occurredAt,
    });
    const campaignId = record.campaignId && /^[A-Za-z0-9._:-]{8,128}$/.test(record.campaignId) ? record.campaignId : undefined;
    const leadStatus = record.leadStatus?.trim().toLowerCase();
    if (leadStatus && excludedLeadStatuses.has(leadStatus)) {
      db.appendAuditEvent({
        eventType: "conversion_ineligible",
        outcome: "ignored",
        entityType: "zoho_record",
        entityId: parsedBody.recordId,
        campaignId,
        details: { reason: "excluded_lead_status", event_key: parsedBody.eventKey },
      });
      return response("Junk, spam, test, or unqualified records are not eligible for upload.", 422);
    }
    if (!record.clickId) {
      db.appendAuditEvent({
        eventType: "conversion_missing_click_id",
        outcome: "ignored",
        entityType: "zoho_record",
        entityId: parsedBody.recordId,
        campaignId,
        details: { event_key: parsedBody.eventKey },
      });
      return response("The CRM record has no supported Google click identifier.", 422);
    }
    if (!record.adUserDataConsent) {
      db.appendAuditEvent({
        eventType: "conversion_missing_consent",
        outcome: "ignored",
        entityType: "zoho_record",
        entityId: parsedBody.recordId,
        campaignId,
        details: { event_key: parsedBody.eventKey },
      });
      return response("The CRM record has no eligible advertising consent evidence.", 422);
    }
    const sourceSubmission = record.sourceSubmissionId
      ? db.getLeadSubmission(record.sourceSubmissionId)
      : null;
    if (
      !sourceSubmission ||
      sourceSubmission.status !== "completed" ||
      !canonicalLeadLinkMatches({
        module: parsedBody.module,
        zohoRecordId: parsedBody.recordId,
        zohoLeadId: record.sourceSubmissionId,
        sourceLeadId: sourceSubmission.id,
        sourceZohoRecordId: sourceSubmission.zohoRecordId,
      }) ||
      sourceSubmission.source !== "google_ads" ||
      !sourceSubmission.advertisingConsent ||
      !sourceSubmission.clickIdPresent ||
      !sourceSubmission.attributionHash ||
      !sourceSubmission.attributionExpiresAt ||
      sourceSubmission.attributionExpiresAt <= Date.now()
    ) {
      db.appendAuditEvent({
        eventType: "conversion_missing_consent_ledger",
        outcome: "ignored",
        entityType: "zoho_record",
        entityId: parsedBody.recordId,
        campaignId,
        details: { event_key: parsedBody.eventKey },
      });
      return response("No current, immutable website attribution and consent evidence is linked to this CRM record.", 422);
    }

    const resolved = resolveConversionEvent(parsedBody.eventKey, record);
    const eventTimestamp = validateConversionTimestamp(parsedBody.occurredAt);
    if (Math.abs(Date.parse(record.eventTimestamp) - Date.parse(eventTimestamp)) > 5 * 60_000) {
      return response("CRM milestone timestamp does not match the signed webhook timestamp.", 409);
    }
    // Existing jobs keep their original transaction ID forever. In particular,
    // schema-v4 jobs may already have been accepted by Google under the legacy
    // Zoho-derived ID; recomputing their request hash would create a false conflict
    // and could encourage an unsafe replay under a new ID.
    const existingJob = db.getConversionJobForEvent(parsedBody.recordId, parsedBody.eventKey);
    const transactionId = existingJob?.transactionId || canonicalLeadTransactionId(sourceSubmission.id);
    const payloadHash = conversionRequestHash({
      recordId: parsedBody.recordId,
      eventKey: parsedBody.eventKey,
      transactionId,
      conversionAction: resolved.conversionActionId,
      conversionValue: resolved.value,
      eventTimestamp,
      clickType: record.clickId.type,
      clickValue: record.clickId.value,
    });
    const job = db.getOrCreateConversionJob({
      zohoRecordId: parsedBody.recordId,
      sourceSubmissionId: sourceSubmission.id,
      eventKey: parsedBody.eventKey,
      transactionId,
      conversionAction: resolved.conversionActionId,
      conversionValue: resolved.value,
      currencyCode: resolved.currency,
      conversionOccurredAt: new Date(eventTimestamp),
      requestHash: payloadHash,
      campaignId,
      clickIdType: record.clickId.type,
    });
    db.appendAuditEvent({
      eventType: job.created ? "conversion_queued" : "conversion_duplicate_prevented",
      outcome: job.created ? "success" : "ignored",
      entityType: "conversion_job",
      entityId: job.job.id,
      campaignId,
      details: { event_key: parsedBody.eventKey, status: job.job.status, payload_matches: job.payloadMatches },
    });
    if (!job.created && !job.payloadMatches) {
      return response("A conversion already exists with different immutable attribution or milestone data.", 409, {
        jobId: job.job.id,
        status: job.job.status,
        duplicate: true,
      });
    }
    return response(job.created ? "Conversion queued." : "Conversion was already queued.", 202, {
      jobId: job.job.id,
      status: job.job.status,
      duplicate: !job.created,
    });
  } catch (error) {
    const isPermanent =
      error instanceof ConversionEventConfigError ||
      error instanceof IdempotencyConflictError ||
      (error instanceof ZohoApiError && error.retryable !== true) ||
      (error instanceof Error && error.name === "GoogleDataManagerError");
    const errorCode =
      error instanceof ConversionEventConfigError
        ? "EVENT_NOT_ELIGIBLE"
        : error instanceof IdempotencyConflictError
          ? "CANONICAL_LEAD_ID_CONFLICT"
          : error instanceof ZohoApiError
            ? error.code || "ZOHO_READ_ERROR"
            : "WEBHOOK_PROCESSING_ERROR";
    db.appendAuditEvent({
      eventType: "conversion_queue_failed",
      outcome: "failure",
      entityType: "zoho_record",
      entityId: parsedBody.recordId,
      details: { error_code: errorCode, retryable: !isPermanent, event_key: parsedBody.eventKey },
    });
    console.error("Zoho conversion webhook processing failed", {
      zohoRecordId: parsedBody.recordId,
      errorCode,
      error: safeErrorMessage(error),
    });
    return response(isPermanent ? "The CRM record is not eligible for this conversion." : "Conversion queueing failed temporarily.", isPermanent ? 422 : 503);
  }
}
