# Zoho CRM Lead Mapping

Audit date: 4 August 2026
Status: Draft specification — no Zoho configuration or credentials were changed

## Current integration

The website already sends successful project enquiries server-side to Zoho CRM v8. The current implementation maps name, company, email, phone/mobile, lead source, service, location, project details, page URL, browser, and consent.

Important gaps for paid media:

- no UTM, gclid, fbclid, campaign, ad group/ad set, keyword, ad, or landing-page fields;
- no warehouse size, approval, drawings-available, or expected-start fields;
- insert is used instead of an explicit upsert path;
- the local duplicate cache lasts ten minutes, lives only in process memory, and includes message text in the fingerprint;
- duplicate matching is therefore not durable across restarts or multiple server instances;
- no sales follow-up task is created by the website integration;
- no qualified-lead or converted-lead feedback is returned to Google or Meta.

## Required Zoho field design

Custom API names below are proposed placeholders. A Zoho administrator must confirm the exact field API names from Setup > Developer Hub > APIs & SDKs > API Names before implementation.

| Website / media value | Zoho module | Proposed field API name | Type | Required | Rule |
|---|---|---|---|---:|---|
| Full name | Leads | First_Name / Last_Name | Standard | Yes | Split safely; preserve full name in a separate field only if required |
| Company name | Leads | Company | Standard | Yes for B2B | Use a neutral fallback only when genuinely absent |
| Mobile number | Leads | Mobile and Phone | Standard | Yes | Normalize to E.164 before matching |
| Normalized mobile | Leads | Normalized_Mobile | Custom single line, unique | Yes | Digits/E.164 canonical value for deduplication |
| Email | Leads | Email | Standard | Yes on website form | Lower-case and trim |
| Lead source | Leads | Lead_Source | Standard picklist | Yes | Google Ads, Meta Ads, Organic, Direct, Referral, Website |
| Source detail | Leads | Lead_Source_Detail | Custom picklist | Yes | Google Search, Meta Instant Form, Meta Website, Meta WhatsApp |
| Campaign name | Leads | Campaign_Name | Custom single line | Paid leads | From UTM/custom parameter |
| Campaign ID | Leads | Campaign_ID | Custom single line | Paid leads | Stable platform ID |
| Ad group / ad set name | Leads | Ad_Group_Ad_Set | Custom single line | Paid leads | Google ad group or Meta ad set |
| Ad group / ad set ID | Leads | Ad_Group_Ad_Set_ID | Custom single line | Paid leads | Stable platform ID |
| Keyword | Leads | Paid_Keyword | Custom single line | Search leads | ValueTrack keyword |
| Search term | Leads | Search_Term | Custom single line | Later enrichment | Not available from the landing URL; join from Ads reporting |
| Ad name | Leads | Ad_Name | Custom single line | Paid leads | Custom parameter / Meta dynamic parameter |
| Creative ID | Leads | Creative_ID | Custom single line | Paid leads | Platform creative/ad ID |
| Landing page | Leads | Landing_Page | URL | Yes | Canonical URL without PII |
| UTM source | Leads | UTM_Source | Custom single line | Paid leads | Controlled lower-case value |
| UTM medium | Leads | UTM_Medium | Custom single line | Paid leads | cpc or paid_social |
| UTM campaign | Leads | UTM_Campaign | Custom single line | Paid leads | Stable naming convention |
| UTM content | Leads | UTM_Content | Custom single line | Paid leads | Ad/creative variant |
| UTM term | Leads | UTM_Term | Custom single line | Search leads | Keyword or Meta ad-set value |
| GCLID | Leads | GCLID | Custom single line | When present | Never overwrite a valid first-touch value with blank |
| GBRAID / WBRAID | Leads | GBRAID / WBRAID | Custom single line | When present | Preserve for Google measurement |
| FBCLID | Leads | FBCLID | Custom single line | When present | Preserve first-touch value |
| Meta Lead ID | Leads | Meta_Lead_ID | Custom single line | Meta Instant Forms | Preserve the original 15-16 digit lead ID for retrieval reconciliation and any future qualified-lead feedback |
| Meta Form ID | Leads | Meta_Form_ID | Custom single line | Meta Instant Forms | Stable form identifier from LeadChain |
| Submission date/time | Leads | Lead_Submitted_At | Date-time | Yes | Server time in ISO 8601, store timezone context |
| Project type | Leads | Project_Type | Custom picklist | Yes | Warehouse construction, modification, factory, industrial, approvals, other |
| Authority required | Leads | Authority_Required | Multi-select / picklist | When applicable | DM, DCD, Trakhees, JAFZA, Dubai South, DDA, RTA, DEWA, other |
| Project location | Leads | Project_Location | Custom single line | Yes | User value plus controlled location group |
| Approximate size | Leads | Warehouse_Size_Sqm | Number | High-intent form | Square metres; keep unit explicit |
| Existing drawings | Leads | Existing_Drawings | Checkbox / picklist | High-intent form | Yes / No / Unsure |
| Expected start | Leads | Expected_Project_Start | Date / picklist | High-intent form | Exact date only when user provides one |
| Short description | Leads | Description | Standard multiline | Yes | Sanitize and length-limit |
| Consent | Leads | Marketing_Data_Consent | Checkbox | Yes | Record the submitted consent state and version |
| Consent timestamp | Leads | Consent_At | Date-time | Yes | Server timestamp |
| Consent version | Leads | Consent_Version | Custom single line | Yes | Match cookie/form privacy copy version |
| Event / idempotency ID | Leads | External_Lead_Event_ID | Custom single line, unique | Yes | One stable ID per logical lead submission |
| First-touch values | Leads | First_Touch_* | Custom fields | Recommended | Never silently overwrite |
| Last-touch values | Leads | Last_Touch_* | Custom fields | Recommended | Update on a later valid enquiry |
| Qualification | Leads | Lead_Qualification_Status | Picklist | Yes | New, contacted, qualified, unqualified, converted |
| Qualification reason | Leads | Qualification_Reason | Picklist | On review | Scope fit, geography, budget/timing, duplicate, spam, other |
| Qualification stage entered at | Leads | Qualification_Stage_Entered_At | Date-time | On status change | Store the first time the approved qualified stage is reached; do not substitute the record's latest modified time |
| Ad user-data consent | Leads | Ad_User_Data_Consent | Picklist / checkbox | When customer data may be sent to an ad platform | Preserve the submitted consent state used for Google/Meta data sharing decisions |

