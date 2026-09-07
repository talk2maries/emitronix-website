# Emitronix Search Console Baseline

- Property: `https://emitronix.ae/`
- Audit date: 7 September 2026 (Asia/Dubai)
- Page indexing report last updated: 4 September 2026
- Sitemap: `/sitemap.xml`, successful, last read 4 September 2026, 237 discovered URLs
- Access: verified owner session; ownership, users, removals and verification settings were not changed

## Search performance

Latest complete 28 days (9 August-5 September 2026) compared with the previous 28 days (12 July-8 August 2026):

| Metric | Current | Previous | Direction |
|---|---:|---:|---|
| Clicks | 55 | 51 | +7.8% |
| Impressions | 4,183 | 3,175 | +31.7% |
| CTR | 1.3% | 1.6% | Down 0.3 percentage points |
| Average position | 29.5 | 29.3 | Down 0.2 positions |

Three-month view (25 June-5 September 2026): 142 clicks, 8,458 impressions, 1.7% CTR and 30.8 average position.

Country mix over three months was led by the UAE (117 clicks, 6,920 impressions), followed by India (18/377), the United States (1/513) and the United Kingdom (1/72). Device results were desktop 81 clicks/6,853 impressions, mobile 61/1,591 and tablet 0/14.

The strongest three-month landing pages were the home page (81 clicks), DEWA approvals (14), RTA approval (5), main contracting (5), about (5), warehouse construction (4), the civil construction guide (4), approvals (3), project management (2) and turnkey construction (2).

Recent impression gains were concentrated on DEWA approvals (+253), project management (+227), the civil construction guide (+95), Concordia-DMCC approvals (+80), Dubai location (+80), warehouse construction (+70), the warehouse planning guide (+69), main contracting (+54), warehouse engineering (+54) and building renovation (+49). Approval, DCD, services, RTA, projects, Trakhees, locations and industries declined and should be rechecked after the current crawl/indexing changes settle.

Search Appearance had no usable rows in the inspected period. This is recorded as unavailable data, not a clean result.

## Generative AI features

Google Search Console's Generative AI report showed:

| Range | Impressions | Pages |
|---|---:|---:|
| Latest 24 hours | 12 | 8 |
| Latest complete 28 days | 358 | 53 |
| Three months | 742 | 62 |

The leading 28-day sources were DEWA approvals (126 impressions), project management (27), the civil construction guide (17), RTA approval (16), the home page (14), the warehouse planning/approvals guide (13), Trakhees (11), DDA (10), the approvals hub (9) and Dubai Municipality approval (9). No Arabic URL recorded a Generative AI impression in the inspected 28-day view.

The Search Console AI control is `Include`, inherited from the property. It was not changed.

## Page indexing

| GSC reason | Pages | Validation state | Audit classification |
|---|---:|---|---|
| Page with redirect | 17 | Failed | Expected canonical aliases |
| Alternate page with proper canonical tag | 16 | Failed | Expected query states and historical aliases |
| Not found (404) | 13 | Failed | 11 actionable retired/CDN URLs; 2 genuine malformed URLs |
| Crawled - currently not indexed | 9 | Failed | 7 stale content examples now indexed; 2 non-HTML resources |
| Excluded by `noindex` | 2 | Not started | Intentional utility pages |
| Blocked by robots.txt | 1 | Not started | Intentional search crawl trap, but incorrectly advertised by schema |
| Discovered - currently not indexed | 22 | Started | Crawl-priority/content-overlap issue; 2 examples now indexed |

Direct URL Inspection on the seven HTML examples in `Crawled - currently not indexed` reported that they are currently indexed. Google-selected canonicals matched the inspected URLs, crawling and indexing were allowed, and page fetches succeeded. The aggregate reason is therefore stale for those examples.

The 22 discovered examples were present in the sitemap and linked from a crawlable warehouse hub. Two were indexed when inspected. Most remaining examples belong to a highly templated warehouse cluster. A controlled five-word-shingle comparison found pair similarity as high as 0.837. That is a quality and crawl-priority signal, but consolidation would be a material URL decision and was not performed without business approval.

## Technical and enhancement reports

- HTTPS: 44 HTTPS URLs, zero non-HTTPS URLs, no reported issue in the last 90 days.
- Breadcrumb enhancement: 44 valid items, zero invalid.
- Video enhancement: two valid items, both warning on `uploadDate` timezone formatting.
- Video indexing: two supporting videos not indexed because their pages are not watch pages. This is expected for supporting service-page media.
- Core Web Vitals: insufficient field data for both mobile and desktop. This cannot be described as a pass or failure.
- Manual actions: none.
- Security issues: none.
- Removals: no requests in the last six months; read-only review only.
- Links: 1,972 internal links and no external-link rows reported. The absence of external rows is a report limitation, not proof that no links exist.
- Crawl stats, latest 90 days: 5,673 requests, 119 MB downloaded and 659 ms average response time; 90% returned 200, 4% returned 404, 3% other 4xx and 2% 301.
- robots.txt: valid with one warning because Google's parser ignores Cloudflare's `Content-Signal` directive.

Cloudflare's managed robots policy and the application's origin robots policy contain conflicting rules for several non-Google AI crawlers. Google search and Generative AI visibility are active, but changing AI-training or third-party crawler access is a separate content-governance decision and was not silently overridden.

## Evidence limits

Search Console issue tables provide example URLs and may not enumerate every affected URL. The tracker combines every visible GSC example, the live sitemap, repository routes and a controlled crawl. A successful live inspection proves technical accessibility at test time; it does not guarantee indexing, ranking or Google's canonical choice after reprocessing.
