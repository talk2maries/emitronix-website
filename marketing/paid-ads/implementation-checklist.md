# Paid Ads Implementation Checklist

Plan date: 4 August 2026
Status: Draft only — stop before publishing, billing, or activation

## Live account progress — 4 August 2026

- [x] Meta draft campaign **Warehouse Construction Leads** saved Off and unpublished at AED 10/day.
- [x] Meta draft campaign **Authority Approval Leads** saved Off and unpublished at AED 5/day.
- [x] Meta draft forms **LF-WH-HighIntent-v1** and **LF-AP-HighIntent-v1** saved.
- [x] Zoho LeadChain draft named **LF-WH-HighIntent-v1 to Zoho Leads**; it remains unpublished.
- [x] Existing unrelated Google Smart campaign draft at AED 138.70/day left unchanged and unpublished.
- [x] No campaign, ad, lead form, or CRM chain published or activated; no spend initiated.
- [ ] Account owner completes Meta authentication required by error `#3858385`.
- [ ] Account owner reviews and accepts Meta Lead Ads Terms required by error `#1815089`.
- [ ] Account owner completes the Meta password re-authentication currently blocking Zoho LeadChain authorization.
- [ ] Account owner disables or allow-lists the ad blocker for `ads.google.com` and reloads Google Ads.
- [ ] Create the planned Warehouse Construction, Authority Approvals, and Brand Protection Google Search drafts only after Google Ads becomes accessible.
- [ ] Recheck both ad accounts and Zoho after the owner-only steps; obtain separate written approval before publishing or activation.

## Non-negotiable stop conditions

Do not enable any campaign until all are true:

- [ ] Legal business name is confirmed. The user brief says Emitronix Building Contracting LLC; the repository's verified source says Emitronix Contracting LLC.
- [ ] Landing-page ownership and final URLs are approved.
- [ ] The broken GTM form conversion is replaced and production QA passes.
- [ ] Google Ads conversion action, GA4 property, Meta dataset/pixel, CAPI, and Zoho field ownership are confirmed.
- [ ] Privacy/legal approval covers enhanced conversions, Pixel/CAPI, instant forms, click IDs, and CRM feedback.
- [ ] Sales owner, response SLA, and lead qualification definition are approved.
- [ ] Final ads, creative, phone number, WhatsApp destination, and authority wording are approved.
- [ ] AED 50/day split and platform pacing behavior are accepted in writing.
- [ ] The user—not Codex—has approved billing/payment setup.

## 1. Back up and preserve current state

- [ ] Work only on branch codex/paid-ads-audit or a later dedicated implementation branch.
- [ ] Export the current Google Ads account from Google Ads Editor before importing drafts.
- [ ] Export current Meta campaigns or record screenshots/settings before creating new drafts.
- [ ] Create a new GTM workspace and note the currently published version.
- [ ] Export or document current GA4 events/conversions.
- [ ] Export Zoho field metadata and workflow configuration.
- [ ] Never delete existing tags, campaigns, audiences, CRM fields, or environment variables.

## 2. Website and tracking prerequisites

- [ ] Choose the canonical paid landing pages from landing-page-recommendations.md.
- [ ] Implement the approved short paid form and optional high-intent form.
- [ ] Make Company required for the B2B paid form unless management approves otherwise.
- [ ] Add project type, approximate size, required authority, drawings available, and expected start date.
- [ ] Make /contact?intent=site-visit preselect the correct intent.
- [ ] Add UTM/click-ID capture and first-/last-touch persistence.
- [ ] Return a non-PII lead_id and event_id after successful Zoho upsert.
- [ ] Push generate_lead only after server-confirmed success.
- [ ] Add phone_click, whatsapp_click, email_click, quotation_request, and site_inspection_request.
- [ ] Create /thank-you only if approved; mark it noindex and secondary for measurement.
- [ ] Keep secrets server-side and use environment variables.
- [ ] Run consent combinations and duplicate tests in conversion-tracking-plan.md.

