import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Home,
  Landmark,
  Layers3,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, homeFaqs, site } from "@/data/site";

type ImageAsset = {
  src: string;
  alt: string;
  title: string;
};

type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ServiceItem = IconItem & {
  href: string;
  image: ImageAsset;
  keywords: string;
};

type Insight = {
  title: string;
  description: string;
  href: string;
  label: string;
};

const images = {
  hero: {
    src: "/images/emitronix-2026-hero-dubai.png",
    alt: "Cinematic Dubai skyline and futuristic construction for Emitronix Contracting LLC",
    title: "Construction Company Dubai - Emitronix futuristic skyline and construction",
  },
  warehouse: {
    src: "/images/emitronix-2026-warehouse-industrial.png",
    alt: "Modern warehouse construction Dubai with engineers and steel industrial building",
    title: "Warehouse Construction Dubai - industrial building contractor",
  },
  villa: {
    src: "/images/emitronix-2026-villa-luxury.png",
    alt: "Luxury villa construction Dubai with premium residential architecture",
    title: "Villa Construction Dubai - premium residential contractor",
  },
  highrise: {
    src: "/images/emitronix-2026-highrise-bim.png",
    alt: "Main contractor Dubai high-rise civil construction with BIM coordination",
    title: "Main Contractor Dubai - civil construction and BIM coordination",
  },
  fitout: {
    src: "/images/emitronix-2026-fitout-interior.png",
    alt: "Luxury interior fit-out Dubai for commercial buildings and renovation works",
    title: "Interior Fit-Out Dubai - commercial renovation and fit-out works",
  },
  coverage: {
    src: "/images/emitronix-2026-dubai-coverage.png",
    alt: "Dubai coverage map concept for turnkey construction and design build planning",
    title: "Dubai Coverage Map - turnkey construction and design build planning",
  },
} satisfies Record<string, ImageAsset>;

export const metadata: Metadata = {
  title: "Construction Company Dubai | Main Contractor & Building Contractor | Emitronix",
  description:
    "Emitronix Contracting LLC is a premium construction company in Dubai for main contractor services, civil construction, warehouses, villas, commercial buildings, industrial buildings, fit-out works and authority-ready project delivery.",
  keywords: [
    "Construction Company Dubai",
    "Building Contractor Dubai",
    "Civil Contractor Dubai",
    "Warehouse Construction Dubai",
    "Warehouse Builder UAE",
    "Villa Construction Dubai",
    "Industrial Building Contractor",
    "Commercial Construction Company",
    "Main Contractor Dubai",
    "Turnkey Construction Dubai",
    "Design and Build Dubai",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Construction Company Dubai | Emitronix Contracting LLC",
    description:
      "Premium Dubai main contractor for civil construction, warehouses, villas, commercial buildings, industrial buildings, fit-out works and authority-ready delivery.",
    url: site.url,
    images: [
      {
        url: absoluteUrl(images.hero.src),
        width: 1672,
        height: 941,
        alt: images.hero.alt,
      },
    ],
  },
};

const heroCapabilities = [
  "Main Contractor",
  "Civil Construction",
  "Industrial Buildings",
  "Warehouses",
  "Villas",
  "Commercial Buildings",
  "Shopping Malls",
  "High-rise Buildings",
  "Government Project Readiness",
];

const trustedSegments = [
  "Property owners",
  "Commercial tenants",
  "Consultants",
  "Developers",
  "Industrial operators",
  "Retail and fit-out teams",
];

const companyStats = [
  { value: "Dubai + UAE", label: "Service coverage", detail: "Local delivery focus with UAE project readiness." },
  { value: "G+4", label: "Building contractor capability", detail: "Civil construction scope for Dubai building projects." },
  { value: "9", label: "Premium service lines", detail: "From structural works to project management." },
  { value: "DM / DCD", label: "Approval coordination", detail: "Authority-aware planning for Dubai projects." },
];

