import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicPath = (value) => path.join(projectRoot, "public", value.replace(/^\//, ""));

const assets = {
  logoSvg: "/images/emitronix-logo.svg",
  logoPng: "/images/emitronix-logo.png",
  reversedLogoSvg: "/images/emitronix-logo-reversed.svg",
  reversedLogoPng: "/images/emitronix-logo-reversed.png",
  socialCard: "/images/emitronix-social-card.png",
  markSvg: "/icons/emitronix-mark.svg",
  faviconPng: "/favicon-32x32.png",
  appleTouchIcon: "/apple-touch-icon.png",
  appIcon192: "/icons/emitronix-icon-192.png",
  appIcon512: "/icons/emitronix-icon-512.png",
};

const failures = [];

for (const [label, assetPath] of Object.entries(assets)) {
  try {
    await access(publicPath(assetPath));
  } catch {
    failures.push(`${label} is missing at ${assetPath}`);
  }
}

for (const label of ["logoSvg", "reversedLogoSvg"]) {
  const svg = await readFile(publicPath(assets[label]), "utf8");
  const forbidden = [
    [/<image\b/i, "embedded image"],
    [/data:image|base64/i, "embedded raster payload"],
    [/<text\b/i, "font-dependent text"],
    [/>[^<]*\.ae\b/i, ".ae logo suffix"],
    [/<rect[^>]+fill=["']#fff(?:fff)?["'][^>]*width=["']100%/i, "opaque white canvas"],
  ];

  if (!/viewBox=["']0 0 864 202["']/.test(svg)) {
    failures.push(`${label} does not use the canonical 864×202 viewBox`);
  }

  for (const [pattern, description] of forbidden) {
    if (pattern.test(svg)) failures.push(`${label} contains ${description}`);
  }

  if (!svg.includes("BUILDING THE FUTURE") && !svg.includes('aria-label="Building the Future"')) {
    failures.push(`${label} does not identify the Building the Future tagline`);
  }
}

const expectedRasterMetadata = [
  [assets.logoPng, 1728, 404, true],
  [assets.reversedLogoPng, 1728, 404, true],
  [assets.socialCard, 1200, 630, false],
  [assets.faviconPng, 32, 32, true],
  [assets.appleTouchIcon, 180, 180, true],
  [assets.appIcon192, 192, 192, true],
  [assets.appIcon512, 512, 512, true],
];

for (const [assetPath, width, height, shouldHaveAlpha] of expectedRasterMetadata) {
  const metadata = await sharp(publicPath(assetPath)).metadata();
  if (metadata.width !== width || metadata.height !== height) {
    failures.push(`${assetPath} is ${metadata.width}×${metadata.height}; expected ${width}×${height}`);
  }
  if (Boolean(metadata.hasAlpha) !== shouldHaveAlpha) {
    failures.push(`${assetPath} alpha=${Boolean(metadata.hasAlpha)}; expected ${shouldHaveAlpha}`);
  }
}

const sourceRoots = ["app", "components", "data", "lib"];
const sourceFiles = [];

for (const sourceRoot of sourceRoots) {
  const rootPath = path.join(projectRoot, sourceRoot);
  const entries = await readdir(rootPath, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !/\.(?:ts|tsx|js|jsx|css)$/.test(entry.name)) continue;
    sourceFiles.push(path.join(entry.parentPath, entry.name));
  }
}

for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, "utf8");
  if (source.includes("/images/emitronix-logo-horizontal.svg")) {
    failures.push(`${path.relative(projectRoot, sourceFile)} still references the obsolete logo`);
  }
  if (source.includes('"/favicon.svg"') || source.includes("'/favicon.svg'")) {
    failures.push(`${path.relative(projectRoot, sourceFile)} still references the obsolete favicon`);
  }
}

if (failures.length > 0) {
  console.error("Brand asset validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Brand asset validation passed (${Object.keys(assets).length} assets, ${sourceFiles.length} source files checked).`,
);
