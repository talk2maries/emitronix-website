import { buildDataManagerRequest, redactDataManagerRequest } from "../lib/googleZoho/googleDataManager";

const customerId = (process.env.GOOGLE_ADS_CUSTOMER_ID || "1234567890").replace(/-/g, "");
const loginCustomerId = (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/-/g, "") || undefined;
const conversionActionId = process.env.GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID || "123456789";
const request = buildDataManagerRequest(
  {
    conversionActionId,
    transactionId: "00000000-0000-4000-8000-000000000001",
    eventTimestamp: new Date().toISOString(),
    conversionValue: 250,
    currency: "AED",
    clickId: { type: "gclid", value: "TEST_GCLID_NOT_SENT_123456789" },
    consentGranted: true,
    email: "dry-run@example.invalid",
    phone: "+971500000000",
  },
  { customerId, loginCustomerId },
  { validateOnly: true },
);

process.stdout.write(
  `${JSON.stringify(
    {
      ok: true,
      networkCalled: false,
      warning: "Estimated/test payload only. No conversion was sent to Google.",
      request: redactDataManagerRequest(request),
    },
    null,
    2,
  )}\n`,
);
