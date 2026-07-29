"use client";

import { Check, ChevronRight, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  cookieCategoryIds,
  defaultCookieConsentConfig,
  getAllConsentCategories,
  getDefaultConsentCategories,
  getRejectedConsentCategories,
  type ConsentCategoryMap,
  type CookieCategory,
  type CookieCategoryId,
  type CookieConsentConfig,
  type CookieLanguage,
} from "@/data/cookieConsentDefaults";

type StoredConsent = {
  version: number;
  categories: ConsentCategoryMap;
  language: CookieLanguage;
  updatedAt: string;
  expiresAt: string;
};

type ConsentAction = "accept_all" | "reject_non_essential" | "customize" | "save_preferences";

type QueuedTrackingFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  q?: unknown[];
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: QueuedTrackingFunction;
    _fbq?: unknown;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    clarity?: QueuedTrackingFunction;
    hj?: QueuedTrackingFunction;
    _hjSettings?: { hjid: number; hjsv: number };
  }
}

const CONSENT_STORAGE_KEY = "emitronix_cookie_consent";
const LANGUAGE_STORAGE_KEY = "emitronix_language";
const SETTINGS_EVENT = "emitronix:open-cookie-settings";

const integrationIds = {
  ga: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  clarity: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  hotjar: process.env.NEXT_PUBLIC_HOTJAR_ID,
};

function parseScriptUrls(value: string | undefined) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^https:\/\//i.test(item));
}

const extraScripts = {
  analytics: parseScriptUrls(process.env.NEXT_PUBLIC_COOKIE_ANALYTICS_SCRIPT_URLS),
  marketing: parseScriptUrls(process.env.NEXT_PUBLIC_COOKIE_MARKETING_SCRIPT_URLS),
  functional: parseScriptUrls(process.env.NEXT_PUBLIC_COOKIE_FUNCTIONAL_SCRIPT_URLS),
  performance: parseScriptUrls(process.env.NEXT_PUBLIC_COOKIE_PERFORMANCE_SCRIPT_URLS),
};

