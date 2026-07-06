import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 65, 75],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
