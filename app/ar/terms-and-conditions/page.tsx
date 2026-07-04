import type { Metadata } from "next";
import { PolicyContentPage } from "@/components/PolicyContentPage";
import { createPolicyPageMetadata, getPolicyPage } from "@/lib/policyPages";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return createPolicyPageMetadata("terms", "ar");
}

export default async function ArabicTermsAndConditionsPage() {
  const { config, page } = await getPolicyPage("terms", "ar");
  return <PolicyContentPage pageKey="terms" page={page} language="ar" updatedAt={config.updatedAt} />;
}
