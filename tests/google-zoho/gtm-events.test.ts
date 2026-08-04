import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";

import {
  buildSalesIqLeadCapturedEvent,
  buildLeadDataLayerEvents,
  classifyContactHref,
  emitGtmEvent,
  pushServerConfirmedLead,
  resetGtmDedupeForTests,
  safePageContext,
} from "../../lib/gtm/dataLayer";
import type { AttributionSnapshot } from "../../lib/googleZoho/types";

function snapshot(overrides: Partial<AttributionSnapshot["latestTouch"]> = {}): AttributionSnapshot {
  return {
    version: 1,
    firstTouch: {
      landingPageUrl: "https://emitronix.ae/warehouse-construction",
      visitedAt: "2026-08-04T10:00:00.000Z",
      gclid: "RAW-FIRST-CLICK-ID",
    },
    latestTouch: {
      landingPageUrl: "https://emitronix.ae/contact",
      visitedAt: "2026-08-04T10:05:00.000Z",
      gclid: "RAW-LATEST-CLICK-ID",
      campaignId: "123456789",
      campaignName: "Warehouse Search",
      adGroupId: "987654321",
      keyword: "warehouse contractor dubai",
      matchType: "e",
      device: "m",
      network: "g",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "warehouse_search",
      ...overrides,
    },
    expiresAt: "2026-11-02T10:05:00.000Z",
    consent: { marketing: true, adUserData: true, version: "3" },
  };
}

function memoryRuntime() {
  const values = new Map<string, string>();
  return {
    dataLayer: [] as unknown[],
    sessionStorage: {
      getItem: (key: string) => values.get(key) || null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    },
  };
}

