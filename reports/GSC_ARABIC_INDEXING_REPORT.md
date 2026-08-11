# Emitronix GSC and Arabic Indexing Report

Audit date: 2026-08-11

Property: `https://emitronix.ae/`

GSC account: Emitronix LLC (`info@emitronix.ae`)

Branch: `seo/gsc-arabic-indexing-fixes`

Base commit: `a6902f8`

Implementation commit: `9730065` (`Fix GSC indexing and Arabic route duplication`)

## Executive Summary

Google Search Console reported 193 non-indexed URLs. The largest group contained 148 URLs marked `Discovered - currently not indexed`. This was not a robots or server-access problem: every tested HTML URL was reachable by the normal crawler and Googlebot user agents, with no 403, 429, or 5xx responses.

The primary crawl-quality issue was a set of 100 generated warehouse articles. Each article was built from one of 20 topics and one of five repeated angles. The pages were long, but 88 GSC-listed URLs had high textual similarity to another generated page. These URLs competed with 50 stronger warehouse resource pages covering the same commercial intent.

The implementation removes the 100 generated articles from route manifests, internal discovery, and sitemap output. Each old URL now has one direct permanent redirect to its topic-matched warehouse resource. Genuine Arabic pages remain indexable and self-canonical.

## GSC Inventory

| GSC reason | URLs |
|---|---:|
| Discovered - currently not indexed | 148 |
| Alternate page with proper canonical tag | 19 |
| Page with redirect | 14 |
| Not found (404) | 7 |
| Crawled - currently not indexed | 4 |
| Excluded by noindex | 1 |
| **Total audited** | **193** |

The complete URL-level evidence and decisions are in `reports/gsc-indexing-audit.csv`. The unmodified GSC collection is stored in `reports/gsc-indexing-source.json`.

## Classification and Decisions

### Valid URLs retained

- 50 warehouse resource pages remain canonical, indexable, internally linked, and included in the sitemap.
- 3 Arabic articles in the Discovered group remain indexable. A fourth translated article was also reviewed and linked as part of the Arabic editorial set.
- 1 English authority-approval article remains canonical and indexable.
- Total affected Discovered URLs retained: 54.

### Generated articles consolidated

- 100 generated warehouse article routes were removed from the indexable content manifest.
- 96 of these URLs appeared in the current GSC non-indexed report; four additional redirects prevent future duplicate discovery.
- All 100 sources now return one direct 301 to the strongest topic-matched warehouse resource.
- Automated tests verify that no redirect falls back to a generic unrelated page.

### Arabic duplicate and legacy URLs

- 16 GSC-listed Arabic aliases already used direct redirects and were confirmed absent from the sitemap and internal links.
- 2 obsolete Arabic article URLs that returned 404 now redirect to current Arabic replacements.
- 1 Arabic parameter URL correctly canonicalizes to its clean URL and remains out of the sitemap.
- Legacy service aliases and `/ar/approvals` were removed from Arabic static generation so redirects no longer produce duplicate build output.
- No genuine Arabic translation canonicalizes to an English page.

### Broken and malformed URLs

- 5 GSC-listed retired article URLs now have direct replacements instead of 404 responses.
- 3 additional retired English or Arabic article routes received preventive redirects.
- The malformed `/$` and `/&` URLs remain real 404 responses because no meaningful replacement exists. They are absent from sitemaps and internal links.
- `manifest.webmanifest` and the reported Next.js font URL are assets, not indexable pages, and remain outside the XML sitemap.
- `/search` remains intentionally `noindex,follow` and outside the sitemap.

## Arabic SEO Verification

The final local build contains 38 Arabic sitemap URLs. Automated and browser checks confirmed:

- HTTP 200 on canonical Arabic pages.
- Self-referencing canonical URLs.
- Reciprocal `ar`, `en`, and `x-default` alternates.
- Runtime document language `ar-AE` and direction `rtl`.
- Arabic title, description, H1, and server-rendered main content.
- Arabic blog listing, breadcrumb, service-page, approval-page, and related-article links.
- Three related Arabic article links on each translated article.
- No horizontal overflow at a 390 x 844 mobile viewport.

