import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { absoluteUrl, services } from "@/data/site";

const service = services.find((item) => item.href === "/mep")!;

export const metadata: Metadata = {
  title: "MEP Contracting",
  description: "Electrical, plumbing, HVAC, fire alarm, ELV and complete MEP execution services in Dubai and UAE.",
  keywords: service.keywords,
  alternates: { canonical: absoluteUrl("/mep") },
};

export default function MepPage() {
  return <ServiceDetailPage service={service} />;
}
