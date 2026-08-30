import { defaultRobotsTxt } from "@/lib/siteFileDefaults";

export function GET() {
  return new Response(defaultRobotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
