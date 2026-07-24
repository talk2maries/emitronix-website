import { randomUUID } from "crypto";
import { chmod, mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { createZohoLead, type WebsiteLead } from "@/lib/zoho";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_CV_BYTES = 8 * 1024 * 1024;
const MAX_REQUEST_BYTES = 9 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const STORAGE_DIR = process.env.CAREERS_STORE_DIR || path.join(process.cwd(), "storage", "careers");

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function text(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

function hasExpectedSignature(extension: string, bytes: Buffer) {
  if (extension === ".pdf") {
    return bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  }

  if (extension === ".docx") {
    return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
  }

  if (extension === ".doc") {
    const compoundFileHeader = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
    return compoundFileHeader.every((byte, index) => bytes[index] === byte);
  }

  return false;
}

export async function POST(request: NextRequest) {
  const contentLengthHeader = request.headers.get("content-length");

  if (!contentLengthHeader || !/^[1-9]\d*$/.test(contentLengthHeader)) {
    return NextResponse.json(
      { ok: false, message: "A valid Content-Length header is required." },
      { status: 411 },
    );
  }

  const contentLength = Number(contentLengthHeader);

  if (!Number.isSafeInteger(contentLength)) {
    return NextResponse.json(
      { ok: false, message: "A valid Content-Length header is required." },
      { status: 411 },
    );
  }

  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, message: "The application is too large. Please upload a smaller CV." },
      { status: 413 },
    );
  }

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ ok: false, message: "Cross-site submissions are not accepted." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) {
    return badRequest("Invalid application format.");
  }

  const ip = clientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many applications. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return badRequest("Invalid application format.");
  }

  // Honeypot: silently accept bot submissions without processing.
  if (text(formData.get("website"), 120)) {
    return NextResponse.json({ ok: true });
  }

  const application = {
    fullName: text(formData.get("fullName"), 120),
    email: text(formData.get("email"), 180).toLowerCase(),
    mobile: text(formData.get("mobile"), 30),
    position: text(formData.get("position"), 120),
    experience: text(formData.get("experience"), 120),
    location: text(formData.get("location"), 180),
    expectedSalary: text(formData.get("expectedSalary"), 120),
    noticePeriod: text(formData.get("noticePeriod"), 120),
    message: text(formData.get("message"), 3000),
    language: text(formData.get("language"), 5) || "en",
    pageUrl: text(formData.get("pageUrl"), 300),
    consent: formData.get("consent") === "on",
  };

  if (!application.fullName) return badRequest("Please enter your full name.");
  if (!application.email || !isValidEmail(application.email)) return badRequest("Please enter a valid email address.");
  if (!application.mobile) return badRequest("Please enter your mobile number.");
  if (!application.position) return badRequest("Please select a position.");
  if (!application.message) return badRequest("Please add a short message or cover letter.");
  if (!application.consent) return badRequest("Please confirm consent before submitting your application.");

  const resume = formData.get("resume");

  if (!(resume instanceof File) || !resume.name) {
    return badRequest("Please upload your CV.");
  }

  const extension = path.extname(resume.name).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return badRequest("Please upload your CV in PDF, DOC, or DOCX format.");
  }

  if (resume.size > MAX_CV_BYTES) {
    return badRequest("Please upload a CV smaller than 8 MB.");
  }

  const cvBuffer = Buffer.from(await resume.arrayBuffer());
  if (!hasExpectedSignature(extension, cvBuffer)) {
    return badRequest("The CV file content does not match the selected PDF, DOC, or DOCX format.");
  }

  const id = `${new Date().toISOString().replace(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}`;
  const cvFileName = `${id}${extension}`;

  try {
    await mkdir(STORAGE_DIR, { recursive: true, mode: 0o700 });
    await chmod(STORAGE_DIR, 0o700);
    await writeFile(path.join(STORAGE_DIR, cvFileName), cvBuffer, { mode: 0o600 });
    await writeFile(
      path.join(STORAGE_DIR, `${id}.json`),
      JSON.stringify(
        {
          ...application,
          cvFile: cvFileName,
          cvOriginalName: resume.name,
          submittedAt: new Date().toISOString(),
          ip,
          userAgent: request.headers.get("user-agent")?.slice(0, 300) || "",
        },
        null,
        2,
      ),
      { encoding: "utf8", mode: 0o600 },
    );
  } catch (error) {
    console.error("Career application storage failed", { id, error: error instanceof Error ? error.message : "unknown" });
    return NextResponse.json(
      { ok: false, message: "We could not submit the application right now. Please try again or email Emitronix directly." },
      { status: 500 },
    );
  }

  // Push a CRM notification lead so the team is alerted through the existing
  // Zoho channel. Storage above is the source of truth; CRM failure is logged
  // but does not fail the request.
  const lead: WebsiteLead = {
    name: application.fullName,
    company: "",
    email: application.email,
    phone: application.mobile,
    service: `Career Application: ${application.position}`,
    projectLocation: application.location,
    message: [
      `Career application (${application.position})`,
      `Experience: ${application.experience}`,
      `Expected salary: ${application.expectedSalary}`,
      `Notice period: ${application.noticePeriod}`,
      `CV stored as: ${cvFileName}`,
      "",
      application.message,
    ].join("\n"),
    pageUrl: application.pageUrl,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) || "",
    consent: true,
  };

  try {
    await createZohoLead(lead);
  } catch (error) {
    console.error("Career application CRM sync failed", {
      id,
      error: error instanceof Error ? error.message : "unknown",
    });
  }

  return NextResponse.json({ ok: true });
}
