import type { Metadata } from "next";
import { absoluteUrl, services, site } from "@/data/site";

export const trustContentLastReviewedIso = "2026-07-24";
export const trustContentLastReviewedLabel = "24 July 2026";
export const managementVerificationNotice = "Management verification required before publication.";

export type TrustLink = {
  label: string;
  href: string;
  description: string;
};

export type TrustSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type TrustPageContent = {
  path: string;
  eyebrow: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  principles: Array<{
    title: string;
    description: string;
  }>;
  sections: TrustSection[];
  relatedLinks: TrustLink[];
};

const sharedPolicyLinks: TrustLink[] = [
  {
    label: "Editorial policy",
    href: "/editorial-policy",
    description: "How website information is planned, sourced, written, reviewed and maintained.",
  },
  {
    label: "Technical review policy",
    href: "/technical-review-policy",
    description: "When technical subject matter needs an additional engineering or construction review.",
  },
  {
    label: "Corrections policy",
    href: "/corrections-policy",
    description: "How to report an error and how material corrections are handled.",
  },
  {
    label: "Website disclaimer",
    href: "/disclaimer",
    description: "The limits of general website information and the need for project-specific advice.",
  },
];

export const editorialPolicy: TrustPageContent = {
  path: "/editorial-policy",
  eyebrow: "Trust centre",
  title: "Editorial policy",
  summary:
    "This policy explains the publication process Emitronix uses for service information, practical guides, FAQs and other educational website content.",
  metaTitle: "Editorial Policy | Emitronix",
  metaDescription:
    "Read the Emitronix editorial process for sourcing, writing, reviewing, updating and correcting construction and engineering website content.",
  principles: [
    {
      title: "Useful before promotional",
      description: "Content should answer a real project question in clear language before it presents a service option.",
    },
    {
      title: "Evidence has boundaries",
      description: "Business facts, project claims and technical statements must be supported, qualified or withheld.",
    },
    {
      title: "A named process",
      description: "Important pages should show their publication or review context instead of implying anonymous authority.",
    },
  ],
  sections: [
    {
      title: "What this policy covers",
      paragraphs: [
        "The policy applies to public service pages, location information, FAQs, construction guides, authority-process explainers and other educational material published on this website.",
        "Commercial page goals do not remove the obligation to keep factual statements clear, useful and proportionate.",
      ],
    },
    {
      title: "Editorial workflow",
      bullets: [
        "Define the user question, intended audience and practical decision the page should support.",
        "Separate verified company information from general industry explanation and project-specific assumptions.",
        "Draft in plain language, define technical terms and explain where requirements can vary.",
        "Check business facts against the verified website business record.",
        "Request technical review when a page contains safety-sensitive, regulatory, engineering or construction-method guidance.",
        "Complete a final editorial check for clarity, links, dates, accessibility and unsupported claims before publication.",
      ],
    },
    {
      title: "Sources and factual boundaries",
      paragraphs: [
        "Company contact details, service areas, hours and core service descriptions are maintained in the verified website business record.",
        "Technical or authority-related explanations should rely on suitable primary material where available, such as current authority publications, applicable standards, consultant-issued project documents or manufacturer technical literature. A general website summary must not be presented as a substitute for the controlling source.",
      ],
      bullets: [
        "Do not invent projects, clients, testimonials, approvals, awards, licences, certifications or performance statistics.",
        "Label examples and indicative workflows as examples; do not present them as completed Emitronix work.",
        "State when an authority, consultant, landlord, master developer or project-specific document must confirm the final requirement.",
      ],
    },
    {
      title: "Authorship, review and AI assistance",
      paragraphs: [
        "A page should identify its responsible editorial owner and, where a formal technical review has occurred, the reviewer role and review date. A role label is not a professional credential and must not imply one.",
        "Digital or AI-assisted tools may support research organization, drafting or quality checks. They do not replace source checking, editorial judgment or appropriate technical review. A human remains responsible for the publication decision.",
      ],
    },
    {
      title: "Updates and commercial independence",
      paragraphs: [
        "Content should be reviewed when a relevant process changes, a material error is reported, a linked source changes, or the page no longer answers its intended question accurately.",
        "Pages may link to Emitronix services or contact options. Those links must not change the standard applied to factual statements, limitations or corrections.",
      ],
    },
  ],
  relatedLinks: [
    sharedPolicyLinks[1],
    sharedPolicyLinks[2],
    {
      label: "Frequently asked questions",
      href: "/faqs",
      description: "Concise answers about services, enquiries, content review and website information.",
    },
  ],
};

