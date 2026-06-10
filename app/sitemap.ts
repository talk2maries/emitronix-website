import type { MetadataRoute } from "next";
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
