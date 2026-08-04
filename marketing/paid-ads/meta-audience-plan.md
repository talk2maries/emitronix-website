# Meta Ads Audience Plan

Status: **Draft only - do not publish, activate billing or increase budgets.**
Prepared: 4 August 2026
Business source of truth: `data/site.ts` and verified local routes
Advertiser: Emitronix Contracting LLC
Primary market: Dubai, UAE

## Recommended operating model

The account should contain the two requested Leads campaigns, but the complete ad-set list is a phased testing backlog rather than a recommendation to activate everything at once. At AED 15 per day, simultaneous delivery across all ad sets would fragment spend and make results difficult to interpret.

| Campaign | Daily budget | Initial live ad set | Initial conversion location | Budget rule |
|---|---:|---|---|---|
| Warehouse Construction Leads | AED 10 | Warehouse Construction | Instant form | Campaign-level budget; one prospecting ad set live initially; no automatic increase |
| Authority Approval Leads | AED 5 | Dubai Municipality and DCD Approvals | Instant form | Campaign-level budget; one prospecting ad set live initially; no automatic increase |
| Total | AED 15 | Two live ad sets across two campaigns | Leads | Retargeting, lookalikes and any awareness activity must share these budgets or remain off |

There is no separate brand-awareness campaign in this plan. If awareness is later requested, phase it within the same AED 15 total or obtain written approval for a revised budget. Do not allow automated budget recommendations to raise the approved amounts.

In `meta-campaign-structure.csv`, the AED 10 or AED 5 campaign amount is repeated on format-planning rows only as a campaign reference. It is not an ad-set or ad-format budget and must never be summed across rows. The Meta total remains AED 15 per day.

## Current Meta setup constraints

These recommendations reflect the current Meta setup model, but the exact controls shown in Ads Manager can vary by account, placement and rollout:

