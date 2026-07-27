import { access, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import ts from "typescript";

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, "data", "generatedImages.ts");
const generatedRoot = path.join(
  projectRoot,
  "public",
  "images",
  "generated",
);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadManifest() {
  const source = await readFile(manifestPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: manifestPath,
  });
  const dataUrl = `data:text/javascript;base64,${Buffer.from(
    transpiled.outputText,
  ).toString("base64")}`;
  return import(dataUrl);
}

function workspacePath(publicSrc) {
  return path.join(projectRoot, "public", publicSrc.replace(/^\//, ""));
}

function masterPath(asset) {
  return path.join(
    generatedRoot,
    asset.category,
    `${asset.id}-master.png`,
  );
}

async function renderVariant(master, target, variantName) {
  const destination = workspacePath(target.src);
  await mkdir(path.dirname(destination), { recursive: true });

  const position =
    variantName === "mobile" ? sharp.strategy.attention : sharp.strategy.entropy;

  await sharp(master)
    .rotate()
    .resize(target.width, target.height, {
      fit: "cover",
      position,
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .webp({
      quality: variantName === "og" ? 84 : 82,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(destination);

  return path.relative(projectRoot, destination);
}

const { generatedImages } = await loadManifest();
const generated = [];
const pending = [];

for (const [key, asset] of Object.entries(generatedImages)) {
  const master = masterPath(asset);
  if (!(await exists(master))) {
    pending.push(key);
    continue;
  }

  for (const variantName of ["desktop", "mobile", "og"]) {
    const target = asset[variantName];
    if (!target) continue;
    generated.push(
      await renderVariant(master, target, variantName),
    );
  }
}

console.log(
  `Generated ${generated.length} responsive/social WebP files from ${
    Object.keys(generatedImages).length - pending.length
  } available masters.`,
);

if (pending.length > 0) {
  console.log(
    `${pending.length} approved masters are still pending; existing variants were left unchanged.`,
  );
}
