import type { ApprovalService } from "@/data/approvals";
import type { Service } from "@/data/site";

export type DeepCard = {
  title: string;
  description: string;
};

export type DeepLinkCard = DeepCard & {
  href: string;
  label: string;
};

export type TechnicalTopic = {
  title: string;
  summary: string;
  points: string[];
};

/**
 * Fictional scope-planning content only. These profiles are not completed
 * Emitronix projects and must never be rendered as client or outcome evidence.
 */
export type CaseProfile = {
  title: string;
  location: string;
  situation: string;
  approach: string;
  outcome: string;
};

export type DeepServiceContent = {
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  aiAnswer: string;
  buyerPromise: string;
  semanticKeywords: string[];
  locations: string[];
  assetTypes: string[];
  industries: DeepCard[];
  painPoints: DeepCard[];
  solutionBlocks: DeepCard[];
  documents: string[];
  deliverables: string[];
  authorityTouchpoints: DeepCard[];
  technicalTopics: TechnicalTopic[];
  decisionFactors: DeepCard[];
  caseProfiles: CaseProfile[];
  answerBlocks: DeepCard[];
  topicalAuthorityBlocks: DeepCard[];
  commercialIntentBlocks: DeepCard[];
  internalLinkBlocks: DeepLinkCard[];
};

type ServiceProfile = {
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  buyerPromise: string;
  buyerSearches: string[];
  locations: string[];
  assetTypes: string[];
  authorities: string[];
  documents: string[];
  deliverables: string[];
  industries: DeepCard[];
  painPoints: DeepCard[];
  solutionBlocks: DeepCard[];
  technicalTopics: TechnicalTopic[];
  decisionFactors: DeepCard[];
  caseProfiles: CaseProfile[];
};

