"use client";

import { Loader2, Send, UploadCloud } from "lucide-react";
import { FormEvent, useId, useState } from "react";

const fieldClass =
  "focus-ring w-full rounded-2xl border border-brand/[0.15] bg-white/[0.92] px-4 py-3.5 text-sm font-bold text-charcoal shadow-sm outline-none transition placeholder:text-steel/65 hover:border-brand/30 focus:border-brand";

const fileClass =
  "focus-ring w-full rounded-2xl border border-dashed border-brand/[0.25] bg-white/[0.92] px-4 py-4 text-sm font-bold text-charcoal shadow-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:tracking-wide file:text-brand hover:border-brand/40 focus:border-brand";

const positions = [
  "Civil Engineer",
  "Site Engineer",
  "Site Supervisor",
  "Project Coordinator",
  "Quantity Surveyor",
  "Interior Fit-Out Coordinator",
  "Authority Approval Coordinator",
  "Safety Officer",
  "Other Construction Role",
];

const arabicPositions = [
  "مهندس مدني",
  "مهندس موقع",
  "مشرف موقع",
  "منسق مشروع",
  "حاسب كميات",
  "منسق تشطيبات داخلية",
  "منسق موافقات الجهات",
  "مسؤول سلامة",
  "وظيفة إنشاءات أخرى",
];

const requiredFields = [
  "fullName",
  "email",
  "mobile",
  "position",
  "experience",
  "location",
  "expectedSalary",
  "noticePeriod",
  "message",
];

type CareerApplicationFormProps = {
  email: string;
  language?: "en" | "ar";
};

