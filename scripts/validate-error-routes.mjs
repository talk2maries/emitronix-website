#!/usr/bin/env node

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

const baseUrl = new URL(option("base-url", process.env.ROUTE_TEST_BASE_URL || "http://127.0.0.1:3000"));
const runtimeErrorPath = option("runtime-error-path", process.env.ROUTE_TEST_RUNTIME_ERROR_PATH);
const timeoutMs = Number.parseInt(option("timeout-ms", "12000"), 10);
const failures = [];
let checks = 0;
const staticAssets = new Set();

baseUrl.pathname = "/";
baseUrl.search = "";
baseUrl.hash = "";

const missingPagePaths = [
  "/test123",
  "/abcxyz",
  "/random-page",
  "/en/unknown",
  "/services/not-found",
  "/blog/not-found",
  "/ar/unknown",
  "/ar/services/not-found",
  "/ar/blog/not-found",
  "/ar/unknown/nested/path",
  "/ar/missing.html",
  "/ar/emitronix-route-not-found",
  "/About",
  "/about/team",
  "/locations/unknown",
  "/locations/dubai/unknown",
  "/services/not-found/deeper",
  "/blog/not-found/deeper",
  "/ar/a/b/c",
  "/ar/founder",
  "/unknown.txt",
];

const servicePagePaths = [
  "/civil",
  "/main-contracting",
  "/warehouse-construction",
  "/industrial-buildings",
  "/commercial-buildings",
  "/villa-construction",
  "/interior",
  "/building-renovation",
  "/structural-works",
  "/design-build",
  "/turnkey-construction",
  "/project-management",
];

const approvalPagePaths = [
  "/dubai-municipality-approval",
  "/dda-approvals",
  "/dcd-approvals",
  "/dewa-approvals",
  "/trakhees-approvals",
  "/difc-approvals",
  "/concordia-dmcc-approvals",
  "/rta-approval",
];

const translatedBlogPagePaths = [
  "/blog/complete-guide-civil-construction-dubai-2026",
  "/blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees",
  "/blog/warehouse-construction-dubai-planning-design-authority-approvals",
  "/blog/choose-best-building-contractor-dubai",
];

const generatedBlogPagePaths = [
  "/blog/warehouse-construction-dubai-planning-guide",
  "/blog/warehouse-authority-approvals-dubai-approval-checklist",
  "/blog/warehouse-cost-planning-dubai-cost-factors",
];

const blogPagePaths = [
  ...translatedBlogPagePaths,
  ...generatedBlogPagePaths,
];

const warehouseSiloPagePaths = [
  "/warehouse/warehouse-construction-dubai",
  "/warehouse/warehouse-contractors-dubai",
  "/warehouse/warehouse-design-build",
  "/warehouse/warehouse-authority-approvals",
  "/warehouse/warehouse-dewa-approvals",
  "/warehouse/warehouse-dcd-approvals",
  "/warehouse/warehouse-fit-out",
  "/warehouse/warehouse-turnkey-contractor",
];

const arabicCommonPagePaths = [
  "/ar",
  "/ar/about",
  "/ar/services",
  "/ar/approval",
  "/ar/projects",
  "/ar/industries",
  "/ar/careers",
  "/ar/blog",
  "/ar/resources",
  "/ar/html-sitemap",
  "/ar/contact",
  "/ar/guest-post",
  "/ar/cookie-policy",
  "/ar/privacy-policy",
  "/ar/terms-and-conditions",
];

const validPagePaths = Array.from(new Set([
  "/",
  "/about",
  "/approval",
  "/services",
  "/projects",
  "/industries",
  "/careers",
  "/blog",
  "/resources",
  "/faqs",
  "/locations",
  "/locations/dubai",
  "/contact",
  "/html-sitemap",
  "/founder",
  "/leadership",
  "/company-information",
  "/editorial-policy",
  "/technical-review-policy",
  "/corrections-policy",
  "/disclaimer",
  "/accessibility",
  "/cookie-policy",
  "/privacy-policy",
  "/terms-and-conditions",
  "/search",
  "/guest-post",
  ...servicePagePaths,
  ...warehouseSiloPagePaths,
  ...approvalPagePaths,
  ...blogPagePaths,
  ...arabicCommonPagePaths,
  ...servicePagePaths.map((path) => `/ar${path}`),
  ...approvalPagePaths.map((path) => `/ar${path}`),
  ...translatedBlogPagePaths.map((path) => `/ar${path}`),
]));

const permanentRedirects = [
  ["/approvals", "/approval"],
  ["/services/civil-contracting", "/civil"],
  ["/ar/approvals", "/ar/approval"],
  ["/ar/services/civil-contracting", "/ar/civil"],
];

