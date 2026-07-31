# Emitronix E-E-A-T, Technical SEO, Local SEO and AI Search Audit

Audit date: 24 July 2026  
Website: https://emitronix.ae  
Framework: Next.js 15 App Router with TypeScript  
Business-information source: `data/site.ts`

## Scope and evidence rules

This audit covers the complete public route architecture, shared components, verified business data, metadata utilities, structured data, English and Arabic routing, service and authority content, project content, blog content, trust and policy pages, navigation, forms, error handling, sitemap, robots directives, AI-search files, accessibility patterns, performance-sensitive implementation and repository validation scripts.

The audit applies these publication rules:

- Only facts already published in the repository may be treated as verified website facts.
- Illustrative stock images and planning scenarios are not evidence of completed Emitronix work.
- Missing registrations, credentials, approvals, client names, project outcomes, reviews and exact location evidence must not be inferred.
- A TODO or management-verification gate is required where reliable company evidence is unavailable.
- Technical guidance does not replace current authority requirements, appointed consultants or project-specific professional advice.

## Verified public business record

The following values are centralized in `data/site.ts` and are the current source of truth:

- Legal name: Emitronix Contracting LLC
- Brand name: Emitronix
- Website: https://emitronix.ae
- Published location: Dubai Investment Park 02, Dubai, UAE
- Email: info@emitronix.ae
- Primary office phone: +971 4 824 0002
- Secondary mobile/WhatsApp: +971 55 982 8492
- Published hours: Monday to Saturday, 8:00 AM to 6:00 PM
- Published service areas: Dubai, Abu Dhabi, Sharjah and the United Arab Emirates

## Existing strengths

- Centralized business identity and service data reduce NAP and schema drift.
- Public pages already use self-referencing absolute canonicals through shared metadata helpers.
- English and Arabic sitemap alternates are generated only for routes recognized by the localization layer.
- Service, authority, article and FAQ content already includes strong claim boundaries.
- Stock imagery is explicitly labelled as illustrative rather than project evidence.
- Project cards are explicitly described as planning scenarios rather than completed work.
- Founder, leadership, company-information, editorial, technical-review, corrections, disclaimer, accessibility, privacy, cookie and terms pages already exist.
- Forms retain consent controls and server-side handling.
- Dynamic route families are closed and unknown service, blog and Arabic paths are routed to branded not-found handling.
- `llms.txt`, `llms-full.txt`, XML sitemap and HTML sitemap endpoints already exist.

## Prioritized findings

