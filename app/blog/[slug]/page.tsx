import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Linkedin, MessageCircle, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogEnquiryPopup } from "@/components/BlogEnquiryPopup";
import { blogAuthor, blogPostUrl, blogPosts, getBlogPost, getRelatedPosts } from "@/data/blog";
import { applySeoOverrides, resolveMetaTitle } from "@/data/seo";
import { absoluteUrl, services, site } from "@/data/site";
import { toArabicPath } from "@/lib/i18n";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AE", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function postHref(slug: string) {
  return `/blog/${slug}`;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = blogPostUrl(post);
  const title = resolveMetaTitle(post.seoTitle);
  const imageUrl = absoluteUrl(post.image);

  const base: Metadata = {
    title: {
      absolute: title,
    },
    description: post.metaDescription,
    keywords: post.targetKeywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ar: absoluteUrl(toArabicPath(`/blog/${post.slug}`)),
        "en-AE": url,
        "ar-AE": absoluteUrl(toArabicPath(`/blog/${post.slug}`)),
        "x-default": url,
      },
    },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      locale: "en_AE",
      url,
      siteName: site.name,
      title,
      description: post.metaDescription,
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      section: post.category,
      tags: post.categories,
      images: [
        {
          url: imageUrl,
          width: 1672,
          height: 941,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };

  return applySeoOverrides(base, `/blog/${post.slug}`);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const canonicalUrl = blogPostUrl(post);
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    author: blogAuthor,
    publisher: {
      "@id": absoluteUrl("/#localbusiness"),
      name: site.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/emitronix-logo-horizontal.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: post.category,
    keywords: post.targetKeywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const authorJsonLd = {
    "@context": "https://schema.org",
    ...blogAuthor,
  };

  return (
    <>
      <article className="bg-white">
        <header className="premium-grid pb-14 pt-10 lg:pb-20 lg:pt-14">
          <div className="container-pad">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-steel" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-brand">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="transition hover:text-brand">Blog</Link>
              <span aria-hidden="true">/</span>
              <span className="text-charcoal">{post.category}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="premium-kicker">{post.category}</p>
                <h1 className="mt-5 text-balance text-5xl font-black leading-[0.98] tracking-tight text-charcoal sm:text-7xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">{post.excerpt}</p>
                <div className="mt-7 flex flex-wrap gap-4 text-xs font-black uppercase tracking-wide text-steel">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand" />{formatDate(post.publishedDate)}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-brand" />{post.readTime}</span>
                  <span className="inline-flex items-center gap-2"><Tag className="h-4 w-4 text-brand" />{post.author}</span>
                </div>
              </div>
              <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-brand/[0.15] bg-brand-soft shadow-luxe lg:min-h-[520px]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  title={post.imageTitle}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="container-pad grid gap-10 py-14 lg:grid-cols-[280px_minmax(0,1fr)_280px] lg:py-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-18rem)] overflow-auto rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.9] p-5 shadow-panel backdrop-blur-xl">
              <p className="premium-kicker">Contents</p>
              <nav className="mt-5 grid gap-3" aria-label="Table of contents">
                {post.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="text-sm font-bold leading-6 text-steel transition hover:text-brand">
                    {section.title}
                  </a>
                ))}
                <a href="#faq" className="text-sm font-bold leading-6 text-steel transition hover:text-brand">FAQ</a>
              </nav>
            </div>
          </aside>

          <div className="min-w-0" data-blog-content>
            <div className="rounded-[1.5rem] border border-brand/[0.12] bg-white p-5 shadow-panel lg:hidden">
              <p className="premium-kicker">Table of contents</p>
              <div className="mt-4 grid gap-2">
                {post.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="text-sm font-bold text-steel transition hover:text-brand">
                    {section.title}
                  </a>
                ))}
                <a href="#faq" className="text-sm font-bold text-steel transition hover:text-brand">FAQ</a>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:mt-0">
              {post.intro.map((paragraph) => (
                <p key={paragraph} className="text-xl leading-9 text-charcoal">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span key={category} className="rounded-full border border-brand/[0.12] bg-brand-soft px-4 py-2 text-xs font-black uppercase tracking-wide text-brand">
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-12 grid gap-12">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-4xl font-black tracking-tight text-charcoal">{section.title}</h2>
                  <div className="mt-5 grid gap-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-steel">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="rounded-2xl border border-brand/[0.12] bg-pearl px-5 py-4 text-sm font-bold leading-7 text-charcoal">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <section className="mt-14 rounded-[1.75rem] border border-brand/[0.15] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-panel">
              <p className="premium-kicker">Useful links</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {post.internalLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="premium-button-light">
                    {item.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </section>

            <section id="faq" className="mt-14 scroll-mt-28">
              <p className="premium-kicker">FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-charcoal">Common questions</h2>
              <div className="mt-6 grid gap-4">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-[1.4rem] border border-brand/[0.12] bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-black tracking-tight text-charcoal">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-steel">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14 rounded-[2rem] border border-brand/[0.15] bg-[linear-gradient(135deg,#ffffff_0%,#eaf5ff_100%)] p-6 shadow-luxe lg:p-8">
              <p className="premium-kicker">Request Free Consultation</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-charcoal">
                Turn this guidance into a clear Dubai project route.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-steel">
                Share your location, drawings, authority status and intended scope. Emitronix can help identify the next practical step for civil, fit-out or approval coordination.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="premium-button">Contact Emitronix <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/resources" className="premium-button-light">More resources <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </section>

            <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="Previous and next articles">
              {previousPost ? (
                <Link href={postHref(previousPost.slug)} className="luxury-card rounded-[1.5rem] p-5">
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-brand"><ArrowLeft className="h-4 w-4" /> Previous</span>
                  <span className="mt-3 block text-xl font-black tracking-tight text-charcoal">{previousPost.title}</span>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={postHref(nextPost.slug)} className="luxury-card rounded-[1.5rem] p-5 text-left sm:text-right">
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-brand sm:justify-end">Next <ArrowRight className="h-4 w-4" /></span>
                  <span className="mt-3 block text-xl font-black tracking-tight text-charcoal">{nextPost.title}</span>
                </Link>
              ) : null}
            </nav>
          </div>

          <aside>
            <div className="sticky top-28 grid gap-5">
              <div className="rounded-[1.5rem] border border-brand/[0.12] bg-white p-5 shadow-panel">
                <p className="premium-kicker">Share</p>
                <div className="mt-5 grid gap-2">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="premium-button-light justify-start">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="premium-button-light justify-start">
                    <Share2 className="h-4 w-4" /> X / Twitter
                  </a>
                  <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="premium-button-light justify-start">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-brand/[0.12] bg-white p-5 shadow-panel">
                <p className="premium-kicker">Related articles</p>
                <div className="mt-5 grid gap-4">
                  {relatedPosts.map((item) => (
                    <Link key={item.slug} href={postHref(item.slug)} className="group">
                      <span className="text-xs font-black uppercase tracking-wide text-steel">{item.category}</span>
                      <span className="mt-1 block text-base font-black leading-6 text-charcoal transition group-hover:text-brand">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <BlogEnquiryPopup articleTitle={post.title} serviceOptions={services.map((service) => service.title)} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }} />
    </>
  );
}
