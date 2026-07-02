import Image from "next/image";
import Link from "next/link";
import { contactItems, navItems, services, site, socialLinks } from "@/data/site";

const capabilityLinks = [
  { label: "Building Construction", href: "/civil" },
  { label: "Warehouse Construction", href: "/projects" },
  { label: "Villa Construction", href: "/civil" },
  { label: "Interior Fit-Out", href: "/interior" },
  { label: "Authority Approvals", href: "/approval" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-[#111111]">
      <div className="container-pad py-12 lg:py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_62%,#fff1f2_100%)] p-6 shadow-[0_28px_90px_rgba(15,23,42,0.10)] lg:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1fr_0.7fr]">
            <div>
              <Link href="/" className="inline-flex items-center rounded-md focus-ring" aria-label="Emitronix home">
                <Image
                  src="/images/emitronix-logo-horizontal.svg"
                  alt="Emitronix Building the Future logo"
                  width={230}
                  height={51}
                  className="h-14 w-auto object-contain sm:h-16"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
                Premium construction company in Dubai for civil construction, building contracting, interior fit-out and authority approval coordination.
              </p>
              <div className="mt-6 inline-flex rounded-full bg-[#D71920] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(215,25,32,0.22)]">
                Main Contractor Dubai
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#111111]">Navigation</h3>
              <ul className="mt-5 grid gap-2 text-sm text-slate-600">
                {navItems.slice(0, 7).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition hover:text-[#D71920]">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/about" className="transition hover:text-[#D71920]">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#111111]">Core Services</h3>
              <ul className="mt-5 grid gap-2 text-sm text-slate-600">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={service.href} className="transition hover:text-[#D71920]">
                      {service.title}
                    </Link>
                  </li>
                ))}
                {capabilityLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-[#D71920]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#111111]">Contact</h3>
              <ul className="mt-5 grid gap-3 text-sm text-slate-600">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex gap-3">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D71920]" />
                      <Link href={item.href} className="transition hover:text-[#D71920]">
                        {item.value}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#111111]">Social</h3>
              <div className="mt-5 flex gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[#D71920] hover:bg-[#D71920] hover:text-white"
                    >
                      <Icon size={16} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; {new Date().getFullYear()} {site.legalName}. All Rights Reserved.</span>
            <span>Construction Company Dubai | Building Contractor Dubai | Civil Contractor Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
