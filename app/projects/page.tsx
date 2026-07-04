import type { Metadata } from "next";
import { ArrowRight, Building2, Home, Landmark, Warehouse } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { FAQSection, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, services, stats } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Civil Construction Projects Dubai",
  description:
    "Explore Emitronix project capabilities across civil infrastructure, warehouses, villas, interior fit-out and authority approvals in Dubai.",
  path: "/projects",
  keywords: ["Dubai construction projects", "civil contractor Dubai", "warehouse contractor UAE", "villa construction Dubai"],
  image: "/images/emitronix-2026-warehouse-industrial.webp",
});

const projectTypes = [
  { title: "Warehouse Construction", href: "/industries", icon: Warehouse },
  { title: "Villa Construction", href: "/industries", icon: Home },
  { title: "Commercial Buildings", href: "/industries", icon: Landmark },
  { title: "Civil Contracting", href: "/civil", icon: Building2 },
];

const projectProcess = [
  "Review the project category, location, drawings, existing approvals and site condition.",
  "Identify the main delivery risks: authority exposure, access, utilities, structural scope, fit-out sequencing and handover evidence.",
  "Connect the project type to the right Emitronix service pathway for civil, fit-out or approval coordination.",
  "Prepare a practical enquiry package for scope, budget, schedule, consultant inputs and site readiness.",
];

const projectFaqs = [
  {
    question: "Are the projects shown verified completed projects?",
    answer:
      "The website presents representative project categories and capability areas rather than inventing client names, project counts or unverified completion claims.",
  },
  {
    question: "Which project categories does Emitronix support?",
    answer:
      "Emitronix supports civil infrastructure, warehouses, villas, building construction, commercial interiors, MEP coordination and authority approval project categories in Dubai and the UAE.",
  },
  {
    question: "Can project category pages help with SEO?",
    answer:
      "Yes. Structured project-category content helps users and search engines understand the Dubai construction, warehouse, villa, fit-out and approval scopes the business supports.",
  },
  {
    question: "What should I send when enquiring about a project?",
    answer:
      "Send the project location, current drawings, intended use, required service, authority status, site photos if available and the timeline you are trying to achieve.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Representative project categories across Dubai."
        description="Emitronix presents project capability through verified category-based storytelling for civil, warehouse, villa, fit-out and authority-facing scopes."
        image="/images/emitronix-2026-warehouse-industrial.webp"
        imageAlt="Warehouse construction Dubai industrial project by Emitronix Contracting LLC"
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "Industries", href: "/industries" }}
        metrics={stats}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Capability gallery"
            title="Built around real Dubai project categories."
            description="Each visual represents a scope Emitronix supports: civil infrastructure, industrial facilities, villa works, commercial interiors, MEP coordination and authority approvals."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <PremiumSectionHeading
            eyebrow="Project types"
            title="Integrated scopes supported by one premium delivery team."
            description="Project categories are connected to service pages so users can move from inspiration to a practical enquiry path."
            light
          />
          <div className="grid gap-5 md:grid-cols-2">
            {projectTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Link key={type.title} href={type.href} className="rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand/25 hover:bg-white hover:text-brand">
                  <Icon className="h-9 w-9" />
                  <h2 className="mt-5 text-2xl font-black tracking-tight">{type.title}</h2>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessRail
        eyebrow="Project planning"
        title="How project categories become practical delivery conversations."
        description="The project page is designed to move users from visual inspiration into a clear construction, approval or fit-out enquiry path."
        steps={projectProcess}
      />

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Service connection"
            title="Move from project type to delivery scope."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={service.href} className="luxury-card rounded-[1.5rem] p-6 text-center">
                  <Icon className="mx-auto h-9 w-9 text-brand" />
                  <h2 className="mt-5 text-xl font-black tracking-tight text-charcoal">{service.title}</h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <TrustBar
        eyebrow="Project trust"
        title="Capability storytelling without unverified project claims."
        points={[
          "Representative categories only",
          "No invented customer names",
          "Clear route to service pages",
          "SEO-focused Dubai project language",
        ]}
      />

      <FAQSection
        title="Dubai construction projects FAQ."
        description="Answers for users reviewing project categories before contacting a contractor."
        faqs={projectFaqs}
        schema
      />

      <CTA />
    </>
  );
}
