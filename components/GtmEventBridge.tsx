"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  classifyContactHref,
  pushContactClickEvent,
  pushFormAbandonEvent,
  pushFormErrorEvent,
  pushFormStartEvent,
  pushSalesIqLeadCaptured,
  pushVirtualPageViewEvent,
  safePageContext,
  type GtmFormName,
  type PublicContactTrackingConfig,
} from "@/lib/gtm/dataLayer";

type Props = PublicContactTrackingConfig;

function isTrackedFormName(value: string | undefined): value is GtmFormName {
  return value === "contact_form" || value === "blog_enquiry_form";
}

function formInstanceId(form: HTMLFormElement) {
  if (form.dataset.gtmInstance) return form.dataset.gtmInstance;
  const id = typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `form-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  form.dataset.gtmInstance = id;
  return id;
}

function buttonLocation(element: Element) {
  const explicit = element.closest<HTMLElement>("[data-gtm-location]")?.dataset.gtmLocation;
  if (explicit) return explicit;
  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest("main")) return "main_content";
  return "page";
}

export function GtmEventBridge({ phoneNumbers, whatsappNumbers, emailAddresses }: Props) {
  const pathname = usePathname();
  const previousPageRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPage = `${window.location.origin}${pathname}`;
    if (previousPageRef.current === null) {
      previousPageRef.current = currentPage;
      return;
    }
    if (previousPageRef.current === currentPage) return;

    pushVirtualPageViewEvent(
      safePageContext({ href: currentPage, pathname, referrer: previousPageRef.current }),
    );
    previousPageRef.current = currentPage;
    window.EmitronixJyothika?.refreshPageContext();
  }, [pathname]);

  useEffect(() => {
    const config = { phoneNumbers, whatsappNumbers, emailAddresses };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const tracked = classifyContactHref(link.href || link.getAttribute("href") || "", config, window.location.href);
      if (!tracked) return;
      pushContactClickEvent({ link: tracked, buttonLocation: buttonLocation(link) });
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.matches("input:not([type='hidden']), select, textarea")) return;
      const form = event.target.closest<HTMLFormElement>("form[data-gtm-form-name]");
      if (!form || !isTrackedFormName(form.dataset.gtmFormName)) return;
      if (form.dataset.gtmStarted !== "1") delete form.dataset.gtmCompleted;
      form.dataset.gtmStarted = "1";
      pushFormStartEvent(form.dataset.gtmFormName, formInstanceId(form));
    };

    const onInvalid = (event: Event) => {
      if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) {
        return;
      }
      const form = event.target.form;
      if (!form || !isTrackedFormName(form.dataset.gtmFormName)) return;
      const submissionId = (form.elements.namedItem("submissionId") as HTMLInputElement | null)?.value;
      pushFormErrorEvent({
        formName: form.dataset.gtmFormName,
        submissionId,
        errorType: "validation",
        fieldName: event.target.name,
      });
    };

    const onPageHide = () => {
      document.querySelectorAll<HTMLFormElement>("form[data-gtm-form-name][data-gtm-started='1']").forEach((form) => {
        if (form.dataset.gtmCompleted === "1") return;
        const name = form.dataset.gtmFormName;
        if (isTrackedFormName(name)) pushFormAbandonEvent(name, formInstanceId(form));
      });
    };

    const previousBridge = window.EmitronixTracking;
    window.EmitronixTracking = {
      ...previousBridge,
      salesIqLeadCaptured: (input) => pushSalesIqLeadCaptured(input),
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("invalid", onInvalid, true);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("invalid", onInvalid, true);
      window.removeEventListener("pagehide", onPageHide);
      window.EmitronixTracking = previousBridge;
    };
  }, [emailAddresses, phoneNumbers, whatsappNumbers]);

  return null;
}
