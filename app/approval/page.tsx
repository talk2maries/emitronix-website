import { ArrowRight, FileCheck2 } from "lucide-react";
import Link from "next/link";
import { approvalServices } from "@/data/approvals";
import { CTA } from "@/components/CTA";
import { FAQSection, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { absoluteUrl, authorities, stats } from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

export const generateMetadata = createMetadataResolver({
  title: "Authority Approval Services in Dubai",
  description:
    "Dubai authority approval services for Dubai Municipality, DDA, DCD, DEWA, Trakhees, DIFC, Concordia-DMCC and RTA approvals.",
  path: "/approval",
  keywords: ["approval services in Dubai", "authority approvals Dubai", "Dubai Municipality approval", "DEWA approval", "DCD approval", "RTA approval"],
  image: "/images/dubai-authority-approval-contractor.webp",
});

const approvalProcess = [
  "Confirm the project location, authority jurisdiction, asset type, proposed works and consultant responsibility.",
  "Review available drawings, NOCs, tenancy or plot documents, existing permits and authority comments.",
  "Prepare the submission route and coordinate updates between owner, consultant, contractor and authority requirements.",
  "Support response tracking, inspection readiness, close-out documents and handover visibility.",
];

const approvalFaqs = [
  {
    question: "Which Dubai approvals can Emitronix coordinate?",
    answer:
      "The website provides planning guides for Dubai Municipality, DDA, DCD, DEWA, Trakhees, DIFC, Concordia-DMCC and RTA workflows. Emitronix's exact role, eligibility and appointed responsibilities must be confirmed for the specific project.",
  },
  {
    question: "Are approval requirements the same for every project?",
    answer:
      "No. Approval requirements depend on location, building type, intended use, civil modifications, fit-out scope, fire safety, utilities, landlord rules and consultant responsibilities.",
  },
  {
    question: "What documents are usually needed to start?",
    answer:
      "Useful starting documents include drawings, site or unit details, owner or tenant authorization, trade license, NOCs, previous approvals, authority comments and consultant details where applicable.",
  },
  {
    question: "Can approval work be connected to construction execution?",
    answer:
      "It should be. Drawings, site sequencing, inspection readiness and handover documentation need to stay aligned. The project-specific proposal should state which coordination tasks Emitronix will perform.",
  },
];

const approvalHubItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dubai authority approval services",
  itemListElement: approvalServices.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(service.href),
    name: service.menuLabel,
    description: service.metaDescription,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Authority Approvals", item: absoluteUrl("/approval") },
  ],
};

export default function ApprovalPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Authority Approvals" }]}
        eyebrow="Authority approval services"
        title="Dubai approval services for construction projects."
        description="Emitronix supports owners, consultants and tenants with structured document coordination, authority comment response and inspection readiness across key Dubai approval workflows."
        image="/images/dubai-authority-approval-contractor.webp"
        imageAlt="Illustrative stock image accompanying Dubai authority coordination guidance"
        primaryCta={{ label: "Request Approval Support", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
        metrics={stats}
      />

      <section className="bg-white pt-10">
        <div className="container-pad">
          <div className="rounded-[1.5rem] border border-amber-300 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
            <p className="font-black">Authority and appointment notice</p>
            <p className="mt-2">
              Emitronix is not a government authority and does not guarantee permits, NOCs, inspections, timelines or outcomes. The authority, current submission route, required consultant or contractor enrollment, and Emitronix&apos;s exact role must be confirmed for each project before appointment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Approval menu"
            title="Choose the authority workflow you need."
            description="Each page includes the process, documents commonly requested, related approvals and a Dubai-focused enquiry path."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {approvalServices.map((service) => (
              <Link key={service.slug} href={service.href} className="luxury-card rounded-[1.5rem] p-6">
                <FileCheck2 className="h-8 w-8 text-brand" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-brand">Approval Service</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{service.menuLabel}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{service.metaDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <PremiumSectionHeading
            eyebrow="Authority ecosystem"
            title="Planning approval requirements before they affect site execution."
            description="Dubai authority work is shaped by location, project type, consultant scope, tenant requirements and inspection milestones."
            light
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {authorities.map((authority) => {
              const Icon = authority.icon;
              return (
                <article key={authority.name} className="rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-6 backdrop-blur-xl">
                  <Icon className="h-8 w-8 text-brand" />
                  <h2 className="mt-5 text-xl font-black tracking-tight">{authority.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{authority.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessRail
        eyebrow="Approval process"
        title="A structured approval path for Dubai construction and fit-out projects."
        description="The best approval support starts by clarifying jurisdiction, documents and authority exposure before project teams commit to site timelines."
        steps={approvalProcess}
      />

      <TrustBar
        eyebrow="Approval trust"
        title="Authority coordination connected to construction-side reality."
        points={[
          "Document gap checks before submission",
          "Authority comment response coordination",
          "Inspection and close-out readiness",
          "Connected guidance for each published authority route",
        ]}
      />

      <FAQSection
        title="Dubai authority approvals FAQ."
        description="Common questions from owners, tenants and consultants preparing approval-connected construction work in Dubai."
        faqs={approvalFaqs}
        schema
      />

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(approvalHubItemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
