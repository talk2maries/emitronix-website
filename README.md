# Emitronix Corporate Website

Premium corporate website for Emitronix Contracting LLC in Dubai, UAE.

## Stack

- Next.js 15 App Router
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

## Zoho CRM Lead Integration

The contact and article enquiry forms submit to the consent-checked server-side API route at `/api/contact`, which creates a follow-up record in the configured CRM. CRM credentials must stay server-side in environment variables and must never be exposed in browser code.

Create a local `.env.local` or production environment with:

```bash
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token
ZOHO_ACCOUNTS_BASE_URL=https://accounts.zoho.com
ZOHO_CRM_API_BASE_URL=https://www.zohoapis.com
ZOHO_CRM_API_VERSION=v2
ZOHO_SERVICE_INTEREST_FIELD_API_NAME=
```

Use the Zoho accounts and API domains for the correct Zoho data center, for example `.com`, `.eu`, `.in`, or the value returned by Zoho OAuth. The OAuth app should have CRM lead creation access, such as `ZohoCRM.modules.Leads.CREATE` or a broader approved CRM module scope.

Field mapping:

- Full name: split into `First_Name` and mandatory `Last_Name`
- Company: `Company`, using `Individual Enquiry` when omitted
- Email: `Email`
- Phone: `Phone`
- Service: `Lead_Source`
- Project Details: `Description`
- Optional service custom field: set `ZOHO_SERVICE_INTEREST_FIELD_API_NAME` to a Zoho Lead field API name if the CRM has a dedicated service-interest field

After updating environment variables, restart the Next.js process so the API route can read them.

Update final production phone, email, social links and domain in `data/site.ts` before launch.
