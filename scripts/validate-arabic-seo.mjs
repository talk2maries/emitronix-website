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

function hasLocalizedContentRoot(html, languagePrefix, direction) {
  return new RegExp(
    `<(?:div|article)\\b(?=[^>]*\\blang="${languagePrefix}[^"]*")(?=[^>]*\\bdir="${direction}")[^>]*>`,
    "i",
  ).test(html);
}

function hasWorkingLocaleSyncScript(html) {
  const script = html.match(
    /<script\b[^>]*\bid="emitronix-document-language"[^>]*>([\s\S]*?)<\/script>/i,
  )?.[1];
  return Boolean(
    script &&
      /document\.documentElement\.lang\s*=\s*isArabic\s*\?\s*['"]ar-AE['"]\s*:\s*['"]en-AE['"]/.test(script) &&
      /document\.documentElement\.dir\s*=\s*isArabic\s*\?\s*['"]rtl['"]\s*:\s*['"]ltr['"]/.test(script),
  );
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
  const match = html.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/i);
  return match ? decodeHtml(match[1]) : null;
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
  const expectedCanonical = new URL(pathname, productionUrl.origin).href;

  if (!contentLanguage.startsWith("ar")) {
    fail(pathname, `expected an Arabic Content-Language header, received ${contentLanguage || "none"}`);
  }
  if (!hasLocalizedContentRoot(body, "ar", "rtl")) {
    fail(pathname, "the server-rendered response is missing an Arabic RTL content root");
  }
  const hasArabicDocumentRoot = lang?.toLowerCase().startsWith("ar") && dir?.toLowerCase() === "rtl";
  const hasStaticShellFallback =
    lang?.toLowerCase().startsWith("en") &&
    dir?.toLowerCase() === "ltr" &&
    hasWorkingLocaleSyncScript(body);
  if (!hasArabicDocumentRoot && !hasStaticShellFallback) {
    fail(
      pathname,
      `expected either an Arabic document root or the static locale-sync shell, received lang=${lang ?? "none"} dir=${dir ?? "none"}`,
    );
  }
  if (canonical !== expectedCanonical) {
    fail(pathname, `expected canonical ${expectedCanonical}, received ${canonical ?? "none"}`);
  }
  if (!heading || !/[\u0600-\u06ff]/.test(heading)) {
    fail(pathname, "the server-rendered H1 does not contain Arabic text");
  }

  const schemaBlocks = jsonLdBlocks(body);
  if (schemaBlocks.length === 0) {
    fail(pathname, "no JSON-LD was found");
  }

  const englishPath = pathname === "/ar" ? "/" : pathname.slice(3);
  const englishPageIdPrefix = `${productionUrl.origin}${englishPath === "/" ? "/" : englishPath}#`;
  const englishPageUrl = `${productionUrl.origin}${englishPath === "/" ? "/" : englishPath}`;
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
