import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_ADMIN_SESSION_NAME = "emitronix_cookie_admin";

const ADMIN_CONTEXT = "emitronix-cookie-consent-admin";

export function getCookieAdminSecret() {
  return process.env.COOKIE_ADMIN_TOKEN || process.env.COOKIE_ADMIN_PASSWORD || "";
}

export function isCookieAdminConfigured() {
  return Boolean(getCookieAdminSecret());
}

export function createCookieAdminSessionValue() {
  const secret = getCookieAdminSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(ADMIN_CONTEXT).digest("hex");
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
  const expected = createCookieAdminSessionValue();
  return Boolean(value && expected && safeCompare(value, expected));
}

export function hasCookieAdminCookie(cookies: { get: (name: string) => { value: string } | undefined }) {
  return hasCookieAdminAccess(cookies.get(COOKIE_ADMIN_SESSION_NAME)?.value);
}
