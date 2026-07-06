"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type RuntimeOverride = {
  schemaJson: string | null;
  headHtml: string | null;
  footerHtml: string | null;
};

const CONTAINER_ID = "emitronix-seo-runtime";

/** Injects HTML so that any <script> tags inside it actually execute. */
function injectHtml(container: HTMLElement, html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const fragment = template.content;

  fragment.querySelectorAll("script").forEach((original) => {
    const script = document.createElement("script");
    for (const attribute of Array.from(original.attributes)) {
      script.setAttribute(attribute.name, attribute.value);
    }
    script.textContent = original.textContent;
    original.replaceWith(script);
  });

  container.appendChild(fragment);
}

/**
 * Applies per-path administrator overrides (extra JSON-LD schema and HTML/script
 * blocks managed in /admin/seo) on the client after navigation.
 */
export function SeoRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    document.getElementById(CONTAINER_ID)?.remove();

    fetch(`/api/seo-runtime?path=${encodeURIComponent(pathname)}`)
      .then((response) => (response.ok ? (response.json() as Promise<RuntimeOverride>) : null))
      .then((override) => {
        if (cancelled || !override) return;
        if (!override.schemaJson && !override.headHtml && !override.footerHtml) return;

        const container = document.createElement("div");
        container.id = CONTAINER_ID;
        document.body.appendChild(container);

        if (override.schemaJson) {
          try {
            const schema = JSON.parse(override.schemaJson);
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(schema);
            container.appendChild(script);
          } catch {
            // invalid JSON is ignored; the admin UI validates before saving
          }
        }
        if (override.headHtml) injectHtml(container, override.headHtml);
        if (override.footerHtml) injectHtml(container, override.footerHtml);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