describe("GTM server-confirmed lead events", () => {
  test("builds the required PII-safe event contract from a server lead ID", () => {
    const events = buildLeadDataLayerEvents({
      result: {
        ok: true,
        leadId: "lead-123",
        submissionId: "submission-456",
        crmAction: "updated",
        replayed: false,
      },
      formName: "contact_form",
      attribution: snapshot(),
      pageContext: safePageContext({
        href: "https://emitronix.ae/contact?email=person@example.com#gclid=secret",
        pathname: "/contact",
        referrer: "https://google.com/search?q=warehouse",
      }),
    });

    assert.ok(events);
    assert.deepEqual(events.generateLead, {
      event: "generate_lead",
      event_id: "lead-123",
      lead_id: "lead-123",
      submission_id: "submission-456",
      form_name: "contact_form",
      lead_source: "google_ads",
      page_location: "https://emitronix.ae/contact",
      page_path: "/contact",
      page_referrer: "https://google.com/search",
      gclid_available: true,
      gbraid_available: false,
      wbraid_available: false,
      match_type: "e",
      device: "m",
      network: "g",
      lead_value: 250,
      currency: "AED",
    });
    assert.equal(events.crmLeadCreated.crm_action, "updated");
    const serialized = JSON.stringify(events);
    assert.doesNotMatch(serialized, /RAW-(?:FIRST|LATEST)-CLICK-ID/);
    assert.doesNotMatch(serialized, /person@example\.com/);
    assert.doesNotMatch(serialized, /\?email=|#gclid=|\?q=/);
  });

  test("omits untrusted URL-derived marketing text and numeric identifiers", () => {
    const events = buildLeadDataLayerEvents({
      result: { ok: true, leadId: "lead-private", submissionId: "submission-private", replayed: false },
      formName: "blog_enquiry_form",
      attribution: snapshot({
        campaignName: "person@example.com",
        keyword: "+971 50 111 2233",
        campaignId: "971501112233",
        adGroupId: "visitor@example.com",
        utmCampaign: "John Smith Villa 12",
      }),
      pageContext: safePageContext({ href: "https://emitronix.ae/blog/test", pathname: "/blog/test" }),
    });
    assert.ok(events);
    assert.equal(events.generateLead.campaign_name, undefined);
    assert.equal(events.generateLead.keyword, undefined);
    assert.equal(events.generateLead.campaign_id, undefined);
    assert.equal(events.generateLead.ad_group_id, undefined);
    assert.equal(events.generateLead.utm_campaign, undefined);
  });

  test("rejects customer-shaped IDs and redacts customer-shaped URL paths", () => {
    assert.equal(
      buildLeadDataLayerEvents({
        result: {
          ok: true,
          leadId: "lead-canonical",
          eventId: "lead-divergent-legacy-alias",
          submissionId: "submission-safe",
          replayed: false,
        },
        formName: "contact_form",
        attribution: null,
      }),
      null,
      "the current and compatibility lead ID fields must never diverge",
    );
    assert.equal(
      buildLeadDataLayerEvents({
        result: { ok: true, leadId: "person@example.com", submissionId: "submission-safe", replayed: false },
        formName: "contact_form",
        attribution: snapshot(),
      }),
      null,
    );
    assert.equal(
      buildLeadDataLayerEvents({
        result: { ok: true, leadId: "lead-safe", submissionId: "+971 50 111 2233", replayed: false },
        formName: "contact_form",
        attribution: snapshot(),
      }),
      null,
    );
    assert.equal(
      buildSalesIqLeadCapturedEvent({ leadId: "visitor@example.com" }),
      null,
    );
    assert.ok(
      buildLeadDataLayerEvents({
        result: {
          ok: true,
          leadId: "123e4567-e89b-42d3-a456-123456789012",
          submissionId: "123e4567-e89b-42d3-a456-123456789013",
          replayed: false,
        },
        formName: "contact_form",
        attribution: null,
      }),
      "valid server UUIDs must not be mistaken for phone numbers",
    );
    assert.deepEqual(
      safePageContext({
        href: "https://emitronix.ae/contact/person%40example.com?utm_source=google",
        pathname: "/contact/person%40example.com",
      }),
      {
        page_location: "https://emitronix.ae/redacted",
        page_path: "/redacted",
      },
    );
  });

  test("emits exactly once, supports analytics-only consent, and rejects replays", () => {
    resetGtmDedupeForTests();
    const runtime = memoryRuntime();
    const input = {
      result: {
        ok: true,
        leadId: "lead-once",
        submissionId: "submission-once",
        crmAction: "created" as const,
        replayed: false,
      },
      formName: "contact_form" as const,
      attribution: snapshot(),
      pageContext: safePageContext({ href: "https://emitronix.ae/contact", pathname: "/contact" }),
      consent: { analytics: true, marketing: false, functional: false },
      runtime,
    };

    assert.deepEqual(pushServerConfirmedLead(input), { generateLead: true, crmLeadCreated: true });
    assert.deepEqual(pushServerConfirmedLead(input), { generateLead: false, crmLeadCreated: false });
    assert.equal(runtime.dataLayer.length, 2);
    assert.equal((runtime.dataLayer[0] as Record<string, unknown>).gclid_available, false);
    assert.equal((runtime.dataLayer[0] as Record<string, unknown>).campaign_id, undefined);

    resetGtmDedupeForTests();
    assert.deepEqual(pushServerConfirmedLead(input), { generateLead: false, crmLeadCreated: false });
    assert.equal(runtime.dataLayer.length, 2, "sessionStorage must suppress events after the in-memory cache is reset");

    resetGtmDedupeForTests();
    const throwingStorageRuntime = {
      dataLayer: [] as unknown[],
      sessionStorage: {
        getItem: () => { throw new Error("storage unavailable"); },
        setItem: () => { throw new Error("storage unavailable"); },
      },
    };
    const fallbackInput = {
      ...input,
      result: { ...input.result, leadId: "lead-memory-fallback", submissionId: "submission-memory-fallback" },
      runtime: throwingStorageRuntime,
    };
    assert.deepEqual(pushServerConfirmedLead(fallbackInput), { generateLead: true, crmLeadCreated: true });
    assert.deepEqual(pushServerConfirmedLead(fallbackInput), { generateLead: false, crmLeadCreated: false });
    assert.equal(throwingStorageRuntime.dataLayer.length, 2, "in-memory dedupe must survive blocked sessionStorage");

    const replayRuntime = memoryRuntime();
    assert.deepEqual(
      pushServerConfirmedLead({ ...input, result: { ...input.result, leadId: "lead-replay", replayed: true }, runtime: replayRuntime }),
      { generateLead: false, crmLeadCreated: false },
    );
    assert.equal(replayRuntime.dataLayer.length, 0);
  });

  test("never lets a broken dataLayer change the business result", () => {
    resetGtmDedupeForTests();
    const brokenRuntime = {
      dataLayer: { push: () => { throw new Error("blocked"); } } as unknown as unknown[],
    };
    assert.doesNotThrow(() => {
      assert.equal(
        emitGtmEvent(
          { event: "form_error", error_type: "api" },
          {
            policy: "analytics",
            consent: { analytics: true, marketing: false, functional: false },
            runtime: brokenRuntime,
          },
        ),
        false,
      );
    });
  });
});

describe("GTM business-contact click classification", () => {
  const config = {
    phoneNumbers: ["+97148240002", "+971559828492"],
    whatsappNumbers: ["+971559828492"],
    emailAddresses: ["info@emitronix.ae"],
  };

  test("classifies only approved business contact destinations", () => {
    assert.deepEqual(classifyContactHref("tel:+97148240002", config), {
      event: "phone_click",
      click_url: "tel:+97148240002",
      phone_number: "+97148240002",
    });
    assert.deepEqual(classifyContactHref("https://wa.me/971559828492?text=Hello", config), {
      event: "whatsapp_click",
      click_url: "https://wa.me/971559828492",
      phone_number: "+971559828492",
    });
    assert.deepEqual(classifyContactHref("https://api.whatsapp.com/send?phone=971559828492&text=Hello", config), {
      event: "whatsapp_click",
      click_url: "https://wa.me/971559828492",
      phone_number: "+971559828492",
    });
    assert.deepEqual(classifyContactHref("mailto:info@emitronix.ae?subject=Project", config), {
      event: "email_click",
      click_url: "mailto:info@emitronix.ae",
    });
  });

  test("excludes blog shares, unknown contacts, and unsafe links", () => {
    assert.equal(classifyContactHref("https://wa.me/?text=Share%20this%20article", config), null);
    assert.equal(classifyContactHref("tel:+971501234567", config), null);
    assert.equal(classifyContactHref("mailto:visitor@example.com", config), null);
    assert.equal(classifyContactHref("javascript:alert(1)", config), null);
    assert.equal(classifyContactHref("https://example.com/", config), null);
  });
});

test("both commercial forms use the canonical GTM response contract", async () => {
  const [contact, blog, contactRoute] = await Promise.all([
    readFile(new URL("../../components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../components/BlogEnquiryPopup.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../app/api/contact/route.ts", import.meta.url), "utf8"),
  ]);
  for (const source of [contact, blog]) {
    assert.match(source, /pushFormSubmitEvent\(/);
    assert.match(source, /pushServerConfirmedLead\(/);
    assert.match(source, /pushFormErrorEvent\(/);
    assert.match(source, /name="submissionId"/);
    assert.match(source, /data-gtm-form-name=/);
  }
  assert.doesNotMatch(contactRoute, /crmLeadId/, "Zoho record IDs must remain server-side");
});
