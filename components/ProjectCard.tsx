import Image from "next/image";
import type { Project } from "@/data/site";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-brand/10 bg-white shadow-panel transition duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-luxe">
      <div className={compact ? "relative aspect-[16/10] overflow-hidden" : "relative aspect-[16/12] overflow-hidden"}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          title={project.imageTitle}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
        <div className="absolute bottom-5 left-5 rounded-full border border-white/70 bg-white/[0.86] px-4 py-2 text-xs font-black uppercase tracking-wide text-brand shadow-sm backdrop-blur-xl">
          {project.location}
        </div>
      </div>
      <div className={compact ? "p-5 text-center" : "p-6"}>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">{project.category}</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-charcoal">{project.title}</h3>
        {!compact ? <p className="mt-3 text-sm leading-7 text-steel">{project.summary}</p> : null}
      </div>
    </article>
  );
}
