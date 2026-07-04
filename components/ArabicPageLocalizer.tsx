"use client";

import { ReactNode, useEffect, useRef } from "react";
import { translateArabicText } from "@/data/arabicText";
import type { ArabicPageData } from "@/data/arabic";
import { toArabicPath } from "@/lib/i18n";

type ArabicPageLocalizerProps = {
  page: Pick<ArabicPageData, "path" | "title" | "description" | "kind">;
  children: ReactNode;
};

const translatedMarker = "data-ar-localized";

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, noscript, svg, canvas"));
}

function localizeInternalHref(rawHref: string) {
  if (!rawHref || rawHref.startsWith("#")) return rawHref;
  if (/^(mailto:|tel:|sms:|https:\/\/wa\.me|https:\/\/www\.linkedin\.com|https:\/\/twitter\.com)/i.test(rawHref)) return rawHref;

  try {
    const url = new URL(rawHref, window.location.origin);
    if (url.origin !== window.location.origin) return rawHref;
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) return rawHref;

    const localizedPath = toArabicPath(url.pathname);
    return `${localizedPath}${url.search}${url.hash}`;
  } catch {
    if (rawHref.startsWith("/") && !rawHref.startsWith("/api/") && !rawHref.startsWith("/_next/")) {
      return toArabicPath(rawHref);
    }
  }

  return rawHref;
}

function localizeElement(root: HTMLElement, page: ArabicPageLocalizerProps["page"]) {
  root.querySelectorAll<HTMLElement>("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href) link.setAttribute("href", localizeInternalHref(href));
  });

  root.querySelectorAll<HTMLElement>("[aria-label], [title], [alt], [placeholder]").forEach((element) => {
    for (const attribute of ["aria-label", "title", "alt", "placeholder"] as const) {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, translateArabicText(value, page, element.tagName));
    }
  });

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;
      const value = node.nodeValue ?? "";
      if (!/[A-Za-z]/.test(value)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentElement;
    if (!parent) continue;
    const nextValue = translateArabicText(textNode.nodeValue ?? "", page, parent.tagName);
    if (nextValue !== textNode.nodeValue) {
      textNode.nodeValue = nextValue;
    }
  }

  root.querySelectorAll<HTMLOptionElement>("option").forEach((option) => {
    if (option.value && /[A-Za-z]/.test(option.value)) {
      option.value = translateArabicText(option.value, page, "OPTION");
    }
  });
}

export function ArabicPageLocalizer({ page, children }: ArabicPageLocalizerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const translating = useRef(false);
  const scheduled = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const run = () => {
      if (translating.current) return;
      translating.current = true;
      root.removeAttribute(translatedMarker);
      localizeElement(root, page);
      root.setAttribute(translatedMarker, "true");
      translating.current = false;
    };

    const schedule = () => {
      if (scheduled.current) window.cancelAnimationFrame(scheduled.current);
      scheduled.current = window.requestAnimationFrame(run);
    };

    run();

    const observer = new MutationObserver(() => {
      if (!translating.current) schedule();
    });
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href", "aria-label", "title", "alt", "placeholder"],
    });

    let sweepCount = 0;
    const sweepTimer = window.setInterval(() => {
      sweepCount += 1;
      run();
      if (sweepCount >= 12) window.clearInterval(sweepTimer);
    }, 500);

    return () => {
      observer.disconnect();
      window.clearInterval(sweepTimer);
      if (scheduled.current) window.cancelAnimationFrame(scheduled.current);
    };
  }, [page]);

  return (
    <div ref={rootRef} lang="ar-AE" dir="rtl" className="arabic-page bg-white text-charcoal">
      {children}
    </div>
  );
}
