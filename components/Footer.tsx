import Image from "next/image";
import Link from "next/link";
import { contactItems, navItems, services, site, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="border-b border-white/10 bg-gradient-to-r from-royal to-navy">
        <div className="container-pad grid gap-6 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Planning a Project in Dubai?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
              Let Emitronix handle civil construction, fit-out and approvals from start to finish.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit rounded-sm bg-white px-7 py-4 text-sm font-bold uppercase tracking-wide text-royal shadow-lg transition hover:bg-platinum focus-ring"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      <div className="container-pad py-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1fr_0.7fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 focus-ring rounded-md">
              <Image src="/brand-emblem.svg" alt="" width={48} height={48} />
              <span>
                <span className="block text-2xl font-black tracking-[0.18em]">EMITRONIX</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-sky">Contracting LLC</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              Leading civil construction, interior fit-out and authority approval company in Dubai, delivering quality solutions since 2009.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Quick Links</h3>
            <ul className="mt-5 grid gap-2 text-sm text-white/70">
              {navItems.slice(0, 7).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Our Services</h3>
            <ul className="mt-5 grid gap-2 text-sm text-white/70">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href} className="hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Contact Us</h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/70">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                    <Link href={item.href} className="hover:text-white">
                      {item.value}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Follow Us</h3>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="grid h-9 w-9 place-items-center rounded-sm bg-white/10 text-white transition hover:bg-royal"
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/55">
          &copy; {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