| Priority | Issue | Affected pages/files | SEO / trust impact | Recommended solution |
| --- | --- | --- | --- | --- |
| High | Arabic catch-all routes render reused English page trees and depend on a client-side localization layer for visible replacements. | `app/ar/[...slug]/page.tsx`, `components/ArabicFullPage.tsx`, `components/ArabicPageLocalizer.tsx`, reused English pages | Search engines and answer engines can receive English server HTML at Arabic URLs, weakening language relevance and creating content-language inconsistency. | Make the Arabic server response authoritative wherever practical. At minimum, emit correct server-known locale signals, ensure the Arabic wrapper exposes an Arabic summary and headings before hydration, and prevent untranslated English-only routes from receiving Arabic alternates. |
| High | The root document is emitted with `lang="en"` and `dir="ltr"` for every route, then changed by an inline browser script for Arabic paths. | `app/layout.tsx`, middleware locale headers | Raw HTML language semantics can be wrong for Arabic crawlers, accessibility tools and no-JavaScript consumers. | Resolve locale from the request pathname/header in the server layout and render the correct `lang` and `dir` attributes at response time. Retain client synchronization only as a navigation fallback. |
| High | Arabic wrappers can emit Arabic schema while reused English components also emit their own page, service, FAQ, breadcrumb or article schema. | `components/ArabicFullPage.tsx`, `app/ar/[...slug]/page.tsx`, `components/ServiceDetailPage.tsx`, `components/ApprovalServicePage.tsx`, `app/blog/[slug]/page.tsx`, English common pages | Duplicate entities and mixed-language JSON-LD at one canonical URL can confuse entity consolidation and rich-result validation. | Add a schema-suppression mechanism for reused English trees or render a dedicated Arabic schema set once per Arabic page. Use stable `@id` values and Arabic canonical URLs. |
| High | Unknown Arabic paths can fall through a catch-all and return a streamed soft 404 or an English not-found document. | `middleware.ts`, `app/ar/[...slug]/page.tsx`, `app/not-found.tsx`, Arabic not-found handling, `scripts/validate-error-routes.mjs` | A 200 client-navigation response or wrong-language error document wastes crawl budget and weakens Arabic quality signals. | Route closed-set misses to a real Arabic noindex endpoint, preserve the original pathname for locale metadata and validate both direct HTML and RSC navigation responses as hard 404s. |
| High | No verified completed-project case studies are available. Existing project content is correctly illustrative. | `app/projects/page.tsx`, `data/projects.ts`, `components/ProjectsPortfolio.tsx`, `components/ProjectCard.tsx` | The site cannot yet demonstrate first-hand project experience with locations, scope, challenges, outcomes and evidence. | Keep the current scenario library. Add a publication-ready case-study model and visible TODO gate for future rights-cleared, management-approved project evidence. Do not convert scenarios into claims. |
| High | Named technical reviewers and verified reviewer credentials are unavailable. | `data/trustCenter.ts`, `app/technical-review-policy/page.tsx`, blog article review panels | Technical content has editorial ownership but limited person-level expertise proof. | Preserve organization ownership and the existing review disclaimer. Add structured TODO fields for reviewer name, role, verified qualification, review scope and review date, published only after evidence review. |
| High | Blog articles use the organization as author rather than a verified individual author. | `data/blog.ts`, `app/blog/[slug]/page.tsx`, `components/ArabicFullPage.tsx` | Organization authorship is valid but provides weaker person-level experience and expertise signals. | Link organization-authored articles clearly to the editorial and technical-review policies. Support a future verified Person author/reviewer without publishing the founder as author unless authorship is confirmed. |
| High | Exact office unit, building, postal details, geographic coordinates and verified Google Business Profile URL are unavailable. | `data/site.ts`, `data/authority.ts`, `data/trustCenter.ts`, `app/contact/page.tsx`, `app/company-information/page.tsx`, `app/locations/dubai/page.tsx`, global LocalBusiness schema | Local entity verification and map prominence are limited; adding guessed details would create a serious trust risk. | Retain the published Dubai Investment Park 02 location. Surface a clear management TODO for exact address, map coordinates and verified GBP URL. Add them to the site record and schema only after documentary confirmation. |
| High | Company registration/licence identifiers, issuing authority, incorporation date, insurance and verified accreditations are unavailable. | `data/authority.ts`, company-information and founder/leadership pages | Missing primary company evidence limits organization verification; unsupported additions could create legal and EEAT risk. | Keep the existing publication gate. Create explicit management TODOs and a single future verification workflow rather than placeholder schema values. |
| Medium | Founder background and leadership functions are published with careful boundaries, but most role biographies, dates, qualifications and named personnel remain unverified. | `data/authority.ts`, `app/founder/page.tsx`, `app/leadership/page.tsx` | The current pages explain governance but cannot fully substantiate individual expertise. | Improve visible separation between verified identity, published professional focus and facts still awaiting evidence. Do not infer experience duration, education or credentials. |
| Medium | Trust, founder, leadership, company-information, FAQ and location-index pages are intentionally English-only. | `lib/i18n.ts`, trust routes and identity routes | Arabic visitors have incomplete trust-content parity, while creating thin machine-translated pages would also be harmful. | Keep hreflang limited to genuine equivalents. Add Arabic pages only when the full content can be reviewed; track each missing route as an editorial TODO. |
| Medium | Review dates are duplicated as hardcoded constants and prose across sitemap, trust pages, articles and reference panels. | `app/sitemap.ts`, `data/trustCenter.ts`, blog data/pages, authority content | Dates can drift and imply a review that did not occur if updated mechanically. | Centralize website-review dates by content family. Use article-specific dates for articles and a verified site review date for stable trust pages. Never auto-update dates without review. |
| Medium | Sitemap entries can inherit one universal last-modified date even when a page was not substantively reviewed on that date. | `app/sitemap.ts`, route data and article dates | Uniform freshness signals can be misleading to crawlers and reduce confidence in future update dates. | Emit `lastModified` only from a verified page/content-family date and omit it where no reviewed date is available. |
| Medium | The DEWA guide is a very large page module with extensive data, visible FAQ content and multiple schema entities in one file. | `app/dewa-approvals/page.tsx` | Large maintenance surface increases duplication, schema drift and client/server performance regression risk. | Extract typed content and schema helpers without changing the rendered design. Confirm only visible FAQs appear in FAQ schema and validate headings, sources and image loading. |
| Medium | Some authority and technical statements are time-sensitive even when primary-source links are provided. | DEWA page, approval pages, blog reference sections, `data/approvals.ts` | Outdated processes or links can weaken trust and mislead users. | Keep prominent project-specific disclaimers, attach checked/reviewed dates to reference sets, and schedule manual source review. Do not claim current rules merely because a link exists. |
| Medium | Schema construction is distributed across the layout, page modules and shared components. | `app/layout.tsx`, major page modules, `components/ServiceDetailPage.tsx`, `components/ApprovalServicePage.tsx`, `components/ArabicFullPage.tsx` | Distributed identity fields can drift and duplicate; TypeScript does not currently enforce a single graph convention. | Introduce reusable JSON-LD identity helpers and stable IDs for Organization, LocalBusiness/GeneralContractor, WebSite, Person and page entities. Keep page-specific content local. |
| Medium | GeneralContractor, LocalBusiness and Organization identity needs one explicit entity relationship rather than parallel ambiguous entities. | `app/layout.tsx`, person and page schemas | Ambiguous or duplicate business entities can weaken knowledge-graph consolidation. | Use one Organization entity and one GeneralContractor/LocalBusiness entity with stable IDs and explicit parent/brand relationships. Reuse those IDs everywhere. |
| Medium | The HTML-limited bot setting applies to every user agent rather than the crawler families that need bot-compatible HTML. | `next.config.ts` | Universal limiting can unnecessarily change rendering behavior for normal browsers and make production behavior harder to reason about. | Restrict the rule to named search, social, AI and audit crawlers that require complete HTML. |
| Medium | Page-level `WebPage` and breadcrumb schema coverage is broad but not guaranteed uniformly across all policy, identity and utility pages. | app page modules, `data/trustCenter.ts`, `components/TrustContentPage.tsx`, `components/PolicyContentPage.tsx` | Inconsistent page identity and hierarchy reduce machine readability. | Audit every indexable route; add one WebPage subtype and one BreadcrumbList where the breadcrumb is visibly represented. Avoid schema-only navigation. |
| Medium | The project route name and historic assets can still suggest a portfolio even though the copy correctly says planning library. | `/projects`, `data/projects.ts`, image filenames and component names | Users and crawlers may infer completed work from the URL or implementation naming. | Keep the established route to avoid unnecessary URL churn, but consistently use “scope planning library” in title, H1, copy and schema. Do not use Project schema for fictional scenarios. |
| Medium | Metadata override storage can change titles and descriptions at runtime, so source-only validation cannot prove production metadata uniqueness. | `data/seo.ts`, `lib/adminStore.ts`, `/api/seo-runtime` | Stored overrides could introduce duplicate or misleading metadata outside Git review. | Keep public canonical/indexability protected. Extend validation to inspect rendered runtime metadata and report duplicate titles/descriptions without exposing stored secrets. |
| Medium | Sitemap extra/exclusion configuration is dynamic and stored outside the typed route manifest. | `app/sitemap.ts`, `lib/adminStore.ts` | Misconfiguration could remove valid URLs or cause coverage drift. Current normalization mitigates unsafe origins. | Validate rendered sitemap URLs against the known route manifest and fail on non-200 canonical entries, redirect destinations or excluded priority routes. |
| Medium | Runtime redirect and unknown-route behavior cannot be fully proven by source inspection. | `middleware.ts`, `lib/routeAccessPolicy.ts`, `scripts/validate-error-routes.mjs`, `next.config.ts` | Soft 404s, redirect loops or mismatched Arabic aliases can waste crawl budget. | Run the production build locally and execute the route/error validator against the running server after changes. |
| Medium | `npm run lint` uses the deprecated/removed `next lint` interface for the installed Next.js version. | `package.json` | Required lint validation may fail before examining source quality. | Confirm the installed CLI behavior. If necessary, add a compatible ESLint flat configuration and change the script to `eslint .` without weakening Next.js rules. |
| Medium | Several image-heavy pages use large visual assets and priority loading. Runtime Core Web Vitals are not established by source inspection. | home, service, approval, project and article pages; shared hero/image components | Excess priority images or unstable sizing can affect LCP, bandwidth and mobile performance. | Retain `next/image`, explicit fill containers and responsive sizes. Audit priority usage so only the likely LCP image is eager, and browser-test representative mobile/desktop routes. |
| Medium | The blog index sends full article bodies and reference collections to its client component even though cards need only summaries; two featured images can also be eager. | `app/blog/page.tsx`, `components/BlogKnowledgeHub.tsx`, `data/blog.ts` | Larger React payloads and duplicate image preloads can increase transfer, hydration and mobile rendering work. | Derive a typed server-side summary payload and reserve priority loading for the primary likely-LCP image. |
| Medium | Internal links are data-driven across several independent datasets. | `data/site.ts`, `data/approvals.ts`, `data/blog.ts`, `data/trustCenter.ts`, page-local link arrays | A stale link can appear across many pages and Arabic localization can transform it differently. | Run static and rendered internal-link validation against canonical and redirect manifests, including fragments on high-value pages. |
| Medium | The contact location is a textual area rather than a fully verifiable postal address. | contact, company-information, location pages and schema | This is honest but less useful for local conversion and map verification. | Keep the current text and add a visible verification TODO in company information. Request exact public address and GBP data from management before enhancement. |
| Medium | Legal policy content identifies retention and processor details as awaiting management/legal confirmation. | `data/cookieConsentDefaults.ts`, privacy and cookie pages | Incomplete retention/processors information can reduce trust and requires legal input, not SEO invention. | Keep the current disclosure. Add management/legal TODOs for retention periods, processors and request handling; do not fabricate compliance claims. |
| Low | Meta keywords are generated on many pages even though Google does not use the meta keywords tag for ranking. | `data/seo.ts` and page metadata inputs | No direct ranking benefit; excessive keyword lists can distract maintenance effort. | Retain only if operationally useful, cap and deduplicate as currently implemented, and prioritize titles, descriptions, headings and content instead. |
| Low | Search and guest-post routes are utility/editorial routes and require consistent noindex handling across metadata overrides and sitemap exclusions. | `app/search/page.tsx`, `app/guest-post/page.tsx`, `data/seo.ts`, sitemap | Accidental indexing can create thin or user-generated-content risk. | Confirm both render `noindex, follow`, have no sitemap entry and use safe canonicals. Keep public canonical routes protected from arbitrary noindex overrides. |
| Low | The branded not-found and global error experience exists but must be tested for semantic status, metadata and keyboard behavior. | `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`, `components/ErrorPageShell.tsx`, middleware | A visually correct error page can still return the wrong status or expose indexable metadata. | Run direct and client-navigation error tests, confirm 404 status and noindex behavior, and retain accessible recovery links. |
| Low | Mobile navigation and the article enquiry panel require keyboard and responsive-overflow verification that static linting does not provide. | `components/HeaderClient.tsx`, `components/BlogEnquiryPopup.tsx` | Escape-key failures or horizontally clipped form controls create accessibility and conversion friction. | Close menus and prompts on Escape with focus restoration where a trigger exists, connect controls with ARIA attributes and browser-test the panel at representative breakpoints. |
| Low | Social profiles are intentionally empty. | `data/site.ts`, Organization schema, footer | Missing verified `sameAs` references limits entity corroboration but invented profiles would be worse. | Add only management-confirmed official profile URLs and then reuse them in footer and Organization schema. |
| Low | Phone display, dialing and WhatsApp routing depend on distinct office and mobile formats. | `data/site.ts` and contact components | Local formatting or deriving WhatsApp from the office number could create contact-channel drift. | Keep the formatted primary office number, E.164 value and `tel:` URI centralized, and continue deriving WhatsApp only from the secondary mobile value. |
| Low | Existing validation is comprehensive but there is no dedicated unit-test script. | `package.json`, validation scripts | Regressions are caught mainly through integration/build checks. | Add focused tests only when introducing testable helper behavior; continue using type-check, build and route validators as release gates. |

