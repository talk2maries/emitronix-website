export type CookieLanguage = "en" | "ar";

export type CookieCategoryId = "necessary" | "analytics" | "marketing" | "functional" | "performance";

export type GoogleConsentKey = "ad_storage" | "analytics_storage" | "ad_user_data" | "ad_personalization";

export type LocalizedText = Record<CookieLanguage, string>;

export type CookieCategory = {
  id: CookieCategoryId;
  required: boolean;
  enabled: boolean;
  title: LocalizedText;
  description: LocalizedText;
  googleConsentKeys?: GoogleConsentKey[];
};

export type CookieBannerContent = {
  title: LocalizedText;
  description: LocalizedText;
  acceptAllLabel: LocalizedText;
  rejectLabel: LocalizedText;
  customizeLabel: LocalizedText;
  saveLabel: LocalizedText;
  closeLabel: LocalizedText;
  cookiePolicyLabel: LocalizedText;
  privacyPolicyLabel: LocalizedText;
  termsLabel: LocalizedText;
  settingsLabel: LocalizedText;
  categoryHeading: LocalizedText;
  alwaysEnabledLabel: LocalizedText;
  languageLabel: LocalizedText;
};

export type PolicySection = {
  heading: string;
  body: string;
};

export type LocalizedPolicyPage = Record<CookieLanguage, {
  title: string;
  description: string;
  lastUpdatedLabel: string;
  sections: PolicySection[];
}>;

export type CookiePolicyPageKey = "cookiePolicy" | "privacyPolicy" | "terms";

export type CookiePolicyPages = Record<CookiePolicyPageKey, LocalizedPolicyPage>;

export type CookieConsentConfig = {
  enabled: boolean;
  version: number;
  consentExpiryDays: number;
  updatedAt: string;
  banner: CookieBannerContent;
  categories: CookieCategory[];
  policyPages: CookiePolicyPages;
};

export type ConsentCategoryMap = Record<CookieCategoryId, boolean>;

export const cookieCategoryIds: CookieCategoryId[] = ["necessary", "analytics", "marketing", "functional", "performance"];

export const cookieLanguages: CookieLanguage[] = ["en", "ar"];

const updatedAt = "2026-07-04T00:00:00.000Z";