export const technicalReviewPolicy: TrustPageContent = {
  path: "/technical-review-policy",
  eyebrow: "Trust centre",
  title: "Technical review policy",
  summary:
    "Technical review adds a subject-matter check when website content could influence engineering, construction, safety or authority-coordination decisions.",
  metaTitle: "Technical Review Policy | Emitronix",
  metaDescription:
    "See how Emitronix distinguishes editorial review from technical review and project-specific professional engineering advice.",
  principles: [
    {
      title: "Risk-based review",
      description: "The depth of review should match the technical, regulatory and safety consequences of the topic.",
    },
    {
      title: "Roles stay distinct",
      description: "Editorial review improves communication; technical review checks subject matter; neither replaces a project appointment.",
    },
    {
      title: "Limitations stay visible",
      description: "Review does not turn general website material into drawings, calculations, approvals or site instructions.",
    },
  ],
  sections: [
    {
      title: "When technical review is expected",
      bullets: [
        "The page explains engineering principles, construction sequencing, installation methods or material selection.",
        "The content discusses health and safety, fire and life safety, utilities, structural work or inspection readiness.",
        "The content summarizes authority, landlord or master-developer processes that can change by jurisdiction or project.",
        "A reader could reasonably mistake general guidance for a project instruction without an explicit limitation.",
      ],
    },
    {
      title: "What a technical reviewer checks",
      bullets: [
        "Whether the stated scope, terminology and sequence are technically coherent.",
        "Whether important assumptions, interfaces and project variables are visible.",
        "Whether claims about standards or authority processes need a current primary source.",
        "Whether the content could encourage unsafe work, premature procurement or action without required approvals.",
        "Whether a consultant, authority, specialist contractor or manufacturer must make the project-specific determination.",
      ],
    },
    {
      title: "Editorial review is not technical approval",
      paragraphs: [
        "Editorial review checks structure, clarity, sourcing, consistency and readability. Technical review considers the subject matter within the stated scope of the page.",
        "Neither review is a signed design, engineering calculation, method statement, risk assessment, permit, no-objection certificate, inspection approval or instruction for a particular site.",
      ],
    },
    {
      title: "Reviewer identification",
      paragraphs: [
        "A formal technical-review label should be published only after the review has occurred. The label should state the reviewer role, review date and scope of the review without inventing qualifications or authority.",
        `Named reviewers, professional credentials and registration identifiers are published only after verification. ${managementVerificationNotice}`,
      ],
    },
    {
      title: "Project-specific professional advice",
      paragraphs: [
        "Readers must use the appointed and appropriately qualified project professionals for design, calculations, code interpretation, authority submissions, safety planning and site instructions.",
        "Where an authority, consultant, contract document or approved drawing differs from this website, the project-specific controlling information takes precedence.",
      ],
    },
  ],
  relatedLinks: [
    sharedPolicyLinks[0],
    sharedPolicyLinks[3],
    {
      label: "Construction resources",
      href: "/resources",
      description: "Browse practical construction and approval information with project-specific limitations in mind.",
    },
  ],
};

