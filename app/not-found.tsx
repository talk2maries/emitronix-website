import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-slate-50">
      <div className="container-pad grid min-h-[58vh] content-center py-20">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-royal">404</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-navy sm:text-6xl">
          Page not found.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          The page may have moved, or the project route may no longer be available.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit rounded-sm bg-royal px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy focus-ring"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
