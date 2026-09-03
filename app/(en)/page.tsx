import { ArrowRight, BadgeCheck, Building2, ClipboardCheck, Factory, FileCheck2, Landmark, Layers3, MessageCircle, PhoneCall, ShieldCheck, Sparkles, Warehouse } from "lucide-react";
import Link from "next/link";
import { AnswerEngineSummary } from "@/components/AnswerEngineSummary";
import { CTA } from "@/components/CTA";
import { ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { ContentReviewRecord } from "@/components/ContentReviewRecord";
import { HomeSignatureHero } from "@/components/HomeSignatureHero";
import { CommandCenter, ImagePanel, PremiumLink, PremiumSectionHeading } from "@/components/Premium";
import { ResponsiveIllustrativeImage } from "@/components/ResponsiveIllustrativeImage";
import { ServiceCard } from "@/components/ServiceCard";
import { blogImageAlt, blogPosts } from "@/data/blog";
import { getGeneratedImage } from "@/data/generatedImages";
import {
  absoluteUrl,
  authorities,
  complianceHighlights,
  homeFaqs,
  services,
  site,
  verifiedMetrics,
  whatsappUrl,
} from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

export const generateMetadata = createMetadataResolver({
  title: "Construction Company Dubai | Building Contractor | Emitronix",
  description:
    "Emitronix Contracting LLC provides civil contracting, building construction, warehouses, villas, interior fit-out and authority approval coordination in Dubai.",
  path: "/",
  keywords: [
    "Construction Company Dubai",
    "Building Contractor Dubai",
    "Building contractor in Dubai",
    "Civil Contractor Dubai",
    "Civil construction company in Dubai",
    "Warehouse Construction Dubai",
    "Warehouse construction contractor Dubai",
    "Villa Construction Dubai",
    "Villa construction contractor Dubai",
    "Commercial building contractor Dubai",
    "Fit-out and renovation contractor Dubai",
    "Interior Fit-Out Dubai",
    "Authority Approvals Dubai",
  ],
  image: getGeneratedImage("home.dubai-construction-company-hero").og!.src,
  imageAlt: getGeneratedImage("home.dubai-construction-company-hero").alt,
});

const intelligenceFeatures = [
  {
    title: "Authority-aware planning",
    description: "Dubai Municipality, DCD, DEWA, RTA, Trakhees and DDA exposure is considered before execution pressure reaches the site.",
    icon: FileCheck2,
  },
  {
    title: "Civil and fit-out control",
    description: "Structural, interior, MEP and document interfaces are coordinated through one controlled delivery sequence.",
    icon: Layers3,
  },
  {
    title: "Decision-led communication",
    description: "Clear scope, assumptions and decision ownership help owners, consultants and commercial teams coordinate project work.",
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
    description: "Civil, fit-out, MEP, procurement and handover actions are organized by dependency and responsibility.",
  },
];

const homeProcess = [
  "Understand the project location, asset type, drawings, timeline, site status and intended authority route.",
  "Define scope boundaries across civil works, fit-out, approvals, MEP interfaces and handover responsibilities.",
  "Coordinate decisions with owners, consultants and site stakeholders before avoidable execution pressure appears.",
  "Move toward mobilization, inspection readiness and completion evidence with a clear Dubai delivery rhythm.",
];

const qualitySignals = [
  "Scope, assumptions and exclusions clarified before execution.",
  "Track drawings, consultant comments and authority dependencies in one controlled record.",
  "Civil, structural, MEP, fit-out and handover interfaces reviewed before site pressure builds.",
  "Inspection readiness, snag closure and close-out documentation treated as part of delivery.",
];

const ownerDecisionBriefs = [
  {
    title: "Warehouse operations should shape the structure",
    observation: "Rack reactions, forklift wheel loads, dock occupation, turning space and fire strategy can change the structural grid, slab and external works. A warehouse brief that states only area and clear height leaves the expensive decisions unresolved.",
    action: "Record the goods profile, storage system, design vehicle, utility demand and expansion intent before freezing the civil brief.",
    href: "/warehouse-construction",
  },
  {
    title: "Villa renovation starts with discovery",
    observation: "Existing drawings may not show later alterations, concealed services or the true condition of waterproofing and structure. Finishes selected before targeted surveys can lock the owner into avoidable redesign.",
    action: "Inspect high-consequence areas, define opening-up needs and separate confirmed facts from assumptions before demolition and procurement.",
    href: "/building-renovation",
  },
  {
    title: "Authority comments are programme events",
    observation: "A DM, DCD, DEWA, Trakhees or DDA comment can affect drawings, equipment, material orders, inspection dates and work already planned on site. Treating it as an isolated email hides the real delay path.",
    action: "Assign every comment to an owner and affected document, then connect the response date to procurement and construction activities.",
    href: "/approval",
  },
  {
    title: "Fit-out handover is decided above the ceiling",
    observation: "Fire stopping, access panels, dampers, detectors, drainage, power and supports converge in concealed zones. Closing those areas without a coordinated inspection creates rework when testing begins.",
    action: "Use a ceiling close-up hold point that checks approved drawings, access, photographs, tests and outstanding snags before closure.",
    href: "/interior",
  },
];

const latestArticles = blogPosts.slice(0, 3);
const homepageVerifiedMetrics = verifiedMetrics.slice(1);

export default function HomePage() {
  const phoneHref = site.phoneHref;

  return (
    <>
      <HomeSignatureHero />

      <AnswerEngineSummary
        question="Who is Emitronix for Dubai construction projects?"
        answer="Owners, consultants and commercial teams can enquire about civil and building works, villas, warehouses, interior fit-out and authority coordination. Suitability is confirmed from the location, use, drawings, site condition and required appointments rather than from the project label alone."
        facts={[
          `Legal business name: ${site.legalName}`,
          `Primary location: ${site.location}`,
          `Verified service areas: ${site.serviceArea.join(", ")}`,
          "Core scope: civil contracting, fit-out, renovation, warehouses, villas and authority coordination",
        ]}
        cta={{ label: "Ask about your project", href: "/contact" }}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <PremiumSectionHeading
            eyebrow="Company introduction"
            title="A Dubai construction partner for owners who value clarity before site work."
            description="The published scope covers civil and main contracting, warehouses, industrial and commercial buildings, villas, renovation, interior fit-out and authority-facing coordination in Dubai and the UAE."
          />
          <div className="grid gap-5 text-base leading-8 text-steel">
            <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
              <h2 className="text-2xl font-black tracking-tight text-charcoal">Construction decisions in Dubai need dependency-led sequencing.</h2>
              <p className="mt-4">
                A useful contractor relationship is not defined by a polished proposal. It begins with the project location, asset use, drawings, consultant responsibilities, authority requirements, procurement constraints, site access and handover documentation before execution starts.
              </p>
              <p className="mt-4">
                When comparing contractors, ask each team to identify missing information, approval dependencies, cross-trade interfaces and the records it will hand over. The answers show whether the proposal is based on the actual asset or only on a broad construction category.
              </p>
            </article>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Dubai-wide construction", "UAE business support", "Authority approvals", "Civil contracting", "Interior fit-out", "MEP coordination", "Commercial renovation", "Project delivery"].map((location) => (
                <Link key={location} href="/contact" className="rounded-2xl border border-brand/[0.12] bg-brand-soft px-5 py-4 text-sm font-black text-charcoal transition hover:border-brand/30 hover:bg-white hover:text-brand">
                  {location}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <PremiumSectionHeading
              eyebrow="Company information"
              title="Published facts for a more informed first conversation."
              description="This section uses the company information currently verified for website publication: service coverage, Dubai and UAE service areas, contact details and authority-coordination topics."
            />
            <Link href="/contact" className="premium-button">
              Request a Site Visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {homepageVerifiedMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <article key={metric.label} className="luxury-card rounded-[1.5rem] p-6">
                  <Icon className="h-8 w-8 text-brand" />
                  <p className="mt-6 text-4xl font-black tracking-tight text-brand">{metric.value}</p>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-charcoal">{metric.label}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{metric.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <p className="premium-kicker">What we do</p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-[1.04] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                Connected construction services for Dubai and UAE projects.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-steel sm:text-lg">
                Emitronix structures civil contracting, fit-out, MEP coordination, authority approvals and project delivery scopes around precision, buildability and handover readiness.
              </p>
            </div>
            <PremiumLink href="/services" variant="primary">Explore Services</PremiumLink>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-pad">
          <div className="grid gap-4 rounded-[2rem] border border-brand/[0.15] bg-brand-soft p-5 shadow-panel lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
            <div>
              <p className="premium-kicker">Fast enquiry path</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                Need a building contractor in Dubai for a villa, warehouse, commercial building or fit-out?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="premium-button">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={phoneHref} className="premium-button-light">
                Call Now <PhoneCall className="h-4 w-4" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
                WhatsApp Us <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad soft-section overflow-hidden">
        <div className="container-pad">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-brand/[0.15] bg-white shadow-luxe">
              <ResponsiveIllustrativeImage
                asset={getGeneratedImage("home.project-control-coordination")}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="absolute inset-0 block h-full w-full"
                imageClassName="h-full w-full object-cover"
                imageStyle={{ height: "100%", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.02)_0%,rgba(11,31,58,0.68)_100%)]" />
              <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2">
                {["Authority approvals", "Civil delivery", "MEP coordination"].map((item) => (
                  <span key={item} className="rounded-full border border-white/35 bg-white/[0.88] px-4 py-2 text-xs font-black uppercase tracking-wide text-brand shadow-sm backdrop-blur-xl">
                    {item}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/45 bg-white/[0.88] p-5 text-charcoal shadow-panel backdrop-blur-2xl">
                <p className="premium-kicker">Project control</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">Decisions aligned before site pressure builds.</h3>
              </div>
            </div>

            <div>
              <p className="premium-kicker">Project control</p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-[1.03] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                Dubai project delivery with fewer blind spots.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-steel sm:text-lg">
                Emitronix connects civil works, fit-out decisions, authority approvals, MEP coordination and close-out documentation through one clear contractor rhythm for owners, consultants and commercial teams.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {intelligenceFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <article key={feature.title} className="group min-h-48 rounded-[1.5rem] border border-brand/[0.12] bg-white p-6 shadow-panel transition duration-500 hover:-translate-y-1 hover:border-brand/30 hover:bg-brand-soft hover:shadow-luxe">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-blue transition duration-500 group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 text-xl font-black tracking-tight text-charcoal">{feature.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-steel">{feature.description}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-4 shadow-sm backdrop-blur-xl sm:grid-cols-3">
                {["Scope clarity", "Approval readiness", "Handover control"].map((item) => (
                  <div key={item} className="rounded-2xl bg-brand-soft px-4 py-3 text-sm font-black text-charcoal">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommandCenter
        eyebrow="Project command"
        title="A construction workflow that starts with scope and responsibility clarity."
        description="Emitronix uses a planning-first operating model: every enquiry is translated into scope, authority, site and handover signals that the project team can act on."
        items={commandItems}
      />

      <ProcessRail
        eyebrow="How projects start"
        title="From first enquiry to a clear Dubai project route."
        description="Useful project control begins before a proposal, when early project information is converted into a buildable construction, fit-out or authority-coordination route."
        steps={homeProcess}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImagePanel
            asset={getGeneratedImage("home.quality-safety-inspection")}
            label="Quality and safety"
            title="Quality is planned before it is inspected."
          />
          <div>
            <PremiumSectionHeading
              eyebrow="Quality & safety"
              title="A coordinated build depends on disciplined control points."
              description="Construction conversations are organized around delivery controls: drawings, site sequence, authority touchpoints, inspections, material decisions and close-out evidence."
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

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Owner decision notes"
            title="Four early decisions that prevent expensive construction rework."
            description="These briefing prompts are not project-specific design instructions. They show why operations, existing conditions, authority comments and inspection hold points belong in the first contractor conversation."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ownerDecisionBriefs.map((brief, index) => (
              <article key={brief.title} className="luxury-card rounded-[1.5rem] p-6 lg:p-8">
                <p className="premium-kicker">Decision note {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{brief.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{brief.observation}</p>
                <p className="mt-4 rounded-2xl border border-brand/[0.12] bg-brand-soft p-4 text-sm font-bold leading-7 text-charcoal">
                  Next project action: {brief.action}
                </p>
                <Link href={brief.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                  Review the related service <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <PremiumSectionHeading
            eyebrow="Authority coordination"
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
            eyebrow="Authority coordination context"
            title="Project requirements depend on the location, scope and appointed parties."
            description="This section explains coordination principles without claiming unverified licences, certifications, enrollment status or authority approvals."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {complianceHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="luxury-card rounded-[1.5rem] p-6">
                  <Icon className="h-8 w-8 text-brand" />
                  <h2 className="mt-5 text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                </article>
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
            description="Each asset type creates a different controlling risk: resident expectations in villas, vehicle and slab demands in warehouses, tenant interfaces in commercial work, and process reliability in industrial facilities."
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
        eyebrow="Company profile"
        title="Published company details and service pathways."
        points={[
          "Dubai and UAE service area",
          "Civil, fit-out and authority service pathways",
          "Published authority coordination guides",
          "Direct contact and company information",
        ]}
      />

      <ContentReviewRecord
        title="Homepage content ownership and review record"
        reviewScope="General editorial review of published company facts, service descriptions, construction-planning guidance, authority boundaries and enquiry pathways. Project-specific design, calculations, approvals and contractual advice remain the responsibility of the appointed professionals and relevant authorities."
        showVerificationTodo={false}
      />

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
          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand"
            >
              Browse all Dubai construction FAQs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
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
                  <ResponsiveIllustrativeImage
                    asset={getGeneratedImage(post.generatedImage)}
                    alt={blogImageAlt(post)}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="absolute inset-0 h-full w-full"
                    imageClassName="h-full w-full object-cover"
                    imageStyle={{ height: "100%", objectFit: "cover" }}
                  />
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
            "@type": "WebPage",
            name: "Construction Company Dubai | Emitronix Contracting LLC",
            url: absoluteUrl("/"),
            description:
              "Premium homepage for Emitronix Contracting LLC, a Dubai construction company for civil contracting, building construction, warehouses, villas, interior fit-out and authority approvals.",
            primaryImageOfPage: absoluteUrl(
              getGeneratedImage("home.dubai-construction-company-hero").og!.src,
            ),
            provider: {
              "@id": absoluteUrl("/#organization"),
              name: site.legalName,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${absoluteUrl("/")}#faq`,
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
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
            ],
          }),
        }}
      />
    </>
  );
}
