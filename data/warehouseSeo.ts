import type { BlogPost } from "@/data/blog";
import type { GeneratedImageKey } from "@/data/generatedImages";
import {
  warehouseBlogTopics,
  warehouseSiloTopics,
  type WarehouseSiloTopic,
} from "@/data/warehouseRoutes";

export type WarehouseAuthorityPage = {
  title: string;
  slug: string;
  href: string;
  keyword: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  imageKey: GeneratedImageKey;
  intro: string[];
  summaryFacts: string[];
  benefits: string[];
  processSteps: string[];
  requiredDocuments: string[];
  qualityControls: string[];
  serviceAreas: string[];
  authorityNotes: string[];
  related: Array<{ label: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  references: Array<{ title: string; href: string }>;
};

const reviewedDate = "2026-08-02";
const companyName = "Emitronix Contracting LLC";
const baseServiceAreas = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Umm Al Quwain",
  "Fujairah",
];

const references = [
  {
    title: "Dubai Municipality building services",
    href: "https://www.dm.gov.ae/municipality-business/",
  },
  {
    title: "Dubai Civil Defence services",
    href: "https://www.dcd.gov.ae/",
  },
  {
    title: "DEWA customer services",
    href: "https://www.dewa.gov.ae/",
  },
  {
    title: "UAE Government business permits",
    href: "https://u.ae/en/information-and-services/business/obtaining-certificates-and-licences/obtaining-certificates-and-permits",
  },
];

const pageImageKeys: GeneratedImageKey[] = [
  "services.warehouse-construction-dubai",
  "services.industrial-construction-dubai",
  "services.structural-works-dubai",
  "services.design-build-contractor-dubai",
  "services.project-management-dubai",
];

const blogImageKeys: GeneratedImageKey[] = [
  "blog.warehouse-construction-planning-guide",
  "blog.civil-construction-dubai-guide-2026",
  "blog.dubai-authority-approvals-guide",
  "blog.choosing-building-contractor-dubai",
];

const blogImagePaths = {
  "blog.warehouse-construction-planning-guide": "/images/generated/blog/warehouse-construction-planning-guide-desktop.webp",
  "blog.civil-construction-dubai-guide-2026": "/images/generated/blog/civil-construction-dubai-guide-2026-desktop.webp",
  "blog.dubai-authority-approvals-guide": "/images/generated/blog/dubai-authority-approvals-guide-desktop.webp",
  "blog.choosing-building-contractor-dubai": "/images/generated/blog/choosing-building-contractor-dubai-desktop.webp",
} as const satisfies Record<GeneratedImageKey & `blog.${string}`, string>;

const blogImageAlts = {
  "blog.warehouse-construction-planning-guide": "Warehouse construction planning and contractor coordination in Dubai",
  "blog.civil-construction-dubai-guide-2026": "Civil contractor Dubai planning for warehouse and industrial construction",
  "blog.dubai-authority-approvals-guide": "Dubai authority approval documents for warehouse construction projects",
  "blog.choosing-building-contractor-dubai": "Construction company Dubai team reviewing warehouse contractor scope",
} as const satisfies Record<GeneratedImageKey & `blog.${string}`, string>;

