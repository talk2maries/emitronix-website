import { approvalServices } from "@/data/approvals";
import { navItems, services, site, whatsappUrl } from "@/data/site";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return (
    <HeaderClient
      navItems={navItems}
      services={services.map(({ slug, title, href }) => ({ slug, title, href }))}
      approvalServices={approvalServices.map(({ slug, menuLabel, href }) => ({ slug, menuLabel, href }))}
      contact={{
        phone: site.phone,
        email: site.email,
        location: site.location,
        whatsappUrl,
      }}
    />
  );
}
