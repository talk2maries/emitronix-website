import { openGoogleZohoDatabase } from "../lib/googleZoho/database";

const applyRequested = process.argv.includes("--apply");
const apply = applyRequested && process.env.GOOGLE_ZOHO_RETENTION_APPLY === "true";
if (applyRequested && !apply) {
  throw new Error("Retention changes require both --apply and GOOGLE_ZOHO_RETENTION_APPLY=true.");
}
const auditRetentionDays = Number(process.env.GOOGLE_ZOHO_AUDIT_RETENTION_DAYS || 400);
if (!Number.isInteger(auditRetentionDays) || auditRetentionDays < 30 || auditRetentionDays > 3650) {
  throw new Error("GOOGLE_ZOHO_AUDIT_RETENTION_DAYS must be an integer between 30 and 3650.");
}

const database = openGoogleZohoDatabase();
try {
  const result = database.applyRetention({ apply, auditRetentionDays });
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: true,
        mode: apply ? "applied" : "preview",
        ...result,
        note: "Expired attribution/consent evidence is redacted; conversion idempotency jobs are never auto-deleted.",
      },
      null,
      2,
    )}\n`,
  );
} finally {
  database.close();
}
