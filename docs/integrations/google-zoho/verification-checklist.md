# Google–Zoho final verification checklist

Status: **not executed**. Every item is intentionally unchecked until evidence exists. This checklist does not authorise a live change.

## Identity and approvals

- [ ] An authorised owner resolved “Emitronix Contracting LLC” in `data/site.ts` versus “Emitronix Building Contracting LLC” in the request.
- [ ] Google Ads customer ID, optional manager ID, Zoho organisation/environment and GTM container ownership are confirmed.
- [ ] Privacy/legal owner approved attribution retention, consent language, Google customer-data use and enhanced-conversion fields.
- [ ] Business owner approved event definitions, values and exactly which events are enabled.
- [ ] Explicit approvals are recorded separately for Google Ads changes, GTM publish, Zoho fields/workflows, test data and production deployment.

## Repository and release quality

- [ ] Existing changed/untracked user files were preserved.
- [ ] Every replaced source/config file has an ignored recoverable backup.
- [ ] Secrets are environment-only and no credential/customer data appears in Git history.
- [ ] `npm install` completed for the intended lockfile.
- [ ] `npm run lint` passes.
- [ ] `npm run type-check` passes.
- [ ] `npm run test:consent` passes.
- [ ] `npm run test:google-zoho` passes.
- [ ] `npm run build` passes.
- [ ] Production dependency vulnerabilities were reviewed and any exception documented.

## Attribution and forms

- [ ] `gclid`, `gbraid`, `wbraid`, `gad_source`, campaign/ad group, keyword, match type, device, network, placement, creative and UTMs are captured when present.
- [ ] First touch survives navigation, refresh, return visit and later direct traffic.
- [ ] Latest touch updates only for an accepted attributable visit.
- [ ] Values have strict length/character/URL limits and are revalidated server-side.
- [ ] Attribution expiry matches the approved retention period.
- [ ] Every project-enquiry form includes the same attribution contract.
- [ ] Direct, AJAX and any server-action submission paths preserve the contract.
- [ ] No OAuth secret or CRM credential is present in browser code.
- [ ] Names, email, phone and message do not enter URLs, `dataLayer` or analytics parameters.
- [ ] A failed submission fires no `generate_lead`.
- [ ] One API-confirmed submission returns/reuses one non-PII `event_id` and fires once.

## Zoho CRM

- [ ] `npm run verify:zoho` reads the intended organisation/module and prints no token/PII.
- [ ] Live Leads metadata resolves every required custom field API name, type, length and permission.
- [ ] Active layout and picklist values are confirmed.
- [ ] `Advertisement` and `Google Ads` source rules are approved.
- [ ] Existing unrelated Lead Source values are preserved.
- [ ] One synthetic create stores expected first/latest attribution and original enquiry context.
- [ ] Retrying the same submission updates/returns the same Lead rather than creating another.
- [ ] Email/mobile/click-ID conflict is held for manual review rather than auto-merged.
- [ ] OAuth refresh, timeout, bounded retry and rate-limit handling are verified.
- [ ] Logs contain correlation IDs and stable error codes but no secret/full PII.

## Webhook security

- [ ] Exact raw-body HMAC-SHA256 succeeds with the active secret.
- [ ] Wrong signature and a mutated body are rejected.
- [ ] Missing/stale/future timestamps are rejected.
- [ ] A nonce reused with a different body is rejected after restart; an exact transport retry returns the existing job without another conversion.
- [ ] Content type, body size, schema, record ID and event key are validated.
- [ ] The server fetches the current Zoho record and ignores client-supplied conversion action/value.
- [ ] Junk, spam, test, lost and unapproved statuses are not uploaded.
- [ ] Workflow/status write-back cannot recursively generate another conversion.

## Conversion logic

- [ ] First milestone timestamps are auditable and do not change on later record edits.
- [ ] `Asia/Dubai` timestamps convert correctly to RFC 3339 instants, including invalid/future checks.
- [ ] Exactly one eligible click ID is selected using tested precedence: `gclid`, then `gbraid`, then `wbraid`.
- [ ] Missing/invalid advertising identifiers produce a held/not-eligible state.
- [ ] Website `lead_id`, GTM Website Lead transaction ID, Zoho Emitronix Lead ID, ledger source ID and each new Data Manager transaction ID are exactly equal.
- [ ] The canonical lead ID is server-generated, contains no PII, is no more than 64 characters and is unique within each conversion action.
- [ ] Separate Website, Qualified, Meeting, Quotation and Won actions may reuse the same lead ID; a repeat in the same action is deduplicated.
- [ ] A duplicate callback and a retry reuse the same order ID.
- [ ] Qualified = AED 250, meeting = AED 500 and quotation = AED 1,000 only when their versioned config is approved.
- [ ] Closed Won uses an approved actual amount and `AED`; missing/invalid amount is held or follows an approved fallback.
- [ ] All events default disabled; only the specifically approved event is enabled.

