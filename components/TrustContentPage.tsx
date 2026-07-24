import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  createTrustPageJsonLd,
  trustContentLastReviewedLabel,
  type TrustLink,
  type TrustPageContent,
} from "@/data/trustCenter";
import { site } from "@/data/site";

export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function TrustBreadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-steel">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="font-bold text-brand transition hover:text-brand-dark">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TrustPageHero({
  eyebrow,
  title,
  summary,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-brand/[0.10] bg-white pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(74,144,226,0.16),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f4f8ff_58%,#edf4ff_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(18,58,115,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(18,58,115,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="container-pad relative py-16 sm:py-20 lg:py-24">
        <TrustBreadcrumbs items={breadcrumbs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.38fr] lg:items-end">
          <div className="max-w-5xl">
            <p className="premium-kicker">{eyebrow}</p>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[0.98] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-steel sm:text-xl sm:leading-9">{summary}</p>
          </div>
          <div className="rounded-[1.5rem] border border-brand/[0.14] bg-white/85 p-5 shadow-panel backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Content record</p>
                <p className="mt-2 text-sm font-bold text-charcoal">Last reviewed {trustContentLastReviewedLabel}</p>
                <p className="mt-1 text-sm leading-6 text-steel">English-language public information</p>
              </div>
            </div>
          </div>
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

export function PrincipleGrid({
  principles,
}: {
  principles: Array<{ title: string; description: string }>;
}) {
  return (
    <section aria-labelledby="principles-heading" className="bg-white py-12">
      <div className="container-pad">
        <h2 id="principles-heading" className="sr-only">
          Policy principles
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="luxury-card rounded-[1.5rem] p-6">
              <BadgeCheck className="h-7 w-7 text-brand" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-black tracking-tight text-charcoal">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-steel">{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedTrustLinks({
  title = "Related information",
  links,
}: {
  title?: string;
  links: ReadonlyArray<TrustLink>;
}) {
  return (
    <section className="soft-section py-16">
      <div className="container-pad">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="premium-kicker">Continue reading</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">{title}</h2>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand">
            Contact Emitronix <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="luxury-card group rounded-[1.5rem] p-6">
              <BookOpenCheck className="h-7 w-7 text-brand" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-black tracking-tight text-charcoal">{link.label}</h3>
              <p className="mt-3 text-sm leading-7 text-steel">{link.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand">
                Read more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VerificationPanel({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; value: string; verified: boolean }>;
}) {
  return (
    <section aria-labelledby="verification-heading" className="bg-white py-16">
      <div className="container-pad">
        <div className="rounded-[2rem] border border-brand/[0.12] bg-brand-soft p-6 shadow-panel sm:p-8">
          <div className="max-w-3xl">
            <p className="premium-kicker">Publication boundary</p>
            <h2 id="verification-heading" className="mt-3 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-8 text-steel">
              Missing information is identified openly instead of being inferred from an address, business name or service description.
            </p>
          </div>
          <dl className="mt-8 grid gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <div key={item.label} className="rounded-2xl border border-brand/[0.12] bg-white p-5">
                <dt className="flex items-start gap-3 text-sm font-black text-charcoal">
                  {item.verified ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  ) : (
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  )}
                  {item.label}
                </dt>
                <dd className="mt-3 pl-8 text-sm leading-7 text-steel">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function ContactStrip() {
  return (
    <section className="border-y border-brand/[0.10] bg-white py-10">
      <div className="container-pad grid gap-4 sm:grid-cols-3">
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-brand-soft">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <span className="block text-xs font-black uppercase tracking-wide text-steel">Phone</span>
            <span className="mt-1 block font-bold text-charcoal">{site.phone}</span>
          </span>
        </a>
        <a href={`mailto:${site.email}`} className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-brand-soft">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <span className="block text-xs font-black uppercase tracking-wide text-steel">Email</span>
            <span className="mt-1 block font-bold text-charcoal">{site.email}</span>
          </span>
        </a>
        <Link href="/locations/dubai" className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-brand-soft">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <span className="block text-xs font-black uppercase tracking-wide text-steel">Published location</span>
            <span className="mt-1 block font-bold text-charcoal">{site.location}</span>
          </span>
        </Link>
      </div>
    </section>
  );
}

export function TrustPolicyPage({ content }: { content: TrustPageContent }) {
  const jsonLd = createTrustPageJsonLd({
    path: content.path,
    name: content.title,
    description: content.metaDescription,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: content.title, path: content.path },
    ],
  });

  return (
    <>
      <div>
        <article>
          <TrustPageHero
            eyebrow={content.eyebrow}
            title={content.title}
            summary={content.summary}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: content.title },
            ]}
          />
          <PrincipleGrid principles={content.principles} />

          <section className="section-pad soft-section">
            <div className="container-pad grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div className="space-y-6">
                {content.sections.map((section, index) => (
                  <section key={section.title} aria-labelledby={`policy-section-${index}`} className="rounded-[1.75rem] border border-brand/[0.10] bg-white p-6 shadow-panel sm:p-8">
                    <h2 id={`policy-section-${index}`} className="text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                      {section.title}
                    </h2>
                    {section.intro ? <p className="mt-4 text-base leading-8 text-steel">{section.intro}</p> : null}
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-8 text-steel">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="mt-5 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-base leading-7 text-steel">
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <aside className="rounded-[1.5rem] border border-brand/[0.12] bg-white p-5 shadow-panel lg:sticky lg:top-28">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Policy contact</p>
                <p className="mt-3 text-sm leading-7 text-steel">
                  Questions, accessibility feedback and correction reports can be sent using the verified contact details.
                </p>
                <a href={`mailto:${site.email}`} className="mt-5 flex items-center gap-3 font-bold text-charcoal">
                  <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
                  {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-4 flex items-center gap-3 font-bold text-charcoal">
                  <Phone className="h-5 w-5 text-brand" aria-hidden="true" />
                  {site.phone}
                </a>
                <Link href="/faqs" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-brand">
                  Read common questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>
            </div>
          </section>
        </article>

        <ContactStrip />
        <RelatedTrustLinks links={content.relatedLinks} />
      </div>
      <JsonLd data={jsonLd} />
    </>
  );
}
