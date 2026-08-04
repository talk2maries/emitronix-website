import { openGoogleZohoDatabase } from "../lib/googleZoho/database";
import { ConversionEventConfigError, resolveConversionEvent } from "../config/google-zoho-conversions";
import {
  classifyDataManagerDiagnostics,
  GoogleDataManagerError,
  retrieveDataManagerDiagnostics,
  uploadDataManagerConversion,
} from "../lib/googleZoho/googleDataManager";
import { canonicalLeadLinkMatches, conversionRequestHash, safeErrorMessage } from "../lib/googleZoho/security";
import {
  fetchZohoConversionRecord,
  writeZohoConversionResult,
  ZohoApiError,
} from "../lib/googleZoho/zohoClient";
import type { ConversionEventKey } from "../lib/googleZoho/types";

const validEventKeys = new Set<ConversionEventKey>([
  "qualified_lead",
  "meeting_booked",
  "quotation_submitted",
  "deal_won",
]);

function integerFlag(name: string, fallback: number) {
  const index = process.argv.indexOf(name);
  if (index < 0) return fallback;
  const value = Number(process.argv[index + 1]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function retryDelay(attempt: number, providerDelay?: number) {
  if (providerDelay !== undefined) return Math.min(providerDelay, 6 * 60 * 60_000);
  const base = Math.min(6 * 60 * 60_000, 60_000 * 2 ** Math.max(0, attempt - 1));
  return base + Math.floor(Math.random() * Math.min(30_000, base * 0.2));
}

async function writeResultSafely(
  record: Awaited<ReturnType<typeof fetchZohoConversionRecord>>,
  result: Parameters<typeof writeZohoConversionResult>[1],
) {
  try {
    return await writeZohoConversionResult(record, result);
  } catch (error) {
    return { updated: false, reason: safeErrorMessage(error) };
  }
}

async function writeResultRequired(
  record: Awaited<ReturnType<typeof fetchZohoConversionRecord>>,
  result: Parameters<typeof writeZohoConversionResult>[1],
) {
  const update = await writeZohoConversionResult(record, result);
  if (!update.updated) {
    throw new ZohoApiError(update.reason || "Zoho conversion result fields are not configured.", 409, "WRITEBACK_NOT_CONFIGURED");
  }
  return update;
}

async function processDueJobs() {
  const database = openGoogleZohoDatabase();
  const limit = Math.min(integerFlag("--limit", 20), 100);
  const jobs = database.leaseDueConversionJobs({ limit });
  const summary = { leased: jobs.length, sent: 0, dryRun: 0, retried: 0, failed: 0 };

  try {
    for (const job of jobs) {
      const leaseToken = job.leaseToken!;
      let record: Awaited<ReturnType<typeof fetchZohoConversionRecord>> | null = null;
      try {
        if (!validEventKeys.has(job.eventKey as ConversionEventKey)) {
          throw new GoogleDataManagerError("Unsupported conversion event in queue.", { code: "INVALID_EVENT_KEY" });
        }
        const module = job.eventKey === "deal_won" ? "Deals" : "Leads";
        const eventTimestamp = new Date(job.conversionOccurredAt).toISOString();
        record = await fetchZohoConversionRecord(module, job.zohoRecordId, job.eventKey as ConversionEventKey, {
          eventOccurredAt: eventTimestamp,
        });
        const sourceSubmission = job.sourceSubmissionId
          ? database.getLeadSubmission(job.sourceSubmissionId)
          : null;
        if (
          !sourceSubmission ||
          sourceSubmission.status !== "completed" ||
          !canonicalLeadLinkMatches({
            module,
            zohoRecordId: job.zohoRecordId,
            zohoLeadId: record.sourceSubmissionId,
            sourceLeadId: sourceSubmission.id,
            sourceZohoRecordId: sourceSubmission.zohoRecordId,
            identityVersion: job.identityVersion,
            transactionId: job.transactionId,
          }) ||
          sourceSubmission.source !== "google_ads" ||
          !sourceSubmission.advertisingConsent ||
          !sourceSubmission.clickIdPresent ||
          !sourceSubmission.attributionHash ||
          !sourceSubmission.attributionExpiresAt ||
          sourceSubmission.attributionExpiresAt <= Date.now()
        ) {
          throw new GoogleDataManagerError("Current immutable attribution and consent evidence is missing.", {
            code: "CONSENT_LEDGER_MISSING",
          });
        }
        const status = record.leadStatus?.toLowerCase();
        if (status && ["junk", "spam", "unqualified", "invalid", "test"].includes(status)) {
          throw new GoogleDataManagerError("Zoho record became ineligible before upload.", { code: "INELIGIBLE_STATUS" });
        }
        if (!record.clickId || record.clickId.type !== job.clickIdType) {
          throw new GoogleDataManagerError("The authoritative CRM click identifier is missing or changed.", {
            code: "CLICK_ID_MISMATCH",
          });
        }
        if (!record.adUserDataConsent) {
          throw new GoogleDataManagerError("Advertising consent evidence is missing.", { code: "CONSENT_MISSING" });
        }
        const currentMapping = resolveConversionEvent(job.eventKey, record);
        if (
          currentMapping.conversionActionId !== job.conversionAction ||
          currentMapping.currency !== job.currencyCode ||
          currentMapping.value !== job.conversionValue
        ) {
          throw new GoogleDataManagerError("The approved conversion mapping changed after this job was queued.", {
            code: "CONVERSION_MAPPING_CHANGED",
          });
        }
        const currentRequestHash = conversionRequestHash({
          recordId: job.zohoRecordId,
          eventKey: job.eventKey,
          transactionId: job.transactionId,
          conversionAction: job.conversionAction,
          conversionValue: job.conversionValue,
          eventTimestamp,
          clickType: record.clickId.type,
          clickValue: record.clickId.value,
        });
        if (currentRequestHash !== job.requestHash) {
          throw new GoogleDataManagerError("The authoritative CRM click identifier changed after queueing.", {
            code: "CLICK_ID_MISMATCH",
          });
        }
        const upload = await uploadDataManagerConversion({
          conversionActionId: job.conversionAction,
          transactionId: job.transactionId,
          eventTimestamp,
          conversionValue: job.conversionValue,
          currency: "AED",
          clickId: record.clickId,
          consentGranted: true,
          email: record.email,
          phone: record.phone,
        });

        if (upload.status === "dry_run") {
          database.markConversionJobDryRun({
            id: job.id,
            leaseToken,
            requestSummary: JSON.stringify(upload.request).slice(0, 450),
          });
          database.appendAuditEvent({
            eventType: "conversion_dry_run",
            outcome: "success",
            entityType: "conversion_job",
            entityId: job.id,
            campaignId: job.campaignId || undefined,
            details: { event_key: job.eventKey },
          });
          const crmUpdate = await writeResultSafely(record, {
            uploaded: false,
            action: job.eventKey,
            value: job.conversionValue,
            status: "dry_run",
            transactionId: job.transactionId,
          });
          if (!crmUpdate.updated) {
            database.appendAuditEvent({
              eventType: "zoho_conversion_writeback",
              outcome: "warning",
              entityType: "conversion_job",
              entityId: job.id,
              details: { reason: crmUpdate.reason || "not_updated" },
            });
          }
          summary.dryRun += 1;
          continue;
        }
        if (upload.status === "validated") {
          throw new GoogleDataManagerError("A worker upload unexpectedly ran in validate-only mode.", {
            code: "UNEXPECTED_VALIDATE_ONLY",
          });
        }

        database.markConversionJobSent({ id: job.id, leaseToken, googleRequestId: upload.requestId });
        database.appendAuditEvent({
          eventType: "conversion_sent",
          outcome: "success",
          entityType: "conversion_job",
          entityId: job.id,
          campaignId: job.campaignId || undefined,
          details: { event_key: job.eventKey, warning_count: upload.fieldWarnings.length },
        });
        const crmUpdate = await writeResultSafely(record, {
          uploaded: false,
          action: job.eventKey,
          value: job.conversionValue,
          status: "sent",
          transactionId: job.transactionId,
          requestId: upload.requestId,
        });
        if (!crmUpdate.updated) {
          database.appendAuditEvent({
            eventType: "zoho_conversion_writeback",
            outcome: "warning",
            entityType: "conversion_job",
            entityId: job.id,
            details: { reason: crmUpdate.reason || "not_updated" },
          });
        }
        summary.sent += 1;
      } catch (error) {
        const providerRetryable =
          (error instanceof GoogleDataManagerError && error.retryable) ||
          (error instanceof ZohoApiError && error.retryable);
        const retryable = providerRetryable && job.attemptCount < 5;
        const errorCode =
          error instanceof GoogleDataManagerError
            ? error.code || "GOOGLE_DATA_MANAGER_ERROR"
            : error instanceof ZohoApiError
              ? error.code || "ZOHO_API_ERROR"
              : error instanceof ConversionEventConfigError
                ? "EVENT_NOT_ELIGIBLE"
                : "CONVERSION_WORKER_ERROR";
        const errorMessage = safeErrorMessage(error);
        if (retryable) {
          database.markConversionJobRetry({
            id: job.id,
            leaseToken,
            nextAttemptAt: Date.now() + retryDelay(job.attemptCount, error instanceof GoogleDataManagerError ? error.retryAfterMs : undefined),
            errorCode,
            errorMessage,
          });
          summary.retried += 1;
        } else {
          database.markConversionJobPermanentFailure({
            id: job.id,
            leaseToken,
            errorCode,
            errorMessage,
          });
          summary.failed += 1;
        }
        database.appendAuditEvent({
          eventType: retryable ? "conversion_retry_scheduled" : "conversion_upload_failed",
          outcome: retryable ? "warning" : "failure",
          entityType: "conversion_job",
          entityId: job.id,
          campaignId: job.campaignId || undefined,
          details: { error_code: errorCode, event_key: job.eventKey, attempt: job.attemptCount },
        });
        if (record) {
          const crmUpdate = await writeResultSafely(record, {
            uploaded: false,
            action: job.eventKey,
            value: job.conversionValue,
            status: retryable ? "retry_scheduled" : "permanent_failure",
            error: errorMessage,
            transactionId: job.transactionId,
          });
          if (!crmUpdate.updated) {
            database.appendAuditEvent({
              eventType: "zoho_conversion_writeback",
              outcome: "warning",
              entityType: "conversion_job",
              entityId: job.id,
              details: { reason: crmUpdate.reason || "not_updated" },
            });
          }
        }
      }
    }
  } finally {
    database.close();
  }
  return summary;
}

async function processDiagnostics() {
  const database = openGoogleZohoDatabase();
  const limit = Math.min(integerFlag("--limit", 100), 500);
  const minimumAge = Date.now() - 30 * 60_000;
  const jobs = database
    .listConversionJobs({ status: "sent", limit })
    .filter((job) => job.sentAt && job.sentAt <= minimumAge && job.googleRequestId);
  const summary = { checked: 0, processing: 0, confirmed: 0, retried: 0, failed: 0, errors: 0 };
  try {
    for (const job of jobs) {
      summary.checked += 1;
      try {
        const diagnostic = await retrieveDataManagerDiagnostics(job.googleRequestId!);
        const diagnosticOutcome = classifyDataManagerDiagnostics(diagnostic);
        if (diagnosticOutcome === "processing") {
          summary.processing += 1;
          continue;
        }
        const module = job.eventKey === "deal_won" ? "Deals" : "Leads";
        const record = await fetchZohoConversionRecord(module, job.zohoRecordId, job.eventKey as ConversionEventKey, {
          eventOccurredAt: new Date(job.conversionOccurredAt).toISOString(),
        });
        if (diagnosticOutcome === "confirmed") {
          await writeResultRequired(record, {
            uploaded: true,
            uploadedAt: new Date().toISOString(),
            action: job.eventKey,
            value: job.conversionValue,
            status: diagnostic.errorReasons.some((entry) => entry.reason.includes("DUPLICATE_TRANSACTION_ID"))
              ? "confirmed_duplicate_transaction"
              : diagnostic.warnings.length
                ? "confirmed_with_warnings"
                : "confirmed",
            error: diagnostic.warnings.join(", "),
            transactionId: job.transactionId,
            requestId: job.googleRequestId!,
          });
          database.markConversionJobConfirmed({ id: job.id, googleRequestId: job.googleRequestId! });
          summary.confirmed += 1;
        } else if (diagnosticOutcome === "retryable_failure" && job.attemptCount < 5) {
          const errorMessage = diagnostic.errors.join(", ") || diagnostic.status;
          database.markSentConversionJobRetry({
            id: job.id,
            nextAttemptAt: Date.now() + retryDelay(job.attemptCount),
            errorCode: "DATA_MANAGER_TRANSIENT_PROCESSING_FAILURE",
            errorMessage,
          });
          await writeResultSafely(record, {
            uploaded: false,
            action: job.eventKey,
            value: job.conversionValue,
            status: "retry_scheduled",
            error: errorMessage,
            transactionId: job.transactionId,
            requestId: job.googleRequestId!,
          });
          summary.retried += 1;
        } else {
          const errorMessage = diagnostic.errors.join(", ") || diagnostic.status;
          await writeResultRequired(record, {
            uploaded: false,
            action: job.eventKey,
            value: job.conversionValue,
            status: "permanent_failure",
            error: errorMessage,
            transactionId: job.transactionId,
            requestId: job.googleRequestId!,
          });
          database.markSentConversionJobPermanentFailure({
            id: job.id,
            errorCode: "DATA_MANAGER_PROCESSING_FAILED",
            errorMessage,
          });
          summary.failed += 1;
        }
      } catch (error) {
        database.appendAuditEvent({
          eventType: "conversion_diagnostics_failed",
          outcome: "warning",
          entityType: "conversion_job",
          entityId: job.id,
          details: { error: safeErrorMessage(error) },
        });
        summary.errors += 1;
      }
    }
  } finally {
    database.close();
  }
  return summary;
}

const diagnostics = process.argv.includes("--diagnostics");
const result = diagnostics ? await processDiagnostics() : await processDueJobs();
process.stdout.write(`${JSON.stringify({ ok: true, mode: diagnostics ? "diagnostics" : "worker", ...result }, null, 2)}\n`);
