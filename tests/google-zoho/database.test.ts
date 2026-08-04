import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, test } from "node:test";
import Database from "better-sqlite3";

import {
  GoogleZohoDatabase,
  IdempotencyConflictError,
  LATEST_GOOGLE_ZOHO_SCHEMA_VERSION,
  LeaseConflictError,
  StateTransitionError,
} from "../../lib/googleZoho/database";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

const temporaryDirectories: string[] = [];

function databaseHarness(start = Date.parse("2026-08-04T12:00:00.000Z")) {
  const directory = mkdtempSync(path.join(tmpdir(), "emitronix-google-zoho-test-"));
  temporaryDirectories.push(directory);
  let now = start;
  let sequence = 0;
  const database = new GoogleZohoDatabase({
    databasePath: path.join(directory, "ledger.sqlite"),
    clock: () => now,
    idFactory: () => `test-id-${++sequence}`,
  });
  return {
    database,
    now: () => now,
    advance: (milliseconds: number) => {
      now += milliseconds;
      return now;
    },
  };
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("SQLite lead idempotency and leases", () => {
  test("returns in-progress/completed outcomes for the same request and rejects key reuse", () => {
    const { database } = databaseHarness();
    try {
      const first = database.claimLeadSubmission({
        idempotencyKey: "lead-event-123",
        requestHash: hash("same payload"),
        source: "google_ads",
        campaignId: "1001001001",
      });
      assert.equal(first.outcome, "claimed");
      assert.equal(first.recovered, false);
      assert.equal(first.submission.attemptCount, 1);
      assert.ok(first.submission.claimToken);

      const duplicateWhileActive = database.claimLeadSubmission({
        idempotencyKey: "lead-event-123",
        requestHash: hash("same payload"),
      });
      assert.equal(duplicateWhileActive.outcome, "in_progress");
      assert.equal(duplicateWhileActive.submission.id, first.submission.id);

      const completed = database.completeLeadSubmission({
        id: first.submission.id,
        claimToken: first.submission.claimToken || "",
        zohoRecordId: "1234567890123456789",
      });
      assert.equal(completed.status, "completed");
      assert.equal(completed.zohoRecordId, "1234567890123456789");

      const duplicateAfterCompletion = database.claimLeadSubmission({
        idempotencyKey: "lead-event-123",
        requestHash: hash("same payload"),
      });
      assert.equal(duplicateAfterCompletion.outcome, "completed");
      assert.throws(
        () =>
          database.claimLeadSubmission({
            idempotencyKey: "lead-event-123",
            requestHash: hash("different payload"),
          }),
        IdempotencyConflictError,
      );
    } finally {
      database.close();
    }
  });

  test("recovers an expired lead lease and rejects the stale claim token", () => {
    const { database, advance } = databaseHarness();
    try {
      const first = database.claimLeadSubmission({
        idempotencyKey: "lead-event-recover",
        requestHash: hash("payload"),
        leaseMs: 1_000,
      });
      assert.equal(first.outcome, "claimed");
      advance(1_001);
      const recovered = database.claimLeadSubmission({
        idempotencyKey: "lead-event-recover",
        requestHash: hash("payload"),
        leaseMs: 1_000,
      });
      assert.equal(recovered.outcome, "claimed");
      assert.equal(recovered.recovered, true);
      assert.equal(recovered.submission.attemptCount, 2);
      assert.notEqual(recovered.submission.claimToken, first.submission.claimToken);
      assert.throws(
        () =>
          database.completeLeadSubmission({
            id: first.submission.id,
            claimToken: first.submission.claimToken || "",
            zohoRecordId: "1234567890123456789",
          }),
        LeaseConflictError,
      );
      const failed = database.failLeadSubmission({
        id: recovered.submission.id,
        claimToken: recovered.submission.claimToken || "",
        errorCode: "ZOHO_TEMPORARY",
        errorMessage: "refresh_token=must-not-be-persisted",
      });
      assert.equal(failed.status, "failed");
      assert.doesNotMatch(failed.lastErrorMessage || "", /must-not-be-persisted/);
    } finally {
      database.close();
    }
  });

  test("persists consent and attribution evidence without storing raw click identifiers", () => {
    const { database } = databaseHarness();
    try {
      const consentUpdatedAt = Date.parse("2026-08-04T11:55:00.000Z");
      const attributionExpiresAt = Date.parse("2026-11-02T12:00:00.000Z");
      const attributionHash = hash("sanitized attribution snapshot");
      const result = database.claimLeadSubmission({
        idempotencyKey: "lead-consent-evidence-001",
        requestHash: hash("lead payload"),
        source: "google_ads",
        campaignId: "1001001001",
        attributionHash,
        attributionExpiresAt,
        advertisingConsent: true,
        consentVersion: "cookie-consent-v3",
        consentUpdatedAt,
        clickIdPresent: true,
      });
      assert.equal(result.outcome, "claimed");
      assert.deepEqual(
        {
          attributionHash: result.submission.attributionHash,
          attributionExpiresAt: result.submission.attributionExpiresAt,
          advertisingConsent: result.submission.advertisingConsent,
          consentVersion: result.submission.consentVersion,
          consentUpdatedAt: result.submission.consentUpdatedAt,
          clickIdPresent: result.submission.clickIdPresent,
        },
        {
          attributionHash,
          attributionExpiresAt,
          advertisingConsent: true,
          consentVersion: "cookie-consent-v3",
          consentUpdatedAt,
          clickIdPresent: true,
        },
      );
      assert.deepEqual(database.getLeadSubmission(result.submission.id), result.submission);
    } finally {
      database.close();
    }
  });
});

describe("SQLite schema and durable rate limiting", () => {
  test("migrates a new database through schema v5", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "emitronix-google-zoho-migration-"));
    temporaryDirectories.push(directory);
    const database = new GoogleZohoDatabase({
      databasePath: path.join(directory, "ledger.sqlite"),
      autoMigrate: false,
      clock: () => Date.parse("2026-08-04T12:00:00.000Z"),
      idFactory: () => "migration-test-id",
    });
    try {
      const result = database.migrate();
      assert.equal(LATEST_GOOGLE_ZOHO_SCHEMA_VERSION, 5);
      assert.equal(result.previousVersion, 0);
      assert.equal(result.currentVersion, 5);
      assert.deepEqual(result.applied.map((migration) => migration.version), [1, 2, 3, 4, 5]);
      assert.equal(database.currentSchemaVersion(), 5);
    } finally {
      database.close();
    }
  });

  test("migrates populated v4 jobs as immutable legacy identities", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "emitronix-google-zoho-v4-migration-"));
    temporaryDirectories.push(directory);
    const databasePath = path.join(directory, "ledger.sqlite");
    const raw = new Database(databasePath);
    raw.exec(`
      CREATE TABLE schema_migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at INTEGER NOT NULL
      );
      INSERT INTO schema_migrations (version, name, applied_at) VALUES
        (1, 'initial_google_zoho_ledger', 1),
        (2, 'lead_attribution_consent_evidence', 2),
        (3, 'durable_rate_limit_buckets', 3),
        (4, 'attribution_evidence_expiry', 4);

      CREATE TABLE lead_submissions (id TEXT PRIMARY KEY);
      INSERT INTO lead_submissions (id) VALUES ('legacy-source-id');

      CREATE TABLE conversion_jobs (
        id TEXT PRIMARY KEY,
        zoho_record_id TEXT NOT NULL,
        source_submission_id TEXT REFERENCES lead_submissions(id) ON DELETE SET NULL,
        event_key TEXT NOT NULL,
        transaction_id TEXT NOT NULL UNIQUE,
        conversion_action TEXT NOT NULL,
        conversion_value REAL NOT NULL CHECK (conversion_value >= 0),
        currency_code TEXT NOT NULL CHECK (length(currency_code) = 3),
        conversion_occurred_at INTEGER NOT NULL,
        status TEXT NOT NULL,
        attempt_count INTEGER NOT NULL DEFAULT 0,
        next_attempt_at INTEGER NOT NULL,
        leased_at INTEGER,
        lease_until INTEGER,
        lease_token TEXT,
        request_hash TEXT NOT NULL,
        last_error_code TEXT,
        last_error_message TEXT,
        google_request_id TEXT,
        campaign_id TEXT,
        click_id_type TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        sent_at INTEGER,
        confirmed_at INTEGER,
        dry_run_at INTEGER,
        UNIQUE (zoho_record_id, event_key)
      );
      INSERT INTO conversion_jobs (
        id, zoho_record_id, source_submission_id, event_key, transaction_id,
        conversion_action, conversion_value, currency_code, conversion_occurred_at,
        status, attempt_count, next_attempt_at, request_hash, google_request_id,
        campaign_id, click_id_type, created_at, updated_at, sent_at, confirmed_at
      ) VALUES (
        'legacy-job-id', '1234567890123456789', 'legacy-source-id', 'qualified_lead',
        'zoho:1234567890123456789:qualified_lead',
        'customers/9523565801/conversionActions/101', 250, 'AED', 1785843000000,
        'confirmed', 2, 1785843000000, '${hash("legacy-request")}', 'legacy-request-id',
        '1001001001', 'gclid', 1785843000000, 1785843000000, 1785843000000, 1785843000000
      );
    `);
    raw.close();

    const database = new GoogleZohoDatabase({ databasePath, autoMigrate: false });
    try {
      const migration = database.migrate();
      assert.deepEqual(migration.applied.map((item) => item.version), [5]);
      const [job] = database.listConversionJobs();
      assert.equal(job.id, "legacy-job-id");
      assert.equal(job.identityVersion, 1);
      assert.equal(job.transactionId, "zoho:1234567890123456789:qualified_lead");
      assert.equal(job.status, "confirmed");
      assert.equal(job.googleRequestId, "legacy-request-id");
      const replay = database.getOrCreateConversionJob({
        zohoRecordId: "1234567890123456789",
        sourceSubmissionId: "legacy-source-id",
        eventKey: "qualified_lead",
        transactionId: "zoho:1234567890123456789:qualified_lead",
        conversionAction: "customers/9523565801/conversionActions/101",
        conversionValue: 250,
        currencyCode: "AED",
        conversionOccurredAt: 1785843000000,
        requestHash: hash("legacy-request"),
        campaignId: "1001001001",
        clickIdType: "gclid",
      });
      assert.equal(replay.created, false);
      assert.equal(replay.payloadMatches, true);
      assert.equal(replay.job.identityVersion, 1);
      assert.equal(replay.job.transactionId, "zoho:1234567890123456789:qualified_lead");
      assert.equal(database.currentSchemaVersion(), 5);
    } finally {
      database.close();
    }
  });

  test("enforces a durable fixed-window request limit and resets in the next window", () => {
    const { database, now, advance } = databaseHarness();
    try {
      const first = database.consumeRateLimit({ key: "ip-hash-00000001", windowMs: 60_000, limit: 2 });
      const second = database.consumeRateLimit({ key: "ip-hash-00000001", windowMs: 60_000, limit: 2 });
      const blocked = database.consumeRateLimit({ key: "ip-hash-00000001", windowMs: 60_000, limit: 2 });
      assert.deepEqual(first, { allowed: true, count: 1, limit: 2, resetAt: now() + 60_000 });
      assert.equal(second.allowed, true);
      assert.equal(second.count, 2);
      assert.equal(blocked.allowed, false);
      assert.equal(blocked.count, 3);

      advance(60_001);
      const reset = database.consumeRateLimit({ key: "ip-hash-00000001", windowMs: 60_000, limit: 2 });
      assert.equal(reset.allowed, true);
      assert.equal(reset.count, 1);
    } finally {
      database.close();
    }
  });
});

