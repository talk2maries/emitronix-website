import type { Metadata } from "next";
import HomePage from "@/app/page";
import { ArabicFullPage } from "@/components/ArabicFullPage";
import { getArabicMetadata, getArabicPageByEnglishPath } from "@/data/arabic";
import { applySeoOverrides } from "@/data/seo";

const page = getArabicPageByEnglishPath("/")!;

export async function generateMetadata(): Promise<Metadata> {
  return applySeoOverrides(getArabicMetadata(page), "/ar");
}

export default function ArabicHomePage() {
  return (
    <ArabicFullPage page={page}>
      <HomePage />
    </ArabicFullPage>
  );
}
