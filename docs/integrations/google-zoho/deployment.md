# Google–Zoho integration deployment guide

Status: proposed deployment runbook. No deployment, PM2 restart, production secret change, live workflow, GTM publication, or live conversion upload is authorised by this document.

## Production facts and approval boundary

- Repository: `talk2maries/emitronix-website`
- Production path: `/var/www/emitronix_ae`
- PM2 application: `emitronix-next`
- Production port: `8081`
- Deployment command: `deploy-emitronix`
- Runtime requirement: Node.js 20 or newer

The production command may be run only after the user explicitly approves production deployment, the branch/commit is confirmed, and all required checks pass. Google Ads, GTM and Zoho activation are separate approval gates; a code deployment must not silently activate any of them.

## Release strategy

Use four independently reversible switches:

1. Deploy code with attribution capture and CRM compatibility, but Google upload disabled.
2. Validate Zoho field mapping and website Lead handling.
3. Enable the Zoho signed callback in dry-run mode.
4. Enable one approved Data Manager conversion event only after Google and privacy evidence passes.

Default all downstream event flags off. Do not activate meeting, quotation and won merely because their mappings exist.

## Required environment contract

The names below are placeholders for the implementation's server-side contract. Confirm them against `.env.example` before deployment. Real values belong in the production secret store, never Git.

```dotenv
# Master safety controls. Empty enabled-events means no CRM event is eligible.
GOOGLE_CONVERSION_UPLOAD_MODE=dry-run
GOOGLE_CONVERSION_UPLOAD_ENABLED=false
GOOGLE_CONVERSION_ENABLED_EVENTS=

# Persistent integration state (SQLite, outside the public web root)
GOOGLE_ZOHO_DB_PATH=/var/lib/emitronix/google-zoho.sqlite

# Zoho OAuth and fixed endpoints
ZOHO_CLIENT_ID=<secret>
ZOHO_CLIENT_SECRET=<secret>
ZOHO_REFRESH_TOKEN=<secret>
ZOHO_ACCOUNTS_URL=<domain-specific-https-accounts-url>
ZOHO_CRM_MODULE=Leads
ZOHO_LEAD_SOURCE=Website Contact Form
ZOHO_GOOGLE_ADS_LEAD_SOURCE=Advertisement
ZOHO_GOOGLE_ADS_SUB_SOURCE=Google Ads
ZOHO_LEADS_FIELD_MAP_JSON=<validated-json-using-live-api-names>
ZOHO_DEALS_FIELD_MAP_JSON=<validated-json-if-deal-won-is-approved>
ZOHO_GOOGLE_WEBHOOK_SECRET=<secret-with-at-least-32-random-characters>

# Google Data Manager v1 OAuth and destination
GOOGLE_CLOUD_PROJECT_ID=<project-id>
GOOGLE_DATA_MANAGER_CLIENT_ID=<secret>
GOOGLE_DATA_MANAGER_CLIENT_SECRET=<secret>
GOOGLE_DATA_MANAGER_REFRESH_TOKEN=<secret>
GOOGLE_ADS_CUSTOMER_ID=<digits-only>
GOOGLE_ADS_LOGIN_CUSTOMER_ID=<digits-only-if-applicable>
GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID=<numeric-action-id>
GOOGLE_CONVERSION_ACTION_MEETING_BOOKED_ID=<numeric-action-id>
GOOGLE_CONVERSION_ACTION_QUOTATION_SUBMITTED_ID=<numeric-action-id>
GOOGLE_CONVERSION_ACTION_DEAL_WON_ID=<numeric-action-id>

# Optional: only for a separate Google Ads API verification feature
GOOGLE_ADS_DEVELOPER_TOKEN=<secret-if-required>
```

Use the correct Zoho data-centre domains. Do not make API base URLs user-controlled at runtime; production code should allowlist official HTTPS origins. Data Manager ingestion uses the `https://www.googleapis.com/auth/datamanager` OAuth scope. A Google Ads developer token is not the credential for Data Manager event ingestion.

