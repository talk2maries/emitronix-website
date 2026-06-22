---
name: whatsapp-crm-integrator
description: Connect website forms or chatbot leads to WhatsApp and CRM systems. Use for WhatsApp provider selection, CRM integration, secure server-side APIs, webhooks, signature verification, duplicate prevention, retries, audit logs, lead-to-CRM mapping, approved WhatsApp notifications, environment variables, and `.env.example` updates.
---

# Whatsapp Crm Integrator

## Required First Questions

- Before coding, ask which WhatsApp provider is being used.
- Before coding, ask which CRM is being used.
- If provider or CRM is undecided, propose an integration-neutral design and wait for confirmation before implementing provider-specific code.

## Security Rules

- Use secure server-side APIs and webhooks only. Do not call WhatsApp or CRM APIs directly from browser code.
- Store credentials only in environment variables.
- Create or update `.env.example` with placeholder variable names only.
- Never commit passwords, tokens, API keys, signing secrets, webhook secrets, or real customer data.
- Ask before sending customer information to external systems.

## Integration Requirements

- Verify webhook signatures before processing inbound events.
- Prevent duplicate lead creation with deterministic idempotency keys or provider event IDs.
- Add retry handling for transient provider or CRM failures.
- Keep audit logs for lead submission, CRM sync, WhatsApp notification attempts, webhook receipt, and failure states without exposing secrets.
- Map website leads to CRM contacts, companies, deals, and activities according to the chosen CRM model.
- Allow only qualified leads to trigger an approved WhatsApp notification.

## Validation

- Test success, duplicate, invalid signature, retryable failure, permanent failure, and missing-field scenarios.
- Confirm `.env.example` contains only placeholders.
- Confirm no credentials or sample secrets are present in committed files.
