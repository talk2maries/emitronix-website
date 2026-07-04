import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArabicSitePage } from "@/components/ArabicSitePage";
import {
  arabicSitemapPaths,
  getArabicMetadata,
  getArabicPageByEnglishPath,
} from "@/data/arabic";

type ArabicCatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

function englishPathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  return arabicSitemapPaths()
    .filter((path) => path !== "/ar")
    .filter((path) => !["/ar/cookie-policy", "/ar/privacy-policy", "/ar/terms-and-conditions"].includes(path))
    .map((path) => ({ slug: path.replace(/^\/ar\//, "").split("/") }));
}

export async function generateMetadata({ params }: ArabicCatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getArabicPageByEnglishPath(englishPathFromSlug(slug));
  if (!page) return {};
  return getArabicMetadata(page);
}

export default async function ArabicCatchAllPage({ params }: ArabicCatchAllPageProps) {
  const { slug } = await params;
  const page = getArabicPageByEnglishPath(englishPathFromSlug(slug));
  if (!page) notFound();

  return <ArabicSitePage page={page} />;
}
