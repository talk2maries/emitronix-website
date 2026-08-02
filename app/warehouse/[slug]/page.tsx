import type { Metadata } from "next";
import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, FileCheck2, MapPin, ShieldCheck, Warehouse } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerEngineSummary } from "@/components/AnswerEngineSummary";
import { FAQSection, InsightGrid, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { CTA } from "@/components/CTA";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { getGeneratedImage } from "@/data/generatedImages";
import { applySeoOverrides, createPageMetadata } from "@/data/seo";
import { absoluteUrl, site, whatsappUrl } from "@/data/site";
import { warehouseAuthorityPages } from "@/data/warehouseSeo";

type WarehousePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return warehouseAuthorityPages.map((page) => ({ slug: page.slug }));
}

function getWarehousePage(slug: string) {
  return warehouseAuthorityPages.find((page) => page.slug === slug);
}

export async function generateMetadata({ params }: WarehousePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getWarehousePage(slug);
  if (!page) return {};

  const image = getGeneratedImage(page.imageKey);
  const metadata = createPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: page.href,
    arabicPath: null,
    keywords: [
      page.keyword,
      "Warehouse Construction Dubai",
      "Warehouse Contractor Dubai",
      "Construction Company Dubai",
      "Civil Contractor Dubai",
      "Industrial Contractor Dubai",
      "Authority Approvals Dubai",
    ],
    image: image.og?.src ?? image.desktop.src,
    imageAlt: image.alt,
  });

  return applySeoOverrides(metadata, page.href);
}

