import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { afterEach, describe, test } from "node:test";

import {
  GoogleDataManagerError,
  buildDataManagerRequest,
  classifyDataManagerDiagnostics,
  refreshGoogleDataManagerToken,
  resetGoogleTokenCacheForTests,
  retrieveDataManagerDiagnostics,
  uploadDataManagerConversion,
  validateConversionTimestamp,
} from "../../lib/googleZoho/googleDataManager";
import type {
  DataManagerConversionInput,
  DataManagerDiagnosticResult,
} from "../../lib/googleZoho/googleDataManager";
import { buildLeadDataLayerEvents } from "../../lib/gtm/dataLayer";

const NOW = new Date("2026-08-04T12:00:00.000Z");
const CONFIG = { customerId: "9523565801", loginCustomerId: "1234567890" };

function conversion(overrides: Partial<DataManagerConversionInput> = {}): DataManagerConversionInput {
  return {
    conversionActionId: "987654321",
    transactionId: "123e4567-e89b-42d3-a456-426614174000",
    eventTimestamp: "2026-08-04T11:30:00.000Z",
    conversionValue: 250,
    currency: "AED",
    clickId: { type: "gclid", value: "test-gclid-123" },
    consentGranted: true,
    email: "First.Last@gmail.com",
    phone: "050 123 4567",
    ...overrides,
  };
}

function liveEnvironment(overrides: Partial<NodeJS.ProcessEnv> = {}): NodeJS.ProcessEnv {
  return {
    NODE_ENV: "test",
    GOOGLE_DATA_MANAGER_CLIENT_ID: "client-id",
    GOOGLE_DATA_MANAGER_CLIENT_SECRET: "client-secret-value",
    GOOGLE_DATA_MANAGER_REFRESH_TOKEN: "refresh-token-value",
    GOOGLE_CLOUD_PROJECT_ID: "emitronix-project",
    GOOGLE_ADS_CUSTOMER_ID: "952-356-5801",
    GOOGLE_ADS_LOGIN_CUSTOMER_ID: "123-456-7890",
    GOOGLE_CONVERSION_UPLOAD_MODE: "data-manager",
    GOOGLE_CONVERSION_UPLOAD_ENABLED: "true",
    ...overrides,
  } as NodeJS.ProcessEnv;
}

afterEach(() => resetGoogleTokenCacheForTests());

