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
  disclosure: string;
  desktop: GeneratedImageVariant;
  mobile?: GeneratedImageVariant;
  og?: GeneratedImageVariant;
};

type GeneratedImageDefinition = {
  id: string;
  category: GeneratedImageCategory;
  profile: GeneratedImageProfile;
  alt: string;
  disclosure: string;
  ogSrc?: `/images/generated/${string}.webp`;
};

const GENERAL_DISCLOSURE =
  "Illustrative AI-generated image. Not an Emitronix project photograph.";
const PEOPLE_DISCLOSURE =
  "Illustrative AI-generated image. People shown are representative and are not Emitronix employees.";
const BRANDED_PPE_DISCLOSURE =
  "Illustrative AI-generated scene. Branded PPE and people are representative—not verified employees or project evidence.";
const AUTHORITY_DISCLOSURE =
  "Illustrative AI-generated image. Not an authority image, approval, endorsement or Emitronix project photograph.";
const PLANNING_DISCLOSURE =
  "Illustrative AI-generated planning scenario. Not evidence of an Emitronix project.";
const EDITORIAL_DISCLOSURE =
  "Illustrative AI-generated editorial image. Not evidence of an Emitronix project.";

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
  disclosure,
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
    disclosure,
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
    alt: "Illustrative AI-generated image of a representative Emitronix-branded site team viewing a Dubai high-rise under construction with a tower crane; not a project photograph.",
    disclosure: BRANDED_PPE_DISCLOSURE,
    ogSrc: "/images/generated/social/emitronix-construction-dubai-og.webp",
  }),
  "home.project-control-coordination": createGeneratedImage({
    id: "project-control-coordination",
    category: "home",
    profile: "panel",
    alt: "Illustrative AI-generated image of a representative Emitronix-branded site team coordinating high-rise construction work in Dubai; not a project photograph.",
    disclosure: BRANDED_PPE_DISCLOSURE,
  }),
  "home.quality-safety-inspection": createGeneratedImage({
    id: "quality-safety-inspection",
    category: "home",
    profile: "panel",
    alt: "Illustrative AI-generated image of a representative Emitronix-branded team carrying out a quality and safety inspection at a Dubai high-rise site; not a project photograph.",
    disclosure: BRANDED_PPE_DISCLOSURE,
  }),
  "company.engineering-coordination-dubai-hero": createGeneratedImage({
    id: "engineering-coordination-dubai-hero",
    category: "company",
    profile: "hero",
    alt: "Illustrative AI-generated image of a professional engineering team briefing at a Dubai construction site; people shown are representative.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "company.civil-site-review-dubai": createGeneratedImage({
    id: "civil-site-review-dubai",
    category: "company",
    profile: "panel",
    alt: "Illustrative AI-generated image of engineers reviewing concrete, drainage and utility works at a Dubai site; people shown are representative.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "services.construction-services-dubai-hero": createGeneratedImage({
    id: "construction-services-dubai-hero",
    category: "services",
    profile: "hero",
    alt: "Illustrative AI-generated image representing coordinated civil, building, industrial and MEP construction services in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "company.dubai-construction-industries-hero": createGeneratedImage({
    id: "dubai-construction-industries-hero",
    category: "company",
    profile: "hero",
    alt: "Illustrative AI-generated image of modern warehouse, commercial and light-industrial buildings in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "company.construction-technical-resources-dubai-hero": createGeneratedImage({
    id: "construction-technical-resources-dubai-hero",
    category: "company",
    profile: "hero",
    alt: "Illustrative AI-generated image of construction drawings, a tablet and technical coordination tools in a Dubai project office; no legible project data is shown.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "company.dubai-project-consultation-hero": createGeneratedImage({
    id: "dubai-project-consultation-hero",
    category: "company",
    profile: "hero",
    alt: "Illustrative AI-generated image of a client consultation with engineers for a Dubai construction project; people shown are representative.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "team.engineering-leadership-site-review": createGeneratedImage({
    id: "engineering-leadership-site-review",
    category: "team",
    profile: "team",
    alt: "Illustrative AI-generated image of representative construction leaders reviewing a Dubai site; the people shown are not Emitronix employees.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "team.construction-team-dubai": createGeneratedImage({
    id: "construction-team-dubai",
    category: "team",
    profile: "team",
    alt: "Illustrative AI-generated image of a diverse construction team wearing full PPE at a clean Dubai site; the people shown are not Emitronix employees.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "services.civil-contracting-dubai": createGeneratedImage({
    id: "civil-contracting-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of civil contracting works with concrete, drainage and utility coordination in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.main-contracting-dubai": createGeneratedImage({
    id: "main-contracting-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of coordinated main contracting activity on a clean commercial building site in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.warehouse-construction-dubai": createGeneratedImage({
    id: "warehouse-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of a modern warehouse under construction in a Dubai industrial area; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.industrial-construction-dubai": createGeneratedImage({
    id: "industrial-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of a clean light-industrial construction facility in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.commercial-construction-dubai": createGeneratedImage({
    id: "commercial-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of a contemporary commercial building construction site in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.villa-construction-dubai": createGeneratedImage({
    id: "villa-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of a contemporary villa under construction in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.interior-fit-out-dubai": createGeneratedImage({
    id: "interior-fit-out-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of a premium commercial interior fit-out in progress in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.building-renovation-dubai": createGeneratedImage({
    id: "building-renovation-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of carefully managed building renovation works in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.structural-works-dubai": createGeneratedImage({
    id: "structural-works-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of reinforced concrete and structural works on a Dubai construction site; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.design-build-contractor-dubai": createGeneratedImage({
    id: "design-build-contractor-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of architects and engineers coordinating design and construction in Dubai; people shown are representative.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "services.turnkey-construction-dubai": createGeneratedImage({
    id: "turnkey-construction-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image representing a coordinated turnkey building delivery in Dubai; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.project-management-dubai": createGeneratedImage({
    id: "project-management-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of construction project management and progress coordination in Dubai; people shown are representative.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "services.mep-works-dubai": createGeneratedImage({
    id: "mep-works-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of coordinated mechanical, electrical and plumbing installation in a Dubai facility; not an Emitronix project photograph.",
    disclosure: GENERAL_DISCLOSURE,
  }),
  "services.testing-commissioning-dubai": createGeneratedImage({
    id: "testing-commissioning-dubai",
    category: "services",
    profile: "service",
    alt: "Illustrative AI-generated image of an engineer testing and commissioning building systems in Dubai; people shown are representative.",
    disclosure: PEOPLE_DISCLOSURE,
  }),
  "approvals.dubai-authority-approvals-coordination": createGeneratedImage({
    id: "dubai-authority-approvals-coordination",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of generic construction approval coordination in Dubai; not an authority image, endorsement or Emitronix project photograph.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.dubai-municipality-approval-planning": createGeneratedImage({
    id: "dubai-municipality-approval-planning",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of building submission planning in Dubai; not a Dubai Municipality image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.dda-approval-coordination-dubai": createGeneratedImage({
    id: "dda-approval-coordination-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of development approval coordination for a Dubai project; not a DDA image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.dcd-fire-safety-approval-dubai": createGeneratedImage({
    id: "dcd-fire-safety-approval-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of fire-safety design coordination in Dubai; not a Dubai Civil Defence image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.dewa-approval-electrical-coordination-dubai": createGeneratedImage({
    id: "dewa-approval-electrical-coordination-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of electrical design and utility coordination in Dubai; not a DEWA image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.dewa-cable-works-dubai": createGeneratedImage({
    id: "dewa-cable-works-dubai",
    category: "approvals",
    profile: "blog",
    alt: "Illustrative AI-generated image of protected electrical cable installation works in Dubai; not a DEWA image, approval or Emitronix project photograph.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.trakhees-approval-warehouse-dubai": createGeneratedImage({
    id: "trakhees-approval-warehouse-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of warehouse technical submission coordination in Dubai; not a Trakhees image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.difc-fit-out-approval-dubai": createGeneratedImage({
    id: "difc-fit-out-approval-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of premium commercial fit-out coordination in Dubai; not a DIFC image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.concordia-dmcc-approval-dubai": createGeneratedImage({
    id: "concordia-dmcc-approval-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of commercial technical submission coordination in Dubai; not a Concordia or DMCC image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "approvals.rta-approval-noc-dubai": createGeneratedImage({
    id: "rta-approval-noc-dubai",
    category: "approvals",
    profile: "service",
    alt: "Illustrative AI-generated image of road-interface and utility NOC coordination in Dubai; not an RTA image, approval or endorsement.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "projects.portfolio-planning-dubai-hero": createGeneratedImage({
    id: "portfolio-planning-dubai-hero",
    category: "projects",
    profile: "hero",
    alt: "Illustrative AI-generated planning scene representing varied construction scopes in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.villa-renovation-planning-dubai": createGeneratedImage({
    id: "villa-renovation-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing a Dubai villa renovation; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.warehouse-civil-mep-upgrade-planning-dubai": createGeneratedImage({
    id: "warehouse-civil-mep-upgrade-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing civil and MEP upgrades to a Dubai warehouse; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.commercial-office-fit-out-planning-dubai": createGeneratedImage({
    id: "commercial-office-fit-out-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing a commercial office fit-out in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.building-maintenance-inspection-planning-dubai": createGeneratedImage({
    id: "building-maintenance-inspection-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing a building maintenance inspection in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.utility-approval-coordination-planning-dubai": createGeneratedImage({
    id: "utility-approval-coordination-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing utility approval coordination in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.retail-renovation-planning-dubai": createGeneratedImage({
    id: "retail-renovation-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing a retail renovation in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.industrial-facility-modification-planning-dubai": createGeneratedImage({
    id: "industrial-facility-modification-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing modifications to a Dubai industrial facility; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.mep-interface-coordination-planning-dubai": createGeneratedImage({
    id: "mep-interface-coordination-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing MEP interface coordination in a Dubai facility; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.authority-noc-coordination-planning-dubai": createGeneratedImage({
    id: "authority-noc-coordination-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing authority and NOC coordination in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "projects.civil-repair-maintenance-planning-dubai": createGeneratedImage({
    id: "civil-repair-maintenance-planning-dubai",
    category: "projects",
    profile: "card",
    alt: "Illustrative AI-generated planning scenario showing civil repair and maintenance works in Dubai; not evidence of an Emitronix project.",
    disclosure: PLANNING_DISCLOSURE,
  }),
  "blog.civil-construction-dubai-guide-2026": createGeneratedImage({
    id: "civil-construction-dubai-guide-2026",
    category: "blog",
    profile: "blog",
    alt: "Illustrative AI-generated image accompanying “Civil Construction in Dubai: A 2026 Guide”; not project evidence.",
    disclosure: EDITORIAL_DISCLOSURE,
  }),
  "blog.dubai-authority-approvals-guide": createGeneratedImage({
    id: "dubai-authority-approvals-guide",
    category: "blog",
    profile: "blog",
    alt: "Illustrative AI-generated image accompanying “Dubai Authority Approvals Guide”; not an authority image, endorsement or project evidence.",
    disclosure: AUTHORITY_DISCLOSURE,
  }),
  "blog.warehouse-construction-planning-guide": createGeneratedImage({
    id: "warehouse-construction-planning-guide",
    category: "blog",
    profile: "blog",
    alt: "Illustrative AI-generated image accompanying “Warehouse Construction Planning Guide”; not project evidence.",
    disclosure: EDITORIAL_DISCLOSURE,
  }),
  "blog.choosing-building-contractor-dubai": createGeneratedImage({
    id: "choosing-building-contractor-dubai",
    category: "blog",
    profile: "blog",
    alt: "Illustrative AI-generated image accompanying “Choosing a Building Contractor in Dubai”; not project evidence.",
    disclosure: EDITORIAL_DISCLOSURE,
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
