import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
};

const defaultImage = "/images/dubai-building-contracting-company.webp";
const defaultImageAlt = "Dubai construction skyline and crane works by Emitronix Contracting LLC";

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = defaultImage,
  imageAlt = defaultImageAlt,
}: PageMetadataInput): Metadata {
  const resolvedTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: {
      absolute: resolvedTitle,
    },
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url,
      siteName: site.name,
      title: resolvedTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1672,
          height: 941,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}
