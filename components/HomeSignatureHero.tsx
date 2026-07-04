import { ArrowRight, Cpu, FileCheck2, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MetricRibbon, type Metric } from "@/components/Premium";

export function HomeSignatureHero({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[72%]">
          <Image
            src="/images/emitronix-2026-hero-dubai.webp"
            alt="Dubai skyline and futuristic construction architecture for Emitronix Contracting LLC"
            fill
            priority
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 architectural-light" />
        </div>
        <div className="premium-grid absolute inset-0 opacity-55" />
        <div className="route-line left-[7%] top-[70%] hidden w-[44%] lg:block" />
        <div className="absolute right-[21%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-brand/[0.24] to-transparent lg:block" />
      </div>

      <div className="container-pad relative grid min-h-[760px] items-center pt-24 lg:min-h-[820px] lg:pt-28">
        <div className="max-w-5xl pb-24 lg:pb-32">
          <p className="premium-kicker">Building the future of Dubai</p>
          <h1 className="mt-6 text-balance text-6xl font-black leading-[0.91] tracking-tight text-charcoal sm:text-7xl lg:text-8xl xl:text-[7.8rem]">
            Excellence in <span className="text-brand">Every Structure</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite sm:text-xl sm:leading-9">
            Emitronix Contracting LLC delivers civil construction, building contracting, warehouse, villa, interior fit-out and Dubai authority approval support with executive-level project clarity.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" className="premium-button">
              Our Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="premium-button-light">
              Our Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              { label: "AI-ready coordination", icon: Cpu },
              { label: "Authority visibility", icon: FileCheck2 },
              { label: "Civil + fit-out control", icon: Layers3 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-full border border-brand/[0.15] bg-white/[0.82] px-4 py-3 text-xs font-black uppercase tracking-wide text-charcoal shadow-sm backdrop-blur-xl">
                  <Icon className="h-4 w-4 text-brand" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-pad relative -mt-24 pb-12">
        <MetricRibbon metrics={metrics} />
      </div>
    </section>
  );
}
