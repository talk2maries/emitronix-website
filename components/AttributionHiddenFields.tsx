"use client";

import { useEffect, useState } from "react";
import { ATTRIBUTION_UPDATED_EVENT } from "@/lib/googleZoho/attribution";
import { readAdvertisingConsent, readBrowserAttribution } from "@/lib/googleZoho/attribution-browser";
import type { AttributionConsentEvidence, AttributionSnapshot } from "@/lib/googleZoho/types";

export type AttributionFormValues = {
  attribution: AttributionSnapshot | null;
  adUserDataConsent: boolean;
  consentVersion?: string;
  consentUpdatedAt?: string;
};

export function attributionFormValues(formData: FormData): AttributionFormValues {
  const raw = String(formData.get("attributionPayload") || "");
  let attribution: AttributionSnapshot | null = null;
  if (raw) {
    try {
      attribution = JSON.parse(raw) as AttributionSnapshot;
    } catch {
      attribution = null;
    }
  }
  return {
    attribution,
    adUserDataConsent: formData.get("adUserDataConsent") === "granted",
    ...(String(formData.get("attributionConsentVersion") || "")
      ? { consentVersion: String(formData.get("attributionConsentVersion")) }
      : {}),
    ...(String(formData.get("attributionConsentUpdatedAt") || "")
      ? { consentUpdatedAt: String(formData.get("attributionConsentUpdatedAt")) }
      : {}),
  };
}

export function AttributionHiddenFields() {
  const [snapshot, setSnapshot] = useState<AttributionSnapshot | null>(null);
  const [consent, setConsent] = useState<AttributionConsentEvidence>(() => ({ marketing: false, adUserData: false }));

  useEffect(() => {
    const refresh = () => {
      setSnapshot(readBrowserAttribution());
      setConsent(readAdvertisingConsent());
    };
    refresh();
    window.addEventListener(ATTRIBUTION_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(ATTRIBUTION_UPDATED_EVENT, refresh);
  }, []);

  return (
    <>
      <input type="hidden" name="attributionPayload" value={snapshot ? JSON.stringify(snapshot) : ""} readOnly />
      <input type="hidden" name="adUserDataConsent" value={consent.adUserData ? "granted" : "denied"} readOnly />
      <input type="hidden" name="attributionConsentVersion" value={consent.version || ""} readOnly />
      <input type="hidden" name="attributionConsentUpdatedAt" value={consent.updatedAt || ""} readOnly />
    </>
  );
}
