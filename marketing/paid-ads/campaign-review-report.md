# Paid Ads Campaign Review

**Review date:** 4 August 2026 (Asia/Dubai)
**Branch:** `codex/paid-ads-audit`
**Status:** Draft package only — no campaign, billing, tag, CRM, or website change has been published or activated

## Executive Summary

- **The campaign package is ready for stakeholder and account-side review, but not activation.** The Google and Meta structures, copy, keyword master, negatives, assets, audiences, budget, tracking design, CRM mapping, and upload checklist are complete. The primary launch blocker is unreliable lead measurement.
- **Start at AED 50/day and concentrate delivery.** Allocate AED 35/day to Google Search and AED 15/day to Meta. At this budget, run only the highest-intent Google ad groups and one consolidated prospecting ad set per Meta campaign; keep the broader test matrix paused.
- **The 30-day planning forecast is 117–293 clicks and 3–10 valid leads.** Expected utilization is AED 1,380–1,500, with an indicative blended raw CPL of AED 150–500. These are estimated projections based on stated CPC and conversion-rate assumptions, not guaranteed results.
- **Written approval is required before any account publication or activation.** The legal advertiser name, JAFZA/Dubai South service scope, final landing pages, tracking/CRM changes, ad creative, lead qualification rules, and account identities remain approval gates.

## Live account progress — 4 August 2026

No campaign, ad, lead form, or CRM chain was published or activated, and no advertising spend was initiated.

- **Meta Ads:** Two paused, unpublished campaign drafts exist: **Warehouse Construction Leads** at AED 10/day and **Authority Approval Leads** at AED 5/day. Draft forms **LF-WH-HighIntent-v1** and **LF-AP-HighIntent-v1** are saved. Publication remains blocked by Lead Ads Terms error `#1815089` and account authentication error `#3858385`.
- **Zoho CRM:** The LeadChain draft **LF-WH-HighIntent-v1 to Zoho Leads** is named, but Meta authorization stopped at password re-authentication. The chain has not been published.
- **Google Ads:** The account remains blocked by the browser's ad-blocker message. An existing, unrelated Smart campaign draft at AED 138.70/day was not altered or published. The planned Warehouse Construction, Authority Approvals, and Brand Protection Google Search drafts have not yet been created.

Owner-only actions required before account work can continue:

1. Complete Meta account authentication for error `#3858385`.
2. Review and accept the Meta Lead Ads Terms for error `#1815089`.
3. Complete the Meta password re-authentication requested by Zoho LeadChain.
4. Disable or allow-list the ad blocker for `ads.google.com`, then reload Google Ads.
5. Review the resulting account state before any further build work. Publishing and activation still require separate written approval.

## Recommended campaign plan

Google Search receives 70% of the budget because it can capture explicit contractor, construction, permit, and approval intent. Meta receives 30% for qualified lead forms, controlled creative testing, WhatsApp tests, and later remarketing.

| Platform | Campaign | Daily | 30-day | Initial operating recommendation |
|---|---|---:|---:|---|
| Google | Warehouse Construction Dubai | AED 20 | AED 600 | Begin with two to four exact/phrase ad groups; phase the remaining themes |
| Google | Authority Approvals Dubai | AED 10 | AED 300 | Begin with confirmed, jurisdiction-matched DM/DCD/Trakhees intent; hold unverified routes |
| Google | Brand Protection | AED 5 | AED 150 cap | Emitronix exact and spelling variants; allow underdelivery rather than forcing traffic |
| Meta | Warehouse Construction Leads | AED 10 | AED 300 | One consolidated prospecting ad set; rotate warehouse/modification/industrial/MEP concepts |
| Meta | Authority Approval Leads | AED 5 | AED 150 | One consolidated authority ad set; test one conversion location at a time |
| **Total** |  | **AED 50** | **AED 1,500** | No automatic increase or reallocation |

All supplied campaign, ad-group, keyword, ad, and Meta rows are drafts. Broad-match pilots, retargeting, lookalikes, contractor-comparison intent, JAFZA, and Dubai South remain conditional or held as documented in the source files.

## Highest-value commercial keyword themes

These terms are prioritized by intent and expected B2B fit, not by measured search volume. Exact CPC, competition, and volume require access to the intended Google Ads account and Keyword Planner before launch.

