import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileCheck2,
  GalleryHorizontalEnd,
  GitCommitVertical,
  HardHat,
  MapPin,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { FAQSection } from "@/components/ContentBlocks";
import { PremiumSectionHeading } from "@/components/Premium";
import { ProjectTestimonials, ProjectsPortfolio } from "@/components/ProjectsPortfolio";
import {
  beforeAfterProjects,
  featuredProject,
  portfolioProjects,
  projectFaqs,
  projectGallery,
  projectStats,
  projectTimeline,
} from "@/data/projects";
import { absoluteUrl, site } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Projects | Dubai Construction Portfolio",
  description:
    "Explore Emitronix Dubai construction portfolio profiles for civil works, MEP coordination, renovation, maintenance, fit-out, authority approvals and warehouse upgrades.",
  path: "/projects",
  keywords: [
    "Dubai construction projects",
    "Dubai construction portfolio",
    "civil works Dubai",
    "MEP coordination Dubai",
    "renovation contractor Dubai",
    "warehouse upgrade Dubai",
    "authority approvals Dubai",
    "fit out contractor Dubai",
  ],
  image: "/images/project-warehouse-industrial-dubai.webp",
  imageAlt: "Premium Dubai construction portfolio with warehouse and industrial project profile by Emitronix",
});

const portfolioCapabilities = [
  {
    title: "Civil works and building contracting",
    description:
      "Site execution for villas, warehouses, commercial spaces and industrial assets, supported by drawings, sequencing, supervision and handover discipline.",
    icon: HardHat,
  },
  {
    title: "MEP and fit-out coordination",
    description:
      "Coordination across ceilings, services, finishes, landlord requirements and inspection readiness so interiors and building systems move together.",
    icon: Zap,
  },
  {
    title: "Authority approvals and NOCs",
    description:
      "Dubai Municipality, DCD, DEWA, landlord and master-developer touchpoints are considered early with consultant and documentation workflows.",
    icon: BadgeCheck,
  },
  {
    title: "Renovation and maintenance",
    description:
      "Practical renovation, repair and planned maintenance support for operating buildings that need clean execution and reliable communication.",
    icon: Wrench,
  },
];

const projectJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.location,
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: site.serviceArea.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      logo: absoluteUrl("/images/emitronix-logo-horizontal.svg"),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/projects#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: absoluteUrl("/projects"),
        },
      ],
    },
    ...portfolioProjects.map((project, index) => ({
      "@type": "Project",
      "@id": `${site.url}/projects#project-${index + 1}`,
      name: `Representative project profile: ${project.title}`,
      description: project.description,
      image: absoluteUrl(project.image),
      location: {
        "@type": "Place",
        name: project.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: project.location,
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
      },
      provider: {
        "@id": `${site.url}/#organization`,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Dubai, United Arab Emirates",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Category",
          value: project.category,
        },
        {
          "@type": "PropertyValue",
          name: "Status",
          value: project.status,
        },
        {
          "@type": "PropertyValue",
          name: "Scope of work",
          value: project.scope,
        },
      ],
    })),
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden bg-brand-dark text-white">
        <Image
          src="/images/project-warehouse-industrial-dubai.webp"
          alt="Premium Dubai warehouse and industrial construction portfolio hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,58,0.88)_0%,rgba(18,58,115,0.66)_44%,rgba(255,255,255,0.10)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.20)_0%,rgba(11,31,58,0.62)_100%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="container-pad relative flex min-h-[760px] items-end pb-12 pt-36 lg:pb-16">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-brand-sky">Projects / Portfolio</p>
            <h1 className="mt-6 text-balance text-5xl font-black leading-[0.96] tracking-tight sm:text-7xl lg:text-8xl">
              Our Projects
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-white/[0.86] sm:text-xl sm:leading-9">
              {site.legalName} supports Dubai and UAE project scopes across civil works, building contracting, renovation, MEP coordination, authority approvals, maintenance and interior fit-out works.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="premium-button">
                Request a Quotation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#portfolio-grid" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/15 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand focus-ring">
                Explore Portfolio <GalleryHorizontalEnd className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="container-pad relative -mt-16 pb-12">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/25 bg-white/85 shadow-luxe backdrop-blur-2xl sm:grid-cols-2 xl:grid-cols-4">
            {projectStats.map((stat, index) => (
              <article key={stat.label} className={`min-h-44 p-6 text-charcoal ${index > 0 ? "border-t border-brand/10 sm:border-l sm:border-t-0" : ""}`}>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">{stat.label}</p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-charcoal">{stat.value}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Dubai project experience"
            title="A premium portfolio built around site reality, authority visibility and handover control."
            description="Emitronix project work is structured for Dubai conditions: civil repairs, building contracting, warehouse upgrades, villa renovation, commercial fit-out, MEP coordination, authority approval support and maintenance planning. Each enquiry is reviewed by location, drawings, intended use, authority exposure, access constraints and handover requirements."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {portfolioCapabilities.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="luxury-card rounded-[1.5rem] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-2xl font-black tracking-tight text-charcoal">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-brand/[0.15] bg-white shadow-luxe">
            <Image
              src={featuredProject.image}
              alt={featuredProject.imageAlt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/12 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/40 bg-white/[0.82] p-5 text-charcoal shadow-panel backdrop-blur-2xl">
              <p className="premium-kicker">{featuredProject.category}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">{featuredProject.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-bold text-steel">
                <MapPin className="h-4 w-4 text-brand" />
                {featuredProject.location}
              </p>
            </div>
          </div>

          <div>
            <p className="premium-kicker">Featured project</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-tight text-charcoal sm:text-5xl">
              Warehouse delivery profile with civil, MEP and authority interfaces.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-steel">{featuredProject.description}</p>
            <div className="mt-8 grid gap-3">
              {featuredProject.details.map((detail) => (
                <div key={detail} className="flex gap-3 rounded-2xl border border-brand/[0.12] bg-white/85 p-4 shadow-sm backdrop-blur-xl">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-sm font-bold leading-6 text-charcoal">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Before and after"
            title="Transformation profiles for renovation, warehouse and fit-out works."
            description="These before-and-after profiles are representative planning views. They show how Emitronix frames existing site constraints and target handover outcomes without publishing unapproved client images."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {beforeAfterProjects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-[1.5rem] border border-brand/10 bg-white/85 shadow-panel backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-luxe">
                <div className="grid grid-cols-2">
                  {[
                    { label: project.beforeLabel, image: project.beforeImage },
                    { label: project.afterLabel, image: project.afterImage },
                  ].map((item) => (
                    <div key={item.label} className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={`${project.title} ${item.label}`}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 16vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
                      <span className="absolute bottom-3 left-3 right-3 rounded-full border border-white/35 bg-white/85 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-brand backdrop-blur-xl">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-brand">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </p>
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-charcoal">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-steel">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Project gallery"
            title="Modern masonry gallery for Dubai construction environments."
            description="A visual portfolio layer for civil works, warehouses, villas, commercial fit-out, MEP coordination and authority-facing scopes."
            align="center"
          />
          <div className="mt-12 columns-1 gap-6 md:columns-2 xl:columns-3">
            {projectGallery.map((item) => (
              <article key={item.title} className="group mb-6 break-inside-avoid overflow-hidden rounded-[1.5rem] border border-brand/10 bg-white shadow-panel transition duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-luxe">
                <div className={`relative ${item.heightClass} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.35rem] border border-white/35 bg-white/[0.82] p-4 text-charcoal shadow-sm backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">{item.location}</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">{item.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="portfolio-grid">
        <ProjectsPortfolio />
      </div>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <PremiumSectionHeading
            eyebrow="Project progress"
            title="A clear timeline from enquiry to handover."
            description="Dubai construction projects move better when site information, approvals, procurement, inspections and handover evidence are connected from the first conversation."
            align="center"
          />
          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand via-brand-border to-transparent lg:block" />
            <div className="grid gap-5">
              {projectTimeline.map((item) => (
                <article key={item.phase} className="luxury-card grid gap-5 rounded-[1.5rem] p-6 lg:grid-cols-[auto_0.7fr_1fr] lg:items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-sm font-black text-white shadow-blue">
                    {item.phase}
                  </span>
                  <div>
                    <p className="premium-kicker">Progress stage</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-charcoal">{item.title}</h3>
                  </div>
                  <p className="text-sm font-medium leading-7 text-steel">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectTestimonials />

      <section className="blue-grid py-8 text-charcoal">
        <div className="container-pad">
          <div className="grid gap-5 rounded-[2rem] border border-brand/[0.15] bg-white/[0.86] p-5 shadow-panel backdrop-blur-2xl lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-7">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-blue">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <div>
              <p className="premium-kicker">Verification note</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                Premium presentation without unapproved project claims.
              </h2>
              <p className="mt-2 text-sm leading-7 text-steel">
                Public case studies, client names, project photos, testimonials and numeric counts are published only after approval. This page uses professional representative profiles relevant to Dubai construction enquiries.
              </p>
            </div>
            <Link href="/contact" className="premium-button-light">
              Submit Project Details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="Project FAQ"
        title="Dubai construction projects FAQ."
        description="Answers for owners, consultants, landlords and facility teams comparing civil contractors, MEP coordination, renovation, maintenance and approval support in Dubai."
        faqs={projectFaqs}
        schema
      />

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/[0.15] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_50%,#eaf5ff_100%)] p-6 shadow-luxe sm:p-10 lg:p-14">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-bright to-brand-sky" />
            <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="premium-kicker">Project enquiry</p>
                <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-tight text-charcoal sm:text-5xl">
                  Have a project to discuss?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-steel">
                  Share your location, drawings, site photos, authority status and target timeline. Emitronix will review the right path for civil works, renovation, MEP coordination, maintenance, authority approvals or fit-out delivery.
                </p>
              </div>
              <div className="grid gap-4 rounded-[1.75rem] border border-brand/[0.12] bg-white/[0.82] p-5 shadow-panel backdrop-blur-xl sm:grid-cols-2">
                {[
                  { label: "Civil and structural scope", icon: Building2 },
                  { label: "MEP and fit-out interfaces", icon: Zap },
                  { label: "Authority and NOC exposure", icon: FileCheck2 },
                  { label: "Maintenance and handover needs", icon: GitCommitVertical },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-brand/[0.10] bg-white p-4">
                      <Icon className="h-5 w-5 shrink-0 text-brand" />
                      <span className="text-sm font-black leading-6 text-charcoal">{item.label}</span>
                    </div>
                  );
                })}
                <Link href="/contact" className="premium-button sm:col-span-2">
                  Request a Quotation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
    </>
  );
}
