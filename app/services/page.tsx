import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { absoluteUrl, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Emitronix civil contracting, MEP works, LV switchgear, authority approvals and interior fit-out services in Dubai, UAE.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad py-16 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Services</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">
            End-to-end construction, MEP, switchgear and approval solutions.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Emitronix delivers integrated contracting support for Dubai projects, combining field execution with authority coordination and engineering discipline.
          </p>
        </div>
      </section>

      <section className="navy-grid section-pad">
        <div className="container-pad">
          <SectionHeading eyebrow="Our Core Services" title="Complete project support under one roof." align="center" light />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
