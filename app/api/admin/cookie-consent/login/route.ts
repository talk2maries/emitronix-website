import { NextResponse } from "next/server";
import {
  COOKIE_ADMIN_SESSION_NAME,
  createCookieAdminSessionValue,
  isCookieAdminConfigured,
  verifyCookieAdminPassword,
} from "@/lib/cookieConsentAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isCookieAdminConfigured()) {
    return NextResponse.json({ ok: false, code: "COOKIE_ADMIN_NOT_CONFIGURED" }, { status: 503 });
  }

  const payload = (await request.json().catch(() => ({}))) as { password?: unknown };

  if (!verifyCookieAdminPassword(payload.password)) {
    return NextResponse.json({ ok: false, code: "INVALID_PASSWORD" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_ADMIN_SESSION_NAME, createCookieAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