describe("Data Manager payload construction", () => {
  test("uses the exact website GTM lead ID for a separate CRM-stage action", () => {
    const leadId = "123e4567-e89b-42d3-a456-426614174000";
    const browserEvents = buildLeadDataLayerEvents({
      result: { ok: true, leadId, eventId: leadId, submissionId: "transport-123", replayed: false },
      formName: "contact_form",
      attribution: null,
      pageContext: {
        page_location: "https://emitronix.ae/contact",
        page_path: "/contact",
      },
    });
    assert.ok(browserEvents);
    const offline = buildDataManagerRequest(conversion({ transactionId: leadId }), CONFIG, {
      validateOnly: true,
      now: NOW,
    });
    assert.equal(browserEvents.generateLead.lead_id, leadId);
    assert.equal(browserEvents.generateLead.event_id, leadId);
    assert.equal(offline.events[0].transactionId, leadId);
  });

  test("builds the exact request with one click ID and normalized SHA-256 identifiers", () => {
    const request = buildDataManagerRequest(conversion(), CONFIG, { validateOnly: true, now: NOW });
    assert.deepEqual(request, {
      destinations: [
        {
          operatingAccount: { accountType: "GOOGLE_ADS", accountId: "9523565801" },
          loginAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" },
          productDestinationId: "987654321",
        },
      ],
      events: [
        {
          transactionId: "123e4567-e89b-42d3-a456-426614174000",
          eventTimestamp: "2026-08-04T11:30:00.000Z",
          adIdentifiers: { gclid: "test-gclid-123" },
          currency: "AED",
          eventSource: "WEB",
          conversionValue: 250,
          consent: {
            adUserData: "CONSENT_GRANTED",
          },
          userData: {
            userIdentifiers: [
              {
                emailAddress: createHash("sha256").update("firstlast@gmail.com").digest("hex"),
              },
              {
                phoneNumber: createHash("sha256").update("+971501234567").digest("hex"),
              },
            ],
          },
        },
      ],
      encoding: "HEX",
      validateOnly: true,
    });
    assert.deepEqual(Object.keys(request.events[0].adIdentifiers), ["gclid"]);
  });

  test("emits exactly the selected gclid, gbraid, or wbraid field", () => {
    for (const [type, value] of [
      ["gclid", "g-value"],
      ["gbraid", "b-value"],
      ["wbraid", "w-value"],
    ] as const) {
      const request = buildDataManagerRequest(
        conversion({ clickId: { type, value } }),
        { customerId: CONFIG.customerId },
        { validateOnly: false, now: NOW },
      );
      assert.deepEqual(request.events[0].adIdentifiers, { [type]: value });
      assert.equal(Object.keys(request.events[0].adIdentifiers).length, 1);
    }
  });

  test("omits hashed identity data and raw PII when consent is denied", () => {
    const input = conversion({ consentGranted: false, email: "person@example.com", phone: "+971501112233" });
    const request = buildDataManagerRequest(input, CONFIG, { validateOnly: false, now: NOW });
    assert.equal("userData" in request.events[0], false);
    assert.equal("encoding" in request, false);
    assert.deepEqual(request.events[0].consent, {
      adUserData: "CONSENT_DENIED",
    });
    const serialized = JSON.stringify(request);
    assert.equal(serialized.includes(input.email || ""), false);
    assert.equal(serialized.includes(input.phone || ""), false);
  });

  test("rejects invalid, future, and older-than-90-day timestamps", () => {
    assert.throws(() => validateConversionTimestamp("2026-99-99T99:99:99Z", NOW), (error) => {
      return error instanceof GoogleDataManagerError && error.code === "INVALID_DATE";
    });
    assert.throws(() => validateConversionTimestamp("2026-08-04T11:30:00", NOW), (error) => {
      return error instanceof GoogleDataManagerError && error.code === "MISSING_TIMEZONE";
    });
    assert.throws(() => validateConversionTimestamp("2026-08-04T12:05:01.000Z", NOW), (error) => {
      return error instanceof GoogleDataManagerError && error.code === "FUTURE_DATE";
    });
    assert.throws(() => validateConversionTimestamp("2026-05-06T11:59:59.999Z", NOW), (error) => {
      return error instanceof GoogleDataManagerError && error.code === "CLICK_TOO_OLD";
    });
    assert.throws(
      () =>
        buildDataManagerRequest(
          conversion({ clickId: { type: "gclid", value: "contains spaces" } }),
          CONFIG,
          { validateOnly: false, now: NOW },
        ),
      /valid Google click identifier/,
    );
  });
});

