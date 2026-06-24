import type { Metadata } from "next";
import { ApprovalServicePage } from "@/components/ApprovalServicePage";
import { getApprovalService } from "@/data/approvals";
import { absoluteUrl } from "@/data/site";

const service = getApprovalService("rta-approval")!;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  alternates: { canonical: absoluteUrl(service.href) },
  openGraph: {
    title: service.seoTitle,
    description: service.metaDescription,
    url: absoluteUrl(service.href),
    images: [absoluteUrl("/images/dubai-authority-approval-contractor.webp")],
  },
};

export default function RtaApprovalPage() {
  return <ApprovalServicePage service={service} />;
}
