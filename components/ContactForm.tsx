"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { services } from "@/data/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-5 shadow-panel sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy">
          Full name
          <input
            required
            name="name"
            autoComplete="name"
            className="focus-ring rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy placeholder:text-slate-400"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy">
          Company
          <input
            name="company"
            autoComplete="organization"
            className="focus-ring rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy placeholder:text-slate-400"
            placeholder="Company name"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="focus-ring rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy placeholder:text-slate-400"
            placeholder="name@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy">
          Phone
          <input
            name="phone"
            autoComplete="tel"
            className="focus-ring rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy placeholder:text-slate-400"
            placeholder="+971"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">
          Service
          <select
            name="service"
            className="focus-ring rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy"
            defaultValue=""
          >
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
        <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">
          Project details
          <textarea
            required
            name="message"
            rows={6}
            className="focus-ring resize-none rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy placeholder:text-slate-400"
            placeholder="Tell us about the location, scope, timeline and approvals required."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-royal px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy focus-ring sm:w-auto"
      >
        Send Enquiry <Send size={18} />
      </button>

      {submitted ? (
        <p className="mt-4 rounded-sm border border-royal/20 bg-blue-50 px-4 py-3 text-sm font-semibold text-royal">
          Thank you. Your enquiry has been received and the Emitronix team will review the project details.
        </p>
      ) : null}
    </form>
  );
}
