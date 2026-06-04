import { ArrowRight, BadgeCheck, Clock, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { trustPillars } from "@/data/site";

const icons = [Users, Clock, ShieldCheck, BadgeCheck];

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-royal to-navy text-white">
      <div className="container-pad grid gap-8 py-10 lg:grid-cols-[1fr_1.25fr_auto] lg:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Planning a Project in Dubai?</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-white/78">
            Let Emitronix handle construction, MEP, switchgear and approvals from start to finish.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {trustPillars.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item} className="flex items-center gap-3 border-white/15 sm:border-l sm:pl-4">
                <Icon className="h-7 w-7 shrink-0 text-sky" />
                <span className="text-xs font-bold leading-5">{item}</span>
              </div>
            );
          })}
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-4 text-sm font-bold uppercase tracking-wide text-royal shadow-lg transition hover:bg-platinum focus-ring"
        >
          Request a Quote <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
