# Consent Mode and Enhanced Conversions for Leads

## Implemented website behavior

The root layout establishes these values before GTM loads:

| Consent type | Default |
| --- | --- |
| `ad_storage` | denied |
| `analytics_storage` | denied |
| `ad_user_data` | denied |
| `ad_personalization` | denied |
| `functionality_storage` | denied |
| `personalization_storage` | denied |
| `security_storage` | granted |

GTM starts under the denied defaults above. The consent manager fetches the no-store runtime policy, exposes its version to the attribution and GTM event runtimes, and only then reapplies a valid, unexpired same-version record. Invalid local storage falls back to a valid cookie. Until that runtime version is known, custom tracking and advertising attribution remain denied. A config-fetch failure does not restore a compiled or stale choice.

When the visitor accepts, rejects or saves categories, the manager updates the same consent fields and persists the choice. This same-page update pattern follows Consent Mode guidance while preventing the repository fallback version from overriding an administrator-managed runtime version.

Mappings:

- Analytics category → `analytics_storage`
- Marketing category → `ad_storage`, `ad_user_data`, `ad_personalization`
- Functional category → `functionality_storage`, `personalization_storage`
- Necessary/security → `security_storage`

The visitor can accept all, reject non-essential cookies, or manage individual categories. The website never turns a missing, expired or old-version choice into granted consent.

## Advanced versus Basic Consent Mode

The existing website loads GTM with denied defaults, which is Advanced Consent Mode. Google tags may send consent-denied/cookieless signals depending on the tag and account configuration. This is not the same as Basic Consent Mode, where Google tags are blocked until consent.

Before deployment, Emitronix must confirm with its privacy/legal adviser whether Advanced or Basic behavior is appropriate for UAE visitors and any international audiences. The implementation can support either policy, but the policy must not be changed implicitly in GTM.

Consent Mode is not a replacement for the cookie banner or privacy notice. See Google's [Consent Mode implementation guide](https://developers.google.com/tag-platform/security/guides/consent) and [Basic versus Advanced concepts](https://support.google.com/google-ads/answer/10000067?hl=en).

## Enhanced Conversions for Leads design

Emitronix already has a safer backend path:

1. the website captures customer email/phone only in the consented form request;
2. the browser `dataLayer` receives no customer email, telephone or enquiry text;
3. Zoho stores the lead and immutable submission/consent linkage;
4. the Google Data Manager worker normalizes and SHA-256 hashes email/phone server-side;
5. customer identifiers are omitted when `ad_user_data` evidence is absent;
6. CRM lifecycle conversions use the exact same canonical website `lead_id` as their persistent transaction ID and exactly one click identifier.

This backend implementation is preferred over exposing raw user-provided data to GTM. Do not add a GTM User-Provided Data Event tag unless account diagnostics show it is specifically required and the business separately approves the browser data path. Never hash a value twice.

Official references: [Enhanced Conversions for Leads with GTM](https://support.google.com/google-ads/answer/11347292?hl=en), [current setup guidance](https://support.google.com/google-ads/answer/15707550?hl=en), and [Data Manager offline events](https://developers.google.com/data-manager/api/devguides/events/google-ads/offline).

## Cross-domain and referrals

Current repository forms submit on `emitronix.ae`; no Zoho Form redirect is present. The SalesIQ widget is an embedded functional service, not a measurable checkout/domain journey. Therefore no cross-domain linker list should be published yet.

If a future flow navigates to Zoho Forms or another Emitronix domain:

1. document every domain and ownership boundary;
2. confirm the destination can preserve consent and attribution;
3. test `gclid`, `gbraid`, `wbraid` and UTM persistence without exposing them in visible content or logs;
4. add only verified domains to Google tag cross-domain settings;
5. add self-referral exclusions where GA4 diagnostics prove they are needed.

URL passthrough and linker decoration must be enabled only after privacy approval and Preview evidence.
