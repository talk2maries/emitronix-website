export type TranslationPair = {
  english: string;
  arabic: string;
};

export const translatedBlogSlugs = [
  "complete-guide-civil-construction-dubai-2026",
  "dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees",
  "warehouse-construction-dubai-planning-design-authority-approvals",
  "choose-best-building-contractor-dubai",
] as const;

const translatedEnglishPaths = [
  "/",
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
  "/dubai-municipality-approval",
  "/dda-approvals",
  "/dcd-approvals",
  "/dewa-approvals",
  "/trakhees-approvals",
  "/difc-approvals",
  "/concordia-dmcc-approvals",
  "/rta-approval",
  ...translatedBlogSlugs.map((slug) => `/blog/${slug}`),
] as const;

function normalizeRoutePath(value: string) {
  const withoutQueryOrHash = value.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = withoutQueryOrHash.startsWith("/")
    ? withoutQueryOrHash
    : `/${withoutQueryOrHash}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
}

function toArabicRoute(englishPath: string) {
  return englishPath === "/" ? "/ar" : `/ar${englishPath}`;
}

export const translationPairs: readonly TranslationPair[] = translatedEnglishPaths.map(
  (english) => ({
    english,
    arabic: toArabicRoute(english),
  }),
);

const pairByPath = new Map<string, TranslationPair>();
for (const pair of translationPairs) {
  pairByPath.set(pair.english, pair);
  pairByPath.set(pair.arabic, pair);
}

export function getTranslationPair(pathname: string) {
  return pairByPath.get(normalizeRoutePath(pathname)) ?? null;
}

export function hasVerifiedTranslation(pathname: string) {
  return getTranslationPair(pathname) !== null;
}

export function getTranslatedEnglishPaths() {
  return translationPairs.map((pair) => pair.english);
}

export function getTranslatedArabicPaths() {
  return translationPairs.map((pair) => pair.arabic);
}
