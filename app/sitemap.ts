import type { MetadataRoute } from "next";
import { approvalServices } from "@/data/approvals";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, services } from "@/data/site";

const routes = [
  "",
  "/about",
  "/services",
  "/approval",
  "/projects",
  "/industries",
  "/careers",
  "/blog",
  "/resources",
  "/html-sitemap",
  "/contact",
  "/cookie-policy",
  "/privacy-policy",
  "/terms-and-conditions",
  "/ar/cookie-policy",
  "/ar/privacy-policy",
  "/ar/terms-and-conditions",
  ...services.map((service) => service.href),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...approvalServices.map((service) => service.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
