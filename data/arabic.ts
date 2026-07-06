import type { Metadata } from "next";
import { approvalServices } from "@/data/approvals";
import { blogPosts, type BlogPost } from "@/data/blog";
import { portfolioProjects } from "@/data/projects";
import { absoluteUrl, allServiceAliasPaths, getServiceByRoutePath, navItems, services, site } from "@/data/site";
import { toArabicPath, toEnglishPath } from "@/lib/i18n";

export const arabicFooterLabels = {
  navigation: "التنقل",
  services: "الخدمات",
  approvals: "الموافقات",
  industries: "القطاعات",
  contact: "التواصل",
  resources: "الموارد",
  htmlSitemap: "خريطة الموقع",
  cookiePolicy: "سياسة ملفات تعريف الارتباط",
  privacyPolicy: "سياسة الخصوصية",
  terms: "الشروط والأحكام",
  cookieSettings: "إعدادات ملفات تعريف الارتباط",
  startProject: "ابدأ مشروعك",
  startProjectTitle: "امنح مشروعك القادم في دبي وضوحا هندسيا من البداية.",
  quote: "اطلب عرض سعر",
  whatsapp: "واتساب",
  footerTagline: "شركة مقاولات في دبي | مقاول أعمال مدنية | تنسيق موافقات الجهات",
};

export const arabicUi = {
  language: "العربية",
  english: "English",
  arabic: "العربية",
  switchToArabic: "العربية",
  switchToEnglish: "English",
  quote: "اطلب عرض سعر",
  siteVisit: "اطلب زيارة للموقع",
  whatsapp: "واتساب",
  callNow: "اتصل الآن",
  needHelp: "تحتاج مساعدة؟",
  exploreServices: "استكشف الخدمات",
  viewProjects: "عرض المشاريع",
  contactTeam: "تواصل مع الفريق",
  readMore: "اقرأ المزيد",
  relatedPages: "صفحات ذات صلة",
  breadcrumbHome: "الرئيسية",
  breadcrumbServices: "الخدمات",
  breadcrumbApprovals: "الموافقات",
  projectLocation: "الموقع",
  scope: "نطاق العمل",
  status: "الحالة",
  submit: "إرسال الطلب",
};

export const arabicNavLabels: Record<string, string> = {
  "/": "الرئيسية",
  "/about": "من نحن",
  "/services": "الخدمات",
  "/projects": "المشاريع",
  "/industries": "القطاعات",
  "/careers": "الوظائف",
  "/blog": "المدونة",
  "/contact": "اتصل بنا",
};

export const arabicNavItems = navItems.map((item) => ({
  ...item,
  label: arabicNavLabels[item.href] ?? item.label,
}));

export const arabicServiceTitles: Record<string, string> = {
  "/civil": "المقاولات المدنية",
  "/main-contracting": "المقاولات الرئيسية",
  "/warehouse-construction": "إنشاء المستودعات",
  "/industrial-buildings": "المباني الصناعية",
  "/commercial-buildings": "المباني التجارية",
  "/villa-construction": "إنشاء الفلل",
  "/interior": "أعمال التصميم والتنفيذ الداخلي",
  "/building-renovation": "تجديد المباني",
  "/structural-works": "الأعمال الإنشائية",
  "/design-build": "التصميم والبناء",
  "/turnkey-construction": "مشاريع تسليم المفتاح",
  "/project-management": "إدارة المشاريع",
};

export const arabicApprovalTitles: Record<string, string> = {
  "/dubai-municipality-approval": "موافقة بلدية دبي",
  "/dda-approvals": "موافقات سلطة دبي للتطوير",
  "/dcd-approvals": "موافقات الدفاع المدني دبي",
  "/dewa-approvals": "موافقات هيئة كهرباء ومياه دبي",
  "/trakhees-approvals": "موافقات تراخيص",
  "/difc-approvals": "موافقات مركز دبي المالي العالمي",
  "/concordia-dmcc-approvals": "موافقات كونكورديا ومركز دبي للسلع المتعددة",
  "/rta-approval": "موافقة هيئة الطرق والمواصلات",
};

