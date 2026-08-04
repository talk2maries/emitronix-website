import type { AttributionSnapshot, AttributionTouch, ConversionEventKey } from "./types";
import { isGoogleAdsAttribution, selectClickId } from "./attribution";
import { canonicalLeadTransactionId, normalizeEmail, normalizePhone, safeErrorMessage } from "./security";
import { allowedZohoApiDomain, zohoEnvironment, type ZohoEnvironment } from "./env";

type FetchLike = typeof fetch;

export type WebsiteLead = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  projectLocation?: string;
  message: string;
  pageUrl?: string;
  userAgent?: string;
  consent: boolean;
  leadId?: string;
  /** @deprecated Compatibility alias for pre-canonical-ID callers. */
  eventId?: string;
  kind?: "contact" | "blog" | "career";
  attribution?: AttributionSnapshot | null;
};

export type ZohoFieldMetadata = {
  id?: string;
  api_name: string;
  field_label?: string;
  display_label?: string;
  data_type?: string;
  length?: number;
  api_update?: boolean;
  operation_type?: { api_create?: boolean; api_update?: boolean };
  pick_list_values?: Array<{ display_value?: string; actual_value?: string }>;
};

export type ZohoLogicalField =
  | "leadSubSource"
  | "websiteSubmissionId"
  | "firstGclid"
  | "firstGbraid"
  | "firstWbraid"
  | "firstCampaignId"
  | "firstCampaignName"
  | "firstAdGroupId"
  | "firstKeyword"
  | "firstMatchType"
  | "firstDevice"
  | "firstNetwork"
  | "firstGadSource"
  | "firstGoogleAdsSource"
  | "firstPlacement"
  | "firstCreative"
  | "firstUtmSource"
  | "firstUtmMedium"
  | "firstUtmCampaign"
  | "firstUtmTerm"
  | "firstUtmContent"
  | "gclid"
  | "gbraid"
  | "wbraid"
  | "campaignId"
  | "campaignName"
  | "adGroupId"
  | "keyword"
  | "matchType"
  | "device"
  | "network"
  | "gadSource"
  | "googleAdsSource"
  | "placement"
  | "creative"
  | "utmSource"
  | "utmMedium"
  | "utmCampaign"
  | "utmTerm"
  | "utmContent"
  | "originalLandingPage"
  | "referringPage"
  | "firstVisitAt"
  | "latestVisitAt"
  | "leadQualificationAt"
  | "meetingBookedAt"
  | "quotationSubmittedAt"
  | "dealWonAt"
  | "adUserDataConsent"
  | "conversionUploaded"
  | "conversionUploadedAt"
  | "conversionAction"
  | "conversionValue"
  | "conversionUploadStatus"
  | "conversionError"
  | "conversionOrderId"
  | "dataManagerRequestId";

