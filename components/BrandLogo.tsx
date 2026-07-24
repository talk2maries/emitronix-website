/* eslint-disable @next/next/no-img-element */

import { brandAssets } from "@/data/site";

type BrandLogoProps = {
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "primary" | "reversed";
};

export function BrandLogo({
  alt = "Emitronix — Building the Future",
  className = "block",
  imageClassName = "h-auto w-full object-contain",
  priority = false,
  sizes,
  variant = "primary",
}: BrandLogoProps) {
  const svgSource = variant === "reversed" ? brandAssets.reversedLogoSvg : brandAssets.logoSvg;
  const pngSource = variant === "reversed" ? brandAssets.reversedLogoPng : brandAssets.logoPng;

  return (
    <picture className={className} data-brand-logo={variant}>
      <source srcSet={svgSource} type="image/svg+xml" />
      <img
        src={pngSource}
        alt={alt}
        width={864}
        height={202}
        className={imageClassName}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        sizes={sizes}
        draggable={false}
      />
    </picture>
  );
}