export const arabicBlogTitles: Record<string, string> = {
  "complete-guide-civil-construction-dubai-2026": "الدليل الشامل للمقاولات المدنية في دبي 2026",
  "dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees": "شرح موافقات الجهات في دبي: ديوا وبلدية دبي والدفاع المدني وتراخيص",
  "warehouse-construction-dubai-planning-design-authority-approvals": "إنشاء المستودعات في دبي: التخطيط والتصميم والموافقات",
  "choose-best-building-contractor-dubai": "كيفية اختيار أفضل مقاول بناء في دبي",
  "warehouse-construction-cost-dubai": "تكلفة إنشاء المستودعات في دبي والعوامل المؤثرة",
  "main-contractor-vs-general-contractor-dubai": "الفرق بين المقاول الرئيسي والمقاول العام في دبي",
  "warehouse-design-guide-uae": "دليل تصميم المستودعات في دولة الإمارات",
  "commercial-building-construction-guide-dubai": "دليل إنشاء المباني التجارية في دبي",
  "villa-construction-process-dubai": "مراحل إنشاء الفلل في دبي",
  "construction-approvals-explained-dubai": "شرح موافقات البناء في دبي",
  "industrial-building-planning-guide-uae": "دليل تخطيط المباني الصناعية في الإمارات",
  "construction-cost-saving-tips-dubai": "نصائح لتقليل تكلفة البناء في دبي دون التأثير على الجودة",
};

