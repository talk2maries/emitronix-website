# Emitronix SEO Quality Overhaul

## Scope

This work reviewed the rendered output of every indexable URL in the sitemap rather than sampling source templates. The final crawl covered 237 pages, including 38 Arabic URLs, 50 warehouse resources, 104 English blog articles, service pages, approval pages, company pages and policies.

The audit follows Google's people-first content, structured data and AI-feature guidance. Its scores are repeatable prioritisation heuristics, not Google ranking scores or claims about authorship.

## What Changed

- Preserved existing URLs, H1 headings and established page sections.
- Added owner decision notes to the home page covering warehouse operations, renovation discovery, authority comments and fit-out handover.
- Added a field briefing to every generated service page: first engineering conversation, pre-procurement information, an inspection hold point and an early failure mode.
- Reworked 50 warehouse resources around page-specific engineering opinions, practical failure modes and field checks.
- Reworked 100 warehouse articles by both topic and search intent. Planning guides, approval checklists, cost reviews, programme reviews and contractor-selection articles now answer different owner questions.
- Added specific construction concepts such as rack reactions, truck circulation, swept paths, subgrade, floor flatness, vapour control, utility demand, inspection evidence, commissioning and maintenance access where relevant.
- Added visible content ownership and claim boundaries without inventing a reviewer, credential, approval result, project, testimonial or licence.
- Added a deterministic every-page audit command and retained baseline/final JSON records for future regression checks.

## Measured Result

| Measure | Baseline | Final |
|---|---:|---:|
| Audited URLs | 237 | 237 |
| Average score | 8.9 | 9.1 |
| EEAT | 8.0 | 8.5 |
| Authority signals | 8.4 | 8.8 |
| Trust signals | 8.2 | 8.6 |
| Construction expertise | 7.9 | 8.2 |
| Information gain | 7.5 | 8.2 |
| Entity coverage | 7.4 | 8.0 |
| Helpful content | 8.7 | 8.9 |
| AI search readiness | 8.9 | 9.0 |

Final priority count: 0 Critical, 0 High, 43 Medium and 194 Low. The remaining Medium pages are primarily shorter Arabic, policy and corporate pages rather than broken technical pages.

## Evidence Boundaries

The copy deliberately avoids unsupported claims. Emitronix should publish the following only after documentary verification:

- Named technical reviewers, job titles, qualifications and professional registrations.
- Completed-project case studies, client names, project values, photographs and measured outcomes.
- Testimonials, ratings, certifications, licences, insurance and authority-contractor status.
- Exact approval durations, costs or guaranteed outcomes.

## Remaining Priorities

### P0

None found after production validation.

### P1

- Deepen the shorter Arabic pages through professional UAE construction translation and technical review.
- Add a verified named technical reviewer and reviewer profile when the company supplies credentials and approval to publish them.
- Add official authority links where a page explains a live submission route, while keeping project-specific advice caveated.

### P2

- Publish evidence-led case studies when real project records and image permissions are available.
- Add verified client feedback only with consent and an auditable source.
- Keep Google Business Profile categories, hours, service areas, phone and website details consistent with `data/site.ts`.

## Validation

- Next.js production build: 272 pages generated successfully.
- SEO crawl: 237 pages and 598 public image URLs passed.
- Arabic SEO: 38 sitemap URLs passed.
- Route behavior: 336 checks passed.
- Contact consistency: 237 sitemap pages passed.
- Image assets: 50 assets, 127 responsive/social files and 131 source files passed.
- Brand assets: 10 assets across 143 source files passed.
- Consent and SalesIQ integration: 10 tests passed.

## References

- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