- The Leads objective uses an Advantage+ leads setup by default when eligible, with Advantage+ campaign budget, audience and placements enabled. Inputs that narrow the setup can change its Advantage+ status. Use only controls that reflect real business constraints. [Meta Advantage+ leads campaigns](https://www.facebook.com/business/ads/meta-advantage-plus/leads)
- In Advantage+ audience, interests, demographics, job titles, custom audiences and lookalikes are generally audience suggestions. Meta may deliver beyond those suggestions. Location, minimum age, language and custom-audience exclusions can be used as controls. [Meta Advantage+ audience](https://www.facebook.com/business/ads/meta-advantage-plus/audience)
- Detailed-targeting exclusions are no longer available for new ad sets and were removed from active existing campaigns created in Ads Manager from 31 March 2025. Job seekers or irrelevant interests therefore cannot be reliably removed with legacy detailed exclusions; use custom-audience exclusions, creative qualification and form questions instead. [Meta audience targeting help](https://www.facebook.com/help/157306091096340)
- Meta advises broad targeting and notes that detailed-targeting options may reduce the audience. Dubai is already a geographic constraint, so avoid stacking many interests, job titles and industrial-zone radii. [Meta ad targeting guidance](https://www.facebook.com/business/ads/ad-targeting)
- Instant forms can optimize initially for lead volume. Optimization for conversion leads should be used only after CRM and Conversions API feedback is correctly returning qualified outcomes. Website forms require a validated web conversion event. [Meta lead ads with forms](https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-forms)
- Ads that click to WhatsApp can use the Leads objective and conversations optimization, subject to account eligibility and an attached WhatsApp Business destination. [Meta click-to-message ads](https://www.facebook.com/business/ads/click-to-message-ads)

### Practical consequence for B2B targeting

Meta cannot be treated like a verified company or job-title database. The requested personas - business owners, factory owners, warehouse owners, facility managers, operations managers, project managers, procurement managers, logistics companies, manufacturers, developers and industrial consultants - should guide creative, forms and CRM qualification. Available interest or job-title signals may be added as suggestions, but they are not guaranteed identity filters.

## Shared audience controls

| Setting | Recommendation |
|---|---|
| Location | Dubai as a strict control. Add Jebel Ali, Dubai Investment Park, Dubai South, Dubai Industrial City, Al Quoz or Ras Al Khor pins/radii only if Meta recognizes them and the audience remains deliverable. Do not automatically expand to all UAE. |
| Future geography | Abu Dhabi and Sharjah are verified service areas in `data/site.ts`, but test them only as a separately approved future rotation after Dubai lead quality is understood. Do not add unverified service areas. |
| Age | Keep 18+ for the initial Advantage+ setup. Treat likely business-decision-maker ages as a suggestion or analyze them in reporting; do not narrow before evidence supports it. |
| Gender | All genders. |
| Language | No language restriction initially. English creative is the launch version. Test Arabic creative only when professionally localized assets and sufficient budget are approved. Interface-language targeting can exclude multilingual users. |
| Placements | Advantage+ placements. Supply 1:1, 4:5 and 9:16 assets with captions and safe zones. Do not create placement-only ad sets at this budget. |
| Device | All eligible devices. Review quality by placement and device before any restriction. |
| Special Ad Category | None is expected for B2B construction and authority-coordination services. Verify at build time. If an ad changes into employment, housing, credit or a regulated social-issue offer, stop and rebuild under the applicable rules. |
| Prospecting exclusions | Custom audiences for submitted leads, qualified leads and current customers only when the advertiser has a lawful first-party basis. A careers-page visitor audience may also be excluded if consented and large enough to be usable. |
| Detailed exclusions | Do not include; the legacy control is unavailable. |

## Campaign 1 - Warehouse Construction Leads

The campaign covers all six requested ad sets. With AED 10 per day, activate one prospecting ad set at a time, with two approved creatives inside it. Move to the next test only after the prior test has accumulated enough delivery to judge lead validity, or after a documented reason to stop it.

| Ad set | Audience suggestions, not guarantees | Conversion location | Destination | Phase and gate |
|---|---|---|---|---|
| Warehouse Construction | Warehousing, logistics, supply chain, construction management, industrial property, business-decision-maker signals | Instant form | `LF-WH-Short-v1`; context page `https://emitronix.ae/warehouse-construction` | Phase 1; initial live ad set |
| Warehouse Modification and Expansion | Facility management, operations management, warehousing, industrial property, renovation, construction project management | Website | Consolidated destination `https://emitronix.ae/warehouse/warehouse-expansion` | Phase 2; the consolidated page must be rebuilt and approved for paid traffic, and Pixel, consent and deduplicated `generate_lead` must be validated |
| Factory and Industrial Construction | Manufacturing, industrial engineering, factory management, procurement, project management | Instant form | `LF-WH-HighIntent-v1`; context page `https://emitronix.ae/industrial-buildings` | Phase 2; rotate rather than run alongside all other ad sets |
| Civil MEP and Fire-System Works | Facility management, MEP, fire safety, warehouse operations and construction | WhatsApp | Connected WhatsApp Business destination; `WA01` or `WA02` | Phase 2; only after routing, consent notice and staffed response process are ready |
| Retargeting Website Visitors | Combined eligible warehouse-page visitors, Meta engagers, form openers and video viewers | Website | `https://emitronix.ae/contact` | Phase 3 conditional; remain off until the combined audience is eligible and can produce meaningful reach within the shared AED 10 budget |
| Lookalike Qualified Leads | Lookalike of qualified leads or customers used as an Advantage+ suggestion | Instant form | `LF-WH-HighIntent-v1` | Phase 3 conditional; source must be lawful, representative, matched, eligible and large enough to evaluate |

### Warehouse message-to-persona map

| Persona cluster | Primary concern to address in creative and forms |
|---|---|
| Owners, investors and developers | Intended use, project scope, approvals, quotation inputs and handover responsibilities |
| Factory and warehouse operators | Loads, access, utilities, drainage, fire safety and operational constraints |
| Facility and operations managers | Existing conditions, phased modification, service capacity and site access |
| Project and procurement managers | Scope boundaries, drawings, assumptions, responsible parties and comparison quality |
| Logistics and manufacturing teams | Goods movement, loading, racking or equipment interfaces and operational readiness |
| Consultants | Civil, structural, MEP, authority, inspection and close-out interfaces |

## Campaign 2 - Authority Approval Leads

The campaign contains each requested approval lead route, but AED 5 per day cannot support multiple narrow authority ad sets at the same time. Start with one combined Dubai Municipality and DCD ad set. Use the approval question in the lead form to route enquiries.

| Ad set | Audience suggestions, not guarantees | Conversion location | Destination | Phase and gate |
|---|---|---|---|---|
| Dubai Municipality and DCD Approvals | Construction, architecture, facility management, fire safety, property operations and project management | Instant form | `LF-AP-HighIntent-v1`; `https://emitronix.ae/dubai-municipality-approval`, `/dcd-approvals` or `/warehouse/warehouse-authority-approvals` | Phase 1; initial live ad set |
| Trakhees JAFZA and Dubai South Approvals | Free-zone business, logistics, warehousing, construction management and facility operations | Website | Trakhees-only assets: `https://emitronix.ae/trakhees-approvals`; JAFZA and Dubai South assets: hold with no approved final URL | Phase 2 for Trakhees after page and event readiness; JAFZA and Dubai South remain off until service scope, advertiser role and dedicated landing pages are verified and approved |
| DDA RTA and Building Permit Support | Development, construction project management, architecture, facilities and infrastructure | Website | `https://emitronix.ae/dda-approvals` or `https://emitronix.ae/rta-approval` | Phase 2; send each authority-specific ad to its matching page |
| Drawing Preparation Submission and Follow-Up | Architecture, engineering, project management, renovation, facility operations and construction | Instant form | `LF-AP-HighIntent-v1`; context page `https://emitronix.ae/approval` | Phase 2; secure document-transfer process must be defined before requesting files |
| WhatsApp Authority Enquiries | Broad Dubai audience with the authority creative and project-detail questions doing the qualification | WhatsApp | Connected WhatsApp Business destination; `WA03` | Phase 2; only when a staffed response and CRM capture process are ready |
| Authority Retargeting | Combined eligible approval-page visitors, form openers, video viewers and Meta engagers | Website, instant form or WhatsApp as a phased test | `https://emitronix.ae/contact`, `LF-AP-HighIntent-v1` or `WA03` | Phase 3 conditional; remain off if the custom audience is ineligible or too small to deliver predictably |

## Retargeting plan - conditional

Retargeting is not a guaranteed launch component. Pixel and consent data must first create an eligible audience, and its expected reach must justify taking budget away from prospecting.

Build the following sources only after consent and event QA:

- Warehouse intent: visitors to `/warehouse-construction`, `/industrial-buildings` and relevant `/warehouse/*` routes in 30, 60 and 180-day windows.
- Authority intent: visitors to `/approval`, `/dubai-municipality-approval`, `/dcd-approvals`, `/trakhees-approvals`, `/dda-approvals` and `/rta-approval` in 30, 60 and 180-day windows.
- Lead friction: instant-form openers who did not submit, where Meta makes this audience available.
- Engaged prospects: Facebook and Instagram engagers and meaningful video viewers.
- Exclusions: submitted leads, qualified opportunities and current customers, subject to lawful first-party use.

At this budget, combine relevant sources into one warehouse retargeting audience and one authority retargeting audience. Do not split by recency, page, placement or engagement type until volume supports it. If using Advantage+ custom audience would expand beyond the source, use original audience options where available for a true retargeting test.

## Lookalike plan - conditional

Do not activate lookalikes merely because a source list exists. Use this gate:

1. CRM records are consented for advertising use, normalized, deduplicated and securely transferred.
2. The seed represents the desired outcome: qualified opportunities or won customers first; raw leads only after lead quality is demonstrated.
3. Meta reports the source as matched and eligible.
4. The seed is not dominated by one customer, project type or short campaign period.
5. Qualified-lead or downstream CRM feedback is stable enough to compare performance.

Start with a UAE lookalike of the best available quality seed and use it as an Advantage+ audience suggestion while retaining Dubai as the location control. The exact eligible size and delivery forecast are account-specific; no lead volume is forecast or guaranteed.

## Creative should do the qualification

Because job titles and interests are only imperfect signals, each ad should explicitly identify the business use case:

- Say warehouse, factory, industrial building, civil/MEP/fire-system works or authority approval support in the first frame or first line.
- Ask for project location, company, project type and drawing status before sales follow-up.
- Use industrial visuals and project documents, not residential imagery.
- Do not use government seals, authority logos or interface replicas that imply affiliation.
- Use actual rights-cleared project imagery only when provenance and claim permission are verified. Existing generated website artwork may be used as conceptual creative but must not be represented as a completed Emitronix project.
- Do not use claims such as number one, guaranteed approval, government-approved contractor, fastest approval, guaranteed completion date or lowest price.

The complete copy, five warehouse concepts, five authority concepts, three carousels, three videos, three WhatsApp variations and three form versions are in `meta-ad-copy.csv`.

## Lead forms and qualification

### Form 1 - short form

`LF-WH-Short-v1` is the first, lower-friction form:

- Full name
- Company name
- Mobile number
- Project location
- Type of project

It intentionally omits email, size, approval and timing. Sales or CRM automation should collect those fields after the first valid contact.

### Form 2 - high-intent warehouse and industrial form

`LF-WH-HighIntent-v1` includes:

- Full name, company, mobile and email
- Project location and type
- Approximate size
- Required authority approval
- Existing drawings: yes, no or partial
- Expected start date
- Short project description
- A review step before submission

### Form 3 - high-intent authority form

`LF-AP-HighIntent-v1` adds the current approval stage and authority-specific choices. All forms must link to `https://emitronix.ae/privacy-policy`, state that Emitronix may contact the prospect about the enquiry and avoid promising a quotation, permit or response deadline.

Use lead quality, not form count alone, for decisions. Suggested CRM outcomes are valid business enquiry, qualified project, sales accepted, proposal issued, won, lost, duplicate, job seeker, rental/sale enquiry and out of service scope.

## WhatsApp handling

- Connect only the verified business destination in Meta Business Manager.
- Use no more than six opening questions, beginning with project type and location.
- Set a clear greeting and explain that the details are used to route the enquiry.
- Do not request confidential drawings in the automated flow. Provide a secure sharing method after qualification.
- Run WhatsApp ads only when messages can be monitored and routed. No response-time promise is included in the ads.
- Capture campaign, ad set, ad, `fbclid`, UTM values, project type, location, authority and consent in CRM where technically available.

## Data and activation prerequisites

No ad set should be activated until all applicable items are verified:

- Meta Business Manager, ad account, Facebook Page, Instagram account and WhatsApp Business destination ownership.
- Approved daily budgets of AED 10 and AED 5 with no automated increase.
- Privacy policy and consent language reviewed for UAE operations and the actual lead flow.
- Meta Pixel and Conversions API configured with consent controls.
- Browser/server event deduplication using a shared event ID.
- `generate_lead` or the selected standard Lead event fires once after a successful website submission, not on button click or validation error.
- Instant-form and WhatsApp leads route to an approved CRM or secure lead inbox.
- CRM feedback for qualified outcomes is tested before selecting conversion-lead optimization.
- Test leads are received with campaign, ad set, ad, source, UTM values, timestamp and form answers.
- Sales owners and follow-up process are assigned.
- Creative rights, spelling, landing URL, privacy URL and authority disclaimers are approved.
- Every paid destination meets the status and consolidation decision in `landing-page-recommendations.md`, including its above-fold form or conversion path. JAFZA and Dubai South remain held rather than using the generic approval hub.
- Written approval is received before publishing.

## Phased testing sequence

1. **Readiness:** Validate consent, Pixel/CAPI, CRM routing, forms, WhatsApp and landing URLs. No spend.
2. **Initial lead test:** Run Warehouse Construction at AED 10/day and combined DM/DCD Approvals at AED 5/day. Use one static and one short video in each ad set.
3. **Creative rotation:** Compare one variable at a time. Add a carousel or replace a losing creative without increasing budget.
4. **Offer/ad-set rotation:** Pause the initial ad set before testing modification, industrial construction, drawing support, website conversion or WhatsApp. Do not stack all ad sets.
5. **Conditional audience expansion:** Add pooled retargeting only when eligible and useful. Add lookalikes only after the quality-data gate is met.

Judge tests using qualified-lead rate, qualified cost per lead, contactability, project fit, form completion, WhatsApp qualified-conversation rate, website conversion rate and CRM stage progression. Any cost or volume forecast is an estimate only; this plan makes no guaranteed lead forecast.

## Verified landing-page routing

| Need | Verified URL | Routing note |
|---|---|---|
| Warehouse construction | `https://emitronix.ae/warehouse-construction` | Primary warehouse context page |
| Warehouse modification | `https://emitronix.ae/warehouse/warehouse-expansion` | Consolidated paid destination; rebuild and approve before use |
| Warehouse expansion | `https://emitronix.ae/warehouse/warehouse-expansion` | Consolidated paid destination; rebuild and approve before use |
| Warehouse extension or renovation | `https://emitronix.ae/warehouse/warehouse-expansion` | Consolidated paid destination; sibling routes remain supporting content unless separately approved |
| Factory and industrial building | `https://emitronix.ae/industrial-buildings` | Primary industrial page |
| Warehouse civil, MEP and fire-system works | `https://emitronix.ae/warehouse/warehouse-mep` | Proposed consolidated paid destination; rebuild and approve before website traffic. Other topic routes remain supporting content. |
| Warehouse authority approvals | `https://emitronix.ae/warehouse/warehouse-authority-approvals` | Rebuild and approve before website traffic; may remain instant-form context while held |
| Authority approval hub | `https://emitronix.ae/approval` | Hub or supporting destination only; hold broad website-conversion traffic and do not substitute it for missing jurisdiction pages |
| Dubai Municipality | `https://emitronix.ae/dubai-municipality-approval` | Authority-specific page |
| Dubai Civil Defence | `https://emitronix.ae/dcd-approvals` | Authority-specific page |
| Trakhees | `https://emitronix.ae/trakhees-approvals` | Authority-specific page |
| DDA | `https://emitronix.ae/dda-approvals` | Authority-specific page |
| RTA | `https://emitronix.ae/rta-approval` | Authority-specific page |
| Project enquiry form | `https://emitronix.ae/contact` | Verified contact form route |
| Privacy | `https://emitronix.ae/privacy-policy` | Required in instant forms |

No dedicated JAFZA approval or Dubai South approval landing page was verified in the current routes. Those assets are held: do not use the authority hub as a substitute final URL. Confirm the exact service scope and Emitronix role, then approve a dedicated page before advertising either route. Other service pages may be valid context pages, but website-conversion ads require the page's paid-readiness work, the full path to contact submission and the conversion event to be tested before activation.

## Items requiring written approval

- The two campaigns, the phased ad-set order and every creative selected for upload.
- Daily budgets of AED 10 and AED 5 and any future change.
- Use of customer or lead data for custom audiences and lookalikes.
- Meta Pixel, Conversions API, CRM and WhatsApp data sharing.
- Lead-form questions, consent wording and privacy treatment.
- Final landing pages and any future JAFZA or Dubai South page.
- Special Ad Category classification at campaign build time.
- Publication and activation. This plan stops before both.
