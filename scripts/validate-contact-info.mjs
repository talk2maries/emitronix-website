#!/usr/bin/env node

import process from "node:process";

const suppliedBaseUrl = process.argv.find((value) => /^https?:\/\//i.test(value));
const baseUrl = new URL(suppliedBaseUrl || process.env.CONTACT_BASE_URL || "http://127.0.0.1:3000");
baseUrl.pathname = "/";
baseUrl.search = "";
baseUrl.hash = "";

const primaryDisplay = "+971 4 824 0002";
const primaryE164 = "+97148240002";
const primaryHref = `tel:${primaryE164}`;
const secondaryDisplay = "+971 55 982 8492";
const secondaryE164 = "+971559828492";
const secondaryHref = `tel:${secondaryE164}`;
const whatsappHref = "https://wa.me/971559828492";
const organizationId = "https://emitronix.ae/#organization";
const officeContactId = "https://emitronix.ae/#office-contact";
const mobileContactId = "https://emitronix.ae/#mobile-contact";
const errors = [];

function decodeEntities(value) {
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function textContent(value) {
  return decodeEntities(String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function attribute(attributes, name) {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return decodeEntities(match?.[1] ?? match?.[2] ?? match?.[3] ?? "");
}

function anchorElements(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: attribute(match[1], "href"),
    label: `${attribute(match[1], "aria-label")} ${textContent(match[2])}`.trim(),
  }));
}

function jsonLdBlocks(html, pathname) {
  const blocks = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attribute(match[1], "type").toLowerCase() !== "application/ld+json") continue;
    try {
      blocks.push(JSON.parse(decodeEntities(match[2].trim())));
    } catch (error) {
      errors.push(`${pathname}: invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`);
    }
  }
  return blocks;
}

function graphNodes(blocks) {
  return blocks.flatMap((block) => Array.isArray(block?.["@graph"]) ? block["@graph"] : [block]);
}

function hasType(node, type) {
  const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
  return types.includes(type);
}

function validateTelephoneValues(value, pathname, inheritedId) {
  if (!value || typeof value !== "object") return;
  const nodeId = value["@id"] || inheritedId;

  if ("telephone" in value) {
    if (![primaryE164, secondaryE164].includes(value.telephone)) {
      errors.push(`${pathname}: unexpected schema telephone ${JSON.stringify(value.telephone)}`);
    }
    if (value.telephone === secondaryE164 && nodeId !== mobileContactId) {
      errors.push(`${pathname}: secondary mobile is used outside the secondary ContactPoint`);
    }
  }

  Object.values(value).forEach((child) => {
    if (Array.isArray(child)) {
      child.forEach((item) => validateTelephoneValues(item, pathname, nodeId));
    } else {
      validateTelephoneValues(child, pathname, nodeId);
    }
  });
}

async function fetchLocal(pathname) {
  const response = await fetch(new URL(pathname, baseUrl), {
    headers: { "User-Agent": "Emitronix contact consistency validator" },
  });
  return { response, body: await response.text() };
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index]);
    }
  }));
}

async function validatePage(pathname) {
  const { response, body } = await fetchLocal(pathname);
  if (response.status !== 200) {
    errors.push(`${pathname}: expected 200, received ${response.status}`);
    return;
  }

  const anchors = anchorElements(body);
  const telephoneAnchors = anchors.filter((anchor) => anchor.href.startsWith("tel:"));
  const callAnchors = anchors.filter((anchor) =>
    !/whatsapp|واتساب/i.test(anchor.label) &&
    /\bcall(?: now| office| emitronix)?\b|talk to emitronix|اتصل الآن|اتصل بالمكتب|اتصل ب\s*emitronix|تحدث مع\s*emitronix/i.test(anchor.label),
  );

  if (!body.includes(primaryDisplay)) errors.push(`${pathname}: primary office number is not displayed`);
  if (!telephoneAnchors.some((anchor) => anchor.href === primaryHref)) {
    errors.push(`${pathname}: missing primary office link ${primaryHref}`);
  }
  telephoneAnchors
    .filter((anchor) => ![primaryHref, secondaryHref].includes(anchor.href))
    .forEach((anchor) => errors.push(`${pathname}: inconsistent telephone link ${anchor.href}`));
  callAnchors
    .filter((anchor) => anchor.href !== primaryHref)
    .forEach((anchor) => errors.push(`${pathname}: call CTA “${anchor.label}” uses ${anchor.href}`));
  if (!anchors.some((anchor) => anchor.href === whatsappHref)) {
    errors.push(`${pathname}: WhatsApp no longer uses the secondary mobile`);
  }

  const primaryPosition = body.indexOf(primaryDisplay);
  const secondaryPosition = body.indexOf(secondaryDisplay);
  if (secondaryPosition >= 0 && secondaryPosition < primaryPosition) {
    errors.push(`${pathname}: secondary mobile appears before the primary office number`);
  }

  const schemas = jsonLdBlocks(body, pathname);
  const nodes = graphNodes(schemas);
  const organization = nodes.find((node) => node?.["@id"] === organizationId && hasType(node, "Organization"));
  const officeContact = nodes.find((node) => node?.["@id"] === officeContactId && hasType(node, "ContactPoint"));
  const mobileContact = nodes.find((node) => node?.["@id"] === mobileContactId && hasType(node, "ContactPoint"));

  if (organization?.telephone !== primaryE164) errors.push(`${pathname}: Organization telephone is not the primary office`);
  if (officeContact?.telephone !== primaryE164) errors.push(`${pathname}: primary ContactPoint is missing or inconsistent`);
  if (mobileContact?.telephone !== secondaryE164) errors.push(`${pathname}: secondary ContactPoint is missing or inconsistent`);
  schemas.forEach((schema) => validateTelephoneValues(schema, pathname));

  if (pathname === "/contact") {
    const contactPage = nodes.find((node) => hasType(node, "ContactPage"));
    if (contactPage?.mainEntity?.["@id"] !== officeContactId) {
      errors.push(`${pathname}: ContactPage does not identify the primary office ContactPoint`);
    }
  }
}

async function main() {
  console.log(`Validating contact consistency at ${baseUrl.origin}`);
  const { response, body } = await fetchLocal("/sitemap.xml");
  if (response.status !== 200) throw new Error(`Sitemap returned ${response.status}`);

  const paths = [...body.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((match) => new URL(decodeEntities(match[1].trim())).pathname.replace(/\/+$/, "") || "/");
  if (paths.length === 0) throw new Error("No sitemap pages found");

  await mapLimit(paths, 6, validatePage);

  if (errors.length > 0) {
    errors.forEach((error) => console.error(`ERROR ${error}`));
    console.error(`Contact validation failed with ${errors.length} error(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Contact validation passed for ${paths.length} sitemap pages.`);
  console.log(`Primary: ${primaryDisplay} (${primaryHref}); secondary/WhatsApp: ${secondaryDisplay}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