export const defaultCookieConsentConfig: CookieConsentConfig = {
  enabled: true,
  version: 1,
  consentExpiryDays: 180,
  updatedAt,
  banner: {
    title: {
      en: "Cookie preferences",
      ar: "تفضيلات ملفات تعريف الارتباط",
    },
    description: {
      en: "We use cookies to keep this website secure, understand performance, improve enquiries and support marketing only when you allow it. You can accept all cookies, reject non-essential cookies or customize your choices.",
      ar: "نستخدم ملفات تعريف الارتباط للحفاظ على أمان الموقع وفهم الأداء وتحسين تجربة التواصل ودعم التسويق فقط عند موافقتك. يمكنك قبول جميع الملفات أو رفض غير الضرورية أو تخصيص اختياراتك.",
    },
    acceptAllLabel: {
      en: "Accept All Cookies",
      ar: "قبول جميع ملفات الارتباط",
    },
    rejectLabel: {
      en: "Reject Non-Essential Cookies",
      ar: "رفض الملفات غير الضرورية",
    },
    customizeLabel: {
      en: "Customize Preferences",
      ar: "تخصيص التفضيلات",
    },
    saveLabel: {
      en: "Save Preferences",
      ar: "حفظ التفضيلات",
    },
    closeLabel: {
      en: "Close",
      ar: "إغلاق",
    },
    cookiePolicyLabel: {
      en: "Cookie Policy",
      ar: "سياسة ملفات الارتباط",
    },
    privacyPolicyLabel: {
      en: "Privacy Policy",
      ar: "سياسة الخصوصية",
    },
    termsLabel: {
      en: "Terms & Conditions",
      ar: "الشروط والأحكام",
    },
    settingsLabel: {
      en: "Cookie Settings",
      ar: "إعدادات ملفات الارتباط",
    },
    categoryHeading: {
      en: "Manage cookie categories",
      ar: "إدارة فئات ملفات الارتباط",
    },
    alwaysEnabledLabel: {
      en: "Always Enabled",
      ar: "مفعلة دائماً",
    },
    languageLabel: {
      en: "Language",
      ar: "اللغة",
    },
  },
  categories: [
    {
      id: "necessary",
      required: true,
      enabled: true,
      title: {
        en: "Strictly Necessary",
        ar: "ضرورية للغاية",
      },
      description: {
        en: "Required for security, forms, consent storage, navigation and core website functions. These cookies cannot be switched off.",
        ar: "مطلوبة للأمان والنماذج وتخزين الموافقة والتنقل ووظائف الموقع الأساسية. لا يمكن إيقاف هذه الملفات.",
      },
    },
    {
      id: "analytics",
      required: false,
      enabled: true,
      googleConsentKeys: ["analytics_storage"],
      title: {
        en: "Analytics",
        ar: "التحليلات",
      },
      description: {
        en: "Helps us understand page visits, enquiry journeys and website usage so we can improve the experience without using directly identifying information.",
        ar: "تساعدنا على فهم زيارات الصفحات ورحلة الاستفسار واستخدام الموقع لتحسين التجربة دون استخدام معلومات تعريف مباشرة.",
      },
    },
    {
      id: "marketing",
      required: false,
      enabled: true,
      googleConsentKeys: ["ad_storage", "ad_user_data", "ad_personalization"],
      title: {
        en: "Marketing",
        ar: "التسويق",
      },
      description: {
        en: "Allows advertising, remarketing and campaign measurement tools such as Google, Meta or LinkedIn when they are configured.",
        ar: "تسمح بأدوات الإعلان وإعادة الاستهداف وقياس الحملات مثل Google وMeta وLinkedIn عند تفعيلها.",
      },
    },
    {
      id: "functional",
      required: false,
      enabled: true,
      title: {
        en: "Functional",
        ar: "وظيفية",
      },
      description: {
        en: "Remembers optional preferences such as language, display choices and enhanced website features.",
        ar: "تتذكر التفضيلات الاختيارية مثل اللغة وخيارات العرض والميزات المحسنة للموقع.",
      },
    },
    {
      id: "performance",
      required: false,
      enabled: true,
      title: {
        en: "Performance",
        ar: "الأداء",
      },
      description: {
        en: "Supports speed, diagnostics, session quality and performance monitoring tools that help keep the website reliable.",
        ar: "تدعم السرعة والتشخيص وجودة الجلسة وأدوات مراقبة الأداء للحفاظ على موثوقية الموقع.",
      },
    },
  ],
  policyPages: {
    cookiePolicy: {
      en: {
        title: "Cookie Policy",
        description: "This Cookie Policy explains how Emitronix Contracting LLC uses cookies and similar technologies on emitronix.ae.",
        lastUpdatedLabel: "Last updated",
        sections: [
          {
            heading: "How we use cookies",
            body: "Emitronix uses cookies to operate the website, remember consent choices, understand website performance and support optional marketing tools only when consent is provided.",
          },
          {
            heading: "Cookie categories",
            body: "Strictly necessary cookies are always enabled. Analytics, marketing, functional and performance cookies are optional and can be changed from Cookie Settings in the footer.",
          },
          {
            heading: "Google Consent Mode v2",
            body: "When Google tools are configured, consent signals are sent for ad_storage, analytics_storage, ad_user_data and ad_personalization based on the visitor's choices.",
          },
          {
            heading: "Changing preferences",
            body: "You can update your choices at any time using the Cookie Settings link in the website footer. If policies change or consent expires, the banner will be shown again.",
          },
        ],
      },
      ar: {
        title: "سياسة ملفات تعريف الارتباط",
        description: "توضح هذه السياسة كيفية استخدام Emitronix Contracting LLC لملفات تعريف الارتباط والتقنيات المشابهة على emitronix.ae.",
        lastUpdatedLabel: "آخر تحديث",
        sections: [
          {
            heading: "كيفية استخدام ملفات الارتباط",
            body: "تستخدم Emitronix ملفات الارتباط لتشغيل الموقع وتذكر اختيارات الموافقة وفهم أداء الموقع ودعم أدوات التسويق الاختيارية فقط عند تقديم الموافقة.",
          },
          {
            heading: "فئات ملفات الارتباط",
            body: "ملفات الارتباط الضرورية مفعلة دائماً. ملفات التحليلات والتسويق والوظائف والأداء اختيارية ويمكن تغييرها من إعدادات ملفات الارتباط في تذييل الموقع.",
          },
          {
            heading: "وضع موافقة Google v2",
            body: "عند تهيئة أدوات Google، يتم إرسال إشارات الموافقة الخاصة بـ ad_storage وanalytics_storage وad_user_data وad_personalization بناءً على اختيارات الزائر.",
          },
          {
            heading: "تغيير التفضيلات",
            body: "يمكنك تحديث اختياراتك في أي وقت عبر رابط إعدادات ملفات الارتباط في تذييل الموقع. إذا تغيرت السياسات أو انتهت مدة الموافقة، سيظهر الشريط مرة أخرى.",
          },
        ],
      },
    },
    privacyPolicy: {
      en: {
        title: "Privacy Policy",
        description: "This Privacy Policy explains how Emitronix Contracting LLC handles personal data submitted through this website.",
        lastUpdatedLabel: "Last updated",
        sections: [
          {
            heading: "Personal data we collect",
            body: "We may collect information submitted through contact, enquiry or career forms, including name, contact details, company, project location, service interest and message content.",
          },
          {
            heading: "How we use information",
            body: "Information is used to respond to enquiries, manage project discussions, evaluate applications, improve website operations and meet legal or compliance obligations.",
          },
          {
            heading: "Sharing and processors",
            body: "We do not sell personal data. Data may be processed by trusted service providers such as CRM, hosting, email, analytics or security platforms where they are configured and required for business operations.",
          },
          {
            heading: "Your rights",
            body: "Depending on applicable law, including GDPR and UAE PDPL principles, you may request access, correction, deletion, restriction or withdrawal of consent by contacting Emitronix.",
          },
        ],
      },
      ar: {
        title: "سياسة الخصوصية",
        description: "توضح هذه السياسة كيفية تعامل Emitronix Contracting LLC مع البيانات الشخصية المقدمة عبر هذا الموقع.",
        lastUpdatedLabel: "آخر تحديث",
        sections: [
          {
            heading: "البيانات الشخصية التي نجمعها",
            body: "قد نجمع المعلومات المقدمة عبر نماذج الاتصال أو الاستفسار أو التوظيف، بما في ذلك الاسم وبيانات الاتصال والشركة وموقع المشروع والخدمة المطلوبة ومحتوى الرسالة.",
          },
          {
            heading: "كيفية استخدام المعلومات",
            body: "تستخدم المعلومات للرد على الاستفسارات وإدارة مناقشات المشاريع وتقييم الطلبات وتحسين عمليات الموقع والوفاء بالالتزامات القانونية أو الامتثالية.",
          },
          {
            heading: "المشاركة والمعالجة",
            body: "لا نبيع البيانات الشخصية. قد تتم معالجة البيانات بواسطة مزودي خدمات موثوقين مثل CRM أو الاستضافة أو البريد الإلكتروني أو التحليلات أو منصات الأمان عند تهيئتها واحتياج العمل إليها.",
          },
          {
            heading: "حقوقك",
            body: "وفقاً للقوانين المعمول بها، بما في ذلك مبادئ GDPR وقانون حماية البيانات الشخصية في دولة الإمارات، يمكنك طلب الوصول أو التصحيح أو الحذف أو التقييد أو سحب الموافقة عبر التواصل مع Emitronix.",
          },
        ],
      },
    },
    terms: {
      en: {
        title: "Terms & Conditions",
        description: "These Terms & Conditions govern use of the Emitronix Contracting LLC website.",
        lastUpdatedLabel: "Last updated",
        sections: [
          {
            heading: "Website use",
            body: "This website provides general information about Emitronix services, project enquiry pathways and construction-related resources. Content is provided for information and does not create a binding contract.",
          },
          {
            heading: "Enquiries and proposals",
            body: "Submitting an enquiry does not guarantee acceptance, pricing or availability. Project scope, timelines, exclusions and commercial terms are confirmed only through written communication and approved documents.",
          },
          {
            heading: "Content accuracy",
            body: "Emitronix aims to keep website information current, but construction, authority approval and project requirements may change based on location, authority comments, consultant scope and site conditions.",
          },
          {
            heading: "Intellectual property",
            body: "Website text, layout, brand assets and media are owned by or licensed to Emitronix unless otherwise stated and may not be copied without permission.",
          },
        ],
      },
      ar: {
        title: "الشروط والأحكام",
        description: "تنظم هذه الشروط والأحكام استخدام موقع Emitronix Contracting LLC.",
        lastUpdatedLabel: "آخر تحديث",
        sections: [
          {
            heading: "استخدام الموقع",
            body: "يوفر هذا الموقع معلومات عامة عن خدمات Emitronix ومسارات الاستفسار عن المشاريع وموارد متعلقة بالإنشاءات. المحتوى لغرض المعلومات ولا ينشئ عقداً ملزماً.",
          },
          {
            heading: "الاستفسارات والعروض",
            body: "إرسال الاستفسار لا يضمن القبول أو السعر أو التوفر. يتم تأكيد نطاق المشروع والجداول والاستثناءات والشروط التجارية فقط من خلال مراسلات ووثائق مكتوبة ومعتمدة.",
          },
          {
            heading: "دقة المحتوى",
            body: "تسعى Emitronix إلى إبقاء معلومات الموقع محدثة، لكن متطلبات البناء واعتمادات الجهات والمشاريع قد تتغير حسب الموقع وتعليقات الجهات ونطاق الاستشاري وحالة الموقع.",
          },
          {
            heading: "الملكية الفكرية",
            body: "نصوص الموقع وتخطيطه وأصول العلامة والوسائط مملوكة أو مرخصة لـ Emitronix ما لم يذكر خلاف ذلك، ولا يجوز نسخها دون إذن.",
          },
        ],
      },
    },
  },
};

