import { chmodSync, closeSync, mkdirSync, openSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import Database from "better-sqlite3";

const DEFAULT_DATABASE_PATH = path.join("storage", "google-zoho.sqlite");
const DEFAULT_BUSY_TIMEOUT_MS = 5_000;
const DEFAULT_LEAD_LEASE_MS = 10 * 60_000;
const DEFAULT_JOB_LEASE_MS = 5 * 60_000;
const MAX_LIST_LIMIT = 500;
const MAX_ERROR_LENGTH = 500;
const MAX_AUDIT_DETAILS_LENGTH = 8_000;
const SHA256_HEX_PATTERN = /^[a-f0-9]{64}$/i;
const OPAQUE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;
const EVENT_KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;

export const LATEST_GOOGLE_ZOHO_SCHEMA_VERSION = 5;

export type Clock = () => number | Date;
export type IdFactory = () => string;

export type GoogleZohoDatabaseOptions = {
  databasePath?: string;
  clock?: Clock;
  idFactory?: IdFactory;
  busyTimeoutMs?: number;
  autoMigrate?: boolean;
};

export type MigrationResult = {
  databasePath: string;
  previousVersion: number;
  currentVersion: number;
  applied: Array<{ version: number; name: string }>;
};

export type LeadSubmissionStatus = "processing" | "completed" | "failed";

export type LeadSubmission = {
  id: string;
  idempotencyKey: string;
  requestHash: string;
  source: string | null;
  campaignId: string | null;
  attributionHash: string | null;
  attributionExpiresAt: number | null;
  advertisingConsent: boolean;
  consentVersion: string | null;
  consentUpdatedAt: number | null;
  clickIdPresent: boolean;
  status: LeadSubmissionStatus;
  attemptCount: number;
  claimedAt: number;
  leaseUntil: number | null;
  claimToken: string | null;
  completedAt: number | null;
  failedAt: number | null;
  updatedAt: number;
  zohoRecordId: string | null;
  lastErrorCode: string | null;
  lastErrorMessage: string | null;
};

export type ClaimLeadSubmissionInput = {
  idempotencyKey: string;
  requestHash: string;
  source?: string;
  campaignId?: string;
  attributionHash?: string;
  attributionExpiresAt?: number | Date;
  advertisingConsent?: boolean;
  consentVersion?: string;
  consentUpdatedAt?: number | Date;
  clickIdPresent?: boolean;
  leaseMs?: number;
};

export type LeadSubmissionClaimResult =
  | { outcome: "claimed"; recovered: boolean; submission: LeadSubmission }
  | { outcome: "completed"; submission: LeadSubmission }
  | { outcome: "in_progress"; submission: LeadSubmission };

export type ConsumeRateLimitInput = {
  key: string;
  windowMs: number;
  limit: number;
};

export type ConsumeRateLimitResult = {
  allowed: boolean;
  count: number;
  limit: number;
  resetAt: number;
};

export type CompleteLeadSubmissionInput = {
  id: string;
  claimToken: string;
  zohoRecordId: string;
};

export type FailLeadSubmissionInput = {
  id: string;
  claimToken: string;
  errorCode: string;
  errorMessage?: string;
};

export type LeadSubmissionListFilter = TimeRangeFilter & {
  status?: LeadSubmissionStatus | LeadSubmissionStatus[];
  campaignId?: string;
  limit?: number;
  offset?: number;
};

export type WebhookReceipt = {
  nonce: string;
  receivedAt: number;
  requestHash: string;
};

export type ConsumeWebhookNonceInput = {
  nonce: string;
  requestHash: string;
  ttlMs: number;
};

export type ConsumeWebhookNonceResult =
  | { accepted: true; receipt: WebhookReceipt }
  | {
      accepted: false;
      reason: "replay";
      receivedAt: number;
      requestHashMatches: boolean;
    };

export type WebhookReceiptListFilter = TimeRangeFilter & {
  limit?: number;
  offset?: number;
};

export type ClickIdType = "gclid" | "gbraid" | "wbraid";
export type ConversionJobStatus =
  | "pending"
  | "leased"
  | "retry_scheduled"
  | "sent"
  | "confirmed"
  | "permanent_failure"
  | "dry_run";

export type ConversionJob = {
  id: string;
  zohoRecordId: string;
  sourceSubmissionId: string | null;
  identityVersion: 1 | 2;
  eventKey: string;
  transactionId: string;
  conversionAction: string;
  conversionValue: number;
  currencyCode: string;
  conversionOccurredAt: number;
  status: ConversionJobStatus;
  attemptCount: number;
  nextAttemptAt: number;
  leasedAt: number | null;
  leaseUntil: number | null;
  leaseToken: string | null;
  requestHash: string;
  lastErrorCode: string | null;
  lastErrorMessage: string | null;
  googleRequestId: string | null;
  campaignId: string | null;
  clickIdType: ClickIdType;
  createdAt: number;
  updatedAt: number;
  sentAt: number | null;
  confirmedAt: number | null;
  dryRunAt: number | null;
};

export type GetOrCreateConversionJobInput = {
  zohoRecordId: string;
  sourceSubmissionId: string;
  eventKey: string;
  transactionId: string;
  conversionAction: string;
  conversionValue: number;
  currencyCode?: string;
  conversionOccurredAt: number | Date;
  requestHash: string;
  campaignId?: string;
  clickIdType: ClickIdType;
  nextAttemptAt?: number | Date;
};

export type GetOrCreateConversionJobResult = {
  created: boolean;
  payloadMatches: boolean;
  job: ConversionJob;
};

export type LeaseDueConversionJobsInput = {
  limit?: number;
  leaseMs?: number;
};

export type MarkConversionJobSentInput = JobLeaseInput & {
  googleRequestId?: string;
};

export type MarkConversionJobRetryInput = JobLeaseInput & {
  nextAttemptAt: number | Date;
  errorCode: string;
  errorMessage?: string;
};

export type MarkConversionJobPermanentFailureInput = JobLeaseInput & {
  errorCode: string;
  errorMessage?: string;
};

export type MarkConversionJobDryRunInput = JobLeaseInput & {
  requestSummary?: string;
};

export type MarkConversionJobConfirmedInput = {
  id: string;
  googleRequestId?: string;
};

export type MarkSentConversionJobPermanentFailureInput = {
  id: string;
  errorCode: string;
  errorMessage?: string;
};

export type MarkSentConversionJobRetryInput = {
  id: string;
  nextAttemptAt: number | Date;
  errorCode: string;
  errorMessage?: string;
};

export type ConversionJobListFilter = TimeRangeFilter & {
  status?: ConversionJobStatus | ConversionJobStatus[];
  eventKey?: string;
  campaignId?: string;
  clickIdType?: ClickIdType;
  zohoRecordId?: string;
  limit?: number;
  offset?: number;
};

export type AuditOutcome = "success" | "failure" | "ignored" | "warning" | "info";
export type AuditScalar = string | number | boolean | null;
export type AuditDetails = Record<string, AuditScalar | AuditScalar[]>;

export type AuditEvent = {
  id: string;
  createdAt: number;
  eventType: string;
  outcome: AuditOutcome;
  entityType: string | null;
  entityId: string | null;
  campaignId: string | null;
  details: AuditDetails;
};

export type AppendAuditEventInput = {
  eventType: string;
  outcome: AuditOutcome;
  entityType?: string;
  entityId?: string;
  campaignId?: string;
  details?: AuditDetails;
};

export type AuditEventListFilter = TimeRangeFilter & {
  eventType?: string;
  outcome?: AuditOutcome;
  entityType?: string;
  entityId?: string;
  campaignId?: string;
  limit?: number;
  offset?: number;
};

export type IntegrationReportFilter = TimeRangeFilter & {
  campaignId?: string;
};

export type IntegrationReport = {
  from: number | null;
  to: number | null;
  campaignId: string | null;
  leads: Record<LeadSubmissionStatus, number> & { total: number };
  googleAdsLeads: number;
  googleAdsLeadsMissingClickId: number;
  webhookReceipts: number;
  duplicateUploadsPrevented: number;
  conversionsByEvent: Record<string, number>;
  lastConfirmedAt: number | null;
  lastFailedAt: number | null;
  conversions: Record<ConversionJobStatus, number> & {
    total: number;
    confirmedValueByCurrency: Record<string, number>;
  };
};

export type RetentionResult = {
  applied: boolean;
  evidenceRows: number;
  webhookReceipts: number;
  rateLimitBuckets: number;
  auditEvents: number;
  conversionJobsDeleted: 0;
};

type TimeRangeFilter = {
  from?: number | Date;
  to?: number | Date;
};

type JobLeaseInput = {
  id: string;
  leaseToken: string;
};

type LeadSubmissionRow = {
  id: string;
  idempotency_key: string;
  request_hash: string;
  source: string | null;
  campaign_id: string | null;
  attribution_hash: string | null;
  attribution_expires_at: number | null;
  ad_user_data_consent: number;
  consent_version: string | null;
  consent_updated_at: number | null;
  click_id_present: number;
  status: LeadSubmissionStatus;
  attempt_count: number;
  claimed_at: number;
  lease_until: number | null;
  claim_token: string | null;
  completed_at: number | null;
  failed_at: number | null;
  updated_at: number;
  zoho_record_id: string | null;
  last_error_code: string | null;
  last_error_message: string | null;
};

type WebhookReceiptRow = {
  nonce: string;
  received_at: number;
  request_hash: string;
};

type ConversionJobRow = {
  id: string;
  zoho_record_id: string;
  source_submission_id: string | null;
  identity_version: 1 | 2;
  event_key: string;
  transaction_id: string;
  conversion_action: string;
  conversion_value: number;
  currency_code: string;
  conversion_occurred_at: number;
  status: ConversionJobStatus;
  attempt_count: number;
  next_attempt_at: number;
  leased_at: number | null;
  lease_until: number | null;
  lease_token: string | null;
  request_hash: string;
  last_error_code: string | null;
  last_error_message: string | null;
  google_request_id: string | null;
  campaign_id: string | null;
  click_id_type: ClickIdType;
  created_at: number;
  updated_at: number;
  sent_at: number | null;
  confirmed_at: number | null;
  dry_run_at: number | null;
};

type AuditEventRow = {
  id: string;
  created_at: number;
  event_type: string;
  outcome: AuditOutcome;
  entity_type: string | null;
  entity_id: string | null;
  campaign_id: string | null;
  details_json: string;
};

type StatusCountRow = { status: string; count: number };
type CountRow = { count: number };
type CurrencyValueRow = { currency_code: string; value: number | null };
type EventCountRow = { event_key: string; count: number };
type MaxTimeRow = { value: number | null };

type Migration = {
  version: number;
  name: string;
  up: string;
};

const MIGRATIONS: readonly Migration[] = [
  {
    version: 1,
    name: "initial_google_zoho_ledger",
    up: `
      CREATE TABLE lead_submissions (
        id TEXT PRIMARY KEY,
        idempotency_key TEXT NOT NULL UNIQUE,
        request_hash TEXT NOT NULL,
        source TEXT,
        campaign_id TEXT,
        status TEXT NOT NULL CHECK (status IN ('processing', 'completed', 'failed')),
        attempt_count INTEGER NOT NULL DEFAULT 1 CHECK (attempt_count >= 1),
        claimed_at INTEGER NOT NULL,
        lease_until INTEGER,
        claim_token TEXT,
        completed_at INTEGER,
        failed_at INTEGER,
        updated_at INTEGER NOT NULL,
        zoho_record_id TEXT,
        last_error_code TEXT,
        last_error_message TEXT
      );

      CREATE INDEX idx_lead_submissions_status_updated
        ON lead_submissions(status, updated_at);
      CREATE INDEX idx_lead_submissions_campaign_claimed
        ON lead_submissions(campaign_id, claimed_at);

      CREATE TABLE webhook_receipts (
        nonce TEXT PRIMARY KEY,
        received_at INTEGER NOT NULL,
        request_hash TEXT NOT NULL
      );

      CREATE INDEX idx_webhook_receipts_received
        ON webhook_receipts(received_at);

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
        status TEXT NOT NULL CHECK (
          status IN (
            'pending', 'leased', 'retry_scheduled', 'sent', 'confirmed',
            'permanent_failure', 'dry_run'
          )
        ),
        attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
        next_attempt_at INTEGER NOT NULL,
        leased_at INTEGER,
        lease_until INTEGER,
        lease_token TEXT,
        request_hash TEXT NOT NULL,
        last_error_code TEXT,
        last_error_message TEXT,
        google_request_id TEXT,
        campaign_id TEXT,
        click_id_type TEXT NOT NULL CHECK (click_id_type IN ('gclid', 'gbraid', 'wbraid')),
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        sent_at INTEGER,
        confirmed_at INTEGER,
        dry_run_at INTEGER,
        UNIQUE (zoho_record_id, event_key)
      );

      CREATE INDEX idx_conversion_jobs_due
        ON conversion_jobs(status, next_attempt_at, lease_until);
      CREATE INDEX idx_conversion_jobs_campaign_created
        ON conversion_jobs(campaign_id, created_at);
      CREATE INDEX idx_conversion_jobs_zoho_record
        ON conversion_jobs(zoho_record_id);

      CREATE TABLE audit_events (
        id TEXT PRIMARY KEY,
        created_at INTEGER NOT NULL,
        event_type TEXT NOT NULL,
        outcome TEXT NOT NULL CHECK (outcome IN ('success', 'failure', 'ignored', 'warning', 'info')),
        entity_type TEXT,
        entity_id TEXT,
        campaign_id TEXT,
        details_json TEXT NOT NULL DEFAULT '{}'
      );

      CREATE INDEX idx_audit_events_created
        ON audit_events(created_at);
      CREATE INDEX idx_audit_events_entity
        ON audit_events(entity_type, entity_id, created_at);
      CREATE INDEX idx_audit_events_campaign
        ON audit_events(campaign_id, created_at);
    `,
  },
  {
    version: 2,
    name: "lead_attribution_consent_evidence",
    up: `
      ALTER TABLE lead_submissions ADD COLUMN attribution_hash TEXT;
      ALTER TABLE lead_submissions ADD COLUMN ad_user_data_consent INTEGER NOT NULL DEFAULT 0
        CHECK (ad_user_data_consent IN (0, 1));
      ALTER TABLE lead_submissions ADD COLUMN consent_version TEXT;
      ALTER TABLE lead_submissions ADD COLUMN consent_updated_at INTEGER;
      ALTER TABLE lead_submissions ADD COLUMN click_id_present INTEGER NOT NULL DEFAULT 0
        CHECK (click_id_present IN (0, 1));
      CREATE INDEX idx_lead_submissions_source_click
        ON lead_submissions(source, click_id_present, claimed_at);
    `,
  },
  {
    version: 3,
    name: "durable_rate_limit_buckets",
    up: `
      CREATE TABLE rate_limit_buckets (
        key TEXT NOT NULL,
        bucket_start INTEGER NOT NULL,
        request_count INTEGER NOT NULL CHECK (request_count >= 1),
        updated_at INTEGER NOT NULL,
        PRIMARY KEY (key, bucket_start)
      );
      CREATE INDEX idx_rate_limit_buckets_updated ON rate_limit_buckets(updated_at);
    `,
  },
  {
    version: 4,
    name: "attribution_evidence_expiry",
    up: `
      ALTER TABLE lead_submissions ADD COLUMN attribution_expires_at INTEGER;
      CREATE INDEX idx_lead_submissions_attribution_expiry
        ON lead_submissions(attribution_expires_at);
    `,
  },
  {
    version: 5,
    name: "canonical_lead_conversion_identity",
    up: `
      CREATE TABLE conversion_jobs_v5 (
        id TEXT PRIMARY KEY,
        zoho_record_id TEXT NOT NULL,
        source_submission_id TEXT REFERENCES lead_submissions(id) ON DELETE SET NULL,
        identity_version INTEGER NOT NULL DEFAULT 2 CHECK (identity_version IN (1, 2)),
        event_key TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        conversion_action TEXT NOT NULL,
        conversion_value REAL NOT NULL CHECK (conversion_value >= 0),
        currency_code TEXT NOT NULL CHECK (length(currency_code) = 3),
        conversion_occurred_at INTEGER NOT NULL,
        status TEXT NOT NULL CHECK (
          status IN (
            'pending', 'leased', 'retry_scheduled', 'sent', 'confirmed',
            'permanent_failure', 'dry_run'
          )
        ),
        attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
        next_attempt_at INTEGER NOT NULL,
        leased_at INTEGER,
        lease_until INTEGER,
        lease_token TEXT,
        request_hash TEXT NOT NULL,
        last_error_code TEXT,
        last_error_message TEXT,
        google_request_id TEXT,
        campaign_id TEXT,
        click_id_type TEXT NOT NULL CHECK (click_id_type IN ('gclid', 'gbraid', 'wbraid')),
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        sent_at INTEGER,
        confirmed_at INTEGER,
        dry_run_at INTEGER,
        CHECK (
          identity_version = 1 OR (
            source_submission_id IS NOT NULL AND
            transaction_id = source_submission_id AND
            length(transaction_id) <= 64
          )
        ),
        UNIQUE (zoho_record_id, event_key),
        UNIQUE (conversion_action, transaction_id)
      );

      INSERT INTO conversion_jobs_v5 (
        id, zoho_record_id, source_submission_id, identity_version, event_key,
        transaction_id, conversion_action, conversion_value, currency_code,
        conversion_occurred_at, status, attempt_count, next_attempt_at, leased_at,
        lease_until, lease_token, request_hash, last_error_code, last_error_message,
        google_request_id, campaign_id, click_id_type, created_at, updated_at,
        sent_at, confirmed_at, dry_run_at
      )
      SELECT
        id, zoho_record_id, source_submission_id, 1, event_key,
        transaction_id, conversion_action, conversion_value, currency_code,
        conversion_occurred_at, status, attempt_count, next_attempt_at, leased_at,
        lease_until, lease_token, request_hash, last_error_code, last_error_message,
        google_request_id, campaign_id, click_id_type, created_at, updated_at,
        sent_at, confirmed_at, dry_run_at
      FROM conversion_jobs;

      DROP TABLE conversion_jobs;
      ALTER TABLE conversion_jobs_v5 RENAME TO conversion_jobs;

      CREATE INDEX idx_conversion_jobs_due
        ON conversion_jobs(status, next_attempt_at, lease_until);
      CREATE INDEX idx_conversion_jobs_campaign_created
        ON conversion_jobs(campaign_id, created_at);
      CREATE INDEX idx_conversion_jobs_zoho_record
        ON conversion_jobs(zoho_record_id);
    `,
  },
];

export class GoogleZohoDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GoogleZohoDatabaseError";
  }
}