| Priority theme | Representative commercial terms | Recommended route |
|---|---|---|
| Core warehouse build | warehouse construction Dubai; warehouse construction contractor Dubai; warehouse construction quotation Dubai | `/warehouse-construction` |
| Contractor selection | warehouse contractor Dubai; warehouse construction company Dubai; industrial warehouse contractor Dubai | `/warehouse-construction` |
| Modification and expansion | warehouse modification Dubai; warehouse expansion Dubai; warehouse modification quotation | `/warehouse/warehouse-expansion` after rebuild |
| Industrial and factory | industrial building contractor Dubai; factory construction company Dubai; factory modification contractor | `/industrial-buildings` |
| Civil, MEP, fit-out | warehouse civil works contractor Dubai; warehouse MEP contractor Dubai; warehouse fit-out contractor Dubai | `/warehouse/warehouse-mep` after rebuild |
| Warehouse approvals | warehouse authority approval Dubai; warehouse modification approval; warehouse building permit Dubai | `/warehouse/warehouse-authority-approvals` after rebuild |
| Dubai Municipality | Dubai Municipality approval service; DM building permit approval; DM drawing approval | `/dubai-municipality-approval` |
| Dubai Civil Defence | DCD approval service Dubai; Civil Defence drawing approval Dubai; DCD warehouse approval | `/dcd-approvals` |
| Trakhees | Trakhees approval service; Trakhees warehouse approval; Trakhees modification permit | `/trakhees-approvals` |
| Other authorities | DDA approval service Dubai; RTA approval service Dubai; building permit approval Dubai | Matching DDA, RTA, or DM page |
| Held scope | JAFZA approval service; Dubai South approval service | No activation until scope and landing message are verified |
| Brand | Emitronix; Emitronix Contracting; spelling variants | `/contact` |

The complete 350-row classification, including exact, phrase, and six controlled broad-match candidates, is in [keyword-research.csv](keyword-research.csv).

## The site has strong coverage but is not yet ready for paid traffic

The live crawl found 237 sitemap URLs: 199 English and 38 Arabic. All 199 English sitemap URLs returned HTTP 200, each had a title, meta description, canonical, and exactly one H1. Core warehouse, industrial, and authority pages contain substantial relevant content, and important pages expose phone and WhatsApp actions.

The same site has a fragmented conversion path:

- 50 warehouse topic pages share a heavily templated structure and none has an embedded form.
- `/warehouse-construction` has strong message match and a form, but the form sits within an approximately 5,678-word page with 142 main-content H2s and many exit links.
- `/warehouse/warehouse-expansion`, `/warehouse/warehouse-mep`, and `/warehouse/warehouse-authority-approvals` need a focused commercial opening, an embedded form, and unique content before paid use.
- `/jafza-approval`, `/dubai-south-approval`, `/warehouse-modification-dubai`, and `/thank-you` returned 404 in live browser checks.
- `/contact?intent=site-visit` does not preselect or preserve the requested intent.
- Mobile QA at 390 px found no horizontal overflow or tested CTA overlap; the main issue is measurement and conversion-path clarity, not basic responsive layout.

The landing strategy is consolidation-first: improve a small number of distinct commercial destinations instead of creating more near-duplicate pages. See [website-audit.md](website-audit.md) and [landing-page-recommendations.md](landing-page-recommendations.md).

## Measurement must be repaired before activation

The live site loads GTM container `GTM-MSM8MPD6`, and the published container exposes GA4 measurement ID `G-43MXN4GKR2`. Its current GA4 `form_submit` tag depends on visibility of `div.bg-blue-50`; that selector was absent from the live contact page and current source, so the conversion cannot be treated as reliable.

Other launch-critical gaps are:

- no Google Ads `AW-` conversion destination found in the published GTM container;
- no explicit `generate_lead`, `phone_click`, `whatsapp_click`, `email_click`, `quotation_request`, or `site_inspection_request` implementation;
- no active Meta Pixel found in live HTML and no server-side Conversions API implementation;
- no stable thank-you route;
- no structured UTM, campaign, ad, keyword, GCLID, GBRAID/WBRAID, or FBCLID capture in the form-to-Zoho path;
- no tested browser/server event-ID deduplication.

The recommended design fires one `generate_lead` only after the server confirms a successful Zoho upsert, uses the same event ID for Meta browser/server deduplication, keeps click actions secondary initially, and returns qualified outcomes from CRM. Full event, consent, QA, and release requirements are in [conversion-tracking-plan.md](conversion-tracking-plan.md).

