import type { Metadata } from "next";
import { PolicyContentPage } from "@/components/PolicyContentPage";
import { createPolicyPageMetadata, getPolicyPage } from "@/lib/policyPages";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return createPolicyPageMetadata("privacyPolicy", "en");
}

export default async function PrivacyPolicyPage() {
  const { config, page } = await getPolicyPage("privacyPolicy", "en");
  return <PolicyContentPage pageKey="privacyPolicy" page={page} language="en" updatedAt={config.updatedAt} />;
}
