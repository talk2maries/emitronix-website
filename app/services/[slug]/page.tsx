import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { applySeoOverrides, createPageMetadata } from "@/data/seo";
import { getServiceDeepContent } from "@/data/serviceDeepContent";
import { getServiceByRoutePath, serviceAliasPaths, services } from "@/data/site";

type ServiceAliasPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Array.from(new Set(services.flatMap((service) => serviceAliasPaths(service).map((path) => path.split("/").pop()!)))).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServiceAliasPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceByRoutePath(`/services/${slug}`);
  if (!service) return {};
  const deepContent = getServiceDeepContent(service);

  const base = createPageMetadata({
    title: deepContent.seoTitle,
    description: deepContent.metaDescription,
    path: service.href,
    keywords: deepContent.semanticKeywords,
    image: service.image,
    imageAlt: service.imageAlt,
  });

  return applySeoOverrides(base, service.href);
}

export default async function ServiceAliasPage({ params }: ServiceAliasPageProps) {
  const { slug } = await params;
  const service = getServiceByRoutePath(`/services/${slug}`);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
