# Emitronix Technical SEO & GSC Indexing Audit

**Audit date:** 25 August 2026

**Property:** `https://emitronix.ae/`

**Implementation status:** Complete and validated locally; production release and post-release GSC actions are awaiting owner approval.
**Audit inventory:** 134/134 Google Search Console exclusions classified in `gsc-indexing-audit-2026-08-25.csv`.

## Executive outcome

The exclusion count is not primarily a crawlability failure. The live sitemap contains 237 technically indexable, self-canonical URLs, but 150 of them form a highly repetitive programmatic warehouse-content cohort: 50 `/warehouse/*` pages and 100 generated warehouse articles. This cohort was published together in early August and closely matches the step-change in known URLs shown in GSC.

The proposed release consolidates organic ownership onto the strongest service pages and four retained core articles. It reduces the XML sitemap from **237 to 87 URLs**, applies `noindex, follow` to the 150-page low-differentiation cohort, and redirects selected obsolete/high-overlap paths to their best canonical owners.

This is a high-impact cleanup, not a routine metadata patch. GSC currently reports 157 indexed pages; because the retained sitemap has only 87 URLs, at least 70 currently indexed URLs would leave the retained indexable set. Production deployment therefore requires explicit business-owner acceptance.

## Backup and rollback evidence

A pre-change backup was created before any SEO edits at:

`C:\Users\User\Desktop\Visual Studio Project\emitronix-backups\20260825T113013`

It contains:

- `website-working-tree.tar.gz` — the complete working tree snapshot.
- `repository-all-refs.bundle` — a verified Git bundle containing all repository refs.
- Tracked diff and untracked-file inventories.
- Configuration/environment-name archive; no production secrets were found or copied.
- Local SQLite snapshots and cookie-data JSON present in the workspace.
- GSC exports and the machine-readable indexing-category inventory.

## GSC baseline

| Metric | Value |
|---|---:|
| Indexed pages | 157 |
| Not indexed pages | 134 |
| Exclusion reasons | 6 |
| Sitemap URLs discovered | 237 |
| Last Page Indexing update | 21 August 2026 |

| GSC exclusion reason | URLs | GSC validation at audit |
|---|---:|---|
| Discovered – currently not indexed | 86 | Started |
| Alternate page with proper canonical tag | 18 | Failed |
| Page with redirect | 16 | Failed |
| Not found (404) | 10 | Failed |
| Crawled – currently not indexed | 2 | Failed |
| Excluded by `noindex` tag | 2 | Not started |
| **Total** | **134** | |

The URL-level CSV contains, for every exclusion: URL, Google reason, indexability decision, root cause, required correction, keyword owner, completed action, validation status, and last crawl date.

### Indexing disposition

- **3 URLs should be indexed:** the English Dubai-authority approvals guide and its Arabic equivalent, plus the Arabic building-contractor selection guide. These remain in the clean sitemap and article hub and should receive one post-release URL Inspection request each.
- **131 URLs should not be independently indexed:** parameter duplicates, legitimate redirects, retired/draft URLs, search and guest-post utility pages, and thin or overlapping warehouse pages/articles. Their CSV rows specify the exact canonical, redirect, `noindex`, or 404 disposition.

## Root causes

### 1. Programmatic warehouse-content overexpansion — Critical

- 50 warehouse service/topic routes and 100 generated blog articles share one small number of templates.
- The 100 generated articles all carry the same publication date: 2 August 2026.
- Five-word-shingle comparison found 192 URL pairs at or above 0.80 similarity, affecting 96 pages; peak similarity was 0.876 for articles and 0.839 for warehouse pages.
- Long substantive paragraphs repeat across the 100 articles and the 50 warehouse pages.
- Generic commercial targets are repeated across roughly 152–155 URLs, including “warehouse construction Dubai,” “warehouse contractor Dubai,” and “civil contractor Dubai.”
- Nineteen generated titles contained malformed `|.` endings; 29 descriptions ended on dangling stopwords.

**Expected impact:** consolidation should improve crawl allocation, reduce duplicate interpretation, and give Google clearer commercial landing-page ownership. Rankings may fluctuate while the old cohort leaves the index.

### 2. Keyword cannibalization — High

