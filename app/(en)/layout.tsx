import "../globals.css";
import { SiteRootLayout } from "@/components/SiteRootLayout";
import { createRootMetadata } from "@/data/rootMetadata";

// Refresh statically generated pages every 5 minutes so administrator SEO
// overrides take effect without a rebuild.
export const revalidate = 300;
export const metadata = createRootMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootLayout locale="en">{children}</SiteRootLayout>;
}