export class IdempotencyConflictError extends GoogleZohoDatabaseError {
  constructor(message: string) {
    super(message);
    this.name = "IdempotencyConflictError";
  }
}

export class LeaseConflictError extends GoogleZohoDatabaseError {
  constructor(message: string) {
    super(message);
    this.name = "LeaseConflictError";
  }
}

export class StateTransitionError extends GoogleZohoDatabaseError {
  constructor(message: string) {
    super(message);
    this.name = "StateTransitionError";
  }
}

export class GoogleZohoDatabase {
  readonly databasePath: string;

  private readonly database: Database.Database;
  private readonly clock: Clock;
  private readonly idFactory: IdFactory;
  private closed = false;

  constructor(options: GoogleZohoDatabaseOptions = {}) {
    this.databasePath = resolveGoogleZohoDatabasePath(options.databasePath);
    this.clock = options.clock ?? (() => Date.now());
    this.idFactory = options.idFactory ?? randomUUID;

    const busyTimeoutMs = positiveInteger(
      options.busyTimeoutMs ?? DEFAULT_BUSY_TIMEOUT_MS,
      "busyTimeoutMs",
    );

    prepareDatabasePath(this.databasePath);
    this.database = new Database(this.databasePath, { timeout: busyTimeoutMs });
    this.database.pragma(`busy_timeout = ${busyTimeoutMs}`);
    this.database.pragma("foreign_keys = ON");
    this.database.pragma("journal_mode = WAL");
    this.database.pragma("synchronous = NORMAL");

    if (options.autoMigrate !== false) {
      this.migrate();
    }
    secureDatabaseFiles(this.databasePath);
  }