describe("SQLite webhook replay protection", () => {
  test("atomically rejects a repeated nonce and allows reuse only after TTL cleanup", () => {
    const { database, advance } = databaseHarness();
    try {
      const first = database.consumeWebhookNonce({
        nonce: "nonce-0000000000001",
        requestHash: hash("request A"),
        ttlMs: 300_000,
      });
      assert.equal(first.accepted, true);

      const replay = database.consumeWebhookNonce({
        nonce: "nonce-0000000000001",
        requestHash: hash("request A"),
        ttlMs: 300_000,
      });
      assert.deepEqual(replay, {
        accepted: false,
        reason: "replay",
        receivedAt: Date.parse("2026-08-04T12:00:00.000Z"),
        requestHashMatches: true,
      });

      const changedReplay = database.consumeWebhookNonce({
        nonce: "nonce-0000000000001",
        requestHash: hash("request B"),
        ttlMs: 300_000,
      });
      assert.equal(changedReplay.accepted, false);
      if (!changedReplay.accepted) assert.equal(changedReplay.requestHashMatches, false);

      advance(300_001);
      const afterExpiry = database.consumeWebhookNonce({
        nonce: "nonce-0000000000001",
        requestHash: hash("request C"),
        ttlMs: 300_000,
      });
      assert.equal(afterExpiry.accepted, true);
    } finally {
      database.close();
    }
  });
});

