import { BlogKnowledgeHub } from "@/components/BlogKnowledgeHub";
import {
  blogCategories,
  blogPostUrl,
  indexableBlogPosts,
  toBlogPostSummary,
} from "@/data/blog";
import { getGeneratedImage } from "@/data/generatedImages";
import { absoluteUrl, site } from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

export const generateMetadata = createMetadataResolver({
  title: "Dubai Construction Blog & Knowledge Center",
  description:
    "Practical Dubai construction guides on civil contracting, warehouse construction, authority approvals, fit-out, DEWA, DCD, Trakhees and project management.",
  path: "/blog",
  keywords: [
    "Dubai construction blog",
    "civil contractor Dubai guide",
    "warehouse construction Dubai",
    "Dubai authority approvals",
    "building contractor Dubai",
  ],
  image: getGeneratedImage("blog.civil-construction-dubai-guide-2026").og!.src,
  imageAlt: getGeneratedImage("blog.civil-construction-dubai-guide-2026").alt,
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Emitronix Dubai Construction Blog",
  itemListElement: indexableBlogPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: blogPostUrl(post),
    name: post.title,
  })),
};

const visibleBlogCategories = blogCategories.filter((category) =>
  indexableBlogPosts.some(
    (post) => post.category === category || post.categories.includes(category),
  ),
);

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dubai Construction Blog & Knowledge Center",
  url: absoluteUrl("/blog"),
  description:
    "Construction knowledge center for Dubai civil contracting, authority approvals, warehouse construction and building contractor selection.",
  publisher: {
    "@id": absoluteUrl("/#organization"),
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
  const postSummaries = indexableBlogPosts.map(toBlogPostSummary);

  return (
    <>
      <BlogKnowledgeHub posts={postSummaries} categories={visibleBlogCategories} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
