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

const updatedAt = "2026-07-24T00:00:00.000Z";

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
            heading: "Consent record and duration",
            body: "The website stores the `emitronix_cookie_consent` choice in the browser cookie and local storage so the banner can remember selected categories. The default consent lifetime is 180 days and a new policy version can request consent again. Configured third-party cookies, providers and durations depend on which optional integrations management enables.",
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
            heading: "سجل الموافقة ومدته",
            body: "يحفظ الموقع اختيار `emitronix_cookie_consent` في ملف ارتباط والتخزين المحلي في المتصفح لتذكر الفئات المحددة. المدة الافتراضية للموافقة هي 180 يوماً، ويمكن لإصدار سياسة جديد طلب الموافقة مرة أخرى. تعتمد ملفات ومزودو ومدد الأدوات الخارجية على التكاملات الاختيارية التي يتم تفعيلها.",
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
            body: "Contact and article enquiry forms may collect name, email, mobile number, company, project location, service interest, message content, page URL and browser user-agent information. Career interest forms may also collect current location, experience, role interest, salary expectation, notice period, cover message and an uploaded CV. Basic anti-abuse data, such as an IP address, may be processed by server logs and form controls.",
          },
          {
            heading: "Purposes and consent",
            body: "Project information is used to assess and respond to the requested enquiry and, when the user checks the consent box, to create a follow-up record in the configured customer relationship system. Career information is used to assess possible role matches and, with explicit consent, to create a follow-up record. Optional analytics and marketing tools remain disabled until the relevant cookie choice is granted.",
          },
          {
            heading: "Sharing and processors",
            body: "Emitronix does not sell personal data. Information may be handled by configured hosting, customer relationship, email, analytics or security service providers only for the stated business purpose. Provider locations and safeguards can vary by configuration; request current details using the published contact information.",
          },
          {
            heading: "Career applications and CVs",
            body: "CVs and career form records are access-controlled business records. Submitting a profile is an expression of interest, not a confirmed vacancy, interview or job offer. The current retention schedule and any automated deletion period require management and legal confirmation. Management verification required before publication.",
          },
          {
            heading: "Retention and deletion",
            body: "Information should be kept only while needed for the enquiry, application, security, record-keeping or applicable legal purpose, then deleted or anonymized. Exact retention periods for enquiry, CRM, server-log and candidate records require management and legal confirmation. Management verification required before publication.",
          },
          {
            heading: "Security",
            body: "The website uses server-side provider calls, consent checks, request limits, anti-bot fields and restricted local file permissions. No internet service can guarantee absolute security. Do not send passwords, payment-card data, government identifiers or unnecessary confidential project information through a website form.",
          },
          {
            heading: "Requests and questions",
            body: "Depending on the law that applies to you and the processing, you may be able to request access, correction or deletion, object to certain uses, or withdraw consent for future processing. Contact Emitronix using the published email and identify the relevant form submission. Identity verification may be required before a request is completed.",
          },
          {
            heading: "Children and policy changes",
            body: "The website and project or career forms are intended for adults acting for themselves or an organization, not for children. This notice may be updated when forms, providers, retention practices or legal requirements change.",
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
            body: "قد تجمع نماذج الاتصال والاستفسار الاسم والبريد الإلكتروني ورقم الهاتف والشركة وموقع المشروع والخدمة والرسالة وعنوان الصفحة ومعلومات المتصفح. وقد تجمع نماذج الاهتمام الوظيفي أيضاً الموقع الحالي والخبرة والوظيفة المطلوبة والراتب المتوقع وفترة الإشعار والرسالة والسيرة الذاتية. وقد تعالج سجلات الخادم وضوابط منع الإساءة بيانات تقنية أساسية مثل عنوان IP.",
          },
          {
            heading: "الأغراض والموافقة",
            body: "تستخدم بيانات المشروع لتقييم الاستفسار والرد عليه، وعند تحديد خانة الموافقة لإنشاء سجل متابعة في نظام إدارة علاقات العملاء المهيأ. وتستخدم بيانات الاهتمام الوظيفي لتقييم الفرص المناسبة. تبقى أدوات التحليلات والتسويق الاختيارية معطلة حتى يمنح الزائر الموافقة المناسبة.",
          },
          {
            heading: "المشاركة والمعالجة",
            body: "لا تبيع Emitronix البيانات الشخصية. قد تعالج المعلومات خدمات الاستضافة أو إدارة علاقات العملاء أو البريد الإلكتروني أو التحليلات أو الأمان المهيأة، وذلك للغرض التجاري المعلن فقط. يمكن طلب تفاصيل التهيئة الحالية عبر بيانات الاتصال المنشورة.",
          },
          {
            heading: "طلبات التوظيف والسير الذاتية",
            body: "تعامل السير الذاتية وسجلات التقديم كبيانات عمل مقيدة الوصول. إرسال الملف هو تعبير عن الاهتمام وليس إعلان وظيفة أو مقابلة أو عرض عمل. تتطلب مدة الاحتفاظ الحالية تأكيد الإدارة والمراجعة القانونية. يلزم تحقق الإدارة قبل النشر.",
          },
          {
            heading: "الاحتفاظ والحذف",
            body: "يجب الاحتفاظ بالمعلومات فقط للمدة اللازمة للاستفسار أو الطلب أو الأمان أو حفظ السجلات أو الغرض القانوني المطبق، ثم حذفها أو إخفاء هويتها. تتطلب الفترات الدقيقة تأكيد الإدارة والمراجعة القانونية. يلزم تحقق الإدارة قبل النشر.",
          },
          {
            heading: "الأمان",
            body: "يستخدم الموقع اتصالات خادم آمنة وموافقة صريحة وحدوداً للطلبات وحقولاً لمكافحة الروبوتات وصلاحيات ملفات مقيدة. لا توجد خدمة إنترنت تضمن أماناً مطلقاً. لا ترسل كلمات مرور أو بيانات بطاقات دفع أو معرفات حكومية أو معلومات سرية غير ضرورية عبر النماذج.",
          },
          {
            heading: "الطلبات والأسئلة",
            body: "وفقاً للقانون المطبق وطبيعة المعالجة، قد تتمكن من طلب الوصول أو التصحيح أو الحذف أو الاعتراض على بعض الاستخدامات أو سحب الموافقة للمستقبل. تواصل مع Emitronix عبر البريد المنشور وحدد الطلب المعني.",
          },
          {
            heading: "الأطفال وتحديث السياسة",
            body: "الموقع ونماذج المشاريع والاهتمام الوظيفي مخصصة للبالغين الذين يتصرفون لأنفسهم أو نيابة عن مؤسسة وليست موجهة للأطفال. قد يتم تحديث الإشعار عند تغير النماذج أو المزودين أو ممارسات الاحتفاظ أو المتطلبات القانونية.",
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
          {
            heading: "Legal review status",
            body: "TODO — governing-law, dispute, liability and jurisdiction wording requires management and qualified legal review before publication. The website disclaimer, privacy policy and corrections policy provide the current public information boundaries.",
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
          {
            heading: "حالة المراجعة القانونية",
            body: "مطلوب إجراء: تتطلب صياغة القانون الحاكم وتسوية النزاعات والمسؤولية والاختصاص تأكيد الإدارة ومراجعة قانونية مؤهلة قبل النشر. يوضح إخلاء المسؤولية وسياسة الخصوصية وسياسة التصحيحات الحدود العامة الحالية للموقع.",
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