export function getDefaultConsentCategories(): ConsentCategoryMap {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
    performance: false,
  };
}

export function getAllConsentCategories(): ConsentCategoryMap {
  return {
    necessary: true,
    analytics: true,
    marketing: true,
    functional: true,
    performance: true,
  };
}

export function getRejectedConsentCategories(): ConsentCategoryMap {
  return getDefaultConsentCategories();
}

export function normalizeCookieConsentConfig(config: Partial<CookieConsentConfig> | null | undefined): CookieConsentConfig {
  const defaults = defaultCookieConsentConfig;
  const mergedCategories = cookieCategoryIds.map((id) => {
    const fallback = defaults.categories.find((category) => category.id === id)!;
    const incoming = config?.categories?.find((category) => category.id === id);
    return {
      ...fallback,
      ...incoming,
      id,
      required: id === "necessary" ? true : Boolean(incoming?.required ?? fallback.required),
      enabled: id === "necessary" ? true : Boolean(incoming?.enabled ?? fallback.enabled),
      title: {
        en: incoming?.title?.en || fallback.title.en,
        ar: incoming?.title?.ar || fallback.title.ar,
      },
      description: {
        en: incoming?.description?.en || fallback.description.en,
        ar: incoming?.description?.ar || fallback.description.ar,
      },
    };
  });

  return {
    enabled: config?.enabled ?? defaults.enabled,
    version: Number.isFinite(config?.version) ? Number(config?.version) : defaults.version,
    consentExpiryDays: Math.max(1, Math.min(730, Number(config?.consentExpiryDays || defaults.consentExpiryDays))),
    updatedAt: config?.updatedAt || defaults.updatedAt,
    banner: {
      ...defaults.banner,
      ...config?.banner,
      ...Object.fromEntries(
        Object.entries(defaults.banner).map(([key, value]) => [
          key,
          {
            en: config?.banner?.[key as keyof CookieBannerContent]?.en || value.en,
            ar: config?.banner?.[key as keyof CookieBannerContent]?.ar || value.ar,
          },
        ]),
      ) as CookieBannerContent,
    },
    categories: mergedCategories,
    policyPages: {
      cookiePolicy: config?.policyPages?.cookiePolicy || defaults.policyPages.cookiePolicy,
      privacyPolicy: config?.policyPages?.privacyPolicy || defaults.policyPages.privacyPolicy,
      terms: config?.policyPages?.terms || defaults.policyPages.terms,
    },
  };
}
