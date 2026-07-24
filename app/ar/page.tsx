import type { Metadata } from "next";
import { ArabicFullPage } from "@/components/ArabicFullPage";
import { ArabicSitePage } from "@/components/ArabicSitePage";
import { getArabicMetadata, getArabicPageByEnglishPath } from "@/data/arabic";
import { applySeoOverrides } from "@/data/seo";

const page = getArabicPageByEnglishPath("/")!;

export async function generateMetadata(): Promise<Metadata> {
  return applySeoOverrides(getArabicMetadata(page), "/ar");
}

export default function ArabicHomePage() {
  return (
    <ArabicFullPage page={page}>
      <ArabicSitePage page={page} />
    </ArabicFullPage>
  );
}
