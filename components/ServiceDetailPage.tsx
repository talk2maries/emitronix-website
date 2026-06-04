import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { SectionHeading } from "@/components/SectionHeading";
import type { Service } from "@/data/site";

type ServiceDetailPageProps = {
  service: Service;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const Icon = service.icon;

  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Emitronix {service.shortTitle}</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{service.details}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-royal px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy"
            >
              Request a Quote <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-md shadow-panel">
            <Image src={service.image} alt={`${service.title} service`} width={700} height={420} className="h-auto w-full" priority />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Scope"
            title={`Dubai-focused ${service.title.toLowerCase()} support.`}
            description="Emitronix coordinates engineering, site delivery, procurement, approvals and handover requirements through one accountable project workflow."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {service.highlights.map((highlight) => (
              <div key={highlight} className="rounded-md border border-slate-200 bg-slate-50 p-5">
                <CheckCircle2 className="h-7 w-7 text-royal" />
                <h2 className="mt-4 text-lg font-black text-navy">{highlight}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-grid section-pad">
        <div className="container-pad grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          <div className="text-white">
            <Icon className="h-12 w-12 text-sky" />
            <h2 className="mt-5 text-3xl font-black">Why Emitronix for {service.shortTitle}?</h2>
            <p className="mt-4 text-sm leading-6 text-white/72">
              Clients choose Emitronix for clear coordination, Dubai authority awareness, practical engineering judgement and reliable delivery support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Dubai authority and site coordination",
              "Dedicated engineering supervision",
              "Clear scope, schedule and documentation control",
              "Quality checks from mobilization to handover",
            ].map((item) => (
              <div key={item} className="rounded-md bg-white p-5 text-navy shadow-panel">
                <CheckCircle2 className="h-6 w-6 text-royal" />
                <p className="mt-3 text-sm font-bold leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
