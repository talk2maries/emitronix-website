"use client";

import { ArrowRight, Building2, ChevronDown, FileCheck2, Languages, Menu, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/data/site";
import { alternateLocalePath, isArabicPath, localizedPath, toEnglishPath } from "@/lib/i18n";

export type HeaderServiceLink = {
  slug: string;
  title: string;
  href: string;
};

export type HeaderApprovalLink = {
  slug: string;
  menuLabel: string;
  href: string;
};

export type HeaderContact = {
  phone: string;
  email: string;
  location: string;
};

const industryLinks = [
  { label: "Luxury Villas", href: "/industries" },
  { label: "Warehouses", href: "/industries" },
  { label: "Commercial Buildings", href: "/industries" },
  { label: "Retail Fit-Out", href: "/industries" },
];

export function HeaderClient({
  navItems,
  arabicNavItems,
  services,
  arabicServices,
  approvalServices,
  arabicApprovalServices,
  contact,
}: {
  navItems: NavItem[];
  arabicNavItems: NavItem[];
  services: HeaderServiceLink[];
  arabicServices: HeaderServiceLink[];
  approvalServices: HeaderApprovalLink[];
  arabicApprovalServices: HeaderApprovalLink[];
  contact: HeaderContact;
}) {
  const pathname = usePathname();
  const isArabic = isArabicPath(pathname);
  const activePathname = toEnglishPath(pathname);
  const locale = isArabic ? "ar" : "en";
  const currentNavItems = isArabic ? arabicNavItems : navItems;
  const currentServices = isArabic ? arabicServices : services;
  const currentApprovalServices = isArabic ? arabicApprovalServices : approvalServices;
  const languageHref = alternateLocalePath(pathname);
  const copy = isArabic
    ? {
        homeLabel: "الصفحة الرئيسية",
        quote: "عرض سعر",
        services: "الخدمات الأساسية",
        servicesDescription: "مقاولات، تشطيبات وتحكم في التسليم",
        allServices: "منصة الخدمات الكاملة",
        approvals: "موافقات دبي",
        approvalsDescription: "مسارات تنسيق الجهات",
        allApprovals: "كل خدمات الموافقات",
        sectorFocus: "القطاعات",
        sectorTitle: "بيئات المشاريع في دبي.",
        toggleNav: "فتح أو إغلاق القائمة",
        completeServices: "منصة الخدمات الكاملة",
        language: "English",
        languageLabel: "تغيير اللغة إلى الإنجليزية",
        industryLinks: [
          { label: "الفلل الفاخرة", href: "/industries" },
          { label: "المستودعات", href: "/industries" },
          { label: "المباني التجارية", href: "/industries" },
          { label: "التشطيبات التجارية", href: "/industries" },
        ],
      }
    : {
        homeLabel: "Emitronix home",
        quote: "Free Quote",
        services: "Core services",
        servicesDescription: "Construction, fit-out and delivery control",
        allServices: "Complete services platform",
        approvals: "Dubai approvals",
        approvalsDescription: "Authority coordination pathways",
        allApprovals: "All approval services",
        sectorFocus: "Sector focus",
        sectorTitle: "Dubai project environments.",
        toggleNav: "Toggle navigation",
        completeServices: "Complete Services Platform",
        language: "العربية",
        languageLabel: "Switch language to Arabic",
        industryLinks,
      };
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const approvalPaths = ["/approval", ...approvalServices.map((item) => item.href)];
  const servicePaths = ["/services", ...services.map((item) => item.href), ...approvalPaths];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/services") return servicePaths.includes(activePathname);
    return activePathname === href;
  }

  function clearCloseTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMegaMenu() {
    clearCloseTimer();
    setMegaOpen(true);
  }

  function scheduleMegaClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 420);
  }

  return (
    <header
      dir={isArabic ? "rtl" : "ltr"}
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-brand/[0.15] bg-white/[0.92] shadow-[0_18px_70px_rgba(25,73,145,0.10)] backdrop-blur-2xl"
          : "border-brand/[0.08] bg-white/[0.82] shadow-none backdrop-blur-xl"
      }`}
    >
      <div className="container-pad">
        <div className="flex h-20 items-center justify-between gap-4 transition-[height] duration-500">
          <Link href={localizedPath("/", locale)} className="flex min-w-0 items-center rounded-xl focus-ring" aria-label={copy.homeLabel}>
            <Image
              src="/images/emitronix-logo-horizontal.svg"
              alt="Emitronix Building the Future logo"
              width={230}
              height={51}
              className="h-12 w-auto object-contain sm:h-14"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {currentNavItems.map((item) => {
              const active = isActive(item.href);
              const baseClass = `inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-xs font-black uppercase tracking-wide transition focus-ring ${
                active ? "bg-brand text-white shadow-blue" : "text-charcoal/[0.78] hover:bg-brand-soft hover:text-brand"
              }`;

              if (item.href === "/services") {
                return (
                  <div
                    key={item.href}
                    className="relative -my-4 py-4"
                    onMouseEnter={openMegaMenu}
                    onMouseLeave={scheduleMegaClose}
                    onFocus={openMegaMenu}
                    onBlur={(event) => {
                      const nextTarget = event.relatedTarget as Node | null;
                      if (!nextTarget || !event.currentTarget.contains(nextTarget)) scheduleMegaClose();
                    }}
                  >
                    <button
                      type="button"
                      className={baseClass}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onClick={() => {
                        clearCloseTimer();
                        setMegaOpen(true);
                      }}
                    >
                      {item.label}
                      <ChevronDown size={14} strokeWidth={2.4} className={`transition duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`absolute left-1/2 top-full z-50 w-[min(94vw,980px)] -translate-x-1/2 pt-5 transition duration-300 ${
                        megaOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
                      }`}
                      aria-hidden={!megaOpen}
                    >
                      <div className="premium-menu-panel">
                        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.82fr]">
                          <div className="rounded-[1.6rem] border border-brand/10 bg-pearl p-4">
                            <div className="flex items-center gap-3">
                              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                                <Building2 className="h-5 w-5" />
                              </span>
                              <div>
                              <p className="premium-kicker">{copy.services}</p>
                                <p className="mt-1 text-xs font-bold text-steel">{copy.servicesDescription}</p>
                              </div>
                            </div>
                            <div className="mt-5 grid max-h-72 gap-2 overflow-auto pr-1">
                              <Link href={localizedPath("/services", locale)} className="premium-menu-link">
                                {copy.allServices} <ArrowRight className="h-4 w-4" />
                              </Link>
                              {currentServices.map((service) => (
                                <Link key={service.slug} href={localizedPath(service.href, locale)} className="premium-menu-link">
                                  {service.title}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-[1.6rem] border border-brand/10 bg-pearl p-4">
                            <div className="flex items-center gap-3">
                              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                                <FileCheck2 className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="premium-kicker">{copy.approvals}</p>
                                <p className="mt-1 text-xs font-bold text-steel">{copy.approvalsDescription}</p>
                              </div>
                            </div>
                            <div className="mt-5 grid max-h-72 gap-2 overflow-auto pr-1">
                              <Link href={localizedPath("/approval", locale)} className="premium-menu-link">
                                {copy.allApprovals} <ArrowRight className="h-4 w-4" />
                              </Link>
                              {currentApprovalServices.map((service) => (
                                <Link key={service.slug} href={localizedPath(service.href, locale)} className="premium-menu-link">
                                  {service.menuLabel}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-[1.6rem] border border-brand/10 bg-[linear-gradient(145deg,#f8fbff_0%,#ffffff_100%)] p-5">
                            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-white shadow-sm">
                              <Sparkles className="h-5 w-5" />
                            </span>
                            <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-steel">{copy.sectorFocus}</p>
                            <h3 className="mt-2 text-2xl font-black tracking-tight text-charcoal">{copy.sectorTitle}</h3>
                            <div className="mt-5 grid gap-2">
                              {copy.industryLinks.map((link) => (
                                <Link key={link.label} href={localizedPath(link.href, locale)} className="premium-menu-link">
                                  {link.label}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link key={item.href} href={localizedPath(item.href, locale)} className={baseClass}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Link href={localizedPath("/contact", locale)} className="premium-button">
              {copy.quote} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={languageHref} className="premium-button-light" aria-label={copy.languageLabel}>
              <Languages className="h-4 w-4" />
              {copy.language}
            </Link>
          </div>

          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full border border-brand/[0.15] bg-white/[0.9] text-charcoal shadow-sm backdrop-blur-xl transition hover:border-brand/[0.35] hover:bg-brand-soft hover:text-brand focus-ring xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={copy.toggleNav}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-brand/[0.15] bg-white/[0.96] shadow-luxe backdrop-blur-2xl xl:hidden">
          <nav className="container-pad grid gap-2 py-5" aria-label="Mobile navigation">
            {currentNavItems.map((item) => {
              const active = isActive(item.href);
              if (item.href === "/services") {
                return (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((value) => !value)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-wide transition ${
                        active ? "bg-brand text-white" : "text-charcoal hover:bg-brand-soft hover:text-brand"
                      }`}
                      aria-expanded={mobileServicesOpen}
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                        mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="mt-2 grid gap-2 rounded-[1.5rem] border border-brand/[0.15] bg-brand-soft p-3">
                          <Link
                            href={localizedPath("/services", locale)}
                            onClick={() => setOpen(false)}
                            className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-charcoal shadow-sm"
                          >
                            {copy.completeServices}
                          </Link>
                          {currentServices.map((service) => (
                            <Link
                              key={service.slug}
                              href={localizedPath(service.href, locale)}
                              onClick={() => setOpen(false)}
                              className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-charcoal shadow-sm"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.href}>
                  <Link
                    href={localizedPath(item.href, locale)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-wide transition ${
                      active ? "bg-brand text-white" : "text-charcoal hover:bg-brand-soft hover:text-brand"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
            <Link href={localizedPath("/contact", locale)} onClick={() => setOpen(false)} className="premium-button mt-2">
              {copy.quote} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={languageHref} onClick={() => setOpen(false)} className="premium-button-light">
              <Languages className="h-4 w-4" />
              {copy.language}
            </Link>
            <div className="mt-3 grid gap-2 border-t border-brand/[0.15] pt-4 text-sm font-bold text-steel">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{isArabic ? "مجمع دبي للاستثمار 02، دبي، الإمارات" : contact.location}</span>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
