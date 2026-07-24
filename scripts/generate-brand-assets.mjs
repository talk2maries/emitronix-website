import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const logoPath = path.join(projectRoot, "public/images/emitronix-logo.svg");
const markPath = path.join(projectRoot, "public/icons/emitronix-mark.svg");
const logoPngPath = path.join(projectRoot, "public/images/emitronix-logo.png");
const reversedLogoPath = path.join(projectRoot, "public/images/emitronix-logo-reversed.svg");
const reversedLogoPngPath = path.join(projectRoot, "public/images/emitronix-logo-reversed.png");
const socialCardPath = path.join(projectRoot, "public/images/emitronix-social-card.png");

const logoSvg = await readFile(logoPath);
const markSvg = await readFile(markPath);
const logoSource = logoSvg.toString("utf8");

const forbiddenLogoPatterns = [
  { pattern: /<image\b/i, label: "embedded image element" },
  { pattern: /data:image/i, label: "embedded raster data" },
  { pattern: /base64/i, label: "base64 payload" },
  { pattern: /<text\b/i, label: "font-dependent text" },
  { pattern: />\s*\.ae\b/i, label: ".ae wordmark suffix" },
];

for (const { pattern, label } of forbiddenLogoPatterns) {
  if (pattern.test(logoSource)) {
    throw new Error(`The canonical logo contains a forbidden ${label}.`);
  }
}

const reversedLogoSvg = Buffer.from(
  logoSource
    .replaceAll("#1E293B", "#F8FBFF")
    .replaceAll("#64748B", "#D6E9FF"),
);

await writeFile(reversedLogoPath, reversedLogoSvg);

await sharp(logoSvg)
  .resize(1728, 404, { fit: "fill" })
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toFile(logoPngPath);

await sharp(reversedLogoSvg)
  .resize(1728, 404, { fit: "fill" })
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toFile(reversedLogoPngPath);

const iconOutputs = [
  { path: path.join(projectRoot, "public/favicon-32x32.png"), size: 32 },
  { path: path.join(projectRoot, "public/apple-touch-icon.png"), size: 180 },
  { path: path.join(projectRoot, "public/icons/emitronix-icon-192.png"), size: 192 },
  { path: path.join(projectRoot, "public/icons/emitronix-icon-512.png"), size: 512 },
];

await Promise.all(
  iconOutputs.map(({ path: outputPath, size }) =>
    sharp(markSvg)
      .resize(size, size, { fit: "fill" })
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toFile(outputPath),
  ),
);

const socialBackground = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="surface" x1="80" y1="20" x2="1120" y2="610" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFFFF"/>
        <stop offset=".58" stop-color="#F8FBFF"/>
        <stop offset="1" stop-color="#EAF5FF"/>
      </linearGradient>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(1040 92) rotate(137) scale(430 330)" gradientUnits="userSpaceOnUse">
        <stop stop-color="#54D6FF" stop-opacity=".3"/>
        <stop offset="1" stop-color="#54D6FF" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path d="M52 0H0v52" fill="none" stroke="#194991" stroke-opacity=".055"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#surface)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <path d="M0 564C278 505 561 500 1200 579V630H0v-66Z" fill="#194991" fill-opacity=".045"/>
    <path d="M0 579C366 513 744 519 1200 590" fill="none" stroke="#1EA7FF" stroke-opacity=".32" stroke-width="3"/>
    <rect x="48" y="48" width="1104" height="534" rx="38" fill="none" stroke="#194991" stroke-opacity=".1" stroke-width="2"/>
  </svg>
`);

const socialLogo = await sharp(logoSvg)
  .resize({ width: 960, withoutEnlargement: false })
  .png()
  .toBuffer();

await sharp(socialBackground)
  .composite([{ input: socialLogo, left: 120, top: 203 }])
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toFile(socialCardPath);

const generated = [
  logoPngPath,
  reversedLogoPngPath,
  socialCardPath,
  ...iconOutputs.map(({ path: outputPath }) => outputPath),
];

for (const outputPath of generated) {
  const metadata = await sharp(outputPath).metadata();
  const relativePath = path.relative(projectRoot, outputPath);
  console.log(`${relativePath}: ${metadata.width}x${metadata.height} ${metadata.format}`);
}
