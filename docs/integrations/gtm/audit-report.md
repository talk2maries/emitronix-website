# GTM audit report

Audit date: 4 August 2026
Scope: repository, public production HTML, public published-container resource, and approval-gated live UI checks.

## Executive finding

The website has one standard GTM installation and a sound Consent Mode default sequence. The currently published container is not ready for Google Ads lead measurement. It has no published Google Ads `AW-` destination or Ads conversion tag, and its only configured GA4 `form_submit` event is tied to visibility of `div.bg-blue-50`. That selector does not exist in the current application source, so it is not a reliable success signal.

The website code now provides a server-confirmed `generate_lead` contract that can replace this fragile trigger. Nothing has been imported, modified or published in GTM.

## Website installation

| Check | Finding | Status |
| --- | --- | --- |
| Container ID | `GTM-MSM8MPD6` | Confirmed |
| `<head>` bootstrap | Standard GTM bootstrap in the root Next.js layout | Confirmed |
| Consent before GTM | Denied defaults execute before the GTM bootstrap | Confirmed |
| `<noscript>` iframe | First website-authored child of `<body>` | Confirmed with framework note |
| Duplicate source installation | No second raw GTM or `gtag.js` installation in the repository | Confirmed |
| Route coverage | Root layout wraps all application routes; production sitemap currently contains 237 URLs | Confirmed |
| Returning consent | Denied defaults precede GTM; the stored choice is reapplied only after the no-store runtime policy version is verified | Implemented locally, not deployed |

Next.js injects a hidden hydration marker before authored body children in raw server HTML. The GTM iframe remains the first application-authored body child. Changing framework internals solely to move ahead of that marker is not recommended.

Public HTML was sampled on the home, contact, warehouse, blog and Arabic routes. The repeated GTM strings in raw HTML are React Server Component serialization of the same element, not a second executable tag.

The public consent-config endpoint returned policy version `1` during the audit, while the repository fallback is version `2`. The local implementation therefore no longer trusts a compiled version in the head. Custom tracking remains denied until the runtime endpoint supplies the authoritative version; malformed, expired or stale local storage then falls back to a valid same-version cookie.

## Published container inventory

The public `gtm.js` resource was retrieved read-only from Google on 4 August 2026. It was 362,630 UTF-8 bytes with SHA-256:

`ee4633d8c26f12facc02d1e7bc013c1732cd245a480dfe787fe433aec956313b`

Observed published resources:

| Resource | Published configuration | Finding |
| --- | --- | --- |
| Google tag | `G-43MXN4GKR2`, fires on `gtm.init` | Present |
| GA4 event | Event name `form_submit` | Present but unreliable |
| GA4 event trigger | Element visibility, CSS selector `div.bg-blue-50`, once | Selector absent from current source |
| Link-click listener | GTM link-click auto-event listener is present | No corresponding conversion/event tag observed |
| Element-visibility listener | Present for the form event trigger | Should be retired |
| Google Ads `AW-` ID | None found | Missing |
| Google Ads conversion tag | None found | Missing |
| Separate Conversion Linker | None found | Acceptable only if the Google tag is the owner on all pages |
| Phone/WhatsApp/email tags | None found | Missing |
| SalesIQ custom events | None found | Missing |
| Qualified/quotation/won events | None found | Correct for browser GTM; these belong to backend Data Manager |

The public compiled container does not reveal unpublished workspaces, user-facing resource names, notes, historical versions or draft conflicts.

## Website events after this local implementation

- `form_start`: first interaction with a commercial lead form; analytics consent required.
- `form_submit`: a valid form attempt immediately before the API request; analytics consent required. This is diagnostic only and must never be a conversion trigger.
- `generate_lead`: only after `/api/contact` reports that Zoho successfully created or updated the lead; deduplicated by the server lead ID.
- `crm_lead_created`: emitted alongside `generate_lead`, with `crm_action=created|updated`.
- `form_error`: validation, HTTP API or network failure without customer values or error messages.
- `form_abandon`: started form left before success, where the browser supplies `pagehide`.
- `phone_click`, `whatsapp_click`, `email_click`: delegated tracking restricted to verified Emitronix business destinations.
- `salesiq_chat_start`: user-requested SalesIQ window opened; functional consent required and secondary-only.
- `salesiq_lead_captured`: a safe bridge is available for a verified SalesIQ callback; it is not treated as active until that callback is confirmed in Preview.
- `virtual_page_view`: client-side Next.js route change; initial page view remains owned by the Google tag.

## Duplicate/conflict risks

1. Importing GA4 `generate_lead` into Google Ads while also firing a direct Ads tag would double count the website enquiry.
2. Using `form_submit`, button click or element visibility as the Ads trigger would count invalid/failed forms.
3. Making website enquiry, qualified lead and won deal identical conversion actions would collapse funnel stages.
4. Initializing Meta, LinkedIn, Clarity or Hotjar in GTM as well as the application would create duplicate providers. One owner must be documented for each provider.
5. The blog share URL `https://wa.me/?text=...` must not count as a WhatsApp lead. The new classifier explicitly excludes it.

## Deferred request-intent events

The paid-media draft also mentions `quotation_request` and `site_inspection_request`, but the current contact form does not authoritatively capture or persist a `request_type`; some links only add an `intent` query parameter. Those events are not active in this Phase 2A proposal because inferring a conversion from the link alone would be unreliable. Add an explicit form field/prefill, persist it through `/api/contact` and Zoho, then emit the secondary event only after the same server-confirmed success gate.

## Live UI audit still required

The following facts require the signed-in GTM UI and remain pending:

- current workspace changes and conflicts;
- user-facing names, folders, notes and paused resources;
- container version history and the last published version;
- a restorable JSON export;
- exact Google Ads conversion IDs/labels;
- Preview/Tag Assistant firing evidence;
- GA4 DebugView and Google Ads diagnostics.

The browser extension was installed and enabled, but did not respond during this audit. No alternate signed-out browser or guessed account data was used.
