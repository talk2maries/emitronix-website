import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { FAQSection, InsightGrid, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { FeatureGrid, ImagePanel, PageHero, PremiumSectionHeading } from "@/components/Premium";
import { approvalServices } from "@/data/approvals";
import { absoluteUrl, services as allServices, site, type Service } from "@/data/site";

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
    { label: "Methodology", href: "#methodology" },
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
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in Dubai`,
    description: service.details,
    url: absoluteUrl(service.href),
    image: absoluteUrl(service.image),
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
    serviceType: service.title,
    keywords: service.keywords.join(", "),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(service.href) },
    ],
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
                {service.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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

      <ProcessRail
        eyebrow="Process"
        title={`${service.title} process designed for Dubai decision clarity.`}
        description="A disciplined process helps prevent late authority surprises, unclear responsibilities and avoidable site rework."
        steps={service.workflow}
      />

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
              {service.keywords.map((keyword) => (
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

      <div id="faq">
        <FAQSection
          title={`${service.title} Dubai FAQ.`}
          description="Common questions from owners, consultants and commercial teams evaluating a premium construction partner in Dubai."
          faqs={service.faqs}
          schema
        />
      </div>

      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