For the converted-lead milestone, the Deals module also needs a stable Zoho Deal ID, Stage, the first timestamp at which the approved Closed Won stage is reached, Amount, and currency. These fields should be mapped directly rather than copied into free-text notes.

Do not put ad-platform IDs or attribution only in Description. Structured fields are required for filters, reports, automation, and offline conversion exports.

## Lead-source logic

Apply deterministic precedence:

1. gclid, gbraid, or wbraid present: Lead_Source=Google Ads; detail=Google Search for these campaigns.
2. fbclid or utm_source matching Meta/Facebook/Instagram: Lead_Source=Meta Ads.
3. Recognized non-paid UTM: map to its explicit source.
4. Referrer indicates an organic search engine: Organic.
5. No referrer or campaign data: Direct.
6. Never relabel a known first-touch paid lead as Direct because the visitor returned later.

Persist first-touch and last-touch separately. The sales team should see both.

## Duplicate prevention

### Recommended algorithm

1. Normalize email to lower-case.
2. Normalize UAE and international mobile numbers to E.164.
3. Generate External_Lead_Event_ID before the first CRM request.
4. Upsert by the unique event ID for network retries.
5. Search/upsert by Email and Normalized_Mobile for person-level duplicates.
6. When a match exists, update last-touch fields and create a new enquiry/activity record rather than erasing original attribution.
7. Do not create another follow-up task if an equivalent open task already exists.

Zoho's v8 Upsert API can insert or update using duplicate-check fields. Its documentation shows Email as the system duplicate field for Leads and supports configured unique fields: [Zoho CRM v8 Upsert Records](https://www.zoho.com/crm/developer/docs/api/v8/upsert-records.html).

The precise matching policy needs business approval:

- Same event ID: always the same submission.
- Same normalized email or mobile within 30 days: update/contact history, not a new person.
- Same person with a materially different project: keep one Lead/Contact but add a new enquiry/deal record.
- Conflicting email and mobile that point to different records: hold for manual review; do not auto-merge.

