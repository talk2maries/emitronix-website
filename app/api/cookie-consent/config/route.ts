import { NextResponse } from "next/server";
import { getCookieConsentConfig } from "@/lib/cookieConsentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getCookieConsentConfig();

  return NextResponse.json(
    { config },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
