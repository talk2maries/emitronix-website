# Google Ads attribution and Zoho Leads field mapping

Status: proposed mapping; custom field API names are not yet verified in the live Zoho organisation.

## Mandatory discovery step

Labels shown in Zoho are not safe API keys. Before enabling CRM writes, retrieve the live Leads metadata and store the verified `api_name` for each field:

```http
GET <ZOHO_API_DOMAIN>/crm/v8/settings/fields?module=Leads
Authorization: Zoho-oauthtoken <ACCESS_TOKEN>
```

Use the response's `api_name`, data type, length, read/write permissions and uniqueness flags. Zoho explicitly recommends API names because labels can change; see the [Zoho CRM v8 Fields Metadata API](https://www.zoho.com/crm/developer/docs/api/v8/field-meta.html). The verification command must fail closed when a required field is absent, read-only, the wrong type, or shorter than the integration's maximum value.

Do not paste an access token into documentation, a command history shared with others, or a browser. The actual command should obtain a short-lived token server-side from environment-backed OAuth credentials.

## Standard Lead fields

These names are standard candidates but must still be confirmed against live metadata and the active layout.

| Purpose | Expected Zoho API name | Write rule |
|---|---|---|
| Given name | `First_Name` | Validated form value |
| Family/name fallback | `Last_Name` | Required; use the submitted name split/fallback policy |
| Company | `Company` | Submitted organisation; use approved fallback only if the layout requires it |
| Email | `Email` | Normalised for duplicate checking; retain original valid display value in CRM |
| Phone | `Phone` or `Mobile` | E.164-normalised duplicate key where possible |
| Lead source | `Lead_Source` | Set to `Advertisement` only for a Google Ads-attributed enquiry and only if the approved picklist contains it |
| Lead status | `Lead_Status` | CRM-owned; website creation must not mark a lead Qualified |
| Enquiry details | `Description` | Original message and controlled page context; never send to Google |
| Zoho record ID | `id` | Read-only integration identifier |
| Modified time | `Modified_Time` | Read-only concurrency/audit evidence |

Do not overwrite a non-empty, unrelated `Lead_Source` on an existing record. Store Google Ads in the approved secondary source field instead. The requested `Advertisement` value and `Google Ads` sub-source must be approved by the Zoho administrator before writes are enabled.

## Proposed custom Lead fields

The `api_name` values deliberately remain placeholders. The Zoho administrator creates/approves the fields; `npm run verify:zoho` resolves and validates the actual API names. Supported logical keys are supplied as one validated `ZOHO_LEADS_FIELD_MAP_JSON` object, for example `{"gclid":"<metadata_api_name>"}`. Do not create one environment variable per row.

