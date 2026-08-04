# Emitronix GTM Phase 2A

Status: repository implementation complete; live container changes and publishing are not started.

Container: `GTM-MSM8MPD6`
Website: `https://emitronix.ae`
Published GA4 destination observed: `G-43MXN4GKR2`

## Deliverable index

1. GTM audit and existing inventory: [audit-report.md](./audit-report.md)
2. Proposed architecture and naming: [architecture.md](./architecture.md) and [container-change-plan.md](./container-change-plan.md)
3. Complete data-layer contract: [data-layer-specification.md](./data-layer-specification.md)
4. Website implementation:
   - `lib/gtm/dataLayer.ts`
   - `components/GtmEventBridge.tsx`
   - `components/ContactForm.tsx`
   - `components/BlogEnquiryPopup.tsx`
   - `app/api/contact/route.ts`
5. Google Ads and Zoho conversion mapping: [conversion-mapping.md](./conversion-mapping.md)
   - Canonical cross-system identity contract: [canonical-lead-id.md](../google-zoho/canonical-lead-id.md)
6. Consent Mode and enhanced-conversion design: [consent-and-enhanced-conversions.md](./consent-and-enhanced-conversions.md)
7. Published-container evidence: [published-container-inventory.json](./published-container-inventory.json)
8. Machine-readable proposed changes: [gtm-change-manifest.json](./gtm-change-manifest.json)
9. GTM export/import and backup procedure: [backup-and-import.md](./backup-and-import.md)
10. Preview and diagnostics evidence: [testing-evidence.md](./testing-evidence.md)
11. Server-side tagging assessment: [server-side-assessment.md](./server-side-assessment.md)
12. Publishing checklist: [publishing-checklist.md](./publishing-checklist.md)
13. Rollback and final version notes: [rollback.md](./rollback.md)

## Approval boundary

The proposed container changes cannot be applied until all of the following are available:

- a fresh GTM container export and draft-workspace inventory;
- the verified Google Ads `AW-` conversion ID and conversion labels;
- confirmation of the desired primary/secondary goal settings;
- Preview/Tag Assistant results showing no duplicate Google tag or PII;
- explicit approval to modify the workspace.

Import, Submit and Publish are separate actions. No live container action is authorized by these documents.

## Current method decisions

- Reuse the existing Google tag; do not add a second `gtag.js` installation.
- Use the `generate_lead` custom event for the website-enquiry conversion. Never use button clicks or the current visibility trigger.
- Use `lead_id` unchanged as the Google Ads Website Lead transaction ID. The server generates it, stores it in Zoho's Emitronix Lead ID field, and returns it only after Zoho accepts the create/update.
- Keep GA4 lead reporting separate from the direct Google Ads website conversion. Do not import the same GA4 event into Ads.
- Keep qualified, meeting, quotation and won milestones in the server-side Zoho to Google Data Manager flow, not browser GTM. Each separate action uses the exact same `lead_id` as `transactionId`.
- Keep customer email and phone data out of `dataLayer`. Enhanced conversions for leads remain server-side and consent-gated.
- Treat the existing unconditional GTM load with denied defaults as Advanced Consent Mode. Legal/business approval is required before deploying this policy; Basic Consent Mode remains an available alternative.

Official references: [Google tag in GTM](https://support.google.com/tagmanager/answer/14842872?hl=en), [Conversion Linker](https://support.google.com/tagmanager/answer/7549390?hl=en), [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent), [Google Ads conversions](https://support.google.com/tagmanager/answer/6105160?hl=en), [transaction-ID deduplication](https://support.google.com/google-ads/answer/6386790?hl=en-EN), and [Enhanced Conversions for Leads](https://support.google.com/google-ads/answer/11347292?hl=en).
