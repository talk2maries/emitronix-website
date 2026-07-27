import { getImageProps } from "next/image";
import type { CSSProperties, HTMLAttributes } from "react";
import type { GeneratedImageAsset } from "@/data/generatedImages";

const DEFAULT_SIZES =
  "(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1200px";

export type ResponsiveIllustrativeImageProps = {
  asset: GeneratedImageAsset;
  alt?: string;
  sizes?: string;
  mobileMedia?: string;
  priority?: boolean;
  quality?: 50 | 65 | 75;
  className?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  id?: string;
  ariaDescribedBy?: string;
};

/**
 * Renders a Next.js-optimized, art-directed image without client-side code.
 *
 * The desktop dimensions remain on the fallback img to reserve layout space.
 * When a mobile variant is available, the source element supplies its own
 * dimensions so supporting browsers can reserve the correct mobile aspect
 * ratio before the image downloads.
 */
export function ResponsiveIllustrativeImage({
  asset,
  alt = asset.alt,
  sizes = DEFAULT_SIZES,
  mobileMedia = "(max-width: 767px)",
  priority = false,
  quality = 75,
  className,
  imageClassName,
  imageStyle,
  id,
  ariaDescribedBy,
}: ResponsiveIllustrativeImageProps) {
  const sharedProps = {
    alt,
    sizes,
    quality,
    priority,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
    decoding: "async" as const,
  };

  const {
    props: desktopProps,
  } = getImageProps({
    ...sharedProps,
    src: asset.desktop.src,
    width: asset.desktop.width,
    height: asset.desktop.height,
    className: imageClassName,
    style: {
      display: "block",
      width: "100%",
      height: "auto",
      ...imageStyle,
    },
  });

  let mobileSource:
    | {
        srcSet: string;
        sizes?: string;
        width: number;
        height: number;
      }
    | undefined;

  if (asset.mobile) {
    const {
      props: { srcSet, sizes: mobileSizes },
    } = getImageProps({
      ...sharedProps,
      src: asset.mobile.src,
      width: asset.mobile.width,
      height: asset.mobile.height,
    });

    if (srcSet) {
      mobileSource = {
        srcSet,
        sizes: mobileSizes,
        width: asset.mobile.width,
        height: asset.mobile.height,
      };
    }
  }

  return (
    <picture
      className={className}
      data-generated-image={asset.id}
      data-image-disclosure={asset.disclosure}
    >
      {mobileSource ? (
        <source
          media={mobileMedia}
          srcSet={mobileSource.srcSet}
          sizes={mobileSource.sizes}
          width={mobileSource.width}
          height={mobileSource.height}
        />
      ) : null}
      <img
        {...desktopProps}
        alt={alt}
        id={id}
        aria-describedby={ariaDescribedBy}
      />
    </picture>
  );
}

type IllustrativeImageDisclosureProps = {
  asset: GeneratedImageAsset;
} & HTMLAttributes<HTMLSpanElement>;

export function IllustrativeImageDisclosure({
  asset,
  ...props
}: IllustrativeImageDisclosureProps) {
  return <span {...props}>{asset.disclosure}</span>;
}
