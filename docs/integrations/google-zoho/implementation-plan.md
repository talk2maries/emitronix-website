# Implementation and activation plan

Status: code and documentation implementation; all external/live activation steps remain unperformed and approval-gated.

## Selected method

Use a first-party Next.js/Zoho CRM integration and Google Data Manager API `v1`. Data Manager is the current supported path for new offline-conversion integrations and does not require a Google Ads developer token for ingestion. The legacy Ads API click-upload method is not used.

## Completed implementation stages

1. Audit framework, forms, endpoints, Zoho helper, GTM/Consent Mode, environment, hosting, persistence and security gaps.
2. Capture consent-aware first and latest attribution for Google click IDs, ValueTrack fields and UTMs; include it in both enquiry forms.
3. Validate form input/origin/body size, use durable rate limits and browser submission IDs, and create/update Zoho Leads with conflict-safe exact identity matching.
4. Discover actual Zoho field API names through CRM V8 metadata and provide a strict read-only verifier for type, length, permissions, layout and picklists.
5. Add a signed, replay-safe Zoho milestone callback that refetches the authoritative record, requires a Dubai-offset first-occurrence time, and links the job to immutable website consent evidence.
6. Add SQLite migrations for submissions, consent/attribution evidence, webhook receipts, conversion jobs, leases, retries, diagnostics and audit/reporting.
7. Build dry-run-first Google Data Manager payloads, server-side normalization/SHA-256 ECL data, the exact canonical lead ID as every new transaction ID, dual live switches, 401 refresh, async diagnostics and error classification.
8. Add conversion worker, diagnostics processor, long-running scheduler, redacted CLI report, migration/verification/dry-run utilities and automated tests.
9. Prepare Google Ads, Zoho, deployment, rollback, troubleshooting, low-code and verification runbooks.

## Manual approval stages

1. Resolve the legal business-name discrepancy.
2. Approve privacy notice, 90-day attribution retention, consent evidence and ECL data use.
3. Approve read-only Zoho OAuth verification; create/verify fields and layout in a sandbox or controlled environment.
4. Approve one synthetic website Lead; verify create, retry/update, exact duplicate conflict and source preservation.
5. Approve a Zoho custom function/workflow in dry-run mode and its HMAC secret.
6. Approve Google OAuth and a Data Manager `validateOnly` request. This checks request/destination syntax, not real matching or recording.
7. Approve code deployment with all conversion events disabled and scheduler either stopped or dry-run only.
8. Approve one controlled `qualified_lead` conversion with its Google action Secondary; reconcile Data Manager diagnostics, SQLite and Zoho.
9. After an observation period, decide separately whether another milestone or Primary bidding status should be enabled.

Do not enable meeting, quotation or won merely because mappings exist. Do not publish GTM, change live conversion settings, enable Zoho workflows, send a sample Lead, start the production scheduler, deploy, or change bidding without the matching approval.

## Acceptance gates

- `npm run lint`, `npm run type-check`, `npm run test:consent`, `npm run test:google-zoho` and `npm run build` pass.
- `npm audit --omit=dev` is reviewed and unresolved production advisories are accepted or fixed.
- `npm run verify:zoho` passes against the intended organisation/layout without writes.
- `npm run verify:google-ads` passes OAuth; approved `-- --validate-only` passes basic Data Manager validation.
- `npm run conversion:dry-run` proves no outbound upload and exposes no raw click ID or PII.
- Persistent DB path, ownership, backup/restore, scheduler, logs and rollback are verified.
- One exact test plan and named approver are recorded for each external activation.

See [verification-checklist.md](verification-checklist.md) for the final evidence list.
