import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { PremiumSectionHeading } from "@/components/Premium";
import { approvalServices } from "@/data/approvals";
import { blogPosts } from "@/data/blog";
import { createPageMetadata } from "@/data/seo";
import { absoluteUrl, navItems, services } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "HTML Sitemap",
  description:
    "Browse Emitronix Contracting LLC pages, Dubai construction services, authority approval resources and construction blog articles.",
  path: "/html-sitemap",
  keywords: ["Emitronix sitemap", "Dubai construction services sitemap", "construction company Dubai pages"],
});

const pageGroups = [
  {
    title: "Main pages",
    links: [
      ...navItems,
      { label: "Resources", href: "/resources" },
      { label: "HTML Sitemap", href: "/html-sitemap" },
    ],
  },
  {
    title: "Construction services",
    links: services.map((service) => ({ label: service.title, href: service.href })),
  },
  {
    title: "Dubai authority approvals",
    links: [
      { label: "Authority Approvals Hub", href: "/approval" },
      ...approvalServices.map((service) => ({ label: service.menuLabel, href: service.href })),
    ],
  },
  {
    title: "Construction knowledge center",
    links: [
      { label: "Blog", href: "/blog" },
      ...blogPosts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
    ],
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "HTML Sitemap", item: absoluteUrl("/html-sitemap") },
  ],
};

export default function HtmlSitemapPage() {
  return (
    <>
      <section className="premium-grid bg-white pb-20 pt-28 text-charcoal">
        <div className="container-pad">
          <div className="max-w-5xl">
            <p className="premium-kicker">Sitemap</p>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[0.98] tracking-tight text-charcoal sm:text-7xl">
              Browse Emitronix construction resources.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-steel">
              A clean index of Emitronix Contracting LLC pages for Dubai construction services, authority approvals, project resources and civil construction articles.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Site index"
            title="Find the right page by topic."
            description="Use this page to move quickly between civil contracting, main contracting, warehouse construction, approvals, resources and blog articles."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {pageGroups.map((group) => (
              <article key={group.title} className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{group.title}</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {group.links.map((link) => (
                    <Link key={`${group.title}-${link.href}`} href={link.href} className="rounded-2xl border border-brand/[0.12] bg-white px-4 py-3 text-sm font-black text-charcoal transition hover:border-brand/30 hover:bg-brand-soft hover:text-brand">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