GSC supplied direct overlap evidence for `warehouse contractors in dubai`:

| URL | Clicks | Impressions | Average position |
|---|---:|---:|---:|
| `/warehouse-construction` | 1 | 66 | 64.2 |
| `/blog/warehouse-contractors-dubai-planning-guide` | 0 | 17 | 83.4 |
| `/warehouse/warehouse-engineering` | 0 | 1 | 73.0 |
| `/warehouse/warehouse-consultant` | 0 | 1 | 92.0 |

Commercial ownership is now assigned to `/warehouse-construction`; supporting content retains informational intent only.

### 3. Legacy URLs and redirect/canonical validation noise — Medium

Parameterised contact URLs correctly canonicalise to `/contact`. Service aliases and historical article drafts require deterministic redirects or intentional 404 treatment. Internal links must point directly to final destinations to prevent crawlable redirect hops.

### 4. Search discovery contradiction — Medium

The internal `/search` page is deliberately `noindex` and its query patterns are blocked as crawl traps, yet the global Website schema advertised a `SearchAction`. The SearchAction was removed while keeping the user-facing search interface.

### 5. Secondary technical debt — Medium/Low

- Arabic pages return correct Arabic content, hreflang, `Content-Language`, and an Arabic SSR wrapper, but the raw root `<html>` initially says `lang="en-AE" dir="ltr"`; an early head script corrects it. A fully correct initial root requires a broader multiple-root-layout architecture change and is deferred.
- Cloudflare email obfuscation can expose `/cdn-cgi/l/email-protection` as an apparent crawler 404; this is controlled outside the application.
- GSC reports no 90-day Core Web Vitals field data. Large HTML responses and TTFB remain performance work, but no fabricated CWV diagnosis is made.
- Two videos are valid in structured data but are intentionally not dedicated watch pages. Their `uploadDate` values were corrected to full timezone-aware ISO dates.

## Implemented changes

### Indexation and sitemap controls

- Added explicit `indexable` state to article and warehouse datasets.
- Applied `noindex, follow` to all 50 generated warehouse pages and 100 generated warehouse articles.
- Removed the cohort from XML sitemap, HTML sitemap, home/resources/search discovery collections, LLM surface files, related-post logic, and primary navigation collections.
- Retained four core English articles and their four Arabic counterparts in the sitemap.
- Final generated sitemap: **87 unique canonical URLs**, with no redirect or `noindex` sources.
- Left intentional deindex targets crawlable so Google can observe `noindex` and redirects.

### Redirect and canonical cleanup

- Added six exact warehouse consolidation redirects to `/warehouse-construction`, `/industrial-buildings`, or `/building-renovation`.
- Added 12 English/Arabic legacy-draft article redirects to close live replacements.
- Retained method-preserving permanent 308 host canonicalisation for `www`; page aliases use 301.
- Normalised and deduplicated generated related/internal links so they point directly to final destinations.
- Confirmed every redirect destination exists in the final sitemap.

### Keyword ownership and on-page signals

| Page | Previous title | New title | Primary ownership |
|---|---|---|---|
| `/` | Construction Company Dubai \| Building Contractor \| Emitronix | Construction Company & Building Contractor Dubai \| Emitronix | Construction company / building contractor Dubai |
| `/warehouse-construction` | Warehouse Construction Dubai \| Logistics Warehouse Contractor | Warehouse Construction Company Dubai \| Warehouse Contractor | Warehouse construction company / contractor Dubai |
| `/industrial-buildings` | Industrial Building Contractor Dubai \| Factory & Workshop | Factory & Industrial Building Contractor Dubai | Factory and industrial building contractor Dubai |
| `/approval` | Authority Approval Services in Dubai | Dubai Authority Approval Services \| DM, DCD, DEWA & Trakhees | Dubai construction authority approvals |
| `/dewa-approvals` | DEWA Approval Coordination Guide Dubai | DEWA Approval Coordination Dubai \| NOC & Inspection Support | DEWA approval coordination Dubai |

Matching H1s were updated on the homepage, warehouse, industrial, civil, renovation, approval, and DEWA pages without duplicating multiple H1s. Titles and descriptions remain natural-language, location-specific, and distinct.

### Internal links and content hubs

