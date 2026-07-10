import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { CookieConsentManager } from "@/components/CookieConsentManager";
import { DocumentLocaleSync } from "@/components/DocumentLocaleSync";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SeoRuntime } from "@/components/SeoRuntime";
import { absoluteUrl, services, site, whatsappUrl } from "@/data/site";
import { readSiteFiles } from "@/lib/adminStore";

const googleTagManagerId = "GTM-MSM8MPD6";

const cityServiceAreas = new Set(["Dubai", "Abu Dhabi", "Sharjah"]);

// Refresh statically generated pages every 5 minutes so administrator SEO
// overrides and global scripts take effect without a rebuild.
export const revalidate = 300;

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Emitronix Contracting LLC",
    "Dubai civil contracting",
    "G+4 building contractor Dubai",
    "building contractor Dubai",
    "civil contractor Dubai",
    "Dubai contracting company",
    "warehouse contractor UAE",
    "renovation contractor Dubai",
    "DEWA approvals",
    "Dubai Municipality approvals",
    "Dubai Civil Defence approvals",
    "authority approvals Dubai",
    "interior fit-out Dubai",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      en: absoluteUrl("/"),
      ar: absoluteUrl("/ar"),
      "en-AE": absoluteUrl("/"),
      "ar-AE": absoluteUrl("/ar"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: absoluteUrl("/images/dubai-building-contracting-company.webp"),
        width: 1672,
        height: 941,
        alt: "Dubai construction skyline and crane works for Emitronix Contracting LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [absoluteUrl("/images/dubai-building-contracting-company.webp")],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-emitronix-pathname") ?? "";
  const isArabicDocument = pathname === "/ar" || pathname.startsWith("/ar/");
  const documentLang = isArabicDocument ? "ar" : "en";
  const documentDir = isArabicDocument ? "rtl" : "ltr";
  const siteFiles = await readSiteFiles().catch(() => ({}) as Awaited<ReturnType<typeof readSiteFiles>>);
  const organizationId = absoluteUrl("/#organization");
  const localBusinessId = absoluteUrl("/#localbusiness");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/emitronix-logo-horizontal.svg"),
        },
        image: absoluteUrl("/images/dubai-building-contracting-company.webp"),
        description: site.description,
        email: site.email,
        telephone: site.phone,
      },
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": localBusinessId,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        parentOrganization: {
          "@id": organizationId,
        },
        logo: absoluteUrl("/images/emitronix-logo-horizontal.svg"),
        image: absoluteUrl("/images/dubai-building-contracting-company.webp"),
        description: site.description,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Dubai Investment Park 02",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        areaServed: site.serviceArea.map((name) => ({
          "@type": cityServiceAreas.has(name) ? "City" : "Country",
          name,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          email: site.email,
          contactType: "customer service",
          areaServed: "AE",
          availableLanguage: ["English", "Arabic"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dubai contracting and approval services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            url: absoluteUrl(service.href),
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              areaServed: "Dubai, United Arab Emirates",
              provider: {
                "@id": localBusinessId,
              },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: {
          "@id": organizationId,
        },
        inLanguage: ["en-AE", "ar-AE"],
      },
    ],
  };

  return (
    <html lang={documentLang} dir={documentDir} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga -- Google Tag Manager requires this document-head bootstrap snippet. */}
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');
`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          id="emitronix-document-language"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var isArabic = window.location.pathname === '/ar' || window.location.pathname.indexOf('/ar/') === 0;
  document.documentElement.lang = isArabic ? 'ar' : 'en';
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
})();
`,
          }}
        />
        <script
          id="emitronix-google-consent-default"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
`,
          }}
        />
        <DocumentLocaleSync />
        {siteFiles.headScripts ? (
          <div id="emitronix-global-head-scripts" dangerouslySetInnerHTML={{ __html: siteFiles.headScripts }} />
        ) : null}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieConsentManager />
        <FloatingActions phone={site.phone} whatsappUrl={whatsappUrl} />
        <SeoRuntime />
        {siteFiles.footerScripts ? (
          <div id="emitronix-global-footer-scripts" dangerouslySetInnerHTML={{ __html: siteFiles.footerScripts }} />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
