import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { absoluteUrl, authorities, heroBadges, homeFaqs, projects, services, stats, whyChoose } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image
            src="/images/dubai-building-contracting-company.webp"
            alt="Building Contractor Dubai skyline construction project by Emitronix"
            title="Building Contractor Dubai - Emitronix construction company"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="container-pad relative grid min-h-[620px] content-center py-16 lg:py-20">
          <div className="max-w-[22rem] sm:max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-navy">
              Built on <span className="text-royal">Trust.</span>
            </p>
            <h1 className="mt-3 text-balance text-4xl font-black leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
              DELIVERED WITH EXCELLENCE.
            </h1>
            <p className="mt-6 max-w-[21rem] text-base leading-7 text-slate-700 sm:max-w-xl sm:text-lg sm:leading-8">
              Civil construction, villa, warehouse, interior fit-out and authority approval solutions across Dubai & UAE.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-royal px-7 py-4 text-sm font-bold text-white shadow-blue transition hover:bg-navy focus-ring"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-sm border border-royal px-7 py-4 text-sm font-bold text-royal transition hover:bg-blue-50 focus-ring"
              >
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="container-pad relative -mt-16 pb-8">
          <div className="grid overflow-hidden rounded-md bg-navy/88 shadow-panel backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
            {heroBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="flex items-center gap-3 border-white/10 p-5 text-white lg:border-r">
                  <Icon className="h-9 w-9 shrink-0 text-sky" strokeWidth={1.7} />
                  <div>
                    <p className="text-base font-black">{badge.title}</p>
                    <p className="mt-1 text-xs font-semibold text-white/72">{badge.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative overflow-hidden rounded-md">
            <Image
              src="/images/building-contractor-dubai-construction-site.webp"
              alt="Construction Company Dubai engineers supervising building contracting works"
              title="Construction Company Dubai - Emitronix building contracting team"
              width={900}
              height={620}
              className="h-auto w-full"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 rounded-sm bg-royal p-5 text-white shadow-blue">
              <p className="text-4xl font-black">15+</p>
              <p className="mt-1 text-sm font-semibold">Years of Excellence</p>
              <p className="text-xs text-white/75">Since 2009</p>
            </div>
            <button className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy shadow-panel">
              <PlayCircle className="h-7 w-7 text-royal" /> Watch Our Video
            </button>
          </div>
          <div>
            <SectionHeading
              eyebrow="About Emitronix"
              title="Building Dubai with Engineering Excellence Since 2009"
              description="Emitronix Contracting LLC delivers civil construction, building contracting, warehouse projects, interior fit-out and authority approval support across Dubai and UAE. Our commitment to quality, safety and innovation makes us a trusted partner for private and commercial projects."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label}>
                    <Icon className="h-7 w-7 text-royal" />
                    <p className="mt-2 text-2xl font-black text-navy">{stat.value}</p>
                    <p className="text-xs font-semibold text-slate-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-sm bg-royal px-6 py-3 text-sm font-bold text-white shadow-blue hover:bg-navy">
              More About Us <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad navy-grid">
        <div className="container-pad">
          <SectionHeading eyebrow="Our Core Services" title="Civil construction solutions under one roof." align="center" light />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading eyebrow="Why Choose Emitronix" title="Engineering Quality. Building Trust." align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border-slate-200 text-center lg:border-r lg:last:border-r-0">
                  <Icon className="mx-auto h-10 w-10 text-royal" strokeWidth={1.6} />
                  <p className="mx-auto mt-3 max-w-[150px] text-sm font-black leading-5 text-navy">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container-pad">
          <SectionHeading eyebrow="Projects Showcase" title="Delivering Excellence Across Dubai" align="center" />
          <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} compact />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-sm bg-royal px-8 py-4 text-sm font-bold text-white shadow-blue hover:bg-navy">
              View More Projects <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy py-12 text-white">
        <div className="container-pad grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">Authority Approval Expertise</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">One Team. Multiple Authorities. Faster Approvals.</h2>
            <p className="mt-4 text-sm leading-6 text-white/72">
              We manage technical submissions, inspections, NOCs and coordination with Dubai authorities to keep your project moving faster.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {authorities.map((authority) => {
              const Icon = authority.icon;
              return (
                <div key={authority.name} className="rounded-md bg-white p-5 text-navy shadow-panel">
                  <Icon className="h-8 w-8 text-royal" />
                  <h3 className="mt-3 text-lg font-black">{authority.name}</h3>
                  <p className="mt-2 text-sm leading-5 text-slate-600">{authority.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading eyebrow="FAQ" title="Dubai construction questions, answered." align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {homeFaqs.map((faq) => (
              <article key={faq.question} className="rounded-md border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-black text-navy">{faq.question}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
            ],
          }),
        }}
      />
    </>
  );
}
