import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="premium-grid bg-white">
      <div className="container-pad grid min-h-[72vh] content-center py-24">
        <div className="max-w-4xl">
          <p className="premium-kicker">404</p>
          <h1 className="mt-5 text-balance text-5xl font-black leading-[0.98] tracking-tight text-charcoal sm:text-7xl">
            This project route is not available.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
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
