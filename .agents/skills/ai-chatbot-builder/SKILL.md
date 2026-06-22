---
name: ai-chatbot-builder
description: Create or improve a secure website chatbot for this business website. Use for chatbot UI, server-side API routes, company FAQ knowledge, service guidance, lead qualification, consent, human handover, rate limiting, logging, error handling, testing, and admin-friendly chatbot knowledge updates.
---

# Ai Chatbot Builder

## Architecture Rules

- Use server-side API routes for model calls, lead processing, logging, and integrations.
- Never expose API keys, provider secrets, tokens, prompts containing private data, or CRM credentials in browser code.
- Keep the browser chatbot UI focused on user experience, state, validation, consent capture, and display.
- Store credentials only in environment variables. Add placeholders to `.env.example` when new secrets are required, never real values.

## Chatbot Capabilities

- Support company FAQs, service explanations, Dubai contracting enquiries, authority approval questions, lead qualification, and human handover.
- Collect these lead fields when relevant: name, company, phone, email, service required, and enquiry details.
- Add clear consent before collecting or sending customer information.
- Provide an admin-friendly way to update chatbot knowledge, preferably a simple repository file under `data/` or a documented content source that non-developers can edit safely.

## Reliability and Safety

- Add rate limiting or abuse protection for public API routes.
- Handle provider failures, validation errors, timeouts, and empty responses gracefully.
- Log operational errors without storing unnecessary sensitive customer data.
- Ask before sending customer information to external systems such as WhatsApp, CRM, email marketing, analytics, or third-party automation tools.
- Test API routes, form validation, lead capture flow, consent behavior, and fallback/handover states.
