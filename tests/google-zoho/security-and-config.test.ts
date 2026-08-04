import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, test } from "node:test";

import {
  ConversionEventConfigError,
  conversionEvents,
  resolveConversionEvent,
} from "../../config/google-zoho-conversions";
import {
  WebhookAuthenticationError,
  buildWebhookSignature,
  canonicalLeadLinkMatches,
  canonicalLeadTransactionId,
  enhancedConversionIdentifiers,
  normalizeEmail,
  normalizePhone,
  sha256Hex,
  verifyWebhookSignature,
} from "../../lib/googleZoho/security";

const NOW = new Date("2026-08-04T12:00:00.000Z");

describe("enhanced conversion normalization and hashing", () => {
  test("normalizes email and UAE/international phone inputs", () => {
    assert.equal(normalizeEmail(" First.Last@GMAIL.com "), "firstlast@gmail.com");
    assert.equal(normalizeEmail("A.User@Example.COM"), "a.user@example.com");
    assert.equal(normalizePhone("050 123 4567"), "+971501234567");
    assert.equal(normalizePhone("00971 (50) 123-4567"), "+971501234567");
    assert.equal(normalizePhone("+1 (415) 555-2671"), "+14155552671");
    assert.equal(normalizePhone("415 555 2671"), "", "ambiguous non-UAE local numbers must not be guessed");
    assert.equal(normalizePhone("12345678"), "", "ambiguous local numbers must not be treated as E.164");
    assert.equal(normalizePhone("invalid"), "");
  });

  test("hashes normalized identifiers only when ad-user-data consent is granted", () => {
    const email = "First.Last@gmail.com";
    const phone = "050 123 4567";
    const result = enhancedConversionIdentifiers({ email, phone, consent: true });
    assert.deepEqual(result, [
      {
        emailAddress: createHash("sha256").update("firstlast@gmail.com", "utf8").digest("hex"),
      },
      {
        phoneNumber: createHash("sha256").update("+971501234567", "utf8").digest("hex"),
      },
    ]);
    assert.match(result[0].emailAddress || "", /^[a-f0-9]{64}$/);
    assert.deepEqual(enhancedConversionIdentifiers({ email, phone, consent: false }), []);
    assert.deepEqual(enhancedConversionIdentifiers({ email: "not-an-email", phone: "x", consent: true }), []);
    assert.deepEqual(
      enhancedConversionIdentifiers({ phone: "415 555 2671", consent: true }),
      [],
      "ambiguous phones must not be uploaded as enhanced-conversion identifiers",
    );
    assert.equal(sha256Hex("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
});

describe("Zoho webhook HMAC authentication", () => {
  const secret = "test-secret-that-is-at-least-32-characters-long";
  const timestamp = "2026-08-04T12:00:00.000Z";
  const nonce = "nonce-value-1234567890";
  const rawBody = JSON.stringify({ module: "Leads", recordId: "1234567890123456789" });

  test("accepts a valid signature, including the sha256= header form", () => {
    const signature = buildWebhookSignature(secret, timestamp, nonce, rawBody);
    assert.equal(signature.length, 64);
    assert.equal(
      verifyWebhookSignature({
        secret,
        timestamp,
        nonce,
        rawBody,
        signature: `sha256=${signature.toUpperCase()}`,
        now: new Date("2026-08-04T12:04:59.000Z"),
      }),
      true,
    );
  });

  test("accepts signed Unix timestamps in both seconds and milliseconds", () => {
    for (const unixTimestamp of ["1785844800", "1785844800000"]) {
      const signature = buildWebhookSignature(secret, unixTimestamp, nonce, rawBody);
      assert.equal(
        verifyWebhookSignature({
          secret,
          timestamp: unixTimestamp,
          nonce,
          rawBody,
          signature,
          now: NOW,
        }),
        true,
      );
    }
  });

  test("rejects tampering, stale timestamps, invalid nonces, and weak secrets", () => {
    const signature = buildWebhookSignature(secret, timestamp, nonce, rawBody);
    assert.throws(
      () => verifyWebhookSignature({ secret, timestamp, nonce, rawBody: `${rawBody} `, signature, now: new Date(timestamp) }),
      WebhookAuthenticationError,
    );
    assert.throws(
      () =>
        verifyWebhookSignature({
          secret,
          timestamp,
          nonce,
          rawBody,
          signature,
          now: new Date("2026-08-04T12:05:01.000Z"),
        }),
      /outside the allowed window/,
    );
    assert.throws(
      () => verifyWebhookSignature({ secret, timestamp, nonce: "too-short", rawBody, signature, now: new Date(timestamp) }),
      /Invalid webhook nonce/,
    );
    assert.throws(
      () => verifyWebhookSignature({ secret: "weak", timestamp, nonce, rawBody, signature, now: new Date(timestamp) }),
      /at least 32 characters/,
    );
  });
});

describe("CRM milestone conversion configuration", () => {
  test("keeps every milestone disabled by default", () => {
    assert.deepEqual(
      Object.fromEntries(Object.entries(conversionEvents).map(([key, value]) => [key, value.enabled])),
      {
        qualified_lead: false,
        meeting_booked: false,
        quotation_submitted: false,
        deal_won: false,
      },
    );
    assert.throws(
      () => resolveConversionEvent("qualified_lead", { leadStatus: "Qualified" }, { NODE_ENV: "test" }),
      (error) => error instanceof ConversionEventConfigError && /not enabled/.test(error.message),
    );
  });

  test("maps enabled lead milestones to approved AED values and action IDs", () => {
    const env = {
      NODE_ENV: "test",
      GOOGLE_CONVERSION_ENABLED_EVENTS: "qualified_lead,meeting_booked,quotation_submitted",
      GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID: "101",
      GOOGLE_CONVERSION_ACTION_MEETING_BOOKED_ID: "202",
      GOOGLE_CONVERSION_ACTION_QUOTATION_SUBMITTED_ID: "303",
    } as NodeJS.ProcessEnv;

    assert.deepEqual(resolveConversionEvent("qualified_lead", { leadStatus: "Qualified" }, env), {
      definition: conversionEvents.qualified_lead,
      conversionActionId: "101",
      value: 250,
      currency: "AED",
    });
    assert.equal(resolveConversionEvent("meeting_booked", { leadStatus: "Site Visit Confirmed" }, env).value, 500);
    assert.equal(resolveConversionEvent("quotation_submitted", { leadStatus: "Quoted" }, env).value, 1000);
  });

  test("enforces CRM status/stage, action IDs, and actual Won value", () => {
    const env = {
      NODE_ENV: "test",
      GOOGLE_CONVERSION_ENABLED_EVENTS: "qualified_lead,deal_won",
      GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID: "101",
      GOOGLE_CONVERSION_ACTION_DEAL_WON_ID: "404",
    } as NodeJS.ProcessEnv;

    assert.throws(
      () => resolveConversionEvent("qualified_lead", { leadStatus: "Contacted" }, env),
      /Lead status is not eligible/,
    );
    assert.throws(
      () => resolveConversionEvent("deal_won", { dealStage: "Negotiation", actualDealAmount: 120_000 }, env),
      /Deal stage is not eligible/,
    );
    assert.equal(
      resolveConversionEvent("deal_won", { dealStage: "Closed Won", actualDealAmount: 120_000 }, env).value,
      120_000,
    );
    assert.throws(
      () => resolveConversionEvent("deal_won", { dealStage: "Closed Won", actualDealAmount: 0 }, env),
      /positive conversion value/,
    );
    assert.throws(
      () => resolveConversionEvent("unsupported", {}, env),
      /Unsupported conversion event/,
    );
    assert.throws(
      () =>
        resolveConversionEvent(
          "qualified_lead",
          { leadStatus: "Qualified" },
          { ...env, GOOGLE_CONVERSION_ACTION_QUALIFIED_LEAD_ID: "customers/invalid" },
        ),
      /Missing or invalid/,
    );
  });
});

test("canonical lead transaction IDs are preserved exactly and fail closed", () => {
  const leadId = "123e4567-e89b-42d3-a456-426614174000";
  assert.equal(canonicalLeadTransactionId(leadId), leadId);
  assert.throws(() => canonicalLeadTransactionId("person@example.com"), /opaque 1-64 character/);
  assert.throws(() => canonicalLeadTransactionId(`lead-${"x".repeat(64)}`), /opaque 1-64 character/);
  assert.throws(() => canonicalLeadTransactionId(" lead-123"), /opaque 1-64 character/);
});

test("canonical lead linkage requires the same Zoho field, ledger row, and v2 transaction ID", () => {
  const base = {
    module: "Leads" as const,
    zohoRecordId: "1234567890123456789",
    zohoLeadId: "lead-123",
    sourceLeadId: "lead-123",
    sourceZohoRecordId: "1234567890123456789",
    identityVersion: 2 as const,
    transactionId: "lead-123",
  };
  assert.equal(canonicalLeadLinkMatches(base), true);
  assert.equal(canonicalLeadLinkMatches({ ...base, zohoLeadId: undefined }), false);
  assert.equal(canonicalLeadLinkMatches({ ...base, zohoLeadId: "lead-other" }), false);
  assert.equal(canonicalLeadLinkMatches({ ...base, sourceZohoRecordId: "9999999999999999999" }), false);
  assert.equal(canonicalLeadLinkMatches({ ...base, transactionId: "legacy-order-id" }), false);
  assert.equal(
    canonicalLeadLinkMatches({
      ...base,
      module: "Deals",
      zohoRecordId: "7777777777777777777",
      sourceZohoRecordId: "1234567890123456789",
    }),
    true,
    "a Deal links through its copied lead ID rather than the originating Lead's Zoho record ID",
  );
});