Custom Zoho field API names must be verified from metadata before they are placed in the mapping JSON. The map is configuration rather than a credential, but it should still be change-controlled. Do not deploy placeholder field names. Attribution retention is currently designed around a 90-day default; changing that value requires a reviewed code/configuration change and privacy approval.

## Storage readiness

The idempotency, nonce, submission, retry and diagnostics state must survive process restarts before webhooks can be enabled.

- Create the configured storage directory owned by the application user.
- Use directory mode `0700` and file/database mode `0600`.
- Keep it outside public static paths and back it up according to the approved retention policy.
- Confirm atomic writes/transactions, uniqueness for `(conversion action, canonical lead ID)`, and uniqueness for webhook nonces.
- The implementation uses a local SQLite database with WAL, a busy timeout and transactional uniqueness controls. Keep it on local durable storage, not an NFS/network share. Do not scale across multiple hosts until a shared transactional database adapter is implemented and tested.
- Do not erase the ledger during ordinary deployments; it is what prevents duplicate uploads.

Schema version 5 introduces the canonical lead identity contract. Before applying it in any persistent environment, stop the conversion scheduler, take a SQLite-safe backup, and run `npm run migrate:google-zoho` once. The migration preserves every existing job and transaction ID as `identity_version=1`; it does not replay or rewrite historical conversions. New jobs are `identity_version=2` and the database requires `transaction_id = source_submission_id`.

Create `/var/lib/emitronix` outside the release tree, assign it to the existing non-root application user, and set directory mode `0700`. Back up the SQLite database together with its WAL/SHM files using a SQLite-safe snapshot procedure. The default repository-relative path is for local development only.

## Queue scheduler

The webhook only commits an idempotent queue item. A separate long-running scheduler processes due uploads every two minutes and checks Data Manager diagnostics every fifteen minutes; diagnostics themselves ignore requests younger than thirty minutes.

After the code has been deployed and the signed Zoho callback is explicitly approved, start the scheduler in **dry-run mode** under the same non-root user and working directory as the website:

```bash
pm2 start npm --name emitronix-google-zoho --cwd /var/www/emitronix_ae -- run conversion:scheduler
pm2 save
```

Verify `pm2 logs emitronix-google-zoho`, the SQLite path, dry-run job state, and the protected report before enabling a live event. Use one scheduler instance only; SQLite leases protect accidental overlap, but this design is intentionally single-host. To stop queue processing without stopping the website:

```bash
pm2 stop emitronix-google-zoho
```

Starting, stopping, or saving this PM2 process is a production change and is not authorised by this guide alone.

## Retention and deletion

Preview retention changes without mutation:

```bash
npm run integration:prune
```

After the privacy owner approves the configured retention period, apply with the dual gate:

```bash
GOOGLE_ZOHO_RETENTION_APPLY=true npm run integration:prune -- --apply
```

The procedure redacts expired attribution/consent evidence, removes webhook receipts and stale rate-limit buckets after 24 hours, and removes audit rows older than `GOOGLE_ZOHO_AUDIT_RETENTION_DAYS` (default 400). It deliberately never auto-deletes conversion jobs/order IDs because they are the duplicate-prevention ledger. Any later archival/deletion rule for those jobs requires a separate legal, finance and Google Ads reconciliation decision plus a backup/restore test.

## Pre-deployment checks

From the intended release commit:

```powershell
npm install
npm run lint
npm run type-check
npm run test:consent
npm run test:google-zoho
npm run build
```

Then run server-only read/dry-run checks in an authorised non-production environment:

```powershell
npm run verify:zoho
npm run verify:google-ads
npm run conversion:dry-run
```

Expected safety properties:

- verification commands redact credentials and PII;
- `verify:zoho` reads metadata and permissions without creating/updating a Lead;
- `verify:google-ads` checks OAuth only by default; the separately approved `npm run verify:google-ads -- --validate-only` checks basic Data Manager request/destination syntax without recording a conversion;
- `conversion:dry-run` uses validate-only or a pure payload preview and cannot upload a real conversion;
- tests cover attribution, first-touch preservation, hidden-field payloads, duplicate prevention, OAuth refresh, HMAC/replay, consent, hashing, mapping, retry and invalid dates;
- dependency vulnerability output is reviewed, with every unresolved production finding documented.

