# GTM rollback and version notes

## Pre-publish rollback target

Record these values immediately before any approved publish:

- Previous published container version: `PENDING_LIVE_AUDIT`
- Previous version name: `PENDING_LIVE_AUDIT`
- Previous export filename: `PENDING_EXPORT`
- SHA-256: `PENDING_EXPORT`
- Rollback owner: `PENDING_OWNER`

## Proposed new version note

Suggested version name:

`Phase 2A – Server-confirmed leads and consent-safe engagement`

Suggested notes:

> Replaces the visibility-based form event with the server-confirmed generate_lead data-layer event; adds consent-aware GA4/Ads lead and approved contact-click architecture; preserves backend ownership of Zoho lifecycle conversions. Exact resource list and Preview evidence attached to the approval record.

## Rollback procedure

1. Stop any linked campaign experiment or bidding change that depends on the new action; do not delete conversion history.
2. In GTM, open **Versions**.
3. Select the recorded pre-Phase-2A version.
4. Review the version diff and choose **Publish** for that known-good version.
5. Confirm the restored container in Tag Assistant on the home and contact pages.
6. Confirm the server-side Zoho/Data Manager worker remains unchanged.
7. Record rollback time, reason, operator and diagnostic evidence.
8. Keep the failed version for investigation; do not delete the audit trail.

## Partial rollback

If only one tag is faulty and data privacy is not at risk, pause that tag in a new workspace, test, and publish the minimal change. If PII, duplicate conversions or incorrect Ads IDs are observed, roll back the whole container version immediately.

## Website rollback

The GTM website code is not deployed by this phase. If later deployed and a problem is found, use the repository deployment rollback process in `docs/integrations/google-zoho/rollback.md`. GTM and website rollbacks are independent; identify which layer produced the fault before changing both.
