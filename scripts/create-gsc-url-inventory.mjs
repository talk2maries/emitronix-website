#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);

function option(name, fallback = "") {
  const exactIndex = args.indexOf(`--${name}`);
  if (exactIndex >= 0 && args[exactIndex + 1] && !args[exactIndex + 1].startsWith("--")) {
    return args[exactIndex + 1];
  }
  const prefix = `--${name}=`;
  return args.find((value) => value.startsWith(prefix))?.slice(prefix.length) || fallback;
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const baseUrl = new URL(option("base-url", "http://127.0.0.1:3000"));
const publicOrigin = option("public-origin", "https://emitronix.ae").replace(/\/$/, "");
const evidencePath = option("evidence", "");
const outputPath = option("output", "reports/gsc-url-inventory.csv");
const concurrency = positiveInteger(option("concurrency", "8"), 8);
const timeoutMs = positiveInteger(option("timeout-ms", "15000"), 15_000);

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((match) => decodeXml(match[1].trim()))
    .filter(Boolean);
}

function decodeHtml(value) {
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return decodeHtml(match?.[1] ?? match?.[2] ?? match?.[3] ?? "");
}

function canonicalFromHtml(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    if (attribute(match[0], "rel").toLowerCase().split(/\s+/).includes("canonical")) {
      return attribute(match[0], "href");
    }
  }
  return "";
}

function metaRobotsFromHtml(html) {
  const directives = [];
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const name = attribute(match[0], "name").toLowerCase();
    if (name === "robots" || name.endsWith("bot")) directives.push(attribute(match[0], "content"));
  }
  return directives.filter(Boolean).join(" | ");
}

function internalLinksFromHtml(html, pageUrl) {
  const links = new Set();
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attribute(match[0], "href");
    if (!href || href.startsWith("#")) continue;
    try {
      const target = new URL(href, pageUrl);
      if (target.origin !== new URL(publicOrigin).origin) continue;
      target.hash = "";
      links.add(`${target.pathname}${target.search}`);
    } catch {
      // Ignore malformed links; the main SEO validator reports them separately.
    }
  }
  return links;
}

function publicUrl(value) {
  const url = new URL(value, publicOrigin);
  url.protocol = "https:";
  url.host = new URL(publicOrigin).host;
  url.hash = "";
  return url.toString();
}

function requestUrl(value) {
  const url = new URL(value);
  return new URL(`${url.pathname}${url.search}`, baseUrl);
}

function pageType(url) {
  const pathname = new URL(url).pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/blog/")) return "Article";
  if (pathname.startsWith("/warehouse/")) return "Warehouse resource";
  if (pathname.includes("approval")) return "Authority approval";
  if (["/civil", "/interior", "/main-contracting", "/warehouse-construction", "/industrial-buildings", "/commercial-buildings", "/villa-construction", "/building-renovation", "/structural-works", "/design-build", "/turnkey-construction", "/project-management"].includes(pathname)) return "Service";
  if (pathname.startsWith("/_next/") || pathname.endsWith(".webmanifest")) return "Resource";
  if (pathname === "/search" || pathname === "/guest-post") return "Utility";
  return "Site page";
}

async function mapLimit(items, limit, task) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function fetchRecord(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(requestUrl(url), {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Emitronix-GSC-Inventory/1.0",
      },
    });
    const contentType = response.headers.get("content-type") || "";
    const html = contentType.toLowerCase().includes("text/html") ? await response.text() : "";
    const location = response.headers.get("location");
    const declaredCanonical = canonicalFromHtml(html);
    return {
      url,
      status: response.status,
      location: location ? publicUrl(new URL(location, url).toString()) : "",
      canonical: declaredCanonical ? new URL(declaredCanonical, url).toString() : "",
      robots: [response.headers.get("x-robots-tag") || "", metaRobotsFromHtml(html)]
        .filter(Boolean)
        .join(" | "),
      links: internalLinksFromHtml(html, url),
    };
  } catch (error) {
    return {
      url,
      status: 0,
      location: "",
      canonical: "",
      robots: "",
      links: new Set(),
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

function expandEvidence(raw) {
  const entries = [];
  for (const group of raw.groups ?? []) {
    for (const item of group.entries ?? []) {
      const entry = typeof item === "string" ? { path: item } : item;
      entries.push({ ...group.defaults, ...entry, gscReason: group.reason });
    }
  }
  return entries;
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}.`);
const sitemapUrls = extractSitemapUrls(await sitemapResponse.text()).map(publicUrl);
const sitemapSet = new Set(sitemapUrls);

const evidence = evidencePath
  ? expandEvidence(JSON.parse(await readFile(evidencePath, "utf8")))
  : [];
const evidenceByUrl = new Map(evidence.map((entry) => [publicUrl(entry.path), entry]));
const allUrls = [...new Set([...sitemapUrls, ...evidenceByUrl.keys()])];
const records = await mapLimit(allUrls, concurrency, fetchRecord);

const inbound = new Map();
for (const record of records) {
  for (const targetPath of record.links) {
    const target = publicUrl(targetPath);
    const sources = inbound.get(target) ?? new Set();
    sources.add(record.url);
    inbound.set(target, sources);
  }
}

const headers = [
  "URL",
  "language",
  "page type",
  "intended indexability",
  "GSC reason",
  "HTTP status",
  "robots/noindex",
  "declared canonical",
  "Google-selected canonical when available",
  "sitemap inclusion",
  "internal links",
  "evidence/root cause",
  "correction",
  "verification",
  "submission status",
  "remaining action",
];

const rows = records
  .sort((a, b) => a.url.localeCompare(b.url))
  .map((record) => {
    const item = evidenceByUrl.get(record.url) ?? {};
    const incomingCount = inbound.get(record.url)?.size ?? 0;
    const defaultVerification = record.error
      ? `Request failed: ${record.error}`
      : record.status >= 300 && record.status < 400
        ? `HTTP ${record.status} -> ${record.location}`
        : `HTTP ${record.status}; ${record.canonical === record.url ? "self canonical" : record.canonical ? `canonical ${record.canonical}` : "no HTML canonical"}; ${incomingCount} internal source page(s)`;
    return [
      record.url,
      new URL(record.url).pathname.startsWith("/ar") ? "Arabic" : "English",
      item.pageType || pageType(record.url),
      item.intendedIndexability || (sitemapSet.has(record.url) ? "Index" : "Exclude"),
      item.gscReason || "",
      record.status || "request failed",
      item.robotsNoindex || record.robots || "No noindex detected",
      record.canonical,
      item.googleSelectedCanonical || "Not available in aggregate report",
      sitemapSet.has(record.url) ? "Yes" : "No",
      incomingCount,
      item.rootCause || (sitemapSet.has(record.url) ? "Canonical sitemap URL" : "GSC sample outside the canonical sitemap"),
      item.correction || "No correction required",
      item.verification || defaultVerification,
      item.submissionStatus || "Not submitted individually",
      item.remainingAction || (sitemapSet.has(record.url) ? "Monitor normal crawling and indexing" : "None"),
    ];
  });

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n",
  "utf8",
);

console.log(`Wrote ${rows.length} URL records to ${outputPath}.`);
