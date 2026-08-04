# Low-code fallback options

## Recommendation

Keep the preferred production design as the custom, first-party website/Zoho/Data Manager integration described in [architecture.md](architecture.md). It gives the strongest control over first/latest attribution, consent, HMAC/replay protection, idempotency, event enablement, retries, diagnostics and auditable order IDs.

Use a low-code fallback only when engineering ownership or hosting reliability cannot support that integration. Low-code does not remove the need for privacy approval, field governance, duplicate controls, diagnostics, or explicit live Google/Zoho approval.

## Option B1 — Google Ads Data Manager direct Zoho CRM connection

Google lists Zoho CRM as a supported source for importing first-party conversion data. The account administrator can configure the connection in Google Ads Data Manager and map Zoho fields to Enhanced Conversions for Leads. See Google's [Zoho CRM connector instructions](https://support.google.com/google-ads/answer/16318464) and [Data Manager supported sources](https://support.google.com/google-ads-data-manager/table/13860693).

### Suitable when

- Zoho contains clean, stable click IDs and consented email/phone;
- first milestone-entry timestamps are available as fields/history suitable for mapping;
- daily/scheduled sync is acceptable instead of near-real-time callback processing;
- the Google UI supports all needed fields and transformations for this account;
- the administrator prefers a Google-managed connection over custom OAuth/upload code.

### Benefits

- less custom Google API and token-refresh code;
- connection, schedule, field mapping and diagnostics are visible to account administrators;
- Google recommends Data Manager plus Enhanced Conversions for Leads over legacy offline imports;
- avoids the post-15 June 2026 `UploadClickConversions` restriction for new adopters.

### Limitations to validate

- connector availability, permissions and exact GBRAID/WBRAID mapping in the live account;
- ability to express the first transition time rather than `Modified_Time`;
- event-level consent mapping and suppression of Junk/test records;
- deterministic order/transaction ID and duplicate behaviour;
- separate milestone/action mappings and actual Closed Won value;
- schedule latency, diagnostics access and retry visibility;
- connector/account/Zoho plan cost and administrator ownership.

Do not enable the connector until a preview/dry run shows the exact rows and mappings. Keep imported actions Secondary during validation.

## Option B2 — Zoho Flow or Zoho workflow plus a managed HTTP step

A Zoho workflow can invoke Zoho Flow or a reviewed custom function to send a minimal CRM record/event reference to the Emitronix endpoint or a supported Google connector.

### Suitable when

- the organisation already operates and monitors Zoho Flow;
- volume is low and flow-task consumption/cost is acceptable;
- the platform can preserve a stable idempotency key and exact first milestone time;
- failures, retries and dead-letter review are visible to an owner.

### Required controls

- no secret in URL/query parameters;
- HMAC over the exact raw body when the platform supports it, otherwise a long rotated header secret plus strict timestamp/nonce validation;
- fixed allowlisted destination/action/value configuration;
- server-side Zoho record fetch rather than trusting webhook PII or conversion values;
- bounded retries that reuse the same order ID;
- Junk/test/consent filters at both CRM and receiving endpoint;
- audit export containing correlation ID, event, status and retry data without customer PII.

If a low-code step cannot provide replay protection and deterministic idempotency, it must not call Google directly. It may notify the Emitronix backend, which applies those controls.

## Option comparison

| Criterion | Preferred custom integration | Data Manager direct Zoho | Zoho Flow / workflow |
|---|---|---|---|
| First/latest website attribution | Full control | Depends on fields already written to Zoho | Depends on website/CRM fields |
| HMAC and replay controls | Strong, testable | Not applicable to direct scheduled connector | Platform-dependent |
| Idempotency/order ID | Deterministic application ledger | Must verify connector mapping/behaviour | Must be designed explicitly |
| Near-real-time stage upload | Yes, with webhook/queue | Usually scheduled/connector-dependent | Often possible, platform-dependent |
| Async Google diagnostics | Full API request-ID tracking | UI-managed diagnostics | Connector/platform-dependent |
| Custom event/value rules | Versioned code/config | Limited to UI mapping features | Moderate |
| Maintenance | Engineering/on-call ownership | Admin mapping/connection ownership | Flow-task and vendor-change ownership |
| Direct software cost | Hosting/engineering | Verify current Google/Zoho plan costs | Verify Flow task/plan costs |
| Vendor lock-in | Moderate | High to Google connector | High to Zoho Flow/workflow design |
| Best fit | Security/control and durable audit | Simpler scheduled CRM import | Transitional orchestration |

## Controlled fallback decision

Before choosing a low-code path, run a proof in a sandbox or with synthetic data and answer:

1. Can it map the live Zoho API fields, first stage-entry time, consent, one click ID and stable transaction ID?
2. Can it exclude Junk/test/ambiguous records before any Google transfer?
3. What happens on timeout, duplicate delivery, connector outage and record edit?
4. Can an operator retrieve per-request diagnostics and reconcile to Zoho?
5. Who owns credentials, vendor-plan cost, monitoring, field changes and incident response?
6. Can the connection be disabled immediately without disabling website Lead capture?

Record the decision and limitations. Do not operate the custom uploader and direct connector for the same action/record simultaneously; that creates a duplicate-conversion risk.

## Manual approval boundary

Creating a Data Manager connector, authorising Zoho, enabling a Zoho Flow/workflow, accepting Google terms, mapping customer data, or activating a conversion action is a live external change. Stop and obtain explicit approval before any of those steps. This document has not inspected or configured the live connector screens and does not claim the fallback is active.
