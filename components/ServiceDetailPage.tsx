import { ArrowRight, CalendarCheck, CheckCircle2, ChevronRight, FileCheck2, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { AnswerEngineSummary } from "@/components/AnswerEngineSummary";
import { ContentReviewRecord } from "@/components/ContentReviewRecord";
import { CTA } from "@/components/CTA";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection, InsightGrid, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { FeatureGrid, ImagePanel, PageHero, PremiumSectionHeading } from "@/components/Premium";
import { ServiceVideoShowcase } from "@/components/ServiceVideoShowcase";
import { approvalServices } from "@/data/approvals";
import { getGeneratedImage } from "@/data/generatedImages";
import { buildServiceExpandedFaqs, getServiceDeepContent } from "@/data/serviceDeepContent";
import { getServiceVideo } from "@/data/serviceVideos";
import {
  absoluteUrl,
  services as allServices,
  site,
  type Service,
  whatsappUrl,
} from "@/data/site";
import { trustContentLastReviewedIso } from "@/data/trustCenter";
import { warehouseAuthorityPages } from "@/data/warehouseSeo";

const cityServiceAreas = new Set(["Dubai", "Abu Dhabi", "Sharjah"]);

type ServiceDetailPageProps = {
  service: Service;
};

function labelFromHref(href: string) {
  if (href === "/approval") return "Authority Approvals";
  return href.replace("/", "").replace(/-/g, " ");
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const Icon = service.icon;
  const phoneHref = site.phoneHref;
  const deepContent = getServiceDeepContent(service);
  const expandedFaqs = buildServiceExpandedFaqs(service);
  const pageUrl = absoluteUrl(service.href);
  const primaryImageUrl = absoluteUrl(service.image);
  const serviceImage = getGeneratedImage(service.generatedImage);
  const serviceVideo = getServiceVideo(service.href);
  const isWarehouseService = service.href === "/warehouse-construction";
  const relatedLinks = service.relatedHrefs.map((href) => {
    const relatedService = allServices.find((item) => item.href === href);
    const relatedApproval = approvalServices.find((item) => item.href === href);

    return {
      href,
      title: relatedService?.title ?? relatedApproval?.menuLabel ?? labelFromHref(href),
      description:
        relatedService?.description ??
        relatedApproval?.metaDescription ??
        "Related Dubai construction and authority coordination resource from Emitronix.",
    };
  });
  const audienceItems = [
    {
      title: "Dubai owners and developers",
      description: `${service.title} support for project owners who need clear scope, construction planning, authority visibility and decision-led communication before site commitments are made.`,
      href: "/contact",
      label: "Request consultation",
    },
    {
      title: "Consultants and design teams",
      description: "Consultant-led projects need disciplined tracking of drawings, comments, civil interfaces, authority requirements and handover evidence.",
      href: "/projects",
      label: "View project categories",
    },
    {
      title: "Commercial and industrial operators",
      description: "Warehouses, factories, offices, showrooms and retail assets need dependency-led sequencing, fire-safety visibility, utility coordination and business-ready handover.",
      href: "/industries",
      label: "View industries",
    },
  ];
  const tableOfContents = [
    ...(serviceVideo
      ? [{ label: "Visual Briefing", href: "#warehouse-video" }]
      : []),
    { label: "Overview", href: "#overview" },
    { label: "Answers", href: "#answers" },
    { label: "Topical Map", href: "#topical-authority" },
    { label: "Documents", href: "#documents" },
    { label: "Methodology", href: "#methodology" },
    { label: "Knowledge", href: "#knowledge" },
    { label: "Field Briefing", href: "#field-briefing" },
    { label: "Dubai Standards", href: "#dubai-standards" },
    { label: "Timeline & Cost", href: "#timeline-cost" },
    { label: "Mistakes", href: "#mistakes" },
    { label: "FAQ", href: "#faq" },
  ];
  const serviceFeatures = [
    {
      title: "Scope control",
      description: "Project requirements, drawings, constraints and authority exposure are clarified early.",
      icon: CheckCircle2,
    },
    {
      title: "Engineering rhythm",
      description: "Civil, structural, MEP, fit-out and consultant interfaces are managed as one delivery system.",
      icon: CheckCircle2,
    },
    {
      title: "Document readiness",
      description: "Submissions, comments, inspections and close-out records stay visible during delivery.",
      icon: CheckCircle2,
    },
    {
      title: "Handover focus",
      description: "Site execution is planned around completion documentation and operational readiness.",
      icon: CheckCircle2,
    },
  ];
  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#primaryimage`,
    url: primaryImageUrl,
    contentUrl: primaryImageUrl,
    name: `${service.title} construction image`,
    caption: serviceImage.alt,
    description: serviceImage.alt,
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: deepContent.seoTitle,
    description: deepContent.metaDescription,
    inLanguage: "en-AE",
    dateModified: trustContentLastReviewedIso,
    lastReviewed: trustContentLastReviewedIso,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    about: [
      { "@type": "Thing", name: service.title },
      { "@type": "Thing", name: deepContent.primaryKeyword },
      ...deepContent.authorityTouchpoints.slice(0, 4).map((item) => ({ "@type": "Thing", name: item.title })),
    ],
    primaryImageOfPage: {
      "@id": `${pageUrl}#primaryimage`,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": `${pageUrl}#service`,
    },
    ...(serviceVideo
      ? {
          video: {
            "@id": `${pageUrl}#service-video`,
          },
        }
      : {}),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${service.title} in Dubai`,
    alternateName: deepContent.primaryKeyword,
    description: deepContent.metaDescription,
    url: pageUrl,
    image: {
      "@id": `${pageUrl}#primaryimage`,
    },
    areaServed: site.serviceArea.map((name) => ({
      "@type": cityServiceAreas.has(name) ? "City" : "Country",
      name,
    })),
    provider: {
      "@id": absoluteUrl("/#organization"),
      name: site.legalName,
      telephone: site.phoneE164,
      email: site.email,
      url: site.url,
    },
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    serviceType: service.title,
    audience: service.whoNeeds.map((item) => ({
      "@type": "Audience",
      audienceType: item,
    })),
    isRelatedTo: relatedLinks.map((item) => ({
      "@type": "WebPage",
      name: item.title,
      url: absoluteUrl(item.href),
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#deliverables`,
    name: `${service.title} knowledge and deliverables`,
    itemListElement: [...deepContent.deliverables, ...deepContent.documents].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item,
    })),
  };
  const videoJsonLd = serviceVideo
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${pageUrl}#service-video`,
        name: serviceVideo.title,
        description: serviceVideo.description,
        thumbnailUrl: absoluteUrl(serviceVideo.posterSrc),
        contentUrl: absoluteUrl(serviceVideo.mp4Src),
        uploadDate: serviceVideo.uploadDate,
        duration: serviceVideo.duration,
        width: serviceVideo.width,
        height: serviceVideo.height,
        inLanguage: "en-AE",
        isFamilyFriendly: true,
        representativeOfPage: true,
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
      }
    : null;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        eyebrow={`Emitronix ${service.shortTitle}`}
        title={`${service.title} Dubai`}
        description={service.details}
        imageAsset={serviceImage}
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
        secondaryCta={{ label: "Planning Library", href: "/projects" }}
        metrics={[
          { value: "Dubai", label: "Local market focus" },
          { value: "DIP 02", label: "Published location" },
          { value: "Mon–Sat", label: "Published business days" },
          { value: "UAE", label: "Published enquiry coverage" },
        ]}
      />

      <AnswerEngineSummary
        question={`What is ${service.title.toLowerCase()} in Dubai?`}
        answer={deepContent.aiAnswer}
        facts={[
          `Typical project fit: ${service.whoNeeds[0]}`,
          `Key document examples: ${deepContent.documents.slice(0, 3).join(", ")}`,
          "Final scope and authority responsibilities must be confirmed for the specific project",
          "Useful enquiry details: project location, drawings status, authority comments and timeline",
        ]}
        cta={{ label: `Request ${service.shortTitle.toLowerCase()} consultation`, href: "/contact" }}
      />

      <section className="bg-white py-8">
        <div className="container-pad">
          <div className="rounded-[1.75rem] border border-brand/[0.15] bg-brand-soft p-6 text-charcoal shadow-panel">
            <p className="premium-kicker">Scope note</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">General guidance must be checked against project facts.</h2>
            <p className="mt-3 max-w-5xl text-sm leading-7 text-steel">
              Materials, methods, standards, authority routes, consultant duties, cost and programme vary by design, location, use and site condition. This page supports early planning and does not replace approved drawings, project specifications, formal authority requirements or advice from the appointed professionals.
            </p>
          </div>
        </div>
      </section>

      {serviceVideo ? <ServiceVideoShowcase asset={serviceVideo} /> : null}

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <PremiumSectionHeading
            eyebrow="Scope planning"
            title={`A controlled ${service.title.toLowerCase()} workflow for Dubai projects.`}
            description="Review scope, decisions, Dubai authority considerations, programme variables, cost drivers and common failure modes before defining the project brief."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {service.highlights.map((highlight) => (
              <article key={highlight} className="luxury-card rounded-[1.5rem] p-6">
                <CheckCircle2 className="h-7 w-7 text-brand" />
                <h2 className="mt-5 text-xl font-black tracking-tight text-charcoal">{highlight}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-pad">
          <div className="grid gap-4 rounded-[2rem] border border-brand/[0.15] bg-brand-soft p-5 shadow-panel lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
            <div>
              <p className="premium-kicker">Start this scope</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                Need {service.title.toLowerCase()} in Dubai?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="premium-button">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact?intent=site-visit" className="premium-button-light">
                Request a Site Visit <CalendarCheck className="h-4 w-4" />
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

      <section id="overview" className="section-pad soft-section">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="luxury-card rounded-[1.75rem] p-5">
              <p className="premium-kicker">Page guide</p>
              <nav className="mt-5 grid gap-2" aria-label={`${service.title} table of contents`}>
                {tableOfContents.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-2xl border border-brand/[0.12] bg-white px-4 py-3 text-sm font-black text-charcoal transition hover:border-brand/30 hover:bg-brand-soft hover:text-brand">
                    {item.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          <div className="grid gap-6">
            <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
              <p className="premium-kicker">What it means</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">
                {service.title} in Dubai, explained for owners and consultants.
              </h2>
              <div className="mt-6 grid gap-5 text-base leading-8 text-steel">
                <p>{deepContent.buyerPromise}</p>
                {service.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>
                  Use the sections below to review documents, possible authority touchpoints, technical risks, decision factors and questions to raise before defining a project-specific scope.
                </p>
              </div>
            </article>
            <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
              <p className="premium-kicker">Who needs it</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal">Typical clients and project situations.</h2>
              <div className="mt-6 grid gap-3">
                {service.whoNeeds.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="answers" className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Direct answers"
            title={`${service.title} questions for owners and consultants.`}
            description={`These concise answers help owners comparing ${deepContent.primaryKeyword} understand scope, contractor selection, authority exposure and enquiry readiness before contacting Emitronix.`}
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {deepContent.answerBlocks.map((item) => (
              <article key={item.title} className="luxury-card rounded-[1.5rem] p-6 lg:p-7">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="topical-authority" className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Project context"
            title={`${service.title} decisions, risks and Dubai project context.`}
            description="This section connects scope questions, possible approval exposure, technical interfaces and enquiry readiness."
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
                <article key={item.title} className="rounded-[1.5rem] border border-brand/[0.12] bg-white p-6 shadow-panel">
                  <p className="premium-kicker">Decision factor</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-steel">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad grid gap-10 lg:grid-cols-2">
          <div>
            <PremiumSectionHeading
              eyebrow="Buyer pain points"
              title={`Problems that delay ${service.title.toLowerCase()} in Dubai.`}
              description="Commercial buyers usually contact a contractor because a real risk needs to be controlled: drawings, authority comments, site constraints, cost uncertainty or handover pressure."
            />
            <div className="mt-8 grid gap-4">
              {deepContent.painPoints.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-brand/[0.12] bg-white p-6 shadow-panel">
                  <h2 className="text-xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <PremiumSectionHeading
              eyebrow="Emitronix solution"
              title="How the risk is reduced before it reaches site."
              description="Early fact-checking protects the programme, procurement and site commitments from assumptions that become expensive to change."
            />
            <div className="mt-8 grid gap-4">
              {deepContent.solutionBlocks.map((item) => (
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

      <section id="documents" className="section-pad bg-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <PremiumSectionHeading
            eyebrow="Documents and deliverables"
            title={`What to prepare before requesting ${service.title.toLowerCase()}.`}
            description="Better starting information creates faster technical review, cleaner pricing assumptions and fewer avoidable revision cycles."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="luxury-card rounded-[1.5rem] p-6">
              <h2 className="text-2xl font-black tracking-tight text-charcoal">Useful documents</h2>
              <div className="mt-5 grid gap-3">
                {deepContent.documents.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="luxury-card rounded-[1.5rem] p-6">
              <h2 className="text-2xl font-black tracking-tight text-charcoal">Typical deliverables</h2>
              <div className="mt-5 grid gap-3">
                {deepContent.deliverables.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                    <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <ProcessRail
        eyebrow="Process"
        title={`${service.title} process designed for Dubai decision clarity.`}
        description="A disciplined process helps prevent late authority surprises, unclear responsibilities and avoidable site rework."
        steps={service.workflow}
      />

      <section id="knowledge" className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Technical knowledge base"
            title={`${service.title} technical points buyers should understand.`}
            description="These topics help non-technical owners ask better questions while giving consultants a clear basis for project-specific review."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
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

      <section id="field-briefing" className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Field decision briefing"
            title={`${service.title} decisions worth resolving before site pressure builds.`}
            description="These notes connect design intent to procurement, inspections and handover. They are general planning prompts; the appointed professionals must confirm the project-specific design and authority requirements."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {deepContent.fieldDecisionBriefs.map((brief, index) => (
              <article key={brief.title} className="luxury-card rounded-[1.5rem] p-6 lg:p-7">
                <p className="premium-kicker">Decision {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{brief.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{brief.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Icon className="h-14 w-14 text-brand" />
            <PremiumSectionHeading
              eyebrow="Methodology"
              title={`How Emitronix approaches ${service.shortTitle}.`}
              description="The project experience is designed to reduce ambiguity before it reaches the site, keeping owners, consultants, authorities and field teams aligned."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.methodology.map((item) => (
              <article key={item} className="rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-6 backdrop-blur-xl">
                <CheckCircle2 className="h-6 w-6 text-brand" />
                <p className="mt-4 text-sm font-bold leading-7 text-charcoal">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InsightGrid
        eyebrow="Industries served"
        title={`${service.title} across Dubai project environments.`}
        description="The service is structured for asset types that require coordinated decisions between owners, consultants, authorities and site teams."
        items={audienceItems}
        tone="soft"
      />

      <section id="dubai-standards" className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ImagePanel
            asset={serviceImage}
            label="Planning illustration"
            title={`${service.title} scope and coordination considerations.`}
          />
          <div>
            <PremiumSectionHeading
              eyebrow="Authority and standards context"
              title={`${service.title} support for owners, consultants and commercial teams.`}
              description="The applicable authorities, standards and appointed-party responsibilities depend on location, use, design and project stage."
            />
            <div className="mt-8 grid gap-3">
              {deepContent.authorityTouchpoints.slice(0, 6).map((item) => (
                <div key={item.title} className="rounded-2xl border border-brand/[0.12] bg-platinum px-5 py-4">
                  <h2 className="text-sm font-black text-charcoal">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-steel">{item.description}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="premium-button mt-8">
              Discuss this scope <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <PremiumSectionHeading
            eyebrow="Published service area"
            title={`${service.title} enquiries within Emitronix's published coverage.`}
            description="Availability and the applicable authority route remain subject to the actual project location, scope and appointed parties."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {site.serviceArea.map((location) => (
              <Link key={location} href="/contact" className="luxury-card rounded-[1.5rem] p-5">
                <MapPin className="h-6 w-6 text-brand" />
                <h2 className="mt-4 text-xl font-black tracking-tight text-charcoal">{location}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">
                  {service.title} enquiries for {location}, subject to scope review, authority jurisdiction, availability and site readiness.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InsightGrid
        eyebrow="Industry use cases"
        title={`${service.title} by buyer type and project environment.`}
        description="Every asset type creates different technical, authority, procurement and handover questions."
        items={deepContent.industries.map((item) => ({ ...item, href: "/contact", label: "Discuss scope" }))}
        tone="light"
      />

      <section className="section-pad soft-section">
        <div className="container-pad grid gap-8 lg:grid-cols-2">
          <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
            <p className="premium-kicker">Quality standards</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal">What controlled delivery looks like.</h2>
            <div className="mt-6 grid gap-3">
              {service.qualityStandards.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
            <p className="premium-kicker">Dubai regulations</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal">Authority-aware planning, without guessing.</h2>
            <div className="mt-6 grid gap-3">
              {service.dubaiRegulations.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="timeline-cost" className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Timeline and cost"
            title={`${service.title} planning variables buyers should understand.`}
            description="Timelines and budgets depend on the real project conditions. These tables explain the factors that usually shape decisions in Dubai."
            align="center"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-x-auto rounded-[1.75rem] border border-brand/[0.12] bg-white shadow-panel">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <caption className="sr-only">{service.title} timeline planning variables</caption>
                <thead className="bg-brand-soft text-charcoal">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-black">Phase</th>
                    <th scope="col" className="px-5 py-4 font-black">Typical Duration</th>
                    <th scope="col" className="px-5 py-4 font-black">What Changes It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand/[0.10]">
                  {service.timeline.map((item) => (
                    <tr key={item.phase} className="align-top">
                      <th scope="row" className="px-5 py-4 font-black text-charcoal">{item.phase}</th>
                      <td className="px-5 py-4 font-bold text-brand">{item.typicalDuration}</td>
                      <td className="px-5 py-4 leading-7 text-steel">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <article className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
              <p className="premium-kicker">Cost factors</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal">What affects pricing.</h2>
              <div className="mt-6 grid gap-3">
                {service.costFactors.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Decision factors"
            title={`What changes the route for ${deepContent.primaryKeyword}.`}
            description="These factors influence cost, timeline, authority exposure, site sequence and the level of documentation needed."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {deepContent.decisionFactors.map((factor) => (
              <article key={factor.title} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{factor.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">{factor.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mistakes" className="section-pad soft-section">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <PremiumSectionHeading
            eyebrow="Mistakes to avoid"
            title={`Common ${service.title.toLowerCase()} mistakes in Dubai.`}
            description="Good construction decisions often come from avoiding predictable problems early."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {service.commonMistakes.map((item) => (
              <article key={item} className="luxury-card rounded-[1.5rem] p-6">
                <CheckCircle2 className="h-6 w-6 text-brand" />
                <p className="mt-4 text-sm font-bold leading-7 text-charcoal">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Control points"
            title="A construction workflow that feels calm at decision speed."
            description="Useful delivery control comes from visible responsibilities, current documents and authority-aware decisions."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid features={serviceFeatures} />
          </div>
        </div>
      </section>

      <TrustBar
        eyebrow="Trust section"
        title="Defined coordination without inflated claims."
        points={[
          "Verified Dubai business details",
          "Clear scope and document tracking",
          "Authority-aware project planning",
          "Responsive enquiry and handover focus",
        ]}
      />

      {isWarehouseService ? (
        <section id="warehouse-authority-silo" className="section-pad soft-section">
          <div className="container-pad">
            <PremiumSectionHeading
              eyebrow="Warehouse authority silo"
              title="Warehouse construction pages for deeper Dubai project planning."
              description="Use these supporting pages to explore warehouse construction, civil works, steel structures, authority approvals, fit-out, maintenance and handover topics with stronger internal context."
              align="center"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {warehouseAuthorityPages.map((page) => (
                <Link key={page.href} href={page.href} className="luxury-card rounded-[1.35rem] p-5">
                  <p className="premium-kicker">{page.category}</p>
                  <h2 className="mt-3 text-xl font-black leading-snug text-charcoal">{page.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{page.metaDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                    Open topic <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Next resources"
            title={`${service.title} connected to related Dubai services and approvals.`}
            description="Continue to related scopes, approval guidance and enquiry routes based on the next project decision."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {deepContent.internalLinkBlocks.map((item) => (
              <Link key={`${item.href}-${item.title}`} href={item.href} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-xl font-black tracking-tight text-charcoal">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                  {item.label} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Related services"
            title={`Plan ${service.title.toLowerCase()} with the right supporting scopes.`}
            description="Use these related resources to move between construction, fit-out, authority approvals and project planning without losing context."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedLinks.map((item) => (
              <Link key={item.href} href={item.href} className="luxury-card rounded-[1.5rem] p-6">
                <h2 className="text-xl font-black tracking-tight text-charcoal">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                  Open page <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <PremiumSectionHeading
              eyebrow="Quick quote"
              title={`Request ${service.shortTitle.toLowerCase()} consultation.`}
              description={`Share your project location, drawing status, authority comments and timeline. The ${service.title.toLowerCase()} review will identify the next coordination action.`}
            />
            <div className="mt-6 grid gap-3">
              {["Project location and scope", "Drawings or authority status", "Preferred timeline and site access"].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-bold leading-7 text-charcoal">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <ContentReviewRecord
        title={`${service.title} content record`}
        reviewScope="General editorial review of service scope, workflow, document requirements, claim boundaries and Dubai context. Project requirements must be confirmed against current drawings, contracts, authority requirements and appointed-professional responsibilities."
      />

      <div id="faq">
        <FAQSection
          title={`${service.title} Dubai FAQ.`}
          description="Common questions from owners, consultants and commercial teams evaluating a premium construction partner in Dubai."
          faqs={expandedFaqs}
          schema
        />
      </div>

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {videoJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      ) : null}
    </>
  );
}
