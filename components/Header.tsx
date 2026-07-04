import { approvalServices } from "@/data/approvals";
import { arabicApprovalTitle, arabicNavItems, arabicServiceTitle } from "@/data/arabic";
import { navItems, services, site } from "@/data/site";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return (
    <HeaderClient
      navItems={navItems}
      arabicNavItems={arabicNavItems}
      services={services.map(({ slug, title, href }) => ({ slug, title, href }))}
      arabicServices={services.map(({ slug, href }) => ({ slug, title: arabicServiceTitle(href), href }))}
      approvalServices={approvalServices.map(({ slug, menuLabel, href }) => ({ slug, menuLabel, href }))}
      arabicApprovalServices={approvalServices.map(({ slug, href }) => ({ slug, menuLabel: arabicApprovalTitle(href), href }))}
      contact={{
        phone: site.phone,
        email: site.email,
        location: site.location,
      }}
    />
  );
}
