import { ArrowRight, CalendarCheck, CheckCircle2, ChevronRight, ClipboardCheck, FileCheck2, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { approvalServices, type ApprovalService } from "@/data/approvals";
import { absoluteUrl, site, whatsappUrl } from "@/data/site";
import { CTA } from "./CTA";
import { ContactForm } from "./ContactForm";
import { FAQSection, InsightGrid, TrustBar } from "./ContentBlocks";
import { PageHero, PremiumSectionHeading } from "./Premium";

type ApprovalServicePageProps = {
  service: ApprovalService;
};

export function ApprovalServicePage({ service }: ApprovalServicePageProps) {
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const relatedPages = service.related
    .map((slug) => approvalServices.find((item) => item.slug === slug))
    .filter((item): item is ApprovalService => Boolean(item));
  const approvalFaqs = [
    {
      question: `When is ${service.menuLabel} support useful?`,
      answer: `${service.menuLabel} support is useful when a Dubai project needs clearer document coordination, authority comment follow-up, inspection readiness or connection between approval work and construction execution.`,
    },
    {
      question: `What information helps start ${service.menuLabel}?`,
      answer:
        "The most useful starting information includes project location, drawings, owner or tenant details, current authority comments, NOCs, consultant details and the intended construction or fit-out scope.",
    },
    {
      question: "Does the required document list change by project?",
      answer:
        "Yes. Required documents can change depending on location, building type, authority jurisdiction, landlord requirements, consultant scope, civil modifications and inspection comments.",
    },
    {
      question: "Can Emitronix connect approval work with site execution?",
      answer:
        "Yes. Emitronix keeps approval coordination connected to drawings, site sequencing, inspection readiness and handover documentation so the project team has a practical path forward.",
    },
  ];
  const readinessItems = [
    {
      title: "Scope and jurisdiction review",
      description: `The ${service.menuLabel} route starts by confirming the authority path, project category, location and stakeholders involved.`,
    },
    {
      title: "Document gap visibility",
      description: "Drawings, NOCs, authorization documents, previous approvals and consultant inputs are reviewed before avoidable submission cycles begin.",
    },
    {
      title: "Comment and inspection control",
      description: "Authority comments, revisions, inspection preparation and close-out records stay connected to the construction-side workflow.",
    },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    serviceType: service.menuLabel,
    description: service.metaDescription,
    url: absoluteUrl(service.href),
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
    provider: {
      "@id": absoluteUrl("/#localbusiness"),
      name: site.legalName,
      url: site.url,
      telephone: site.phone,
      email: site.email,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Approval", item: absoluteUrl("/approval") },
      { "@type": "ListItem", position: 3, name: service.menuLabel, item: absoluteUrl(service.href) },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        description={service.heroText}
        image="/images/dubai-authority-approval-contractor.webp"
        imageAlt={`${service.menuLabel} coordination for Dubai construction projects`}
        primaryCta={{ label: "Request Approval Support", href: "/contact" }}
        secondaryCta={{ label: "All Approvals", href: "/approval" }}
        metrics={[
          { value: "Dubai", label: "Authority jurisdiction focus" },
          { value: "Docs", label: "Submission package control" },
          { value: "Comments", label: "Response coordination" },
          { value: "Close-out", label: "Inspection readiness" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm font-bold text-steel" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight size={16} />
            <Link href="/approval" className="hover:text-brand">Approval</Link>
            <ChevronRight size={16} />
            <span className="text-charcoal">{service.menuLabel}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <PremiumSectionHeading
              eyebrow="Service overview"
              title={service.overviewTitle}
              description="Authority coordination is treated as a construction control system: scope, documentation, comments, site readiness and completion evidence remain visible."
            />
            <div className="grid gap-5 text-lg leading-9 text-steel">
              {service.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-pad">
          <div className="grid gap-4 rounded-[2rem] border border-brand/[0.15] bg-brand-soft p-5 shadow-panel lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
            <div>
              <p className="premium-kicker">Approval enquiry</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                Need {service.menuLabel} support in Dubai?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="premium-button">
                Request Support <ArrowRight className="h-4 w-4" />
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

      <section className="soft-section py-16 lg:py-24">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Approval process"
            title="A precise path from scope review to authority response."
            description="Each stage is structured so project owners, consultants and site teams understand what is required next."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {service.process.map((step, index) => (
              <article key={step} className="luxury-card rounded-[1.5rem] p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-sm font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-5 text-sm font-bold leading-7 text-charcoal">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <ClipboardCheck className="h-14 w-14 text-brand" />
            <PremiumSectionHeading
              eyebrow="Document readiness"
              title="Documents commonly requested for this approval."
              description="Final requirements depend on project type, location, authority comments and consultant scope."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.documents.map((document) => (
              <article key={document} className="flex gap-4 rounded-[1.25rem] border border-brand/[0.12] bg-platinum p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm font-bold leading-7 text-charcoal">{document}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <FileCheck2 className="h-14 w-14 text-brand" />
            <PremiumSectionHeading
              eyebrow="Why Emitronix"
              title="Approval support backed by construction-side coordination."
              description="Emitronix keeps authority work connected to drawings, site sequencing, consultant responses and handover requirements."
              light
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.whyChoose.map((item) => (
              <article key={item} className="rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-6 backdrop-blur-xl">
                <CheckCircle2 className="h-6 w-6 text-brand" />
                <p className="mt-4 text-sm font-bold leading-7 text-charcoal">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InsightGrid
        eyebrow="Approval readiness"
        title={`${service.menuLabel} planning before submission pressure builds.`}
        description="A premium approval experience is built around early visibility, document quality and construction-aware follow-up."
        items={readinessItems}
        tone="soft"
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <PremiumSectionHeading eyebrow="Related approvals" title="Connected Dubai authority workflows." />
            <Link href="/approval" className="premium-button-light">
              All Approval Services <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedPages.map((item) => (
              <Link key={item.slug} href={item.href} className="luxury-card rounded-[1.5rem] p-6">
                <p className="premium-kicker">Approval Service</p>
                <h3 className="mt-4 text-2xl font-black tracking-tight text-charcoal">{item.menuLabel}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{item.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustBar
        eyebrow="Authority trust"
        title="A practical approval route for owners, tenants and consultants."
        points={[
          "Dubai authority-focused page structure",
          "Document and comment tracking",
          "Related approval internal links",
          "Construction-side close-out awareness",
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <PremiumSectionHeading
              eyebrow="Quick quote"
              title={`Request ${service.menuLabel} support.`}
              description="Share the project location, drawings, current comments, consultant details and required timeline so Emitronix can identify the next practical approval step."
            />
            <div className="mt-6 grid gap-3">
              {["Authority comments and drawings", "Consultant or landlord requirements", "Site condition and inspection timeline"].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-platinum p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <FAQSection
        title={`${service.menuLabel} FAQ.`}
        description="Useful answers for Dubai project teams preparing authority submissions, comments and inspections."
        faqs={approvalFaqs}
        schema
      />

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
