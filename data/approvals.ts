import type { GeneratedImageKey } from "@/data/generatedImages";

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
  generatedImage: GeneratedImageKey;
};

export const approvalServices: ApprovalService[] = [
  {
    slug: "dubai-municipality-approval",
    href: "/dubai-municipality-approval",
    generatedImage: "approvals.dubai-municipality-approval-planning",
    menuLabel: "Dubai Municipality Approval",
    seoTitle: "Dubai Municipality Approval Services | Emitronix Contracting LLC",
    metaDescription:
      "Plan Dubai Municipality building permits, drawing reviews, inspections and completion records for villa, warehouse and commercial construction projects.",
    h1: "Dubai Municipality Approval Services in Dubai",
    eyebrow: "Dubai Municipality Approval",
    heroText:
      "Plan the documents, consultant actions, drawing revisions and inspection evidence needed for a Dubai Municipality building-permit route.",
    overviewTitle: "Start with the plot, the approved baseline and the proposed change.",
    overview: [
      "A Dubai Municipality submission is only as reliable as its starting information. The team should first reconcile the plot details, existing approvals, proposed architectural and structural work, appointed consultant and any construction already completed on site. A mismatch here can carry into every drawing and inspection request that follows.",
      "During review, each authority comment should be linked to the affected drawing, calculation, specification, commercial decision and site instruction. That comment register gives the owner a clear view of what changed, who must respond and whether procurement or construction must wait.",
    ],
    process: [
      "Review project scope, plot details and applicable Dubai Municipality requirements.",
      "Coordinate drawings, forms and supporting technical documents for submission.",
      "Coordinate or support the appointed consultant's submission through the relevant authority channel.",
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
      "Plot, scope and existing-approval checks before the submission list is fixed",
      "A revision register connecting authority comments to consultant drawings",
      "Inspection-readiness checks against the approved information and actual site",
      "Visible ownership for documents, responses, NOCs and close-out records",
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
    generatedImage: "approvals.dda-approval-coordination-dubai",
    menuLabel: "DDA Approvals",
    seoTitle: "DDA Approval Services Dubai | Dubai Development Authority Approvals",
    metaDescription:
      "Plan DDA approvals in Dubai for building modifications, fit-out and civil works, including master-developer NOCs, drawings and inspection records.",
    h1: "DDA Approval Services in Dubai",
    eyebrow: "Dubai Development Authority",
    heroText:
      "Define the DDA jurisdiction, master-developer conditions and technical submission responsibilities before design or site work is released.",
    overviewTitle: "DDA review begins with jurisdiction and community obligations.",
    overview: [
      "A DDA project may also sit within a master developer or building-management process. Before preparing forms, confirm the property, proposed use, landlord or community NOCs, appointed consultant and exact authority channel. Otherwise, a technically complete drawing set can still enter the wrong review path.",
      "Once the route is confirmed, document control becomes the main safeguard. Existing and proposed drawings, structural details, contractor appointments and reviewer comments should share one revision history so the site team never builds from a superseded response.",
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
      "Jurisdiction and master-developer checks before the application is assembled",
      "A responsibility map for owner, tenant, consultant, contractor and landlord inputs",
      "Document-gap and revision checks before each formal review",
      "Site close-out planned against the accepted drawings and permit conditions",
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
    generatedImage: "approvals.dcd-fire-safety-approval-dubai",
    menuLabel: "DCD Approvals",
    seoTitle: "DCD Approval Services Dubai | Dubai Civil Defence Approval Support",
    metaDescription:
      "Dubai Civil Defence approval coordination for fire and life safety submissions, inspections and completion support for Dubai projects.",
    h1: "DCD Approval Services in Dubai",
    eyebrow: "Dubai Civil Defence",
    heroText:
      "Coordinate fire and life-safety drawings, product evidence, testing records and site conditions for the applicable Dubai Civil Defence review.",
    overviewTitle: "The fire strategy must describe the building that will actually operate.",
    overview: [
      "Occupancy, storage height, commodity type, escape routes, fire compartments and system design are connected decisions. If the operating brief changes after the life-safety drawings are prepared, the consultant should assess the effect before equipment is ordered or concealed work proceeds.",
      "Inspection readiness is more than a booking date. Approved drawings, installed systems, access, labels, product certificates, testing records and outstanding site observations should be reconciled before the authority visit, with any discrepancy assigned to a named owner.",
    ],
    process: [
      "Review project use, occupancy, layout and DCD approval requirements.",
      "Coordinate life safety drawings, compliance notes and supporting documents.",
      "Coordinate or support submission through the appropriately appointed consultant or relevant authority channel.",
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
      "Operating-use checks before life-safety information is treated as final",
      "Product and system evidence tracked alongside drawing revisions",
      "Pre-inspection comparison of approved information, tests and installed work",
      "Issue ownership across consultant, specialist supplier and site teams",
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
    generatedImage: "approvals.dewa-approval-electrical-coordination-dubai",
    menuLabel: "DEWA Approvals",
    seoTitle: "DEWA Approval Services Dubai | DEWA NOC and Submission Support",
    metaDescription:
      "DEWA approval and NOC coordination in Dubai for construction, villa, warehouse and commercial projects by Emitronix Contracting LLC.",
    h1: "DEWA Approval Services in Dubai",
    eyebrow: "DEWA Approval",
    heroText:
      "Connect utility applications and NOCs to the verified load, service route, civil readiness and appointed-party responsibilities for the project.",
    overviewTitle: "Utility coordination should follow a stable demand and site-access basis.",
    overview: [
      "The useful starting point is the service requirement: existing supply, proposed demand, load schedule, equipment duty, route constraints and any live-asset interface. Those facts should agree across the application, consultant drawings, equipment selections and the civil works needed to make the route buildable.",
      "A DEWA action register should show who owns each application input, NOC, technical clarification, inspection item and completion record. This prevents a utility milestone from appearing on the programme without the drawings, access or site work needed to achieve it.",
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
      "Load, route and civil-readiness checks before application milestones are forecast",
      "Clear separation of owner, consultant, contractor and utility responsibilities",
      "NOC and comment tracking tied to affected drawings and procurement",
      "Completion evidence organized before inspection or energization steps",
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
    generatedImage: "approvals.trakhees-approval-warehouse-dubai",
    menuLabel: "Trakhees Approvals",
    seoTitle: "Trakhees Approval Services Dubai | Free Zone Approval Support",
    metaDescription:
      "Trakhees approval coordination for Dubai free zone, warehouse, commercial and construction projects with Emitronix Contracting LLC.",
    h1: "Trakhees Approval Services in Dubai",
    eyebrow: "Trakhees Approval",
    heroText:
      "Trakhees approval support for construction, fit-out, warehouse and commercial projects in regulated free zone and development areas.",
    overviewTitle: "Confirm the free-zone route before fixing the submission package.",
    overview: [
      "For a Trakhees-regulated asset, the property location, activity, proposed use, lease conditions and consultant or contractor registration can affect the route. These facts should be verified before a generic document checklist is applied to a warehouse, commercial unit or fit-out.",
      "The working record should connect each NOC, drawing, method statement, authority comment and inspection item to its owner and current revision. Site mobilisation should follow the issued permit conditions rather than an assumed approval date.",
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
      "Location, activity and appointment checks before the approval route is proposed",
      "Permit conditions translated into visible site and document actions",
      "Comment and revision control from submission through inspection",
      "Warehouse and commercial scope reviewed against actual operating use",
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
    generatedImage: "approvals.difc-fit-out-approval-dubai",
    menuLabel: "DIFC Approvals",
    seoTitle: "DIFC Approval Services Dubai | Permit and Fit-Out Approval Support",
    metaDescription:
      "DIFC approval support in Dubai for commercial spaces, fit-out works, building modifications and permit coordination.",
    h1: "DIFC Approval Services in Dubai",
    eyebrow: "DIFC Approval",
    heroText:
      "DIFC permit and approval coordination for commercial interiors, office modifications and authority-controlled project works in Dubai.",
    overviewTitle: "DIFC fit-out planning must respect the building as well as the tenancy.",
    overview: [
      "A DIFC office or retail modification can affect landlord systems, fire strategy, MEP capacity, access, noisy-work periods and occupied neighbours. The tenant brief should therefore be checked against building-management rules and the approved base-build information before detailed coordination begins.",
      "Permit and close-out records need one controlled trail: landlord NOCs, existing and proposed layouts, technical submissions, insurance, method statements, inspection observations and as-built information. That trail also helps the facilities team understand what changed after handover.",
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
      "Tenant scope checked against landlord and live-building constraints",
      "Base-build, fit-out and life-safety interfaces recorded before site release",
      "Permit comments connected to revised drawings and work instructions",
      "Close-out records prepared for both authority and facilities-management use",
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
    generatedImage: "approvals.concordia-dmcc-approval-dubai",
    menuLabel: "Concordia-DMCC Approvals Process",
    seoTitle: "Concordia DMCC Approval Process Dubai | JLT Approval Support",
    metaDescription:
      "Concordia-DMCC approval process support for JLT and DMCC projects, including fit-out, modifications, submissions and inspections.",
    h1: "Concordia-DMCC Approvals Process in Dubai",
    eyebrow: "Concordia-DMCC Approval",
    heroText:
      "Step-by-step Concordia-DMCC approval process support for JLT offices, retail units, commercial fit-outs and building modification works.",
    overviewTitle: "JLT projects need one sequence for tenant, landlord and Concordia actions.",
    overview: [
      "In a JLT unit, the lease, landlord NOC, contractor registration, insurance, existing conditions and proposed drawings can come from different parties. A responsibility schedule should identify each input and its due date before the fit-out permit is forecast.",
      "After permit issue, the accepted drawings and site conditions must stay aligned. Access rules, method statements, inspections, rectification evidence and final records belong in the same tracker so handover is not delayed by paperwork assembled after the work is complete.",
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
      "A named owner and due date for every tenant, landlord and consultant input",
      "Existing-condition checks before proposed drawings are released",
      "Permit conditions and site-access rules carried into the work plan",
      "Inspection observations tracked through rectification and final evidence",
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
    generatedImage: "approvals.rta-approval-noc-dubai",
    menuLabel: "RTA Approval",
    seoTitle: "RTA Approval Dubai | Road Access & NOC Support",
    metaDescription:
      "RTA approval and NOC coordination in Dubai for access, road interface, construction logistics and authority submission support.",
    h1: "RTA Approval Services in Dubai",
    eyebrow: "RTA Approval",
    heroText:
      "RTA approval and NOC coordination for Dubai construction projects involving access, traffic interface, logistics planning and road authority requirements.",
    overviewTitle: "Road-interface approval starts with real vehicle and work-zone movements.",
    overview: [
      "Where a project touches a road reserve, access point or traffic movement, the logistics drawing should reflect actual vehicle sizes, turning paths, delivery periods, pedestrian separation and temporary work zones. A site plan that ignores operations is unlikely to be useful to either the reviewer or the construction team.",
      "The RTA-related programme should include stakeholder NOCs, drawings, method statements, comment responses, permit conditions and reinstatement evidence. Those dependencies need to be resolved before deliveries or excavation are committed to dates that rely on public-road access.",
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
      "Access and traffic plans tested against actual construction movements",
      "Road-reserve, NOC and stakeholder dependencies shown on the programme",
      "Authority comments linked to revised logistics and civil-work documents",
      "Close-out and reinstatement evidence considered before work starts",
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
