import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getServiceDeepContent } from "@/data/serviceDeepContent";
import { services } from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

const service = services.find((item) => item.href === "/civil")!;
const deepContent = getServiceDeepContent(service);

export const generateMetadata = createMetadataResolver({
  title: deepContent.seoTitle,
  description: deepContent.metaDescription,
  path: service.href,
  keywords: deepContent.semanticKeywords,
  image: service.image,
  imageAlt: service.imageAlt,
});

export default function CivilPage() {
  return <ServiceDetailPage service={service} />;
}
