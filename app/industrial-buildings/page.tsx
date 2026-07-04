import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { createPageMetadata } from "@/data/seo";
import { services } from "@/data/site";

const service = services.find((item) => item.href === "/industrial-buildings")!;

export const metadata: Metadata = createPageMetadata({
  title: "Industrial Building Contractor Dubai",
  description: service.details,
  path: service.href,
  keywords: service.keywords,
  image: service.image,
  imageAlt: service.imageAlt,
});

export default function IndustrialBuildingsPage() {
  return <ServiceDetailPage service={service} />;
}
