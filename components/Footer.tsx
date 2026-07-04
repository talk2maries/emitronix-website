"use client";

import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieSettingsFooterButton } from "@/components/CookieConsentManager";
import { approvalServices } from "@/data/approvals";
import { arabicApprovalTitle, arabicFooterLabels, arabicNavItems, arabicServiceTitle } from "@/data/arabic";
import { navItems, services, site, whatsappUrl } from "@/data/site";
import { isArabicPath, localizedPath } from "@/lib/i18n";

const sectorLinks = [
  { label: "Luxury Villas", href: "/industries" },
  { label: "Warehouse & Logistics", href: "/industries" },
  { label: "Commercial Buildings", href: "/industries" },
  { label: "Retail & Hospitality", href: "/industries" },
];

export function Footer() {
  const pathname = usePathname();
  const isArabic = isArabicPath(pathname);
  const locale = isArabic ? "ar" : "en";
  const currentNavItems = isArabic ? arabicNavItems : navItems;
  const labels = isArabic
    ? arabicFooterLabels
    : {
        navigation: "Navigation",
        services: "Services",
        approvals: "Approvals",
        industries: "Industries",
        contact: "Contact",
        resources: "Resources",
        htmlSitemap: "HTML Sitemap",
        cookiePolicy: "Cookie Policy",
        privacyPolicy: "Privacy Policy",
        terms: "Terms & Conditions",
        cookieSettings: "Cookie Settings",
        startProject: "Start a project",
        startProjectTitle: "Bring engineering clarity to your next Dubai build.",
        quote: "Get a Free Quote",
        whatsapp: "WhatsApp Us",
        footerTagline: "Construction Company Dubai | Civil Contractor Dubai | Authority Approvals Dubai",
      };
  const currentSectorLinks = isArabic
    ? [
        { label: "الفلل الفاخرة", href: "/industries" },
        { label: "المستودعات واللوجستيات", href: "/industries" },
        { label: "المباني التجارية", href: "/industries" },
        { label: "التجزئة والضيافة", href: "/industries" },
      ]
    : sectorLinks;

  return (
    <footer dir={isArabic ? "rtl" : "ltr"} className="bg-white text-charcoal">
      <div className="container-pad pb-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-brand/[0.15] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_58%,#eaf5ff_100%)] shadow-luxe">
          <div className="grid gap-10 border-b border-brand/[0.12] p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <Image
                src="/images/emitronix-logo-horizontal.svg"
                alt="Emitronix Building the Future logo"
                width={230}
                height={51}
                className="h-14 w-auto object-contain sm:h-16"
              />
              <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
                {isArabic
                  ? "شركة مقاولات متميزة في دبي للأعمال المدنية، تنسيق موافقات الجهات، التشطيبات الداخلية، الفلل، المستودعات ودعم المشاريع التجارية."
                  : "Premium Dubai construction company for civil contracting, authority approval coordination, interior fit-out, villa, warehouse and commercial project support."}
              </p>
            </div>
            <div className="rounded-[2rem] border border-brand/[0.15] bg-white/80 p-6 text-charcoal shadow-panel backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">{labels.startProject}</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">{labels.startProjectTitle}</h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={localizedPath("/contact", locale)} className="premium-button">
                  {labels.quote} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
                  {labels.whatsapp} <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-5 lg:p-10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">{labels.navigation}</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {currentNavItems.map((item) => (
                  <li key={item.href}>
                    <Link href={localizedPath(item.href, locale)} className="transition hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={localizedPath("/resources", locale)} className="transition hover:text-brand">
                    {labels.resources}
                  </Link>
                </li>
                <li>
                  <Link href={localizedPath("/html-sitemap", locale)} className="transition hover:text-brand">
                    {labels.htmlSitemap}
                  </Link>
                </li>
                <li>
                  <Link href={localizedPath("/cookie-policy", locale)} className="transition hover:text-brand">
                    {labels.cookiePolicy}
                  </Link>
                </li>
                <li>
                  <Link href={localizedPath("/privacy-policy", locale)} className="transition hover:text-brand">
                    {labels.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link href={localizedPath("/terms-and-conditions", locale)} className="transition hover:text-brand">
                    {labels.terms}
                  </Link>
                </li>
                <li>
                  <CookieSettingsFooterButton label={labels.cookieSettings} />
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">{labels.services}</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={localizedPath(service.href, locale)} className="transition hover:text-brand">
                      {isArabic ? arabicServiceTitle(service.href) : service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={localizedPath("/approval", locale)} className="transition hover:text-brand">
                    {isArabic ? "موافقات الجهات" : "Authority Approvals"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">{labels.approvals}</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {approvalServices.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={localizedPath(service.href, locale)} className="transition hover:text-brand">
                      {isArabic ? arabicApprovalTitle(service.href) : service.menuLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">{labels.industries}</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {currentSectorLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={localizedPath(item.href, locale)} className="transition hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">{labels.contact}</h3>
              <ul className="mt-5 grid gap-4 text-sm font-bold text-steel">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition hover:text-brand">{site.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`mailto:${site.email}`} className="transition hover:text-brand">{site.email}</a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{isArabic ? "مجمع دبي للاستثمار 02، دبي، الإمارات" : site.location}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-brand/[0.12] px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-steel sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <span>&copy; {new Date().getFullYear()} {site.legalName}. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
            <span>{labels.footerTagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