## Zoho can receive leads, but paid attribution is incomplete

The existing website integration already creates Zoho Leads server-side. It maps basic contact, service, location, message, page, and consent data. It does not yet persist the media fields needed to evaluate or optimize paid campaigns, and its in-memory ten-minute duplicate suppression is not a durable person-level deduplication strategy.

The proposed schema adds campaign/ad-group or ad-set identifiers, keyword, deferred search-term enrichment, ad/creative, landing page, UTMs, click IDs, project qualifiers, event ID, first/last touch, and qualification status. It also defines email/mobile normalization, idempotent upsert behavior, task creation, and qualified-lead feedback. See [zoho-crm-lead-mapping.md](zoho-crm-lead-mapping.md).

## Thirty-day estimated forecast

| Measure | Estimated planning range |
|---|---:|
| Daily clicks | 3.9–9.8 |
| Monthly clicks | 117–293 |
| Valid leads per month | 3–10 |
| Sales-qualified leads per month | 1–6 |
| Google warehouse CPC | AED 15–30 |
| Google authority CPC | AED 8–18 |
| Google brand CPC | AED 2–6, volume limited |
| Meta CPC | AED 2.5–6 |
| Blended raw CPL | AED 150–500 |
| Budget utilization | AED 1,380–1,500, or 92%–100% |

Assumptions include exact/phrase search control, relevant query matching, functional landing pages, 4%–10% lead conversion for non-brand Google campaigns, 8%–15% for volume-limited brand traffic, 1.5%–4% Meta click-to-lead conversion, consented and deduplicated tracking, staffed follow-up, and no major policy or delivery constraint. Auction conditions, seasonality, form friction, creative quality, and brand volume can materially change results. ROAS is not decision-ready until CRM pipeline/revenue values and attribution are verified.

After 30 days, report spend, utilization, impressions, clicks, CTR, CPC, conversion rate, valid and qualified leads, raw and qualified CPL, search/placement quality, pipeline value, and ROAS where measurable. Recommend hold, reallocation, reduction, or a controlled increase; do not change the budget automatically. The detailed model and stop-loss rules are in [budget-plan.md](budget-plan.md).

## Files created

1. [website-audit.md](website-audit.md)
2. [keyword-research.csv](keyword-research.csv)
3. [google-ads-campaign-structure.csv](google-ads-campaign-structure.csv)
4. [google-search-ads.csv](google-search-ads.csv)
5. [google-negative-keywords.csv](google-negative-keywords.csv)
6. [google-assets-and-extensions.csv](google-assets-and-extensions.csv)
7. [meta-campaign-structure.csv](meta-campaign-structure.csv)
8. [meta-ad-copy.csv](meta-ad-copy.csv)
9. [meta-audience-plan.md](meta-audience-plan.md)
10. [landing-page-recommendations.md](landing-page-recommendations.md)
11. [conversion-tracking-plan.md](conversion-tracking-plan.md)
12. [zoho-crm-lead-mapping.md](zoho-crm-lead-mapping.md)
13. [budget-plan.md](budget-plan.md)
14. [implementation-checklist.md](implementation-checklist.md)
15. [campaign-review-report.md](campaign-review-report.md)

No website source file was modified. All 15 deliverables are new files on the separate branch. No pre-existing file was overwritten, so there was no affected original to back up.

## Validation results

| Check | Result |
|---|---|
| Live crawl and browser review | Passed for the audited paths; documented 404 and conversion gaps remain intentional findings |
| CSV parsing and row-width checks | Passed for all seven CSV files |
| Google RSA limits | Passed: 19 ad groups, each with 15 unique headlines at 30 characters or fewer and four unique descriptions at 90 characters or fewer |
| Google keyword/negative/assets coverage | Passed: exact and phrase coverage for every ad group; six held broad rows; account, campaign, and ad-group negatives; required asset types present |
| Meta quantity requirements | Passed: 12 primary texts, 12 headlines, six descriptions, five warehouse concepts, five authority concepts, and three each of carousels, videos, WhatsApp variations, and forms |
| Draft/activation safety | Passed: entities are marked paused/draft and the plans prohibit automatic activation or budget increases |
| `npm run lint` | Passed with no warnings or errors; Next.js printed its existing deprecation notice for `next lint` |
| `npm run type-check` | Passed |
| `npm run build` | Passed; 272 static pages generated in the production build |
| `npm run test:consent` | Passed: 10 of 10 tests |
| `npm run validate:seo` | Passed against the local production server: 237 HTML pages and 598 public image URLs checked |
| `npm run validate:contact` | Passed against 237 sitemap pages |

