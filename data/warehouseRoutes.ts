export type WarehouseSiloTopic = {
  title: string;
  slug: string;
  keyword: string;
  category: string;
  intent: string;
  assetType: string;
  serviceModifier: string;
  primaryAudience: string;
  authorityFocus: string[];
};

const topic = (
  title: string,
  slug: string,
  category: string,
  intent: string,
  assetType: string,
  serviceModifier: string,
  primaryAudience: string,
  authorityFocus: string[],
): WarehouseSiloTopic => ({
  title,
  slug,
  keyword: title,
  category,
  intent,
  assetType,
  serviceModifier,
  primaryAudience,
  authorityFocus,
});

export const warehouseSiloTopics: WarehouseSiloTopic[] = [
  topic("Warehouse Construction Dubai", "warehouse-construction-dubai", "Warehouse Construction", "plan and appoint a warehouse construction contractor in Dubai", "warehouse", "construction", "owners, investors and logistics operators", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Contractors Dubai", "warehouse-contractors-dubai", "Warehouse Construction", "compare and shortlist warehouse contractors in Dubai", "warehouse", "contracting", "procurement teams and project owners", ["Dubai Municipality", "DCD", "Trakhees"]),
  topic("Warehouse Builder UAE", "warehouse-builder-uae", "Warehouse Construction", "find a UAE warehouse builder for industrial and logistics assets", "warehouse", "building", "developers and UAE industrial tenants", ["Dubai Municipality", "DCD", "JAFZA"]),
  topic("Industrial Warehouse Construction", "industrial-warehouse-construction", "Industrial Construction", "build industrial warehouse facilities with operational planning", "industrial warehouse", "construction", "manufacturers and industrial operators", ["DCD", "DEWA", "Dubai Municipality"]),
  topic("Steel Warehouse Construction", "steel-warehouse-construction", "Steel Structures", "deliver steel warehouse structures with civil coordination", "steel warehouse", "construction", "warehouse owners and design teams", ["Dubai Municipality", "DCD", "Trakhees"]),
  topic("Warehouse Civil Contractor", "warehouse-civil-contractor", "Civil Works", "appoint a civil contractor for warehouse enabling and concrete works", "warehouse", "civil contracting", "consultants and main contractors", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Design & Build", "warehouse-design-build", "Design & Build", "manage warehouse design and build from concept to handover", "warehouse", "design and build", "owners seeking a single delivery route", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Engineering", "warehouse-engineering", "Engineering", "coordinate engineering decisions for warehouse performance", "warehouse", "engineering", "consultants, owners and facility planners", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Factory Construction", "factory-construction", "Industrial Construction", "construct factories and production facilities in the UAE", "factory", "construction", "factory owners and manufacturers", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Industrial Building Construction", "industrial-building-construction", "Industrial Construction", "deliver industrial building construction for operations and logistics", "industrial building", "construction", "industrial developers and tenants", ["Dubai Municipality", "DCD", "JAFZA"]),
  topic("Distribution Centre Construction", "distribution-centre-construction", "Logistics Construction", "construct distribution centres with loading and logistics planning", "distribution centre", "construction", "3PL teams and logistics operators", ["Dubai Municipality", "DCD", "RTA"]),
  topic("Logistics Warehouse", "logistics-warehouse", "Logistics Construction", "plan logistics warehouse buildings for goods movement", "logistics warehouse", "construction", "logistics and supply chain teams", ["DCD", "DEWA", "Dubai South"]),
  topic("Cold Storage Warehouse", "cold-storage-warehouse", "Specialist Warehouse", "coordinate cold storage warehouse construction and utility demands", "cold storage warehouse", "construction", "food, pharma and cold-chain operators", ["DCD", "DEWA", "Dubai Municipality"]),
  topic("Warehouse Expansion", "warehouse-expansion", "Warehouse Upgrade", "expand an existing warehouse with civil and approval planning", "warehouse", "expansion", "operators with growing storage demand", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Renovation", "warehouse-renovation", "Warehouse Upgrade", "renovate warehouses without losing operational control", "warehouse", "renovation", "facility owners and tenants", ["Dubai Municipality", "DCD", "Trakhees"]),
  topic("Warehouse Extension", "warehouse-extension", "Warehouse Upgrade", "extend warehouse space with structural and authority coordination", "warehouse", "extension", "warehouse owners and consultants", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Fit-Out", "warehouse-fit-out", "Fit-Out", "prepare warehouse interiors for operation, storage and office use", "warehouse", "fit-out", "tenants and logistics operators", ["DCD", "DEWA", "Dubai Municipality"]),
  topic("Warehouse Maintenance", "warehouse-maintenance", "Maintenance", "maintain warehouse assets with civil, safety and operational awareness", "warehouse", "maintenance", "facility managers and owners", ["DCD", "DEWA", "Dubai Municipality"]),
  topic("Warehouse Flooring", "warehouse-flooring", "Civil Works", "deliver warehouse flooring suitable for loading and operations", "warehouse", "flooring", "operators using forklifts, racking and storage", ["Dubai Municipality", "DCD"]),
  topic("Warehouse Roofing", "warehouse-roofing", "Civil Works", "upgrade or construct warehouse roofing with durability planning", "warehouse", "roofing", "asset owners and facility managers", ["Dubai Municipality", "DCD"]),
  topic("Warehouse Structural Steel", "warehouse-structural-steel", "Steel Structures", "coordinate warehouse structural steel works", "warehouse", "structural steel", "consultants and industrial owners", ["Dubai Municipality", "DCD"]),
  topic("Warehouse Foundations", "warehouse-foundations", "Civil Works", "plan warehouse foundations, slabs and substructure works", "warehouse", "foundation works", "consultants and project owners", ["Dubai Municipality"]),
  topic("Warehouse MEP", "warehouse-mep", "MEP Coordination", "coordinate warehouse MEP interfaces with civil construction", "warehouse", "MEP coordination", "operators and fit-out teams", ["DEWA", "DCD", "Dubai Municipality"]),
  topic("Warehouse Fire Fighting", "warehouse-fire-fighting", "Life Safety", "coordinate warehouse fire fighting requirements with DCD visibility", "warehouse", "fire fighting coordination", "warehouse owners and safety teams", ["DCD", "Dubai Municipality"]),
  topic("Warehouse Fire Alarm", "warehouse-fire-alarm", "Life Safety", "coordinate warehouse fire alarm planning and approval touchpoints", "warehouse", "fire alarm coordination", "owners and fire-safety consultants", ["DCD"]),
  topic("Warehouse Authority Approvals", "warehouse-authority-approvals", "Authority Approvals", "map the authority approval route for warehouse projects", "warehouse", "authority approval coordination", "owners, consultants and tenants", ["Dubai Municipality", "DCD", "DEWA", "Trakhees", "DDA"]),
  topic("Warehouse DEWA Approvals", "warehouse-dewa-approvals", "Authority Approvals", "plan DEWA requirements for warehouse utility connections", "warehouse", "DEWA approval coordination", "owners and MEP consultants", ["DEWA"]),
  topic("Warehouse DM Approvals", "warehouse-dm-approvals", "Authority Approvals", "coordinate Dubai Municipality approval exposure for warehouses", "warehouse", "Dubai Municipality approval coordination", "owners and consultants", ["Dubai Municipality"]),
  topic("Warehouse DCD Approvals", "warehouse-dcd-approvals", "Authority Approvals", "coordinate DCD fire and life safety approval exposure for warehouses", "warehouse", "DCD approval coordination", "warehouse owners and fire consultants", ["DCD"]),
  topic("Warehouse Completion", "warehouse-completion", "Handover", "prepare warehouse completion, inspections and close-out evidence", "warehouse", "completion support", "owners and project managers", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse EPC Contractor", "warehouse-epc-contractor", "Turnkey Delivery", "manage EPC-style warehouse delivery with engineering and procurement clarity", "warehouse", "EPC contracting", "industrial owners and developers", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Turnkey Contractor", "warehouse-turnkey-contractor", "Turnkey Delivery", "appoint a turnkey warehouse contractor for coordinated delivery", "warehouse", "turnkey contracting", "owners who need end-to-end delivery", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Project Management", "warehouse-project-management", "Project Management", "manage warehouse design, approvals, construction and handover", "warehouse", "project management", "owners and consultants", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Cost Guide", "warehouse-cost-guide", "Cost Planning", "understand warehouse construction cost drivers in Dubai", "warehouse", "cost planning", "owners and procurement teams", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Construction Timeline", "warehouse-construction-timeline", "Planning", "plan realistic warehouse construction timelines", "warehouse", "timeline planning", "project owners and schedulers", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Design Standards UAE", "warehouse-design-standards-uae", "Design Standards", "understand warehouse design standards and operational factors in the UAE", "warehouse", "design standards", "consultants and owners", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Contractor Checklist", "warehouse-contractor-checklist", "Procurement", "check what to review before appointing a warehouse contractor", "warehouse", "contractor selection", "procurement teams and owners", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Safety Standards", "warehouse-safety-standards", "Safety", "coordinate warehouse safety expectations during construction", "warehouse", "safety planning", "owners and HSE teams", ["DCD", "Dubai Municipality"]),
  topic("Warehouse Compliance UAE", "warehouse-compliance-uae", "Compliance", "keep warehouse construction compliant with UAE authority expectations", "warehouse", "compliance planning", "owners and consultants", ["Dubai Municipality", "DCD", "DEWA", "Trakhees"]),
  topic("Warehouse Planning", "warehouse-planning", "Planning", "plan warehouse scope, approvals, design and construction route", "warehouse", "planning", "project owners and consultants", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Consultant", "warehouse-consultant", "Consultant Coordination", "coordinate warehouse consultant inputs and contractor delivery", "warehouse", "consultant coordination", "owners and design consultants", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Civil Works", "warehouse-civil-works", "Civil Works", "execute warehouse civil works from enabling to handover", "warehouse", "civil works", "owners and site teams", ["Dubai Municipality", "DCD"]),
  topic("Warehouse Infrastructure", "warehouse-infrastructure", "Infrastructure", "coordinate warehouse infrastructure and external works", "warehouse", "infrastructure", "industrial owners and logistics operators", ["Dubai Municipality", "RTA", "DEWA"]),
  topic("Warehouse Utility Services", "warehouse-utility-services", "Utilities", "coordinate warehouse utility services and authority interfaces", "warehouse", "utility coordination", "owners and MEP consultants", ["DEWA", "Dubai Municipality", "DCD"]),
  topic("Warehouse Concrete Works", "warehouse-concrete-works", "Civil Works", "deliver warehouse concrete works, slabs and structural elements", "warehouse", "concrete works", "owners and civil consultants", ["Dubai Municipality"]),
  topic("Warehouse Loading Dock Construction", "warehouse-loading-dock-construction", "Logistics Construction", "construct warehouse loading docks for efficient goods movement", "warehouse", "loading dock construction", "logistics operators and 3PL teams", ["Dubai Municipality", "RTA", "DCD"]),
  topic("Warehouse Office Construction", "warehouse-office-construction", "Office Construction", "build warehouse offices and administrative blocks", "warehouse", "office construction", "warehouse tenants and owners", ["Dubai Municipality", "DCD", "DEWA"]),
  topic("Warehouse Parking Construction", "warehouse-parking-construction", "External Works", "construct warehouse parking and vehicle circulation areas", "warehouse", "parking construction", "warehouse owners and logistics teams", ["Dubai Municipality", "RTA"]),
  topic("Warehouse Road Works", "warehouse-road-works", "External Works", "coordinate warehouse road works and access routes", "warehouse", "road works", "industrial developers and facility owners", ["RTA", "Dubai Municipality", "Trakhees"]),
  topic("Warehouse Landscaping", "warehouse-landscaping", "External Works", "plan warehouse landscaping, boundaries and external finishes", "warehouse", "landscaping", "asset owners and developers", ["Dubai Municipality", "Trakhees"]),
];

export const warehouseSiloPaths = warehouseSiloTopics.map((topic) => `/warehouse/${topic.slug}`);

export const warehouseBlogClusterSeeds = [
  "Warehouse Construction Dubai",
  "Warehouse Contractors Dubai",
  "Industrial Warehouse Construction UAE",
  "Steel Warehouse Construction Dubai",
  "Warehouse Design and Build Dubai",
  "Warehouse Authority Approvals Dubai",
  "Warehouse DEWA Approvals",
  "Warehouse DCD Approvals",
  "Warehouse Dubai Municipality Approvals",
  "Cold Storage Warehouse Construction",
  "Logistics Warehouse Construction",
  "Warehouse Fit Out Dubai",
  "Warehouse Renovation Dubai",
  "Warehouse Flooring Dubai",
  "Warehouse Fire Fighting Dubai",
  "Warehouse MEP Coordination Dubai",
  "Factory Construction UAE",
  "Industrial Building Construction Dubai",
  "Warehouse Cost Planning Dubai",
  "Warehouse Project Management Dubai",
] as const;

export const warehouseBlogAngles = [
  { suffix: "Planning Guide", slugSuffix: "planning-guide", intent: "plan the project before contractor appointment" },
  { suffix: "Approval Checklist", slugSuffix: "approval-checklist", intent: "understand authority approval and document readiness" },
  { suffix: "Cost Factors", slugSuffix: "cost-factors", intent: "compare practical cost drivers and avoid budget surprises" },
  { suffix: "Timeline and Process", slugSuffix: "timeline-process", intent: "understand phases from concept to handover" },
  { suffix: "Contractor Selection", slugSuffix: "contractor-selection", intent: "choose a suitable contractor and avoid common mistakes" },
] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const warehouseBlogTopics = warehouseBlogClusterSeeds.flatMap((keyword, clusterIndex) =>
  warehouseBlogAngles.map((angle, angleIndex) => ({
    keyword,
    slug: `${slugify(keyword)}-${angle.slugSuffix}`,
    title: `${keyword}: ${angle.suffix}`,
    angle: angle.suffix,
    intent: angle.intent,
    clusterIndex,
    angleIndex,
  })),
);

export const warehouseBlogSlugs = warehouseBlogTopics.map((topic) => topic.slug);
