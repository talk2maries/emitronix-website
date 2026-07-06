import { ArrowRight, CalendarCheck, CheckCircle2, ChevronRight, ClipboardCheck, FileCheck2, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { approvalServices, type ApprovalService } from "@/data/approvals";
import { AnswerEngineSummary } from "@/components/AnswerEngineSummary";
import { buildApprovalExpandedFaqs, getApprovalDeepContent } from "@/data/serviceDeepContent";
import { absoluteUrl, site, whatsappUrl } from "@/data/site";
import { CTA } from "./CTA";
import { ContactForm } from "./ContactForm";
import { FAQSection, InsightGrid, TrustBar } from "./ContentBlocks";
import { PageHero, PremiumSectionHeading } from "./Premium";

type ApprovalServicePageProps = {
  service: ApprovalService;
};

const cityServiceAreas = new Set(["Dubai", "Abu Dhabi", "Sharjah"]);

export function ApprovalServicePage({ service }: ApprovalServicePageProps) {
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const deepContent = getApprovalDeepContent(service);
  const approvalFaqs = buildApprovalExpandedFaqs(service);
  const pageUrl = absoluteUrl(service.href);
  const imageUrl = absoluteUrl("/images/dubai-authority-approval-contractor.webp");
  const relatedPages = service.related
    .map((slug) => approvalServices.find((item) => item.slug === slug))
    .filter((item): item is ApprovalService => Boolean(item));
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
    "@id": `${pageUrl}#service`,
    name: service.h1,
    alternateName: deepContent.primaryKeyword,
    serviceType: service.menuLabel,
    description: service.metaDescription,
    url: pageUrl,
    image: {
      "@id": `${pageUrl}#primaryimage`,
    },
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
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    keywords: deepContent.semanticKeywords.join(", "),
    knowsAbout: deepContent.semanticKeywords.slice(0, 80),
    isRelatedTo: relatedPages.map((item) => ({
      "@type": "WebPage",
      name: item.menuLabel,
      url: absoluteUrl(item.href),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.menuLabel} support deliverables`,
      itemListElement: service.process.map((step) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: step,
          description: `${step} for ${service.menuLabel} in Dubai.`,
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Approval", item: absoluteUrl("/approval") },
      { "@type": "ListItem", position: 3, name: service.menuLabel, item: pageUrl },
    ],
  };
  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#primaryimage`,
    url: imageUrl,
    contentUrl: imageUrl,
    name: `${service.menuLabel} coordination in Dubai`,
    caption: `${service.menuLabel} document, submission and inspection coordination for Dubai projects`,
  };
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/emitronix-logo-horizontal.svg"),
    },
    email: site.email,
    telephone: site.phone,
    sameAs: [],
  };
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": absoluteUrl("/#localbusiness"),
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    image: absoluteUrl("/images/dubai-building-contracting-company.webp"),
    logo: absoluteUrl("/images/emitronix-logo-horizontal.svg"),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai Investment Park 02",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: site.serviceArea.map((name) => ({
      "@type": cityServiceAreas.has(name) ? "City" : "Country",
      name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    parentOrganization: {
      "@id": absoluteUrl("/#organization"),
    },
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: service.seoTitle,
    description: service.metaDescription,
    inLanguage: "en-AE",
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    primaryImageOfPage: {
      "@id": `${pageUrl}#primaryimage`,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#approval-answers", "#faq"],
    },
    about: [
      { "@type": "Thing", name: service.menuLabel },
      { "@type": "Thing", name: deepContent.primaryKeyword },
      ...deepContent.projectTypes.slice(0, 4).map((projectType) => ({ "@type": "Thing", name: projectType })),
    ],
    mainEntity: {
      "@id": `${pageUrl}#service`,
    },
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: service.seoTitle,
    description: service.metaDescription,
    image: {
      "@id": `${pageUrl}#primaryimage`,
    },
    author: {
      "@id": absoluteUrl("/#organization"),
    },
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    articleSection: "Dubai authority approval services",
    keywords: deepContent.semanticKeywords.join(", "),
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#approval-deliverables`,
    name: `${service.menuLabel} documents, risks and process steps`,
    itemListElement: [...service.documents, ...service.process, ...deepContent.authorityRisks.map((risk) => risk.title)].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item,
    })),
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

      <AnswerEngineSummary
        question={`How does ${service.menuLabel} work in Dubai?`}
        answer={deepContent.answerBlocks[0].description}
        facts={[
          `Primary search intent: ${deepContent.primaryKeyword}`,
          `Common project types: ${deepContent.projectTypes.slice(0, 4).join(", ")}`,
          `Useful documents: ${deepContent.documents.slice(0, 4).join(", ")}`,
          `Dubai areas: ${deepContent.locations.slice(0, 5).join(", ")}`,
        ]}
        cta={{ label: `Request ${service.menuLabel} support`, href: "/contact" }}
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
              <p>
                This guide explains documents, authority risks, process details, technical notes, Dubai locations, project types, related approvals and frequently asked buyer questions so owners, tenants and consultants can prepare a stronger approval enquiry before contacting Emitronix, with clearer expectations for comments, inspections, close-out evidence, authority decisions and construction-side coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="approval-answers" className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Answer engine blocks"
            title={`${service.menuLabel} answers for Google, AI search and Dubai buyers.`}
            description="These answer blocks are written to help owners, tenants, consultants and AI assistants understand the approval route without oversimplifying authority requirements."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {deepContent.answerBlocks.map((item) => (
              <article key={item.title} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Topical authority"
            title={`${service.menuLabel} buyer questions, search intent and Dubai approval context.`}
            description={`${deepContent.primaryKeyword} content must connect documents, jurisdiction, project type, authority comments, inspection readiness and construction-side consequences.`}
            align="center"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="grid gap-4">
              {deepContent.topicalAuthorityBlocks.map((item) => (
                <article key={item.title} className="luxury-card rounded-[1.5rem] p-6">
                  <h2 className="text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-steel">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-4">
              {deepContent.commercialIntentBlocks.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-brand/[0.12] bg-platinum p-6">
                  <p className="premium-kicker">Buyer intent</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-steel">{item.description}</p>
                </article>
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
        <div className="container-pad grid gap-10 lg:grid-cols-2">
          <div>
            <PremiumSectionHeading
              eyebrow="Approval risks"
              title={`What usually delays ${service.menuLabel}.`}
              description="Authority work moves faster when common blockers are made visible before the submission or inspection stage."
            />
            <div className="mt-8 grid gap-4">
              {deepContent.authorityRisks.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-brand/[0.12] bg-platinum p-6">
                  <h2 className="text-xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <PremiumSectionHeading
              eyebrow="Control method"
              title="How Emitronix keeps approval work connected to construction."
              description="Approval coordination should not sit outside the project. Drawings, authority comments, site works and close-out evidence must stay aligned."
            />
            <div className="mt-8 grid gap-4">
              {deepContent.processDetails.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-brand/[0.12] bg-brand-soft p-6">
                  <CheckCircle2 className="h-6 w-6 text-brand" />
                  <h2 className="mt-4 text-xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-charcoal/80">{item.description}</p>
                </article>
              ))}
            </div>
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

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Technical knowledge"
            title={`${service.menuLabel} technical notes for project teams.`}
            description="These notes help owners and consultants understand why submissions, site readiness and close-out evidence must be coordinated together."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {deepContent.technicalTopics.map((topic) => (
              <article key={topic.title} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{topic.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{topic.summary}</p>
                <div className="mt-5 grid gap-2">
                  {topic.points.map((point) => (
                    <div key={point} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand" />
                      <p className="text-sm font-bold leading-6 text-charcoal">{point}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <PremiumSectionHeading
            eyebrow="Project and location fit"
            title={`${service.menuLabel} for Dubai project environments.`}
            description="Authority requirements can change by location, asset use, master developer, landlord and inspection stage."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[...deepContent.locations, ...deepContent.projectTypes].map((item) => (
              <Link key={item} href="/contact" className="luxury-card rounded-[1.5rem] p-5">
                <h2 className="text-xl font-black tracking-tight text-charcoal">{item}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">
                  {service.menuLabel} support related to {item}, subject to jurisdiction, documents and authority comments.
                </p>
              </Link>
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
          <PremiumSectionHeading
            eyebrow="Internal link map"
            title={`${service.menuLabel} connected to Dubai construction and authority workflows.`}
            description="Approval pages link to related authority routes, construction-side coordination and enquiry actions so buyers can move through the right next step."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {deepContent.internalLinkBlocks.map((item) => (
              <Link key={`${item.href}-${item.title}`} href={item.href} className="luxury-card rounded-[1.5rem] p-6">
                <h3 className="text-xl font-black tracking-tight text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                  {item.label} <ArrowRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    </>
  );
}
