"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { approvalServices } from "@/data/approvals";
import { contactItems, navItems, site, socialLinks } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const approvalPaths = ["/approval", ...approvalServices.map((item) => item.href)];
  const approvalActive = approvalPaths.includes(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
      <div className="hidden border-b border-slate-200/70 bg-white/70 xl:block">
        <div className="container-pad flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6 text-slate-600">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="flex items-center gap-2 transition hover:text-[#D71920]">
                  <Icon size={14} className="text-[#D71920]" />
                  <span>{item.value}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[#D71920] hover:bg-[#D71920] hover:text-white"
                >
                  <Icon size={13} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-pad">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center rounded-md focus-ring" aria-label="Emitronix home">
            <Image
              src="/images/emitronix-logo-horizontal.svg"
              alt="Emitronix Building the Future logo"
              width={230}
              height={51}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isApproval = item.href === "/approval";
              const active = isApproval ? approvalActive : pathname === item.href;
              const linkClassName = `inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-[11px] font-black uppercase tracking-wide transition focus-ring ${
                active ? "bg-[#D71920] text-white shadow-[0_12px_30px_rgba(215,25,32,0.22)]" : "text-slate-700 hover:bg-slate-100 hover:text-[#D71920]"
              }`;

              if (isApproval) {
                return (
                  <div key={item.href} className="group relative">
                    <Link href={item.href} className={linkClassName}>
                      {item.label}
                      <ChevronDown size={14} strokeWidth={2.2} />
                    </Link>
                    <div className="invisible absolute left-0 top-full z-50 mt-4 w-80 translate-y-2 rounded-2xl border border-slate-200 bg-white/95 p-2 opacity-0 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {approvalServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          className={`block rounded-xl px-4 py-3 text-xs font-black uppercase tracking-wide transition ${
                            pathname === service.href ? "bg-[#D71920] text-white" : "text-slate-700 hover:bg-slate-50 hover:text-[#D71920]"
                          }`}
                        >
                          {service.menuLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link key={item.href} href={item.href} className={linkClassName}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-full bg-[#D71920] px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_18px_40px_rgba(215,25,32,0.24)] transition hover:-translate-y-0.5 hover:bg-[#111111] focus-ring xl:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#111111] shadow-sm transition hover:border-[#D71920] hover:text-[#D71920] focus-ring xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl xl:hidden">
          <nav className="container-pad grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isApproval = item.href === "/approval";
              const active = isApproval ? approvalActive : pathname === item.href;

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-wide transition ${
                      active ? "bg-[#D71920] text-white" : "text-[#111111] hover:bg-slate-50 hover:text-[#D71920]"
                    }`}
                  >
                    {item.label}
                    {isApproval ? <ChevronDown size={16} /> : null}
                  </Link>
                  {isApproval ? (
                    <div className="mt-1 grid gap-1 border-l-2 border-[#D71920]/20 pl-3">
                      {approvalServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          onClick={() => setOpen(false)}
                          className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                            pathname === service.href ? "bg-[#D71920] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-[#D71920]"
                          }`}
                        >
                          {service.menuLabel}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-[#D71920] px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_40px_rgba(215,25,32,0.22)]"
            >
              Get a Quote
            </Link>
            <div className="mt-3 grid gap-2 border-t border-slate-200 pt-3 text-sm text-slate-600">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>{site.location}</span>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