const apiChecks = [
  ["/api/cookie-consent/config", [200]],
  ["/api/seo-runtime?path=%2F", [200]],
  ["/api/redirects/export", [200]],
  ["/api/admin/auth/me", [401]],
  ["/api/admin/cookie-consent/settings", [401]],
  ["/api/contact", [405]],
  ["/api/careers", [405]],
  ["/api/cookie-consent/consent", [405]],
  ["/api/admin/auth/login", [405]],
  ["/api/admin/auth/logout", [405]],
  ["/api/admin/cookie-consent/login", [405]],
  ["/api/admin/cookie-consent/logout", [405]],
  ["/api/admin/cookie-consent/reset", [405]],
];

const forbiddenFrameworkMessages = [
  "Application error: a client-side exception has occurred",
  "Application error: a server-side exception has occurred",
  "This page could not be found.",
];

function fail(subject, message) {
  failures.push(`${subject}: ${message}`);
}

async function request(pathname, { headers = {}, method = "GET" } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number.isFinite(timeoutMs) ? timeoutMs : 12_000);

  try {
    return await fetch(new URL(pathname, baseUrl), {
      method,
      redirect: "manual",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Emitronix-Route-Regression/1.0",
        ...headers,
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function assertNoFrameworkError(subject, body) {
  for (const message of forbiddenFrameworkMessages) {
    if (body.includes(message)) {
      fail(subject, `exposed framework error UI: ${JSON.stringify(message)}`);
    }
  }
}

function hasErrorMarker(body, code) {
  return (
    body.includes(`data-error-page="${code}"`) ||
    body.includes(`data-error-page\\":\\"${code}\\"`) ||
    body.includes(`data-error-page":"${code}"`)
  );
}

function documentAttribute(body, name) {
  return body.match(new RegExp(`<html\\b[^>]*\\b${name}="([^"]+)"`, "i"))?.[1]?.toLowerCase() ?? null;
}

function hasLocalizedContentRoot(body, languagePrefix, direction) {
  return new RegExp(
    `<(?:div|article)\\b(?=[^>]*\\blang="${languagePrefix}[^"]*")(?=[^>]*\\bdir="${direction}")[^>]*>`,
    "i",
  ).test(body);
}

function hasWorkingLocaleSyncScript(body) {
  const script = body.match(
    /<script\b[^>]*\bid="emitronix-document-language"[^>]*>([\s\S]*?)<\/script>/i,
  )?.[1];
  return Boolean(
    script &&
      /document\.documentElement\.lang\s*=\s*isArabic\s*\?\s*['"]ar-AE['"]\s*:\s*['"]en-AE['"]/.test(script) &&
      /document\.documentElement\.dir\s*=\s*isArabic\s*\?\s*['"]rtl['"]\s*:\s*['"]ltr['"]/.test(script),
  );
}

function hasNoindex(body) {
  return /<meta\b[^>]*\bname="robots"[^>]*\bcontent="[^"]*\bnoindex\b[^"]*"/i.test(body);
}

function collectStaticAssets(body) {
  const pattern = /(?:src|href)="(\/_next\/static\/[^"]+\.(?:css|js))"/gi;
  let match;
  while ((match = pattern.exec(body))) staticAssets.add(match[1]);
}

async function checkMissingPage(pathname) {
  const subject = `missing ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname);
    const body = await response.text();
    if (response.status !== 404) {
      fail(subject, `expected HTTP 404, received ${response.status}`);
    }
    if (!response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
      fail(subject, "expected an HTML response");
    }
    if (!hasErrorMarker(body, "404")) {
      fail(subject, "custom branded 404 marker is missing");
    }
    const expectedHeading = pathname === "/ar" || pathname.startsWith("/ar/")
      ? "مسار المشروع المطلوب غير متاح."
      : "This project route is not available.";
    if (!body.includes(expectedHeading)) {
      fail(subject, "custom 404 heading is missing");
    }
    if (!hasNoindex(body)) {
      fail(subject, "404 response is missing a noindex robots directive");
    }
    const expectedArabicDocument = pathname === "/ar" || pathname.startsWith("/ar/");
    const lang = documentAttribute(body, "lang");
    const dir = documentAttribute(body, "dir");
    const contentLanguage = response.headers.get("content-language")?.toLowerCase() ?? "";
    const hasArabicDocumentRoot = lang?.startsWith("ar") && dir === "rtl";
    const hasStaticShellFallback =
      lang?.startsWith("en") && dir === "ltr" && hasWorkingLocaleSyncScript(body);
    if (expectedArabicDocument && !contentLanguage.startsWith("ar")) {
      fail(subject, `expected Arabic Content-Language, received ${contentLanguage || "none"}`);
    }
    if (expectedArabicDocument && !hasLocalizedContentRoot(body, "ar", "rtl")) {
      fail(subject, "expected a server-rendered Arabic RTL content root");
    }
    if (expectedArabicDocument && !hasArabicDocumentRoot && !hasStaticShellFallback) {
      fail(subject, `expected an Arabic document root or static locale-sync shell, received lang=${lang} dir=${dir}`);
    }
    if (!expectedArabicDocument && (!lang?.startsWith("en") || dir !== "ltr")) {
      fail(subject, `expected English html language and LTR direction, received lang=${lang} dir=${dir}`);
    }
    if (!expectedArabicDocument && !/\.[A-Za-z0-9]+$/.test(pathname) && !contentLanguage.startsWith("en")) {
      fail(subject, `expected English Content-Language, received ${contentLanguage || "none"}`);
    }
    assertNoFrameworkError(subject, body);

    const headResponse = await request(pathname, { method: "HEAD" });
    if (headResponse.status !== 404) {
      fail(`${subject} HEAD`, `expected HTTP 404, received ${headResponse.status}`);
    }
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkClientNavigation(pathname) {
  const subject = `client navigation ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname, {
      headers: {
        Accept: "text/x-component",
        RSC: "1",
      },
    });
    const body = await response.text();
    if (response.status !== 404) {
      fail(subject, `expected HTTP 404, received ${response.status}`);
    }
    if (!response.headers.get("content-type")?.toLowerCase().includes("text/x-component")) {
      fail(subject, "expected a React Server Component response");
    }
    const expectedHeading = pathname === "/ar" || pathname.startsWith("/ar/")
      ? "مسار المشروع المطلوب غير متاح."
      : "This project route is not available.";
    if (!hasErrorMarker(body, "404") || !body.includes(expectedHeading)) {
      fail(subject, "custom 404 payload is missing");
    }
    const expectedLanguage = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
    const contentLanguage = response.headers.get("content-language")?.toLowerCase() ?? "";
    if (
      (expectedLanguage === "ar" || !/\.[A-Za-z0-9]+$/.test(pathname)) &&
      !contentLanguage.startsWith(expectedLanguage)
    ) {
      fail(subject, `expected ${expectedLanguage} Content-Language, received ${contentLanguage || "none"}`);
    }
    if (body.includes("NEXT_HTTP_ERROR_FALLBACK")) {
      fail(subject, "received a streamed soft-404 fallback");
    }
    assertNoFrameworkError(subject, body);
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkValidPage(pathname) {
  const subject = `valid ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname);
    const body = await response.text();
    if (response.status !== 200) {
      fail(subject, `expected HTTP 200, received ${response.status}`);
    }
    if (!response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
      fail(subject, "expected an HTML response");
    }
    if (body.includes('data-error-page="404"') || body.includes('data-error-page="500"')) {
      fail(subject, "rendered an error page");
    }
    const expectedArabicDocument = pathname === "/ar" || pathname.startsWith("/ar/");
    const lang = documentAttribute(body, "lang");
    const dir = documentAttribute(body, "dir");
    const contentLanguage = response.headers.get("content-language")?.toLowerCase() ?? "";
    const hasArabicDocumentRoot = lang?.startsWith("ar") && dir === "rtl";
    const hasStaticShellFallback =
      lang?.startsWith("en") && dir === "ltr" && hasWorkingLocaleSyncScript(body);
    if (expectedArabicDocument && !contentLanguage.startsWith("ar")) {
      fail(subject, `expected Arabic Content-Language, received ${contentLanguage || "none"}`);
    }
    if (expectedArabicDocument && !hasLocalizedContentRoot(body, "ar", "rtl")) {
      fail(subject, "expected a server-rendered Arabic RTL content root");
    }
    if (expectedArabicDocument && !hasArabicDocumentRoot && !hasStaticShellFallback) {
      fail(subject, `expected an Arabic document root or static locale-sync shell, received lang=${lang} dir=${dir}`);
    }
    if (!expectedArabicDocument && (!lang?.startsWith("en") || dir !== "ltr")) {
      fail(subject, `expected English html language and LTR direction, received lang=${lang} dir=${dir}`);
    }
    if (!expectedArabicDocument && !contentLanguage.startsWith("en")) {
      fail(subject, `expected English Content-Language, received ${contentLanguage || "none"}`);
    }
    assertNoFrameworkError(subject, body);
    collectStaticAssets(body);
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkValidClientNavigation(pathname) {
  const subject = `valid client navigation ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname, {
      headers: {
        Accept: "text/x-component",
        RSC: "1",
      },
    });
    const body = await response.text();
    if (response.status !== 200) {
      fail(subject, `expected HTTP 200, received ${response.status}`);
    }
    if (!response.headers.get("content-type")?.toLowerCase().includes("text/x-component")) {
      fail(subject, "expected a React Server Component response");
    }
    if (body.includes("NEXT_HTTP_ERROR_FALLBACK")) {
      fail(subject, "valid route produced a not-found fallback");
    }
    const expectedLanguage = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
    const contentLanguage = response.headers.get("content-language")?.toLowerCase() ?? "";
    if (!contentLanguage.startsWith(expectedLanguage)) {
      fail(subject, `expected ${expectedLanguage} Content-Language, received ${contentLanguage || "none"}`);
    }
    assertNoFrameworkError(subject, body);
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkRedirect([source, destination]) {
  const subject = `redirect ${source}`;
  checks += 1;

  try {
    const response = await request(source);
    if (![301, 308].includes(response.status)) {
      fail(subject, `expected a permanent redirect, received ${response.status}`);
      return;
    }
    const location = response.headers.get("location");
    if (!location || new URL(location, baseUrl).pathname !== destination) {
      fail(subject, `expected destination ${destination}, received ${location || "no Location header"}`);
    }
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkApi([pathname, allowedStatuses]) {
  const subject = `API ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname, { headers: { Accept: "application/json" } });
    const body = await response.text();
    if (!allowedStatuses.includes(response.status)) {
      fail(subject, `expected ${allowedStatuses.join(" or ")}, received ${response.status}`);
    }
    assertNoFrameworkError(subject, body);
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkMissingApi(pathname) {
  const subject = `missing API ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname, { headers: { Accept: "application/json" } });
    const body = await response.text();
    if (response.status !== 404) {
      fail(subject, `expected HTTP 404, received ${response.status}`);
    }
    if (!hasErrorMarker(body, "404")) {
      fail(subject, "custom branded 404 response is missing");
    }
    assertNoFrameworkError(subject, body);
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkRuntimeError(pathname) {
  const subject = `runtime error ${pathname}`;
  checks += 1;

  try {
    const response = await request(pathname);
    const body = await response.text();
    if (response.status !== 500) {
      fail(subject, `expected HTTP 500, received ${response.status}`);
    }
    if (body.includes("EMITRONIX_PRIVATE_ERROR_SENTINEL")) {
      fail(subject, "internal error detail was exposed");
    }
    assertNoFrameworkError(subject, body);

    const chunkPaths = new Set();
    for (const match of body.matchAll(/(?:\/_next\/|static\/)chunks\/app\/(?:global-)?error-[a-z0-9]+\.js/gi)) {
      const value = match[0];
      chunkPaths.add(value.startsWith("/_next/") ? value : `/_next/${value}`);
    }

    const expectedBoundaryText = new Map([
      ["app/error-", "We could not load this page."],
      ["app/global-error-", "Emitronix is temporarily unavailable."],
    ]);
    for (const [chunkFragment, expectedText] of expectedBoundaryText) {
      const chunkPath = [...chunkPaths].find((value) => value.includes(chunkFragment));
      if (!chunkPath) {
        fail(subject, `could not locate ${chunkFragment} client boundary`);
        continue;
      }
      const chunkResponse = await request(chunkPath, {
        headers: { Accept: "application/javascript" },
      });
      const chunkBody = await chunkResponse.text();
      if (chunkResponse.status !== 200 || !chunkBody.includes(expectedText) || !chunkBody.includes("data-error-page")) {
        fail(subject, `${chunkFragment} does not contain the branded fallback`);
      }
      if (chunkBody.includes("EMITRONIX_PRIVATE_ERROR_SENTINEL")) {
        fail(subject, `${chunkFragment} exposed the private error detail`);
      }
    }
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkStaticAsset(assetPath) {
  const subject = `asset ${assetPath}`;
  checks += 1;

  try {
    const response = await request(assetPath, {
      headers: { Accept: assetPath.endsWith(".css") ? "text/css" : "application/javascript" },
    });
    const body = await response.arrayBuffer();
    if (response.status !== 200) {
      fail(subject, `expected HTTP 200, received ${response.status}`);
    }
    if (body.byteLength === 0) {
      fail(subject, "asset body is empty");
    }
  } catch (error) {
    fail(subject, `request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`Validating error and route behavior at ${baseUrl.origin}`);

for (const pathname of missingPagePaths) {
  await checkMissingPage(pathname);
  await checkClientNavigation(pathname);
}
for (const pathname of validPagePaths) {
  await checkValidPage(pathname);
  await checkValidClientNavigation(pathname);
}
for (const redirect of permanentRedirects) await checkRedirect(redirect);
for (const apiCheck of apiChecks) await checkApi(apiCheck);
await checkMissingApi("/api/not-found");
await checkMissingApi("/api/not-found/nested");
await checkMissingApi("/api/contact/extra");
if (runtimeErrorPath) await checkRuntimeError(runtimeErrorPath);
for (const assetPath of staticAssets) await checkStaticAsset(assetPath);

if (failures.length > 0) {
  console.error(`\nRoute validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Route validation passed (${checks} checks).`);
}