function createConversion(database: GoogleZohoDatabase, eventKey = "qualified_lead", request = "conversion-a") {
  const zohoRecordId = eventKey === "qualified_lead" ? "1234567890123456789" : "9876543210987654321";
  const source = database.claimLeadSubmission({
    idempotencyKey: `conversion-source:${zohoRecordId}`,
    requestHash: hash(`conversion-source:${zohoRecordId}`),
    source: "google_ads",
  });
  const sourceSubmission = source.outcome === "claimed"
    ? database.completeLeadSubmission({
        id: source.submission.id,
        claimToken: source.submission.claimToken || "",
        zohoRecordId,
      })
    : source.submission;
  return database.getOrCreateConversionJob({
    zohoRecordId,
    sourceSubmissionId: sourceSubmission.id,
    eventKey,
    transactionId: sourceSubmission.id,
    conversionAction: `customers/9523565801/conversionActions/${eventKey === "qualified_lead" ? "101" : "202"}`,
    conversionValue: eventKey === "qualified_lead" ? 250 : 500,
    currencyCode: "AED",
    conversionOccurredAt: Date.parse("2026-08-04T11:30:00.000Z"),
    requestHash: hash(request),
    campaignId: "1001001001",
    clickIdType: "gclid",
  });
}

describe("SQLite conversion idempotency, retry, and terminal states", () => {
  test("deduplicates by Zoho record/event and surfaces payload mismatch", () => {
    const { database } = databaseHarness();
    try {
      const first = createConversion(database);
      assert.equal(first.created, true);
      assert.equal(first.payloadMatches, true);
      assert.equal(first.job.status, "pending");
      assert.equal(first.job.identityVersion, 2);
      assert.equal(first.job.transactionId, first.job.sourceSubmissionId);

      const same = createConversion(database);
      assert.equal(same.created, false);
      assert.equal(same.payloadMatches, true);
      assert.equal(same.job.id, first.job.id);

      const changed = createConversion(database, "qualified_lead", "changed payload");
      assert.equal(changed.created, false);
      assert.equal(changed.payloadMatches, false);
      assert.equal(changed.job.id, first.job.id);
    } finally {
      database.close();
    }
  });

  test("reuses one canonical lead ID across distinct conversion actions and rejects divergent IDs", () => {
    const { database } = databaseHarness();
    try {
      const source = database.claimLeadSubmission({
        idempotencyKey: "canonical-funnel-source",
        requestHash: hash("canonical-funnel-source"),
        source: "google_ads",
      });
      assert.equal(source.outcome, "claimed");
      if (source.outcome !== "claimed") return;
      const completed = database.completeLeadSubmission({
        id: source.submission.id,
        claimToken: source.submission.claimToken || "",
        zohoRecordId: "1234567890123456789",
      });
      const base = {
        zohoRecordId: "1234567890123456789",
        sourceSubmissionId: completed.id,
        transactionId: completed.id,
        conversionValue: 250,
        currencyCode: "AED",
        conversionOccurredAt: Date.parse("2026-08-04T11:30:00.000Z"),
        campaignId: "1001001001",
        clickIdType: "gclid" as const,
      };
      const qualified = database.getOrCreateConversionJob({
        ...base,
        eventKey: "qualified_lead",
        conversionAction: "customers/9523565801/conversionActions/101",
        requestHash: hash("qualified"),
      });
      const quotation = database.getOrCreateConversionJob({
        ...base,
        eventKey: "quotation_submitted",
        conversionAction: "customers/9523565801/conversionActions/303",
        requestHash: hash("quotation"),
      });
      assert.equal(qualified.created, true);
      assert.equal(quotation.created, true);
      assert.equal(qualified.job.transactionId, completed.id);
      assert.equal(quotation.job.transactionId, completed.id);
      assert.throws(
        () => database.getOrCreateConversionJob({
          ...base,
          eventKey: "meeting_booked",
          transactionId: "different-lead-id",
          conversionAction: "customers/9523565801/conversionActions/202",
          requestHash: hash("meeting"),
        }),
        /canonical lead ID/,
      );
    } finally {
      database.close();
    }
  });

  test("leases, schedules a retry, re-leases, marks sent, and confirms exactly once", () => {
    const { database, advance, now } = databaseHarness();
    try {
      const created = createConversion(database);
      const firstLease = database.leaseDueConversionJobs({ limit: 10, leaseMs: 1_000 });
      assert.equal(firstLease.length, 1);
      assert.equal(firstLease[0].id, created.job.id);
      assert.equal(firstLease[0].status, "leased");
      assert.equal(firstLease[0].attemptCount, 1);
      assert.throws(
        () => database.markConversionJobConfirmed({ id: firstLease[0].id }),
        StateTransitionError,
      );

      const retry = database.markConversionJobRetry({
        id: firstLease[0].id,
        leaseToken: firstLease[0].leaseToken || "",
        nextAttemptAt: now() + 10_000,
        errorCode: "UNAVAILABLE",
        errorMessage: "temporary 503",
      });
      assert.equal(retry.status, "retry_scheduled");
      assert.equal(database.leaseDueConversionJobs().length, 0);

      advance(10_001);
      const secondLease = database.leaseDueConversionJobs({ leaseMs: 1_000 });
      assert.equal(secondLease.length, 1);
      assert.equal(secondLease[0].attemptCount, 2);
      assert.notEqual(secondLease[0].leaseToken, firstLease[0].leaseToken);
      assert.throws(
        () =>
          database.markConversionJobSent({
            id: firstLease[0].id,
            leaseToken: firstLease[0].leaseToken || "",
            googleRequestId: "request-stale-token",
          }),
        LeaseConflictError,
      );

      const sent = database.markConversionJobSent({
        id: secondLease[0].id,
        leaseToken: secondLease[0].leaseToken || "",
        googleRequestId: "request-12345678",
      });
      assert.equal(sent.status, "sent");
      assert.equal(sent.googleRequestId, "request-12345678");
      const confirmed = database.markConversionJobConfirmed({
        id: sent.id,
        googleRequestId: "request-12345678",
      });
      assert.equal(confirmed.status, "confirmed");
      assert.equal(database.markConversionJobConfirmed({ id: sent.id, googleRequestId: "request-12345678" }).status, "confirmed");
      assert.throws(
        () => database.markConversionJobConfirmed({ id: sent.id, googleRequestId: "request-different" }),
        IdempotencyConflictError,
      );
    } finally {
      database.close();
    }
  });

  test("records dry-run and permanent failure terminal outcomes", () => {
    const { database } = databaseHarness();
    try {
      const dryCreated = createConversion(database, "qualified_lead");
      const dryLease = database.leaseDueConversionJobs()[0];
      const dry = database.markConversionJobDryRun({
        id: dryCreated.job.id,
        leaseToken: dryLease.leaseToken || "",
        requestSummary: "redacted payload",
      });
      assert.equal(dry.status, "dry_run");

      const failedCreated = createConversion(database, "meeting_booked", "conversion-b");
      const failedLease = database.leaseDueConversionJobs()[0];
      assert.equal(failedLease.id, failedCreated.job.id);
      const failed = database.markConversionJobPermanentFailure({
        id: failedLease.id,
        leaseToken: failedLease.leaseToken || "",
        errorCode: "INVALID_ARGUMENT",
        errorMessage: "Google rejected the conversion",
      });
      assert.equal(failed.status, "permanent_failure");
      assert.equal(failed.lastErrorCode, "INVALID_ARGUMENT");
      assert.equal(database.leaseDueConversionJobs().length, 0);
    } finally {
      database.close();
    }
  });

  test("recovers an expired conversion lease", () => {
    const { database, advance } = databaseHarness();
    try {
      createConversion(database);
      const first = database.leaseDueConversionJobs({ leaseMs: 1_000 })[0];
      advance(1_001);
      const recovered = database.leaseDueConversionJobs({ leaseMs: 1_000 })[0];
      assert.equal(recovered.id, first.id);
      assert.equal(recovered.attemptCount, 2);
      assert.notEqual(recovered.leaseToken, first.leaseToken);
    } finally {
      database.close();
    }
  });
});

