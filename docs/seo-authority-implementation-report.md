# Emitronix E-E-A-T, AI Search and Technical SEO Implementation Report

**Implementation date:** 23 July 2026  
**Repository:** `talk2maries/emitronix-website`  
**Implementation status:** Completed in the local production codebase; not deployed  
**Verified business source:** `data/site.ts`

## Executive outcome

The website has been restructured into a transparent company, service and construction-knowledge platform with:

- a named founder profile and clearly labelled role-based leadership functions;
- a company-information and editorial-governance layer;
- deeper service and authority-planning resources;
- a construction knowledge centre, consolidated FAQ system and Dubai location hub;
- canonical, crawlable English information architecture;
- limited indexed Arabic policy pages with reciprocal hreflang;
- Organization, LocalBusiness, GeneralContractor, Person, WebSite, WebPage, Service, Article, BlogPosting, FAQPage, ContactPage, AboutPage, BreadcrumbList, ImageObject and VideoObject data;
- `robots.txt`, `llms.txt`, `llms-full.txt`, XML sitemap and HTML sitemap;
- hardened forms, consent controls, admin sessions and security headers;
- explicit evidence boundaries for stock images, illustrative project scenarios, authority outcomes, credentials and team profiles; and
- a repeatable strict SEO/crawl validator.

The site is materially more trustworthy because it does not manufacture the evidence that is still unavailable. Registration identifiers, credentials, named team members, real project evidence, client references and authority eligibility remain behind an explicit publication gate.

> **Management verification required before publication.**

## 1. Technical SEO audit

### Findings corrected

| Area | Prior risk | Implemented result |
| --- | --- | --- |
| Canonicals and aliases | Service aliases and `/approvals` produced HTTP 200/meta refresh responses | 30 English and Arabic aliases now return HTTP 308 to their canonical routes |
| Sitemap | Blank admin exclusion input removed the homepage; aliases and incomplete Arabic previews were included | Homepage restored; 52 canonical, indexable routes validated; aliases and noindex previews excluded |
| Hreflang | Incomplete client-localized Arabic previews were advertised as reviewed equivalents | Arabic hreflang is limited to the three native policy pairs; reciprocity and sitemap indexability are validated |
| Search results | Search routes could enter crawl paths | `/search` is noindex/follow and excluded from the sitemap while remaining crawlable for the directive |
| Metadata | Trust and leadership pages lacked social images; override canonicals could be off-origin | OG/Twitter images added; canonical overrides are HTTPS, same-origin and fragment/query-free |
| Structured data | Deprecated or unsupported vocabulary and properties were present | Deprecated `ProfessionalService`, invalid `ConstructionCompany`, unsupported Service keyword/language fields and fragment-based video embed data are absent |
| Internal linking | Authority, trust, founder, leadership and location content was hard to discover | Header, footer, resource hub, HTML sitemap, related-content cards and contextual links now expose the new architecture |
| Broken/thin routes | Guest-post page was indexable but orphaned | Guest-post guidance is noindex/follow until it has a justified public role |
| Crawl policy | AI crawler rules and a full machine-readable reference were incomplete | Explicit public rules cover major search and AI user/search crawlers; both LLM reference files are live |

### Rendering and performance

- Next.js image delivery uses AVIF/WebP with responsive sizes, lazy loading below the fold and priority loading for primary imagery.
- The largest source image in `public/images` is under 240 KB; the image library is approximately 4.8 MB and the video asset is approximately 201 KB.
- The production client bundle reports approximately 102 KB shared first-load JavaScript.
- The public content build completes successfully with 119 generated pages, including route variants and noindex previews.
- Consent-controlled integrations are not loaded until the applicable category is granted.
- Consent revocation reloads the page so previously loaded non-essential trackers are removed from the active document.

The root layout still resolves document language from the request so indexed Arabic policy documents receive the correct root language and direction. This makes most English pages dynamically rendered. A later route-group refactor can create separate English and Arabic root layouts if lower TTFB is worth the structural migration.

Field Core Web Vitals must be measured after deployment with real traffic or an approved production performance service. The local environment did not include a browser runtime for Lighthouse, so no synthetic score is claimed.

## 2. E-E-A-T audit

### Experience

- Existing project-like cards are now labelled illustrative planning scenarios.
- Stock images are visibly labelled and described in metadata/schema as illustrative, not evidence of an Emitronix project, team or approval.
- Service resources explain workflow, documents, scope boundaries, materials, decision factors, quality checks, safety considerations, authority touchpoints, timeline variables and handover planning.
- Claims about completed projects, client outcomes, project counts and testimonials are withheld.

### Expertise

