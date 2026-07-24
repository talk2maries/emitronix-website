"use client";

import { useEffect, useState } from "react";
import { isArabicPath } from "@/lib/i18n";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

const ENGLISH_INTERNAL_NOT_FOUND_PATH = "/__emitronix-route-not-found";
const ARABIC_INTERNAL_NOT_FOUND_PATH = "/ar/emitronix-route-not-found";

/**
 * Next.js exposes a rewrite destination during server rendering and the
 * browser URL during hydration. Keep the first client render aligned with the
 * server for branded not-found rewrites, then switch to the public URL.
 */
export function useHydrationSafePathname(pathname: string) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated && isUnknownClosedSetPath(pathname)) {
    return isArabicPath(pathname) ? ARABIC_INTERNAL_NOT_FOUND_PATH : ENGLISH_INTERNAL_NOT_FOUND_PATH;
  }

  return pathname;
}
