import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl, stats, whyChoose } from "@/data/site";

export const metadata: Metadata = {
  title: "About Emitronix",
  description:
    "Emitronix Contracting LLC is a Dubai contracting company delivering civil construction, authority approval and interior fit-out services since 2009.",
  keywords: ["Emitronix Dubai", "Dubai contracting company", "civil construction company UAE", "authority approvals Dubai"],
  alternates: {
    canonical: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">About Emitronix</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">
              Building Dubai with engineering excellence since 2009.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Emitronix Contracting LLC brings together civil contracting, building construction, interior fit-out and authority approval coordination for clients across Dubai and the UAE.
            </p>
          </div>
          <Image src="/images/about-building.svg" alt="Modern Dubai building facade" width={900} height={620} className="rounded-md shadow-panel" priority />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid gap-5 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-md border border-slate-200 bg-slate-50 p-6 text-center">
                  <Icon className="mx-auto h-9 w-9 text-royal" />
                  <p className="mt-3 text-3xl font-black text-navy">{stat.value}</p>
                  <p className="mt-1 text-sm font-bold text-slate-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="navy-grid section-pad">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Company Standard"
            title="Trust-based construction delivery for Dubai projects."
            description="Our teams focus on buildability, approval readiness, coordinated engineering and long-term client relationships."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-md bg-white p-5 text-navy shadow-panel">
                  <Icon className="h-8 w-8 text-royal" />
                  <h2 className="mt-4 text-lg font-black">{item.title}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