- Service resources use concise definitions, answer-first summaries, process stages, document lists, technical topics, tables, risks, FAQs and related guidance.
- Authority pages separate general planning information from the authority-controlled route, eligible submitter and project-specific professional responsibilities.
- Generic approval guides include a current-source status block and an official starting point.
- The DEWA guide links official resources, identifies a review date and distinguishes educational pathways from verified specialist capability.
- Public knowledge articles include editorial ownership, modification dates, technical-review status, official starting points and a project-specific advice disclaimer.

### Authority

- `/founder` presents only the facts supplied for Marieswaran Sadaiappan.
- `/leadership` identifies the founder and explains Operations, Engineering, Civil, Electrical, MEP, Estimation, QA/QC, HSE, Procurement, Project Management and Site Supervision as role-based functions—not invented appointees.
- `/company-information` consolidates the legal name, public contact information, location, hours and service areas.
- Eight mechanically templated articles are retained as draft data and excluded from the public blog. Four substantively authored guides remain public.

### Trust

- Editorial Policy, Technical Review Policy, Corrections Policy, Disclaimer and Accessibility pages were added.
- Existing Privacy, Cookie and Terms pages remain connected to the trust architecture.
- Every unavailable legal, credential, leadership or evidence field is shown behind the exact management-verification notice.
- Forms require explicit consent before project or applicant data is sent to the configured follow-up system.

## 3. AI search, AEO and GEO audit

Implemented machine-understandable features include:

- concise answer summaries near the top of service and authority pages;
- descriptive headings and stable section anchors;
- entity-consistent legal name, short name, contact information, location and service area;
- FAQ question/answer pairs without search-keyword questions;
- structured data linked by stable `@id` values;
- a short `llms.txt` directory and a fuller evidence-boundary reference;
- explicit instructions not to infer licences, certifications, project outcomes, client names, years of experience or approval guarantees;
- canonical URLs and stable last-reviewed dates; and
- official-source and editorial-policy links around technical content.

Crawler access is allowed for public pages while admin, API and search-query variants are restricted. Allowing a crawler does not guarantee inclusion, citation or recommendation by any search or AI platform.

## 4. Information architecture and navigation

### Primary architecture

1. Home
2. About
3. Services
4. Approvals
5. Industries
6. Knowledge
7. Scope Library
8. Contact

### Authority and trust layer

- Founder
- Leadership
- Company Information
- Editorial Policy
- Technical Review Policy
- Corrections Policy
- Disclaimer
- Accessibility
- Privacy Policy
- Cookie Policy
- Terms & Conditions

### Knowledge and local layer

- Knowledge Center
- Blog
- Frequently Asked Questions
- Locations
- Dubai Service Area
- Illustrative Scope Library
- HTML Sitemap

This architecture avoids duplicate location doorway pages. Dubai has one substantive location guide; other published service areas remain business facts rather than thin local landing pages.

## 5. Internal linking strategy

The implemented linking model follows:

```text
Home
├── company identity → About → Founder / Leadership / Company Information
├── service need → Services → Service detail → Related service / Approval / Contact
├── authority need → Approvals → Authority guide → Official source / Related approval / Contact
├── asset type → Industries → Relevant service or approval guide
├── research need → Knowledge / Blog / FAQ → Relevant service / policy / contact
└── local need → Locations → Dubai → Relevant verified service pathway
```

Anchor text is reader-facing and describes the destination. Canonical routes are linked directly so internal navigation does not pass through redirects.

## 6. Founder and leadership implementation

The founder profile publishes:

- Founder & Managing Director;
- Dubai construction professional;
- electrical engineering background;
- construction management;
- project execution;
- authority coordination;
- technical leadership;
- client management;
- innovation;
- digital transformation; and
- responsible AI adoption in construction.

It does not infer education institutions, degree titles, experience duration, employment chronology, registrations, projects, awards, memberships or personal social accounts.

Leadership functions each contain:

- professional summary;
- core expertise;
- responsibilities;
- industry specialization; and
- technical capabilities.

They are explicitly described as delivery functions, not biographies, current appointments, team size or vacancies.

## 7. Service and technical-content implementation

Twelve canonical service resources now use a reusable detail template:

- Civil Contracting
- Main Contracting
- Warehouse Construction
- Industrial Buildings
- Commercial Buildings
- Villa Construction
- Interior Fit-Out
- Building Renovation
- Structural Works
- Design & Build
- Turnkey Construction
- Project Management

Technical coverage spans civil works, construction planning, MEP interfaces, electrical coordination, fit-out, warehouses, commercial and industrial buildings, renovation, authority exposure, standards, project management, quality, safety, procurement and handover.