const serviceProfiles: Record<string, ServiceProfile> = {
  "civil-contracting": {
    primaryKeyword: "Civil Contractor Dubai",
    seoTitle: "Civil Contractor Dubai | G+4, Villas, Warehouses & Commercial Works",
    metaDescription:
      "Civil contractor in Dubai for G+4 buildings, villas, warehouses, commercial and industrial projects with authority-aware planning by Emitronix.",
    buyerPromise:
      "Emitronix structures civil contracting around drawings, buildability, site logistics, authority exposure, inspection readiness and handover records so owners and consultants can make decisions with fewer blind spots.",
    buyerSearches: [
      "civil contractor in Dubai",
      "G+4 building contractor Dubai",
      "civil construction company UAE",
      "building contractor for warehouses in Dubai",
      "villa civil works contractor Dubai",
      "commercial civil contractor Dubai",
    ],
    locations: ["Dubai Investment Park", "JAFZA", "Dubai South", "Al Quoz", "Jebel Ali", "Dubai Industrial City", "Business Bay"],
    assetTypes: ["G+4 buildings", "villas", "warehouses", "commercial units", "industrial facilities", "structural modifications"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "Trakhees", "DDA", "JAFZA"],
    documents: [
      "approved architectural drawings",
      "structural drawings and calculations",
      "site plan and plot information",
      "method statements",
      "material submittals",
      "inspection requests",
      "NOC and authority comment records",
      "as-built drawings and close-out files",
    ],
    deliverables: [
      "civil execution plan",
      "site mobilization and logistics review",
      "structural and masonry work coordination",
      "inspection readiness tracker",
      "snag and handover documentation",
      "authority-facing close-out support",
    ],
    industries: [
      {
        title: "Developers and building owners",
        description: "Civil works for owners who need the structure, shell, utility interfaces and completion path planned before procurement pressure builds.",
      },
      {
        title: "Warehouse and logistics operators",
        description: "Practical support for floors, loading, access, drainage, fire-safety interfaces and authority-linked civil modifications.",
      },
      {
        title: "Villa and residential clients",
        description: "Construction, extensions and renovation works that need disciplined sequencing, neighbor-sensitive site control and finishing handover.",
      },
    ],
    painPoints: [
      {
        title: "Unclear scope boundaries",
        description: "Civil packages often fail when drawings, assumptions, exclusions and authority responsibilities are not agreed before work starts.",
      },
      {
        title: "Late authority comments",
        description: "Dubai projects can lose weeks when DM, DCD, DEWA or landlord comments are discovered after procurement or demolition.",
      },
      {
        title: "Weak interface control",
        description: "Civil, structural, MEP, waterproofing, finishing and fit-out works must be sequenced together or site teams create rework.",
      },
    ],
    solutionBlocks: [
      {
        title: "Buildability-led review",
        description: "The team reviews drawings, site access, structural assumptions, service routes and inspection touchpoints before pricing or mobilization decisions harden.",
      },
      {
        title: "Document-controlled execution",
        description: "Approved drawings, site instructions, inspection requests and handover records stay connected to the construction schedule.",
      },
      {
        title: "Authority-aware sequencing",
        description: "Civil execution is planned around the likely DM, DCD, DEWA, free-zone and landlord checkpoints for the project location.",
      },
    ],
    technicalTopics: [
      {
        title: "Structural coordination",
        summary: "Civil contracting depends on controlled interpretation of approved structural drawings, reinforcement details, concrete specifications and inspection hold points.",
        points: ["Confirm latest approved drawings before site work", "Track slab, beam, column and opening changes", "Coordinate inspections before concealment"],
      },
      {
        title: "Site logistics",
        summary: "Dubai projects need logistics planning for access, deliveries, working hours, storage, safety routes and neighboring operations.",
        points: ["Plan material movement before procurement", "Protect adjacent assets and access routes", "Maintain housekeeping for inspections"],
      },
      {
        title: "Handover evidence",
        summary: "Civil work is not complete until inspection records, snag closure, as-built information and authority-facing evidence are ready.",
        points: ["Collect records progressively", "Close snags with traceable responsibility", "Prepare completion files before final pressure"],
      },
    ],
    decisionFactors: [
      {
        title: "Drawing maturity",
        description: "Complete coordinated drawings reduce variation risk and make contractor pricing more reliable.",
      },
      {
        title: "Existing site condition",
        description: "Demolition, soil, hidden services, previous modifications and access constraints can change the civil method.",
      },
      {
        title: "Inspection density",
        description: "More authority, consultant or landlord inspections require more schedule allowance and documentation discipline.",
      },
    ],
    caseProfiles: [
      {
        title: "Warehouse civil upgrade",
        location: "Dubai logistics zone",
        situation: "A warehouse operator needed civil modifications without losing sight of utility and fire-safety interfaces.",
        approach: "The route was structured around drawings, slab and access review, authority exposure and handover documentation.",
        outcome: "The enquiry moved from a vague civil request to a decision-ready execution scope.",
      },
      {
        title: "Villa construction support",
        location: "Dubai residential community",
        situation: "A villa owner needed a contractor route that connected structure, finishes, site access and completion planning.",
        approach: "Civil, structural, procurement and handover requirements were mapped before site commitments.",
        outcome: "The project path became easier for the owner and consultant to evaluate.",
      },
      {
        title: "Commercial modification package",
        location: "Al Quoz",
        situation: "A commercial tenant required civil changes with approvals, fit-out and MEP coordination risk.",
        approach: "The scope was separated into structural, civil, authority and fit-out decision points.",
        outcome: "The team could discuss budget and timeline with clearer responsibilities.",
      },
    ],
  },
  "main-contracting": {
    primaryKeyword: "Main Contractor Dubai",
    seoTitle: "Main Contractor Dubai | Construction, Fit-Out, Approvals & Handover",
    metaDescription:
      "Main contractor in Dubai for civil construction, fit-out, approvals, procurement, site coordination and handover-ready project delivery.",
    buyerPromise:
      "Emitronix gives owners and consultants a single coordinated construction pathway where scope, procurement, authorities, site execution and close-out are managed together.",
    buyerSearches: ["main contractor Dubai", "construction company Dubai", "building contractor Dubai", "general contractor Dubai", "contractor for Dubai building works"],
    locations: ["Dubai Investment Park", "JAFZA", "Dubai South", "Business Bay", "Dubai Silicon Oasis", "Jebel Ali", "Dubai Marina"],
    assetTypes: ["commercial buildings", "warehouses", "villas", "industrial facilities", "fit-out projects", "renovation works"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "Trakhees", "RTA"],
    documents: [
      "scope matrix",
      "approved drawings",
      "consultant instructions",
      "procurement schedule",
      "authority comments",
      "inspection records",
      "variation register",
      "handover checklist",
    ],
    deliverables: [
      "single-point coordination plan",
      "trade interface schedule",
      "procurement and submittal tracker",
      "authority action register",
      "site progress rhythm",
      "completion and handover file",
    ],
    industries: [
      {
        title: "Commercial property owners",
        description: "Main contracting for offices, showrooms and retail assets where landlord, authority and handover expectations must be aligned.",
      },
      {
        title: "Industrial and logistics operators",
        description: "Coordinated delivery for warehouses and industrial spaces that involve civil works, utilities, access and fire-safety touchpoints.",
      },
      {
        title: "Private villa owners",
        description: "A single contractor route for residential works where structure, finishes, procurement and site communication matter.",
      },
    ],
    painPoints: [
      {
        title: "Too many disconnected parties",
        description: "Owners lose control when civil, MEP, fit-out, procurement and approvals are managed through separate conversations.",
      },
      {
        title: "Unclear accountability",
        description: "Main contracting value comes from making responsibilities visible before delays turn into disputes.",
      },
      {
        title: "Handover left too late",
        description: "Projects slow down when inspection records, snags, documents and completion evidence are not planned early.",
      },
    ],
    solutionBlocks: [
      {
        title: "One coordination rhythm",
        description: "Emitronix structures owner, consultant, trade and authority coordination into a practical delivery rhythm.",
      },
      {
        title: "Transparent scope control",
        description: "Assumptions, exclusions, instructions and changes are surfaced so decisions do not disappear into site noise.",
      },
      {
        title: "Completion-first mindset",
        description: "The handover route is considered from the beginning, including inspections, snags, records and operational readiness.",
      },
    ],
    technicalTopics: [
      {
        title: "Trade interface management",
        summary: "Main contracting succeeds when civil, structural, MEP, fit-out and specialist trades understand who owns each interface.",
        points: ["Map interfaces before work starts", "Track decisions that affect more than one trade", "Review sequence before materials arrive"],
      },
      {
        title: "Procurement control",
        summary: "Long-lead materials, approved alternatives and submittal timing can decide whether the project schedule is realistic.",
        points: ["Connect procurement to approvals", "Review substitutions before ordering", "Keep lead times visible to the client"],
      },
      {
        title: "Close-out planning",
        summary: "Close-out is a managed workstream, not a final-week activity.",
        points: ["Collect warranties and records progressively", "Plan inspections in the schedule", "Assign snag responsibility clearly"],
      },
    ],
    decisionFactors: [
      {
        title: "Contract structure",
        description: "Owners should know which items are included, excluded, provisional or consultant-led before comparing prices.",
      },
      {
        title: "Authority exposure",
        description: "Dubai authority requirements can affect drawings, procurement, inspections and final handover.",
      },
      {
        title: "Stakeholder decision speed",
        description: "A main contractor can organize decisions, but owner and consultant response time still affects program.",
      },
    ],
    caseProfiles: [
      {
        title: "Commercial building coordination",
        location: "Business Bay",
        situation: "A project needed a single route for civil works, fit-out preparation and authority-linked documentation.",
        approach: "The delivery path was split into scope, procurement, approvals, inspections and handover actions.",
        outcome: "Stakeholders gained a clearer way to evaluate schedule and responsibilities.",
      },
      {
        title: "Industrial facility delivery route",
        location: "Dubai Industrial City",
        situation: "An operator needed contractor coordination across civil, MEP and utility interfaces.",
        approach: "The project was reviewed around operating needs, site logistics and technical handover requirements.",
        outcome: "The enquiry became a practical main contracting package instead of separate trade requests.",
      },
      {
        title: "Villa project execution path",
        location: "Dubai",
        situation: "A private owner wanted fewer coordination gaps between structure, finishes and handover.",
        approach: "Scope, finishes, procurement and authority touchpoints were mapped into a single plan.",
        outcome: "The owner could discuss the project through one organized contractor channel.",
      },
    ],
  },
  "warehouse-construction": {
    primaryKeyword: "Warehouse Construction Dubai",
    seoTitle: "Warehouse Construction Dubai | Logistics Warehouse Contractor",
    metaDescription:
      "Warehouse construction in Dubai for logistics, storage and industrial facilities with civil works, DCD, DEWA, slab, loading and handover planning.",
    buyerPromise:
      "Emitronix helps warehouse owners and operators plan construction around use, loading, slab performance, access, utilities, fire-safety interfaces and operational handover.",
    buyerSearches: ["warehouse construction Dubai", "warehouse contractor Dubai", "logistics warehouse construction UAE", "warehouse civil contractor Dubai", "industrial warehouse contractor"],
    locations: ["Dubai Investment Park", "JAFZA", "Dubai South", "Jebel Ali", "Al Quoz", "Dubai Industrial City", "Dubai Silicon Oasis"],
    assetTypes: ["storage warehouses", "logistics hubs", "cold storage support areas", "light industrial warehouses", "workshop buildings", "warehouse offices"],
    authorities: ["Dubai Civil Defence", "DEWA", "Dubai Municipality", "Trakhees", "JAFZA", "Dubai South"],
    documents: [
      "warehouse layout",
      "structural drawings",
      "floor loading requirements",
      "fire and life safety drawings",
      "DEWA load information",
      "drainage and external works plan",
      "racking or equipment details",
      "completion and inspection records",
    ],
    deliverables: [
      "warehouse buildability review",
      "slab and loading coordination",
      "access and logistics planning",
      "fire-safety and utility coordination",
      "office block and fit-out interface review",
      "handover readiness package",
    ],
    industries: [
      {
        title: "Logistics and distribution",
        description: "Warehouse delivery for storage, loading, dispatch and fleet movement needs in Dubai logistics zones.",
      },
      {
        title: "Manufacturing and light industrial",
        description: "Facilities requiring equipment layouts, utility capacity, drainage, slab performance and operational safety planning.",
      },
      {
        title: "Retail and e-commerce storage",
        description: "Warehouse spaces that need practical access, office areas, racking coordination and completion documents.",
      },
    ],
    painPoints: [
      {
        title: "Operational use is unclear",
        description: "A warehouse cannot be planned well until racking, loading, storage type, utilities, vehicle access and occupancy are understood.",
      },
      {
        title: "Fire-safety surprises",
        description: "DCD requirements can affect layout, exits, access, systems and handover if they are not considered early.",
      },
      {
        title: "Underestimated utility needs",
        description: "DEWA load, drainage, water and service routes can influence both approval timing and construction sequence.",
      },
    ],
    solutionBlocks: [
      {
        title: "Operational brief first",
        description: "The project is reviewed around storage use, movement, loading, future expansion and authority exposure.",
      },
      {
        title: "Fire and utility coordination",
        description: "DCD and DEWA touchpoints stay visible while civil, structural and MEP decisions are made.",
      },
      {
        title: "Handover for real use",
        description: "Completion planning focuses on practical operation: access, safety, snags, documents and fit-out interfaces.",
      },
    ],
    technicalTopics: [
      {
        title: "Slab performance",
        summary: "Warehouse slabs must be considered against racking, forklift movement, equipment loads, joints and future operating use.",
        points: ["Clarify imposed loads early", "Coordinate joints and traffic routes", "Check special equipment requirements"],
      },
      {
        title: "Fire access and life safety",
        summary: "DCD-facing decisions can affect warehouse layout, access roads, exits, fire compartments and inspection readiness.",
        points: ["Review fire access before layout freezes", "Coordinate life safety drawings", "Prepare site for inspection milestones"],
      },
      {
        title: "Utility interfaces",
        summary: "Power, water, drainage and service routing can create delays when they are discovered after construction sequencing.",
        points: ["Review DEWA needs with intended use", "Coordinate service corridors", "Track utility documents and NOCs"],
      },
    ],
    decisionFactors: [
      {
        title: "Location jurisdiction",
        description: "DIP, JAFZA, Dubai South, Jebel Ali and other zones can carry different landlord and authority workflows.",
      },
      {
        title: "Racking and loading",
        description: "Storage method and equipment use can affect slab design, fire strategy, power needs and handover requirements.",
      },
      {
        title: "Business continuity",
        description: "Projects inside operating facilities need phasing, access separation and safety controls.",
      },
    ],
    caseProfiles: [
      {
        title: "Logistics warehouse planning",
        location: "Dubai South",
        situation: "An operator needed to evaluate a warehouse construction path for storage, loading and authority readiness.",
        approach: "The enquiry was reviewed around layout, slab loading, fire access, utilities and handover deliverables.",
        outcome: "The owner gained a clearer decision route before pricing and mobilization.",
      },
      {
        title: "Industrial storage modification",
        location: "Jebel Ali",
        situation: "A warehouse needed civil changes while preserving access and business operations.",
        approach: "Civil scope, DCD exposure, DEWA interfaces and site phasing were separated into practical workstreams.",
        outcome: "The project team could assess risk and schedule with better visibility.",
      },
      {
        title: "Warehouse office integration",
        location: "DIP",
        situation: "A storage facility required office and support spaces connected to the main warehouse works.",
        approach: "Fit-out, MEP, authority and handover needs were planned alongside the civil package.",
        outcome: "The scope became easier to coordinate across stakeholders.",
      },
    ],
  },
  "industrial-buildings": {
    primaryKeyword: "Industrial Building Contractor Dubai",
    seoTitle: "Industrial Building Contractor Dubai | Factory & Workshop",
    metaDescription:
      "Industrial building contractor in Dubai for factories, workshops, logistics assets and operational facilities with civil, structural, DEWA and DCD coordination.",
    buyerPromise:
      "Emitronix plans industrial building work around operations, equipment, utilities, fire safety, structure, access and documentation so the facility can move toward safe practical use.",
    buyerSearches: ["industrial building contractor Dubai", "factory construction UAE", "workshop contractor Dubai", "industrial contractor Dubai", "manufacturing plant construction Dubai"],
    locations: ["Dubai Industrial City", "JAFZA", "Dubai Investment Park", "Jebel Ali", "Dubai South", "Al Quoz", "Dubai Silicon Oasis"],
    assetTypes: ["factories", "workshops", "manufacturing plants", "logistics buildings", "service yards", "utility-heavy facilities"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "JAFZA", "Trakhees", "Dubai South"],
    documents: [
      "process or equipment layout",
      "structural drawings",
      "utility load requirements",
      "fire and life safety drawings",
      "method statements",
      "equipment foundation details",
      "authority comments",
      "handover and inspection records",
    ],
    deliverables: [
      "industrial scope review",
      "equipment and utility interface map",
      "civil and structural execution plan",
      "fire-safety readiness plan",
      "inspection and close-out tracker",
      "operations handover checklist",
    ],
    industries: [
      {
        title: "Manufacturing",
        description: "Factory spaces requiring equipment foundations, utility routing, ventilation coordination and durable civil finishes.",
      },
      {
        title: "Automotive and workshops",
        description: "Workshops that need drainage, floor performance, access planning, safety zones and practical maintenance routes.",
      },
      {
        title: "Logistics and processing",
        description: "Industrial facilities that combine storage, process areas, offices, loading zones and authority-facing utilities.",
      },
    ],
    painPoints: [
      {
        title: "Equipment needs arrive late",
        description: "Industrial projects fail when equipment loads, service routes and maintenance clearance are added after civil work starts.",
      },
      {
        title: "Utilities are underestimated",
        description: "Power, water, drainage, ventilation and specialist services can affect approvals, procurement and construction sequence.",
      },
      {
        title: "Operations and construction conflict",
        description: "Working inside or near live facilities requires safe phasing, access control and clear stakeholder communication.",
      },
    ],
    solutionBlocks: [
      {
        title: "Operational planning",
        description: "The build is reviewed against process flow, equipment, loading, maintenance, utilities and future expansion.",
      },
      {
        title: "Engineering interface control",
        description: "Civil, structural, MEP, fire safety and authority requirements are treated as connected decisions.",
      },
      {
        title: "Practical handover",
        description: "Completion is planned around safe operation, inspections, snags, records and owner training requirements where applicable.",
      },
    ],
    technicalTopics: [
      {
        title: "Equipment foundations",
        summary: "Industrial equipment can require specific foundations, vibration consideration, anchoring and service access.",
        points: ["Collect equipment data early", "Coordinate with structural drawings", "Protect maintenance clearances"],
      },
      {
        title: "Utility capacity",
        summary: "DEWA and internal service planning should reflect the intended industrial process, not only the building area.",
        points: ["Confirm connected loads", "Review cable and service routes", "Coordinate future expansion allowances"],
      },
      {
        title: "Fire and operational safety",
        summary: "Industrial use can affect fire strategy, exits, access, material storage and inspection preparation.",
        points: ["Clarify process risks", "Coordinate DCD-facing drawings", "Maintain inspection evidence"],
      },
    ],
    decisionFactors: [
      {
        title: "Process requirements",
        description: "Manufacturing or workshop use can change civil, structural, MEP and authority requirements.",
      },
      {
        title: "Utility availability",
        description: "Existing utility capacity and authority routes can shape both timeline and cost.",
      },
      {
        title: "Expansion planning",
        description: "Future production or storage growth should be considered before structural and utility decisions are fixed.",
      },
    ],
    caseProfiles: [
      {
        title: "Factory utility coordination",
        location: "Dubai Industrial City",
        situation: "A manufacturing enquiry required clarity around equipment, power, drainage and civil works.",
        approach: "The team mapped process needs, authority exposure and construction interfaces before execution planning.",
        outcome: "The owner could evaluate the scope with stronger technical visibility.",
      },
      {
        title: "Workshop building upgrade",
        location: "Al Quoz",
        situation: "A workshop required civil changes while maintaining safe access and operational continuity.",
        approach: "Scope was planned around phasing, floor performance, drainage and approval-sensitive changes.",
        outcome: "The project route became clearer for the tenant and consultant.",
      },
      {
        title: "Industrial logistics facility",
        location: "JAFZA",
        situation: "A logistics asset needed construction coordination across storage, office and utility interfaces.",
        approach: "Civil, fire-safety, DEWA and handover items were tracked together.",
        outcome: "The enquiry moved toward a coordinated industrial package.",
      },
    ],
  },
  "commercial-buildings": {
    primaryKeyword: "Commercial Building Contractor Dubai",
    seoTitle: "Commercial Building Contractor Dubai | Offices, Showrooms & Retail",
    metaDescription:
      "Commercial building contractor in Dubai for offices, showrooms, retail buildings and business facilities with approvals, fit-out and handover planning.",
    buyerPromise:
      "Emitronix supports commercial building projects by connecting user experience, landlord expectations, authority requirements, civil execution, fit-out readiness and completion documents.",
    buyerSearches: ["commercial building contractor Dubai", "commercial construction Dubai", "office building contractor Dubai", "showroom contractor Dubai", "retail building contractor Dubai"],
    locations: ["Business Bay", "Dubai Marina", "Al Quoz", "Dubai Silicon Oasis", "Jebel Ali", "Dubai South", "Dubai Investment Park"],
    assetTypes: ["office buildings", "showrooms", "retail units", "mixed-use business spaces", "commercial shells", "tenant-ready units"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "DIFC", "RTA"],
    documents: [
      "architectural layouts",
      "structural drawings",
      "MEP coordination drawings",
      "fire and life safety drawings",
      "landlord requirements",
      "authority comments",
      "material submittals",
      "handover and occupancy documents",
    ],
    deliverables: [
      "commercial scope definition",
      "tenant and landlord coordination path",
      "civil and fit-out interface review",
      "authority and inspection tracker",
      "finish and material control",
      "handover readiness package",
    ],
    industries: [
      {
        title: "Office and business buildings",
        description: "Spaces that need professional finishes, service reliability, access planning and landlord-friendly delivery.",
      },
      {
        title: "Retail and showroom assets",
        description: "Commercial environments where customer movement, facade, services, signage and handover timing affect value.",
      },
      {
        title: "Mixed commercial properties",
        description: "Projects combining shell works, tenant preparation, fit-out interfaces and authority approvals.",
      },
    ],
    painPoints: [
      {
        title: "Tenant readiness is unclear",
        description: "Commercial buildings lose value when shell, MEP, approvals and fit-out readiness are not aligned.",
      },
      {
        title: "Customer-facing quality pressure",
        description: "Retail and showroom projects require clean finishes, safe access and predictable handover quality.",
      },
      {
        title: "Multiple stakeholder expectations",
        description: "Owner, tenant, landlord, consultant and authority priorities must be connected early.",
      },
    ],
    solutionBlocks: [
      {
        title: "Commercial use mapping",
        description: "The scope is reviewed around occupancy, customer flow, services, access, fire safety and fit-out readiness.",
      },
      {
        title: "Stakeholder coordination",
        description: "Landlord, tenant, consultant and authority requirements are tracked so changes do not surprise site teams.",
      },
      {
        title: "Handover-ready finish control",
        description: "Finishes, snags, documentation and inspection readiness are treated as value drivers.",
      },
    ],
    technicalTopics: [
      {
        title: "Fit-out readiness",
        summary: "Commercial shells should be reviewed for MEP provisions, access, fire safety, floor condition and tenant work interfaces.",
        points: ["Clarify tenant requirements", "Coordinate services before closing finishes", "Protect future modification routes"],
      },
      {
        title: "Facade and access considerations",
        summary: "Showrooms and commercial units can be affected by access, signage, facade, parking and RTA or landlord requirements.",
        points: ["Review external interfaces early", "Coordinate authority-sensitive changes", "Keep access routes safe"],
      },
      {
        title: "Quality and snag control",
        summary: "Commercial handover depends on visible quality control and rapid closure of user-facing defects.",
        points: ["Set finish benchmarks", "Record defects clearly", "Close snags before occupancy pressure"],
      },
    ],
    decisionFactors: [
      {
        title: "Tenant use",
        description: "Office, retail, showroom and hospitality-related uses can each change authority and MEP requirements.",
      },
      {
        title: "Landlord rules",
        description: "Building management requirements can affect working hours, materials, access and approvals.",
      },
      {
        title: "Handover date",
        description: "Commercial opening dates require realistic sequencing for approvals, inspections, finishes and snags.",
      },
    ],
    caseProfiles: [
      {
        title: "Showroom preparation",
        location: "Al Quoz",
        situation: "A showroom enquiry needed civil, facade, services and handover coordination.",
        approach: "The project route was mapped around customer-facing quality, authority exposure and fit-out interfaces.",
        outcome: "The client gained a clearer path for budget and schedule discussion.",
      },
      {
        title: "Office building upgrade",
        location: "Business Bay",
        situation: "A commercial building required planned upgrades while preserving tenant expectations.",
        approach: "Civil, MEP, landlord and close-out actions were organized together.",
        outcome: "The scope became easier to evaluate with stakeholders.",
      },
      {
        title: "Retail shell coordination",
        location: "Dubai Marina",
        situation: "A retail unit needed to become ready for fit-out and inspection stages.",
        approach: "Fit-out readiness, services, fire safety and handover evidence were reviewed early.",
        outcome: "The tenant preparation path became more predictable.",
      },
    ],
  },
  "villa-construction": {
    primaryKeyword: "Villa Construction Dubai",
    seoTitle: "Villa Construction Dubai | Villa Contractor, Renovation & Extensions",
    metaDescription:
      "Villa construction in Dubai for new villas, extensions and renovations with civil works, finishes, authority awareness and handover coordination.",
    buyerPromise:
      "Emitronix helps villa owners turn drawings, finishes, structural changes, authority exposure and handover expectations into a clear residential construction pathway.",
    buyerSearches: ["villa construction Dubai", "villa contractor Dubai", "villa renovation Dubai", "luxury villa contractor Dubai", "villa extension contractor Dubai"],
    locations: ["Dubai Marina", "Business Bay", "Dubai Silicon Oasis", "Jumeirah", "Al Quoz", "Dubai South", "Dubai Investment Park"],
    assetTypes: ["new villas", "villa renovations", "extensions", "majlis upgrades", "landscape-adjacent civil works", "structural modifications"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "community management", "landlord or developer NOCs"],
    documents: [
      "architectural drawings",
      "structural drawings",
      "finish schedules",
      "MEP layouts",
      "authority or community NOCs",
      "site survey photographs",
      "material selections",
      "handover and snag records",
    ],
    deliverables: [
      "villa scope review",
      "residential site logistics plan",
      "civil and structural execution path",
      "finish procurement tracker",
      "inspection and snag plan",
      "owner handover checklist",
    ],
    industries: [
      {
        title: "Private homeowners",
        description: "Villa construction and renovation support for owners who need clear communication and finish-quality control.",
      },
      {
        title: "Residential consultants",
        description: "Execution coordination for consultants managing drawings, approvals, structural changes and owner decisions.",
      },
      {
        title: "Property investors",
        description: "Upgrade and renovation pathways that protect asset value through disciplined scope and handover planning.",
      },
    ],
    painPoints: [
      {
        title: "Finish decisions come late",
        description: "Villa programs are often delayed when materials, fixtures and finishes are selected after procurement windows close.",
      },
      {
        title: "Owner expectations are not translated",
        description: "Lifestyle preferences must become drawings, specifications, budgets and quality benchmarks.",
      },
      {
        title: "Site disruption affects neighbors",
        description: "Residential works need access planning, housekeeping and careful sequencing in occupied communities.",
      },
    ],
    solutionBlocks: [
      {
        title: "Residential brief clarity",
        description: "The project is reviewed around lifestyle use, drawings, finishes, structural changes, approvals and handover expectations.",
      },
      {
        title: "Quality and procurement control",
        description: "Material selections, mock-ups, procurement and finish benchmarks are kept visible before site pressure builds.",
      },
      {
        title: "Owner-friendly communication",
        description: "The delivery rhythm is structured so private owners understand decisions, constraints and next steps.",
      },
    ],
    technicalTopics: [
      {
        title: "Extensions and structural changes",
        summary: "Villa extensions require careful review of structure, load paths, authority exposure, services and finish integration.",
        points: ["Confirm approved drawings", "Review service relocations", "Plan temporary protection"],
      },
      {
        title: "Finishing coordination",
        summary: "Luxury villa outcomes depend on early finish decisions, procurement tracking and installation sequencing.",
        points: ["Freeze key selections early", "Check lead times", "Use clear snag standards"],
      },
      {
        title: "Occupied-community logistics",
        summary: "Access, noise, dust, storage and safety controls matter more in residential communities.",
        points: ["Plan deliveries and working hours", "Protect neighboring areas", "Maintain clean access routes"],
      },
    ],
    decisionFactors: [
      {
        title: "Design completeness",
        description: "Villa owners should align layout, finishes and MEP choices before comparing contractor prices.",
      },
      {
        title: "Community requirements",
        description: "Developer or community NOCs can affect access, working hours and allowed modifications.",
      },
      {
        title: "Finish level",
        description: "Material choices and custom details strongly affect budget, procurement and installation sequence.",
      },
    ],
    caseProfiles: [
      {
        title: "Villa renovation planning",
        location: "Dubai residential community",
        situation: "A homeowner wanted to upgrade spaces while avoiding unclear scope and late material decisions.",
        approach: "The route was mapped around drawings, finishes, procurement and community-sensitive logistics.",
        outcome: "The owner gained a clearer framework for budget, sequence and handover.",
      },
      {
        title: "Villa extension review",
        location: "Dubai Silicon Oasis",
        situation: "A villa extension needed structural and authority awareness before site work.",
        approach: "Existing conditions, drawings, service routes and approval exposure were reviewed together.",
        outcome: "The project could move forward with a more realistic scope discussion.",
      },
      {
        title: "Premium finish coordination",
        location: "Dubai Marina area",
        situation: "A residential upgrade required high finish standards and owner-friendly decision tracking.",
        approach: "Material selections, installation sequence and snag expectations were made visible early.",
        outcome: "The handover path became easier for the owner to understand.",
      },
    ],
  },
  "interior-fit-out": {
    primaryKeyword: "Interior Fit-Out Contractor Dubai",
    seoTitle: "Interior Fit-Out Contractor Dubai | Office, Retail, Villa & Commercial",
    metaDescription:
      "Interior fit-out contractor in Dubai for offices, retail, restaurants, villas and commercial spaces with landlord, DCD, MEP and handover coordination.",
    buyerPromise:
      "Emitronix coordinates interior fit-out work around design intent, landlord rules, MEP interfaces, fire-safety requirements, procurement and handover quality.",
    buyerSearches: ["interior fit-out contractor Dubai", "commercial fit-out Dubai", "office fit-out contractor Dubai", "retail fit-out Dubai", "villa interior contractor Dubai"],
    locations: ["Business Bay", "Dubai Marina", "Al Quoz", "Dubai Silicon Oasis", "DIFC", "JLT", "Dubai Investment Park"],
    assetTypes: ["offices", "retail shops", "restaurants", "showrooms", "villas", "commercial units"],
    authorities: ["Dubai Civil Defence", "Dubai Municipality", "DDA", "DIFC", "Concordia-DMCC", "landlord or mall management"],
    documents: [
      "existing and proposed layouts",
      "reflected ceiling plans",
      "MEP drawings",
      "fire and life safety drawings",
      "material schedules",
      "landlord NOC",
      "method statement",
      "snag and handover checklist",
    ],
    deliverables: [
      "fit-out scope review",
      "design and buildability coordination",
      "landlord and authority action tracker",
      "MEP and fire-safety interface plan",
      "finish procurement tracker",
      "handover and snag package",
    ],
    industries: [
      {
        title: "Offices and corporate spaces",
        description: "Fit-out support for workplaces that need reliable services, finish quality and landlord approval alignment.",
      },
      {
        title: "Retail and hospitality",
        description: "Commercial fit-outs where opening date, brand presentation, fire safety and customer flow matter.",
      },
      {
        title: "Villas and residential interiors",
        description: "Residential interior delivery that connects finishes, MEP, carpentry, lighting and owner handover.",
      },
    ],
    painPoints: [
      {
        title: "Design does not match site reality",
        description: "Fit-out delays happen when ceiling heights, services, access and landlord rules are not checked against the design.",
      },
      {
        title: "MEP and fire safety are late",
        description: "Interior work can be reworked if MEP routes, fire alarms, sprinklers, exits and approvals are not coordinated early.",
      },
      {
        title: "Opening date pressure",
        description: "Retail and office clients need a realistic path for approvals, materials, installation, snagging and cleaning.",
      },
    ],
    solutionBlocks: [
      {
        title: "Buildability review",
        description: "Design intent is checked against existing conditions, landlord rules, services and authority touchpoints.",
      },
      {
        title: "Finish and MEP sequencing",
        description: "Ceilings, flooring, partitions, lighting, HVAC, fire systems and specialist works are sequenced before installation.",
      },
      {
        title: "Opening-ready handover",
        description: "Snagging, cleaning, documents and landlord close-out are planned as part of the fit-out program.",
      },
    ],
    technicalTopics: [
      {
        title: "MEP coordination",
        summary: "Fit-out work depends on HVAC, lighting, power, data, plumbing and fire-safety services matching the final layout.",
        points: ["Review ceiling and service zones", "Coordinate access panels", "Check authority-sensitive changes"],
      },
      {
        title: "Material submittals",
        summary: "Commercial interiors often need material, finish and system approvals from landlords, consultants or authorities.",
        points: ["Track finish approvals", "Confirm fire-rated materials where required", "Avoid late substitutions"],
      },
      {
        title: "Snag-free handover",
        summary: "Fit-out handover quality depends on early benchmarks, protection, cleaning and systematic snag closure.",
        points: ["Set quality samples", "Protect completed areas", "Close defects before occupancy"],
      },
    ],
    decisionFactors: [
      {
        title: "Landlord approval route",
        description: "Mall, tower, free-zone or community requirements can change the documents and inspections needed.",
      },
      {
        title: "Material lead times",
        description: "Imported finishes, custom joinery and specialist systems can drive the program more than site labor.",
      },
      {
        title: "MEP complexity",
        description: "Restaurants, clinics, showrooms and dense offices usually need more coordination than simple layouts.",
      },
    ],
    caseProfiles: [
      {
        title: "Office fit-out coordination",
        location: "Business Bay",
        situation: "A company needed a practical route from layout approval to workplace handover.",
        approach: "Landlord rules, MEP, finishes, authority exposure and snags were planned together.",
        outcome: "The fit-out scope became clearer for budget and opening-date decisions.",
      },
      {
        title: "Retail unit preparation",
        location: "Dubai Marina",
        situation: "A retail tenant needed fit-out planning with fire-safety and landlord close-out visibility.",
        approach: "The process mapped design, authority touchpoints, procurement and handover quality.",
        outcome: "The tenant could evaluate the route before committing to site dates.",
      },
      {
        title: "Villa interior upgrade",
        location: "Dubai",
        situation: "A homeowner required coordinated finishes, lighting and residential quality control.",
        approach: "Material selections, MEP interfaces and snag standards were brought into one plan.",
        outcome: "The owner received a more predictable handover path.",
      },
    ],
  },
  "building-renovation": {
    primaryKeyword: "Building Renovation Dubai",
    seoTitle: "Building Renovation Dubai | Villa, Commercial & Warehouse Renovation",
    metaDescription:
      "Building renovation in Dubai for villas, offices, warehouses and commercial properties with civil modifications, approvals, fit-out and handover planning.",
    buyerPromise:
      "Emitronix treats renovation as controlled change management: existing conditions, hidden risks, approvals, demolition, civil works, fit-out and handover are planned together.",
    buyerSearches: ["building renovation Dubai", "renovation contractor Dubai", "villa renovation Dubai", "commercial renovation Dubai", "warehouse renovation contractor Dubai"],
    locations: ["Al Quoz", "Business Bay", "Dubai Marina", "Dubai Investment Park", "JAFZA", "Dubai South", "Dubai Silicon Oasis"],
    assetTypes: ["villas", "offices", "warehouses", "retail units", "commercial buildings", "industrial spaces"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "Trakhees", "building management"],
    documents: [
      "existing drawings",
      "proposed renovation layouts",
      "site condition photographs",
      "structural modification details",
      "MEP relocation drawings",
      "authority or landlord NOCs",
      "demolition method statement",
      "snag and completion records",
    ],
    deliverables: [
      "existing condition survey",
      "renovation risk register",
      "demolition and protection plan",
      "civil and MEP modification route",
      "authority and landlord tracker",
      "completion handover checklist",
    ],
    industries: [
      {
        title: "Villa owners",
        description: "Residential upgrades, extensions, layout changes and finish improvements with authority-aware planning.",
      },
      {
        title: "Commercial landlords and tenants",
        description: "Office, retail and showroom renovations that need clean phasing and landlord close-out.",
      },
      {
        title: "Warehouse and industrial operators",
        description: "Operational upgrades that require safety, access, fire-safety and utility interface control.",
      },
    ],
    painPoints: [
      {
        title: "Hidden conditions",
        description: "Existing buildings often reveal unknown services, structural changes or poor previous work after demolition begins.",
      },
      {
        title: "Approval-sensitive modifications",
        description: "Structural, fire-safety, MEP or use changes may require authority or landlord coordination.",
      },
      {
        title: "Business disruption",
        description: "Renovation inside occupied or operational assets needs phasing, protection and communication.",
      },
    ],
    solutionBlocks: [
      {
        title: "Survey before commitment",
        description: "Existing conditions, drawings, services and authority exposure are reviewed before the renovation route is agreed.",
      },
      {
        title: "Controlled demolition and protection",
        description: "Demolition, temporary works, protection and housekeeping are planned to reduce rework and disruption.",
      },
      {
        title: "Modification close-out",
        description: "Civil, structural, MEP and authority-sensitive changes are tracked until snags and documents are closed.",
      },
    ],
    technicalTopics: [
      {
        title: "Existing services",
        summary: "Renovations must identify live electrical, plumbing, HVAC, fire-safety and data services before demolition.",
        points: ["Review as-built information", "Survey before cutting or coring", "Plan service shutdowns"],
      },
      {
        title: "Structural modifications",
        summary: "Openings, extensions and strengthening works require engineering-led review and controlled sequencing.",
        points: ["Confirm structural drawings", "Coordinate temporary support where needed", "Keep inspections visible"],
      },
      {
        title: "Phased renovation",
        summary: "Occupied villas, offices and warehouses may need phased work to protect operations and access.",
        points: ["Separate work zones", "Plan deliveries and waste removal", "Communicate constraints early"],
      },
    ],
    decisionFactors: [
      {
        title: "Survey quality",
        description: "Better existing-condition information reduces variation risk and protects the schedule.",
      },
      {
        title: "Scope split",
        description: "Cosmetic, civil, structural, MEP and authority-sensitive items should be separated before pricing.",
      },
      {
        title: "Occupancy status",
        description: "Live buildings require phasing, safety planning and often more careful stakeholder coordination.",
      },
    ],
    caseProfiles: [
      {
        title: "Commercial renovation package",
        location: "Business Bay",
        situation: "A commercial unit required renovation planning with landlord and MEP constraints.",
        approach: "Existing conditions, drawings, authority exposure and handover needs were reviewed before site work.",
        outcome: "The tenant had a clearer route for approvals, execution and close-out.",
      },
      {
        title: "Villa upgrade",
        location: "Dubai",
        situation: "A homeowner needed layout and finish changes while protecting occupied-community conditions.",
        approach: "The project was phased around access, demolition, procurement and snag control.",
        outcome: "The owner could understand likely risks before committing.",
      },
      {
        title: "Warehouse renovation",
        location: "DIP",
        situation: "An operator required civil changes without interrupting core logistics planning.",
        approach: "The scope was split into operational, authority, MEP and handover items.",
        outcome: "The project could be discussed as a controlled renovation rather than isolated tasks.",
      },
    ],
  },
  "structural-works": {
    primaryKeyword: "Structural Works Dubai",
    seoTitle: "Structural Works Dubai | Concrete, Steel & Strengthening",
    metaDescription:
      "Structural works in Dubai for concrete, steel, strengthening, openings and modifications with engineering-led execution and inspection readiness.",
    buyerPromise:
      "Emitronix approaches structural works with controlled drawings, method sequencing, material coordination, inspection visibility and authority-aware documentation.",
    buyerSearches: ["structural works Dubai", "structural contractor Dubai", "concrete works Dubai", "steel structure contractor Dubai", "structural modification contractor Dubai"],
    locations: ["Al Quoz", "Dubai Investment Park", "JAFZA", "Dubai South", "Business Bay", "Dubai Silicon Oasis", "Jebel Ali"],
    assetTypes: ["concrete structures", "steel structures", "villa modifications", "warehouse strengthening", "openings and supports", "industrial foundations"],
    authorities: ["Dubai Municipality", "Trakhees", "DDA", "JAFZA", "Dubai Civil Defence", "consultant inspections"],
    documents: [
      "approved structural drawings",
      "structural calculations",
      "method statements",
      "material submittals",
      "inspection and test plans",
      "temporary works notes",
      "consultant instructions",
      "as-built and completion records",
    ],
    deliverables: [
      "structural scope review",
      "temporary works and sequencing plan",
      "concrete or steel execution coordination",
      "inspection request tracker",
      "material and test record control",
      "structural handover file",
    ],
    industries: [
      {
        title: "Building owners",
        description: "Structural works for buildings, villas and commercial assets requiring safe execution and engineering visibility.",
      },
      {
        title: "Industrial and warehouse operators",
        description: "Foundations, slab, steel, strengthening and modification scopes aligned with operating needs.",
      },
      {
        title: "Consultants",
        description: "Execution support for consultant-led structural drawings, inspections and close-out records.",
      },
    ],
    painPoints: [
      {
        title: "Work starts from unclear drawings",
        description: "Structural work should not proceed from outdated drawings, verbal instructions or unresolved design questions.",
      },
      {
        title: "Temporary works are missed",
        description: "Openings, demolition, propping and modifications need safe sequencing and engineering awareness.",
      },
      {
        title: "Inspection evidence is incomplete",
        description: "Structural works can be delayed when reinforcement, concrete, steel or testing records are not captured at the right time.",
      },
    ],
    solutionBlocks: [
      {
        title: "Drawing-led execution",
        description: "Approved structural information, site condition and consultant instructions are reviewed before work starts.",
      },
      {
        title: "Controlled sequence",
        description: "Demolition, propping, reinforcement, steel, concrete and testing are planned around safety and inspection points.",
      },
      {
        title: "Traceable records",
        description: "Inspection requests, material records, test reports and as-built information are prepared for close-out.",
      },
    ],
    technicalTopics: [
      {
        title: "Concrete works",
        summary: "Concrete quality depends on reinforcement checks, formwork, mix coordination, placement method, curing and test records.",
        points: ["Inspect reinforcement before pouring", "Coordinate concrete supply and access", "Track cube tests and curing"],
      },
      {
        title: "Steel works",
        summary: "Steel structure work requires shop drawings, connection details, lifting planning, coating and inspection readiness.",
        points: ["Review connection details", "Plan lifting and access", "Track fabrication and coating records"],
      },
      {
        title: "Structural modifications",
        summary: "Openings, strengthening and changes to existing buildings need careful verification of existing conditions.",
        points: ["Confirm load paths", "Survey hidden services", "Coordinate temporary supports"],
      },
    ],
    decisionFactors: [
      {
        title: "Engineering approval",
        description: "Structural scopes need clear consultant or authority-accepted drawings before execution decisions are made.",
      },
      {
        title: "Access and safety",
        description: "Lifting, propping, demolition and concrete access can strongly affect method and duration.",
      },
      {
        title: "Testing requirements",
        description: "Material tests and inspection hold points should be planned before the schedule is committed.",
      },
    ],
    caseProfiles: [
      {
        title: "Warehouse slab and support review",
        location: "Jebel Ali",
        situation: "A warehouse needed structural consideration for changed storage and equipment use.",
        approach: "The enquiry was reviewed around loading, drawings, testing and authority-sensitive changes.",
        outcome: "The owner could evaluate whether strengthening or modification was required.",
      },
      {
        title: "Villa structural modification",
        location: "Dubai",
        situation: "A villa renovation included openings and structural changes.",
        approach: "Drawings, existing condition, temporary works and inspection touchpoints were mapped.",
        outcome: "The owner and consultant gained a clearer execution path.",
      },
      {
        title: "Commercial opening coordination",
        location: "Al Quoz",
        situation: "A commercial unit needed a structural opening coordinated with fit-out and authority exposure.",
        approach: "Engineering, demolition, propping and close-out records were planned together.",
        outcome: "The modification could be discussed with fewer hidden assumptions.",
      },
    ],
  },
  "design-build": {
    primaryKeyword: "Design and Build Dubai",
    seoTitle: "Design and Build Dubai | Concept, Approvals, Construction & Handover",
    metaDescription:
      "Design and build contractor in Dubai connecting concept, drawings, approvals, cost planning, construction coordination and handover readiness.",
    buyerPromise:
      "Emitronix helps owners connect design intent with buildability, authority exposure, budget decisions, procurement and site execution before the project becomes fragmented.",
    buyerSearches: ["design and build Dubai", "design build contractor Dubai", "turnkey design and build Dubai", "design and build villa Dubai", "commercial design build contractor"],
    locations: ["Business Bay", "Dubai Marina", "Dubai South", "Dubai Investment Park", "Al Quoz", "Dubai Silicon Oasis", "JAFZA"],
    assetTypes: ["villas", "offices", "warehouses", "commercial spaces", "industrial facilities", "renovations"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "Trakhees", "landlord or community management"],
    documents: [
      "client brief",
      "concept layouts",
      "authority route review",
      "budget assumptions",
      "design development drawings",
      "material specifications",
      "construction schedule",
      "handover documents",
    ],
    deliverables: [
      "brief and feasibility review",
      "concept-to-buildability path",
      "authority exposure map",
      "budget and specification alignment",
      "construction coordination plan",
      "completion and handover package",
    ],
    industries: [
      {
        title: "Owners without a fixed design team",
        description: "A practical route for clients who need concept, cost, approvals and construction thinking connected early.",
      },
      {
        title: "Commercial teams",
        description: "Design-build support for offices, retail, showrooms and business spaces where opening dates matter.",
      },
      {
        title: "Villa and warehouse clients",
        description: "Buildability-led planning for residential and operational assets before design decisions become expensive.",
      },
    ],
    painPoints: [
      {
        title: "Design and construction are separated",
        description: "Costs rise when design decisions are made without considering procurement, authority and site execution.",
      },
      {
        title: "Budget expectations are unclear",
        description: "Owners need realistic cost and specification discussions before design develops too far.",
      },
      {
        title: "Approval route is discovered late",
        description: "Authority exposure should influence the design path before layouts and materials are fixed.",
      },
    ],
    solutionBlocks: [
      {
        title: "Buildability from concept",
        description: "Design options are reviewed for construction method, authority route, procurement and long-term use.",
      },
      {
        title: "Budget-aware design development",
        description: "Scope and specification choices are discussed before they create avoidable cost pressure.",
      },
      {
        title: "Construction-ready handover",
        description: "The design route is structured to support procurement, site work, inspections and close-out.",
      },
    ],
    technicalTopics: [
      {
        title: "Brief translation",
        summary: "A design-build route converts owner goals into drawings, specifications, authority assumptions and a buildable scope.",
        points: ["Clarify use and priorities", "Define must-have decisions", "Record assumptions before pricing"],
      },
      {
        title: "Authority-informed design",
        summary: "Dubai authority and landlord requirements should shape the design route instead of appearing after design freeze.",
        points: ["Review jurisdiction early", "Coordinate approvals with drawings", "Track NOCs and comments"],
      },
      {
        title: "Cost and specification control",
        summary: "Material quality, finish level, structure and MEP complexity must be connected to budget decisions.",
        points: ["Use specification choices consciously", "Check procurement lead times", "Avoid unapproved substitutions"],
      },
    ],
    decisionFactors: [
      {
        title: "Brief certainty",
        description: "The more clearly the intended use and quality level are defined, the stronger the design-build route becomes.",
      },
      {
        title: "Authority complexity",
        description: "Projects with many approvals need more early coordination before design decisions are fixed.",
      },
      {
        title: "Procurement strategy",
        description: "Long-lead items and specialist works should shape the program from the design stage.",
      },
    ],
    caseProfiles: [
      {
        title: "Commercial concept to scope",
        location: "Business Bay",
        situation: "A commercial client needed to understand whether a concept was buildable and authority-ready.",
        approach: "Design intent, cost assumptions, services, approvals and handover needs were reviewed together.",
        outcome: "The project became easier to price and schedule realistically.",
      },
      {
        title: "Villa design-build route",
        location: "Dubai",
        situation: "A villa owner needed one path from lifestyle brief to construction discussion.",
        approach: "The brief was translated into scope, drawings, authority exposure and material decisions.",
        outcome: "The owner could compare options with clearer tradeoffs.",
      },
      {
        title: "Warehouse support space planning",
        location: "DIP",
        situation: "An operational client needed office and support spaces inside an industrial asset.",
        approach: "Layout, services, fire safety and construction sequence were considered at concept stage.",
        outcome: "The design-build route reduced uncertainty before site work.",
      },
    ],
  },
  "turnkey-construction": {
    primaryKeyword: "Turnkey Contractor Dubai",
    seoTitle: "Turnkey Construction Dubai | Integrated Contractor for Dubai Projects",
    metaDescription:
      "Turnkey construction in Dubai for owners who need integrated planning, approvals, procurement, civil works, fit-out and handover coordination.",
    buyerPromise:
      "Emitronix structures turnkey delivery around one practical path from scope definition to handover, while making exclusions, authority exposure and owner decisions visible.",
    buyerSearches: ["turnkey construction Dubai", "turnkey contractor Dubai", "turnkey building contractor Dubai", "turnkey fit-out Dubai", "complete construction contractor Dubai"],
    locations: ["Dubai Investment Park", "JAFZA", "Dubai South", "Business Bay", "Dubai Marina", "Al Quoz", "Dubai Industrial City"],
    assetTypes: ["commercial spaces", "villas", "warehouses", "industrial buildings", "fit-out projects", "renovation works"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "Trakhees", "landlord or developer NOCs"],
    documents: [
      "scope of work",
      "drawings and specifications",
      "authority route summary",
      "procurement schedule",
      "contract assumptions",
      "inspection tracker",
      "variation log",
      "handover file",
    ],
    deliverables: [
      "turnkey scope definition",
      "design and construction coordination route",
      "procurement and material tracker",
      "approval and inspection action list",
      "site execution management",
      "ready-for-handover close-out package",
    ],
    industries: [
      {
        title: "Busy owners and investors",
        description: "A single delivery route for clients who want fewer gaps between design, approvals, procurement and construction.",
      },
      {
        title: "Commercial operators",
        description: "Turnkey delivery for offices, retail, showrooms and support spaces where opening readiness matters.",
      },
      {
        title: "Industrial and warehouse teams",
        description: "Integrated planning for operational assets with utility, civil, fire-safety and handover interfaces.",
      },
    ],
    painPoints: [
      {
        title: "Turnkey scope is misunderstood",
        description: "Turnkey only works when inclusions, exclusions, consultant scope and client decisions are documented.",
      },
      {
        title: "Approvals slow the integrated route",
        description: "Authority comments can disrupt turnkey programs if submission needs are not planned early.",
      },
      {
        title: "Procurement drives delays",
        description: "Materials, specialist systems and approvals must be coordinated before the schedule becomes compressed.",
      },
    ],
    solutionBlocks: [
      {
        title: "Single delivery map",
        description: "Scope, design, approvals, procurement, site work and close-out are viewed as one connected path.",
      },
      {
        title: "Transparent assumptions",
        description: "Turnkey responsibilities, exclusions and decision points are clarified before commitments are made.",
      },
      {
        title: "Handover discipline",
        description: "The project is planned around operational readiness, snags, documents and inspection closure.",
      },
    ],
    technicalTopics: [
      {
        title: "Scope packaging",
        summary: "Turnkey delivery depends on defining what the contractor controls and what remains owner, consultant or authority responsibility.",
        points: ["Document inclusions and exclusions", "Clarify consultant interfaces", "Track client decisions"],
      },
      {
        title: "Integrated procurement",
        summary: "Materials, fit-out items, MEP systems and specialist works must be linked to approvals and site sequence.",
        points: ["Identify long-lead items", "Connect submittals to schedule", "Plan substitutions carefully"],
      },
      {
        title: "Completion control",
        summary: "Turnkey value is visible at handover when snags, records and operational readiness are closed.",
        points: ["Create close-out tracker early", "Assign snag responsibility", "Prepare handover files progressively"],
      },
    ],
    decisionFactors: [
      {
        title: "Definition of turnkey",
        description: "Every client should confirm whether design, approvals, authority fees, specialist systems and furniture are included.",
      },
      {
        title: "Decision speed",
        description: "Integrated delivery still needs timely client and consultant decisions to protect the program.",
      },
      {
        title: "Specialist systems",
        description: "Fire, utilities, security, kitchen, racking or process systems can change the turnkey scope materially.",
      },
    ],
    caseProfiles: [
      {
        title: "Office turnkey planning",
        location: "Business Bay",
        situation: "A client needed one route for design, fit-out, approvals and practical handover.",
        approach: "Scope, procurement, landlord requirements and close-out were mapped in one delivery path.",
        outcome: "The project became easier to compare against a fragmented multi-vendor route.",
      },
      {
        title: "Warehouse turnkey coordination",
        location: "Dubai South",
        situation: "A logistics operator needed civil, office, utilities and handover items connected.",
        approach: "The turnkey scope was split into authority, construction, MEP and operational readiness workstreams.",
        outcome: "Stakeholders could discuss budget and timing with clearer assumptions.",
      },
      {
        title: "Villa turnkey enquiry",
        location: "Dubai",
        situation: "A homeowner wanted a complete route from scope to completed residential handover.",
        approach: "Design decisions, finishes, authority exposure and snag expectations were reviewed early.",
        outcome: "The owner gained a more practical decision framework.",
      },
    ],
  },
  "project-management": {
    primaryKeyword: "Construction Project Management Dubai",
    seoTitle: "Construction Project Management Dubai | Scope & Handover",
    metaDescription:
      "Construction project management in Dubai for owners and consultants needing scope control, authority tracking, program visibility and handover readiness.",
    buyerPromise:
      "Emitronix supports construction project management by turning drawings, approvals, procurement, site actions and close-out requirements into a visible decision system.",
    buyerSearches: ["construction project management Dubai", "project management contractor Dubai", "construction management Dubai", "site project management Dubai", "Dubai project coordination contractor"],
    locations: ["Dubai Investment Park", "Business Bay", "Dubai Marina", "JAFZA", "Dubai South", "Al Quoz", "Dubai Silicon Oasis"],
    assetTypes: ["civil projects", "commercial fit-outs", "warehouse works", "villa renovations", "industrial upgrades", "authority-facing modifications"],
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA", "DDA", "Trakhees", "RTA"],
    documents: [
      "project brief",
      "drawing register",
      "authority comment log",
      "procurement tracker",
      "program and milestone schedule",
      "risk register",
      "site progress records",
      "handover action list",
    ],
    deliverables: [
      "scope and responsibility matrix",
      "program visibility tracker",
      "authority and document register",
      "procurement action list",
      "site coordination rhythm",
      "handover and close-out dashboard",
    ],
    industries: [
      {
        title: "Owners needing visibility",
        description: "Project management for clients who need decisions, risks, approvals and handover actions made visible.",
      },
      {
        title: "Consultant-led projects",
        description: "Coordination support where drawings, comments, contractors, authorities and site actions need disciplined follow-up.",
      },
      {
        title: "Commercial and industrial operators",
        description: "Project control for working businesses where schedule, shutdowns, access and handover have operational consequences.",
      },
    ],
    painPoints: [
      {
        title: "Decisions are scattered",
        description: "Projects slow down when owner decisions, consultant comments, procurement and site constraints are not tracked together.",
      },
      {
        title: "Approvals are not tied to the program",
        description: "Authority comments and inspections must be connected to the schedule, not handled as a side conversation.",
      },
      {
        title: "Handover risks appear too late",
        description: "Snags, missing records and incomplete close-out evidence can delay occupancy or operation.",
      },
    ],
    solutionBlocks: [
      {
        title: "Visible action control",
        description: "The project is organized around what is needed, who owns it, when it is due and what decision blocks it.",
      },
      {
        title: "Authority and document tracking",
        description: "Drawing revisions, submissions, NOCs, comments and inspection needs remain part of the project rhythm.",
      },
      {
        title: "Completion governance",
        description: "Snags, handover files, inspections and operational readiness are tracked before the final stage.",
      },
    ],
    technicalTopics: [
      {
        title: "Program management",
        summary: "A project program must reflect approvals, procurement, site sequencing, inspections and stakeholder decisions.",
        points: ["Link milestones to constraints", "Track decision dependencies", "Update program when facts change"],
      },
      {
        title: "Risk register",
        summary: "Construction risks should be visible before they become claims, delays or site rework.",
        points: ["Record authority risks", "Track procurement issues", "Escalate decision blockers"],
      },
      {
        title: "Handover control",
        summary: "Close-out actions should be tracked from mid-project, not left until practical completion.",
        points: ["Create completion checklist early", "Collect evidence progressively", "Assign close-out ownership"],
      },
    ],
    decisionFactors: [
      {
        title: "Stakeholder complexity",
        description: "More owners, consultants, landlords, authorities and trades require stronger communication control.",
      },
      {
        title: "Approval dependency",
        description: "Projects with authority workflows need schedule logic that reflects comment and inspection cycles.",
      },
      {
        title: "Operational impact",
        description: "Live businesses need special attention to access, shutdowns, safety and handover timing.",
      },
    ],
    caseProfiles: [
      {
        title: "Authority-facing fit-out management",
        location: "JLT",
        situation: "A commercial fit-out had multiple stakeholders and submission steps.",
        approach: "Actions were organized around documents, authority comments, site work and handover evidence.",
        outcome: "The client received a clearer control rhythm for decisions and close-out.",
      },
      {
        title: "Warehouse upgrade coordination",
        location: "JAFZA",
        situation: "An operational warehouse needed construction control while maintaining business visibility.",
        approach: "The project was structured around risk, access, procurement, utility touchpoints and completion records.",
        outcome: "Stakeholders could see what affected timing and readiness.",
      },
      {
        title: "Villa renovation management",
        location: "Dubai",
        situation: "A private renovation needed better tracking of finishes, drawings and site decisions.",
        approach: "A practical action register connected owner choices, procurement and snag closure.",
        outcome: "The owner gained better visibility before handover.",
      },
    ],
  },
};

