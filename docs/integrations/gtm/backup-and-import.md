# GTM backup and import procedure

## Backup status

A restorable GTM JSON export has not been downloaded because the signed-in browser connection was unavailable. The public compiled `gtm.js` hash in `published-container-inventory.json` is audit evidence, not a restorable container backup.

Do not create or import tags until the backup below is complete.

## Create the backup

1. Open Google Tag Manager and select account **Emitronix Contracting LLC**.
2. Open web container **Emitronix.ae** (`GTM-MSM8MPD6`).
3. Record the current workspace name, pending changes, conflicts and latest published version.
4. Go to **Admin → Export Container**.
5. Select the latest published version for the rollback baseline.
6. Export JSON without editing it.
7. Repeat for the current workspace if it contains approved unpublished work.
8. Save the files outside the public application directory with names such as:
   - `GTM-MSM8MPD6-published-vNN-20260804.json`
   - `GTM-MSM8MPD6-workspace-before-phase2a-20260804.json`
9. Calculate SHA-256 hashes and record them in the audit notes.
10. Confirm that neither file contains secrets or customer data before placing it in controlled project storage.

Recommended local path: `storage/backups/gtm/`. This directory must stay ignored by Git unless the administrator explicitly approves versioning the sanitized export.

## Import decision

An import-ready GTM export is intentionally not generated yet. A safe import cannot be produced until the existing draft resources and exact `AW-` conversion ID/labels are known. Placeholder IDs inside an import can create invalid or misdirected tags.

`gtm-change-manifest.json` is the machine-readable proposal. After the live audit:

1. translate only approved manifest entries into a new GTM workspace;
2. prefer manual creation for the small number of tags so every ID, trigger and consent condition is visible;
3. if an import JSON is generated, import using **Merge**, never **Overwrite**;
4. rename or resolve every collision deliberately;
5. keep all Ads tags paused until Preview succeeds;
6. do not click **Submit** or **Publish** without separate approval.

## Backup acceptance criteria

- Export opens as valid JSON.
- Container public ID is `GTM-MSM8MPD6`.
- Latest published version number matches the GTM Versions screen.
- File hash and timestamp are recorded.
- Rollback owner and storage location are documented.
- Existing unpublished work has a separate export or explicit owner approval.