General methods, time ranges, cost factors and standards are planning guidance. Approved drawings, project specifications, live authority rules and appointed professional advice remain controlling.

## 8. Knowledge centre, FAQ and blog strategy

### Published article set

1. Complete Guide to Civil Construction in Dubai
2. Dubai Authority Approvals Explained
3. Warehouse Construction in Dubai
4. How to Choose a Building Contractor in Dubai

### Draft-only article set

Eight generated strategy articles are retained as `draftStrategicBlogPosts` but are not exported to the public article collection, sitemap, feeds or internal links. Each should receive a unique expert brief, article-specific primary sources and management review before publication.

### Recommended editorial cadence

- Publish only when the page answers a distinct user decision.
- Assign an accountable content owner.
- Add a named technical reviewer only after credentials are verified.
- Record source URLs and a checked date.
- Recheck regulatory guidance at least every six months or after a known authority change.
- Maintain visible corrections and modification dates.
- Update existing resources before creating near-duplicate articles.

### Future priority clusters

- Dubai Building Code interpretation by project stage
- Civil site execution and inspection records
- Concrete and structural quality control
- MEP coordination and builder’s-work interfaces
- Electrical load and distribution planning
- Fit-out design, landlord and fire-safety interfaces
- Warehouse use, racking, floor, fire and utility planning
- Renovation surveys and hidden-condition risk
- Procurement submittals and long-lead planning
- Construction programmes and change control
- HSE planning by activity
- QA/QC records and handover evidence
- Authority-jurisdiction checks
- Commercial-building operational readiness
- Industrial-building utility and logistics planning

## 9. Structured data implementation

Validated types present on crawled canonical pages:

- Organization
- LocalBusiness
- GeneralContractor
- Person
- WebSite
- WebPage and ProfilePage
- Service
- Article
- BlogPosting
- FAQPage
- ContactPage
- AboutPage
- BreadcrumbList
- ImageObject
- VideoObject

`ConstructionCompany` is not a Schema.org type and is intentionally not emitted. `ProfessionalService` is deprecated by Schema.org and was removed. `GeneralContractor`, `LocalBusiness` and page-specific `Service` nodes provide the valid construction-business representation.

FAQ markup remains semantically valid, but the implementation does not claim eligibility for a search-engine rich result. Video markup is used only for the real local workflow video and references its actual media file.

