import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ZOHO_ACCOUNTS_BASE_URL = process.env.ZOHO_ACCOUNTS_BASE_URL || "https://accounts.zoho.com";
const ZOHO_CRM_API_BASE_URL = process.env.ZOHO_CRM_API_BASE_URL || "https://www.zohoapis.com";
const ZOHO_CRM_API_VERSION = process.env.ZOHO_CRM_API_VERSION || "v2";
const ZOHO_SERVICE_INTEREST_FIELD_API_NAME = process.env.ZOHO_SERVICE_INTEREST_FIELD_API_NAME;
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

type EnquiryPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  mobile?: unknown;
  projectLocation?: unknown;
  scopeOfWork?: unknown;
  message?: unknown;
};

type NormalizedEnquiry = {
  name: string;
  company: string;
  email: string;
  mobile: string;
  projectLocation: string;
  scopeOfWork: string;
  message: string;
};

type TokenCache = {
  accessToken: string;
  apiDomain?: string;
  expiresAt: number;
};

type ZohoTokenResponse = {
  access_token?: string;
  api_domain?: string;
  expires_in?: number;
  error?: string;
};

type ZohoRecordResponse = {
  data?: Array<{
    code?: string;
    status?: string;
    message?: string;
    details?: {
      id?: string;
    };
  }>;
  code?: string;
  message?: string;
};

type LeadResult = {
  id?: string;
  duplicate?: boolean;
};

let tokenCache: TokenCache | null = null;
const submissionCache = new Map<string, { expiresAt: number; promise: Promise<LeadResult> }>();

function sanitizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizePayload(payload: EnquiryPayload) {
  const enquiry: NormalizedEnquiry = {
    name: sanitizeText(payload.name, 120),
    company: sanitizeText(payload.company, 255),
    email: sanitizeText(payload.email, 255).toLowerCase(),
    mobile: sanitizeText(payload.mobile ?? payload.phone, 30),
    projectLocation: sanitizeText(payload.projectLocation, 255),
    scopeOfWork: sanitizeText(payload.scopeOfWork ?? payload.service, 255),
    message: sanitizeText(payload.message, 32000),
  };

  const missingFields = [
    ["name", enquiry.name],
    ["email", enquiry.email],
    ["mobile", enquiry.mobile],
    ["projectLocation", enquiry.projectLocation],
    ["scopeOfWork", enquiry.scopeOfWork],
    ["message", enquiry.message],
  ]
    .filter(([, value]) => !value)
    .map(([field]) => field);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email);

  if (missingFields.length > 0 || !emailIsValid) {
    return {
      enquiry,
      error: {
        status: 400,
        code: "INVALID_ENQUIRY",
        missingFields,
        invalidEmail: Boolean(enquiry.email && !emailIsValid),
      },
    };
  }

  return { enquiry };
}

function splitName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { firstName: "", lastName: fullName };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

function getSubmissionFingerprint(enquiry: NormalizedEnquiry) {
  return createHash("sha256")
    .update(JSON.stringify({
      name: enquiry.name.toLowerCase(),
      company: enquiry.company.toLowerCase(),
      email: enquiry.email.toLowerCase(),
      mobile: enquiry.mobile,
      projectLocation: enquiry.projectLocation.toLowerCase(),
      scopeOfWork: enquiry.scopeOfWork.toLowerCase(),
      message: enquiry.message,
    }))
    .digest("hex");
}

function cleanSubmissionCache(now = Date.now()) {
  for (const [fingerprint, entry] of submissionCache.entries()) {
    if (entry.expiresAt <= now) {
      submissionCache.delete(fingerprint);
    }
  }
}

function hasZohoConfig() {
  return Boolean(
    process.env.ZOHO_CLIENT_ID &&
      process.env.ZOHO_CLIENT_SECRET &&
      process.env.ZOHO_REFRESH_TOKEN,
  );
}

