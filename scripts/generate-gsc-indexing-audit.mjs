import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

function argumentsFrom(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index]?.replace(/^--/, "");
    const value = argv[index + 1];
    if (key && value) values[key] = value;
  }
  return values;
}

function csvRows(value) {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const comma = line.lastIndexOf(",");
      return {
        url: line.slice(0, comma).replace(/^"|"$/g, ""),
        lastCrawled: line.slice(comma + 1).replace(/^"|"$/g, ""),
      };
    });
}

function canonicalDestination(urlValue) {
  const url = new URL(urlValue);
  const path = url.pathname.replace(/\/$/, "") || "/";

  if (url.search && path.endsWith("/contact")) return path;
  if (path === "/approvals") return "/approval";
  if (path === "/ar/approvals") return "/ar/approval";
  if (path === "/ar") return "/ar";

  if (path.startsWith("/ar/services/")) {
    const slug = path.replace("/ar/services/", "");
    if (["civil", "civil-contracting"].includes(slug)) return "/ar/civil";
    if (["interior", "interior-fit-out"].includes(slug)) return "/ar/interior";
    return `/ar/${slug}`;
  }

  if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    if (["civil", "civil-contracting"].includes(slug)) return "/civil";
    if (["interior", "interior-fit-out"].includes(slug)) return "/interior";
    return `/${slug}`;
  }

  const legacyDestinations = {
    "/blog/warehouse-construction-cost-dubai": "/warehouse-construction",
    "/ar/blog/warehouse-construction-cost-dubai": "/ar/warehouse-construction",
    "/blog/warehouse-design-guide-uae": "/blog/warehouse-construction-dubai-planning-design-authority-approvals",
    "/ar/blog/warehouse-design-guide-uae": "/ar/blog/warehouse-construction-dubai-planning-design-authority-approvals",
    "/blog/main-contractor-vs-general-contractor-dubai": "/main-contracting",
    "/ar/blog/main-contractor-vs-general-contractor-dubai": "/ar/main-contracting",
    "/blog/villa-construction-process-dubai": "/villa-construction",
    "/ar/blog/villa-construction-process-dubai": "/ar/villa-construction",
    "/blog/industrial-building-planning-guide-uae": "/industrial-buildings",
    "/ar/blog/industrial-building-planning-guide-uae": "/ar/industrial-buildings",
    "/blog/construction-cost-saving-tips-dubai": "/blog/complete-guide-civil-construction-dubai-2026",
    "/ar/blog/construction-cost-saving-tips-dubai": "/ar/blog/complete-guide-civil-construction-dubai-2026",
    "/warehouse/warehouse-construction-dubai": "/warehouse-construction",
    "/warehouse/warehouse-contractors-dubai": "/warehouse-construction",
    "/warehouse/industrial-warehouse-construction": "/warehouse-construction",
    "/warehouse/factory-construction": "/industrial-buildings",
    "/warehouse/industrial-building-construction": "/industrial-buildings",
    "/warehouse/warehouse-renovation": "/building-renovation",
  };

  return legacyDestinations[path] ?? null;
}

function keywordOwner(urlValue, destination) {
  const path = destination ?? new URL(urlValue).pathname;
  if (path.includes("/blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees")) {
    return `Dubai authority approvals planning guide - ${path}`;
  }
  if (path.includes("/blog/choose-best-building-contractor-dubai")) {
    return `How to choose a building contractor in Dubai - ${path}`;
  }
  if (path.includes("dewa-approvals")) return "DEWA approval coordination Dubai - /dewa-approvals";
  if (path.includes("dcd-approvals")) return "DCD approval support Dubai - /dcd-approvals";
  if (path.includes("dubai-municipality-approval")) return "Dubai Municipality approval services - /dubai-municipality-approval";
  if (path.includes("trakhees-approvals")) return "Trakhees approval services - /trakhees-approvals";
  if (path.includes("approval") || path.includes("approvals")) return "Authority approval services Dubai - /approval";
  if (path.includes("industrial-buildings")) return "Factory and industrial building contractor Dubai - /industrial-buildings";
  if (path.includes("building-renovation")) return "Warehouse renovation and modification Dubai - /building-renovation";
  if (path.includes("warehouse-construction") || path.startsWith("/warehouse/")) return "Warehouse construction company Dubai - /warehouse-construction";
  if (path.includes("main-contracting")) return "Main contractor Dubai - /main-contracting";
  if (path.includes("villa-construction")) return "Villa construction Dubai - /villa-construction";
  if (path.includes("complete-guide-civil")) return "Civil contractor Dubai - /civil";
  if (path.endsWith("/contact") || path === "/contact") return "Qualified construction enquiry - /contact";
  return "No independent search keyword (intentional exclusion)";
}

function isPriorityArticle(path) {
  return [
    "/blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees",
    "/ar/blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees",
    "/ar/blog/choose-best-building-contractor-dubai",
  ].includes(path);
}

