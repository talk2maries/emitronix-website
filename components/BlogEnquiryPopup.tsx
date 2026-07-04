"use client";

import { Loader2, Send, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const DISMISSED_KEY = "emitronix-blog-enquiry-dismissed";

const inputClass =
  "focus-ring rounded-2xl border border-brand/[0.15] bg-white px-4 py-3 text-sm text-charcoal shadow-sm outline-none transition placeholder:text-steel/70 hover:border-brand/30 focus:border-brand";

const fallbackServices = [
  "Civil Contracting",
  "Main Contracting",
  "Warehouse Construction",
  "Villa Construction",
  "Interior Fit-Out",
  "MEP Coordination",
  "Authority Approvals",
  "Project Management",
];

export function BlogEnquiryPopup({
  articleTitle,
  serviceOptions = fallbackServices,
}: {
  articleTitle: string;
  serviceOptions?: string[];
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const alreadyDismissed = window.sessionStorage.getItem(DISMISSED_KEY) === "true";
    if (alreadyDismissed) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const content = document.querySelector<HTMLElement>("[data-blog-content]");
      if (!content) return;

      const contentTop = content.getBoundingClientRect().top + window.scrollY;
      const contentHeight = Math.max(content.scrollHeight, 1);
      const progress = (window.scrollY - contentTop) / contentHeight;

      if (progress >= 0.2) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closePopup() {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
    setVisible(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const serviceRequired = String(formData.get("serviceRequired") || "");
    const message = String(formData.get("message") || "");

    setStatus("idle");
    setSending(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name") || "",
          mobile: formData.get("mobile") || "",
          email: formData.get("email") || "",
          projectLocation: "Dubai, UAE",
          scopeOfWork: serviceRequired,
          message: [`Blog enquiry: ${articleTitle}`, `Service required: ${serviceRequired}`, "", message].join("\n"),
        }),
      });

      if (!response.ok) {
        throw new Error("SUBMISSION_FAILED");
      }

      setStatus("success");
      form.reset();
      window.sessionStorage.setItem(DISMISSED_KEY, "true");
      window.setTimeout(() => {
        setDismissed(true);
        setVisible(false);
      }, 1800);
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  if (dismissed || !visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Project enquiry form"
      className="fixed bottom-24 left-4 right-4 z-[99998] max-h-[calc(100vh-7rem)] overflow-auto rounded-[1.5rem] border border-brand/[0.16] bg-white/[0.96] p-4 text-charcoal shadow-luxe backdrop-blur-2xl sm:left-auto sm:right-6 sm:w-[430px] sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="premium-kicker">Project enquiry</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-charcoal">Discuss your Dubai project.</h2>
        </div>
        <button
          type="button"
          onClick={closePopup}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand/15 bg-brand-soft text-brand transition hover:bg-brand hover:text-white focus-ring"
          aria-label="Close enquiry form"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <label className="grid gap-1.5 text-sm font-black text-charcoal">
          Name
          <input required name="name" autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-black text-charcoal">
            Mobile
            <input required type="tel" name="mobile" autoComplete="tel" className={inputClass} placeholder="+971" />
          </label>
          <label className="grid gap-1.5 text-sm font-black text-charcoal">
            Email
            <input required type="email" name="email" autoComplete="email" className={inputClass} placeholder="name@example.com" />
          </label>
        </div>
        <label className="grid gap-1.5 text-sm font-black text-charcoal">
          Service Required
          <select required name="serviceRequired" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select service
            </option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
            <option value="Other Construction Scope">Other Construction Scope</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-black text-charcoal">
          Message
          <textarea
            required
            name="message"
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Share your location, drawings, authority status and project scope."
          />
        </label>

        <button type="submit" disabled={sending} className="premium-button w-full disabled:cursor-wait disabled:opacity-70">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {sending ? "Submitting" : "Submit Enquiry"}
        </button>

        {status !== "idle" ? (
          <p
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold leading-6 text-brand-deep"
          >
            {status === "success" ? "Thank you. Your enquiry has been submitted." : "Submission failed. Please try again or contact us directly."}
          </p>
        ) : null}
      </form>
    </aside>
  );
}