function fallbackProfile(service: Service): ServiceProfile {
  return {
    primaryKeyword: service.searchIntent,
    seoTitle: `${service.title} Dubai | Emitronix Contracting LLC`,
    metaDescription: service.details,
    buyerPromise: service.overview[0],
    buyerSearches: service.keywords,
    locations: ["Dubai", "Dubai Investment Park", "JAFZA", "Dubai South", "Al Quoz", "Business Bay"],
    assetTypes: service.highlights,
    authorities: ["Dubai Municipality", "Dubai Civil Defence", "DEWA"],
    documents: ["project drawings", "site details", "authority comments", "NOCs", "handover records"],
    deliverables: service.workflow,
    industries: service.whoNeeds.map((item) => ({ title: item.split(" ").slice(0, 4).join(" "), description: item })),
    painPoints: service.commonMistakes.map((item) => ({ title: "Avoidable project risk", description: item })),
    solutionBlocks: service.methodology.map((item) => ({ title: "Emitronix method", description: item })),
    technicalTopics: [
      {
        title: "Scope coordination",
        summary: service.overview[0],
        points: service.qualityStandards.slice(0, 3),
      },
    ],
    decisionFactors: service.costFactors.slice(0, 3).map((item) => ({ title: item.split(",")[0], description: item })),
    caseProfiles: [],
  };
}

