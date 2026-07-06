import { NextRequest, NextResponse } from "next/server";
import { getSeoOverride } from "@/lib/adminStore";

export const dynamic = "force-dynamic";

/**
 * Public per-path runtime overrides (JSON-LD schema and extra HTML blocks)
 * consumed by the SeoRuntime client component. Only publicly rendered fields
 * are exposed.
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const override = await getSeoOverride(path);
  return NextResponse.json(
    {
      schemaJson: override?.schemaJson || null,
      headHtml: override?.headHtml || null,
      footerHtml: override?.footerHtml || null,
    },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
