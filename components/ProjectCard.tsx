import Image from "next/image";
import type { Project } from "@/data/site";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-panel">
      <div className={compact ? "relative h-36 overflow-hidden" : "relative h-56 overflow-hidden"}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          title={project.imageTitle}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className={compact ? "p-4 text-center" : "p-6"}>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-royal">{project.category}</p>
        <h3 className="mt-2 text-lg font-black text-navy">{project.title}</h3>
        {!compact ? <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p> : null}
      </div>
    </article>
  );
}
