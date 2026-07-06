import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { requestIp, requireSession } from "@/lib/adminGuard";
import { logActivity } from "@/lib/adminStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { session } = requireSession(request);
  if (session) {
    await logActivity({ user: session.email, action: "logout", ip: requestIp(request) });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
