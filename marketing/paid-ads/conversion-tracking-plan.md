# Conversion Tracking Plan

Audit date: 4 August 2026
Status: Draft for approval — no tags, pixels, campaigns, or billing were changed

## Executive finding

Do not activate paid media until the primary lead event is repaired and tested.

The live site loads Google Tag Manager container GTM-MSM8MPD6. The published container exposes GA4 measurement ID G-43MXN4GKR2 and a GA4 event named form_submit. That event currently depends on an element-visibility trigger for the CSS selector div.bg-blue-50. The selector is absent from both the live contact page and the current repository, so a successful enquiry cannot reliably satisfy the trigger.

The published GTM container contains no Google Ads conversion ID, and no phone_click, whatsapp_click, email_click, quotation_request, or site_inspection_request implementation was found. The live HTML does not load Meta Pixel, the public Meta Pixel environment placeholder is empty, and no server-side Meta Conversions API implementation was found.

## Verified current state

| Area | Evidence reviewed | Status | Risk / interpretation |
|---|---|---:|---|
| Google Tag Manager | Live HTML and published public container | Present | Container ID is hard-coded through the validated public environment setting |
| GA4 | Published GTM container | Present | Google tag uses G-43MXN4GKR2 |
| GA4 form event | Published GTM container | Broken / unverified | form_submit waits for div.bg-blue-50; selector count is zero on the live contact page and in current source |
| Google Ads conversion tag | Published GTM container | Missing | No AW- conversion destination was found |
| Meta Pixel | Live HTML and source configuration | Not active | No Pixel loader on the live page; NEXT_PUBLIC_META_PIXEL_ID is empty in the example configuration |
| Meta Conversions API | Server routes and libraries | Missing | No server event endpoint or access-token integration was found |
| Consent Mode | app/layout.tsx and CookieConsentManager | Present | Default is denied for ad and analytics storage; consent updates are implemented |
| Cookie banner | Live site and source | Present | Analytics and marketing integrations are consent-gated |
| Contact-form success | ContactForm and BlogEnquiryPopup | Present | Success is rendered in-page after the API responds; there is no explicit dataLayer event |
| Thank-you page | Live request and source routes | Missing | /thank-you returns 404 |
| Call, email, WhatsApp click events | Source and published GTM container | Missing | These conversion points are visible but not named or measured as requested |
| UTM / click-ID persistence | Contact form, API route, Zoho library | Missing | pageUrl is captured, but attribution fields are not parsed or mapped |
| Zoho CRM sync | API route and lib/zoho.ts | Present | Server-side lead creation exists, but paid-media fields and durable deduplication are incomplete |

The live-container inspection is a point-in-time public audit. GTM account access, GA4 DebugView, Google Ads diagnostics, and Meta Events Manager access are still required to validate account-side settings.

## Measurement architecture

Use one canonical browser event contract and one unique event_id per user action.

1. The client records a valid action.
2. For a form, the server validates the submission and returns a non-PII lead_id plus event_id only after Zoho accepts or upserts the lead.
3. The client pushes one structured dataLayer event after the successful response.
4. GTM sends allowed analytics/ads tags according to consent.
5. The server sends the same Meta event with the same event_id when Conversions API is approved.
6. Google receives eligible qualified-lead and converted-lead updates from Zoho; Meta quality feedback remains disabled until its stricter volume and freshness requirements are met.

Never place names, email addresses, phone numbers, drawings, or free-text project descriptions in the dataLayer, GA4 event parameters, page URLs, or browser logs.

## Event specification