describe("SQLite privacy retention", () => {
  test("previews and applies retention while preserving conversion jobs", () => {
    const { database, now, advance } = databaseHarness();
    try {
      const originalNow = now();
      const lead = database.claimLeadSubmission({
        idempotencyKey: "lead-retention-evidence-001",
        requestHash: hash("retention lead payload"),
        source: "google_ads",
        campaignId: "1001001001",
        attributionHash: hash("attribution evidence to expire"),
        attributionExpiresAt: originalNow + 86_400_000,
        advertisingConsent: true,
        consentVersion: "cookie-consent-v3",
        consentUpdatedAt: originalNow,
        clickIdPresent: true,
      });
      assert.equal(lead.outcome, "claimed");

      database.consumeWebhookNonce({
        nonce: "retention-nonce-000001",
        requestHash: hash("old webhook"),
        ttlMs: 300_000,
      });
      database.consumeRateLimit({ key: "retention-ip-hash-0001", windowMs: 60_000, limit: 5 });
      database.appendAuditEvent({
        eventType: "retention_test_event",
        outcome: "info",
        details: { category: "old" },
      });
      const conversion = createConversion(database, "qualified_lead", "retained conversion");

      advance(31 * 86_400_000);

      const preview = database.applyRetention({ apply: false, auditRetentionDays: 30 });
      assert.deepEqual(preview, {
        applied: false,
        evidenceRows: 1,
        webhookReceipts: 1,
        rateLimitBuckets: 1,
        auditEvents: 1,
        conversionJobsDeleted: 0,
      });
      const beforeApply = database.getLeadSubmission(lead.submission.id);
      assert.equal(beforeApply?.advertisingConsent, true, "preview must not redact evidence");
      assert.equal(beforeApply?.attributionHash, hash("attribution evidence to expire"));
      assert.equal(database.listWebhookReceipts().length, 1);
      assert.equal(database.listAuditEvents().length, 1);
      assert.equal(database.listConversionJobs().length, 1);

      const applied = database.applyRetention({ apply: true, auditRetentionDays: 30 });
      assert.deepEqual(applied, {
        applied: true,
        evidenceRows: 1,
        webhookReceipts: 1,
        rateLimitBuckets: 1,
        auditEvents: 1,
        conversionJobsDeleted: 0,
      });

      const redacted = database.getLeadSubmission(lead.submission.id);
      assert.ok(redacted);
      assert.equal(redacted.attributionHash, null);
      assert.equal(redacted.advertisingConsent, false);
      assert.equal(redacted.consentVersion, null);
      assert.equal(redacted.consentUpdatedAt, null);
      assert.equal(redacted.clickIdPresent, false);
      assert.equal(
        redacted.attributionExpiresAt,
        originalNow + 86_400_000,
        "retention keeps the non-PII expiry timestamp as policy evidence",
      );
      assert.equal(database.listWebhookReceipts().length, 0);
      assert.equal(database.listAuditEvents().length, 0);
      assert.deepEqual(database.applyRetention({ apply: false, auditRetentionDays: 30 }), {
        applied: false,
        evidenceRows: 0,
        webhookReceipts: 0,
        rateLimitBuckets: 0,
        auditEvents: 0,
        conversionJobsDeleted: 0,
      });

      const retainedConversions = database.listConversionJobs();
      assert.equal(retainedConversions.length, 1);
      assert.equal(retainedConversions[0].id, conversion.job.id);
      assert.equal(retainedConversions[0].status, "pending");
    } finally {
      database.close();
    }
  });
});
