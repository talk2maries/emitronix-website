import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import ts from "typescript";

const projectRoot = process.cwd();
const allowIncomplete = process.argv.includes("--allow-incomplete");
const manifestPath = path.join(projectRoot, "data", "generatedImages.ts");
const generatedRoot = path.join(projectRoot, "public", "images", "generated");
const allowedCategories = new Set([
  "home",
  "company",
  "services",
  "approvals",
  "projects",
  "blog",
  "team",
]);
const allowedPublicDirectories = new Set([...allowedCategories, "social"]);
const expectedProfileDimensions = {
  hero: {
    desktop: [1920, 1080],
    mobile: [1080, 1350],
    og: [1200, 630],
  },
  panel: {
    desktop: [1600, 1200],
    mobile: [1080, 1350],
  },
  service: {
    desktop: [1920, 1080],
    mobile: [1080, 1350],
    og: [1200, 630],
  },
  team: {
    desktop: [1600, 1067],
    mobile: [1080, 1350],
    og: [1200, 630],
  },
  card: {
    desktop: [1600, 1067],
  },
  blog: {
    desktop: [1600, 900],
    mobile: [1080, 1350],
    og: [1200, 630],
  },
};

const failures = [];
const warnings = [];

async function loadTypeScriptModule(filePath) {
  const source = await readFile(filePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filePath,
    reportDiagnostics: true,
  });

  for (const diagnostic of transpiled.diagnostics ?? []) {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    failures.push(`Manifest transpilation error: ${message}`);
  }

  const dataUrl = `data:text/javascript;base64,${Buffer.from(
    transpiled.outputText,
  ).toString("base64")}`;

  return import(dataUrl);
}

