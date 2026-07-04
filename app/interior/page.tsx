import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { services } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

const service = services.find((item) => item.href === "/interior")!;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Interior Fit-Out Contractor Dubai",
    description: "Complete interior fit-out solutions for commercial, retail and residential projects in Dubai and UAE.",
    path: "/interior",
    keywords: service.keywords,
    image: service.image,
    imageAlt: service.imageAlt,
  }),
};

export default function InteriorPage() {
  return <ServiceDetailPage service={service} />;
}
