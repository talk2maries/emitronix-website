import { googleDataManagerEnvironment } from "../lib/googleZoho/env";
import { refreshGoogleDataManagerToken, uploadDataManagerConversion } from "../lib/googleZoho/googleDataManager";

const config = googleDataManagerEnvironment();
if (config.clientId.length < 3 || config.clientSecret.length < 8 || config.refreshToken.length < 8) {
  throw new Error(
    "Google Data Manager OAuth is not configured. Set GOOGLE_DATA_MANAGER_CLIENT_ID, GOOGLE_DATA_MANAGER_CLIENT_SECRET, and GOOGLE_DATA_MANAGER_REFRESH_TOKEN.",
  );
}
await refreshGoogleDataManagerToken(config, { force: true });
const validateOnlyRequested = process.argv.includes("--validate-only");
let validateOnlyResult: unknown = null;
if (validateOnlyRequested) {
  const clickId = (process.env.GOOGLE_VERIFY_TEST_GCLID || "").trim();
  const conversionActionId = (process.env.GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID || "").trim();
  if (!clickId || !/^\d+$/.test(conversionActionId)) {
    throw new Error(
      "--validate-only requires GOOGLE_VERIFY_TEST_GCLID and GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID.",
    );
  }
  validateOnlyResult = await uploadDataManagerConversion(
    {
      conversionActionId,
      transactionId: `validation-${Date.now()}`,
      eventTimestamp: new Date().toISOString(),
      conversionValue: 250,
      currency: "AED",
      clickId: { type: "gclid", value: clickId },
      consentGranted: false,
    },
    { validateOnly: true, allowRemoteValidation: true },
  );
}
process.stdout.write(
  `${JSON.stringify(
    {
      ok: true,
      mode: "oauth_only_read_only",
      api: "Google Data Manager API v1",
      customerIdSuffix: config.customerId.slice(-4),
      loginCustomerIdSuffix: config.loginCustomerId?.slice(-4) || null,
      cloudProjectConfigured: Boolean(config.cloudProjectId),
      liveUploadsEnabled: config.mode === "data-manager" && config.liveEnabled,
      validateOnlyResult,
      note: validateOnlyRequested
        ? "OAuth and Data Manager validate-only completed. No conversion was uploaded."
        : "OAuth succeeded. Re-run with -- --validate-only after approval to verify the configured conversion action; no conversion was uploaded.",
    },
    null,
    2,
  )}\n`,
);
