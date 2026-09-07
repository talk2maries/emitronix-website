#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import process from "node:process";

const args = process.argv.slice(2);

function option(name, fallback) {
  const exactIndex = args.indexOf(`--${name}`);
  if (exactIndex >= 0 && args[exactIndex + 1] && !args[exactIndex + 1].startsWith("--")) {
    return args[exactIndex + 1];
  }

  const prefix = `--${name}=`;
  const inline = args.find((value) => value.startsWith(prefix));
  return inline ? inline.slice(prefix.length) : fallback;
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const positionalBaseUrl = args.find((value) => /^https?:\/\//i.test(value));
const baseUrl = new URL(
  option("base-url", positionalBaseUrl || process.env.SEO_BASE_URL || "http://127.0.0.1:3000"),
);
const maxPages = positiveInteger(option("max-pages", process.env.SEO_MAX_PAGES), 500);
const maxLinkChecks = positiveInteger(option("max-link-checks", process.env.SEO_MAX_LINK_CHECKS), 300);
const concurrency = positiveInteger(option("concurrency", process.env.SEO_CONCURRENCY), 6);
const requestTimeoutMs = positiveInteger(option("timeout-ms", process.env.SEO_TIMEOUT_MS), 12_000);
const strictWarnings = args.includes("--strict") || process.env.SEO_STRICT === "1";

baseUrl.pathname = "/";
baseUrl.search = "";
baseUrl.hash = "";

const errors = [];
const warnings = [];
const crawledPaths = new Set();
const internalLinkPaths = new Set();
const sitemapPaths = new Set();
const sitemapCanonicalByPath = new Map();
const sitemapAlternatesByPath = new Map();
const hreflangTargetsByPath = new Map();
const schemaTypesSeen = new Set();
const titlePaths = new Map();
const descriptionPaths = new Map();
const publicImageUrls = new Set([
  "/images/emitronix-logo.svg",
  "/images/emitronix-logo.png",
  "/images/emitronix-social-card.png",
  "/icons/emitronix-mark.svg",
  "/icons/emitronix-icon-192.png",
  "/icons/emitronix-icon-512.png",
  "/favicon.svg",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
]);

function report(collection, subject, message) {
  collection.push({ subject, message });
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function textContent(value) {
  return decodeEntities(String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function attributes(tag) {
  const result = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;

  while ((match = pattern.exec(tag))) {
    const name = match[1].toLowerCase();
    if (name.startsWith("<") || name === "meta" || name === "link" || name === "html" || name === "a") {
      continue;
    }
    result[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }

  return result;
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function canonicalPath(url) {
  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  return pathname;
}

function localFetchUrl(pathname) {
  return new URL(pathname, baseUrl);
}

function shouldCheckPath(pathname) {
  if (!pathname.startsWith("/")) return false;
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/api/") ||
    pathname === "/search" ||
    pathname.startsWith("/search/")
  ) {
    return false;
  }
  return !/\.(?:avif|css|gif|ico|jpe?g|js|json|map|mp4|pdf|png|svg|webm|webp|woff2?)$/i.test(pathname);
}

async function request(url, redirect = "manual", requestHeaders = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    return await fetch(url, {
      redirect,
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8",
        "User-Agent": "Screaming Frog SEO Spider/23.2",
        ...requestHeaders,
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchText(pathname, redirect = "manual") {
  try {
    const response = await request(localFetchUrl(pathname), redirect);
    return { response, body: await response.text() };
  } catch (error) {
    report(errors, pathname, `Request failed: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

function addPublicImageUrl(value) {
  if (typeof value !== "string" || /^(?:data:|blob:)/i.test(value)) return;

  try {
    const url = new URL(value, baseUrl);
    if (
      url.pathname.startsWith("/_next/image") ||
      /\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i.test(url.pathname)
    ) {
      publicImageUrls.add(`${url.pathname}${url.search}`);
    }
  } catch {
    // Invalid image URLs are reported when the collected URLs are validated.
    publicImageUrls.add(value);
  }
}

function addPublicImageValue(value) {
  if (typeof value === "string") {
    addPublicImageUrl(value);
  } else if (Array.isArray(value)) {
    value.forEach(addPublicImageValue);
  } else if (value && typeof value === "object") {
    if ("url" in value) addPublicImageValue(value.url);
    if ("contentUrl" in value) addPublicImageValue(value.contentUrl);
  }
}

function validateJsonLd(pathname, html) {
  const scripts = [];
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const scriptAttributes = attributes(`<script ${match[1]}>`);
    if ((scriptAttributes.type || "").toLowerCase() === "application/ld+json") {
      scripts.push(match[2].trim());
    }
  }

  if (scripts.length === 0) {
    report(warnings, pathname, "No JSON-LD block found.");
    return;
  }

  scripts.forEach((source, index) => {
    let schema;
    try {
      schema = JSON.parse(decodeEntities(source));
    } catch (error) {
      report(errors, pathname, `JSON-LD block ${index + 1} is invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }

    const validateNode = (node, label) => {
      if (!node || typeof node !== "object" || Array.isArray(node)) return;

      const types = Array.isArray(node["@type"]) ? node["@type"] : node["@type"] ? [node["@type"]] : [];
      types.forEach((type) => schemaTypesSeen.add(type));

      if (types.includes("ProfessionalService")) {
        report(errors, pathname, `${label} uses deprecated Schema.org type ProfessionalService.`);
      }
      if (types.includes("ConstructionCompany")) {
        report(errors, pathname, `${label} uses non-existent Schema.org type ConstructionCompany.`);
      }
      if (types.includes("Service") && "keywords" in node) {
        report(errors, pathname, `${label} uses unsupported Service.keywords.`);
      }
      if (types.includes("Service") && "inLanguage" in node) {
        report(errors, pathname, `${label} uses unsupported Service.inLanguage.`);
      }
      if (types.includes("VideoObject") && typeof node.embedUrl === "string") {
        try {
          const embedUrl = new URL(node.embedUrl);
          if (embedUrl.hash) {
            report(errors, pathname, `${label} uses a fragment URL instead of an embeddable video-player URL.`);
          }
        } catch {
          report(errors, pathname, `${label} has an invalid VideoObject.embedUrl.`);
        }
      }
      if (types.includes("VideoObject")) {
        const timezoneQualifiedDateTime =
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/;
        if (
          typeof node.uploadDate !== "string" ||
          !timezoneQualifiedDateTime.test(node.uploadDate) ||
          Number.isNaN(Date.parse(node.uploadDate))
        ) {
          report(
            errors,
            pathname,
            `${label} must use a timezone-qualified ISO 8601 VideoObject.uploadDate.`,
          );
        }
      }

      Object.entries(node).forEach(([key, value]) => {
        if (key === "@context") return;
        if (["image", "logo", "thumbnailurl"].includes(key.toLowerCase())) {
          addPublicImageValue(value);
        }
        if (types.includes("ImageObject") && ["url", "contenturl"].includes(key.toLowerCase())) {
          addPublicImageValue(value);
        }
        if (Array.isArray(value)) {
          value.forEach((item, itemIndex) => validateNode(item, `${label}.${key}[${itemIndex}]`));
        } else {
          validateNode(value, `${label}.${key}`);
        }
      });
    };

    const roots = Array.isArray(schema) ? schema : [schema];
    roots.forEach((root, rootIndex) => {
      if (!root || typeof root !== "object") {
        report(errors, pathname, `JSON-LD block ${index + 1}.${rootIndex + 1} is not an object.`);
        return;
      }

      if (!("@context" in root)) {
        report(warnings, pathname, `JSON-LD block ${index + 1}.${rootIndex + 1} has no @context.`);
      }

      if (Array.isArray(root["@graph"])) {
        root["@graph"].forEach((node, nodeIndex) => {
          if (!node || typeof node !== "object" || !node["@type"]) {
            report(errors, pathname, `JSON-LD graph node ${index + 1}.${nodeIndex + 1} has no @type.`);
          }
        });
      } else if (!root["@type"]) {
        report(errors, pathname, `JSON-LD block ${index + 1}.${rootIndex + 1} has no @type.`);
      }

      validateNode(root, `JSON-LD block ${index + 1}.${rootIndex + 1}`);
    });
  });
}

function collectInternalLinks(html, canonicalOrigin) {
  for (const tag of tags(html, "a")) {
    const href = attributes(tag).href;
    if (!href || href.startsWith("#") || /^(?:mailto:|tel:|sms:|javascript:|data:)/i.test(href)) continue;

    try {
      const url = new URL(href, canonicalOrigin);
      if (url.origin !== canonicalOrigin.origin && url.origin !== baseUrl.origin) continue;
      const pathname = canonicalPath(url);
      if (shouldCheckPath(pathname)) internalLinkPaths.add(pathname);
    } catch {
      report(warnings, canonicalOrigin.pathname, `Could not parse internal link: ${href}`);
    }
  }
}

function splitDocument(pathname, html) {
  const headMatches = [...html.matchAll(/<head\b[^>]*>([\s\S]*?)<\/head>/gi)];
  if (headMatches.length !== 1) {
    report(errors, pathname, `Expected one complete <head>; found ${headMatches.length}.`);
    return { head: "", body: html };
  }

  const head = headMatches[0][1];
  const bodyStart = headMatches[0].index + headMatches[0][0].length;
  return { head, body: html.slice(bodyStart) };
}

function recordUniqueValue(registry, value, pathname) {
  if (!value) return;
  const paths = registry.get(value) ?? [];
  paths.push(pathname);
  registry.set(value, paths);
}

function validateNoBodyMetadata(pathname, body) {
  const bodyTitles = tags(body, "title");
  const bodyMeta = tags(body, "meta").map(attributes).filter((item) => {
    const name = (item.name || "").toLowerCase();
    const property = (item.property || "").toLowerCase();
    return (
      name === "description" ||
      name === "robots" ||
      name === "googlebot" ||
      name.startsWith("twitter:") ||
      property.startsWith("og:")
    );
  });
  const bodyLinks = tags(body, "link").map(attributes).filter((item) => {
    const rel = (item.rel || "").toLowerCase().split(/\s+/);
    return rel.includes("canonical") || Boolean(item.hreflang);
  });

  if (bodyTitles.length > 0) {
    report(errors, pathname, `Found ${bodyTitles.length} title tag(s) outside <head>.`);
  }
  if (bodyMeta.length > 0) {
    report(errors, pathname, `Found ${bodyMeta.length} SEO meta tag(s) outside <head>.`);
  }
  if (bodyLinks.length > 0) {
    report(errors, pathname, `Found ${bodyLinks.length} canonical/hreflang link tag(s) outside <head>.`);
  }
}

function validateHtmlPage(pathname, html, canonicalOrigin) {
  const { head, body } = splitDocument(pathname, html);
  const isArabicRoute = pathname === "/ar" || pathname.startsWith("/ar/");
  validateNoBodyMetadata(pathname, body);

  const titleMatches = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) => textContent(match[1]));
  if (titleMatches.length !== 1 || !titleMatches[0]) {
    report(errors, pathname, `Expected one non-empty <title>; found ${titleMatches.length}.`);
  } else if (titleMatches[0].length > 70) {
    report(warnings, pathname, `Title is ${titleMatches[0].length} characters; review for truncation.`);
  }
  if (titleMatches[0]) {
    const containsArabic = /[\u0600-\u06ff]/.test(titleMatches[0]);
    if (isArabicRoute && !containsArabic) report(errors, pathname, "Arabic title does not contain Arabic text.");
    if (!isArabicRoute && containsArabic) report(errors, pathname, "English title contains Arabic text.");
  }
  recordUniqueValue(titlePaths, titleMatches[0], pathname);

  const metaTags = tags(head, "meta").map(attributes);
  const descriptions = metaTags.filter((item) => item.name?.toLowerCase() === "description").map((item) => item.content?.trim()).filter(Boolean);
  if (descriptions.length !== 1) {
    report(errors, pathname, `Expected one meta description; found ${descriptions.length}.`);
  } else if (descriptions[0].length < 50 || descriptions[0].length > 180) {
    report(warnings, pathname, `Meta description is ${descriptions[0].length} characters.`);
  }
  if (descriptions[0]) {
    const containsArabic = /[\u0600-\u06ff]/.test(descriptions[0]);
    if (isArabicRoute && !containsArabic) report(errors, pathname, "Arabic meta description does not contain Arabic text.");
    if (!isArabicRoute && containsArabic) report(errors, pathname, "English meta description contains Arabic text.");
  }
  recordUniqueValue(descriptionPaths, descriptions[0], pathname);

  const robotTags = metaTags
    .filter((item) => item.name?.toLowerCase() === "robots")
    .map((item) => item.content?.toLowerCase() || "");
  if (robotTags.length !== 1) {
    report(errors, pathname, `Expected one robots meta tag; found ${robotTags.length}.`);
  }
  const robots = robotTags.join(",");
  if (robots.includes("noindex")) {
    report(errors, pathname, "Sitemap URL declares noindex.");
  }
  if (!robots.includes("index") || !robots.includes("follow")) {
    report(errors, pathname, "Sitemap URL does not explicitly declare index, follow.");
  }

  const linkTags = tags(head, "link").map(attributes);
  const canonicals = linkTags.filter((item) => (item.rel || "").toLowerCase().split(/\s+/).includes("canonical"));
  if (canonicals.length !== 1 || !canonicals[0].href) {
    report(errors, pathname, `Expected one canonical link; found ${canonicals.length}.`);
  } else {
    try {
      const canonical = new URL(canonicals[0].href);
      if (canonical.origin !== canonicalOrigin.origin) {
        report(errors, pathname, `Canonical origin ${canonical.origin} differs from sitemap origin ${canonicalOrigin.origin}.`);
      }
      if (canonical.search || canonical.hash) {
        report(errors, pathname, "Canonical URL contains a query string or fragment.");
      }
      if (canonicalPath(canonical) !== canonicalPath(canonicalOrigin)) {
        report(errors, pathname, `Canonical path ${canonical.pathname} differs from sitemap path ${canonicalOrigin.pathname}.`);
      }
      const expectedCanonicalHref = sitemapCanonicalByPath.get(pathname);
      if (expectedCanonicalHref && canonicals[0].href !== expectedCanonicalHref) {
        report(errors, pathname, `Canonical ${canonicals[0].href} differs from sitemap URL ${expectedCanonicalHref}.`);
      }
    } catch {
      report(errors, pathname, `Canonical is not an absolute URL: ${canonicals[0].href}`);
    }
  }

  const htmlTags = tags(html, "html").map(attributes);
  const expectedHtmlLang = isArabicRoute ? "ar-AE" : "en-AE";
  const expectedDirection = isArabicRoute ? "rtl" : "ltr";
  if (htmlTags.length !== 1) {
    report(errors, pathname, `Expected one html element; found ${htmlTags.length}.`);
  } else {
    if (htmlTags[0].lang !== expectedHtmlLang) {
      report(errors, pathname, `Expected html lang=${expectedHtmlLang}; received ${htmlTags[0].lang || "none"}.`);
    }
    if (htmlTags[0].dir?.toLowerCase() !== expectedDirection) {
      report(errors, pathname, `Expected html dir=${expectedDirection}; received ${htmlTags[0].dir || "none"}.`);
    }
  }

  const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) ?? [];
  if (h1Matches.length !== 1 || !textContent(h1Matches[0])) {
    report(errors, pathname, `Expected one non-empty H1; found ${h1Matches.length}.`);
  }

  for (const property of ["og:title", "og:description", "og:image"]) {
    if (!metaTags.some((item) => item.property?.toLowerCase() === property && item.content)) {
      report(warnings, pathname, `Missing ${property}.`);
    }
  }

  const expectedOgUrl = sitemapCanonicalByPath.get(pathname) ?? canonicalOrigin.href;
  const expectedOgLocale = isArabicRoute ? "ar_AE" : "en_AE";
  const expectedOgAlternateLocale = isArabicRoute ? "en_AE" : "ar_AE";
  const ogUrls = metaTags
    .filter((item) => item.property?.toLowerCase() === "og:url")
    .map((item) => item.content)
    .filter(Boolean);
  const ogLocales = metaTags
    .filter((item) => item.property?.toLowerCase() === "og:locale")
    .map((item) => item.content)
    .filter(Boolean);
  const ogAlternateLocales = metaTags
    .filter((item) => item.property?.toLowerCase() === "og:locale:alternate")
    .map((item) => item.content)
    .filter(Boolean);
  if (ogUrls.length !== 1 || ogUrls[0] !== expectedOgUrl) {
    report(errors, pathname, `Expected one og:url equal to ${expectedOgUrl}; received ${ogUrls.join(", ") || "none"}.`);
  }
  if (ogLocales.length !== 1 || ogLocales[0] !== expectedOgLocale) {
    report(errors, pathname, `Expected one og:locale ${expectedOgLocale}; received ${ogLocales.join(", ") || "none"}.`);
  }

  metaTags
    .filter((item) => {
      const property = item.property?.toLowerCase();
      const name = item.name?.toLowerCase();
      return property === "og:image" || name === "twitter:image";
    })
    .forEach((item) => addPublicImageUrl(item.content));

  linkTags
    .filter((item) => (item.rel || "").toLowerCase().split(/\s+/).some((rel) => rel.includes("icon")))
    .forEach((item) => addPublicImageUrl(item.href));

  tags(html, "img").forEach((tag) => {
    const imageAttributes = attributes(tag);
    addPublicImageUrl(imageAttributes.src);
    String(imageAttributes.srcset || "")
      .split(",")
      .map((candidate) => candidate.trim().split(/\s+/)[0])
      .filter(Boolean)
      .forEach(addPublicImageUrl);
  });

  const hreflangLinks = linkTags.filter((item) => item.hreflang);
  const expectedHreflangs = sitemapAlternatesByPath.get(pathname) ?? new Map();
  const hreflangCodes = new Set();
  if (hreflangLinks.length !== expectedHreflangs.size) {
    report(errors, pathname, `Expected ${expectedHreflangs.size} hreflang links; found ${hreflangLinks.length}.`);
  }
  const hreflangTargets = new Set();
  hreflangLinks.forEach((item) => {
    const code = item.hreflang.toLowerCase();
    if (hreflangCodes.has(code)) {
      report(errors, pathname, `Duplicate hreflang ${item.hreflang}.`);
    }
    hreflangCodes.add(code);
    const expectedHref = expectedHreflangs.get(code);
    if (!expectedHref) {
      report(errors, pathname, `Unexpected hreflang ${item.hreflang}.`);
    } else if (item.href !== expectedHref) {
      report(errors, pathname, `hreflang ${item.hreflang} expected ${expectedHref}; received ${item.href || "none"}.`);
    }
    try {
      const target = new URL(item.href);
      if (target.origin === canonicalOrigin.origin) {
        const targetPath = canonicalPath(target);
        hreflangTargets.add(targetPath);
        if (!sitemapPaths.has(targetPath)) {
          report(errors, pathname, `hreflang ${item.hreflang} targets non-sitemap path ${targetPath}.`);
        }
      }
    } catch {
      report(errors, pathname, `hreflang ${item.hreflang} has an invalid URL.`);
    }
  });
  for (const code of expectedHreflangs.keys()) {
    if (!hreflangCodes.has(code)) report(errors, pathname, `Missing required hreflang ${code}.`);
  }
  if (expectedHreflangs.size > 0) {
    if (ogAlternateLocales.length !== 1 || ogAlternateLocales[0] !== expectedOgAlternateLocale) {
      report(
        errors,
        pathname,
        `Expected one og:locale:alternate ${expectedOgAlternateLocale}; received ${ogAlternateLocales.join(", ") || "none"}.`,
      );
    }
  } else if (ogAlternateLocales.length > 0) {
    report(errors, pathname, `Untranslated page emits og:locale:alternate ${ogAlternateLocales.join(", ")}.`);
  }
  hreflangTargetsByPath.set(pathname, hreflangTargets);

  validateJsonLd(pathname, html);
  collectInternalLinks(html, canonicalOrigin);
}

async function validateDynamicMetadata(pathname, { canonicalRequired = true } = {}) {
  const result = await fetchText(pathname);
  if (!result) return;
  const { response, body: html } = result;
  if (response.status !== 200) {
    report(errors, pathname, `Expected dynamic metadata check to return 200; received ${response.status}.`);
    return;
  }

  const { head, body } = splitDocument(pathname, html);
  validateNoBodyMetadata(pathname, body);
  const headTitles = tags(head, "title");
  const headDescriptions = tags(head, "meta")
    .map(attributes)
    .filter((item) => item.name?.toLowerCase() === "description");
  const headRobots = tags(head, "meta")
    .map(attributes)
    .filter((item) => item.name?.toLowerCase() === "robots");
  const headCanonicals = tags(head, "link")
    .map(attributes)
    .filter((item) => (item.rel || "").toLowerCase().split(/\s+/).includes("canonical"));

  if (headTitles.length !== 1) report(errors, pathname, `Expected one head title; found ${headTitles.length}.`);
  if (headDescriptions.length !== 1) report(errors, pathname, `Expected one head description; found ${headDescriptions.length}.`);
  if (headRobots.length !== 1) report(errors, pathname, `Expected one head robots directive; found ${headRobots.length}.`);
  if (canonicalRequired && headCanonicals.length !== 1) {
    report(errors, pathname, `Expected one head canonical; found ${headCanonicals.length}.`);
  }
  if (!canonicalRequired && headCanonicals.length !== 0) {
    report(errors, pathname, `Expected no canonical on private utility route; found ${headCanonicals.length}.`);
  }
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(workers);
}

function parseRobotsGroups(body) {
  const groups = new Map();
  for (const block of body.split(/\n\s*\n/)) {
    const lines = block
      .split(/\r?\n/)
      .map((line) => line.replace(/#.*$/, "").trim())
      .filter(Boolean);
    const userAgent = lines.find((line) => /^user-agent:/i.test(line))?.split(":").slice(1).join(":").trim();
    if (userAgent) groups.set(userAgent.toLowerCase(), lines);
  }
  return groups;
}

function robotsPatternMatches(pattern, pathWithQuery) {
  const anchored = pattern.endsWith("$");
  const source = (anchored ? pattern.slice(0, -1) : pattern)
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");
  return new RegExp(`^${source}${anchored ? "$" : ""}`).test(pathWithQuery);
}

function robotsAllowsPath(groupLines, pathWithQuery) {
  const matchingRules = groupLines
    .map((line) => {
      const match = line.match(/^(allow|disallow):\s*(.*)$/i);
      if (!match || !match[2] || !robotsPatternMatches(match[2], pathWithQuery)) return null;
      return {
        allow: match[1].toLowerCase() === "allow",
        specificity: match[2].replace(/[*$]/g, "").length,
      };
    })
    .filter(Boolean)
    .sort((left, right) => right.specificity - left.specificity || Number(right.allow) - Number(left.allow));

  return matchingRules[0]?.allow ?? true;
}

async function validateRobots() {
  const result = await fetchText("/robots.txt");
  if (!result) return;
  const { response, body } = result;
  if (response.status !== 200) {
    report(errors, "/robots.txt", `Expected 200; received ${response.status}.`);
    return;
  }

  const requiredAgents = [
    "*",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Googlebot",
    "Googlebot-Image",
    "Bingbot",
  ];
  const requiredDisallows = [
    "disallow: /admin/",
    "disallow: /api/",
    "disallow: /private/",
    "disallow: /auth/",
    "disallow: /dashboard/",
    "disallow: /search?*q=*",
  ];
  const forbiddenDisallows = [
    "disallow: /*?*q=*",
    "disallow: /*?*query=*",
    "disallow: /*?*search=*",
    "disallow: /images/",
    "disallow: /icons/",
    "disallow: /_next/image",
    "disallow: /_next/static/",
  ];
  const requiredAllows = [
    "allow: /",
    "allow: /_next/image",
    "allow: /_next/static/",
    "allow: /images/",
    "allow: /icons/",
    "allow: /favicon",
    "allow: /apple-touch-icon.png",
    "allow: /api/cookie-consent/config",
  ];
  const groups = parseRobotsGroups(body);

  requiredAgents.forEach((agent) => {
    const lines = groups.get(agent.toLowerCase());
    if (!lines) {
      report(errors, "/robots.txt", `Missing crawler group for ${agent}.`);
      return;
    }
    const normalized = lines.map((line) => line.toLowerCase());
    requiredAllows.forEach((rule) => {
      if (!normalized.includes(rule)) {
        report(errors, "/robots.txt", `${agent} is missing ${rule}.`);
      }
    });
    requiredDisallows.forEach((rule) => {
      if (!normalized.includes(rule)) {
        report(errors, "/robots.txt", `${agent} is missing ${rule}.`);
      }
    });
  });

  const normalizedLines = body
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, "").trim().toLowerCase())
    .filter(Boolean);
  forbiddenDisallows.forEach((rule) => {
    if (normalizedLines.includes(rule)) {
      report(errors, "/robots.txt", `Public image crawlability is blocked by ${rule}.`);
    }
  });

  if (!/^sitemap:\s*https:\/\//im.test(body)) {
    report(warnings, "/robots.txt", "No absolute HTTPS sitemap directive found.");
  }

  return body;
}

async function validatePublicImages(robotsBody) {
  if (!robotsBody) return;

  const groups = parseRobotsGroups(robotsBody);
  const imageCrawlerRules = groups.get("googlebot-image") || groups.get("*");
  if (!imageCrawlerRules) {
    report(errors, "/robots.txt", "No applicable Googlebot-Image or wildcard crawler group found.");
    return;
  }

  const imageUrls = [...publicImageUrls];
  await mapLimit(imageUrls, concurrency, async (value) => {
    let imageUrl;
    try {
      imageUrl = new URL(value, baseUrl);
    } catch {
      report(errors, value, "Image URL is invalid.");
      return;
    }

    const pathWithQuery = `${imageUrl.pathname}${imageUrl.search}`;
    if (!robotsAllowsPath(imageCrawlerRules, pathWithQuery)) {
      report(errors, pathWithQuery, "Blocked for Googlebot-Image by robots.txt.");
      return;
    }

    if (imageUrl.origin !== baseUrl.origin && imageUrl.hostname !== "emitronix.ae") {
      report(warnings, value, "External image URL requires separate host-level crawl validation.");
      return;
    }

    try {
      const response = await request(localFetchUrl(pathWithQuery), "manual", {
        Accept: "image/avif,image/webp,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "Googlebot-Image/1.0",
      });
      const contentType = response.headers.get("content-type")?.toLowerCase() || "";
      const xRobotsTag = response.headers.get("x-robots-tag")?.toLowerCase() || "";

      if (response.status !== 200) {
        report(errors, pathWithQuery, `Public image returned ${response.status}; expected 200.`);
      }
      if (!contentType.startsWith("image/")) {
        report(errors, pathWithQuery, `Public image has non-image content type ${contentType || "(missing)"}.`);
      }
      if (/(?:^|[,\s])(noindex|noimageindex|none)(?:$|[,\s])/.test(xRobotsTag)) {
        report(errors, pathWithQuery, `Public image has blocking X-Robots-Tag: ${xRobotsTag}.`);
      }

      await response.arrayBuffer();
    } catch (error) {
      report(errors, pathWithQuery, `Image request failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  return imageUrls.length;
}

async function validateTextAsset(pathname, marker) {
  const result = await fetchText(pathname);
  if (!result) return null;
  const { response, body } = result;
  if (response.status !== 200) {
    report(errors, pathname, `Expected 200; received ${response.status}.`);
    return null;
  }
  if (!response.headers.get("content-type")?.toLowerCase().includes("text/plain")) {
    report(errors, pathname, "Expected a text/plain content type.");
  }
  if (!body.includes(marker)) {
    report(errors, pathname, `Expected content marker: ${marker}`);
  }
  return body;
}

async function serviceAliasesFromSource() {
  try {
    const source = await readFile(new URL("../data/site.ts", import.meta.url), "utf8");
    const aliases = [];
    const blockPattern = /makeService\(\{([\s\S]*?)\n\s{2}\}\),/g;
    let match;

    while ((match = blockPattern.exec(source))) {
      const slug = match[1].match(/\bslug:\s*"([^"]+)"/)?.[1];
      const href = match[1].match(/\bhref:\s*"([^"]+)"/)?.[1];
      if (!slug || !href) continue;
      const hrefSlug = href.replace(/^\//, "");
      for (const alias of new Set([`/services/${slug}`, `/services/${hrefSlug}`])) {
        aliases.push([alias, href], [`/ar${alias}`, `/ar${href}`]);
      }
    }

    return aliases;
  } catch (error) {
    report(warnings, "aliases", `Could not read service aliases from data/site.ts: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

async function validateRedirect(source, destination) {
  const result = await fetchText(source);
  if (!result) return;
  const { response } = result;
  if (![301, 308].includes(response.status)) {
    report(errors, source, `Expected permanent redirect to ${destination}; received ${response.status}.`);
    return;
  }

  const location = response.headers.get("location");
  if (!location) {
    report(errors, source, "Permanent redirect has no Location header.");
    return;
  }

  const resolved = new URL(location, baseUrl);
  if (canonicalPath(resolved) !== canonicalPath(new URL(destination, baseUrl))) {
    report(errors, source, `Redirect destination ${resolved.pathname} does not match ${destination}.`);
  }
}

async function main() {
  console.log(`Validating ${baseUrl.origin} (max ${maxPages} sitemap pages, concurrency ${concurrency})`);

  const robotsBody = await validateRobots();
  const shortLlms = await validateTextAsset("/llms.txt", "# Emitronix Contracting LLC");
  await validateTextAsset("/llms-full.txt", "# Emitronix Contracting LLC: Full Reference");
  if (shortLlms && !shortLlms.includes("/llms-full.txt")) {
    report(errors, "/llms.txt", "Short file does not link to /llms-full.txt.");
  }

  const sitemapResult = await fetchText("/sitemap.xml");
  let sitemapUrls = [];

  if (sitemapResult) {
    const { response, body } = sitemapResult;
    if (response.status !== 200) {
      report(errors, "/sitemap.xml", `Expected 200; received ${response.status}.`);
    } else {
      sitemapUrls = [...body.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
        .map((match) => decodeEntities(match[1].trim()))
        .filter(Boolean);
      if (sitemapUrls.length === 0) {
        report(errors, "/sitemap.xml", "No <loc> URLs found.");
      }
      if (new Set(sitemapUrls).size !== sitemapUrls.length) {
        report(errors, "/sitemap.xml", "Duplicate <loc> URLs found.");
      }

      sitemapUrls.forEach((value) => {
        try {
          const url = new URL(value);
          const pathname = canonicalPath(url);
          sitemapPaths.add(pathname);
          sitemapCanonicalByPath.set(pathname, value);
          if (url.protocol !== "https:" || url.hostname !== "emitronix.ae") {
            report(errors, "/sitemap.xml", `Non-preferred sitemap URL ${value}.`);
          }
          if (url.search || url.hash) {
            report(errors, "/sitemap.xml", `Sitemap URL contains a query string or fragment: ${value}.`);
          }
          if (url.pathname !== "/" && url.pathname.endsWith("/")) {
            report(errors, "/sitemap.xml", `Sitemap URL violates the no-trailing-slash policy: ${value}.`);
          }
        } catch {
          // The absolute-URL check below reports the parse error.
        }
      });

      for (const blockMatch of body.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
        const block = blockMatch[1];
        const location = block.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim();
        if (!location) continue;

        let pathname;
        try {
          pathname = canonicalPath(new URL(decodeEntities(location)));
        } catch {
          continue;
        }

        const alternates = new Map();
        for (const linkMatch of block.matchAll(/<xhtml:link\b[^>]*>/gi)) {
          const item = attributes(linkMatch[0]);
          const code = item.hreflang?.toLowerCase();
          if (!code || !item.href) continue;
          if (alternates.has(code)) {
            report(errors, pathname, `Duplicate sitemap hreflang ${item.hreflang}.`);
          }
          alternates.set(code, item.href);
        }
        sitemapAlternatesByPath.set(pathname, alternates);
      }

      for (const [pathname, alternates] of sitemapAlternatesByPath.entries()) {
        if (alternates.size === 0) continue;
        const requiredCodes = ["en", "en-ae", "ar", "ar-ae", "x-default"];
        if (alternates.size !== requiredCodes.length) {
          report(errors, pathname, `Expected ${requiredCodes.length} sitemap hreflang entries; found ${alternates.size}.`);
        }
        requiredCodes.forEach((code) => {
          if (!alternates.has(code)) report(errors, pathname, `Missing sitemap hreflang ${code}.`);
        });
        if (alternates.get("en") !== alternates.get("en-ae")) {
          report(errors, pathname, "Sitemap hreflang en and en-AE must use the same URL.");
        }
        if (alternates.get("ar") !== alternates.get("ar-ae")) {
          report(errors, pathname, "Sitemap hreflang ar and ar-AE must use the same URL.");
        }
        if (alternates.get("x-default") !== alternates.get("en")) {
          report(errors, pathname, "Sitemap x-default must use the English URL.");
        }
        for (const [code, href] of alternates.entries()) {
          try {
            const target = new URL(href);
            if (target.protocol !== "https:" || target.hostname !== "emitronix.ae") {
              report(errors, pathname, `Sitemap hreflang ${code} uses non-preferred URL ${href}.`);
            }
            if (!sitemapPaths.has(canonicalPath(target))) {
              report(errors, pathname, `Sitemap hreflang ${code} targets non-sitemap URL ${href}.`);
            }
          } catch {
            report(errors, pathname, `Sitemap hreflang ${code} is not an absolute URL: ${href}.`);
          }
        }
      }

      for (const [pathname, alternates] of sitemapAlternatesByPath.entries()) {
        if (alternates.size === 0) continue;
        for (const href of new Set(alternates.values())) {
          let targetPath;
          try {
            targetPath = canonicalPath(new URL(href));
          } catch {
            continue;
          }
          const reciprocal = sitemapAlternatesByPath.get(targetPath);
          for (const [code, expectedHref] of alternates.entries()) {
            if (reciprocal?.get(code) !== expectedHref) {
              report(errors, pathname, `Sitemap hreflang cluster is not reciprocal with ${targetPath} for ${code}.`);
            }
          }
        }
      }

      const requiredSitemapPaths = [
        "/",
        "/about",
        "/founder",
        "/leadership",
        "/company-information",
        "/services",
        "/approval",
        "/resources",
        "/faqs",
        "/locations",
        "/locations/dubai",
        "/contact",
        "/editorial-policy",
        "/technical-review-policy",
        "/corrections-policy",
        "/disclaimer",
        "/ar",
        "/ar/about",
        "/ar/services",
        "/ar/approval",
        "/ar/projects",
        "/ar/industries",
        "/ar/careers",
        "/ar/blog",
        "/ar/resources",
        "/ar/contact",
        "/ar/civil",
      ];
      requiredSitemapPaths.forEach((pathname) => {
        if (!sitemapPaths.has(pathname)) {
          report(errors, "/sitemap.xml", `Missing required canonical route ${pathname}.`);
        }
      });
    }
  }

  const canonicalOrigins = sitemapUrls.map((value) => {
    try {
      return new URL(value);
    } catch {
      report(errors, "/sitemap.xml", `Invalid absolute URL: ${value}`);
      return null;
    }
  }).filter(Boolean);

  const expectedOrigin = canonicalOrigins[0]?.origin;
  canonicalOrigins.forEach((url) => {
    if (url.origin !== expectedOrigin) {
      report(errors, "/sitemap.xml", `Mixed sitemap origin: ${url.origin}`);
    }
  });

  const uniqueCanonicalPages = Array.from(
    new Map(canonicalOrigins.map((url) => [canonicalPath(url), url])).values(),
  );
  if (uniqueCanonicalPages.length > maxPages) {
    report(warnings, "/sitemap.xml", `Crawling the first ${maxPages} of ${uniqueCanonicalPages.length} URLs.`);
  }

  await mapLimit(uniqueCanonicalPages.slice(0, maxPages), concurrency, async (canonicalUrl) => {
    const pathname = canonicalPath(canonicalUrl);
    const result = await fetchText(pathname);
    if (!result) return;
    const { response, body } = result;

    if (response.status >= 300 && response.status < 400) {
      report(errors, pathname, `Sitemap URL redirects with ${response.status}.`);
      return;
    }
    if (response.status !== 200) {
      report(errors, pathname, `Expected 200; received ${response.status}.`);
      return;
    }
    if (!response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
      report(errors, pathname, "Sitemap URL is not text/html.");
      return;
    }

    const expectedContentLanguage =
      pathname === "/ar" || pathname.startsWith("/ar/") ? "ar-AE" : "en-AE";
    if (response.headers.get("content-language") !== expectedContentLanguage) {
      report(
        errors,
        pathname,
        `Expected Content-Language ${expectedContentLanguage}; received ${response.headers.get("content-language") || "none"}.`,
      );
    }

    crawledPaths.add(pathname);
    validateHtmlPage(pathname, body, canonicalUrl);
  });

  for (const [sourcePath, targets] of hreflangTargetsByPath.entries()) {
    for (const targetPath of targets) {
      const returnTargets = hreflangTargetsByPath.get(targetPath);
      if (targetPath !== sourcePath && (!returnTargets || !returnTargets.has(sourcePath))) {
        report(errors, sourcePath, `hreflang target ${targetPath} has no reciprocal link to ${sourcePath}.`);
      }
    }
  }

  for (const [title, paths] of titlePaths.entries()) {
    if (paths.length > 1) {
      report(errors, "titles", `Duplicate title ${JSON.stringify(title)} on ${paths.join(", ")}.`);
    }
  }
  for (const [description, paths] of descriptionPaths.entries()) {
    if (paths.length > 1) {
      report(errors, "descriptions", `Duplicate meta description on ${paths.join(", ")}.`);
    }
  }

  await validateDynamicMetadata("/search?q=construction");
  await validateDynamicMetadata("/admin/cookie-consent", { canonicalRequired: false });

  const checkedImageCount = await validatePublicImages(robotsBody);

  const requiredSchemaTypes = [
    "Organization",
    "LocalBusiness",
    "GeneralContractor",
    "Person",
    "WebSite",
    "WebPage",
    "Service",
    "Article",
    "BlogPosting",
    "FAQPage",
    "ContactPage",
    "AboutPage",
    "BreadcrumbList",
    "ImageObject",
    "VideoObject",
  ];
  requiredSchemaTypes.forEach((type) => {
    if (!schemaTypesSeen.has(type)) {
      report(errors, "schema", `Required schema type ${type} was not found on crawled canonical pages.`);
    }
  });

  const aliases = [
    ["/approvals", "/approval"],
    ["/ar/approvals", "/ar/approval"],
    ["/ABOUT/", "/about"],
    ["/en/services", "/services"],
    ["/ar/ar/services", "/ar/services"],
    ["/AR/SERVICES/", "/ar/services"],
    ...(await serviceAliasesFromSource()),
  ];
  await mapLimit(aliases, concurrency, ([source, destination]) => validateRedirect(source, destination));

  const allUncrawledLinks = [...internalLinkPaths].filter((pathname) => !crawledPaths.has(pathname));
  const uncrawledLinks = allUncrawledLinks.slice(0, maxLinkChecks);
  if (uncrawledLinks.length < allUncrawledLinks.length) {
    report(warnings, "links", `Internal link checks were capped at ${maxLinkChecks}.`);
  }

  await mapLimit(uncrawledLinks, concurrency, async (pathname) => {
    const result = await fetchText(pathname);
    if (!result) return;
    const { response } = result;
    if (response.status >= 400) {
      report(errors, pathname, `Internal link target returned ${response.status}.`);
    } else if (response.status >= 300) {
      report(warnings, pathname, `Internal link target redirects with ${response.status}.`);
    }
  });

  const printIssues = (label, collection) => {
    if (collection.length === 0) return;
    console.log(`\n${label} (${collection.length})`);
    collection.forEach(({ subject, message }) => console.log(`- ${subject}: ${message}`));
  };

  printIssues("Errors", errors);
  printIssues("Warnings", warnings);
  console.log(
    `\nChecked ${crawledPaths.size} HTML pages, ${checkedImageCount || 0} public image URLs, ${aliases.length} canonical redirects and ${uncrawledLinks.length} extra internal links.`,
  );

  if (errors.length > 0 || (strictWarnings && warnings.length > 0)) {
    process.exitCode = 1;
  } else {
    console.log("SEO validation passed.");
  }
}

await main();