## Follow-up tasks

Create a Zoho workflow for new paid leads:

| Trigger | Task | Owner | Due | Escalation |
|---|---|---|---|---|
| New Google/Meta lead during business hours | Call and qualify paid lead | Assigned sales owner | Within 30 minutes or management-approved SLA | Notify sales manager if untouched at SLA |
| New lead outside business hours | Review at next opening | Queue / assigned owner | First business-hour block | Escalate if still new after two hours |
| Drawings available | Request secure drawing handover method | Assigned engineer/sales | Same business day | Do not request confidential files through analytics URLs |
| Qualified warehouse lead | Book scope call / site inspection | Project sales owner | Agreed date | Record outcome |
| Authority-only lead | Confirm jurisdiction, property, drawings, appointed consultant | Approval coordinator | Same business day | Mark route needing verification |

Zoho supports Tasks as records and workflow automation tasks. Confirm the organization's edition, assignment rules, workflow permissions, and exact owner IDs before enabling automation: [Zoho CRM v8 record insertion](https://www.zoho.com/crm/developer/docs/api/v8/insert-records.html) and [automation tasks](https://www.zoho.com/crm/developer/docs/api/v8/automation-tasks.html).

## Google offline outcome feedback

This is the approved design specification, not a statement that the live Google Ads or Zoho connection has been completed.

Create separate CRM milestones:

- qualified_lead: correct B2B contact, service/location fit, real project, follow-up accepted;
- converted_lead: the approved final commercial milestone, recommended as Deal Stage=Closed Won for revenue reporting;
- unqualified_lead: reason recorded, no value sent as a conversion.

Use Google Ads Data Manager's direct Zoho CRM connection and configure one event-specific connection/filter for each CRM milestone. Google officially lists Zoho CRM as supporting direct offline/enhanced-conversion imports. The connection requires Google Ads administrator access, valid Zoho access, an always-on connection, and Zoho picklist history tracking for the Lead Status and Deal Stage fields.

Recommended conversion actions:

| Google Ads action | Zoho trigger | Count | Window | Value | Initial role |
|---|---|---:|---:|---|---|
| Emitronix - Qualified Lead - Zoho | First entry into the approved qualified Lead Status | One | 90-day click-through | No invented value; use an evidence-based expected value only after approval | Secondary / observation |
| Emitronix - Converted Lead - Zoho | First entry into Deal Stage=Closed Won | One | 90-day click-through | Actual approved Deal Amount in AED when reliable | Secondary / observation |

Use data-driven attribution where that option is available. Imported actions may default to Every, so explicitly set Count=One for this one-project-per-lead model. If one ad-originated lead can genuinely produce multiple independent contracts, the Closed Won action may instead use Every with a unique Zoho Deal ID for each contract.

The API-confirmed raw website lead remains the only primary bidding conversion at launch. At the projected 3-10 leads per month, qualified and converted milestones will be too sparse for dependable bidding optimization. Promote Qualified Lead to primary, and demote the raw form to secondary, only after daily imports are stable, diagnostics are clean, and the action has sufficient volume. Google recommends at least 15 conversions in the last 30 days for a lead-generation bidding goal and recommends bidding to one funnel stage rather than multiple duplicative stages.

Map and synchronize daily:

- conversion name;
- the first stage-entry timestamp with timezone, not the latest record modification time;
- a stable Zoho record-derived order ID, such as `zoho-lead-{id}-qualified` or `zoho-deal-{id}-closed-won`;
- gclid plus gbraid/wbraid whenever present;
- normalized, consented email and E.164 phone for enhanced conversions;
- approved conversion value and currency AED only when finance defines the rule.

With a correctly configured user-provided-data Google tag, email or phone can provide the enhanced match; GCLID remains strongly recommended. Without that tag, GCLID is required. Data Manager can normalize and SHA-256 hash mapped private fields. Preserve GBRAID/WBRAID in Zoho, but verify that the live Zoho connector exposes dedicated mapping fields; Google's Zoho-specific documentation does not explicitly confirm those field labels.

