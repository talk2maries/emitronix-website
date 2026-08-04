# Server-side tagging assessment

## Options

| Dimension | Browser GTM | Server-side GTM | Direct backend events |
| --- | --- | --- | --- |
| Hosting cost | No additional container hosting | Cloud Run/App Engine or managed vendor, custom domain, logs and scaling | Existing application/worker infrastructure |
| Browser reliability | Affected by blockers and browser restrictions | Browser still sends to a first-party tagging endpoint; generally improved control | Not suitable for browser clicks unless mirrored from the site |
| CRM reliability | Poor for lifecycle events | Can receive events but still needs CRM integration | Strong; Zoho is fetched authoritatively before upload |
| Privacy control | Depends on every web tag | Server container can allowlist/redact fields | Strong for CRM/customer data; no customer PII enters `dataLayer` |
| Maintenance | Lowest | Highest: clients, tags, domain, monitoring, scaling and updates | Moderate; existing tests, ledger and worker |
| Emitronix fit | Best for page, form and CTA measurement | Premature at the current campaign scale | Best for qualified, quotation and revenue milestones |

## Recommendation

Use a hybrid architecture now:

1. browser GTM for the Google tag, GA4, server-confirmed website lead and low-value CTA events;
2. the existing backend Google Data Manager integration for Zoho lifecycle conversions and consented enhanced lead identifiers;
3. no server-side GTM deployment in Phase 2A.

This provides the main reliability/privacy benefit without adding a second hosted tagging system. Reassess server-side GTM when event volume, first-party endpoint requirements, advertising platforms or data-governance needs justify its recurring cost.

If later approved, server-side GTM still requires the web container, a first-party tagging subdomain, a GA4 Client, server-side Conversion Linker, consent propagation, field allowlists, monitoring and scaling. It does not replace Zoho/Data Manager offline uploads.

Official references: [server-side fundamentals](https://developers.google.com/tag-platform/learn/sst-fundamentals), [Google Ads server-side setup](https://developers.google.com/tag-platform/tag-manager/server-side/ads-setup), [server consent](https://developers.google.com/tag-platform/tag-manager/server-side/consent-mode?hl=en), and [server testing](https://developers.google.com/tag-platform/learn/sst-fundamentals/6-testing?hl=en).