  migrate(): MigrationResult {
    this.ensureOpen();
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at INTEGER NOT NULL
      )
    `);

    const initialVersion = this.currentSchemaVersion();
    if (initialVersion > LATEST_GOOGLE_ZOHO_SCHEMA_VERSION) {
      throw new GoogleZohoDatabaseError(
        `Database schema version ${initialVersion} is newer than supported version ${LATEST_GOOGLE_ZOHO_SCHEMA_VERSION}.`,
      );
    }

    const applied: Array<{ version: number; name: string }> = [];
    const apply = this.database.transaction(() => {
      // Re-read after the IMMEDIATE transaction obtains the write lock. Another
      // process may have completed a migration while this process was waiting.
      const lockedVersion = this.currentSchemaVersion();
      if (lockedVersion > LATEST_GOOGLE_ZOHO_SCHEMA_VERSION) {
        throw new GoogleZohoDatabaseError(
          `Database schema version ${lockedVersion} is newer than supported version ${LATEST_GOOGLE_ZOHO_SCHEMA_VERSION}.`,
        );
      }
      const pending = MIGRATIONS.filter((migration) => migration.version > lockedVersion);
      for (const migration of pending) {
        this.database.exec(migration.up);
        this.database
          .prepare("INSERT INTO schema_migrations (version, name, applied_at) VALUES (?, ?, ?)")
          .run(migration.version, migration.name, this.now());
        this.database.pragma(`user_version = ${migration.version}`);
        applied.push({ version: migration.version, name: migration.name });
      }
    });
    apply.immediate();
    secureDatabaseFiles(this.databasePath);

    return {
      databasePath: this.databasePath,
      previousVersion: initialVersion,
      currentVersion: this.currentSchemaVersion(),
      applied,
    };
  }

  currentSchemaVersion(): number {
    this.ensureOpen();
    const table = this.database
      .prepare<[], { name: string }>(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'schema_migrations'",
      )
      .get();
    if (!table) return 0;
    const row = this.database
      .prepare<[], { version: number | null }>(
        "SELECT MAX(version) AS version FROM schema_migrations",
      )
      .get();
    return row?.version ?? 0;
  }

  claimLeadSubmission(input: ClaimLeadSubmissionInput): LeadSubmissionClaimResult {
    this.ensureOpen();
    const idempotencyKey = opaqueId(input.idempotencyKey, "idempotencyKey", 200);
    const requestHash = sha256Hash(input.requestHash, "requestHash");
    const source = optionalLabel(input.source, "source", 100);
    const campaignId = optionalOpaqueId(input.campaignId, "campaignId", 128);
    const attributionHash = input.attributionHash ? sha256Hash(input.attributionHash, "attributionHash") : null;
    const attributionExpiresAt = input.attributionExpiresAt === undefined
      ? null
      : epochMs(input.attributionExpiresAt, "attributionExpiresAt");
    const advertisingConsent = input.advertisingConsent === true ? 1 : 0;
    const consentVersion = input.consentVersion ? optionalLabel(input.consentVersion, "consentVersion", 80) : null;
    const consentUpdatedAt = input.consentUpdatedAt === undefined ? null : epochMs(input.consentUpdatedAt, "consentUpdatedAt");
    const clickIdPresent = input.clickIdPresent === true ? 1 : 0;
    const leaseMs = positiveInteger(input.leaseMs ?? DEFAULT_LEAD_LEASE_MS, "leaseMs");

    const claim = this.database.transaction((): LeadSubmissionClaimResult => {
      const now = this.now();
      const existing = this.getLeadSubmissionRowByIdempotencyKey(idempotencyKey);

      if (!existing) {
        const id = this.newId("lead submission ID");
        const claimToken = this.newId("lead claim token");
        this.database
          .prepare(
            `INSERT INTO lead_submissions (
              id, idempotency_key, request_hash, source, campaign_id,
              attribution_hash, attribution_expires_at, ad_user_data_consent, consent_version, consent_updated_at, click_id_present, status,
              attempt_count, claimed_at, lease_until, claim_token, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'processing', 1, ?, ?, ?, ?)`,
          )
          .run(
            id,
            idempotencyKey,
            requestHash,
            source,
            campaignId,
            attributionHash,
            attributionExpiresAt,
            advertisingConsent,
            consentVersion,
            consentUpdatedAt,
            clickIdPresent,
            now,
            now + leaseMs,
            claimToken,
            now,
          );
        return {
          outcome: "claimed",
          recovered: false,
          submission: mapLeadSubmission(this.getLeadSubmissionRow(id)),
        };
      }

      if (existing.request_hash !== requestHash) {
        throw new IdempotencyConflictError(
          "The lead idempotency key was already used for a different request fingerprint.",
        );
      }
      if (existing.status === "completed") {
        return { outcome: "completed", submission: mapLeadSubmission(existing) };
      }
      if (existing.status === "processing" && (existing.lease_until ?? 0) > now) {
        return { outcome: "in_progress", submission: mapLeadSubmission(existing) };
      }

      const claimToken = this.newId("lead claim token");
      this.database
        .prepare(
          `UPDATE lead_submissions
           SET status = 'processing', attempt_count = attempt_count + 1,
               claimed_at = ?, lease_until = ?, claim_token = ?, updated_at = ?,
               failed_at = NULL, last_error_code = NULL, last_error_message = NULL
           WHERE id = ?`,
        )
        .run(now, now + leaseMs, claimToken, now, existing.id);
      return {
        outcome: "claimed",
        recovered: true,
        submission: mapLeadSubmission(this.getLeadSubmissionRow(existing.id)),
      };
    });

    return claim.immediate();
  }

  completeLeadSubmission(input: CompleteLeadSubmissionInput): LeadSubmission {
    this.ensureOpen();
    const id = opaqueId(input.id, "id", 200);
    const claimToken = opaqueId(input.claimToken, "claimToken", 200);
    const zohoRecordId = opaqueId(input.zohoRecordId, "zohoRecordId", 128);
    const now = this.now();
    const result = this.database
      .prepare(
        `UPDATE lead_submissions
         SET status = 'completed', zoho_record_id = ?, completed_at = ?, updated_at = ?,
             lease_until = NULL, claim_token = NULL, failed_at = NULL,
             last_error_code = NULL, last_error_message = NULL
         WHERE id = ? AND status = 'processing' AND claim_token = ? AND lease_until > ?`,
      )
      .run(zohoRecordId, now, now, id, claimToken, now);
    if (result.changes !== 1) {
      throw new LeaseConflictError("The lead submission claim is no longer active.");
    }
    return mapLeadSubmission(this.getLeadSubmissionRow(id));
  }

  failLeadSubmission(input: FailLeadSubmissionInput): LeadSubmission {
    this.ensureOpen();
    const id = opaqueId(input.id, "id", 200);
    const claimToken = opaqueId(input.claimToken, "claimToken", 200);
    const errorCode = safeCode(input.errorCode, "errorCode");
    const errorMessage = optionalRedactedText(input.errorMessage);
    const now = this.now();
    const result = this.database
      .prepare(
        `UPDATE lead_submissions
         SET status = 'failed', failed_at = ?, updated_at = ?, lease_until = NULL,
             claim_token = NULL, last_error_code = ?, last_error_message = ?
         WHERE id = ? AND status = 'processing' AND claim_token = ? AND lease_until > ?`,
      )
      .run(now, now, errorCode, errorMessage, id, claimToken, now);
    if (result.changes !== 1) {
      throw new LeaseConflictError("The lead submission claim is no longer active.");
    }
    return mapLeadSubmission(this.getLeadSubmissionRow(id));
  }

  listLeadSubmissions(filter: LeadSubmissionListFilter = {}): LeadSubmission[] {
    this.ensureOpen();
    const { clauses, parameters } = timeRangeClauses(filter, "claimed_at");
    addStatusFilter(clauses, parameters, "status", filter.status, LEAD_STATUSES);
    addEqualsFilter(clauses, parameters, "campaign_id", filter.campaignId);
    const { limit, offset } = pagination(filter);
    const rows = this.database
      .prepare(
        `SELECT * FROM lead_submissions${whereClause(clauses)}
         ORDER BY claimed_at DESC, id DESC LIMIT ? OFFSET ?`,
      )
      .all(...parameters, limit, offset) as LeadSubmissionRow[];
    return rows.map(mapLeadSubmission);
  }

  getLeadSubmission(id: string): LeadSubmission | null {
    this.ensureOpen();
    const safeId = opaqueId(id, "id", 200);
    const row = this.database
      .prepare<[string], LeadSubmissionRow>("SELECT * FROM lead_submissions WHERE id = ?")
      .get(safeId);
    return row ? mapLeadSubmission(row) : null;
  }

  getConversionJobForEvent(zohoRecordId: string, eventKey: string): ConversionJob | null {
    this.ensureOpen();
    const safeRecordId = opaqueId(zohoRecordId, "zohoRecordId", 128);
    const safeEventKey = eventKeyValue(eventKey);
    const row = this.getConversionJobRowByEvent(safeRecordId, safeEventKey);
    return row ? mapConversionJob(row) : null;
  }

  findLatestCompletedSubmissionForZohoRecord(zohoRecordId: string): LeadSubmission | null {
    this.ensureOpen();
    const safeRecordId = opaqueId(zohoRecordId, "zohoRecordId", 128);
    const row = this.database
      .prepare<[string], LeadSubmissionRow>(
        `SELECT * FROM lead_submissions
         WHERE zoho_record_id = ? AND status = 'completed'
         ORDER BY completed_at DESC, id DESC LIMIT 1`,
      )
      .get(safeRecordId);
    return row ? mapLeadSubmission(row) : null;
  }

  consumeRateLimit(input: ConsumeRateLimitInput): ConsumeRateLimitResult {
    this.ensureOpen();
    const key = opaqueId(input.key, "rateLimitKey", 200);
    const windowMs = positiveInteger(input.windowMs, "windowMs");
    const limit = positiveInteger(input.limit, "limit");
    const consume = this.database.transaction(() => {
      const now = this.now();
      const bucketStart = Math.floor(now / windowMs) * windowMs;
      this.database.prepare("DELETE FROM rate_limit_buckets WHERE updated_at < ?").run(now - windowMs * 3);
      this.database
        .prepare(
          `INSERT INTO rate_limit_buckets (key, bucket_start, request_count, updated_at)
           VALUES (?, ?, 1, ?)
           ON CONFLICT(key, bucket_start) DO UPDATE SET
             request_count = request_count + 1,
             updated_at = excluded.updated_at`,
        )
        .run(key, bucketStart, now);
      const row = this.database
        .prepare<[string, number], { request_count: number }>(
          "SELECT request_count FROM rate_limit_buckets WHERE key = ? AND bucket_start = ?",
        )
        .get(key, bucketStart);
      const count = row?.request_count || 1;
      return { allowed: count <= limit, count, limit, resetAt: bucketStart + windowMs };
    });
    return consume.immediate();
  }

  consumeWebhookNonce(input: ConsumeWebhookNonceInput): ConsumeWebhookNonceResult {
    this.ensureOpen();
    const nonce = opaqueId(input.nonce, "nonce", 256);
    const requestHash = sha256Hash(input.requestHash, "requestHash");
    const ttlMs = positiveInteger(input.ttlMs, "ttlMs");

    const consume = this.database.transaction((): ConsumeWebhookNonceResult => {
      const now = this.now();
      this.database
        .prepare("DELETE FROM webhook_receipts WHERE received_at <= ?")
        .run(now - ttlMs);
      const existing = this.database
        .prepare<[string], WebhookReceiptRow>("SELECT * FROM webhook_receipts WHERE nonce = ?")
        .get(nonce);
      if (existing) {
        return {
          accepted: false,
          reason: "replay",
          receivedAt: existing.received_at,
          requestHashMatches: existing.request_hash === requestHash,
        };
      }
      this.database
        .prepare("INSERT INTO webhook_receipts (nonce, received_at, request_hash) VALUES (?, ?, ?)")
        .run(nonce, now, requestHash);
      return {
        accepted: true,
        receipt: { nonce, receivedAt: now, requestHash },
      };
    });

    return consume.immediate();
  }

  listWebhookReceipts(filter: WebhookReceiptListFilter = {}): WebhookReceipt[] {
    this.ensureOpen();
    const { clauses, parameters } = timeRangeClauses(filter, "received_at");
    const { limit, offset } = pagination(filter);
    const rows = this.database
      .prepare(
        `SELECT * FROM webhook_receipts${whereClause(clauses)}
         ORDER BY received_at DESC, nonce DESC LIMIT ? OFFSET ?`,
      )
      .all(...parameters, limit, offset) as WebhookReceiptRow[];
    return rows.map(mapWebhookReceipt);
  }

  getOrCreateConversionJob(
    input: GetOrCreateConversionJobInput,
  ): GetOrCreateConversionJobResult {
    this.ensureOpen();
    const zohoRecordId = opaqueId(input.zohoRecordId, "zohoRecordId", 128);
    const sourceSubmissionId = opaqueId(input.sourceSubmissionId, "sourceSubmissionId", 64);
    const eventKey = eventKeyValue(input.eventKey);
    const conversionAction = requiredText(input.conversionAction, "conversionAction", 512);
    const conversionValue = nonNegativeNumber(input.conversionValue, "conversionValue");
    const currencyCode = currency(input.currencyCode ?? "AED");
    const conversionOccurredAt = epochMs(input.conversionOccurredAt, "conversionOccurredAt");
    const requestHash = sha256Hash(input.requestHash, "requestHash");
    const campaignId = optionalOpaqueId(input.campaignId, "campaignId", 128);
    const clickIdType = clickType(input.clickIdType);
    const nextAttemptAt = input.nextAttemptAt !== undefined
      ? epochMs(input.nextAttemptAt, "nextAttemptAt")
      : this.now();

    const create = this.database.transaction((): GetOrCreateConversionJobResult => {
      const existing = this.getConversionJobRowByEvent(zohoRecordId, eventKey);
      if (existing) {
        return {
          created: false,
          payloadMatches: existing.request_hash === requestHash,
          job: mapConversionJob(existing),
        };
      }

      const now = this.now();
      const id = this.newId("conversion job ID");
      const transactionId = opaqueId(input.transactionId, "transactionId", 64);
      if (transactionId !== sourceSubmissionId) {
        throw new GoogleZohoDatabaseError(
          "A new conversion job must use its canonical lead ID as the transaction ID.",
        );
      }
      try {
        this.database
          .prepare(
            `INSERT INTO conversion_jobs (
              id, zoho_record_id, source_submission_id, identity_version, event_key, transaction_id,
              conversion_action, conversion_value, currency_code, conversion_occurred_at,
              status, attempt_count, next_attempt_at, request_hash, campaign_id,
              click_id_type, created_at, updated_at
            ) VALUES (?, ?, ?, 2, ?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?, ?, ?, ?, ?)`,
          )
          .run(
            id,
            zohoRecordId,
            sourceSubmissionId,
            eventKey,
            transactionId,
            conversionAction,
            conversionValue,
            currencyCode,
            conversionOccurredAt,
            nextAttemptAt,
            requestHash,
            campaignId,
            clickIdType,
            now,
            now,
          );
      } catch (error) {
        if (isUniqueConstraintError(error)) {
          const raced = this.getConversionJobRowByEvent(zohoRecordId, eventKey);
          if (raced) {
            return {
              created: false,
              payloadMatches: raced.request_hash === requestHash,
              job: mapConversionJob(raced),
            };
          }
          throw new IdempotencyConflictError(
            "The conversion transaction ID is already assigned to another job.",
          );
        }
        throw error;
      }

      return {
        created: true,
        payloadMatches: true,
        job: mapConversionJob(this.getConversionJobRow(id)),
      };
    });

    return create.immediate();
  }

  leaseDueConversionJobs(input: LeaseDueConversionJobsInput = {}): ConversionJob[] {
    this.ensureOpen();
    const limit = boundedLimit(input.limit);
    const leaseMs = positiveInteger(input.leaseMs ?? DEFAULT_JOB_LEASE_MS, "leaseMs");
    const lease = this.database.transaction(() => {
      const now = this.now();
      const rows = this.database
        .prepare(
          `SELECT * FROM conversion_jobs
           WHERE (
             status IN ('pending', 'retry_scheduled') AND next_attempt_at <= ?
           ) OR (
             status = 'leased' AND lease_until IS NOT NULL AND lease_until <= ?
           )
           ORDER BY next_attempt_at ASC, created_at ASC, id ASC
           LIMIT ?`,
        )
        .all(now, now, limit) as ConversionJobRow[];

      const leased: ConversionJob[] = [];
      for (const row of rows) {
        const leaseToken = this.newId("conversion job lease token");
        const result = this.database
          .prepare(
            `UPDATE conversion_jobs
             SET status = 'leased', attempt_count = attempt_count + 1,
                 leased_at = ?, lease_until = ?, lease_token = ?, updated_at = ?
             WHERE id = ? AND (
               (status IN ('pending', 'retry_scheduled') AND next_attempt_at <= ?)
               OR (status = 'leased' AND lease_until IS NOT NULL AND lease_until <= ?)
             )`,
          )
          .run(now, now + leaseMs, leaseToken, now, row.id, now, now);
        if (result.changes === 1) {
          leased.push(mapConversionJob(this.getConversionJobRow(row.id)));
        }
      }
      return leased;
    });

    return lease.immediate();
  }

  markConversionJobSent(input: MarkConversionJobSentInput): ConversionJob {
    const googleRequestId = optionalOpaqueId(input.googleRequestId, "googleRequestId", 256);
    return this.finishLeasedJob(
      input,
      `status = 'sent', sent_at = @now, google_request_id = @googleRequestId,
       last_error_code = NULL, last_error_message = NULL`,
      { googleRequestId },
    );
  }

  markConversionJobRetry(input: MarkConversionJobRetryInput): ConversionJob {
    const nextAttemptAt = epochMs(input.nextAttemptAt, "nextAttemptAt");
    if (nextAttemptAt <= this.now()) {
      throw new GoogleZohoDatabaseError("nextAttemptAt must be in the future.");
    }
    return this.finishLeasedJob(
      input,
      `status = 'retry_scheduled', next_attempt_at = @nextAttemptAt,
       last_error_code = @errorCode, last_error_message = @errorMessage`,
      {
        nextAttemptAt,
        errorCode: safeCode(input.errorCode, "errorCode"),
        errorMessage: optionalRedactedText(input.errorMessage),
      },
    );
  }

  markConversionJobPermanentFailure(
    input: MarkConversionJobPermanentFailureInput,
  ): ConversionJob {
    return this.finishLeasedJob(
      input,
      `status = 'permanent_failure',
       last_error_code = @errorCode, last_error_message = @errorMessage`,
      {
        errorCode: safeCode(input.errorCode, "errorCode"),
        errorMessage: optionalRedactedText(input.errorMessage),
      },
    );
  }

  markConversionJobDryRun(input: MarkConversionJobDryRunInput): ConversionJob {
    return this.finishLeasedJob(
      input,
      `status = 'dry_run', dry_run_at = @now,
       last_error_code = NULL, last_error_message = @requestSummary`,
      { requestSummary: optionalRedactedText(input.requestSummary) },
    );
  }

  markConversionJobConfirmed(input: MarkConversionJobConfirmedInput): ConversionJob {
    this.ensureOpen();
    const id = opaqueId(input.id, "id", 200);
    const googleRequestId = optionalOpaqueId(input.googleRequestId, "googleRequestId", 256);
    const confirm = this.database.transaction(() => {
      const existing = this.getConversionJobRow(id);
      if (existing.status === "confirmed") {
        ensureDiagnosticRequestMatches(existing.google_request_id, googleRequestId);
        return mapConversionJob(existing);
      }
      if (existing.status !== "sent") {
        throw new StateTransitionError(
          `Only a sent conversion job can be confirmed; current status is ${existing.status}.`,
        );
      }
      ensureDiagnosticRequestMatches(existing.google_request_id, googleRequestId);
      const now = this.now();
      this.database
        .prepare(
          `UPDATE conversion_jobs
           SET status = 'confirmed', confirmed_at = ?, updated_at = ?,
               google_request_id = COALESCE(?, google_request_id),
               last_error_code = NULL, last_error_message = NULL
           WHERE id = ? AND status = 'sent'`,
        )
        .run(now, now, googleRequestId, id);
      return mapConversionJob(this.getConversionJobRow(id));
    });
    return confirm.immediate();
  }

  markSentConversionJobPermanentFailure(
    input: MarkSentConversionJobPermanentFailureInput,
  ): ConversionJob {
    this.ensureOpen();
    const id = opaqueId(input.id, "id", 200);
    const errorCode = safeCode(input.errorCode, "errorCode");
    const errorMessage = optionalRedactedText(input.errorMessage);
    const reject = this.database.transaction(() => {
      const existing = this.getConversionJobRow(id);
      if (existing.status === "permanent_failure" && existing.sent_at !== null) {
        return mapConversionJob(existing);
      }
      if (existing.status !== "sent") {
        throw new StateTransitionError(
          `Only a sent conversion job can receive a terminal diagnostic failure; current status is ${existing.status}.`,
        );
      }
      const now = this.now();
      this.database
        .prepare(
          `UPDATE conversion_jobs
           SET status = 'permanent_failure', updated_at = ?,
               last_error_code = ?, last_error_message = ?
           WHERE id = ? AND status = 'sent'`,
        )
        .run(now, errorCode, errorMessage, id);
      return mapConversionJob(this.getConversionJobRow(id));
    });
    return reject.immediate();
  }

  markSentConversionJobRetry(input: MarkSentConversionJobRetryInput): ConversionJob {
    this.ensureOpen();
    const id = opaqueId(input.id, "id", 200);
    const nextAttemptAt = epochMs(input.nextAttemptAt, "nextAttemptAt");
    if (nextAttemptAt <= this.now()) throw new GoogleZohoDatabaseError("nextAttemptAt must be in the future.");
    const errorCode = safeCode(input.errorCode, "errorCode");
    const errorMessage = optionalRedactedText(input.errorMessage);
    const retry = this.database.transaction(() => {
      const existing = this.getConversionJobRow(id);
      if (existing.status !== "sent") {
        throw new StateTransitionError(
          `Only a sent conversion job can be retried after diagnostics; current status is ${existing.status}.`,
        );
      }
      const now = this.now();
      this.database
        .prepare(
          `UPDATE conversion_jobs
           SET status = 'retry_scheduled', next_attempt_at = ?, updated_at = ?,
               google_request_id = NULL, sent_at = NULL,
               last_error_code = ?, last_error_message = ?
           WHERE id = ? AND status = 'sent'`,
        )
        .run(nextAttemptAt, now, errorCode, errorMessage, id);
      return mapConversionJob(this.getConversionJobRow(id));
    });
    return retry.immediate();
  }

  listConversionJobs(filter: ConversionJobListFilter = {}): ConversionJob[] {
    this.ensureOpen();
    const { clauses, parameters } = timeRangeClauses(filter, "created_at");
    addStatusFilter(clauses, parameters, "status", filter.status, CONVERSION_STATUSES);
    addEqualsFilter(clauses, parameters, "event_key", filter.eventKey);
    addEqualsFilter(clauses, parameters, "campaign_id", filter.campaignId);
    addEqualsFilter(clauses, parameters, "click_id_type", filter.clickIdType);
    addEqualsFilter(clauses, parameters, "zoho_record_id", filter.zohoRecordId);
    const { limit, offset } = pagination(filter);
    const rows = this.database
      .prepare(
        `SELECT * FROM conversion_jobs${whereClause(clauses)}
         ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
      )
      .all(...parameters, limit, offset) as ConversionJobRow[];
    return rows.map(mapConversionJob);
  }

  appendAuditEvent(input: AppendAuditEventInput): AuditEvent {
    this.ensureOpen();
    const eventType = safeCode(input.eventType, "eventType");
    const outcome = auditOutcome(input.outcome);
    const entityType = optionalLabel(input.entityType, "entityType", 100);
    const entityId = optionalOpaqueId(input.entityId, "entityId", 256);
    const campaignId = optionalOpaqueId(input.campaignId, "campaignId", 128);
    const details = redactAuditDetails(input.details ?? {});
    const detailsJson = JSON.stringify(details);
    if (Buffer.byteLength(detailsJson, "utf8") > MAX_AUDIT_DETAILS_LENGTH) {
      throw new GoogleZohoDatabaseError(
        `Audit details must be ${MAX_AUDIT_DETAILS_LENGTH} bytes or fewer after redaction.`,
      );
    }

    const id = this.newId("audit event ID");
    const now = this.now();
    this.database
      .prepare(
        `INSERT INTO audit_events (
          id, created_at, event_type, outcome, entity_type, entity_id, campaign_id, details_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(id, now, eventType, outcome, entityType, entityId, campaignId, detailsJson);
    return mapAuditEvent(this.getAuditEventRow(id));
  }

  listAuditEvents(filter: AuditEventListFilter = {}): AuditEvent[] {
    this.ensureOpen();
    const { clauses, parameters } = timeRangeClauses(filter, "created_at");
    addEqualsFilter(clauses, parameters, "event_type", filter.eventType);
    addEqualsFilter(clauses, parameters, "outcome", filter.outcome);
    addEqualsFilter(clauses, parameters, "entity_type", filter.entityType);
    addEqualsFilter(clauses, parameters, "entity_id", filter.entityId);
    addEqualsFilter(clauses, parameters, "campaign_id", filter.campaignId);
    const { limit, offset } = pagination(filter);
    const rows = this.database
      .prepare(
        `SELECT * FROM audit_events${whereClause(clauses)}
         ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
      )
      .all(...parameters, limit, offset) as AuditEventRow[];
    return rows.map(mapAuditEvent);
  }

  getIntegrationReport(filter: IntegrationReportFilter = {}): IntegrationReport {
    this.ensureOpen();
    const from = optionalEpochMs(filter.from, "from");
    const to = optionalEpochMs(filter.to, "to");
    validateTimeRange(from, to);
    const campaignId = optionalOpaqueId(filter.campaignId, "campaignId", 128);

    const leadFilter = buildReportFilter("claimed_at", from, to, campaignId);
    const conversionFilter = buildReportFilter("created_at", from, to, campaignId);
    const webhookFilter = buildReportFilter("received_at", from, to, null);

    const leadCounts = this.database
      .prepare(
        `SELECT status, COUNT(*) AS count FROM lead_submissions${whereClause(leadFilter.clauses)}
         GROUP BY status`,
      )
      .all(...leadFilter.parameters) as StatusCountRow[];
    const conversionCounts = this.database
      .prepare(
        `SELECT status, COUNT(*) AS count FROM conversion_jobs${whereClause(conversionFilter.clauses)}
         GROUP BY status`,
      )
      .all(...conversionFilter.parameters) as StatusCountRow[];
    const webhookCount = this.database
      .prepare(
        `SELECT COUNT(*) AS count FROM webhook_receipts${whereClause(webhookFilter.clauses)}`,
      )
      .get(...webhookFilter.parameters) as CountRow;
    const googleAdsLeadCount = this.database
      .prepare(
        `SELECT COUNT(*) AS count FROM lead_submissions${whereClause([...leadFilter.clauses, "source = 'google_ads'"])}`,
      )
      .get(...leadFilter.parameters) as CountRow;
    const missingClickCount = this.database
      .prepare(
        `SELECT COUNT(*) AS count FROM lead_submissions${whereClause([
          ...leadFilter.clauses,
          "source = 'google_ads'",
          "click_id_present = 0",
        ])}`,
      )
      .get(...leadFilter.parameters) as CountRow;
    const conversionEvents = this.database
      .prepare(
        `SELECT event_key, COUNT(*) AS count FROM conversion_jobs${whereClause(conversionFilter.clauses)} GROUP BY event_key`,
      )
      .all(...conversionFilter.parameters) as EventCountRow[];
    const duplicateFilter = buildReportFilter("created_at", from, to, campaignId);
    const duplicateCount = this.database
      .prepare(
        `SELECT COUNT(*) AS count FROM audit_events${whereClause([
          ...duplicateFilter.clauses,
          "event_type = 'conversion_duplicate_prevented'",
        ])}`,
      )
      .get(...duplicateFilter.parameters) as CountRow;
    const confirmedValues = this.database
      .prepare(
        `SELECT currency_code, SUM(conversion_value) AS value
         FROM conversion_jobs${whereClause([
           ...conversionFilter.clauses,
           "status = 'confirmed'",
         ])}
         GROUP BY currency_code`,
      )
      .all(...conversionFilter.parameters) as CurrencyValueRow[];
    const lastConfirmed = this.database
      .prepare(
        `SELECT MAX(confirmed_at) AS value FROM conversion_jobs${whereClause([
          ...conversionFilter.clauses,
          "status = 'confirmed'",
        ])}`,
      )
      .get(...conversionFilter.parameters) as MaxTimeRow;
    const lastFailed = this.database
      .prepare(
        `SELECT MAX(updated_at) AS value FROM conversion_jobs${whereClause([
          ...conversionFilter.clauses,
          "status = 'permanent_failure'",
        ])}`,
      )
      .get(...conversionFilter.parameters) as MaxTimeRow;

    const leads = countLeadStatuses(leadCounts);
    const conversions = countConversionStatuses(conversionCounts);
    const confirmedValueByCurrency = Object.fromEntries(
      confirmedValues.map((row) => [row.currency_code, row.value ?? 0]),
    );

    return {
      from,
      to,
      campaignId,
      leads,
      googleAdsLeads: googleAdsLeadCount.count,
      googleAdsLeadsMissingClickId: missingClickCount.count,
      webhookReceipts: webhookCount.count,
      duplicateUploadsPrevented: duplicateCount.count,
      conversionsByEvent: Object.fromEntries(conversionEvents.map((row) => [row.event_key, row.count])),
      lastConfirmedAt: lastConfirmed.value,
      lastFailedAt: lastFailed.value,
      conversions: { ...conversions, confirmedValueByCurrency },
    };
  }

  applyRetention(input: { apply?: boolean; auditRetentionDays?: number } = {}): RetentionResult {
    this.ensureOpen();
    const now = this.now();
    const auditRetentionDays = positiveInteger(input.auditRetentionDays ?? 400, "auditRetentionDays");
    const auditCutoff = now - auditRetentionDays * 86_400_000;
    const webhookCutoff = now - 24 * 60 * 60_000;
    const rateLimitCutoff = now - 24 * 60 * 60_000;
    const counts = {
      evidenceRows: (this.database
        .prepare(
          `SELECT COUNT(*) AS count FROM lead_submissions
           WHERE attribution_expires_at IS NOT NULL AND attribution_expires_at <= ?
             AND (attribution_hash IS NOT NULL OR ad_user_data_consent = 1 OR click_id_present = 1)`,
        )
        .get(now) as CountRow).count,
      webhookReceipts: (this.database
        .prepare("SELECT COUNT(*) AS count FROM webhook_receipts WHERE received_at <= ?")
        .get(webhookCutoff) as CountRow).count,
      rateLimitBuckets: (this.database
        .prepare("SELECT COUNT(*) AS count FROM rate_limit_buckets WHERE updated_at <= ?")
        .get(rateLimitCutoff) as CountRow).count,
      auditEvents: (this.database
        .prepare("SELECT COUNT(*) AS count FROM audit_events WHERE created_at <= ?")
        .get(auditCutoff) as CountRow).count,
    };
    if (input.apply === true) {
      this.database.transaction(() => {
        this.database
          .prepare(
            `UPDATE lead_submissions
             SET attribution_hash = NULL, ad_user_data_consent = 0, consent_version = NULL,
                 consent_updated_at = NULL, click_id_present = 0, updated_at = ?
             WHERE attribution_expires_at IS NOT NULL AND attribution_expires_at <= ?`,
          )
          .run(now, now);
        this.database.prepare("DELETE FROM webhook_receipts WHERE received_at <= ?").run(webhookCutoff);
        this.database.prepare("DELETE FROM rate_limit_buckets WHERE updated_at <= ?").run(rateLimitCutoff);
        this.database.prepare("DELETE FROM audit_events WHERE created_at <= ?").run(auditCutoff);
      }).immediate();
    }
    return { applied: input.apply === true, ...counts, conversionJobsDeleted: 0 };
  }

  close(): void {
    if (this.closed) return;
    this.database.close();
    this.closed = true;
    secureDatabaseFiles(this.databasePath);
  }

  private now(): number {
    return epochMs(this.clock(), "clock");
  }

  private newId(label: string): string {
    return opaqueId(this.idFactory(), label, 256);
  }

  private ensureOpen(): void {
    if (this.closed || !this.database.open) {
      throw new GoogleZohoDatabaseError("The Google/Zoho database is closed.");
    }
  }

  private getLeadSubmissionRow(id: string): LeadSubmissionRow {
    const row = this.database
      .prepare<[string], LeadSubmissionRow>("SELECT * FROM lead_submissions WHERE id = ?")
      .get(id);
    if (!row) throw new GoogleZohoDatabaseError("Lead submission not found.");
    return row;
  }

  private getLeadSubmissionRowByIdempotencyKey(
    idempotencyKey: string,
  ): LeadSubmissionRow | undefined {
    return this.database
      .prepare<[string], LeadSubmissionRow>(
        "SELECT * FROM lead_submissions WHERE idempotency_key = ?",
      )
      .get(idempotencyKey);
  }

  private getConversionJobRow(id: string): ConversionJobRow {
    const row = this.database
      .prepare<[string], ConversionJobRow>("SELECT * FROM conversion_jobs WHERE id = ?")
      .get(id);
    if (!row) throw new GoogleZohoDatabaseError("Conversion job not found.");
    return row;
  }

  private getConversionJobRowByEvent(
    zohoRecordId: string,
    eventKey: string,
  ): ConversionJobRow | undefined {
    return this.database
      .prepare<[string, string], ConversionJobRow>(
        "SELECT * FROM conversion_jobs WHERE zoho_record_id = ? AND event_key = ?",
      )
      .get(zohoRecordId, eventKey);
  }

  private getAuditEventRow(id: string): AuditEventRow {
    const row = this.database
      .prepare<[string], AuditEventRow>("SELECT * FROM audit_events WHERE id = ?")
      .get(id);
    if (!row) throw new GoogleZohoDatabaseError("Audit event not found.");
    return row;
  }

  private finishLeasedJob(
    input: JobLeaseInput,
    updateSql: string,
    extraParameters: Record<string, string | number | null>,
  ): ConversionJob {
    this.ensureOpen();
    const id = opaqueId(input.id, "id", 200);
    const leaseToken = opaqueId(input.leaseToken, "leaseToken", 256);
    const now = this.now();
    const result = this.database
      .prepare(
        `UPDATE conversion_jobs
         SET ${updateSql}, leased_at = NULL, lease_until = NULL, lease_token = NULL,
             updated_at = @now
         WHERE id = @id AND status = 'leased' AND lease_token = @leaseToken
           AND lease_until > @now`,
      )
      .run({ id, leaseToken, now, ...extraParameters });
    if (result.changes !== 1) {
      throw new LeaseConflictError("The conversion job lease is no longer active.");
    }
    return mapConversionJob(this.getConversionJobRow(id));
  }
}

