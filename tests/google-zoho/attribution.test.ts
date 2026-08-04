import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { attributionFormValues } from "../../components/AttributionHiddenFields";
import {
  ATTRIBUTION_VERSION,
  type AttributionSnapshot,
  type AttributionTouch,
} from "../../lib/googleZoho/types";
import {
  captureAttributionTouch,
  mergeAttribution,
  sanitizeAttributionSnapshot,
  selectClickId,
} from "../../lib/googleZoho/attribution";

const NOW = new Date("2026-08-04T12:00:00.000Z");

function touch(overrides: Partial<AttributionTouch> = {}): AttributionTouch {
  return {
    landingPageUrl: "https://emitronix.ae/warehouse-construction",
    visitedAt: NOW.toISOString(),
    ...overrides,
  };
}

function snapshot(overrides: Partial<AttributionSnapshot> = {}): AttributionSnapshot {
  const firstTouch = touch({ gclid: "first-gclid", campaignId: "1001" });
  return {
    version: ATTRIBUTION_VERSION,
    firstTouch,
    latestTouch: firstTouch,
    expiresAt: "2026-11-02T12:00:00.000Z",
    consent: {
      marketing: true,
      adUserData: true,
      version: "1",
      updatedAt: "2026-08-04T11:55:00.000Z",
    },
    ...overrides,
  };
}

describe("Google Ads attribution capture", () => {
  test("captures click identifiers, ValueTrack fields, and all UTM fields", () => {
    const result = captureAttributionTouch(
      "https://emitronix.ae/warehouse-construction?gclid=GCLID-1&gbraid=GBRAID_2&wbraid=WBRAID.3&gad_source=1&campaignid=1001&campaign_name=Warehouse%20Dubai&adgroupid=2002&keyword=warehouse%20contractor&matchtype=e&device=m&network=g&placement=example.com&creative=3003&utm_source=google&utm_medium=cpc&utm_campaign=warehouse_search&utm_term=warehouse_builder&utm_content=responsive_ad&email=customer%40example.com",
      "https://www.google.com/search?q=warehouse+builder#result",
      NOW,
    );

    assert.ok(result);
    assert.deepEqual(
      {
        gclid: result.gclid,
        gbraid: result.gbraid,
        wbraid: result.wbraid,
        gadSource: result.gadSource,
        campaignId: result.campaignId,
        campaignName: result.campaignName,
        adGroupId: result.adGroupId,
        keyword: result.keyword,
        matchType: result.matchType,
        device: result.device,
        network: result.network,
        placement: result.placement,
        creative: result.creative,
        googleAdsSource: result.googleAdsSource,
        utmSource: result.utmSource,
        utmMedium: result.utmMedium,
        utmCampaign: result.utmCampaign,
        utmTerm: result.utmTerm,
        utmContent: result.utmContent,
      },
      {
        gclid: "GCLID-1",
        gbraid: "GBRAID_2",
        wbraid: "WBRAID.3",
        gadSource: "1",
        campaignId: "1001",
        campaignName: "Warehouse Dubai",
        adGroupId: "2002",
        keyword: "warehouse contractor",
        matchType: "e",
        device: "m",
        network: "g",
        placement: "example.com",
        creative: "3003",
        googleAdsSource: "google_ads",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "warehouse_search",
        utmTerm: "warehouse_builder",
        utmContent: "responsive_ad",
      },
    );
    assert.equal(result.visitedAt, NOW.toISOString());
    assert.equal(result.referringUrl, "https://www.google.com/search");
    const storedLanding = new URL(result.landingPageUrl);
    assert.equal(storedLanding.searchParams.get("email"), null, "unknown/PII query parameters must not be retained");
    assert.equal(storedLanding.searchParams.get("gclid"), "GCLID-1");
    assert.equal(storedLanding.hash, "");
  });

  test("accepts campaign aliases, rejects malformed click IDs, and ignores unattributed visits", () => {
    const aliased = captureAttributionTouch(
      "https://emitronix.ae/?campaign_id=321&ad_group_id=654&match_type=p&utm_source=Google-Ads",
      undefined,
      NOW,
    );
    assert.ok(aliased);
    assert.equal(aliased.campaignId, "321");
    assert.equal(aliased.adGroupId, "654");
    assert.equal(aliased.matchType, "p");
    assert.equal(aliased.googleAdsSource, "google_ads");

    const malformed = captureAttributionTouch(
      "https://emitronix.ae/?gclid=bad%20click%20id&utm_source=google",
      undefined,
      NOW,
    );
    assert.ok(malformed);
    assert.equal(malformed.gclid, undefined);
    assert.equal(captureAttributionTouch("https://emitronix.ae/contact?name=Example", undefined, NOW), null);
    assert.equal(captureAttributionTouch("javascript:alert(1)", undefined, NOW), null);
  });
});

