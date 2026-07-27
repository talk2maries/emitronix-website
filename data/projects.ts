import type { GeneratedImageKey } from "@/data/generatedImages";

export type ProjectCategory = "Civil Works" | "MEP Works" | "Interior Fit-Out" | "Commercial Renovation" | "Maintenance" | "Authority Approvals";
export type ProjectFilter = "All" | ProjectCategory;

export type PortfolioProject = {
  title: string;
  location: string;
  category: ProjectCategory;
  scope: string;
  status: "Illustrative planning scenario — not a case study";
  description: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  generatedImage: GeneratedImageKey;
};

export const verifiedCaseStudyPublicationRequirements = [
  "Management-confirmed project name, scope, location and completion context",
  "Client permission for any client, consultant, site or commercial reference",
  "Rights-cleared photographs with documented project provenance",
  "Evidence for dates, quantities, challenges, actions and measurable outcomes",
  "Authority references worded without implying guaranteed or delegated approval",
  "Final factual, privacy and publication-consent review",
] as const;

export const projectFilters: ProjectFilter[] = [
  "All",
  "Civil Works",
  "MEP Works",
  "Interior Fit-Out",
  "Commercial Renovation",
  "Maintenance",
  "Authority Approvals",
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Villa renovation planning scenario",
    location: "Illustrative Dubai context",
    category: "Commercial Renovation",
    scope: "Villa renovation, civil alterations, finishing upgrades, wet-area works and MEP interface coordination.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A premium residential renovation profile for owners upgrading layouts, finishes, services and authority-sensitive modifications with disciplined site control.",
    image: "/images/generated/projects/villa-renovation-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing a Dubai villa renovation; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated villa renovation planning scenario",
    generatedImage: "projects.villa-renovation-planning-dubai",
  },
  {
    title: "Warehouse civil and MEP planning scenario",
    location: "Illustrative Dubai industrial context",
    category: "MEP Works",
    scope: "Warehouse civil repairs, drainage coordination, electrical upgrade sequencing and mechanical-service alignment.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A logistics facility upgrade profile for Dubai industrial operators needing civil works, MEP coordination and practical handover planning inside an active warehouse environment.",
    image: "/images/generated/projects/warehouse-civil-mep-upgrade-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing civil and MEP upgrades to a Dubai warehouse; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated warehouse upgrade planning scenario",
    generatedImage: "projects.warehouse-civil-mep-upgrade-planning-dubai",
  },
  {
    title: "Commercial office fit-out planning scenario",
    location: "Illustrative Dubai commercial context",
    category: "Interior Fit-Out",
    scope: "Office partitions, ceilings, finishes, joinery coordination, MEP interfaces and landlord close-out support.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A commercial office fit-out profile shaped for Dubai business districts where programme control, finish quality and approvals coordination matter.",
    image: "/images/generated/projects/commercial-office-fit-out-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing a commercial office fit-out in Dubai; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated office fit-out planning scenario",
    generatedImage: "projects.commercial-office-fit-out-planning-dubai",
  },
  {
    title: "Building maintenance planning scenario",
    location: "Illustrative Dubai commercial context",
    category: "Maintenance",
    scope: "Planned maintenance, reactive repairs, waterproofing, minor civil works and MEP support coordination.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A maintenance profile for commercial and light-industrial properties that need fast diagnosis, clean execution and clear close-out communication.",
    image: "/images/generated/projects/building-maintenance-inspection-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing a building maintenance inspection in Dubai; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated building maintenance planning scenario",
    generatedImage: "projects.building-maintenance-inspection-planning-dubai",
  },
  {
    title: "Utility approval coordination scenario",
    location: "Illustrative Dubai context",
    category: "Authority Approvals",
    scope: "DEWA requirement review, load coordination, document tracking, consultant support and site-readiness checks.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "An authority coordination profile for projects where utility requirements, submission clarity and contractor readiness must stay aligned.",
    image: "/images/generated/projects/utility-approval-coordination-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing utility approval coordination in Dubai; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated utility approval coordination scenario",
    generatedImage: "projects.utility-approval-coordination-planning-dubai",
  },
  {
    title: "Retail renovation planning scenario",
    location: "Illustrative Dubai retail context",
    category: "Commercial Renovation",
    scope: "Retail renovation, facade interface review, interior finishes, MEP adjustments and handover support.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A retail renovation profile for tenant and landlord teams improving customer-facing space while protecting working hours, finishes and authority visibility.",
    image: "/images/generated/projects/retail-renovation-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing a retail renovation in Dubai; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated retail renovation planning scenario",
    generatedImage: "projects.retail-renovation-planning-dubai",
  },
  {
    title: "Industrial facility modification scenario",
    location: "Illustrative Dubai free-zone context",
    category: "Civil Works",
    scope: "Civil modifications, slab and wall repairs, steel interface review, access planning and authority-aware sequencing.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "An industrial modification profile for free-zone facilities where operational continuity, safety and civil execution need a controlled delivery rhythm.",
    image: "/images/generated/projects/industrial-facility-modification-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing modifications to a Dubai industrial facility; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated industrial modification planning scenario",
    generatedImage: "projects.industrial-facility-modification-planning-dubai",
  },
  {
    title: "MEP interface coordination scenario",
    location: "Illustrative Dubai logistics context",
    category: "MEP Works",
    scope: "HVAC, electrical, plumbing and fire-life-safety coordination with civil, fit-out and inspection workflows.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A Dubai South coordination profile for projects that need MEP decisions connected early with drawings, civil works, ceiling zones and close-out evidence.",
    image: "/images/generated/projects/mep-interface-coordination-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing MEP interface coordination in a Dubai facility; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated MEP coordination planning scenario",
    generatedImage: "projects.mep-interface-coordination-planning-dubai",
  },
  {
    title: "Authority and NOC coordination scenario",
    location: "Illustrative Dubai context",
    category: "Authority Approvals",
    scope: "Dubai Municipality, DCD, DEWA, landlord and master-developer NOC coordination support.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "An approvals profile for owners and consultants who need documentation, comments, inspections and construction readiness managed in one clear track.",
    image: "/images/generated/projects/authority-noc-coordination-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing authority and NOC coordination in Dubai; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated authority coordination planning scenario",
    generatedImage: "projects.authority-noc-coordination-planning-dubai",
  },
  {
    title: "Civil repair and maintenance scenario",
    location: "Illustrative Dubai context",
    category: "Maintenance",
    scope: "Concrete repairs, masonry, drainage, waterproofing, minor civil works and maintenance documentation.",
    status: "Illustrative planning scenario — not a case study",
    description:
      "A Dubai repair profile for warehouses and commercial assets needing reliable civil maintenance with practical scheduling and site housekeeping.",
    image: "/images/generated/projects/civil-repair-maintenance-planning-dubai-desktop.webp",
    imageAlt: "Illustrative AI-generated planning scenario showing civil repair and maintenance works in Dubai; not evidence of an Emitronix project.",
    imageTitle: "Illustrative AI-generated civil repair and maintenance scenario",
    generatedImage: "projects.civil-repair-maintenance-planning-dubai",
  },
];

