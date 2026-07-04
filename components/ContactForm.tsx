"use client";

import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

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
          company: formData.get("company") || "",
          mobile: formData.get("mobile") || "",
          email: formData.get("email") || "",
          projectLocation: formData.get("projectLocation") || "",
          scopeOfWork: formData.get("scopeOfWork") || "",
          message: formData.get("message") || "",
        }),
      });

      if (!response.ok) {
        throw new Error("SUBMISSION_FAILED");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-surface rounded-[2rem] p-5 sm:p-7">
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
          <input required type="tel" name="mobile" autoComplete="tel" className={inputClass} placeholder="+971" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          Email
          <input required type="email" name="email" autoComplete="email" className={inputClass} placeholder="name@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Project location
          <input required name="projectLocation" autoComplete="street-address" className={inputClass} placeholder="Dubai Investment Park, JAFZA, Dubai South, villa community..." />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Scope of work
          <select name="scopeOfWork" className={inputClass} defaultValue="" required>
            <option value="" disabled>
              Select scope of work
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
      </div>

      <button
        type="submit"
        disabled={sending}
        className="premium-button mt-6 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
        {sending ? "Submitting Enquiry" : "Submit Project Enquiry"}
      </button>

      {status !== "idle" ? (
        <p
          role="status"
          aria-live="polite"
          className="mt-5 rounded-2xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold leading-6 text-brand-deep"
        >
          {status === "success"
            ? "Thank you. Your enquiry has been submitted successfully."
            : "Submission failed. Please try again or contact us directly."}
        </p>
      ) : null}
    </form>
  );
}
