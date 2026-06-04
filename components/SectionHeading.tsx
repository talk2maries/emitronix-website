type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, description, align = "left", light = false }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`text-xs font-black uppercase tracking-[0.22em] ${light ? "text-sky" : "text-royal"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-3xl font-black tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {description ? <p className={`mt-4 text-base leading-7 ${light ? "text-white/72" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}
