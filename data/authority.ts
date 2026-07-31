import { services, site } from "@/data/site";

export const PUBLICATION_GATE = "Management verification required before publication." as const;

export type AuthorityDetail = {
  label: string;
  value: string;
  href?: string;
};

export type LeadershipFunction = {
  id: string;
  title: string;
  profileType: "Role-based delivery function";
  summary: string;
  coreExpertise: string[];
  responsibilities: string[];
  specialization: string;
  technicalCapabilities: string[];
};

export const founderProfile = {
  name: "Marieswaran Sadaiappan",
  jobTitle: "Founder & Managing Director",
  company: site.legalName,
  profilePath: "/founder",
  professionalContext: "Dubai construction professional",
  professionalSummary:
    "Marieswaran Sadaiappan is the Founder & Managing Director of Emitronix Contracting LLC. The public profile centres on a Dubai construction perspective, an electrical engineering background, construction management, project execution, authority coordination, technical leadership and client management.",
  identityDetails: [
    { label: "Role", value: "Founder & Managing Director" },
    { label: "Company", value: site.legalName },
    { label: "Professional context", value: "Dubai construction" },
    { label: "Engineering background", value: "Electrical engineering" },
  ] satisfies AuthorityDetail[],
  leadershipThemes: [
    {
      title: "Construction management",
      description:
        "A practical focus on connecting scope, engineering decisions, site execution and delivery responsibilities.",
    },
    {
      title: "Project execution",
      description:
        "Attention to the decisions and coordination points that help a construction brief move toward site delivery.",
    },
    {
      title: "Authority coordination",
      description:
        "Awareness of authority-facing requirements as part of project planning, documentation and execution coordination.",
    },
    {
      title: "Technical leadership",
      description:
        "An engineering-led approach to clarifying technical interfaces, responsibilities and project information.",
    },
    {
      title: "Client management",
      description:
        "Clear communication around project requirements, open decisions and the information needed for a useful next step.",
    },
  ],
  futureFocusedThemes: [
    {
      title: "Innovation",
      description:
        "A professional interest in practical improvements that can make construction coordination clearer and more useful.",
    },
    {
      title: "Digital transformation",
      description:
        "A focus on how structured information and digital workflows can support construction decision-making.",
    },
    {
      title: "AI adoption in construction",
      description:
        "An interest in responsible AI adoption for organizing information, supporting coordination and improving access to project knowledge.",
    },
  ],
  publicationGate: {
    statement: PUBLICATION_GATE,
    fields: [
      "Degree title, awarding institution and education dates",
      "Years of experience and employment chronology",
      "Named projects, clients, values, dates or outcomes",
      "Professional registrations, licences, certifications or memberships",
      "Awards, publications, speaking engagements or media coverage",
      "Portrait, personal contact details and personal social profiles",
    ],
  },
} as const;