export function openGoogleZohoDatabase(
  options: GoogleZohoDatabaseOptions = {},
): GoogleZohoDatabase {
  return new GoogleZohoDatabase(options);
}

export function migrateGoogleZohoDatabase(
  options: Omit<GoogleZohoDatabaseOptions, "autoMigrate"> = {},
): MigrationResult {
  const database = new GoogleZohoDatabase({ ...options, autoMigrate: false });
  try {
    return database.migrate();
  } finally {
    database.close();
  }
}

export function resolveGoogleZohoDatabasePath(configuredPath?: string): string {
  const value = configuredPath?.trim() || process.env.GOOGLE_ZOHO_DB_PATH?.trim();
  if (value === ":memory:") return value;
  return path.resolve(process.cwd(), value || DEFAULT_DATABASE_PATH);
}

export function redactAuditDetails(details: AuditDetails): AuditDetails {
  const redacted: AuditDetails = {};
  for (const [rawKey, rawValue] of Object.entries(details)) {
    const key = requiredText(rawKey, "audit detail key", 100);
    if (isSensitiveKey(key)) {
      redacted[key] = "[REDACTED]";
      continue;
    }
    redacted[key] = Array.isArray(rawValue)
      ? rawValue.slice(0, 50).map(redactAuditScalar)
      : redactAuditScalar(rawValue);
  }
  return redacted;
}

