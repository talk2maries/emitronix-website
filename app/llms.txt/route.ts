import { readSiteFiles } from "@/lib/adminStore";
import { defaultLlmsTxt } from "@/lib/siteFileDefaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const files = await readSiteFiles();
  const body = files.llmsTxt?.trim() ? files.llmsTxt : defaultLlmsTxt;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