export default async function WarehouseSiloPage({ params }: WarehousePageProps) {
  const { slug } = await params;
  const page = getWarehousePage(slug);
  if (!page) notFound();

  const image = getGeneratedImage(page.imageKey);
  const pageUrl = absoluteUrl(page.href);
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const authorityList = page.authorityNotes.map((note) => note.split(" ")[0]).join(", ");

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.seoTitle,
    description: page.metaDescription,
    inLanguage: "en-AE",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: [
      { "@type": "Thing", name: page.keyword },
      { "@type": "Thing", name: page.category },
      { "@type": "Thing", name: "Warehouse Construction Dubai" },
      { "@type": "Thing", name: "Authority Approvals Dubai" },
    ],
    mainEntity: { "@id": `${pageUrl}#service` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-answer-engine-summary]"],
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.keyword,
    serviceType: page.category,
    description: page.metaDescription,
    url: pageUrl,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: page.serviceAreas.map((name) => ({ "@type": "Place", name })),
    image: absoluteUrl(image.desktop.src),
    termsOfService: absoluteUrl("/terms-and-conditions"),
    isRelatedTo: page.related.map((item) => ({
      "@type": "WebPage",
      name: item.label,
      url: absoluteUrl(item.href),
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Warehouse Construction", item: absoluteUrl("/warehouse-construction") },
      { "@type": "ListItem", position: 3, name: page.title, item: pageUrl },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#documents`,
    name: `${page.title} documents and quality controls`,
    itemListElement: [...page.requiredDocuments, ...page.qualityControls].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item,
    })),
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Warehouse Construction", href: "/warehouse-construction" },
          { label: page.title },
        ]}
        eyebrow={page.category}
        title={page.h1}
        description={page.excerpt}
        imageAsset={image}
        primaryCta={{ label: "Request Warehouse Support", href: "/contact" }}
        secondaryCta={{ label: "WhatsApp Team", href: whatsappUrl }}
        metrics={[
          { value: "Dubai", label: "Primary warehouse market", icon: MapPin },
          { value: "DM / DCD / DEWA", label: "Authority visibility", icon: ShieldCheck },
          { value: "Civil + MEP", label: "Coordinated interfaces", icon: Building2 },
          { value: "Handover", label: "Completion-focused planning", icon: ClipboardCheck },
        ]}
      />

      <div data-answer-engine-summary>
        <AnswerEngineSummary
          eyebrow="AI answer summary"
          question={`What is important for ${page.title.toLowerCase()}?`}
          answer={`${page.title} needs clear scope, civil engineering review, authority approval awareness, MEP coordination, site safety control and handover documentation before contractor pricing or mobilisation is finalised.`}
          facts={page.summaryFacts}
          cta={{ label: "Request Approval-Aware Support", href: "/contact" }}
        />
      </div>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-brand/[0.14] bg-brand-soft p-6 shadow-panel">
              <p className="premium-kicker">Warehouse topic</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal">{page.keyword}</h2>
              <p className="mt-4 text-sm leading-7 text-steel">
                Use this page as a planning brief for Dubai warehouse construction, civil works, industrial fit-out, authority approvals and contractor selection.
              </p>
              <div className="mt-6 grid gap-3">
                <a href={phoneHref} className="premium-button justify-center">Call Emitronix <ArrowRight className="h-4 w-4" /></a>
                <Link href="/contact" className="premium-button-light justify-center">Send Project Details <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </aside>
          <div>
            <PremiumSectionHeading
              eyebrow="Service overview"
              title={`${page.title}: practical engineering, approvals and delivery control.`}
              description="Warehouse and industrial construction in Dubai works best when the contractor, consultant and owner align on authority exposure, operating requirements and completion evidence before site execution starts."
            />
            <div className="mt-8 grid gap-5">
              {page.intro.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-9 text-steel">{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {page.benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3 rounded-[1.25rem] border border-brand/[0.12] bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessRail
        eyebrow="Approval-aware process"
        title={`How Emitronix structures ${page.title.toLowerCase()}.`}
        description="The process is built around early information control, authority visibility, safe execution and completion-ready documentation."
        steps={page.processSteps}
      />

      <InsightGrid
        eyebrow="Documents"
        title="Documents and inputs that reduce delay."
        description="The best contractor conversations happen when owners and consultants share enough information to reduce pricing assumptions and authority uncertainty."
        items={page.requiredDocuments.map((document) => ({
          title: document,
          description: "Prepare this input early so design, authority, procurement and site teams can work from the same information.",
          icon: FileCheck2,
        }))}
        tone="soft"
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-8 lg:grid-cols-2">
          <article className="luxury-card rounded-[2rem] p-7 lg:p-9">
            <p className="premium-kicker">Authority approvals expertise</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-charcoal">
              Authority pathways for Dubai warehouse projects.
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">
              The likely touchpoints for this topic include {authorityList || "Dubai authorities"} depending on location, consultant scope, landlord rules and intended use.
            </p>
            <div className="mt-7 grid gap-4">
              {page.authorityNotes.map((note) => (
                <p key={note} className="rounded-2xl border border-brand/[0.12] bg-brand-soft p-4 text-sm font-bold leading-7 text-charcoal">
                  {note}
                </p>
              ))}
            </div>
          </article>
          <article className="luxury-card rounded-[2rem] p-7 lg:p-9">
            <p className="premium-kicker">Safety and quality</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-charcoal">
              Quality controls that protect handover.
            </h2>
            <div className="mt-7 grid gap-4">
              {page.qualityControls.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4 shadow-sm">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <TrustBar
        eyebrow="Service areas"
        title="Dubai-first warehouse contracting support across the UAE."
        points={page.serviceAreas.map((area) => `${area} warehouse and industrial project enquiries`)}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Related resources"
            title="Continue through the warehouse authority silo."
            description="These internal links help owners, consultants and AI search systems understand how warehouse construction, civil works, approvals and handover topics connect."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.related.map((item) => (
              <Link key={item.href} href={item.href} className="luxury-card rounded-[1.5rem] p-6">
                <Warehouse className="h-7 w-7 text-brand" />
                <h2 className="mt-5 text-xl font-black text-charcoal">{item.label}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">
                  Related Emitronix resource for Dubai construction, authority approvals, civil works or industrial project planning.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                  Open page <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="References"
            title="Authority references to verify project requirements."
            description="Final project requirements must be confirmed with the appointed consultant and relevant approving authority for the exact location, scope and use."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.references.map((reference) => (
              <a
                key={reference.href}
                href={reference.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.25rem] border border-brand/[0.12] bg-white p-5 text-sm font-black text-charcoal shadow-sm transition hover:border-brand/30 hover:text-brand"
              >
                {reference.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={`${page.title} FAQ.`}
        description="Short answers for owners and consultants preparing Dubai warehouse construction, industrial construction and authority approval enquiries."
        faqs={page.faqs}
        schema
      />

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    </>
  );
}