function mapLeadSubmission(row: LeadSubmissionRow): LeadSubmission {
  return {
    id: row.id,
    idempotencyKey: row.idempotency_key,
    requestHash: row.request_hash,
    source: row.source,
    campaignId: row.campaign_id,
    attributionHash: row.attribution_hash,
    attributionExpiresAt: row.attribution_expires_at,
    advertisingConsent: row.ad_user_data_consent === 1,
    consentVersion: row.consent_version,
    consentUpdatedAt: row.consent_updated_at,
    clickIdPresent: row.click_id_present === 1,
    status: row.status,
    attemptCount: row.attempt_count,
    claimedAt: row.claimed_at,
    leaseUntil: row.lease_until,
    claimToken: row.claim_token,
    completedAt: row.completed_at,
    failedAt: row.failed_at,
    updatedAt: row.updated_at,
    zohoRecordId: row.zoho_record_id,
    lastErrorCode: row.last_error_code,
    lastErrorMessage: row.last_error_message,
  };
}

function mapWebhookReceipt(row: WebhookReceiptRow): WebhookReceipt {
  return {
    nonce: row.nonce,
    receivedAt: row.received_at,
    requestHash: row.request_hash,
  };
}

function mapConversionJob(row: ConversionJobRow): ConversionJob {
  return {
    id: row.id,
    zohoRecordId: row.zoho_record_id,
    sourceSubmissionId: row.source_submission_id,
    identityVersion: row.identity_version,
    eventKey: row.event_key,
    transactionId: row.transaction_id,
    conversionAction: row.conversion_action,
    conversionValue: row.conversion_value,
    currencyCode: row.currency_code,
    conversionOccurredAt: row.conversion_occurred_at,
    status: row.status,
    attemptCount: row.attempt_count,
    nextAttemptAt: row.next_attempt_at,
    leasedAt: row.leased_at,
    leaseUntil: row.lease_until,
    leaseToken: row.lease_token,
    requestHash: row.request_hash,
    lastErrorCode: row.last_error_code,
    lastErrorMessage: row.last_error_message,
    googleRequestId: row.google_request_id,
    campaignId: row.campaign_id,
    clickIdType: row.click_id_type,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    sentAt: row.sent_at,
    confirmedAt: row.confirmed_at,
    dryRunAt: row.dry_run_at,
  };
}

