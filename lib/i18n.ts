export type Locale = "en" | "ar";

export function isArabicPath(pathname: string) {
  return pathname === "/ar" || pathname.startsWith("/ar/");
}

export function toEnglishPath(pathname: string) {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function toArabicPath(pathname: string) {
  const cleanPath = pathname || "/";
  if (isArabicPath(cleanPath)) return cleanPath;
  return cleanPath === "/" ? "/ar" : `/ar${cleanPath}`;
}

const englishOnlyPaths = [
  "/accessibility",
  "/company-information",
  "/corrections-policy",
  "/disclaimer",
  "/editorial-policy",
  "/faqs",
  "/founder",
  "/leadership",
  "/locations",
  "/search",
  "/technical-review-policy",
];

function pathnameOnly(value: string) {
  return value.split(/[?#]/, 1)[0] || "/";
}

export function hasArabicPage(pathname: string) {
  const englishPath = toEnglishPath(pathnameOnly(pathname));
  return !englishOnlyPaths.some((path) => englishPath === path || englishPath.startsWith(`${path}/`));
}

export function toAvailableArabicPath(pathname: string) {
  return hasArabicPage(pathname) ? toArabicPath(pathname) : "/ar";
}

export function localizedPath(href: string, locale: Locale) {
  if (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (locale === "ar") return toAvailableArabicPath(href);
  return toEnglishPath(href);
}

export function alternateLocalePath(pathname: string) {
  return isArabicPath(pathname) ? toEnglishPath(pathname) : toAvailableArabicPath(pathname);
}