const commonPages: Record<string, ArabicPageData> = {
  "/": {
    path: "/",
    eyebrow: "شركة مقاولات في دبي",
    title: "شريك مقاولات في دبي للمشاريع التي تحتاج وضوحا قبل التنفيذ.",
    description:
      "تدعم Emitronix Contracting LLC المقاولات المدنية، البناء، المستودعات، الفلل، التشطيبات الداخلية، تنسيق MEP وموافقات الجهات في دبي والإمارات.",
    image: "/images/dubai-building-contracting-company.webp",
    imageAlt: "موقع بناء في دبي يعكس خدمات Emitronix Contracting LLC",
    primaryCta: { label: "اطلب عرض سعر", href: "/ar/contact" },
    secondaryCta: { label: "استكشف الخدمات", href: "/ar/services" },
    sections: [
      {
        eyebrow: "ماذا نقدم",
        title: "حلول مقاولات متكاملة لمشاريع دبي والإمارات.",
        body: [
          "تربط Emitronix بين الأعمال المدنية، التشطيبات الداخلية، تنسيق MEP، موافقات الجهات، وإدارة التسليم ضمن مسار واضح يناسب ملاك المشاريع والاستشاريين والفرق التجارية.",
          "نعمل على تحويل الموقع، الرسومات، حالة الموافقات، القيود التشغيلية ومتطلبات التسليم إلى نطاق عملي قابل للمتابعة قبل بدء ضغط التنفيذ في الموقع.",
        ],
        links: services.map((service) => ({
          label: arabicServiceTitle(service.href),
          href: toArabicPath(service.href),
        })),
      },
      {
        eyebrow: "إدارة المشروع",
        title: "تنفيذ في دبي مع رؤية أوضح للمخاطر والقرارات.",
        body: [
          "تتعامل الشركة مع الموافقات والرسومات والموقع والتوريد والتسليم كنظام واحد، وليس كمهام منفصلة. هذا يساعد على تقليل التأخير وإبقاء الأطراف على مسار مشترك.",
          "تغطي اللغة التشغيلية للموقع أعمال المقاولات المدنية، الفلل، المستودعات، المباني التجارية، التجديدات، التشطيبات الداخلية ومتابعة الموافقات.",
        ],
      },
    ],
  },
  "/about": {
    path: "/about",
    eyebrow: "من نحن",
    title: "مقاول في دبي يعتمد على الوضوح والانضباط في التنفيذ.",
    description:
      "تجمع Emitronix Contracting LLC بين المقاولات المدنية، البناء، التشطيبات الداخلية وتنسيق موافقات الجهات لخدمة العملاء في دبي ودولة الإمارات.",
    image: "/images/about-construction-coordination-dubai.webp",
    imageAlt: "فريق إنشائي يراجع رسومات مشروع في دبي",
    sections: [
      {
        eyebrow: "معيار الشركة",
        title: "تنفيذ مبني على الثقة والوضوح.",
        body: [
          "تركز Emitronix على التنسيق الهندسي، جاهزية الموافقات، الإشراف العملي في الموقع والتواصل المهني مع الملاك والاستشاريين.",
          "يتم الحفاظ على بيانات العمل مثل الاسم القانوني ورقم الهاتف والبريد الإلكتروني والموقع من مصدر معلومات الموقع المعتمد.",
        ],
      },
      {
        eyebrow: "طريقة العمل",
        title: "نظام هادئ للتعامل مع نطاقات دبي المعقدة.",
        body: [
          "نبدأ بفهم الموقع والرسومات والأدوار وحالة الموافقات، ثم نحول نطاق المشروع إلى متطلبات واضحة للأعمال المدنية والداخلية وMEP والتسليم.",
          "تظل القرارات والمستندات والتعليقات الفنية ظاهرة للمالك والاستشاري وفريق الموقع حتى نهاية التسليم.",
        ],
      },
    ],
  },
  "/services": {
    path: "/services",
    eyebrow: "الخدمات",
    title: "منصة مقاولات متكاملة لمشاريع دبي.",
    description:
      "تنسق Emitronix أعمال المقاولات المدنية، التشطيبات الداخلية وموافقات الجهات حتى ينتقل العميل من تحديد النطاق إلى التسليم بثقة أوضح.",
    image: "/images/warehouse-construction-dubai.webp",
    imageAlt: "إنشاء مستودع في دبي وخدمات المقاولات الصناعية",
    sections: [
      {
        eyebrow: "الخدمات الأساسية",
        title: "أعمال مدنية، مقاولات رئيسية، مستودعات، فلل وتشطيبات ضمن مسار واحد.",
        body: [
          "تم تنظيم كل خدمة حول متطلبات دبي العملية: الرسومات، الموقع، الجهات، القيود، التكلفة، الجدول الزمني وجاهزية التسليم.",
        ],
        links: services.map((service) => ({
          label: arabicServiceTitle(service.href),
          href: toArabicPath(service.href),
        })),
      },
      {
        eyebrow: "موافقات دبي",
        title: "خدمات موافقات الجهات مدمجة في تخطيط المشروع.",
        body: [
          "يشمل الدعم بلدية دبي، DDA، DCD، DEWA، تراخيص، DIFC، كونكورديا-DMCC وRTA بحسب موقع المشروع ونوعه ومسؤولية الاستشاري.",
        ],
        links: approvalServices.map((service) => ({
          label: arabicApprovalTitle(service.href),
          href: toArabicPath(service.href),
        })),
      },
    ],
  },
  "/approval": {
    path: "/approval",
    eyebrow: "موافقات الجهات",
    title: "تنسيق موافقات دبي كجزء من مسار البناء.",
    description:
      "نساعد ملاك المشاريع والاستشاريين في ترتيب متطلبات المستندات، التعليقات، الجاهزية للتفتيش وربط الموافقات بالتنفيذ في الموقع.",
    image: "/images/dubai-authority-approval-contractor.webp",
    imageAlt: "تنسيق مستندات وموافقات الجهات لمشاريع دبي",
    sections: [
      {
        eyebrow: "قائمة الموافقات",
        title: "مسارات موافقات مرتبطة بالأعمال المدنية والتشطيبات.",
        body: [
          "تختلف متطلبات الجهات حسب الموقع، نوع الأصل، الاستخدام، نطاق التعديل ومسؤوليات المالك والاستشاري. لذلك يبدأ العمل بمراجعة المستندات وتحديد الطريق الصحيح.",
        ],
        links: approvalServices.map((service) => ({
          label: arabicApprovalTitle(service.href),
          href: toArabicPath(service.href),
        })),
      },
    ],
  },
  "/guest-post": {
    path: "/guest-post",
    eyebrow: "مقالات الضيوف",
    title: "استفسارات مقالات الضيوف لموضوعات البناء والموافقات.",
    description:
      "استخدم هذه الصفحة للاستفسارات المتعلقة بمقالات البناء والمقاولات والتشطيبات والمستودعات والفلل وإدارة المشاريع وموافقات الجهات في دبي.",
    image: "/images/dubai-civil-works-construction-site.webp",
    imageAlt: "استفسارات مقالات البناء والضيوف لدى Emitronix",
    primaryCta: { label: "تواصل مع Emitronix", href: "/ar/contact" },
    secondaryCta: { label: "اقرأ المدونة", href: "/ar/blog" },
    sections: [
      {
        eyebrow: "ملاءمة الموضوع",
        title: "موضوعات عملية مرتبطة بالبناء في دبي.",
        body: [
          "يمكن إرسال الاستفسارات المرتبطة بالمقاولات المدنية، المستودعات، الفلل، التشطيبات، إدارة المشاريع أو موافقات الجهات للمراجعة قبل النشر.",
          "يجب أن يكون المحتوى مناسبا لجمهور ملاك المشاريع والاستشاريين والفرق التجارية، وأن يتجنب أي ادعاءات غير موثقة.",
        ],
      },
    ],
  },
  "/projects": {
    path: "/projects",
    eyebrow: "المشاريع",
    title: "ملفات مشاريع تمثيلية لأعمال البناء في دبي.",
    description:
      "استعرض ملفات أعمال مدنية، تنسيق MEP، تجديدات، صيانة، تشطيبات داخلية، موافقات ومستودعات مع لغة نشر آمنة ومرتبطة بنشاط Emitronix.",
    image: "/images/project-warehouse-industrial-dubai.webp",
    imageAlt: "ملف مشروع مستودع وأعمال صناعية في دبي",
    sections: [
      {
        eyebrow: "خبرة المشاريع",
        title: "محفظة مبنية حول واقع الموقع ووضوح الجهات والتسليم.",
        body: [
          "تعرض هذه الصفحة أنواع الأعمال التي تدعمها الشركة في دبي: إصلاحات وأعمال مدنية، مقاولات مباني، ترقيات مستودعات، تجديد فلل، تشطيبات تجارية، تنسيق MEP ودعم الموافقات.",
        ],
        cards: portfolioProjects.slice(0, 9).map((project) => ({
          title: arabicProjectTitle(project.title),
          body: arabicProjectDescription(project.category),
          image: project.image,
          imageAlt: `ملف مشروع ${arabicProjectTitle(project.title)} في دبي`,
        })),
      },
    ],
  },
  "/industries": {
    path: "/industries",
    eyebrow: "القطاعات",
    title: "دعم مقاولات لقطاعات الفلل والمستودعات والمباني التجارية.",
    description:
      "تخدم Emitronix بيئات مشاريع مختلفة في دبي والإمارات مثل الفلل، المستودعات، المباني التجارية، التجزئة، الضيافة والأصول الصناعية.",
    image: "/images/commercial-fit-out-contractor-dubai.webp",
    imageAlt: "أعمال تشطيبات ومشاريع تجارية في دبي",
    sections: [
      {
        eyebrow: "قطاعات العمل",
        title: "كل قطاع يحتاج تسلسلا واضحا للموقع والموافقات والتسليم.",
        body: [
          "تختلف احتياجات الفيلا عن المستودع أو المحل التجاري أو المنشأة الصناعية. لذلك تراجع الشركة الاستخدام، الرسومات، القيود، الجهات والتشغيل قبل تحديد المسار التنفيذي.",
        ],
        links: [
          { label: "الفلل الفاخرة", href: "/ar/villa-construction" },
          { label: "المستودعات واللوجستيات", href: "/ar/warehouse-construction" },
          { label: "المباني التجارية", href: "/ar/commercial-buildings" },
          { label: "التشطيبات الداخلية", href: "/ar/interior" },
        ],
      },
    ],
  },
  "/careers": {
    path: "/careers",
    eyebrow: "وظائف البناء في دبي",
    title: "ابن مسيرتك المهنية مع Emitronix.",
    description:
      "نرحب بملفات الهندسة المدنية، التنفيذ، الإشراف، إدارة المشاريع، التنسيق الفني والتشطيبات في دبي ودولة الإمارات.",
    image: "/images/civil-contractor-dubai-construction-site.webp",
    imageAlt: "فرص عمل هندسية وإنشائية في دبي مع Emitronix",
    form: "career",
    sections: [
      {
        eyebrow: "بيئة العمل",
        title: "بيئة مقاولات مهنية للأشخاص الذين يقدرون الوضوح.",
        body: [
          "تبحث Emitronix عن مهنيين يهتمون بقرارات الموقع العملية، ضبط الرسومات، التواصل الموثق، السلامة وجودة التسليم.",
        ],
      },
    ],
  },
  "/blog": {
    path: "/blog",
    eyebrow: "مدونة البناء في دبي",
    title: "رؤى عملية تساعدك على اتخاذ قرارات مشروع أفضل.",
    description:
      "مقالات عربية حول المقاولات المدنية، المستودعات، الفلل، المباني التجارية، التشطيبات، موافقات دبي وإدارة المشاريع.",
    image: "/images/dubai-civil-works-construction-site.webp",
    imageAlt: "مدونة Emitronix حول البناء والموافقات في دبي",
    sections: [
      {
        eyebrow: "أحدث المقالات",
        title: "أدلة عملية لأصحاب المشاريع والاستشاريين.",
        body: [
          "اختر مقالا لفهم المتطلبات العملية قبل بدء التنفيذ أو طلب عرض السعر.",
        ],
        links: blogPosts.map((post) => ({
          label: arabicBlogTitle(post),
          href: `/ar/blog/${post.slug}`,
        })),
      },
    ],
  },
  "/resources": {
    path: "/resources",
    eyebrow: "الموارد",
    title: "موارد تساعدك على تجهيز متطلبات المشروع.",
    description:
      "مداخل سريعة لفهم الخدمات، الموافقات، المشاريع، المقالات وطرق التواصل مع Emitronix في دبي.",
    image: "/images/project-authority-approvals-dubai.webp",
    imageAlt: "موارد وتنسيق مستندات لمشاريع دبي",
    sections: [
      {
        eyebrow: "روابط مفيدة",
        title: "ابدأ من نقطة المشكلة التي تحتاج حلها.",
        body: [
          "تجمع هذه الصفحة روابط الخدمات والموافقات والمشاريع والمدونة حتى تصل إلى المسار المناسب بسرعة.",
        ],
        links: [
          { label: "الخدمات", href: "/ar/services" },
          { label: "الموافقات", href: "/ar/approval" },
          { label: "المشاريع", href: "/ar/projects" },
          { label: "المدونة", href: "/ar/blog" },
          { label: "اتصل بنا", href: "/ar/contact" },
        ],
      },
    ],
  },
  "/html-sitemap": {
    path: "/html-sitemap",
    eyebrow: "خريطة الموقع",
    title: "خريطة روابط Emitronix.",
    description: "روابط منظمة للوصول إلى صفحات الخدمات، المشاريع، الموافقات، السياسات والمدونة باللغتين.",
    image: "/images/dubai-building-contracting-company.webp",
    imageAlt: "خريطة موقع Emitronix",
    sections: [
      {
        eyebrow: "الصفحات الرئيسية",
        title: "كل صفحات الموقع العربية.",
        body: ["استخدم هذه الروابط للوصول إلى النسخة العربية المقابلة لكل صفحة منشورة."],
        links: [
          { label: "الرئيسية", href: "/ar" },
          { label: "من نحن", href: "/ar/about" },
          { label: "الخدمات", href: "/ar/services" },
          { label: "الموافقات", href: "/ar/approval" },
          { label: "المشاريع", href: "/ar/projects" },
          { label: "المدونة", href: "/ar/blog" },
          { label: "اتصل بنا", href: "/ar/contact" },
        ],
      },
    ],
  },
  "/contact": {
    path: "/contact",
    eyebrow: "اتصل بنا",
    title: "ابدأ محادثة مشروع احترافية في دبي.",
    description:
      "شارك متطلبات الأعمال المدنية أو التشطيبات أو التجديد أو موافقات الجهات. أرسل الموقع والنطاق والجدول الزمني وحالة الموافقات الحالية.",
    image: "/images/building-contractor-dubai-construction-site.webp",
    imageAlt: "استشارة مشروع بناء في دبي مع Emitronix",
    form: "contact",
    sections: [
      {
        eyebrow: "دبي، الإمارات",
        title: "تواصل مع Emitronix.",
        body: [
          `الهاتف: ${site.phone}`,
          `البريد الإلكتروني: ${site.email}`,
          `الموقع: ${site.location}`,
          "تساعد تفاصيل المشروع المبكرة على تحديد ما إذا كان المسار المناسب مدنيا أو داخليا أو مرتبطا بالموافقات أو يجمع بينها.",
        ],
      },
    ],
  },
};