Reference: [Schema.org GeneralContractor](https://schema.org/GeneralContractor), [Schema.org ProfessionalService deprecation notice](https://schema.org/ProfessionalService), [Schema.org Service](https://schema.org/Service).

## 10. Security, privacy and form improvements

Completed:

- server-only CRM credentials and documented placeholder variables;
- required consent for contact, article and career submissions;
- honeypots, input limits, field length limits and content-type checks;
- actual UTF-8 request-size enforcement for JSON;
- mandatory bounded upload length, extension and file-signature checks for CVs;
- restrictive 0700 storage directories and 0600 stored files;
- duplicate enquiry suppression and conservative process-local rate limits;
- same-origin and rate-limit checks for cookie-admin login;
- HMAC-signed cookie-admin sessions with an eight-hour expiry;
- removal of the redundant vulnerable enquiry endpoint;
- removal of arbitrary administrator HTML/script execution;
- parsed-and-serialized JSON-LD overrides only;
- consent-default blocking before optional integrations;
- consent-revocation reload;
- HSTS, CSP, frame, MIME, referrer, permissions, opener, resource and cross-domain-policy headers;
- noindex/no-store response controls for admin and API routes; and
- zero known npm dependency vulnerabilities at implementation time.

## 11. Accessibility and mobile improvements

Completed:

- skip navigation and one global main landmark;
- keyboard-accessible mobile navigation with collapsed submenus removed from the focus tree;
- current-page navigation state;
- required and `aria-required` form states;
- live/atomic form-status announcements;
- labelled, focus-managed cookie banner and preferences dialog;
- Escape handling, focus trapping and restored focus for cookie preferences;
- pressed-state semantics for consent and blog filters;
- polite filtered-result announcements;
- table captions and row/column header scopes;
- accessible image alternatives and decorative-icon handling;
- reduced-motion support; and
- responsive grid, typography, spacing and touch-target improvements.

A browser-based WCAG audit with real assistive technology remains recommended after deployment.

## 12. Deliverables status

| # | Deliverable | Status |
| ---: | --- | --- |
| 1 | Technical SEO audit | Completed and documented |
| 2 | E-E-A-T audit | Completed and documented |
| 3 | AI Search optimization audit | Completed and documented |
| 4 | Website architecture improvements | Implemented |
| 5 | Navigation improvements | Implemented |
| 6 | Internal linking strategy | Implemented and documented |
| 7 | Founder page | Implemented with evidence boundary |
| 8 | Leadership pages | Implemented as verified founder plus role-based functions |
| 9 | Expanded service pages | Implemented through reusable deep-service template |
| 10 | Knowledge center | Implemented |
| 11 | FAQ system | Implemented |
| 12 | Blog strategy | Implemented; eight template articles withheld |
| 13 | Structured data | Implemented and locally validated |
| 14 | `llms.txt` | Implemented |
| 15 | `llms-full.txt` | Implemented |
| 16 | Robots optimization | Implemented |
| 17 | Sitemap optimization | Implemented and crawl-validated |
| 18 | Metadata optimization | Implemented |
| 19 | Performance optimization | Implemented in code; field CWV pending deployment |
| 20 | Mobile optimization | Implemented |
| 21 | Accessibility improvements | Implemented; post-deployment AT audit recommended |
| 22 | Security improvements | Implemented; infrastructure hardening remains |
| 23 | Content quality improvements | Implemented with publication gates |
| 24 | GEO/AEO optimization | Implemented |
| 25 | Final implementation report | This document |

## 13. Validation evidence

Completed successfully on 23 July 2026:

```text
git diff --check
npm run type-check
npm run lint
npm run build
npm run validate:seo -- --base-url http://127.0.0.1:3107 --strict
npm audit --json
```

Results:

- TypeScript: pass
- ESLint: pass, zero warnings
- Production build: pass
- Strict live crawl: pass
- Canonical HTML pages checked: 52
- Permanent redirects checked: 30
- Additional internal links checked: 35
- Required schema vocabulary coverage: pass
- Sitemap required-route coverage: pass
- Hreflang indexability and reciprocity: pass
- Dependency vulnerabilities: 0
- Production deployment: not performed

## 14. Management-verification queue

The following items are intentionally not asserted:

### Company evidence

- Trade licence number, issuing authority and expiry
- Registration/incorporation number and date
- Contractor classification
- Insurance details
- Certifications, memberships and accreditations
- Exact office unit, postal address and map profile
- Google Business Profile URL and verification state

### Founder and team evidence

- Founder education institution, degree title and dates
- Years of experience and employment chronology
- Professional registrations and memberships
- Named leadership appointees
- Staff qualifications, biographies and portraits

### Experience evidence

- Named clients
- Completed-project case studies
- Project values, dates and measured outcomes
- Client-approved photographs
- Testimonials and references
- Project and customer counts

### Authority and specialist scope

- Current authority enrolments or approved-party status
- Eligibility to submit each service type
- Exact in-house versus consultant/subcontractor responsibilities
- Specialist HV/LV, testing, commissioning or energization scope

For every item above:

> **Management verification required before publication.**

## 15. Remaining recommendations

### Priority 0 — before publishing new evidence

1. Obtain documentary approval for every registration, credential, person, client and project claim.
2. Confirm the exact authority and specialist scope that Emitronix may contract, coordinate, submit or execute.
3. Replace illustrative imagery with rights-cleared, client-approved project and leadership photography only when provenance is documented.
4. Approve a personal-data retention schedule and an up-to-date list of external processors.

### Priority 1 — infrastructure and editorial maturity

1. Move rate limiting and duplicate prevention to a shared store when running multiple PM2 workers or instances.
2. Resolve client IPs only through a documented trusted-proxy configuration.
3. Move CVs to quarantined private object storage with malware scanning, retention expiry and deletion workflows.
4. Replace broad CSP HTTPS/inline allowances with explicit hosts and nonce/hash-based scripts after the final analytics stack is confirmed.
5. Refactor English and Arabic route roots if static English rendering is prioritized over the current request-aware document language.
6. Commission native human Arabic translations before indexing additional Arabic pages.
7. Add article-specific source records and verified named reviewers.

### Priority 2 — post-deployment measurement

1. Run mobile and desktop Lighthouse against the production release.
2. Monitor field LCP, INP and CLS through consent-compliant real-user measurement.
3. Submit the XML sitemap to Google Search Console and Bing Webmaster Tools.
4. Validate representative pages with Schema.org Validator and supported search-engine rich-result tools.
5. Complete a keyboard, screen-reader and high-zoom audit on real devices.
6. Build the Google Business Profile only from verified registration, location and contact evidence.
7. Track assisted enquiries and qualified leads rather than rankings alone.

## Publication decision

The codebase is ready for a reviewed release. The site is deliberately transparent about what is published, illustrative or still unverified. Production deployment remains a separate action and requires explicit approval.
