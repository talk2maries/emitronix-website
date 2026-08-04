import { createHash } from "crypto";
import {
  ZohoApiError,
  ZohoConfigError,
  leadDescription,
  syncZohoWebsiteLead,
  type WebsiteLead,
  zohoClient,
} from "@/lib/googleZoho/zohoClient";

export { ZohoApiError, ZohoConfigError, type WebsiteLead, syncZohoWebsiteLead };

export function leadFingerprint(lead: Pick<WebsiteLead, "email" | "phone" | "message">) {
  return createHash("sha256")
    .update([lead.email.toLowerCase(), lead.phone || "", lead.message.slice(0, 500)].join("|"))
    .digest("hex");
}

/**
 * Backward-compatible plain lead insertion for career applications. Paid-media
 * forms use syncZohoWebsiteLead so existing Lead Source values are preserved.
 */
export async function createZohoLead(lead: WebsiteLead) {
  const client = zohoClient();
  const config = client.environment;
  const parts = lead.name.trim().split(/\s+/).filter(Boolean);
  const record: Record<string, unknown> = {
    Last_Name: parts.at(-1) || "Website Enquiry",
    Company: lead.company?.trim().slice(0, 180) || "Website Enquiry - Emitronix",
    Email: lead.email.trim().toLowerCase().slice(0, 180),
    Lead_Source: config.leadSource,
    Description: leadDescription(lead),
  };
  if (parts.length > 1) record.First_Name = parts.slice(0, -1).join(" ").slice(0, 120);
  if (lead.phone) {
    record.Phone = lead.phone.trim().slice(0, 30);
    record.Mobile = lead.phone.trim().slice(0, 30);
  }
  try {
    const id = await client.createRecord(config.module, record);
    return { id, duplicate: false };
  } catch (error) {
    if (error instanceof ZohoApiError && error.code === "DUPLICATE_DATA") {
      return { id: undefined, duplicate: true };
    }
    throw error;
  }
}
