import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, services, site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
        url: absoluteUrl("/images/emitronix-hero-modern.webp"),
        width: 1915,
        height: 821,
        alt: "Emitronix UAE construction and engineering visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [absoluteUrl("/images/emitronix-hero-modern.webp")],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": absoluteUrl("/#localbusiness"),
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: absoluteUrl("/brand-emblem.svg"),
    image: absoluteUrl("/images/emitronix-hero-modern.webp"),
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
      "@type": name === "Dubai" ? "City" : "Country",
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
      availableLanguage: ["English"],
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
            "@id": absoluteUrl("/#localbusiness"),
          },
        },
      })),
    },
  };

  return (
    <html lang="en-AE" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
