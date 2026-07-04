import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, FileCheck2, Layers3 } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { FAQSection, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { authorities, services, stats } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dubai Construction Resources",
  description:
    "Dubai civil construction, fit-out and authority approval resources from Emitronix Contracting LLC.",
  path: "/resources",
  keywords: ["Dubai construction guide", "authority approval checklist Dubai", "civil contractor Dubai resources", "fit-out approval Dubai"],
  image: "/images/dubai-authority-approval-contractor.webp",
});

const topics = [
  {
    title: "Authority approval checklist for Dubai projects",
    description: "A planning overview for owners preparing civil, fit-out or modification works that may require Dubai authority coordination.",
    href: "/approval",
    icon: FileCheck2,
  },
  {
    title: "Civil contracting scope review before tender",
    description: "What to clarify before comparing contractors: drawings, site constraints, responsibilities, authority exposure and handover requirements.",
    href: "/civil",
    icon: ClipboardCheck,
  },
  {
    title: "Interior fit-out delivery sequence",
    description: "How commercial, retail and villa interiors move from layout intent to coordinated execution and close-out.",
    href: "/interior",
    icon: Layers3,
  },
];

const resourceProcess = [
  "Start with the project type: civil construction, fit-out, renovation, warehouse, villa, commercial unit or approval-only support.",
  "Review what information is available, including drawings, authority comments, site details, NOCs, ownership or tenancy documents and intended use.",
  "Use the linked service and approval pages to understand which pathway is most relevant before contacting Emitronix.",
  "Send a more complete enquiry so the first conversation can focus on practical next steps instead of missing basics.",
];

const resourceFaqs = [
  {
    question: "What are Emitronix resources for?",
    answer:
      "Resources help owners and consultants understand civil contracting, fit-out planning and Dubai authority approval basics before starting an enquiry.",
  },
  {
    question: "Do resources replace authority advice?",
    answer:
      "No. Resources are planning guidance only. Final authority requirements depend on project location, use, consultant scope and authority comments.",
  },
  {
    question: "Which resource should I start with?",
    answer:
      "Start with the authority checklist if approvals are unclear, the civil scope review before tendering building works, or the fit-out sequence for interior projects.",
  },
  {
    question: "Can I contact Emitronix after reviewing resources?",
    answer:
      "Yes. Use the contact page with project location, documents, authority status and the service or resource topic most relevant to your enquiry.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Planning intelligence for Dubai construction and approvals."
        description="Reference pathways for clients preparing civil construction, fit-out, renovation and authority approval work in Dubai."
        image="/images/dubai-authority-approval-contractor.webp"
        imageAlt="Dubai authority planning and construction document resources"
        primaryCta={{ label: "Ask Emitronix", href: "/contact" }}
        secondaryCta={{ label: "Read Blog", href: "/blog" }}
        metrics={stats}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Popular topics"
            title="Plan smarter before mobilization."
            description="These resource pathways connect planning questions to the service pages where the next action is clear."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link key={topic.title} href={topic.href} className="luxury-card rounded-[1.5rem] p-6">
                  <Icon className="h-8 w-8 text-brand" />
                  <h2 className="mt-5 text-2xl font-black tracking-tight text-charcoal">{topic.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{topic.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                    Open guide <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-2">
          <div>
            <PremiumSectionHeading eyebrow="Services" title="Related service lines." light />
            <div className="mt-8 grid gap-3">
              {services.map((service) => (
                <Link key={service.slug} href={service.href} className="rounded-2xl border border-brand/[0.12] bg-white/[0.82] p-4 font-bold backdrop-blur-xl transition hover:border-brand/25 hover:bg-white hover:text-brand">
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <PremiumSectionHeading eyebrow="Authorities" title="Approval bodies we coordinate with." light />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {authorities.map((authority) => (
                <article key={authority.name} className="rounded-2xl border border-brand/[0.12] bg-white/[0.82] p-4 backdrop-blur-xl">
                  <h3 className="font-black">{authority.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-steel">{authority.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessRail
        eyebrow="Resource workflow"
        title="Use the resources to prepare a stronger Dubai project enquiry."
        description="The goal is practical clarity: understand the topic, gather the right documents and contact the correct service pathway."
        steps={resourceProcess}
      />

      <TrustBar
        eyebrow="Resource trust"
        title="Guidance connected to real website services and authority pages."
        points={[
          "Civil contracting pathway",
          "Interior fit-out planning",
          "Authority approval checklist",
          "Direct contact route",
        ]}
      />

      <FAQSection
        title="Dubai construction resources FAQ."
        description="Answers for users researching construction, fit-out and authority approval planning before contacting a contractor."
        faqs={resourceFaqs}
        schema
      />

      <CTA />
    </>
  );
}