The planned UI path is Goals > Conversions > Summary > Create conversion action > Import > CRMs, files, or other data sources > Track conversions from clicks > Connect a new data source > Zoho CRM. Select the relevant lifecycle stage, verify every automatic mapping, set a daily schedule, and review Offline Data Diagnostics before changing any bidding role.

Official references: [Google Ads Zoho CRM connector](https://support.google.com/google-ads/answer/16318464), [supported Data Manager sources](https://support.google.com/google-ads-data-manager/table/13860693), [enhanced-conversion import requirements](https://support.google.com/google-ads/answer/14274408), [Data Manager field preparation](https://support.google.com/google-ads-data-manager/answer/14184381), [conversion counting](https://support.google.com/google-ads/answer/3438531), and [high-quality lead guidance](https://support.google.com/google-ads/answer/13489421).

## Meta outcome feedback

- Lead retrieval: use Zoho LeadChain to synchronize each Meta Instant Form into the Zoho Leads module promptly. Use a separate, clearly named chain per form and map the original Meta Lead ID, form ID, campaign/ad identifiers, consent, and project qualification fields.
- Website events: Pixel plus a server Lead with the same event_id remains a later website-measurement implementation, subject to consent, QA, and deployment approval.
- CRM quality loop: do not enable Meta Conversion Leads optimization or Zoho-to-Meta quality CAPI at the current projected volume of 3-10 leads per month.
- Use the Meta volume-oriented lead performance goal initially and evaluate lead quality in Zoho reporting.
- Never upload a raw customer list or CRM outcome without the required user notice, permissions, and management approval.

Lead retrieval and down-funnel feedback are separate integrations. Zoho's Conversion Leads connection requires at least 250 leads per month, daily uploads, a target stage within 28 days, and a 1%-40% stage conversion rate. This plan fails the volume requirement, so the quality-feedback connection must remain disabled until those prerequisites and the required paid LeadChain capability are verified. See [Meta lead ads with forms](https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-forms), [Zoho LeadChain: Facebook Lead Ads to Zoho CRM](https://help.zoho.com/portal/en/kb/zoho-lead-chain/creating-chains/facebook/articles/integrating-facebook-lead-ads-with-zoho-crm), [Zoho LeadChain: Facebook Conversion Leads requirements](https://help.zoho.com/portal/en/kb/zoho-lead-chain/creating-chains/facebook/articles/connecting-zoho-crm-and-fb-conversion-leads), and [Zoho LeadChain plans and feature availability](https://help.zoho.com/portal/en/kb/zoho-lead-chain/getting-started/articles/lead-chain-an-overview).

## Security and privacy

- Keep Zoho client ID, client secret, refresh token, Google credentials, Meta access token, and webhook secrets in server environment variables.
- Use the minimum OAuth scopes required.
- Never log access tokens, full lead payloads, phone numbers, email addresses, or project descriptions.
- Encrypt transport, restrict admin access, rotate credentials, and document retention/deletion.
- Verify webhooks before processing.
- Ask for written approval before sending existing customer information to any new external service.

## Acceptance tests

1. Google test lead creates or updates exactly one Zoho person record.
2. Meta website lead does the same with all Meta attribution fields.
3. Meta Instant Form test lead reaches the same schema.
4. Two rapid retries create one logical enquiry and one task.
5. Same email with a new project preserves first-touch and updates last-touch.
6. Same mobile in a different format matches the normalized record.
7. Search-term field remains explicitly Pending enrichment rather than inventing a query.
8. Qualified status produces one eligible Google Data Manager feedback event and no Meta quality-feedback event at the current volume.
9. Unqualified/spam status produces no primary conversion feedback.
10. Logs contain IDs and status only, not customer data.
11. The first qualification timestamp remains stable when the Zoho record is edited later.
12. Daily Google Data Manager sync reports one event per eligible Zoho record and uses the Zoho-derived Order ID to reject retries.
13. Meta Instant Form test data is retrieved into Zoho through LeadChain with the Meta Lead ID, while no Zoho-to-Meta quality event is sent at the current low volume.

## Approvals required

- Exact Zoho field API names, picklist values, unique-field configuration, and module design
- Definition of qualified lead and converted lead
- Sales owner, SLA, working-day calendar, and escalation route
- Data retention and privacy wording
- Google/Meta customer-data use and offline feedback
- Secure drawing/document handover process
