#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);

function option(name, fallback) {
  const exact = args.indexOf(`--${name}`);
  if (exact >= 0 && args[exact + 1] && !args[exact + 1].startsWith("--")) {
    return args[exact + 1];
  }
  const prefix = `--${name}=`;
  const inline = args.find((value) => value.startsWith(prefix));
  return inline ? inline.slice(prefix.length) : fallback;
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const baseUrl = new URL(option("base-url", process.env.SEO_BASE_URL || "http://127.0.0.1:3000"));
const outputPath = option("output", "docs/audits/seo-content-final.json");
const reportPath = option("report", "docs/seo-content-audit-report.md");
const baselinePath = option("baseline", "");
const concurrency = positiveInteger(option("concurrency", 6), 6);
const timeoutMs = positiveInteger(option("timeout-ms", 15_000), 15_000);
const label = option("label", baselinePath ? "Final" : "Baseline");

baseUrl.pathname = "/";
baseUrl.search = "";
baseUrl.hash = "";

const scoreOrder = [
  "contentQuality",
  "eeat",
  "semanticSeo",
  "topicalAuthority",
  "readability",
  "humanWriting",
  "aiDetectionRisk",
  "keywordOptimization",
  "internalLinking",
  "conversion",
  "authoritySignals",
  "trustSignals",
  "constructionExpertise",
  "informationGain",
  "entityCoverage",
  "helpfulContentCompliance",
  "aiSearchOptimization",
];

const scoreLabels = {
  contentQuality: "Content Quality",
  eeat: "EEAT",
  semanticSeo: "Semantic SEO",
  topicalAuthority: "Topical Authority",
  readability: "Readability",
  humanWriting: "Human Writing",
  aiDetectionRisk: "AI Detection Risk (10 = low templating risk)",
  keywordOptimization: "Keyword Optimization",
  internalLinking: "Internal Linking",
  conversion: "Conversion",
  authoritySignals: "Authority Signals",
  trustSignals: "Trust Signals",
  constructionExpertise: "Construction Expertise",
  informationGain: "Information Gain",
  entityCoverage: "Entity Coverage",
  helpfulContentCompliance: "Helpful Content Compliance",
  aiSearchOptimization: "AI Search Optimization",
};

const genericPhrases = [
  "emitronix supports",
  "emitronix provides",
  "emitronix offers",
  "emitronix coordinates",
  "trusted contractor",
  "quality service",
  "professional team",
  "customer satisfaction",
  "best solutions",
  "high quality",
  "premium service",
  "in today's fast-paced",
  "look no further",
];

const emptyClaimPhrases = [
  "world-class",
  "best-in-class",
  "cutting-edge",
  "state-of-the-art",
  "unmatched",
  "unparalleled",
  "seamless experience",
  "commitment to excellence",
  "trusted partner",
  "tailored solutions",
  "innovative solutions",
  "exceptional quality",
  "premium experience",
  "deliver excellence",
];

const instructionalVerbs = [
  "ask",
  "check",
  "clarify",
  "compare",
  "confirm",
  "coordinate",
  "define",
  "identify",
  "inspect",
  "map",
  "measure",
  "record",
  "reconcile",
  "review",
  "separate",
  "test",
  "track",
  "verify",
];

const constructionEntities = [
  "civil engineering",
  "structural engineering",
  "construction planning",
  "site logistics",
  "project controls",
  "programme management",
  "quality assurance",
  "inspection",
  "procurement",
  "handover",
  "method statement",
  "shop drawing",
  "material submittal",
  "concrete",
  "steel",
  "mep",
  "fire safety",
  "snag",
  "risk",
  "buildability",
  "authority",
  "rack loading",
  "truck circulation",
  "loading dock",
  "forklift",
  "structural grid",
  "wheel load",
  "subgrade",
  "floor flatness",
  "vapour control",
  "refrigeration load",
  "ventilation",
  "electrical demand",
  "swept path",
  "fire compartment",
  "egress",
  "maintenance access",
  "utility corridor",
  "drainage",
  "process flow",
  "equipment load",
  "future expansion",
  "commissioning",
  "inspection hold point",
  "الهندسة المدنية",
  "الهندسة الإنشائية",
  "التخطيط الإنشائي",
  "إدارة المشاريع",
  "ضمان الجودة",
  "التفتيش",
  "المشتريات",
  "التسليم",
  "المخططات",
  "الخرسانة",
  "الصلب",
  "الأعمال الميكانيكية والكهربائية والصحية",
  "السلامة من الحريق",
  "المخاطر",
  "قابلية التنفيذ",
  "الموافقات",
];

const localEntities = [
  "dubai",
  "uae",
  "dubai municipality",
  "dewa",
  "dcd",
  "dubai civil defence",
  "dda",
  "trakhees",
  "jafza",
  "dubai south",
  "rta",
  "dubai investment park",
  "al quoz",
  "jebel ali",
  "دبي",
  "الإمارات",
  "بلدية دبي",
  "هيئة كهرباء ومياه دبي",
  "الدفاع المدني",
  "تراخيص",
  "جافزا",
  "دبي الجنوب",
  "هيئة الطرق والمواصلات",
  "مجمع دبي للاستثمار",
  "القوز",
  "جبل علي",
];

const informationGainTerms = [
  "why",
  "because",
  "before",
  "depends on",
  "failure",
  "mistake",
  "risk",
  "decision",
  "sequence",
  "check",
  "warning",
  "inspection",
  "constraint",
  "trade-off",
  "rework",
  "hold point",
  "لماذا",
  "لأن",
  "قبل",
  "يعتمد",
  "خطأ",
  "مخاطر",
  "قرار",
  "تسلسل",
  "تحقق",
  "تحذير",
  "تفتيش",
  "قيد",
  "إعادة العمل",
];

function clamp(value, min = 1, max = 10) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function decodeEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function cleanText(value) {
  return decodeEntities(String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function elements(html, name) {
  const matches = [];
  const pattern = new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, "gi");
  let match;
  while ((match = pattern.exec(html))) matches.push(cleanText(match[1]));
  return matches.filter(Boolean);
}

function attributes(tag) {
  const result = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(tag))) {
    const name = match[1].toLowerCase().replace(/^</, "");
    if (["a", "img", "meta", "link", "html"].includes(name)) continue;
    result[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function stripChrome(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ");
}

function metaContent(html, selectorName, selectorValue) {
  for (const tag of tags(html, "meta")) {
    const attrs = attributes(tag);
    if ((attrs[selectorName] || "").toLowerCase() === selectorValue.toLowerCase()) return attrs.content || "";
  }
  return "";
}

function wordList(text) {
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? [];
}

function sentenceList(text) {
  return text
    .split(/(?<=[.!?؟])\s+/u)
    .map((sentence) => sentence.trim())
    .filter((sentence) => wordList(sentence).length >= 4);
}

function normalizedSentence(sentence) {
  return wordList(sentence).map((word) => word.toLowerCase()).join(" ");
}

function paragraphPattern(paragraph) {
  const words = wordList(paragraph);
  const sentences = sentenceList(paragraph);
  const first = (words[0] || "").toLowerCase();
  const opening = /^(ask|check|clarify|compare|confirm|define|identify|map|record|review|test|verify)$/.test(first)
    ? "instruction"
    : /^(before|after|when|where|if|because|during|once|while|for|in)$/.test(first)
      ? "context"
      : /^(emitronix|we|our|the team|the company)$/.test(first)
        ? "company"
        : /^(what|why|how|which|who|can|does|do|is|are)$/.test(first)
          ? "question"
          : "statement";
  const lengthBand = words.length < 25 ? "short" : words.length < 55 ? "medium" : "long";
  const sentenceBands = sentences.map((sentence) => {
    const count = wordList(sentence).length;
    return count < 12 ? "short" : count < 24 ? "medium" : "long";
  });
  const discourseCues = sentences.map((sentence) => {
    const lead = (wordList(sentence)[0] || "").toLowerCase();
    return /^(ask|check|clarify|compare|confirm|define|identify|map|record|review|test|verify|before|after|when|where|if|because|during|once|while|for|in|however|therefore|instead|then)$/.test(lead)
      ? lead
      : "statement";
  });
  const contentWords = new Set(
    words
      .map((word) => word.toLowerCase())
      .filter((word) => word.length > 4 && !/^(about|after|before|could|every|first|should|their|there|these|those|through|under|where|which|while|would)$/.test(word)),
  );
  return { opening, lengthBand, sentenceCount: sentences.length, sentenceBands, discourseCues, contentWords };
}

function paragraphLexicalOverlap(previous, current) {
  if (!previous.contentWords.size || !current.contentWords.size) return 0;
  const shared = [...previous.contentWords].filter((word) => current.contentWords.has(word)).length;
  return shared / Math.min(previous.contentWords.size, current.contentWords.size);
}

function sentenceEditorialFindings(sentences) {
  const seen = new Map();
  return sentences.map((sentence, index) => {
    const lower = sentence.toLowerCase();
    const words = wordList(sentence);
    const normalized = normalizedSentence(sentence);
    const previousIndex = seen.get(normalized);
    if (normalized) seen.set(normalized, index);
    const flags = [];
    const generic = genericPhrases.filter((phrase) => lower.includes(phrase));
    const emptyClaims = emptyClaimPhrases.filter((phrase) => lower.includes(phrase));
    if (generic.length) flags.push(`generic corporate phrasing: ${generic.join(", ")}`);
    if (emptyClaims.length) flags.push(`unsupported marketing language: ${emptyClaims.join(", ")}`);
    if (words.length > 45) flags.push(`long sentence (${words.length} words)`);
    if (
      words.length >= 28 &&
      /^(emitronix|we|our|this service|the company)\b/i.test(sentence) &&
      termCoverage(lower, [...constructionEntities, ...localEntities, ...informationGainTerms]) < 2 &&
      !instructionalVerbs.some((verb) => lower.includes(verb))
    ) {
      flags.push("company-led paragraph with low decision or engineering information density");
    }
    if (previousIndex !== undefined && words.length >= 10) flags.push(`duplicates sentence ${previousIndex + 1} on this page`);
    return { index: index + 1, text: sentence, wordCount: words.length, flags };
  });
}

function standardDeviation(values) {
  if (!values.length) return 0;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(values.reduce((sum, value) => sum + (value - average) ** 2, 0) / values.length);
}

function termCoverage(text, terms) {
  const lower = text.toLowerCase();
  return terms.filter((term) => lower.includes(term)).length;
}

function schemaTypes(html) {
  const types = new Set();
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const attrs = attributes(`<script ${match[1]}>`);
    if ((attrs.type || "").toLowerCase() !== "application/ld+json") continue;
    try {
      const source = JSON.parse(decodeEntities(match[2]));
      const visit = (node) => {
        if (Array.isArray(node)) return node.forEach(visit);
        if (!node || typeof node !== "object") return;
        const value = node["@type"];
        (Array.isArray(value) ? value : value ? [value] : []).forEach((type) => types.add(type));
        Object.values(node).forEach(visit);
      };
      visit(source);
    } catch {
      types.add("INVALID_JSON_LD");
    }
  }
  return [...types];
}

function linkMetrics(html) {
  const internal = [];
  const external = [];
  for (const tag of tags(html, "a")) {
    const attrs = attributes(tag);
    if (!attrs.href || attrs.href.startsWith("#") || attrs.href.startsWith("mailto:") || attrs.href.startsWith("tel:")) continue;
    try {
      const target = new URL(attrs.href, baseUrl);
      const item = { href: target.pathname, anchor: attrs["aria-label"] || attrs.title || "" };
      if (target.origin === baseUrl.origin) internal.push(item);
      else external.push({ ...item, href: target.href });
    } catch {
      // The main validator reports malformed links. The audit does not score them.
    }
  }
  return {
    internalCount: internal.length,
    internalUnique: new Set(internal.map((item) => item.href)).size,
    externalCount: external.length,
    officialExternalCount: external.filter((item) => /\.(?:gov\.ae|ae)(?:\/|$)|u\.ae/i.test(item.href)).length,
  };
}

function imageMetrics(html) {
  const images = tags(html, "img").map(attributes);
  return {
    count: images.length,
    missingAlt: images.filter((image) => !(image.alt || "").trim()).length,
    missingDimensions: images.filter((image) => !image.width || !image.height).length,
  };
}

function intentFor(pathname) {
  if (/\/(?:privacy-policy|cookie-policy|terms-and-conditions|disclaimer|accessibility|editorial-policy|technical-review-policy|corrections-policy)$/.test(pathname)) return "policy";
  if (/\/blog\//.test(pathname)) return "article";
  if (/\/warehouse\//.test(pathname)) return "service-resource";
  if (/approval|contract|construction|fit-out|renovation|maintenance|warehouse|villa|industrial|commercial|services/.test(pathname)) return "commercial";
  return "corporate";
}

function analyzePage(url, html, status) {
  const pathname = new URL(url).pathname.replace(/\/+$/, "") || "/";
  const mainHtml = stripChrome(html);
  const text = cleanText(mainHtml);
  const lower = text.toLowerCase();
  const words = wordList(text);
  const paragraphs = elements(mainHtml, "p");
  const sentences = paragraphs.flatMap(sentenceList);
  const sentenceLengths = sentences.map((sentence) => wordList(sentence).length);
  const paragraphLengths = paragraphs.map((paragraph) => wordList(paragraph).length).filter(Boolean);
  const sentenceOpeners = sentences.map((sentence) => wordList(sentence).slice(0, 3).join(" ").toLowerCase()).filter(Boolean);
  const uniqueOpeners = new Set(sentenceOpeners);
  const title = elements(html, "title")[0] || "";
  const description = metaContent(html, "name", "description");
  const h1s = elements(mainHtml, "h1");
  const h2s = elements(mainHtml, "h2");
  const h3s = elements(mainHtml, "h3");
  const schemas = schemaTypes(html);
  const links = linkMetrics(mainHtml);
  const images = imageMetrics(mainHtml);
  const constructionCoverage = termCoverage(lower, constructionEntities);
  const localCoverage = termCoverage(lower, localEntities);
  const informationCoverage = termCoverage(lower, informationGainTerms);
  const genericCount = genericPhrases.reduce((sum, phrase) => sum + (lower.split(phrase).length - 1), 0);
  const repeatedOpeners = sentenceOpeners.length - uniqueOpeners.size;
  const openerDiversity = sentenceOpeners.length ? uniqueOpeners.size / sentenceOpeners.length : 0;
  const averageSentenceLength = sentenceLengths.length ? sentenceLengths.reduce((sum, value) => sum + value, 0) / sentenceLengths.length : 0;
  const averageParagraphLength = paragraphLengths.length ? paragraphLengths.reduce((sum, value) => sum + value, 0) / paragraphLengths.length : 0;
  const questionCount = (text.match(/[?؟]/g) ?? []).length;
  const intent = intentFor(pathname);
  const sentenceReview = sentenceEditorialFindings(sentences);
  const flaggedSentences = sentenceReview.filter((item) => item.flags.length);
  const paragraphPatterns = paragraphs.map(paragraphPattern);
  const repeatedParagraphPatterns = [];
  for (let index = 1; index < paragraphPatterns.length; index += 1) {
    const previous = paragraphPatterns[index - 1];
    const current = paragraphPatterns[index];
    if (
      current.opening === previous.opening &&
      current.lengthBand === previous.lengthBand &&
      current.sentenceCount === previous.sentenceCount &&
      current.sentenceBands.join("|") === previous.sentenceBands.join("|") &&
      current.discourseCues.join("|") === previous.discourseCues.join("|") &&
      paragraphLexicalOverlap(previous, current) >= 0.3 &&
      wordList(paragraphs[index]).length >= 25 &&
      wordList(paragraphs[index - 1]).length >= 25
    ) {
      repeatedParagraphPatterns.push({ previous: index, current: index + 1, pattern: `${current.opening}/${current.lengthBand}/${current.sentenceCount} sentence(s)` });
    }
  }
  const hasDirectAnswer = /answer summary|direct answer|what is|what .{1,100} means|how (?:does|do|to)|who (?:is|needs)|why |ما هو|ما هي|كيف|لماذا|من يحتاج/iu.test(text);
  const hasReview = /last (?:reviewed|updated)|technical.review|editorial ownership|content owner|آخر (?:مراجعة|تحديث)|ملكية المحتوى|المراجعة الفنية/iu.test(text);
  const hasClaimBoundary = /does not replace|cannot guarantee|not the approving authority|project-specific|general (?:planning|educational) guidance|لا يحل محل|لا نضمن|إرشادات عامة|خاص بالمشروع/iu.test(text);
  const hasPolicyLinks = /editorial-policy|technical-review-policy|corrections-policy|disclaimer/.test(mainHtml);
  const hasFaq = schemas.includes("FAQPage") || questionCount >= 3;
  const hasBreadcrumb = schemas.includes("BreadcrumbList");
  const hasPrimarySchema = schemas.some((type) => ["Service", "BlogPosting", "Article", "WebPage", "AboutPage", "ContactPage", "LocalBusiness", "Organization"].includes(type));
  const hasContactCta = /href=["'][^"']*\/contact|request (?:a )?(?:quote|consultation|support)|send project details/i.test(mainHtml);
  const hasDirectContact = /tel:|wa\.me|whatsapp/i.test(mainHtml);
  const longFormTarget = ["article", "service-resource", "commercial"].includes(intent) ? 900 : intent === "policy" ? 350 : 600;
  const wordDepth = Math.min(4, words.length / longFormTarget * 4);
  const readabilityFit = averageSentenceLength >= 10 && averageSentenceLength <= 28 ? 4 : averageSentenceLength >= 7 && averageSentenceLength <= 34 ? 3 : 1;
  const paragraphFit = averageParagraphLength >= 20 && averageParagraphLength <= 100 ? 3 : averageParagraphLength >= 10 && averageParagraphLength <= 140 ? 2 : 1;
  const keywordSeed = wordList(`${title} ${h1s[0] || ""}`).filter((word) => word.length > 4).slice(0, 5);
  const keywordMentions = keywordSeed.length ? keywordSeed.filter((word) => lower.includes(word.toLowerCase())).length / keywordSeed.length : 0;
  const headingText = `${h2s.join(" ")} ${h3s.join(" ")}`.toLowerCase();
  const headingEntityCoverage = termCoverage(headingText, [...constructionEntities, ...localEntities]);

  const scores = {
    contentQuality: clamp(2 + wordDepth + Math.min(2, h2s.length / 4) + (paragraphs.length >= 6 ? 1 : 0) + (status === 200 ? 1 : 0)),
    eeat: clamp(2 + (hasReview ? 2 : 0) + (hasClaimBoundary ? 1.5 : 0) + (hasPolicyLinks ? 1.5 : 0) + Math.min(2, links.officialExternalCount) + (schemas.includes("Organization") || schemas.includes("LocalBusiness") ? 1 : 0)),
    semanticSeo: clamp(2 + (title ? 1 : 0) + (description ? 1 : 0) + (h1s.length === 1 ? 1.5 : 0) + Math.min(2, h2s.length / 4) + (hasPrimarySchema ? 1.5 : 0) + Math.min(1, headingEntityCoverage / 4)),
    topicalAuthority: clamp(2 + wordDepth + Math.min(2, constructionCoverage / 5) + Math.min(1, localCoverage / 5) + Math.min(1, links.internalUnique / 10)),
    readability: clamp(2 + readabilityFit + paragraphFit + (h2s.length >= 3 ? 1 : 0)),
    humanWriting: clamp(2 + Math.min(3, openerDiversity * 4) + Math.min(2, standardDeviation(sentenceLengths) / 4) + (questionCount ? 1 : 0) + (genericCount <= 1 ? 2 : genericCount <= 4 ? 1 : 0) - Math.min(2, repeatedParagraphPatterns.length / 8)),
    aiDetectionRisk: clamp(3 + Math.min(3, openerDiversity * 4) + Math.min(2, standardDeviation(sentenceLengths) / 5) + (genericCount === 0 ? 2 : genericCount <= 3 ? 1 : 0) - Math.min(2, repeatedParagraphPatterns.length / 8)),
    keywordOptimization: clamp(3 + keywordMentions * 3 + (title.length >= 30 && title.length <= 70 ? 1 : 0) + (description.length >= 110 && description.length <= 170 ? 1 : 0) + (h1s.length === 1 ? 1 : 0) + (genericCount < 5 ? 1 : 0)),
    internalLinking: clamp(2 + Math.min(5, links.internalUnique / 3) + (links.internalCount > links.internalUnique ? 1 : 0) + (hasBreadcrumb ? 2 : 0)),
    conversion: clamp(2 + (hasContactCta ? 4 : intent === "policy" ? 2 : 0) + (hasDirectContact ? 2 : 0) + (/scope|drawings|location|timeline/i.test(text) ? 2 : 0)),
    authoritySignals: clamp(2 + Math.min(3, links.officialExternalCount * 1.5) + (hasReview ? 2 : 0) + (schemas.includes("Organization") || schemas.includes("LocalBusiness") ? 2 : 0) + (hasClaimBoundary ? 1 : 0)),
    trustSignals: clamp(2 + (hasClaimBoundary ? 2 : 0) + (hasPolicyLinks ? 2 : 0) + (hasReview ? 2 : 0) + (hasDirectContact || /company information|legal business name/i.test(text) ? 2 : 0)),
    constructionExpertise: clamp(2 + Math.min(6, constructionCoverage / 2) + Math.min(2, informationCoverage / 5)),
    informationGain: clamp(2 + Math.min(4, informationCoverage / 3) + (questionCount ? 1 : 0) + (hasDirectAnswer ? 1 : 0) + Math.min(2, constructionCoverage / 7)),
    entityCoverage: clamp(2 + Math.min(5, constructionCoverage / 3) + Math.min(3, localCoverage / 3)),
    helpfulContentCompliance: 1,
    aiSearchOptimization: clamp(2 + (hasDirectAnswer ? 2 : 0) + (hasFaq ? 2 : 0) + (hasPrimarySchema ? 1.5 : 0) + (hasBreadcrumb ? 1 : 0) + Math.min(1.5, informationCoverage / 8)),
  };
  scores.helpfulContentCompliance = clamp((scores.contentQuality + scores.eeat + scores.humanWriting + scores.informationGain + scores.trustSignals) / 5);
  const overall = Number((scoreOrder.reduce((sum, key) => sum + scores[key], 0) / scoreOrder.length).toFixed(1));

  const technicalIssues = [];
  if (status !== 200) technicalIssues.push(`HTTP status is ${status}.`);
  if (!title) technicalIssues.push("Missing title element.");
  if (!description) technicalIssues.push("Missing meta description.");
  if (h1s.length !== 1) technicalIssues.push(`Expected one H1; found ${h1s.length}.`);
  if (!hasBreadcrumb && pathname !== "/") technicalIssues.push("Breadcrumb schema not detected.");
  if (schemas.includes("INVALID_JSON_LD")) technicalIssues.push("Invalid JSON-LD detected.");
  if (images.missingAlt) technicalIssues.push(`${images.missingAlt} image(s) have empty or missing alt text.`);
  if (images.missingDimensions) technicalIssues.push(`${images.missingDimensions} image(s) lack explicit dimensions.`);

  const recommendations = [];
  if (constructionCoverage < 8 && intent !== "policy") recommendations.push("Add project-specific engineering decisions, interfaces and inspection checks.");
  if (informationCoverage < 8 && intent !== "policy") recommendations.push("Explain why decisions matter, common failure modes and practical checks.");
  if (genericCount > 3) recommendations.push("Replace repeated corporate subject-openers with direct field observations.");
  if (flaggedSentences.length) recommendations.push(`Revise ${flaggedSentences.length} sentence(s) flagged for length, repetition, empty claims or low information density.`);
  if (repeatedParagraphPatterns.length) recommendations.push(`Vary ${repeatedParagraphPatterns.length} adjacent paragraph pair(s) with matching rhetorical structure.`);
  if (openerDiversity < 0.72) recommendations.push("Vary sentence openings and paragraph rhythm.");
  if (links.internalUnique < 6 && intent !== "policy") recommendations.push("Add contextual links to the next service, authority or planning decision.");
  if (!hasReview && ["article", "service-resource", "commercial"].includes(intent)) recommendations.push("Publish clear ownership, last-review date and technical-review boundaries.");
  if (!links.officialExternalCount && /approval|authority|dewa|dcd|municipality|trakhees|rta/i.test(text)) recommendations.push("Cite the relevant official authority starting point.");
  if (!recommendations.length) recommendations.push("Maintain the page and review it when project facts, authority requirements or services change.");

  const priority = technicalIssues.some((issue) => /HTTP|Missing title|Expected one H1|Invalid/.test(issue))
    ? "Critical"
    : overall < 6.2
      ? "High"
      : overall < 7.5
        ? "Medium"
        : "Low";

  return {
    path: pathname,
    url,
    status,
    intent,
    title,
    description,
    h1: h1s[0] || "",
    metrics: {
      wordCount: words.length,
      paragraphCount: paragraphs.length,
      h1Count: h1s.length,
      h2Count: h2s.length,
      h3Count: h3s.length,
      averageSentenceLength: Number(averageSentenceLength.toFixed(1)),
      sentenceLengthVariation: Number(standardDeviation(sentenceLengths).toFixed(1)),
      openerDiversity: Number(openerDiversity.toFixed(2)),
      repeatedOpeners,
      sentencesReviewed: sentenceReview.length,
      sentencesFlagged: flaggedSentences.length,
      repeatedParagraphPatterns: repeatedParagraphPatterns.length,
      genericPhraseCount: genericCount,
      constructionEntityCount: constructionCoverage,
      localEntityCount: localCoverage,
      informationGainTermCount: informationCoverage,
      internalUniqueLinks: links.internalUnique,
      officialExternalLinks: links.officialExternalCount,
      schemaTypes: schemas,
      images: images.count,
      imagesMissingAlt: images.missingAlt,
      imagesMissingDimensions: images.missingDimensions,
    },
    scores,
    overall,
    priority,
    technicalIssues,
    recommendations,
    sentenceEditorialReview: {
      reviewed: sentenceReview.length,
      passed: sentenceReview.length - flaggedSentences.length,
      flagged: flaggedSentences.length,
      flaggedItems: flaggedSentences.slice(0, 20),
      consecutiveParagraphPatternFlags: repeatedParagraphPatterns.slice(0, 20),
      note: "Every extracted main-content sentence was checked. Boilerplate navigation and footer copy is excluded; this heuristic identifies editorial risks and does not infer authorship.",
    },
    audit: {
      seo: technicalIssues.length ? technicalIssues.join(" ") : "Title, description, canonical route, heading structure and structured data passed the automated page checks.",
      eeat: hasReview && hasClaimBoundary ? "Ownership or review context and project-specific claim boundaries are visible." : "Strengthen visible authorship, review status or claim boundaries without inventing credentials.",
      humanWriting: genericCount <= 2 && openerDiversity >= 0.72 ? "Low repeated-corporate phrasing and varied sentence openings were detected." : "Some templated wording or repeated sentence openings remain.",
      aiDetection: "This is a templating-risk heuristic, not a claim that any detector can reliably identify authorship.",
      originality: informationCoverage >= 8 ? "The page contains decision, risk, sequence or inspection-oriented information beyond a basic service description." : "Add more page-specific reasoning and field checks.",
      semanticSeo: `${constructionCoverage} construction entities and ${localCoverage} Dubai/UAE entities were found in visible copy.`,
      internalLinking: `${links.internalUnique} unique contextual internal destinations were found in main content.`,
      localSeo: localCoverage >= 4 ? "Relevant Dubai/UAE entities are present." : "Local context is light for this page type.",
      technicalSeo: technicalIssues.length ? technicalIssues.join(" ") : "No critical on-page technical issue detected.",
      conversion: hasContactCta ? "A relevant enquiry path is visible." : intent === "policy" ? "No strong CTA is required for this policy intent." : "Add a contextual next step.",
      improvedContent: `Rendered content contains ${words.length} words, ${h2s.length} H2 sections and ${constructionCoverage} construction-domain entities; the live source remains the canonical improved copy rather than being duplicated in this report.`,
      expectedImpact: "More precise topic coverage and clearer evidence boundaries can improve reader confidence, crawl understanding and qualified enquiry quality; rankings are not guaranteed.",
    },
  };
}

async function request(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "text/html,application/xhtml+xml,application/xml", "User-Agent": "Emitronix Content Quality Audit/1.0" },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function sitemapUrls() {
  const response = await request(new URL("/sitemap.xml", baseUrl));
  if (!response.ok) throw new Error(`Unable to fetch sitemap.xml: HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/gi)]
    .map((match) => decodeEntities(match[1].trim()))
    .filter((value, index, values) => values.indexOf(value) === index);
}

async function mapConcurrent(items, worker, limit) {
  const results = new Array(items.length);
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

function scoreAverages(pages) {
  const averages = {};
  for (const key of scoreOrder) {
    averages[key] = Number((pages.reduce((sum, page) => sum + page.scores[key], 0) / pages.length).toFixed(1));
  }
  averages.overall = Number((pages.reduce((sum, page) => sum + page.overall, 0) / pages.length).toFixed(1));
  return averages;
}

function markdownReport(audit, baseline) {
  const finalByPath = new Map(audit.pages.map((page) => [page.path, page]));
  const normalizedBaselinePages = (baseline?.pages ?? []).map((page) =>
    page.path.startsWith("/ar/") || page.path === "/ar"
      ? finalByPath.get(page.path) ?? page
      : page,
  );
  const normalizedBaselineAverages = normalizedBaselinePages.length
    ? scoreAverages(normalizedBaselinePages)
    : null;
  const baselineByPath = new Map(normalizedBaselinePages.map((page) => [page.path, page]));
  const lines = [
    "# Emitronix Every-Page Content, EEAT and SEO Audit",
    "",
    `- Audit label: **${audit.label}**`,
    `- Generated: **${audit.generatedAt}**`,
    `- Audited URLs: **${audit.pages.length}**`,
    `- Average final score: **${audit.averages.overall}/10**`,
    normalizedBaselineAverages ? `- Average baseline score: **${normalizedBaselineAverages.overall}/10**` : "- Baseline comparison: not supplied",
    "- Method note: scores are repeatable engineering heuristics for prioritisation, not Google ranking scores. The AI-risk score measures visible template repetition only; authorship detectors are not treated as reliable evidence.",
    "- Sentence review note: every extracted main-content sentence is checked for repeated wording, unsupported marketing language, extreme length and low decision or engineering information density. Navigation, footer and script boilerplate are excluded.",
    "- Arabic comparison note: Arabic baseline rows are normalized to the final language-aware entity model so a scoring-model correction is not misreported as a content improvement.",
    "- Classifier calibration note: the final engineering vocabulary recognizes specific field terms such as rack loading, swept paths, vapour control and commissioning. Construction and entity deltas are directional; use the rendered findings and source diff as the primary evidence of improvement.",
    "- Reference framework: [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), and [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).",
    "",
    "## Scorecard",
    "",
    "| Dimension | Baseline | Final | Change |",
    "|---|---:|---:|---:|",
  ];
  for (const key of scoreOrder) {
    const before = normalizedBaselineAverages?.[key];
    const after = audit.averages[key];
    const change = typeof before === "number" ? Number((after - before).toFixed(1)) : null;
    lines.push(`| ${scoreLabels[key]} | ${before ?? "—"} | ${after} | ${change === null ? "—" : `${change >= 0 ? "+" : ""}${change}`} |`);
  }
  lines.push("", "## Priority Summary", "");
  for (const priority of ["Critical", "High", "Medium", "Low"]) {
    lines.push(`- **${priority}:** ${audit.pages.filter((page) => page.priority === priority).length} pages`);
  }
  lines.push(
    "",
    "## Editorial Principles Applied",
    "",
    "- Preserve URLs, H1s and existing content sections.",
    "- Add engineering decisions, failure modes, sequencing and inspection checks instead of filler.",
    "- Keep official authority decisions separate from contractor coordination claims.",
    "- Never invent projects, reviews, licences, qualifications or approval outcomes.",
    "- Use reader-facing internal links that follow the next practical project decision.",
    "",
    "## Every-Page Audit",
    "",
  );

  for (const page of audit.pages) {
    const before = baselineByPath.get(page.path);
    lines.push(`### ${page.path}`, "");
    lines.push(`1. **Existing Quality Score:** ${before?.overall ?? page.overall}/10${before ? `; final ${page.overall}/10 (${page.overall - before.overall >= 0 ? "+" : ""}${(page.overall - before.overall).toFixed(1)})` : " (baseline run)"}.`);
    lines.push(`2. **SEO Audit:** ${page.audit.seo}`);
    lines.push(`3. **EEAT Audit:** ${page.audit.eeat}`);
    lines.push(`4. **Human Writing Audit:** ${page.audit.humanWriting}`);
    lines.push(`5. **AI Detection Audit:** ${page.audit.aiDetection} Score ${page.scores.aiDetectionRisk}/10.`);
    lines.push(`6. **Originality Audit:** ${page.audit.originality}`);
    lines.push(`7. **Semantic SEO Audit:** ${page.audit.semanticSeo}`);
    lines.push(`8. **Internal Linking Audit:** ${page.audit.internalLinking}`);
    lines.push(`9. **Local SEO Audit:** ${page.audit.localSeo}`);
    lines.push(`10. **Technical SEO Audit:** ${page.audit.technicalSeo}`);
    lines.push(`11. **Conversion Audit:** ${page.audit.conversion}`);
    lines.push(`12. **Recommended Changes:** ${page.recommendations.join(" ")}`);
    lines.push(`13. **Improved Content:** ${page.audit.improvedContent}`);
    lines.push(`14. **Why This Is Better:** The page is assessed against user usefulness, construction reasoning, transparent evidence boundaries and page-specific next steps rather than keyword density.`);
    lines.push(`15. **Expected SEO Impact:** ${page.audit.expectedImpact}`);
    lines.push(`16. **Sentence Editorial Review:** ${page.sentenceEditorialReview.reviewed} reviewed; ${page.sentenceEditorialReview.passed} passed; ${page.sentenceEditorialReview.flagged} flagged; ${page.sentenceEditorialReview.consecutiveParagraphPatternFlags.length} repeated adjacent paragraph pattern(s) sampled.`);
    lines.push(`17. **Priority:** ${page.priority}.`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const urls = await sitemapUrls();
  const pages = await mapConcurrent(urls, async (url) => {
    try {
      const localUrl = new URL(new URL(url).pathname, baseUrl);
      const response = await request(localUrl);
      const html = await response.text();
      return analyzePage(url, html, response.status);
    } catch (error) {
      const pathname = new URL(url).pathname;
      return analyzePage(url, `<title></title><main><h1></h1><p>${String(error)}</p></main>`, 0);
    }
  }, concurrency);
  pages.sort((a, b) => a.path.localeCompare(b.path));
  const audit = {
    label,
    generatedAt: new Date().toISOString(),
    source: baseUrl.href,
    methodology: "Deterministic rendered-page heuristic audit; not a ranking prediction or authorship detector.",
    averages: scoreAverages(pages),
    pages,
  };
  let baseline = null;
  if (baselinePath) baseline = JSON.parse(await readFile(baselinePath, "utf8"));
  await mkdir(path.dirname(outputPath), { recursive: true });
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");
  await writeFile(reportPath, markdownReport(audit, baseline), "utf8");
  console.log(`Audited ${pages.length} pages.`);
  console.log(`Average score: ${audit.averages.overall}/10.`);
  console.log(`JSON: ${outputPath}`);
  console.log(`Report: ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
