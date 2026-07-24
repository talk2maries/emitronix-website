import type { MetadataRoute } from "next";
import { brandAssets, site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F8FBFF",
    theme_color: "#194991",
    icons: [
      {
        src: brandAssets.appIcon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandAssets.appIcon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandAssets.appIcon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
