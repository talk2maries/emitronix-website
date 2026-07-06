import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/adminGuard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { session, error } = requireSession(request);
  if (error) return error;
  return NextResponse.json({ ok: true, user: { email: session.email, role: session.role } });
}
