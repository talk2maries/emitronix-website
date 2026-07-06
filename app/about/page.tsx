import { BadgeCheck, Building2, ClipboardCheck, FileCheck2, ShieldCheck, Users } from "lucide-react";
import { CTA } from "@/components/CTA";
import { FAQSection, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { FeatureGrid, ImagePanel, PageHero, PremiumSectionHeading } from "@/components/Premium";
import { absoluteUrl, site, stats, whyChoose } from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

export const generateMetadata = createMetadataResolver({
  title: "About Emitronix Contracting LLC Dubai",
  description:
    "Learn about Emitronix Contracting LLC, a Dubai contracting company supporting civil construction, authority approvals, interior fit-out, villa, warehouse and commercial projects.",
  path: "/about",
  keywords: ["Emitronix Dubai", "Dubai contracting company", "civil construction company UAE", "authority approvals Dubai"],
  image: "/images/about-construction-coordination-dubai.webp",
});

const operatingPrinciples = [
  {
    title: "Buildability before beauty",
    description: "Premium project outcomes start with practical drawings, realistic sequencing, authority visibility and site constraints understood early.",
    icon: Building2,
  },
  {
    title: "Authority-ready thinking",
    description: "Dubai approval requirements are treated as part of the project path, not as an afterthought after mobilization.",
    icon: FileCheck2,
  },
  {
    title: "Clear stakeholder rhythm",
    description: "Owners, consultants and site teams need a common view of decisions, documentation and next actions.",
    icon: Users,
  },
  {
    title: "Handover discipline",
    description: "Completion, inspection readiness, snag closure and documentation are built into the delivery standard.",
    icon: ClipboardCheck,
  },
];

const aboutProcess = [
  "Clarify the project brief, location, drawings, stakeholder roles and authority exposure before commitments are made.",
  "Translate the scope into civil, fit-out, approval, MEP and handover requirements that can be tracked.",
  "Coordinate communication between owners, consultants and site teams so decisions stay visible.",
  "Plan completion around inspections, snag control, documentation and operational readiness.",
];

const aboutFaqs = [
  {
    question: "What does Emitronix Contracting LLC do in Dubai?",
    answer:
      "Emitronix Contracting LLC supports civil construction, building contracting, interior fit-out, villa, warehouse, commercial and authority approval coordination enquiries in Dubai and the UAE.",
  },
  {
    question: "Where is Emitronix located?",
    answer: `Emitronix uses ${site.location} as the verified location in the website business information source.`,
  },
  {
    question: "Does Emitronix handle approval coordination?",
    answer:
      "Yes. Emitronix supports Dubai authority coordination workflows connected to construction and fit-out scopes, including DM, DCD, DEWA, Trakhees, DDA and related authority interfaces where applicable.",
  },
  {
    question: "Why is early scope clarity important?",
    answer:
      "Early clarity helps owners and consultants understand drawings, approvals, civil interfaces, site constraints and handover requirements before they become expensive execution issues.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl("/about") },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Emitronix"
        title="A premium Dubai contractor built around clarity."
        description={`${site.legalName} brings together civil contracting, building construction, interior fit-out and authority approval coordination for clients across Dubai and the UAE.`}
        image="/images/about-construction-coordination-dubai.webp"
        imageAlt="Construction team reviewing drawings for Dubai civil works and authority approval coordination"
        primaryCta={{ label: "Talk to Emitronix", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "/services" }}
        metrics={stats}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <PremiumSectionHeading
              eyebrow="Company standard"
              title="Trust-based construction delivery for Dubai projects."
              description="Emitronix focuses on coordinated engineering, authority readiness, practical site supervision and premium communication for owners and consultants."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyChoose.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="luxury-card rounded-[1.5rem] p-5">
                    <Icon className="h-7 w-7 text-brand" />
                    <h2 className="mt-4 text-lg font-black tracking-tight text-charcoal">{item.title}</h2>
                  </article>
                );
              })}
            </div>
          </div>
          <ImagePanel
            src="/images/about-civil-works-dubai.webp"
            alt="Dubai civil works engineer using a tablet for site coordination and project delivery"
            label="Site coordination"
            title="Civil works, fit-out and approval-ready delivery."
          />
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Operating principles"
            title="A calm delivery system for complex Dubai scopes."
            description="The design of the company experience is simple: make the right information visible early, then keep the project moving with discipline."
            align="center"
            light
          />
          <div className="mt-12">
            <FeatureGrid features={operatingPrinciples} />
          </div>
        </div>
      </section>

      <ProcessRail
        eyebrow="How we work"
        title="A disciplined operating model for Dubai construction decisions."
        description="The company experience is built around early visibility: scope, authority requirements, site interfaces and close-out obligations are treated as one connected system."
        steps={aboutProcess}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-8 md:grid-cols-3">
          {[
            { title: "Verified business source", body: "Site contact facts, location and service areas are maintained from the shared business data file.", icon: BadgeCheck },
            { title: "Dubai location signal", body: site.location, icon: ShieldCheck },
            { title: "Project enquiry scope", body: "Civil construction, approvals, fit-out, villas, warehouses and commercial works.", icon: Building2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="luxury-card rounded-[1.5rem] p-6">
                <Icon className="h-8 w-8 text-brand" />
                <h2 className="mt-5 text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <TrustBar
        eyebrow="Company trust"
        title="Clear facts, consistent contact data and practical scope language."
        points={[
          site.legalName,
          site.location,
          site.phone,
          site.email,
        ]}
      />

      <FAQSection
        title="About Emitronix FAQ."
        description="Helpful answers for owners and consultants researching a Dubai construction company."
        faqs={aboutFaqs}
        schema
      />

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
