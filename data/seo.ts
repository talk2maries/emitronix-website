import type { Metadata } from "next";
import { getSeoOverride } from "@/lib/adminStore";
import { absoluteUrl, site } from "@/data/site";
import { toArabicPath } from "@/lib/i18n";

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
const MAX_TITLE_LENGTH = 70;
const MAX_META_KEYWORDS = 12;

export function resolveMetaTitle(title: string) {
  if (title.includes(site.name)) return title;

  const brandedTitle = `${title} | ${site.name}`;
  return brandedTitle.length <= MAX_TITLE_LENGTH ? brandedTitle : title;
}

function normalizeMetaKeywords(keywords: string[] | undefined) {
  if (!keywords) return undefined;

  const normalized = Array.from(
    new Set(
      keywords
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  ).slice(0, MAX_META_KEYWORDS);

  return normalized.length > 0 ? normalized : undefined;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = defaultImage,
  imageAlt = defaultImageAlt,
}: PageMetadataInput): Metadata {
  const resolvedTitle = resolveMetaTitle(title);
  const url = absoluteUrl(path);
  const arabicUrl = absoluteUrl(toArabicPath(path));
  const imageUrl = absoluteUrl(image);

  return {
    title: {
      absolute: resolvedTitle,
    },
    description,
    keywords: normalizeMetaKeywords(keywords),
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ar: arabicUrl,
        "en-AE": url,
        "ar-AE": arabicUrl,
        "x-default": url,
      },
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

/**
 * Merges administrator SEO overrides (managed in /admin/seo, stored in
 * storage/seo-overrides.json) into a page's base metadata.
 */
export async function applySeoOverrides(base: Metadata, pagePath: string): Promise<Metadata> {
  const override = await getSeoOverride(pagePath).catch(() => null);
  if (!override) return base;

  const merged: Metadata = { ...base };

  if (override.metaTitle) merged.title = { absolute: override.metaTitle };
  if (override.metaDescription) merged.description = override.metaDescription;
  if (override.keywords) merged.keywords = normalizeMetaKeywords(override.keywords.split(","));

  if (override.canonical) {
    merged.alternates = {
      ...merged.alternates,
      canonical: override.canonical.startsWith("http") ? override.canonical : absoluteUrl(override.canonical),
    };
  }

  if (override.ogTitle || override.ogDescription || override.ogImage || override.metaTitle || override.metaDescription) {
    merged.openGraph = {
      ...merged.openGraph,
      title: override.ogTitle || override.metaTitle || undefined,
      description: override.ogDescription || override.metaDescription || undefined,
      ...(override.ogImage
        ? { images: [{ url: override.ogImage.startsWith("http") ? override.ogImage : absoluteUrl(override.ogImage), width: 1672, height: 941 }] }
        : {}),
    };
    merged.twitter = {
      ...merged.twitter,
      title: override.ogTitle || override.metaTitle || undefined,
      description: override.ogDescription || override.metaDescription || undefined,
      ...(override.ogImage
        ? { images: [override.ogImage.startsWith("http") ? override.ogImage : absoluteUrl(override.ogImage)] }
        : {}),
    };
  }

  if (override.noindex) {
    merged.robots = { index: false, follow: false };
  }

  return merged;
}

/**
 * Wraps createPageMetadata in a generateMetadata resolver so administrator
 * overrides are read at render time (and refreshed via ISR/revalidatePath)
 * instead of being frozen into the build.
 */
export function createMetadataResolver(input: PageMetadataInput) {
  return async function generateMetadata(): Promise<Metadata> {
    return applySeoOverrides(createPageMetadata(input), input.path);
  };
}
