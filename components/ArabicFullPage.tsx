import { ReactNode } from "react";
import { ArabicPageLocalizer } from "@/components/ArabicPageLocalizer";
import type { ArabicPageData } from "@/data/arabic";
import { absoluteUrl, site } from "@/data/site";
import { toArabicPath } from "@/lib/i18n";

type ArabicFullPageProps = {
  page: ArabicPageData;
  children: ReactNode;
};

function breadcrumbItems(page: ArabicPageData) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: absoluteUrl("/ar"),
    },
  ];

  if (page.path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.title,
      item: absoluteUrl(toArabicPath(page.path)),
    });
  }

  return items;
}

export function ArabicFullPage({ page, children }: ArabicFullPageProps) {
  const arabicUrl = absoluteUrl(toArabicPath(page.path));
  const englishUrl = absoluteUrl(page.path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${arabicUrl}#webpage`,
        url: arabicUrl,
        name: page.title,
        description: page.description,
        inLanguage: "ar-AE",
        isPartOf: {
          "@id": `${site.url}/#website`,
          name: site.name,
          url: site.url,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(page.image),
          caption: page.imageAlt,
        },
        translationOfWork: {
          "@type": "WebPage",
          url: englishUrl,
          inLanguage: "en-AE",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${arabicUrl}#breadcrumb`,
        itemListElement: breadcrumbItems(page),
      },
    ],
  };

  return (
    <>
      <ArabicPageLocalizer page={page}>{children}</ArabicPageLocalizer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
