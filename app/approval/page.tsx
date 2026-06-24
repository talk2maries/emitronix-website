import type { Metadata } from "next";
import { ArrowRight, FileCheck2 } from "lucide-react";
import Link from "next/link";
import { approvalServices } from "@/data/approvals";
import { absoluteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Authority Approval Services in Dubai",
  description:
    "Dubai authority approval services for Dubai Municipality, DDA, DCD, DEWA, Trakhees, DIFC, Concordia-DMCC and RTA approvals.",
  keywords: [
    "approval services in Dubai",
    "authority approvals Dubai",
    "Dubai Municipality approval",
    "DEWA approval",
    "DCD approval",
    "RTA approval",
  ],
  alternates: { canonical: absoluteUrl("/approval") },
};

export default function ApprovalPage() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Authority Approval Services</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">
              Dubai Approval Services for Civil Construction Projects
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Emitronix Contracting LLC supports Dubai project owners, consultants and tenants with structured approval coordination across key authorities.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-royal px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy focus-ring"
            >
              Request Approval Support <ArrowRight size={18} />
            </Link>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-panel">
            <FileCheck2 className="h-12 w-12 text-royal" />
            <h2 className="mt-5 text-3xl font-black text-navy">One team. Multiple Dubai authorities.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              From document checks and submission support to authority comments and inspection readiness, our workflow keeps approval tasks organized and visible.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Approval Menu</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">
              Choose the authority approval support you need.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {approvalServices.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className="group rounded-md border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-royal/40 hover:bg-white hover:shadow-panel"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-royal">Approval Service</p>
                <h3 className="mt-3 text-xl font-black leading-6 text-navy">{service.menuLabel}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.metaDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-royal">
                  Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