function getCookieValue(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function setConsentCookie(consent: StoredConsent, expiryDays: number) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const maxAge = Math.max(1, expiryDays) * 24 * 60 * 60;
  document.cookie = `${CONSENT_STORAGE_KEY}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function detectLanguage(): CookieLanguage {
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "ar" || stored === "en") return stored;
  if (window.location.pathname === "/ar" || window.location.pathname.startsWith("/ar/")) return "ar";
  const htmlLang = document.documentElement.lang.toLowerCase();
  if (htmlLang.startsWith("ar")) return "ar";
  return window.navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function getStoredConsent(config: CookieConsentConfig): StoredConsent | null {
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY) || getCookieValue(CONSENT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (!parsed.expiresAt || !parsed.categories || parsed.version !== config.version) return null;
    if (new Date(parsed.expiresAt).getTime() <= Date.now()) return null;
    return {
      version: parsed.version,
      categories: cookieCategoryIds.reduce((result, id) => {
        result[id] = id === "necessary" ? true : parsed.categories?.[id] === true;
        return result;
      }, {} as ConsentCategoryMap),
      language: parsed.language === "ar" ? "ar" : "en",
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

function isCategoryEnabled(category: CookieCategory) {
  return category.required || category.enabled;
}

function buildConsentRecord(config: CookieConsentConfig, language: CookieLanguage, categories: ConsentCategoryMap): StoredConsent {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + config.consentExpiryDays * 24 * 60 * 60 * 1000);
  return {
    version: config.version,
    categories: cookieCategoryIds.reduce((result, id) => {
      const category = config.categories.find((item) => item.id === id);
      result[id] = id === "necessary" ? true : Boolean(category?.enabled && categories[id]);
      return result;
    }, {} as ConsentCategoryMap),
    language,
    updatedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

function updateGoogleConsent(categories: ConsentCategoryMap) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("consent", "update", {
    ad_storage: categories.marketing ? "granted" : "denied",
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
    functionality_storage: categories.functional ? "granted" : "denied",
    personalization_storage: categories.functional ? "granted" : "denied",
    security_storage: "granted",
  });
}

function injectScript(id: string, src: string, onLoad?: () => void) {
  if (document.getElementById(id)) {
    onLoad?.();
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

function loadExtraScripts(prefix: string, urls: string[]) {
  urls.forEach((url, index) => injectScript(`${prefix}-${index}`, url));
}

function loadConsentScripts(categories: ConsentCategoryMap) {
  updateGoogleConsent(categories);

  if (categories.analytics && integrationIds.ga) {
    injectScript("emitronix-ga", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(integrationIds.ga)}`, () => {
      window.gtag?.("js", new Date());
      window.gtag?.("config", integrationIds.ga, { anonymize_ip: true });
    });
  }

  if (categories.marketing && integrationIds.meta) {
    if (!window.fbq) {
      const queuedFbq: QueuedTrackingFunction = (...args: unknown[]) => {
        if (queuedFbq.callMethod) {
          queuedFbq.callMethod(...args);
        } else {
          queuedFbq.queue?.push(args);
        }
      };
      queuedFbq.queue = [];
      queuedFbq.loaded = true;
      queuedFbq.version = "2.0";
      window.fbq = queuedFbq;
      window._fbq = queuedFbq;
    }
    window.fbq("init", integrationIds.meta);
    window.fbq("track", "PageView");
    injectScript("emitronix-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  }

  if (categories.marketing && integrationIds.linkedin) {
    window._linkedin_partner_id = integrationIds.linkedin;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(integrationIds.linkedin);
    injectScript("emitronix-linkedin-insight", "https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }

  if ((categories.analytics || categories.performance) && integrationIds.clarity) {
    window.clarity = window.clarity || function clarity(...args: unknown[]) {
      window.clarity = window.clarity || clarity;
      window.clarity.q = window.clarity.q || [];
      window.clarity.q.push(args);
    };
    window.clarity("consent");
    injectScript("emitronix-clarity", `https://www.clarity.ms/tag/${encodeURIComponent(integrationIds.clarity)}`);
  }

  if ((categories.analytics || categories.performance) && integrationIds.hotjar && Number.isFinite(Number(integrationIds.hotjar))) {
    const hotjarId = Number(integrationIds.hotjar);
    window._hjSettings = { hjid: hotjarId, hjsv: 6 };
    window.hj = window.hj || function hj(...args: unknown[]) {
      window.hj = window.hj || hj;
      window.hj.q = window.hj.q || [];
      window.hj.q.push(args);
    };
    injectScript("emitronix-hotjar", `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6`);
  }

  if (categories.analytics) loadExtraScripts("emitronix-extra-analytics", extraScripts.analytics);
  if (categories.marketing) loadExtraScripts("emitronix-extra-marketing", extraScripts.marketing);
  if (categories.functional) loadExtraScripts("emitronix-extra-functional", extraScripts.functional);
  if (categories.performance) loadExtraScripts("emitronix-extra-performance", extraScripts.performance);
}

function sendConsentEvent(action: ConsentAction, categories: ConsentCategoryMap) {
  void fetch("/api/cookie-consent/consent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, categories }),
    keepalive: true,
  }).catch(() => undefined);
}

function policyHref(key: "cookie" | "privacy" | "terms", language: CookieLanguage) {
  const prefix = language === "ar" ? "/ar" : "";
  if (key === "cookie") return `${prefix}/cookie-policy`;
  if (key === "privacy") return `${prefix}/privacy-policy`;
  return `${prefix}/terms-and-conditions`;
}

export function CookieConsentManager() {
  const bannerTitleId = useId();
  const bannerDescriptionId = useId();
  const preferencesTitleId = useId();
  const preferencesDescriptionId = useId();
  const categoryHeadingId = useId();
  const preferencesDialogRef = useRef<HTMLDivElement>(null);
  const preferencesCloseButtonRef = useRef<HTMLButtonElement>(null);
  const customizeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [config, setConfig] = useState<CookieConsentConfig>(defaultCookieConsentConfig);
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState<CookieLanguage>("en");
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [returnToBannerOnClose, setReturnToBannerOnClose] = useState(true);
  const [draftCategories, setDraftCategories] = useState<ConsentCategoryMap>(() => getDefaultConsentCategories());

  const activeCategories = useMemo(() => config.categories.filter(isCategoryEnabled), [config.categories]);
  const content = config.banner;
  const isRtl = language === "ar";

  useEffect(() => {
    const initialLanguage = detectLanguage();
    setLanguage(initialLanguage);

    let cancelled = false;
    fetch("/api/cookie-consent/config", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { config?: CookieConsentConfig }) => {
        if (cancelled) return;
        const nextConfig = data.config || defaultCookieConsentConfig;
        setConfig(nextConfig);
        const stored = getStoredConsent(nextConfig);
        if (stored) {
          setLanguage(stored.language);
          setDraftCategories(stored.categories);
          loadConsentScripts(stored.categories);
          setShowBanner(false);
        } else {
          setDraftCategories(getDefaultConsentCategories());
          setShowBanner(nextConfig.enabled);
          updateGoogleConsent(getDefaultConsentCategories());
        }
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        const stored = getStoredConsent(defaultCookieConsentConfig);
        if (stored) {
          setLanguage(stored.language);
          setDraftCategories(stored.categories);
          loadConsentScripts(stored.categories);
          setShowBanner(false);
        } else {
          setShowBanner(defaultCookieConsentConfig.enabled);
          updateGoogleConsent(getDefaultConsentCategories());
        }
        setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const openSettings = () => {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setReturnToBannerOnClose(false);
      setShowPreferences(true);
      setShowBanner(false);
    };

    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!showPreferences) return;

    const dialog = preferencesDialogRef.current;
    const focusCloseButton = window.requestAnimationFrame(() => preferencesCloseButtonRef.current?.focus());

    function handleDialogKeyDown(event: KeyboardEvent) {
      if (!dialog) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setShowPreferences(false);
        setShowBanner(returnToBannerOnClose);
        window.requestAnimationFrame(() => {
          const target = returnToBannerOnClose ? customizeButtonRef.current : returnFocusRef.current;
          if (target?.isConnected) target.focus();
        });
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && (document.activeElement === firstElement || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    dialog?.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      dialog?.removeEventListener("keydown", handleDialogKeyDown);
    };
  }, [returnToBannerOnClose, showPreferences]);

  function persistConsent(action: ConsentAction, categories: ConsentCategoryMap) {
    const focusTarget = showPreferences ? returnFocusRef.current : null;
    const previousConsent = getStoredConsent(config);
    const consent = buildConsentRecord(config, language, categories);
    const revokedPreviouslyGrantedCategory = Boolean(
      previousConsent &&
        cookieCategoryIds.some(
          (id) => id !== "necessary" && previousConsent.categories[id] && !consent.categories[id],
        ),
    );

    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    setConsentCookie(consent, config.consentExpiryDays);
    setDraftCategories(consent.categories);
    sendConsentEvent(action, consent.categories);
    setShowBanner(false);
    setShowPreferences(false);

    if (revokedPreviouslyGrantedCategory) {
      window.location.reload();
      return;
    }

    loadConsentScripts(consent.categories);
    window.requestAnimationFrame(() => {
      if (focusTarget?.isConnected) focusTarget.focus();
    });
  }

  function acceptAll() {
    persistConsent("accept_all", getAllConsentCategories());
  }

  function rejectNonEssential() {
    persistConsent("reject_non_essential", getRejectedConsentCategories());
  }

  function savePreferences() {
    persistConsent("save_preferences", draftCategories);
  }

  function toggleCategory(id: CookieCategoryId) {
    const category = config.categories.find((item) => item.id === id);
    if (!category || category.required) return;
    setDraftCategories((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  function changeLanguage(nextLanguage: CookieLanguage) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }

  function closePreferences() {
    setShowPreferences(false);
    setShowBanner(returnToBannerOnClose);
    window.requestAnimationFrame(() => {
      const target = returnToBannerOnClose ? customizeButtonRef.current : returnFocusRef.current;
      if (target?.isConnected) target.focus();
    });
  }

  if (!loaded || (!showBanner && !showPreferences)) return null;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="fixed inset-x-0 bottom-0 z-[100000] px-3 pb-3 sm:px-5 sm:pb-5">
      <div
        ref={showPreferences ? preferencesDialogRef : undefined}
        role={showPreferences ? "dialog" : "region"}
        aria-modal={showPreferences ? "true" : undefined}
        aria-labelledby={showPreferences ? preferencesTitleId : bannerTitleId}
        aria-describedby={showPreferences ? preferencesDescriptionId : bannerDescriptionId}
        className="mx-auto max-w-6xl rounded-[1.75rem] border border-brand/[0.16] bg-white/[0.96] p-4 text-charcoal shadow-luxe backdrop-blur-2xl sm:p-5"
      >
        {showPreferences ? (
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.25rem] bg-brand-soft p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-blue">
                  <Settings2 className="h-5 w-5" />
                </span>
                <button
                  ref={preferencesCloseButtonRef}
                  type="button"
                  aria-label={content.closeLabel[language]}
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand/[0.14] bg-white text-brand transition hover:bg-brand hover:text-white focus-ring"
                  onClick={closePreferences}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <p id={categoryHeadingId} className="premium-kicker mt-5">{content.categoryHeading[language]}</p>
              <h2 id={preferencesTitleId} className="mt-3 text-3xl font-black tracking-tight text-charcoal">{content.title[language]}</h2>
              <p id={preferencesDescriptionId} className="mt-4 text-sm leading-7 text-steel">{content.description[language]}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm font-black" role="group" aria-label={content.languageLabel[language]}>
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-brand shadow-sm"
                  onClick={() => changeLanguage("en")}
                  aria-pressed={language === "en"}
                >
                  English
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-brand shadow-sm"
                  onClick={() => changeLanguage("ar")}
                  aria-pressed={language === "ar"}
                >
                  العربية
                </button>
              </div>
            </div>

            <div>
              <div className="grid max-h-[54vh] gap-3 overflow-auto pr-1" role="group" aria-labelledby={categoryHeadingId}>
                {activeCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className="flex items-start justify-between gap-4 rounded-[1.25rem] border border-brand/[0.12] bg-white p-4 text-start shadow-sm transition hover:border-brand/25 hover:bg-brand-soft"
                    onClick={() => toggleCategory(category.id)}
                    disabled={category.required}
                    aria-pressed={category.required || draftCategories[category.id]}
                    aria-describedby={`${preferencesDescriptionId}-${category.id}`}
                  >
                    <span>
                      <span className="block text-base font-black tracking-tight text-charcoal">{category.title[language]}</span>
                      <span id={`${preferencesDescriptionId}-${category.id}`} className="mt-2 block text-sm leading-6 text-steel">{category.description[language]}</span>
                    </span>
                    <span
                      className={`mt-1 inline-flex min-w-24 items-center justify-center rounded-full px-3 py-2 text-xs font-black uppercase tracking-wide ${
                        category.required || draftCategories[category.id]
                          ? "bg-brand text-white"
                          : "bg-brand-soft text-brand"
                      }`}
                    >
                      {category.required ? content.alwaysEnabledLabel[language] : draftCategories[category.id] ? (language === "ar" ? "مفعل" : "On") : (language === "ar" ? "متوقف" : "Off")}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <button type="button" className="premium-button" onClick={savePreferences}>
                  <Check className="h-4 w-4" />
                  {content.saveLabel[language]}
                </button>
                <button type="button" className="premium-button-light" onClick={acceptAll}>
                  {content.acceptAllLabel[language]}
                </button>
                <button type="button" className="premium-button-light" onClick={rejectNonEssential}>
                  {content.rejectLabel[language]}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-start">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-blue">
              <Cookie className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="premium-kicker">{content.languageLabel[language]}</p>
                <button
                  type="button"
                  className="text-xs font-black uppercase tracking-wide text-brand"
                  onClick={() => changeLanguage("en")}
                  aria-pressed={language === "en"}
                >
                  English
                </button>
                <button
                  type="button"
                  className="text-xs font-black uppercase tracking-wide text-brand"
                  onClick={() => changeLanguage("ar")}
                  aria-pressed={language === "ar"}
                >
                  العربية
                </button>
              </div>
              <h2 id={bannerTitleId} className="mt-2 text-2xl font-black tracking-tight text-charcoal sm:text-3xl">{content.title[language]}</h2>
              <p id={bannerDescriptionId} className="mt-2 max-w-4xl text-sm leading-7 text-steel">{content.description[language]}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-black uppercase tracking-wide text-brand">
                <Link href={policyHref("cookie", language)}>{content.cookiePolicyLabel[language]}</Link>
                <Link href={policyHref("privacy", language)}>{content.privacyPolicyLabel[language]}</Link>
                <Link href={policyHref("terms", language)}>{content.termsLabel[language]}</Link>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:col-span-2">
              <button type="button" className="premium-button" onClick={acceptAll}>
                <ShieldCheck className="h-4 w-4" />
                {content.acceptAllLabel[language]}
              </button>
              <button type="button" className="premium-button-light" onClick={rejectNonEssential}>
                {content.rejectLabel[language]}
              </button>
              <button
                ref={customizeButtonRef}
                type="button"
                className="premium-button-light"
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget;
                  setReturnToBannerOnClose(true);
                  setShowPreferences(true);
                  setShowBanner(false);
                  sendConsentEvent("customize", draftCategories);
                }}
              >
                {content.customizeLabel[language]}
                <ChevronRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CookieSettingsFooterButton({ label = "Cookie Settings" }: { label?: string }) {
  return (
    <button
      type="button"
      className="text-start transition hover:text-brand"
      onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
    >
      {label}
    </button>
  );
}