function mapAuditEvent(row: AuditEventRow): AuditEvent {
  let details: AuditDetails = {};
  try {
    details = JSON.parse(row.details_json) as AuditDetails;
  } catch {
    details = { parse_error: true };
  }
  return {
    id: row.id,
    createdAt: row.created_at,
    eventType: row.event_type,
    outcome: row.outcome,
    entityType: row.entity_type,
    entityId: row.entity_id,
    campaignId: row.campaign_id,
    details,
  };
}

const LEAD_STATUSES: readonly LeadSubmissionStatus[] = ["processing", "completed", "failed"];
const CONVERSION_STATUSES: readonly ConversionJobStatus[] = [
  "pending",
  "leased",
  "retry_scheduled",
  "sent",
  "confirmed",
  "permanent_failure",
  "dry_run",
];

function countLeadStatuses(
  rows: StatusCountRow[],
): Record<LeadSubmissionStatus, number> & { total: number } {
  const counts = { processing: 0, completed: 0, failed: 0, total: 0 };
  for (const row of rows) {
    if (LEAD_STATUSES.includes(row.status as LeadSubmissionStatus)) {
      counts[row.status as LeadSubmissionStatus] = row.count;
      counts.total += row.count;
    }
  }
  return counts;
}

function countConversionStatuses(
  rows: StatusCountRow[],
): Record<ConversionJobStatus, number> & { total: number } {
  const counts = {
    pending: 0,
    leased: 0,
    retry_scheduled: 0,
    sent: 0,
    confirmed: 0,
    permanent_failure: 0,
    dry_run: 0,
    total: 0,
  };
  for (const row of rows) {
    if (CONVERSION_STATUSES.includes(row.status as ConversionJobStatus)) {
      counts[row.status as ConversionJobStatus] = row.count;
      counts.total += row.count;
    }
  }
  return counts;
}

