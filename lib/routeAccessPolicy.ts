const servicePaths = [
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
] as const;

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

const approvalPaths = [
  "/dubai-municipality-approval",
  "/dda-approvals",
  "/dcd-approvals",
  "/dewa-approvals",
  "/trakhees-approvals",
  "/difc-approvals",
  "/concordia-dmcc-approvals",
  "/rta-approval",
] as const;

const blogArticlePaths = [
  "/blog/complete-guide-civil-construction-dubai-2026",
  "/blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees",
  "/blog/warehouse-construction-dubai-planning-design-authority-approvals",
  "/blog/choose-best-building-contractor-dubai",
];

const translatedBlogArticlePaths = [
  "/blog/complete-guide-civil-construction-dubai-2026",
  "/blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees",
  "/blog/warehouse-construction-dubai-planning-design-authority-approvals",
  "/blog/choose-best-building-contractor-dubai",
] as const;

const arabicCommonPaths = [
  "/ar/about",
  "/ar/services",
  "/ar/approval",
  "/ar/approvals",
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
] as const;

const knownServiceAliases = new Set<string>(serviceAliasPaths);
const knownBlogArticles = new Set<string>(blogArticlePaths);
const knownArabicPaths = new Set<string>([
  ...arabicCommonPaths,
  ...servicePaths.map((path) => `/ar${path}`),
  ...serviceAliasPaths.map((path) => `/ar${path}`),
  ...approvalPaths.map((path) => `/ar${path}`),
  ...translatedBlogArticlePaths.map((path) => `/ar${path}`),
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
