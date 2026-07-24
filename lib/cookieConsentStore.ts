import { promises as fs } from "fs";
import path from "path";
import {
  cookieCategoryIds,
  defaultCookieConsentConfig,
  normalizeCookieConsentConfig,
  type ConsentCategoryMap,
  type CookieCategoryId,
  type CookieConsentConfig,
} from "@/data/cookieConsentDefaults";

type ConsentAction = "accept_all" | "reject_non_essential" | "customize" | "save_preferences";

export type CookieConsentStats = {
  totalEvents: number;
  actions: Record<ConsentAction, number>;
  categories: Record<CookieCategoryId, number>;
  lastConsentAt: string | null;
  resetAt: string | null;
};

export type CookieConsentStoreData = {
  config: CookieConsentConfig;
  stats: CookieConsentStats;
};

type ConsentEventInput = {
  action?: unknown;
  categories?: Partial<Record<CookieCategoryId, unknown>>;
};

const defaultStats: CookieConsentStats = {
  totalEvents: 0,
  actions: {
    accept_all: 0,
    reject_non_essential: 0,
    customize: 0,
    save_preferences: 0,
  },
  categories: {
    necessary: 0,
    analytics: 0,
    marketing: 0,
    functional: 0,
    performance: 0,
  },
  lastConsentAt: null,
  resetAt: null,
};

function storePath() {
  return process.env.COOKIE_CONSENT_STORE_PATH || path.join(process.cwd(), "storage", "cookie-consent.json");
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeStats(stats: Partial<CookieConsentStats> | undefined): CookieConsentStats {
  return {
    totalEvents: Number(stats?.totalEvents || 0),
    actions: {
      accept_all: Number(stats?.actions?.accept_all || 0),
      reject_non_essential: Number(stats?.actions?.reject_non_essential || 0),
      customize: Number(stats?.actions?.customize || 0),
      save_preferences: Number(stats?.actions?.save_preferences || 0),
    },
    categories: {
      necessary: Number(stats?.categories?.necessary || 0),
      analytics: Number(stats?.categories?.analytics || 0),
      marketing: Number(stats?.categories?.marketing || 0),
      functional: Number(stats?.categories?.functional || 0),
      performance: Number(stats?.categories?.performance || 0),
    },
    lastConsentAt: typeof stats?.lastConsentAt === "string" ? stats.lastConsentAt : null,
    resetAt: typeof stats?.resetAt === "string" ? stats.resetAt : null,
  };
}

async function readStore(): Promise<CookieConsentStoreData> {
  try {
    const file = await fs.readFile(storePath(), "utf8");
    const data = JSON.parse(file) as Partial<CookieConsentStoreData>;
    return {
      config: normalizeCookieConsentConfig(data.config),
      stats: normalizeStats(data.stats),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Cookie consent store read failed", {
        code: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      });
    }
    return {
      config: clone(defaultCookieConsentConfig),
      stats: clone(defaultStats),
    };
  }
}

async function writeStore(data: CookieConsentStoreData) {
  const filePath = storePath();
  const directory = path.dirname(filePath);
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  await fs.chmod(directory, 0o700);
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), { encoding: "utf8", mode: 0o600 });
  await fs.rename(tmpPath, filePath);
  await fs.chmod(filePath, 0o600);
}

export async function getCookieConsentData() {
  return readStore();
}

export async function getCookieConsentConfig() {
  const data = await readStore();
  return data.config;
}

export async function updateCookieConsentConfig(config: CookieConsentConfig) {
  const data = await readStore();
  const nextConfig = normalizeCookieConsentConfig({
    ...config,
    version: Math.max(1, Number(data.config.version || 1) + 1),
    updatedAt: new Date().toISOString(),
  });
  const nextData = {
    ...data,
    config: nextConfig,
  };
  await writeStore(nextData);
  return nextData;
}

export async function resetCookieConsents() {
  const data = await readStore();
  const nextData: CookieConsentStoreData = {
    config: normalizeCookieConsentConfig({
      ...data.config,
      version: Math.max(1, Number(data.config.version || 1) + 1),
      updatedAt: new Date().toISOString(),
    }),
    stats: {
      ...clone(defaultStats),
      resetAt: new Date().toISOString(),
    },
  };
  await writeStore(nextData);
  return nextData;
}

function sanitizeAction(action: unknown): ConsentAction {
  if (action === "accept_all" || action === "reject_non_essential" || action === "customize" || action === "save_preferences") {
    return action;
  }
  return "save_preferences";
}

function sanitizeCategoryMap(categories: ConsentEventInput["categories"]): ConsentCategoryMap {
  return cookieCategoryIds.reduce((result, id) => {
    result[id] = id === "necessary" ? true : categories?.[id] === true;
    return result;
  }, {} as ConsentCategoryMap);
}

export async function recordCookieConsentEvent(input: ConsentEventInput) {
  const data = await readStore();
  const action = sanitizeAction(input.action);
  const categories = sanitizeCategoryMap(input.categories);
  const nextStats = normalizeStats(data.stats);

  nextStats.totalEvents += 1;
  nextStats.actions[action] += 1;
  nextStats.lastConsentAt = new Date().toISOString();

  for (const id of cookieCategoryIds) {
    if (categories[id]) {
      nextStats.categories[id] += 1;
    }
  }

  const nextData = {
    ...data,
    stats: nextStats,
  };
  await writeStore(nextData);
  return nextStats;
}
