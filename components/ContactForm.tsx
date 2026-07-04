"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { services } from "@/data/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

      const result = (await response.json()) as { ok?: boolean; message?: string };

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
    <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-5 shadow-panel sm:p-7">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
          Mobile
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
            required
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
          Project location
          <input
            name="projectLocation"
            autoComplete="street-address"
            className="focus-ring rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-navy placeholder:text-slate-400"
            placeholder="Dubai Investment Park, JAFZA, Dubai South, villa community..."
          />
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
        <label className="flex items-start gap-3 rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700 sm:col-span-2">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-royal focus-ring" />
          I agree that Emitronix may use my enquiry details to contact me and create a CRM lead for follow-up.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-royal px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy focus-ring sm:w-auto"
      >
        {status === "submitting" ? "Submitting..." : "Send Enquiry"} <Send size={18} />
      </button>

      {message ? (
        <p
          className={`mt-4 rounded-sm border px-4 py-3 text-sm font-semibold ${
            status === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-royal/20 bg-blue-50 text-royal"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
