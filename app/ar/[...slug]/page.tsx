import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArabicFullPage } from "@/components/ArabicFullPage";
import { ArabicSitePage } from "@/components/ArabicSitePage";
import {
  arabicSitemapPaths,
  getArabicMetadata,
  getArabicPageByEnglishPath,
} from "@/data/arabic";
import { applySeoOverrides } from "@/data/seo";
import { getServiceByRoutePath } from "@/data/site";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

type ArabicCatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

function englishPathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  const paths = arabicSitemapPaths()
    .filter((path) => path !== "/ar")
    .filter((path) => !["/ar/cookie-policy", "/ar/privacy-policy", "/ar/terms-and-conditions"].includes(path));
  const missingManifestPath = paths.find((path) => isUnknownClosedSetPath(path));
  if (missingManifestPath) {
    throw new Error(`Arabic route manifest is missing ${missingManifestPath}`);
  }
  return paths.map((path) => ({ slug: path.replace(/^\/ar\//, "").split("/") }));
}

export async function generateMetadata({ params }: ArabicCatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const englishPath = englishPathFromSlug(slug);
  const page = getArabicPageByEnglishPath(englishPath);
  if (!page) return {};
  const metadata = await applySeoOverrides(getArabicMetadata(page), `/ar${englishPath}`);
  if (englishPath === "/guest-post") {
    return {
      ...metadata,
      robots: { index: false, follow: true },
    };
  }
  return metadata;
}

export default async function ArabicCatchAllPage({ params }: ArabicCatchAllPageProps) {
  const { slug } = await params;
  const englishPath = englishPathFromSlug(slug);

  if (englishPath === "/approvals") {
    permanentRedirect("/ar/approval");
  }

  if (englishPath.startsWith("/services/")) {
    const aliasService = getServiceByRoutePath(englishPath);
    if (aliasService) {
      permanentRedirect(`/ar${aliasService.href}`);
    }
  }

  const page = getArabicPageByEnglishPath(englishPath);
  if (!page) notFound();

  return (
    <ArabicFullPage page={page}>
      <ArabicSitePage page={page} />
    </ArabicFullPage>
  );
}
