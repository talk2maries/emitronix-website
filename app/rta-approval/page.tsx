import type { Metadata } from "next";
import { ApprovalServicePage } from "@/components/ApprovalServicePage";
import { getApprovalService } from "@/data/approvals";
import { createPageMetadata } from "@/data/seo";

const service = getApprovalService("rta-approval")!;

export const metadata: Metadata = createPageMetadata({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.href,
  keywords: service.keywords,
  image: "/images/dubai-authority-approval-contractor.webp",
  imageAlt: `${service.menuLabel} coordination for Dubai construction projects`,
});

export default function RtaApprovalPage() {
  return <ApprovalServicePage service={service} />;
}
