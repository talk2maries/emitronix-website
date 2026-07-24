import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_ADMIN_SESSION_NAME = "emitronix_cookie_admin";
export const COOKIE_ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

const ADMIN_CONTEXT = "emitronix-cookie-consent-admin";

export function getCookieAdminSecret() {
  return process.env.COOKIE_ADMIN_TOKEN || process.env.COOKIE_ADMIN_PASSWORD || "";
}

export function isCookieAdminConfigured() {
  return Boolean(getCookieAdminSecret());
}

function createCookieAdminSignature(secret: string, expiresAt: number) {
  return createHmac("sha256", secret).update(`${ADMIN_CONTEXT}:${expiresAt}`).digest("hex");
}

export function createCookieAdminSessionValue() {
  const secret = getCookieAdminSecret();
  if (!secret) return "";
  const expiresAt = Math.floor(Date.now() / 1000) + COOKIE_ADMIN_SESSION_TTL_SECONDS;
  return `${expiresAt}.${createCookieAdminSignature(secret, expiresAt)}`;
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyCookieAdminPassword(value: unknown) {
  const secret = getCookieAdminSecret();
  return typeof value === "string" && Boolean(secret) && safeCompare(value, secret);
}

export function hasCookieAdminAccess(value: string | undefined) {
  const secret = getCookieAdminSecret();
  if (!value || !secret) return false;

  const parts = value.split(".");
  if (parts.length !== 2 || !/^\d+$/.test(parts[0])) return false;

  const expiresAt = Number(parts[0]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  const expectedSignature = createCookieAdminSignature(secret, expiresAt);
  return safeCompare(parts[1], expectedSignature);
}

export function hasCookieAdminCookie(cookies: { get: (name: string) => { value: string } | undefined }) {
  return hasCookieAdminAccess(cookies.get(COOKIE_ADMIN_SESSION_NAME)?.value);
}
