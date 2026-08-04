import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";

import { mergeAttribution, captureAttributionTouch } from "../../lib/googleZoho/attribution";
import type { ZohoEnvironment } from "../../lib/googleZoho/env";
import {
  ZohoClient,
  ZohoApiError,
  ZohoConfigError,
  fetchZohoConversionRecord,
  syncZohoWebsiteLead,
  writeZohoConversionResult,
  type ZohoConversionRecord,
  type WebsiteLead,
} from "../../lib/googleZoho/zohoClient";

const NOW = new Date("2026-08-04T12:00:00.000Z");

const CONFIG: ZohoEnvironment = {
  clientId: "client-id",
  clientSecret: "client-secret",
  refreshToken: "refresh-token",
  accountsUrl: "https://accounts.zoho.com",
  module: "Leads",
  leadSource: "Website Contact Form",
  paidLeadSource: "Advertisement",
  paidLeadSubSource: "Google Ads",
};

const FIELD_METADATA = [
  { api_name: "Emitronix_Lead_ID", field_label: "Emitronix Lead ID" },
  { api_name: "GCLID_Custom", field_label: "Google Click ID" },
  { api_name: "GBRAID_Custom", field_label: "GBRAID" },
  { api_name: "WBRAID_Custom", field_label: "WBRAID" },
  { api_name: "Campaign_ID_Custom", field_label: "Google Ads Campaign ID" },
  { api_name: "Campaign_Name_Custom", field_label: "Google Ads Campaign Name" },
  { api_name: "Original_Landing_Custom", field_label: "Original Landing Page" },
  { api_name: "Consent_Custom", field_label: "Google Ads User Data Consent" },
  { api_name: "Lead_Sub_Source_Custom", field_label: "Lead Sub Source" },
];

const ENV_KEYS = [
  "ZOHO_CLIENT_ID",
  "ZOHO_CLIENT_SECRET",
  "ZOHO_REFRESH_TOKEN",
  "ZOHO_ACCOUNTS_URL",
  "ZOHO_CRM_MODULE",
  "ZOHO_LEAD_SOURCE",
  "ZOHO_GOOGLE_ADS_LEAD_SOURCE",
  "ZOHO_GOOGLE_ADS_SUB_SOURCE",
  "ZOHO_LEADS_FIELD_MAP_JSON",
] as const;

const originalEnvironment = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

function installZohoEnvironment() {
  process.env.ZOHO_CLIENT_ID = CONFIG.clientId;
  process.env.ZOHO_CLIENT_SECRET = CONFIG.clientSecret;
  process.env.ZOHO_REFRESH_TOKEN = CONFIG.refreshToken;
  process.env.ZOHO_ACCOUNTS_URL = CONFIG.accountsUrl;
  process.env.ZOHO_CRM_MODULE = CONFIG.module;
  process.env.ZOHO_LEAD_SOURCE = CONFIG.leadSource;
  process.env.ZOHO_GOOGLE_ADS_LEAD_SOURCE = CONFIG.paidLeadSource;
  process.env.ZOHO_GOOGLE_ADS_SUB_SOURCE = CONFIG.paidLeadSubSource;
  delete process.env.ZOHO_LEADS_FIELD_MAP_JSON;
}

