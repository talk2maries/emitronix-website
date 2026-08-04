import { ATTRIBUTION_VERSION, type AttributionSnapshot, type AttributionTouch, type SelectedClickId } from "./types";

export const ATTRIBUTION_STORAGE_KEY = "emitronix_google_ads_attribution_v1";
export const ATTRIBUTION_UPDATED_EVENT = "emitronix:attribution-updated";
export const CONSENT_UPDATED_EVENT = "emitronix:consent-updated";
export const DEFAULT_ATTRIBUTION_DAYS = 90;

const PARAM_LIMITS = {
  clickId: 500,
  identifier: 160,
  text: 300,
  url: 1200,
};

const aliases = {
  campaignId: ["campaignid", "campaign_id", "gad_campaignid"],
  campaignName: ["campaign_name"],
  adGroupId: ["adgroupid", "ad_group_id"],
  keyword: ["keyword"],
  matchType: ["matchtype", "match_type"],
  device: ["device"],
  network: ["network"],
  placement: ["placement"],
  creative: ["creative"],
  googleAdsSource: ["google_ads_source", "ad_source"],
} as const;

const recognizedParams = new Set([
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "campaignid",
  "campaign_id",
  "gad_campaignid",
  "campaign_name",
  "adgroupid",
  "ad_group_id",
  "keyword",
  "matchtype",
  "match_type",
  "device",
  "network",
  "placement",
  "creative",
  "google_ads_source",
  "ad_source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  return normalized ? normalized.slice(0, maxLength) : undefined;
}

function cleanClickId(value: unknown) {
  const normalized = clean(value, PARAM_LIMITS.clickId);
  if (!normalized || /\s/.test(normalized) || !/^[A-Za-z0-9._~+-]+$/.test(normalized)) return undefined;
  return normalized;
}

function firstParam(params: URLSearchParams, names: readonly string[], maxLength = PARAM_LIMITS.text) {
  for (const name of names) {
    const value = clean(params.get(name), maxLength);
    if (value) return value;
  }
  return undefined;
}

function safeLandingPage(input: URL) {
  const sanitized = new URL(input.origin + input.pathname);
  for (const [key, value] of input.searchParams.entries()) {
    if (recognizedParams.has(key.toLowerCase())) {
      sanitized.searchParams.append(key.toLowerCase(), value.slice(0, PARAM_LIMITS.text));
    }
  }
  return sanitized.toString().slice(0, PARAM_LIMITS.url);
}

function safeReferrer(input: string | undefined) {
  const value = clean(input, PARAM_LIMITS.url);
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return `${url.origin}${url.pathname}`.slice(0, PARAM_LIMITS.url);
  } catch {
    return undefined;
  }
}

