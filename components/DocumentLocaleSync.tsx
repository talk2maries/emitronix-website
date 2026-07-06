"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isArabicPath } from "@/lib/i18n";

export function DocumentLocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isArabic = isArabicPath(pathname);
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [pathname]);

  return null;
}