function classify(reason, urlValue) {
  const path = new URL(urlValue).pathname;
  const destination = canonicalDestination(urlValue);
  const owner = keywordOwner(urlValue, destination);

  if (reason === "Alternate page with proper canonical tag") {
    return {
      shouldIndex: "No",
      rootCause: urlValue.includes("?")
        ? "Tracking or intent parameter duplicates the clean contact page."
        : "Legacy service alias duplicates the canonical English or Arabic service route.",
      correction: `Keep the source excluded and consolidate signals on ${destination}.`,
      targetKeyword: owner,
      action: urlValue.includes("?")
        ? `Clean-page canonical retained to ${destination}; parameter URL remains out of every sitemap.`
        : `Permanent redirect configured or confirmed to ${destination}; alias remains out of every sitemap.`,
      validation: "Intentional exclusion; verify destination after production deployment.",
    };
  }

  if (reason === "Page with redirect") {
    return {
      shouldIndex: "No",
      rootCause: "Intentional legacy, service-alias, language-normalization or hub-alias URL.",
      correction: `Keep the permanent redirect and index only ${destination}.`,
      targetKeyword: owner,
      action: `Permanent redirect configured or confirmed to ${destination}; source is absent from sitemaps and internal navigation.`,
      validation: "Intentional exclusion; no GSC fix validation required.",
    };
  }

  if (reason === "Not found (404)") {
    if (destination) {
      return {
        shouldIndex: "No",
        rootCause: "Retired editorial URL from the unpublished draft inventory had no live replacement route.",
        correction: `Redirect only this close topical substitute to ${destination}.`,
        targetKeyword: owner,
        action: `Clean 301 configured to ${destination}; source remains outside all sitemaps.`,
        validation: "Pending production deployment, live redirect test and GSC recrawl.",
      };
    }
    return {
      shouldIndex: "No",
      rootCause: "Malformed junk path with no legitimate content or equivalent destination.",
      correction: "Retain a true 404/noindex response; do not redirect junk to the homepage.",
      targetKeyword: owner,
      action: "True 404 retained and confirmed absent from sitemaps and internal links.",
      validation: "Intentional exclusion; no validation required.",
    };
  }

  if (reason === "Crawled - currently not indexed") {
    return {
      shouldIndex: "No",
      rootCause: "Non-HTML browser asset discovered during rendering, not a search landing page.",
      correction: "Keep the asset crawlable for rendering but do not add it to an XML sitemap or request indexing.",
      targetKeyword: owner,
      action: "Asset response retained; no page-indexing signal added.",
      validation: "Intentional exclusion; no validation required.",
    };
  }

  if (reason === "Excluded by noindex tag") {
    return {
      shouldIndex: "No",
      rootCause: "Utility or contributor workflow has no independent search-landing value.",
      correction: "Retain noindex and keep the URL out of XML/HTML sitemaps.",
      targetKeyword: owner,
      action: path === "/search"
        ? "Noindex retained; public search interface remains available to users, while results stay out of sitemaps and SearchAction discovery was removed."
        : "Noindex retained; contributor workflow remains out of XML/HTML sitemaps.",
      validation: "Intentional exclusion; no validation required.",
    };
  }

  if (reason === "Discovered - currently not indexed" && isPriorityArticle(path)) {
    return {
      shouldIndex: "Yes",
      rootCause: "Canonical editorial page has not yet been crawled/processed; launch recency and weak crawl priority are the likely constraints.",
      correction: "Retain in the clean sitemap and article hub; inspect live and request indexing once after deployment.",
      targetKeyword: owner,
      action: "Retained as canonical/indexable in the curated sitemap and article listings.",
      validation: "Pending production deployment, URL Inspection and one indexing request.",
    };
  }

  if (reason === "Discovered - currently not indexed" && destination) {
    return {
      shouldIndex: "No",
      rootCause: "Programmatic warehouse page overlaps a stronger commercial service page and has a close substitute.",
      correction: `Consolidate the source into ${destination} with a permanent redirect.`,
      targetKeyword: owner,
      action: `Clean 301 configured to ${destination}; source removed from sitemap, search and hub grids.`,
      validation: "Pending production deployment, live redirect test and GSC recrawl.",
    };
  }

  return {
    shouldIndex: "No",
    rootCause: "Programmatic warehouse template has high cohort similarity, weak intent differentiation and competing keyword ownership.",
    correction: "Keep crawlable for editorial review but add noindex; remove from XML/HTML sitemaps, site search, listings and commercial hub grids until uniquely rewritten.",
    targetKeyword: owner,
    action: "Noindex, follow added; URL removed from XML/HTML sitemaps, internal search, article listings and commercial hub grids.",
    validation: "Pending production deployment and GSC recrawl; do not request indexing.",
  };
}

function quote(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const args = argumentsFrom(process.argv.slice(2));
if (!args.categories || !args.alternate || !args.out) {
  throw new Error("Usage: node scripts/generate-gsc-indexing-audit.mjs --categories <json> --alternate <csv> --out <csv>");
}

const categoriesDocument = JSON.parse(await readFile(resolve(args.categories), "utf8"));
const alternate = csvRows(await readFile(resolve(args.alternate), "utf8"));
const categoryRows = [
  ...alternate.map((row) => ({
    reason: "Alternate page with proper canonical tag",
    url: row.url,
    lastCrawled: row.lastCrawled,
  })),
  ...Object.entries(categoriesDocument.categories).flatMap(([reason, urls]) =>
    urls.map((url) => ({ reason, url, lastCrawled: reason.includes("Discovered") ? "N/A" : "See GSC export" })),
  ),
];

if (categoryRows.length !== categoriesDocument.counts.notIndexed) {
  throw new Error(`Expected ${categoriesDocument.counts.notIndexed} excluded URLs; received ${categoryRows.length}.`);
}

const headers = [
  "URL",
  "Google exclusion reason",
  "Should this URL be indexed?",
  "Root cause",
  "Required correction",
  "Target keyword / owner",
  "Action completed",
  "Validation status",
  "Last crawled",
];

const outputRows = categoryRows.map((row) => {
  const result = classify(row.reason, row.url);
  return [
    row.url,
    row.reason,
    result.shouldIndex,
    result.rootCause,
    result.correction,
    result.targetKeyword,
    result.action,
    result.validation,
    row.lastCrawled,
  ];
});

const output = [headers, ...outputRows].map((row) => row.map(quote).join(",")).join("\r\n") + "\r\n";
const outputPath = resolve(args.out);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, "utf8");
console.log(`Wrote ${outputRows.length} classified GSC rows to ${outputPath}`);