## 3. Google Ads account preparation

- [ ] Confirm account currency is AED and timezone is Asia/Dubai before campaign creation; these settings are difficult or impossible to change later.
- [ ] Enable auto-tagging.
- [ ] Link the correct GA4 property only after ownership is verified.
- [ ] Link the verified Google Business Profile for location assets if the user approves access.
- [ ] Create conversion actions:
  - [ ] generate_lead — primary after QA, count One.
  - [ ] qualified_lead — offline primary after import QA.
  - [ ] phone_click, whatsapp_click, email_click — secondary.
  - [ ] quotation_request and site_inspection_request — secondary initially.
- [ ] Add Conversion Linker and enhanced-conversion configuration in the GTM draft.
- [ ] Add account-level final URL suffix and campaign/ad-group custom parameters.
- [ ] Create shared negative lists for jobs/careers, rental/property, education/research, DIY/free, and irrelevant materials/equipment.

## 4. Exact Google Ads upload procedure

The supplied CSVs are clean campaign-planning files. Google Ads Editor expects one entity per row and may require column mapping or a native exported template. Keep everything paused during import.

### Prepare the import

1. Install/open the latest Google Ads Editor and add the correct account.
2. Get recent changes for the whole account.
3. Export a full backup.
4. Confirm there are no unreviewed proposed changes.
5. Open each supplied CSV in a UTF-8-aware spreadsheet editor and preserve quoted cells.
6. Add or confirm Status=Paused for every new campaign, ad group, ad, and keyword before any upload.
7. If Editor does not recognize a custom header, export one sample entity of that type and transpose the supplied fields into the native headers.

Google's documented flow is Account > Import > From file, map headers, Import, review errors/warnings, and then keep or reject proposed changes: [Google Ads Editor CSV import](https://support.google.com/google-ads/editor/answer/30564) and [CSV preparation](https://support.google.com/google-ads/editor/answer/56368).

### Import order

1. Import google-ads-campaign-structure.csv.
   - Map Campaign, Campaign Type, Budget, Bid Strategy, Networks, Language, and Status.
   - Create ad groups under the exact matching campaign names.
2. Import the approved keyword subset from keyword-research.csv.
   - Map Campaign, Ad Group, Keyword, Match Type, Final URL, and Status.
   - Import exact and phrase rows first.
   - Leave broad rows paused; do not activate until the stated evidence gate.
3. Import google-search-ads.csv.
   - Map 15 headline and four description fields, Final URL, Path 1, Path 2, Campaign, Ad Group, and Status.
   - Verify every headline is 30 characters or fewer and every description is 90 or fewer.
4. Import google-negative-keywords.csv.
   - Account-level lists may need to be created and associated separately.
   - Import campaign and ad-group negatives in separate passes because Editor handles their levels separately.
5. Import google-assets-and-extensions.csv.
   - Map sitelinks, callouts, structured snippets, call asset, location recommendation, and lead-form recommendation.
   - Verify landing pages and phone schedule.

