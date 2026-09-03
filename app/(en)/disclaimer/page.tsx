import { TrustPolicyPage } from "@/components/TrustContentPage";
import { createTrustMetadata, disclaimerPolicy } from "@/data/trustCenter";

export const metadata = createTrustMetadata({
  path: disclaimerPolicy.path,
  title: disclaimerPolicy.metaTitle,
  description: disclaimerPolicy.metaDescription,
});

export default function DisclaimerPage() {
  return <TrustPolicyPage content={disclaimerPolicy} />;
}