## Consent and enhanced conversions

- [ ] Missing/disallowed consent causes no user-data upload.
- [ ] Email normalisation and SHA-256 output pass official test vectors.
- [ ] Phone is converted to unambiguous E.164 before SHA-256; ambiguous numbers are not guessed.
- [ ] Hashing occurs server-side only.
- [ ] Raw/normalised email and phone never appear in logs, queue/admin output or Google request diagnostics stored for operators.
- [ ] Consent state and policy version are retained for each event.

## Google Ads and Data Manager

- [ ] Selected method is Google Data Manager API `v1`.
- [ ] No new `UploadClickConversions` dependency is used; the 15 June 2026 new-adopter restriction is documented.
- [ ] `npm run verify:google-ads` confirms API, OAuth scope and intended destination without changing account settings.
- [ ] Customer ID, optional login account and conversion action destination IDs are allowlisted configuration.
- [ ] `npm run conversion:dry-run` cannot send a live conversion.
- [ ] Validate-only request succeeds with synthetic data.
- [ ] Invalid payload fast-fails and is not treated as partially processed.
- [ ] Eligible `429`/transport/`5xx` errors retry with bounded backoff/jitter and stable order ID.
- [ ] Permanent validation/policy errors do not retry indefinitely.
- [ ] HTTP acceptance records `request_id` but does not mark the Zoho conversion uploaded.
- [ ] Diagnostics polling reaches and stores terminal destination status.
- [ ] One approved live test, if separately authorised, reconciles Google request, ledger and Zoho fields.

## GTM and Google Ads account

- [ ] Auto-tagging is enabled and redirects preserve click IDs.
- [ ] Final URL suffix/custom parameters resolve correctly for `Warehouse Construction Dubai`.
- [ ] The exact website conversion ID/label is in the GTM draft.
- [ ] Google tag and Conversion Linker are present once, not duplicated.
- [ ] Website conversion triggers only from API-confirmed `generate_lead`, not the broken `div.bg-blue-50` visibility selector.
- [ ] Denied marketing consent prevents the Ads tag/user-data transfer.
- [ ] GTM Preview shows exactly one conversion for success and zero for failure/retry/direct confirmation visit.
- [ ] Website raw lead is the only initial Primary action.
- [ ] Qualified and other CRM stages are Secondary or disabled.
- [ ] “Unverified” and “No recent conversions” are checked at action-level diagnostics and corrected using documented evidence.
- [ ] GTM remains unpublished until explicit publication approval.

## Persistence, monitoring and operations

- [ ] Ledger/queue/nonce storage survives restart and enforces `(conversion_action, transaction_id)` uniqueness plus `transaction_id = source_submission_id` for identity-version-2 jobs.
- [ ] Storage directory/file permissions are restricted and it is outside the public web root.
- [ ] SQLite WAL/busy-timeout behaviour is tested on local durable storage; multi-host deployment is blocked until a shared transactional store exists.
- [ ] Admin/CLI can filter date, campaign, action, upload status and CRM record ID.
- [ ] Report shows attributed leads, missing click ID, qualified, success, failure, duplicates prevented, value, last sync and retry state.
- [ ] Admin/CLI exposes no secrets or unnecessary PII.
- [ ] Backup restore and rollback switches are tested.
- [ ] Alert thresholds and an incident owner are assigned.
- [ ] `npm run integration:prune` previews expired evidence/nonces/audits; approved dual-gated apply is tested on a backup. Conversion jobs/request IDs remain retained until a separately approved archival rule exists.

## Final sign-off

| Role | Name | Decision | Date/time | Evidence reference |
|---|---|---|---|---|
| Business owner |  |  |  |  |
| Privacy/legal owner |  |  |  |  |
| Zoho administrator |  |  |  |  |
| Google Ads/GTM administrator |  |  |  |  |
| Engineering reviewer |  |  |  |  |
| Production approver |  |  |  |  |

Do not mark the integration complete or enable production uploads until every applicable item is evidenced and the relevant sign-offs are recorded.
