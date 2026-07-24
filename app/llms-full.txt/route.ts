import { defaultLlmsFullTxt } from "@/lib/siteFileDefaults";

export const revalidate = 3600;

export async function GET() {
  return new Response(defaultLlmsFullTxt, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
