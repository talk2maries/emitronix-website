import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CookieConsentAdmin, CookieConsentAdminLogin } from "@/components/CookieConsentAdmin";
import { hasCookieAdminCookie, isCookieAdminConfigured } from "@/lib/cookieConsentAdmin";
import { getCookieConsentData } from "@/lib/cookieConsentStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Cookie Consent Admin | Emitronix",
  },
  description: "Private Emitronix cookie-consent administration utility.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
    languages: {},
  },
  openGraph: null,
  twitter: null,
};

export default async function CookieConsentAdminPage() {
  const configured = isCookieAdminConfigured();
  const cookieStore = await cookies();

  if (!configured || !hasCookieAdminCookie(cookieStore)) {
    return <CookieConsentAdminLogin configured={configured} />;
  }

  const data = await getCookieConsentData();
  return <CookieConsentAdmin initialData={data} />;
}
