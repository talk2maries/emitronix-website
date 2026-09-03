import { TrustPolicyPage } from "@/components/TrustContentPage";
import { createTrustMetadata, technicalReviewPolicy } from "@/data/trustCenter";

export const metadata = createTrustMetadata({
  path: technicalReviewPolicy.path,
  title: technicalReviewPolicy.metaTitle,
  description: technicalReviewPolicy.metaDescription,
});

export default function TechnicalReviewPolicyPage() {
  return <TrustPolicyPage content={technicalReviewPolicy} />;
}