function buildReportFilter(
  timeColumn: string,
  from: number | null,
  to: number | null,
  campaignId: string | null,
): { clauses: string[]; parameters: unknown[] } {
  const clauses: string[] = [];
  const parameters: unknown[] = [];
  if (from !== null) {
    clauses.push(`${timeColumn} >= ?`);
    parameters.push(from);
  }
  if (to !== null) {
    clauses.push(`${timeColumn} < ?`);
    parameters.push(to);
  }
  if (campaignId !== null) {
    clauses.push("campaign_id = ?");
    parameters.push(campaignId);
  }
  return { clauses, parameters };
}

function timeRangeClauses(
  filter: TimeRangeFilter,
  column: string,
): { clauses: string[]; parameters: unknown[] } {
  const from = optionalEpochMs(filter.from, "from");
  const to = optionalEpochMs(filter.to, "to");
  validateTimeRange(from, to);
  return buildReportFilter(column, from, to, null);
}

function addStatusFilter<T extends string>(
  clauses: string[],
  parameters: unknown[],
  column: string,
  requested: T | T[] | undefined,
  allowed: readonly T[],
): void {
  if (requested === undefined) return;
  const values = Array.isArray(requested) ? requested : [requested];
  if (values.length === 0) {
    clauses.push("1 = 0");
    return;
  }
  for (const value of values) {
    if (!allowed.includes(value)) {
      throw new GoogleZohoDatabaseError(`Unsupported ${column} filter.`);
    }
  }
  clauses.push(`${column} IN (${values.map(() => "?").join(", ")})`);
  parameters.push(...values);
}

