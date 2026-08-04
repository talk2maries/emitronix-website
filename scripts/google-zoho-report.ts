import { openGoogleZohoDatabase, type ConversionJobStatus } from "../lib/googleZoho/database";

function flag(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function dateFlag(name: string) {
  const value = flag(name);
  if (!value) return undefined;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) throw new Error(`${name} must be an ISO date or date-time.`);
  return parsed;
}

const database = openGoogleZohoDatabase();
try {
  const from = dateFlag("--from");
  const to = dateFlag("--to");
  const campaignId = flag("--campaign");
  const eventKey = flag("--action");
  const status = flag("--status") as ConversionJobStatus | undefined;
  const zohoRecordId = flag("--crm-record");
  const base = database.getIntegrationReport({ from, to, campaignId });
  const conversions = database.listConversionJobs({ from, to, campaignId, eventKey, status, zohoRecordId, limit: 500 });
  const report = {
    generatedAt: new Date().toISOString(),
    filters: { from: from ? new Date(from).toISOString() : null, to: to ? new Date(to).toISOString() : null, campaignId, eventKey, status, zohoRecordId },
    googleAdsLeads: base.googleAdsLeads,
    totalLeads: base.leads.total,
    leadsMissingClickId: base.googleAdsLeadsMissingClickId,
    qualifiedLeads: base.conversionsByEvent.qualified_lead || 0,
    conversionsSent: base.conversions.sent,
    conversionsConfirmed: base.conversions.confirmed,
    conversionsFailed: base.conversions.permanent_failure,
    duplicateUploadsPrevented: base.duplicateUploadsPrevented,
    retryScheduled: base.conversions.retry_scheduled,
    conversionValues: base.conversions.confirmedValueByCurrency,
    lastSuccessfulSync: base.lastConfirmedAt ? new Date(base.lastConfirmedAt).toISOString() : null,
    lastFailedSync: base.lastFailedAt ? new Date(base.lastFailedAt).toISOString() : null,
    databaseTotals: base,
    recordsLimit: 500,
    records: conversions.map((job) => ({
      id: job.id,
      crmRecordId: job.zohoRecordId,
      canonicalLeadId: job.sourceSubmissionId,
      googleTransactionId: job.transactionId,
      identityVersion: job.identityVersion,
      action: job.eventKey,
      status: job.status,
      value: job.conversionValue,
      currency: job.currencyCode,
      attempts: job.attemptCount,
      nextAttemptAt: job.status === "retry_scheduled" ? new Date(job.nextAttemptAt).toISOString() : null,
      googleRequestId: job.googleRequestId,
    })),
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} finally {
  database.close();
}
