import { ArrowRight, FileCheck2, Layers3, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { MetricRibbon, type Metric } from "@/components/Premium";
import {
  IllustrativeImageDisclosure,
  ResponsiveIllustrativeImage,
} from "@/components/ResponsiveIllustrativeImage";
import { getGeneratedImage } from "@/data/generatedImages";
import { site, whatsappUrl } from "@/data/site";

export function HomeSignatureHero({ metrics }: { metrics: Metric[] }) {
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
          <p className="absolute right-4 top-4 z-20 max-w-[calc(100%-2rem)] rounded-full border border-white/60 bg-white/80 px-3 py-1.5 text-[0.6rem] font-black uppercase leading-3 tracking-[0.16em] text-charcoal shadow-sm backdrop-blur-md sm:right-8 sm:py-2 sm:text-[0.65rem] sm:leading-4 lg:top-24">
            <IllustrativeImageDisclosure asset={heroImage} />
          </p>
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
        <MetricRibbon metrics={metrics} />
      </div>
    </section>
  );
}
