# Google–Zoho integration troubleshooting

Start with the correlation/event ID, Zoho record ID, conversion key and Google Data Manager `request_id`. Do not paste names, emails, phone numbers, messages, OAuth tokens, webhook secrets, full click IDs, or raw API bodies into tickets or shared logs.

## Safe diagnostic commands

These commands are expected to be read-only or dry-run. Confirm their implementation before using production credentials.

```powershell
npm run verify:zoho
npm run verify:google-ads
npm run conversion:dry-run
```

If any command prints a secret or customer PII, stop, revoke/rotate exposed credentials as appropriate, and fix redaction before continuing.

## Symptom matrix

| Symptom | Likely checks | Safe action |
|---|---|---|
| Website form succeeds but no Zoho Lead is found | Correlation ID; Zoho response status; upsert result; duplicate match; queue/ledger status | Search by stored Zoho record ID, not only name; retry only with the same idempotency key |
| Form returns an error and no Lead exists | Request schema, size, origin, rate limit, OAuth refresh, Zoho validation errors | Correct the source error; do not fire `generate_lead`; never bypass validation |
| Zoho `401` / invalid OAuth token | Correct organisation/environment; accounts URL; refresh token; OAuth scopes; server clock | Refresh through the domain-specific Accounts URL; rotate only through approved secret handling |
| Zoho `INVALID_DATA` or unknown field | Live field metadata, API name, type, length, picklist and active layout | Run metadata verification; update mapping; never guess a custom API name |
| Zoho `429` or concurrency error | Organisation/app concurrency, bulk size, overlapping retries | Respect limits, back off with jitter, reduce concurrency; see [Zoho API limits](https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html) |
| Duplicate Leads | Submission ledger; email/mobile normalisation; click-ID uniqueness; upsert fields; simultaneous requests | Stop writes if widespread; preserve records; reconcile before merging; enforce atomic unique keys |
| Existing Lead source was overwritten | Existing-record update policy; field-mapping version | Stop the offending update path; restore from audit history; preserve unrelated source values |
| Webhook `401/403` | Exact raw body; Unix-seconds timestamp; nonce/signature headers; proxy body mutation | Reproduce with synthetic payload; compute HMAC over identical bytes; do not disable authentication |
| Webhook rejected as stale/replay | Server/Zoho clock; timestamp units; nonce reused with changed body | Correct clocks; preserve the same nonce/body only for an exact transport retry, otherwise generate a new nonce; keep the conversion order ID stable |
| Zoho workflow loops | Trigger includes integration status fields; status write-back retriggers rule | Narrow to first business-stage transition; exclude integration-user/status-only updates |
| CRM milestone held: missing click ID | First-touch capture; redirects; auto-tagging; field mapping; visitor may not be ad-attributed | Keep held/not eligible; do not invent an ID or upload as attributed |
| CRM milestone held: consent | Missing/disallowed consent state or policy version | Do not upload user data; obtain legal/product guidance rather than assuming consent |
| CRM milestone held: invalid date | Stage history absent, future timestamp, timezone ambiguity | Use the first auditable milestone instant; parse with `Asia/Dubai`; do not substitute current time |
| Data Manager synchronous `INVALID_ARGUMENT` | Destination/action ID, timestamp, currency, identifier, schema, hash encoding | Correct payload and resend the whole request with the same transaction ID; Data Manager fast-fails the request |
| Data Manager `401/403` | Data Manager API enabled; OAuth scope; destination access; customer-data terms; correct project/account | Fix access/terms through an authorised admin; do not switch to another developer token to bypass restrictions |
| Data Manager `429`, timeout or eligible `5xx` | Quota, concurrency, network and attempt history | Retry with bounded exponential backoff/jitter and the same transaction ID; honour maximum attempts/age |
| `events:ingest` returns HTTP 200 but Zoho says pending | This is expected asynchronous processing; `request_id` present | Poll `requestStatus:retrieve`; do not mark uploaded until destination reaches terminal success |
| Diagnostics `PARTIAL_SUCCESS` or `FAILURE` | Per-destination error/warning counts; invalid click ID; consent/terms; action mapping | Hold failed records, correct cause and replay only eligible events with stable transaction IDs |
| Diagnostics says invalid GCLID | Truncation, decoding, wrong field, synthetic value used as real, retention/window | Do not modify the ID; mark not eligible/failed and repair capture for future visits |
| Low enhanced-conversion match | Consent coverage, normalisation, hash format, field freshness | Verify normalisation/hashing against current Google guidance; never log raw values to debug matching |
| Duplicate Google conversions | New order ID generated on retry; two workflows; raw/offline actions both Primary | Disable uploads, identify transaction IDs/actions, restore deterministic idempotency, review campaign goals |
| Wrong conversion value | Event mapping/version, unapproved Deal amount/currency, duplicate stage event | Disable affected event; correct config; do not issue a correction until the Google admin approves current supported procedure |
| Admin report differs from Zoho | Date definition, `Asia/Dubai` conversion, filters, async diagnostics, late CRM edits | Reconcile on stable record/event/order IDs and terminal status; document metric definitions |

