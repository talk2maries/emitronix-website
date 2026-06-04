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
    "MEP contractor UAE",
    "LV switchgear manufacturing Dubai",
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
        url: absoluteUrl("/images/hero-construction.svg"),
        width: 1200,
        height: 700,
        alt: "Emitronix UAE construction and engineering visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [absoluteUrl("/images/hero-construction.svg")],
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
    "@type": "LocalBusiness",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    image: absoluteUrl("/images/hero-construction.svg"),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai Investment Park 02",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
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
