# Google Ads administrator setup

Status: manual runbook only. No live Google Ads conversion setting, Data Manager connection, Google tag, or GTM version has been changed or verified by this documentation work.

## Approval gate

Stop before performing any step that writes to the live account. An authorised Google Ads administrator must explicitly approve:

- creating or editing conversion actions;
- accepting customer-data or enhanced-conversion terms;
- authorising the Google Cloud OAuth client;
- making an action Primary or changing campaign goals/bidding;
- publishing GTM;
- sending a real/test conversion to the live customer.

The repository identifies the business as **Emitronix Contracting LLC**. The request's “Emitronix Building Contracting LLC” variation is unverified and must not be used to rename the account or billing profile.

## 1. Record the account and ownership baseline

With read-only account access, record without exposing it in public logs:

- Google Ads customer ID and, if applicable, manager/login customer ID;
- campaign `Warehouse Construction Dubai` ID and current goal configuration;
- all existing conversion actions, source, category, status, counting method, value, attribution setting, window, and Primary/Secondary role;
- Google tag destinations and GTM container ownership;
- auto-tagging state;
- Data Manager connections, enhanced-conversion terms/consent settings, schedules and diagnostics;
- whether any existing system already imports CRM outcomes.

Export or screenshot the baseline so rollback does not depend on memory. Do not expose OAuth credentials, developer tokens, customer lists, or lead data.

## 2. Enable auto-tagging

In Google Ads, open **Admin > Account settings**, locate **Auto-tagging**, and enable tagging of destination URLs. Save only after approval. Verify that the landing page and every redirect preserve `gclid`, `gbraid`, or `wbraid` rather than stripping the query string.

Use a final URL suffix or campaign-level tracking parameters for reporting context. A proposed Search suffix is:

```text
utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_content={_adname}&utm_term={keyword}&campaign_id={campaignid}&ad_group_id={adgroupid}&creative={creative}&match_type={matchtype}&device={device}&network={network}&placement={placement}
```

Custom parameters such as `{_campaign}` and `{_adname}` must be populated deliberately; preview the resolved URL for every ad. `{keyword}` is the matched keyword, not necessarily the user's search term. IDs are the stable reporting keys.

## 3. Define conversion actions without double counting

Create or confirm these actions only after the event specification is approved:

| Action | Source/category | Count | Value | Initial role |
|---|---|---|---|---|
| Emitronix - Website Project Enquiry | Website / Submit lead form | One | Business-approved raw lead value or no value | Primary at initial launch |
| Emitronix - Qualified Lead - Zoho | Import / Qualified lead | One | AED 250 | Secondary |
| Emitronix - Meeting Booked - Zoho | Import / qualified stage | One | AED 500 | Disabled initially; Secondary if approved |
| Emitronix - Quotation Submitted - Zoho | Import / qualified stage | One | AED 1,000 | Disabled initially; Secondary if approved |
| Emitronix - Deal Won - Zoho | Import / Converted lead or Purchase, as approved | One | Actual approved amount in AED | Disabled initially; Secondary if approved |

Use the business-approved attribution model and a lead-appropriate conversion window. Record the conversion action ID used as Data Manager `productDestinationId`. Do not put user-selectable action IDs in a webhook request.

