import type { SelectedClickId } from "./types";
import { canonicalLeadTransactionId, enhancedConversionIdentifiers, safeErrorMessage, sha256Hex } from "./security";
import { googleDataManagerEnvironment, type GoogleDataManagerEnvironment } from "./env";

const DATA_MANAGER_ENDPOINT = "https://datamanager.googleapis.com/v1/events:ingest";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const DATA_MANAGER_DIAGNOSTICS_ENDPOINT = "https://datamanager.googleapis.com/v1/requestStatus:retrieve";
const MAX_CLICK_AGE_MS = 90 * 86_400_000;

export type DataManagerConversionInput = {
  conversionActionId: string;
  transactionId: string;
  eventTimestamp: string;
  conversionValue: number;
  currency: "AED";
  clickId: SelectedClickId;
  consentGranted: boolean;
  email?: string;
  phone?: string;
};

type FetchLike = typeof fetch;

export class GoogleDataManagerError extends Error {
  status?: number;
  code?: string;
  retryable: boolean;
  retryAfterMs?: number;

  constructor(message: string, options: { status?: number; code?: string; retryable?: boolean; retryAfterMs?: number } = {}) {
    super(message);
    this.name = "GoogleDataManagerError";
    this.status = options.status;
    this.code = options.code;
    this.retryable = options.retryable === true;
    this.retryAfterMs = options.retryAfterMs;
  }
}

type CachedToken = { accessToken: string; expiresAt: number };
let cachedToken: CachedToken | null = null;

function parseRetryAfter(value: string | null) {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  const date = Date.parse(value);
  return Number.isFinite(date) ? Math.max(0, date - Date.now()) : undefined;
}

export function validateConversionTimestamp(value: string, now = new Date()) {
  if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) {
    throw new GoogleDataManagerError("Conversion timestamp must include an RFC 3339 timezone offset.", {
      code: "MISSING_TIMEZONE",
    });
  }
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) throw new GoogleDataManagerError("Invalid conversion timestamp.", { code: "INVALID_DATE" });
  if (timestamp > now.getTime() + 5 * 60_000) {
    throw new GoogleDataManagerError("Conversion timestamp cannot be in the future.", { code: "FUTURE_DATE" });
  }
  if (now.getTime() - timestamp > MAX_CLICK_AGE_MS) {
    throw new GoogleDataManagerError("Conversion timestamp is outside the 90-day click import window.", {
      code: "CLICK_TOO_OLD",
    });
  }
  return new Date(timestamp).toISOString();
}

export function buildDataManagerRequest(
  input: DataManagerConversionInput,
  config: Pick<GoogleDataManagerEnvironment, "customerId" | "loginCustomerId">,
  options: { validateOnly: boolean; now?: Date } = { validateOnly: false },
) {
  if (!/^\d+$/.test(input.conversionActionId)) throw new GoogleDataManagerError("Invalid conversion action ID.");
  let transactionId: string;
  try {
    transactionId = canonicalLeadTransactionId(input.transactionId);
  } catch {
    throw new GoogleDataManagerError("Transaction ID must be an opaque 1-64 character lead identifier.");
  }
  if (!Number.isFinite(input.conversionValue) || input.conversionValue <= 0) {
    throw new GoogleDataManagerError("Conversion value must be positive.");
  }
  if (!input.clickId.value || !/^[A-Za-z0-9._~+-]+$/.test(input.clickId.value)) {
    throw new GoogleDataManagerError("A valid Google click identifier is required.");
  }

  const eventTimestamp = validateConversionTimestamp(input.eventTimestamp, options.now);
  const userIdentifiers = enhancedConversionIdentifiers({
    email: input.email,
    phone: input.phone,
    consent: input.consentGranted,
  });
  const destination = {
    operatingAccount: { accountType: "GOOGLE_ADS", accountId: config.customerId },
    ...(config.loginCustomerId
      ? { loginAccount: { accountType: "GOOGLE_ADS", accountId: config.loginCustomerId } }
      : {}),
    productDestinationId: input.conversionActionId,
  };
  const event = {
    transactionId,
    eventTimestamp,
    adIdentifiers: { [input.clickId.type]: input.clickId.value },
    currency: input.currency,
    eventSource: "WEB",
    conversionValue: input.conversionValue,
    consent: {
      adUserData: input.consentGranted ? "CONSENT_GRANTED" : "CONSENT_DENIED",
    },
    ...(userIdentifiers.length ? { userData: { userIdentifiers } } : {}),
  };

  return {
    destinations: [destination],
    events: [event],
    ...(userIdentifiers.length ? { encoding: "HEX" } : {}),
    validateOnly: options.validateOnly,
  };
}

export function redactDataManagerRequest(request: ReturnType<typeof buildDataManagerRequest>) {
  return {
    ...request,
    events: request.events.map((event) => ({
      ...event,
      adIdentifiers: Object.fromEntries(
        Object.entries(event.adIdentifiers).map(([key, value]) => [key, `sha256:${sha256Hex(String(value)).slice(0, 12)}`]),
      ),
      ...(event.userData
        ? {
            userData: {
              userIdentifiers: event.userData.userIdentifiers.map((identifier) => ({
                ...(identifier.emailAddress ? { emailAddress: "[SHA256_REDACTED]" } : {}),
                ...(identifier.phoneNumber ? { phoneNumber: "[SHA256_REDACTED]" } : {}),
              })),
            },
          }
        : {}),
    })),
  };
}

