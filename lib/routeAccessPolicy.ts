import { warehouseBlogSlugs } from "@/data/warehouseRoutes";
import {
  getTranslatedArabicPaths,
  translatedBlogSlugs,
} from "@/lib/multilingualRoutes";

const serviceAliasPaths = [
  "/services/civil-contracting",
  "/services/civil",
  "/services/main-contracting",
  "/services/warehouse-construction",
  "/services/industrial-buildings",
  "/services/commercial-buildings",
  "/services/villa-construction",
  "/services/interior-fit-out",
  "/services/interior",
  "/services/building-renovation",
  "/services/structural-works",
  "/services/design-build",
  "/services/turnkey-construction",
  "/services/project-management",
] as const;

const blogArticlePaths = [
  ...translatedBlogSlugs.map((slug) => `/blog/${slug}`),
  ...warehouseBlogSlugs.map((slug) => `/blog/${slug}`),
];

const knownServiceAliases = new Set<string>(serviceAliasPaths);
const knownBlogArticles = new Set<string>(blogArticlePaths);
const knownArabicPaths = new Set<string>([
  ...getTranslatedArabicPaths(),
  "/ar/approvals",
  ...serviceAliasPaths.map((path) => `/ar${path}`),
]);

/**
 * These route families are intentionally closed sets. Rejecting misses before
 * App Router rendering prevents streamed soft 404s and gives client navigation
 * the same branded not-found result as a direct request.
 */
export function isUnknownClosedSetPath(pathname: string) {
  if (pathname.startsWith("/services/")) {
    return !knownServiceAliases.has(pathname);
  }

  if (pathname.startsWith("/blog/")) {
    return !knownBlogArticles.has(pathname);
  }

  if (pathname.startsWith("/ar/")) {
    return !knownArabicPaths.has(pathname);
  }

  return false;
}
