import { ApprovalServicePage } from "@/components/ApprovalServicePage";
import { getApprovalService } from "@/data/approvals";
import { createMetadataResolver } from "@/data/seo";
import { getApprovalDeepContent } from "@/data/serviceDeepContent";
import { getGeneratedImage } from "@/data/generatedImages";

const service = getApprovalService("concordia-dmcc-approvals")!;
const deepContent = getApprovalDeepContent(service);

export const generateMetadata = createMetadataResolver({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.href,
  keywords: deepContent.semanticKeywords,
  image: getGeneratedImage(service.generatedImage).og!.src,
  imageAlt: getGeneratedImage(service.generatedImage).alt,
});

export default function ConcordiaDmccApprovalsPage() {
  return <ApprovalServicePage service={service} />;
}
