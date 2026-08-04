# Proposed GTM container change plan

This is a proposal for `GTM-MSM8MPD6`. No resource has been created or changed in the live workspace.

## Naming convention

- Tags: `TAG – Platform – Purpose`
- Triggers: `TRG – Type – Condition`
- Variables: `VAR – Type – Name`
- Folders: `00 – Core`, `10 – Google Ads`, `20 – GA4`, `30 – Engagement`, `90 – Diagnostics`

Use an en dash in the GTM display name. Machine-readable keys remain snake case.

## Variables

### Constants

| Name | Proposed value |
| --- | --- |
| `VAR – Constant – GA4 Measurement ID` | `G-43MXN4GKR2` — verify ownership before applying |
| `VAR – Constant – Google Ads Conversion ID` | `AW-REQUIRES_ACCOUNT_VERIFICATION` |
| `VAR – Constant – Website Lead Label` | `REQUIRES_CONVERSION_ACTION` |
| `VAR – Constant – Phone Click Label` | `REQUIRES_CONVERSION_ACTION` |
| `VAR – Constant – WhatsApp Click Label` | `REQUIRES_CONVERSION_ACTION` |
| `VAR – Constant – Email Click Label` | `REQUIRES_CONVERSION_ACTION` |
| `VAR – Constant – Currency` | `AED` |

Do not infer an `AW-` ID from the visible Ads customer number. Copy the ID and label from the conversion action after it is created or verified.

### Data Layer Variables, Version 2

Create variables for the emitted contract: `lead_id`, `submission_id`, `form_name`, `lead_source`, `lead_value`, `currency`, `gclid_available`, `gbraid_available`, `wbraid_available`, `match_type`, `device`, `network`, `page_location`, `page_path`, `page_referrer`, `click_url`, `phone_number`, `button_location`, `error_type`, `http_status` and `crm_action`.

Do not create active browser variables for `crm_lead_id`, campaign/ad-group IDs, keyword or free-text UTM values in this phase. The Zoho record ID stays server-side, and URL-derived marketing text is untrusted input that can contain customer data. Full attribution remains available in the consent-gated Zoho/backend record. These variables may be reconsidered only with an explicit deployment-time allowlist and a no-PII Preview test.

Enable built-in Page URL, Page Path, Referrer, Click URL, Click Text and Click Classes for Preview diagnostics. Do not map arbitrary Click Text or Click Classes into analytics event parameters.

## Triggers

| Name | Type | Condition |
| --- | --- | --- |
| `TRG – Initialization – All Pages` | Initialization | All pages |
| `TRG – Custom Event – Virtual Page View` | Custom event | `virtual_page_view` |
| `TRG – Custom Event – Generate Lead` | Custom event | `generate_lead` and `lead_id` is not empty |
| `TRG – Custom Event – CRM Lead Created` | Custom event | `crm_lead_created` |
| `TRG – Custom Event – Form Start` | Custom event | `form_start` |
| `TRG – Custom Event – Form Submit Attempt` | Custom event | `form_submit` |
| `TRG – Custom Event – Form Error` | Custom event | `form_error` |
| `TRG – Custom Event – Form Abandon` | Custom event | `form_abandon` |
| `TRG – Custom Event – Phone Click` | Custom event | `phone_click` |
| `TRG – Custom Event – WhatsApp Click` | Custom event | `whatsapp_click` |
| `TRG – Custom Event – Email Click` | Custom event | `email_click` |
| `TRG – Custom Event – SalesIQ Chat Start` | Custom event | `salesiq_chat_start` |
| `TRG – Custom Event – SalesIQ Lead Captured` | Custom event | `salesiq_lead_captured` |

Do not use GTM's generic Form Submission or All Link Click triggers for the commercial conversions. The application provides authoritative custom events.

`quotation_request` and `site_inspection_request` remain deferred. They require an explicit, server-persisted request type in the website form; a CTA click or URL query alone is not an authoritative conversion trigger.

## Tags

| Name | Trigger | Consent | Proposed state |
| --- | --- | --- | --- |
| `TAG – Google Tag – All Pages` | Initialization – All Pages | Built-in consent | Reuse existing, connect verified Ads destination |
| `TAG – Google Ads – Website Lead` | Generate Lead | `ad_storage` and `ad_user_data` | Create after ID/label approval; primary after QA |
| `TAG – GA4 – Generate Lead` | Generate Lead | `analytics_storage` | Create; never import this same action into Ads |
| `TAG – GA4 – Virtual Page View` | Virtual Page View | `analytics_storage` | Create only if Google tag does not already handle SPA history |
| `TAG – Google Ads – Phone Click` | Phone Click | `ad_storage` | Create paused; secondary after QA |
| `TAG – Google Ads – WhatsApp Click` | WhatsApp Click | `ad_storage` | Create paused; secondary after QA |
| `TAG – Google Ads – Email Click` | Email Click | `ad_storage` | Create paused; secondary after QA |
| `TAG – GA4 – Form Lifecycle` | Form Start/Submit/Error/Abandon | `analytics_storage` | GA4 diagnostic events only |
| `TAG – GA4 – Contact Clicks` | Phone/WhatsApp/Email | `analytics_storage` | Engagement events |
| `TAG – GA4 – SalesIQ Chat Start` | SalesIQ Chat Start | `analytics_storage`; website also requires Functional | Secondary engagement |

The website-lead Ads tag must map:

- Transaction ID: `{{VAR – Data Layer – Lead ID}}`
- Value: `{{VAR – Data Layer – Lead Value}}`
- Currency: `{{VAR – Data Layer – Currency}}`

## Conversion Linker decision

Google's current guidance says a separate client-side Conversion Linker is not needed when one Google tag loads on every page. Therefore:

1. verify that the existing Google tag is the single owner and connect the approved Ads destination;
2. verify `_gcl_*` behavior and click-ID persistence in Preview;
3. add `TAG – Conversion Linker – All Pages` only if the verified account/tag configuration does not provide linking.

Do not publish both a redundant Linker configuration and unreviewed cross-domain decoration.

## Existing resources to retire

- Pause and then remove the GA4 `form_submit` tag triggered by visibility of `div.bg-blue-50` after the new custom-event tags pass Preview.
- Remove the corresponding element-visibility trigger.
- Retain the existing Google tag if its ownership and destination are verified.

## Provider ownership

| Provider | Owner |
| --- | --- |
| Google tag, GA4, browser Google Ads conversions | GTM |
| Zoho CRM and offline funnel conversions | Backend/Data Manager |
| Cookie UI and consent persistence | Website |
| SalesIQ widget | Website |
| Meta/LinkedIn/Clarity/Hotjar | Keep current website ownership until a separate migration is approved |

Creating a second provider copy in GTM is prohibited.
