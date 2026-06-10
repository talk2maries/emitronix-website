import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { approvalServices } from "@/data/approvals";
import { CTA } from "@/components/CTA";

type Props = {
  service: {
    title: string;
    menuLabel: string;
    slug: string;
    href: string;
    description: string;
    metaDescription: string;
  };
};

export function ApprovalServicePage({ service }: Props) {
  const relatedServices = approvalServices.filter(
    (item) => item.slug !== service.slug
  );

  return (
    <main className="pt-24">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="container mx-auto px-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Approval Service
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {service.title} in Dubai
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {service.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-red-700"
            >
              Request Approval Support
            </Link>

            <Link
              href="/approval"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 transition hover:border-red-600 hover:text-red-600"
            >
              View All Approvals
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-950">
              Complete {service.title} Coordination
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Emitronix Contracting LLC supports clients with document
              preparation, authority submission coordination, technical follow-up
              and approval tracking for projects across Dubai and the UAE.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Authority submission support",
                "Technical document coordination",
                "Consultant and client coordination",
                "Fast follow-up and status tracking",
                "Dubai project compliance support",
                "Professional approval assistance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <CheckCircle className="mt-1 h-5 w-5 text-red-600" />
                  <span className="text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              Other Approvals
            </h3>

            <div className="mt-5 space-y-3">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-bold text-slate-800 shadow-sm transition hover:text-red-600"
                >
                  {item.title}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CTA />
    </main>
  );
}