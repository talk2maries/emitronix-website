import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, services, site, whatsappUrl } from "@/data/site";

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
        url: absoluteUrl("/images/dubai-building-contracting-company.webp"),
        width: 1920,
        height: 900,
        alt: "Building Contractor Dubai construction skyline by Emitronix",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": absoluteUrl("/#localbusiness"),
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: absoluteUrl("/brand-emblem.svg"),
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
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Emitronix on WhatsApp"
          className="fixed bottom-5 left-5 z-[99999] flex items-center gap-3 rounded-full"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-950/20 ring-4 ring-white">
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="h-10 w-10 fill-current"
            >
              <path d="M16.04 3.2c-7.05 0-12.8 5.72-12.8 12.76 0 2.25.59 4.45 1.72 6.38L3.13 29l6.83-1.79a12.8 12.8 0 0 0 6.08 1.55h.01c7.05 0 12.8-5.72 12.8-12.76S23.1 3.2 16.04 3.2Zm0 23.39h-.01a10.6 10.6 0 0 1-5.39-1.47l-.39-.23-4.05 1.06 1.08-3.94-.26-.4a10.52 10.52 0 0 1-1.62-5.65c0-5.84 4.77-10.59 10.64-10.59 2.84 0 5.51 1.1 7.52 3.1a10.5 10.5 0 0 1 3.12 7.49c0 5.84-4.77 10.63-10.64 10.63Zm5.83-7.94c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.51-.16-.72.16-.21.32-.83 1.05-1.01 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67 0 1.58 1.15 3.1 1.31 3.31.16.21 2.27 3.46 5.5 4.85.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          </span>
          <span className="rounded-lg bg-white px-4 py-3 text-base font-black text-black shadow-xl shadow-slate-900/15">
            Need Help?
          </span>
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