## Post-implementation status

The findings table records the issues observed during the repository audit. The following remediation was completed locally on 24 July 2026:

- Arabic commercial routes now render native Arabic server content inside explicit `lang="ar-AE"` and RTL content roots, with an `ar-AE` response header, localized metadata, canonicals, reciprocal hreflang and one page-level Arabic schema graph.
- The shared root layout remains statically renderable with an English document shell. A synchronous head script sets the document language and direction before body parsing, while a client synchronizer covers navigation. A future route-group split is the supported way to emit a literal Arabic root `<html>` in raw source without making every route dynamically rendered.
- Unknown English and Arabic closed-set routes are covered by hard-404 checks. Arabic misses return localized content, a localized title, recovery links and `noindex`; direct and client navigation are both tested.
- Organization, LocalBusiness and GeneralContractor identity is consolidated under the stable `https://emitronix.ae/#organization` ID and reused by page, service, article and person graphs.
- Review ownership and verified review dates are visible on company, leadership, service, approval, project, trust and article content. Article reference sets have their own checked dates and primary-source starting points.
- Project scenarios remain explicitly illustrative. The project data model now prevents a real case study from being published without verified evidence sources and publication consent.
- Authority-service wording was tightened to avoid implying approvals, registrations, outcomes, speed or experience that the repository cannot substantiate.
- Visible breadcrumbs and corresponding machine-readable hierarchy were expanded across corporate, service, approval and utility hubs.
- Sitemap freshness now uses verified content dates rather than assigning one universal date. English/Arabic exclusions remain paired.
- `llms.txt` and `llms-full.txt` now state the public evidence boundary, company identity, reviewed date, service coverage and the illustrative status of project scenarios.
- The global business graph no longer publishes duplicate business entities. Bot-compatible HTML targeting is limited to named search, social, AI and audit crawlers.
- The blog index sends typed summaries to the client and prioritizes only the primary featured image.
- Desktop and mobile browser QA confirmed correct document language/direction, one H1, no page-level horizontal overflow, working cookie consent, keyboard menu dismissal, localized 404 behavior and an accessible enquiry prompt without internal horizontal overflow.

