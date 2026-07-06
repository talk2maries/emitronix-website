import { ArrowRight, CalendarCheck, CheckCircle2, ChevronRight, FileCheck2, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnswerEngineSummary } from "@/components/AnswerEngineSummary";
import { CTA } from "@/components/CTA";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection, InsightGrid, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { FeatureGrid, ImagePanel, PageHero, PremiumSectionHeading } from "@/components/Premium";
import { approvalServices } from "@/data/approvals";
import { portfolioProjects, type PortfolioProject } from "@/data/projects";
import { buildServiceExpandedFaqs, getServiceDeepContent } from "@/data/serviceDeepContent";
import { absoluteUrl, services as allServices, site, type Service, whatsappUrl } from "@/data/site";

const cityServiceAreas = new Set(["Dubai", "Abu Dhabi", "Sharjah"]);

type ServiceDetailPageProps = {
  service: Service;
};

function labelFromHref(href: string) {
  if (href === "/approval") return "Authority Approvals";
  return href.replace("/", "").replace(/-/g, " ");
}

function getRelatedProjectProfiles(service: Service): PortfolioProject[] {
  const text = `${service.title} ${service.shortTitle} ${service.keywords.join(" ")}`.toLowerCase();
  const categoryPriority = text.includes("approval") || text.includes("dewa") || text.includes("municipality")
    ? ["Authority Approvals", "MEP Works", "Civil Works"]
    : text.includes("mep") || text.includes("warehouse") || text.includes("industrial")
      ? ["MEP Works", "Civil Works", "Maintenance"]
      : text.includes("renovation") || text.includes("fit-out") || text.includes("interior") || text.includes("villa")
        ? ["Renovation", "Maintenance", "Authority Approvals"]
        : ["Civil Works", "Renovation", "MEP Works"];

  const ordered = [
    ...portfolioProjects.filter((project) => categoryPriority.includes(project.category)),
    ...portfolioProjects.filter((project) => !categoryPriority.includes(project.category)),
  ];

  return ordered.slice(0, 3);
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const Icon = service.icon;
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const deepContent = getServiceDeepContent(service);
  const expandedFaqs = buildServiceExpandedFaqs(service);
  const schemaKeywords = deepContent.semanticKeywords.slice(0, 30);
  const pageUrl = absoluteUrl(service.href);
  const primaryImageUrl = absoluteUrl(service.image);
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
      description: `${service.title} support for project owners who need clear scope, construction planning, authority visibility and premium communication before site commitments are made.`,
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
      description: "Warehouses, factories, offices, showrooms and retail assets need practical sequencing, fire-safety visibility, utility coordination and business-ready handover.",
      href: "/industries",
      label: "View industries",
    },
  ];
  const tableOfContents = [
    { label: "Overview", href: "#overview" },
    { label: "Answers", href: "#answers" },
    { label: "Topical Map", href: "#topical-authority" },
    { label: "Documents", href: "#documents" },
    { label: "Methodology", href: "#methodology" },
    { label: "Knowledge", href: "#knowledge" },
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
  const relatedProjectProfiles = getRelatedProjectProfiles(service);
  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#primaryimage`,
    url: primaryImageUrl,
    contentUrl: primaryImageUrl,
    name: service.imageTitle,
    caption: service.imageAlt,
    description: `${service.imageAlt} for ${deepContent.primaryKeyword} service content by ${site.legalName}.`,
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
    name: deepContent.seoTitle,
    description: deepContent.metaDescription,
    inLanguage: "en-AE",
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
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#answers", "#faq"],
    },
    mainEntity: {
      "@id": `${pageUrl}#service`,
    },
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
      "@id": absoluteUrl("/#localbusiness"),
      name: site.legalName,
      telephone: site.phone,
      email: site.email,
      url: site.url,
    },
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    serviceType: service.title,
    keywords: schemaKeywords.join(", "),
    knowsAbout: schemaKeywords,
    audience: service.whoNeeds.map((item) => ({
      "@type": "Audience",
      audienceType: item,
    })),
    isRelatedTo: relatedLinks.map((item) => ({
      "@type": "WebPage",
      name: item.title,
      url: absoluteUrl(item.href),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} deliverables`,
      itemListElement: deepContent.deliverables.map((deliverable) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliverable,
          description: `${deliverable} for ${service.title} projects in Dubai.`,
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
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: deepContent.seoTitle,
    description: deepContent.metaDescription,
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
    articleSection: "Dubai construction services",
    keywords: schemaKeywords.join(", "),
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

  return (
    <>
      <PageHero
        eyebrow={`Emitronix ${service.shortTitle}`}
        title={`${service.title} Dubai`}
        description={service.details}
        image={service.image}
        imageAlt={service.imageAlt}
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
        secondaryCta={{ label: "View Projects", href: "/projects" }}
        metrics={[
          { value: "Dubai", label: "Local market focus" },
          { value: "G+4", label: "Civil contracting scope" },
          { value: "DM/DCD", label: "Authority-ready planning" },
          { value: "UAE", label: "Project enquiry coverage" },
        ]}
      />

      <AnswerEngineSummary
        question={`What is ${service.title.toLowerCase()} in Dubai?`}
        answer={deepContent.aiAnswer}
        facts={[
          `Primary search intent: ${deepContent.primaryKeyword}`,
          `Typical project fit: ${service.whoNeeds[0]}`,
          `Common Dubai areas: ${deepContent.locations.slice(0, 5).join(", ")}`,
          `Key document examples: ${deepContent.documents.slice(0, 3).join(", ")}`,
          "Useful enquiry details: project location, drawings status, authority comments and timeline",
        ]}
        cta={{ label: `Request ${service.shortTitle.toLowerCase()} consultation`, href: "/contact" }}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <PremiumSectionHeading
            eyebrow="Scope intelligence"
            title={`A premium ${service.title.toLowerCase()} workflow for Dubai projects.`}
            description={`This page is structured for buyers evaluating ${service.searchIntent}. It explains the scope, decision points, Dubai authority considerations, timeline variables, cost factors and practical mistakes to avoid.`}
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
                  This guide also covers practical documents, Dubai service areas, authority touchpoints, technical risks, decision factors, sample project situations and frequently asked buyer questions so the page can support searchers at research, comparison and enquiry stages.
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
            eyebrow="Answer engine blocks"
            title={`${service.title} answers written for buyers, Google AI Overviews and LLM search.`}
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
            eyebrow="Topical authority"
            title={`${service.title} buyer questions, search intent and Dubai project context.`}
            description={`${deepContent.primaryKeyword} pages need more than a short service description. This section connects practical buyer intent, Dubai approval exposure, technical scope and enquiry readiness in one place.`}
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
                  <p className="premium-kicker">Buyer intent</p>
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
              description="The practical value is early clarity. The team checks facts before schedule, procurement and site commitments become expensive to change."
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
            description="These topics are written to help non-technical owners ask better questions while giving consultants and AI search systems precise context."
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
        description="The service is structured for the asset types most likely to require practical coordination between owners, consultants, authorities and site teams."
        items={audienceItems}
        tone="soft"
      />

      <section id="dubai-standards" className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ImagePanel src={service.image} alt={service.imageAlt} label="Premium execution" title={`${service.title} with authority-ready control.`} />
          <div>
            <PremiumSectionHeading
              eyebrow="Dubai local SEO"
              title={`${service.title} support for owners, consultants and commercial teams.`}
              description={`Emitronix Contracting LLC supports ${service.title.toLowerCase()} enquiries across Dubai and the UAE with practical engineering coordination, clear communication and documented project controls.`}
            />
            <div className="mt-8 grid gap-3">
              {deepContent.semanticKeywords.slice(0, 12).map((keyword) => (
                <Link key={keyword} href="/contact" className="flex items-center justify-between rounded-2xl border border-brand/[0.12] bg-platinum px-5 py-4 text-sm font-black text-charcoal transition hover:border-brand/30 hover:bg-white hover:text-brand">
                  {keyword}
                  <ChevronRight className="h-4 w-4" />
                </Link>
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
            eyebrow="Dubai location coverage"
            title={`${service.title} enquiries across key Dubai business districts.`}
            description="Location affects authority jurisdiction, landlord requirements, site access, deliveries, working hours and inspection planning."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {deepContent.locations.map((location) => (
              <Link key={location} href="/contact" className="luxury-card rounded-[1.5rem] p-5">
                <MapPin className="h-6 w-6 text-brand" />
                <h2 className="mt-4 text-xl font-black tracking-tight text-charcoal">{location}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">
                  {deepContent.primaryKeyword} support for enquiries in {location}, subject to scope, authority route and site readiness.
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
            <h2 className="mt-4 text-3xl font-black tracking-tight text-charcoal">What premium delivery control looks like.</h2>
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
                <thead className="bg-brand-soft text-charcoal">
                  <tr>
                    <th className="px-5 py-4 font-black">Phase</th>
                    <th className="px-5 py-4 font-black">Typical Duration</th>
                    <th className="px-5 py-4 font-black">What Changes It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand/[0.10]">
                  {service.timeline.map((item) => (
                    <tr key={item.phase} className="align-top">
                      <td className="px-5 py-4 font-black text-charcoal">{item.phase}</td>
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
            description="The premium experience comes from visible coordination, practical documentation and authority-aware decision-making."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid features={serviceFeatures} />
          </div>
        </div>
      </section>

      <TrustBar
        eyebrow="Trust section"
        title="Premium coordination without inflated claims."
        points={[
          "Verified Dubai business details",
          "Clear scope and document tracking",
          "Authority-aware project planning",
          "Responsive enquiry and handover focus",
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Sample project situations"
            title={`How ${service.title.toLowerCase()} enquiries become clearer.`}
            description="These are publication-safe sample profiles that describe common Dubai project situations without inventing private client names, project counts or unverifiable claims."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {deepContent.caseProfiles.map((profile) => (
              <article key={profile.title} className="luxury-card rounded-[1.5rem] p-6">
                <p className="premium-kicker">{profile.location}</p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-charcoal">{profile.title}</h2>
                <p className="mt-4 text-sm leading-7 text-steel"><strong className="text-charcoal">Situation:</strong> {profile.situation}</p>
                <p className="mt-3 text-sm leading-7 text-steel"><strong className="text-charcoal">Approach:</strong> {profile.approach}</p>
                <p className="mt-3 text-sm leading-7 text-steel"><strong className="text-charcoal">Outcome:</strong> {profile.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Related projects"
            title={`Representative project profiles for ${service.title.toLowerCase()}.`}
            description="These publication-safe profiles show the types of Dubai scopes connected to this service. Client names, dates and private site details are shared only after approval."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {relatedProjectProfiles.map((project) => (
              <Link
                key={`${service.slug}-${project.title}`}
                href="/projects"
                className="group overflow-hidden rounded-[1.5rem] border border-brand/10 bg-white/[0.88] shadow-panel backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-luxe"
              >
                <div className="relative h-60 overflow-hidden bg-brand-soft">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    title={project.imageTitle}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 31vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/72 via-brand-dark/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/[0.86] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-brand backdrop-blur-xl">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black tracking-tight text-charcoal">{project.title}</h2>
                  <p className="mt-3 flex items-center gap-2 text-sm font-bold text-steel">
                    <MapPin className="h-4 w-4 text-brand" />
                    {project.location}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-steel">{project.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
                    View portfolio <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Internal link map"
            title={`${service.title} connected to related Dubai services and approvals.`}
            description="These links help buyers move between connected scopes, authority touchpoints, project environments and enquiry actions without losing context."
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
            description="Internal links help owners and consultants move between construction, fit-out, authority approvals and project planning resources without losing context."
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
              description={`Share your project location, drawings status, authority comments and timeline. Emitronix will review the ${service.title.toLowerCase()} enquiry and respond with the practical next step.`}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    </>
  );
}
