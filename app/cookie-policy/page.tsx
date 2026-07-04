import type { Metadata } from "next";
import { PolicyContentPage } from "@/components/PolicyContentPage";
import { createPolicyPageMetadata, getPolicyPage } from "@/lib/policyPages";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return createPolicyPageMetadata("cookiePolicy", "en");
}

export default async function CookiePolicyPage() {
  const { config, page } = await getPolicyPage("cookiePolicy", "en");
  return <PolicyContentPage pageKey="cookiePolicy" page={page} language="en" updatedAt={config.updatedAt} />;
}
