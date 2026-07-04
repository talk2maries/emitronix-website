import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/site";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-brand/10 bg-white shadow-panel transition duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-luxe">
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          title={service.imageTitle}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.65] via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/70 bg-white/[0.92] text-brand shadow-panel backdrop-blur-xl">
          <Icon size={25} strokeWidth={1.8} />
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand">Emitronix Service</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-steel">{service.description}</p>
        <Link href={service.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand transition hover:text-charcoal">
          Explore Scope <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
