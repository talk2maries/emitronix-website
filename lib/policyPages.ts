import type { Metadata } from "next";
import { type CookieLanguage, type CookiePolicyPageKey } from "@/data/cookieConsentDefaults";
import { absoluteUrl, site } from "@/data/site";
import { getCookieConsentConfig } from "@/lib/cookieConsentStore";
import { buildCanonicalUrl, getLanguageAlternates } from "@/lib/seoRouting";

export const policyPageRoutes: Record<CookiePolicyPageKey, Record<CookieLanguage, string>> = {
  cookiePolicy: {
    en: "/cookie-policy",
    ar: "/ar/cookie-policy",
  },
  privacyPolicy: {
    en: "/privacy-policy",
    ar: "/ar/privacy-policy",
  },
  terms: {
    en: "/terms-and-conditions",
    ar: "/ar/terms-and-conditions",
  },
};

export async function getPolicyPage(key: CookiePolicyPageKey, language: CookieLanguage) {
  const config = await getCookieConsentConfig();
  return {
    config,
    page: config.policyPages[key][language],
    route: policyPageRoutes[key][language],
  };
}

export async function createPolicyPageMetadata(key: CookiePolicyPageKey, language: CookieLanguage): Promise<Metadata> {
  const { page, route } = await getPolicyPage(key, language);
  const alternateLanguage = language === "ar" ? "en" : "ar";
  const title = `${page.title} | ${site.name}`;
  const url = buildCanonicalUrl(route);
  const languages = getLanguageAlternates(route);
  if (!languages) {
    throw new Error(`Policy route is missing from the verified translation map: ${route}`);
  }
  const image = absoluteUrl("/images/dubai-building-contracting-company.webp");

  return {
    title: {
      absolute: title,
    },
    description: page.description,
    alternates: {
      canonical: url,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: language === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: [language === "ar" ? "en_AE" : "ar_AE"],
      url,
      siteName: site.name,
      title,
      description: page.description,
      images: [
        {
          url: image,
          width: 1672,
          height: 941,
          alt: `${page.title} - ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [image],
    },
    other: {
      "content-language": language === "ar" ? "ar-AE" : "en-AE",
      "alternate-language": alternateLanguage === "ar" ? "ar-AE" : "en-AE",
    },
  };
}
