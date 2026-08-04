"use client";

import type { AttributionSnapshot } from "@/lib/googleZoho/types";
import { isGoogleAdsAttribution } from "@/lib/googleZoho/attribution";
import {
  readConsentRuntimeVersion,
  selectStoredConsentForRuntime,
} from "@/lib/cookieConsentRuntime";

const CONSENT_STORAGE_KEY = "emitronix_cookie_consent";
const DEDUPE_STORAGE_PREFIX = "emitronix_gtm_once:";
const WEBSITE_LEAD_VALUE = 250;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const inMemoryDedupe = new Set<string>();

export type GtmFormName = "contact_form" | "blog_enquiry_form";
export type GtmErrorType = "validation" | "api" | "network";
export type GtmConsent = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

type ConsentPolicy = "analytics" | "measurement" | "functional";

type SessionStorageLike = Pick<Storage, "getItem" | "setItem">;

type DataLayerRuntime = {
  dataLayer: unknown[];
  sessionStorage?: SessionStorageLike;
};

export type PageContext = {
  page_location: string;
  page_path: string;
  page_referrer?: string;
};

export type ServerLeadResult = {
  ok?: boolean;
  eventId?: string;
  leadId?: string;
  submissionId?: string;
  crmAction?: "created" | "updated";
  replayed?: boolean;
};

export type LeadEventInput = {
  result: ServerLeadResult;
  formName: GtmFormName;
  attribution: AttributionSnapshot | null;
  pageContext?: PageContext;
  consent?: GtmConsent;
  runtime?: DataLayerRuntime;
};

export type PublicContactTrackingConfig = {
  phoneNumbers: string[];
  whatsappNumbers: string[];
  emailAddresses: string[];
};

export type TrackedContactLink = {
  event: "phone_click" | "whatsapp_click" | "email_click";
  click_url: string;
  phone_number?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    EmitronixTracking?: {
      salesIqLeadCaptured: (input?: {
        leadId?: string;
        captureType?: "visitor_details" | "chatbot" | "agent";
      }) => boolean;
    };
  }
}

function cleanText(value: unknown, max = 160) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function resemblesCustomerPii(value: string) {
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(value)) return true;
  return /(?:\+?\d[\s().-]*){7,}/.test(value);
}

function decodePath(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return "/redacted";
  }
}

function cleanIdentifier(value: unknown, max = 128) {
  const text = cleanText(value, max);
  if (!text || /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) return "";
  if (resemblesCustomerPii(text) && !text.split(":").some((part) => UUID_PATTERN.test(part))) return "";
  return /^[A-Za-z0-9._:/-]+$/.test(text) ? text : "";
}

