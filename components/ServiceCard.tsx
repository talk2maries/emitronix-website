import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/site";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="group overflow-hidden rounded-md border border-slate-200 bg-white shadow-panel transition duration-300 hover:-translate-y-1 hover:shadow-blue">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} visual`}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute -bottom-6 left-5 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-royal text-white shadow-blue">
          <Icon size={25} strokeWidth={1.8} />
        </div>
      </div>
      <div className="pt-10 p-5">
        <h3 className="text-lg font-black text-navy">{service.title}</h3>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{service.description}</p>
        <Link href={service.href} className="mt-4 inline-flex text-sm font-bold text-royal transition hover:text-navy">
          Learn More
        </Link>
      </div>
    </article>
  );
}