export const correctionsPolicy: TrustPageContent = {
  path: "/corrections-policy",
  eyebrow: "Trust centre",
  title: "Corrections policy",
  summary:
    "Emitronix welcomes specific, evidence-based reports about inaccurate, unclear, outdated or misleading website content.",
  metaTitle: "Corrections Policy | Emitronix",
  metaDescription:
    "Learn how to report website errors to Emitronix and how factual, technical and material content corrections are reviewed.",
  principles: [
    {
      title: "Easy to report",
      description: `Send the page URL, disputed wording and supporting context to ${site.email}.`,
    },
    {
      title: "Impact guides priority",
      description: "Safety-sensitive, materially misleading and business-identity errors receive the closest attention.",
    },
    {
      title: "Material changes are visible",
      description: "A meaningful correction should not be disguised as an ordinary wording refresh.",
    },
  ],
  sections: [
    {
      title: "What can be reported",
      bullets: [
        "Incorrect company contact, location, hours or service information.",
        "Outdated or incomplete authority-process explanations.",
        "Technical wording that is inaccurate, unsafe, ambiguous or missing an important limitation.",
        "Broken citations, inaccessible supporting material or a quotation that lacks context.",
        "Content that could be mistaken for a verified project, licence, approval, client relationship or professional credential.",
      ],
    },
    {
      title: "How to submit a correction",
      paragraphs: [
        `Email ${site.email} or use the contact page. Include the page URL, the exact statement, why it may be wrong, and any primary source or project context that supports the report.`,
        "Do not send confidential project records, personal data, access credentials or restricted drawings through an ordinary correction request.",
      ],
    },
    {
      title: "Review and response process",
      bullets: [
        "Record the report and identify whether it is editorial, technical, business-information or legal in nature.",
        "Check the current page, its source basis and any evidence supplied by the reporter.",
        "Escalate technical or safety-sensitive questions for an appropriate subject-matter review.",
        "Correct, clarify, qualify, remove or retain the content based on the available evidence.",
        "Contact the reporter when more context is needed or when a useful outcome can be shared.",
      ],
    },
    {
      title: "Types of change",
      paragraphs: [
        "Minor edits include spelling, formatting and wording changes that do not alter the meaning. Clarifications make an existing limitation or context easier to understand.",
        "A material correction changes a factual or technical statement that could affect a reader’s understanding or decision. Where practical, the page should identify the material change and its review date.",
      ],
    },
    {
      title: "Limits of the process",
      paragraphs: [
        "Submitting a report does not guarantee that the requested wording will be adopted. The available sources, the page’s purpose and the need for qualified project-specific advice all form part of the decision.",
        "The website correction channel is not an emergency reporting system and must not replace project safety, contractual, consultant or authority communication.",
      ],
    },
  ],
  relatedLinks: [
    sharedPolicyLinks[0],
    sharedPolicyLinks[1],
    {
      label: "Contact Emitronix",
      href: "/contact",
      description: "Share a correction with the page URL and supporting context.",
    },
  ],
};

export const disclaimerPolicy: TrustPageContent = {
  path: "/disclaimer",
  eyebrow: "Trust centre",
  title: "Website disclaimer",
  summary:
    "The website provides general information about Emitronix services and construction topics. It does not provide project-specific professional, legal or safety advice.",
  metaTitle: "Website Disclaimer | Emitronix",
  metaDescription:
    "Understand the limits of general construction, engineering, authority and project information published on the Emitronix website.",
  principles: [
    {
      title: "General information",
      description: "Website explanations support early understanding and enquiry preparation; they are not issued-for-construction documents.",
    },
    {
      title: "Projects differ",
      description: "Site conditions, contracts, designs, jurisdictions, authorities and stakeholder requirements can change the correct approach.",
    },
    {
      title: "Controlling sources prevail",
      description: "Approved drawings, contracts, authority decisions and appointed professionals take precedence over general web content.",
    },
  ],
  sections: [
    {
      title: "No project-specific professional advice",
      paragraphs: [
        "Nothing on this website is a substitute for advice, design or review by the appropriately qualified and appointed professionals for a specific project.",
        "Website content must not be treated as an engineering calculation, design certification, method statement, risk assessment, permit, approval, no-objection certificate, contractual instruction or authorization to begin work.",
      ],
    },
    {
      title: "Authority and regulatory information",
      paragraphs: [
        "Authority, utility, landlord and master-developer requirements can change and can differ by location, building, use, scope and submission history.",
        "Confirm the current requirement with the relevant authority and appointed consultant before design, procurement, construction or submission decisions are made.",
      ],
    },
    {
      title: "Costs, programmes and examples",
      paragraphs: [
        "Indicative durations, cost factors, workflows and checklists explain common considerations only. They are not quotations, guarantees, completion commitments or predictions for a particular project.",
        "Any binding scope, price, programme, responsibility or deliverable must be recorded in the applicable project documents.",
      ],
    },
    {
      title: "Third-party material and links",
      paragraphs: [
        "A link to an authority, supplier, standard, platform or other external source is provided for context and does not transfer control of that source to Emitronix.",
        "Readers should check the publisher, date, jurisdiction and current version before relying on third-party material.",
      ],
    },
    {
      title: "Website availability and enquiries",
      paragraphs: [
        "The website may be updated, corrected or temporarily unavailable. An online enquiry is not an accepted project appointment or contractual instruction.",
        `For a project conversation, contact ${site.legalName} using ${site.email} or ${site.phone}.`,
      ],
    },
  ],
  relatedLinks: [
    sharedPolicyLinks[0],
    sharedPolicyLinks[1],
    sharedPolicyLinks[2],
  ],
};

