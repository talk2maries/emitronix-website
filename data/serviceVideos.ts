export type ServiceVideoAsset = {
  title: string;
  eyebrow: string;
  description: string;
  caption: string;
  ariaLabel: string;
  posterSrc: `/images/${string}`;
  mp4Src: `/videos/${string}.mp4`;
  webmSrc: `/videos/${string}.webm`;
  width: number;
  height: number;
  duration: string;
  uploadDate: string;
  highlights: ReadonlyArray<{
    title: string;
    description: string;
  }>;
};

export const serviceVideos = {
  "/warehouse-construction": {
    title: "Warehouse mezzanine floor steel structure",
    eyebrow: "Technical visual briefing",
    description:
      "A focused view of a warehouse mezzanine steel frame, corrugated metal deck, bolted connections and access stair for early scope discussions.",
    caption:
      "Silent visual sequence showing steel columns, beams, metal decking, bolted connections, access stairs and guarded mezzanine edges. Final structural design, fire and life-safety requirements, loading, approvals and site conditions must be confirmed for each project.",
    ariaLabel:
      "Warehouse mezzanine floor steel structure visual sequence",
    posterSrc:
      "/images/video/warehouse-mezzanine-steel-structure-video-poster.webp",
    mp4Src:
      "/videos/warehouse/warehouse-mezzanine-steel-structure-dubai.mp4",
    webmSrc:
      "/videos/warehouse/warehouse-mezzanine-steel-structure-dubai.webm",
    width: 720,
    height: 1280,
    duration: "PT23.8S",
    uploadDate: "2026-07-28",
    highlights: [
      {
        title: "Steel frame coordination",
        description:
          "Columns, primary beams and secondary members help frame early discussions about geometry, access and interfaces.",
      },
      {
        title: "Deck and connections",
        description:
          "Metal decking and visible bolted connections illustrate details that require project-specific structural design and review.",
      },
      {
        title: "Safe access planning",
        description:
          "The stair, guardrails and edge protection reinforce the need to coordinate access and safety requirements from the outset.",
      },
    ],
  },
} as const satisfies Record<string, ServiceVideoAsset>;

export function getServiceVideo(path: string): ServiceVideoAsset | undefined {
  return (serviceVideos as Record<string, ServiceVideoAsset | undefined>)[path];
}
