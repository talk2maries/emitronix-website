import { zohoClient, type ZohoFieldMetadata, type ZohoLogicalField } from "../lib/googleZoho/zohoClient";

const client = zohoClient();
const result = await client.fields("Leads");
const mapped = Object.entries(result.map).sort(([left], [right]) => left.localeCompare(right));
const required: ZohoLogicalField[] = [
  "leadSubSource",
  "websiteSubmissionId",
  "gclid", "gbraid", "wbraid", "campaignId", "campaignName", "adGroupId", "keyword", "matchType",
  "device", "network", "gadSource", "googleAdsSource", "placement", "creative",
  "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
  "firstGclid", "firstGbraid", "firstWbraid", "firstCampaignId", "firstCampaignName", "firstAdGroupId",
  "firstKeyword", "firstMatchType", "firstDevice", "firstNetwork", "firstGadSource", "firstGoogleAdsSource",
  "firstPlacement", "firstCreative", "firstUtmSource", "firstUtmMedium", "firstUtmCampaign", "firstUtmTerm",
  "firstUtmContent", "originalLandingPage", "referringPage", "firstVisitAt", "latestVisitAt",
  "leadQualificationAt", "adUserDataConsent", "conversionUploaded", "conversionUploadedAt", "conversionAction",
  "conversionValue", "conversionUploadStatus", "conversionError", "conversionOrderId", "dataManagerRequestId",
];
const issues: string[] = [];
const byApiName = new Map(result.fields.map((field) => [field.api_name, field]));
const textTypes = new Set(["text", "varchar", "textarea", "picklist", "multiselectpicklist", "phone"]);
const dateFields = new Set<ZohoLogicalField>([
  "firstVisitAt", "latestVisitAt", "leadQualificationAt", "meetingBookedAt", "quotationSubmittedAt", "dealWonAt",
  "conversionUploadedAt",
]);
const booleanFields = new Set<ZohoLogicalField>(["adUserDataConsent", "conversionUploaded"]);
const minimumLengths: Partial<Record<ZohoLogicalField, number>> = {
  websiteSubmissionId: 64,
  gclid: 255,
  gbraid: 255,
  wbraid: 255,
  firstGclid: 255,
  firstGbraid: 255,
  firstWbraid: 255,
  originalLandingPage: 500,
  referringPage: 500,
  conversionError: 500,
  conversionOrderId: 64,
  dataManagerRequestId: 160,
};

for (const logical of required) {
  const apiName = result.map[logical];
  if (!apiName) {
    issues.push(`missing mapping: ${logical}`);
    continue;
  }
  const field = byApiName.get(apiName);
  if (!field) {
    issues.push(`mapped field not returned by metadata: ${logical} -> ${apiName}`);
    continue;
  }
  if (field.api_update === false || field.operation_type?.api_update === false) {
    issues.push(`not API-updatable: ${logical} -> ${apiName}`);
  }
  if (!logical.startsWith("conversion") && (field.operation_type?.api_create === false)) {
    issues.push(`not API-creatable: ${logical} -> ${apiName}`);
  }
  const dataType = (field.data_type || "").toLowerCase();
  if (booleanFields.has(logical) && dataType !== "boolean") {
    issues.push(`wrong type (expected boolean/checkbox): ${logical} -> ${apiName} (${dataType || "unknown"})`);
  } else if (dateFields.has(logical) && dataType !== "datetime") {
    issues.push(`wrong type (expected datetime): ${logical} -> ${apiName} (${dataType || "unknown"})`);
  } else if (logical === "conversionValue" && !["currency", "double", "decimal"].includes(dataType)) {
    issues.push(`wrong type (expected currency/number): ${logical} -> ${apiName} (${dataType || "unknown"})`);
  } else if (!booleanFields.has(logical) && !dateFields.has(logical) && logical !== "conversionValue" && !textTypes.has(dataType)) {
    issues.push(`wrong type (expected text/picklist): ${logical} -> ${apiName} (${dataType || "unknown"})`);
  }
  const minimumLength = minimumLengths[logical];
  if (minimumLength && typeof field.length === "number" && field.length < minimumLength) {
    issues.push(`field too short (minimum ${minimumLength}): ${logical} -> ${apiName} (${field.length})`);
  }
}

