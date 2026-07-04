import type { Metadata } from "next";
import { PolicyContentPage } from "@/components/PolicyContentPage";
import { createPolicyPageMetadata, getPolicyPage } from "@/lib/policyPages";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return createPolicyPageMetadata("cookiePolicy", "ar");
}

export default async function ArabicCookiePolicyPage() {
  const { config, page } = await getPolicyPage("cookiePolicy", "ar");
  return <PolicyContentPage pageKey="cookiePolicy" page={page} language="ar" updatedAt={config.updatedAt} />;
}
