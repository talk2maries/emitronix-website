import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Building2, ClipboardCheck, Factory, FileCheck2, Landmark, Layers3, ShieldCheck, Sparkles, Warehouse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { HomeSignatureHero } from "@/components/HomeSignatureHero";
import { CommandCenter, FeatureGrid, ImagePanel, PremiumLink, PremiumSectionHeading } from "@/components/Premium";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, authorities, homeFaqs, projects, services, site, stats } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Construction Company Dubai | Main Contractor & Building Contractor",
  description:
    "Emitronix Contracting LLC is a premium construction company in Dubai for civil contracting, building construction, warehouses, villas, interior fit-out and authority approval coordination.",
  path: "/",
  keywords: [
    "Construction Company Dubai",
    "Building Contractor Dubai",
    "Civil Contractor Dubai",
    "Warehouse Construction Dubai",
    "Villa Construction Dubai",
    "Interior Fit-Out Dubai",
    "Authority Approvals Dubai",
  ],
  image: "/images/emitronix-2026-hero-dubai.webp",
});

const intelligenceFeatures = [
  {
    title: "Authority-aware planning",
    description: "Dubai Municipality, DCD, DEWA, RTA, Trakhees and DDA exposure is considered before execution pressure reaches the site.",
    icon: FileCheck2,
  },
  {
    title: "Civil and fit-out control",
    description: "Structural, interior, MEP and documentation interfaces are coordinated through one practical delivery rhythm.",
    icon: Layers3,
  },
  {
    title: "Premium communication",
    description: "Owners, consultants and commercial teams get a calmer project experience through clear scope and decision visibility.",
    icon: ShieldCheck,
  },
  {
    title: "Dubai-ready handover",
    description: "Inspection readiness, snag closure and completion documentation are treated as delivery requirements from the beginning.",
    icon: ClipboardCheck,
  },
];

const industrySignals = [
  { label: "Luxury Villas", icon: Sparkles },
  { label: "Warehouses", icon: Warehouse },
  { label: "Commercial Buildings", icon: Landmark },
  { label: "Industrial Facilities", icon: Factory },
  { label: "G+4 Buildings", icon: Building2 },
  { label: "Authority-Facing Projects", icon: BadgeCheck },
];

const commandItems = [
  {
    label: "01 / Scope",
    value: "Project route mapped",
    description: "Location, intended use, drawings, authority exposure and site constraints are converted into a clear delivery path.",
  },
  {
    label: "02 / Authority",
    value: "Approval risk visible",
    description: "DM, DCD, DEWA, Trakhees, DDA, DIFC and RTA touchpoints are kept visible before they slow execution.",
  },
  {
    label: "03 / Execution",
    value: "Site decisions aligned",
    description: "Civil, fit-out, MEP, procurement and handover actions are organized around one practical coordination rhythm.",
  },
];

const homeProcess = [
  "Understand the project location, asset type, drawings, timeline, site status and intended authority route.",
  "Define the practical scope across civil works, fit-out, approvals, MEP interfaces and handover responsibilities.",
  "Coordinate decisions with owners, consultants and site stakeholders before avoidable execution pressure appears.",
  "Move toward mobilization, inspection readiness and completion evidence with a clear Dubai delivery rhythm.",
];

const qualitySignals = [
  "Scope, assumptions and exclusions clarified before execution.",
  "Drawings, consultant comments and authority exposure tracked in one practical rhythm.",
  "Civil, structural, MEP, fit-out and handover interfaces reviewed before site pressure builds.",
  "Inspection readiness, snag closure and close-out documentation treated as part of delivery.",
];

const buyerPriorities = [
  {
    title: "Clear responsibility",
    description: "Owners want to know who is coordinating drawings, approvals, site decisions, variations and handover evidence before work begins.",
  },
  {
    title: "Authority-aware planning",
    description: "Dubai projects need early visibility on DM, DCD, DEWA, Trakhees, DDA, RTA, landlord or master developer requirements.",
  },
  {
    title: "Premium communication",
    description: "Commercial clients value concise updates, documented decisions, clear next steps and a contractor who can explain technical constraints plainly.",
  },
];

