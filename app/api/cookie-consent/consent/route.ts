import { NextRequest, NextResponse } from "next/server";
import { recordCookieConsentEvent } from "@/lib/cookieConsentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 25;
const MAX_BODY_BYTES = 2_000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  if (isRateLimited(request)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    await recordCookieConsentEvent({
      action: payload.action,
      categories: payload.categories as never,
    });

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Cookie consent event failed", {
      code: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
