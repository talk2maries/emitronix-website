import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsentManager } from "@/components/CookieConsentManager";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, services, site, whatsappUrl } from "@/data/site";

const cityServiceAreas = new Set(["Dubai", "Abu Dhabi", "Sharjah"]);

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
      "en-AE": absoluteUrl("/"),
      "ar-AE": absoluteUrl("/ar"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en-AE" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script
          id="emitronix-document-language"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var isArabic = window.location.pathname === '/ar' || window.location.pathname.indexOf('/ar/') === 0;
  document.documentElement.lang = isArabic ? 'ar-AE' : 'en-AE';
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieConsentManager />
        <FloatingActions phone={site.phone} whatsappUrl={whatsappUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
