import { ArrowRight, CheckCircle2, ChevronRight, ClipboardCheck, FileCheck2 } from "lucide-react";
import Link from "next/link";
import { approvalServices, type ApprovalService } from "@/data/approvals";
import { absoluteUrl, site } from "@/data/site";

type ApprovalServicePageProps = {
  service: ApprovalService;
};

export function ApprovalServicePage({ service }: ApprovalServicePageProps) {
  const relatedPages = service.related
    .map((slug) => approvalServices.find((item) => item.slug === slug))
    .filter((item): item is ApprovalService => Boolean(item));

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
      "@type": "LocalBusiness",
      name: site.legalName,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dubai Investment Park 02",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Approval",
        item: absoluteUrl("/approval"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.menuLabel,
        item: absoluteUrl(service.href),
      },
    ],
  };

  return (
    <>
      <section className="relative overflow-hidden bg-slate-50">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(31,143,255,0.18),transparent_34%),linear-gradient(135deg,transparent,rgba(11,79,179,0.08))] lg:block" />
        <div className="container-pad relative py-14 lg:py-20">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-royal">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/approval" className="hover:text-royal">
              Approval
            </Link>
            <ChevronRight size={16} />
            <span className="text-navy">{service.menuLabel}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-royal">{service.eyebrow}</p>
              <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
                {service.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{service.heroText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-royal px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy focus-ring"
                >
                  Request Approval Support <ArrowRight size={18} />
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center rounded-sm border border-royal px-7 py-4 text-sm font-bold uppercase tracking-wide text-royal transition hover:bg-blue-50 focus-ring"
                >
                  Call {site.phone}
                </a>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-panel">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="grid h-14 w-14 place-items-center rounded-sm bg-blue-50 text-royal">
                  <FileCheck2 size={30} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Dubai Authority Workflow</p>
                  <h2 className="mt-1 text-2xl font-black text-navy">Submission to close-out</h2>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {["Document review", "Authority coordination", "Comment response", "Inspection support"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-sm bg-slate-50 p-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-royal" />
                    <span className="text-sm font-bold text-navy">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Service Overview</p>
            <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-navy sm:text-4xl">{service.overviewTitle}</h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-slate-600">
            {service.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="container-pad">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Approval Process</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">A clear path from review to authority response.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, index) => (
              <div key={step} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-sm bg-royal text-sm font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-4 text-sm font-bold leading-6 text-navy">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <ClipboardCheck className="h-12 w-12 text-royal" />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-royal">Required Documents</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">Documents commonly requested for this approval.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Final requirements depend on project type, location, authority comments and consultant scope.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.documents.map((document) => (
              <div key={document} className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <p className="text-sm font-semibold leading-6 text-slate-700">{document}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-grid section-pad text-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">Why Choose Emitronix</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Approval support backed by Dubai construction experience.</h2>
            <p className="mt-4 text-base leading-7 text-white/72">
              Emitronix combines civil construction knowledge with authority coordination discipline, helping clients keep documents, site teams and approvals aligned.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.whyChoose.map((item) => (
              <div key={item} className="rounded-md bg-white p-5 text-navy shadow-panel">
                <CheckCircle2 className="h-6 w-6 text-royal" />
                <p className="mt-3 text-sm font-bold leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Related Approvals</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-navy">Explore connected Dubai approval services.</h2>
            </div>
            <Link href="/approval" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-royal hover:text-navy">
              All approval services <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedPages.map((item) => (
              <Link key={item.slug} href={item.href} className="rounded-md border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-royal/40 hover:bg-white hover:shadow-panel">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-royal">Approval Service</p>
                <h3 className="mt-3 text-xl font-black text-navy">{item.menuLabel}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-royal py-12 text-white">
        <div className="container-pad flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Need authority approval support?</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Talk to Emitronix about your Dubai project.</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-royal transition hover:bg-navy hover:text-white focus-ring"
          >
            Request Approval Support <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
