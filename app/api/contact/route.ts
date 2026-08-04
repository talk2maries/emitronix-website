import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sanitizeAttributionSnapshot, isGoogleAdsAttribution, selectClickId } from "@/lib/googleZoho/attribution";
import { openGoogleZohoDatabase, type GoogleZohoDatabase } from "@/lib/googleZoho/database";
import { IntegrationConfigError } from "@/lib/googleZoho/env";
import { safeErrorMessage } from "@/lib/googleZoho/security";
import { parseStoredConsentForRuntime } from "@/lib/cookieConsentRuntime";
import { getCookieConsentConfig } from "@/lib/cookieConsentStore";
import {
  syncZohoWebsiteLead,
  ZohoApiError,
  ZohoConfigError,
  type WebsiteLead,
} from "@/lib/googleZoho/zohoClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_BYTES = 16_000;

let database: GoogleZohoDatabase | null = null;

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");
const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: optionalText(180),
  email: z.string().trim().toLowerCase().email().max(180),
  phone: z.string().trim().min(6).max(30),
  service: z.string().trim().min(1).max(120),
  projectLocation: z.string().trim().min(1).max(180),
  message: z.string().trim().min(1).max(3000),
  formName: z.enum(["contact_form", "blog_enquiry_form"]).optional().default("contact_form"),
  pageUrl: optionalText(1200),
  website: optionalText(120),
  consent: z.boolean(),
  attribution: z.unknown().optional(),
  adUserDataConsent: z.boolean().optional().default(false),
  consentVersion: optionalText(80),
  consentUpdatedAt: optionalText(60),
  submissionId: z.union([z.string().trim().uuid(), z.literal("")]).optional().default(""),
});

function integrationDatabase() {
  if (!database) database = openGoogleZohoDatabase();
  return database;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function clientIp(request: NextRequest) {
  const trustProxy = process.env.TRUST_PROXY === "true";
  if (trustProxy) {
    return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function allowedOrigins(request: NextRequest) {
  const origins = new Set(
    [process.env.NEXT_PUBLIC_SITE_URL || "https://emitronix.ae", ...(process.env.CONTACT_ALLOWED_ORIGINS || "").split(",")]
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => {
        try {
          return new URL(value).origin;
        } catch {
          return "";
        }
      })
      .filter(Boolean),
  );
  if (process.env.NODE_ENV !== "production") origins.add(request.nextUrl.origin);
  return origins;
}

function hasValidOrigin(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production" || process.env.CONTACT_ALLOW_MISSING_ORIGIN === "true";
  return allowedOrigins(request).has(origin);
}

function safePageUrl(value: string, request: NextRequest) {
  const candidate = value || request.headers.get("referer") || "";
  if (!candidate) return `${request.nextUrl.origin}${request.nextUrl.pathname}`;
  try {
    const url = new URL(candidate);
    if (!allowedOrigins(request).has(url.origin)) return `${request.nextUrl.origin}${request.nextUrl.pathname}`;
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return `${request.nextUrl.origin}${request.nextUrl.pathname}`;
  }
}

function advertisingConsentCookie(request: NextRequest, runtimeVersion: number) {
  const raw = request.cookies.get("emitronix_cookie_consent")?.value;
  if (!raw) return { allowed: false };
  try {
    const decoded = raw.startsWith("%7B") ? decodeURIComponent(raw) : raw;
    const value = parseStoredConsentForRuntime(decoded, runtimeVersion);
    if (!value) return { allowed: false };
    return {
      allowed: value.categories.marketing === true,
      version: String(value.version),
      updatedAt: value.updatedAt,
    };
  } catch {
    return { allowed: false };
  }
}

function attributionUsesAllowedOrigins(
  attribution: ReturnType<typeof sanitizeAttributionSnapshot>,
  request: NextRequest,
) {
  if (!attribution) return false;
  const origins = allowedOrigins(request);
  try {
    return origins.has(new URL(attribution.firstTouch.landingPageUrl).origin) && origins.has(new URL(attribution.latestTouch.landingPageUrl).origin);
  } catch {
    return false;
  }
}

async function readPayload(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) throw new Response("too_large", { status: 413 });
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json" && contentType !== "application/x-www-form-urlencoded") {
    throw new Response("invalid_content_type", { status: 415 });
  }
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) throw new Response("too_large", { status: 413 });
  let input: Record<string, unknown>;
  if (contentType === "application/json") {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("INVALID_JSON");
    input = parsed as Record<string, unknown>;
  } else {
    input = Object.fromEntries(new URLSearchParams(raw));
    input.consent = input.consent === "on" || input.consent === "true";
    input.adUserDataConsent = input.adUserDataConsent === "granted" || input.adUserDataConsent === "true";
    const attributionRaw = typeof input.attributionPayload === "string" ? input.attributionPayload : "";
    if (attributionRaw) input.attribution = JSON.parse(attributionRaw) as unknown;
    input.consentVersion = input.attributionConsentVersion;
    input.consentUpdatedAt = input.attributionConsentUpdatedAt;
    delete input.attributionPayload;
    delete input.attributionConsentVersion;
    delete input.attributionConsentUpdatedAt;
  }
  return input;
}