async function getZohoAccessToken(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && tokenCache && tokenCache.expiresAt > now + TOKEN_EXPIRY_BUFFER_MS) {
    return tokenCache;
  }

  if (!hasZohoConfig()) {
    throw new Error("ZOHO_CONFIG_MISSING");
  }

  const body = new URLSearchParams({
    client_id: process.env.ZOHO_CLIENT_ID || "",
    client_secret: process.env.ZOHO_CLIENT_SECRET || "",
    refresh_token: process.env.ZOHO_REFRESH_TOKEN || "",
    grant_type: "refresh_token",
  });

  const response = await fetch(`${ZOHO_ACCOUNTS_BASE_URL}/oauth/v2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as ZohoTokenResponse;

  if (!response.ok || !data.access_token) {
    console.error("Zoho token refresh failed", {
      status: response.status,
      code: data.error || "UNKNOWN_TOKEN_ERROR",
    });
    throw new Error("ZOHO_TOKEN_REFRESH_FAILED");
  }

  tokenCache = {
    accessToken: data.access_token,
    apiDomain: data.api_domain,
    expiresAt: now + Math.max(0, (data.expires_in || 3600) * 1000),
  };

  return tokenCache;
}

function buildZohoLead(enquiry: NormalizedEnquiry) {
  const { firstName, lastName } = splitName(enquiry.name);
  const description = [
    `Scope of work: ${enquiry.scopeOfWork}`,
    `Project location: ${enquiry.projectLocation}`,
    `Mobile: ${enquiry.mobile}`,
    enquiry.company ? `Company: ${enquiry.company}` : "",
    "",
    "Message:",
    enquiry.message,
  ]
    .filter(Boolean)
    .join("\n");

  const lead: Record<string, string> = {
    Last_Name: lastName,
    Company: enquiry.company || "Individual Enquiry",
    Email: enquiry.email,
    Lead_Source: enquiry.scopeOfWork,
    Description: description,
  };

  if (firstName) {
    lead.First_Name = firstName;
  }

  if (enquiry.mobile) {
    lead.Phone = enquiry.mobile;
  }

  if (ZOHO_SERVICE_INTEREST_FIELD_API_NAME) {
    lead[ZOHO_SERVICE_INTEREST_FIELD_API_NAME] = enquiry.scopeOfWork;
  }

  return lead;
}

function extractZohoRecordError(response: ZohoRecordResponse) {
  const firstRecord = response.data?.[0];
  return {
    code: firstRecord?.code || response.code || "UNKNOWN_ZOHO_ERROR",
    status: firstRecord?.status,
    message: firstRecord?.message || response.message,
  };
}

async function createZohoLead(enquiry: NormalizedEnquiry, forceTokenRefresh = false): Promise<LeadResult> {
  const token = await getZohoAccessToken(forceTokenRefresh);
  const apiBaseUrl = token.apiDomain || ZOHO_CRM_API_BASE_URL;
  const response = await fetch(`${apiBaseUrl}/crm/${ZOHO_CRM_API_VERSION}/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [buildZohoLead(enquiry)],
      trigger: ["workflow"],
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as ZohoRecordResponse;
  const firstRecord = data.data?.[0];

  if (response.ok && firstRecord?.code === "SUCCESS" && firstRecord.status === "success") {
    return { id: firstRecord.details?.id };
  }

  const zohoError = extractZohoRecordError(data);
  if (!forceTokenRefresh && (response.status === 401 || zohoError.code === "INVALID_TOKEN" || zohoError.code === "INVALID_OAUTHTOKEN")) {
    tokenCache = null;
    return createZohoLead(enquiry, true);
  }

  console.error("Zoho lead creation failed", {
    status: response.status,
    code: zohoError.code,
    zohoStatus: zohoError.status,
    message: zohoError.message,
  });
  throw new Error("ZOHO_LEAD_CREATE_FAILED");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => null)) as EnquiryPayload | null;
    if (!payload) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { enquiry, error } = normalizePayload(payload);
    if (error) {
      return NextResponse.json({ ok: false }, { status: error.status });
    }

    if (!hasZohoConfig()) {
      console.error("Zoho lead submission unavailable: missing server environment variables");
      return NextResponse.json({ ok: false }, { status: 503 });
    }

    const now = Date.now();
    cleanSubmissionCache(now);

    const fingerprint = getSubmissionFingerprint(enquiry);
    const existingSubmission = submissionCache.get(fingerprint);
    if (existingSubmission && existingSubmission.expiresAt > now) {
      try {
        await existingSubmission.promise;
        return NextResponse.json({ ok: true, duplicate: true });
      } catch (error) {
        submissionCache.delete(fingerprint);
        throw error;
      }
    }

    const promise = createZohoLead(enquiry);
    submissionCache.set(fingerprint, {
      expiresAt: now + DUPLICATE_WINDOW_MS,
      promise,
    });

    try {
      const result = await promise;
      return NextResponse.json({ ok: true, id: result.id });
    } catch (error) {
      submissionCache.delete(fingerprint);
      throw error;
    }
  } catch (error) {
    console.error("Enquiry submission failed", {
      code: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
