import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl, authorities, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Dubai civil construction, fit-out and authority approval resources from Emitronix Contracting LLC.",
  alternates: { canonical: absoluteUrl("/resources") },
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad py-16 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Resources</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">
            Practical guides for Dubai construction and approvals.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Reference topics for clients planning civil construction, fit-out, renovation and authority approval work in Dubai.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading eyebrow="Popular Topics" title="Plan smarter before mobilization." align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Authority approval checklist for Dubai projects",
              "Civil contracting scope review before tender",
              "Villa and warehouse project readiness checklist",
              "Renovation approval planning in Dubai",
              "Interior fit-out delivery sequence",
              "Warehouse project readiness checklist",
            ].map((topic) => (
              <article key={topic} className="rounded-md border border-slate-200 bg-slate-50 p-6">
                <FileCheck2 className="h-8 w-8 text-royal" />
                <h2 className="mt-4 text-lg font-black text-navy">{topic}</h2>
                <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-royal">
                  Ask Emitronix <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-grid section-pad">
        <div className="container-pad grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Services" title="Related service lines." light />
            <div className="mt-8 grid gap-3">
              {services.map((service) => (
                <Link key={service.slug} href={service.href} className="rounded-md bg-white p-4 font-bold text-navy hover:text-royal">
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Authorities" title="Approval bodies we coordinate with." light />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {authorities.map((authority) => (
                <div key={authority.name} className="rounded-md bg-white p-4">
                  <h3 className="font-black text-navy">{authority.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{authority.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