The following findings remain open because they require verified company evidence or a separate maintenance decision:

- Exact public office address, coordinates and verified Google Business Profile URL.
- Trade licence, registration, incorporation, insurance, accreditation and authority-registration evidence.
- Named team biographies, qualifications, professional registrations and verified experience dates.
- Confirmed individual article authors and named technical reviewers.
- Rights-cleared completed-project evidence, outcomes, photographs, clients and publication consent.
- Testimonials with permission to publish.
- Legally reviewed retention periods, processor list and privacy-request workflow.
- Full Arabic parity for English-only trust and identity routes after human editorial review.
- Optional English/Arabic route-group migration if literal locale-specific root `<html>` markup is required while retaining static generation.
- Review and republish any production-stored cookie configuration so its policy review date and disclosure text remain aligned with the updated source defaults.
- Optional extraction of the large DEWA content module into smaller typed data/schema helpers.
- Migration from the currently passing but deprecated `next lint` command to the ESLint CLI before a future Next.js major upgrade.

## Route and content observations

### Public route families

- Corporate: home, about, founder, leadership, company information, careers and contact.
- Service hubs and detail pages: civil, main contracting, warehouse, industrial, commercial, villa, interior, renovation, structural, design-build, turnkey and project management.
- Authority hub and detail pages: Dubai Municipality, DDA, DCD, DEWA, Trakhees, DIFC, Concordia/DMCC and RTA.
- Knowledge: resources, blog, FAQ, industries, locations, Dubai location guide and HTML sitemap.
- Trust and policy: editorial, technical review, corrections, disclaimer, accessibility, privacy, cookie and terms.
- Utility: search, guest post, admin and API endpoints.
- Arabic: home, core commercial routes, services, approvals, blog content and selected policies.

