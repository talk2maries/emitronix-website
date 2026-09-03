/* eslint-disable @next/next/no-html-link-for-pages -- Recovery links must perform a full navigation even when client routing has failed. */
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ErrorPageShell } from "@/components/ErrorPageShell";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Emitronix",
  },
  description: "The requested Emitronix page could not be found. Continue to the home page, services or contact page.",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <ErrorPageShell
      code="404"
      eyebrow="Page not found"
      title="This project route is not available."
      description="The address may be incomplete, outdated or no longer available. Continue to Emitronix services or return to the home page."
      actions={
        <>
          <a href="/" className="premium-button">
            Back to Home <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="/services" className="premium-button-light">
            View Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="/contact" className="premium-button-light">
            Contact Emitronix <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </>
      }
    />
  );
}
