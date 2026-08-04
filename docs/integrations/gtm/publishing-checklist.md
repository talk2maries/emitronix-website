# GTM publishing checklist

Do not Submit or Publish until every required item is checked and the user explicitly approves the action.

## Identity and backup

- [ ] Correct account: Emitronix Contracting LLC
- [ ] Correct web container: Emitronix.ae
- [ ] Public ID: `GTM-MSM8MPD6`
- [ ] Latest published-version JSON exported and hashed
- [ ] Current workspace/draft JSON exported when unpublished work exists
- [ ] Current version number and rollback owner recorded

## IDs and ownership

- [ ] GA4 `G-43MXN4GKR2` ownership verified
- [ ] Exact Google Ads `AW-` ID copied from the account
- [ ] Every conversion label copied and peer-checked
- [ ] One provider owner documented; no duplicate `gtag.js`, Meta, LinkedIn, Clarity, Hotjar or SalesIQ initialization
- [ ] Google tag destination connections reviewed
- [ ] Separate Conversion Linker added only if verification shows it is necessary

## Tags, triggers and variables

- [ ] All proposed names match `container-change-plan.md`
- [ ] No generic All Forms trigger controls conversions
- [ ] Website Ads conversion fires only on `generate_lead`
- [ ] Transaction ID maps to `lead_id`
- [ ] Currency/value mapping approved
- [ ] Phone, WhatsApp, email and chat actions are secondary unless separately approved
- [ ] GA4 `generate_lead` is not imported into Ads when the direct Ads conversion is active
- [ ] Old `div.bg-blue-50` visibility tag/trigger is paused only after replacement passes Preview
- [ ] Qualified, quotation and won tags are not duplicated in browser GTM

## Consent and privacy

- [ ] Advanced versus Basic Consent Mode approved by business/legal owner
- [ ] Defaults precede Google tags
- [ ] Stored choices are reapplied correctly
- [ ] `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`, `functionality_storage`, `personalization_storage` and `security_storage` verified
- [ ] Tag-specific consent requirements configured
- [ ] Customer name, email, phone, message and project location absent from Data Layer and network requests
- [ ] Raw `gclid`, `gbraid` and `wbraid` absent from Data Layer
- [ ] Enhanced lead data remains consented and server-side unless an explicit exception is approved

## Preview evidence

- [ ] Valid Contact Form: exactly one website conversion
- [ ] Valid Blog Enquiry: exactly one website conversion
- [ ] Invalid form: zero conversions
- [ ] API/network failure: zero conversions
- [ ] Replay/duplicate: zero additional conversions
- [ ] Approved contact clicks fire the correct secondary events
- [ ] WhatsApp article share does not fire a lead event
- [ ] SalesIQ open alone does not fire `generate_lead`
- [ ] Client-side route changes do not duplicate initial page views
- [ ] Desktop, mobile, English and Arabic paths checked
- [ ] GA4 DebugView and Ads diagnostics show the expected IDs

## Approval packet

Before requesting Publish approval, provide:

1. exported backup filenames and hashes;
2. complete created/modified/paused resource list;
3. exact conversion IDs and labels;
4. Preview screenshots/log for every conversion event;
5. a no-PII network inspection;
6. duplicate-tag check;
7. rollback target version;
8. proposed version name and notes.

The final click on **Submit** and **Publish** requires a new, explicit approval after this packet is reviewed.
