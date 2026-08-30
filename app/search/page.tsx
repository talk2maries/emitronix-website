import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { approvalServices } from "@/data/approvals";
import { indexableBlogPosts } from "@/data/blog";
import { createPageMetadata } from "@/data/seo";
import { navItems, services } from "@/data/site";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

type SearchResult = {
  title: string;
  href: string;
  description: string;
  category: string;
  keywords: string[];
};

const staticPages: SearchResult[] = [
  {
    title: "Authority Approvals Dubai",
    href: "/approval",
    description: "Dubai authority approval coordination for construction, fit-out and handover workflows.",
    category: "Approval",
    keywords: ["authority approvals", "Dubai approvals", "DEWA", "DCD", "Dubai Municipality"],
  },
  {
    title: "Contact Emitronix",
    href: "/contact",
    description: "Request a project assessment, site visit, callback or quotation from Emitronix Contracting LLC.",
    category: "Contact",
    keywords: ["contact", "quote", "site visit", "Dubai contractor"],
  },
  {
    title: "Founder — Marieswaran Sadaiappan",
    href: "/founder",
    description: "Founder and Managing Director profile with published professional focus areas and verification boundaries.",
    category: "Company",
    keywords: ["founder", "managing director", "leadership", "Marieswaran Sadaiappan"],
  },
  {
    title: "Leadership and Delivery Functions",
    href: "/leadership",
    description: "Role-based construction, engineering, QA/QC, HSE, procurement and project delivery functions.",
    category: "Company",
    keywords: ["leadership", "engineering team", "QA QC", "HSE", "project management"],
  },
  {
    title: "Frequently Asked Questions",
    href: "/faqs",
    description: "Concise answers about services, locations, project enquiries, review and website information.",
    category: "Knowledge",
    keywords: ["FAQ", "questions", "services", "technical review"],
  },
  {
    title: "Construction Services in Dubai",
    href: "/locations/dubai",
    description: "Verified location facts and practical context for Dubai project enquiries.",
    category: "Location",
    keywords: ["Dubai", "location", "service area", "DIP 02"],
  },
  ...navItems.map((item) => ({
    title: item.label,
    href: item.href,
    description: `${item.label} page for Emitronix Contracting LLC in Dubai.`,
    category: "Page",
    keywords: [item.label, "Emitronix", "Dubai"],
  })),
];

const searchIndex: SearchResult[] = [
  ...staticPages,
  ...services.map((service) => ({
    title: service.title,
    href: service.href,
    description: service.description,
    category: "Service",
    keywords: service.keywords,
  })),
  ...approvalServices.map((service) => ({
    title: service.menuLabel,
    href: service.href,
    description: service.metaDescription,
    category: "Approval",
    keywords: service.keywords,
  })),
  ...indexableBlogPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    description: post.excerpt,
    category: "Article",
    keywords: post.targetKeywords,
  })),
];

export const metadata: Metadata = createPageMetadata({
  title: "Search Emitronix Dubai Construction and Approval Services",
  description:
    "Search Emitronix Contracting LLC services, Dubai authority approval pages, construction resources and project articles.",
  path: "/search",
  keywords: ["Emitronix search", "Dubai construction search", "Dubai approval services search"],
  arabicPath: null,
});

metadata.robots = { index: false, follow: true };

function scoreResult(result: SearchResult, terms: string[]) {
  const haystack = [
    result.title,
    result.description,
    result.category,
    ...result.keywords,
  ].join(" ").toLowerCase();

  return terms.reduce((score, term) => {
    if (!term) return score;
    const titleMatch = result.title.toLowerCase().includes(term) ? 4 : 0;
    const keywordMatch = result.keywords.join(" ").toLowerCase().includes(term) ? 3 : 0;
    const bodyMatch = haystack.includes(term) ? 1 : 0;
    return score + titleMatch + keywordMatch + bodyMatch;
  }, 0);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? searchIndex
        .map((result) => ({ result, score: scoreResult(result, terms) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
        .slice(0, 24)
        .map((item) => item.result)
    : searchIndex
        .filter((result) => result.category === "Approval" || result.title.includes("DEWA"))
        .slice(0, 12);

  return (
    <section className="section-pad bg-white">
      <div className="container-pad">
        <div className="mx-auto max-w-4xl text-center">
          <p className="premium-kicker">Site search</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-charcoal sm:text-5xl">
            Search Emitronix services and approval resources.
          </h1>
          <p className="mt-5 text-base leading-8 text-steel sm:text-lg">
            Find Dubai construction services, DEWA approval pages, authority coordination resources and project guidance.
          </p>
          <form action="/search" className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-brand/[0.14] bg-brand-soft p-3 shadow-panel sm:flex-row">
            <label htmlFor="site-search" className="sr-only">Search query</label>
            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search DEWA approval, warehouse construction, DCD approval..."
              className="focus-ring min-h-14 flex-1 rounded-2xl border border-brand/[0.14] bg-white px-4 text-charcoal outline-none"
            />
            <button type="submit" className="premium-button min-h-14">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
            </button>
          </form>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-black text-charcoal">
            {query ? `Results for "${query}"` : "Recommended approval resources"}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((result) => (
              <Link key={`${result.category}-${result.href}`} href={result.href} className="luxury-card rounded-[1.5rem] p-6">
                <span className="premium-kicker">{result.category}</span>
                <h3 className="mt-4 text-xl font-black leading-snug text-charcoal">{result.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{result.description}</p>
              </Link>
            ))}
          </div>
          {results.length === 0 ? (
            <div className="mt-6 rounded-[1.5rem] border border-brand/[0.14] bg-brand-soft p-6 text-center">
              <p className="text-sm font-bold leading-7 text-charcoal">
                No matching pages were found. Try searching for DEWA approval, authority approvals, warehouse construction, civil contracting or Dubai fit-out.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