function compact(values: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

function localStorageValue(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function cookieValue(name: string) {
  try {
    const row = document.cookie.split("; ").find((candidate) => candidate.startsWith(`${name}=`));
    return row ? decodeURIComponent(row.split("=").slice(1).join("=")) : null;
  } catch {
    return null;
  }
}

export function readGtmConsent(): GtmConsent {
  if (typeof window === "undefined") return { analytics: false, marketing: false, functional: false };
  const stored = selectStoredConsentForRuntime({
    localStorageRaw: localStorageValue(CONSENT_STORAGE_KEY),
    cookieRaw: cookieValue(CONSENT_STORAGE_KEY),
    runtimeVersion: readConsentRuntimeVersion(),
  });
  return {
    analytics: stored?.categories?.analytics === true,
    marketing: stored?.categories?.marketing === true,
    functional: stored?.categories?.functional === true,
  };
}

function consentAllows(consent: GtmConsent, policy: ConsentPolicy) {
  if (policy === "analytics") return consent.analytics;
  if (policy === "functional") return consent.functional;
  return consent.analytics || consent.marketing;
}

function browserRuntime(): DataLayerRuntime | null {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  let sessionStorage: SessionStorageLike | undefined;
  try {
    sessionStorage = window.sessionStorage;
  } catch {
    sessionStorage = undefined;
  }
  return { dataLayer: window.dataLayer, sessionStorage };
}

function wasEmitted(key: string, runtime: DataLayerRuntime) {
  if (inMemoryDedupe.has(key)) return true;
  try {
    return runtime.sessionStorage?.getItem(`${DEDUPE_STORAGE_PREFIX}${key}`) === "1";
  } catch {
    return false;
  }
}

function rememberEmission(key: string, runtime: DataLayerRuntime) {
  inMemoryDedupe.add(key);
  try {
    runtime.sessionStorage?.setItem(`${DEDUPE_STORAGE_PREFIX}${key}`, "1");
  } catch {
    // The in-memory key still protects the current page in privacy modes.
  }
}

export function emitGtmEvent(
  event: Record<string, unknown>,
  options: {
    policy: ConsentPolicy;
    dedupeKey?: string;
    consent?: GtmConsent;
    runtime?: DataLayerRuntime;
  },
) {
  try {
    const runtime = options.runtime || browserRuntime();
    if (!runtime || !cleanIdentifier(event.event, 80)) return false;
    const consent = options.consent || readGtmConsent();
    if (!consentAllows(consent, options.policy)) return false;

    const dedupeKey = options.dedupeKey ? cleanIdentifier(options.dedupeKey, 240) : "";
    if (dedupeKey && wasEmitted(dedupeKey, runtime)) return false;

    runtime.dataLayer.push(compact(event));
    if (dedupeKey) rememberEmission(dedupeKey, runtime);
    return true;
  } catch {
    return false;
  }
}

function cleanPageUrl(value: string, fallback = "https://emitronix.ae/") {
  try {
    const url = new URL(value || fallback, fallback);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("UNSAFE_URL");
    const decodedPath = decodePath(url.pathname);
    const pathname = resemblesCustomerPii(decodedPath) ? "/redacted" : url.pathname;
    return `${url.origin}${pathname}`.slice(0, 500);
  } catch {
    const url = new URL(fallback);
    return `${url.origin}${url.pathname}`.slice(0, 500);
  }
}

export function safePageContext(input?: { href?: string; pathname?: string; referrer?: string }): PageContext {
  const href = input?.href || (typeof window !== "undefined" ? window.location.href : "https://emitronix.ae/");
  const pageLocation = cleanPageUrl(href);
  const requestedPath = cleanText(input?.pathname || new URL(pageLocation).pathname, 300);
  const pathname = resemblesCustomerPii(decodePath(requestedPath)) ? "/redacted" : requestedPath;
  const referrer = input?.referrer ?? (typeof document !== "undefined" ? document.referrer : "");
  return compact({
    page_location: pageLocation,
    page_path: pathname.startsWith("/") ? pathname : `/${pathname}`,
    page_referrer: referrer ? cleanPageUrl(referrer) : undefined,
  }) as PageContext;
}

function normalizedPageContext(context?: PageContext) {
  return context
    ? safePageContext({
        href: context.page_location,
        pathname: context.page_path,
        referrer: context.page_referrer,
      })
    : safePageContext();
}

function attributionFields(attribution: AttributionSnapshot | null) {
  const touch = attribution?.latestTouch;
  return compact({
    gclid_available: Boolean(touch?.gclid),
    gbraid_available: Boolean(touch?.gbraid),
    wbraid_available: Boolean(touch?.wbraid),
    match_type: ["e", "p", "b"].includes(touch?.matchType || "") ? touch?.matchType : undefined,
    device: ["m", "c", "t"].includes(touch?.device || "") ? touch?.device : undefined,
    network: ["g", "s", "d"].includes(touch?.network || "") ? touch?.network : undefined,
  });
}

export function buildLeadDataLayerEvents(input: LeadEventInput) {
  const currentLeadId = cleanIdentifier(input.result.leadId, 64);
  const legacyLeadId = cleanIdentifier(input.result.eventId, 64);
  if (currentLeadId && legacyLeadId && currentLeadId !== legacyLeadId) return null;
  const leadId = currentLeadId || legacyLeadId;
  const submissionId = cleanIdentifier(input.result.submissionId, 160);
  if (!leadId || !submissionId || input.result.ok !== true || input.result.replayed === true) return null;

  const page = normalizedPageContext(input.pageContext);
  const paid = isGoogleAdsAttribution(input.attribution);
  const common = compact({
    event_id: leadId,
    lead_id: leadId,
    submission_id: submissionId,
    form_name: input.formName,
    lead_source: paid ? "google_ads" : "website",
    ...page,
    ...attributionFields(input.attribution),
  });

  const generateLead: Record<string, unknown> = {
    event: "generate_lead",
    ...common,
    lead_value: WEBSITE_LEAD_VALUE,
    currency: "AED",
  };
  const crmLeadCreated: Record<string, unknown> = {
    event: "crm_lead_created",
    ...common,
    crm_action: input.result.crmAction,
  };
  return { generateLead, crmLeadCreated };
}

export function pushServerConfirmedLead(input: LeadEventInput) {
  const consent = input.consent || readGtmConsent();
  const events = buildLeadDataLayerEvents({
    ...input,
    consent,
    attribution: consent.marketing ? input.attribution : null,
  });
  if (!events) return { generateLead: false, crmLeadCreated: false };
  const leadId = String(events.generateLead["lead_id"]);
  const options = { consent, runtime: input.runtime, policy: "measurement" as const };
  return {
    generateLead: emitGtmEvent(events.generateLead, { ...options, dedupeKey: `generate_lead:${leadId}` }),
    crmLeadCreated: emitGtmEvent(events.crmLeadCreated, { ...options, dedupeKey: `crm_lead_created:${leadId}` }),
  };
}

export function pushFormStartEvent(formName: GtmFormName, formInstanceId: string, pageContext?: PageContext) {
  const instance = cleanIdentifier(formInstanceId, 160);
  if (!instance) return false;
  return emitGtmEvent(
    { event: "form_start", form_name: formName, ...normalizedPageContext(pageContext) },
    { policy: "analytics", dedupeKey: `form_start:${formName}:${instance}` },
  );
}

export function pushFormSubmitEvent(formName: GtmFormName, submissionId: string, pageContext?: PageContext) {
  const id = cleanIdentifier(submissionId, 160);
  if (!id) return false;
  return emitGtmEvent(
    { event: "form_submit", submission_id: id, form_name: formName, ...normalizedPageContext(pageContext) },
    { policy: "analytics", dedupeKey: `form_submit:${id}` },
  );
}

export function pushFormErrorEvent(input: {
  formName: GtmFormName;
  submissionId?: string;
  errorType: GtmErrorType;
  httpStatus?: number;
  fieldName?: string;
  pageContext?: PageContext;
}) {
  const submissionId = cleanIdentifier(input.submissionId, 160);
  const fieldName = cleanIdentifier(input.fieldName, 80);
  const httpStatus = Number.isInteger(input.httpStatus) && Number(input.httpStatus) >= 400 && Number(input.httpStatus) <= 599
    ? Number(input.httpStatus)
    : undefined;
  const key = `${input.formName}:${submissionId || "no_submission"}:${input.errorType}:${fieldName || httpStatus || "unknown"}`;
  return emitGtmEvent(
    compact({
      event: "form_error",
      form_name: input.formName,
      submission_id: submissionId,
      error_type: input.errorType,
      http_status: httpStatus,
      field_name: fieldName,
      ...normalizedPageContext(input.pageContext),
    }),
    { policy: "analytics", dedupeKey: `form_error:${key}` },
  );
}

export function pushFormAbandonEvent(formName: GtmFormName, formInstanceId: string, pageContext?: PageContext) {
  const instance = cleanIdentifier(formInstanceId, 160);
  if (!instance) return false;
  return emitGtmEvent(
    { event: "form_abandon", form_name: formName, ...normalizedPageContext(pageContext) },
    { policy: "analytics", dedupeKey: `form_abandon:${formName}:${instance}` },
  );
}

export function pushVirtualPageViewEvent(pageContext?: PageContext) {
  return emitGtmEvent(
    { event: "virtual_page_view", ...normalizedPageContext(pageContext) },
    { policy: "analytics" },
  );
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizedAllowed(values: string[]) {
  return new Set(values.map(digits).filter((value) => value.length >= 7));
}

export function classifyContactHref(
  href: string,
  config: PublicContactTrackingConfig,
  baseUrl = "https://emitronix.ae/",
): TrackedContactLink | null {
  const raw = cleanText(href, 1000);
  const lower = raw.toLowerCase();
  const allowedPhones = normalizedAllowed(config.phoneNumbers);
  const allowedWhatsApp = normalizedAllowed(config.whatsappNumbers);
  const allowedEmails = new Set(config.emailAddresses.map((value) => value.trim().toLowerCase()).filter(Boolean));

  if (lower.startsWith("tel:")) {
    const number = digits(raw.slice(4).split("?")[0]);
    if (!allowedPhones.has(number)) return null;
    return { event: "phone_click", click_url: `tel:+${number}`, phone_number: `+${number}` };
  }

  if (lower.startsWith("mailto:")) {
    const address = raw.slice(7).split("?")[0].trim().toLowerCase();
    if (!allowedEmails.has(address)) return null;
    return { event: "email_click", click_url: `mailto:${address}` };
  }

  try {
    const url = new URL(raw, baseUrl);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "wa.me" && host !== "api.whatsapp.com" && host !== "web.whatsapp.com") return null;
    const number = host === "wa.me" ? digits(url.pathname) : digits(url.searchParams.get("phone") || "");
    if (!number || !allowedWhatsApp.has(number)) return null;
    return { event: "whatsapp_click", click_url: `https://wa.me/${number}`, phone_number: `+${number}` };
  } catch {
    return null;
  }
}

export function pushContactClickEvent(input: {
  link: TrackedContactLink;
  buttonLocation: string;
  pageContext?: PageContext;
}) {
  return emitGtmEvent(
    compact({
      event: input.link.event,
      click_url: input.link.click_url,
      phone_number: input.link.phone_number,
      button_location: cleanIdentifier(input.buttonLocation, 80) || "page",
      ...normalizedPageContext(input.pageContext),
    }),
    { policy: "measurement" },
  );
}

export function pushSalesIqChatStart(buttonLocation = "salesiq_launcher") {
  return emitGtmEvent(
    { event: "salesiq_chat_start", button_location: cleanIdentifier(buttonLocation, 80), ...safePageContext() },
    { policy: "functional", dedupeKey: "salesiq_chat_start" },
  );
}

export function buildSalesIqLeadCapturedEvent(input: {
  leadId?: string;
  captureType?: "visitor_details" | "chatbot" | "agent";
  pageContext?: PageContext;
} = {}) {
  const leadId = cleanIdentifier(input.leadId, 160);
  if (input.leadId && !leadId) return null;
  const captureType = input.captureType || "visitor_details";
  return compact({
    event: "salesiq_lead_captured",
    lead_id: leadId,
    capture_type: captureType,
    ...normalizedPageContext(input.pageContext),
  });
}

export function pushSalesIqLeadCaptured(input: {
  leadId?: string;
  captureType?: "visitor_details" | "chatbot" | "agent";
} = {}) {
  const event = buildSalesIqLeadCapturedEvent(input);
  if (!event) return false;
  const leadId = String(event.lead_id || "");
  const captureType = String(event.capture_type);
  const key = leadId || captureType;
  return emitGtmEvent(
    event,
    { policy: "functional", dedupeKey: `salesiq_lead_captured:${key}` },
  );
}

export function markGtmFormCompleted(form: HTMLFormElement) {
  form.dataset.gtmCompleted = "1";
}

export function resetGtmDedupeForTests() {
  inMemoryDedupe.clear();
}
