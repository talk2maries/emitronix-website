import type { Metadata } from "next";
import { type CookieLanguage, type CookiePolicyPageKey } from "@/data/cookieConsentDefaults";
import { absoluteUrl, site } from "@/data/site";
import { getCookieConsentConfig } from "@/lib/cookieConsentStore";

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
  const url = absoluteUrl(route);

  return {
    title: {
      absolute: title,
    },
    description: page.description,
    alternates: {
      canonical: url,
      languages: {
        "en-AE": absoluteUrl(policyPageRoutes[key].en),
        "ar-AE": absoluteUrl(policyPageRoutes[key].ar),
        "x-default": absoluteUrl(policyPageRoutes[key].en),
      },
    },
    openGraph: {
      type: "website",
      locale: language === "ar" ? "ar_AE" : "en_AE",
      url,
      siteName: site.name,
      title,
      description: page.description,
    },
    twitter: {
      card: "summary",
      title,
      description: page.description,
    },
    other: {
      "content-language": language === "ar" ? "ar-AE" : "en-AE",
      "alternate-language": alternateLanguage === "ar" ? "ar-AE" : "en-AE",
    },
  };
}
