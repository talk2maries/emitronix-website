import type { MetadataRoute } from "next";
import { approvalServices } from "@/data/approvals";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, services } from "@/data/site";
import { readSiteFiles } from "@/lib/adminStore";
import { toArabicPath, toEnglishPath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const routes = [
  "",
  "/about",
  "/services",
  "/approval",
  "/projects",
  "/industries",
  "/careers",
  "/blog",
  "/resources",
  "/html-sitemap",
  "/contact",
  "/guest-post",
  "/cookie-policy",
  "/privacy-policy",
  "/terms-and-conditions",
  "/ar/cookie-policy",
  "/ar/privacy-policy",
  "/ar/terms-and-conditions",
  ...services.map((service) => service.href),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...approvalServices.map((service) => service.href),
];

function sitemapEntry(route: string): MetadataRoute.Sitemap[number] {
  const path = route || "/";
  const englishPath = toEnglishPath(path);
  const arabicPath = toArabicPath(englishPath);

  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: {
        en: absoluteUrl(englishPath),
        ar: absoluteUrl(arabicPath),
        "en-AE": absoluteUrl(englishPath),
        "ar-AE": absoluteUrl(arabicPath),
        "x-default": absoluteUrl(englishPath),
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteFiles = await readSiteFiles().catch(() => ({}) as Awaited<ReturnType<typeof readSiteFiles>>);
  const excluded = new Set(
    (siteFiles.sitemapExcludedPaths || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );
  const extras = (siteFiles.sitemapExtraUrls || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const uniqueRoutes = Array.from(new Set([
    ...routes,
    ...routes.map((route) => toArabicPath(route || "/")),
  ])).filter((route) => !excluded.has(route || "/"));

  return [
    ...uniqueRoutes.map((route) => sitemapEntry(route)),
    ...extras.map((url) => ({
      url: url.startsWith("http") ? url : absoluteUrl(url),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