export const accessibilityPolicy: TrustPageContent = {
  path: "/accessibility",
  eyebrow: "Trust centre",
  title: "Accessibility statement",
  summary:
    "Emitronix aims to make its website understandable and usable across devices, input methods and assistive technologies, while treating accessibility as continuing work.",
  metaTitle: "Accessibility Statement | Emitronix",
  metaDescription:
    "Read the Emitronix website accessibility approach, current design commitments, feedback process and ongoing improvement priorities.",
  principles: [
    {
      title: "Clear structure",
      description: "Pages should use meaningful headings, descriptive links and a logical reading order.",
    },
    {
      title: "Multiple ways to engage",
      description: "Visitors can use website forms or the verified phone and email contact details.",
    },
    {
      title: "Continuous improvement",
      description: "Accessibility issues should be tested, prioritized and corrected as the website evolves.",
    },
  ],
  sections: [
    {
      title: "Our accessibility approach",
      paragraphs: [
        "The website is designed to support keyboard use, readable text, visible focus, semantic page structure, descriptive controls and layouts that adapt to smaller screens.",
        "We do not use this statement to claim certified conformance. Accessibility depends on the page, device, browser, assistive technology and the continued quality of new content.",
      ],
    },
    {
      title: "Content and interaction commitments",
      bullets: [
        "Use one clear page heading and an ordered heading structure.",
        "Provide meaningful text alternatives for informative images and avoid embedding essential meaning only in an image.",
        "Keep links and buttons descriptive, keyboard reachable and visibly focused.",
        "Associate form controls with instructions, labels and understandable error feedback.",
        "Maintain readable contrast, scalable text and responsive layouts.",
        "Provide captions, transcripts or equivalent information when media contains essential spoken content.",
      ],
    },
    {
      title: "Testing and maintenance",
      paragraphs: [
        "Accessibility checks should form part of significant page, component and form changes. Automated checks help identify common problems, but keyboard and human review are also needed.",
        "Known issues should be prioritized according to whether they block access to essential service information, contact details, navigation or forms.",
      ],
    },
    {
      title: "Request an accessible alternative",
      paragraphs: [
        `If content or a website function is difficult to use, email ${site.email} or call ${site.phone}. Include the page address, the task you were trying to complete and the format or assistance that would help.`,
        `The published business hours are ${site.hours}.`,
      ],
    },
    {
      title: "Feedback is part of improvement",
      paragraphs: [
        "Specific accessibility feedback is reviewed as a product-quality issue. Where an immediate technical correction is not possible, Emitronix can consider a reasonable alternative way to provide the public information involved.",
      ],
    },
  ],
  relatedLinks: [
    {
      label: "Contact Emitronix",
      href: "/contact",
      description: "Request help accessing public website information.",
    },
    sharedPolicyLinks[2],
    {
      label: "HTML sitemap",
      href: "/html-sitemap",
      description: "Use a simple list of public website sections as an alternative navigation path.",
    },
  ],
};

export const trustPolicyPages = {
  editorial: editorialPolicy,
  technicalReview: technicalReviewPolicy,
  corrections: correctionsPolicy,
  disclaimer: disclaimerPolicy,
  accessibility: accessibilityPolicy,
} as const;

