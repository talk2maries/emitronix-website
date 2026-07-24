import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import AboutPage from "@/app/about/page";
import ApprovalPage from "@/app/approval/page";
import BlogPage from "@/app/blog/page";
import BlogArticlePage from "@/app/blog/[slug]/page";
import CareersPage from "@/app/careers/page";
import ContactPage from "@/app/contact/page";
import GuestPostPage from "@/app/guest-post/page";
import HtmlSitemapPage from "@/app/html-sitemap/page";
import IndustriesPage from "@/app/industries/page";
import ProjectsPage from "@/app/projects/page";
import ResourcesPage from "@/app/resources/page";
import ServicesPage from "@/app/services/page";
import { ApprovalServicePage } from "@/components/ApprovalServicePage";
import { ArabicFullPage } from "@/components/ArabicFullPage";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { approvalServices } from "@/data/approvals";
import {
  arabicSitemapPaths,
  getArabicMetadata,
  getArabicPageByEnglishPath,
} from "@/data/arabic";
import { blogPosts } from "@/data/blog";
import { applySeoOverrides } from "@/data/seo";
import { getServiceByRoutePath } from "@/data/site";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

type ArabicCatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

function englishPathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`;
}

const commonPages: Record<string, () => ReactElement> = {
  "/about": AboutPage,
  "/services": ServicesPage,
  "/approval": ApprovalPage,
  "/approvals": ApprovalPage,
  "/projects": ProjectsPage,
  "/industries": IndustriesPage,
  "/careers": CareersPage,
  "/blog": BlogPage,
  "/resources": ResourcesPage,
  "/html-sitemap": HtmlSitemapPage,
  "/contact": ContactPage,
  "/guest-post": GuestPostPage,
};

export function generateStaticParams() {
  const paths = arabicSitemapPaths()
    .filter((path) => path !== "/ar")
    .filter((path) => !["/ar/cookie-policy", "/ar/privacy-policy", "/ar/terms-and-conditions"].includes(path));
  const missingManifestPath = paths.find((path) => isUnknownClosedSetPath(path));
  if (missingManifestPath) {
    throw new Error(`Arabic route manifest is missing ${missingManifestPath}`);
  }
  return paths.map((path) => ({ slug: path.replace(/^\/ar\//, "").split("/") }));
}

export async function generateMetadata({ params }: ArabicCatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const englishPath = englishPathFromSlug(slug);
  const page = getArabicPageByEnglishPath(englishPath);
  if (!page) return {};
  const metadata = await applySeoOverrides(getArabicMetadata(page), `/ar${englishPath}`);
  if (englishPath === "/guest-post") {
    return {
      ...metadata,
      robots: { index: false, follow: true },
    };
  }
  return metadata;
}

export default async function ArabicCatchAllPage({ params }: ArabicCatchAllPageProps) {
  const { slug } = await params;
  const englishPath = englishPathFromSlug(slug);

  if (englishPath === "/approvals") {
    permanentRedirect("/ar/approval");
  }

  if (englishPath.startsWith("/services/")) {
    const aliasService = getServiceByRoutePath(englishPath);
    if (aliasService) {
      permanentRedirect(`/ar${aliasService.href}`);
    }
  }

  const page = getArabicPageByEnglishPath(englishPath);
  if (!page) notFound();

  const CommonPage = commonPages[englishPath];
  if (CommonPage) {
    return (
      <ArabicFullPage page={page}>
        <CommonPage />
      </ArabicFullPage>
    );
  }

  const service = getServiceByRoutePath(englishPath);
  if (service) {
    return (
      <ArabicFullPage page={page}>
        <ServiceDetailPage service={service} />
      </ArabicFullPage>
    );
  }

  const approval = approvalServices.find((item) => item.href === englishPath);
  if (approval) {
    return (
      <ArabicFullPage page={page}>
        <ApprovalServicePage service={approval} />
      </ArabicFullPage>
    );
  }

  const blogMatch = englishPath.match(/^\/blog\/([^/]+)$/);
  const blogSlug = blogMatch?.[1];
  if (blogSlug && blogPosts.some((post) => post.slug === blogSlug)) {
    const article = await BlogArticlePage({ params: Promise.resolve({ slug: blogSlug }) });
    return <ArabicFullPage page={page}>{article}</ArabicFullPage>;
  }

  notFound();
}