### Duplicate and thin-content risk

- Service aliases redirect permanently to canonical top-level service routes rather than remaining indexable duplicates.
- `/approvals` redirects to `/approval`.
- Arabic aliases follow the same canonical redirect strategy.
- The scenario library is substantial and transparently framed; it should not be replaced with thin “project” pages without real evidence.
- English-only trust routes should remain without Arabic alternates until a real Arabic equivalent exists.

### Keyword and local-topic coverage

The existing architecture naturally covers the requested topics through relevant pages rather than doorway pages:

- building contractor in Dubai
- warehouse construction company Dubai
- design and build contractor Dubai
- civil contractor Dubai
- commercial construction company Dubai
- industrial construction contractor Dubai
- DEWA approvals Dubai
- RTA approvals and NOC Dubai

Further work should improve entity clarity and internal links, not repeat exact-match phrases unnaturally.

## Management and evidence TODO register

The following information is not sufficiently verified in the repository and must remain unpublished or clearly marked as awaiting verification:

1. Trade licence number, issuing authority and expiry date.
2. Company registration number and incorporation date.
3. Exact office unit, building, postal address, map coordinates and access details.
4. Verified Google Business Profile URL and status.
5. Official social profile URLs.
6. Insurance details.
7. Certifications, memberships and accreditations.
8. Founder degree title, institution, education dates and employment chronology.
9. Verified years of experience.
10. Named team members, roles, biographies, qualifications and professional registrations.
11. Named article authors and technical reviewers with confirmed authorship/review scope.
12. Rights-cleared project names, locations, clients, dates, scope, challenges, outcomes, photographs and publication consent.
13. Testimonials and permission to publish them.
14. Exact authority or specialist registration status and the scope Emitronix is legally authorized to submit, contract or execute.
15. Personal-data retention periods, full processor list and legally reviewed privacy-request workflow.

