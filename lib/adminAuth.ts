import { createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type AdminRole = "admin" | "seo";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
  createdAt: string;
};

export type AdminSession = {
  uid: string;
  email: string;
  role: AdminRole;
  exp: number;
};

export const ADMIN_SESSION_COOKIE = "emitronix_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const USERS_PATH = process.env.ADMIN_USERS_PATH || path.join(process.cwd(), "storage", "admin-users.json");

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function isAdminConfigured() {
  return Boolean(sessionSecret());
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

async function writeUsers(users: AdminUser[]) {
  await mkdir(path.dirname(USERS_PATH), { recursive: true });
  await writeFile(USERS_PATH, JSON.stringify(users, null, 2), "utf8");
}

/**
 * Loads admin users. On first use, seeds the initial administrator from the
 * ADMIN_EMAIL / ADMIN_PASSWORD environment variables.
 */
export async function loadAdminUsers(): Promise<AdminUser[]> {
  try {
    const raw = await readFile(USERS_PATH, "utf8");
    const parsed = JSON.parse(raw) as AdminUser[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // fall through to seeding
  }

  const seedEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const seedPassword = process.env.ADMIN_PASSWORD || "";

  if (!seedEmail || !seedPassword) return [];

  const seeded: AdminUser[] = [
    {
      id: randomUUID(),
      email: seedEmail,
      name: "Administrator",
      role: "admin",
      passwordHash: hashPassword(seedPassword),
      createdAt: new Date().toISOString(),
    },
  ];
  await writeUsers(seeded);
  return seeded;
}

export async function saveAdminUsers(users: AdminUser[]) {
  await writeUsers(users);
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createSessionValue(user: Pick<AdminUser, "id" | "email" | "role">) {
  const session: AdminSession = {
    uid: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value: string | undefined | null): AdminSession | null {
  if (!value || !sessionSecret()) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (!session.uid || !session.role || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

/** Reads and verifies the admin session from a request-like cookie store. */
export function sessionFromCookies(cookies: { get: (name: string) => { value: string } | undefined }) {
  return verifySessionValue(cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export function hasRole(session: AdminSession | null, roles: AdminRole[] = ["admin", "seo"]) {
  return Boolean(session && roles.includes(session.role));
}
