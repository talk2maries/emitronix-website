import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { absoluteUrl, services } from "@/data/site";

const service = services.find((item) => item.href === "/approval")!;

export const metadata: Metadata = {
  title: "Authority Approvals",
  description: "DEWA, Dubai Municipality, DCD, RTA, Trakhees, DDA, Dubai South and JAFZA approval coordination in Dubai.",
  keywords: service.keywords,
  alternates: { canonical: absoluteUrl("/approval") },
};

export default function ApprovalPage() {
  return <ServiceDetailPage service={service} />;
}
