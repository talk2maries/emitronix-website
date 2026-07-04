import type { Metadata } from "next";
import { PolicyContentPage } from "@/components/PolicyContentPage";
import { createPolicyPageMetadata, getPolicyPage } from "@/lib/policyPages";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return createPolicyPageMetadata("privacyPolicy", "ar");
}

export default async function ArabicPrivacyPolicyPage() {
  const { config, page } = await getPolicyPage("privacyPolicy", "ar");
  return <PolicyContentPage pageKey="privacyPolicy" page={page} language="ar" updatedAt={config.updatedAt} />;
}
