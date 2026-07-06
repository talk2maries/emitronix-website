import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionValue, isAdminConfigured, loadAdminUsers, verifyPassword } from "@/lib/adminAuth";
import { requestIp } from "@/lib/adminGuard";
import { logActivity } from "@/lib/adminStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Admin is not configured. Set ADMIN_SESSION_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  const ip = requestIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many login attempts. Try again later." }, { status: 429 });
  }

  let payload: { email?: unknown; password?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const password = typeof payload.password === "string" ? payload.password : "";

  const users = await loadAdminUsers();
  const user = users.find((candidate) => candidate.email === email);

  if (!user || !password || !verifyPassword(password, user.passwordHash)) {
    await logActivity({ user: email || "unknown", action: "login-failed", ip });
    return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
  }

  await logActivity({ user: user.email, action: "login", ip });

  const response = NextResponse.json({ ok: true, user: { email: user.email, name: user.name, role: user.role } });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  return response;
}
