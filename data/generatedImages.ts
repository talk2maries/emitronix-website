export type GeneratedImageCategory =
  | "home"
  | "company"
  | "services"
  | "approvals"
  | "projects"
  | "blog"
  | "team";

export type GeneratedImageProfile =
  | "hero"
  | "panel"
  | "service"
  | "team"
  | "card"
  | "blog";

export type GeneratedImageVariant = {
  src: `/images/generated/${string}.webp`;
  width: number;
  height: number;
};

export type GeneratedImageAsset = {
  id: string;
  category: GeneratedImageCategory;
  profile: GeneratedImageProfile;
  alt: string;
  desktop: GeneratedImageVariant;
  mobile?: GeneratedImageVariant;
  og?: GeneratedImageVariant;
};

type GeneratedImageDefinition = {
  id: string;
  category: GeneratedImageCategory;
  profile: GeneratedImageProfile;
  alt: string;
  ogSrc?: `/images/generated/${string}.webp`;
};

const profileDimensions = {
  hero: {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 1080, height: 1350 },
    og: { width: 1200, height: 630 },
  },
  panel: {
    desktop: { width: 1600, height: 1200 },
    mobile: { width: 1080, height: 1350 },
  },
  service: {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 1080, height: 1350 },
    og: { width: 1200, height: 630 },
  },
  team: {
    desktop: { width: 1600, height: 1067 },
    mobile: { width: 1080, height: 1350 },
    og: { width: 1200, height: 630 },
  },
  card: {
    desktop: { width: 1600, height: 1067 },
  },
  blog: {
    desktop: { width: 1600, height: 900 },
    mobile: { width: 1080, height: 1350 },
    og: { width: 1200, height: 630 },
  },
} as const satisfies Record<
  GeneratedImageProfile,
  {
    desktop: { width: number; height: number };
    mobile?: { width: number; height: number };
    og?: { width: number; height: number };
  }
>;

function createGeneratedImage({
  id,
  category,
  profile,
  alt,
  ogSrc,
}: GeneratedImageDefinition): GeneratedImageAsset {
  const dimensions = profileDimensions[profile];
  const basePath = `/images/generated/${category}/${id}`;
  const variantSrc = (
    variant: "desktop" | "mobile" | "og",
  ): GeneratedImageVariant["src"] =>
    `${basePath}-${variant}.webp` as GeneratedImageVariant["src"];

  return {
    id,
    category,
    profile,
    alt,
    desktop: {
      src: variantSrc("desktop"),
      ...dimensions.desktop,
    },
    ...("mobile" in dimensions
      ? {
          mobile: {
            src: variantSrc("mobile"),
            ...dimensions.mobile,
          },
        }
      : {}),
    ...("og" in dimensions
      ? {
          og: {
            src: ogSrc ?? variantSrc("og"),
            ...dimensions.og,
          },
        }
      : {}),
  };
}

