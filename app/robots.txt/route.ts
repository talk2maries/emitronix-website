import { defaultRobotsTxt } from "@/lib/siteFileDefaults";

export function GET() {
  return new Response(defaultRobotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