const latestArticles = blogPosts.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <HomeSignatureHero metrics={stats} />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <PremiumSectionHeading
            eyebrow="Company introduction"
            title="A Dubai construction partner for owners who value clarity before site work."
            description="Emitronix Contracting LLC supports civil construction, main contracting, warehouses, industrial buildings, commercial buildings, villas, building renovation, interior fit-out and authority-facing project coordination from Dubai Investment Park 02."
          />
          <div className="grid gap-5 text-base leading-8 text-steel">
            <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
              <h2 className="text-2xl font-black tracking-tight text-charcoal">Construction decisions in Dubai need practical sequencing.</h2>
              <p className="mt-4">
                A premium contractor experience is not only about a polished proposal. It is about understanding the project location, asset use, drawings, consultant responsibilities, authority requirements, procurement constraints, site access and handover documentation before execution begins.
              </p>
              <p className="mt-4">
                Emitronix is positioned for project owners, consultants and commercial teams comparing a civil contractor Dubai, main contractor Dubai, warehouse contractor Dubai, villa contractor Dubai or commercial construction company that can keep scope, approvals and site delivery connected.
              </p>
            </article>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Dubai", "Dubai Investment Park", "JAFZA", "Dubai South", "Al Quoz", "Business Bay", "Abu Dhabi", "Sharjah"].map((location) => (
                <Link key={location} href="/contact" className="rounded-2xl border border-brand/[0.12] bg-brand-soft px-5 py-4 text-sm font-black text-charcoal transition hover:border-brand/30 hover:bg-white hover:text-brand">
                  {location}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <PremiumSectionHeading
              eyebrow="What we do"
              title="End-to-end construction solutions for Dubai."
              description="From concept to completion, Emitronix structures civil, fit-out and approval scopes around precision, buildability and authority readiness."
            />
            <PremiumLink href="/services" variant="primary">Explore Services</PremiumLink>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ImagePanel
            src="/images/emitronix-2026-highrise-bim.webp"
            alt="AI-assisted construction planning and BIM coordination in Dubai"
            label="About Emitronix"
            title="Building trust. Delivering value."
          />
          <div>
            <PremiumSectionHeading
              eyebrow="AI-ready project intelligence"
              title="A premium contractor experience designed around control."
              description="Emitronix brings together civil contracting, authority coordination and interior fit-out support for owners and consultants who need Dubai project clarity before site execution begins."
            />
            <div className="mt-8">
              <FeatureGrid features={intelligenceFeatures} />
            </div>
          </div>
        </div>
      </section>

      <CommandCenter
        eyebrow="AI project command"
        title="A construction experience that feels intelligent before site work begins."
        description="Emitronix uses a planning-first operating model: every enquiry is translated into scope, authority, site and handover signals that the project team can act on."
        items={commandItems}
      />

      <ProcessRail
        eyebrow="How projects start"
        title="From first enquiry to a clear Dubai project route."
        description="The premium experience begins before a proposal. Emitronix turns early project information into a practical construction, fit-out or authority coordination pathway."
        steps={homeProcess}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImagePanel
            src="/images/emitronix-2026-warehouse-industrial.webp"
            alt="Warehouse and industrial construction quality safety planning in Dubai"
            label="Quality and safety"
            title="Quality is planned before it is inspected."
          />
          <div>
            <PremiumSectionHeading
              eyebrow="Quality & safety"
              title="A premium build depends on disciplined control points."
              description="Emitronix structures construction conversations around practical delivery controls: drawings, site sequencing, authority touchpoints, inspections, material decisions and close-out evidence."
            />
            <div className="mt-8 grid gap-3">
              {qualitySignals.map((signal) => (
                <div key={signal} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-brand-soft p-4">
                  <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <PremiumSectionHeading
              eyebrow="Project capability"
              title="Premium project categories across Dubai's built environment."
              description="The project gallery represents the civil, industrial, villa, fit-out and authority coordination categories Emitronix supports."
            />
            <PremiumLink href="/projects" variant="light">View Projects</PremiumLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <PremiumSectionHeading
            eyebrow="Authority intelligence"
            title="Dubai approvals coordinated with construction reality."
            description="Approval planning is most valuable when it is connected to drawings, site conditions, inspection readiness and handover evidence."
            light
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {authorities.map((authority) => {
              const Icon = authority.icon;
              return (
                <Link key={authority.name} href="/approval" className="rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand/25 hover:bg-white hover:text-brand">
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-5 text-xl font-black tracking-tight">{authority.name}</h3>
                  <p className="mt-3 text-sm leading-7 opacity-70">{authority.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Industries"
            title="Built for villas, warehouses, commercial assets and industrial operations."
            description="Emitronix supports project categories that require disciplined scope control, authority visibility and premium site communication."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industrySignals.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href="/industries" className="luxury-card flex items-center gap-4 rounded-[1.5rem] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xl font-black tracking-tight text-charcoal">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <TrustBar
        eyebrow="Trust section"
        title="Built around verified business facts and practical delivery signals."
        points={[
          "Dubai Investment Park 02 location",
          "Civil, fit-out and authority scope coverage",
          "Dubai Municipality, DCD and DEWA visibility",
          "Local SEO content tied to verified services",
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Client decision signals"
            title="What serious Dubai construction buyers look for before choosing a contractor."
            description="Instead of publishing unverified testimonials, this section focuses on the decision criteria owners and consultants commonly evaluate when comparing contractors."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {buyerPriorities.map((item) => (
              <article key={item.title} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="FAQ"
            title="Dubai construction questions, answered with clarity."
            description="Useful answers for owners comparing a civil contractor, building contractor, fit-out partner or approval coordinator in Dubai."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {homeFaqs.map((faq) => (
              <article key={faq.question} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-xl font-black tracking-tight text-charcoal">{faq.question}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <PremiumSectionHeading
              eyebrow="Latest articles"
              title="Dubai construction guides for better owner decisions."
              description="Helpful resources on civil construction, authority approvals, warehouse planning and contractor selection."
            />
            <PremiumLink href="/blog" variant="light">Visit Blog</PremiumLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestArticles.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="luxury-card overflow-hidden rounded-[1.5rem]">
                <div className="relative h-52 bg-brand-soft">
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="premium-kicker">{post.category}</p>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-charcoal">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                    Read guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Construction Company Dubai | Emitronix Contracting LLC",
            url: absoluteUrl("/"),
            description:
              "Premium homepage for Emitronix Contracting LLC, a Dubai construction company for civil contracting, building construction, warehouses, villas, interior fit-out and authority approvals.",
            primaryImageOfPage: absoluteUrl("/images/emitronix-2026-hero-dubai.webp"),
            provider: {
              "@id": absoluteUrl("/#localbusiness"),
              name: site.legalName,
            },
          }),
        }}
      />
    </>
  );
}
