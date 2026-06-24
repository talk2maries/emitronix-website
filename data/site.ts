import {
  BadgeCheck,
  Building2,
  Clock,
  Facebook,
  FileCheck2,
  Flame,
  Gauge,
  HardHat,
  Instagram,
  Landmark,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Emitronix",
  legalName: "Emitronix Contracting LLC",
  title: "Emitronix Contracting LLC | Dubai Civil Construction Contractor",
  description:
    "Emitronix Contracting LLC delivers civil construction, building contracting, villa, warehouse, interior fit-out and Dubai authority approval support across the UAE.",
  url: "https://emitronix.ae",
  location: "Dubai Investment Park 02, Dubai, UAE",
  email: "info@emitronix.ae",
  phone: "+971559828492",
  hours: "Mon - Sat 8:00 AM - 6:00 PM",
  serviceArea: ["Dubai", "United Arab Emirates"],
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
  { label: "Civil", href: "/civil" },
  { label: "Interior", href: "/interior" },
  { label: "Approvals", href: "/approval" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const contactItems = [
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "Location", value: site.location, href: "/contact", icon: MapPin },
  { label: "Hours", value: site.hours, href: "/contact", icon: Clock },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export type Service = {
  title: string;
  shortTitle: string;
  slug: string;
  href: string;
  description: string;
  details: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  icon: LucideIcon;
  highlights: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    title: "Civil Contracting",
    shortTitle: "Civil",
    slug: "civil-contracting",
    href: "/civil",
    description: "G+4 buildings, villas, warehouses, commercial and industrial projects.",
    details:
      "Complete civil contracting for G+4 buildings, villas, warehouses, commercial and industrial developments across Dubai and the UAE.",
    image: "/images/civil-contractor-dubai-construction-site.webp",
    imageAlt: "Civil Contractor Dubai team managing building construction site works",
    imageTitle: "Civil Contractor Dubai - building construction site works",
    icon: Building2,
    highlights: ["G+4 buildings", "Villas and warehouses", "Commercial and industrial works"],
    keywords: ["Dubai civil contracting", "G+4 building contractor", "warehouse construction UAE"],
  },
  {
    title: "Authority Approvals",
    shortTitle: "Approval",
    slug: "authority-approvals",
    href: "/approval",
    description: "DEWA, DM, DCD, RTA, Trakhees, DDA, Dubai South, JAFZA and more.",
    details:
      "Authority approval coordination for DEWA, Dubai Municipality, Dubai Civil Defence, RTA, Trakhees, DDA, Dubai South, JAFZA and more.",
    image: "/images/dubai-authority-approval-contractor.webp",
    imageAlt: "Dubai Authority Approval Contractor reviewing project documents and permits",
    imageTitle: "Dubai Authority Approval Contractor - permit coordination",
    icon: FileCheck2,
    highlights: ["DEWA and DM", "DCD, RTA and Trakhees", "DDA, Dubai South and JAFZA"],
    keywords: ["DEWA approvals Dubai", "Dubai Municipality approvals", "DCD approval contractor"],
  },
  {
    title: "Interior Fit-Out",
    shortTitle: "Interior",
    slug: "interior-fit-out",
    href: "/interior",
    description: "Complete interior fit-out solutions for commercial, retail and residential projects.",
    details:
      "Premium interior fit-out solutions for offices, retail spaces, restaurants, villas and residential developments.",
    image: "/images/commercial-fit-out-contractor-dubai.webp",
    imageAlt: "Commercial Fit Out Contractor Dubai completing interior construction works",
    imageTitle: "Commercial Fit Out Contractor Dubai - interior project works",
    icon: Sparkles,
    highlights: ["Commercial fit-out", "Retail and hospitality", "Residential interiors"],
    keywords: ["interior fit-out Dubai", "commercial fit-out UAE", "villa interior contractor"],
  },
];

export type Project = {
  title: string;
  category: string;
  location: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  summary: string;
};

export const projects: Project[] = [
  {
    title: "Site Preparation & Infrastructure Works",
    category: "Civil Infrastructure",
    location: "Dubai, UAE",
    image: "/images/dubai-civil-works-construction-site.webp",
    imageAlt: "Civil Contractor Dubai site preparation and building infrastructure works",
    imageTitle: "Civil Contractor Dubai - infrastructure and site works",
    summary: "Civil site preparation, enabling works and project coordination for Dubai developments.",
  },
  {
    title: "Warehouse & Industrial Projects",
    category: "Civil Contracting",
    location: "JAFZA and Dubai South",
    image: "/images/warehouse-construction-dubai.webp",
    imageAlt: "Warehouse Construction Dubai industrial project delivery and storage facility works",
    imageTitle: "Warehouse Construction Dubai - industrial contracting works",
    summary: "Warehouse and industrial construction with civil works, authority coordination and handover support.",
  },
  {
    title: "Villa & Building Construction",
    category: "G+4 Contracting",
    location: "Dubai, UAE",
    image: "/images/villa-construction-contractor-dubai.webp",
    imageAlt: "Villa Contractor Dubai residential building construction project",
    imageTitle: "Villa Contractor Dubai - residential construction project",
    summary: "Villa and building construction with structural, finishing and authority delivery control.",
  },
  {
    title: "Commercial Interior Fit-Out",
    category: "Interior Fit-Out",
    location: "Dubai, UAE",
    image: "/images/commercial-fit-out-contractor-dubai.webp",
    imageAlt: "Commercial Fit Out Contractor Dubai interior renovation and finishing works",
    imageTitle: "Commercial Fit Out Contractor Dubai - office fit-out project",
    summary: "Commercial, retail and office fit-out delivery with clean finishing and project coordination.",
  },
  {
    title: "MEP & Civil Coordination Works",
    category: "MEP Coordination",
    location: "Dubai, UAE",
    image: "/images/mep-civil-contracting-dubai.webp",
    imageAlt: "MEP Contractor Dubai and civil team coordinating site services",
    imageTitle: "MEP Contractor Dubai - civil and MEP coordination works",
    summary: "Civil and MEP interface coordination for project delivery, site services and handover readiness.",
  },
  {
    title: "Authority Approval Projects",
    category: "Approvals",
    location: "Dubai, UAE",
    image: "/images/dubai-authority-approval-contractor.webp",
    imageAlt: "Dubai Authority Approval Contractor preparing building approval documents",
    imageTitle: "Dubai Authority Approval Contractor - project approvals",
    summary: "Dubai authority approval support for civil construction, renovation and fit-out projects.",
  },
];

export const heroBadges = [
  { title: "G+4", label: "Building Contracting", icon: Building2 },
  { title: "Villas", label: "Residential Construction", icon: HardHat },
  { title: "Warehouses", label: "Industrial Projects", icon: Landmark },
  { title: "Authority", label: "Approval Specialists", icon: ShieldCheck },
  { title: "Interior", label: "Fit-Out Works", icon: Sparkles },
];

export const stats = [
  { value: "200+", label: "Projects Completed", icon: BadgeCheck },
  { value: "100+", label: "Skilled Professionals", icon: Users },
  { value: "15+", label: "Years Experience", icon: Clock },
  { value: "100%", label: "Client Satisfaction", icon: ShieldCheck },
];

export const whyChoose = [
  { title: "15+ Years Dubai Experience", icon: HardHat },
  { title: "DEWA & Authority Expertise", icon: BadgeCheck },
  { title: "In-house Engineering Team", icon: Users },
  { title: "Fast Approval Coordination", icon: Clock },
  { title: "Complete Design & Build Support", icon: Building2 },
  { title: "Reliable After-Sales Support", icon: ShieldCheck },
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
  "Free Consultation",
  "On-time Delivery",
  "Quality Assurance",
  "Competitive Pricing",
];

export const localSeoBlocks = [
  {
    title: "Building contracting in Dubai",
    description:
      "Emitronix supports civil construction, structural coordination, finishing works and handover planning for villas, commercial units and warehouse projects across Dubai.",
    href: "/civil",
    linkLabel: "Explore civil contracting",
  },
  {
    title: "Authority approvals in Dubai",
    description:
      "Our team coordinates authority approval workflows for DM, DCD, DEWA, Trakhees and DDA requirements, helping owners and consultants keep submissions organized.",
    href: "/approval",
    linkLabel: "View approval services",
  },
  {
    title: "MEP contracting Dubai coordination",
    description:
      "For construction and fit-out scopes, Emitronix helps align civil works with MEP interfaces, site service requirements, inspection readiness and completion documentation.",
    href: "/projects",
    linkLabel: "See project types",
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
    href: "/projects",
    linkLabel: "View warehouse projects",
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