function clipped(value: string, max = 158) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).replace(/\s+\S*$/, "")}.`;
}

function topicIndex(topic: WarehouseSiloTopic) {
  return warehouseSiloTopics.findIndex((item) => item.slug === topic.slug);
}

function relatedPages(topic: WarehouseSiloTopic): Array<{ label: string; href: string }> {
  const index = topicIndex(topic);
  const candidates = [
    warehouseSiloTopics[index - 2],
    warehouseSiloTopics[index - 1],
    warehouseSiloTopics[index + 1],
    warehouseSiloTopics[index + 2],
  ].filter((item): item is WarehouseSiloTopic => Boolean(item));

  return [
    { label: "Warehouse Construction Dubai", href: "/warehouse-construction" },
    { label: "Industrial Buildings", href: "/industrial-buildings" },
    { label: "Authority Approvals Dubai", href: "/approval" },
    ...candidates.map((item) => ({ label: item.title, href: `/warehouse/${item.slug}` })),
  ].filter((item, itemIndex, self) => self.findIndex((other) => other.href === item.href) === itemIndex);
}

function authoritySentence(authorities: string[]) {
  return authorities.length > 1
    ? `${authorities.slice(0, -1).join(", ")} and ${authorities.at(-1)}`
    : authorities[0] ?? "Dubai authority";
}

function makePage(topic: WarehouseSiloTopic, index: number): WarehouseAuthorityPage {
  const authorityText = authoritySentence(topic.authorityFocus);
  const related = relatedPages(topic).slice(0, 7);
  const serviceArea = index % 3 === 0
    ? "Dubai Investment Park, JAFZA, Dubai South and Al Quoz"
    : index % 3 === 1
      ? "Jebel Ali, Dubai Industrial City, Dubai Production City and Sharjah industrial areas"
      : "Dubai, Abu Dhabi, Sharjah, Ajman and wider UAE industrial zones";

  return {
    title: topic.title,
    slug: topic.slug,
    href: `/warehouse/${topic.slug}`,
    keyword: topic.keyword,
    category: topic.category,
    seoTitle: `${topic.title} | Warehouse Contractor Dubai`,
    metaDescription: clipped(
      `${companyName} supports ${topic.title.toLowerCase()} with civil engineering, authority approval coordination, project planning and handover support across Dubai and the UAE.`,
    ),
    h1: `${topic.title} for Dubai and UAE industrial projects`,
    excerpt:
      `${topic.title} requires practical engineering, authority visibility and construction control. Emitronix helps ${topic.primaryAudience} turn scope, drawings and site constraints into a workable delivery route.`,
    imageKey: pageImageKeys[index % pageImageKeys.length],
    intro: [
      `${topic.title} is not only a construction package. In Dubai, a successful ${topic.assetType} project depends on early coordination between the owner, consultant, contractor, landlord, utility teams and relevant authorities such as ${authorityText}.`,
      `${companyName} approaches ${topic.serviceModifier} with a civil contractor mindset: define the intended use, check design maturity, review authority exposure, confirm access and utilities, and build the site program around inspections, procurement and handover evidence.`,
      `This page is written for ${topic.primaryAudience} evaluating a warehouse contractor Dubai, construction company Dubai, industrial contractor Dubai or civil contractor Dubai for projects in ${serviceArea}.`,
    ],
    summaryFacts: [
      `${topic.title} should start with drawings, intended use, current approvals, utility requirements and site access constraints.`,
      `Dubai warehouse projects often involve ${authorityText} along with landlord or master developer conditions.`,
      "The most common delay risks are unclear scope, incomplete drawings, late MEP decisions, fire-safety comments and missing close-out documents.",
      "A contractor should be reviewed for buildability input, authority awareness, QA/QC discipline, safety planning and handover documentation.",
    ],
    benefits: [
      "Clearer budget assumptions because civil, structural, MEP, external works and authority responsibilities are separated early.",
      "Reduced approval friction through early identification of Dubai Municipality, DEWA, DCD, Trakhees, DDA, JAFZA, Dubai South or RTA touchpoints.",
      "Better operational fit because loading, access, parking, office areas, slab performance, fire safety and maintenance routes are considered before site pressure starts.",
      "Improved handover readiness through documentation, inspection planning, snag tracking and stakeholder coordination.",
    ],
    processSteps: [
      `Review ${topic.assetType} use, location, drawings, plot or tenancy details, operational requirements and constraints.`,
      `Map ${authorityText} exposure plus landlord, free-zone, master developer or consultant responsibilities.`,
      "Clarify civil, structural, MEP, fire-safety, fit-out, utility, external works and completion deliverables.",
      "Prepare a practical construction sequence with procurement, inspections, document control and QA/QC checkpoints.",
      "Execute site works with safety control, progress reporting, consultant coordination and issue tracking.",
      "Close out snags, as-built information, inspection evidence, authority comments and project handover records.",
    ],
    requiredDocuments: [
      "Project brief, intended use and occupancy requirements.",
      "Plot, lease, title deed, tenancy, landlord or free-zone information where applicable.",
      "Architectural, structural, MEP, fire-safety and external works drawings.",
      "Existing authority comments, NOCs, approval references and consultant correspondence.",
      "Site photographs, access notes, current services, utility load information and operational constraints.",
      "Specification, material expectations, program target and handover requirements.",
    ],
    qualityControls: [
      "Drawing and revision control before work is issued to site.",
      "Material submittal tracking and procurement lead-time review.",
      "Civil, MEP and fire-safety interface checks before covering or closing areas.",
      "Inspection readiness, housekeeping, safety observations and non-conformance tracking.",
      "Handover evidence, completion documents and snag closure records.",
    ],
    serviceAreas: baseServiceAreas,
    authorityNotes: topic.authorityFocus.map((authority) => {
      if (authority === "DEWA") return "DEWA requirements can influence power load, service connections, water, utility rooms, temporary supply and commissioning readiness.";
      if (authority === "DCD") return "DCD requirements can influence fire access, fire alarm, fire fighting, storage use, hazardous materials, egress and inspection sequencing.";
      if (authority === "RTA") return "RTA exposure may apply where access, road works, traffic movement or loading interfaces connect to public infrastructure.";
      if (authority === "Trakhees") return "Trakhees requirements may apply in specific free-zone and port-related jurisdictions, with its own submission and inspection workflows.";
      if (authority === "JAFZA") return "JAFZA and free-zone requirements can affect permits, NOCs, operations, fit-out and handover in logistics and industrial zones.";
      if (authority === "Dubai South") return "Dubai South projects may require master developer and authority coordination for logistics, aviation-adjacent and industrial locations.";
      return `${authority} requirements should be checked against the project location, consultant role, drawings, current comments and intended warehouse operation.`;
    }),
    related,
    faqs: [
      {
        question: `What should I prepare before requesting ${topic.title.toLowerCase()}?`,
        answer:
          "Prepare the location, drawings, intended use, site condition, authority comments, consultant details, landlord requirements, utility needs and a realistic target timeline.",
      },
      {
        question: `Which authorities may affect ${topic.title.toLowerCase()} in Dubai?`,
        answer:
          `Depending on the project location and use, relevant touchpoints may include ${authorityText}, plus landlord, free-zone, consultant or master developer requirements.`,
      },
      {
        question: `How does Emitronix reduce risk for ${topic.title.toLowerCase()}?`,
        answer:
          "Emitronix reviews scope, buildability, authority exposure, MEP interfaces, safety needs, procurement and handover evidence before execution decisions become expensive on site.",
      },
      {
        question: "Does this service support projects outside Dubai?",
        answer:
          "Dubai is the primary market, but Emitronix publishes service coverage for the UAE including Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain and Fujairah where project scope is suitable.",
      },
    ],
    references,
  };
}

export const warehouseAuthorityPages: WarehouseAuthorityPage[] = warehouseSiloTopics.map(makePage);

function matchingWarehousePage(keyword: string) {
  const normalized = keyword.toLowerCase();
  return (
    warehouseAuthorityPages.find((page) => normalized.includes(page.slug.replace(/-/g, " ").replace("uae", "").trim())) ??
    warehouseAuthorityPages.find((page) => normalized.includes(page.title.toLowerCase().split(" ")[0])) ??
    warehouseAuthorityPages[0]
  );
}

function makeBlogPost(topic: (typeof warehouseBlogTopics)[number], index: number): BlogPost {
  const imageKey = blogImageKeys[index % blogImageKeys.length];
  const relatedPage = matchingWarehousePage(topic.keyword);
  const nextSlug = warehouseBlogTopics[index + 1]?.slug;
  const previousSlug = warehouseBlogTopics[index - 1]?.slug;
  const clusterPeer = warehouseBlogTopics.find(
    (item) => item.clusterIndex === topic.clusterIndex && item.slug !== topic.slug,
  )?.slug;
  const authorityHeavy = /approval|dewa|dcd|municipality/i.test(topic.keyword + topic.angle);
  const category = authorityHeavy ? "Dubai Authority Approvals" : "Warehouse Construction";
  const imagePath = blogImagePaths[imageKey as keyof typeof blogImagePaths];
  const imageAlt = blogImageAlts[imageKey as keyof typeof blogImageAlts];

  return {
    slug: topic.slug,
    title: topic.title,
    seoTitle: clipped(`${topic.title} | Emitronix Dubai`, 68),
    metaDescription: clipped(
      `Practical ${topic.title.toLowerCase()} for Dubai and UAE warehouse projects, covering scope, approvals, cost, timeline, contractor selection and handover risk.`,
    ),
    excerpt:
      `A practical Dubai-focused guide to ${topic.keyword.toLowerCase()} for owners, consultants, tenants and procurement teams planning industrial warehouse projects.`,
    category,
    categories: [
      "Warehouse Construction",
      "Civil Construction",
      "Project Management",
      authorityHeavy ? "Dubai Authority Approvals" : "Building Contracting",
    ],
    targetKeywords: [
      topic.keyword,
      "Warehouse Construction Dubai",
      "Warehouse Contractor Dubai",
      "Construction Company Dubai",
      "Civil Contractor Dubai",
      authorityHeavy ? "Authority Approvals Dubai" : "Industrial Contractor Dubai",
    ],
    generatedImage: imageKey,
    image: imagePath,
    imageAlt,
    imageTitle: topic.title,
    publishedDate: "2026-08-02",
    modifiedDate: reviewedDate,
    readTime: "10 min read",
    author: companyName,
    referenceCheckedDate: reviewedDate,
    references,
    popular: index < 8,
    featured: index < 4,
    intro: [
      `${topic.title} matters because warehouse construction in Dubai is usually tied to operational deadlines, authority comments, utility capacity, fire-safety planning, procurement lead times and handover evidence. A clean start reduces rework later.`,
      `This guide explains how ${topic.keyword.toLowerCase()} should be reviewed by an owner, consultant or tenant before committing to contractor pricing or site mobilisation. It focuses on Dubai and UAE industrial environments rather than generic construction advice.`,
      `${companyName} publishes this guidance to help teams ask better questions, prepare stronger documents and compare warehouse contractors with a clearer view of risk, scope and authority exposure.`,
    ],
    sections: [
      {
        id: "search-intent",
        title: `What ${topic.keyword} means in Dubai`,
        paragraphs: [
          `${topic.keyword} is a project planning topic as much as a construction topic. The phrase can include civil works, structural design, steel, slab performance, MEP interfaces, fire-safety coordination, fit-out, external works, parking, access and authority approvals.`,
          `For Dubai projects, the first question is not only who can build. The better question is who can translate drawings, authority comments, landlord requirements, site access and operational needs into a practical execution route.`,
        ],
        bullets: [
          "Confirm location, jurisdiction and master developer requirements.",
          "Define the warehouse use, storage profile, loading needs and occupancy expectations.",
          "Separate contractor scope from consultant, authority, landlord and client responsibilities.",
        ],
      },
      {
        id: "planning",
        title: "Planning the scope before pricing",
        paragraphs: [
          `A reliable proposal for ${topic.keyword.toLowerCase()} starts with complete information. Drawings, plot details, service loads, site photographs, authority status and project constraints help avoid assumptions that later become variations.`,
          "Owners should also document whether the project is new construction, extension, renovation, fit-out, warehouse office construction, loading dock work or a compliance-driven modification.",
        ],
        bullets: [
          "Share architectural, structural, MEP and fire-safety drawings where available.",
          "List required approvals and any current authority comments.",
          "Clarify target dates for mobilisation, inspections, completion and operations.",
        ],
      },
      {
        id: "authority-approvals",
        title: "Authority approvals and compliance",
        paragraphs: [
          "Warehouse projects in Dubai may involve Dubai Municipality, DEWA, Dubai Civil Defence, Trakhees, DDA, JAFZA, Dubai South, RTA or landlord review depending on location and intended use.",
          "Authority planning should happen before site execution. Late fire-safety comments, utility questions, drainage constraints or access issues can affect design, procurement, work sequencing and handover dates.",
        ],
        bullets: [
          "Map approval responsibility before construction starts.",
          "Keep approved drawings and latest revisions available to the site team.",
          "Treat inspections, test records and close-out documents as planned deliverables.",
        ],
      },
      {
        id: "engineering",
        title: "Civil, structural and MEP engineering interfaces",
        paragraphs: [
          "Warehouse work often combines civil engineering, structural engineering, MEP engineering and operational planning. Slab loading, floor flatness, drainage, roof drainage, ventilation, fire systems, power load and external movement routes should not be reviewed in isolation.",
          "The contractor, consultant and client should agree which decisions affect future operations, especially racking, forklifts, production equipment, cold storage, staff offices, loading docks and parking areas.",
        ],
      },
      {
        id: "cost-timeline",
        title: "Cost and timeline factors",
        paragraphs: [
          `${topic.keyword} cost depends on the size, site condition, structural system, slab and roof requirements, MEP load, fire-safety scope, authority route, procurement lead times and quality expectations.`,
          "Timeline depends on design maturity, authority comments, material availability, site access, inspections, specialist trades and how quickly stakeholders make technical decisions.",
        ],
        bullets: [
          "Incomplete drawings increase pricing uncertainty.",
          "Late MEP and fire-safety decisions can create redesign or rework.",
          "Compressed programs need stronger procurement and inspection planning.",
        ],
      },
      {
        id: "contractor-selection",
        title: "How to compare warehouse contractors",
        paragraphs: [
          "The best warehouse contractor is not automatically the cheapest. A more useful comparison includes scope clarity, exclusions, buildability feedback, authority awareness, documentation discipline, safety planning and handover support.",
          "Ask contractors how they will coordinate consultant comments, drawing revisions, procurement, site inspections, QA/QC records and final completion evidence.",
        ],
        bullets: [
          "Review assumptions and exclusions line by line.",
          "Check how civil, MEP, fire-safety and external works are coordinated.",
          "Ask for a communication and reporting rhythm before appointment.",
        ],
      },
      {
        id: "service-areas",
        title: "Dubai and UAE service areas",
        paragraphs: [
          "Emitronix publishes construction and authority coordination guidance for Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain and Fujairah, with Dubai as the primary project market.",
          "Industrial and logistics enquiries commonly come from Dubai Investment Park, JAFZA, Dubai South, Jebel Ali, Al Quoz, Dubai Industrial City and UAE logistics corridors.",
        ],
      },
      {
        id: "emitronix-approach",
        title: "Emitronix approach",
        paragraphs: [
          `${companyName} supports owners and consultants by turning open warehouse enquiries into structured scopes with known documents, approval exposure, site risks and next actions.`,
          "The aim is simple: reduce ambiguity before it reaches the site, protect quality and safety during execution, and make handover easier for the client, consultant and facility operations team.",
        ],
      },
    ],
    faqs: [
      {
        question: `What is the first step for ${topic.keyword.toLowerCase()}?`,
        answer:
          "The first step is to confirm the location, intended use, drawings, authority status, utility requirements and operational constraints before requesting final contractor pricing.",
      },
      {
        question: "Which approvals can affect warehouse construction in Dubai?",
        answer:
          "Dubai Municipality, DEWA, Dubai Civil Defence, Trakhees, DDA, JAFZA, Dubai South, RTA, landlord or master developer requirements may apply depending on project location and use.",
      },
      {
        question: "How can owners reduce warehouse construction delays?",
        answer:
          "Owners can reduce delay by preparing complete drawings, clarifying authority responsibility, selecting materials early, planning procurement, tracking comments and treating inspections as part of the program.",
      },
      {
        question: "Does Emitronix support warehouse fit-out and renovation?",
        answer:
          "Yes. Emitronix publishes and supports warehouse construction, renovation, fit-out, civil works, approvals, maintenance planning and project coordination enquiries in Dubai and the UAE.",
      },
      {
        question: "What should be included in a warehouse contractor quote?",
        answer:
          "A quote should identify inclusions, exclusions, drawings used, assumptions, civil works, MEP interfaces, fire-safety coordination, authority responsibilities, timelines, materials and handover documentation.",
      },
    ],
    internalLinks: [
      { label: relatedPage.title, href: relatedPage.href },
      { label: "Warehouse Construction", href: "/warehouse-construction" },
      { label: "Civil Contracting", href: "/civil" },
      { label: "Authority Approvals", href: "/approval" },
      { label: "Design & Build", href: "/design-build" },
      { label: "Project Management", href: "/project-management" },
      { label: "Contact Emitronix", href: "/contact" },
    ],
    relatedSlugs: Array.from(
      new Set([previousSlug, nextSlug, clusterPeer, "warehouse-construction-dubai-planning-design-authority-approvals"].filter((value): value is string => Boolean(value))),
    ).filter((slug) => slug !== topic.slug),
  };
}

export const warehouseBlogPosts: BlogPost[] = warehouseBlogTopics.map(makeBlogPost);

