import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { createMetadataResolver } from "@/data/seo";
import { getServiceDeepContent } from "@/data/serviceDeepContent";
import { services } from "@/data/site";

const service = services.find((item) => item.href === "/design-build")!;
const deepContent = getServiceDeepContent(service);

export const generateMetadata = createMetadataResolver({
  title: deepContent.seoTitle,
  description: deepContent.metaDescription,
  path: service.href,
  keywords: deepContent.semanticKeywords,
  image: service.image,
  imageAlt: service.imageAlt,
});

export default function DesignBuildPage() {
  return <ServiceDetailPage service={service} />;
}
