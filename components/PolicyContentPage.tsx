import { CalendarDays, Cookie, FileText, Languages, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { type CookieLanguage, type CookiePolicyPageKey, type LocalizedPolicyPage } from "@/data/cookieConsentDefaults";
import { absoluteUrl, site } from "@/data/site";
import { policyPageRoutes } from "@/lib/policyPages";

const pageLabels: Record<CookiePolicyPageKey, Record<CookieLanguage, string>> = {
  cookiePolicy: {
    en: "Cookie Policy",
    ar: "سياسة ملفات الارتباط",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  terms: {
    en: "Terms & Conditions",
    ar: "الشروط والأحكام",
  },
};

const complianceLabels = {
  en: {
    eyebrow: "Compliance",
    languageSwitch: "Arabic version",
    contact: "For privacy or cookie questions, contact Emitronix using the published contact details on the website.",
    legalNote: "This page is maintained for website transparency and may be updated when policies, tools or legal requirements change.",
  },
  ar: {
    eyebrow: "الامتثال",
    languageSwitch: "English version",
    contact: "لأي أسئلة حول الخصوصية أو ملفات الارتباط، يرجى التواصل مع Emitronix عبر بيانات الاتصال المنشورة في الموقع.",
    legalNote: "تتم صيانة هذه الصفحة لدعم شفافية الموقع وقد يتم تحديثها عند تغير السياسات أو الأدوات أو المتطلبات القانونية.",
  },
};

function formatDate(value: string, language: CookieLanguage) {
  return new Intl.DateTimeFormat(language === "ar" ? "ar-AE" : "en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function PolicyContentPage({
  pageKey,
  page,
  language,
  updatedAt,
}: {
  pageKey: CookiePolicyPageKey;
  page: LocalizedPolicyPage[CookieLanguage];
  language: CookieLanguage;
  updatedAt: string;
}) {
  const isRtl = language === "ar";
  const alternateLanguage = language === "ar" ? "en" : "ar";
  const currentHref = policyPageRoutes[pageKey][language];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: page.title, item: absoluteUrl(currentHref) },
    ],
  };

  return (
    <article lang={language === "ar" ? "ar-AE" : "en-AE"} dir={isRtl ? "rtl" : "ltr"} className="bg-white text-charcoal">
      <section className="blue-grid section-pad">
        <div className="container-pad">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="premium-kicker">{complianceLabels[language].eyebrow}</p>
              <Link href={policyPageRoutes[pageKey][alternateLanguage]} className="premium-button-light">
                <Languages className="h-4 w-4" />
                {complianceLabels[language].languageSwitch}
              </Link>
            </div>
            <h1 className="mt-8 text-balance text-5xl font-black leading-[1.03] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-steel">{page.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/[0.14] bg-white px-4 py-3 text-sm font-black text-brand shadow-sm">
                <CalendarDays className="h-4 w-4" />
                {page.lastUpdatedLabel}: {formatDate(updatedAt, language)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/[0.14] bg-white px-4 py-3 text-sm font-black text-brand shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                GDPR | UAE PDPL | Google Consent Mode v2
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="luxury-card rounded-[1.75rem] p-6">
                <Cookie className="h-8 w-8 text-brand" />
                <h2 className="mt-4 text-2xl font-black tracking-tight">{site.name}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{complianceLabels[language].legalNote}</p>
                <div className="mt-6 grid gap-2">
                  {(Object.keys(policyPageRoutes) as CookiePolicyPageKey[]).map((key) => (
                    <Link
                      key={key}
                      href={policyPageRoutes[key][language]}
                      className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                        key === pageKey
                          ? "border-brand bg-brand text-white shadow-blue"
                          : "border-brand/[0.12] bg-white text-charcoal hover:bg-brand-soft hover:text-brand"
                      }`}
                    >
                      {pageLabels[key][language]}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <div className="grid gap-5">
              {page.sections.map((section) => (
                <section key={section.heading} className="luxury-card rounded-[1.75rem] p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-charcoal">{section.heading}</h2>
                      <p className="mt-4 whitespace-pre-line text-base leading-8 text-steel">{section.body}</p>
                    </div>
                  </div>
                </section>
              ))}

              <section className="rounded-[1.75rem] border border-brand/[0.15] bg-brand-soft p-6 lg:p-8">
                <h2 className="text-2xl font-black tracking-tight text-charcoal">{site.legalName}</h2>
                <p className="mt-4 text-base leading-8 text-steel">{complianceLabels[language].contact}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`mailto:${site.email}`} className="premium-button-light">{site.email}</a>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="premium-button">{site.phone}</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </article>
  );
}
