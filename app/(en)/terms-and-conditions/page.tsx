import type { Metadata } from "next";
import { PolicyContentPage } from "@/components/PolicyContentPage";
import { createPolicyPageMetadata, getPolicyPage } from "@/lib/policyPages";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return createPolicyPageMetadata("terms", "en");
}

export default async function TermsAndConditionsPage() {
  const { config, page } = await getPolicyPage("terms", "en");
  return <PolicyContentPage pageKey="terms" page={page} language="en" updatedAt={config.updatedAt} />;
}
