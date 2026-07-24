import { TrustPolicyPage } from "@/components/TrustContentPage";
import { createTrustMetadata, editorialPolicy } from "@/data/trustCenter";

export const metadata = createTrustMetadata({
  path: editorialPolicy.path,
  title: editorialPolicy.metaTitle,
  description: editorialPolicy.metaDescription,
});

export default function EditorialPolicyPage() {
  return <TrustPolicyPage content={editorialPolicy} />;
}