| Event | Trigger | GA4 | Google Ads | Meta | Bidding role |
|---|---|---|---|---|---|
| generate_lead | API-confirmed successful enquiry | Recommended event | Primary website lead conversion | Lead | Primary only after QA |
| form_submit | Same successful enquiry, diagnostic alias | Custom event | Do not import as another primary conversion | Optional custom event; normally omit | Secondary / diagnostic |
| quotation_request | Successful form where request_type=quotation | Custom event | Secondary | Lead parameter or custom conversion | Secondary until volume supports its own goal |
| site_inspection_request | Successful form where request_type=site_inspection | Custom event | Secondary | Lead parameter or custom conversion | Secondary until volume supports its own goal |
| whatsapp_click | User clicks a wa.me link | Custom event | Secondary action | Contact custom conversion if approved | Micro-conversion only |
| phone_click | User clicks a tel: link | Custom event | Secondary action; calls from ads remain a separate conversion | Contact custom conversion if approved | Micro-conversion only |
| email_click | User clicks a mailto: link | Custom event | Secondary action | Optional custom conversion | Micro-conversion only |
| qualified_lead | Sales marks the lead qualified in Zoho | Offline event | Secondary initially; potential primary only after stable daily imports and sufficient volume | Do not send to Meta at projected volume | Preferred long-term Google bidding signal when eligible |
| converted_lead | Deal reaches Closed Won or another approved final commercial milestone | Offline event | Secondary initially; value-based only when revenue rules and sufficient volume are approved | Do not send to Meta at projected volume | Google ROAS / value optimisation later |
| thank_you_view | Confirmation page loads after a valid success token | Page event | Secondary only | Optional | QA and funnel observation |

Only one lead event should enter the primary Conversions column for a single submission. Do not count generate_lead, form_submit, and the thank-you page as three primary conversions. Google distinguishes primary bidding actions from secondary observation actions; configure them accordingly: [Google Ads primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796).

## Recommended dataLayer payload

The website implementation should push this after a confirmed API response:

    window.dataLayer.push({
      event: "generate_lead",
      event_id: "<server-generated-id>",
      lead_id: "<non-PII-crm-reference>",
      form_id: "project_enquiry",
      request_type: "quotation",
      project_type: "warehouse_construction",
      authority_required: "dcd",
      project_location_group: "dubai",
      landing_page_path: "/warehouse-construction",
      traffic_source: "google",
      traffic_medium: "cpc"
    });

Use controlled values rather than raw user-entered text. The separate form_submit diagnostic event may be generated in GTM from generate_lead; it must not cause a second Google Ads lead conversion.

## GTM implementation plan

### Foundation

