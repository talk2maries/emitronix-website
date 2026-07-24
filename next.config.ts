import type { NextConfig } from "next";
import { serviceAliasPaths, services } from "./data/site";

const configuredDistDir = process.env.NEXT_DIST_DIR?.trim();

if (configuredDistDir && !/^\.next(?:-[a-z0-9-]+)?$/i.test(configuredDistDir)) {
  throw new Error("NEXT_DIST_DIR must be .next or a project-local .next-* directory.");
}

const serviceRedirects = services.flatMap((service) =>
  serviceAliasPaths(service).flatMap((source) => [
    {
      source,
      destination: service.href,
      permanent: true,
    },
    {
      source: `/ar${source}`,
      destination: `/ar${service.href}`,
      permanent: true,
    },
  ]),
);

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' https:",
      "connect-src 'self' https:",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  // Keep App Router metadata in the document head for every user agent.
  // Without this, Next.js streams metadata into <body> for crawlers such as
  // Screaming Frog whenever a route is rendered dynamically.
  htmlLimitedBots: /.*/,
  // Production validation builds must not overwrite the build currently served
  // by PM2. NEXT_DIST_DIR gives the deployment workflow an isolated build target.
  distDir: configuredDistDir || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 65, 75],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/approvals",
        destination: "/approval",
        permanent: true,
      },
      {
        source: "/ar/approvals",
        destination: "/ar/approval",
        permanent: true,
      },
      ...serviceRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet",
          },
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