function publicPath(src) {
  return path.join(projectRoot, "public", src.replace(/^\//, ""));
}

function expectedDimensions(asset, variantName) {
  return expectedProfileDimensions[asset.profile]?.[variantName];
}

function checkDeclaredVariant(key, asset, variantName, variant) {
  if (!variant || typeof variant !== "object") {
    failures.push(`${key} is missing its ${variantName} variant`);
    return;
  }

  if (
    typeof variant.src !== "string" ||
    !variant.src.startsWith("/images/generated/")
  ) {
    failures.push(`${key}.${variantName} has an invalid generated image path`);
  }

  if (!/\.(?:webp|avif)$/i.test(variant.src)) {
    failures.push(
      `${key}.${variantName} must use WebP or AVIF, received ${variant.src}`,
    );
  }

  const expected = expectedDimensions(asset, variantName);
  if (
    expected &&
    (variant.width !== expected[0] || variant.height !== expected[1])
  ) {
    failures.push(
      `${key}.${variantName} declares ${variant.width}x${variant.height}; expected ${expected[0]}x${expected[1]} for profile ${asset.profile}`,
    );
  }

  if (
    variantName === "og" &&
    (variant.width !== 1200 || variant.height !== 630)
  ) {
    failures.push(
      `${key}.og must be exactly 1200x630, received ${variant.width}x${variant.height}`,
    );
  }
}

async function walkFiles(directory) {
  const files = [];
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return files;
    throw error;
  }

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

const { generatedImages } = await loadTypeScriptModule(manifestPath);

if (!generatedImages || typeof generatedImages !== "object") {
  failures.push("data/generatedImages.ts does not export generatedImages");
}

const entries = Object.entries(generatedImages ?? {});
if (entries.length !== 50) {
  failures.push(
    `Generated image manifest contains ${entries.length} assets; expected 50 approved live-site assets`,
  );
}

const expectedFiles = new Map();
const seenIds = new Map();

for (const [key, asset] of entries) {
  if (typeof asset !== "object" || asset === null) {
    failures.push(`${key} is not a valid asset object`);
    continue;
  }

  if (!allowedCategories.has(asset.category)) {
    failures.push(`${key} has unsupported category ${String(asset.category)}`);
  }
  if (!expectedProfileDimensions[asset.profile]) {
    failures.push(`${key} has unsupported profile ${String(asset.profile)}`);
  }
  if (key !== `${asset.category}.${asset.id}`) {
    failures.push(
      `${key} must match its declared category and id (${asset.category}.${asset.id})`,
    );
  }
  if (!/^Illustrative AI-generated\b/.test(asset.alt ?? "")) {
    failures.push(`${key} alt text must identify the image as AI-generated`);
  }
  if (!/AI-generated/i.test(asset.disclosure ?? "")) {
    failures.push(`${key} disclosure must identify the image as AI-generated`);
  }

  if (seenIds.has(asset.id)) {
    failures.push(
      `${key} and ${seenIds.get(asset.id)} reuse the same asset id ${asset.id}`,
    );
  } else {
    seenIds.set(asset.id, key);
  }

  const expectedVariants = Object.keys(
    expectedProfileDimensions[asset.profile] ?? {},
  );
  const declaredVariants = ["desktop", "mobile", "og"].filter(
    (variantName) => asset[variantName],
  );

  for (const variantName of expectedVariants) {
    checkDeclaredVariant(key, asset, variantName, asset[variantName]);
  }
  for (const variantName of declaredVariants) {
    if (!expectedVariants.includes(variantName)) {
      failures.push(
        `${key} declares unexpected ${variantName} variant for profile ${asset.profile}`,
      );
    }

    const variant = asset[variantName];
    if (expectedFiles.has(variant.src)) {
      failures.push(
        `${key}.${variantName} reuses the manifest path already assigned to ${expectedFiles.get(variant.src).label}`,
      );
    } else {
      expectedFiles.set(variant.src, {
        label: `${key}.${variantName}`,
        width: variant.width,
        height: variant.height,
        variantName,
      });
    }
  }
}

const fileHashes = new Map();

for (const [src, expectation] of expectedFiles) {
  const filePath = publicPath(src);

  try {
    await access(filePath);
  } catch {
    const message = `${expectation.label} is missing at ${src}`;
    if (allowIncomplete) warnings.push(message);
    else failures.push(message);
    continue;
  }

  try {
    const [file, metadata] = await Promise.all([
      readFile(filePath),
      sharp(filePath).metadata(),
    ]);

    if (!["webp", "avif"].includes(metadata.format)) {
      failures.push(
        `${src} has ${metadata.format ?? "unknown"} content; expected WebP or AVIF`,
      );
    }
    if (
      metadata.width !== expectation.width ||
      metadata.height !== expectation.height
    ) {
      failures.push(
        `${src} is ${metadata.width}x${metadata.height}; expected ${expectation.width}x${expectation.height}`,
      );
    }
    if (
      expectation.variantName === "og" &&
      (metadata.width !== 1200 || metadata.height !== 630)
    ) {
      failures.push(`${src} is not a valid 1200x630 social image`);
    }

    const hash = createHash("sha256").update(file).digest("hex");
    const duplicate = fileHashes.get(hash);
    if (duplicate) {
      failures.push(`${src} is byte-for-byte identical to ${duplicate}`);
    } else {
      fileHashes.set(hash, src);
    }
  } catch (error) {
    failures.push(`${src} could not be inspected: ${error.message}`);
  }
}

const generatedFiles = await walkFiles(generatedRoot);
const expectedAbsolutePaths = new Set(
  [...expectedFiles.keys()].map((src) => path.resolve(publicPath(src))),
);

for (const filePath of generatedFiles) {
  const relativePath = path.relative(generatedRoot, filePath);
  const [directory] = relativePath.split(path.sep);
  const extension = path.extname(filePath).toLowerCase();

  if (!allowedPublicDirectories.has(directory)) {
    failures.push(
      `Generated asset is stored in an unsupported directory: ${relativePath}`,
    );
  }
  if ([".jpg", ".jpeg", ".png"].includes(extension)) {
    const message = `Generated website asset must not use ${extension}: ${relativePath}`;
    if (allowIncomplete && /-master\.png$/i.test(relativePath)) {
      warnings.push(`${message} (temporary generation master)`);
    } else {
      failures.push(message);
    }
  }
  if (
    [".webp", ".avif", ".jpg", ".jpeg", ".png"].includes(extension) &&
    !expectedAbsolutePaths.has(path.resolve(filePath))
  ) {
    const message = `Unlisted generated image found: ${relativePath}`;
    if (allowIncomplete && /-master\.png$/i.test(relativePath)) {
      warnings.push(`${message} (temporary generation master)`);
    } else {
      failures.push(message);
    }
  }
}

const sourceRoots = ["app", "components", "data"];
const sourceFiles = (
  await Promise.all(
    sourceRoots.map((sourceRoot) =>
      walkFiles(path.join(projectRoot, sourceRoot)),
    ),
  )
).flat();
const literalGeneratedPath =
  /\/images\/generated\/[a-z0-9_./-]+\.(?:webp|avif|png|jpe?g)/gi;

for (const sourceFile of sourceFiles) {
  if (!/\.(?:ts|tsx|js|jsx)$/.test(sourceFile)) continue;
  const source = await readFile(sourceFile, "utf8");
  for (const match of source.matchAll(literalGeneratedPath)) {
    const referencedPath = match[0];
    if (!expectedFiles.has(referencedPath)) {
      failures.push(
        `${path.relative(projectRoot, sourceFile)} references an unlisted generated image: ${referencedPath}`,
      );
    }
  }
}

if (warnings.length > 0) {
  console.warn("Generated image asset validation warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length > 0) {
  console.error(
    `Generated image asset validation failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`,
  );
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Generated image asset validation passed${allowIncomplete ? " in partial-batch mode" : ""} (${entries.length} assets, ${expectedFiles.size} responsive/social files, ${sourceFiles.length} source files checked).`,
);