const premiumServices: ServiceItem[] = [
  {
    title: "Building Construction",
    description:
      "Main contractor Dubai support for civil construction, commercial construction company requirements, high-rise buildings and authority-ready execution.",
    href: "/civil",
    icon: Building2,
    image: images.highrise,
    keywords: "Construction Company Dubai / Building Contractor Dubai",
  },
  {
    title: "Warehouse Construction",
    description:
      "Warehouse construction Dubai and warehouse builder UAE services for logistics, storage, industrial operations and free-zone facilities.",
    href: "/projects",
    icon: Warehouse,
    image: images.warehouse,
    keywords: "Warehouse Construction Dubai / Warehouse Builder UAE",
  },
  {
    title: "Villa Construction",
    description:
      "Villa construction Dubai services for luxury residences, extensions, structural modifications, finishing and coordinated handover planning.",
    href: "/civil",
    icon: Home,
    image: images.villa,
    keywords: "Villa Construction Dubai",
  },
  {
    title: "Commercial Buildings",
    description:
      "Commercial building contractor support for offices, showrooms, retail shells, shopping mall spaces and business-ready interior interfaces.",
    href: "/projects",
    icon: Landmark,
    image: images.highrise,
    keywords: "Commercial Construction Company",
  },
  {
    title: "Industrial Buildings",
    description:
      "Industrial building contractor capability for steel structures, warehouses, civil works, utilities interfaces and authority coordination.",
    href: "/projects",
    icon: Factory,
    image: images.warehouse,
    keywords: "Industrial Building Contractor",
  },
  {
    title: "Renovation",
    description:
      "Renovation works for villas, commercial units, offices and operational spaces where civil, MEP and approval constraints must align.",
    href: "/interior",
    icon: Wrench,
    image: images.fitout,
    keywords: "Turnkey Construction Dubai",
  },
  {
    title: "Fit-Out Works",
    description:
      "Premium fit-out works and interior delivery for retail, offices, villas and hospitality spaces with clean finishing and practical execution control.",
    href: "/interior",
    icon: Sparkles,
    image: images.fitout,
    keywords: "Design and Build Dubai",
  },
  {
    title: "Structural Works",
    description:
      "Civil contractor Dubai support for structural modifications, concrete works, steel interfaces and site coordination for safe execution.",
    href: "/civil",
    icon: Layers3,
    image: images.highrise,
    keywords: "Civil Contractor Dubai",
  },
  {
    title: "Project Management",
    description:
      "Turnkey construction Dubai coordination across drawings, procurement, approvals, site execution, inspections, documentation and handover.",
    href: "/contact",
    icon: ClipboardCheck,
    image: images.coverage,
    keywords: "Main Contractor Dubai / Turnkey Construction Dubai",
  },
];

const whyChoose: IconItem[] = [
  {
    title: "Authority-aware from day one",
    description:
      "Dubai Municipality, DCD, DEWA and developer requirements are considered early, so the project route is designed around approvals, inspections and handover.",
    icon: FileCheck2,
  },
  {
    title: "Main contractor coordination",
    description:
      "Emitronix organizes civil, structural, fit-out and service interfaces into one execution rhythm for owners, consultants and commercial teams.",
    icon: Target,
  },
  {
    title: "Premium site discipline",
    description:
      "The visual standard is luxury, but the delivery foundation is practical: clean scope, competent supervision, quality checkpoints and structured close-out.",
    icon: ShieldCheck,
  },
  {
    title: "Designed for Dubai speed",
    description:
      "Projects in Dubai demand clear decisions, document readiness and rapid coordination. The process is built to reduce ambiguity before it reaches the site.",
    icon: Timer,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "Project location, drawings, intended use, authority exposure and commercial constraints are reviewed before the execution plan is shaped.",
  },
  {
    step: "02",
    title: "Engineer",
    description:
      "Civil, structural, fit-out and BIM-style coordination logic is aligned with Dubai approval pathways and buildability requirements.",
  },
  {
    step: "03",
    title: "Mobilize",
    description:
      "Procurement, site access, manpower planning, safety controls, authority milestones and stakeholder communication are organized into a practical schedule.",
  },
  {
    step: "04",
    title: "Build",
    description:
      "The site team executes civil works, structural works, warehouse construction, villa construction or fit-out scopes with quality checkpoints.",
  },
  {
    step: "05",
    title: "Handover",
    description:
      "Snag closure, documentation, inspection readiness and final project close-out are prepared for a cleaner client handover.",
  },
];

const industries: IconItem[] = [
  {
    title: "Luxury Villas",
    description: "Private villa construction Dubai, renovation and premium residential works for owners who expect refined delivery.",
    icon: Home,
  },
  {
    title: "Warehouses and Logistics",
    description: "Warehouse construction Dubai and industrial building delivery for storage, distribution and operational facilities.",
    icon: Warehouse,
  },
  {
    title: "Commercial Towers",
    description: "Building contractor Dubai services for offices, commercial buildings, showrooms and high-rise project interfaces.",
    icon: Building2,
  },
  {
    title: "Retail and Shopping Malls",
    description: "Fit-out works, renovation and commercial construction coordination for premium retail and mall environments.",
    icon: Landmark,
  },
  {
    title: "Industrial Facilities",
    description: "Industrial building contractor support for structural works, civil works, steel systems and handover documentation.",
    icon: Factory,
  },
  {
    title: "Government-Facing Projects",
    description: "Documentation and coordination readiness for authority-facing project environments without overstating unverified client claims.",
    icon: BadgeCheck,
  },
];