There must be only one primary conversion for the same initial enquiry. `generate_lead`, a thank-you page, `form_submit`, and a CRM raw-lead import must not all count the same submission as Primary. Google explains the reporting/bidding distinction in [Primary and Secondary conversion actions](https://support.google.com/google-ads/answer/11461796).

Keep downstream actions Secondary while ingestion and diagnostics stabilise. After enough reliable volume, choose one approved funnel stage for bidding and change goals in a separately reviewed release; do not automatically increase values or promote all stages.

## 4. Repair website conversion tagging in a GTM draft

The point-in-time repository audit found GTM container `GTM-MSM8MPD6`, but the existing published `form_submit` logic depended on visibility of `div.bg-blue-50`; that selector was not present. It also found no published Google Ads `AW-` conversion destination. Treat those findings as an audit lead, then re-check the live workspace before editing.

In a new GTM workspace/version:

1. Confirm the correct Google tag destination for the Ads customer.
2. Add or confirm a Conversion Linker on all pages.
3. Create a Google Ads conversion tag using the exact website action's conversion ID and label.
4. Trigger it only on the API-confirmed custom event `generate_lead`.
5. Set the tag's Transaction ID to the Data Layer variable for `lead_id`; do not add a prefix, suffix, timestamp, form name or Zoho record ID.
6. Require the applicable Consent Mode signals (`ad_storage` and `ad_user_data`) according to the approved policy.
7. Do not send name, email, phone, message, drawing URL, or other PII in `dataLayer` values.
8. Use GTM Preview and Tag Assistant. A rejected or failed form must fire no conversion; a successful form must fire exactly one.
9. Keep the workspace unpublished until evidence is reviewed and explicit publication approval is given.

The recommended client event carries only controlled, non-PII values and the server-generated `event_id`. Google provides official [Tag Manager preview/debug guidance](https://support.google.com/tagmanager/answer/6107056).

## 5. Configure Data Manager API v1

The custom integration uses Data Manager API `v1`, not a new `UploadClickConversions` integration.

1. In the approved Google Cloud project, enable the Data Manager API.
2. Configure an OAuth client and authorised user/service identity following [Data Manager API access setup](https://developers.google.com/data-manager/api/devguides/quickstart/set-up-access).
3. Grant that identity access to the Google Ads destination account with least privilege.
4. Request only the required scope: `https://www.googleapis.com/auth/datamanager`. Add a Google Ads API scope only if a separate verification/management feature truly requires it.
5. Store client ID, client secret and refresh token only in the deployment secret store. Do not store a service-account JSON file in Git.
6. Configure the digits-only operating customer ID, optional login/manager account, and allowlisted conversion action IDs. The Data Manager operating account must be the Google Ads conversion customer that owns the action.
7. First call `POST https://datamanager.googleapis.com/v1/events:ingest` with `validateOnly: true` and synthetic, non-customer test data.
8. For approved real ingestion, persist the returned `request_id` and retrieve destination status through `GET https://datamanager.googleapis.com/v1/requestStatus:retrieve?requestId=<REQUEST_ID>`.
9. Do not mark Zoho `Google Conversion Uploaded = true` merely because ingestion returned HTTP 200. Wait for terminal destination diagnostics.
10. Map every separate CRM-stage event's `transactionId` to the exact Zoho Emitronix Lead ID. Google deduplicates the ID with the destination action, so the same lead can record one Qualified conversion and one Quotation conversion without generating a second identity.

Data Manager's [events ingestion reference](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest) documents the OAuth scope and validate-only support. The [diagnostics guide](https://developers.google.com/data-manager/api/devguides/diagnostics) says processing can take up to 24 hours and recommends polling with bounded exponential backoff.

If the optional verification tooling needs Google Ads API for read-only conversion-action lookup or reporting, pin the currently reviewed stable version ([Google Ads API `v25`](https://developers.google.com/google-ads/api/reference/rpc/v25/overview) as of 4 August 2026). That API is separate from Data Manager `v1` and is not required for event ingestion.

### Why not UploadClickConversions

Google's current notice states that from 15 June 2026, developer tokens without offline-conversion upload requests between 17 December 2025 and 15 June 2026 are restricted. `UploadClickConversions` then returns `CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE`, and Google instructs migration to Data Manager API. See [Feature deprecations and unversioned changes](https://developers.google.com/google-ads/api/docs/deprecations). Do not attempt to work around that restriction with another developer token.

## 6. Enhanced Conversions for Leads

Enable Enhanced Conversions for Leads only after privacy/legal approval and acceptance of the applicable Google customer-data terms.

- Map only consented first-party email/phone.
- Normalise and SHA-256 hash server-side; never put raw or normalised PII in logs or `dataLayer`.
- Retain the consent state and policy version used for each event.
- Include exactly one eligible advertising identifier where required.
- Fail closed if consent is missing or disallows the transfer.

Google recommends Data Manager with Enhanced Conversions for Leads for CRM imports and describes legacy offline conversion import as less durable: [Data Manager with enhanced conversions for leads](https://support.google.com/google-ads/answer/15707550).

## Exact correction for “Unverified” / “No recent conversions”

The screenshot shows one contact action as **Unverified** and one as **No recent conversions**. Those labels require action-level diagnosis; the overview card alone does not prove which tag or action is wrong.

1. Open **Goals > Conversions > Summary**.
2. Open each action counted in the Contact goal and record its source, ID, status, Primary/Secondary role and campaigns using it.
3. For the **Unverified** website action, open **Tag setup > Use Google Tag Manager** and copy its exact conversion ID and label. Compare them with the GTM draft. If no matching Google Ads conversion tag exists, add it as described above; if the action is obsolete, do not reuse its ID—mark it Secondary/remove it from campaign goals only through an approved change.
4. Confirm the Google tag/Conversion Linker loads on `emitronix.ae`, the domain is correct, auto-tagging is enabled, redirects retain click IDs, and Consent Mode changes from its default only after the visitor's choice.
5. In GTM Preview/Tag Assistant, submit one clearly labelled test enquiry. The tag must fire once only after `/api/contact` succeeds. It must not fire on button click, validation error, API error, refresh, or direct thank-you-page visit.
6. Inspect the tag result and browser network request for the exact action ID/label. Do not include PII in the screenshots or logs.
7. Publish the reviewed GTM version only after explicit approval. Then repeat one approved production-domain test from a genuinely tagged ad click if the administrator authorises spend/test data.
8. Return to the action's **Diagnostics** and allow Google processing time. Check that the action moves away from Unverified and that the test is not rejected. Do not repeatedly resubmit while status is processing.
9. For **No recent conversions**, first confirm whether a valid conversion occurred inside the selected reporting window. If none occurred, the label is informational. If one did, check the same tag/consent/ID/label path, account/time-zone/date range, action source, campaign goal inclusion and diagnostics. A zero-click new campaign cannot produce a recent click-through conversion.
10. For imported CRM actions, check Data Manager request diagnostics rather than looking for a browser tag. Verify destination `SUCCESS`, correct conversion timestamp/time zone, click identifier, transaction ID, consent, action ID and upload schedule.

Do not “fix” either warning by making every Contact action Primary. The correct outcome is one verified website lead path plus separately diagnosed, initially Secondary CRM milestone actions.

## Acceptance evidence

Before activation, retain redacted evidence for:

- auto-tagging and resolved landing URL;
- action IDs/settings and Primary/Secondary roles;
- GTM Preview showing one API-confirmed website conversion;
- no conversion on failed/repeated submission;
- denied-consent and analytics-only tests;
- Data Manager validate-only success;
- one approved ingestion `request_id` and terminal diagnostics, if a live test is authorised;
- Zoho Lead attribution and upload status without exposed PII;
- campaign goal configuration showing no duplicate primary action.

No such live evidence is claimed in this document.
