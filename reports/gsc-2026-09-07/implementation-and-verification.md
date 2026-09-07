# Corrections and Verification

## Implemented corrections

1. Added permanent, topic-matched redirects for eight retired English article URLs and their former Arabic counterparts. The source articles were intentionally unpublished in July because they reused one template; they were not republished as low-differentiation content.
2. Added a permanent fallback from `/cdn-cgi/l/email-protection` to `/contact` so Cloudflare's obfuscated email endpoint no longer resolves as a crawlable 404 when JavaScript decoding is unavailable.
3. Removed `WebSite.potentialAction` for the internal `/search?q=` route. The route remains a deliberately blocked, noindex utility page, but structured data no longer advertises it to crawlers.
4. Changed DEWA and warehouse `VideoObject.uploadDate` values to complete ISO 8601 date-times with the UAE `+04:00` offset.
5. Added a schema regression rule that fails the SEO validation when a VideoObject omits a timezone-qualified `uploadDate`.
6. Expanded route checks to cover every new English/Arabic retired-content redirect and the Cloudflare fallback.
7. Added a repeatable GSC URL inventory command and evidence file.

## Pre-deployment verification

| Check | Result |
|---|---|
| `npm run type-check` | Passed |
| `npm run lint` | Passed with zero warnings/errors |
| `npm test` | Passed, 18 tests |
| `npm run validate:brand` | Passed, 10 assets/149 source files |
| `npm run validate:images` | Passed, 50 assets/127 responsive-social files |
| `npm run validate:arabic-seo -- --base-url http://127.0.0.1:3107` | Passed, 38 Arabic sitemap URLs |
| `npm run validate:contact -- http://127.0.0.1:3107` | Passed, 237 sitemap pages |
| `npm run validate:routes -- --base-url=http://127.0.0.1:3107` | Passed, 354 checks |
| `npm run validate:seo -- --base-url=http://127.0.0.1:3107 --max-pages=500 --max-link-checks=500 --concurrency=6` | Passed, 237 HTML pages/598 image URLs/34 canonical redirects |
| `npm run audit:content ...` | Passed, 237 pages, 9/10 average heuristic score |
| Isolated `next build` | Passed, 257 static pages generated |
| Desktop browser runtime | One H1, self canonical, no SearchAction, no horizontal overflow or console error |
| Arabic browser runtime | `ar-AE`, RTL, correct Arabic canonical and language switch; no console error |
| 500 px mobile visual checks | English and Arabic home/header/cookie-consent layouts fit without overlap; screenshots saved in this report folder |

The first server-backed validator attempts returned connection-refused because no local server was running. They were rerun against the completed production build and passed; these were setup failures, not website failures.

## URL inventory

`url-indexing-tracker.csv` contains 288 unique records: all 237 sitemap URLs plus unique GSC examples outside the sitemap. On the verified local build it recorded 245 HTTP 200 responses, 41 permanent redirects and two intentional 404s (`/$` and `/&`). No URL intended for indexing returned a non-200 response.

## Production verification

Pending deployment. This section must be updated from the live origin after the release is active.
