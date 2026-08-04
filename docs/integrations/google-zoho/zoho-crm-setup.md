# Zoho CRM administrator setup

Status: manual runbook only. It does not assert that custom fields, OAuth scopes, workflows, webhooks, functions, reports, or a sample Lead have been created in the live Zoho organisation.

## Approval gate

Explicit Zoho administrator approval is required before any live change. Take a configuration export/screenshots first. Do not create a workflow, enable a webhook, add a production secret, modify a layout, or submit a sample customer record during an unapproved implementation session.

## 1. Verify organisation, data centre and layout

1. Confirm the intended Zoho CRM organisation and environment (production, sandbox or developer).
2. Confirm that the Leads module API name is `Leads` and record the active Lead layout ID.
   Create an API-updatable single-line **Emitronix Lead ID** field (minimum 64 characters) and map it with logical key `websiteSubmissionId`. If `deal_won` is ever approved, add the same field to Deals and copy it unchanged, with the required attribution/consent fields, during Lead conversion; otherwise the server fails closed.
3. Identify the organisation's Zoho accounts URL and API domain. The refresh response's `api_domain` is authoritative for API calls.
4. Confirm who may view attribution, consent and upload error fields.
5. Confirm the verified business identity. The repository says **Emitronix Contracting LLC**; the request's longer variation is unresolved.

