const args = process.argv.slice(2);
const baseUrlIndex = args.indexOf("--base-url");
const baseUrl = new URL(
  baseUrlIndex >= 0 && args[baseUrlIndex + 1]
    ? args[baseUrlIndex + 1]
    : "http://127.0.0.1:3107",
);

const failures = [];

function fail(pathname, message) {
  failures.push(`${pathname}: ${message}`);
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attribute(html, element, name) {
  const match = html.match(new RegExp(`<${element}\\b[^>]*\\b${name}="([^"]+)"`, "i"));
  return match ? decodeHtml(match[1]) : null;
}

function attributes(tag) {
  const result = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(tag))) {
    const name = match[1].toLowerCase();
    if (name.startsWith("<") || name === "link" || name === "meta") continue;
    result[name] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function hasLocalizedContentRoot(html, languagePrefix, direction) {
  return new RegExp(
    `<(?:div|article)\\b(?=[^>]*\\blang="${languagePrefix}[^"]*")(?=[^>]*\\bdir="${direction}")[^>]*>`,
    "i",
  ).test(html);
}

function pageSpecificEnglishReferences(value, englishUrl, path = "$", translationContext = false) {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      pageSpecificEnglishReferences(item, englishUrl, `${path}[${index}]`, translationContext),
    );
  }
  if (!value || typeof value !== "object") return [];

  const references = [];
  for (const [key, item] of Object.entries(value)) {
    const nextTranslationContext = translationContext || key === "translationOfWork";
    const nextPath = `${path}.${key}`;
    if (
      typeof item === "string" &&
      !nextTranslationContext &&
      (item === englishUrl || item.startsWith(`${englishUrl}#`) || item.startsWith(`${englishUrl}?`))
    ) {
      references.push(nextPath);
      continue;
    }
    references.push(
      ...pageSpecificEnglishReferences(item, englishUrl, nextPath, nextTranslationContext),
    );
  }
  return references;
}

function canonicalHref(html) {
  const canonicals = Array.from(html.matchAll(/<link\b[^>]*>/gi), (match) => attributes(match[0]))
    .filter((item) => item.rel?.toLowerCase().split(/\s+/).includes("canonical"));
  return canonicals.length === 1 ? canonicals[0].href ?? null : null;
}

function metadataValue(html, property) {
  const matches = Array.from(html.matchAll(/<meta\b[^>]*>/gi), (match) => attributes(match[0]))
    .filter((item) => item.property?.toLowerCase() === property.toLowerCase());
  return matches.map((item) => item.content).filter(Boolean);
}

function validateHreflangCluster(pathname, html, englishUrl, arabicUrl) {
  const expected = new Map([
    ["en", englishUrl],
    ["en-ae", englishUrl],
    ["ar", arabicUrl],
    ["ar-ae", arabicUrl],
    ["x-default", englishUrl],
  ]);
  const alternates = Array.from(html.matchAll(/<link\b[^>]*>/gi), (match) => attributes(match[0]))
    .filter((item) => item.rel?.toLowerCase().split(/\s+/).includes("alternate") && item.hreflang);

  if (alternates.length !== expected.size) {
    fail(pathname, `expected ${expected.size} hreflang links, received ${alternates.length}`);
  }

  const seen = new Set();
  for (const item of alternates) {
    const code = item.hreflang.toLowerCase();
    if (seen.has(code)) fail(pathname, `duplicate hreflang ${item.hreflang}`);
    seen.add(code);
    if (!expected.has(code)) {
      fail(pathname, `unexpected hreflang ${item.hreflang}`);
      continue;
    }
    if (item.href !== expected.get(code)) {
      fail(pathname, `hreflang ${item.hreflang} expected ${expected.get(code)}, received ${item.href ?? "none"}`);
    }
  }

  for (const code of expected.keys()) {
    if (!seen.has(code)) fail(pathname, `missing hreflang ${code}`);
  }
}

function firstHeading(html) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match
    ? decodeHtml(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    : null;
}

function jsonLdBlocks(html) {
  return Array.from(
    html.matchAll(/<script\b[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
    (match) => match[1],
  );
}

function sitemapLocations(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gi), (match) => decodeHtml(match[1]));
}

function productionHref(origin, pathname) {
  return pathname === "/" ? origin : new URL(pathname, origin).href;
}

async function fetchText(pathname) {
  const response = await fetch(new URL(pathname, baseUrl), {
    headers: { "User-Agent": "Emitronix-Arabic-SEO-Validator/1.0" },
    redirect: "manual",
  });
  return { response, body: await response.text() };
}

