import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-white">
      <Image
        src="/images/dubai-civil-works-construction-site.webp"
        alt="Dubai construction route not found background"
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(11,31,58,0.94)_0%,rgba(18,58,115,0.74)_58%,rgba(25,73,145,0.34)_100%)]" />
      <div className="absolute inset-0 z-20 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="container-pad relative z-30 grid min-h-[78vh] content-center py-28">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-brand-sky">404</p>
          <h1 className="mt-5 text-balance text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-7xl">
            This project route is not available.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/[0.84]">
            The page may have moved. Continue to the premium Dubai construction, approval and fit-out pathways below.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="premium-button">
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="premium-button-light">
              View Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