export function CareerApplicationForm({ email, language = "en" }: CareerApplicationFormProps) {
  const isArabic = language === "ar";
  const text = isArabic
    ? {
        eyebrow: "طلب وظيفة",
        title: "التقديم إلى Emitronix",
        description: "شارك ملفك لفرص الهندسة، التنفيذ، تنسيق المشاريع، الإشراف أو التشطيبات في دبي.",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        mobile: "رقم الهاتف",
        position: "الوظيفة المطلوبة",
        selectPosition: "اختر الوظيفة",
        experience: "سنوات الخبرة",
        location: "الموقع الحالي",
        expectedSalary: "الراتب المتوقع",
        noticePeriod: "فترة الإشعار",
        resume: "تحميل السيرة الذاتية",
        fileNote: "الحد الأقصى لحجم الملف: 8 ميجابايت.",
        message: "رسالة قصيرة / خطاب تعريفي",
        submitting: "جاري إرسال الطلب",
        submit: "إرسال الطلب",
        reviewNote: "تتم مراجعة الطلبات حسب متطلبات المشاريع والأدوار المناسبة.",
        missing: "يرجى إكمال جميع الحقول المطلوبة وتحميل السيرة الذاتية قبل الإرسال.",
        invalidFile: "يرجى تحميل السيرة الذاتية بصيغة PDF أو DOC أو DOCX.",
        largeFile: "يرجى تحميل سيرة ذاتية أصغر من 8 ميجابايت.",
        success: "تم تجهيز بيانات طلبك. أرفق السيرة الذاتية في نافذة البريد عند الحاجة ثم أرسل الطلب لإكمال التقديم.",
        placeholders: {
          name: "اكتب الاسم الكامل",
          email: "name@example.com",
          mobile: "+971 55 000 0000",
          experience: "مثال: 5 سنوات",
          location: "دبي، الإمارات",
          expectedSalary: "الراتب الشهري المتوقع",
          noticePeriod: "فوري / 30 يوما / 60 يوما",
          message: "اكتب نبذة عن خبرتك في البناء أو الهندسة أو الإشراف أو إدارة المشاريع في دبي.",
        },
      }
    : {
        eyebrow: "Career Application",
        title: "Apply to Emitronix",
        description: "Share your profile for construction, engineering, project coordination, site supervision, or fit-out opportunities in Dubai.",
        fullName: "Full Name",
        email: "Email Address",
        mobile: "Mobile Number",
        position: "Position Applying For",
        selectPosition: "Select a position",
        experience: "Years of Experience",
        location: "Current Location",
        expectedSalary: "Expected Salary",
        noticePeriod: "Notice Period",
        resume: "Upload CV / Resume",
        fileNote: "Maximum file size: 8 MB.",
        message: "Short Message / Cover Letter",
        submitting: "Submitting Application",
        submit: "Submit Application",
        reviewNote: "Applications are reviewed against active project requirements and suitable role matches.",
        missing: "Please complete all required fields and upload your CV before submitting.",
        invalidFile: "Please upload your CV in PDF, DOC, or DOCX format.",
        largeFile: "Please upload a CV smaller than 8 MB.",
        success: "Your application details have been prepared. Attach your CV in the email window if required, then send it to complete the application.",
        placeholders: {
          name: "Enter your full name",
          email: "name@example.com",
          mobile: "+971 55 000 0000",
          experience: "Example: 5 years",
          location: "Dubai, UAE",
          expectedSalary: "Expected monthly salary",
          noticePeriod: "Immediate / 30 days / 60 days",
          message: "Tell us about your Dubai construction, engineering, site supervision, or project management experience.",
        },
      };
  const formId = useId();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const missingRequired = requiredFields.some((field) => !String(formData.get(field) || "").trim());
    const resume = formData.get("resume");
    const file = resume instanceof File && resume.name ? resume : null;

    setSuccess(false);

    if (missingRequired || !file) {
      setError(text.missing);
      return;
    }

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileName = file.name.toLowerCase();
    const validFile = allowedExtensions.some((extension) => fileName.endsWith(extension));

    if (!validFile) {
      setError(text.invalidFile);
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError(text.largeFile);
      return;
    }

    const subject = `Career Application - ${String(formData.get("position") || "Emitronix")}`;
    const body = [
      `Full Name: ${formData.get("fullName")}`,
      `Email Address: ${formData.get("email")}`,
      `Mobile Number: ${formData.get("mobile")}`,
      `Position Applying For: ${formData.get("position")}`,
      `Years of Experience: ${formData.get("experience")}`,
      `Current Location: ${formData.get("location")}`,
      `Expected Salary: ${formData.get("expectedSalary")}`,
      `Notice Period: ${formData.get("noticePeriod")}`,
      `CV / Resume File Selected: ${file.name}`,
      "",
      "Short Message / Cover Letter:",
      String(formData.get("message") || ""),
    ].join("\n");

    setError("");
    setSubmitting(true);

    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      form.reset();
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 850);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      dir={isArabic ? "rtl" : "ltr"}
      className="rounded-[2rem] border border-brand/[0.15] bg-white/[0.9] p-5 shadow-luxe backdrop-blur-2xl sm:p-7 lg:p-8"
      aria-describedby={`${formId}-status`}
    >
      <div className="flex flex-col gap-4 border-b border-brand/[0.12] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="premium-kicker">{text.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-charcoal sm:text-4xl">{text.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-steel">
            {text.description}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/[0.15] bg-brand-soft px-4 py-2 text-xs font-black uppercase tracking-wide text-brand">
          <UploadCloud className="h-4 w-4" />
          PDF / DOC / DOCX
        </span>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.fullName}
          <input name="fullName" autoComplete="name" className={fieldClass} placeholder={text.placeholders.name} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.email}
          <input name="email" type="email" autoComplete="email" className={fieldClass} placeholder={text.placeholders.email} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.mobile}
          <input name="mobile" type="tel" autoComplete="tel" className={fieldClass} placeholder={text.placeholders.mobile} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.position}
          <select name="position" className={fieldClass} defaultValue="">
            <option value="" disabled>
              {text.selectPosition}
            </option>
            {(isArabic ? arabicPositions : positions).map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.experience}
          <input name="experience" inputMode="decimal" className={fieldClass} placeholder={text.placeholders.experience} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.location}
          <input name="location" autoComplete="address-level2" className={fieldClass} placeholder={text.placeholders.location} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.expectedSalary}
          <input name="expectedSalary" className={fieldClass} placeholder={text.placeholders.expectedSalary} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal">
          {text.noticePeriod}
          <input name="noticePeriod" className={fieldClass} placeholder={text.placeholders.noticePeriod} />
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal md:col-span-2">
          {text.resume}
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={fileClass}
          />
          <span className="text-xs font-bold leading-5 text-steel">{text.fileNote}</span>
        </label>
        <label className="grid gap-2 text-sm font-black text-charcoal md:col-span-2">
          {text.message}
          <textarea
            name="message"
            rows={6}
            className={`${fieldClass} resize-none leading-7`}
            placeholder={text.placeholders.message}
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className="premium-button w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {submitting ? text.submitting : text.submit}
        </button>
        <p className="text-xs font-bold leading-6 text-steel">
          {text.reviewNote}
        </p>
      </div>

      <div id={`${formId}-status`} className="mt-5" aria-live="polite">
        {error ? (
          <p role="alert" className="rounded-2xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold leading-6 text-brand-deep">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-2xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold leading-6 text-brand-deep">
            {text.success}
          </p>
        ) : null}
      </div>
    </form>
  );
}
