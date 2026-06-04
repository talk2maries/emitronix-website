import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl, contactItems } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Emitronix Contracting LLC in Dubai for civil contracting, MEP works, LV switchgear, authority approvals and interior fit-out enquiries.",
  keywords: ["contact Emitronix Dubai", "Dubai contracting quote", "MEP contractor contact", "DEWA approval contractor Dubai"],
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad py-16 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Contact</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">
            Get a free consultation for your Dubai project.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Share your civil, MEP, switchgear, fit-out or authority approval requirements. Our team will guide the next step.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Dubai, UAE"
              title="Talk to Emitronix."
              description="Reach out for tender invitations, site assessments, authority approval coordination or design-and-build support."
            />
            <div className="mt-8 grid gap-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} className="flex gap-4 rounded-md border border-slate-200 bg-slate-50 p-5 transition hover:border-royal">
                    <Icon className="mt-1 h-5 w-5 text-royal" />
                    <span>
                      <span className="block text-sm font-black text-navy">{item.label}</span>
                      <span className="mt-1 block text-sm text-slate-600">{item.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
