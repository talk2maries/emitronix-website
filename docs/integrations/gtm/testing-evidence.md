# GTM testing and diagnostics evidence

## Completed locally

| Check | Result |
| --- | --- |
| TypeScript type-check | Passed |
| Google/Zoho/GTM integration tests | 57 passed, 0 failed |
| Cookie-consent tests | 13 passed, 0 failed |
| ESLint | Passed with no warnings or errors |
| Next.js production build | Passed; 271 routes generated |
| Dependency audit | 0 vulnerabilities |
| GTM source installation | One bootstrap and one noscript element in root layout |
| Consent ordering | Denied defaults precede GTM; stored choices require the authoritative runtime policy version |
| Server gate | `generate_lead` requires `ok=true`, server lead ID and `replayed=false` |
| Exact-once behavior | Session-storage persistence and blocked-storage in-memory fallback verified independently |
| Analytics-only consent | Non-advertising lead event works; ad attribution is removed |
| Raw click IDs | Not present in data-layer payload |
| URL privacy | Query strings and fragments removed |
| Marketing-field privacy | Untrusted campaign IDs, keyword and free-text UTM fields are omitted from browser events |
| Identifier privacy | Customer-shaped lead/submission/SalesIQ IDs are rejected; Zoho record IDs stay server-side |
| Contact links | Approved phone, WhatsApp and email destinations recognized |
| False-positive WhatsApp share | Excluded |
| Tracking failure isolation | A broken `dataLayer.push` cannot turn a successful lead into a form error |
| Credential-literal scan | No embedded credential literals found in the Phase 2A implementation/docs |

The commercial-form source wiring is covered automatically, but component behavior in a real browser and GTM tag firing are not claimed as locally proven. The Preview matrix below remains a launch blocker.

## Published-container evidence

- Public container request returned HTTP 200.
- Published resource contains GA4 `G-43MXN4GKR2`.
- No published `AW-` ID was found.
- Existing GA4 `form_submit` is driven by element visibility of `div.bg-blue-50`.
- The selector is absent from the current website source.

See `published-container-inventory.json` for the fingerprint and structured inventory.

## Pending GTM Preview tests

These tests require a new workspace with the proposed tags and must be completed before Submit:

1. Initial page view with no stored consent.
2. Accept all, reject all and each category combination.
3. Returning visitor with valid stored consent.
4. Expired or old-version consent record.
5. Test `gclid`, `gbraid` and `wbraid` landing URLs.
6. Valid Contact Form success with one `generate_lead` and one CRM event.
7. Valid Blog Enquiry success with one `generate_lead`.
8. Native validation failure with zero lead conversions.
9. API failure and network failure with zero lead conversions.
10. Replayed/duplicate submission with zero additional lead conversion.
11. Approved office/mobile telephone links.
12. Approved WhatsApp links and excluded blog share link.
13. Approved email link with query subject removed from event data.
14. SalesIQ launcher under Functional consent and no-consent states.
15. Next.js client route change without duplicate initial page view.
16. English/Arabic and desktop/mobile variants of key pages.
17. No customer PII in Data Layer, GA4 request parameters, Ads requests or console logs.

For every event record which tags fired, which did not fire, event parameters, consent state and transaction ID.

## Pending diagnostics

- Tag Assistant connection and container-quality warnings
- GA4 DebugView reception
- Google Ads website conversion verification
- Enhanced Conversions for Leads diagnostics
- Google Ads duplicate/transaction-ID diagnostics
- Zoho record attribution match for the same test submission

No live conversion diagnostics claim can be made before a controlled synthetic test and account approval.