export const beforeAfterProjects = [
  {
    title: "Villa Renovation Transformation",
    location: "Dubai",
    beforeLabel: "Before: existing layout constraints",
    afterLabel: "After: refreshed villa living flow",
    beforeImage: "/images/project-civil-works-dubai.webp",
    afterImage: "/images/project-villa-building-works-dubai-modern.webp",
    description:
      "Representative renovation planning for villas where demolition, civil changes, finishes and MEP interfaces must be sequenced cleanly.",
  },
  {
    title: "Warehouse Upgrade Transformation",
    location: "Dubai industrial area",
    beforeLabel: "Before: operational repair requirements",
    afterLabel: "After: authority-aware upgrade path",
    beforeImage: "/images/project-civil-works-dubai.webp",
    afterImage: "/images/project-warehouse-industrial-dubai.webp",
    description:
      "Representative warehouse upgrade planning for slab, drainage, MEP and operational handover needs in active logistics environments.",
  },
  {
    title: "Commercial Interior Transformation",
    location: "Business Bay",
    beforeLabel: "Before: shell and services coordination",
    afterLabel: "After: fit-out ready handover",
    beforeImage: "/images/project-commercial-renovation-dubai.webp",
    afterImage: "/images/project-office-fit-out-dubai.webp",
    description:
      "Representative fit-out coordination for offices and retail spaces where finishes, services, landlord comments and handover must align.",
  },
];

export const featuredProject = {
  title: "Warehouse Civil & MEP Upgrade - Dubai",
  location: "Dubai industrial area",
  category: "Featured representative project",
  image: "/images/project-warehouse-industrial-dubai.webp",
  imageAlt: "Featured Dubai warehouse racking interior for civil and MEP upgrade coordination",
  description:
    "A premium logistics-facility profile showing how Emitronix structures warehouse upgrades around civil repairs, MEP interfaces, authority awareness, site access and handover readiness.",
  details: [
    "Civil repair and slab coordination for operational warehouse spaces.",
    "Electrical, drainage, HVAC and fire-life-safety interfaces reviewed with buildability in mind.",
    "Authority and landlord requirements kept visible before site execution and close-out.",
  ],
};