function addEqualsFilter(
  clauses: string[],
  parameters: unknown[],
  column: string,
  value: string | undefined,
): void {
  if (value === undefined) return;
  clauses.push(`${column} = ?`);
  parameters.push(value);
}

function whereClause(clauses: string[]): string {
  return clauses.length > 0 ? ` WHERE ${clauses.join(" AND ")}` : "";
}

function pagination(input: { limit?: number; offset?: number }): { limit: number; offset: number } {
  return {
    limit: boundedLimit(input.limit),
    offset: nonNegativeInteger(input.offset ?? 0, "offset"),
  };
}

function boundedLimit(value = 100): number {
  const limit = positiveInteger(value, "limit");
  if (limit > MAX_LIST_LIMIT) {
    throw new GoogleZohoDatabaseError(`limit cannot exceed ${MAX_LIST_LIMIT}.`);
  }
  return limit;
}

function epochMs(value: number | Date, field: string): number {
  const milliseconds = value instanceof Date ? value.getTime() : value;
  if (!Number.isSafeInteger(milliseconds) || milliseconds < 0) {
    throw new GoogleZohoDatabaseError(`${field} must be a valid non-negative epoch millisecond.`);
  }
  return milliseconds;
}

function optionalEpochMs(value: number | Date | undefined, field: string): number | null {
  return value === undefined ? null : epochMs(value, field);
}

function validateTimeRange(from: number | null, to: number | null): void {
  if (from !== null && to !== null && from >= to) {
    throw new GoogleZohoDatabaseError("from must be earlier than to.");
  }
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new GoogleZohoDatabaseError(`${field} must be a positive integer.`);
  }
  return value;
}

function nonNegativeInteger(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new GoogleZohoDatabaseError(`${field} must be a non-negative integer.`);
  }
  return value;
}

function nonNegativeNumber(value: number, field: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new GoogleZohoDatabaseError(`${field} must be a finite non-negative number.`);
  }
  return value;
}

function requiredText(value: string, field: string, maxLength: number): string {
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength || containsControlCharacters(normalized)) {
    throw new GoogleZohoDatabaseError(
      `${field} must contain 1-${maxLength} printable characters.`,
    );
  }
  return normalized;
}

function optionalLabel(value: string | undefined, field: string, maxLength: number): string | null {
  return value === undefined ? null : requiredText(value, field, maxLength);
}

function opaqueId(value: string, field: string, maxLength: number): string {
  const normalized = requiredText(value, field, maxLength);
  if (normalized.length < 8 || !OPAQUE_ID_PATTERN.test(normalized)) {
    throw new GoogleZohoDatabaseError(`${field} must be an opaque identifier.`);
  }
  return normalized;
}

function optionalOpaqueId(
  value: string | undefined,
  field: string,
  maxLength: number,
): string | null {
  return value === undefined ? null : opaqueId(value, field, maxLength);
}

function sha256Hash(value: string, field: string): string {
  const normalized = value.trim().toLowerCase();
  if (!SHA256_HEX_PATTERN.test(normalized)) {
    throw new GoogleZohoDatabaseError(`${field} must be a hexadecimal SHA-256 digest.`);
  }
  return normalized;
}

function eventKeyValue(value: string): string {
  const normalized = requiredText(value, "eventKey", 128);
  if (!EVENT_KEY_PATTERN.test(normalized)) {
    throw new GoogleZohoDatabaseError("eventKey must be an opaque event identifier.");
  }
  return normalized;
}

function safeCode(value: string, field: string): string {
  const normalized = requiredText(value, field, 128);
  if (!EVENT_KEY_PATTERN.test(normalized)) {
    throw new GoogleZohoDatabaseError(`${field} contains unsupported characters.`);
  }
  return normalized;
}

function currency(value: string): string {
  const normalized = value.trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(normalized)) {
    throw new GoogleZohoDatabaseError("currencyCode must be a three-letter ISO currency code.");
  }
  return normalized;
}

function clickType(value: ClickIdType): ClickIdType {
  if (!(["gclid", "gbraid", "wbraid"] as const).includes(value)) {
    throw new GoogleZohoDatabaseError("clickIdType must be gclid, gbraid, or wbraid.");
  }
  return value;
}

function auditOutcome(value: AuditOutcome): AuditOutcome {
  if (!(["success", "failure", "ignored", "warning", "info"] as const).includes(value)) {
    throw new GoogleZohoDatabaseError("Unsupported audit outcome.");
  }
  return value;
}

function optionalRedactedText(value: string | undefined): string | null {
  if (value === undefined) return null;
  return redactText(value).slice(0, MAX_ERROR_LENGTH);
}

function redactAuditScalar(value: AuditScalar): AuditScalar {
  if (typeof value !== "string") return value;
  return redactText(value).slice(0, MAX_ERROR_LENGTH);
}

function redactText(value: string): string {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[REDACTED_EMAIL]")
    .replace(/(?:\+?\d[\s().-]*){7,15}/g, "[REDACTED_PHONE]")
    .replace(/\b(?:gclid|gbraid|wbraid|click_id|access_token|refresh_token|authorization)\s*[=:]\s*[^\s,;&]+/gi, (match) => {
      const separator = match.includes("=") ? "=" : ":";
      return `${match.split(/[=:]/, 1)[0]}${separator}[REDACTED]`;
    })
    .replace(/\bBearer\s+[^\s,;&]+/gi, "Bearer [REDACTED]")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function isSensitiveKey(key: string): boolean {
  return /(?:^|_)(?:email|phone|mobile|first_name|last_name|full_name|name|address|message|description|gclid|gbraid|wbraid|click_id|raw_click_id|access_token|refresh_token|token|secret|authorization|cookie|request_body|payload)(?:$|_)/i.test(
    key,
  );
}

function containsControlCharacters(value: string): boolean {
  return /[\u0000-\u001F\u007F]/.test(value);
}

function ensureDiagnosticRequestMatches(
  storedRequestId: string | null,
  receivedRequestId: string | null,
): void {
  if (storedRequestId && receivedRequestId && storedRequestId !== receivedRequestId) {
    throw new IdempotencyConflictError(
      "The diagnostic request ID does not match the upload request ID stored for this job.",
    );
  }
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    typeof error.code === "string" &&
    error.code.startsWith("SQLITE_CONSTRAINT_UNIQUE")
  );
}

function prepareDatabasePath(databasePath: string): void {
  if (databasePath === ":memory:") return;
  const directory = path.dirname(databasePath);
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  bestEffortChmod(directory, 0o700);
  const descriptor = openSync(databasePath, "a", 0o600);
  closeSync(descriptor);
  bestEffortChmod(databasePath, 0o600);
}

function secureDatabaseFiles(databasePath: string): void {
  if (databasePath === ":memory:") return;
  for (const file of [databasePath, `${databasePath}-wal`, `${databasePath}-shm`]) {
    bestEffortChmod(file, 0o600);
  }
}

function bestEffortChmod(filePath: string, mode: number): void {
  try {
    chmodSync(filePath, mode);
  } catch {
    // Windows ACLs and not-yet-created WAL sidecars may not support chmod.
  }
}
