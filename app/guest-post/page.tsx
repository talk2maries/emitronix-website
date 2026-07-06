import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { absoluteUrl } from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

export const generateMetadata = createMetadataResolver({
  title: "Guest Post Guidelines",
  description:
    "Contact Emitronix for relevant construction, contracting, fit-out, warehouse, villa, project management or Dubai authority approval guest post enquiries.",
  path: "/guest-post",
  keywords: ["construction guest post Dubai", "contracting guest post UAE", "Dubai construction articles"],
  image: "/images/dubai-civil-works-construction-site.webp",
  imageAlt: "Dubai construction guest post enquiry route",
});

const guidelines = [
  "Construction, contracting, fit-out, warehouse, villa, project management or Dubai authority approval topics.",
  "Practical guidance for owners, consultants, tenants or commercial teams preparing a Dubai project.",
  "No unverified claims, client names, project counts, certifications, guarantees or confidential customer information.",
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Guest Post Guidelines", item: absoluteUrl("/guest-post") },
  ],
};

export default function GuestPostPage() {
  return (
    <>
      <PageHero
        eyebrow="Guest posts"
        title="Guest post enquiries for construction and approval topics."
        description="Use this page for relevant construction, contracting, fit-out, warehouse, villa, project management or Dubai authority approval article enquiries. The contact team can review whether the topic is appropriate before anything is published."
        image="/images/dubai-civil-works-construction-site.webp"
        imageAlt="Dubai construction guest post enquiry route"
        primaryCta={{ label: "Contact Emitronix", href: "/contact" }}
        secondaryCta={{ label: "Read the blog", href: "/blog" }}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Submission fit"
            title="Relevant topics must support practical construction decisions."
            description="Guest post enquiries are reviewed for relevance, accuracy and fit with Emitronix construction, fit-out and authority approval resources."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {guidelines.map((item) => (
              <article key={item} className="luxury-card rounded-[1.5rem] p-6">
                <CheckCircle2 className="h-7 w-7 text-brand" />
                <p className="mt-5 text-sm font-bold leading-7 text-charcoal">{item}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/contact" className="premium-button">
              Send enquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
