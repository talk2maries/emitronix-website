import { readSiteFiles } from "@/lib/adminStore";
import { defaultRobotsTxt } from "@/lib/siteFileDefaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const files = await readSiteFiles();
  const body = files.robotsTxt?.trim() ? files.robotsTxt : defaultRobotsTxt;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
