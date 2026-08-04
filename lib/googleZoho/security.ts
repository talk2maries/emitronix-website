import { createHash, createHmac, timingSafeEqual } from "crypto";

export class WebhookAuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookAuthenticationError";
  }
}

export function normalizeEmail(email: string) {
  const normalized = email.trim().toLowerCase().replace(/\s+/g, "");
  const at = normalized.lastIndexOf("@");
  if (at <= 0) return normalized;
  let local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);
  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.replace(/\./g, "");
  }
  return `${local}@${domain}`;
}

export function normalizePhone(phone: string, defaultCountryCode = "971") {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  const hadInternationalPrefix = trimmed.startsWith("+") || trimmed.startsWith("00");
  let digits = trimmed.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  digits = `${digits.startsWith("+") ? "+" : ""}${digits.replace(/\D/g, "")}`;
  if (!digits.startsWith("+")) {
    if (digits.startsWith(defaultCountryCode)) digits = `+${digits}`;
    else if (digits.startsWith("0")) digits = `+${defaultCountryCode}${digits.slice(1)}`;
    else if (defaultCountryCode === "971" && /^5\d{8}$/.test(digits)) digits = `+${defaultCountryCode}${digits}`;
    else if (hadInternationalPrefix) digits = `+${digits}`;
    else return "";
  }
  return /^\+[1-9]\d{6,14}$/.test(digits) ? digits : "";
}

export function sha256Hex(value: string) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function enhancedConversionIdentifiers(input: {
  email?: string;
  phone?: string;
  consent: boolean;
  defaultCountryCode?: string;
}) {
  if (!input.consent) return [];
  const identifiers: Array<{ emailAddress?: string; phoneNumber?: string }> = [];
  const email = input.email ? normalizeEmail(input.email) : "";
  const phone = input.phone ? normalizePhone(input.phone, input.defaultCountryCode) : "";
  if (email && /^[^@]+@[^@]+\.[^@]+$/.test(email)) identifiers.push({ emailAddress: sha256Hex(email) });
  if (phone) identifiers.push({ phoneNumber: sha256Hex(phone) });
  return identifiers;
}

export function buildWebhookSignature(secret: string, timestamp: string, nonce: string, rawBody: string) {
  return createHmac("sha256", secret).update(`${timestamp}.${nonce}.${rawBody}`, "utf8").digest("hex");
}

function signatureBuffer(value: string) {
  const normalized = value.trim().toLowerCase().replace(/^sha256=/, "");
  if (!/^[a-f0-9]{64}$/.test(normalized)) return null;
  return Buffer.from(normalized, "hex");
}

export function verifyWebhookSignature(input: {
  secret: string;
  timestamp: string;
  nonce: string;
  rawBody: string;
  signature: string;
  now?: Date;
  toleranceSeconds?: number;
}) {
  if (input.secret.length < 32) throw new WebhookAuthenticationError("Webhook secret must contain at least 32 characters.");
  if (!/^[A-Za-z0-9_-]{16,160}$/.test(input.nonce)) throw new WebhookAuthenticationError("Invalid webhook nonce.");
  const timestampMs = /^\d{10}$/.test(input.timestamp)
    ? Number(input.timestamp) * 1000
    : /^\d{13}$/.test(input.timestamp)
      ? Number(input.timestamp)
      : Date.parse(input.timestamp);
  if (!Number.isFinite(timestampMs)) throw new WebhookAuthenticationError("Invalid webhook timestamp.");
  const now = (input.now || new Date()).getTime();
  const toleranceMs = (input.toleranceSeconds ?? 300) * 1000;
  if (Math.abs(now - timestampMs) > toleranceMs) throw new WebhookAuthenticationError("Webhook timestamp is outside the allowed window.");
  const received = signatureBuffer(input.signature);
  const expected = signatureBuffer(buildWebhookSignature(input.secret, input.timestamp, input.nonce, input.rawBody));
  if (!received || !expected || received.length !== expected.length || !timingSafeEqual(received, expected)) {
    throw new WebhookAuthenticationError("Invalid webhook signature.");
  }
  return true;
}

export function conversionRequestHash(input: {
  recordId: string;
  eventKey: string;
  transactionId: string;
  conversionAction: string;
  conversionValue: number;
  eventTimestamp: string;
  clickType: string;
  clickValue: string;
}) {
  return sha256Hex(
    JSON.stringify({
      recordId: input.recordId,
      eventKey: input.eventKey,
      transactionId: input.transactionId,
      action: input.conversionAction,
      value: input.conversionValue,
      eventTimestamp: input.eventTimestamp,
      clickType: input.clickType,
      clickHash: sha256Hex(input.clickValue),
    }),
  );
}

/**
 * Returns the server-issued website lead ID unchanged for Google transaction/order
 * ID use. Google deduplicates transaction IDs within each conversion action, so
 * one canonical ID can identify the same lead across separate funnel stages.
 */
export function canonicalLeadTransactionId(leadId: string) {
  if (
    typeof leadId !== "string" ||
    leadId.length < 1 ||
    leadId.length > 64 ||
    leadId.trim() !== leadId ||
    !/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(leadId)
  ) {
    throw new Error("Canonical lead ID must be an opaque 1-64 character server identifier.");
  }
  return leadId;
}

export function canonicalLeadLinkMatches(input: {
  module: "Leads" | "Deals";
  zohoRecordId: string;
  zohoLeadId?: string;
  sourceLeadId: string;
  sourceZohoRecordId: string | null;
  identityVersion?: 1 | 2;
  transactionId?: string;
}) {
  if (!input.zohoLeadId || input.zohoLeadId !== input.sourceLeadId) return false;
  if (input.module === "Leads" && input.sourceZohoRecordId !== input.zohoRecordId) return false;
  if (input.identityVersion === 2 && input.transactionId !== input.sourceLeadId) return false;
  return true;
}

export function safeErrorMessage(error: unknown, maxLength = 500) {
  const message = error instanceof Error ? error.message : String(error || "Unknown error");
  return message
    .replace(/(access_token|refresh_token|client_secret|developer-token|authorization)["'=:\s]+[^\s,"'}]+/gi, "$1=[REDACTED]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[REDACTED_EMAIL]")
    .replace(/(?:\+?\d[\d\s().-]{6,}\d)/g, "[REDACTED_PHONE]")
    .replace(/\b(gclid|gbraid|wbraid|click[_ -]?id)\s*[:=]\s*[^\s,;]+/gi, "$1=[REDACTED]")
    .replace(/[A-Za-z0-9._~+-]{80,}/g, "[REDACTED_LONG_VALUE]")
    .slice(0, maxLength);
}

export function requestHash(rawBody: string) {
  return sha256Hex(rawBody);
}