describe("first-touch, latest-touch, and expiry behavior", () => {
  test("preserves a valid first touch while replacing latest touch and extending expiry", () => {
    const first = touch({ gclid: "first-click", campaignId: "101" });
    const original = mergeAttribution(
      null,
      first,
      { marketing: true, adUserData: true },
      new Date("2026-08-01T00:00:00.000Z"),
      90,
    );
    const latest = touch({
      gbraid: "latest-braid",
      campaignId: "202",
      visitedAt: "2026-08-04T12:00:00.000Z",
    });
    const merged = mergeAttribution(
      original,
      latest,
      { marketing: true, adUserData: true, version: "2" },
      NOW,
      30,
    );

    assert.deepEqual(merged.firstTouch, first);
    assert.deepEqual(merged.latestTouch, latest);
    assert.equal(merged.expiresAt, "2026-09-03T12:00:00.000Z");
    assert.equal(merged.consent.version, "2");
  });

  test("starts a new first touch after the prior snapshot expires", () => {
    const expired = snapshot({ expiresAt: "2026-08-04T11:59:59.999Z" });
    const replacement = touch({ wbraid: "replacement-click", campaignId: "303" });
    const result = mergeAttribution(
      expired,
      replacement,
      { marketing: true, adUserData: true },
      NOW,
      90,
    );
    assert.deepEqual(result.firstTouch, replacement);
    assert.deepEqual(result.latestTouch, replacement);
  });
});

describe("server attribution sanitizer", () => {
  test("returns only bounded, recognized fields and strips referrer/landing PII", () => {
    const input = snapshot({
      firstTouch: {
        ...touch({
          gclid: "valid-click",
          landingPageUrl: "https://emitronix.ae/contact?gclid=valid-click&email=person%40example.com",
          referringUrl: "https://partner.example/path?customer=42#fragment",
        }),
        // Deliberately submitted by an untrusted client.
        customerEmail: "person@example.com",
      } as AttributionTouch,
      latestTouch: touch({
        gclid: "invalid click id",
        utmCampaign: `campaign-${"x".repeat(500)}`,
      }),
    });

    const result = sanitizeAttributionSnapshot(input, NOW);
    assert.ok(result);
    assert.equal((result.firstTouch as unknown as Record<string, unknown>).customerEmail, undefined);
    assert.equal(new URL(result.firstTouch.landingPageUrl).searchParams.get("email"), null);
    assert.equal(result.firstTouch.referringUrl, "https://partner.example/path");
    assert.equal(result.latestTouch.gclid, undefined);
    assert.equal(result.latestTouch.utmCampaign?.length, 300);
  });

  test("rejects expired, malformed, unsafe, version-mismatched, or unconsented snapshots", () => {
    assert.equal(sanitizeAttributionSnapshot(snapshot({ expiresAt: NOW.toISOString() }), NOW), null);
    assert.equal(
      sanitizeAttributionSnapshot(snapshot({ consent: { marketing: true, adUserData: false } }), NOW),
      null,
    );
    assert.equal(
      sanitizeAttributionSnapshot({ ...snapshot(), version: 999 }, NOW),
      null,
    );
    assert.equal(
      sanitizeAttributionSnapshot(
        snapshot({ firstTouch: touch({ landingPageUrl: "file:///etc/passwd" }) }),
        NOW,
      ),
      null,
    );
    assert.equal(sanitizeAttributionSnapshot({ version: ATTRIBUTION_VERSION }, NOW), null);
  });
});

test("click identifier selection has a deterministic gclid, gbraid, wbraid priority", () => {
  assert.deepEqual(selectClickId({ gclid: "g", gbraid: "b", wbraid: "w" }), { type: "gclid", value: "g" });
  assert.deepEqual(selectClickId({ gbraid: "b", wbraid: "w" }), { type: "gbraid", value: "b" });
  assert.deepEqual(selectClickId({ wbraid: "w" }), { type: "wbraid", value: "w" });
  assert.equal(selectClickId({}), null);
});

describe("hidden attribution form parsing", () => {
  test("parses the attribution payload and explicit consent evidence", () => {
    const value = snapshot();
    const data = new FormData();
    data.set("attributionPayload", JSON.stringify(value));
    data.set("adUserDataConsent", "granted");
    data.set("attributionConsentVersion", "3");
    data.set("attributionConsentUpdatedAt", "2026-08-04T11:55:00.000Z");

    assert.deepEqual(attributionFormValues(data), {
      attribution: value,
      adUserDataConsent: true,
      consentVersion: "3",
      consentUpdatedAt: "2026-08-04T11:55:00.000Z",
    });
  });

  test("does not treat malformed JSON or non-exact consent strings as trusted", () => {
    const data = new FormData();
    data.set("attributionPayload", "{not-json");
    data.set("adUserDataConsent", "true");
    assert.deepEqual(attributionFormValues(data), {
      attribution: null,
      adUserDataConsent: false,
    });
  });
});