export type ArabicSection = {
  eyebrow: string;
  title: string;
  body: string[];
  links?: Array<{ label: string; href: string }>;
  cards?: Array<{ title: string; body: string; image?: string; imageAlt?: string }>;
};

export type ArabicPageData = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  form?: "contact" | "career";
  sections: ArabicSection[];
  kind?: "service" | "approval" | "blog-post" | "generic";
};

export const englishBaseRoutes = [
  "/",
  "/about",
  "/services",
  "/approval",
  "/approvals",
  "/projects",
  "/industries",
  "/careers",
  "/blog",
  "/resources",
  "/html-sitemap",
  "/contact",
  "/guest-post",
  "/cookie-policy",
  "/privacy-policy",
  "/terms-and-conditions",
  ...services.map((service) => service.href),
  ...allServiceAliasPaths(),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...approvalServices.map((service) => service.href),
];

export function arabicSitemapPaths() {
  return Array.from(new Set(englishBaseRoutes.map((route) => toArabicPath(route))));
}

export function arabicServiceTitle(href: string) {
  return arabicServiceTitles[href] ?? services.find((service) => service.href === href)?.title ?? href;
}

export function arabicApprovalTitle(href: string) {
  return arabicApprovalTitles[href] ?? approvalServices.find((service) => service.href === href)?.menuLabel ?? href;
}

