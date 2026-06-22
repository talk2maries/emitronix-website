import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { absoluteUrl, services } from "@/data/site";

const service = services.find((item) => item.href === "/interior")!;

export const metadata: Metadata = {
  title: "Interior Fit-Out Contractor Dubai",
  description: "Complete interior fit-out solutions for commercial, retail and residential projects in Dubai and UAE.",
  keywords: service.keywords,
  alternates: { canonical: absoluteUrl("/interior") },
};

export default function InteriorPage() {
  return <ServiceDetailPage service={service} />;
}
