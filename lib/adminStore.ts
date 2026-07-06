import { appendFile, mkdir, readFile, readdir, unlink, writeFile } from "fs/promises";
import path from "path";

const STORAGE_DIR = path.join(process.cwd(), "storage");
const SEO_OVERRIDES_PATH = path.join(STORAGE_DIR, "seo-overrides.json");
const REDIRECTS_PATH = path.join(STORAGE_DIR, "redirects.json");
const SITE_FILES_PATH = path.join(STORAGE_DIR, "site-files.json");
const ACTIVITY_PATH = path.join(STORAGE_DIR, "admin-activity.jsonl");
const ENQUIRIES_DIR = path.join(STORAGE_DIR, "enquiries");
const CAREERS_DIR = process.env.CAREERS_STORE_DIR || path.join(STORAGE_DIR, "careers");

export type SeoOverride = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  /** Raw JSON-LD object or array, injected as an additional script tag. */
  schemaJson?: string;
  /** Extra HTML injected client-side near the top of the page for this path. */
  headHtml?: string;
  /** Extra HTML injected client-side before the end of the page for this path. */
  footerHtml?: string;
};

export type Redirect = {
  from: string;
  to: string;
  permanent: boolean;
};

export type SiteFiles = {
  robotsTxt?: string;
  llmsTxt?: string;
  /** Global scripts injected on every page. */
  headScripts?: string;
  footerScripts?: string;
  /** Extra absolute or relative URLs appended to sitemap.xml. */
  sitemapExtraUrls?: string;
  /** Paths excluded from sitemap.xml, one per line. */
  sitemapExcludedPaths?: string;
};

export type ActivityEntry = {
  at: string;
  user: string;
  action: string;
  target?: string;
  detail?: string;
  ip?: string;
};

export type EnquiryRecord = {
  id: string;
  kind: "contact" | "blog" | "career";
  submittedAt: string;
  status: "new" | "in-progress" | "handled" | "spam";
  data: Record<string, unknown>;
  cvFile?: string;
};

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

// ---------- SEO overrides ----------

export async function readSeoOverrides(): Promise<Record<string, SeoOverride>> {
  return readJson(SEO_OVERRIDES_PATH, {});
}

export async function getSeoOverride(pagePath: string): Promise<SeoOverride | null> {
  const overrides = await readSeoOverrides();
  return overrides[pagePath] ?? null;
}

export async function saveSeoOverride(pagePath: string, override: SeoOverride) {
  const overrides = await readSeoOverrides();
  overrides[pagePath] = override;
  await writeJson(SEO_OVERRIDES_PATH, overrides);
}

export async function deleteSeoOverride(pagePath: string) {
  const overrides = await readSeoOverrides();
  delete overrides[pagePath];
  await writeJson(SEO_OVERRIDES_PATH, overrides);
}

// ---------- Redirects ----------

export async function readRedirects(): Promise<Redirect[]> {
  return readJson(REDIRECTS_PATH, []);
}

export async function saveRedirects(redirects: Redirect[]) {
  await writeJson(REDIRECTS_PATH, redirects);
}

// ---------- Site files (robots, llms, global scripts, sitemap tweaks) ----------

export async function readSiteFiles(): Promise<SiteFiles> {
  return readJson(SITE_FILES_PATH, {});
}

export async function saveSiteFiles(files: SiteFiles) {
  await writeJson(SITE_FILES_PATH, files);
}

// ---------- Activity log ----------

export async function logActivity(entry: Omit<ActivityEntry, "at">) {
  await mkdir(STORAGE_DIR, { recursive: true });
  const line = JSON.stringify({ at: new Date().toISOString(), ...entry });
  await appendFile(ACTIVITY_PATH, line + "\n", "utf8");
}

export async function readActivity(limit = 200): Promise<ActivityEntry[]> {
  try {
    const raw = await readFile(ACTIVITY_PATH, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .reverse()
      .map((line) => JSON.parse(line) as ActivityEntry);
  } catch {
    return [];
  }
}

// ---------- Enquiries ----------

export async function saveEnquiry(kind: "contact" | "blog", data: Record<string, unknown>) {
  const id = `${new Date().toISOString().replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 8)}`;
  const record: EnquiryRecord = {
    id,
    kind,
    submittedAt: new Date().toISOString(),
    status: "new",
    data,
  };
  await mkdir(ENQUIRIES_DIR, { recursive: true });
  await writeFile(path.join(ENQUIRIES_DIR, `${id}.json`), JSON.stringify(record, null, 2), "utf8");
  return id;
}

async function listDirRecords(dir: string, kind: EnquiryRecord["kind"]): Promise<EnquiryRecord[]> {
  let files: string[] = [];
  try {
    files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
  } catch {
    return [];
  }

  const records: EnquiryRecord[] = [];
  for (const file of files) {
    try {
      const raw = JSON.parse(await readFile(path.join(dir, file), "utf8")) as Record<string, unknown>;
      if (kind === "career") {
        // Career submissions are flat JSON files written by /api/careers.
        records.push({
          id: file.replace(/\.json$/, ""),
          kind: "career",
          submittedAt: String(raw.submittedAt || ""),
          status: (raw.status as EnquiryRecord["status"]) || "new",
          data: raw,
          cvFile: typeof raw.cvFile === "string" ? raw.cvFile : undefined,
        });
      } else {
        records.push(raw as unknown as EnquiryRecord);
      }
    } catch {
      // skip unreadable records
    }
  }
  return records;
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  const [general, careers] = await Promise.all([
    listDirRecords(ENQUIRIES_DIR, "contact"),
    listDirRecords(CAREERS_DIR, "career"),
  ]);
  return [...general, ...careers].sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
}

export async function updateEnquiryStatus(id: string, status: EnquiryRecord["status"]) {
  const safeId = path.basename(id);
  for (const dir of [ENQUIRIES_DIR, CAREERS_DIR]) {
    const filePath = path.join(dir, `${safeId}.json`);
    try {
      const record = JSON.parse(await readFile(filePath, "utf8")) as Record<string, unknown>;
      record.status = status;
      await writeFile(filePath, JSON.stringify(record, null, 2), "utf8");
      return true;
    } catch {
      // try next directory
    }
  }
  return false;
}

export async function deleteEnquiry(id: string) {
  const safeId = path.basename(id);
  for (const dir of [ENQUIRIES_DIR, CAREERS_DIR]) {
    try {
      await unlink(path.join(dir, `${safeId}.json`));
      return true;
    } catch {
      // try next directory
    }
  }
  return false;
}

export function careersDir() {
  return CAREERS_DIR;
}
