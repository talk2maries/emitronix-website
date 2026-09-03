import type { Metadata } from "next";
import { absoluteUrl, brandAssets, site } from "@/data/site";

export function createRootMetadata(locale: "en" | "ar"): Metadata {
  return {
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
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
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
}