const logicalFieldLabels: Record<ZohoLogicalField, string[]> = {
  leadSubSource: ["Lead Sub Source", "Lead Sub-Source"],
  websiteSubmissionId: ["Emitronix Lead ID", "Website Lead ID", "Website Submission ID", "Website Event ID"],
  firstGclid: ["First Touch Google Click ID", "First Touch GCLID"],
  firstGbraid: ["First Touch GBRAID"],
  firstWbraid: ["First Touch WBRAID"],
  firstCampaignId: ["First Touch Google Ads Campaign ID"],
  firstCampaignName: ["First Touch Google Ads Campaign Name"],
  firstAdGroupId: ["First Touch Google Ads Ad Group ID"],
  firstKeyword: ["First Touch Google Ads Keyword"],
  firstMatchType: ["First Touch Google Ads Match Type"],
  firstDevice: ["First Touch Google Ads Device"],
  firstNetwork: ["First Touch Google Ads Network"],
  firstGadSource: ["First Touch GAD Source"],
  firstGoogleAdsSource: ["First Touch Google Ads Source"],
  firstPlacement: ["First Touch Google Ads Placement"],
  firstCreative: ["First Touch Google Ads Creative"],
  firstUtmSource: ["First Touch UTM Source"],
  firstUtmMedium: ["First Touch UTM Medium"],
  firstUtmCampaign: ["First Touch UTM Campaign"],
  firstUtmTerm: ["First Touch UTM Term"],
  firstUtmContent: ["First Touch UTM Content"],
  gclid: ["Google Click ID", "GCLID"],
  gbraid: ["GBRAID"],
  wbraid: ["WBRAID"],
  campaignId: ["Google Ads Campaign ID"],
  campaignName: ["Google Ads Campaign Name"],
  adGroupId: ["Google Ads Ad Group ID"],
  keyword: ["Google Ads Keyword"],
  matchType: ["Google Ads Match Type"],
  device: ["Google Ads Device"],
  network: ["Google Ads Network"],
  gadSource: ["GAD Source"],
  googleAdsSource: ["Google Ads Source", "Google Ads Traffic Source"],
  placement: ["Google Ads Placement"],
  creative: ["Google Ads Creative"],
  utmSource: ["UTM Source"],
  utmMedium: ["UTM Medium"],
  utmCampaign: ["UTM Campaign"],
  utmTerm: ["UTM Term"],
  utmContent: ["UTM Content"],
  originalLandingPage: ["Original Landing Page"],
  referringPage: ["Referring Page"],
  firstVisitAt: ["First Visit Date and Time", "First Visit Date Time"],
  latestVisitAt: ["Latest Visit Date and Time", "Latest Visit Date Time"],
  leadQualificationAt: ["Lead Qualification Date", "Lead Qualification Date and Time"],
  meetingBookedAt: ["Meeting Booked Date", "Meeting Booked Date and Time", "Site Visit Confirmed At"],
  quotationSubmittedAt: ["Quotation Submitted Date", "Quotation Submitted Date and Time"],
  dealWonAt: ["Deal Won Date", "Closed Won Date", "Closed Won Date and Time"],
  adUserDataConsent: ["Google Ads User Data Consent", "Ad User Data Consent"],
  conversionUploaded: ["Google Conversion Uploaded"],
  conversionUploadedAt: ["Google Conversion Uploaded At"],
  conversionAction: ["Google Conversion Action"],
  conversionValue: ["Google Conversion Value"],
  conversionUploadStatus: ["Google Conversion Upload Status"],
  conversionError: ["Google Conversion Error"],
  conversionOrderId: ["Google Conversion Order ID"],
  dataManagerRequestId: ["Google Data Manager Request ID"],
};

export type ZohoFieldMap = Partial<Record<ZohoLogicalField, string>>;

type Token = { accessToken: string; apiDomain: string; expiresAt: number };
type RequestOptions = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | undefined>;
  allowAmbiguousRetries?: boolean;
};

export class ZohoConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZohoConfigError";
  }
}

export class ZohoApiError extends Error {
  status?: number;
  code?: string;
  retryable: boolean;