export function arabicBlogTitle(post: BlogPost) {
  return arabicBlogTitles[post.slug] ?? post.title;
}

export function arabicPathLabel(arabicPath: string) {
  const englishPath = toEnglishPath(arabicPath);
  if (englishPath === "/") return "الرئيسية";
  if (commonPages[englishPath]) return commonPages[englishPath].title;
  if (englishPath === "/approvals") return commonPages["/approval"].title;
  const service = getServiceByRoutePath(englishPath);
  if (service) return arabicServiceTitle(service.href);
  if (arabicServiceTitles[englishPath]) return arabicServiceTitles[englishPath];
  if (arabicApprovalTitles[englishPath]) return arabicApprovalTitles[englishPath];
  const blogPost = blogPosts.find((post) => `/blog/${post.slug}` === englishPath);
  if (blogPost) return arabicBlogTitle(blogPost);
  if (englishPath === "/cookie-policy") return "سياسة ملفات تعريف الارتباط";
  if (englishPath === "/privacy-policy") return "سياسة الخصوصية";
  if (englishPath === "/terms-and-conditions") return "الشروط والأحكام";
  return englishPath.replace("/", "").replace(/-/g, " ");
}

export function getArabicPageByEnglishPath(path: string): ArabicPageData | null {
  const cleanPath = path === "" ? "/" : path;
  const canonicalPath = cleanPath === "/approvals" ? "/approval" : cleanPath;
  if (commonPages[canonicalPath]) return { ...commonPages[canonicalPath], kind: "generic" };

  const service = getServiceByRoutePath(canonicalPath);
  if (service) {
    const title = arabicServiceTitle(service.href);
    return {
      path: service.href,
      kind: "service",
      eyebrow: "خدمة مقاولات في دبي",
      title: `${title} في دبي`,
      description: `دعم احترافي لخدمة ${title} في دبي مع تنسيق الرسومات، الموقع، الجهات، MEP، التنفيذ وجاهزية التسليم.`,
      image: service.image,
      imageAlt: `${title} في دبي من Emitronix Contracting LLC`,
      primaryCta: { label: "اطلب عرض سعر", href: "/ar/contact" },
      secondaryCta: { label: "عرض المشاريع", href: "/ar/projects" },
      sections: [
        {
          eyebrow: "نظرة عامة",
          title: `مسار واضح لخدمة ${title}.`,
          body: [
            `تساعد Emitronix العملاء والاستشاريين على تحويل متطلبات ${title} إلى نطاق قابل للتنفيذ في دبي، مع مراجعة الموقع، الرسومات، حالة الموافقات، قيود الوصول ومتطلبات التسليم.`,
            "تتم مراجعة الأعمال المدنية والإنشائية والداخلية وMEP والمستندات كمنظومة واحدة حتى لا تتحول التفاصيل المتأخرة إلى تأخير في الموقع.",
          ],
        },
        {
          eyebrow: "منهجية التنفيذ",
          title: "من تحديد النطاق إلى التسليم.",
          body: [
            "تبدأ المنهجية بمراجعة المعلومات المتاحة ثم تحديد المسؤوليات بين المالك والاستشاري والمقاول والجهات ذات العلاقة.",
            "بعد ذلك يتم تنظيم القرارات والمستندات والتوريد والتفتيش والتسليم ضمن إيقاع واضح يناسب طبيعة المشروع.",
          ],
          links: [
            { label: "الخدمات", href: "/ar/services" },
            { label: "المشاريع", href: "/ar/projects" },
            { label: "اتصل بنا", href: "/ar/contact" },
          ],
        },
      ],
    };
  }

  const approval = approvalServices.find((item) => item.href === cleanPath);
  if (approval) {
    const title = arabicApprovalTitle(approval.href);
    return {
      path: approval.href,
      kind: "approval",
      eyebrow: "موافقة جهة في دبي",
      title,
      description: `تنسيق ${title} لمشاريع البناء والتشطيبات والتعديلات في دبي مع مراجعة المستندات والتعليقات وجاهزية التفتيش.`,
      image: "/images/dubai-authority-approval-contractor.webp",
      imageAlt: `${title} لمشاريع البناء في دبي`,
      primaryCta: { label: "اطلب دعم الموافقات", href: "/ar/contact" },
      secondaryCta: { label: "كل الموافقات", href: "/ar/approval" },
      sections: [
        {
          eyebrow: "نظرة عامة",
          title: `دعم منظم لمسار ${title}.`,
          body: [
            "تتعامل Emitronix مع الموافقات كجزء من التحكم في المشروع: النطاق، الرسومات، المستندات، تعليقات الجهة، جاهزية الموقع ومستندات الإغلاق تبقى مرتبطة.",
            "تختلف المتطلبات النهائية حسب الموقع، نوع العقار، نطاق التعديل، متطلبات المالك أو المطور، ومسؤولية الاستشاري.",
          ],
        },
        {
          eyebrow: "جاهزية المستندات",
          title: "تجنب دورات التقديم المتكررة.",
          body: [
            "تساعد مراجعة فجوات المستندات قبل التقديم على تقليل التعليقات المتكررة وتحسين جاهزية الفريق للرد والتفتيش.",
            "شارك الموقع، الرسومات، التعليقات الحالية، NOC إن وجدت، وبيانات الاستشاري حتى يتم تحديد الخطوة العملية التالية.",
          ],
        },
      ],
    };
  }

  const blogPost = blogPosts.find((post) => `/blog/${post.slug}` === cleanPath);
  if (blogPost) return arabicBlogPage(blogPost);

  return null;
}

