import { ArrowLeft, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogEnquiryPopup } from "@/components/BlogEnquiryPopup";
import { CareerApplicationForm } from "@/components/CareerApplicationForm";
import { ContactForm } from "@/components/ContactForm";
import { arabicUi, type ArabicPageData } from "@/data/arabic";
import { site, whatsappUrl } from "@/data/site";

export function ArabicSitePage({ page }: { page: ArabicPageData }) {
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const primaryCta = page.primaryCta ?? { label: arabicUi.quote, href: "/ar/contact" };
  const secondaryCta = page.secondaryCta ?? { label: arabicUi.whatsapp, href: whatsappUrl };

  return (
    <article lang="ar-AE" dir="rtl" className="bg-white text-charcoal">
      <section className="relative isolate overflow-hidden bg-brand-dark text-white">
        <Image
          src={page.image}
          alt={page.imageAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(270deg,rgba(11,31,58,0.94)_0%,rgba(18,58,115,0.76)_52%,rgba(25,73,145,0.26)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(11,31,58,0.10)_0%,rgba(11,31,58,0.72)_100%)]" />
        <div className="container-pad relative z-30 flex min-h-[680px] items-end pb-14 pt-36">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-sky">{page.eyebrow}</p>
            <h1 className="mt-6 text-balance text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-7xl lg:text-8xl">
              {page.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-medium leading-9 text-white/[0.88] sm:text-xl sm:leading-10">
              {page.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={primaryCta.href} className="premium-button">
                {primaryCta.label}
                <ArrowLeft className="h-4 w-4" />
              </Link>
              {secondaryCta.href.startsWith("http") ? (
                <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/15 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand focus-ring">
                  {secondaryCta.label}
                  <MessageCircle className="h-4 w-4" />
                </a>
              ) : (
                <Link href={secondaryCta.href} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/15 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand focus-ring">
                  {secondaryCta.label}
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              )}
              <a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/15 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand focus-ring">
                {arabicUi.callNow}
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-6 md:grid-cols-3">
          {[
            { label: "الهاتف", value: site.phone, href: phoneHref, icon: Phone },
            { label: "البريد الإلكتروني", value: site.email, href: `mailto:${site.email}`, icon: Mail },
            { label: "الموقع", value: site.location, href: "/ar/contact", icon: MapPin },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href} className="luxury-card flex gap-4 rounded-[1.5rem] p-5">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-brand" />
                <span>
                  <span className="block text-xs font-black uppercase tracking-wide text-brand">{item.label}</span>
                  <span className="mt-2 block text-sm font-bold leading-6 text-charcoal">{item.value}</span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <div data-blog-content={page.kind === "blog-post" ? true : undefined}>
        {page.sections.map((section, index) => (
          <section key={`${section.title}-${index}`} className={`section-pad ${index % 2 === 0 ? "soft-section" : "bg-white"}`}>
            <div className="container-pad">
              <div className="max-w-5xl">
                <p className="premium-kicker">{section.eyebrow}</p>
                <h2 className="mt-4 text-balance text-4xl font-black leading-[1.12] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                  {section.title}
                </h2>
                <div className="mt-6 grid gap-4 text-lg leading-9 text-steel">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {section.links?.length ? (
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.links.map((link) => (
                    <Link key={link.href} href={link.href} className="group luxury-card flex min-h-28 items-center justify-between gap-4 rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-brand/30 hover:bg-brand-soft">
                      <span className="text-lg font-black leading-7 text-charcoal">{link.label}</span>
                      <ArrowLeft className="h-5 w-5 shrink-0 text-brand transition group-hover:-translate-x-1" />
                    </Link>
                  ))}
                </div>
              ) : null}

              {section.cards?.length ? (
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {section.cards.map((card) => (
                    <article key={card.title} className="group overflow-hidden rounded-[1.5rem] border border-brand/10 bg-white shadow-panel transition hover:-translate-y-1 hover:shadow-luxe">
                      {card.image ? (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={card.image}
                            alt={card.imageAlt ?? card.title}
                            fill
                            loading="lazy"
                            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                        </div>
                      ) : null}
                      <div className="p-6">
                        <CheckCircle2 className="h-7 w-7 text-brand" />
                        <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-charcoal">{card.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-steel">{card.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      {page.form ? (
        <section className="section-pad bg-white">
          <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="premium-kicker">{page.form === "career" ? "نموذج الوظائف" : "نموذج التواصل"}</p>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-charcoal sm:text-5xl">
                {page.form === "career" ? "أرسل طلبك إلى Emitronix." : "أرسل تفاصيل مشروعك."}
              </h2>
              <p className="mt-5 text-base leading-8 text-steel">
                {page.form === "career"
                  ? "يرجى إرفاق السيرة الذاتية وكتابة الخبرة والموقع الحالي والوظيفة المطلوبة."
                  : "أرسل الموقع، الرسومات المتاحة، حالة الموافقات، نطاق العمل والجدول الزمني المطلوب."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
                  {arabicUi.whatsapp}
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href={phoneHref} className="premium-button-light">
                  {arabicUi.callNow}
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
            {page.form === "career" ? (
              <CareerApplicationForm email={site.email} language="ar" />
            ) : (
              <ContactForm language="ar" />
            )}
          </div>
        </section>
      ) : null}

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="premium-kicker">الخطوة التالية</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-charcoal sm:text-5xl">
              تحدث مع فريق Emitronix حول مشروعك في دبي.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-steel">
              شارك الموقع، نوع الأصل، الرسومات، حالة الموافقات والجدول الزمني حتى يتم تحديد مسار العمل المناسب.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/ar/contact" className="premium-button">
              {arabicUi.contactTeam}
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
              {arabicUi.whatsapp}
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={phoneHref} className="premium-button-light">
              {arabicUi.callNow}
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {page.kind === "blog-post" ? (
        <BlogEnquiryPopup
          articleTitle={page.title}
          language="ar"
          serviceOptions={["المقاولات المدنية", "إنشاء المستودعات", "إنشاء الفلل", "التشطيبات الداخلية", "تنسيق MEP", "موافقات الجهات", "إدارة المشاريع"]}
        />
      ) : null}
    </article>
  );
}