| Zoho label | Proposed type | JSON logical key / placeholder API name | Source and rule |
|---|---|---|---|
| Lead Sub Source | Picklist | `leadSubSource: <metadata_api_name>` | `Google Ads` only for attributed enquiries |
| Emitronix Lead ID | Single line (64+), API-updatable | `websiteSubmissionId: <metadata_api_name>` | Required canonical non-PII ID. Store the exact server `lead_id`; copy unchanged to the related Deal before `deal_won` can be enabled. Legacy labels “Website Submission ID” and “Website Event ID” remain discoverable. |
| Google Click ID | Single line (255+) | `gclid: <metadata_api_name>` | Latest eligible/converting-touch `gclid`; exact matching only |
| GBRAID | Single line (255+) | `gbraid: <metadata_api_name>` | Latest eligible/converting-touch `gbraid` |
| WBRAID | Single line (255+) | `wbraid: <metadata_api_name>` | Latest eligible/converting-touch `wbraid` |
| Google Ads Campaign ID | Single line | `campaignId: <metadata_api_name>` | `campaignid` / approved URL parameter |
| Google Ads Campaign Name | Single line | `campaignName: <metadata_api_name>` | Approved custom parameter; not inferred from ID |
| Google Ads Ad Group ID | Single line | `adGroupId: <metadata_api_name>` | `adgroupid` |
| Google Ads Keyword | Single line | `keyword: <metadata_api_name>` | ValueTrack `{keyword}`; not the private search-term report |
| Google Ads Match Type | Picklist or single line | `matchType: <metadata_api_name>` | Allowlisted ValueTrack values |
| Google Ads Device | Picklist or single line | `device: <metadata_api_name>` | Allowlisted ValueTrack values |
| Google Ads Network | Picklist or single line | `network: <metadata_api_name>` | Allowlisted ValueTrack values |
| Google Ads Placement | Single line | `placement: <metadata_api_name>` | ValueTrack value when applicable; usually absent for Search |
| Google Ads Creative | Single line | `creative: <metadata_api_name>` | ValueTrack creative ID |
| Google Ads Source | Picklist or single line | `googleAdsSource: <metadata_api_name>` | Controlled captured source value |
| GAD Source | Single line | `gadSource: <metadata_api_name>` | Sanitised `gad_source` |
| UTM Source | Single line | `utmSource: <metadata_api_name>` | Sanitised `utm_source` |
| UTM Medium | Single line | `utmMedium: <metadata_api_name>` | Sanitised `utm_medium` |
| UTM Campaign | Single line | `utmCampaign: <metadata_api_name>` | Sanitised `utm_campaign` |
| UTM Term | Single line | `utmTerm: <metadata_api_name>` | Sanitised `utm_term` |
| UTM Content | Single line | `utmContent: <metadata_api_name>` | Sanitised `utm_content` |
| Original Landing Page | URL or single line | `originalLandingPage: <metadata_api_name>` | Same-origin URL/path, stripped of unnecessary/query PII |
| Referring Page | URL or single line | `referringPage: <metadata_api_name>` | Sanitised URL; length limited |
| First Visit Date and Time | Date/time | `firstVisitAt: <metadata_api_name>` | ISO instant converted according to Zoho field requirements |
| Latest Visit Date and Time | Date/time | `latestVisitAt: <metadata_api_name>` | Latest accepted attributable visit |
| Lead Qualification Date | Date/time | `leadQualificationAt: <metadata_api_name>` | First confirmed transition only; CRM-owned |
| Google Ads User Data Consent | Boolean/checkbox | `adUserDataConsent: <metadata_api_name>` | True only with matching current website evidence; policy version/time/hash/expiry remain in the ledger |
| Google Conversion Uploaded | Boolean | `conversionUploaded: <metadata_api_name>` | True only after terminal Data Manager destination success |
| Google Conversion Uploaded At | Date/time | `conversionUploadedAt: <metadata_api_name>` | Terminal-success time, not request-acceptance time |
| Google Conversion Action | Single line | `conversionAction: <metadata_api_name>` | Approved action key/name |
| Google Conversion Value | Currency/decimal | `conversionValue: <metadata_api_name>` | Approved AED value |
| Google Conversion Upload Status | Picklist or single line | `conversionUploadStatus: <metadata_api_name>` | Runtime values: `dry_run`, `sent`, `retry_scheduled`, `confirmed`, `confirmed_with_warnings`, `confirmed_duplicate_transaction`, `permanent_failure` |
| Google Conversion Error | Multi-line | `conversionError: <metadata_api_name>` | Redacted code/summary only; no token or PII |
| Google Conversion Order ID | Single line (64+) | `conversionOrderId: <metadata_api_name>` | Writeback of the canonical lead ID for new jobs; do not make globally unique if multiple stage records/actions share it |
| Google Data Manager Request ID | Single line (160+) | `dataManagerRequestId: <metadata_api_name>` | Google `request_id` for diagnostics |

### Separate immutable first-touch fields

The operational fields above hold the latest eligible/converting touch so a later Google enquiry can be matched. Create a separate first-touch field for every acquired value; the code never overwrites a populated first-touch field on an existing Lead:

| Values | JSON logical keys |
|---|---|
| Click IDs | `firstGclid`, `firstGbraid`, `firstWbraid` |
| Campaign/ad group | `firstCampaignId`, `firstCampaignName`, `firstAdGroupId` |
| Keyword/match/device/network | `firstKeyword`, `firstMatchType`, `firstDevice`, `firstNetwork` |
| Source/placement/creative | `firstGadSource`, `firstGoogleAdsSource`, `firstPlacement`, `firstCreative` |
| UTMs | `firstUtmSource`, `firstUtmMedium`, `firstUtmCampaign`, `firstUtmTerm`, `firstUtmContent` |

