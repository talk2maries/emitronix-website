import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsentManager } from "@/components/CookieConsentManager";
import { AttributionCapture } from "@/components/AttributionCapture";
import { DocumentLocaleSync } from "@/components/DocumentLocaleSync";
import { FloatingActions } from "@/components/FloatingActions";
import { GtmEventBridge } from "@/components/GtmEventBridge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  absoluteUrl,
  brandAssets,
  brandLogoImageObject,
  services,
  site,
  socialLinks,
  whatsappUrl,
} from "@/data/site";
import { googleTagManagerId } from "@/lib/googleTagManager";

const cityServiceAreas = new Set(["Dubai", "Abu Dhabi", "Sharjah"]);

// Refresh statically generated pages every 5 minutes so administrator SEO
// overrides take effect without a rebuild.
export const revalidate = 300;

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
});

const googleTagManagerBootstrap = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(googleTagManagerId)});
`;

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
    "building contractor Dubai",
    "civil contractor Dubai",
    "warehouse contractor UAE",
    "renovation contractor Dubai",
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
  robots: {
    index: true,
    follow: true,
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
        url: absoluteUrl(brandAssets.socialCard),
        width: 1200,
        height: 630,
        alt: "Dubai commercial building and warehouse construction scene",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [absoluteUrl(brandAssets.socialCard)],
  },
  icons: {
    icon: [
      { url: brandAssets.markSvg, type: "image/svg+xml" },
      { url: brandAssets.faviconPng, type: "image/png", sizes: "32x32" },
    ],
    shortcut: brandAssets.markSvg,
    apple: [
      {
        url: brandAssets.appleTouchIcon,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = absoluteUrl("/#organization");
  const officeContactId = absoluteUrl("/#office-contact");
  const mobileContactId = absoluteUrl("/#mobile-contact");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
        "@id": organizationId,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: brandLogoImageObject,
        image: absoluteUrl(brandAssets.socialCard),
        description: site.description,
        email: site.email,
        telephone: site.phoneE164,
        sameAs: socialLinks.map((item) => item.href),
        founder: {
          "@id": absoluteUrl("/founder#person"),
        },
        publishingPrinciples: absoluteUrl("/editorial-policy"),
        ethicsPolicy: absoluteUrl("/editorial-policy"),
        correctionsPolicy: absoluteUrl("/corrections-policy"),
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
        contactPoint: [
          { "@id": officeContactId },
          { "@id": mobileContactId },
        ],
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
                "@id": organizationId,
              },
            },
          })),
        },
      },
      {
        "@type": "ContactPoint",
        "@id": officeContactId,
        name: "Emitronix primary office contact",
        telephone: site.phoneE164,
        email: site.email,
        contactType: "customer service",
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates",
        },
        availableLanguage: ["English", "Arabic"],
        url: absoluteUrl("/contact"),
      },
      {
        "@type": "ContactPoint",
        "@id": mobileContactId,
        name: "Emitronix secondary mobile and WhatsApp contact",
        telephone: site.mobileE164,
        contactType: "customer service",
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates",
        },
        availableLanguage: ["English", "Arabic"],
        url: whatsappUrl,
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
      <head>
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
          id="emitronix-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
        <script
          id="emitronix-google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: googleTagManagerBootstrap,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(googleTagManagerId)}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            aria-hidden="true"
            tabIndex={-1}
          />
        </noscript>
        <a href="#main-content" className="skip-link">
          <span className="skip-link-label-en" lang="en-AE">Skip to main content</span>
          <span className="skip-link-label-ar" lang="ar-AE" dir="rtl">تخطي إلى المحتوى الرئيسي</span>
        </a>
        <GtmEventBridge
          phoneNumbers={[site.phoneE164, site.mobileE164]}
          whatsappNumbers={[site.mobileE164]}
          emailAddresses={[site.email]}
        />
        <AttributionCapture />
        <DocumentLocaleSync />
        <Header />
        <main id="main-content" className="min-h-screen" tabIndex={-1}>{children}</main>
        <Footer />
        <CookieConsentManager />
        <FloatingActions whatsappUrl={whatsappUrl} />
      </body>
    </html>
  );
}
