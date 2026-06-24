export type ApprovalService = {
  slug: string;
  href: string;
  menuLabel: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroText: string;
  overviewTitle: string;
  overview: string[];
  process: string[];
  documents: string[];
  whyChoose: string[];
  related: string[];
  keywords: string[];
};

export const approvalServices: ApprovalService[] = [
  {
    slug: "dubai-municipality-approval",
    href: "/dubai-municipality-approval",
    menuLabel: "Dubai Municipality Approval",
    seoTitle: "Dubai Municipality Approval Services | Emitronix Contracting LLC",
    metaDescription:
      "Get Dubai Municipality approval support for civil construction, villa, warehouse and commercial projects in Dubai with Emitronix Contracting LLC.",
    h1: "Dubai Municipality Approval Services in Dubai",
    eyebrow: "Dubai Municipality Approval",
    heroText:
      "Coordinated Dubai Municipality submission support for building permits, drawing reviews, inspections and completion workflows for civil construction projects.",
    overviewTitle: "Structured DM approval support for Dubai building projects.",
    overview: [
      "Dubai Municipality approval is a core requirement for many civil construction, villa, warehouse and commercial building works in Dubai. Emitronix helps clients prepare the right technical documents, coordinate submission comments and keep project teams aligned through each authority stage.",
      "Our approach focuses on practical engineering coordination, clear documentation control and timely response management, helping owners and consultants move from concept to approval with fewer delays.",
    ],
    process: [
      "Review project scope, plot details and applicable Dubai Municipality requirements.",
      "Coordinate drawings, forms and supporting technical documents for submission.",
      "Submit or support consultant submission through the relevant authority channel.",
      "Track comments, clarify authority responses and coordinate revisions with the design team.",
      "Support inspection readiness, completion documentation and close-out requirements.",
    ],
    documents: [
      "Trade license and owner details",
      "Title deed or tenancy information where applicable",
      "Architectural and structural drawings",
      "Site plan, affection plan or plot documents",
      "Consultant appointment and NOC documents",
      "Project method statements or technical reports when requested",
    ],
    whyChoose: [
      "Dubai-based construction and approval coordination team",
      "Civil project experience for villas, warehouses and commercial works",
      "Clear follow-up on authority comments and consultant revisions",
      "Single point of coordination from documents to inspection support",
    ],
    related: ["dda-approvals", "dcd-approvals", "rta-approval"],
    keywords: [
      "Dubai Municipality approval",
      "Dubai Municipality approval services",
      "authority approvals Dubai",
      "approval services in Dubai",
      "building approval Dubai",
    ],
  },
  {
    slug: "dda-approvals",
    href: "/dda-approvals",
    menuLabel: "DDA Approvals",
    seoTitle: "DDA Approval Services Dubai | Dubai Development Authority Approvals",
    metaDescription:
      "Emitronix provides DDA approval coordination in Dubai for civil construction, fit-out, building modification and development authority submissions.",
    h1: "DDA Approval Services in Dubai",
    eyebrow: "Dubai Development Authority",
    heroText:
      "Dubai Development Authority approval support for projects within DDA-regulated communities, including document preparation, submission follow-up and inspection coordination.",
    overviewTitle: "DDA approvals managed with clear technical coordination.",
    overview: [
      "DDA approvals can involve master developer requirements, drawing compliance, community guidelines and authority submission protocols. Emitronix supports clients with a practical approval path tailored to the project location and scope.",
      "We coordinate with owners, consultants and project stakeholders to reduce missing-document issues and keep submissions moving through review, comments and final clearance.",
    ],
    process: [
      "Confirm whether the project falls under DDA or related master developer requirements.",
      "Review design scope, building use and proposed civil or fit-out works.",
      "Prepare the drawing package, application forms and supporting documents.",
      "Coordinate submission comments and consultant updates until technical acceptance.",
      "Support inspection, permit close-out and final approval documentation.",
    ],
    documents: [
      "Owner or tenant authorization",
      "Trade license and Emirates ID or passport copies",
      "Existing layout and proposed drawings",
      "Structural or civil details where applicable",
      "Community or master developer NOCs",
      "Contractor and consultant appointment letters",
    ],
    whyChoose: [
      "Experience with Dubai development authority workflows",
      "Coordination between client, consultant and site team",
      "Fast document gap checks before submission",
      "Support for both civil construction and interior fit-out scopes",
    ],
    related: ["dubai-municipality-approval", "difc-approvals", "concordia-dmcc-approvals"],
    keywords: [
      "DDA approvals",
      "DDA approval Dubai",
      "Dubai Development Authority approval",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
  {
    slug: "dcd-approvals",
    href: "/dcd-approvals",
    menuLabel: "DCD Approvals",
    seoTitle: "DCD Approval Services Dubai | Dubai Civil Defence Approval Support",
    metaDescription:
      "Dubai Civil Defence approval coordination for fire and life safety submissions, inspections and completion support for Dubai projects.",
    h1: "DCD Approval Services in Dubai",
    eyebrow: "Dubai Civil Defence",
    heroText:
      "Professional Dubai Civil Defence approval coordination for fire and life safety reviews, authority comments, inspection readiness and project close-out.",
    overviewTitle: "Dubai Civil Defence approvals for safer project delivery.",
    overview: [
      "DCD approval is essential for many commercial, warehouse, industrial, fit-out and building projects in Dubai. The process requires accurate life safety documentation, authority coordination and timely response to technical comments.",
      "Emitronix supports project owners and consultants by organizing required documents, tracking submissions and preparing the site team for inspection milestones.",
    ],
    process: [
      "Review project use, occupancy, layout and DCD approval requirements.",
      "Coordinate life safety drawings, compliance notes and supporting documents.",
      "Submit or support submission through the approved consultant or authority channel.",
      "Manage authority comments and coordinate revised drawings or clarifications.",
      "Prepare inspection support, final documentation and approval close-out.",
    ],
    documents: [
      "Approved architectural layouts",
      "Fire and life safety drawings",
      "Civil Defence application details",
      "Material or system compliance documents where requested",
      "Contractor and consultant details",
      "Inspection readiness checklist and site photographs",
    ],
    whyChoose: [
      "DCD-focused coordination for Dubai construction projects",
      "Detailed document review before authority submission",
      "Clear inspection preparation with the site team",
      "Practical support for warehouses, commercial spaces and fit-out works",
    ],
    related: ["dubai-municipality-approval", "dewa-approvals", "trakhees-approvals"],
    keywords: [
      "DCD approval",
      "DCD approval Dubai",
      "Dubai Civil Defence approval",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
  {
    slug: "dewa-approvals",
    href: "/dewa-approvals",
    menuLabel: "DEWA Approvals",
    seoTitle: "DEWA Approval Services Dubai | DEWA NOC and Submission Support",
    metaDescription:
      "DEWA approval and NOC coordination in Dubai for construction, villa, warehouse and commercial projects by Emitronix Contracting LLC.",
    h1: "DEWA Approval Services in Dubai",
    eyebrow: "DEWA Approval",
    heroText:
      "DEWA approval and NOC support for Dubai projects requiring utility coordination, submission follow-up and authority documentation control.",
    overviewTitle: "DEWA coordination for Dubai construction approvals.",
    overview: [
      "DEWA approval is often required during construction planning, utility coordination, building completion and project handover. Accurate application details and responsive follow-up help prevent avoidable delays.",
      "Emitronix supports clients with DEWA-related documentation, NOC coordination and communication between project stakeholders so civil works and authority milestones stay aligned.",
    ],
    process: [
      "Identify DEWA approval, NOC or utility coordination requirements for the project.",
      "Review project documents, load or service information and site constraints.",
      "Prepare application details and coordinate supporting drawings or letters.",
      "Follow up on authority comments, clarifications and revised documentation.",
      "Support completion-stage requirements and handover coordination.",
    ],
    documents: [
      "Owner and project details",
      "Trade license and consultant or contractor information",
      "Site plan, plot documents or tenancy details",
      "Approved drawings related to the requested service",
      "NOC letters where applicable",
      "Authority correspondence and previous approvals if available",
    ],
    whyChoose: [
      "Dubai authority coordination experience",
      "Organized DEWA document preparation and follow-up",
      "Support for villas, warehouses and commercial construction",
      "Responsive communication with consultants and client teams",
    ],
    related: ["dubai-municipality-approval", "dcd-approvals", "rta-approval"],
    keywords: [
      "DEWA approval",
      "DEWA approval Dubai",
      "DEWA NOC Dubai",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
  {
    slug: "trakhees-approvals",
    href: "/trakhees-approvals",
    menuLabel: "Trakhees Approvals",
    seoTitle: "Trakhees Approval Services Dubai | Free Zone Approval Support",
    metaDescription:
      "Trakhees approval coordination for Dubai free zone, warehouse, commercial and construction projects with Emitronix Contracting LLC.",
    h1: "Trakhees Approval Services in Dubai",
    eyebrow: "Trakhees Approval",
    heroText:
      "Trakhees approval support for construction, fit-out, warehouse and commercial projects in regulated free zone and development areas.",
    overviewTitle: "Trakhees approvals handled through a disciplined workflow.",
    overview: [
      "Trakhees-regulated projects often require careful coordination between client requirements, consultant documentation, zone rules and inspection milestones. Missing documents or unclear scope can slow approvals.",
      "Emitronix helps organize the submission package, coordinate responses and support site readiness so clients can progress through authority stages with confidence.",
    ],
    process: [
      "Confirm Trakhees jurisdiction, project category and applicable approval path.",
      "Review design drawings, scope details and NOC requirements.",
      "Prepare application documents and coordinate with consultants or project owners.",
      "Track authority comments and manage revised submissions where required.",
      "Support inspection coordination, final approvals and handover documents.",
    ],
    documents: [
      "Company trade license and authorization letters",
      "Lease agreement or plot-related documents",
      "Existing and proposed drawings",
      "Consultant and contractor appointment details",
      "NOC documents from landlord or master developer",
      "Method statements or technical reports when requested",
    ],
    whyChoose: [
      "Free zone and development approval awareness",
      "Practical support for warehouses and commercial units",
      "Clear document tracking from first submission to final approval",
      "Responsive coordination with client and consultant teams",
    ],
    related: ["dcd-approvals", "dda-approvals", "concordia-dmcc-approvals"],
    keywords: [
      "Trakhees approvals",
      "Trakhees approval Dubai",
      "free zone approvals Dubai",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
  {
    slug: "difc-approvals",
    href: "/difc-approvals",
    menuLabel: "DIFC Approvals",
    seoTitle: "DIFC Approval Services Dubai | Permit and Fit-Out Approval Support",
    metaDescription:
      "DIFC approval support in Dubai for commercial spaces, fit-out works, building modifications and permit coordination.",
    h1: "DIFC Approval Services in Dubai",
    eyebrow: "DIFC Approval",
    heroText:
      "DIFC permit and approval coordination for commercial interiors, office modifications and authority-controlled project works in Dubai.",
    overviewTitle: "DIFC approval support for premium commercial environments.",
    overview: [
      "Projects inside DIFC require careful alignment with building management, community guidelines, consultant documentation and authority review steps. A precise submission package helps prevent unnecessary approval cycles.",
      "Emitronix supports owners, tenants and consultants with structured document coordination, scope clarity and follow-up through permit, inspection and completion stages.",
    ],
    process: [
      "Review DIFC building requirements, landlord guidelines and project scope.",
      "Coordinate existing layouts, proposed drawings and technical documents.",
      "Prepare permit submission support and required NOC documentation.",
      "Track review comments and coordinate revised responses with the project team.",
      "Support inspection readiness and final completion documentation.",
    ],
    documents: [
      "Tenant or owner authorization",
      "Trade license and contact details",
      "Existing and proposed layouts",
      "Landlord or building management NOC",
      "Contractor and consultant appointment documents",
      "Insurance, method statement or work schedule where requested",
    ],
    whyChoose: [
      "Commercial project coordination experience in Dubai",
      "Careful handling of tenant, landlord and authority requirements",
      "Fast document readiness checks before submission",
      "Fit-out and civil modification support under one team",
    ],
    related: ["dda-approvals", "dubai-municipality-approval", "dcd-approvals"],
    keywords: [
      "DIFC approvals",
      "DIFC approval Dubai",
      "DIFC fit-out approval",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
  {
    slug: "concordia-dmcc-approvals",
    href: "/concordia-dmcc-approvals",
    menuLabel: "Concordia-DMCC Approvals Process",
    seoTitle: "Concordia DMCC Approval Process Dubai | JLT Approval Support",
    metaDescription:
      "Concordia-DMCC approval process support for JLT and DMCC projects, including fit-out, modifications, submissions and inspections.",
    h1: "Concordia-DMCC Approvals Process in Dubai",
    eyebrow: "Concordia-DMCC Approval",
    heroText:
      "Step-by-step Concordia-DMCC approval process support for JLT offices, retail units, commercial fit-outs and building modification works.",
    overviewTitle: "DMCC and Concordia approvals coordinated from documents to close-out.",
    overview: [
      "Projects in DMCC and JLT commonly require Concordia review, landlord coordination, detailed drawings and inspection control. The process can involve multiple stakeholders and strict documentation requirements.",
      "Emitronix helps clients understand the approval sequence, prepare a complete submission package and coordinate responses through permit issue, inspections and final handover.",
    ],
    process: [
      "Confirm unit location, landlord requirements and Concordia-DMCC approval scope.",
      "Review existing conditions, proposed layouts and technical documentation.",
      "Coordinate NOCs, contractor registration details and submission forms.",
      "Manage review comments, revisions and permit-stage follow-up.",
      "Support inspection booking, site readiness and final approval close-out.",
    ],
    documents: [
      "DMCC company or tenant details",
      "Lease agreement and landlord NOC",
      "Existing and proposed drawings",
      "Contractor appointment and insurance documents",
      "Work schedule, method statement and site safety documents",
      "Material details or technical reports where requested",
    ],
    whyChoose: [
      "Clear understanding of multi-party approval workflows",
      "Support for JLT offices, retail and commercial units",
      "Strong document control for submission and inspection stages",
      "Construction and fit-out team coordination under one roof",
    ],
    related: ["trakhees-approvals", "dda-approvals", "difc-approvals"],
    keywords: [
      "Concordia DMCC approvals",
      "DMCC approval process",
      "Concordia approval Dubai",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
  {
    slug: "rta-approval",
    href: "/rta-approval",
    menuLabel: "RTA Approval",
    seoTitle: "RTA Approval Services Dubai | Roads and Transport Authority NOC Support",
    metaDescription:
      "RTA approval and NOC coordination in Dubai for access, road interface, construction logistics and authority submission support.",
    h1: "RTA Approval Services in Dubai",
    eyebrow: "RTA Approval",
    heroText:
      "RTA approval and NOC coordination for Dubai construction projects involving access, traffic interface, logistics planning and road authority requirements.",
    overviewTitle: "RTA approval support for construction access and road interfaces.",
    overview: [
      "RTA approval may be required when a construction project affects access, road interfaces, work zones, traffic movement or authority-controlled infrastructure. Early coordination helps avoid site delays and compliance issues.",
      "Emitronix supports clients with document preparation, NOC coordination, authority follow-up and practical alignment between construction planning and RTA requirements.",
    ],
    process: [
      "Review project location, road interface and likely RTA approval requirements.",
      "Coordinate access plans, site logistics documents and supporting drawings.",
      "Prepare submission details and NOC support documents.",
      "Track comments, clarify authority requirements and coordinate revisions.",
      "Support permit close-out and construction-stage compliance documentation.",
    ],
    documents: [
      "Project location and site plan",
      "Traffic or access drawings where required",
      "Contractor and consultant details",
      "Method statement and work schedule",
      "NOC documents from relevant stakeholders",
      "Authority correspondence and previous permits if available",
    ],
    whyChoose: [
      "Construction-focused RTA coordination support",
      "Practical site logistics and documentation understanding",
      "Fast response to authority comments and document updates",
      "Single team for civil works and approval coordination",
    ],
    related: ["dubai-municipality-approval", "dewa-approvals", "dda-approvals"],
    keywords: [
      "RTA approval",
      "RTA approval Dubai",
      "RTA NOC Dubai",
      "authority approvals Dubai",
      "approval services in Dubai",
    ],
  },
];

export function getApprovalService(slug: string) {
  return approvalServices.find((service) => service.slug === slug);
}