Use labels in the form “First Touch Google Click ID”, “First Touch Google Ads Campaign ID”, and “First Touch UTM Source”; `verify:zoho` recognises and validates those labels or explicit JSON mappings. `Original Landing Page` and `First Visit Date and Time` are also immutable first-touch fields. If the Zoho edition cannot accommodate the required separation, do not enable conversion upload until an approved alternative storage/mapping design is implemented. Do not concatenate secrets or raw API responses into `Description`.

## Browser-to-server attribution contract

Capture these keys when present, apply length/character limits, and store first-touch and latest-touch separately:

```text
gclid, gbraid, wbraid, gad_source,
campaign_id, campaign_name, ad_group_id, keyword, match_type,
device, network, placement, creative, google_ads_source,
utm_source, utm_medium, utm_campaign, utm_term, utm_content,
landing_page_url, referring_url, first_visit_at, latest_visit_at
```

Rules:

- Never overwrite a valid first-touch record on ordinary navigation or a direct return visit.
- Update latest-touch only from a recognised attributable landing.
- Do not manufacture a campaign name from an ID. Use an approved Google custom parameter or leave it empty.
- `{keyword}` is the matched keyword, not necessarily the user's search query.
- Preserve only one valid Google advertising identifier for each Data Manager event when required. The selected precedence is `gclid`, then `gbraid`, then `wbraid`; do not send multiple competing click IDs.
- Treat submitted attribution as untrusted input and revalidate it on the server.

## Duplicate resolution

Use deterministic, conservative resolution rather than creating unnecessary Leads:

1. If the durable browser submission ID already completed, return that stored result.
2. Search normalised email, normalised mobile and the selected click ID, then verify every returned value exactly because Zoho criteria can be fuzzy.
3. Continue only when all matching identifiers resolve to one record; conflicting record IDs are held for manual review.
4. Do not automatically replay an ambiguous Lead-creation POST. A later transport retry first reconciles by the exact identifiers.
5. Preserve existing non-advertising source values, add `Google Ads` to an empty approved secondary-source field, preserve immutable first touch, and update operational/latest fields.

Zoho's Leads upsert uses `Email` as its system duplicate-check field and can also use configured unique fields; see [Upsert Records v8](https://www.zoho.com/crm/developer/docs/api/v8/upsert-records.html). The integration still needs its own idempotency ledger because CRM upsert alone does not prevent duplicate Google conversion uploads.

## CRM-to-Google mapping

| Internal value | Data Manager event field | Rule |
|---|---|---|
| Approved conversion action ID | Destination `productDestinationId` | Fixed allowlisted configuration, never webhook input |
| Google Ads customer ID | Destination account | Digits-only environment value; no dashes |
| Zoho milestone time | `eventTimestamp` | First stage-entry instant, RFC 3339, derived with `Asia/Dubai` context |
| Canonical Google order ID | `transactionId` | Exact Emitronix `lead_id` for Website Lead and every separate CRM-stage action; no PII; maximum 64 characters; retries reuse it unchanged |
| Value | `conversionValue` | Configured AED amount or actual approved Closed Won amount |
| Currency | `currency` | `AED` |
| One click identifier | `adIdentifiers` | Exactly one eligible `gclid`, `gbraid`, or `wbraid` |
| Email/phone | `userData.userIdentifiers` | Normalise and SHA-256 hash server-side only when consent permits |
| Consent | event consent object | Send evidenced `adUserData` only; omit the distinct `adPersonalization` signal unless separately collected |

For email, trim surrounding whitespace and lowercase before SHA-256. For phone, convert to E.164 with country code and digits, then hash. Do not guess a country code for ambiguous numbers. Follow the current [Google enhanced-conversions data preparation guidance](https://support.google.com/google-ads/answer/9888656) and verify the exact Data Manager event schema used by the implementation.

## Required administrator confirmation

Before live writes, export or record:

- Leads module API name and active layout ID;
- each custom field's ID, label, `api_name`, type, length, uniqueness and permissions;
- exact picklist values for Lead Source, Lead Sub Source, Lead Status and upload status;
- whether `Advertisement` and `Google Ads` are approved values;
- the canonical qualification, meeting, quotation and Closed Won definitions;
- the field/history source for each first stage-entry time;
- data retention and consent policy version;
- the Zoho record owner/fallback rules for website leads.

Until this metadata is retrieved, all custom API names in this document are placeholders and must not be used for production writes.
