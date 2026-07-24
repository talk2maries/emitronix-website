import { ReactNode } from "react";
import { ArabicPageLocalizer } from "@/components/ArabicPageLocalizer";
import { approvalServices } from "@/data/approvals";
import { blogAuthor, blogPosts } from "@/data/blog";
import type { ArabicPageData } from "@/data/arabic";
import { absoluteUrl, brandLogoImageObject, services, site } from "@/data/site";
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
  const blogPost = page.kind === "blog-post" ? blogPosts.find((post) => `/blog/${post.slug}` === page.path) : null;
  const service = page.kind === "service" ? services.find((item) => item.href === page.path) : null;
  const approval = page.kind === "approval" ? approvalServices.find((item) => item.href === page.path) : null;
  const serviceLike = service
    ? {
        name: page.title,
        description: page.description,
        serviceType: service.title,
        related: service.relatedHrefs,
      }
    : approval
      ? {
          name: page.title,
          description: page.description,
          serviceType: approval.menuLabel,
          related: approval.related.map((slug) => `/${slug}`),
        }
      : null;
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
      ...(blogPost
        ? [
            {
              "@type": "Article",
              "@id": `${arabicUrl}#article`,
              headline: page.title,
              description: page.description,
              image: [absoluteUrl(page.image)],
              datePublished: blogPost.publishedDate,
              dateModified: blogPost.modifiedDate,
              author: blogAuthor,
              publisher: {
                "@id": absoluteUrl("/#localbusiness"),
                name: site.legalName,
                logo: brandLogoImageObject,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${arabicUrl}#webpage`,
              },
              articleSection: blogPost.category,
              keywords: blogPost.targetKeywords.join(", "),
              inLanguage: "ar-AE",
              translationOfWork: {
                "@type": "Article",
                url: englishUrl,
                inLanguage: "en-AE",
              },
            },
          ]
        : []),
      ...(serviceLike
        ? [
            {
              "@type": "Service",
              "@id": `${arabicUrl}#service`,
              name: serviceLike.name,
              description: serviceLike.description,
              url: arabicUrl,
              image: absoluteUrl(page.image),
              areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
              provider: {
                "@id": absoluteUrl("/#localbusiness"),
                name: site.legalName,
                telephone: site.phone,
                email: site.email,
                url: site.url,
              },
              mainEntityOfPage: arabicUrl,
              serviceType: serviceLike.serviceType,
              isRelatedTo: serviceLike.related.map((href) => ({
                "@type": "WebPage",
                url: absoluteUrl(toArabicPath(href)),
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <ArabicPageLocalizer page={page}>{children}</ArabicPageLocalizer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
