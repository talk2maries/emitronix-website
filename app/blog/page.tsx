import type { Metadata } from "next";
import { BlogKnowledgeHub } from "@/components/BlogKnowledgeHub";
import { blogCategories, blogPostUrl, blogPosts } from "@/data/blog";
import { absoluteUrl, site } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dubai Construction Blog & Knowledge Center",
  description:
    "Premium Dubai construction blog with guides on civil contracting, warehouse construction, authority approvals, fit-out, DEWA, DCD, Trakhees and project management.",
  path: "/blog",
  keywords: [
    "Dubai construction blog",
    "civil contractor Dubai guide",
    "warehouse construction Dubai",
    "Dubai authority approvals",
    "building contractor Dubai",
  ],
  image: "/images/dubai-civil-works-construction-site.webp",
  imageAlt: "Dubai construction knowledge center by Emitronix Contracting LLC",
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Emitronix Dubai Construction Blog",
  itemListElement: blogPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: blogPostUrl(post),
    name: post.title,
  })),
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dubai Construction Blog & Knowledge Center",
  url: absoluteUrl("/blog"),
  description:
    "Construction knowledge center for Dubai civil contracting, authority approvals, warehouse construction and building contractor selection.",
  publisher: {
    "@id": absoluteUrl("/#localbusiness"),
    name: site.legalName,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
  ],
};

export default function BlogPage() {
  return (
    <>
      <BlogKnowledgeHub posts={blogPosts} categories={blogCategories} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
