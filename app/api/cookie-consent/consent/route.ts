import { NextResponse } from "next/server";
import { recordCookieConsentEvent } from "@/lib/cookieConsentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const stats = await recordCookieConsentEvent({
      action: payload.action,
      categories: payload.categories as never,
    });

    return NextResponse.json({ ok: true, stats });
  } catch (error) {
    console.error("Cookie consent event failed", {
      code: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
