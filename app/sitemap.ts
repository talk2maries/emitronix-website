import type { MetadataRoute } from "next";
import { approvalServices } from "@/data/approvals";
import { absoluteUrl } from "@/data/site";

const routes = [
  "",
  "/about",
  "/services",
  "/civil",
  "/interior",
  "/approval",
  "/projects",
  "/resources",
  "/contact",
  ...approvalServices.map((service) => service.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
