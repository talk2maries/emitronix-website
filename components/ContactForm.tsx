"use client";

import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "focus-ring rounded-2xl border border-brand/[0.15] bg-white/[0.88] px-4 py-4 text-charcoal shadow-sm outline-none transition placeholder:text-steel/70 hover:border-brand/30 focus:border-brand";

const fallbackScopeOptions = [
  "Civil Contracting",
  "Main Contracting",
  "Warehouse Construction",
  "Villa Construction",
  "Interior Fit-Out",
  "MEP Coordination",
  "Authority Approvals",
  "Project Management",
];

export function ContactForm({ scopeOptions = fallbackScopeOptions }: { scopeOptions?: string[] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          projectLocation: formData.get("projectLocation"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
          pageUrl: window.location.href,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "We could not submit the enquiry right now.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thank you. Your enquiry has been received and the Emitronix team will review the project details.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit the enquiry right now.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-surface rounded-[2rem] p-5 sm:p-7">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-charcoal">
          Full name
          <input required name="name" autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          Company
          <input name="company" autoComplete="organization" className={inputClass} placeholder="Company name" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          Mobile
          <input required type="tel" name="phone" autoComplete="tel" className={inputClass} placeholder="+971" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          Email
          <input required type="email" name="email" autoComplete="email" className={inputClass} placeholder="name@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Project location
          <input required name="projectLocation" autoComplete="street-address" className={inputClass} placeholder="Dubai, JAFZA, Dubai South, villa community..." />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Service required
          <select name="service" className={inputClass} defaultValue="" required>
            <option value="" disabled>
              Select service
            </option>
            {scopeOptions.map((scope) => (
              <option key={scope} value={scope}>
                {scope}
              </option>
            ))}
            <option value="Request a Site Visit">Request a Site Visit</option>
            <option value="Other Construction Scope">Other Construction Scope</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Project details
          <textarea
            required
            name="message"
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Share drawings available, authority status, site condition, timeline, budget stage and any consultant or landlord comments."
          />
        </label>
        <label className="flex items-start gap-3 rounded-2xl border border-brand/[0.14] bg-brand-soft p-4 text-sm font-bold leading-6 text-steel sm:col-span-2">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-brand/30 text-brand focus-ring" />
          I agree that Emitronix may use my enquiry details to contact me and create a CRM lead for follow-up.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="premium-button mt-6 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
        {status === "submitting" ? "Submitting Enquiry" : "Submit Project Enquiry"}
      </button>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-bold leading-6 ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-brand/20 bg-brand-soft text-brand-deep"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
