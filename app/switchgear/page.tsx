import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { absoluteUrl, services } from "@/data/site";

const service = services.find((item) => item.href === "/switchgear")!;

export const metadata: Metadata = {
  title: "LV Switchgear Solutions",
  description: "LV panels, MDB, SMDB, DB, MCC, capacitor banks and custom switchgear panels in Dubai and UAE.",
  keywords: service.keywords,
  alternates: { canonical: absoluteUrl("/switchgear") },
};

export default function SwitchgearPage() {
  return <ServiceDetailPage service={service} />;
}