function picklistValues(field: ZohoFieldMetadata | undefined) {
  return new Set((field?.pick_list_values || []).flatMap((value) => [value.actual_value, value.display_value]).filter(Boolean));
}

const leadSourceValues = picklistValues(byApiName.get("Lead_Source"));
if (!leadSourceValues.has(client.environment.paidLeadSource)) {
  issues.push(`Lead_Source is missing approved value: ${client.environment.paidLeadSource}`);
}
const subSourceValues = picklistValues(byApiName.get(result.map.leadSubSource || ""));
if (!subSourceValues.has(client.environment.paidLeadSubSource)) {
  issues.push(`Lead Sub Source is missing approved value: ${client.environment.paidLeadSubSource}`);
}
const statusField = byApiName.get(result.map.conversionUploadStatus || "");
if ((statusField?.data_type || "").toLowerCase() === "picklist") {
  const values = picklistValues(statusField);
  for (const status of [
    "dry_run", "sent", "retry_scheduled", "confirmed", "confirmed_with_warnings",
    "confirmed_duplicate_transaction", "permanent_failure",
  ]) {
    if (!values.has(status)) issues.push(`Google Conversion Upload Status is missing picklist value: ${status}`);
  }
}

const layoutId = (process.env.ZOHO_LEADS_LAYOUT_ID || "").trim();
let layoutFieldCount: number | null = null;
if (!/^\d{6,30}$/.test(layoutId)) {
  issues.push("ZOHO_LEADS_LAYOUT_ID is required to verify that mapped fields are on the production Leads layout");
} else {
  const layoutPayload = await client.request<{ fields?: ZohoFieldMetadata[] }>("settings/fields", {
    query: { module: "Leads", type: "all", layout_id: layoutId },
  });
  const layoutNames = new Set((layoutPayload.fields || []).map((field) => field.api_name));
  layoutFieldCount = layoutNames.size;
  for (const logical of required) {
    const apiName = result.map[logical];
    if (apiName && !layoutNames.has(apiName)) issues.push(`field not on configured Leads layout: ${logical} -> ${apiName}`);
  }
}

let dealVerification: Record<string, unknown> | null = null;
if ((process.env.GOOGLE_CONVERSION_ENABLED_EVENTS || "").split(",").map((value) => value.trim()).includes("deal_won")) {
  const dealResult = await client.fields("Deals");
  const dealRequired: ZohoLogicalField[] = [
    "websiteSubmissionId", "gclid", "gbraid", "wbraid", "adUserDataConsent", "dealWonAt",
    "conversionUploaded", "conversionUploadedAt", "conversionAction", "conversionValue",
    "conversionUploadStatus", "conversionError", "conversionOrderId", "dataManagerRequestId",
  ];
  const dealMissing = dealRequired.filter((logical) => !dealResult.map[logical]);
  for (const logical of dealMissing) issues.push(`missing Deals mapping for deal_won: ${logical}`);
  const dealLayoutId = (process.env.ZOHO_DEALS_LAYOUT_ID || "").trim();
  if (!/^\d{6,30}$/.test(dealLayoutId)) issues.push("ZOHO_DEALS_LAYOUT_ID is required when deal_won is enabled");
  dealVerification = {
    enabled: true,
    fieldCount: dealResult.fields.length,
    layoutIdSuffix: dealLayoutId ? dealLayoutId.slice(-4) : null,
    missing: dealMissing,
  };
}

process.stdout.write(
  `${JSON.stringify(
    {
      ok: issues.length === 0,
      mode: "read_only_metadata",
      module: "Leads",
      fieldCount: result.fields.length,
      layoutIdSuffix: layoutId ? layoutId.slice(-4) : null,
      layoutFieldCount,
      dealVerification,
      mapped: Object.fromEntries(mapped),
      issues,
      note: "No Zoho records or settings were changed.",
    },
    null,
    2,
  )}\n`,
);
process.exitCode = issues.length ? 2 : 0;