export const publicFaqs = [
  {
    question: "What does Emitronix do?",
    answer: site.description,
    links: [
      { label: "Explore services", href: "/services" },
      { label: "About Emitronix", href: "/about" },
    ],
  },
  {
    question: "Where is Emitronix located?",
    answer: `${site.legalName} publishes ${site.location} as its verified website location.`,
    links: [{ label: "Dubai location guide", href: "/locations/dubai" }],
  },
  {
    question: "Which areas does Emitronix serve?",
    answer: `The verified website service areas are ${site.serviceArea.join(", ")}. Whether a particular project is suitable depends on its scope, location, documents and delivery requirements.`,
    links: [{ label: "Service areas", href: "/locations" }],
  },
  {
    question: "How can I contact Emitronix?",
    answer: `Call ${site.phone}, email ${site.email}, or use the website contact form. Published business hours are ${site.hours}.`,
    links: [{ label: "Contact page", href: "/contact" }],
  },
  {
    question: "What should I include in a project enquiry?",
    answer:
      "Include the project location, asset type, intended use, required scope, available drawings, current authority or landlord status, preferred programme and any known site constraints. Do not send passwords or unnecessary personal data.",
    links: [{ label: "Prepare an enquiry", href: "/contact" }],
  },
  {
    question: "Does Emitronix support authority coordination?",
    answer:
      "Authority approval support is included among the verified core services. The authority, submission route and responsibilities must be confirmed for the specific location, asset and scope.",
    links: [{ label: "Approval support", href: "/approval" }],
  },
  {
    question: "Is website content professional engineering or legal advice?",
    answer:
      "No. Website content is general information and does not replace project-specific advice, approved drawings, calculations, permits, contracts or instructions from appointed professionals and relevant authorities.",
    links: [{ label: "Read the disclaimer", href: "/disclaimer" }],
  },
  {
    question: "How is technical website content reviewed?",
    answer:
      "Editorial review checks clarity, consistency and source boundaries. Higher-risk engineering, construction, safety or authority content calls for an additional subject-matter review. Neither process replaces a project appointment.",
    links: [{ label: "Technical review policy", href: "/technical-review-policy" }],
  },
  {
    question: "How can I report an error?",
    answer: `Send the page URL, disputed wording and supporting context to ${site.email}, or use the contact page.`,
    links: [{ label: "Corrections policy", href: "/corrections-policy" }],
  },
  {
    question: "Are website timelines and cost factors quotations?",
    answer:
      "No. General timelines, checklists and cost factors are indicative explanations. A project-specific scope, price, programme and responsibility matrix must be confirmed through the applicable project documents.",
    links: [{ label: "Website disclaimer", href: "/disclaimer" }],
  },
  {
    question: "Where can I find registration identifiers, an office map or a Google Business Profile link?",
    answer: managementVerificationNotice,
    links: [{ label: "Location transparency", href: "/locations/dubai" }],
  },
] as const;

const selectedDubaiServiceHrefs = new Set([
  "/civil",
  "/main-contracting",
  "/warehouse-construction",
  "/commercial-buildings",
  "/interior",
  "/building-renovation",
  "/project-management",
]);

export const dubaiServiceLinks = services
  .filter((service) => selectedDubaiServiceHrefs.has(service.href))
  .map((service) => ({
    label: service.title,
    href: service.href,
    description: service.description,
  }));

export const locationVerificationItems = [
  {
    label: "Published business location",
    value: site.location,
    verified: true,
  },
  {
    label: "Company registration or licence identifiers",
    value: managementVerificationNotice,
    verified: false,
  },
  {
    label: "Office unit, building access instructions and map coordinates",
    value: managementVerificationNotice,
    verified: false,
  },
  {
    label: "Google Business Profile URL or verification status",
    value: managementVerificationNotice,
    verified: false,
  },
] as const;

type MetadataInput = {
  path: string;
  title: string;
  description: string;
};

export function createTrustMetadata({ path, title, description }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl("/images/generated/social/emitronix-construction-dubai-og.webp");

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "en-AE": url,
        "x-default": url,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Illustrative AI-generated Dubai construction image accompanying an Emitronix company-information page; not project evidence",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageJsonLdInput = {
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  pageType?: "WebPage" | "CollectionPage" | "FAQPage";
  faqs?: ReadonlyArray<{ question: string; answer: string }>;
};

export function createTrustPageJsonLd({
  path,
  name,
  description,
  breadcrumbs,
  pageType = "WebPage",
  faqs,
}: PageJsonLdInput) {
  const url = absoluteUrl(path);
  const pageNode = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-AE",
    dateModified: trustContentLastReviewedIso,
    ...(pageType === "FAQPage" && faqs
      ? {
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      pageNode,
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      },
    ],
  };
}
