import type { NextConfig } from "next";
import { serviceAliasPaths, services } from "./data/site";
import { warehouseBlogRedirects } from "./data/warehouseRoutes";

const configuredDistDir = process.env.NEXT_DIST_DIR?.trim();
const isDevelopment = process.env.NODE_ENV === "development";

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

const retiredArticleRedirects = [
  {
    source: "/blog/warehouse-design-guide-uae",
    destination: "/blog/warehouse-construction-dubai-planning-design-authority-approvals",
  },
  {
    source: "/blog/main-contractor-vs-general-contractor-dubai",
    destination: "/blog/choose-best-building-contractor-dubai",
  },
  {
    source: "/blog/construction-cost-saving-tips-dubai",
    destination: "/blog/complete-guide-civil-construction-dubai-2026",
  },
  {
    source: "/blog/industrial-building-planning-guide-uae",
    destination: "/industrial-buildings",
  },
  {
    source: "/ar/blog/warehouse-design-guide-uae",
    destination: "/ar/blog/warehouse-construction-dubai-planning-design-authority-approvals",
  },
  {
    source: "/ar/blog/main-contractor-vs-general-contractor-dubai",
    destination: "/ar/blog/choose-best-building-contractor-dubai",
  },
  {
    source: "/ar/blog/construction-cost-saving-tips-dubai",
    destination: "/ar/blog/complete-guide-civil-construction-dubai-2026",
  },
  {
    source: "/ar/blog/industrial-building-planning-guide-uae",
    destination: "/ar/industrial-buildings",
  },
];

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
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https:`,
      `connect-src 'self' https:${isDevelopment ? " ws:" : ""}`,
      "frame-src 'self' https://www.googletagmanager.com",
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
  // Keep metadata in <head> for search, social, answer-engine and audit
  // crawlers without disabling metadata streaming for every human browser.
  htmlLimitedBots:
    /Googlebot|Google-InspectionTool|Bingbot|DuckDuckBot|YandexBot|Baiduspider|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|OAI-SearchBot|ChatGPT-User|GPTBot|ClaudeBot|Claude-SearchBot|PerplexityBot|Perplexity-User|Screaming Frog|AhrefsBot|SemrushBot/i,
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
        source: "/:path*",
        has: [{ type: "host", value: "www.emitronix.ae" }],
        destination: "https://emitronix.ae/:path*",
        permanent: true,
      },
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
      ...warehouseBlogRedirects.map((redirect) => ({
        ...redirect,
        statusCode: 301,
      })),
      ...retiredArticleRedirects.map((redirect) => ({
        ...redirect,
        statusCode: 301,
      })),
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