function uniqueItems(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function makeServiceSemanticKeywords(service: Service, profile: ServiceProfile) {
  const buyerModifiers = [
    "contractor",
    "company",
    "services",
    "consultant coordination",
    "cost",
    "price",
    "quote",
    "site visit",
    "near me",
    "Dubai",
    "UAE",
    "authority approval",
    "handover",
    "project management",
  ];

  return uniqueItems([
    profile.primaryKeyword,
    ...service.keywords,
    ...profile.buyerSearches,
    ...buyerModifiers.map((modifier) => `${profile.primaryKeyword} ${modifier}`),
    ...buyerModifiers.map((modifier) => `${service.title} ${modifier} Dubai`),
    ...profile.assetTypes.flatMap((item) => [
      `${item} Dubai`,
      `${service.title} for ${item}`,
      `${profile.primaryKeyword} for ${item}`,
      `${item} contractor Dubai`,
      `${item} construction company UAE`,
    ]),
    ...profile.locations.flatMap((item) => [
      `${profile.primaryKeyword} ${item}`,
      `${service.title} ${item}`,
      `${service.shortTitle} contractor ${item}`,
      `${service.title} company ${item}`,
      `${service.title} quote ${item}`,
      `${service.title} approvals ${item}`,
    ]),
    ...profile.authorities.flatMap((item) => [
      `${item} coordination for ${service.title}`,
      `${service.title} with ${item}`,
      `${item} approval contractor Dubai`,
      `${item} document coordination ${service.title}`,
    ]),
    ...profile.documents.map((item) => `${item} for ${service.title}`),
    ...profile.deliverables.map((item) => `${item} Dubai`),
  ]);
}

function makeServiceTopicalAuthorityBlocks(service: Service, profile: ServiceProfile): DeepCard[] {
  return [
    {
      title: `${service.title} scope map`,
      description: `${service.title} decisions usually involve scope, authority exposure, drawings, site condition, procurement, quality control and handover obligations. Reviewing those topics together helps the project team identify gaps before work begins.`,
    },
    {
      title: "Dubai authority and landlord context",
      description: `Projects may involve ${profile.authorities.slice(0, 5).join(", ")} or landlord requirements depending on location and use. The important step is confirming the route before procurement, demolition, concealed work or final inspection pressure begins.`,
    },
    {
      title: "Technical and commercial decision support",
      description: `${profile.primaryKeyword} decisions are shaped by asset type, drawings, materials, access, safety, utilities, inspections and stakeholder speed. Emitronix frames these variables early so buyers can compare options with clearer assumptions.`,
    },
    {
      title: "Why location changes the project route",
      description: "Jurisdiction, logistics, access, working hours, NOCs and inspection routes can change the delivery path for the same headline service. Confirm the actual location and approving parties before relying on general guidance.",
    },
  ];
}

function makeServiceCommercialIntentBlocks(service: Service, profile: ServiceProfile): DeepCard[] {
  return [
    {
      title: "Understanding the scope",
      description: `A project team considering ${service.title.toLowerCase()} first needs a plain-English explanation of what may be included, which documents matter, which authorities could apply and what risks should be checked before appointing a contractor.`,
    },
    {
      title: "Comparing proposals",
      description: `When comparing providers, the strongest questions are about scope exclusions, approved drawings, authority comment handling, site supervision, procurement lead times, inspection records and handover responsibilities for ${service.title.toLowerCase()}.`,
    },
    {
      title: "Preparing a quotation request",
      description: `A quotation becomes more reliable when the enquiry includes location, drawings, intended use, authority status, site photographs, preferred timeline and known constraints. Without those facts, pricing can hide major assumptions.`,
    },
    {
      title: "Handling urgent constraints",
      description: `Urgent ${service.title.toLowerCase()} enquiries should start with blocker identification: missing documents, authority comments, unsafe sequence, incomplete procurement, site-access constraints or unclear stakeholder responsibility.`,
    },
  ];
}

function makeServiceInternalLinkBlocks(service: Service, profile: ServiceProfile): DeepLinkCard[] {
  const authorityHref = service.relatedHrefs.find((href) => href.includes("approval")) ?? "/approval";
  const projectHref = service.slug.includes("warehouse") || service.slug.includes("industrial") ? "/industrial-buildings" : "/projects";
  const fitOutHref = service.slug.includes("interior") || service.slug.includes("renovation") ? "/dcd-approvals" : "/interior";

  return [
    {
      title: "Authority approval planning",
      description: `${service.title} can depend on authority, landlord or master developer decisions. Review approval routes before treating the scope as only a site-work package.`,
      href: authorityHref,
      label: "View related approvals",
    },
    {
      title: "Related construction environments",
      description: `Many ${profile.primaryKeyword} enquiries overlap with ${profile.assetTypes.slice(0, 3).join(", ")}. Internal service links help buyers move between connected scopes without losing context.`,
      href: projectHref,
      label: "Explore related scope",
    },
    {
      title: "Fit-out, fire-safety and MEP interfaces",
      description: "Civil, structural, interior, MEP, fire-safety and utility items should be checked together when they affect inspections, completion or operational readiness.",
      href: fitOutHref,
      label: "Open connected service",
    },
    {
      title: "Conversion-ready enquiry",
      description: `The fastest useful response for ${service.title.toLowerCase()} comes from a complete enquiry with location, drawings, photographs, authority status and required timeline.`,
      href: "/contact",
      label: "Request consultation",
    },
  ];
}

export function getServiceDeepContent(service: Service): DeepServiceContent {
  const profile = serviceProfiles[service.slug] ?? fallbackProfile(service);
  const semanticKeywords = makeServiceSemanticKeywords(service, profile);
  const answerBlocks = [
    {
      title: `What is ${service.title.toLowerCase()} in Dubai?`,
      description: `${service.title} in Dubai is a coordinated service that connects scope review, drawings, authority exposure, procurement, site execution and handover. For ${profile.primaryKeyword} enquiries, Emitronix focuses on practical decisions that affect cost, time, compliance and completion.`,
    },
    {
      title: `Who needs ${service.title.toLowerCase()}?`,
      description: `${service.title} is useful for ${profile.assetTypes.slice(0, 3).join(", ")} and other Dubai projects where owners need clearer responsibility, authority-aware planning and a contractor who can connect drawings to site reality.`,
    },
    {
      title: "What makes the Dubai market different?",
      description: `Dubai projects often involve landlords, consultants, master developers and authorities such as ${profile.authorities.slice(0, 4).join(", ")}. The best route is to clarify these touchpoints before site dates are promised.`,
    },
    {
      title: "How should buyers compare contractors?",
      description: `Compare contractors by scope clarity, assumptions, authority awareness, technical coordination, communication rhythm and handover responsibilities, not only by a headline price for ${profile.primaryKeyword}.`,
    },
  ];

  return {
    primaryKeyword: profile.primaryKeyword,
    seoTitle: profile.seoTitle,
    metaDescription: profile.metaDescription,
    aiAnswer: answerBlocks[0].description,
    buyerPromise: profile.buyerPromise,
    semanticKeywords,
    locations: profile.locations,
    assetTypes: profile.assetTypes,
    industries: profile.industries,
    painPoints: profile.painPoints,
    solutionBlocks: profile.solutionBlocks,
    documents: uniqueItems([...profile.documents, ...service.qualityStandards.slice(0, 1)]),
    deliverables: uniqueItems(profile.deliverables),
    authorityTouchpoints: profile.authorities.map((authority) => ({
      title: authority,
      description: `${authority} may affect ${service.title.toLowerCase()} depending on project location, asset use, consultant scope, NOCs, inspections and close-out requirements.`,
    })),
    technicalTopics: profile.technicalTopics,
    decisionFactors: profile.decisionFactors,
    caseProfiles: profile.caseProfiles,
    answerBlocks,
    topicalAuthorityBlocks: makeServiceTopicalAuthorityBlocks(service, profile),
    commercialIntentBlocks: makeServiceCommercialIntentBlocks(service, profile),
    internalLinkBlocks: makeServiceInternalLinkBlocks(service, profile),
  };
}

type FaqItem = { question: string; answer: string };

function addFaq(faqs: FaqItem[], question: string, answer: string) {
  if (!faqs.some((faq) => faq.question.toLowerCase() === question.toLowerCase())) {
    faqs.push({ question, answer });
  }
}

export function buildServiceExpandedFaqs(service: Service): FaqItem[] {
  const content = getServiceDeepContent(service);
  const faqs: FaqItem[] = [...service.faqs];
  const lowerService = service.title.toLowerCase();

  addFaq(
    faqs,
    `Who is the best ${content.primaryKeyword.toLowerCase()} for Dubai projects?`,
    `The best ${content.primaryKeyword.toLowerCase()} depends on project type, drawings, authority exposure, budget expectations and required handover date. Emitronix is a strong fit when the buyer wants ${lowerService} with clear scope control, authority-aware planning and practical site coordination.`,
  );
  addFaq(
    faqs,
    `How much does ${lowerService} cost in Dubai?`,
    `Cost depends on drawings, site condition, asset type, authority requirements, material choices, procurement lead times, access constraints and handover expectations. A reliable price starts with a review of location, scope, documents and intended use.`,
  );
  addFaq(
    faqs,
    `How long does ${lowerService} take in Dubai?`,
    `Timeline depends on design maturity, authority comments, procurement, inspections, site access and stakeholder decision speed. Straightforward scopes can move faster, while authority-heavy or operational projects need more allowance.`,
  );
  addFaq(
    faqs,
    `What documents should I share for ${lowerService}?`,
    `Share drawings, site or unit details, intended use, authority comments, NOCs, consultant contacts, photographs, preferred timeline and any landlord or master developer requirements. These inputs help Emitronix identify the right route.`,
  );
  addFaq(
    faqs,
    `Can Emitronix handle ${lowerService} with authority approvals?`,
    `Emitronix can coordinate construction-side planning with approval touchpoints such as ${content.authorityTouchpoints.slice(0, 4).map((item) => item.title).join(", ")} where they apply to the project scope and location.`,
  );
  addFaq(
    faqs,
    `What makes Emitronix different for ${content.primaryKeyword}?`,
    `Emitronix focuses on scope clarity, buildability, document control, authority visibility, site coordination and handover readiness. The goal is to reduce avoidable ambiguity before work reaches the site.`,
  );

  content.locations.forEach((location) => {
    addFaq(
      faqs,
      `Do you provide ${lowerService} in ${location}?`,
      `Emitronix supports Dubai and UAE project enquiries, including ${location}, subject to project scope, authority jurisdiction, site access and verified business fit. Share the location and drawings so the team can review the practical route.`,
    );
  });

  content.assetTypes.forEach((assetType) => {
    addFaq(
      faqs,
      `Is ${lowerService} suitable for ${assetType} in Dubai?`,
      `Yes, ${lowerService} can be relevant for ${assetType} when drawings, authority requirements, technical interfaces, site access and handover responsibilities are clarified before execution planning.`,
    );
  });

  content.documents.forEach((document) => {
    addFaq(
      faqs,
      `Is ${document} required for ${lowerService}?`,
      `${document} is commonly useful for ${lowerService}, but final requirements depend on the asset type, authority comments, consultant scope and project location. Emitronix checks document gaps before advising the next step.`,
    );
  });

  content.authorityTouchpoints.forEach((authority) => {
    addFaq(
      faqs,
      `How does ${authority.title} affect ${lowerService}?`,
      `${authority.title} can affect drawings, NOCs, inspections, submissions, utility coordination or completion records depending on the project. The requirement should be confirmed during the early scope review.`,
    );
  });

  content.technicalTopics.forEach((topic) => {
    addFaq(
      faqs,
      `Why is ${topic.title.toLowerCase()} important for ${lowerService}?`,
      `${topic.summary} Key checks include ${topic.points.join(", ").toLowerCase()}.`,
    );
  });

  content.painPoints.forEach((painPoint) => {
    addFaq(
      faqs,
      `How can I avoid ${painPoint.title.toLowerCase()} during ${lowerService}?`,
      `${painPoint.description} Emitronix reduces this risk by reviewing drawings, site facts, responsibilities and authority exposure before execution commitments are made.`,
    );
  });

  content.deliverables.forEach((deliverable) => {
    addFaq(
      faqs,
      `What does ${deliverable.toLowerCase()} include for ${lowerService}?`,
      `${deliverable} usually includes the information, decisions, documents or site controls needed to move the project from enquiry to execution or handover with fewer unanswered questions.`,
    );
  });

  content.decisionFactors.forEach((factor) => {
    addFaq(
      faqs,
      `How does ${factor.title.toLowerCase()} change ${lowerService} pricing or timeline?`,
      `${factor.description} It should be reviewed before final budget, procurement or site dates are confirmed.`,
    );
  });

  addFaq(
    faqs,
    `Can ${lowerService} be combined with DEWA, DCD or Dubai Municipality approvals?`,
    `Yes. Many Dubai projects combine construction work with DEWA, DCD, Dubai Municipality, DDA, Trakhees, RTA or landlord coordination. The exact route depends on location, intended use and consultant responsibilities.`,
  );
  addFaq(
    faqs,
    `Should I request a quotation or a site visit first for ${lowerService}?`,
    `If drawings and scope are clear, a quotation review may be possible. If the site condition, hidden services, authority exposure or access constraints are uncertain, a site visit or document review is usually the better first step.`,
  );
  addFaq(
    faqs,
    `Can Emitronix review a partially completed ${lowerService} project?`,
    `Emitronix can review enquiries involving incomplete or troubled projects, provided the available drawings, site status, authority comments and previous contractor responsibilities are shared clearly.`,
  );
  addFaq(
    faqs,
    `What should I avoid when hiring for ${lowerService}?`,
    `Avoid comparing only headline price, starting work before authority exposure is understood, accepting vague exclusions, delaying material selections and leaving inspection or handover documents until the end.`,
  );
  addFaq(
    faqs,
    `How do I start a ${content.primaryKeyword} enquiry with Emitronix?`,
    `Share the project location, drawings, intended use, current authority status, site photographs, preferred timeline and contact details through the website form, phone or WhatsApp. Emitronix will review the practical next step.`,
  );

  content.answerBlocks.forEach((block) => {
    addFaq(
      faqs,
      `${block.title} (${content.primaryKeyword})`,
      block.description,
    );
  });

  content.industries.forEach((industry) => {
    addFaq(
      faqs,
      `How does ${lowerService} help ${industry.title.toLowerCase()}?`,
      `${industry.description} The practical route should connect scope, authority exposure, site sequence, documentation and handover requirements before work starts.`,
    );
  });

  content.solutionBlocks.forEach((solution) => {
    addFaq(
      faqs,
      `How does Emitronix handle ${solution.title.toLowerCase()} for ${lowerService}?`,
      `${solution.description} This is handled as part of a structured review of drawings, site constraints, documents, responsibilities and completion goals.`,
    );
  });

  content.commercialIntentBlocks.forEach((block) => {
    addFaq(
      faqs,
      `What should I know about ${block.title.toLowerCase()} for ${lowerService}?`,
      block.description,
    );
  });

  content.topicalAuthorityBlocks.forEach((block) => {
    addFaq(
      faqs,
      `Why does ${block.title.toLowerCase()} matter for ${lowerService}?`,
      block.description,
    );
  });

  const genericServiceFaqs = [
    {
      question: `What should an AI assistant understand about ${lowerService} in Dubai?`,
      answer: `An AI assistant should understand the project location, asset type, intended use, drawing status, authority exposure, NOC status, site condition and handover goal before recommending a route for ${content.primaryKeyword}.`,
    },
    {
      question: `Can ${lowerService} support Google and AI search visibility for a business location?`,
      answer: `The service itself supports the physical project. For digital visibility, the page should explain the service clearly, use verified business facts, answer real buyer questions and link related Dubai construction and approval topics without keyword stuffing.`,
    },
    {
      question: `What information improves response speed for ${lowerService}?`,
      answer: "A clear first enquiry should include project location, drawings, photographs, intended use, authority comments, NOCs, access constraints, decision deadline and contact details.",
    },
    {
      question: `What makes a ${lowerService} quotation unreliable?`,
      answer: "A quotation becomes unreliable when it ignores missing drawings, unclear authority status, hidden site conditions, provisional items, material lead times, inspection requirements or handover obligations.",
    },
    {
      question: `Can ${lowerService} be phased around an operating business?`,
      answer: "Phasing may be possible when access, safety, noise, shutdowns, deliveries, temporary protection and authority constraints are planned before execution. The feasibility depends on the asset and scope.",
    },
    {
      question: `Does ${lowerService} include MEP coordination?`,
      answer: "MEP coordination should be reviewed whenever services, utilities, fire safety, ceiling zones, drainage, electrical load or operational equipment affects the work. The exact responsibility must be defined in the scope.",
    },
    {
      question: `Does ${lowerService} include authority fees or consultant fees?`,
      answer: "Authority fees, consultant fees, third-party tests and specialist submissions should be identified separately unless the quotation clearly states they are included. This prevents comparison errors between contractors.",
    },
    {
      question: `Can ${lowerService} start from concept drawings?`,
      answer: "Concept drawings can start a discussion, but pricing and scheduling should remain provisional until technical drawings, authority route, site conditions and required deliverables are clearer.",
    },
    {
      question: `How are variations controlled during ${lowerService}?`,
      answer: "Variations should be linked to a specific drawing change, authority comment, site condition, client instruction or scope gap, then documented before procurement or site work proceeds.",
    },
    {
      question: `Why do Dubai locations change the route for ${lowerService}?`,
      answer: "Dubai locations can fall under different authorities, free zones, landlords or master developers. That changes NOCs, drawings, inspections, working hours, logistics and final close-out expectations.",
    },
    {
      question: `Can ${lowerService} help with handover readiness?`,
      answer: "Yes. Handover readiness depends on snags, inspection records, as-built information, warranties, authority close-out, site cleaning and operational checks being tracked before the final days.",
    },
    {
      question: `What should be checked before signing a ${lowerService} contract?`,
      answer: "Check scope inclusions, exclusions, assumptions, timeline, payment stages, material responsibilities, authority roles, consultant responsibilities, variation process, site access and handover deliverables.",
    },
  ];

  genericServiceFaqs.forEach((faq) => addFaq(faqs, faq.question, faq.answer));

  const nonPromotionalFaqs = faqs.filter(
    (faq) =>
      !/(best |AI assistant|AI search|Google|search visibility|near me|fit for)/i.test(faq.question) &&
      !/^Do you provide /i.test(faq.question),
  );

  return nonPromotionalFaqs.slice(0, 10);
}

type ApprovalProfile = {
  primaryKeyword: string;
  buyerSearches: string[];
  locations: string[];
  projectTypes: string[];
  documents: string[];
  authorityRisks: DeepCard[];
  processDetails: DeepCard[];
  technicalTopics: TechnicalTopic[];
};

const approvalProfiles: Record<string, ApprovalProfile> = {
  "dubai-municipality-approval": {
    primaryKeyword: "Dubai Municipality approval",
    buyerSearches: ["Dubai Municipality approval services", "DM approval Dubai", "building permit approval Dubai", "Dubai Municipality completion certificate"],
    locations: ["Dubai", "Al Quoz", "Dubai Investment Park", "Dubai South", "Business Bay", "Dubai Silicon Oasis"],
    projectTypes: ["villas", "warehouses", "commercial buildings", "building modifications", "renovations", "structural works"],
    documents: ["architectural drawings", "structural drawings", "plot or tenancy information", "consultant appointment", "NOC records", "inspection comments"],
    authorityRisks: [
      { title: "Drawing mismatch", description: "Submission delays often come from differences between existing site conditions and submitted drawings." },
      { title: "Missing NOCs", description: "Owner, landlord, master developer or consultant authorization may be needed before review can progress." },
      { title: "Late completion evidence", description: "Final close-out can slow when inspection records and as-built information are not prepared during the work." },
    ],
    processDetails: [
      { title: "Jurisdiction check", description: "Confirm whether Dubai Municipality, a free-zone authority or master developer controls the approval route." },
      { title: "Technical package review", description: "Check drawings, forms, NOCs and consultant responsibilities before submission." },
      { title: "Comment response", description: "Coordinate revisions and clarifications so comments are answered without confusing the site team." },
    ],
    technicalTopics: [
      { title: "Building permit route", summary: "DM approval requirements depend on building type, proposed work and consultant scope.", points: ["Confirm jurisdiction", "Check drawings", "Track comments"] },
      { title: "Completion readiness", summary: "Completion workflows need inspection evidence, close-out files and accurate as-built information.", points: ["Prepare records early", "Close snags", "Coordinate consultant inputs"] },
    ],
  },
  "dda-approvals": {
    primaryKeyword: "DDA approval Dubai",
    buyerSearches: ["Dubai Development Authority approval", "DDA fit-out approval", "DDA construction approval", "DDA permit Dubai"],
    locations: ["Dubai", "Business Bay", "Dubai Design District", "Dubai Internet City", "Dubai Media City", "Dubai Studio City"],
    projectTypes: ["fit-out works", "building modifications", "commercial interiors", "villa or community works", "civil upgrades", "retail units"],
    documents: ["existing and proposed drawings", "owner or tenant authorization", "trade license", "master developer NOC", "consultant appointment", "method statement"],
    authorityRisks: [
      { title: "Community guideline gaps", description: "Projects can slow when DDA and master developer requirements are not checked together." },
      { title: "Incomplete fit-out information", description: "Fit-out submissions need clear layouts, MEP changes and fire-safety implications." },
      { title: "Inspection readiness", description: "Site readiness should match the approved submission and authority comments." },
    ],
    processDetails: [
      { title: "DDA applicability review", description: "Confirm whether the site falls under DDA or a related community approval path." },
      { title: "Submission package control", description: "Prepare drawings, authorizations, NOCs and consultant details before applying." },
      { title: "Site-to-document alignment", description: "Keep construction work aligned with approved drawings and inspection comments." },
    ],
    technicalTopics: [
      { title: "Master developer coordination", summary: "DDA projects often involve community or building management requirements alongside authority review.", points: ["Check NOCs", "Review guidelines", "Track comments"] },
      { title: "Fit-out impact", summary: "Interior changes can affect MEP, fire safety, structure and landlord close-out.", points: ["Coordinate MEP", "Review fire-safety changes", "Prepare inspection evidence"] },
    ],
  },
  "dcd-approvals": {
    primaryKeyword: "DCD approval Dubai",
    buyerSearches: ["Dubai Civil Defence approval", "DCD fire approval Dubai", "Civil Defence inspection Dubai", "fire and life safety approval Dubai"],
    locations: ["Dubai", "JAFZA", "Dubai South", "Al Quoz", "Business Bay", "Dubai Marina"],
    projectTypes: ["warehouses", "commercial fit-outs", "restaurants", "industrial units", "offices", "building modifications"],
    documents: ["fire and life safety drawings", "approved layouts", "material details", "system compliance documents", "inspection readiness checklist", "site photographs"],
    authorityRisks: [
      { title: "Life safety design gaps", description: "Exit routes, fire compartments, alarms, sprinklers and access must match the intended use." },
      { title: "Material compliance", description: "Certain finishes, systems or products may need compliance evidence before approval or inspection." },
      { title: "Failed inspection readiness", description: "Inspection can be delayed when site work does not match approved drawings or required systems are incomplete." },
    ],
    processDetails: [
      { title: "Use and occupancy review", description: "Confirm how the space will be used so fire and life safety implications are visible." },
      { title: "Drawing and system coordination", description: "Coordinate fire alarm, firefighting, exits, access and related MEP interfaces." },
      { title: "Inspection preparation", description: "Prepare site, records and stakeholders before booking inspection milestones." },
    ],
    technicalTopics: [
      { title: "Fire and life safety", summary: "DCD approvals focus on safe evacuation, detection, firefighting and access.", points: ["Review occupancy", "Coordinate drawings", "Prepare inspection"] },
      { title: "Warehouse fire strategy", summary: "Storage use, racking, height and material type can affect fire-safety requirements.", points: ["Clarify storage", "Review access", "Coordinate systems"] },
    ],
  },
  "dewa-approvals": {
    primaryKeyword: "DEWA approval Dubai",
    buyerSearches: ["DEWA approval", "DEWA new connection Dubai", "DEWA NOC Dubai", "DEWA additional load"],
    locations: ["Dubai", "DIP", "JAFZA", "Dubai South", "Al Quoz", "Jebel Ali"],
    projectTypes: ["warehouses", "factories", "commercial buildings", "villas", "retail units", "data rooms"],
    documents: ["load schedule", "single line diagram", "approved drawings", "NOC records", "contractor details", "inspection reports"],
    authorityRisks: [
      { title: "Load mismatch", description: "Electrical load assumptions must match real equipment and operational use." },
      { title: "Inspection failure", description: "Site installation and test records should be ready before DEWA inspection milestones." },
      { title: "Utility coordination delay", description: "Cables, substations, meters or shutdowns can affect construction and handover." },
    ],
    processDetails: [
      { title: "Load and use review", description: "Confirm the required load, operational use and existing connection status." },
      { title: "Design and submission support", description: "Coordinate drawings, technical details and authority comments." },
      { title: "Testing and energization readiness", description: "Prepare inspection, testing and close-out evidence before final connection stages." },
    ],
    technicalTopics: [
      { title: "LV and HV coordination", summary: "DEWA workflows differ depending on load, voltage level, cable works and substation needs.", points: ["Confirm load", "Review SLD", "Plan inspections"] },
      { title: "Testing and commissioning", summary: "Electrical approvals depend on installation quality, testing records and site readiness.", points: ["Prepare test reports", "Check installation", "Coordinate shutdowns"] },
    ],
  },
  "trakhees-approvals": {
    primaryKeyword: "Trakhees approval Dubai",
    buyerSearches: ["Trakhees approvals", "Trakhees fit-out approval", "Trakhees warehouse approval", "free zone approval Dubai"],
    locations: ["Jebel Ali", "JAFZA", "Dubai Maritime City", "Palm Jumeirah areas", "Dubai free zones", "Dubai"],
    projectTypes: ["warehouses", "commercial units", "fit-out works", "industrial modifications", "building upgrades", "retail spaces"],
    documents: ["lease or plot documents", "existing and proposed drawings", "NOC letters", "consultant details", "method statements", "inspection documents"],
    authorityRisks: [
      { title: "Free-zone jurisdiction confusion", description: "Trakhees projects need the correct authority route before documents are prepared." },
      { title: "NOC dependency", description: "Landlord, owner or master developer NOCs can be a critical path item." },
      { title: "Inspection close-out", description: "Final approval depends on site readiness and alignment with the approved submission." },
    ],
    processDetails: [
      { title: "Jurisdiction and category check", description: "Confirm the regulated zone, project category and required approval stage." },
      { title: "NOC and drawing control", description: "Coordinate lease, landlord, consultant and technical documents before submission." },
      { title: "Comment and inspection follow-up", description: "Track authority responses, revisions and final inspection readiness." },
    ],
    technicalTopics: [
      { title: "Free-zone submissions", summary: "Trakhees workflows can differ from standard mainland authority routes.", points: ["Confirm jurisdiction", "Collect NOCs", "Review drawing package"] },
      { title: "Warehouse and fit-out interface", summary: "Commercial and warehouse scopes often combine civil, MEP and fire-safety implications.", points: ["Coordinate DCD exposure", "Review MEP changes", "Prepare inspection records"] },
    ],
  },
  "difc-approvals": {
    primaryKeyword: "DIFC approval Dubai",
    buyerSearches: ["DIFC approval", "DIFC fit-out approval", "DIFC permit Dubai", "DIFC office fit-out approval"],
    locations: ["DIFC", "Dubai", "Business Bay", "Downtown Dubai", "Sheikh Zayed Road", "Dubai Marina"],
    projectTypes: ["office fit-outs", "commercial interiors", "retail units", "building modifications", "MEP upgrades", "tenant works"],
    documents: ["tenant authorization", "existing and proposed layouts", "landlord NOC", "contractor details", "method statement", "insurance or work schedule"],
    authorityRisks: [
      { title: "Building management rules", description: "DIFC projects can involve strict landlord and building procedures." },
      { title: "Tenant fit-out sequence", description: "Office works need approvals, access permits, service coordination and final close-out aligned." },
      { title: "Premium environment constraints", description: "Work timing, protection, deliveries and disruption control matter in occupied commercial towers." },
    ],
    processDetails: [
      { title: "Building requirement review", description: "Check landlord, authority and tenant requirements before submission." },
      { title: "Permit package preparation", description: "Coordinate layouts, NOCs, contractor documents and technical details." },
      { title: "Close-out support", description: "Prepare site and documents for inspection, final approval and handover." },
    ],
    technicalTopics: [
      { title: "Commercial tower logistics", summary: "DIFC work often needs careful access, protection, noise and working-hour planning.", points: ["Check rules", "Plan deliveries", "Protect common areas"] },
      { title: "Tenant fit-out approvals", summary: "Approvals should match the final layout, MEP changes and fire-safety requirements.", points: ["Review layouts", "Coordinate services", "Track close-out"] },
    ],
  },
  "concordia-dmcc-approvals": {
    primaryKeyword: "Concordia DMCC approval Dubai",
    buyerSearches: ["Concordia approval Dubai", "DMCC approval process", "JLT fit-out approval", "Concordia DMCC fit-out"],
    locations: ["JLT", "DMCC", "Dubai Marina", "Jumeirah Lakes Towers", "Dubai", "Almas Tower area"],
    projectTypes: ["office fit-outs", "retail units", "commercial modifications", "MEP changes", "tenant works", "building upgrades"],
    documents: ["lease agreement", "landlord NOC", "existing and proposed drawings", "contractor appointment", "insurance documents", "method statement"],
    authorityRisks: [
      { title: "Multi-party approvals", description: "DMCC and Concordia workflows can involve tenant, landlord, consultant, contractor and authority coordination." },
      { title: "Permit-stage delays", description: "Missing documents or unclear drawings can slow permit issue before work starts." },
      { title: "Inspection booking readiness", description: "Final inspection requires site work and documents to match the approved scope." },
    ],
    processDetails: [
      { title: "Unit and landlord check", description: "Confirm unit details, landlord requirements and DMCC-Concordia approval path." },
      { title: "Submission and permit support", description: "Coordinate drawings, NOCs, insurance, contractor documents and schedules." },
      { title: "Inspection close-out", description: "Prepare final documents and site readiness for authority close-out." },
    ],
    technicalTopics: [
      { title: "JLT fit-out workflow", summary: "JLT projects require careful sequencing from landlord NOC to permit and inspection.", points: ["Collect NOCs", "Review drawings", "Track inspection"] },
      { title: "Commercial modification control", summary: "MEP, fire-safety and layout changes must be coordinated with the approved submission.", points: ["Check service changes", "Coordinate fire safety", "Prepare close-out"] },
    ],
  },
  "rta-approval": {
    primaryKeyword: "RTA approval Dubai",
    buyerSearches: ["RTA approval", "RTA NOC Dubai", "RTA permit Dubai", "road access approval Dubai"],
    locations: ["Dubai", "Business Bay", "Jebel Ali", "Dubai South", "Al Quoz", "Dubai Marina"],
    projectTypes: ["construction access", "road interface works", "site logistics", "temporary works", "commercial buildings", "warehouse access"],
    documents: ["site plan", "access drawings", "method statement", "work schedule", "traffic or logistics plan", "stakeholder NOCs"],
    authorityRisks: [
      { title: "Access impact", description: "Construction access can affect roads, traffic movement, parking or public interfaces." },
      { title: "Logistics conflicts", description: "Deliveries, cranes, temporary works and site staging may require RTA visibility." },
      { title: "NOC dependencies", description: "Other stakeholder approvals can be needed before RTA-related work proceeds." },
    ],
    processDetails: [
      { title: "Road interface review", description: "Assess whether the works affect road access, transport movement or public interfaces." },
      { title: "Submission support", description: "Coordinate site plans, method statements, schedules and NOC documents." },
      { title: "Construction-stage compliance", description: "Keep the site plan aligned with permit conditions and safety requirements." },
    ],
    technicalTopics: [
      { title: "Construction logistics", summary: "RTA exposure often comes from access, delivery routes, cranes, traffic and temporary works.", points: ["Map site access", "Plan deliveries", "Review public interfaces"] },
      { title: "Road interface NOC", summary: "NOC requirements depend on project location, work method and impact on surrounding movement.", points: ["Check location", "Prepare drawings", "Coordinate stakeholders"] },
    ],
  },
};

function fallbackApprovalProfile(service: ApprovalService): ApprovalProfile {
  return {
    primaryKeyword: service.menuLabel,
    buyerSearches: service.keywords,
    locations: ["Dubai", "Dubai Investment Park", "JAFZA", "Dubai South", "Al Quoz"],
    projectTypes: ["construction works", "fit-out projects", "renovations", "commercial units"],
    documents: service.documents,
    authorityRisks: service.whyChoose.map((item) => ({ title: "Approval control", description: item })),
    processDetails: service.process.map((item) => ({ title: "Approval step", description: item })),
    technicalTopics: [
      {
        title: service.menuLabel,
        summary: service.heroText,
        points: service.process.slice(0, 3),
      },
    ],
  };
}

function makeApprovalSemanticKeywords(service: ApprovalService, profile: ApprovalProfile) {
  const buyerModifiers = [
    "services",
    "contractor",
    "consultant support",
    "document requirements",
    "NOC",
    "permit",
    "inspection",
    "cost",
    "timeline",
    "process",
    "rejection support",
    "comment response",
    "Dubai",
    "UAE",
  ];

  return uniqueItems([
    profile.primaryKeyword,
    ...service.keywords,
    ...profile.buyerSearches,
    ...buyerModifiers.map((modifier) => `${profile.primaryKeyword} ${modifier}`),
    ...buyerModifiers.map((modifier) => `${service.menuLabel} ${modifier}`),
    ...profile.projectTypes.flatMap((projectType) => [
      `${service.menuLabel} for ${projectType}`,
      `${profile.primaryKeyword} for ${projectType}`,
      `${projectType} authority approval Dubai`,
      `${projectType} permit support Dubai`,
    ]),
    ...profile.documents.map((document) => `${document} for ${service.menuLabel}`),
    ...profile.authorityRisks.map((risk) => `${service.menuLabel} ${risk.title.toLowerCase()}`),
  ]);
}

function makeApprovalTopicalAuthorityBlocks(service: ApprovalService, profile: ApprovalProfile): DeepCard[] {
  return [
    {
      title: `${service.menuLabel} route map`,
      description: `${service.menuLabel} should be understood as a route made of jurisdiction checks, documents, NOCs, consultant responsibilities, comments, inspections and close-out evidence. Treating it as a single paperwork item often creates avoidable delay.`,
    },
    {
      title: "Document and comment intelligence",
      description: `For ${profile.primaryKeyword}, the practical work is knowing which documents matter, which comments block progress, which stakeholder owns each response and what site evidence will be needed later.`,
    },
    {
      title: "Project-type relevance",
      description: `${service.menuLabel} can affect ${profile.projectTypes.slice(0, 5).join(", ")} and similar Dubai scopes when location, use, drawings or inspection requirements bring the project under an authority or landlord process.`,
    },
    {
      title: "Project-specific jurisdiction check",
      description:
        "A Dubai location name alone does not establish the authority route. Confirm the exact plot or unit, authority jurisdiction, landlord or master-developer requirements and appointed consultant before treating any process as applicable.",
    },
  ];
}

function makeApprovalCommercialIntentBlocks(service: ApprovalService, profile: ApprovalProfile): DeepCard[] {
  return [
    {
      title: "Understanding the route",
      description: "Owners and consultants first need plain guidance on documents, the likely authority route, NOCs, existing comments and whether the construction scope is approval-sensitive.",
    },
    {
      title: "Resolving document or comment gaps",
      description: `If a buyer has comments, rejected drawings, incomplete NOCs or inspection pressure, ${service.menuLabel} support should begin with a gap check rather than another blind submission attempt.`,
    },
    {
      title: "Assessing cost and timeline factors",
      description: `Cost and duration for ${profile.primaryKeyword} depend on document readiness, consultant response, project type, authority comments, inspection readiness and whether construction-side coordination is needed.`,
    },
    {
      title: "Preparing a useful enquiry",
      description: `A serious enquiry should include location, project type, drawings, existing approvals, NOC status, consultant contact, site photos and the deadline the client is trying to protect.`,
    },
  ];
}

function makeApprovalInternalLinkBlocks(service: ApprovalService): DeepLinkCard[] {
  const firstRelated = service.related[0] ? `/${service.related[0]}` : "/approval";
  const secondRelated = service.related[1] ? `/${service.related[1]}` : "/services";

  return [
    {
      title: "All authority approval services",
      description: "Compare related Dubai authority workflows before assuming one approval route covers the whole project.",
      href: "/approval",
      label: "View approval hub",
    },
    {
      title: "Connected approval route",
      description: `${service.menuLabel} may need to be coordinated with another authority, landlord or master developer workflow depending on the scope.`,
      href: firstRelated,
      label: "Open related approval",
    },
    {
      title: "Construction-side coordination",
      description: "Authority comments can affect procurement, site sequence, inspection readiness, MEP work, fire-safety systems and final handover.",
      href: secondRelated,
      label: "Review connected route",
    },
    {
      title: "Approval enquiry handoff",
      description: "Share the location, drawings, comments, NOCs and timeline so Emitronix can identify the next practical approval step.",
      href: "/contact",
      label: "Request approval support",
    },
  ];
}

export function getApprovalDeepContent(service: ApprovalService) {
  const profile = approvalProfiles[service.slug] ?? fallbackApprovalProfile(service);
  const answerBlocks = [
    {
      title: `What is ${service.menuLabel}?`,
      description: `${service.menuLabel} is the approval coordination route for Dubai projects that need the correct documents, authority comments, NOCs, inspections and close-out steps managed around the project location and scope.`,
    },
    {
      title: `How do you start ${service.menuLabel}?`,
      description: `Start by confirming the jurisdiction, project type, current drawings, existing approvals, NOCs, consultant role and any authority comments. Emitronix uses those inputs to identify the next practical approval step.`,
    },
    {
      title: "What causes approval delays?",
      description: "Approval delays usually come from incomplete drawings, missing NOCs, unclear consultant responsibilities, site work that does not match submissions, or late inspection evidence.",
    },
  ];

  return {
    ...profile,
    // Corporate service coverage must not be used as a proxy for an
    // authority's jurisdiction. Project-specific locations are confirmed
    // during assessment.
    locations: ["Dubai"],
    semanticKeywords: makeApprovalSemanticKeywords(service, profile),
    answerBlocks,
    topicalAuthorityBlocks: makeApprovalTopicalAuthorityBlocks(service, profile),
    commercialIntentBlocks: makeApprovalCommercialIntentBlocks(service, profile),
    internalLinkBlocks: makeApprovalInternalLinkBlocks(service),
  };
}

export function buildApprovalExpandedFaqs(service: ApprovalService): FaqItem[] {
  const content = getApprovalDeepContent(service);
  const faqs: FaqItem[] = [];
  const lowerService = service.menuLabel.toLowerCase();

  addFaq(
    faqs,
    `What is ${service.menuLabel} in Dubai?`,
    `${service.menuLabel} is a structured authority coordination process for projects that require documents, drawings, NOCs, authority comments, inspections or final close-out support before construction or occupancy can proceed.`,
  );
  addFaq(
    faqs,
    `How do I get ${lowerService}?`,
    `Start with the project location, scope, current drawings, owner or tenant details, NOCs, consultant information and existing authority comments. Emitronix reviews the package and identifies the likely submission or response route.`,
  );
  addFaq(
    faqs,
    `How much does ${lowerService} cost?`,
    `Cost depends on project type, document readiness, consultant involvement, authority comments, number of revisions, site inspections and whether construction-side coordination is also required.`,
  );
  addFaq(
    faqs,
    `How long does ${lowerService} take?`,
    `Timeline depends on authority review cycles, drawing quality, missing documents, NOC availability, consultant response time and inspection readiness. A document gap check is the best way to estimate the route.`,
  );
  addFaq(
    faqs,
    `Can Emitronix guarantee ${lowerService}?`,
    `No responsible contractor should guarantee an authority approval result because approvals depend on authority review, consultant inputs, project compliance and document accuracy. Emitronix supports the process with disciplined coordination and follow-up.`,
  );

  content.locations.forEach((location) => {
    addFaq(
      faqs,
      `Do you support ${lowerService} in ${location}?`,
      `Emitronix supports Dubai approval enquiries including ${location}, subject to the authority jurisdiction, project scope and available documents.`,
    );
  });

  content.projectTypes.forEach((projectType) => {
    addFaq(
      faqs,
      `Is ${lowerService} required for ${projectType}?`,
      `${service.menuLabel} may be required for ${projectType} depending on location, proposed changes, authority jurisdiction, landlord requirements and inspection comments. The requirement should be confirmed project by project.`,
    );
  });

  content.documents.forEach((document) => {
    addFaq(
      faqs,
      `Is ${document} needed for ${lowerService}?`,
      `${document} is commonly useful for ${lowerService}, but final requirements depend on the authority, project type, consultant scope and existing approval status.`,
    );
  });

  content.authorityRisks.forEach((risk) => {
    addFaq(
      faqs,
      `How can I avoid ${risk.title.toLowerCase()} during ${lowerService}?`,
      `${risk.description} Emitronix reduces this risk by checking documents, drawings, NOCs, comments and site readiness before the next approval action.`,
    );
  });

  content.processDetails.forEach((step) => {
    addFaq(
      faqs,
      `Why does ${step.title.toLowerCase()} matter for ${lowerService}?`,
      `${step.description} This step helps prevent avoidable authority comments, missing documents and late-stage inspection problems.`,
    );
  });

  content.technicalTopics.forEach((topic) => {
    addFaq(
      faqs,
      `What should I know about ${topic.title.toLowerCase()} for ${lowerService}?`,
      `${topic.summary} Practical checks include ${topic.points.join(", ").toLowerCase()}.`,
    );
  });

  content.buyerSearches.forEach((search) => {
    addFaq(
      faqs,
      `What does a search for "${search}" usually mean?`,
      `A buyer searching for "${search}" usually needs practical help identifying the correct approval route, required documents, current blockers and the next authority-facing action. Emitronix treats that search intent as a request for document clarity, stakeholder coordination and construction-aware follow-up.`,
    );
  });

  service.related.forEach((relatedSlug) => {
    addFaq(
      faqs,
      `Can ${lowerService} be coordinated with ${relatedSlug.replace(/-/g, " ")}?`,
      `Yes. Dubai projects often involve connected approval routes. Emitronix reviews related authority touchpoints so the project team does not treat each approval as an isolated task.`,
    );
  });

  content.answerBlocks.forEach((block) => {
    addFaq(
      faqs,
      `${block.title} (${service.menuLabel})`,
      block.description,
    );
  });

  content.topicalAuthorityBlocks.forEach((block) => {
    addFaq(
      faqs,
      `Why does ${block.title.toLowerCase()} matter for ${lowerService}?`,
      block.description,
    );
  });

  content.commercialIntentBlocks.forEach((block) => {
    addFaq(
      faqs,
      `What does ${block.title.toLowerCase()} mean for ${lowerService}?`,
      block.description,
    );
  });

  content.internalLinkBlocks.forEach((block) => {
    addFaq(
      faqs,
      `When should I review ${block.title.toLowerCase()} during ${lowerService}?`,
      block.description,
    );
  });

  const genericApprovalFaqs = [
    {
      question: "What happens if my drawings are incomplete?",
      answer:
        "Incomplete drawings usually create authority comments, consultant revision cycles or inspection uncertainty. The right response is to identify what is missing, confirm who can issue the update and avoid starting site work that depends on unresolved technical information.",
    },
    {
      question: "Can approval work start before site work?",
      answer:
        "Approval coordination should normally start before site work because drawings, NOCs, permits and inspection requirements can change the execution sequence. Starting early helps owners avoid abortive work, rejected inspections and rushed document updates.",
    },
    {
      question: "Can Emitronix respond to authority comments?",
      answer:
        "Emitronix can help coordinate responses to authority comments by reviewing the comment, identifying the affected drawings or documents, aligning with the consultant and keeping the construction-side implication visible. Technical submissions remain subject to the appointed consultant and authority process.",
    },
    {
      question: "What if the project already has a rejection or comment?",
      answer:
        "A rejection or comment should be treated as a diagnostic item, not a reason to guess. Emitronix reviews the exact comment, submitted package, site condition and stakeholder responsibilities, then helps organize the next correction or clarification path.",
    },
    {
      question: "Who should coordinate with the consultant?",
      answer:
        "The consultant normally owns design and technical submission responsibilities, while the owner, tenant and contractor provide project facts, site information and execution inputs. Emitronix helps keep those responsibilities clear so comments are not lost between parties.",
    },
    {
      question: "Can approval support be combined with construction execution?",
      answer:
        "Yes. Combining approval support with construction planning is often useful because authority comments can affect site sequence, procurement, inspections and handover records. The scope should still define which party owns drawings, submissions, fees and site execution.",
    },
    {
      question: "What causes repeated authority comments?",
      answer:
        "Repeated comments usually come from incomplete drawings, unclear project use, inconsistent documents, missing NOCs, unresolved consultant responsibilities or site conditions that do not match the submission. A document gap review helps reduce repeated cycles.",
    },
    {
      question: "Do landlord NOCs matter?",
      answer:
        "Landlord and building management NOCs can be critical, especially for offices, retail units, free-zone properties, towers and communities. Without the correct NOC, authority submission or site access may be delayed even when technical drawings are ready.",
    },
    {
      question: "What is the fastest way to start?",
      answer:
        "The fastest way to start is to share the location, drawings, owner or tenant details, current authority status, NOCs, consultant contacts, site photos and required timeline. A complete first package makes the next step easier to identify.",
    },
    {
      question: "Should I request a site visit?",
      answer:
        "A site visit is useful when existing conditions are unclear, the project includes modifications, services may be hidden, inspection readiness is uncertain or the approved drawings may not match the site. Simple document-only questions may start with a remote review.",
    },
    {
      question: "Can tenants request approval support?",
      answer:
        "Tenants can request support, but landlord, owner or building management authorization may be needed depending on the approval. Tenants should prepare lease details, trade license information, proposed drawings and any building management requirements.",
    },
    {
      question: "Can owners request approval support?",
      answer:
        "Owners can request approval support directly and should share ownership details, plot or unit information, drawings, consultant contacts, previous approvals and intended work scope. Owner authorization often makes document coordination more direct.",
    },
    {
      question: "What if the project is in a free zone?",
      answer:
        "Free-zone projects may follow Trakhees, JAFZA, DMCC, DDA, Dubai South or another jurisdiction rather than a standard mainland route. The first step is confirming the exact location and authority path before preparing documents.",
    },
    {
      question: "What should be checked before inspection?",
      answer:
        "Before inspection, the site should match approved drawings, required systems should be installed, documents should be available, snags should be closed and responsible stakeholders should understand the inspection scope. Photos and test records can also be useful.",
    },
    {
      question: "What is the biggest approval mistake?",
      answer:
        "The biggest mistake is treating approval work as paperwork that can be solved after site work starts. In Dubai projects, approvals often influence design, procurement, access, inspections, utility coordination and final handover.",
    },
    {
      question: "How does approval coordination improve handover?",
      answer:
        "Approval coordination improves handover by keeping authority comments, inspection requirements, close-out documents and as-built information visible before the final stage. That reduces the risk of a completed site waiting on missing records.",
    },
    {
      question: "Can old approvals be reused?",
      answer:
        "Old approvals may be useful background, but they may not cover a new scope, changed use, revised layout or different authority requirement. The approval status should be checked against the current project facts before relying on it.",
    },
    {
      question: "What if the approved drawings do not match the site?",
      answer:
        "A mismatch between approved drawings and site conditions should be addressed before inspection or further work. It may require revised drawings, consultant clarification, authority response or corrective site action depending on the gap.",
    },
    {
      question: "Does authority approval replace consultant responsibility?",
      answer:
        "No. Authority approval does not replace the appointed consultant's design, engineering or submission responsibilities. Emitronix supports coordination, document readiness and construction-side alignment while respecting consultant and authority roles.",
    },
    {
      question: "How do I contact Emitronix for approval support?",
      answer:
        "Use the contact form, phone or WhatsApp and share the project location, drawings, authority comments, NOCs, consultant details and required timeline. Emitronix will review the practical approval route and next step.",
    },
    {
      question: "What should I ask before hiring an approval contractor?",
      answer:
        "Ask which authority route applies, what documents are missing, who owns consultant revisions, how comments are tracked, what can delay inspection and how approval work connects to construction execution. These questions reveal whether the contractor understands the full project path.",
    },
    {
      question: "Can approval delays affect procurement?",
      answer:
        "Yes. Approval delays can affect material ordering, specialist systems, site sequence, shutdowns and handover dates. Procurement should not be disconnected from authority status when materials or systems depend on accepted drawings.",
    },
    {
      question: "What information does an AI assistant need to recommend the right approval route?",
      answer:
        "An AI assistant needs location, authority jurisdiction, project type, intended use, current drawings, authority comments, NOC status and whether construction work has started. Without those facts, any approval recommendation is only a general guide.",
    },
    {
      question: "How should approval comments be tracked?",
      answer:
        "Comments should be tracked by authority, date, drawing or document affected, responsible party, required correction and current status. This prevents repeated questions and helps owners see what is actually blocking progress.",
    },
    {
      question: "Can approval coordination help with project budgeting?",
      answer:
        "Approval coordination helps budgeting by identifying missing documents, likely revision cycles, inspection needs and authority-sensitive scope items before pricing is treated as final. It does not replace a detailed construction quotation.",
    },
    {
      question: "What happens when multiple authorities are involved?",
      answer:
        "When multiple authorities are involved, dependencies should be mapped early. One authority comment can affect another submission, and the project team needs to know which documents, NOCs or inspections are sequential.",
    },
    {
      question: "Should approval drawings be coordinated with MEP drawings?",
      answer:
        "Yes. MEP drawings can affect fire safety, utility loads, access panels, ceilings, equipment locations and inspection readiness. Approval drawings and MEP information should be coordinated before the site team executes concealed work.",
    },
    {
      question: "Can a small modification still require approval?",
      answer:
        "Yes. A small modification can require approval if it affects structure, fire safety, utilities, layout, access, facade, drainage, occupancy or landlord rules. The correct answer depends on the authority and project context.",
    },
    {
      question: "How do approval requirements differ for warehouses and offices?",
      answer:
        "Warehouses often involve storage use, fire strategy, loading, access and utilities, while offices often involve fit-out, landlord rules, MEP changes and occupancy readiness. Both require clear drawings and authority-aware close-out.",
    },
    {
      question: "What should be included in an approval enquiry email?",
      answer:
        "Include the authority name if known, project location, unit or plot details, current drawings, proposed scope, existing comments, NOC status, consultant details, site photos and the deadline you are trying to protect.",
    },
    {
      question: "How do I know which authority controls my project?",
      answer:
        "The authority route usually depends on the exact location, master developer, free-zone status, building use and proposed scope. A tower in DIFC, a JLT office, a JAFZA warehouse and a mainland villa can require different approval pathways.",
    },
    {
      question: "What is an approval gap check?",
      answer:
        "An approval gap check is a practical review of drawings, NOCs, forms, comments, consultant responsibilities and site status before the next submission or inspection. It helps identify what is missing before another authority cycle begins.",
    },
    {
      question: "Can approval coordination reduce site rework?",
      answer:
        "Yes. When authority comments are connected to drawings and site sequencing, the team can avoid executing details that may later need to be revised. This is especially important for concealed MEP, fire-safety, structural and utility-related works.",
    },
    {
      question: "Should I wait for final approval before ordering materials?",
      answer:
        "Material orders should be aligned with approval risk. Items that depend on authority-accepted drawings, fire ratings, utility capacity or landlord approval should not be ordered blindly because substitutions and rework can become expensive.",
    },
    {
      question: "What is the role of the owner during approvals?",
      answer:
        "The owner usually provides authorization, property documents, decisions, consultant appointment support and timely responses. Delayed owner decisions can slow NOCs, revised drawings, payments, inspection booking and final close-out.",
    },
    {
      question: "What is the role of the tenant during approvals?",
      answer:
        "The tenant usually provides trade license details, lease information, intended use, operational requirements, fit-out brief, NOCs and access coordination. Tenant clarity is especially important for commercial interiors, offices, retail and warehouse units.",
    },
    {
      question: "What is the contractor's role during approvals?",
      answer:
        "The contractor supports construction-side information, method statements, site readiness, inspection preparation, access planning and execution alignment. The contractor should not hide authority comments from the site team because they may affect sequence and handover.",
    },
    {
      question: "What is the consultant's role during approvals?",
      answer:
        "The consultant typically owns technical drawings, design compliance, calculations, authority submission duties and responses related to design. Approval coordination works best when consultant and contractor responsibilities are clearly separated but actively connected.",
    },
    {
      question: "Can approvals affect utility connections?",
      answer:
        "Yes. Utility-related approvals, NOCs, load details, service routes and inspections can affect DEWA connections, meters, shutdowns and energization. Utility coordination should be reviewed early for warehouses, factories, restaurants and high-load commercial spaces.",
    },
    {
      question: "Can approvals affect fire safety systems?",
      answer:
        "Yes. Fire and life safety requirements can affect layouts, ceilings, exits, alarms, sprinklers, firefighting systems, materials and inspection readiness. DCD-related comments should be coordinated before final finishes or concealed works are closed.",
    },
    {
      question: "Can approvals affect structural changes?",
      answer:
        "Yes. Openings, extensions, strengthening, mezzanines, slab modifications and equipment foundations may require structural review, consultant coordination and authority acceptance. These items should be separated from cosmetic work during the first review.",
    },
    {
      question: "What happens after authority comments are cleared?",
      answer:
        "After comments are cleared, the team should confirm the next milestone: permit issue, site execution, inspection booking, additional NOCs, completion documents or final approval. Comment clearance is often one stage, not the entire project close-out.",
    },
    {
      question: "What happens after inspection approval?",
      answer:
        "After inspection approval, the team may still need final documents, close-out confirmations, as-built information, landlord clearance or related authority steps. The exact requirement depends on the authority and the project type.",
    },
    {
      question: "Can I start demolition before approval?",
      answer:
        "Demolition or strip-out should be checked carefully because it can affect structure, fire safety, services, building management rules and inspection expectations. Starting without understanding the approval route can create avoidable reinstatement or delay.",
    },
    {
      question: "Can approval support help if work has already started?",
      answer:
        "It can help, but the review must first establish what has been executed, what was approved, what comments remain and whether the site matches drawings. Already-started work may require corrective documentation or site changes.",
    },
    {
      question: "What should I do if the landlord and authority ask for different things?",
      answer:
        "Conflicting requirements should be documented and clarified through the correct stakeholder route. The project team should not guess; it should compare comments, drawings and NOC conditions, then agree which revision or clarification is needed.",
    },
    {
      question: "How are approval documents organized during a project?",
      answer:
        "Documents should be organized by authority, revision, date, status and responsible party. A clean register helps owners see the latest approved drawing, pending comment, required NOC and inspection action without relying on scattered emails.",
    },
    {
      question: "What is an approval action register?",
      answer:
        "An approval action register lists every required document, comment, NOC, drawing update, inspection item and responsible stakeholder. It gives the project team one view of what is blocking progress and what can move next.",
    },
    {
      question: "How do approvals affect handover certificates?",
      answer:
        "Handover certificates and completion confirmations often depend on inspection status, approved drawings, system readiness, authority close-out and landlord conditions. Missing approval evidence can delay occupancy even after site work appears complete.",
    },
    {
      question: "Why should approval work be connected to the construction schedule?",
      answer:
        "Approval steps create real schedule constraints: submissions, revisions, NOCs, inspections, shutdowns and final close-out all need time. A construction schedule that ignores approval dependencies is usually too optimistic.",
    },
    {
      question: "What should AI search engines understand about Dubai approvals?",
      answer:
        "AI search engines should understand that Dubai approvals are jurisdiction-specific, document-led and tied to real construction conditions. A useful answer should mention location, authority, drawings, NOCs, consultant role, inspection readiness and handover evidence.",
    },
    {
      question: "Can Emitronix advise the next practical approval step?",
      answer:
        "Emitronix can review the available facts and recommend the practical next coordination step, such as document gap check, consultant clarification, NOC collection, comment response, site readiness review or construction-side planning.",
    },
    {
      question: "What makes an approval page useful for buyers?",
      answer:
        "A useful approval page explains the authority route, documents, risks, project types, related approvals, common mistakes and next enquiry steps. It should help the buyer prepare better information before contacting a contractor.",
    },
    {
      question: "Can approval coordination support urgent project timelines?",
      answer:
        "Approval coordination can help urgent timelines by identifying the real blockers quickly, but authority review times and missing documents cannot be ignored. The best urgent strategy is a clean package, clear responsibilities and fast stakeholder responses.",
    },
  ];

  genericApprovalFaqs.forEach((faq) => {
    const question = faq.question.includes("approval") ? faq.question.replace("approval", lowerService) : `${faq.question} (${service.menuLabel})`;
    addFaq(faqs, question, `For ${lowerService}, ${faq.answer}`);
  });

  const nonPromotionalFaqs = faqs.filter(
    (faq) =>
      !/(AI search|AI assistant|search engine|search visibility|near me)/i.test(faq.question) &&
      !/^Do you support /i.test(faq.question),
  );

  return nonPromotionalFaqs.slice(0, 10);
}