No live lead form was submitted because that would create external CRM state. Account-side GTM Preview, GA4 DebugView, Google Ads diagnostics, Meta Events Manager/Test Events, and a controlled Zoho test lead remain pre-launch acceptance tests.

## Exact account upload sequence

### Google Ads

1. Confirm the intended Google Ads account, AED currency, Asia/Dubai timezone, account ownership, billing boundary, and advertiser identity. Do not add or alter payment methods.
2. Export a complete Google Ads Editor backup and get recent account changes.
3. Complete and test the approved landing-page, GTM, Google Ads conversion, consent, attribution, and Zoho prerequisites.
4. In Google Ads Editor choose **Account > Import > From file** and import/map in this order: campaign structure, approved exact/phrase keywords, RSAs, negatives by level, then assets.
5. If a custom planning header is not recognized, export one native entity from the account and map the supplied value into that native column. Do not discard draft/hold notes.
6. Keep every imported campaign, ad group, keyword, ad, and asset paused. Review every error, warning, URL, budget, geo, schedule, match type, negative conflict, asset association, and conversion role.
7. Retain the work as local proposed changes only. Do not **Post** until written publication approval.
8. After approval, re-download recent changes, post the entities while paused, check account-side policy/settings, and request a second written approval before enabling only the agreed initial subset.

### Meta Ads Manager

1. Confirm the correct Business Portfolio, Page, Instagram profile, ad account, dataset/pixel, WhatsApp number, AED currency, timezone, and permissions. Do not change billing.
2. Complete Pixel/CAPI consent and deduplication QA, Meta lead retrieval, Zoho mapping, domain/identity checks, privacy wording, and approved image/video assets.
3. Create two **Leads** campaigns with toggles Off: Warehouse Construction Leads at AED 10/day and Authority Approval Leads at AED 5/day.
4. Start with one consolidated prospecting ad set inside each campaign. Treat the remaining rows as a phased backlog, not simultaneous AED 15/day delivery.
5. Build manually from the Meta planning CSVs or export the current account's native bulk template and transpose the supplied fields. Load only the approved copy, destinations, URL parameters, forms, and WhatsApp scripts.
6. Preview all eligible Facebook and Instagram placements; verify location controls, exclusions, identities, form privacy/consent, lead notifications, CRM assignment, and one-event deduplication.
7. After written publication approval, publish with toggles Off where the interface allows. Request separate written activation approval before enabling the two agreed ad sets.

The field-level mapping and launch-day checklist are in [implementation-checklist.md](implementation-checklist.md).

## Decisions and approvals still required

1. Confirm whether the legal advertiser is **Emitronix Contracting LLC** (verified source/live site) or **Emitronix Building Contracting LLC** (supplied brief).
2. Confirm the exact service, appointment, submission, and claim boundaries for JAFZA and Dubai South; keep those ad groups off until confirmed.
3. Approve the canonical landing-page map, form changes, thank-you behavior, and consolidation plan before website implementation.
4. Approve GTM/GA4/Google Ads/Meta/Zoho implementation, customer-data use, enhanced conversions, CAPI, offline feedback, retention, and privacy wording.
5. Provide or approve account IDs, Page/Instagram/WhatsApp identities, Google Business Profile location, creative assets, and any verifiable trust evidence.
6. Define a qualified lead, sales owner, response-time SLA, follow-up workflow, pipeline stages, and ROAS value rule.
7. Approve the AED 50/day allocation and acknowledge average-daily platform pacing behavior.
8. Approve final keywords, negatives, copy, creative, forms, destinations, and the exact initial active subset.
9. Give separate written approval to publish paused drafts and later to activate spend. Neither approval has been given yet.

## Caveats and open questions

- Forecasts are estimated projections, not guaranteed results, and are not based on historical Emitronix ad-account data.
- Search volume, impression share, auction competition, and account-specific CPC require Keyword Planner and live-account access.
- ROAS cannot be calculated responsibly until Zoho captures verified pipeline or revenue values and the business approves attribution/value rules.
- Verified project images, customer names, reviews, licences, authority eligibility, project counts, and years of experience were not supplied and must not be invented.
- A controlled test lead will create external CRM state and therefore requires approval before it is submitted.
