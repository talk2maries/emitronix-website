# Zoho CRM Contact Form Setup

The contact and article enquiry forms use `/api/contact` to create or update Zoho CRM Leads from the server. Credentials never enter browser code. Paid attribution is stored only after marketing consent, and an existing Lead Source is preserved during updates.

This page is retained as a short compatibility entry point. Use the current integration guides for setup:

- [Architecture and audit](integrations/google-zoho/architecture.md)
- [Zoho CRM fields and workflows](integrations/google-zoho/zoho-crm-setup.md)
- [Field mapping](integrations/google-zoho/field-mapping.md)
- [Deployment](integrations/google-zoho/deployment.md)
- [Verification checklist](integrations/google-zoho/verification-checklist.md)

Start from `.env.example`, then run the read-only metadata check:

```bash
npm run verify:zoho
```

Creating custom fields, enabling a Zoho workflow/webhook, sending a sample customer lead, restarting PM2, and deploying to production all require explicit administrator approval. A native unsigned webhook is not sufficient for the conversion endpoint; use the documented trusted custom function or gateway to compute its HMAC signature.