const sitemapResult = await fetchText("/sitemap.xml");
if (!sitemapResult.response.ok) {
  fail("/sitemap.xml", `expected 200, received ${sitemapResult.response.status}`);
}

const arabicUrls = sitemapLocations(sitemapResult.body)
  .map((value) => new URL(value))
  .filter((url) => url.pathname === "/ar" || url.pathname.startsWith("/ar/"));

if (arabicUrls.length === 0) {
  fail("/sitemap.xml", "no Arabic URLs were found");
}

for (const productionUrl of arabicUrls) {
  const pathname = productionUrl.pathname;
  const { response, body } = await fetchText(pathname);

  if (response.status !== 200) {
    fail(pathname, `expected 200, received ${response.status}`);
    continue;
  }

  const lang = attribute(body, "html", "lang");
  const dir = attribute(body, "html", "dir");
  const contentLanguage = response.headers.get("content-language")?.toLowerCase() ?? "";
  const canonical = canonicalHref(body);
  const heading = firstHeading(body);
  const expectedCanonical = productionHref(productionUrl.origin, pathname);
  const englishPath = pathname === "/ar" ? "/" : pathname.slice(3);
  const englishPageUrl = productionHref(productionUrl.origin, englishPath);

  if (!contentLanguage.startsWith("ar")) {
    fail(pathname, `expected an Arabic Content-Language header, received ${contentLanguage || "none"}`);
  }
  if (!hasLocalizedContentRoot(body, "ar", "rtl")) {
    fail(pathname, "the server-rendered response is missing an Arabic RTL content root");
  }
  if (lang !== "ar-AE" || dir?.toLowerCase() !== "rtl") {
    fail(pathname, `expected server document lang=ar-AE dir=rtl, received lang=${lang ?? "none"} dir=${dir ?? "none"}`);
  }
  if (canonical !== expectedCanonical) {
    fail(pathname, `expected canonical ${expectedCanonical}, received ${canonical ?? "none"}`);
  }
  if (!heading || !/[\u0600-\u06ff]/.test(heading)) {
    fail(pathname, "the server-rendered H1 does not contain Arabic text");
  }
  validateHreflangCluster(pathname, body, englishPageUrl, expectedCanonical);

  const ogUrl = metadataValue(body, "og:url");
  const ogLocale = metadataValue(body, "og:locale");
  const ogAlternateLocale = metadataValue(body, "og:locale:alternate");
  if (ogUrl.length !== 1 || ogUrl[0] !== expectedCanonical) {
    fail(pathname, `expected one og:url equal to ${expectedCanonical}, received ${ogUrl.join(", ") || "none"}`);
  }
  if (ogLocale.length !== 1 || ogLocale[0] !== "ar_AE") {
    fail(pathname, `expected og:locale ar_AE, received ${ogLocale.join(", ") || "none"}`);
  }
  if (ogAlternateLocale.length !== 1 || ogAlternateLocale[0] !== "en_AE") {
    fail(pathname, `expected og:locale:alternate en_AE, received ${ogAlternateLocale.join(", ") || "none"}`);
  }

  const schemaBlocks = jsonLdBlocks(body);
  if (schemaBlocks.length === 0) {
    fail(pathname, "no JSON-LD was found");
  }

  const englishPageIdPrefix = `${productionUrl.origin}${englishPath === "/" ? "/" : englishPath}#`;
  const arabicPageUrl = productionUrl.href;

  for (const [index, source] of schemaBlocks.entries()) {
    try {
      const parsed = JSON.parse(source);
      const serialized = JSON.stringify(parsed);
      if (englishPath !== "/" && serialized.includes(`"@id":"${englishPageIdPrefix}`)) {
        fail(pathname, `JSON-LD block ${index + 1} contains an English page-specific @id`);
      }
      const isPageSpecificBlock =
        serialized.includes(`"@id":"${arabicPageUrl}#webpage"`) ||
        serialized.includes(`"url":"${arabicPageUrl}"`);
      if (englishPath !== "/" && isPageSpecificBlock) {
        const leakingReferences = pageSpecificEnglishReferences(parsed, englishPageUrl);
        if (leakingReferences.length > 0) {
          fail(
            pathname,
            `JSON-LD block ${index + 1} contains English page URL(s) outside translationOfWork at ${leakingReferences.join(", ")}`,
          );
        }
      }
    } catch (error) {
      fail(
        pathname,
        `JSON-LD block ${index + 1} is invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`Arabic SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Arabic SEO validation passed for ${arabicUrls.length} sitemap URL(s).`);
}
