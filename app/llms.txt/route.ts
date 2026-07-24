import { readSiteFiles } from "@/lib/adminStore";
import { defaultLlmsTxt, llmsEvidenceBoundary } from "@/lib/siteFileDefaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const files = await readSiteFiles();
  const configuredBody = files.llmsTxt?.trim() ? files.llmsTxt.trim() : defaultLlmsTxt;
  const bodyWithoutConfiguredBoundary = configuredBody
    .replace(
      /(?:^|\r?\n)## Required evidence boundary[\s\S]*?(?=\r?\n## |\s*$)/g,
      "",
    )
    .trim();
  const body = `${bodyWithoutConfiguredBoundary}\n\n${llmsEvidenceBoundary}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