Google notes that exact, phrase, and broad match overlap and recommends beginning with the most controlled terms: [Google Ads keyword matching](https://support.google.com/google-ads/answer/14996023).

### Apply campaign settings

- [ ] Campaign: Warehouse Construction Dubai — AED 20/day.
- [ ] Campaign: Authority Approvals Dubai — AED 10/day.
- [ ] Campaign: Brand Protection — AED 5/day.
- [ ] Search Network on; Display expansion off at launch.
- [ ] Google Search Partners off initially; test later only with segmented lead quality.
- [ ] Location option: Presence — people in or regularly in targeted locations.
- [ ] Include Dubai and the approved industrial zones that Google can target accurately.
- [ ] Exclude locations outside the service area; review User location reports.
- [ ] Language: start with the language(s) of the approved ads and pages. Do not activate Arabic ads without reviewed Arabic copy.
- [ ] Schedule: prioritize Monday–Saturday, 8:00 AM–6:00 PM UAE time.
- [ ] Call asset: same staffed hours only.
- [ ] Device: no speculative adjustment at launch; review valid lead quality first.
- [ ] Final URL suffix resolves correctly and contains no PII.
- [ ] Brand campaign contains only Emitronix terms and spelling variants at first.
- [ ] Competitor keywords remain paused pending legal/commercial approval; competitor trademarks never appear in copy.

Google documents the presence-only location option here: [prevent clicks outside targeted locations](https://support.google.com/google-ads/answer/9376662).

### Review without posting

1. In Editor, select Review imported changes.
2. Resolve every red error and investigate warnings.
3. Run Editor custom rules/account checks.
4. Confirm all new entities are paused.
5. Click Keep proposed changes only to retain the local draft.
6. Do not click Post until written approval.

### Post after written approval only

1. Re-download recent changes.
2. Re-run URL, policy, budget, geo, schedule, conversion, and negative checks.
3. Post paused entities.
4. Confirm account-side settings in Google Ads.
5. Enable only the approved initial ad groups and ads.
6. Record activation timestamp and screenshots.

## 5. Meta account preparation

- [ ] Confirm the correct Business Portfolio, Facebook Page, Instagram account, ad account, and WhatsApp number.
- [ ] Verify Page/Instagram identity and two-factor access.
- [ ] Confirm AED currency and Asia/Dubai timezone.
- [ ] Create/verify one website dataset/pixel.
- [ ] Configure Pixel and CAPI only after consent/privacy approval.
- [ ] Connect Meta lead retrieval to Zoho or an approved secure bridge.
- [ ] Configure CRM quality feedback separately from lead retrieval.
- [ ] Verify the domain if the account workflow requires it.
- [ ] Build website visitor audiences only after valid consented events exist.
- [ ] Keep customer-list and lookalike audiences paused until a lawful, sufficient, quality seed is approved.

## 6. Exact Meta Ads Manager setup procedure

The supplied meta CSVs are build sheets, not a promise that a custom CSV can be imported directly into every Meta account. Ads Manager interfaces and bulk-upload availability vary. Build manually from the files, or export a native Meta template from the account and map the supplied columns into it.

### Campaign 1 — Warehouse Construction Leads

1. In Ads Manager select Create.
2. Choose Leads objective.
3. Name the campaign exactly as in meta-campaign-structure.csv.
4. Keep buying type Auction and declare no Special Ad Category unless Meta/account counsel requires one.
5. Use AED 10/day.
6. Keep campaign/ad set off while building.
7. Start with one consolidated active prospecting ad set; keep the other planned construction/modification/factory/MEP cells as paused tests.
8. Use approved Dubai/industrial location controls and audience suggestions from meta-audience-plan.md.
9. Use Advantage+ placements unless a reviewed placement exclusion is required.
10. Load approved creative and copy from meta-ad-copy.csv.
11. Add the Meta URL parameter template.

### Campaign 2 — Authority Approval Leads

1. Create another Leads campaign.
2. Use AED 5/day.
3. Begin with one consolidated authority ad set to avoid fragmenting the small budget.
4. Rotate DM, DCD, Trakhees/JAFZA/Dubai South, and drawing/submission concepts as ads or phased ad sets.
5. Use approved authority landing pages or the approved instant form.
6. Keep all items off during review.

### Conversion location options

- Website: use only after Pixel/CAPI Lead deduplication passes.
- Instant Form: use the short form for volume testing and the higher-intent form for quality testing.
- WhatsApp: use the verified business number and approved welcome/questions; do not imply 24/7 response.
- Retargeting: keep paused until the website audience can deliver without excessive frequency.

Meta lists Instant Form and Website as separate lead conversion locations and recommends CRM connection for faster follow-up: [Meta lead ads with forms](https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-forms).

### Build the instant forms

1. Select the correct Page identity.
2. Choose the Higher intent form type when available for the qualified version.
3. Add the approved intro and purpose.
4. Short form fields: full name, company, mobile, email, project location, project type.
5. High-intent additions: size, authority, drawings, start date, description.
6. Add the live Emitronix privacy-policy URL.
7. Add consent/disclosure text approved by management/legal.
8. Completion screen: Request a quotation / speak with the engineering team; do not promise response time unless approved.
9. Test with Meta's lead testing tool and verify one Zoho record/task.

### Meta review without activation

- [ ] Campaign, ad sets, and ads are Off.
- [ ] Budgets total AED 15/day.
- [ ] Location controls are correct.
- [ ] Copy contains no guarantee, ranking, unsupported credential, or competitor trademark.
- [ ] Forms and destinations match the ad promise.
- [ ] Pixel browser Lead and CAPI server Lead deduplicate.
- [ ] URL parameters resolve.
- [ ] Mobile previews pass for Facebook and Instagram placements.
- [ ] Lead notifications and Zoho assignment work.
- [ ] Page, Instagram, and WhatsApp identities are correct.

### Publish after written approval only

1. Publish with toggles Off if the interface allows.
2. Recheck review status and any policy edits made by the platform.
3. After a second written activation approval, turn on only the approved campaigns/ad sets/ads.
4. Record activation time and screenshots.
5. Do not raise budgets automatically.

## 7. Launch-day verification

- [ ] Open each final URL with live tracking parameters.
- [ ] Submit clearly labeled test leads only; remove or tag them in CRM.
- [ ] Confirm one GA4 generate_lead, one Google Ads test conversion diagnostic, one deduplicated Meta Lead, and one Zoho record.
- [ ] Check mobile phone and WhatsApp links without sending a real message.
- [ ] Confirm call assets are scheduled only when staff answer.
- [ ] Confirm no campaign exceeds the approved average daily budget.
- [ ] Confirm jobs/rentals/property/material negatives are active.
- [ ] Confirm search terms and lead inbox at least twice on Day 1.

## 8. 30-day operating checklist

### Daily, Days 1–7

- [ ] Spend, disapprovals, landing-page availability
- [ ] Search terms and negative additions
- [ ] Lead receipt, duplicates, spam, source mapping
- [ ] Sales response time
- [ ] Conversion discrepancies

### Twice weekly, Days 8–30

- [ ] Campaign/ad-group/ad-set spend
- [ ] CTR, CPC, conversion rate, raw CPL
- [ ] Qualified-lead rate and qualified CPL
- [ ] Location, device, hour, placement quality
- [ ] Creative fatigue/frequency on Meta
- [ ] Lost impression share and budget limitations on Google

### Day 30 report

- [ ] Daily/monthly clicks versus estimated range
- [ ] Valid and qualified leads
- [ ] Raw and qualified CPL
- [ ] CTR and conversion rate
- [ ] Budget utilization
- [ ] Pipeline value and ROAS only where verified
- [ ] Tracking and CRM reconciliation
- [ ] Hold/reallocate/reduce/increase recommendation
- [ ] Written approval before any increase

## Final approval record

| Approval | Owner | Status | Date / notes |
|---|---|---|---|
| Legal business name | Management | Pending | |
| Landing pages and forms | Management / engineering | Pending | |
| Tracking, consent, and data sharing | Management / legal | Pending | |
| Zoho schema and lead SLA | Sales / CRM admin | Pending | |
| Google keywords, ads, negatives, assets | Management | Pending | |
| Meta audiences, copy, creative, forms | Management | Pending | |
| AED 50/day budget and platform split | Management | Pending | |
| Billing/payment method | Account owner | Pending | Codex will not connect it |
| Publish paused drafts | Account owner | Pending | |
| Activate campaigns | Account owner | Pending | Separate written approval required |
