import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl, projects, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Emitronix project capabilities across civil infrastructure, warehouses, villas, interior fit-out and authority approvals in Dubai.",
  keywords: ["Dubai construction projects", "civil contractor Dubai", "warehouse contractor UAE", "villa construction Dubai"],
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-slate-50">
        <div className="container-pad py-16 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">Projects Showcase</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-black tracking-tight text-navy sm:text-6xl">
            Delivering excellence across Dubai.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Representative project categories across civil infrastructure, building construction, interior fit-out and authority approval coordination.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="navy-grid section-pad">
        <div className="container-pad">
          <SectionHeading eyebrow="Project Types" title="Integrated scopes supported by one team." align="center" light />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={service.href} className="rounded-md bg-white p-5 text-center text-navy shadow-panel transition hover:-translate-y-1">
                  <Icon className="mx-auto h-9 w-9 text-royal" />
                  <h2 className="mt-4 text-lg font-black">{service.title}</h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