const coverageAreas = ["Dubai Investment Park", "Dubai South", "JAFZA", "Dubai", "UAE project enquiries"];

const testimonialReady = [
  {
    title: "For owners",
    quote:
      "A serious construction partner should make scope, approvals, cost drivers and handover responsibilities clear before work begins.",
  },
  {
    title: "For consultants",
    quote:
      "A reliable main contractor keeps drawings, authority stages, site constraints and stakeholder decisions moving in the same direction.",
  },
  {
    title: "For businesses",
    quote:
      "Commercial construction and fit-out projects need clean communication, practical schedules and authority-ready documentation.",
  },
];

const insights: Insight[] = [
  {
    label: "Planning Guide",
    title: "How to choose a construction company in Dubai",
    description:
      "What project owners should review before appointing a main contractor, civil contractor or design and build partner in Dubai.",
    href: "/resources",
  },
  {
    label: "Approvals",
    title: "Dubai Municipality and DCD approval readiness",
    description:
      "Why authority coordination should be planned before procurement, site execution and inspection milestones begin.",
    href: "/approval",
  },
  {
    label: "Industrial",
    title: "Warehouse construction Dubai: what affects delivery",
    description:
      "Site access, fire safety, utilities, steel structure coordination and handover documentation all affect warehouse project timelines.",
    href: "/projects",
  },
];

