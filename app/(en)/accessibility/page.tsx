import { TrustPolicyPage } from "@/components/TrustContentPage";
import { accessibilityPolicy, createTrustMetadata } from "@/data/trustCenter";

export const metadata = createTrustMetadata({
  path: accessibilityPolicy.path,
  title: accessibilityPolicy.metaTitle,
  description: accessibilityPolicy.metaDescription,
});

export default function AccessibilityPage() {
  return <TrustPolicyPage content={accessibilityPolicy} />;
}