export const projectGallery = [
  {
    title: "Civil works coordination",
    location: "Dubai",
    image: "/images/project-civil-works-dubai.webp",
    imageAlt: "Civil works coordination with reinforcement and MEP sleeves for Dubai construction projects",
    heightClass: "h-72",
  },
  {
    title: "Warehouse construction planning",
    location: "Dubai logistics zones",
    image: "/images/project-warehouse-industrial-dubai.webp",
    imageAlt: "Warehouse racking and logistics interior planning for Dubai industrial zones",
    heightClass: "h-96",
  },
  {
    title: "Commercial fit-out delivery",
    location: "Business Bay",
    image: "/images/project-office-fit-out-dubai.webp",
    imageAlt: "Premium office corridor fit-out delivery coordination for Dubai commercial spaces",
    heightClass: "h-80",
  },
  {
    title: "Villa construction and renovation",
    location: "Dubai",
    image: "/images/project-villa-building-works-dubai-modern.webp",
    imageAlt: "Modern villa construction and renovation works for Dubai residential projects",
    heightClass: "h-[28rem]",
  },
  {
    title: "Authority approval support",
    location: "Dubai authorities",
    image: "/images/project-authority-approvals-dubai.webp",
    imageAlt: "Dubai authority approval documentation and construction drawing coordination",
    heightClass: "h-72",
  },
  {
    title: "MEP and civil interfaces",
    location: "Dubai South",
    image: "/images/project-mep-coordination-dubai.webp",
    imageAlt: "MEP and civil contracting coordination with electrical conduits and service routes",
    heightClass: "h-96",
  },
];

export const projectTimeline = [
  {
    phase: "01",
    title: "Discovery and site intelligence",
    description: "Location, current drawings, site photographs, intended use and authority exposure are reviewed before scope decisions are fixed.",
  },
  {
    phase: "02",
    title: "Scope and authority mapping",
    description: "Civil works, MEP interfaces, renovation risks, landlord comments and approval requirements are converted into a practical action path.",
  },
  {
    phase: "03",
    title: "Procurement and controlled execution",
    description: "Materials, access, work sequencing, inspections and stakeholder decisions are coordinated around a documented site rhythm.",
  },
  {
    phase: "04",
    title: "Snag, documents and handover",
    description: "Close-out evidence, snag closure, authority-facing documents and handover priorities are prepared before completion pressure builds.",
  },
];

export const testimonialThemes = [
  {
    title: "Authority clarity",
    role: "Owner priority theme",
    text: "Dubai project owners often need early visibility on approvals, NOCs, comments and inspection readiness before committing to site execution.",
  },
  {
    title: "Site communication",
    role: "Consultant priority theme",
    text: "Consultants value a contractor rhythm that keeps drawings, instructions, procurement, access and handover actions visible throughout the project.",
  },
  {
    title: "Operational continuity",
    role: "Facility team priority theme",
    text: "Warehouses and commercial facilities need maintenance and upgrade works planned around access, housekeeping, safety and business continuity.",
  },
];

export const projectFaqs = [
  {
    question: "Are these completed Emitronix projects or case studies?",
    answer:
      "No. They are explicitly illustrative planning scenarios that explain common scope and coordination questions. Verified case studies, project photographs, client names, dates, results and testimonials will be published only after evidence and publication consent are approved.",
  },
  {
    question: "What should I send before requesting a construction quotation?",
    answer:
      "Share the project location, drawings, current authority status, site photographs, intended use, required scope, preferred timeline and any landlord or master-developer comments.",
  },
  {
    question: "Can one project include civil works, MEP and approvals?",
    answer:
      "Yes. Many Dubai projects combine civil modifications, fit-out, MEP coordination, maintenance planning and authority approval support, so the scope should be reviewed as one connected workflow.",
  },
  {
    question: "Do the locations on this page identify actual project sites?",
    answer:
      "No. Location labels describe general Dubai project contexts and do not identify a client, completed project or Emitronix worksite.",
  },
  {
    question: "How should I use these planning scenarios?",
    answer:
      "Use them as a checklist for the documents, interfaces and decisions that may need review before a quotation or site plan can be prepared. Your actual scope must be assessed against project-specific facts.",
  },
  {
    question: "Why are some statistics not shown as numeric counts?",
    answer:
      "Project counts, client totals, references and testimonial claims are published only when verified and approved for public use. This avoids unverified marketing claims.",
  },
];
