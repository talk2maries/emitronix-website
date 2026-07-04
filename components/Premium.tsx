import { ArrowRight, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Cta = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function PremiumLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "primary";
}) {
  const className =
    variant === "light"
      ? "premium-button-light"
      : variant === "primary"
        ? "premium-button"
        : "premium-button-light";

  return (
    <Link href={href} className={className}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function PremiumSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-5xl`}>
      <p className="premium-kicker">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-3xl text-base leading-8 text-steel sm:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  metrics = [],
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  metrics?: Metric[];
  dark?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden ${dark ? "blue-grid text-charcoal" : "premium-grid bg-white text-charcoal"}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-28 h-px w-2/3 bg-gradient-to-r from-transparent via-brand/[0.35] to-transparent" />
        <div className="absolute bottom-20 right-0 h-px w-1/2 bg-gradient-to-r from-transparent via-brand/[0.15] to-transparent" />
        <div className="absolute right-[14%] top-0 h-full w-px bg-gradient-to-b from-transparent via-brand/10 to-transparent" />
      </div>
      <div className="container-pad relative grid min-h-[680px] gap-10 pt-28 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pt-32">
        <div className="z-10 max-w-4xl pb-10">
          <p className="premium-kicker">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-5xl font-black leading-[0.96] tracking-tight text-charcoal sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-steel sm:text-xl sm:leading-9">
            {description}
          </p>
          {(primaryCta || secondaryCta) ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? <PremiumLink href={primaryCta.href} variant="primary">{primaryCta.label}</PremiumLink> : null}
              {secondaryCta ? <PremiumLink href={secondaryCta.href} variant="light">{secondaryCta.label}</PremiumLink> : null}
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2.25rem] border border-brand/[0.15] bg-white shadow-luxe lg:min-h-[560px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/20 to-transparent" />
          <div className="route-line bottom-28 left-[-18%] w-[72%]" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/60 bg-white/75 p-5 shadow-panel backdrop-blur-2xl">
            <p className="premium-kicker">Dubai delivery intelligence</p>
            <p className="mt-2 text-2xl font-black tracking-tight text-charcoal">Civil, approvals and fit-out aligned before site execution.</p>
          </div>
        </div>
      </div>

      {metrics.length > 0 ? (
        <div className="container-pad relative -mt-8 pb-12">
          <MetricRibbon metrics={metrics} />
        </div>
      ) : null}
    </section>
  );
}

export function CommandCenter({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ label: string; value: string; description: string }>;
}) {
  return (
    <section className="blue-grid section-pad overflow-hidden text-charcoal">
      <div className="container-pad grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <PremiumSectionHeading eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="relative rounded-[2rem] border border-brand/[0.15] bg-white/[0.82] p-4 shadow-luxe backdrop-blur-2xl">
          <div className="absolute left-6 right-6 top-6 h-px bg-gradient-to-r from-brand/[0.45] via-brand-border to-transparent" />
          <div className="grid gap-3 pt-8">
            {items.map((item, index) => (
              <article key={item.label} className="grid gap-4 rounded-[1.4rem] border border-brand/10 bg-white/90 p-5 shadow-sm md:grid-cols-[auto_0.65fr_1fr] md:items-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-black text-white shadow-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">{item.label}</p>
                  <h3 className="mt-1 text-2xl font-black tracking-tight text-charcoal">{item.value}</h3>
                </div>
                <p className="text-sm font-medium leading-7 text-steel">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MetricRibbon({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="luxury-surface grid overflow-hidden rounded-[1.75rem] sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className={`flex min-h-32 items-center gap-4 p-6 ${index > 0 ? "border-t border-brand/10 sm:border-l sm:border-t-0" : ""}`}>
            {Icon ? (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand/[0.15] bg-brand-soft text-brand shadow-sm">
                <Icon className="h-6 w-6" />
              </span>
            ) : null}
            <span>
              <span className="block text-3xl font-black tracking-tight text-brand">{metric.value}</span>
              <span className="mt-1 block text-sm font-bold leading-5 text-charcoal">{metric.label}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <article key={feature.title} className="luxury-card rounded-[1.5rem] p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-black tracking-tight text-charcoal">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-steel">{feature.description}</p>
          </article>
        );
      })}
    </div>
  );
}

export function ImagePanel({
  src,
  alt,
  label,
  title,
}: {
  src: string;
  alt: string;
  label: string;
  title: string;
}) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-brand/[0.15] bg-smoke shadow-luxe">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/70 bg-white/[0.82] p-5 text-charcoal shadow-panel backdrop-blur-2xl">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-brand">{label}</p>
        <h3 className="mt-3 text-3xl font-black tracking-tight">{title}</h3>
      </div>
    </div>
  );
}
