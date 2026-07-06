import { NextResponse } from "next/server";
import { readRedirects } from "@/lib/adminStore";

export const dynamic = "force-dynamic";

/** Public read-only redirect map consumed by the edge middleware. */
export async function GET() {
  const redirects = await readRedirects();
  return NextResponse.json(
    { redirects },
    { headers: { "Cache-Control": "public, max-age=30" } },
  );
}