afterEach(() => {
  for (const key of ENV_KEYS) {
    const value = originalEnvironment[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function paidLead(): WebsiteLead {
  const captured = captureAttributionTouch(
    "https://emitronix.ae/warehouse-construction?gclid=click-123&campaignid=999&campaign_name=Warehouse%20Dubai&utm_source=google&utm_medium=cpc",
    "https://www.google.com/search?q=warehouse",
    NOW,
  );
  assert.ok(captured);
  return {
    name: "Aisha Khan",
    company: "Example Industrial LLC",
    email: "aisha@example.com",
    phone: "+971501112233",
    service: "Warehouse Construction",
    projectLocation: "Dubai Industrial City",
    message: "Please contact me about a warehouse project.",
    pageUrl: "https://emitronix.ae/warehouse-construction",
    consent: true,
    leadId: "123e4567-e89b-42d3-a456-426614174000",
    attribution: mergeAttribution(
      null,
      captured,
      { marketing: true, adUserData: true, version: "1", updatedAt: NOW.toISOString() },
      NOW,
    ),
  };
}

describe("Zoho metadata and OAuth behavior", () => {
  test("discovers real field API names and reuses a cached OAuth token and metadata", async () => {
    let oauthCalls = 0;
    let metadataCalls = 0;
    const calls: string[] = [];
    const fetchMock = (async (input: URL | RequestInfo) => {
      const url = String(input);
      calls.push(url);
      if (url.includes("/oauth/v2/token")) {
        oauthCalls += 1;
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.includes("/settings/fields")) {
        metadataCalls += 1;
        return json({ fields: FIELD_METADATA });
      }
      if (url.includes("/Leads/1234567890123456789")) {
        return json({ data: [{ id: "1234567890123456789", Last_Name: "Khan" }] });
      }
      throw new Error(`Unexpected URL ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    const first = await client.fields("Leads");
    const second = await client.fields("Leads");
    const record = await client.getRecord("Leads", "1234567890123456789");

    assert.equal(first.map.gclid, "GCLID_Custom");
    assert.equal(first.map.campaignName, "Campaign_Name_Custom");
    assert.equal(first.map.adUserDataConsent, "Consent_Custom");
    assert.deepEqual(second, first);
    assert.equal(record.Last_Name, "Khan");
    assert.equal(oauthCalls, 1);
    assert.equal(metadataCalls, 1);
    assert.equal(calls.length, 3);
  });

  test("validates configured field overrides against live metadata", async () => {
    const fetchMock = (async (input: URL | RequestInfo) => {
      if (String(input).includes("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      return json({ fields: FIELD_METADATA });
    }) as typeof fetch;
    const client = new ZohoClient(
      { ...CONFIG, leadFieldMapJson: JSON.stringify({ gclid: "Missing_Custom_Field" }) },
      fetchMock,
      () => NOW.getTime(),
    );
    await assert.rejects(client.fields("Leads"), (error) => {
      return error instanceof ZohoConfigError && /was not found/.test(error.message);
    });
  });
});

describe("Zoho website lead create/update/deduplication", { concurrency: false }, () => {
  test("fails closed when the canonical Emitronix Lead ID field is unavailable", async () => {
    installZohoEnvironment();
    let writeCalls = 0;
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) {
        return json({ fields: FIELD_METADATA.filter((field) => field.api_name !== "Emitronix_Lead_ID") });
      }
      if (init?.method === "POST" || init?.method === "PUT") writeCalls += 1;
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    await assert.rejects(syncZohoWebsiteLead(paidLead(), { client }), (error) => {
      return error instanceof ZohoConfigError && /Emitronix Lead ID/.test(error.message);
    });
    assert.equal(writeCalls, 0);
  });

  test("creates a paid lead with discovered attribution fields and approved lead sources", async () => {
    installZohoEnvironment();
    let postedRecord: Record<string, unknown> | undefined;
    const searchQueries: URL[] = [];
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
      if (url.pathname.endsWith("/Leads/search")) {
        searchQueries.push(url);
        return json({ data: [] });
      }
      if (url.pathname.endsWith("/Leads") && init?.method === "POST") {
        const payload = JSON.parse(String(init.body)) as { data: Array<Record<string, unknown>> };
        postedRecord = payload.data[0];
        return json({ data: [{ status: "success", details: { id: "1234567890123456789" } }] });
      }
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    const result = await syncZohoWebsiteLead(paidLead(), { client });

    assert.deepEqual(
      { id: result.id, duplicate: result.duplicate, action: result.action },
      { id: "1234567890123456789", duplicate: false, action: "created" },
    );
    assert.equal(searchQueries.length, 3, "email, phone, and click-ID dedupe checks should run before create");
    assert.equal(postedRecord?.Lead_Source, "Advertisement");
    assert.equal(postedRecord?.Lead_Sub_Source_Custom, "Google Ads");
    assert.equal(postedRecord?.GCLID_Custom, "click-123");
    assert.equal(postedRecord?.Campaign_ID_Custom, "999");
    assert.equal(postedRecord?.Consent_Custom, true);
    assert.equal(postedRecord?.First_Name, "Aisha");
    assert.equal(postedRecord?.Last_Name, "Khan");
    assert.equal(postedRecord?.Emitronix_Lead_ID, "123e4567-e89b-42d3-a456-426614174000");
    assert.match(String(postedRecord?.Description), /Emitronix lead ID: 123e4567-e89b-42d3-a456-426614174000/);
  });

  test("updates an existing lead found by email instead of creating a duplicate", async () => {
    installZohoEnvironment();
    let createCalls = 0;
    let updatedRecord: Record<string, unknown> | undefined;
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
      if (url.pathname.endsWith("/Leads/search")) {
        return json({
          data: [{ id: "2222222222222222222", Email: "aisha@example.com", Description: "Existing enquiry" }],
        });
      }
      if (url.pathname.endsWith("/Leads/2222222222222222222") && (!init?.method || init.method === "GET")) {
        return json({
          data: [{
            id: "2222222222222222222",
            Email: "aisha@example.com",
            Description: "Existing enquiry",
          }],
        });
      }
      if (url.pathname.endsWith("/Leads/2222222222222222222") && init?.method === "PUT") {
        const payload = JSON.parse(String(init.body)) as { data: Array<Record<string, unknown>> };
        updatedRecord = payload.data[0];
        return json({ data: [{ status: "success", details: { id: "2222222222222222222" } }] });
      }
      if (init?.method === "POST") createCalls += 1;
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    const result = await syncZohoWebsiteLead(paidLead(), { client });

    assert.equal(result.action, "updated");
    assert.equal(result.duplicate, true);
    assert.equal(createCalls, 0);
    assert.equal(updatedRecord?.GCLID_Custom, "click-123");
    assert.equal(updatedRecord?.Emitronix_Lead_ID, "123e4567-e89b-42d3-a456-426614174000");
    assert.match(String(updatedRecord?.Description), /Existing enquiry/);
    assert.match(String(updatedRecord?.Description), /New website enquiry/);
  });

  test("does not let a later organic enquiry sever an existing paid canonical lead link", async () => {
    installZohoEnvironment();
    let updatedRecord: Record<string, unknown> | undefined;
    const existingRecord = {
      id: "2222222222222222222",
      Email: "aisha@example.com",
      Mobile: "+971501112233",
      Description: "Existing paid enquiry",
      Emitronix_Lead_ID: "123e4567-e89b-42d3-a456-426614174099",
    };
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
      if (url.pathname.endsWith("/Leads/search")) return json({ data: [existingRecord] });
      if (url.pathname.endsWith("/Leads/2222222222222222222") && (!init?.method || init.method === "GET")) {
        return json({ data: [existingRecord] });
      }
      if (url.pathname.endsWith("/Leads/2222222222222222222") && init?.method === "PUT") {
        const payload = JSON.parse(String(init.body)) as { data: Array<Record<string, unknown>> };
        updatedRecord = payload.data[0];
        return json({ data: [{ status: "success", details: { id: "2222222222222222222" } }] });
      }
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const organic = { ...paidLead(), attribution: null, leadId: "123e4567-e89b-42d3-a456-426614174001" };
    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    const result = await syncZohoWebsiteLead(organic, { client });
    assert.equal(result.action, "updated");
    assert.equal(Object.hasOwn(updatedRecord || {}, "Emitronix_Lead_ID"), false);
  });

  test("recovers a concurrent DUPLICATE_DATA create race by finding and updating the lead", async () => {
    installZohoEnvironment();
    let emailSearches = 0;
    let updateCalls = 0;
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
      if (url.pathname.endsWith("/Leads/search")) {
        if (url.searchParams.has("email")) {
          emailSearches += 1;
          return emailSearches === 1
            ? json({ data: [] })
            : json({
                data: [{
                  id: "3333333333333333333",
                  Email: "aisha@example.com",
                  Description: "Concurrent record",
                }],
              });
        }
        return json({ data: [] });
      }
      if (url.pathname.endsWith("/Leads/3333333333333333333") && (!init?.method || init.method === "GET")) {
        return json({
          data: [{
            id: "3333333333333333333",
            Email: "aisha@example.com",
            Description: "Concurrent record",
          }],
        });
      }
      if (url.pathname.endsWith("/Leads") && init?.method === "POST") {
        return json({ data: [{ status: "error", code: "DUPLICATE_DATA", message: "duplicate" }] });
      }
      if (url.pathname.endsWith("/Leads/3333333333333333333") && init?.method === "PUT") {
        updateCalls += 1;
        return json({ data: [{ status: "success", details: { id: "3333333333333333333" } }] });
      }
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    const result = await syncZohoWebsiteLead(paidLead(), { client });
    assert.deepEqual(
      { id: result.id, duplicate: result.duplicate, action: result.action },
      { id: "3333333333333333333", duplicate: true, action: "updated" },
    );
    assert.equal(emailSearches, 2);
    assert.equal(updateCalls, 1);
  });

  test("requires an exact click-ID match before treating a CRM search hit as a duplicate", async () => {
    installZohoEnvironment();
    let created = false;
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
      if (url.pathname.endsWith("/Leads/search")) {
        if (url.searchParams.has("criteria")) {
          return json({
            data: [{ id: "4444444444444444444", GCLID_Custom: "click-123-lookalike" }],
          });
        }
        return json({ data: [] });
      }
      if (url.pathname.endsWith("/Leads") && init?.method === "POST") {
        created = true;
        return json({ data: [{ status: "success", details: { id: "5555555555555555555" } }] });
      }
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    const result = await syncZohoWebsiteLead(paidLead(), { client });
    assert.equal(result.action, "created");
    assert.equal(result.id, "5555555555555555555");
    assert.equal(created, true);
  });

  test("rejects conflicting exact email and phone matches without mutating either record", async () => {
    installZohoEnvironment();
    let writeCalls = 0;
    const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = new URL(String(input));
      if (url.pathname.endsWith("/oauth/v2/token")) {
        return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
      }
      if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
      if (url.pathname.endsWith("/Leads/search")) {
        if (url.searchParams.has("email")) {
          return json({ data: [{ id: "6666666666666666666", Email: "aisha@example.com" }] });
        }
        if (url.searchParams.has("phone")) {
          return json({ data: [{ id: "7777777777777777777", Mobile: "+971501112233" }] });
        }
        return json({ data: [] });
      }
      if (init?.method === "POST" || init?.method === "PUT") writeCalls += 1;
      throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
    }) as typeof fetch;

    const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
    await assert.rejects(syncZohoWebsiteLead(paidLead(), { client }), (error) => {
      return error instanceof ZohoApiError && error.code === "AMBIGUOUS_DUPLICATE" && error.status === 409;
    });
    assert.equal(writeCalls, 0);
  });
});

test("conversion fetch rejects a missing or invalid canonical lead field value", async () => {
  const fetchMock = (async (input: URL | RequestInfo) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/oauth/v2/token")) {
      return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
    }
    if (url.pathname.endsWith("/settings/fields")) return json({ fields: FIELD_METADATA });
    if (url.pathname.endsWith("/Leads/8888888888888888888")) {
      return json({
        data: [{
          id: "8888888888888888888",
          GCLID_Custom: "click-123",
          Consent_Custom: true,
          Emitronix_Lead_ID: "person@example.com",
          Lead_Status: "Qualified",
        }],
      });
    }
    throw new Error(`Unexpected Zoho call ${url}`);
  }) as typeof fetch;
  const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
  await assert.rejects(
    fetchZohoConversionRecord("Leads", "8888888888888888888", "qualified_lead", {
      client,
      eventOccurredAt: NOW.toISOString(),
    }),
    (error) => error instanceof ZohoApiError && error.code === "INVALID_CANONICAL_LEAD_ID",
  );
});

test("conversion result writeback uses trigger:[] to prevent recursive Zoho workflows", async () => {
  let updateBody: { data?: unknown[]; trigger?: string[] } | undefined;
  const fetchMock = (async (input: URL | RequestInfo, init?: RequestInit) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/oauth/v2/token")) {
      return json({ access_token: "zoho-access", api_domain: "https://www.zohoapis.com", expires_in: 3600 });
    }
    if (url.pathname.endsWith("/Leads/8888888888888888888") && init?.method === "PUT") {
      updateBody = JSON.parse(String(init.body)) as { data?: unknown[]; trigger?: string[] };
      return json({ data: [{ status: "success", details: { id: "8888888888888888888" } }] });
    }
    throw new Error(`Unexpected Zoho call ${init?.method || "GET"} ${url}`);
  }) as typeof fetch;
  const client = new ZohoClient(CONFIG, fetchMock, () => NOW.getTime());
  const record: ZohoConversionRecord = {
    module: "Leads",
    recordId: "8888888888888888888",
    email: "aisha@example.com",
    eventTimestamp: NOW.toISOString(),
    clickId: { type: "gclid", value: "click-123" },
    adUserDataConsent: true,
    raw: {},
    fieldMap: {
      conversionUploaded: "Google_Conversion_Uploaded",
      conversionUploadStatus: "Google_Conversion_Upload_Status",
      conversionOrderId: "Google_Conversion_Order_ID",
    },
  };

  const result = await writeZohoConversionResult(
    record,
    {
      uploaded: true,
      uploadedAt: NOW.toISOString(),
      action: "Qualified Lead",
      value: 250,
      status: "confirmed",
      transactionId: "123e4567-e89b-42d3-a456-426614174000",
      requestId: "request-12345678",
    },
    { client },
  );
  assert.deepEqual(result, { updated: true });
  assert.deepEqual(updateBody?.trigger, []);
  assert.equal((updateBody?.data?.[0] as Record<string, unknown>).Google_Conversion_Uploaded, true);
});