- Replaced the 50-link warehouse grid with six curated, intent-distinct destinations.
- Updated industry, footer, service, and renovation links to their final keyword owners in English and Arabic.
- Kept the blog functional with four retained articles, 11 non-empty category filters, and four default-library cards.
- Removed generic warehouse terms from discovery surfaces that should reinforce the main service owner.

### Structured data and robots

- Removed the contradictory Website `SearchAction`.
- Corrected video `uploadDate` values to full UAE-offset timestamps.
- Preserved valid LocalBusiness/Organization, breadcrumb, service/article, canonical, hreflang, and language signals.
- Reduced application-level `/robots.txt` shared-cache TTL to five minutes. The existing Cloudflare-cached object must be purged during deployment because the old response may retain its prior long edge TTL.

## Validation completed

| Check | Result |
|---|---|
| `npm run lint` | Passed before final small fixes; final retry was blocked by Windows Application Control preventing native SWC and the fallback hanging |
| `npx tsc --noEmit` | Passed after final changes |
| Isolated production build | Passed; Next.js generated 271/271 routes |
| `git diff --check` | Passed |
| Full local site validator | Passed: 87 HTML URLs, 598 image checks, 30 redirect checks, 0 unexpected internal URLs |
| Arabic SEO validator | Passed across 38 Arabic routes |
| Contact/business-data validator | Passed across 87 sitemap URLs |
| Consolidation validator | Passed: 87 sitemap URLs, 15 sampled redirects, 4 exclusions, 5 priority pages |
| Visual browser QA | Passed for homepage and blog hub at desktop and a true 390×844 viewport; generated noindex page and redirect destination also passed |
| Audit CSV integrity | 134/134 unique URLs; 3 “Yes”, 131 “No”; no required field empty |

## Production release gate

No production deployment, cache purge, sitemap resubmission, URL Inspection request, or GSC “Validate fix” action has been claimed or performed. Those actions must follow this sequence after explicit approval:

1. Confirm the intended release branch and isolate/stage only the SEO files; the current working tree contains unrelated user work.
2. Explicitly accept the 237-to-87 sitemap reduction and likely deindexing of at least 70 currently indexed URLs.
3. Commit/push the approved SEO change set and run the production deployment procedure.
4. Purge Cloudflare cache for `/robots.txt`; verify status, body, cache headers, and edge age from multiple requests.
5. Re-crawl production: status codes, canonicals, robots, sitemap membership, hreflang, JSON-LD, internal redirect hops, and priority-page rendering.
6. Resubmit `https://emitronix.ae/sitemap.xml` only after the live file shows 87 clean URLs.
7. Use URL Inspection and request indexing once for the three retained excluded articles and the highest-priority commercial owners.
8. Start “Validate fix” only for GSC buckets whose live examples now match the intended correction. Do not validate intentional alternate/redirect/noindex states as errors.

## 30/60/90-day monitoring plan

### Days 1–30

- Monitor indexed/not-indexed counts weekly; expect known-page and indexed-page contraction.
- Check crawl errors, redirect destinations, canonical selection, sitemap reads, and the three requested article URLs.
- Watch impressions/clicks for `/`, `/warehouse-construction`, `/civil`, `/approval`, and `/dewa-approvals` against the pre-release baseline.

### Days 31–60

- Review query-to-page ownership and cannibalisation, especially warehouse and approvals clusters.
- Improve retained service/article content only where GSC shows impressions without competitive CTR/position.
- Confirm removed cohort URLs are falling out without unexpected traffic or backlink loss.

### Days 61–90

- Compare clicks, impressions, CTR, and average position by retained landing page and topic cluster.
- Decide whether any excluded page warrants a genuinely differentiated rewrite based on demand, backlinks, and conversion evidence.
- Address deferred Arabic root-layout and performance architecture work as separate releases.

## Baseline performance for monitoring

Last three months at audit: **125 clicks, 6,328 impressions, 2.0% CTR, average position 31.3**. The homepage led with 75 clicks and average position 6.4. Warehouse construction had 3 clicks/382 impressions at 44.6; approval had 2/704 at 59.6; DEWA had 13/909 at 14.9. These figures should be retained as the pre-release comparison, not interpreted as a guarantee of uplift.
