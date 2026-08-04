import { z } from "zod";

export class IntegrationConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IntegrationConfigError";
  }
}

function readWithSchema<T>(schema: z.ZodType<T>, value: unknown, label: string) {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new IntegrationConfigError(`${label}: ${result.error.issues.map((issue) => issue.message).join("; ")}`);
  }
  return result.data;
}

const httpsUrl = z.string().url().refine((value) => value.startsWith("https://"), "must use HTTPS").transform((value) => value.replace(/\/+$/, ""));
const zohoAccountsHosts = new Set([
  "accounts.zoho.com",
  "accounts.zoho.eu",
  "accounts.zoho.in",
  "accounts.zoho.com.au",
  "accounts.zoho.jp",
  "accounts.zohocloud.ca",
  "accounts.zoho.sa",
  "accounts.zoho.uk",
  "accounts.zoho.com.cn",
  "accounts.zoho.sg",
  "accounts.zohohq.in",
  "accounts.zoho.ae",
]);
const zohoApiHosts = new Set(
  ["com", "eu", "in", "com.au", "jp", "ca", "sa", "uk", "com.cn", "sg", "ae"].flatMap((suffix) =>
    ["www", "sandbox", "developer"].map((prefix) => `${prefix}.zohoapis.${suffix}`),
  ),
);

function exactAllowedHttpsOrigin(value: string, hosts: Set<string>) {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.port ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      (url.pathname !== "/" && url.pathname !== "") ||
      !hosts.has(url.hostname.toLowerCase())
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

const zohoAccountsUrl = z
  .string()
  .refine((value) => Boolean(exactAllowedHttpsOrigin(value, zohoAccountsHosts)), "must be an official Zoho Accounts HTTPS origin")
  .transform((value) => exactAllowedHttpsOrigin(value, zohoAccountsHosts)!);

export function allowedZohoApiDomain(value: string) {
  return exactAllowedHttpsOrigin(value, zohoApiHosts);
}
const customerId = z.string().regex(/^\d{6,12}$/, "must contain 6-12 digits without dashes");

export type ZohoEnvironment = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string;
  module: string;
  leadSource: string;
  paidLeadSource: string;
  paidLeadSubSource: string;
  leadFieldMapJson?: string;
  dealFieldMapJson?: string;
};

export function zohoEnvironment(env: NodeJS.ProcessEnv = process.env): ZohoEnvironment {
  return readWithSchema(
    z.object({
      clientId: z.string().min(3),
      clientSecret: z.string().min(8),
      refreshToken: z.string().min(8),
      accountsUrl: zohoAccountsUrl,
      module: z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/),
      leadSource: z.string().min(1).max(120),
      paidLeadSource: z.string().min(1).max(120),
      paidLeadSubSource: z.string().min(1).max(120),
      leadFieldMapJson: z.string().optional(),
      dealFieldMapJson: z.string().optional(),
    }),
    {
      clientId: env.ZOHO_CLIENT_ID,
      clientSecret: env.ZOHO_CLIENT_SECRET,
      refreshToken: env.ZOHO_REFRESH_TOKEN,
      accountsUrl: env.ZOHO_ACCOUNTS_URL,
      module: env.ZOHO_CRM_MODULE || "Leads",
      leadSource: env.ZOHO_LEAD_SOURCE || "Website Contact Form",
      paidLeadSource: env.ZOHO_GOOGLE_ADS_LEAD_SOURCE || "Advertisement",
      paidLeadSubSource: env.ZOHO_GOOGLE_ADS_SUB_SOURCE || "Google Ads",
      leadFieldMapJson: env.ZOHO_LEADS_FIELD_MAP_JSON || undefined,
      dealFieldMapJson: env.ZOHO_DEALS_FIELD_MAP_JSON || undefined,
    },
    "Invalid Zoho integration configuration",
  );
}

export type GoogleDataManagerEnvironment = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  cloudProjectId: string;
  customerId: string;
  loginCustomerId?: string;
  mode: "dry-run" | "data-manager";
  liveEnabled: boolean;
};

export function googleDataManagerEnvironment(env: NodeJS.ProcessEnv = process.env): GoogleDataManagerEnvironment {
  const loginCustomerId = (env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").trim().replace(/-/g, "") || undefined;
  return readWithSchema(
    z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      refreshToken: z.string(),
      cloudProjectId: z.string(),
      customerId,
      loginCustomerId: customerId.optional(),
      mode: z.enum(["dry-run", "data-manager"]),
      liveEnabled: z.boolean(),
    }).superRefine((value, context) => {
      if (value.mode !== "data-manager" || !value.liveEnabled) return;
      for (const [key, candidate, minimum] of [
        ["GOOGLE_DATA_MANAGER_CLIENT_ID", value.clientId, 3],
        ["GOOGLE_DATA_MANAGER_CLIENT_SECRET", value.clientSecret, 8],
        ["GOOGLE_DATA_MANAGER_REFRESH_TOKEN", value.refreshToken, 8],
        ["GOOGLE_CLOUD_PROJECT_ID", value.cloudProjectId, 3],
      ] as const) {
        if (candidate.length < minimum) context.addIssue({ code: "custom", message: `missing ${key}` });
      }
    }),
    {
      clientId: env.GOOGLE_DATA_MANAGER_CLIENT_ID,
      clientSecret: env.GOOGLE_DATA_MANAGER_CLIENT_SECRET,
      refreshToken: env.GOOGLE_DATA_MANAGER_REFRESH_TOKEN,
      cloudProjectId: env.GOOGLE_CLOUD_PROJECT_ID,
      customerId: (env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, ""),
      loginCustomerId,
      mode: env.GOOGLE_CONVERSION_UPLOAD_MODE || "dry-run",
      liveEnabled: env.GOOGLE_CONVERSION_UPLOAD_ENABLED === "true",
    },
    "Invalid Google Data Manager configuration",
  );
}

export function webhookEnvironment(env: NodeJS.ProcessEnv = process.env) {
  return readWithSchema(
    z.object({
      secret: z.string().min(32, "must contain at least 32 characters"),
      allowedOrigin: httpsUrl,
    }),
    {
      secret: env.ZOHO_GOOGLE_WEBHOOK_SECRET,
      allowedOrigin: env.NEXT_PUBLIC_SITE_URL || "https://emitronix.ae",
    },
    "Invalid webhook configuration",
  );
}