Zoho tokens are organisation/environment specific. Zoho requires the domain-specific Accounts URL for refresh and returns an `api_domain`; see [Refresh Access Token](https://www.zoho.com/crm/developer/docs/api/v8/refresh.html).

## 2. Create and approve custom fields

Use [field-mapping.md](field-mapping.md) as the proposed inventory. In **Setup > Customization > Modules and Fields > Leads**:

1. Create only the approved fields, with appropriate type and length.
2. Add them to an “Advertising attribution and conversion sync” section on the intended layout.
3. Do not mark the Google Conversion Order ID globally unique: the same canonical lead ID is intentionally reused across separate funnel-stage conversion actions. Apply duplicate rules per conversion action in the integration ledger. Make click-ID fields unique only after checking existing data and confirming the duplicate policy.
4. Restrict consent, identifiers and error fields to necessary profiles.
5. Add exact approved picklist values, including `Advertisement`, `Google Ads`, and the upload states, if the business accepts them.
6. Do not make integration-result fields editable by ordinary sales users unless there is a defined correction workflow.
7. Retrieve `/crm/v8/settings/fields?module=Leads` and map labels to the actual `api_name`; never guess custom API names.

Zoho documents the metadata endpoint and use of API names in the [Fields Metadata API](https://www.zoho.com/crm/developer/docs/api/v8/field-meta.html).

## 3. Lead-source policy

For a newly created, Google-attributed enquiry:

- set the standard Lead Source to `Advertisement` only if that exact picklist value is approved;
- set the approved Lead Sub Source field to `Google Ads`;
- preserve the original message and sanitised page context;
- store first-touch attribution without later overwrites;
- store latest-touch attribution in separate fields.

For an existing Lead, do not replace a non-empty unrelated source. Update Google-specific/latest-touch fields only when the identity resolution rule safely matches the person/organisation. Ambiguous duplicates go to manual review.

## 4. OAuth connection

Create a dedicated server-side OAuth client and refresh token for the selected Zoho organisation. Use least privilege sufficient for:

- reading Leads and the fields required for conversion evaluation;
- creating/updating Leads for website enquiries;
- reading field/module metadata;
- updating only the conversion status fields;
- reading related Deals only if `deal_won` is approved;
- reading webhook configuration only for verification, if required.

Avoid broad `ZohoCRM.modules.ALL` or `ZohoCRM.settings.ALL` when narrower module operation scopes meet the need. Keep the client ID, client secret and refresh token in deployment environment secrets. Never put them in a `NEXT_PUBLIC_` variable, Zoho workflow URL, source code, ticket, or screenshot.

Run the read-only connection and metadata verification command before enabling writes:

```powershell
npm run verify:zoho
```

The command should report organisation/environment, API version, required field readiness and permission failures without printing tokens or PII.

## 5. Duplicate-prevention policy

Configure and test the following order:

1. Existing integration submission ID to Zoho record mapping.
2. Exact approved unique click-ID match, with identity conflict checks.
3. Normalised email match.
4. Normalised E.164 mobile match.
5. Create only when there is no safe match.

Zoho's Leads upsert checks `Email` by default and can include user-defined unique fields. See [Upsert Records v8](https://www.zoho.com/crm/developer/docs/api/v8/upsert-records.html). Do not rely on upsert alone for Google conversion idempotency; the separate persistent order ID is mandatory.

## 6. Milestone definitions and fields

The sales owner must approve a single, auditable definition and first-entry timestamp for each event:

| Event | Required CRM evidence | Default value | Initial state |
|---|---|---:|---|
| Qualified Lead | Lead Status first becomes exactly `Qualified`; not Junk/spam | AED 250 | Approved mapping but Secondary in Google |
| Meeting Booked | Confirmed Meeting/activity or approved Lead field with time | AED 500 | Disabled until confirmed |
| Quotation Submitted | Issued Quote or approved first quotation-stage time | AED 1,000 | Disabled until confirmed |
| Deal Won | Related Deal first becomes `Closed Won`; amount validated | Actual Deal Amount in AED | Disabled until confirmed |

Do not use `Modified_Time` as the conversion time. Preserve the first stage-entry time so later edits do not shift the conversion. Do not activate all four workflows by default.

## 7. Signed workflow callback

Use the reviewed [Zoho Deluge signed-callback template](zoho-signer-example.md) as the starting point; confirm syntax and secure-secret storage in the organisation's Zoho edition before enabling it.

Recommended production path:

1. Create a workflow rule for the approved first transition only, with explicit exclusions for Junk, spam, test and disqualified states.
2. Invoke a reviewed Zoho custom function.
3. The function constructs the exact minimal JSON body: `module`, `recordId`, `eventKey`, and `occurredAt`. `occurredAt` is the immutable first milestone time in RFC 3339 with the Dubai `+04:00` offset.
4. Compute HMAC-SHA256 over the exact UTF-8 raw body using the shared webhook secret.
5. POST to the fixed HTTPS endpoint with `x-emitronix-signature`, `x-emitronix-timestamp` (Unix seconds), and `x-emitronix-nonce` (a cryptographically random 16+ character value).
6. Do not include email, phone, message, click ID, conversion value or action ID in the callback. The server fetches the current Lead and uses allowlisted configuration.

A native workflow webhook may support custom headers but may not be able to compute an HMAC over the exact raw body. Confirm capability in the live edition. If unavailable, use the custom function. A strong rotated shared-secret header is the minimum temporary fallback; never put it in the query string.

The endpoint rejects stale timestamps, a nonce reused with a different body, invalid signatures, unexpected content types, oversized bodies, unknown event keys and malformed record IDs. An exact transport retry with the same nonce/body returns the already-created job when present; it cannot create a second conversion. This implementation has one active key and no overlap key ID: rotate it through a coordinated workflow pause, server-secret update, workflow update and signed test.

Zoho's webhook APIs are documented under [Webhook Actions v8](https://www.zoho.com/crm/developer/docs/api/v8/get-webhooks.html).

## 8. Status write-back

The integration, not the initiating workflow, owns these fields:

- upload status;
- conversion action key/name;
- approved value and currency;
- persistent order ID;
- Data Manager request ID;
- terminal uploaded flag/time;
- redacted failure code/summary.

Do not mark uploaded on HTTP acceptance alone. Data Manager processing is asynchronous; only a terminal destination success sets the boolean. To avoid workflow loops, exclude integration status-field changes from conversion-trigger criteria or use a dedicated integration user and transition guard.

## 9. Failure and retry view

Create a restricted custom view named, for example, **Google Conversion Sync - Needs Review**, filtered to eligible records whose upload status is `failed` or `held`. Include only operational columns:

- Zoho record ID;
- Lead owner;
- event/action;
- occurrence time;
- click-ID-present flag, not the full ID where unnecessary;
- upload status and redacted error;
- retry count/next retry time;
- Data Manager request ID;
- last sync time.

Create a separate read-only report for attributed leads, qualification count, conversion value and status by campaign/date. Do not show OAuth secrets, webhook secrets, raw hashed identifiers, full click IDs, or unnecessary PII.

## 10. Junk and test controls

- Exclude every known Junk/spam/disqualified status at workflow and server layers.
- Require an actual approved transition, not mere record modification.
- Label authorised tests with a dedicated test flag/source; keep conversion uploads in validate-only mode unless the Google administrator approves one real test.
- Prevent test/Junk records from contributing value or primary bidding data.
- Never delete a production Lead merely to retry; correct the record or release the held event through an audited process.

## 11. Activation sequence

1. Create/verify fields in a Zoho sandbox or controlled test layout.
2. Run metadata and permission verification.
3. Exercise website Lead create and safe update with synthetic data.
4. Create workflows/functions disabled or pointing to a non-production dry-run endpoint.
5. Verify signature, replay rejection, missing identifier, Junk exclusion and idempotency.
6. Review the resulting Lead and audit ledger.
7. Obtain explicit approval for the exact live fields/workflows and one test plan.
8. Enable one event (`qualified_lead`) first; leave the others disabled.
9. Monitor failures/duplicates before considering additional milestones.

No activation step above has been performed by this documentation work.
