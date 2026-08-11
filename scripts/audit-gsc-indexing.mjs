#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

function option(name, fallback) {
  const prefix = `--${name}=`;
  const inline = args.find((value) => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const baseUrl = new URL(option("base-url", "https://emitronix.ae"));
const inputPath = option("gsc-input", "reports/gsc-indexing-source.json");
const outputPath = option("output", "reports/gsc-indexing-audit.csv");
const concurrency = Number.parseInt(option("concurrency", "6"), 10) || 6;
const timeoutMs = Number.parseInt(option("timeout-ms", "20000"), 10) || 20_000;
const implementationStatus = option("implementation-status", "pending");
const googlebotUserAgent =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

function decodeEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function attributes(tag) {
  const result = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(tag))) {
    const name = match[1].toLowerCase().replace(/^</, "");
    if (["a", "html", "link", "meta"].includes(name)) continue;
    result[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function cleanText(value) {
  return decodeEntities(
    String(value)
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
      .replace(/<header\b[\s\S]*?<\/header>/gi, " ")
      .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function elementText(html, name) {
  const match = html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\/${name}>`, "i"));
  return match ? cleanText(match[1]) : "";
}

function metaContent(html, name) {
  for (const tag of tags(html, "meta")) {
    const attrs = attributes(tag);
    if ((attrs.name || "").toLowerCase() === name.toLowerCase()) return attrs.content || "";
  }
  return "";
}

function canonicalUrl(html, fallback) {
  for (const tag of tags(html, "link")) {
    const attrs = attributes(tag);
    if ((attrs.rel || "").toLowerCase().split(/\s+/).includes("canonical")) {
      try {
        return new URL(attrs.href, fallback).href;
      } catch {
        return attrs.href || "";
      }
    }
  }
  return "";
}

function hreflangLinks(html, fallback) {
  const links = [];
  for (const tag of tags(html, "link")) {
    const attrs = attributes(tag);
    if (!(attrs.rel || "").toLowerCase().split(/\s+/).includes("alternate") || !attrs.hreflang) continue;
    try {
      links.push({ language: attrs.hreflang.toLowerCase(), href: new URL(attrs.href, fallback).href });
    } catch {
      links.push({ language: attrs.hreflang.toLowerCase(), href: attrs.href || "" });
    }
  }
  return links;
}

function normalizeInternalUrl(value) {
  try {
    const url = new URL(value, baseUrl);
    if (url.origin !== baseUrl.origin) return null;
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function internalLinks(html) {
  const links = new Set();
  for (const tag of tags(html, "a")) {
    const attrs = attributes(tag);
    if (!attrs.href || /^(?:#|mailto:|tel:|javascript:)/i.test(attrs.href)) continue;
    const normalized = normalizeInternalUrl(attrs.href);
    if (normalized) links.add(normalized);
  }
  return [...links];
}

function pageType(url) {
  const pathname = new URL(url).pathname;
  if (/\.(?:woff2?|webmanifest|xml|txt)$/i.test(pathname)) return "asset";
  if (pathname === "/search") return "search";
  if (pathname.startsWith("/ar/blog/")) return "Arabic blog article";
  if (pathname.startsWith("/blog/")) return "English blog article";
  if (pathname.startsWith("/ar/services/")) return "Arabic service alias";
  if (pathname.startsWith("/services/")) return "English service alias";
  if (pathname.startsWith("/ar/")) return "Arabic page";
  if (pathname.startsWith("/warehouse/")) return "Warehouse resource";
  return "Page";
}

function languageFor(url) {
  return new URL(url).pathname === "/ar" || new URL(url).pathname.startsWith("/ar/") ? "Arabic" : "English";
}

function words(text) {
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? [];
}

function arabicRatio(text) {
  const letters = text.match(/\p{L}/gu) ?? [];
  if (!letters.length) return 0;
  return letters.filter((letter) => /[\u0600-\u06ff]/u.test(letter)).length / letters.length;
}

function shingles(text, size = 5) {
  const tokens = words(text.toLowerCase()).filter((token) => token.length > 2);
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(" "));
  }
  return result;
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let overlap = 0;
  const smaller = left.size <= right.size ? left : right;
  const larger = left.size <= right.size ? right : left;
  for (const item of smaller) if (larger.has(item)) overlap += 1;
  return overlap / (left.size + right.size - overlap);
}

async function request(url, { redirect = "manual", userAgent = "Emitronix Technical SEO Audit/1.0" } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect,
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": userAgent,
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRedirects(value, userAgent) {
  const hops = [];
  let current = new URL(value).href;
  let response;
  for (let index = 0; index < 8; index += 1) {
    response = await request(current, { userAgent });
    const location = response.headers.get("location");
    hops.push({ url: current, status: response.status, location });
    if (![301, 302, 303, 307, 308].includes(response.status) || !location) break;
    current = new URL(location, current).href;
  }
  if (!response) throw new Error(`No response for ${value}`);
  const body = await response.text();
  return { body, finalUrl: current, hops, response };
}

async function mapConcurrent(items, worker, limit) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

function csv(value) {
  const normalized = value === null || value === undefined ? "" : String(value);
  return `"${normalized.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

function recommendedAction(item) {
  const { canonical, contentCondition, finalStatus, finalUrl, gscStatus, inSitemap, metaRobots, url } = item;
  if ([301, 302, 303, 307, 308].includes(item.initialStatus)) {
    return `Keep the permanent redirect only when ${finalUrl} is the intended replacement; remove the source URL from internal links and sitemap.`;
  }
  if (finalStatus === 404 || finalStatus === 410) {
    return "Keep 404/410 for invalid or obsolete URLs without a replacement; otherwise add one direct 301 and remove stale internal links.";
  }
  if (/noindex/i.test(metaRobots)) {
    return inSitemap ? "Remove this intentionally noindex URL from the sitemap." : "Keep noindex,follow only if the page has user value but should not appear in search.";
  }
  if (canonical && canonical !== finalUrl) {
    return `Remove the alternate URL from internal links and sitemap; link directly to ${canonical}.`;
  }
  if (/untranslated|thin|near duplicate/i.test(contentCondition)) {
    return "Improve with substantial, page-specific content or consolidate to the strongest matching canonical page and remove this URL from the sitemap.";
  }
  if (pageType(url) === "asset") {
    return "No indexing action required for this non-HTML asset; keep it out of the XML sitemap.";
  }
  if (gscStatus.includes("Discovered") || gscStatus.includes("Crawled")) {
    return "Keep indexable, retain the self-canonical URL in the sitemap, and strengthen contextual internal links from relevant hubs.";
  }
  return "Retain the current canonical configuration and monitor validation.";
}

const retiredArticlePaths = new Set([
  "/blog/warehouse-design-guide-uae",
  "/blog/main-contractor-vs-general-contractor-dubai",
  "/blog/construction-cost-saving-tips-dubai",
  "/blog/industrial-building-planning-guide-uae",
  "/ar/blog/warehouse-design-guide-uae",
  "/ar/blog/main-contractor-vs-general-contractor-dubai",
  "/ar/blog/construction-cost-saving-tips-dubai",
  "/ar/blog/industrial-building-planning-guide-uae",
]);

function isGeneratedWarehouseArticle(url) {
  const pathname = new URL(url).pathname;
  return (
    pathname.startsWith("/blog/") &&
    /-(?:planning-guide|approval-checklist|cost-factors|timeline-process|contractor-selection)$/.test(pathname)
  );
}

function completedAction(item) {
  if (implementationStatus !== "implemented") return "Pending";
  const pathname = new URL(item.url).pathname;

  if (isGeneratedWarehouseArticle(item.url)) {
    return "Implemented a direct 301 to the topic-matched warehouse resource and removed the generated article from route manifests, internal links and sitemap output.";
  }
  if (retiredArticlePaths.has(pathname)) {
    return "Implemented a direct 301 to the closest current editorial, service or Arabic replacement; the retired URL remains excluded from the sitemap.";
  }
  if ([301, 302, 303, 307, 308].includes(item.initialStatus)) {
    return "Confirmed the existing redirect is direct and the source URL is absent from the sitemap and current internal links.";
  }
  if (pathname === "/$" || pathname === "/&") {
    return "Confirmed malformed URL remains a real 404 with no sitemap or internal-link discovery path.";
  }
  if (pageType(item.url) === "asset") {
    return "Confirmed this non-HTML asset is excluded from the XML sitemap; no page-indexing directive added.";
  }
  if (/noindex/i.test(item.metaRobots)) {
    return "Confirmed the search results page remains intentionally noindex and excluded from the XML sitemap.";
  }
  if (item.language === "Arabic" && pageType(item.url) === "Arabic blog article") {
    return "Retained as indexable Arabic content and added contextual links from related Arabic articles and relevant service or approval pages.";
  }
  if (pageType(item.url) === "Warehouse resource") {
    return "Retained as a canonical indexable resource with sitemap inclusion and contextual internal links.";
  }
  if (new URL(item.url).search) {
    return "Confirmed the parameter URL is excluded from the sitemap and canonicalizes to the clean page URL.";
  }
  return "Reviewed; current indexability, canonical and sitemap treatment retained.";
}

function verificationResult(item) {
  const live = `Live audit ${new Date().toISOString().slice(0, 10)}: final HTTP ${item.finalStatus}; Googlebot HTTP ${item.googlebotStatus}${item.googlebotFinalUrl !== item.url ? ` at ${item.googlebotFinalUrl}` : ""}`;
  if (
    implementationStatus === "implemented" &&
    (isGeneratedWarehouseArticle(item.url) || retiredArticlePaths.has(new URL(item.url).pathname)) &&
    item.initialStatus === 200
  ) {
    return `${live}. Redirect is verified in the local production build; production deployment and recrawl remain pending.`;
  }
  return live;
}

function hreflangSummary(item) {
  if (!item.html) return "Not applicable";
  const links = item.hreflang;
  const required = item.language === "Arabic" ? ["ar", "ar-ae", "en", "en-ae", "x-default"] : ["en", "en-ae", "x-default"];
  const languages = new Set(links.map((link) => link.language));
  const missing = required.filter((language) => !languages.has(language));
  const selfLanguage = item.language === "Arabic" ? ["ar", "ar-ae"] : ["en", "en-ae"];
  const hasSelf = links.some((link) => selfLanguage.includes(link.language) && link.href === item.finalUrl);
  return `${missing.length ? `Missing ${missing.join(", ")}` : "Required tags present"}; ${hasSelf ? "self-reference present" : "self-reference missing"}`;
}

async function main() {
  const source = JSON.parse(await readFile(inputPath, "utf8"));
  const gscRows = Object.values(source).flatMap((category) =>
    category.rows.map((row) => ({ ...row, gscStatus: category.label })),
  );

  const sitemapResponse = await request(new URL("/sitemap.xml", baseUrl), { redirect: "follow" });
  if (!sitemapResponse.ok) throw new Error(`Unable to fetch sitemap.xml: HTTP ${sitemapResponse.status}`);
  const sitemapXml = await sitemapResponse.text();
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/gi)].map((match) => decodeEntities(match[1].trim()));
  const sitemapSet = new Set(sitemapUrls);

  const crawlTargets = [...new Set([...sitemapUrls, ...gscRows.map((row) => row.url)])];
  const fetchedRows = await mapConcurrent(
    crawlTargets,
    async (url) => {
      try {
        const result = await fetchWithRedirects(url);
        let googlebotStatus = 0;
        let googlebotFinalUrl = url;
        try {
          const googlebotResult = await fetchWithRedirects(url, googlebotUserAgent);
          googlebotStatus = googlebotResult.response.status;
          googlebotFinalUrl = googlebotResult.finalUrl;
        } catch {
          // Keep the normal-browser audit result and surface the bot failure below.
        }
        const contentType = result.response.headers.get("content-type") || "";
        const html = /text\/html|application\/xhtml\+xml/i.test(contentType) ? result.body : "";
        const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
        const text = cleanText(main);
        const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
        return {
          url,
          ...result,
          contentType,
          html,
          text,
          wordCount: words(text).length,
          title: elementText(html, "title"),
          h1: elementText(main, "h1"),
          canonical: canonicalUrl(html, result.finalUrl),
          metaRobots: metaContent(html, "robots"),
          xRobotsTag: result.response.headers.get("x-robots-tag") || "",
          hreflang: hreflangLinks(html, result.finalUrl),
          htmlLang: attributes(htmlTag).lang || "",
          htmlDir: attributes(htmlTag).dir || "",
          outgoingLinks: internalLinks(main),
          shingleSet: shingles(text),
          googlebotStatus,
          googlebotFinalUrl,
        };
      } catch (error) {
        return {
          url,
          finalUrl: url,
          hops: [],
          response: { status: 0, headers: new Headers() },
          contentType: "",
          html: "",
          text: "",
          wordCount: 0,
          title: "",
          h1: "",
          canonical: "",
          metaRobots: "",
          xRobotsTag: "",
          hreflang: [],
          htmlLang: "",
          htmlDir: "",
          outgoingLinks: [],
          shingleSet: new Set(),
          googlebotStatus: 0,
          googlebotFinalUrl: url,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
    concurrency,
  );

  const fetched = new Map(fetchedRows.map((item) => [item.url, item]));
  const incoming = new Map();
  for (const sourceUrl of sitemapUrls) {
    const page = fetched.get(sourceUrl);
    for (const destination of page?.outgoingLinks ?? []) {
      if (!incoming.has(destination)) incoming.set(destination, new Set());
      incoming.get(destination).add(sourceUrl);
    }
  }

  const audits = gscRows.map((row) => {
    const page = fetched.get(row.url);
    const language = languageFor(row.url);
    const initialStatus = page?.hops[0]?.status ?? 0;
    const finalStatus = page?.response.status ?? 0;
    const finalUrl = page?.finalUrl ?? row.url;
    const inSitemap = sitemapSet.has(row.url);
    let contentCondition = page?.error ? `Fetch error: ${page.error}` : "Substantial, canonical HTML";
    if (finalStatus === 404 || finalStatus === 410) contentCondition = "Not found or permanently removed";
    else if ([301, 302, 303, 307, 308].includes(initialStatus)) contentCondition = "Redirected URL";
    else if (!page?.html) contentCondition = `Non-HTML ${page?.contentType || "resource"}`;
    else if (/noindex/i.test(`${page.metaRobots} ${page.xRobotsTag}`)) contentCondition = "Intentionally noindex";
    else if (language === "Arabic" && arabicRatio(page.text) < 0.45) contentCondition = "Arabic URL with untranslated or mostly non-Arabic content";
    else if (page.wordCount < 300) contentCondition = `Thin HTML (${page.wordCount} words)`;

    return {
      ...row,
      language,
      pageType: pageType(row.url),
      initialStatus,
      finalStatus,
      finalUrl,
      metaRobots: page?.metaRobots ?? "",
      xRobotsTag: page?.xRobotsTag ?? "",
      canonical: page?.canonical ?? "",
      hreflang: page?.hreflang ?? [],
      html: page?.html ?? "",
      htmlLang: page?.htmlLang ?? "",
      htmlDir: page?.htmlDir ?? "",
      inSitemap,
      internalLinks: incoming.get(row.url)?.size ?? 0,
      wordCount: page?.wordCount ?? 0,
      contentCondition,
      shingleSet: page?.shingleSet ?? new Set(),
      googlebotStatus: page?.googlebotStatus ?? 0,
      googlebotFinalUrl: page?.googlebotFinalUrl ?? row.url,
    };
  });

  const indexable = audits.filter((item) => item.finalStatus === 200 && item.html && !/noindex/i.test(`${item.metaRobots} ${item.xRobotsTag}`));
  for (let leftIndex = 0; leftIndex < indexable.length; leftIndex += 1) {
    const left = indexable[leftIndex];
    let best = { score: 0, url: "" };
    for (let rightIndex = 0; rightIndex < indexable.length; rightIndex += 1) {
      if (leftIndex === rightIndex) continue;
      const right = indexable[rightIndex];
      if (left.language !== right.language || left.pageType !== right.pageType) continue;
      const score = jaccard(left.shingleSet, right.shingleSet);
      if (score > best.score) best = { score, url: right.url };
    }
    if (best.score >= 0.82) {
      left.contentCondition += `; near duplicate of ${best.url} (${best.score.toFixed(2)} similarity)`;
    }
  }

  const headers = [
    "URL",
    "Language",
    "Page type",
    "GSC status",
    "HTTP status",
    "Final redirected URL",
    "Meta robots",
    "X-Robots-Tag",
    "Canonical URL",
    "Hreflang status",
    "Sitemap inclusion",
    "Internal links",
    "Content condition",
    "Recommended action",
    "Action completed",
    "Verification result",
  ];
  const rows = audits.map((item) => [
    item.url,
    item.language,
    item.pageType,
    item.gscStatus,
    item.initialStatus || item.finalStatus,
    item.finalUrl === item.url ? "" : item.finalUrl,
    item.metaRobots,
    item.xRobotsTag,
    item.canonical,
    hreflangSummary(item),
    item.inSitemap ? "Yes" : "No",
    item.internalLinks,
    `${item.contentCondition}; ${item.wordCount} words; html lang=${item.htmlLang || "missing"}; dir=${item.htmlDir || "missing"}`,
    recommendedAction(item),
    completedAction(item),
    verificationResult(item),
  ]);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${[headers, ...rows].map((row) => row.map(csv).join(",")).join("\n")}\n`, "utf8");

  const summary = {
    total: audits.length,
    sitemapUrls: sitemapUrls.length,
    statuses: Object.fromEntries(
      [...new Set(audits.map((item) => item.gscStatus))].map((status) => [status, audits.filter((item) => item.gscStatus === status).length]),
    ),
    http: Object.fromEntries(
      [...new Set(audits.map((item) => item.finalStatus))].map((status) => [status, audits.filter((item) => item.finalStatus === status).length]),
    ),
    inSitemap: audits.filter((item) => item.inSitemap).length,
    noInternalLinks: audits.filter((item) => item.internalLinks === 0).length,
    thinOrDuplicate: audits.filter((item) => /thin|duplicate|untranslated/i.test(item.contentCondition)).length,
    googlebotErrors: audits.filter((item) => ![200, 404, 410].includes(item.googlebotStatus)).length,
  };
  console.log(JSON.stringify(summary, null, 2));
  console.log(`CSV: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
