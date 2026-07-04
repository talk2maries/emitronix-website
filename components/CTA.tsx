import { ArrowRight, BadgeCheck, Clock, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { trustPillars } from "@/data/site";

const icons = [Users, Clock, ShieldCheck, BadgeCheck];

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="container-pad">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/[0.15] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_58%,#eaf5ff_100%)] px-6 py-12 text-charcoal shadow-luxe sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(25,73,145,0.12)_0%,transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.72)_0%,transparent_56%)]" />
          <div className="route-line left-0 top-10 w-2/3" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">Project intelligence</p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
                Plan a Dubai project with authority-ready clarity.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-steel">
                Share your location, scope, drawings and authority status. Emitronix will help clarify the practical next step for civil, fit-out or approval coordination.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustPillars.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div key={item} className="rounded-2xl border border-brand/[0.12] bg-white/[0.82] p-4 shadow-sm backdrop-blur-xl">
                    <Icon className="h-6 w-6 text-brand" />
                    <span className="mt-3 block text-sm font-black uppercase tracking-wide text-charcoal">{item}</span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-blue transition duration-300 hover:-translate-y-0.5 hover:bg-brand-deep focus-ring"
            >
              Request Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
