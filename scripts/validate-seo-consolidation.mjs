#!/usr/bin/env node

import process from "node:process";

const baseUrl = new URL(process.argv.find((value) => /^https?:\/\//i.test(value)) || "http://127.0.0.1:3000");
const canonicalOrigin = "https://emitronix.ae";
const failures = [];

function fail(subject, message) {
  failures.push(`${subject}: ${message}`);
}

function decode(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function elementText(html, tag) {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return decode((match?.[1] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((item) => new RegExp(`\\bname=["']${name}["']`, "i").test(item));
  return decode(tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "");
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((item) => /\brel=["']canonical["']/i.test(item));
  return decode(tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || "");
}

function canonicalMatches(actual, path) {
  try {
    const actualUrl = new URL(actual);
    const expectedUrl = new URL(path, `${canonicalOrigin}/`);
    const normalizedActualPath = actualUrl.pathname.replace(/\/$/, "") || "/";
    const normalizedExpectedPath = expectedUrl.pathname.replace(/\/$/, "") || "/";
    return actualUrl.origin === expectedUrl.origin && normalizedActualPath === normalizedExpectedPath;
  } catch {
    return false;
  }
}

async function request(path, options = {}) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: options.redirect || "follow",
    headers: { "User-Agent": "Emitronix-SEO-Consolidation-Validator/1.0" },
  });
  const body = await response.text();
  return { response, body };
}

const sitemapResult = await request("/sitemap.xml");
if (!sitemapResult.response.ok) fail("/sitemap.xml", `expected 200, received ${sitemapResult.response.status}`);
const sitemapUrls = [...sitemapResult.body.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decode(match[1].trim()));
const sitemapPaths = new Set(sitemapUrls.map((value) => new URL(value).pathname.replace(/\/$/, "") || "/"));

if (sitemapUrls.length !== 87) fail("/sitemap.xml", `expected 87 URLs, received ${sitemapUrls.length}`);
if (sitemapPaths.size !== sitemapUrls.length) fail("/sitemap.xml", "contains duplicate paths");
if ([...sitemapPaths].some((path) => path.startsWith("/warehouse/"))) {
  fail("/sitemap.xml", "contains a noindex warehouse-silo URL");
}
if ([...sitemapPaths].filter((path) => path.includes("/blog/")).length !== 8) {
  fail("/sitemap.xml", "expected four English and four Arabic editorial article URLs");
}

const noindexSamples = [
  "/warehouse/warehouse-engineering",
  "/blog/warehouse-contractors-dubai-planning-guide",
  "/search",
  "/guest-post",
];

for (const path of noindexSamples) {
  const { response, body } = await request(path);
  if (response.status !== 200) fail(path, `expected 200 reviewable utility/page response, received ${response.status}`);
  if (!/\bnoindex\b/i.test(metaContent(body, "robots"))) fail(path, "missing noindex robots directive");
  if (sitemapPaths.has(path)) fail(path, "noindex URL is present in sitemap");
  if (!canonicalMatches(canonicalHref(body), path)) fail(path, `unexpected canonical ${canonicalHref(body)}`);
}

const redirects = [
  ["/warehouse/warehouse-construction-dubai", "/warehouse-construction"],
  ["/warehouse/warehouse-contractors-dubai", "/warehouse-construction"],
  ["/warehouse/industrial-warehouse-construction", "/warehouse-construction"],
  ["/warehouse/factory-construction", "/industrial-buildings"],
  ["/warehouse/industrial-building-construction", "/industrial-buildings"],
  ["/warehouse/warehouse-renovation", "/building-renovation"],
  ["/blog/warehouse-construction-cost-dubai", "/warehouse-construction"],
  ["/ar/blog/warehouse-construction-cost-dubai", "/ar/warehouse-construction"],
  ["/blog/warehouse-design-guide-uae", "/blog/warehouse-construction-dubai-planning-design-authority-approvals"],
  ["/blog/main-contractor-vs-general-contractor-dubai", "/main-contracting"],
  ["/ar/blog/main-contractor-vs-general-contractor-dubai", "/ar/main-contracting"],
  ["/blog/villa-construction-process-dubai", "/villa-construction"],
  ["/blog/construction-cost-saving-tips-dubai", "/blog/complete-guide-civil-construction-dubai-2026"],
  ["/ar/blog/construction-cost-saving-tips-dubai", "/ar/blog/complete-guide-civil-construction-dubai-2026"],
  ["/ar/blog/industrial-building-planning-guide-uae", "/ar/industrial-buildings"],
];

for (const [source, destination] of redirects) {
  const { response } = await request(source, { redirect: "manual" });
  const location = response.headers.get("location");
  const resolvedPath = location ? new URL(location, baseUrl).pathname : "";
  if (response.status !== 301) fail(source, `expected 301, received ${response.status}`);
  if (resolvedPath !== destination) fail(source, `expected ${destination}, received ${location || "no Location header"}`);
  if (!sitemapPaths.has(destination)) fail(source, `destination ${destination} is not in the clean sitemap`);
}

const priorityPages = [
  ["/", "Construction Company & Building Contractor Dubai | Emitronix", "Construction Company & Building Contractor in Dubai"],
  ["/warehouse-construction", "Warehouse Construction Company Dubai | Warehouse Contractor", "Warehouse Construction Company in Dubai"],
  ["/industrial-buildings", "Factory & Industrial Building Contractor Dubai | Emitronix", "Factory & Industrial Building Contractor in Dubai"],
  ["/approval", "Dubai Authority Approval Services | DM, DCD, DEWA & Trakhees", "Dubai Authority Approval Services for Construction Projects"],
  ["/dewa-approvals", "DEWA Approval Coordination Dubai | NOC & Inspection Support", "DEWA Approval Coordination in Dubai"],
];

for (const [path, expectedTitle, expectedH1] of priorityPages) {
  const { response, body } = await request(path);
  if (response.status !== 200) fail(path, `expected 200, received ${response.status}`);
  if (elementText(body, "title") !== expectedTitle) fail(path, `unexpected title: ${elementText(body, "title")}`);
  if (elementText(body, "h1") !== expectedH1) fail(path, `unexpected H1: ${elementText(body, "h1")}`);
  if (!/\bindex\b/i.test(metaContent(body, "robots")) || /\bnoindex\b/i.test(metaContent(body, "robots"))) {
    fail(path, `unexpected robots directive: ${metaContent(body, "robots")}`);
  }
  if (!canonicalMatches(canonicalHref(body), path)) fail(path, `canonical mismatch: ${canonicalHref(body)}`);
}

const robotsResult = await request("/robots.txt");
const cacheControl = robotsResult.response.headers.get("cache-control") || "";
if (!/s-maxage=300(?:\D|$)/i.test(cacheControl)) fail("/robots.txt", `unexpected cache-control: ${cacheControl}`);
if (!robotsResult.body.includes("Disallow: /search?*q=*")) fail("/robots.txt", "missing internal-search crawl-trap rule");

const homeResult = await request("/");
if (homeResult.body.includes('"@type":"SearchAction"')) fail("/", "still advertises internal search through SearchAction");

const warehouseResult = await request("/warehouse-construction");
if (!warehouseResult.body.includes('"uploadDate":"2026-07-28T00:00:00+04:00"')) {
  fail("/warehouse-construction", "VideoObject uploadDate is missing its UAE timezone");
}
const dewaResult = await request("/dewa-approvals");
if (!dewaResult.body.includes('"uploadDate":"2026-07-06T00:00:00+04:00"')) {
  fail("/dewa-approvals", "VideoObject uploadDate is missing its UAE timezone");
}

const blogResult = await request("/blog");
if (!/4(?:<!-- -->|\s)*construction articles/i.test(blogResult.body)) {
  fail("/blog", "small editorial library is not visible in the default view");
}

if (failures.length) {
  console.error(`SEO consolidation validation failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`SEO consolidation validation passed: ${sitemapUrls.length} sitemap URLs, ${redirects.length} redirects, ${noindexSamples.length} exclusions and ${priorityPages.length} priority pages.`);
}