Do not continue if a required script is missing, any check fails, metadata fields are unresolved, dry-run safety is uncertain, or live account identity is ambiguous.

## Backups and release record

Before replacing an existing file, retain the task's local ignored backup created during implementation. Before production deployment also capture:

- current branch and commit SHA;
- intended release commit SHA;
- existing production application release/commit;
- redacted environment-variable inventory, not values;
- integration ledger backup and restore test result;
- Google conversion/GTM and Zoho workflow baselines;
- PM2 process count/mode and application health;
- approver, time, change ticket and rollback owner.

## Staged deployment

### Stage A — code dark launch

Deploy with:

```text
GOOGLE_CONVERSION_UPLOAD_MODE=dry-run
GOOGLE_CONVERSION_UPLOAD_ENABLED=false
GOOGLE_CONVERSION_ENABLED_EVENTS=
```

Verify:

- existing website enquiry form behaviour has not regressed;
- consent denial does not send Google user data;
- attribution capture is bounded and does not introduce PII to URLs/logs;
- no Data Manager call occurs;
- existing non-Google Lead sources are preserved;
- admin/CLI reports expose no secrets or unnecessary PII.

### Stage B — Zoho sandbox or authorised synthetic Lead

After separate permission to transmit synthetic data:

- run one create and one retry/update with the same idempotency key;
- confirm one Zoho Lead, correct first/latest attribution and no source overwrite;
- confirm failure handling and redacted logs;
- remove or clearly retain the test record according to the administrator's policy.

### Stage C — signed callback dry run

After Zoho workflow approval:

- enable only the approved test workflow/custom function;
- validate correct signature, invalid signature, stale timestamp and replay rejection;
- confirm missing click ID/Junk/consent failures are held without Google upload;
- confirm the same milestone produces one persistent order ID.
- confirm the Website Lead tag, Zoho Emitronix Lead ID field and every new CRM-stage job show the exact same canonical lead ID;
- confirm separate Qualified and Quotation actions may reuse that ID while a replay to the same action remains deduplicated.

### Stage D — Data Manager activation

After Google, privacy and business approval:

1. Keep action Secondary.
2. Enable `qualified_lead` only. The approved production values are:

   ```text
   GOOGLE_CONVERSION_UPLOAD_MODE=data-manager
   GOOGLE_CONVERSION_UPLOAD_ENABLED=true
   GOOGLE_CONVERSION_ENABLED_EVENTS=qualified_lead
   ```

3. Authorise one controlled event or a narrowly bounded release window.
4. Capture `request_id` and monitor asynchronous diagnostics to terminal status.
5. Reconcile Google, ledger and Zoho status.
6. Observe for at least the agreed period before enabling another event or changing bidding.

## Production deployment command

Only after explicit production approval and the preceding evidence:

```text
deploy-emitronix
```

The operator must run it through the approved production access path, confirm the release SHA, and monitor `emitronix-next`. This guide does not authorise Codex or any operator to execute it now.

## Post-deployment verification

- Website health and project-enquiry endpoint are available.
- One denied-consent journey generates no advertising/user-data transfer.
- One analytics-only journey does not send ad data.
- Storage is writable by the application only and persists across a controlled restart test.
- Retry queue, last success/failure and duplicate-prevention counters are visible.
- No unexpected outbound Data Manager calls occur while the master switch is off.
- Zoho OAuth refresh and metadata reads succeed without token exposure.
- Google Data Manager validate-only succeeds, when authorised.
- Error logs contain correlation IDs/codes but no full names, emails, phones, messages, click IDs, secrets or raw OAuth responses.

Complete [verification-checklist.md](verification-checklist.md) and store the redacted evidence with the release record.