const expandedFaqs = [
  ...homeFaqs,
  {
    question: "Does Emitronix provide main contractor services in Dubai?",
    answer:
      "Emitronix Contracting LLC supports main contractor Dubai requirements across civil construction, building works, fit-out coordination, project management and authority-ready delivery planning.",
  },
  {
    question: "Can Emitronix handle warehouse construction in Dubai and UAE industrial projects?",
    answer:
      "Yes. Emitronix supports warehouse construction Dubai and warehouse builder UAE enquiries involving civil works, industrial building coordination, authority planning and handover documentation.",
  },
  {
    question: "Does Emitronix support turnkey construction and design and build projects?",
    answer:
      "Emitronix can coordinate turnkey construction Dubai and design and build Dubai scopes where civil, structural, interior, approval and project management requirements need one practical delivery pathway.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <p className="text-xs font-black uppercase tracking-[0.26em] text-[#D71920]">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
        <section className="relative min-h-screen overflow-hidden bg-white pt-24">
          <div className="absolute inset-0">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              title={images.hero.title}
              fill
              priority
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/35 to-transparent" />
          </div>

          <div className="container-pad relative grid min-h-[calc(100vh-6rem)] items-center py-14 lg:py-20">
            <div className="max-w-5xl">
              <div className="inline-flex premium-float items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#D71920] shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
                <Sparkles className="h-4 w-4" /> Dubai construction, engineered for 2026
              </div>
              <h1 className="mt-7 text-balance text-5xl font-black leading-[0.92] tracking-tight text-[#111111] sm:text-7xl lg:text-8xl">
                Engineering Dubai&apos;s Future.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
                Emitronix Contracting LLC is a premium Construction Company Dubai clients can approach for main contractor delivery, civil construction, industrial buildings, warehouses, villas, commercial buildings, shopping mall fit-outs, high-rise interfaces and government-facing project documentation.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D71920] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_20px_45px_rgba(215,25,32,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#b9141b] focus-ring"
                >
                  Get Free Consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/72 px-7 py-4 text-sm font-black uppercase tracking-wide text-[#111111] shadow-sm backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[#D71920] hover:text-[#D71920] focus-ring"
                >
                  View Projects
                </Link>
              </div>
              <div className="mt-10 flex max-w-4xl flex-wrap gap-2">
                {heroCapabilities.map((item) => (
                  <span key={item} className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur-xl">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-20 pb-20">
          <div className="container-pad">
            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl lg:p-8">
              <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D71920]">Trusted by Dubai businesses</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-[#111111] sm:text-3xl">Built for owners, consultants and commercial teams who expect clarity.</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {trustedSegments.map((segment) => (
                    <div key={segment} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-black text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D71920]/30 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]">
                      {segment}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-pad">
            <SectionHeader
              eyebrow="Company statistics"
              title="Numbers that describe capability, not inflated claims."
              description="Emitronix presents verifiable operational signals: where we work, what we coordinate and how we structure construction delivery for Dubai and UAE projects."
              center
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {companyStats.map((stat) => (
                <article key={stat.label} className="group rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                  <p className="text-4xl font-black tracking-tight text-[#D71920]">{stat.value}</p>
                  <h3 className="mt-4 text-lg font-black text-[#111111]">{stat.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 lg:py-24">
          <div className="container-pad">
            <SectionHeader
              eyebrow="Premium services"
              title="A complete construction platform for Dubai&apos;s most demanding project types."
              description="From Building Contractor Dubai scopes to turnkey construction Dubai coordination, Emitronix structures each service around authority readiness, buildability and a premium handover standard."
              center
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {premiumServices.map((service, index) => {
                const Icon = service.icon;
                const featured = index < 3;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className={`group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#D71920]/35 hover:shadow-[0_32px_90px_rgba(15,23,42,0.13)] ${featured ? "lg:min-h-[560px]" : ""}`}
                  >
                    <div className={featured ? "relative aspect-[16/12] overflow-hidden" : "relative aspect-[16/10] overflow-hidden"}>
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        title={service.image.title}
                        fill
                        quality={88}
                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/88 px-3 py-2 text-xs font-black uppercase tracking-wide text-[#D71920] backdrop-blur-xl">
                        {service.keywords}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#D71920] transition group-hover:bg-[#D71920] group-hover:text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <h3 className="mt-5 text-2xl font-black tracking-tight text-[#111111]">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#D71920]">
                        Explore <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why choose Emitronix"
                title="A main contractor experience designed around control, trust and speed."
                description="Dubai construction is unforgiving when scope, approvals and site execution drift apart. Emitronix is positioned for clients who want a disciplined Civil Contractor Dubai team with premium commercial communication."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whyChoose.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)]">
                      <Icon className="h-8 w-8 text-[#D71920]" strokeWidth={1.7} />
                      <h3 className="mt-4 text-lg font-black text-[#111111]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.15)] lg:aspect-[5/6]">
              <Image
                src={images.highrise.src}
                alt={images.highrise.alt}
                title={images.highrise.title}
                fill
                quality={90}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/40 bg-white/78 p-5 shadow-xl backdrop-blur-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D71920]">AI-inspired execution view</p>
                <p className="mt-2 text-xl font-black text-[#111111]">BIM-aware coordination for smarter build decisions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="container-pad">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="Featured projects"
                title="Premium project categories for Dubai&apos;s built environment."
                description="This showcase uses new generated visual direction for 2026 while representing the construction categories Emitronix supports: high-rise, warehouse, villa, commercial, fit-out and Dubai-wide planning."
              />
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-[#111111] shadow-sm transition hover:-translate-y-1 hover:border-[#D71920] hover:text-[#D71920] focus-ring">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "High-rise and Civil Construction", image: images.highrise, label: "Main Contractor Dubai" },
                { title: "Warehouse and Industrial Facilities", image: images.warehouse, label: "Warehouse Construction Dubai" },
                { title: "Luxury Villa Construction", image: images.villa, label: "Villa Construction Dubai" },
                { title: "Commercial Fit-Out and Renovation", image: images.fitout, label: "Design and Build Dubai" },
                { title: "Dubai Coverage and Project Planning", image: images.coverage, label: "Turnkey Construction Dubai" },
                { title: "Dubai Skyline Construction Vision", image: images.hero, label: "Construction Company Dubai" },
              ].map((project) => (
                <article key={project.title} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      title={project.image.title}
                      fill
                      quality={88}
                      sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#D71920]">{project.label}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-[#111111]">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">Premium construction, authority-ready coordination and Dubai-focused execution planning.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-pad">
            <SectionHeader
              eyebrow="Construction process"
              title="A smarter construction journey from first call to handover."
              description="The process is designed for clarity: understand the constraints, engineer the pathway, mobilize correctly, build with control and close out professionally."
              center
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-5">
              {processSteps.map((item) => (
                <article key={item.step} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D71920]/30 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                  <p className="text-5xl font-black leading-none text-rose-100">{item.step}</p>
                  <h3 className="mt-5 text-xl font-black text-[#111111]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 lg:py-24">
          <div className="container-pad">
            <SectionHeader
              eyebrow="Industries we serve"
              title="Built for Dubai&apos;s real estate, retail, logistics and industrial economy."
              description="Emitronix supports the project categories that drive Dubai growth, from luxury villas and commercial towers to warehouses, fit-out works and authority-facing environments."
              center
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                    <Icon className="h-9 w-9 text-[#D71920]" strokeWidth={1.7} />
                    <h3 className="mt-5 text-xl font-black text-[#111111]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-pad grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.12)]">
              <Image
                src={images.coverage.src}
                alt={images.coverage.alt}
                title={images.coverage.title}
                fill
                quality={90}
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeader
                eyebrow="Dubai coverage map"
                title="Local focus across Dubai and UAE project enquiries."
                description={`From ${site.location} to wider Dubai and UAE enquiries, Emitronix plans construction work around location, authority exposure, logistics and handover expectations.`}
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {coverageAreas.map((area) => (
                  <span key={area} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                    {area}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#D71920] focus-ring">
                Check project coverage <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="container-pad">
            <SectionHeader
              eyebrow="Testimonials"
              title="A client-voice section ready for verified reviews."
              description="To protect brand trust, this site does not invent customer names, ratings or testimonials. The cards below express the standards Dubai clients usually evaluate, and can be replaced with verified testimonials when approved."
              center
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonialReady.map((item) => (
                <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                  <MessageSquareQuote className="h-9 w-9 text-[#D71920]" strokeWidth={1.7} />
                  <h3 className="mt-5 text-lg font-black text-[#111111]">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">“{item.quote}”</p>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Verified testimonial slot</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container-pad">
            <SectionHeader
              eyebrow="FAQ"
              title="Construction Company Dubai questions, answered with clarity."
              description="Useful answers for owners comparing a building contractor Dubai, civil contractor Dubai, warehouse builder UAE or design and build Dubai partner."
              center
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {expandedFaqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                  <h2 className="text-lg font-black text-[#111111]">{faq.question}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 lg:py-24">
          <div className="container-pad">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="Latest insights"
                title="Dubai construction thinking for smarter project starts."
                description="SEO-led resource pathways for users researching construction company Dubai services, authority approvals, warehouse construction and turnkey delivery."
              />
              <Link href="/resources" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-[#111111] shadow-sm transition hover:-translate-y-1 hover:border-[#D71920] hover:text-[#D71920] focus-ring">
                Visit Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {insights.map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] focus-ring">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D71920]">{item.label}</p>
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-[#111111]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#D71920]">
                    Read insight <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 lg:pb-24">
          <div className="container-pad">
            <div className="relative isolate overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[#111111] px-6 py-12 text-white shadow-[0_30px_100px_rgba(15,23,42,0.20)] sm:px-10 lg:px-14 lg:py-16">
              <Image
                src={images.hero.src}
                alt="Premium Dubai construction call to action background"
                fill
                quality={82}
                sizes="100vw"
                className="-z-10 object-cover opacity-30"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111] via-[#111111]/88 to-[#D71920]/70" />
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-4xl">
                  <p className="text-xs font-black uppercase tracking-[0.26em] text-white/70">Strong call to action</p>
                  <h2 className="mt-4 text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Ready to build in Dubai with a premium main contractor?</h2>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                    Share your project location, drawings, scope and authority status. Emitronix will help clarify the practical next step for civil construction, warehouse construction, villa construction, fit-out works or turnkey construction Dubai coordination.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-[#D71920] shadow-lg transition hover:-translate-y-1 hover:bg-slate-100 focus-ring">
                    Get Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-white/10 focus-ring">
                    Call {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: expandedFaqs.map((faq) => ({
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
            "@type": "WebPage",
            name: "Construction Company Dubai | Emitronix Contracting LLC",
            url: absoluteUrl("/"),
            description:
              "Premium homepage for Emitronix Contracting LLC, a Dubai construction company for main contractor services, civil construction, warehouses, villas, commercial buildings, industrial buildings, fit-out works and turnkey construction coordination.",
            primaryImageOfPage: absoluteUrl(images.hero.src),
            about: premiumServices.map((service) => ({
              "@type": "Service",
              name: service.title,
              description: service.description,
              areaServed: "Dubai, United Arab Emirates",
              provider: {
                "@id": absoluteUrl("/#localbusiness"),
              },
            })),
            provider: {
              "@id": absoluteUrl("/#localbusiness"),
              name: site.legalName,
            },
          }),
        }}
      />
    </>
  );
}
