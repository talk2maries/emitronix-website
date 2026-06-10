export interface ApprovalService {
  title: string;
  menuLabel: string;
  slug: string;
  href: string;
  description: string;
  metaDescription: string;
  seoTitle: string;
  keywords: string[];
}

export const approvalServices: ApprovalService[] = [
  {
    title: "DEWA Approvals",
    menuLabel: "DEWA",
    slug: "dewa-approvals",
    href: "/dewa-approvals",
    description:
      "Professional DEWA approval services for new electrical connections, load upgrades, NOCs and authority coordination across Dubai.",
    metaDescription:
      "Expert DEWA approval services in Dubai for electrical connections, load increases, NOCs and authority approvals.",
    seoTitle: "DEWA Approvals Dubai | Electrical Approval Services",
    keywords: ["DEWA approvals Dubai", "DEWA NOC", "electrical approvals Dubai"],
  },
  {
    title: "DCD Approvals",
    menuLabel: "DCD",
    slug: "dcd-approvals",
    href: "/dcd-approvals",
    description:
      "Dubai Civil Defence approval services for fire alarm, fire fighting and life safety system approvals.",
    metaDescription:
      "Professional Dubai Civil Defence approval services for fire and life safety compliance.",
    seoTitle: "DCD Approvals Dubai | Civil Defence Approval Services",
    keywords: ["DCD approvals Dubai", "Dubai Civil Defence approvals", "fire approval Dubai"],
  },
  {
    title: "DDA Approvals",
    menuLabel: "DDA",
    slug: "dda-approvals",
    href: "/dda-approvals",
    description:
      "Dubai Development Authority approval services for construction, renovation and fit-out projects.",
    metaDescription:
      "Expert DDA approval services in Dubai for commercial and residential developments.",
    seoTitle: "DDA Approvals Dubai | Development Authority Approval Services",
    keywords: ["DDA approvals Dubai", "Dubai Development Authority approval", "DDA permit Dubai"],
  },
  {
    title: "DM Approvals",
    menuLabel: "DM",
    slug: "dm-approvals",
    href: "/dm-approvals",
    description:
      "Dubai Municipality approval services for construction permits, renovations and project approvals.",
    metaDescription:
      "Professional Dubai Municipality approval services for building permits and authority approvals.",
    seoTitle: "Dubai Municipality Approvals | DM Approval Services Dubai",
    keywords: ["DM approvals Dubai", "Dubai Municipality approval", "building permit Dubai"],
  },
  {
    title: "Authority Approvals",
    menuLabel: "Authority",
    slug: "authority-approvals",
    href: "/authority-approvals",
    description:
      "Complete authority approval coordination including DEWA, DCD, DDA, DM, JAFZA, Dubai South and other authorities.",
    metaDescription:
      "End-to-end authority approval services in Dubai for commercial, industrial and residential projects.",
    seoTitle: "Authority Approvals Dubai | Complete Approval Coordination",
    keywords: ["authority approvals Dubai", "Dubai approval services", "permit approvals Dubai"],
  },
];

export function getApprovalService(slug: string) {
  return approvalServices.find((service) => service.slug === slug);
}