  constructor(message: string, status?: number, code?: string, retryable = false) {
    super(message);
    this.name = "ZohoApiError";
    this.status = status;
    this.code = code;
    this.retryable = retryable;
  }
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function splitName(fullName: string) {
  const parts = clean(fullName, 120).split(" ").filter(Boolean);
  return {
    firstName: parts.length > 1 ? parts.slice(0, -1).join(" ") : "",
    lastName: parts.at(-1) || "Website Enquiry",
  };
}

function normalizeLabel(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function parseConfiguredMap(raw: string | undefined) {
  if (!raw) return {} as ZohoFieldMap;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: ZohoFieldMap = {};
    for (const logical of Object.keys(logicalFieldLabels) as ZohoLogicalField[]) {
      const apiName = parsed[logical];
      if (typeof apiName === "string" && /^[A-Za-z][A-Za-z0-9_]*$/.test(apiName)) result[logical] = apiName;
    }
    return result;
  } catch {
    throw new ZohoConfigError("ZOHO field mapping JSON is invalid.");
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfter(value: string | null) {
  if (!value) return undefined;
  const seconds = Number(value);
  return Number.isFinite(seconds) ? Math.max(0, seconds * 1000) : undefined;
}

function responseCode(payload: unknown) {
  if (!payload || typeof payload !== "object") return undefined;
  const object = payload as { code?: string; data?: Array<{ code?: string }> };
  return object.code || object.data?.[0]?.code;
}

export class ZohoClient {
  private token: Token | null = null;
  private fieldCache = new Map<string, { expiresAt: number; fields: ZohoFieldMetadata[]; map: ZohoFieldMap }>();

  constructor(
    private readonly config: ZohoEnvironment,
    private readonly fetchImpl: FetchLike = fetch,
    private readonly now: () => number = Date.now,
  ) {}

  get environment() {
    return this.config;
  }

  private async accessToken(force = false) {
    const now = this.now();
    if (!force && this.token && this.token.expiresAt > now + 120_000) return this.token;
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.config.accountsUrl}/oauth/v2/token`, {
        method: "POST",
        redirect: "error",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.config.refreshToken,
        }),
        signal: AbortSignal.timeout(12_000),
      });
    } catch (error) {
      throw new ZohoApiError(`Zoho OAuth request failed: ${safeErrorMessage(error)}`, undefined, undefined, true);
    }
    const payload = (await response.json().catch(() => ({}))) as {
      access_token?: string;
      api_domain?: string;
      expires_in?: number;
      error?: string;
      error_description?: string;
    };
    const apiDomain = payload.api_domain ? allowedZohoApiDomain(payload.api_domain) : null;
    if (!response.ok || !payload.access_token || !apiDomain) {
      throw new ZohoApiError(
        payload.error_description || payload.error || "Unable to refresh Zoho access token.",
        response.status,
        payload.error,
        response.status === 429 || response.status >= 500,
      );
    }
    const expiresInSeconds = Math.max(1, Number(payload.expires_in || 3600));
    this.token = {
      accessToken: payload.access_token,
      apiDomain,
      expiresAt: now + Math.max(1, expiresInSeconds - Math.min(120, Math.floor(expiresInSeconds / 2))) * 1000,
    };
    return this.token;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    let lastError: ZohoApiError | null = null;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const token = await this.accessToken(attempt > 0 && lastError?.status === 401);
      const url = new URL(`${token.apiDomain}/crm/v8/${path.replace(/^\/+/, "")}`);
      for (const [key, value] of Object.entries(options.query || {})) if (value !== undefined) url.searchParams.set(key, value);
      let response: Response;
      try {
        response = await this.fetchImpl(url, {
          method: options.method || "GET",
          redirect: "error",
          headers: {
            Authorization: `Zoho-oauthtoken ${token.accessToken}`,
            ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
          },
          ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
          signal: AbortSignal.timeout(15_000),
        });
      } catch (error) {
        lastError = new ZohoApiError(`Zoho request failed: ${safeErrorMessage(error)}`, undefined, undefined, true);
        if (options.allowAmbiguousRetries === false) {
          lastError.code = "AMBIGUOUS_WRITE";
          throw lastError;
        }
        if (attempt < 3) {
          await delay(500 * 2 ** attempt);
          continue;
        }
        throw lastError;
      }
      if (response.status === 204) return {} as T;
      const payload = (await response.json().catch(() => ({}))) as T & { message?: string; code?: string };
      if (response.ok) return payload;
      const code = responseCode(payload);
      const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
      lastError = new ZohoApiError(payload.message || "Zoho CRM rejected the request.", response.status, code, retryable);
      if (response.status === 401) this.token = null;
      if (retryable && options.allowAmbiguousRetries === false) throw lastError;
      if (!retryable && response.status !== 401) throw lastError;
      if (attempt < 3) {
        const retryAfter = parseRetryAfter(response.headers.get("retry-after"));
        await delay(retryAfter ?? 500 * 2 ** attempt);
      }
    }
    throw lastError || new ZohoApiError("Zoho request failed.");
  }

  async fields(module: string) {
    const cached = this.fieldCache.get(module);
    if (cached && cached.expiresAt > this.now()) return cached;
    const payload = await this.request<{ fields?: ZohoFieldMetadata[] }>("settings/fields", {
      query: { module, type: "all" },
    });
    const fields = Array.isArray(payload.fields) ? payload.fields : [];
    const configured = parseConfiguredMap(module === "Deals" ? this.config.dealFieldMapJson : this.config.leadFieldMapJson);
    const actualNames = new Set(fields.map((field) => field.api_name));
    const map: ZohoFieldMap = {};
    for (const logical of Object.keys(logicalFieldLabels) as ZohoLogicalField[]) {
      const override = configured[logical];
      if (override) {
        if (!actualNames.has(override)) throw new ZohoConfigError(`Configured Zoho field ${override} was not found in ${module}.`);
        const metadata = fields.find((field) => field.api_name === override);
        if (metadata?.api_update === false || metadata?.operation_type?.api_update === false) {
          throw new ZohoConfigError(`Configured Zoho field ${override} is not API-updatable in ${module}.`);
        }
        map[logical] = override;
        continue;
      }
      const acceptedLabels = logicalFieldLabels[logical].map(normalizeLabel);
      const match = fields.find(
        (field) =>
          field.api_update !== false &&
          field.operation_type?.api_update !== false &&
          acceptedLabels.includes(normalizeLabel(field.field_label || field.display_label || field.api_name)),
      );
      if (match) map[logical] = match.api_name;
    }
    const result = { fields, map, expiresAt: this.now() + 60 * 60_000 };
    this.fieldCache.set(module, result);
    return result;
  }

  async getRecord(module: string, recordId: string) {
    if (!/^\d{6,30}$/.test(recordId)) throw new ZohoApiError("Invalid Zoho record ID.", 400, "INVALID_RECORD_ID");
    const payload = await this.request<{ data?: Array<Record<string, unknown>> }>(`${module}/${recordId}`);
    const record = payload.data?.[0];
    if (!record) throw new ZohoApiError("Zoho record was not found.", 404, "RECORD_NOT_FOUND");
    return record;
  }

  async search(module: string, query: { email?: string; phone?: string; criteria?: string }) {
    const payload = await this.request<{ data?: Array<Record<string, unknown>> }>(`${module}/search`, {
      query,
    });
    return payload.data || [];
  }

  async createRecord(module: string, record: Record<string, unknown>) {
    const payload = await this.request<{
      data?: Array<{ status?: string; code?: string; message?: string; details?: { id?: string } }>;
    }>(module, {
      method: "POST",
      body: { data: [record], trigger: ["workflow"] },
      allowAmbiguousRetries: false,
    });
    const result = payload.data?.[0];
    if (result?.status !== "success") {
      throw new ZohoApiError(result?.message || "Zoho CRM rejected the record.", 400, result?.code);
    }
    return result.details?.id || "";
  }

  async updateRecord(
    module: string,
    recordId: string,
    record: Record<string, unknown>,
    options: { triggerWorkflows?: boolean } = {},
  ) {
    const payload = await this.request<{
      data?: Array<{ status?: string; code?: string; message?: string; details?: { id?: string } }>;
    }>(`${module}/${recordId}`, {
      method: "PUT",
      body: {
        data: [{ id: recordId, ...record }],
        trigger: options.triggerWorkflows === false ? [] : ["workflow"],
      },
    });
    const result = payload.data?.[0];
    if (result?.status !== "success") {
      throw new ZohoApiError(result?.message || "Zoho CRM rejected the update.", 400, result?.code);
    }
    return result.details?.id || recordId;
  }
}

let defaultClient: ZohoClient | null = null;

export function zohoClient(options: { env?: NodeJS.ProcessEnv; fetchImpl?: FetchLike; now?: () => number } = {}) {
  if (options.env || options.fetchImpl || options.now) {
    return new ZohoClient(zohoEnvironment(options.env), options.fetchImpl, options.now);
  }
  if (!defaultClient) defaultClient = new ZohoClient(zohoEnvironment());
  return defaultClient;
}

function attributionLines(snapshot: AttributionSnapshot | null | undefined) {
  if (!snapshot) return [];
  const first = snapshot.firstTouch;
  const latest = snapshot.latestTouch;
  return [
    `Attribution: ${isGoogleAdsAttribution(snapshot) ? "Google Ads" : "campaign"}`,
    first.campaignName || first.utmCampaign ? `First-touch campaign: ${first.campaignName || first.utmCampaign}` : "",
    first.keyword || first.utmTerm ? `First-touch keyword: ${first.keyword || first.utmTerm}` : "",
    latest.campaignName || latest.utmCampaign ? `Latest-touch campaign: ${latest.campaignName || latest.utmCampaign}` : "",
    latest.keyword || latest.utmTerm ? `Latest-touch keyword: ${latest.keyword || latest.utmTerm}` : "",
    `Original landing page: ${first.landingPageUrl}`,
    first.referringUrl ? `Referring page: ${first.referringUrl}` : "",
    `First visit: ${first.visitedAt}`,
    `Latest attributed visit: ${latest.visitedAt}`,
    `Advertising consent: ${snapshot.consent.adUserData ? "granted" : "not granted"}`,
  ].filter(Boolean);
}

export function leadDescription(lead: WebsiteLead) {
  const leadId = lead.leadId || lead.eventId;
  return [
    lead.service ? `Service required: ${clean(lead.service, 120)}` : "",
    lead.projectLocation ? `Project location: ${clean(lead.projectLocation, 180)}` : "",
    `Project details: ${clean(lead.message, 3000)}`,
    lead.pageUrl ? `Submitted from: ${clean(lead.pageUrl, 300)}` : "",
    leadId ? `Emitronix lead ID: ${clean(leadId, 64)}` : "",
    ...attributionLines(lead.attribution),
    lead.consent ? "Consent: Customer agreed to submit this enquiry to Emitronix." : "",
  ]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 30_000);
}

function setMapped(record: Record<string, unknown>, map: ZohoFieldMap, logical: ZohoLogicalField, value: unknown) {
  const field = map[logical];
  if (field && value !== undefined && value !== null && value !== "") record[field] = value;
}

export function attributionRecordFields(snapshot: AttributionSnapshot | null | undefined, map: ZohoFieldMap) {
  const record: Record<string, unknown> = {};
  if (!snapshot) return record;
  const touch = selectClickId(snapshot.latestTouch)
    ? snapshot.latestTouch
    : selectClickId(snapshot.firstTouch)
      ? snapshot.firstTouch
      : snapshot.latestTouch;
  setMapped(record, map, "gclid", touch.gclid);
  setMapped(record, map, "gbraid", touch.gbraid);
  setMapped(record, map, "wbraid", touch.wbraid);
  setMapped(record, map, "campaignId", touch.campaignId);
  setMapped(record, map, "campaignName", touch.campaignName || touch.utmCampaign);
  setMapped(record, map, "adGroupId", touch.adGroupId);
  setMapped(record, map, "keyword", touch.keyword);
  setMapped(record, map, "matchType", touch.matchType);
  setMapped(record, map, "device", touch.device);
  setMapped(record, map, "network", touch.network);
  setMapped(record, map, "gadSource", touch.gadSource);
  setMapped(record, map, "googleAdsSource", touch.googleAdsSource);
  setMapped(record, map, "placement", touch.placement);
  setMapped(record, map, "creative", touch.creative);
  setMapped(record, map, "utmSource", touch.utmSource);
  setMapped(record, map, "utmMedium", touch.utmMedium);
  setMapped(record, map, "utmCampaign", touch.utmCampaign);
  setMapped(record, map, "utmTerm", touch.utmTerm);
  setMapped(record, map, "utmContent", touch.utmContent);
  const first = snapshot.firstTouch;
  setMapped(record, map, "firstGclid", first.gclid);
  setMapped(record, map, "firstGbraid", first.gbraid);
  setMapped(record, map, "firstWbraid", first.wbraid);
  setMapped(record, map, "firstCampaignId", first.campaignId);
  setMapped(record, map, "firstCampaignName", first.campaignName || first.utmCampaign);
  setMapped(record, map, "firstAdGroupId", first.adGroupId);
  setMapped(record, map, "firstKeyword", first.keyword);
  setMapped(record, map, "firstMatchType", first.matchType);
  setMapped(record, map, "firstDevice", first.device);
  setMapped(record, map, "firstNetwork", first.network);
  setMapped(record, map, "firstGadSource", first.gadSource);
  setMapped(record, map, "firstGoogleAdsSource", first.googleAdsSource);
  setMapped(record, map, "firstPlacement", first.placement);
  setMapped(record, map, "firstCreative", first.creative);
  setMapped(record, map, "firstUtmSource", first.utmSource);
  setMapped(record, map, "firstUtmMedium", first.utmMedium);
  setMapped(record, map, "firstUtmCampaign", first.utmCampaign);
  setMapped(record, map, "firstUtmTerm", first.utmTerm);
  setMapped(record, map, "firstUtmContent", first.utmContent);
  setMapped(record, map, "originalLandingPage", snapshot.firstTouch.landingPageUrl);
  setMapped(record, map, "referringPage", snapshot.firstTouch.referringUrl);
  setMapped(record, map, "firstVisitAt", snapshot.firstTouch.visitedAt);
  setMapped(record, map, "latestVisitAt", snapshot.latestTouch.visitedAt);
  setMapped(record, map, "adUserDataConsent", snapshot.consent.adUserData);
  return record;
}

async function findExistingLead(client: ZohoClient, lead: WebsiteLead, map: ZohoFieldMap) {
  const matches: Array<{ basis: string; record: Record<string, unknown> }> = [];
  if (lead.email) {
    const expectedEmail = normalizeEmail(lead.email);
    for (const record of await client.search("Leads", { email: lead.email })) {
      if (normalizeEmail(clean(record.Email, 180)) === expectedEmail) matches.push({ basis: "email", record });
    }
  }
  if (lead.phone) {
    const expectedPhone = normalizePhone(lead.phone);
    for (const record of await client.search("Leads", { phone: lead.phone })) {
      const candidatePhone = normalizePhone(clean(record.Mobile || record.Phone, 30));
      if (expectedPhone && candidatePhone === expectedPhone) matches.push({ basis: "phone", record });
    }
  }
  const clickId = lead.attribution
    ? selectClickId(lead.attribution.latestTouch) || selectClickId(lead.attribution.firstTouch)
    : null;
  const clickField = clickId ? map[clickId.type] : undefined;
  if (clickId && clickField) {
    for (const record of await client.search("Leads", { criteria: `(${clickField}:equals:${clickId.value})` })) {
      if (clean(record[clickField], 500) === clickId.value) matches.push({ basis: clickId.type, record });
    }
  }
  const matchesById = new Map<string, { basis: Set<string>; record: Record<string, unknown> }>();
  for (const match of matches) {
    const id = String(match.record.id || "");
    if (!/^\d{6,30}$/.test(id)) continue;
    const current = matchesById.get(id) || { basis: new Set<string>(), record: match.record };
    current.basis.add(match.basis);
    matchesById.set(id, current);
  }
  if (matchesById.size > 1) {
    throw new ZohoApiError(
      "Conflicting CRM identity matches require manual review; no Lead was changed.",
      409,
      "AMBIGUOUS_DUPLICATE",
    );
  }
  const id = matchesById.keys().next().value as string | undefined;
  return id ? client.getRecord("Leads", id) : null;
}

const immutableAttributionFields = new Set<ZohoLogicalField>([
  "firstGclid",
  "firstGbraid",
  "firstWbraid",
  "firstCampaignId",
  "firstCampaignName",
  "firstAdGroupId",
  "firstKeyword",
  "firstMatchType",
  "firstDevice",
  "firstNetwork",
  "firstGadSource",
  "firstGoogleAdsSource",
  "firstPlacement",
  "firstCreative",
  "firstUtmSource",
  "firstUtmMedium",
  "firstUtmCampaign",
  "firstUtmTerm",
  "firstUtmContent",
  "originalLandingPage",
  "referringPage",
  "firstVisitAt",
]);

function attributionUpdateForExistingLead(
  snapshot: AttributionSnapshot | null | undefined,
  map: ZohoFieldMap,
  existing: Record<string, unknown>,
) {
  const proposed = attributionRecordFields(snapshot, map);
  const update: Record<string, unknown> = {};
  for (const logical of Object.keys(map) as ZohoLogicalField[]) {
    const field = map[logical];
    if (!field || !(field in proposed)) continue;
    const existingValue = existing[field];
    if (immutableAttributionFields.has(logical)) {
      if (existingValue === undefined || existingValue === null || existingValue === "") update[field] = proposed[field];
      continue;
    }
    if (logical === "adUserDataConsent") {
      if (proposed[field] === true && existingValue !== true) update[field] = true;
      continue;
    }
    update[field] = proposed[field];
  }
  return update;
}

function mergedDescription(existing: unknown, incoming: string) {
  const current = typeof existing === "string" ? existing.trim() : "";
  if (!current) return incoming;
  if (current.includes(incoming)) return current.slice(0, 30_000);
  return `${current}\n\n--- New website enquiry ---\n\n${incoming}`.slice(-30_000);
}

function canonicalLeadUpdateForExisting(
  existing: Record<string, unknown>,
  field: string,
  leadId: string,
  eligiblePaidTouch: boolean,
) {
  const current = clean(existing[field], 200);
  return !current || eligiblePaidTouch ? { [field]: leadId } : {};
}

export async function syncZohoWebsiteLead(
  lead: WebsiteLead,
  options: { client?: ZohoClient } = {},
) {
  const client = options.client || zohoClient();
  const config = client.environment;
  const { map } = await client.fields("Leads");
  if (!map.websiteSubmissionId) {
    throw new ZohoConfigError(
      "Zoho Leads requires an API-updatable Emitronix Lead ID field mapped as websiteSubmissionId.",
    );
  }
  const leadId = canonicalLeadTransactionId(lead.leadId || lead.eventId || "");
  const existing = await findExistingLead(client, lead, map);
  const description = leadDescription(lead);
  const attributionFields = attributionRecordFields(lead.attribution, map);
  const paid = isGoogleAdsAttribution(lead.attribution || null);
  const eligiblePaidTouch = paid && lead.attribution?.consent.adUserData === true;

  if (existing) {
    const id = String(existing.id || "");
    if (!id) throw new ZohoApiError("Existing Zoho lead is missing its record ID.");
    const subSourceField = paid ? map.leadSubSource : undefined;
    await client.updateRecord("Leads", id, {
      ...attributionUpdateForExistingLead(lead.attribution, map, existing),
      ...canonicalLeadUpdateForExisting(existing, map.websiteSubmissionId, leadId, eligiblePaidTouch),
      ...(subSourceField && !existing[subSourceField] ? { [subSourceField]: config.paidLeadSubSource } : {}),
      Description: mergedDescription(existing.Description, description),
      ...(!existing.Phone && lead.phone ? { Phone: clean(lead.phone, 30) } : {}),
      ...(!existing.Mobile && lead.phone ? { Mobile: clean(lead.phone, 30) } : {}),
    });
    return { id, duplicate: true, action: "updated" as const, fieldMap: map };
  }

  const { firstName, lastName } = splitName(lead.name);
  const record: Record<string, unknown> = {
    Last_Name: lastName,
    Company: clean(lead.company, 180) || "Website Enquiry - Emitronix",
    Email: clean(lead.email, 180).toLowerCase(),
    Lead_Source: paid ? config.paidLeadSource : config.leadSource,
    Description: description,
    ...attributionFields,
  };
  if (firstName) record.First_Name = firstName;
  if (lead.phone) {
    record.Phone = clean(lead.phone, 30);
    record.Mobile = clean(lead.phone, 30);
  }
  if (paid) setMapped(record, map, "leadSubSource", config.paidLeadSubSource);
  setMapped(record, map, "websiteSubmissionId", leadId);

  try {
    const id = await client.createRecord("Leads", record);
    return { id, duplicate: false, action: "created" as const, fieldMap: map };
  } catch (error) {
    if (!(error instanceof ZohoApiError) || error.code !== "DUPLICATE_DATA") throw error;
    const duplicate = await findExistingLead(client, lead, map);
    const id = String(duplicate?.id || "");
    if (!id) throw error;
    const subSourceField = paid ? map.leadSubSource : undefined;
    await client.updateRecord("Leads", id, {
      ...attributionUpdateForExistingLead(lead.attribution, map, duplicate || {}),
      ...canonicalLeadUpdateForExisting(duplicate || {}, map.websiteSubmissionId, leadId, eligiblePaidTouch),
      ...(subSourceField && !duplicate?.[subSourceField] ? { [subSourceField]: config.paidLeadSubSource } : {}),
      Description: mergedDescription(duplicate?.Description, description),
    });
    return { id, duplicate: true, action: "updated" as const, fieldMap: map };
  }
}

export type ZohoConversionRecord = {
  module: "Leads" | "Deals";
  recordId: string;
  email?: string;
  phone?: string;
  leadStatus?: string;
  dealStage?: string;
  actualDealAmount?: number;
  eventTimestamp: string;
  clickId: ReturnType<typeof selectClickId>;
  adUserDataConsent: boolean;
  campaignId?: string;
  campaignName?: string;
  sourceSubmissionId?: string;
  raw: Record<string, unknown>;
  fieldMap: ZohoFieldMap;
};

function mappedValue(record: Record<string, unknown>, map: ZohoFieldMap, logical: ZohoLogicalField) {
  const field = map[logical];
  return field ? record[field] : undefined;
}

function mappedCanonicalLeadId(record: Record<string, unknown>, map: ZohoFieldMap) {
  const value = clean(mappedValue(record, map, "websiteSubmissionId"), 200);
  if (!value) return undefined;
  try {
    return canonicalLeadTransactionId(value);
  } catch {
    throw new ZohoApiError(
      "Zoho record contains an invalid Emitronix Lead ID.",
      409,
      "INVALID_CANONICAL_LEAD_ID",
    );
  }
}

export async function fetchZohoConversionRecord(
  module: "Leads" | "Deals",
  recordId: string,
  eventKey: ConversionEventKey,
  options: { client?: ZohoClient; eventOccurredAt?: string } = {},
): Promise<ZohoConversionRecord> {
  const client = options.client || zohoClient();
  const [{ map }, record] = await Promise.all([client.fields(module), client.getRecord(module, recordId)]);
  if (!map.websiteSubmissionId) {
    throw new ZohoConfigError(
      `Zoho ${module} requires an API-updatable Emitronix Lead ID field mapped as websiteSubmissionId.`,
    );
  }
  const touch: Pick<AttributionTouch, "gclid" | "gbraid" | "wbraid"> = {
    gclid: clean(mappedValue(record, map, "gclid"), 500) || undefined,
    gbraid: clean(mappedValue(record, map, "gbraid"), 500) || undefined,
    wbraid: clean(mappedValue(record, map, "wbraid"), 500) || undefined,
  };
  const timestampFieldByEvent: Record<ConversionEventKey, ZohoLogicalField> = {
    qualified_lead: "leadQualificationAt",
    meeting_booked: "meetingBookedAt",
    quotation_submitted: "quotationSubmittedAt",
    deal_won: "dealWonAt",
  };
  const crmEventTimestamp = clean(mappedValue(record, map, timestampFieldByEvent[eventKey]), 60);
  const signedEventTimestamp = clean(options.eventOccurredAt, 60);
  if (
    crmEventTimestamp &&
    signedEventTimestamp &&
    Math.abs(Date.parse(crmEventTimestamp) - Date.parse(signedEventTimestamp)) > 5 * 60_000
  ) {
    throw new ZohoApiError(
      "The signed milestone time does not match the CRM milestone field.",
      409,
      "CONVERSION_DATE_MISMATCH",
    );
  }
  const eventTimestamp = crmEventTimestamp || signedEventTimestamp;
  if (!eventTimestamp || !Number.isFinite(Date.parse(eventTimestamp))) {
    throw new ZohoApiError("Zoho record has no valid conversion timestamp.", 400, "INVALID_CONVERSION_DATE");
  }
  const consentValue = mappedValue(record, map, "adUserDataConsent");
  return {
    module,
    recordId,
    email: clean(record.Email, 180) || undefined,
    phone: clean(record.Mobile || record.Phone, 30) || undefined,
    leadStatus: clean(record.Lead_Status, 120) || undefined,
    dealStage: clean(record.Stage, 120) || undefined,
    actualDealAmount: Number(record.Amount || 0) || undefined,
    eventTimestamp: new Date(eventTimestamp).toISOString(),
    clickId: selectClickId(touch),
    adUserDataConsent: consentValue === true || String(consentValue).toLowerCase() === "true" || consentValue === "Granted",
    campaignId: clean(mappedValue(record, map, "campaignId"), 160) || undefined,
    campaignName: clean(mappedValue(record, map, "campaignName"), 300) || undefined,
    sourceSubmissionId: mappedCanonicalLeadId(record, map),
    raw: record,
    fieldMap: map,
  };
}

export async function writeZohoConversionResult(
  record: ZohoConversionRecord,
  result: {
    uploaded: boolean;
    uploadedAt?: string;
    action: string;
    value: number;
    status: string;
    error?: string;
    transactionId: string;
    requestId?: string;
  },
  options: { client?: ZohoClient } = {},
) {
  const update: Record<string, unknown> = {};
  setMapped(update, record.fieldMap, "conversionUploaded", result.uploaded);
  setMapped(update, record.fieldMap, "conversionUploadedAt", result.uploadedAt);
  setMapped(update, record.fieldMap, "conversionAction", result.action);
  setMapped(update, record.fieldMap, "conversionValue", result.value);
  setMapped(update, record.fieldMap, "conversionUploadStatus", result.status);
  if (record.fieldMap.conversionError) {
    update[record.fieldMap.conversionError] = result.error ? safeErrorMessage(result.error, 1000) : null;
  }
  setMapped(update, record.fieldMap, "conversionOrderId", result.transactionId);
  setMapped(update, record.fieldMap, "dataManagerRequestId", result.requestId);
  if (!Object.keys(update).length) return { updated: false, reason: "No conversion result fields are configured." };
  const client = options.client || zohoClient();
  await client.updateRecord(record.module, record.recordId, update, { triggerWorkflows: false });
  return { updated: true };
}

export function resetZohoClientForTests() {
  defaultClient = null;
}
