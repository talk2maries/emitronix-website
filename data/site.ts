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
};

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
  { label: "Approval", href: "/approval" },
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
    image: "/images/service-civil.svg",
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
    image: "/images/service-approval.svg",
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
    image: "/images/service-interior.svg",
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
  summary: string;
};

export const projects: Project[] = [
  {
    title: "Site Preparation & Infrastructure Works",
    category: "Civil Infrastructure",
    location: "Dubai, UAE",
    image: "/images/project-commercial.svg",
    summary: "Civil site preparation, enabling works and project coordination for Dubai developments.",
  },
  {
    title: "Warehouse & Industrial Projects",
    category: "Civil Contracting",
    location: "JAFZA and Dubai South",
    image: "/images/project-warehouse.svg",
    summary: "Warehouse and industrial construction with civil works, authority coordination and handover support.",
  },
  {
    title: "Villa & Building Construction",
    category: "G+4 Contracting",
    location: "Dubai, UAE",
    image: "/images/project-villa.svg",
    summary: "Villa and building construction with structural, finishing and authority delivery control.",
  },
  {
    title: "Commercial Interior Fit-Out",
    category: "Interior Fit-Out",
    location: "Dubai, UAE",
    image: "/images/service-interior.svg",
    summary: "Commercial, retail and office fit-out delivery with clean finishing and project coordination.",
  },
  {
    title: "Authority Approval Projects",
    category: "Approvals",
    location: "Dubai, UAE",
    image: "/images/project-approvals.svg",
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

export const approvalServices = [
  {
    title: "DEWA Approvals",
    slug: "dewa-approvals",
    description: "DEWA approvals for electrical connections, load upgrades and authority coordination.",
  },
  {
    title: "DCD Approvals",
    slug: "dcd-approvals",
    description: "Dubai Civil Defence approval coordination for fire and life safety requirements.",
  },
  {
    title: "DDA Approvals",
    slug: "dda-approvals",
    description: "Dubai Development Authority approval support for projects and modifications.",
  },
  {
    title: "DM Approvals",
    slug: "dm-approvals",
    description: "Dubai Municipality approval support for building permits and related submissions.",
  },
  {
    title: "Authority Approvals",
    slug: "authority-approvals",
    description: "End-to-end authority approval coordination across Dubai authorities.",
  },
];