export async function refreshGoogleDataManagerToken(
  config: Pick<GoogleDataManagerEnvironment, "clientId" | "clientSecret" | "refreshToken">,
  options: { fetchImpl?: FetchLike; now?: number; force?: boolean } = {},
) {
  const now = options.now ?? Date.now();
  if (!options.force && cachedToken && cachedToken.expiresAt > now + 120_000) return cachedToken.accessToken;
  const fetchImpl = options.fetchImpl || fetch;
  let response!: Response;
  try {
    response = await fetchImpl(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      redirect: "error",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: config.refreshToken,
        grant_type: "refresh_token",
      }),
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    throw new GoogleDataManagerError(`Google OAuth request failed: ${safeErrorMessage(error)}`, { retryable: true });
  }
  const json = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };
  if (!response.ok || !json.access_token) {
    throw new GoogleDataManagerError(json.error_description || json.error || "Unable to refresh Google OAuth token.", {
      status: response.status,
      code: json.error,
      retryable: response.status === 429 || response.status >= 500,
      retryAfterMs: parseRetryAfter(response.headers.get("retry-after")),
    });
  }
  const expiresInSeconds = Math.max(1, Number(json.expires_in || 3600));
  cachedToken = {
    accessToken: json.access_token,
    expiresAt: now + Math.max(1, expiresInSeconds - Math.min(120, Math.floor(expiresInSeconds / 2))) * 1000,
  };
  return cachedToken.accessToken;
}

export async function uploadDataManagerConversion(
  input: DataManagerConversionInput,
  options: {
    fetchImpl?: FetchLike;
    env?: NodeJS.ProcessEnv;
    validateOnly?: boolean;
    allowRemoteValidation?: boolean;
    now?: Date;
  } = {},
) {
  const config = googleDataManagerEnvironment(options.env);
  const validateOnly = options.validateOnly === true;
  const request = buildDataManagerRequest(input, config, { validateOnly, now: options.now });
  const remoteValidationAllowed = validateOnly && options.allowRemoteValidation === true;
  if (config.mode === "dry-run" || (!config.liveEnabled && !remoteValidationAllowed)) {
    return {
      status: "dry_run" as const,
      validateOnly: true,
      request: redactDataManagerRequest({ ...request, validateOnly: true }),
    };
  }

  if (
    config.clientId.length < 3 ||
    config.clientSecret.length < 8 ||
    config.refreshToken.length < 8 ||
    config.cloudProjectId.length < 3
  ) {
    throw new GoogleDataManagerError("Google Data Manager OAuth configuration is incomplete.", {
      code: "CONFIGURATION_ERROR",
    });
  }

  const fetchImpl = options.fetchImpl || fetch;
  let accessToken = await refreshGoogleDataManagerToken(config, { fetchImpl });
  let response!: Response;
  for (let authAttempt = 0; authAttempt < 2; authAttempt += 1) {
    try {
      response = await fetchImpl(DATA_MANAGER_ENDPOINT, {
        method: "POST",
        redirect: "error",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Goog-User-Project": config.cloudProjectId,
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(20_000),
      });
    } catch (error) {
      throw new GoogleDataManagerError(`Data Manager request failed: ${safeErrorMessage(error)}`, { retryable: true });
    }
    if (response.status !== 401 || authAttempt === 1) break;
    cachedToken = null;
    accessToken = await refreshGoogleDataManagerToken(config, { fetchImpl, force: true });
  }
  const json = (await response.json().catch(() => ({}))) as {
    requestId?: string;
    error?: { code?: number; status?: string; message?: string };
    fieldWarnings?: unknown[];
  };
  if (!response.ok || (!validateOnly && !json.requestId)) {
    const status = response.status;
    throw new GoogleDataManagerError(json.error?.message || "Google Data Manager rejected the conversion request.", {
      status,
      code: json.error?.status,
      retryable: status === 408 || status === 429 || status >= 500,
      retryAfterMs: parseRetryAfter(response.headers.get("retry-after")),
    });
  }
  if (validateOnly) {
    return {
      status: "validated" as const,
      fieldWarnings: json.fieldWarnings || [],
      validateOnly: true as const,
    };
  }
  return {
    status: "sent" as const,
    requestId: json.requestId,
    fieldWarnings: json.fieldWarnings || [],
    validateOnly,
  };
}

export type DataManagerDiagnosticResult = {
  status: "PROCESSING" | "SUCCESS" | "FAILED" | "PARTIAL_SUCCESS" | "UNKNOWN";
  errors: string[];
  warnings: string[];
  errorReasons: Array<{ reason: string; recordCount: number }>;
  warningReasons: Array<{ reason: string; recordCount: number }>;
  rawStatuses: string[];
};

