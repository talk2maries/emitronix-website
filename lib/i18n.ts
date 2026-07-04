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

export function localizedPath(href: string, locale: Locale) {
  if (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (locale === "ar") return toArabicPath(href);
  return toEnglishPath(href);
}

export function alternateLocalePath(pathname: string) {
  return isArabicPath(pathname) ? toEnglishPath(pathname) : toArabicPath(pathname);
}
