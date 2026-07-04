"use client";

import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { services, site } from "@/data/site";

const inputClass =
  "focus-ring rounded-2xl border border-brand/[0.15] bg-white/[0.88] px-4 py-4 text-charcoal shadow-sm outline-none transition placeholder:text-steel/70 hover:border-brand/30 focus:border-brand";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = [
      `Name: ${formData.get("name") || ""}`,
      `Company: ${formData.get("company") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Service: ${formData.get("service") || ""}`,
      "",
      "Project details:",
      `${formData.get("message") || ""}`,
    ].join("\n");

    setSubmitted(false);
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Emitronix project enquiry")}&body=${encodeURIComponent(body)}`;
    }, 700);
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
          Email
          <input required type="email" name="email" autoComplete="email" className={inputClass} placeholder="name@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          Phone
          <input name="phone" autoComplete="tel" className={inputClass} placeholder="+971" />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Service
          <select name="service" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal sm:col-span-2">
          Project details
          <textarea
            required
            name="message"
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Share location, scope, authority status, drawings available and intended timeline."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="premium-button mt-6 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
        {sending ? "Preparing Enquiry" : "Send Enquiry"}
      </button>

      {submitted ? (
        <p className="mt-5 rounded-2xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold leading-6 text-brand-deep">
          Your enquiry has been prepared for email. For urgent project requirements, call or email Emitronix directly.
        </p>
      ) : null}
    </form>
  );
}