export const leadershipFunctions: LeadershipFunction[] = [
  {
    id: "operations-management",
    title: "Operations Manager",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of the operational coordination needed to connect programme priorities, resources, site readiness and delivery follow-up.",
    coreExpertise: ["Operational planning", "Resource coordination", "Delivery follow-up"],
    responsibilities: [
      "Coordinate operational priorities across active workstreams.",
      "Keep resource, access and programme dependencies visible.",
      "Support clear escalation and follow-up between project functions.",
    ],
    specialization: "Construction operations and delivery coordination",
    technicalCapabilities: ["Programme visibility", "Resource planning", "Operational reporting"],
  },
  {
    id: "engineering-management",
    title: "Engineering Manager",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of engineering coordination across drawings, technical inputs, buildability questions and discipline interfaces.",
    coreExpertise: ["Engineering coordination", "Technical review", "Buildability"],
    responsibilities: [
      "Coordinate technical information across engineering disciplines.",
      "Clarify drawing, specification and responsibility interfaces.",
      "Keep technical decisions connected to execution requirements.",
    ],
    specialization: "Multidisciplinary construction engineering",
    technicalCapabilities: ["Drawing coordination", "Technical queries", "Interface review"],
  },
  {
    id: "civil-engineering",
    title: "Civil Engineering Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of civil engineering coordination for drawings, quantities, site conditions, sequencing and inspection readiness.",
    coreExpertise: ["Civil works", "Drawing review", "Site coordination"],
    responsibilities: [
      "Review civil scope, drawings and site information.",
      "Coordinate civil interfaces with other project disciplines.",
      "Support execution checks and construction documentation.",
    ],
    specialization: "Civil construction and building works",
    technicalCapabilities: ["Scope review", "Site sequencing", "Inspection preparation"],
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of electrical engineering coordination across loads, distribution, routing, equipment interfaces and project documentation.",
    coreExpertise: ["Electrical coordination", "Load information", "Distribution interfaces"],
    responsibilities: [
      "Review available electrical drawings and project requirements.",
      "Coordinate electrical interfaces with civil, mechanical and fit-out work.",
      "Keep electrical information aligned with site and documentation needs.",
    ],
    specialization: "Building electrical engineering coordination",
    technicalCapabilities: ["Load schedules", "Routing coordination", "Drawing interfaces"],
  },
  {
    id: "mep-engineering",
    title: "MEP Engineering Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of mechanical, electrical and plumbing coordination where services must align with structure, interiors and site execution.",
    coreExpertise: ["MEP coordination", "Services integration", "Spatial interfaces"],
    responsibilities: [
      "Coordinate MEP information with civil and interior requirements.",
      "Identify service routing, access and equipment interfaces.",
      "Support coordinated drawings and execution planning.",
    ],
    specialization: "Building-services coordination",
    technicalCapabilities: ["MEP interface review", "Services routing", "Coordination inputs"],
  },
  {
    id: "estimation",
    title: "Estimation Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of scope interpretation, quantity review, assumptions, exclusions and commercial information needed for clearer project evaluation.",
    coreExpertise: ["Scope interpretation", "Quantity review", "Commercial clarity"],
    responsibilities: [
      "Review available scope and tender information.",
      "Record assumptions, exclusions and information gaps.",
      "Coordinate quantity and procurement inputs for evaluation.",
    ],
    specialization: "Construction estimation and scope definition",
    technicalCapabilities: ["Quantity inputs", "Scope schedules", "Assumption registers"],
  },
  {
    id: "quality-assurance-control",
    title: "QA/QC Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of quality planning, inspection records, material information, non-conformance follow-up and snag closure.",
    coreExpertise: ["Quality planning", "Inspection records", "Close-out control"],
    responsibilities: [
      "Organize quality requirements and inspection points.",
      "Track material, inspection and corrective-action records.",
      "Support snag closure and handover evidence.",
    ],
    specialization: "Construction quality assurance and quality control",
    technicalCapabilities: ["Inspection checklists", "Quality records", "Snag tracking"],
  },
  {
    id: "health-safety-environment",
    title: "HSE Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of health, safety and environmental coordination around planned activities, site conditions and workforce communication.",
    coreExpertise: ["Site safety coordination", "Risk awareness", "Workforce communication"],
    responsibilities: [
      "Keep activity risks and site controls visible before work begins.",
      "Support safety communication and planned-work coordination.",
      "Track observations and follow-up actions relevant to site activity.",
    ],
    specialization: "Construction health, safety and environmental coordination",
    technicalCapabilities: ["Risk-control inputs", "Safety briefings", "Observation follow-up"],
  },
  {
    id: "procurement",
    title: "Procurement Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of supplier information, material requirements, technical submittal interfaces and lead-time visibility.",
    coreExpertise: ["Supplier coordination", "Material planning", "Lead-time review"],
    responsibilities: [
      "Coordinate material and supplier information against project needs.",
      "Keep technical and commercial procurement inputs aligned.",
      "Track lead-time and delivery dependencies.",
    ],
    specialization: "Construction procurement coordination",
    technicalCapabilities: ["Procurement schedules", "Supplier inputs", "Delivery tracking"],
  },
  {
    id: "project-management",
    title: "Project Management Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of programme, stakeholder, risk, decision and reporting coordination across the project lifecycle.",
    coreExpertise: ["Project planning", "Stakeholder coordination", "Risk visibility"],
    responsibilities: [
      "Coordinate programme priorities and project information.",
      "Keep responsibilities, decisions and open actions visible.",
      "Support reporting, change awareness and handover planning.",
    ],
    specialization: "Construction project management",
    technicalCapabilities: ["Programme inputs", "Action registers", "Progress reporting"],
  },
  {
    id: "site-supervision",
    title: "Site Supervision Team",
    profileType: "Role-based delivery function",
    summary:
      "A role-based view of daily site coordination around drawings, work sequence, access, quality observations and progress communication.",
    coreExpertise: ["Daily site control", "Work sequencing", "Progress coordination"],
    responsibilities: [
      "Coordinate daily activities against available project information.",
      "Keep site interfaces, access and work sequence visible.",
      "Support progress, inspection and close-out communication.",
    ],
    specialization: "Construction site supervision",
    technicalCapabilities: ["Daily coordination", "Site records", "Progress inputs"],
  },
];

export const leadershipPublicationGate = {
  statement: PUBLICATION_GATE,
  fields: [
    "Names and current appointments for role-based delivery functions",
    "Individual biographies, employment dates and reporting lines",
    "Qualifications, registrations, certifications and years of experience",
    "Named projects, clients, achievements or performance claims",
    "Individual portraits, contact details and social profiles",
  ],
} as const;

export const companyFacts = {
  identity: [
    { label: "Brand name", value: site.name },
    { label: "Legal business name", value: site.legalName },
    { label: "Website", value: site.url, href: site.url },
  ] satisfies AuthorityDetail[],
  contact: [
    {
      label: "Office phone",
      value: site.phone,
      href: site.phoneHref,
    },
    {
      label: "Secondary mobile",
      value: site.mobile,
      href: site.mobileHref,
    },
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    { label: "Published location", value: site.location },
    { label: "Published business hours", value: site.hours },
  ] satisfies AuthorityDetail[],
  serviceAreas: [...site.serviceArea],
  serviceLinks: services.map((service) => ({
    label: service.title,
    href: service.href,
  })),
  publicationGate: {
    statement: PUBLICATION_GATE,
    fields: [
      "Trade licence number, issuing authority and expiry date",
      "Company registration number and incorporation date",
      "Verified company history, founding milestones and dated Dubai experience",
      "Contractor classification, professional registrations or certifications",
      "Named insurance policies, memberships, awards or accreditations",
      "Office unit, building, postal address or map profile beyond the published location",
      "Verified Google Business Profile and official social profile URLs",
      "Named clients, project counts, testimonials or performance statistics",
    ],
  },
} as const;
