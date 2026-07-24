import type { MetadataRoute } from "next";
import { approvalServices } from "@/data/approvals";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, services, site } from "@/data/site";
import { readSiteFiles } from "@/lib/adminStore";
import { hasArabicPage, toArabicPath, toEnglishPath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const SITE_REVIEW_DATE = "2026-07-23";

type RouteRecord = {
  path: string;
  lastModified?: string;
  changeFrequency?: "weekly" | "monthly" | "yearly";
  priority?: number;
};

const coreRoutes: RouteRecord[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/founder", priority: 0.8 },
  { path: "/leadership", priority: 0.8 },
  { path: "/company-information", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/approval", priority: 0.9 },
  { path: "/projects", priority: 0.6 },
  { path: "/industries", priority: 0.8 },
  { path: "/careers", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.9 },
  { path: "/faqs", priority: 0.7 },
  { path: "/locations", priority: 0.7 },
  { path: "/locations/dubai", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/html-sitemap", priority: 0.4 },
  { path: "/editorial-policy", priority: 0.5 },
  { path: "/technical-review-policy", priority: 0.5 },
  { path: "/corrections-policy", priority: 0.5 },
  { path: "/disclaimer", priority: 0.5 },
  { path: "/accessibility", priority: 0.5 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.4 },
];

function languageAlternates(path: string) {
  const englishPath = toEnglishPath(path);
  const englishUrl = absoluteUrl(englishPath);
  if (!hasArabicPage(englishPath)) {
    return {
      en: englishUrl,
      "en-AE": englishUrl,
      "x-default": englishUrl,
    };
  }

  const arabicUrl = absoluteUrl(toArabicPath(englishPath));
  return {
    en: englishUrl,
    ar: arabicUrl,
    "en-AE": englishUrl,
    "ar-AE": arabicUrl,
    "x-default": englishUrl,
  };
}

function sitemapEntry(record: RouteRecord): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(record.path),
    lastModified: record.lastModified ?? SITE_REVIEW_DATE,
    changeFrequency: record.changeFrequency ?? "monthly",
    priority: record.priority ?? 0.7,
    alternates: {
      languages: languageAlternates(record.path),
    },
  };
}

function normalizeSameOriginExtra(value: string) {
  try {
    const url = new URL(value, site.url);
    if (url.origin !== new URL(site.url).origin) return null;
    if (url.search || url.hash) return null;
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteFiles = await readSiteFiles().catch(() => ({}) as Awaited<ReturnType<typeof readSiteFiles>>);
  const excluded = new Set(
    (siteFiles.sitemapExcludedPaths || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => normalizeSameOriginExtra(line))
      .filter((path): path is string => Boolean(path)),
  );

  const extras = (siteFiles.sitemapExtraUrls || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => normalizeSameOriginExtra(line))
    .filter((path): path is string => Boolean(path));

  const englishRecords: RouteRecord[] = [
    ...coreRoutes,
    ...services.map((service) => ({ path: service.href, priority: 0.8 })),
    ...approvalServices.map((service) => ({ path: service.href, priority: 0.8 })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.modifiedDate,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.7,
    })),
  ];
  const knownCanonicalPaths = new Set(englishRecords.map((record) => record.path));
  const validExtras = extras
    .filter((path) => {
      const englishPath = toEnglishPath(path);
      if (!knownCanonicalPaths.has(englishPath)) return false;
      return path === englishPath || (hasArabicPage(englishPath) && path === toArabicPath(englishPath));
    })
    .map((path) => ({ path, priority: 0.5 }));
  const arabicRecords = englishRecords
    .filter((record) => hasArabicPage(record.path))
    .map((record) => ({
      ...record,
      path: toArabicPath(record.path),
      priority: Math.max(0.3, (record.priority ?? 0.7) - 0.1),
    }));
  const records: RouteRecord[] = [
    ...validExtras,
    ...englishRecords,
    ...arabicRecords,
  ];

  const unique = new Map<string, RouteRecord>();
  for (const record of records) {
    if (!excluded.has(record.path)) unique.set(record.path, record);
  }

  return Array.from(unique.values()).map(sitemapEntry);
}