export const generatedImages = {
  "home.dubai-construction-company-hero": createGeneratedImage({
    id: "dubai-construction-company-hero",
    category: "home",
    profile: "hero",
    alt: "Construction professionals viewing a Dubai high-rise structure and tower crane.",
    ogSrc: "/images/generated/social/emitronix-construction-dubai-og.webp",
  }),
  "home.project-control-coordination": createGeneratedImage({
    id: "project-control-coordination",
    category: "home",
    profile: "panel",
    alt: "Site team coordinating high-rise construction work in Dubai.",
  }),
  "home.quality-safety-inspection": createGeneratedImage({
    id: "quality-safety-inspection",
    category: "home",
    profile: "panel",
    alt: "Construction team carrying out a safety inspection at a Dubai high-rise site.",
  }),
  "company.engineering-coordination-dubai-hero": createGeneratedImage({
    id: "engineering-coordination-dubai-hero",
    category: "company",
    profile: "hero",
    alt: "Engineering team briefing at a Dubai construction site.",
  }),
  "company.civil-site-review-dubai": createGeneratedImage({
    id: "civil-site-review-dubai",
    category: "company",
    profile: "panel",
    alt: "Engineers reviewing concrete, drainage and utility works at a Dubai site.",
  }),
  "services.construction-services-dubai-hero": createGeneratedImage({
    id: "construction-services-dubai-hero",
    category: "services",
    profile: "hero",
    alt: "Civil, building, industrial and MEP construction activity in Dubai.",
  }),
  "company.dubai-construction-industries-hero": createGeneratedImage({
    id: "dubai-construction-industries-hero",
    category: "company",
    profile: "hero",
    alt: "Modern warehouse, commercial and light-industrial buildings in Dubai.",
  }),
  "company.construction-technical-resources-dubai-hero": createGeneratedImage({
    id: "construction-technical-resources-dubai-hero",
    category: "company",
    profile: "hero",
    alt: "Construction drawings, tablet and coordination tools in a project office.",
  }),
  "company.dubai-project-consultation-hero": createGeneratedImage({
    id: "dubai-project-consultation-hero",
    category: "company",
    profile: "hero",
    alt: "Engineers discussing a Dubai construction project during a consultation.",
  }),
  "team.engineering-leadership-site-review": createGeneratedImage({
    id: "engineering-leadership-site-review",
    category: "team",
    profile: "team",
    alt: "Construction leaders reviewing work at a Dubai site.",
  }),
  "team.construction-team-dubai": createGeneratedImage({
    id: "construction-team-dubai",
    category: "team",
    profile: "team",
    alt: "Construction team wearing full PPE at a clean Dubai site.",
  }),
  "services.civil-contracting-dubai": createGeneratedImage({
    id: "civil-contracting-dubai",
    category: "services",
    profile: "service",
    alt: "Concrete, drainage and utility works at a Dubai construction site.",
  }),
  "services.main-contracting-dubai": createGeneratedImage({
    id: "main-contracting-dubai",
    category: "services",
    profile: "service",
    alt: "Construction activity at a clean commercial building site in Dubai.",
  }),
  "services.warehouse-construction-dubai": createGeneratedImage({
    id: "warehouse-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Modern warehouse under construction in a Dubai industrial area.",
  }),
  "services.industrial-construction-dubai": createGeneratedImage({
    id: "industrial-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Light-industrial facility under construction in Dubai.",
  }),
  "services.commercial-construction-dubai": createGeneratedImage({
    id: "commercial-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Contemporary commercial building under construction in Dubai.",
  }),
  "services.villa-construction-dubai": createGeneratedImage({
    id: "villa-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Contemporary villa under construction in Dubai.",
  }),
  "services.interior-fit-out-dubai": createGeneratedImage({
    id: "interior-fit-out-dubai",
    category: "services",
    profile: "service",
    alt: "Commercial interior fit-out work in progress in Dubai.",
  }),
  "services.building-renovation-dubai": createGeneratedImage({
    id: "building-renovation-dubai",
    category: "services",
    profile: "service",
    alt: "Building renovation work in progress in Dubai.",
  }),
  "services.structural-works-dubai": createGeneratedImage({
    id: "structural-works-dubai",
    category: "services",
    profile: "service",
    alt: "Reinforced concrete and structural works at a Dubai construction site.",
  }),
  "services.design-build-contractor-dubai": createGeneratedImage({
    id: "design-build-contractor-dubai",
    category: "services",
    profile: "service",
    alt: "Architects and engineers coordinating design and construction in Dubai.",
  }),
  "services.turnkey-construction-dubai": createGeneratedImage({
    id: "turnkey-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Coordinated building construction and interior completion in Dubai.",
  }),
  "services.project-management-dubai": createGeneratedImage({
    id: "project-management-dubai",
    category: "services",
    profile: "service",
    alt: "Construction professionals reviewing project progress in Dubai.",
  }),
  "services.mep-works-dubai": createGeneratedImage({
    id: "mep-works-dubai",
    category: "services",
    profile: "service",
    alt: "Mechanical, electrical and plumbing installation in a Dubai facility.",
  }),
  "services.testing-commissioning-dubai": createGeneratedImage({
    id: "testing-commissioning-dubai",
    category: "services",
    profile: "service",
    alt: "Engineer testing and commissioning building systems in Dubai.",
  }),
  "approvals.dubai-authority-approvals-coordination": createGeneratedImage({
    id: "dubai-authority-approvals-coordination",
    category: "approvals",
    profile: "service",
    alt: "Construction documents and drawings prepared for technical coordination in Dubai.",
  }),
  "approvals.dubai-municipality-approval-planning": createGeneratedImage({
    id: "dubai-municipality-approval-planning",
    category: "approvals",
    profile: "service",
    alt: "Building drawings and submission documents arranged for review in Dubai.",
  }),
  "approvals.dda-approval-coordination-dubai": createGeneratedImage({
    id: "dda-approval-coordination-dubai",
    category: "approvals",
    profile: "service",
    alt: "Development drawings and technical documents under review in Dubai.",
  }),
  "approvals.dcd-fire-safety-approval-dubai": createGeneratedImage({
    id: "dcd-fire-safety-approval-dubai",
    category: "approvals",
    profile: "service",
    alt: "Fire-safety drawings and building plans under technical review in Dubai.",
  }),
  "approvals.dewa-approval-electrical-coordination-dubai": createGeneratedImage({
    id: "dewa-approval-electrical-coordination-dubai",
    category: "approvals",
    profile: "service",
    alt: "Electrical drawings and utility plans under technical review in Dubai.",
  }),
  "approvals.dewa-cable-works-dubai": createGeneratedImage({
    id: "dewa-cable-works-dubai",
    category: "approvals",
    profile: "blog",
    alt: "Protected electrical cables being installed at a Dubai construction site.",
  }),
  "approvals.trakhees-approval-warehouse-dubai": createGeneratedImage({
    id: "trakhees-approval-warehouse-dubai",
    category: "approvals",
    profile: "service",
    alt: "Warehouse drawings and technical documents under review in Dubai.",
  }),
  "approvals.difc-fit-out-approval-dubai": createGeneratedImage({
    id: "difc-fit-out-approval-dubai",
    category: "approvals",
    profile: "service",
    alt: "Commercial fit-out drawings and material samples arranged for review in Dubai.",
  }),
  "approvals.concordia-dmcc-approval-dubai": createGeneratedImage({
    id: "concordia-dmcc-approval-dubai",
    category: "approvals",
    profile: "service",
    alt: "Commercial building drawings and technical documents under review in Dubai.",
  }),
  "approvals.rta-approval-noc-dubai": createGeneratedImage({
    id: "rta-approval-noc-dubai",
    category: "approvals",
    profile: "service",
    alt: "Road-interface and utility drawings under technical review in Dubai.",
  }),
  "projects.portfolio-planning-dubai-hero": createGeneratedImage({
    id: "portfolio-planning-dubai-hero",
    category: "projects",
    profile: "hero",
    alt: "Construction drawings and models for varied building scopes in Dubai.",
  }),
  "projects.villa-renovation-planning-dubai": createGeneratedImage({
    id: "villa-renovation-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Villa renovation plans and material samples in Dubai.",
  }),
  "projects.warehouse-civil-mep-upgrade-planning-dubai": createGeneratedImage({
    id: "warehouse-civil-mep-upgrade-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Warehouse civil and MEP upgrade plans in Dubai.",
  }),
  "projects.commercial-office-fit-out-planning-dubai": createGeneratedImage({
    id: "commercial-office-fit-out-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Commercial office fit-out plans and finish samples in Dubai.",
  }),
  "projects.building-maintenance-inspection-planning-dubai": createGeneratedImage({
    id: "building-maintenance-inspection-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Building maintenance inspection in Dubai.",
  }),
  "projects.utility-approval-coordination-planning-dubai": createGeneratedImage({
    id: "utility-approval-coordination-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Utility drawings and technical documents arranged for coordination in Dubai.",
  }),
  "projects.retail-renovation-planning-dubai": createGeneratedImage({
    id: "retail-renovation-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Retail renovation plans and interior material samples in Dubai.",
  }),
  "projects.industrial-facility-modification-planning-dubai": createGeneratedImage({
    id: "industrial-facility-modification-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Industrial facility modification plans in Dubai.",
  }),
  "projects.mep-interface-coordination-planning-dubai": createGeneratedImage({
    id: "mep-interface-coordination-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "MEP drawings under coordination for a Dubai facility.",
  }),
  "projects.authority-noc-coordination-planning-dubai": createGeneratedImage({
    id: "authority-noc-coordination-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Construction drawings and NOC documents arranged for review in Dubai.",
  }),
  "projects.civil-repair-maintenance-planning-dubai": createGeneratedImage({
    id: "civil-repair-maintenance-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Civil repair and maintenance work in progress in Dubai.",
  }),
  "blog.civil-construction-dubai-guide-2026": createGeneratedImage({
    id: "civil-construction-dubai-guide-2026",
    category: "blog",
    profile: "blog",
    alt: "Concrete structure and civil construction activity in Dubai.",
  }),
  "blog.dubai-authority-approvals-guide": createGeneratedImage({
    id: "dubai-authority-approvals-guide",
    category: "blog",
    profile: "blog",
    alt: "Construction drawings and technical submission documents in Dubai.",
  }),
  "blog.warehouse-construction-planning-guide": createGeneratedImage({
    id: "warehouse-construction-planning-guide",
    category: "blog",
    profile: "blog",
    alt: "Modern warehouse structure under construction in Dubai.",
  }),
  "blog.choosing-building-contractor-dubai": createGeneratedImage({
    id: "choosing-building-contractor-dubai",
    category: "blog",
    profile: "blog",
    alt: "Construction professionals reviewing building plans at a Dubai site.",
  }),
} as const satisfies Record<string, GeneratedImageAsset>;

export type GeneratedImageKey = keyof typeof generatedImages;

export const generatedImageKeys = Object.keys(generatedImages) as GeneratedImageKey[];

export function getGeneratedImage(key: GeneratedImageKey): GeneratedImageAsset {
  return generatedImages[key];
}

const generatedImageAssets = Object.values(
  generatedImages,
) as GeneratedImageAsset[];

/**
 * Resolves any generated desktop, mobile or social-sharing path back to its
 * manifest entry. This lets shared renderers add responsive art direction
 * while keeping a safe fallback for legacy image paths.
 */
export function findGeneratedImageBySrc(
  src: string,
): GeneratedImageAsset | undefined {
  return generatedImageAssets.find(
    (asset) =>
      asset.desktop.src === src ||
      asset.mobile?.src === src ||
      asset.og?.src === src,
  );
}
