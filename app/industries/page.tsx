import type { Metadata } from "next";
import { Building2, Factory, Home, Landmark, ShieldCheck, Sparkles, Warehouse } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { FAQSection, InsightGrid, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { stats } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dubai Construction Industries Served",
  description:
    "Emitronix supports Dubai villas, warehouses, industrial buildings, commercial buildings, retail fit-out and authority-facing construction project categories.",
  path: "/industries",
  keywords: ["villa construction Dubai", "warehouse construction Dubai", "commercial construction Dubai", "industrial building contractor Dubai"],
  image: "/images/emitronix-2026-villa-luxury.webp",
});

const industries = [
  {
    title: "Luxury Villas",
    description: "Villa construction, renovation and premium residential scopes where finishing, authority planning and site control must align.",
    icon: Home,
    href: "/civil",
  },
  {
    title: "Warehouses & Logistics",
    description: "Warehouse construction Dubai support for storage, distribution, industrial operations and free-zone environments.",
    icon: Warehouse,
    href: "/projects",
  },
  {
    title: "Commercial Buildings",
    description: "Commercial construction support for offices, showrooms, retail shells and business-ready interior interfaces.",
    icon: Landmark,
    href: "/projects",
  },
  {
    title: "Industrial Facilities",
    description: "Industrial building contractor coordination for steel structures, civil works, utility interfaces and handover readiness.",
    icon: Factory,
    href: "/projects",
  },
  {
    title: "Retail & Hospitality Fit-Out",
    description: "Premium fit-out works for retail, hospitality, offices and commercial units where sequencing matters.",
    icon: Sparkles,
    href: "/interior",
  },
  {
    title: "Authority-Facing Projects",
    description: "Projects with Dubai Municipality, DCD, DEWA, Trakhees, DDA, DIFC, Concordia-DMCC or RTA touchpoints.",
    icon: ShieldCheck,
    href: "/approval",
  },
];

const industryBenefits = [
  {
    title: "Authority exposure understood early",
    description: "Different assets can involve DM, DCD, DEWA, Trakhees, DDA, DIFC, Concordia-DMCC or RTA requirements, so jurisdiction is reviewed before assumptions are made.",
    icon: ShieldCheck,
  },
  {
    title: "Civil and fit-out interfaces aligned",
    description: "Villas, warehouses and commercial spaces often connect structure, MEP, interiors, access and completion documents into one delivery challenge.",
    icon: Building2,
  },
  {
    title: "Content built for Dubai search intent",
    description: "Each sector is described with local service language so users can move naturally to civil, fit-out, projects, approvals or contact pathways.",
    icon: Landmark,
  },
];

const industryProcess = [
  "Identify the asset type, operating use, location, authority jurisdiction and any landlord or master developer constraints.",
  "Match the sector to the right service path: civil contracting, fit-out, authority approvals or combined coordination.",
  "Clarify drawings, inspections, access, utility, fire-safety and handover requirements before project sequencing begins.",
  "Convert the sector-specific risks into a practical enquiry conversation with Emitronix.",
];

const industryFaqs = [
  {
    question: "Which industries does Emitronix support in Dubai?",
    answer:
      "Emitronix supports luxury villas, warehouses, logistics assets, commercial buildings, industrial facilities, retail and hospitality fit-out, and authority-facing project categories.",
  },
  {
    question: "Do different industries need different approval paths?",
    answer:
      "Yes. Approval paths depend on location, use, fire-safety requirements, utility needs, civil modifications, landlord rules and the authority jurisdiction for the property.",
  },
  {
    question: "Can a warehouse project include fit-out and approvals?",
    answer:
      "Yes. Warehouse projects may involve civil works, interior upgrades, fire and utility coordination, authority approvals and handover documentation.",
  },
  {
    question: "Why include industries on a construction website?",
    answer:
      "Industry pages help owners and consultants understand whether the contractor’s services match their asset type before submitting an enquiry.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for Dubai's real estate, logistics and commercial economy."
        description="Emitronix supports project categories where premium communication, practical engineering, authority visibility and handover control matter."
        image="/images/emitronix-2026-villa-luxury.webp"
        imageAlt="Luxury villa construction Dubai and premium residential architecture"
        primaryCta={{ label: "Discuss Your Sector", href: "/contact" }}
        secondaryCta={{ label: "View Projects", href: "/projects" }}
        metrics={stats}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Sector focus"
            title="Construction categories that need disciplined coordination."
            description="Each industry path connects to the service or approval page most relevant to the enquiry."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link key={industry.title} href={industry.href} className="luxury-card rounded-[1.5rem] p-7">
                  <Icon className="h-9 w-9 text-brand" />
                  <h2 className="mt-6 text-3xl font-black tracking-tight text-charcoal">{industry.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-steel">{industry.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <PremiumSectionHeading
            eyebrow="Market fit"
            title="From private villas to authority-controlled commercial environments."
            description="The common requirement is not only construction capability. It is coordination quality: documentation, sequencing, inspections, consultant decisions and close-out visibility."
            light
          />
          <div className="rounded-[2rem] border border-brand/[0.12] bg-white/[0.82] p-8 backdrop-blur-xl">
            <Building2 className="h-12 w-12 text-brand" />
            <h2 className="mt-6 text-4xl font-black tracking-tight">Dubai-first construction support.</h2>
            <p className="mt-4 text-base leading-8 text-steel">
              Emitronix is positioned for project owners and consultants who need a practical, locally aware construction partner for civil, fit-out and approval-connected scopes.
            </p>
          </div>
        </div>
      </section>

      <InsightGrid
        eyebrow="Industry benefits"
        title="Sector pages designed around practical Dubai project risks."
        description="The same contractor can feel very different depending on the asset type. Emitronix frames each sector around the decisions that affect project momentum."
        items={industryBenefits}
        tone="soft"
      />

      <ProcessRail
        eyebrow="Sector process"
        title="From asset type to the right service path."
        description="A villa, warehouse, commercial building or authority-facing unit needs a different enquiry conversation. This process keeps the first step clear."
        steps={industryProcess}
      />

      <TrustBar
        eyebrow="Industry trust"
        title="Dubai market language built around verified service capability."
        points={[
          "Villas and residential projects",
          "Warehouses and logistics environments",
          "Commercial and retail interiors",
          "Authority-facing construction scopes",
        ]}
      />

      <FAQSection
        title="Dubai construction industries FAQ."
        description="Useful answers for users matching their asset type to a construction or approval service."
        faqs={industryFaqs}
        schema
      />

      <CTA />
    </>
  );
}
