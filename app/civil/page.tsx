import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { absoluteUrl, services } from "@/data/site";

const service = services.find((item) => item.href === "/civil")!;

export const metadata: Metadata = {
  title: "Civil Contracting Dubai",
  description: "Civil contracting in Dubai for G+4 buildings, villas, warehouses, commercial and industrial projects across the UAE.",
  keywords: service.keywords,
  alternates: { canonical: absoluteUrl("/civil") },
};

export default function CivilPage() {
  return <ServiceDetailPage service={service} />;
}
