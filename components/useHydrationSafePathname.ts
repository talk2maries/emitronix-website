"use client";

import { useEffect, useState } from "react";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

const INTERNAL_NOT_FOUND_PATH = "/__emitronix-route-not-found";

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
    return INTERNAL_NOT_FOUND_PATH;
  }

  return pathname;
}
