# Google–Zoho integration rollback

This runbook separates stopping data movement from rolling back website code. Prefer the smallest safe, reversible action. Preserve the integration ledger and evidence unless the incident commander explicitly approves deletion under the retention policy.

## Emergency stop order

If duplicate, unauthorised, or incorrect conversions may be uploading:

1. Set the server-side master upload switch to false:

   ```text
   GOOGLE_CONVERSION_UPLOAD_ENABLED=false
   GOOGLE_CONVERSION_UPLOAD_MODE=dry-run
   GOOGLE_CONVERSION_ENABLED_EVENTS=
   ```

2. Remove the affected key from `GOOGLE_CONVERSION_ENABLED_EVENTS`.
3. Disable or pause the relevant Zoho workflow/custom function callback after capturing its current configuration.
4. Pause queue workers/diagnostic reconciliation only if they cannot operate safely with uploads disabled. Reading terminal status for already accepted requests is normally safe and useful.
5. If the browser website conversion is the problem, pause the affected GTM tag or restore the previously published GTM version. This is a separate live change requiring the authorised GTM administrator.
6. If bidding could be harmed, have the Google Ads administrator remove the affected conversion action from campaign goals or make it Secondary. Do not delete the action or conversion history during incident triage.

These live actions require explicit administrator authority even during rollback. If authority is unavailable, disable the application-side upload path first and document the remaining exposure.

## Code rollback

1. Identify the last known-good commit and current release SHA.
2. Confirm whether the issue is code, environment, CRM configuration, GTM or Google destination configuration.
3. Back up the current integration ledger and redacted logs.
4. Revert through a reviewed Git commit or redeploy the last known-good release. Do not use destructive `git reset --hard` against a dirty/shared workspace.
5. Keep new integration environment switches off while the old code is restored.
6. Run the previous release's health/build checks and verify the existing website form still reaches Zoho.
7. Confirm PM2 is running the intended SHA and the local SQLite store is on the intended durable local volume.

The production deployment/restart mechanism remains `deploy-emitronix` for the approved release and must not be invoked without explicit production approval.

## Configuration rollback

### Zoho

- Disable workflow rules/functions before deleting or renaming any field.
- Keep attribution and upload fields until the ledger/CRM reconciliation is complete.
- Restore prior Lead Source picklist/layout permissions from the captured baseline.
- Rotate the webhook secret if it was exposed; support the old/new key only for the minimum controlled overlap.
- Do not remove a unique-field constraint without checking whether it would allow duplicates.

### Google Ads and GTM

- Restore the prior GTM container version rather than editing multiple tags ad hoc.
- Return action roles and campaign goals to the captured baseline.
- Keep bad/imported actions Secondary while investigating; deletion can remove useful diagnostics and does not undo historical bidding effects.
- Revoke the integration OAuth grant if credentials are compromised, then rotate the client secret/refresh token.
- Disable the Data Manager API or destination permission only when necessary; doing so also stops diagnostics access.

### Environment and storage

- Restore the previous redacted variable inventory and secret versions through the approved secret manager.
- Do not copy `.env` files into Git or tickets.
- Restore the ledger from a verified backup only if the active store is corrupt. Merging/replaying an old ledger can create duplicates, so inspect order IDs and accepted Google request IDs first.
- Schema v5 does not rewrite legacy transaction IDs. If application rollback is required after v5 is applied, stop both the website and scheduler and restore the matched pre-migration code and SQLite-safe backup together. Do not run old code against a v5 ledger or manually change `identity_version`/transaction IDs.

## Already accepted conversion requests

Turning off uploads cannot recall a request that Data Manager already accepted. For each affected `request_id`:

1. Retrieve terminal destination diagnostics.
2. Reconcile event key, Zoho record ID, transaction/order ID, timestamp and value from the private ledger.
3. Classify the event as valid, duplicate, wrong value/time/action, or unauthorised.
4. Consult the current Google Ads correction/retraction method and obtain administrator approval before sending any correction. Do not improvise a negative conversion or new transaction ID.
5. Record the incident and CRM correction status without logging PII.

## Exit criteria

Rollback is complete only when:

- no new upload requests leave the application;
- Zoho callbacks are disabled or safely returning held/dry-run results;
- queue growth and retry behaviour are understood;
- website forms still work or a documented temporary contact route is active;
- the intended code/config/GTM versions are confirmed;
- credentials are rotated if exposure occurred;
- all accepted Google request IDs are reconciled;
- a root cause and reviewed re-enable plan exist.

Re-enablement is a new release decision and requires the same live Google/Zoho/GTM/deployment approvals as initial activation.
