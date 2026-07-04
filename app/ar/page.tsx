import type { Metadata } from "next";
import HomePage from "@/app/page";
import { ArabicFullPage } from "@/components/ArabicFullPage";
import { getArabicMetadata, getArabicPageByEnglishPath } from "@/data/arabic";

const page = getArabicPageByEnglishPath("/")!;

export const metadata: Metadata = getArabicMetadata(page);

export default function ArabicHomePage() {
  return (
    <ArabicFullPage page={page}>
      <HomePage />
    </ArabicFullPage>
  );
}
