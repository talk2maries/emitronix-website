import { NextResponse } from "next/server";
import { COOKIE_ADMIN_SESSION_NAME } from "@/lib/cookieConsentAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_ADMIN_SESSION_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
