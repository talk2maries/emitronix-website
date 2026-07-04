import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { services } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

const service = services.find((item) => item.href === "/civil")!;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Civil Contracting Dubai",
    description: "Civil contracting in Dubai for G+4 buildings, villas, warehouses, commercial and industrial projects across the UAE.",
    path: "/civil",
    keywords: service.keywords,
    image: service.image,
    imageAlt: service.imageAlt,
  }),
};

export default function CivilPage() {
  return <ServiceDetailPage service={service} />;
}
