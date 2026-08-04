# Emitronix Corporate Website

Premium corporate website for Emitronix Contracting LLC in Dubai, UAE.

## Stack

- Next.js 15 App Router (Node.js 20 or newer)
- TypeScript
- Tailwind CSS
- Local optimized visual assets

## Pages

- Home
- About
- Services
- Civil
- Interior
- Approval
- Projects
- Resources
- Contact

## Included

- White, dark navy and royal blue corporate design
- Dubai construction skyline hero
- Lead-generation contact form UI
- Civil construction, approval and interior fit-out content
- Authority approval trust cards
- Project showcase
- Dynamic sitemap at `/sitemap.xml`
- Dynamic robots file at `/robots.txt`
- Open Graph metadata
- JSON-LD LocalBusiness schema

## Run

```bash
npm install
npm run dev
```

On Windows PowerShell with strict execution policy restrictions, use:

```bash
npm.cmd run dev
```

You can also double-click `start-dev.cmd` from the project folder to launch the local dev server.

## Build

```bash
npm run build
```

## Google Ads and Zoho CRM Lead Integration

Contact and article enquiry forms submit to `/api/contact`. The server validates consent and attribution, prevents duplicate processing in a durable SQLite ledger, and creates or updates the corresponding Zoho CRM Lead without overwriting an existing unrelated Lead Source. CRM-qualified milestones are queued through the signed Zoho webhook and remain Google Data Manager API dry-runs until live activation is explicitly approved.

Copy the placeholders from `.env.example`; never commit real OAuth credentials, webhook secrets, or customer data. Use `ZOHO_ACCOUNTS_URL` for the organization's actual Zoho data centre. The API domain is taken from Zoho's OAuth token response rather than hard-coded.

Operational commands:

```bash
npm run migrate:google-zoho
npm run test:google-zoho
npm run verify:zoho
npm run verify:google-ads
npm run conversion:dry-run
npm run conversion:worker
npm run conversion:diagnostics
npm run conversion:scheduler
npm run integration:report
npm run integration:prune
```

Start with the [audit report](docs/integrations/google-zoho/audit-report.md), [implementation plan](docs/integrations/google-zoho/implementation-plan.md), and [architecture index](docs/integrations/google-zoho/architecture.md). Live Google Ads, GTM, Zoho workflow, scheduler, and deployment steps remain approval-gated.

## Google Tag Manager Phase 2A

The website emits consent-aware, PII-safe form, lead, contact-click, SalesIQ and virtual-page events. `generate_lead` is sent only after the API confirms the Zoho create/update and is deduplicated using the backend lead ID. The live GTM container has not been modified or published.

See the [Phase 2A GTM index](docs/integrations/gtm/README.md), [audit](docs/integrations/gtm/audit-report.md), [data-layer specification](docs/integrations/gtm/data-layer-specification.md), and [publishing checklist](docs/integrations/gtm/publishing-checklist.md).

Update final production phone, email, social links and domain in `data/site.ts` before launch.
