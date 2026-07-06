import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Clock,
  Factory,
  FileCheck2,
  Flame,
  Gauge,
  Hammer,
  HardHat,
  Home,
  Landmark,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Users,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Emitronix",
  legalName: "Emitronix Contracting LLC",
  title: "Emitronix Contracting LLC | Construction Company Dubai",
  description:
    "Emitronix Contracting LLC delivers civil construction, building contracting, villa, warehouse, interior fit-out and Dubai authority approval support across the UAE.",
  url: "https://emitronix.ae",
  location: "Dubai Investment Park 02, Dubai, UAE",
  email: "info@emitronix.ae",
  phone: "+971559828492",
  hours: "Mon - Sat 8:00 AM - 6:00 PM",
  serviceArea: ["Dubai", "Abu Dhabi", "Sharjah", "United Arab Emirates"],
};

export const whatsappUrl = `https://wa.me/${site.phone.replace(/\D/g, "")}`;

export const absoluteUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${cleanPath}`;
};

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const contactItems = [
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "Location", value: site.location, href: "/contact", icon: MapPin },
  { label: "Hours", value: site.hours, href: "/contact", icon: Clock },
];

export const socialLinks: Array<{ label: string; href: string; icon: LucideIcon }> = [];

export type Service = {
  title: string;
  shortTitle: string;
  slug: string;
  href: string;
  description: string;
  details: string;
  searchIntent: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  icon: LucideIcon;
  highlights: string[];
  keywords: string[];
  overview: string[];
  whoNeeds: string[];
  methodology: string[];
  workflow: string[];
  qualityStandards: string[];
  dubaiRegulations: string[];
  timeline: Array<{ phase: string; typicalDuration: string; notes: string }>;
  costFactors: string[];
  commonMistakes: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedHrefs: string[];
};

type ServiceSeed = Omit<
  Service,
  | "searchIntent"
  | "overview"
  | "workflow"
  | "qualityStandards"
  | "dubaiRegulations"
  | "timeline"
  | "costFactors"
  | "commonMistakes"
  | "faqs"
  | "relatedHrefs"
> &
  Partial<
    Pick<
      Service,
      | "searchIntent"
      | "overview"
      | "workflow"
      | "qualityStandards"
      | "dubaiRegulations"
      | "timeline"
      | "costFactors"
      | "commonMistakes"
      | "faqs"
      | "relatedHrefs"
    >
  >;

const defaultWorkflow = (serviceTitle: string) => [
  `Review the ${serviceTitle.toLowerCase()} brief, location, drawings, intended use, site access and authority exposure.`,
  "Clarify the consultant, owner, landlord, authority and contractor responsibilities before pricing or mobilization.",
  "Coordinate civil, structural, MEP, procurement, inspection and handover interfaces through one documented delivery rhythm.",
  "Close out with snag control, as-built information, authority-facing documents and practical handover support.",
];

const defaultTimeline = [
  {
    phase: "Discovery and scope review",
    typicalDuration: "2-7 working days",
    notes: "Depends on drawing availability, location details, site photographs, authority comments and consultant input.",
  },
  {
    phase: "Design and authority coordination",
    typicalDuration: "1-6+ weeks",
    notes: "Varies by jurisdiction, asset type, submission quality, landlord requirements and comment cycles.",
  },
  {
    phase: "Procurement and mobilization",
    typicalDuration: "1-4 weeks",
    notes: "Influenced by material selection, specialist suppliers, site access, permits and program pressure.",
  },
  {
    phase: "Site execution and handover",
    typicalDuration: "Project-specific",
    notes: "Driven by scope volume, inspections, sequencing, stakeholder decisions and close-out readiness.",
  },
];

const defaultQualityStandards = [
  "Scope, assumptions and exclusions are documented before execution decisions are made.",
  "Drawings, technical comments and site instructions are tracked so field teams do not work from unclear information.",
  "Civil, structural, MEP and fit-out interfaces are reviewed together rather than treated as isolated trades.",
  "Inspection readiness, snag response, housekeeping and handover evidence are considered part of project delivery.",
];

const defaultDubaiRegulations = [
  "Dubai Municipality requirements may affect permits, drawings, structural submissions and completion workflows.",
  "Dubai Civil Defence requirements can influence fire access, life safety systems, rated separations and warehouse use.",
  "DEWA, RTA, Trakhees, DDA, JAFZA, Dubai South, DIFC or landlord requirements may apply depending on location and asset type.",
  "Authority requirements should be confirmed project by project with the appointed consultant and relevant approving body.",
];

const defaultCostFactors = [
  "Design maturity, drawing completeness and late design changes.",
  "Site condition, access limits, demolition, enabling works and working-hour restrictions.",
  "Structural system, concrete, steel, finishing, MEP interfaces and specialist materials.",
  "Authority comments, inspection requirements, utility coordination and handover documentation.",
  "Procurement lead times, program compression and stakeholder decision speed.",
];

const defaultCommonMistakes = [
  "Requesting a quotation before the intended use, drawings, authority status and scope boundaries are clear.",
  "Treating approvals as a separate task that can be solved after site work has already started.",
  "Comparing contractors only by headline price without reviewing assumptions, exclusions and handover responsibilities.",
  "Selecting materials or layouts late, which causes procurement delays and site rework.",
];

const defaultServiceFaqs = (serviceTitle: string, searchIntent: string) => [
  {
    question: `What should I prepare before requesting ${serviceTitle.toLowerCase()} in Dubai?`,
    answer:
      "Prepare the project location, current drawings, intended use, site photographs, authority comments if available, consultant details, expected timeline and any landlord or master developer requirements.",
  },
  {
    question: `How does Emitronix manage ${serviceTitle.toLowerCase()} authority exposure?`,
    answer:
      "Emitronix reviews likely Dubai authority touchpoints early, then aligns construction planning with consultant responsibilities, drawing comments, inspection readiness and handover documentation.",
  },
  {
    question: `What affects the cost of ${serviceTitle.toLowerCase()}?`,
    answer:
      "Cost is affected by scope clarity, site condition, structural and MEP requirements, material choices, authority comments, access constraints, procurement lead times and program pressure.",
  },
  {
    question: `Is Emitronix a fit for ${searchIntent}?`,
    answer:
      "Emitronix is a fit when the project needs practical Dubai construction coordination, clear scope control, authority-aware planning and a premium communication rhythm for owners, consultants or commercial teams.",
  },
];

const makeService = (input: ServiceSeed): Service => {
  const searchIntent = input.searchIntent ?? input.keywords[0] ?? `${input.title} Dubai`;

  return {
    ...input,
    searchIntent,
    overview:
      input.overview ??
      [
        `${input.title} in Dubai requires more than trade execution. A successful project depends on buildability, authority exposure, site logistics, consultant coordination, material decisions and handover planning being understood before pressure reaches the site.`,
        `Emitronix Contracting LLC structures ${input.title.toLowerCase()} enquiries around the practical questions owners and consultants ask in Dubai: what is included, what approvals may apply, what documents are missing, what risks can delay work and how the project can move toward handover with less ambiguity.`,
        `This service supports projects across Dubai, Dubai Investment Park, JAFZA, Dubai South, Al Quoz, Business Bay, Sharjah, Abu Dhabi and the wider UAE where civil construction, fit-out, structural or approval coordination must be handled with a professional contractor mindset.`,
      ],
    workflow: input.workflow ?? defaultWorkflow(input.title),
    qualityStandards: input.qualityStandards ?? defaultQualityStandards,
    dubaiRegulations: input.dubaiRegulations ?? defaultDubaiRegulations,
    timeline: input.timeline ?? defaultTimeline,
    costFactors: input.costFactors ?? defaultCostFactors,
    commonMistakes: input.commonMistakes ?? defaultCommonMistakes,
    faqs: input.faqs ?? defaultServiceFaqs(input.title, searchIntent),
    relatedHrefs: input.relatedHrefs ?? ["/services", "/approval", "/projects", "/contact"],
  };
};

export const services: Service[] = [
  makeService({
    title: "Civil Contracting",
    shortTitle: "Civil",
    slug: "civil-contracting",
    href: "/civil",
    description: "G+4 buildings, villas, warehouses, commercial and industrial projects.",
    details:
      "Complete civil contracting for G+4 buildings, villas, warehouses, commercial and industrial developments across Dubai and the UAE.",
    image: "/images/civil-contractor-dubai-construction-site.webp",
    imageAlt: "Civil contractor Dubai site team coordinating construction works",
    imageTitle: "Civil Contractor Dubai - site coordination and construction works",
    icon: Building2,
    highlights: ["G+4 buildings", "Villas and warehouses", "Commercial and industrial works"],
    keywords: ["Dubai civil contracting", "G+4 building contractor", "warehouse construction UAE"],
    searchIntent: "Civil Contractor Dubai",
    whoNeeds: [
      "Developers, owners and consultants planning villas, G+4 buildings, warehouses or commercial facilities in Dubai.",
      "Tenants and operators in DIP, JAFZA, Dubai South and Al Quoz who need civil modifications aligned with approvals.",
      "Project teams that want one contractor mindset for structure, site coordination, authority visibility and handover.",
    ],
    methodology: [
      "Start with drawings, location, site condition, intended use and authority exposure before pricing assumptions are fixed.",
      "Review structural, civil, MEP and fit-out interfaces together so avoidable coordination gaps are found early.",
      "Sequence site works around access, inspections, procurement, consultant comments and handover deliverables.",
    ],
    relatedHrefs: ["/main-contracting", "/warehouse-construction", "/commercial-buildings", "/approval"],
  }),
  makeService({
    title: "Main Contracting",
    shortTitle: "Main Contractor",
    slug: "main-contracting",
    href: "/main-contracting",
    description: "Single-point contracting coordination for civil, structural, fit-out, approvals and handover.",
    details:
      "Main contracting in Dubai for owners and consultants who need one coordinated construction partner for scope control, procurement, site execution, authority visibility and handover readiness.",
    image: "/images/building-contractor-dubai-construction-site.webp",
    imageAlt: "Main contractor Dubai site team reviewing building construction progress",
    imageTitle: "Main Contractor Dubai - building construction site coordination",
    icon: HardHat,
    highlights: ["Single-point coordination", "Consultant and authority alignment", "Handover-focused delivery"],
    keywords: ["Main Contractor Dubai", "Main Contractor UAE", "Construction Company Dubai"],
    searchIntent: "Main Contractor Dubai",
    whoNeeds: [
      "Owners who want a single accountable construction partner instead of disconnected trade coordination.",
      "Consultants who need site execution, procurement, inspection and documentation interfaces managed clearly.",
      "Commercial teams planning buildings, warehouses, villas, renovation or fit-out projects in Dubai and the UAE.",
    ],
    methodology: [
      "Define scope boundaries, contract responsibilities and communication routes before execution starts.",
      "Coordinate civil, structural, MEP, fit-out and authority workstreams with documented decision tracking.",
      "Protect handover by treating inspections, snag closure and completion evidence as planned deliverables.",
    ],
    relatedHrefs: ["/civil", "/turnkey-construction", "/project-management", "/contact"],
  }),
  makeService({
    title: "Warehouse Construction",
    shortTitle: "Warehouse",
    slug: "warehouse-construction",
    href: "/warehouse-construction",
    description: "Planning, civil works and delivery coordination for logistics, storage and industrial warehouses.",
    details:
      "Warehouse construction in Dubai for logistics, storage, light industrial and operational facilities requiring civil works, fire-safety visibility, utility coordination and handover planning.",
    image: "/images/warehouse-construction-dubai.webp",
    imageAlt: "Warehouse construction Dubai site with industrial building and earthworks machinery",
    imageTitle: "Warehouse Construction Dubai - logistics and industrial facility delivery",
    icon: Warehouse,
    highlights: ["Logistics and storage facilities", "Fire-safety and utility coordination", "DIP, JAFZA and Dubai South focus"],
    keywords: ["Warehouse Construction Dubai", "Warehouse Contractor Dubai", "Logistics Warehouse Construction"],
    searchIntent: "Warehouse Construction Dubai",
    whoNeeds: [
      "Logistics operators, tenants and owners planning warehouses in DIP, JAFZA, Dubai South, Jebel Ali or Al Quoz.",
      "Industrial teams that need loading, slab, height, access, fire-safety and utility needs considered early.",
      "Investors comparing warehouse contractors and seeking authority-aware planning before mobilization.",
    ],
    methodology: [
      "Review operational use, racking, loading, fire access, floor performance, drainage, utilities and expansion needs.",
      "Align civil and structural planning with authority, landlord and operational constraints before site execution.",
      "Plan handover around fire safety, utility connections, access, snag control and operational readiness.",
    ],
    costFactors: [
      "Warehouse area, clear height, structural span, slab performance and loading requirements.",
      "Fire safety requirements, DCD considerations, utility connections and operational use.",
      "Site location in DIP, JAFZA, Dubai South, Jebel Ali or other logistics zones.",
      "Racking, office blocks, mezzanines, loading bays, drainage and external works.",
    ],
    relatedHrefs: ["/industrial-buildings", "/civil", "/dcd-approvals", "/dewa-approvals"],
  }),
  makeService({
    title: "Industrial Buildings",
    shortTitle: "Industrial",
    slug: "industrial-buildings",
    href: "/industrial-buildings",
    description: "Industrial building contracting for factories, workshops, logistics and operational facilities.",
    details:
      "Industrial building contractor support in Dubai and the UAE for factories, workshops, logistics buildings and operational assets requiring practical civil, structural and authority coordination.",
    image: "/images/mep-civil-contracting-dubai.webp",
    imageAlt: "Industrial building contractor Dubai steel structure and factory construction works",
    imageTitle: "Industrial Building Contractor Dubai - factory and logistics projects",
    icon: Factory,
    highlights: ["Factory and workshop planning", "Operational civil works", "Utility and fire-safety interfaces"],
    keywords: ["Industrial Building Contractor Dubai", "Factory Construction UAE", "Industrial Building Contractor"],
    searchIntent: "Industrial Building Contractor Dubai",
    whoNeeds: [
      "Factory owners, logistics operators and industrial tenants planning new facilities or upgrades.",
      "Consultants coordinating civil, structural, fire safety and utility requirements for industrial assets.",
      "Commercial teams that need construction decisions aligned with operations, safety and approvals.",
    ],
    methodology: [
      "Study operational process, equipment loads, service routes, access, utilities, drainage and fire-life safety exposure.",
      "Coordinate civil and structural planning with MEP, authority comments and future maintenance requirements.",
      "Sequence construction around safe site access, procurement lead times and operational readiness.",
    ],
    relatedHrefs: ["/warehouse-construction", "/structural-works", "/dewa-approvals", "/approval"],
  }),
  makeService({
    title: "Commercial Buildings",
    shortTitle: "Commercial",
    slug: "commercial-buildings",
    href: "/commercial-buildings",
    description: "Commercial building construction for offices, showrooms, retail buildings and mixed-use assets.",
    details:
      "Commercial building contractor services in Dubai for offices, showrooms, retail buildings and business facilities where quality, authority readiness and handover planning matter.",
    image: "/images/dubai-building-contracting-company.webp",
    imageAlt: "Commercial building contractor Dubai skyline construction and crane works",
    imageTitle: "Commercial Building Contractor Dubai - office and retail construction",
    icon: BriefcaseBusiness,
    highlights: ["Office and showroom buildings", "Retail and business assets", "Premium handover planning"],
    keywords: ["Commercial Building Contractor Dubai", "Commercial Construction Dubai", "Construction Company Dubai"],
    searchIntent: "Commercial Building Contractor Dubai",
    whoNeeds: [
      "Owners developing offices, showrooms, business facilities or commercial units in Dubai.",
      "Tenants and landlords planning civil modifications, fit-out preparation or building upgrades.",
      "Consultants who need construction, authority and handover responsibilities clearly coordinated.",
    ],
    methodology: [
      "Map user flow, authority exposure, landlord requirements, fire safety, MEP interfaces and fit-out readiness.",
      "Protect brand and tenant value through clean site sequencing, premium finishes and predictable communication.",
      "Align civil delivery with completion documentation, inspections and occupancy-related requirements.",
    ],
    relatedHrefs: ["/main-contracting", "/interior", "/dubai-municipality-approval", "/contact"],
  }),
  makeService({
    title: "Villa Construction",
    shortTitle: "Villa",
    slug: "villa-construction",
    href: "/villa-construction",
    description: "Villa construction and renovation coordination for private residential projects in Dubai and UAE.",
    details:
      "Villa construction in Dubai for owners seeking disciplined civil works, structural coordination, finishing quality, authority awareness and a premium residential delivery experience.",
    image: "/images/villa-construction-contractor-dubai.webp",
    imageAlt: "Villa construction contractor Dubai residential building works in progress",
    imageTitle: "Villa Construction Dubai - residential site delivery",
    icon: Home,
    highlights: ["Luxury villa construction", "Renovation and additions", "Finishing and authority awareness"],
    keywords: ["Villa Construction Dubai", "Villa Contractor Dubai", "Villa Renovation Dubai"],
    searchIntent: "Villa Construction Dubai",
    whoNeeds: [
      "Private owners planning villa construction, extensions, renovation or structural modifications in Dubai.",
      "Consultants coordinating residential drawings, authority exposure, finishes and site execution.",
      "Families who need a contractor that communicates clearly around cost, timeline, quality and handover.",
    ],
    methodology: [
      "Clarify the lifestyle brief, drawings, structural changes, finishing expectations and authority route.",
      "Plan residential site works around access, neighboring properties, housekeeping, procurement and quality checks.",
      "Coordinate finishing, MEP interfaces, snag response and handover documents before completion pressure builds.",
    ],
    relatedHrefs: ["/building-renovation", "/interior", "/civil", "/contact"],
  }),
  makeService({
    title: "Interior Fit-Out",
    shortTitle: "Interior",
    slug: "interior-fit-out",
    href: "/interior",
    description: "Complete interior fit-out solutions for commercial, retail and residential projects.",
    details:
      "Premium interior fit-out solutions for offices, retail spaces, restaurants, villas and residential developments.",
    image: "/images/commercial-fit-out-contractor-dubai.webp",
    imageAlt: "Commercial fit-out contractor Dubai reviewing interior drawings and coordination",
    imageTitle: "Commercial Fit Out Contractor Dubai - premium interior delivery",
    icon: Sparkles,
    highlights: ["Commercial fit-out", "Retail and hospitality", "Residential interiors"],
    keywords: ["interior fit-out Dubai", "commercial fit-out UAE", "villa interior contractor"],
    searchIntent: "Interior Fit-Out Contractor Dubai",
    whoNeeds: [
      "Office, retail, hospitality, showroom and villa owners who need interior delivery aligned with civil and MEP constraints.",
      "Tenants preparing commercial spaces in Business Bay, Downtown Dubai, Al Quoz, DIP or mixed-use Dubai locations.",
      "Project teams that want authority, landlord, fire-safety and handover requirements considered during fit-out planning.",
    ],
    methodology: [
      "Review layout, finishes, MEP interfaces, landlord rules, authority exposure and working-hour constraints.",
      "Coordinate procurement, mock-ups, site protection, installation sequencing and quality control around the handover date.",
      "Manage snagging, authority/landlord close-out items and practical completion evidence.",
    ],
    relatedHrefs: ["/commercial-buildings", "/building-renovation", "/dcd-approvals", "/contact"],
  }),
  makeService({
    title: "Building Renovation",
    shortTitle: "Renovation",
    slug: "building-renovation",
    href: "/building-renovation",
    description: "Civil renovation, modification and upgrade works for villas, commercial and industrial buildings.",
    details:
      "Building renovation in Dubai for owners and tenants upgrading villas, commercial units, warehouses and existing buildings with civil, fit-out and authority-aware coordination.",
    image: "/images/commercial-fit-out-contractor-dubai.webp",
    imageAlt: "Building renovation Dubai contractor reviewing drawings for civil and fit-out upgrades",
    imageTitle: "Building Renovation Dubai - civil and fit-out upgrades",
    icon: Wrench,
    highlights: ["Civil modifications", "Renovation and upgrades", "Authority-aware changes"],
    keywords: ["Building Renovation Dubai", "Renovation Contractor Dubai", "Villa Renovation Dubai"],
    searchIntent: "Building Renovation Dubai",
    whoNeeds: [
      "Owners modernizing villas, offices, warehouses, retail spaces or commercial properties in Dubai.",
      "Tenants needing approved modifications before occupancy, operation or fit-out handover.",
      "Consultants managing structural, civil, MEP or authority-sensitive changes to existing buildings.",
    ],
    methodology: [
      "Survey existing conditions, identify hidden constraints and compare intended changes with current drawings.",
      "Separate cosmetic upgrades from authority-sensitive civil, structural, MEP and fire-safety modifications.",
      "Sequence demolition, protection, construction, fit-out and snagging to reduce disruption and rework.",
    ],
    relatedHrefs: ["/villa-construction", "/interior", "/dubai-municipality-approval", "/contact"],
  }),
  makeService({
    title: "Structural Works",
    shortTitle: "Structural",
    slug: "structural-works",
    href: "/structural-works",
    description: "Structural concrete, steel, strengthening and modification coordination for Dubai building projects.",
    details:
      "Structural works in Dubai for construction, renovation, warehouse, villa and commercial projects requiring disciplined engineering coordination, approved drawings and controlled site execution.",
    image: "/images/dubai-civil-works-construction-site.webp",
    imageAlt: "Structural works Dubai concrete high-rise construction in progress",
    imageTitle: "Structural Works Dubai - concrete and steel coordination",
    icon: Hammer,
    highlights: ["Concrete and steel works", "Structural modifications", "Engineering coordination"],
    keywords: ["Structural Works Dubai", "Civil Contractor Dubai", "Building Contractor UAE"],
    searchIntent: "Structural Works Dubai",
    whoNeeds: [
      "Owners planning concrete, steel, strengthening, slab, opening or structural modification works.",
      "Consultants requiring site execution aligned with structural drawings and authority expectations.",
      "Industrial, villa and commercial project teams managing safety-sensitive civil changes.",
    ],
    methodology: [
      "Confirm approved drawings, load paths, site conditions, temporary works exposure and inspection requirements.",
      "Coordinate material, reinforcement, concrete, steel, testing, protection and quality checkpoints before execution.",
      "Treat structural changes as engineering-led work requiring documentation, supervision and controlled sequencing.",
    ],
    relatedHrefs: ["/civil", "/industrial-buildings", "/warehouse-construction", "/approval"],
  }),
  makeService({
    title: "Design & Build",
    shortTitle: "Design Build",
    slug: "design-build",
    href: "/design-build",
    description: "Design and build coordination that connects concept, approvals, construction and handover.",
    details:
      "Design and build in Dubai for owners seeking a practical route from concept and scope definition to authority-aware construction planning, delivery coordination and handover readiness.",
    image: "/images/building-contractor-dubai-construction-site.webp",
    imageAlt: "Design and build Dubai contractor coordinating site planning and construction decisions",
    imageTitle: "Design and Build Dubai - concept to completion planning",
    icon: Ruler,
    highlights: ["Concept to construction", "Buildability-led planning", "Authority-aware design route"],
    keywords: ["Design and Build Dubai", "Design Build Contractor Dubai", "Turnkey Contractor Dubai"],
    searchIntent: "Design and Build Dubai",
    whoNeeds: [
      "Owners who want practical alignment between design intent, budget, authority route and construction delivery.",
      "Commercial clients looking for faster decision-making and fewer gaps between design and execution.",
      "Villa, warehouse, retail or office teams that need buildability considered early in the concept stage.",
    ],
    methodology: [
      "Translate the brief into scope, drawings, authority exposure, budget priorities and delivery constraints.",
      "Review design choices for buildability, procurement, durability, maintenance and handover impact.",
      "Coordinate the design-development path with construction planning so execution is not disconnected from intent.",
    ],
    relatedHrefs: ["/turnkey-construction", "/main-contracting", "/interior", "/contact"],
  }),
  makeService({
    title: "Turnkey Construction",
    shortTitle: "Turnkey",
    slug: "turnkey-construction",
    href: "/turnkey-construction",
    description: "Turnkey construction coordination from scope definition to completion-ready handover.",
    details:
      "Turnkey construction in Dubai for owners who need integrated planning, procurement, civil works, fit-out coordination, authority visibility and handover under a single organized delivery pathway.",
    image: "/images/warehouse-construction-dubai.webp",
    imageAlt: "Turnkey construction Dubai warehouse site and civil works coordination",
    imageTitle: "Turnkey Construction Dubai - integrated project delivery",
    icon: Layers3,
    highlights: ["Integrated delivery route", "Procurement and execution control", "Completion-ready handover"],
    keywords: ["Turnkey Construction Dubai", "Turnkey Contractor Dubai", "Construction Company Dubai"],
    searchIntent: "Turnkey Contractor Dubai",
    whoNeeds: [
      "Owners who prefer a complete delivery pathway with fewer handover gaps between trades and stakeholders.",
      "Commercial, villa, warehouse and industrial clients who need planning, site execution and close-out aligned.",
      "Project teams seeking one coordinated route for scope, procurement, authority exposure and completion.",
    ],
    methodology: [
      "Define what turnkey means for the project, including exclusions, consultant scope, authority responsibilities and handover evidence.",
      "Coordinate procurement, site works, fit-out, specialist trades and inspections through a single practical schedule.",
      "Protect the completion phase with early snag planning, document control and operational readiness checks.",
    ],
    relatedHrefs: ["/design-build", "/main-contracting", "/project-management", "/contact"],
  }),
  makeService({
    title: "Project Management",
    shortTitle: "PM",
    slug: "project-management",
    href: "/project-management",
    description: "Construction project management support for scope, program, communication and handover control.",
    details:
      "Construction project management in Dubai for owners and consultants who need clearer scope control, program visibility, stakeholder communication, authority tracking and handover readiness.",
    image: "/images/civil-contractor-dubai-construction-site.webp",
    imageAlt: "Construction project management Dubai site coordination and progress review",
    imageTitle: "Construction Project Management Dubai - premium coordination",
    icon: ClipboardCheck,
    highlights: ["Scope and program control", "Stakeholder communication", "Handover readiness tracking"],
    keywords: ["Construction Project Management Dubai", "Project Management Contractor Dubai", "Main Contractor UAE"],
    searchIntent: "Construction Project Management Dubai",
    whoNeeds: [
      "Owners who need better visibility across drawings, authority comments, site progress and handover actions.",
      "Consultants and commercial teams coordinating multiple stakeholders, trades and decision cycles.",
      "Projects where delays, unclear responsibilities or missing close-out evidence could create business risk.",
    ],
    methodology: [
      "Convert project information into a clear action list for scope, documents, approvals, procurement, site works and handover.",
      "Maintain a communication rhythm that keeps decisions, constraints and responsibilities visible.",
      "Track completion risks early so inspections, snag closure and documentation do not become last-minute blockers.",
    ],
    relatedHrefs: ["/main-contracting", "/turnkey-construction", "/approval", "/contact"],
  }),
];

export function serviceAliasPaths(service: Service) {
  const hrefSlug = service.href.replace(/^\//, "");
  return Array.from(new Set([`/services/${service.slug}`, `/services/${hrefSlug}`]));
}

export function allServiceAliasPaths() {
  return services.flatMap((service) => serviceAliasPaths(service));
}

export function getServiceByRoutePath(path: string) {
  const cleanPath = path || "/";
  const serviceSlug = cleanPath.match(/^\/services\/([^/]+)$/)?.[1];

  if (serviceSlug) {
    return services.find((service) => service.slug === serviceSlug || service.href === `/${serviceSlug}`) ?? null;
  }

  return services.find((service) => service.href === cleanPath) ?? null;
}

export type Project = {
  title: string;
  category: string;
  location: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  summary: string;
  scopeOfWork: string[];
  timeline: string;
  outcome: string;
};

export const projects: Project[] = [];

export const heroBadges = [
  { title: "G+4", label: "Building Contracting", icon: Building2 },
  { title: "Villas", label: "Residential Construction", icon: HardHat },
  { title: "Warehouses", label: "Industrial Projects", icon: Landmark },
  { title: "Authority", label: "Approval Specialists", icon: ShieldCheck },
  { title: "Interior", label: "Fit-Out Works", icon: Sparkles },
];

export const stats = [
  { value: "Dubai", label: "Primary delivery market", icon: MapPin },
  { value: "G+4", label: "Building contracting scope", icon: Building2 },
  { value: "DM / DCD", label: "Authority coordination", icon: BadgeCheck },
  { value: "UAE", label: "Business service area", icon: Clock },
];

export const verifiedMetrics = [
  {
    value: String(services.length),
    label: "Published service lines",
    description: "Civil contracting, main contracting, villas, warehouses, fit-out, MEP coordination, approvals and project management.",
    icon: Layers3,
  },
  {
    value: String(site.serviceArea.length),
    label: "Verified service areas",
    description: site.serviceArea.join(", "),
    icon: MapPin,
  },
  {
    value: "Dubai / UAE",
    label: "Business service coverage",
    description: "Dubai-wide construction enquiries with UAE service area visibility from the verified business profile.",
    icon: Building2,
  },
  {
    value: "DM / DCD / DEWA",
    label: "Authority coordination routes",
    description: "Dubai Municipality, Dubai Civil Defence and DEWA pathways are part of the published approval content.",
    icon: BadgeCheck,
  },
];

export const complianceHighlights = [
  {
    title: "Authority approval coordination",
    description:
      "Dubai Municipality, Civil Defence, DEWA, Trakhees, DDA, RTA and landlord workflows are reviewed according to the project location, scope and consultant responsibilities.",
    icon: FileCheck2,
  },
  {
    title: "Construction standards mindset",
    description:
      "Drawings, site instructions, inspection readiness, material decisions and close-out evidence are treated as practical delivery controls.",
    icon: ShieldCheck,
  },
  {
    title: "Consultant and stakeholder rhythm",
    description:
      "Owners, consultants, site teams and authority-facing stakeholders need clear decisions, documented assumptions and visible next actions.",
    icon: Users,
  },
  {
    title: "Compliance without inflated claims",
    description:
      "Credentials, approvals, project counts and client names should be published only after they are verified by the company team.",
    icon: BadgeCheck,
  },
];

export const whyChoose = [
  { title: "Dubai authority-aware planning", icon: HardHat },
  { title: "DEWA and approval coordination", icon: BadgeCheck },
  { title: "Engineering coordination", icon: Users },
  { title: "Document-controlled delivery", icon: Clock },
  { title: "Design and build support", icon: Building2 },
  { title: "Handover readiness focus", icon: ShieldCheck },
];

export const authorities = [
  { name: "DEWA", description: "Power and water approval coordination", icon: BadgeCheck },
  { name: "Dubai Municipality", description: "Building and planning submissions", icon: Landmark },
  { name: "Dubai Civil Defence", description: "Fire and life safety approvals", icon: Flame },
  { name: "RTA", description: "Roads and transport authority interfaces", icon: Gauge },
  { name: "Trakhees", description: "Free zone and development approvals", icon: FileCheck2 },
  { name: "Dubai Development Authority", description: "Master developer and DDA workflows", icon: Building2 },
];

export const trustPillars = [
  "Scope clarity",
  "Authority readiness",
  "Engineering coordination",
  "Handover control",
];

export const localSeoBlocks = [
  {
    title: "Building contracting in Dubai",
    description:
      "Emitronix supports civil construction, structural coordination, finishing works and handover planning for villas, commercial units and warehouse projects across Dubai.",
    href: "/main-contracting",
    linkLabel: "Explore main contracting",
  },
  {
    title: "Authority approvals in Dubai",
    description:
      "Our team coordinates authority approval workflows for DM, DCD, DEWA, Trakhees and DDA requirements, helping owners and consultants keep submissions organized.",
    href: "/approval",
    linkLabel: "View approval services",
  },
  {
    title: "Project management Dubai coordination",
    description:
      "For construction and fit-out scopes, Emitronix helps align civil works with MEP interfaces, site service requirements, inspection readiness and completion documentation.",
    href: "/project-management",
    linkLabel: "Review project management",
  },
  {
    title: "Villa renovation Dubai support",
    description:
      "From layout changes and civil modifications to finishing and authority coordination, we support villa renovation projects with practical Dubai construction experience.",
    href: "/interior",
    linkLabel: "Review fit-out support",
  },
  {
    title: "Warehouse fit-out Dubai delivery",
    description:
      "Emitronix assists warehouse and industrial projects with civil works, interior upgrades, approval coordination and handover support in Dubai logistics zones.",
    href: "/warehouse-construction",
    linkLabel: "View warehouse construction",
  },
  {
    title: "Dubai Municipality approval planning",
    description:
      "For building permits, modifications and completion workflows, our approval coordination keeps DM requirements visible from early planning to close-out.",
    href: "/dubai-municipality-approval",
    linkLabel: "Dubai Municipality approvals",
  },
];

export const localSeoNotes = [
  {
    label: "Project planning note",
    title: "For commercial fit-outs",
    description:
      "Early coordination between civil, MEP and approval teams helps reduce rework during commercial fit-out projects in Dubai business districts.",
  },
  {
    label: "Authority note",
    title: "For DCD and DEWA stages",
    description:
      "Fire and utility requirements often affect drawings, inspections and handover timing, so DCD and DEWA touchpoints are planned before site execution.",
  },
  {
    label: "Construction note",
    title: "For villas and warehouses",
    description:
      "Villa renovation Dubai and warehouse construction Dubai projects benefit from clear scope control, authority visibility and practical site supervision.",
  },
];

export const homeFaqs = [
  {
    question: "What type of construction projects does Emitronix handle in Dubai?",
    answer:
      "Emitronix Contracting LLC supports civil contracting, G+4 buildings, villas, warehouses, interior fit-out and authority approval coordination for Dubai and UAE projects.",
  },
  {
    question: "Can Emitronix support Dubai authority approvals?",
    answer:
      "Yes. Emitronix coordinates approval workflows with authorities such as DEWA, Dubai Municipality, Dubai Civil Defence, RTA, Trakhees and Dubai Development Authority.",
  },
  {
    question: "How can I request a construction quote in Dubai?",
    answer:
      "You can contact Emitronix through the website contact form, phone or email with your project location, scope, service required and enquiry details.",
  },
  {
    question: "Does Emitronix provide interior fit-out services?",
    answer:
      "Yes. Emitronix provides interior fit-out support for commercial, retail, office, villa and residential projects in Dubai and the UAE.",
  },
  {
    question: "Does Emitronix support MEP contracting coordination in Dubai?",
    answer:
      "Emitronix coordinates MEP-related site interfaces, inspection readiness and documentation alongside civil construction and interior fit-out project scopes in Dubai.",
  },
  {
    question: "Can Emitronix help with villa renovation approvals in Dubai?",
    answer:
      "Yes. Emitronix supports villa renovation Dubai projects with civil works, fit-out coordination and authority approval planning where required.",
  },
  {
    question: "Do warehouse fit-out projects need authority approvals in Dubai?",
    answer:
      "Many warehouse fit-out Dubai projects require authority coordination depending on location, usage, fire safety, utilities and civil modifications. Emitronix helps organize the approval path.",
  },
];
