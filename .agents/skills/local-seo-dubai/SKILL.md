---
name: local-seo-dubai
description: Audit and implement Local SEO for a Dubai or UAE service business website. Use for titles, meta descriptions, headings, URLs, canonical tags, sitemap, robots.txt, image alt text, internal links, LocalBusiness schema, service pages, location signals, Google Business Profile recommendations, and Dubai-focused SEO fixes.
---

# Local Seo Dubai

## Ground Rules

- Verify business name, address, phone, email, service areas, opening hours, website URL, and services before using them. In this repository, treat `data/site.ts` as the default business-information source unless the user provides a newer source.
- Never invent reviews, addresses, certifications, licenses, authority approvals, project counts, client names, awards, or business claims.
- Use Dubai and UAE location keywords naturally. Do not stuff keywords or repeat near-duplicate copy across pages.

## Audit Workflow

1. Inspect the site structure, route metadata, content files, navigation, sitemap, robots file, schema, contact details, and image usage.
2. Audit SEO titles, meta descriptions, H1/H2 structure, URLs, canonical tags, Open Graph data, image alt text, internal links, and crawlability.
3. Review LocalBusiness, Organization, Service, Breadcrumb, and FAQ schema where present or appropriate.
4. Check consistency of name, address, phone, email, opening hours, service areas, and contact links across headers, footers, pages, metadata, and schema.
5. Produce prioritized findings:
   - P0: indexing blockers, wrong business facts, broken pages, schema errors, major duplicate or incorrect metadata.
   - P1: missing local landing-page signals, weak service-page metadata, poor internal linking, incomplete schema, weak contact consistency.
   - P2: copy refinements, image alt improvements, FAQ expansion, Google Business Profile recommendations, supporting content ideas.

## Implementation Rules

- Implement technical fixes only after the user approves the audit priorities or explicitly asks for implementation.
- Keep business facts tied to verified sources, preferably `data/site.ts`.
- Maintain unique page titles, descriptions, headings, and service copy for each page.
- Include Google Business Profile recommendations separately from code changes.
- Validate changed pages with build checks and route inspection.
