import type { Metadata } from "next";
import { ArrowRight, Building2, CalendarCheck, Home, Landmark, MessageCircle, PhoneCall, Warehouse } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { FAQSection, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { services, site, stats, whatsappUrl } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dubai Construction Project Categories & Case Study Enquiries",
  description:
    "Review Emitronix construction project categories for civil infrastructure, warehouses, villas, fit-out and authority approvals in Dubai.",
  path: "/projects",
  keywords: ["Dubai construction projects", "civil contractor Dubai", "warehouse contractor UAE", "villa construction Dubai"],
  image: "/images/warehouse-construction-dubai.webp",
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
    question: "Does Emitronix publish completed project case studies online?",
    answer:
      "Completed project case studies are published only when project names, client permissions, timelines, photos and scope details are approved for public website use. Emitronix does not publish invented project claims.",
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
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Dubai construction project categories."
        description="Explore the civil construction, warehouse, villa, commercial fit-out and authority-facing project categories Emitronix supports, then start a verified enquiry with project location, drawings and scope details."
        image="/images/warehouse-construction-dubai.webp"
        imageAlt="Warehouse construction Dubai industrial project by Emitronix Contracting LLC"
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "Industries", href: "/industries" }}
        metrics={stats}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Case-study policy"
            title="Client-approved case studies only."
            description="Project names, client names, locations, timelines, authority records, galleries and completion status are published only after they are approved for public website use."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              "Client names require publication approval",
              "Project galleries require approved site images",
              "Project counts are published only after verification",
            ].map((item) => (
              <article key={item} className="luxury-card rounded-[1.5rem] p-6 text-center">
                <Building2 className="mx-auto h-8 w-8 text-brand" />
                <h2 className="mt-5 text-xl font-black tracking-tight text-charcoal">{item}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-pad">
          <div className="grid gap-4 rounded-[2rem] border border-brand/[0.15] bg-brand-soft p-5 shadow-panel lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
            <div>
              <p className="premium-kicker">Portfolio enquiry</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                Planning a similar Dubai project?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="premium-button">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact?intent=site-visit" className="premium-button-light">
                Request a Site Visit <CalendarCheck className="h-4 w-4" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
                WhatsApp Us <MessageCircle className="h-4 w-4" />
              </a>
              <a href={phoneHref} className="premium-button-light">
                Call Now <PhoneCall className="h-4 w-4" />
              </a>
            </div>
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
        description="The project page is designed to move users from project category to a clear construction, approval or fit-out enquiry path."
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
        title="Project content is published with approval and verification."
        points={[
          "Client-approved project details",
          "Verified case-study publishing",
          "Clear route to service pages",
          "Project details collected through enquiry form",
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
