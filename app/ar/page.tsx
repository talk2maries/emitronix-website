import type { Metadata } from "next";
import { ArabicSitePage } from "@/components/ArabicSitePage";
import { getArabicMetadata, getArabicPageByEnglishPath } from "@/data/arabic";

const page = getArabicPageByEnglishPath("/")!;

export const metadata: Metadata = getArabicMetadata(page);

export default function ArabicHomePage() {
  return <ArabicSitePage page={page} />;
}
