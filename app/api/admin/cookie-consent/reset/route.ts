import { NextRequest, NextResponse } from "next/server";
import { COOKIE_ADMIN_SESSION_NAME, hasCookieAdminAccess, isCookieAdminConfigured } from "@/lib/cookieConsentAdmin";
import { resetCookieConsents } from "@/lib/cookieConsentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isCookieAdminConfigured() || !hasCookieAdminAccess(request.cookies.get(COOKIE_ADMIN_SESSION_NAME)?.value)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const data = await resetCookieConsents();
  return NextResponse.json({ ok: true, ...data });
}
