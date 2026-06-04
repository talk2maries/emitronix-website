"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contactItems, navItems, site, socialLinks } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden bg-navy text-white xl:block">
        <div className="container-pad flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="flex items-center gap-2 text-white/90 hover:text-white">
                  <Icon size={14} className="text-white" />
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
                  className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white transition hover:bg-royal"
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
          <Link href="/" className="flex min-w-0 items-center gap-3 focus-ring rounded-md" aria-label="Emitronix home">
            <Image src="/brand-emblem.svg" alt="" width={48} height={48} priority />
            <span className="min-w-0">
              <span className="block text-2xl font-black tracking-[0.18em] text-navy">EMITRONIX</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-royal">Contracting LLC</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-sm border-b-2 px-3 py-7 text-[11px] font-bold uppercase tracking-wide transition focus-ring ${
                    active ? "border-royal text-royal" : "border-transparent text-navy hover:border-royal/45 hover:text-royal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-sm bg-royal px-5 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-blue transition hover:bg-navy focus-ring xl:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-sm border border-slate-200 bg-white text-navy focus-ring xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white xl:hidden">
          <nav className="container-pad grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-wide ${
                  pathname === item.href ? "bg-royal text-white" : "text-navy hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm bg-royal px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
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
