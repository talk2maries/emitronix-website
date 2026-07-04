import type { Metadata } from "next";
import { ApprovalServicePage } from "@/components/ApprovalServicePage";
import { getApprovalService } from "@/data/approvals";
import { createPageMetadata } from "@/data/seo";

const service = getApprovalService("dda-approvals")!;

export const metadata: Metadata = createPageMetadata({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.href,
  keywords: service.keywords,
  image: "/images/emitronix-2026-dubai-coverage.webp",
  imageAlt: `${service.menuLabel} coordination for Dubai construction projects`,
});

export default function DdaApprovalsPage() {
  return <ApprovalServicePage service={service} />;
}