No valid Arabic page was removed or changed to `noindex`.

## Sitemap, Canonical, and Robots Results

| Check | Before live snapshot | Final local build |
|---|---:|---:|
| Sitemap URLs | 237 | 137 |
| Generated warehouse articles in sitemap | 100 | 0 |
| Warehouse resource pages retained | 50 | 50 |
| Arabic sitemap URLs | 38 | 38 |

- The sitemap contains only canonical, indexable 200 destinations after redirects are resolved.
- Canonical and hreflang pairs passed the site validators; no canonical correction was required for retained pages.
- `robots.txt` already references the canonical sitemap and does not block Googlebot or required rendering assets, so no robots change was made.
- Query alternates and redirect sources remain excluded from sitemap output.
- No new `noindex` directive was introduced.

## Internal Linking Improvements

- Arabic articles now cross-link to the other translated editorial guides.
- Relevant Arabic service and approval pages now link contextually to the matching Arabic articles.
- Generated warehouse article links were removed with the retired route manifest.
- The 50 retained warehouse resources continue to receive contextual links from canonical hubs and related resources.

## Before and After Examples

| Previous URL | Final treatment |
|---|---|
| `/blog/warehouse-construction-dubai-planning-guide` | 301 to `/warehouse/warehouse-construction-dubai` |
| `/blog/steel-warehouse-construction-dubai-planning-guide` | 301 to `/warehouse/steel-warehouse-construction` |
| `/blog/warehouse-authority-approvals-dubai-planning-guide` | 301 to `/warehouse/warehouse-authority-approvals` |
| `/blog/warehouse-design-guide-uae` | 301 to the current warehouse planning editorial guide |
| `/ar/blog/industrial-building-planning-guide-uae` | 301 to `/ar/industrial-buildings` |
| `/ar/services/civil-contracting` | Existing direct 301 to `/ar/civil` retained |
| `/ar/blog/choose-best-building-contractor-dubai` | Retained as a 200, self-canonical Arabic article with stronger internal links |

## Validation Completed

- `npm run type-check`: passed.
- `npm test`: 14 tests passed.
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed; 157 static pages generated.
- `npm run validate:seo -- --base-url http://127.0.0.1:3107`: passed for 137 HTML pages, 598 image URLs, and 30 canonical redirects.
- `npm run validate:arabic-seo -- --base-url http://127.0.0.1:3107`: passed for 38 Arabic sitemap URLs.
- `npm run validate:routes -- --base-url http://127.0.0.1:3107`: passed 337 route checks.
- `npm run validate:contact -- --base-url http://127.0.0.1:3107`: passed for 137 sitemap pages.
- Real-browser desktop and mobile checks found no broken images or horizontal overflow.
- Googlebot-equivalent requests found no 403, 429, or 5xx access failure in the 193-URL live snapshot.

## Deployment and GSC Status

Production deployment is pending because this workstation does not have the `deploy-emitronix` command or production shell credentials. The live site therefore still reflects the pre-fix sitemap until the approved server workflow runs.

After deployment, complete these operational checks:

1. Confirm representative generated article URLs return one 301 to the expected warehouse resource.
2. Confirm `https://emitronix.ae/sitemap.xml` contains 137 canonical URLs and no generated warehouse articles.
3. Resubmit `https://emitronix.ae/sitemap.xml` in the exact GSC property.
4. Run Live URL Test for the homepage, one warehouse resource, and the three affected Arabic articles.
5. Request indexing for those high-priority canonical pages only.
6. Start `Validate fix` for `Discovered - currently not indexed` after Google has seen the deployed redirects and sitemap.

No GSC validation was started before deployment because that would ask Google to recheck the unchanged production state.

## Remaining Work

- Deploy the committed branch through the approved production workflow.
- Complete the live checks and GSC actions listed above.
- Allow Google time to recrawl the direct redirects and process the smaller sitemap. GSC counts will not change immediately.
- No manual Arabic content deletion decision is required. Future editorial additions should be topic-specific resources rather than angle-swapped variants of existing pages.
