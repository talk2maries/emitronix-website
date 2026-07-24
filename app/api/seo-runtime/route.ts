import { NextRequest, NextResponse } from "next/server";
import { getSeoOverride } from "@/lib/adminStore";

export const dynamic = "force-dynamic";

/**
 * Backwards-compatible, noindex export for stored schema data.
 * Public pages no longer fetch or inject this data into the DOM.
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const override = await getSeoOverride(path);
  return NextResponse.json(
    {
      schemaJson: override?.schemaJson || null,
    },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