- Preserve the existing container and create a new GTM workspace/version; do not edit the live version directly.
- Preserve Consent Mode defaults in app/layout.tsx.
- Confirm the GA4 property and web stream ownership for G-43MXN4GKR2.
- Add a Conversion Linker tag on all pages.
- Replace CSS visibility tracking with custom-event triggers.
- Add a global delegated click listener in website code or GTM that classifies tel:, mailto:, and wa.me destinations.
- Use GTM Preview and Tag Assistant before publishing. GTM Preview shows exactly which tags fired and in what order: [Google Tag Manager preview and debug](https://support.google.com/tagmanager/answer/6107056).

### Tags and triggers

| Tag | Trigger | Consent requirement | Notes |
|---|---|---|---|
| Google tag / GA4 config | Initialization / all pages | analytics_storage | Existing destination; confirm one page_view only |
| GA4 generate_lead | Custom event generate_lead | analytics_storage | Pass controlled non-PII parameters |
| GA4 form_submit | Custom event generate_lead | analytics_storage | Diagnostic alias only if reporting requires it |
| Google Ads lead conversion | Custom event generate_lead | ad_storage and ad_user_data | One primary conversion, count=One |
| Google Ads quotation / inspection | Custom event with request_type filter | ad_storage and ad_user_data | Secondary initially |
| GA4 click events | Custom events for phone, WhatsApp, email | analytics_storage | Deduplicate one click per actual activation |
| Google Ads micro-conversions | Matching click events | ad_storage and ad_user_data | Secondary; not used for bidding |
| Meta Pixel PageView | Page view | marketing consent | Configure dataset/pixel ID in deployment environment |
| Meta Pixel Lead | generate_lead | marketing consent | Use browser eventID equal to event_id |
| Meta Pixel Contact | Click events where approved | marketing consent | Observation first |

## Google Ads and enhanced conversions

- Create a Submit lead form conversion action for generate_lead; count One and use the business-approved attribution setting.
- Keep this API-confirmed raw website lead as the only primary bidding conversion initially.
- Keep call clicks, WhatsApp clicks, email clicks, quotation_request, and site_inspection_request secondary at launch.
- Enable auto-tagging so gclid can be captured.
- Enable enhanced conversions only after privacy/legal approval and a successful test. Google describes email/phone matching as SHA-256 protected first-party data and recommends GTM configuration when GTM is used: [enhanced conversions with GTM](https://support.google.com/google-ads/answer/13262500).
- For 2026 implementation, use Google Ads Data Manager's direct Zoho CRM connector for CRM outcomes. Google officially lists Zoho CRM as a supported source for offline/enhanced-conversion lead imports: [Google Ads Zoho CRM connector](https://support.google.com/google-ads/answer/16318464) and [supported Data Manager sources](https://support.google.com/google-ads-data-manager/table/13860693).
- Create `Emitronix - Qualified Lead - Zoho` from the first entry into the approved qualified Lead Status. Set Count=One, a 90-day click-through window, data-driven attribution where available, and Secondary initially.
- Create `Emitronix - Converted Lead - Zoho` from the first entry into Deal Stage=Closed Won. Set Count=One, a 90-day click-through window, data-driven attribution where available, actual approved Deal Amount in AED when reliable, and Secondary initially.
- Use Zoho picklist history tracking so the conversion time is the first stage-entry time rather than the latest record modification time.
- Synchronize daily and map conversion name, stage-entry time with timezone, normalized consented email, E.164 phone, gclid, gbraid/wbraid when present, value/currency when approved, and a stable Zoho record-derived Order ID. Data Manager can normalize and hash mapped private fields: [Data Manager field preparation](https://support.google.com/google-ads-data-manager/answer/14184381) and [Data Manager transformations](https://support.google.com/google-ads-data-manager/answer/13762359).
- At the projected 3-10 monthly leads, keep both Zoho actions secondary. Consider promoting Qualified Lead and demoting the raw form only after daily imports are stable, diagnostics are clean, and the action has sufficient volume. Google recommends at least 15 conversions in the last 30 days for a lead-generation bidding goal and recommends selecting one funnel stage for optimization: [high-quality lead guidance](https://support.google.com/google-ads/answer/13489421).
- Do not make raw lead, qualified lead, and converted lead primary simultaneously. Google distinguishes primary bidding actions from secondary observation actions: [primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796).
- Imported actions may default to Every; explicitly select One for this lead model and use the Zoho-derived Order ID for retry deduplication: [conversion counting](https://support.google.com/google-ads/answer/3438531) and [enhanced-conversion import requirements](https://support.google.com/google-ads/answer/14274408).
- These settings are planned. They must be verified in the live Google Ads and Zoho mapping screens before activation, including whether the Zoho connector exposes dedicated GBRAID/WBRAID fields.

## Meta Pixel and Conversions API

- Treat Meta Instant Form lead retrieval and Zoho-to-Meta quality feedback as separate integrations.
- For retrieval, use Zoho LeadChain to synchronize each Instant Form to the Zoho Leads module, preferably with one clearly named chain per form. Preserve the 15-16 digit Meta Lead ID, form/campaign/ad identifiers, consent, and qualification fields. Meta describes CRM retrieval as the mechanism that removes manual lead downloads: [Meta lead ads with forms](https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-forms) and [Zoho LeadChain: Facebook Lead Ads to Zoho CRM](https://help.zoho.com/portal/en/kb/zoho-lead-chain/creating-chains/facebook/articles/integrating-facebook-lead-ads-with-zoho-crm).
- At the projected 3-10 leads per month, do not enable the Conversion Leads performance goal or a Zoho-to-Meta CRM quality CAPI connection. Zoho documents a minimum of 250 leads per month, at least daily uploads, a target stage reached within 28 days, and a 1%-40% stage conversion rate: [Zoho Facebook Conversion Leads requirements](https://help.zoho.com/portal/en/kb/zoho-lead-chain/creating-chains/facebook/articles/connecting-zoho-crm-and-fb-conversion-leads).
- Use the volume-oriented Meta lead performance goal initially and assess qualified-lead rate and lead quality in Zoho. Reassess quality optimization only after the stricter volume and freshness prerequisites, privacy approval, and the required LeadChain plan are satisfied: [Zoho LeadChain plans](https://help.zoho.com/portal/en/kb/zoho-lead-chain/getting-started/articles/lead-chain-an-overview).
- Create or confirm one Meta dataset/pixel in Events Manager.
- Add the public dataset/pixel ID only through the approved deployment environment.
- Store the Conversions API token only in a server-side secret; never use a NEXT_PUBLIC variable.
- Send Lead from the browser and server with identical event_name and event_id so Events Manager can deduplicate them.
- Server payload should include event_time, action_source=website, event_source_url, event_id, and consented/normalized user_data.
- Do not send CAPI events when the applicable marketing consent or approved legal basis is absent.
- Test with Events Manager Test Events, then check Diagnostics and Event Match Quality.
- Meta recommends using CAPI alongside Pixel, while respecting privacy controls rather than treating CAPI as a consent bypass: [Meta Conversions API overview](https://www.facebook.com/business/help/AboutConversionsAPI) and [Meta Pixel setup](https://www.facebook.com/help/messenger-app/952192354843755/).

## Attribution capture

### First landing

Capture and persist, without PII:

- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- gclid
- gbraid
- wbraid
- fbclid
- landing_page
- referrer
- first_touch_at
- last_touch_at

Use a first-party attribution record with a documented retention period. Copy the accepted values into hidden form fields or the JSON request at submission. Do not depend only on the current URL because visitors may navigate before converting.

### Google final URL suffix

Recommended account-level template, with campaign/ad-group custom parameters populated in Google Ads:

    utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_content={_adname}&utm_term={keyword}&campaign_id={campaignid}&ad_group={_adgroup}&adgroup_id={adgroupid}&creative_id={creative}&matchtype={matchtype}&device={device}&network={network}

Use lower-case, hyphenated custom parameter values. Search term is not available as a landing-page ValueTrack field; enrich it later from Google Ads reporting where privacy thresholds permit.

### Meta URL parameters

    utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}

Verify the resolved preview for every ad before activation and preserve IDs even if names later change.

## Thank-you-page plan

Create /thank-you only as part of an approved website implementation. It should:

- be noindex;
- show no PII or project details;
- be reachable after a valid successful submission;
- preserve a non-PII event_id in session state, not in a public query string;
- send thank_you_view as secondary;
- never be the sole source of the primary lead conversion;
- prevent refreshes and direct visits from generating another lead.

## Duplicate-prevention rules

- Generate event_id on the server and return the same ID for a retried/idempotent submission.
- Make the CRM idempotency key unique.
- Fire the browser generate_lead only after the first successful response.
- Use event_id for Pixel/CAPI deduplication.
- Use the same event_id/order ID for offline Google uploads.
- Set Google website lead counting to One.
- Keep micro-events secondary.
- Exclude internal/staging traffic in GA4 and test accounts.
- Do not install a second GA4 configuration tag outside GTM.

## QA test matrix

| Test | Expected result |
|---|---|
| Fresh visitor rejects analytics/marketing | No GA4, Ads, or Meta marketing hit; form still works |
| Visitor grants analytics only | GA4 events fire; Ads and Meta do not |
| Visitor grants analytics and marketing | Allowed GA4, Google Ads, Pixel, and CAPI events fire |
| Successful standard enquiry | One generate_lead with one event_id; one CRM lead/upsert |
| Double-click / browser retry | One CRM record and one primary conversion |
| Failed API submission | No lead conversion |
| WhatsApp click | One whatsapp_click; no generate_lead |
| Phone click | One phone_click; no generate_lead |
| Email click | One email_click; no generate_lead |
| Thank-you refresh/direct visit | No new primary conversion |
| Pixel plus CAPI | Events Manager shows one deduplicated Lead |
| CRM qualification | One Google qualified_lead import with correct original attribution and no Meta quality-feedback event |
| Google CRM retry | One imported event because the stable Zoho-derived Order ID is reused |
| Later Zoho record edit | The original qualification/Closed Won stage-entry timestamp remains unchanged |
| Meta Instant Form retrieval | One Zoho Lead is created or updated through LeadChain with its Meta Lead ID |
| Meta CRM quality feedback at launch | No event is sent and Conversion Leads optimization remains disabled at projected low volume |

Record screenshots or exports from GTM Preview, GA4 DebugView, Google Ads conversion diagnostics, Meta Test Events, and Zoho before approval to activate.

## Release gates

1. Business approves event definitions, consent/legal basis, retention, and data sent to Google, Meta, and Zoho.
2. Developer implements attribution, custom events, event_id, optional thank-you route, and secure CAPI endpoint on the separate branch.
3. GTM draft is reviewed but not published.
4. Staging and production-domain tests pass the matrix.
5. Google and Meta test leads are deleted or clearly labeled.
6. Only after written approval are the GTM container and paused campaigns published.