describe("Google OAuth token refresh", () => {
  test("sends refresh credentials once and reuses a valid cached token", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const mockFetch = (async (input: URL | RequestInfo, init?: RequestInit) => {
      calls.push({ url: String(input), init });
      return new Response(JSON.stringify({ access_token: "access-token-one", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    const config = { clientId: "client", clientSecret: "secret", refreshToken: "refresh" };

    assert.equal(await refreshGoogleDataManagerToken(config, { fetchImpl: mockFetch, now: NOW.getTime() }), "access-token-one");
    assert.equal(
      await refreshGoogleDataManagerToken(config, { fetchImpl: mockFetch, now: NOW.getTime() + 1_000 }),
      "access-token-one",
    );
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://oauth2.googleapis.com/token");
    const body = calls[0].init?.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("client_id"), "client");
    assert.equal(body.get("client_secret"), "secret");
    assert.equal(body.get("refresh_token"), "refresh");

    await refreshGoogleDataManagerToken(config, {
      fetchImpl: mockFetch,
      now: NOW.getTime() + 2_000,
      force: true,
    });
    assert.equal(calls.length, 2);
  });

  test("classifies OAuth throttling as retryable and honors Retry-After", async () => {
    const mockFetch = (async () =>
      new Response(JSON.stringify({ error: "temporarily_unavailable" }), {
        status: 429,
        headers: { "content-type": "application/json", "retry-after": "7" },
      })) as typeof fetch;

    await assert.rejects(
      refreshGoogleDataManagerToken(
        { clientId: "client", clientSecret: "secret", refreshToken: "refresh" },
        { fetchImpl: mockFetch, now: NOW.getTime() },
      ),
      (error) =>
        error instanceof GoogleDataManagerError &&
        error.status === 429 &&
        error.retryable &&
        error.retryAfterMs === 7_000,
    );
  });
});

describe("mocked Data Manager uploads", () => {
  test("uploads successfully with OAuth and returns the asynchronous request ID", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const mockFetch = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, init });
      if (url === "https://oauth2.googleapis.com/token") {
        return new Response(JSON.stringify({ access_token: "upload-token", expires_in: 3600 }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      assert.equal(url, "https://datamanager.googleapis.com/v1/events:ingest");
      assert.equal((init?.headers as Record<string, string>).Authorization, "Bearer upload-token");
      assert.equal((init?.headers as Record<string, string>)["X-Goog-User-Project"], "emitronix-project");
      const payload = JSON.parse(String(init?.body)) as Record<string, unknown>;
      assert.equal(payload.validateOnly, false);
      return new Response(JSON.stringify({ requestId: "request-12345678", fieldWarnings: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    const result = await uploadDataManagerConversion(conversion(), {
      fetchImpl: mockFetch,
      env: liveEnvironment(),
      now: NOW,
    });
    assert.deepEqual(result, {
      status: "sent",
      requestId: "request-12345678",
      fieldWarnings: [],
      validateOnly: false,
    });
    assert.equal(calls.length, 2);
  });

  test("refreshes OAuth once after an ingest 401 and retries with the new token", async () => {
    const authorizationHeaders: string[] = [];
    let oauthCalls = 0;
    let ingestCalls = 0;
    const mockFetch = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://oauth2.googleapis.com/token") {
        oauthCalls += 1;
        return new Response(
          JSON.stringify({ access_token: `token-${oauthCalls}`, expires_in: 3600 }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      ingestCalls += 1;
      authorizationHeaders.push((init?.headers as Record<string, string>).Authorization);
      if (ingestCalls === 1) {
        return new Response(
          JSON.stringify({ error: { status: "UNAUTHENTICATED", message: "expired token" } }),
          { status: 401, headers: { "content-type": "application/json" } },
        );
      }
      return new Response(JSON.stringify({ requestId: "request-after-refresh" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    const result = await uploadDataManagerConversion(conversion(), {
      fetchImpl: mockFetch,
      env: liveEnvironment(),
      now: NOW,
    });
    assert.equal(result.status, "sent");
    assert.equal(oauthCalls, 2);
    assert.equal(ingestCalls, 2);
    assert.deepEqual(authorizationHeaders, ["Bearer token-1", "Bearer token-2"]);
  });

  test("classifies transient and permanent upload failures for the retry worker", async () => {
    let uploadAttempt = 0;
    const transientFetch = (async (input: URL | RequestInfo) => {
      const url = String(input);
      if (url.includes("oauth2.googleapis.com")) {
        return new Response(JSON.stringify({ access_token: "token", expires_in: 3600 }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      uploadAttempt += 1;
      return new Response(JSON.stringify({ error: { status: "UNAVAILABLE", message: "try later" } }), {
        status: 503,
        headers: { "content-type": "application/json", "retry-after": "4" },
      });
    }) as typeof fetch;

    await assert.rejects(
      uploadDataManagerConversion(conversion(), {
        fetchImpl: transientFetch,
        env: liveEnvironment(),
        now: NOW,
      }),
      (error) =>
        error instanceof GoogleDataManagerError &&
        error.status === 503 &&
        error.code === "UNAVAILABLE" &&
        error.retryable &&
        error.retryAfterMs === 4_000,
    );
    assert.equal(uploadAttempt, 1);

    resetGoogleTokenCacheForTests();
    const permanentFetch = (async (input: URL | RequestInfo) => {
      if (String(input).includes("oauth2.googleapis.com")) {
        return new Response(JSON.stringify({ access_token: "token", expires_in: 3600 }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: { status: "INVALID_ARGUMENT", message: "bad event" } }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    await assert.rejects(
      uploadDataManagerConversion(conversion(), {
        fetchImpl: permanentFetch,
        env: liveEnvironment(),
        now: NOW,
      }),
      (error) => error instanceof GoogleDataManagerError && error.status === 400 && !error.retryable,
    );
  });

  test("dry-run performs no network call and returns only redacted identifiers", async () => {
    let called = false;
    const result = await uploadDataManagerConversion(conversion(), {
      fetchImpl: (async () => {
        called = true;
        throw new Error("network should not be reached");
      }) as typeof fetch,
      env: liveEnvironment({
        GOOGLE_CONVERSION_UPLOAD_MODE: "dry-run",
        GOOGLE_CONVERSION_UPLOAD_ENABLED: "false",
      }),
      now: NOW,
    });
    assert.equal(called, false);
    assert.equal(result.status, "dry_run");
    const serialized = JSON.stringify(result.request);
    assert.match(serialized, /sha256:/);
    assert.equal(serialized.includes("test-gclid-123"), false);
    assert.equal(serialized.includes("firstlast@gmail.com"), false);
  });
});

describe("Data Manager diagnostics", () => {
  function diagnostic(
    status: DataManagerDiagnosticResult["status"],
    reasons: string[] = [],
  ): DataManagerDiagnosticResult {
    return {
      status,
      errors: reasons.map((reason) => `${reason}:1`),
      warnings: [],
      errorReasons: reasons.map((reason) => ({ reason, recordCount: 1 })),
      warningReasons: [],
      rawStatuses: [status],
    };
  }

  test("classifies duplicate transactions as confirmed and internal errors as retryable", () => {
    assert.equal(
      classifyDataManagerDiagnostics(diagnostic("FAILED", ["DUPLICATE_TRANSACTION_ID"])),
      "confirmed",
    );
    assert.equal(
      classifyDataManagerDiagnostics(diagnostic("FAILED", ["INTERNAL_ERROR"])),
      "retryable_failure",
    );
    assert.equal(
      classifyDataManagerDiagnostics(diagnostic("PARTIAL_SUCCESS", ["RATE_LIMIT_EXCEEDED"])),
      "retryable_failure",
    );
    assert.equal(
      classifyDataManagerDiagnostics(diagnostic("FAILED", ["INVALID_ARGUMENT"])),
      "permanent_failure",
    );
    assert.equal(classifyDataManagerDiagnostics(diagnostic("PROCESSING")), "processing");
    assert.equal(classifyDataManagerDiagnostics(diagnostic("SUCCESS")), "confirmed");
  });

  test("parses mocked diagnostic counts and normalizes FAILURE status", async () => {
    const fetchMock = (async (input: URL | RequestInfo) => {
      const url = String(input);
      if (url === "https://oauth2.googleapis.com/token") {
        return new Response(JSON.stringify({ access_token: "diagnostic-token", expires_in: 3600 }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      const diagnosticUrl = new URL(url);
      assert.equal(diagnosticUrl.origin + diagnosticUrl.pathname, "https://datamanager.googleapis.com/v1/requestStatus:retrieve");
      assert.equal(diagnosticUrl.searchParams.get("requestId"), "request-12345678");
      return new Response(
        JSON.stringify({
          requestStatusPerDestination: [
            {
              requestStatus: "FAILURE",
              errorInfo: { errorCounts: [{ reason: "INTERNAL_ERROR", recordCount: "2" }] },
              warningInfo: { warningCounts: [{ reason: "LATE_EVENT", recordCount: "1" }] },
            },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }) as typeof fetch;

    const result = await retrieveDataManagerDiagnostics("request-12345678", {
      fetchImpl: fetchMock,
      env: liveEnvironment(),
    });
    assert.deepEqual(result, {
      status: "FAILED",
      errors: ["INTERNAL_ERROR:2"],
      warnings: ["LATE_EVENT:1"],
      errorReasons: [{ reason: "INTERNAL_ERROR", recordCount: 2 }],
      warningReasons: [{ reason: "LATE_EVENT", recordCount: 1 }],
      rawStatuses: ["FAILURE"],
    });
    assert.equal(classifyDataManagerDiagnostics(result), "retryable_failure");
  });
});
