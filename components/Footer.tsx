import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { approvalServices } from "@/data/approvals";
import { navItems, services, site, whatsappUrl } from "@/data/site";

const sectorLinks = [
  { label: "Luxury Villas", href: "/industries" },
  { label: "Warehouse & Logistics", href: "/industries" },
  { label: "Commercial Buildings", href: "/industries" },
  { label: "Retail & Hospitality", href: "/industries" },
];

export function Footer() {
  return (
    <footer className="bg-white text-charcoal">
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
                Premium Dubai construction company for civil contracting, authority approval coordination, interior fit-out, villa, warehouse and commercial project support.
              </p>
            </div>
            <div className="rounded-[2rem] border border-brand/[0.15] bg-white/80 p-6 text-charcoal shadow-panel backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">Start a project</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Bring engineering clarity to your next Dubai build.</h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact" className="premium-button">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-button-light">
                  WhatsApp Us <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-5 lg:p-10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">Navigation</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/resources" className="transition hover:text-brand">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/html-sitemap" className="transition hover:text-brand">
                    HTML Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">Services</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={service.href} className="transition hover:text-brand">
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/approval" className="transition hover:text-brand">
                    Authority Approvals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">Approvals</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {approvalServices.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={service.href} className="transition hover:text-brand">
                      {service.menuLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">Industries</h3>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-steel">
                {sectorLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">Contact</h3>
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
                  <span>{site.location}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-brand/[0.12] px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-steel sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <span>&copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
            <span>Construction Company Dubai | Civil Contractor Dubai | Authority Approvals Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
