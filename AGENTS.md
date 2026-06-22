# AGENTS.md

## Project Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build production bundle: `npm run build`
- Start production server locally: `npm run start`
- Run lint checks: `npm run lint`
- Tests: no dedicated `npm test` script is currently configured. Add and run relevant tests when introducing testable behavior.

## Deployment Procedure

- Repository: `talk2maries/emitronix-website`
- Production server path: `/var/www/emitronix_ae`
- PM2 app: `emitronix-next`
- Production port: `8081`
- Deployment command: `deploy-emitronix`

Before production deployment:

1. Confirm the user explicitly wants deployment.
2. Confirm the intended branch and latest commit are ready.
3. Run the relevant checks, including `npm run build`.
4. Commit and push only after user approval when requested.
5. Run `deploy-emitronix` only after explicit production approval.

Never deploy, restart production, or run production commands without user confirmation.

## Verified Business Information Source

Use `data/site.ts` as the verified source for:

- Legal business name
- Website URL
- Phone number
- Email address
- Address/location
- Opening hours
- Core services and navigation labels

Do not invent business facts, reviews, addresses, certifications, licenses, authority approvals, project counts, or customer names. If information is missing or uncertain, ask the user or mark it as needing verification.

## Security and Secret Management

- Store secrets only in environment variables.
- Use `.env.example` for placeholder variable names only.
- Never commit passwords, API keys, tokens, webhook signing secrets, CRM credentials, WhatsApp credentials, or real customer data.
- Keep API keys and provider calls on the server side.
- Verify webhooks before processing external events.
- Ask before sending customer information to external services such as WhatsApp, CRM, email automation, analytics, or AI providers.
