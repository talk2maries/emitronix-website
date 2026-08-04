import type { ConversionEventDefinition, ConversionEventKey } from "@/lib/googleZoho/types";

/**
 * All CRM milestones are intentionally disabled by default. Enable only the
 * approved bidding/observation events through GOOGLE_CONVERSION_ENABLED_EVENTS.
 */
export const conversionEvents: Record<ConversionEventKey, ConversionEventDefinition> = {
  qualified_lead: {
    key: "qualified_lead",
    label: "Qualified Lead",
    defaultValue: 250,
    currency: "AED",
    enabled: false,
    conversionActionIdEnv: "GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID",
    acceptedLeadStatuses: ["Qualified"],
  },
  meeting_booked: {
    key: "meeting_booked",
    label: "Site Visit or Meeting Booked",
    defaultValue: 500,
    currency: "AED",
    enabled: false,
    conversionActionIdEnv: "GOOGLE_CONVERSION_ACTION_MEETING_BOOKED_ID",
    acceptedLeadStatuses: ["Meeting Booked", "Site Visit Confirmed"],
  },
  quotation_submitted: {
    key: "quotation_submitted",
    label: "Quotation Submitted",
    defaultValue: 1000,
    currency: "AED",
    enabled: false,
    conversionActionIdEnv: "GOOGLE_CONVERSION_ACTION_QUOTATION_SUBMITTED_ID",
    acceptedLeadStatuses: ["Quotation Submitted", "Quoted"],
  },
  deal_won: {
    key: "deal_won",
    label: "Deal Won",
    defaultValue: "actual_deal_amount",
    currency: "AED",
    enabled: false,
    conversionActionIdEnv: "GOOGLE_CONVERSION_ACTION_DEAL_WON_ID",
    acceptedDealStages: ["Closed Won"],
  },
};

export class ConversionEventConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConversionEventConfigError";
  }
}

export function enabledConversionEventKeys(env: NodeJS.ProcessEnv = process.env) {
  const enabled = new Set(
    (env.GOOGLE_CONVERSION_ENABLED_EVENTS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
  return enabled;
}

export function resolveConversionEvent(
  eventKey: string,
  record: { leadStatus?: string; dealStage?: string; actualDealAmount?: number },
  env: NodeJS.ProcessEnv = process.env,
) {
  if (!(eventKey in conversionEvents)) throw new ConversionEventConfigError("Unsupported conversion event.");
  const definition = conversionEvents[eventKey as ConversionEventKey];
  if (!enabledConversionEventKeys(env).has(definition.key)) {
    throw new ConversionEventConfigError(`Conversion event ${definition.key} is not enabled.`);
  }
  if (definition.acceptedLeadStatuses?.length && !definition.acceptedLeadStatuses.includes(record.leadStatus || "")) {
    throw new ConversionEventConfigError(`Lead status is not eligible for ${definition.key}.`);
  }
  if (definition.acceptedDealStages?.length && !definition.acceptedDealStages.includes(record.dealStage || "")) {
    throw new ConversionEventConfigError(`Deal stage is not eligible for ${definition.key}.`);
  }
  const conversionActionId = (env[definition.conversionActionIdEnv] || "").trim();
  if (!/^\d+$/.test(conversionActionId)) {
    throw new ConversionEventConfigError(`Missing or invalid ${definition.conversionActionIdEnv}.`);
  }
  const value =
    definition.defaultValue === "actual_deal_amount"
      ? Number(record.actualDealAmount)
      : definition.defaultValue;
  if (!Number.isFinite(value) || value <= 0) {
    throw new ConversionEventConfigError(`A positive conversion value is required for ${definition.key}.`);
  }
  return { definition, conversionActionId, value, currency: definition.currency };
}