## Validation plan

After implementation:

1. Run TypeScript checking.
2. Run lint with a Next.js 15-compatible command.
3. Run the production build using an isolated local build directory if needed.
4. Run brand-asset validation.
5. Start the production bundle locally.
6. Run strict SEO validation.
7. Run route, redirect, asset, soft-404 and error-page validation.
8. Inspect sitemap and robots responses.
9. Browser-test representative English and Arabic pages at mobile and desktop widths.
10. Review the final Git diff and confirm the pre-existing `next-env.d.ts` modification was not overwritten.

## Validation results

Final local production validation on 24 July 2026:

- `npm run type-check`: passed.
- `npm run lint`: passed with no warnings or errors; Next.js printed its expected `next lint` deprecation notice.
- `npm run build`: passed; 122 static pages were generated, with English routes restored to static/SSG output and 51 Arabic catch-all paths pre-rendered.
- Strict SEO crawl: passed for 87 HTML pages, 294 public image URLs and 30 canonical redirects.
- Arabic SEO validation: passed for all 38 Arabic sitemap URLs.
- Route, redirect, API, asset, direct-404 and RSC validation: passed 312 checks.
- Brand validation: passed for 10 assets across 134 source files.
- `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt`: all returned 200 from the production bundle.
- Sitemap integrity: 87 unique production URLs, with no admin or API URLs.
- Browser QA: representative English and Arabic desktop/mobile pages, keyboard menus, cookie consent, localized 404s and the article enquiry panel passed the recorded checks.
- No dedicated `npm test` script is configured; the typed build and repository integration validators are the available test gates.
