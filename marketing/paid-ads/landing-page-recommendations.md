# Paid landing-page recommendations

**Prepared:** 4 August 2026 (Asia/Dubai)
**Status:** recommendations only; no website source was changed and nothing was published.
**Evidence basis:** production crawl of [emitronix.ae](https://emitronix.ae/) plus repository review. Business facts remain governed by `data/site.ts`.

## Recommendation in one sentence

Use and improve a small set of distinct commercial pages—one core warehouse page, one modification/expansion page, one industrial/factory page, one civil/MEP page, one warehouse-approvals page, and the existing authority-specific pages—instead of creating 11 near-duplicate paid landing pages.

Before any of these pages receives paid traffic, resolve the legal-name discrepancy, implement server-confirmed conversions and attribution, and run an approved test lead through Zoho.

Live route checks on the audit date confirmed that `/jafza-approval`, `/dubai-south-approval`, `/warehouse-modification-dubai`, and `/thank-you` return 404. The first three should not be used as final URLs; the missing thank-you route is part of the P0 measurement work.

## Final-URL map for paid campaigns

| Campaign / ad-group intent | Recommended final URL | Launch status | Decision |
|---|---|---|---|
| Warehouse Construction | `/warehouse-construction` | Improve, then use | This is already the strongest warehouse page and has the right title, H1, form, phone, and WhatsApp |
| Warehouse Contractors | `/warehouse-construction` | Improve, then use | Do not create another contractor page; the existing page already targets “Logistics Warehouse Contractor” |
| Industrial Warehouse | `/warehouse-construction` initially | Improve, then use | Use the core page until a materially distinct industrial-warehouse proposition is verified |
| Warehouse Expansion | `/warehouse/warehouse-expansion` | Rebuild before use | Make this the single commercial page for modification, expansion, extension, and renovation |
| Warehouse Modification | `/warehouse/warehouse-expansion` | Rebuild before use | Change the title/H1 and content to cover modification explicitly; avoid a new duplicate URL |
| Warehouse Extension / Renovation | `/warehouse/warehouse-expansion` | Rebuild before use | Consolidate intent after checking Search Console, backlinks, and current organic traffic |
| Factory Construction | `/industrial-buildings` initially | Improve, then use | The existing page already includes factories and workshops and has an embedded form |
| Industrial Building Construction | `/industrial-buildings` | Improve, then use | Avoid duplicating `/warehouse/industrial-building-construction` until distinct demand and content are proven |
| Warehouse Civil Works | `/warehouse/warehouse-mep` | Rebuild before use | Reposition as one focused civil, MEP, fire-interface, and fit-out page |
| Warehouse MEP Works | `/warehouse/warehouse-mep` | Rebuild before use | Existing topic is relevant but templated and has no form |
| Warehouse Fit-Out | `/warehouse/warehouse-mep` | Rebuild before use | Use one integrated page unless the business can prove fit-out is a sufficiently separate offer |
| Warehouse Authority Approvals | `/warehouse/warehouse-authority-approvals` | Rebuild before use | Use as the combined warehouse-specific approval page; retain jurisdiction pages below |
| Dubai Municipality Approval | `/dubai-municipality-approval` | Improve tracking/above-fold conversion, then use | Strong message match and embedded form |
| Dubai Civil Defence Approval | `/dcd-approvals` | Improve tracking/above-fold conversion, then use | Strong message match and embedded form |
| Trakhees Approval | `/trakhees-approvals` | Improve tracking/above-fold conversion, then use | Strong message match and embedded form |
| DDA Approval | `/dda-approvals` | Improve tracking/above-fold conversion, then use | Strong message match and embedded form |
| RTA Approval | `/rta-approval` | Improve tracking/above-fold conversion, then use | Strong message match and embedded form |
| DEWA / warehouse utility coordination | `/dewa-approvals` or the improved warehouse-MEP page | Shorten commercial path first | Current DEWA page is a 6,800-word guide; use it only when the query is specifically DEWA-related |
| JAFZA Approval | No final URL approved | Hold | No dedicated verified approval record/page exists; confirm service scope and role first |
| Dubai South Approval | No final URL approved | Hold | No dedicated verified approval record/page exists; confirm service scope and role first |
| Broad Authority Approvals | Best matching authority-detail page; `/approval` only as a sitelink/hub | Hold broad traffic | The hub has no embedded form and is weaker than a jurisdiction-matched page |

## Consolidation plan: pages not to duplicate

### Warehouse construction and contractor

Use `/warehouse-construction` for both “warehouse construction Dubai” and “warehouse contractor Dubai.” Do not build a second paid landing page called “Warehouse Contractor Dubai.”

The following live pages overlap heavily and should not all be paid destinations:

- `/warehouse-construction`
- `/warehouse/warehouse-construction-dubai`
- `/warehouse/warehouse-contractors-dubai`
- `/warehouse/warehouse-builder-uae`
- `/warehouse/industrial-warehouse-construction`

Keep the core route as the commercial authority page. Before redirecting or canonicalizing any sibling, inspect Search Console queries, backlinks, indexed status, and organic conversions. If a sibling has useful organic demand, retain it as supporting content with a clear link to the core conversion page rather than cloning the same form and proposition across every route.

### Modification, expansion, extension, and renovation

Use `/warehouse/warehouse-expansion` as the single commercial paid page, with the proposed H1 “Warehouse Modification and Expansion in Dubai.” Fold genuinely useful material from these siblings into distinct sections:

- `/warehouse/warehouse-expansion`
- `/warehouse/warehouse-renovation`
- `/warehouse/warehouse-extension`
- `/building-renovation` where it addresses warehouse-specific existing-condition work

Do not create a fifth near-identical “warehouse modification Dubai” page. After organic-impact review, either redirect overlapping warehouse siblings to the consolidated route or keep them as clearly differentiated informational support pages.

### Industrial and factory construction

Use `/industrial-buildings` for industrial-building, factory, and workshop searches at launch. It already has an embedded form and the live title explicitly includes “Factory & Workshop.”

Do not simultaneously use these overlapping pages as paid destinations:

- `/industrial-buildings`
- `/warehouse/factory-construction`
- `/warehouse/industrial-building-construction`
- `/warehouse/industrial-warehouse-construction`

A separate factory page is justified only if the business can verify a distinct offer and supply useful factory-specific content such as process flow, equipment bases, utility duties, ventilation, maintenance access, operating continuity, and relevant approval interfaces. Without that distinction, one industrial/factory page will produce clearer message match and cleaner measurement.

### Warehouse civil, MEP, and fit-out

Rebuild `/warehouse/warehouse-mep` as one commercial page for civil/MEP coordination and operational fit-out. Supporting pages such as warehouse civil works, utility services, fit-out, fire fighting, fire alarm, flooring, and roofing can explain individual work packages, but they should not all compete as paid landing pages.

### Warehouse authority approvals

Rebuild `/warehouse/warehouse-authority-approvals` as the combined route for warehouse approval planning. It should route users to the existing Dubai Municipality, DCD, DEWA, Trakhees, DDA, and RTA pages according to jurisdiction and project need. It must not imply that one application or one contractor appointment covers every authority.

## Page-level recommendations

All proposed titles, H1s, and copy directions below are recommendations, not verified new business claims.

### 1. Core warehouse construction page

**Route:** `/warehouse-construction`
**Proposed title:** `Warehouse Construction Dubai | Warehouse Contractor | Emitronix`
**Proposed H1:** `Warehouse Construction Contractor in Dubai`
**Primary CTA:** `Request a Warehouse Quotation`
**Secondary CTAs:** `Book a Site Inspection`, `Call Emitronix`, `WhatsApp the Team`

Keep the existing technical depth, but make the first screen commercial and scannable:

1. Two-sentence introduction covering warehouse construction, civil/structural/MEP coordination, and authority-aware planning.
2. Four concise scope points: new construction, design/build coordination, civil and MEP interfaces, inspection/handover support.
3. Short enquiry form beside or immediately below the hero.
4. Verified contact details and a privacy link in the same visual area.
5. A clear qualifier: final scope, authority route, consultant role, and formal submitter depend on the project.

Retain sections for project types, operations and loading, civil/structural scope, MEP/fire interfaces, approvals, locations, documents, process, cost factors, FAQs, and detailed form. Reduce the current 142-H2 reading path by using a compact table of contents and moving deep educational material into supporting articles.

### 2. Warehouse modification and expansion page

**Route:** `/warehouse/warehouse-expansion`
**Proposed title:** `Warehouse Modification & Expansion Dubai | Emitronix`
**Proposed H1:** `Warehouse Modification and Expansion in Dubai`
**Primary CTA:** `Request a Modification Review`

This page needs unique content that cannot be swapped into a new-build page:

- Existing-condition survey and approved-baseline review
- Live-warehouse phasing, access, protection, shutdowns, and business continuity
- Structural openings, mezzanines, extensions, slabs, loading bays, offices, and service upgrades where applicable
- Existing versus proposed drawings and responsibility for design/submission
- Fire/life-safety, utility, landlord, free-zone, and authority implications
- Recommissioning, as-builts, inspections, and handover of modified systems
- A qualification form asking whether the warehouse is operating, which drawings exist, and what authority comments are already open

Do not use generic new-build imagery or copy as the only proof of modification capability. Add verified site/project evidence only after publication consent and business approval.

### 3. Industrial building and factory construction page

**Route:** `/industrial-buildings`
**Proposed title:** `Industrial & Factory Construction Dubai | Emitronix`
**Proposed H1:** `Industrial Building and Factory Construction in Dubai`
**Primary CTA:** `Discuss an Industrial Project`

Differentiate this page from warehouse construction through operating requirements:

- Manufacturing/process use and equipment information
- Equipment foundations and structural loads
- Power, water, drainage, ventilation, and other project-specific utility interfaces
- People, material, vehicle, and maintenance flows
- Fire/life-safety and hazardous-use questions where relevant to the verified project
- Phasing around operational continuity
- Testing, commissioning, close-out, and handover records

Until the business supplies a clearly distinct factory offer, route both factory and industrial-building ads here rather than to templated factory/industrial sibling pages.

### 4. Warehouse civil, MEP, and fit-out page

**Route:** `/warehouse/warehouse-mep`
**Proposed title:** `Warehouse Civil & MEP Works Dubai | Emitronix`
**Proposed H1:** `Warehouse Civil and MEP Works in Dubai`
**Primary CTA:** `Request a Civil & MEP Scope Review`

The page should explain the interfaces rather than present unrelated trade lists:

- Civil enabling, slabs, drainage, builders’ work, equipment bases, and external interfaces
- Electrical, water, drainage, ventilation, and service routing as applicable to the project
- Fire alarm/fire-fighting coordination with the appointed specialists and authority route
- Warehouse offices, welfare/support spaces, loading and operational fit-out
- Approved-drawing coordination, inspection hold points, testing, commissioning, and as-built records
- What Emitronix coordinates versus what requires an appointed designer, specialist, consultant, or authority-approved party

Use supporting MEP/fire/civil pages as internal resources, not parallel paid landing pages.

### 5. Warehouse authority approval page

**Route:** `/warehouse/warehouse-authority-approvals`
**Proposed title:** `Warehouse Authority Approvals Dubai | Emitronix`
**Proposed H1:** `Warehouse Authority Approval Support in Dubai`
**Primary CTA:** `Send Drawings for an Approval-Route Review`

Replace the current generic template with a warehouse-specific decision path:

1. Confirm the site, jurisdiction, lease/plot, current use, and proposed change.
2. Identify the owner, tenant, landlord/master developer, consultant, contractor, and formal submitter roles.
3. Inventory existing/proposed drawings, NOCs, authority comments, system information, and inspection status.
4. Explain how civil, structural, MEP, and fire/life-safety changes affect one another.
5. Link to the correct DM, DCD, DEWA, Trakhees, DDA, or RTA detail page.
6. State clearly that approval outcome and timing are not guaranteed.

The current meta description ends with “in.” and must be rewritten before the page is used in ads or organic snippets.

### 6. Existing authority-specific pages

**Routes:** `/dubai-municipality-approval`, `/dcd-approvals`, `/trakhees-approvals`, `/dda-approvals`, `/rta-approval`, and `/dewa-approvals`

Retain the jurisdiction-specific pages. They are meaningfully different from one another and already use cautious claim language. Improve them for paid traffic by:

- Placing a short form within the first commercial section rather than only near the bottom
- Making the first paragraph answer the exact paid query
- Showing a concise “what we can coordinate / what must be confirmed” boundary
- Listing the minimum useful enquiry inputs, not an unqualified universal document checklist
- Prefilling the authority in the form and CRM record
- Keeping phone and WhatsApp visible without covering form controls on mobile
- Moving deep guide content below a short commercial summary and anchor navigation

For `/dewa-approvals`, preserve the thorough guide for organic visitors but add a short commercial entry path. Its current length and guide-led H1 make it a weaker direct-response page than the other authority routes.

### 7. JAFZA and Dubai South pages

Do not create or advertise these pages until the business confirms the exact support offered and the role Emitronix may perform. If verified, suggested routes are:

- `/jafza-approval`
- `/dubai-south-approval`

Each must have genuinely distinct, current jurisdiction content: applicable project situations, who owns each appointment/submission, property or lease context, drawings and NOCs, comment/inspection workflow, official references, and a clear non-guarantee statement. Do not clone the Trakhees page and replace the authority name.

## Required page anatomy

Every paid destination should use the following order:

1. **Message-matched hero:** exact service + Dubai, two-sentence commercial explanation, one primary and two secondary actions.
2. **Short form:** low-friction enquiry with privacy consent.
3. **Service scope:** what is included, excluded, and subject to project review.
4. **Project types:** only project types supported by verified business scope.
5. **Process:** assessment, scope/drawing review, authority/consultant coordination, proposal, execution or submission support, inspection/handover as applicable.
6. **Authority and responsibility boundary:** jurisdiction, formal submitter, appointed consultant, landlord/master developer, and no guaranteed outcome.
7. **Locations served:** derive from `data/site.ts`; add named industrial zones only where the business confirms service coverage.
8. **Verified trust:** legal contact details, privacy, policies, process controls, and only approved project/case evidence.
9. **FAQs:** answer high-intent objections without promising price, timeline, or approval outcomes.
10. **Detailed qualification form:** for visitors ready to share project facts.
11. **Phone and WhatsApp:** persistent but accessible, with tracked clicks and a non-sensitive prefilled service message.
12. **Privacy and thank-you:** visible privacy link and a server-confirmed success destination.

## Form recommendations

### Short form near the top

- Full name
- Company name
- Mobile number
- Project location
- Project type or required service
- Consent with privacy-policy link

Email may be retained if the sales process requires it, but requiring both phone and email increases friction. Decide this from lead-handling needs, then test rather than assuming.

### High-intent form lower on the page

- Full name
- Company name
- Mobile number
- Email
- Project location
- Project type
- Approximate warehouse/building size
- Required authority or “not sure”
- Existing drawings available: yes/no
- Existing site operating: yes/no, for modification pages
- Expected project start date
- Short project description
- Optional file-upload route only after secure storage, file validation, retention, access, and consent are designed

### Hidden attribution fields

Persist and send the original landing page, referrer, first and latest UTM values, `gclid`, `gbraid`, `wbraid`, and `fbclid`, plus the campaign/ad-group/ad/keyword fields available from platform parameters. Map them to dedicated Zoho fields, not only the free-text Description.

## Conversion and thank-you acceptance criteria

This section defines landing-page acceptance, not the full tracking implementation plan.

- A form conversion fires only after the server confirms success.
- The browser and server share a unique non-PII event ID so browser/server events can be deduplicated.
- Refreshing a thank-you page does not create another lead conversion.
- Phone, WhatsApp, email, quotation, and site-inspection actions have separate events.
- CTA query parameters preselect the service/intent and survive navigation to the form.
- Original landing and attribution values persist through the journey in a consent-aware way.
- The thank-you page contains no personal data in the URL or page source.
- Failed form/CRM submissions do not fire success events.
- Consent-denied and consent-granted paths are both validated.
- Google Ads, GA4, Meta, and Zoho totals are reconciled before bidding is optimized to leads.

## Trust and proof plan

The verified-project array in `data/site.ts` is empty. Do not compensate with invented reviews, client logos, project counts, “government approved” badges, or unsupported years of experience.

Ask the business to supply evidence for approval before publication:

- Legal/trade identity details appropriate for public display
- Relevant registration or appointment status, including exact scope and expiry where applicable
- Project photographs with location, scope, date, and publication consent
- Client-approved case studies with measurable but verifiable outcomes
- Named team qualifications and roles with consent
- Testimonials with customer approval and source records
- Insurance, safety, QA/QC, and handover-process evidence that can be substantiated

Until then, use the trust elements already supported by source: verified contact details, Dubai location, published hours, scope clarity, authority-aware planning, document control, inspection readiness, handover focus, privacy policy, and editorial/technical-review boundaries.

## Internal-link and navigation recommendations

- Keep the global brand and essential legal navigation, but make the paid-page content path visually dominant.
- Use a compact anchor bar: Scope, Project Types, Process, Approvals, Documents, FAQs, Enquire.
- Limit in-content exits to the next genuinely relevant service or authority page.
- Move broad blog/resource grids below the final enquiry section or omit them from the commercial route.
- Keep a visible path to privacy policy and company/contact information.
- Do not use query-based cloaking or show materially different claims to ad crawlers and users.

## Content-quality rules

- Write one page for one buyer problem, not one page for every keyword variation.
- Use Dubai/UAE naturally; do not repeat the location in every heading.
- Use “support” or “coordination” for authority work unless a stronger role is verified.
- Do not promise guaranteed approval, lowest price, fastest completion, number-one status, or government endorsement.
- Do not state an unverified response time, project count, client name, licence, registration, or certification.
- Replace generated fragments such as “Dubai in Dubai,” “approvals approvals,” and descriptions ending with “in.” or “and.”
- Give each retained page unique project situations, deliverables, risks, documents, FAQs, and qualification questions.

## Pre-launch test checklist

1. Confirm advertiser/legal name and each promoted service/authority role.
2. Approve the final URL map and consolidation choices.
3. Verify title, description, canonical, one H1, robots, schema, and internal links for each destination.
4. Test desktop and mobile layouts, form labels, keyboard access, focus, sticky actions, and consent controls.
5. Test phone and WhatsApp URLs without placing an unintended call/message.
6. Submit one approved test lead per form type and verify Zoho fields, duplicate handling, ownership, and follow-up task creation.
7. Validate UTMs and click IDs from landing through CRM.
8. Validate form, phone, WhatsApp, email, quotation, and site-inspection events in platform debug tools.
9. Confirm events do not fire twice after refresh, back navigation, retry, or server failure.
10. Check page speed and Core Web Vitals on the final production build, especially the long warehouse and DEWA pages.
11. Review ad-to-page message match and all policy-sensitive claims.
12. Obtain written approval before publishing website changes or activating campaigns.

Current mobile QA provides a good baseline: no horizontal overflow was observed at 390 px, form controls were comfortably sized, and the floating WhatsApp/chat actions did not overlap the submit control at the tested position. Re-test after any hero/form or sticky-action change.
