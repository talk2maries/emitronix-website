# Google Ads and Zoho conversion mapping

All classifications below are proposed and remain unpublished.

| Funnel event | Authoritative source | Delivery | Counting | Value | Proposed goal |
| --- | --- | --- | --- | --- | --- |
| Successful Website Enquiry | Website after Zoho create/update | Direct Google Ads GTM tag on `generate_lead` | One | Proposed AED 250 | Primary after Preview approval |
| Qualified Lead | Zoho Lead Status | Google Data Manager API | One per canonical lead ID in this action | AED 250 | Primary after data-quality approval |
| Meeting/Site Visit Booked | Zoho approved status/activity | Google Data Manager API | One per canonical lead ID in this action | AED 500 | Initially secondary |
| Quotation Submitted | Zoho approved status/stage | Google Data Manager API | One per canonical lead ID in this action | AED 1,000 | Primary after data-quality approval |
| Closed Won Deal | Zoho Deal Stage | Google Data Manager API | One per canonical lead ID in this action | Actual deal amount | Primary, value-focused |
| Phone Click | Website business `tel:` link | GTM | One | No assigned monetary value initially | Secondary |
| WhatsApp Click | Approved Emitronix WhatsApp destination | GTM | One | No assigned monetary value initially | Secondary |
| Email Click | Approved Emitronix `mailto:` destination | GTM | One | No assigned monetary value initially | Secondary |
| SalesIQ Chat Started | Website SalesIQ launcher | GTM/GA4 | One per session | No value | Secondary |
| SalesIQ Lead Captured | Verified SalesIQ callback/Zoho | GA4 or backend after verification | One | No value until qualified | Secondary |

Do not optimize to the raw website-enquiry and a later CRM stage as simultaneous primary goals without a deliberate account-level bidding decision. Start with one authoritative bidding stage; keep later stages observational until import volume and quality are stable.

## Duplicate prevention

- Direct Google Ads website conversion: transaction ID is the backend `lead_id`.
- CRM-stage Data Manager conversions: `transactionId` is the exact same backend `lead_id` for Qualified, Meeting, Quotation and Won. Each stage has its own Google conversion action, so the ID deduplicates within the stage without suppressing the other stages.
- Browser replay: `generate_lead` is suppressed when the API returns `replayed=true` and is also session-deduplicated.
- CRM conversions: the database enforces `transaction_id = source_submission_id` for all new jobs and uniqueness on `(conversion_action, transaction_id)`; the Zoho writeback exposes the same value for reconciliation.
- GA4 `generate_lead`: reporting only. Do not import it into Google Ads while the direct Ads website action is enabled.
- Enhanced Conversions for Leads: enriches matching; it is not a second conversion action.
- Phone/WhatsApp/email clicks use their own conversion actions and never reuse the website-lead label.

## IDs required before container changes

| Setting | Status |
| --- | --- |
| Google Ads customer ID | Visible account context exists; verify in account |
| Google Ads `AW-` destination ID | Missing from published container; must be copied from Ads/Google tag UI |
| Website Enquiry conversion label | Required |
| Phone Click conversion label | Required if this Ads action is approved |
| WhatsApp Click conversion label | Required if this Ads action is approved |
| Email Click conversion label | Required if this Ads action is approved |
| GA4 measurement ID | Published value `G-43MXN4GKR2`; ownership must be verified |

Never infer labels or use placeholders in a live tag.

## Backend milestone ownership

Qualified, meeting, quotation and won events must remain in `config/google-zoho-conversions.ts` and the Google Data Manager worker. Browser GTM cannot prove a CRM status transition. All backend conversion definitions remain disabled until approved.