function badRequest(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) return badRequest("Cross-site submissions are not accepted.", 403);
  const ipKey = sha256(clientIp(request));
  let db: GoogleZohoDatabase;
  try {
    db = integrationDatabase();
    const rateLimit = db.consumeRateLimit({ key: `contact:${ipKey}`, windowMs: RATE_LIMIT_WINDOW_MS, limit: RATE_LIMIT_MAX });
    if (!rateLimit.allowed) return badRequest("Too many enquiries. Please try again in a few minutes.", 429);
  } catch (error) {
    console.error("Lead rate-limit store failed", { error: safeErrorMessage(error) });
    return badRequest("The enquiry form is temporarily unavailable. Please call or WhatsApp Emitronix.", 503);
  }

  let rawPayload: Record<string, unknown>;
  try {
    rawPayload = await readPayload(request);
  } catch (error) {
    if (error instanceof Response && error.status === 413) {
      return badRequest("The enquiry is too large. Please shorten the message and try again.", 413);
    }
    if (error instanceof Response && error.status === 415) return badRequest("Invalid enquiry format.", 415);
    return badRequest("Invalid enquiry format.");
  }

  if (typeof rawPayload.website === "string" && rawPayload.website.trim()) return NextResponse.json({ ok: true });
  const parsed = contactSchema.safeParse(rawPayload);
  if (!parsed.success) return badRequest("Please check the enquiry fields and try again.");
  if (!parsed.data.consent) return badRequest("Please confirm consent before submitting the enquiry.");

  const consentConfig = await getCookieConsentConfig().catch(() => null);
  const cookieConsent = consentConfig
    ? advertisingConsentCookie(request, consentConfig.version)
    : { allowed: false as const, version: undefined, updatedAt: undefined };
  const consentEvidenceMatches =
    (!parsed.data.consentVersion || parsed.data.consentVersion === cookieConsent.version) &&
    (!parsed.data.consentUpdatedAt || parsed.data.consentUpdatedAt === cookieConsent.updatedAt);
  const advertisingConsent = parsed.data.adUserDataConsent && cookieConsent.allowed && consentEvidenceMatches;
  const candidateAttribution = advertisingConsent ? sanitizeAttributionSnapshot(parsed.data.attribution) : null;
  const snapshotConsentMatches = Boolean(
    candidateAttribution &&
      (!candidateAttribution.consent.version || candidateAttribution.consent.version === cookieConsent.version) &&
      (!candidateAttribution.consent.updatedAt || candidateAttribution.consent.updatedAt === cookieConsent.updatedAt),
  );
  const attribution = snapshotConsentMatches && attributionUsesAllowedOrigins(candidateAttribution, request) ? candidateAttribution : null;
  const lead: WebsiteLead = {
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service,
    projectLocation: parsed.data.projectLocation,
    message: parsed.data.message,
    pageUrl: safePageUrl(parsed.data.pageUrl, request),
    userAgent: request.headers.get("user-agent")?.slice(0, 300),
    consent: true,
    kind: parsed.data.formName === "blog_enquiry_form" ? "blog" : "contact",
    attribution,
  };
  const tenMinuteBucket = Math.floor(Date.now() / (10 * 60_000));
  const canonical = JSON.stringify({
    name: lead.name,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    service: lead.service,
    projectLocation: lead.projectLocation,
    formName: parsed.data.formName,
    pageUrl: lead.pageUrl,
    attributionHash: attribution ? sha256(JSON.stringify(attribution)) : null,
    tenMinuteBucket,
  });
  const requestDigest = sha256(canonical);
  const idempotencyKey = parsed.data.submissionId ? `lead:${parsed.data.submissionId}` : `lead:${requestDigest}`;
  const campaignId = attribution?.latestTouch.campaignId;
  const safeCampaignId = campaignId && /^[A-Za-z0-9._:-]{8,128}$/.test(campaignId) ? campaignId : undefined;
  const selectedClickId = attribution
    ? selectClickId(attribution.latestTouch) || selectClickId(attribution.firstTouch)
    : null;
  const consentUpdatedAt = cookieConsent.updatedAt && Number.isFinite(Date.parse(cookieConsent.updatedAt))
    ? new Date(cookieConsent.updatedAt)
    : undefined;
  let claim;
  try {
    claim = db.claimLeadSubmission({
      idempotencyKey,
      requestHash: requestDigest,
      source: isGoogleAdsAttribution(attribution) ? "google_ads" : "website",
      campaignId: safeCampaignId,
      attributionHash: attribution ? sha256(JSON.stringify(attribution)) : undefined,
      attributionExpiresAt: attribution ? new Date(attribution.expiresAt) : undefined,
      advertisingConsent,
      consentVersion: cookieConsent.version,
      consentUpdatedAt,
      clickIdPresent: Boolean(selectedClickId),
    });
  } catch (error) {
    console.error("Lead idempotency store failed", { error: safeErrorMessage(error) });
    return badRequest("The enquiry form is temporarily unavailable. Please call or WhatsApp Emitronix.", 503);
  }
  if (claim.outcome === "completed") {
    return NextResponse.json({
      ok: true,
      eventId: claim.submission.id,
      leadId: claim.submission.id,
      submissionId: parsed.data.submissionId || claim.submission.id,
      duplicate: true,
      replayed: true,
    });
  }
  if (claim.outcome === "in_progress") {
    return badRequest("This enquiry is already being processed. Please wait a moment before trying again.", 409);
  }

  lead.leadId = claim.submission.id;
  try {
    const result = await syncZohoWebsiteLead(lead);
    db.completeLeadSubmission({
      id: claim.submission.id,
      claimToken: claim.submission.claimToken!,
      zohoRecordId: result.id,
    });
    db.appendAuditEvent({
      eventType: "zoho_lead_sync",
      outcome: "success",
      entityType: "lead_submission",
      entityId: claim.submission.id,
      campaignId: safeCampaignId,
      details: { action: result.action, duplicate: result.duplicate },
    });
    console.info("Website enquiry synced to Zoho CRM", {
      leadId: claim.submission.id,
      zohoLeadId: result.id,
      action: result.action,
    });
    return NextResponse.json({
      ok: true,
      eventId: claim.submission.id,
      leadId: claim.submission.id,
      submissionId: parsed.data.submissionId || claim.submission.id,
      crmAction: result.action,
      duplicate: result.duplicate,
      replayed: false,
    });
  } catch (error) {
    const configurationError = error instanceof ZohoConfigError || error instanceof IntegrationConfigError;
    const errorCode = error instanceof ZohoApiError ? error.code || "ZOHO_API_ERROR" : configurationError ? "ZOHO_CONFIG_ERROR" : "ZOHO_SYNC_ERROR";
    const message = safeErrorMessage(error);
    try {
      db.failLeadSubmission({
        id: claim.submission.id,
        claimToken: claim.submission.claimToken!,
        errorCode,
        errorMessage: message,
      });
      db.appendAuditEvent({
        eventType: "zoho_lead_sync",
        outcome: "failure",
        entityType: "lead_submission",
        entityId: claim.submission.id,
        campaignId: safeCampaignId,
        details: { error_code: errorCode },
      });
    } catch (storeError) {
      console.error("Lead failure could not be recorded", { leadId: claim.submission.id, error: safeErrorMessage(storeError) });
    }
    console.error("Zoho CRM sync failed", { leadId: claim.submission.id, errorCode, message });
    const status = configurationError ? 503 : 502;
    return badRequest("We could not submit the enquiry right now. Please try again or contact Emitronix directly.", status);
  }
}
