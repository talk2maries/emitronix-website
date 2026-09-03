import "../globals.css";
import { SiteRootLayout } from "@/components/SiteRootLayout";
import { createRootMetadata } from "@/data/rootMetadata";

// Arabic pages use a separate root layout so lang and dir are emitted in the
// server-rendered document without converting the site to dynamic rendering.
export const revalidate = 300;
export const metadata = createRootMetadata("ar");

export default function ArabicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootLayout locale="ar">{children}</SiteRootLayout>;
}
