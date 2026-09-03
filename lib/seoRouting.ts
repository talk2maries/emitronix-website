import { site } from "@/data/site";
import { getTranslationPair } from "@/lib/multilingualRoutes";

export type LanguageAlternates = {
  en: string;
  "en-AE": string;
  ar: string;
  "ar-AE": string;
  "x-default": string;
};

export function normalizePath(value: string) {
  let pathname = value;

  try {
    pathname = new URL(value, `${site.url}/`).pathname;
  } catch {
    pathname = value.split(/[?#]/, 1)[0] || "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
}

export function buildCanonicalUrl(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  return normalizedPath === "/"
    ? site.url
    : new URL(normalizedPath, `${site.url}/`).href;
}

export function buildLanguageAlternates(
  englishPath: string,
  arabicPath: string,
): LanguageAlternates {
  const englishUrl = buildCanonicalUrl(englishPath);
  const arabicUrl = buildCanonicalUrl(arabicPath);

  return {
    en: englishUrl,
    "en-AE": englishUrl,
    ar: arabicUrl,
    "ar-AE": arabicUrl,
    "x-default": englishUrl,
  };
}

export function getLanguageAlternates(pathname: string) {
  const pair = getTranslationPair(normalizePath(pathname));
  return pair ? buildLanguageAlternates(pair.english, pair.arabic) : undefined;
}

export function getOpenGraphLocales(pathname: string) {
  const isArabic = normalizePath(pathname) === "/ar" || normalizePath(pathname).startsWith("/ar/");
  const hasAlternate = Boolean(getTranslationPair(normalizePath(pathname)));

  return {
    locale: isArabic ? "ar_AE" : "en_AE",
    ...(hasAlternate
      ? { alternateLocale: [isArabic ? "en_AE" : "ar_AE"] }
      : {}),
  };
}
