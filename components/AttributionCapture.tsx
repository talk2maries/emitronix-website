"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureCurrentPageAttribution, installAttributionCapture } from "@/lib/googleZoho/attribution-browser";

export function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => installAttributionCapture(), []);
  useEffect(() => {
    captureCurrentPageAttribution();
  }, [pathname]);
  return null;
}
