# Canonical lead ID contract

Status: repository implementation complete; live GTM, Google Ads and Zoho configuration remains unmodified and requires approval.

## Contract

GTM container `GTM-MSM8MPD6` is the central browser tracking layer. The Next.js server is the authority that creates the non-PII lead identity. Zoho CRM persists it, and Google Ads uses it for transaction-level reconciliation.

```text
lead_submissions.id
  = website API leadId
  = dataLayer lead_id
  = dataLayer event_id
  = GTM Website Lead transaction ID
  = Zoho Emitronix Lead ID
  = conversion_jobs.source_submission_id
  = conversion_jobs.transaction_id (identity version 2)
  = Data Manager transactionId for each separate CRM-stage action
```

The browser's `submission_id` is intentionally different. It is a transport/idempotency UUID generated before the request and must never be mapped to a Google transaction ID or the Zoho Emitronix Lead ID field.

## End-to-end sequence

1. A visitor arrives with an eligible `gclid`, `gbraid` or `wbraid`; the consent-aware website attribution layer retains it server-side with the enquiry.
2. The browser sends its transport submission UUID to `/api/contact`.
3. The server creates `lead_submissions.id` and treats it as the canonical lead ID.
4. Zoho must create/update the Lead and store that exact value in its **Emitronix Lead ID** custom field.
5. Only after Zoho succeeds, the API returns `leadId` and the temporary compatibility alias `eventId`; both values are identical.
6. The website pushes `generate_lead` into `dataLayer`. GTM-MSM8MPD6 maps `lead_id` unchanged to the Website Lead tag's Transaction ID.
7. A signed Zoho milestone callback contains only the Zoho record ID, event key and time. The server re-fetches Zoho and requires the mapped Emitronix Lead ID.
8. The queue and worker verify that ID against the immutable website ledger. New jobs cannot be inserted unless their Google transaction ID equals the canonical lead ID.
9. Qualified, Meeting, Quotation and Won are sent to separate Google conversion actions with the same ID. Retries never change it.

## Required Zoho fields

In both Leads and, before enabling `deal_won`, Deals:

- Label: **Emitronix Lead ID**
- Type: Single Line
- Minimum length: 64
- API create/update: enabled
- Logical mapping key: `websiteSubmissionId`
- Value: exact server `lead_id`; never email, phone, GCLID, Zoho record ID or browser submission ID

The runtime discovers legacy labels **Website Submission ID** and **Website Event ID** for compatibility. Renaming a live field is optional; the verified API name in `ZOHO_LEADS_FIELD_MAP_JSON` / `ZOHO_DEALS_FIELD_MAP_JSON` is authoritative.

For an existing Zoho Lead, a new eligible paid enquiry may replace the mapped ID with the newest paid enquiry's canonical ID. An organic enquiry cannot overwrite a non-empty paid link. This is a latest-eligible-paid-touch policy for the single deduplicated CRM Lead.

## Required GTM draft configuration

Create or validate these items in a draft workspace only:

- `VAR - Data Layer - Lead ID`: Data Layer Variable v2, name `lead_id`.
- `TRG - Custom Event - Generate Lead`: event equals `generate_lead`, with `lead_id` not empty.
- `TAG - Google Ads - Website Lead`: exact approved conversion ID/label; Transaction ID = `{{VAR - Data Layer - Lead ID}}`; Value = approved `lead_value`; Currency = `currency`.
- Do not create browser tags for `qualified_lead`, `meeting_booked`, `quotation_submitted` or `deal_won`; the server/Data Manager path owns them.

The direct Google Ads tag and GA4 `generate_lead` must not both be imported as duplicate Primary conversions. GTM Preview must show one Website Lead tag only after a successful API/Zoho response and zero on validation, network, API and replay cases.

## Google Ads deduplication model

The identity is scoped with the conversion action:

```text
(Website Lead action, lead_id)
(Qualified Lead action, lead_id)
(Meeting Booked action, lead_id)
(Quotation Submitted action, lead_id)
(Closed Won action, lead_id)
```

A duplicate delivery to the same action is ignored; the same ID in another action remains a distinct funnel stage. The current business model counts at most one event per lead per stage. Counting multiple quotations for one Lead would require an explicitly approved occurrence-ID design and is not enabled.

## Safe rollout

1. Stop the conversion scheduler and take a SQLite-safe backup.
2. Deploy code with uploads disabled and run `npm run migrate:google-zoho` to schema version 5.
3. Run `npm run verify:zoho`; it must resolve the required field and minimum length.
4. Keep `GOOGLE_CONVERSION_UPLOAD_ENABLED=false` and all events disabled.
5. With approval, test one synthetic enquiry in a sandbox/dry run and reconcile the API response, `dataLayer`, Zoho field and CLI report ID.
6. With separate GTM approval, Preview the Website Lead tag; do not Submit or Publish yet.
7. With separate Google/Zoho approval, enable one Secondary CRM action for one controlled test and reconcile Data Manager diagnostics.
8. Publish/activate only after the evidence and conversion IDs/labels are reviewed.

Schema version 5 marks historical jobs as `identity_version=1` and retains their original transaction IDs. Never rewrite sent or confirmed legacy jobs. New jobs are `identity_version=2` and are constrained to the canonical ID.

## Verification evidence

For one authorised test lead, record the same non-PII value from:

- `/api/contact` response `leadId`;
- GTM Preview `generate_lead.lead_id` and Website Lead Transaction ID;
- Zoho Lead Emitronix Lead ID;
- `npm run integration:report` fields `canonicalLeadId`, `googleTransactionId` and `identityVersion`;
- Data Manager request/diagnostics transaction ID.

Do not include raw customer data or full click IDs in screenshots or tickets.
