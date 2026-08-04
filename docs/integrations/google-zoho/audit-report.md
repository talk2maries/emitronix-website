# Repository audit — Google Ads, website and Zoho CRM

Audit date: 4 August 2026. This audit was completed before the integration changes. No live Google Ads, GTM, Zoho CRM, customer-data, deployment, or production-process change was made.

## Application and hosting

- Framework: Next.js `15.5.21`, App Router, React `19`, TypeScript and Tailwind CSS.
- Runtime: Node.js; the new native SQLite dependency requires Node.js 20 or newer.
- Production facts from `AGENTS.md`: repository `talk2maries/emitronix-website`, path `/var/www/emitronix_ae`, PM2 app `emitronix-next`, port `8081`, deployment command `deploy-emitronix`.
- Production deployment/restart is expressly approval-gated.
- Verified business source: `data/site.ts` says **Emitronix Contracting LLC** and `https://emitronix.ae`. The request says “Emitronix Building Contracting LLC”; that legal-name discrepancy remains for an authorised owner to resolve.

## Lead surfaces and API routes

- `components/ContactForm.tsx`: main project enquiry.
- `components/BlogEnquiryPopup.tsx`: article enquiry.
- Both lead forms use `/api/contact`; the integration now supports JavaScript JSON and direct URL-encoded POSTs.
- Career/application submission is a separate purpose and is deliberately excluded from advertising lead/conversion events.
- Existing API routes were inventoried before modification; only `/api/contact` was replaced for lead handling, and the new signed callback is `/api/integrations/zoho/google-ads`.

## Existing Zoho, Google tag and conversion state

- The repository had a basic server-side Zoho OAuth/Lead create helper in `lib/zoho.ts`, but no metadata-derived attribution mapping, durable idempotency, CRM milestone callback, retry ledger, or offline Google upload.
- GTM container `GTM-MSM8MPD6` was already present with Consent Mode v2 defaults denied.
- No consent-gated `generate_lead` data-layer event or CRM-qualified offline conversion pipeline existed.
- The supplied Google Ads screenshot showed one unverified/no-recent-conversion state. It does not prove tag installation, action ownership, ECL terms, or matching readiness; the correction runbook is in `google-ads-setup.md`.

## Environment, persistence and deployment gaps

- Secrets were already environment-driven, but the integration-specific contract, schema validation, data-centre validation, action IDs, dual live switches and webhook secret were absent.
- No application database was available. Durable replay protection and conversion idempotency therefore required a new local SQLite WAL ledger.
- Production storage must be outside the release tree, for example `/var/lib/emitronix/google-zoho.sqlite`, owned by the existing non-root application user.
- The website process alone cannot drain an asynchronous queue; a separate scheduler command and PM2 runbook are now supplied.

## Initial security and reliability risks

Before implementation, the principal gaps were:

- no durable rate limit, request idempotency, webhook replay ledger, conversion uniqueness or retry state;
- no HMAC callback, body limit, strict callback schema or authoritative CRM refetch;
- no first/latest attribution contract or consent-linked server evidence;
- broad provider-domain trust and no structured provider-error redaction;
- non-idempotent Zoho create retry risk;
- no asynchronous Data Manager diagnostics reconciliation;
- no database backup/retention procedure;
- dependency audit findings requiring review.

The implementation mitigates these in code and runbooks. Remaining approval/operational risks are: live Zoho field types/picklists/layout must pass `verify:zoho`; OAuth and Data Manager validate-only require authorised credentials; SQLite supports one durable host, not horizontal multi-host scaling; privacy/legal must approve retention and ECL consent use; and current moderate dependency advisories must be accepted or remediated through a separately tested framework upgrade.

## Files affected

The reviewable change set is grouped as follows:

- Forms/consent/runtime: `app/layout.tsx`, `components/ContactForm.tsx`, `components/BlogEnquiryPopup.tsx`, `components/CookieConsentManager.tsx`, `components/AttributionCapture.tsx`, `components/AttributionHiddenFields.tsx`.
- Server endpoints: `app/api/contact/route.ts`, `app/api/integrations/zoho/google-ads/route.ts`.
- Services/config/persistence: `lib/googleZoho/*`, `lib/zoho.ts`, `config/google-zoho-conversions.ts`, `next.config.ts`.
- Operations/tests: `scripts/*google-zoho*`, `scripts/verify-*`, `scripts/conversion-dry-run.ts`, `tests/google-zoho/*`, `package.json`, `package-lock.json`, `.env.example`.
- Documentation: `README.md`, `docs/zoho-crm-contact-form.md`, and this integration documentation directory.

Ignored pre-change copies were retained under `storage/backups/google-zoho-20260804T110000`; TypeScript/TSX copies use a `.bak` suffix so they cannot enter compilation. They are local rollback evidence, not a production backup.

## Audit conclusion

The repository was suitable for a server-side custom integration after adding durable local state and a separate worker, but it was not safe to connect directly to live CRM/Ads in its original state. The selected design and approval sequence are documented in [architecture.md](architecture.md) and [implementation-plan.md](implementation-plan.md).