export function captureAttributionTouch(
  pageUrl: string,
  referringUrl: string | undefined,
  now = new Date(),
): AttributionTouch | null {
  let url: URL;
  try {
    url = new URL(pageUrl);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const params = url.searchParams;
  const gclid = cleanClickId(params.get("gclid"));
  const gbraid = cleanClickId(params.get("gbraid"));
  const wbraid = cleanClickId(params.get("wbraid"));
  const gadSource = clean(params.get("gad_source"), PARAM_LIMITS.identifier);
  const utmSource = clean(params.get("utm_source"), PARAM_LIMITS.text);
  const utmMedium = clean(params.get("utm_medium"), PARAM_LIMITS.text);
  const utmCampaign = clean(params.get("utm_campaign"), PARAM_LIMITS.text);
  const utmTerm = clean(params.get("utm_term"), PARAM_LIMITS.text);
  const utmContent = clean(params.get("utm_content"), PARAM_LIMITS.text);
  const campaignId = firstParam(params, aliases.campaignId, PARAM_LIMITS.identifier);
  const campaignName = firstParam(params, aliases.campaignName) || utmCampaign;
  const adGroupId = firstParam(params, aliases.adGroupId, PARAM_LIMITS.identifier);
  const keyword = firstParam(params, aliases.keyword);
  const matchType = firstParam(params, aliases.matchType, PARAM_LIMITS.identifier);
  const device = firstParam(params, aliases.device, PARAM_LIMITS.identifier);
  const network = firstParam(params, aliases.network, PARAM_LIMITS.identifier);
  const placement = firstParam(params, aliases.placement);
  const creative = firstParam(params, aliases.creative, PARAM_LIMITS.identifier);
  const explicitAdsSource = firstParam(params, aliases.googleAdsSource, PARAM_LIMITS.identifier);
  const googleAdsSource =
    explicitAdsSource || gclid || gbraid || wbraid || gadSource || utmSource?.toLowerCase().includes("google")
      ? explicitAdsSource || "google_ads"
      : undefined;

  const hasAttribution = Boolean(
    gclid ||
      gbraid ||
      wbraid ||
      gadSource ||
      campaignId ||
      adGroupId ||
      keyword ||
      utmSource ||
      utmMedium ||
      utmCampaign ||
      utmTerm ||
      utmContent,
  );

  if (!hasAttribution) return null;

  return {
    ...(gclid ? { gclid } : {}),
    ...(gbraid ? { gbraid } : {}),
    ...(wbraid ? { wbraid } : {}),
    ...(gadSource ? { gadSource } : {}),
    ...(campaignId ? { campaignId } : {}),
    ...(campaignName ? { campaignName } : {}),
    ...(adGroupId ? { adGroupId } : {}),
    ...(keyword ? { keyword } : {}),
    ...(matchType ? { matchType } : {}),
    ...(device ? { device } : {}),
    ...(network ? { network } : {}),
    ...(placement ? { placement } : {}),
    ...(creative ? { creative } : {}),
    ...(googleAdsSource ? { googleAdsSource } : {}),
    ...(utmSource ? { utmSource } : {}),
    ...(utmMedium ? { utmMedium } : {}),
    ...(utmCampaign ? { utmCampaign } : {}),
    ...(utmTerm ? { utmTerm } : {}),
    ...(utmContent ? { utmContent } : {}),
    landingPageUrl: safeLandingPage(url),
    ...(safeReferrer(referringUrl) ? { referringUrl: safeReferrer(referringUrl) } : {}),
    visitedAt: now.toISOString(),
  };
}

export function mergeAttribution(
  current: AttributionSnapshot | null,
  touch: AttributionTouch,
  consent: AttributionSnapshot["consent"],
  now = new Date(),
  maxAgeDays = DEFAULT_ATTRIBUTION_DAYS,
): AttributionSnapshot {
  const expiry = new Date(now.getTime() + Math.max(1, Math.min(180, maxAgeDays)) * 86_400_000).toISOString();
  const hasValidCurrent = Boolean(current && new Date(current.expiresAt).getTime() > now.getTime());

  return {
    version: ATTRIBUTION_VERSION,
    firstTouch: hasValidCurrent ? current!.firstTouch : touch,
    latestTouch: touch,
    expiresAt: expiry,
    consent,
  };
}

function sanitizeTouch(input: unknown, now: Date): AttributionTouch | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  const landingPageUrl = clean(value.landingPageUrl, PARAM_LIMITS.url);
  const visitedAt = clean(value.visitedAt, 40);
  if (!landingPageUrl || !visitedAt || !Number.isFinite(Date.parse(visitedAt))) return null;
  if (Date.parse(visitedAt) > now.getTime() + 5 * 60_000) return null;

  let landing: URL;
  try {
    landing = new URL(landingPageUrl);
  } catch {
    return null;
  }
  if (landing.protocol !== "https:" && landing.protocol !== "http:") return null;

  const touch: AttributionTouch = {
    landingPageUrl: safeLandingPage(landing),
    visitedAt: new Date(visitedAt).toISOString(),
  };
  const clickFields = ["gclid", "gbraid", "wbraid"] as const;
  for (const field of clickFields) {
    const cleaned = cleanClickId(value[field]);
    if (cleaned) touch[field] = cleaned;
  }
  const textFields = [
    "gadSource",
    "campaignId",
    "campaignName",
    "adGroupId",
    "keyword",
    "matchType",
    "device",
    "network",
    "placement",
    "creative",
    "googleAdsSource",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmTerm",
    "utmContent",
  ] as const;
  for (const field of textFields) {
    const cleaned = clean(value[field], PARAM_LIMITS.text);
    if (cleaned) touch[field] = cleaned;
  }
  const referrer = safeReferrer(clean(value.referringUrl, PARAM_LIMITS.url));
  if (referrer) touch.referringUrl = referrer;
  return touch;
}

export function sanitizeAttributionSnapshot(input: unknown, now = new Date()): AttributionSnapshot | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  if (value.version !== ATTRIBUTION_VERSION) return null;
  const firstTouch = sanitizeTouch(value.firstTouch, now);
  const latestTouch = sanitizeTouch(value.latestTouch, now);
  const expiresAt = clean(value.expiresAt, 40);
  const consentValue = value.consent;
  if (!firstTouch || !latestTouch || !expiresAt || !Number.isFinite(Date.parse(expiresAt))) return null;
  if (Date.parse(expiresAt) <= now.getTime()) return null;
  if (Date.parse(expiresAt) > now.getTime() + 181 * 86_400_000) return null;
  if (Date.parse(firstTouch.visitedAt) > Date.parse(latestTouch.visitedAt)) return null;
  if (!consentValue || typeof consentValue !== "object" || Array.isArray(consentValue)) return null;
  const consentObject = consentValue as Record<string, unknown>;
  const updatedAt = clean(consentObject.updatedAt, 40);
  const consent = {
    marketing: consentObject.marketing === true,
    adUserData: consentObject.adUserData === true,
    ...(clean(consentObject.version, 80) ? { version: clean(consentObject.version, 80) } : {}),
    ...(updatedAt && Number.isFinite(Date.parse(updatedAt)) ? { updatedAt: new Date(updatedAt).toISOString() } : {}),
  };
  if (!consent.marketing || !consent.adUserData) return null;

  return {
    version: ATTRIBUTION_VERSION,
    firstTouch,
    latestTouch,
    expiresAt: new Date(expiresAt).toISOString(),
    consent,
  };
}

export function selectClickId(touch: Pick<AttributionTouch, "gclid" | "gbraid" | "wbraid">): SelectedClickId | null {
  if (touch.gclid) return { type: "gclid", value: touch.gclid };
  if (touch.gbraid) return { type: "gbraid", value: touch.gbraid };
  if (touch.wbraid) return { type: "wbraid", value: touch.wbraid };
  return null;
}

export function isGoogleAdsAttribution(snapshot: AttributionSnapshot | null) {
  if (!snapshot) return false;
  const touch = snapshot.latestTouch;
  return Boolean(
    selectClickId(touch) ||
      touch.gadSource ||
      touch.googleAdsSource === "google_ads" ||
      touch.utmSource?.toLowerCase().includes("google"),
  );
}

export function clickIdHashInput(clickId: SelectedClickId | null) {
  return clickId ? `${clickId.type}:${clickId.value}` : "none";
}
