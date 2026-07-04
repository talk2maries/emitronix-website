# Zoho CRM Contact Form Setup

The Emitronix contact form submits to `/api/contact`, which creates a Zoho CRM Lead from the server. Real Zoho credentials must be configured as environment variables only.

## Required Environment Variables

```bash
ZOHO_CLIENT_ID="your-client-id"
ZOHO_CLIENT_SECRET="your-client-secret"
ZOHO_REFRESH_TOKEN="your-refresh-token"
ZOHO_ACCOUNTS_URL="https://accounts.zoho.com"
ZOHO_API_DOMAIN="https://www.zohoapis.com"
ZOHO_CRM_MODULE="Leads"
ZOHO_LEAD_SOURCE="Website Contact Form"
```

## Zoho OAuth Notes

- Authorize the Zoho app using the `info@emitronix.ae` Zoho CRM user.
- The refresh token must be generated once through Zoho OAuth and stored only on the production server.
- Use the Zoho data center that matches the CRM account. The current default is `.com`.
- Do not commit `.env`, `.env.local`, access tokens, refresh tokens, client secrets or API keys.

## Lead Field Mapping

| Website field | Zoho CRM Lead field |
| --- | --- |
| Full name | First_Name, Last_Name |
| Company | Company |
| Email | Email |
| Mobile | Phone, Mobile |
| Service | Description |
| Project location | Description |
| Project details | Description |
| Lead source | Lead_Source |

## Deployment Check

After adding the environment variables on the server:

```bash
npm run build
pm2 restart emitronix-next
pm2 save
```

Submit a test enquiry from `/contact`, then confirm a new Lead appears in Zoho CRM.
