import { notFound, permanentRedirect } from "next/navigation";
import { getServiceByRoutePath, serviceAliasPaths, services } from "@/data/site";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

type ServiceAliasPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const paths = Array.from(new Set(services.flatMap((service) => serviceAliasPaths(service))));
  const missingManifestPath = paths.find((path) => isUnknownClosedSetPath(path));
  if (missingManifestPath) {
    throw new Error(`Service route manifest is missing ${missingManifestPath}`);
  }
  return paths.map((path) => ({ slug: path.split("/").pop()! }));
}

export default async function ServiceAliasPage({ params }: ServiceAliasPageProps) {
  const { slug } = await params;
  const service = getServiceByRoutePath(`/services/${slug}`);
  if (!service) notFound();

  permanentRedirect(service.href);
}
