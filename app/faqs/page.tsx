import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import {
  ContactStrip,
  JsonLd,
  RelatedTrustLinks,
  TrustPageHero,
} from "@/components/TrustContentPage";
import {
  createTrustMetadata,
  createTrustPageJsonLd,
  publicFaqs,
} from "@/data/trustCenter";

const pageTitle = "Frequently Asked Questions | Emitronix";
const pageDescription =
  "Clear answers about Emitronix services, locations, project enquiries, website content, technical review and corrections.";

export const metadata = createTrustMetadata({
  path: "/faqs",
  title: pageTitle,
  description: pageDescription,
});

const faqJsonLd = createTrustPageJsonLd({
  path: "/faqs",
  name: "Frequently asked questions",
  description: pageDescription,
  pageType: "FAQPage",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Frequently asked questions", path: "/faqs" },
  ],
  faqs: publicFaqs,
});

const relatedLinks = [
  {
    label: "Services",
    href: "/services",
    description: "Review the core construction, fit-out, project-management and approval-support routes.",
  },
  {
    label: "Dubai service area",
    href: "/locations/dubai",
    description: "See how Emitronix presents its verified Dubai location and project-enquiry context.",
  },
  {
    label: "Editorial policy",
    href: "/editorial-policy",
    description: "Understand how public website information should be sourced, reviewed and updated.",
  },
];

export default function FaqPage() {
  return (
    <>
      <div>
        <TrustPageHero
          eyebrow="Helpful answers"
          title="Frequently asked questions"
          summary="Concise answers for owners, consultants and project teams. Where a requirement depends on a site, authority, design or contract, the answer explains that boundary."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Frequently asked questions" },
          ]}
        >
          <Link href="/contact" className="premium-button">
            Ask about a project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </TrustPageHero>

        <section className="section-pad soft-section" aria-labelledby="faq-list-heading">
          <div className="container-pad grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="premium-kicker">Quick reference</p>
              <h2 id="faq-list-heading" className="mt-4 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">
                Questions people ask before getting in touch.
              </h2>
              <p className="mt-5 text-base leading-8 text-steel">
                These answers describe public website information. A project scope, proposal, appointment or authority decision must be confirmed separately.
              </p>
              <Link href="/disclaimer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-brand">
                Read the information limits
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-4">
              {publicFaqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group rounded-[1.5rem] border border-brand/[0.10] bg-white p-6 shadow-panel"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4">
                    <HelpCircle className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                    <span className="flex-1 text-xl font-black tracking-tight text-charcoal">{faq.question}</span>
                    <span className="mt-1 text-xl font-black text-brand transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="ml-10 mt-5 border-t border-brand/[0.10] pt-5">
                    <p className="text-base leading-8 text-steel">{faq.answer}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {faq.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-2 rounded-full border border-brand/[0.14] bg-brand-soft px-4 py-2 text-sm font-black text-brand transition hover:bg-white"
                        >
                          {link.label}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactStrip />
        <RelatedTrustLinks title="Explore the trust centre" links={relatedLinks} />
      </div>
      <JsonLd data={faqJsonLd} />
    </>
  );
}
