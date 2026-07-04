import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { createPageMetadata } from "@/data/seo";
import { services } from "@/data/site";

const service = services.find((item) => item.href === "/main-contracting")!;

export const metadata: Metadata = createPageMetadata({
  title: "Main Contractor Dubai",
  description: service.details,
  path: service.href,
  keywords: service.keywords,
  image: service.image,
  imageAlt: service.imageAlt,
});

export default function MainContractingPage() {
  return <ServiceDetailPage service={service} />;
}