export function getArabicMetadata(page: ArabicPageData): Metadata {
  const path = toArabicPath(page.path);
  const canonical = absoluteUrl(path);
  const english = absoluteUrl(page.path);
  const title = `${page.title} | ${site.name}`;
  const imageUrl = absoluteUrl(page.image);

  return {
    title: { absolute: title },
    description: page.description,
    alternates: {
      canonical,
      languages: {
        ar: canonical,
        en: english,
        "ar-AE": canonical,
        "en-AE": english,
        "x-default": english,
      },
    },
    openGraph: {
      type: "website",
      locale: "ar_AE",
      url: canonical,
      siteName: site.name,
      title,
      description: page.description,
      images: [{ url: imageUrl, width: 1672, height: 941, alt: page.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [imageUrl],
    },
    other: {
      "content-language": "ar-AE",
    },
  };
}

function arabicBlogPage(post: BlogPost): ArabicPageData {
  const title = arabicBlogTitle(post);
  return {
    path: `/blog/${post.slug}`,
    kind: "blog-post",
    eyebrow: "مقال من مدونة Emitronix",
    title,
    description:
      "مقال عربي عملي لأصحاب المشاريع والاستشاريين حول قرارات البناء والموافقات والتسليم في دبي ودولة الإمارات.",
    image: post.image,
    imageAlt: `مقال عربي حول ${title}`,
    primaryCta: { label: "ناقش مشروعك", href: "/ar/contact" },
    secondaryCta: { label: "عودة إلى المدونة", href: "/ar/blog" },
    sections: [
      {
        eyebrow: "مقدمة",
        title: "ما الذي يجب فهمه قبل اتخاذ القرار؟",
        body: [
          "تساعد هذه المقالة على ترتيب التفكير قبل طلب عرض السعر أو بدء العمل في الموقع. تبدأ مشاريع دبي الناجحة بفهم الموقع، الرسومات، حالة الموافقات، الأدوار، المخاطر ومتطلبات التسليم.",
          "المحتوى مخصص للتوجيه العملي ولا يغني عن مراجعة الاستشاري أو متطلبات الجهة المختصة لكل مشروع.",
        ],
      },
      {
        eyebrow: "نقاط رئيسية",
        title: "الوضوح المبكر يقلل التأخير.",
        body: [
          "حدد نوع الأصل والاستخدام المقصود والرسومات المتاحة وحالة NOC أو تعليقات الجهات قبل المقارنة بين المقاولين.",
          "راجع العلاقة بين الأعمال المدنية وMEP والتشطيبات والموافقات، لأن فصلها في التخطيط قد يؤدي إلى إعادة عمل أو تأخير في التفتيش والتسليم.",
          "اطلب نطاقا واضحا يتضمن الافتراضات والاستثناءات ومسؤوليات المستندات والتسليم، وليس سعرا مختصرا فقط.",
        ],
      },
      {
        eyebrow: "الخطوة التالية",
        title: "شارك تفاصيل المشروع مع الفريق.",
        body: [
          "عند التواصل مع Emitronix، أرسل الموقع، الرسومات، صور الموقع، التعليقات الحالية، الجدول المطلوب وأي متطلبات من المالك أو المطور أو الجهة.",
        ],
        links: [
          { label: "المقاولات المدنية", href: "/ar/civil" },
          { label: "موافقات الجهات", href: "/ar/approval" },
          { label: "اتصل بنا", href: "/ar/contact" },
        ],
      },
    ],
  };
}

function arabicProjectTitle(title: string) {
  if (title.includes("Villa")) return "أعمال تجديد فيلا في دبي";
  if (title.includes("Warehouse")) return "ترقية مدنية وكهروميكانيكية لمستودع";
  if (title.includes("Office")) return "أعمال تشطيبات مكتب";
  if (title.includes("Maintenance")) return "أعمال صيانة مبنى";
  if (title.includes("DEWA")) return "دعم موافقة DEWA";
  if (title.includes("Shop")) return "تجديد محل تجاري";
  if (title.includes("Industrial")) return "تعديل منشأة صناعية";
  if (title.includes("MEP")) return "تنسيق أعمال MEP";
  if (title.includes("Authority")) return "دعم موافقات وNOC";
  return "أعمال مدنية وصيانة في دبي";
}

function arabicProjectDescription(category: string) {
  const labels: Record<string, string> = {
    "Civil Works": "أعمال مدنية مرتبطة بالموقع والرسومات والتسليم.",
    "MEP Works": "تنسيق خدمات MEP مع الأعمال المدنية والتشطيبات.",
    "Interior Fit-Out": "تنفيذ داخلي منظم مع مراعاة المالك والجهات.",
    "Commercial Renovation": "تجديد تجاري بترتيب واضح للوقت والجودة.",
    Maintenance: "دعم صيانة وتشغيل للمباني القائمة.",
    "Authority Approvals": "تنسيق مستندات وتعليقات وموافقات الجهات.",
  };
  return labels[category] ?? "ملف مشروع تمثيلي من نطاقات عمل Emitronix في دبي.";
}
