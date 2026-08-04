export const ATTRIBUTION_VERSION = 1 as const;

export type ClickIdType = "gclid" | "gbraid" | "wbraid";

export type AttributionTouch = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  gadSource?: string;
  campaignId?: string;
  campaignName?: string;
  adGroupId?: string;
  keyword?: string;
  matchType?: string;
  device?: string;
  network?: string;
  placement?: string;
  creative?: string;
  googleAdsSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPageUrl: string;
  referringUrl?: string;
  visitedAt: string;
};

export type AttributionConsentEvidence = {
  marketing: boolean;
  adUserData: boolean;
  version?: string;
  updatedAt?: string;
};

export type AttributionSnapshot = {
  version: typeof ATTRIBUTION_VERSION;
  firstTouch: AttributionTouch;
  latestTouch: AttributionTouch;
  expiresAt: string;
  consent: AttributionConsentEvidence;
};

export type SelectedClickId = {
  type: ClickIdType;
  value: string;
};

export type ConversionEventKey = "qualified_lead" | "meeting_booked" | "quotation_submitted" | "deal_won";

export type ConversionEventDefinition = {
  key: ConversionEventKey;
  label: string;
  defaultValue: number | "actual_deal_amount";
  currency: "AED";
  enabled: boolean;
  conversionActionIdEnv: string;
  acceptedLeadStatuses?: string[];
  acceptedDealStages?: string[];
};

export type ConversionUploadStatus =
  | "pending"
  | "leased"
  | "retry_scheduled"
  | "sent"
  | "confirmed"
  | "dry_run"
  | "permanent_failure";
