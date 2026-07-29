import { ArrowRight, ArrowUpRight, FileCheck2, Layers3, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { ResponsiveIllustrativeImage } from "@/components/ResponsiveIllustrativeImage";
import { getGeneratedImage } from "@/data/generatedImages";
import { heroBadges, site, whatsappUrl } from "@/data/site";

function HomeCapabilityRibbon() {
  return (
    <nav
      aria-labelledby="home-capabilities-title"
      className="relative overflow-hidden rounded-[1.5rem] border border-brand/[0.14] bg-white/[0.94] shadow-[0_24px_72px_rgba(11,31,58,0.17)] backdrop-blur-2xl sm:rounded-[2rem]"
    >
      <div className="absolute inset-x-0 top-0 z-30 h-1 bg-gradient-to-r from-brand-deep via-brand-bright to-brand-sky" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-4 overflow-hidden bg-[linear-gradient(112deg,#0B1F3A_0%,#123A73_58%,#194991_100%)] px-5 py-4 text-white sm:px-6 sm:py-5">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-brand-sky/20 blur-3xl" aria-hidden="true" />

        <div className="relative flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-sky shadow-[0_0_18px_rgba(84,214,255,0.9)]" />
          </span>
          <span>
            <h2 id="home-capabilities-title" className="text-[0.7rem] font-black uppercase tracking-[0.22em] text-white sm:text-xs">
              Integrated capabilities
            </h2>
            <span className="mt-1 hidden text-[0.67rem] font-bold uppercase tracking-[0.13em] text-white/55 sm:block">
              Construction · fit-out · approvals
            </span>
          </span>
        </div>

        <Link
          href="/services"
          className="group/header relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[0.66rem] font-black uppercase tracking-[0.13em] text-white shadow-sm backdrop-blur-xl transition duration-300 hover:border-white hover:bg-white hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep sm:px-4"
        >
          <span className="hidden sm:inline">Explore all services</span>
          <span className="sm:hidden">Services</span>
          <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover/header:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <ul className="relative grid grid-cols-1 gap-2 bg-[linear-gradient(135deg,rgba(234,245,255,0.82),rgba(248,251,255,0.96))] p-2 min-[380px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
        {heroBadges.map((capability, index) => {
          const Icon = capability.icon;

          return (
            <li key={capability.title} className="overflow-hidden rounded-[1.15rem] border border-brand/[0.09] bg-white shadow-[0_8px_26px_rgba(15,40,82,0.06)]">
              <Link
                href={capability.href}
                className="group relative flex h-full min-h-[146px] flex-col justify-between overflow-hidden rounded-[1.1rem] bg-white/[0.98] p-4 transition duration-500 motion-safe:hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_20px_46px_rgba(11,31,58,0.20)] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[158px] sm:p-5"
              >
                <span
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(84,214,255,0.22),transparent_44%)] opacity-0 transition duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-bright to-brand-sky transition duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <span className="relative flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-[0.9rem] border border-brand/[0.14] bg-brand-soft text-brand shadow-sm transition duration-500 group-hover:-translate-y-0.5 group-hover:border-white/25 group-hover:bg-white/10 group-hover:text-brand-sky group-hover:shadow-[0_16px_36px_rgba(30,167,255,0.18)] sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-brand/[0.08] bg-brand-soft/60 px-2 py-1 text-[0.58rem] font-black tracking-[0.16em] text-brand/40 transition duration-500 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-white/50" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <span className="relative mt-5 flex items-end justify-between gap-3">
                  <span>
                    <span className="block text-lg font-black leading-none tracking-tight text-brand-deep transition duration-500 group-hover:text-white sm:text-xl">
                      {capability.title}
                    </span>
                    <span className="mt-2 block text-xs font-extrabold uppercase leading-4 tracking-[0.08em] text-steel transition duration-500 group-hover:text-white/65">
                      {capability.label}
                    </span>
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand/[0.10] bg-brand-soft/70 text-brand/45 transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-brand-sky">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function HomeSignatureHero() {
  const heroImage = getGeneratedImage("home.dubai-construction-company-hero");

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 h-[760px] w-full lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[78%]">
          <ResponsiveIllustrativeImage
            asset={heroImage}
            priority
            quality={65}
            sizes="(min-width: 1024px) 78vw, 100vw"
            className="absolute inset-0 block h-full w-full"
            imageClassName="h-full w-full object-cover object-center"
            imageStyle={{ height: "100%", objectFit: "cover" }}
          />
          <div className="absolute inset-0 architectural-light" />
        </div>
        <div className="premium-grid absolute inset-0 opacity-40 lg:opacity-30" />
        <div className="route-line left-[7%] top-[70%] hidden w-[44%] lg:block" />
        <div className="absolute right-[21%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-brand/[0.24] to-transparent lg:block" />
      </div>

      <div className="container-pad relative grid min-h-[760px] items-center pt-24 lg:min-h-[820px] lg:pt-28">
        <div className="max-w-5xl pb-24 lg:pb-32">
          <p className="premium-kicker">Building contractor in Dubai</p>
          <h1 className="mt-6 text-balance text-6xl font-black leading-[0.91] tracking-tight text-charcoal sm:text-7xl lg:text-8xl xl:text-[7.8rem]">
            Excellence in <span className="text-brand">Every Structure</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite sm:text-xl sm:leading-9">
            Emitronix Contracting LLC delivers civil construction, building contracting, warehouse construction, villa construction, commercial fit-out and Dubai authority approval support with executive-level project clarity.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className="premium-button">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
              WhatsApp Us <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              { label: "Call now", icon: PhoneCall, href: `tel:${site.phone.replace(/\s/g, "")}` },
              { label: "Authority visibility", icon: FileCheck2 },
              { label: "Civil + fit-out control", icon: Layers3 },
            ].map((item) => {
              const Icon = item.icon;
              const className = "flex items-center gap-3 rounded-full border border-brand/[0.15] bg-white/[0.82] px-4 py-3 text-xs font-black uppercase tracking-wide text-charcoal shadow-sm backdrop-blur-xl transition hover:border-brand/30 hover:bg-white hover:text-brand";
              return item.href ? (
                <a key={item.label} href={item.href} className={className}>
                  <Icon className="h-4 w-4 text-brand" />
                  {item.label}
                </a>
              ) : (
                <div key={item.label} className={className}>
                  <Icon className="h-4 w-4 text-brand" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-pad relative -mt-24 pb-12">
        <HomeCapabilityRibbon />
      </div>
    </section>
  );
}
