"use client";

import {
  ATTRIBUTION_STORAGE_KEY,
  ATTRIBUTION_UPDATED_EVENT,
  CONSENT_UPDATED_EVENT,
  captureAttributionTouch,
  mergeAttribution,
  sanitizeAttributionSnapshot,
} from "./attribution";
import type { AttributionConsentEvidence, AttributionSnapshot } from "./types";
import {
  readConsentRuntimeVersion,
  selectStoredConsentForRuntime,
} from "@/lib/cookieConsentRuntime";

const COOKIE_CONSENT_KEY = "emitronix_cookie_consent";

function localStorageValue(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function cookieValue(name: string) {
  try {
    const value = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
    return value ? decodeURIComponent(value.split("=").slice(1).join("=")) : null;
  } catch {
    return null;
  }
}

export function readAdvertisingConsent(): AttributionConsentEvidence {
  if (typeof window === "undefined") return { marketing: false, adUserData: false };
  const stored = selectStoredConsentForRuntime({
    localStorageRaw: localStorageValue(COOKIE_CONSENT_KEY),
    cookieRaw: cookieValue(COOKIE_CONSENT_KEY),
    runtimeVersion: readConsentRuntimeVersion(),
  });
  const marketing = stored?.categories?.marketing === true;
  return {
    marketing,
    adUserData: marketing,
    ...(typeof stored?.version === "number" ? { version: String(stored.version) } : {}),
    ...(stored?.updatedAt ? { updatedAt: stored.updatedAt } : {}),
  };
}

export function readBrowserAttribution(): AttributionSnapshot | null {
  if (typeof window === "undefined") return null;
  const raw = localStorageValue(ATTRIBUTION_STORAGE_KEY);
  if (!raw) return null;
  try {
    return sanitizeAttributionSnapshot(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

function notifyAttributionUpdated() {
  window.dispatchEvent(new Event(ATTRIBUTION_UPDATED_EVENT));
}

export function clearBrowserAttribution() {
  try {
    window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in privacy modes; the in-memory form state is
    // still cleared by the update event.
  }
  notifyAttributionUpdated();
}

export function captureCurrentPageAttribution(now = new Date()) {
  const consent = readAdvertisingConsent();
  if (!consent.marketing || !consent.adUserData) {
    clearBrowserAttribution();
    return null;
  }

  const touch = captureAttributionTouch(window.location.href, document.referrer, now);
  const current = readBrowserAttribution();
  if (!touch) {
    if (current && JSON.stringify(current.consent) !== JSON.stringify(consent)) {
      const refreshed = { ...current, consent };
      try {
        window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(refreshed));
      } catch {
        // The form can still use the previously stored snapshot.
      }
      notifyAttributionUpdated();
      return refreshed;
    }
    return current;
  }

  const next = mergeAttribution(current, touch, consent, now);
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Optional attribution must never break navigation or form use.
  }
  notifyAttributionUpdated();
  return next;
}

export function installAttributionCapture() {
  captureCurrentPageAttribution();

  const onConsent = () => captureCurrentPageAttribution();
  const onStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_KEY || event.key === ATTRIBUTION_STORAGE_KEY) {
      captureCurrentPageAttribution();
    }
  };
  const onPageShow = () => captureCurrentPageAttribution();

  window.addEventListener(CONSENT_UPDATED_EVENT, onConsent);
  window.addEventListener("storage", onStorage);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    window.removeEventListener(CONSENT_UPDATED_EVENT, onConsent);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("pageshow", onPageShow);
  };
}
