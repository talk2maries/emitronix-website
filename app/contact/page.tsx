import { ClipboardCheck, FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FAQSection, InsightGrid, ProcessRail, TrustBar } from "@/components/ContentBlocks";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, PremiumSectionHeading } from "@/components/Premium";
import { getGeneratedImage } from "@/data/generatedImages";
import { absoluteUrl, contactItems, site, whatsappUrl } from "@/data/site";
import { createMetadataResolver } from "@/data/seo";

export const generateMetadata = createMetadataResolver({
  title: "Contact Emitronix Dubai",
  description:
    "Contact Emitronix Contracting LLC in Dubai for civil contracting, villa construction, warehouse projects, authority approvals and interior fit-out enquiries.",
  path: "/contact",
  keywords: ["contact Emitronix Dubai", "Dubai contracting quote", "civil contractor contact", "Dubai Municipality approval contractor"],
  image: getGeneratedImage("company.dubai-project-consultation-hero").og!.src,
  imageAlt: getGeneratedImage("company.dubai-project-consultation-hero").alt,
});

const contactSignals = [
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "WhatsApp", value: "Chat with Emitronix", href: whatsappUrl, icon: MessageCircle },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "Location", value: site.location, href: "/contact", icon: MapPin },
];

const enquiryGuidance = [
  {
    title: "Project location and asset type",
    description: "Mention whether the enquiry is for a villa, warehouse, commercial unit, industrial facility, retail space, fit-out or authority approval support.",
    icon: MapPin,
  },
  {
    title: "Current documents and drawings",
    description: "Share whether architectural, structural, MEP, authority comments, NOCs, tenancy or plot documents are available.",
    icon: FileText,
  },
  {
    title: "Required outcome",
    description: "Clarify whether you need a site assessment, construction proposal, approval coordination, fit-out support, renovation planning or handover help.",
    icon: ClipboardCheck,
  },
];

const contactProcess = [
  "Submit the contact form, call or email with project details and the service path you believe is relevant.",
  "Include location, drawings, authority status, intended use, timeline and any current comments or constraints.",
  "Emitronix can review the enquiry context and identify whether civil, fit-out, approval or combined coordination is the practical next step.",
  "Urgent project requirements can be escalated through direct phone or email using the verified business contact details.",
];

const contactFaqs = [
  {
    question: "What is the fastest way to contact Emitronix?",
    answer: `Call ${site.phone} or email ${site.email}. With consent, the website form sends a structured project enquiry to the company's follow-up system.`,
  },
  {
    question: "What should I include in a construction enquiry?",
    answer:
      "Include project location, asset type, drawings available, authority status, intended service, site condition, preferred timeline and any existing authority comments.",
  },
  {
    question: "Can I request authority approval support through the contact page?",
    answer:
      "Yes. Mention the relevant authority, current comments or submission status if available, and whether the approval is connected to civil construction, fit-out or renovation work.",
  },
  {
    question: "Does Emitronix handle enquiries across Dubai?",
    answer:
      "Emitronix uses Dubai as its primary service area and supports enquiries connected to civil construction, interior fit-out, villas, warehouses, commercial works and authority coordination.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${absoluteUrl("/contact")}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
  ],
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${absoluteUrl("/contact")}#webpage`,
  url: absoluteUrl("/contact"),
  name: `Contact ${site.legalName}`,
  description: "Published contact details and project enquiry route for Emitronix Contracting LLC.",
  isPartOf: { "@id": absoluteUrl("/#website") },
  about: { "@id": absoluteUrl("/#organization") },
  breadcrumb: { "@id": `${absoluteUrl("/contact")}#breadcrumb` },
  inLanguage: "en-AE",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Start a premium Dubai project conversation."
        description="Share your civil construction, fit-out, renovation or authority approval requirements. Include the project location, scope, timeline and current approval status."
        imageAsset={getGeneratedImage("company.dubai-project-consultation-hero")}
        primaryCta={{ label: "Call Emitronix", href: `tel:${site.phone.replace(/\s/g, "")}` }}
        secondaryCta={{ label: "Email Team", href: `mailto:${site.email}` }}
      />

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="order-2 lg:order-1">
            <PremiumSectionHeading
              eyebrow="Dubai, UAE"
              title="Talk to Emitronix."
              description="Reach out for tender invitations, site assessments, authority approval coordination or design-and-build support."
            />
            <div className="mt-8 grid gap-4">
              {contactSignals.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="luxury-card flex gap-4 rounded-[1.5rem] p-5"
                  >
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    <span>
                      <span className="block text-sm font-black uppercase tracking-wide text-charcoal">{item.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-steel">{item.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="blue-grid section-pad text-charcoal">
        <div className="container-pad grid gap-5 md:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="rounded-[1.5rem] border border-brand/[0.12] bg-white/[0.82] p-5 backdrop-blur-xl">
                <Icon className="h-7 w-7 text-brand" />
                <h2 className="mt-5 text-lg font-black tracking-tight">{item.label}</h2>
                <p className="mt-2 text-sm leading-6 text-steel">{item.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <InsightGrid
        eyebrow="Before you enquire"
        title="Send the details that help a premium contractor respond intelligently."
        description="Good enquiry structure helps the team understand whether your requirement is civil, fit-out, approval, renovation, warehouse, villa or commercial project support."
        items={enquiryGuidance}
        tone="soft"
      />

      <ProcessRail
        eyebrow="Contact process"
        title="A clearer first conversation for Dubai construction projects."
        description="The contact experience is designed to turn an open enquiry into a practical project route."
        steps={contactProcess}
      />

      <TrustBar
        eyebrow="Contact trust"
        title="Consistent published contact details."
        points={[
          site.phone,
          site.email,
          site.location,
          site.hours,
        ]}
      />

      <FAQSection
        title="Contact Emitronix FAQ."
        description="Answers for project owners and consultants preparing a Dubai construction or approval enquiry."
        faqs={contactFaqs}
        schema
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />
    </>
  );
}