## Google “Unverified” and “No recent conversions”

The overview screenshot showed these states. Diagnose the individual action under **Goals > Conversions > Summary**:

- **Unverified website action:** compare its exact conversion ID/label to the GTM draft, confirm Google tag and Conversion Linker, trigger only from API-confirmed `generate_lead`, then use GTM Preview/Tag Assistant. Failed submissions, duplicate clicks and direct confirmation-page visits must not fire. Publish only with approval.
- **No recent conversions:** confirm whether any eligible ad click and successful Lead actually occurred in the reporting window. If not, the status can be informational. If one did, inspect tag firing, consent, date/time zone, action ID/label, campaign goal inclusion and diagnostics.
- **Imported action:** use Data Manager request diagnostics, not browser-tag detection. Confirm terminal destination status, click ID, first milestone time, action ID, consent and stable transaction ID.

Do not resolve the card by making every Contact action Primary. Full correction steps are in [google-ads-setup.md](google-ads-setup.md).

## Data Manager error model

Data Manager API performs synchronous basic validation using a fast-fail model: if the request fails, none of its data is processed. A successful request returns a `request_id`, but deeper processing is asynchronous. Capture request IDs and inspect destination status until `SUCCESS`, `PARTIAL_SUCCESS`, or `FAILURE`; processing may take up to 24 hours. See [Understand API errors](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors) and [Diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics).

Never blindly replay a request whose synchronous result is unknown. First check whether a request ID/order ID was stored and whether the destination processed it.

## Incident severity

- **Critical:** secret/PII exposure; unauthorised upload; systematic duplicate/wrong-value Primary conversions. Disable upload immediately, preserve evidence, rotate affected credentials and engage account administrators.
- **High:** website enquiries lost; Zoho duplicates/source corruption; HMAC bypass/replay; persistent Data Manager failures. Disable the affected path and use the approved manual lead route while fixing.
- **Medium:** a Secondary action delayed/held; report mismatch; isolated invalid click ID. Keep the record held, reconcile and correct without broad live changes.
- **Low:** expected no-recent-conversion state on a new/no-click campaign; cosmetic dashboard lag with authoritative records intact.

## Escalation bundle

Provide only redacted evidence:

- UTC and `Asia/Dubai` timestamps;
- environment name and release commit;
- correlation/event/order IDs and Zoho record ID;
- Google request ID and terminal destination status;
- HTTP status and stable error code;
- mapping/config version and enabled event flags;
- retry count and last/next attempt;
- whether click ID and consent are present as booleans, not their values;
- exact reproduction with synthetic data.

Google recommends retaining the Data Manager request ID for support. Never include OAuth tokens or full customer identifiers.