export type DataManagerDiagnosticOutcome = "processing" | "confirmed" | "retryable_failure" | "permanent_failure";

export function classifyDataManagerDiagnostics(result: DataManagerDiagnosticResult): DataManagerDiagnosticOutcome {
  if (result.status === "PROCESSING" || result.status === "UNKNOWN") return "processing";
  const errorReasons = result.errorReasons.map((entry) => entry.reason.toUpperCase());
  if (errorReasons.some((reason) => reason.includes("DUPLICATE_TRANSACTION_ID"))) return "confirmed";
  if (result.status === "SUCCESS" || (result.status === "PARTIAL_SUCCESS" && errorReasons.length === 0)) {
    return "confirmed";
  }
  if (
    errorReasons.some(
      (reason) =>
        reason.includes("INTERNAL_ERROR") ||
        reason.includes("TEMPORARY") ||
        reason.includes("UNAVAILABLE") ||
        reason.includes("RATE_LIMIT"),
    )
  ) {
    return "retryable_failure";
  }
  return "permanent_failure";
}

export async function retrieveDataManagerDiagnostics(
  requestId: string,
  options: { fetchImpl?: FetchLike; env?: NodeJS.ProcessEnv } = {},
): Promise<DataManagerDiagnosticResult> {
  if (!/^[A-Za-z0-9-]{8,160}$/.test(requestId)) {
    throw new GoogleDataManagerError("Invalid Data Manager request ID.", { code: "INVALID_REQUEST_ID" });
  }
  const config = googleDataManagerEnvironment(options.env);
  if (config.mode !== "data-manager" || !config.liveEnabled) {
    throw new GoogleDataManagerError("Diagnostics are unavailable while live Data Manager uploads are disabled.", {
      code: "UPLOAD_DISABLED",
    });
  }
  const fetchImpl = options.fetchImpl || fetch;
  let accessToken = await refreshGoogleDataManagerToken(config, { fetchImpl });
  const url = new URL(DATA_MANAGER_DIAGNOSTICS_ENDPOINT);
  url.searchParams.set("requestId", requestId);
  let response!: Response;
  for (let authAttempt = 0; authAttempt < 2; authAttempt += 1) {
    try {
      response = await fetchImpl(url, {
        redirect: "error",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Goog-User-Project": config.cloudProjectId,
        },
        signal: AbortSignal.timeout(15_000),
      });
    } catch (error) {
      throw new GoogleDataManagerError(`Data Manager diagnostics request failed: ${safeErrorMessage(error)}`, {
        retryable: true,
      });
    }
    if (response.status !== 401 || authAttempt === 1) break;
    cachedToken = null;
    accessToken = await refreshGoogleDataManagerToken(config, { fetchImpl, force: true });
  }
  const payload = (await response.json().catch(() => ({}))) as {
    requestStatusPerDestination?: Array<{
      requestStatus?: string;
      errorInfo?: { errorCounts?: Array<{ reason?: string; recordCount?: string }> };
      warningInfo?: { warningCounts?: Array<{ reason?: string; recordCount?: string }> };
    }>;
    error?: { status?: string; message?: string };
  };
  if (!response.ok) {
    throw new GoogleDataManagerError(payload.error?.message || "Data Manager diagnostics request was rejected.", {
      status: response.status,
      code: payload.error?.status,
      retryable: response.status === 408 || response.status === 429 || response.status >= 500,
      retryAfterMs: parseRetryAfter(response.headers.get("retry-after")),
    });
  }
  const destinations = payload.requestStatusPerDestination || [];
  const rawStatuses = destinations.map((destination) => destination.requestStatus || "UNKNOWN");
  const errorReasons = destinations.flatMap((destination) =>
    (destination.errorInfo?.errorCounts || []).map((entry) => ({
      reason: entry.reason || "UNKNOWN_ERROR",
      recordCount: Number(entry.recordCount || 0),
    })),
  );
  const warningReasons = destinations.flatMap((destination) =>
    (destination.warningInfo?.warningCounts || []).map((entry) => ({
      reason: entry.reason || "UNKNOWN_WARNING",
      recordCount: Number(entry.recordCount || 0),
    })),
  );
  const errors = errorReasons.map((entry) => `${entry.reason}:${entry.recordCount}`);
  const warnings = warningReasons.map((entry) => `${entry.reason}:${entry.recordCount}`);
  const normalized = rawStatuses.map((status) => (status === "FAILURE" ? "FAILED" : status));
  const status: DataManagerDiagnosticResult["status"] =
    normalized.length === 0
      ? "UNKNOWN"
      : normalized.some((value) => value === "FAILED")
        ? "FAILED"
        : normalized.some((value) => value === "PARTIAL_SUCCESS")
          ? "PARTIAL_SUCCESS"
          : normalized.every((value) => value === "SUCCESS")
            ? "SUCCESS"
            : normalized.some((value) => value === "PROCESSING")
              ? "PROCESSING"
              : "UNKNOWN";
  return { status, errors, warnings, errorReasons, warningReasons, rawStatuses };
}

export function resetGoogleTokenCacheForTests() {
  cachedToken = null;
}
