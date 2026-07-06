import { ApprovalServicePage } from "@/components/ApprovalServicePage";
import { getApprovalService } from "@/data/approvals";
import { createMetadataResolver } from "@/data/seo";
import { getApprovalDeepContent } from "@/data/serviceDeepContent";

const service = getApprovalService("dcd-approvals")!;
const deepContent = getApprovalDeepContent(service);

export const generateMetadata = createMetadataResolver({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.href,
  keywords: deepContent.semanticKeywords,
  image: "/images/dubai-authority-approval-contractor.webp",
  imageAlt: `${service.menuLabel} coordination for Dubai construction projects`,
});

export default function DcdApprovalsPage() {
  return <ApprovalServicePage service={service} />;
}
