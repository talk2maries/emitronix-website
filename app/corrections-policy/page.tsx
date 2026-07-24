import { TrustPolicyPage } from "@/components/TrustContentPage";
import { correctionsPolicy, createTrustMetadata } from "@/data/trustCenter";

export const metadata = createTrustMetadata({
  path: correctionsPolicy.path,
  title: correctionsPolicy.metaTitle,
  description: correctionsPolicy.metaDescription,
});

export default function CorrectionsPolicyPage() {
  return <TrustPolicyPage content={correctionsPolicy} />;
}
