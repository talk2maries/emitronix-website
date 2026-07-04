import { approvalServices } from "@/data/approvals";
import { blogPosts, type BlogPost } from "@/data/blog";
import { portfolioProjects, projectFilters } from "@/data/projects";
import { arabicApprovalTitle, arabicBlogTitle, arabicPathLabel, arabicServiceTitle, type ArabicPageData } from "@/data/arabic";
import { arabicPageStaticText } from "@/data/arabicPageText";
import {
  authorities,
  complianceHighlights,
  localSeoBlocks,
  services,
  site,
  stats,
  trustPillars,
  verifiedMetrics,
  whyChoose,
} from "@/data/site";

type ArabicTextContext = Pick<ArabicPageData, "path" | "title" | "description" | "kind">;

const commonText: Record<string, string> = {
  Home: "الرئيسية",
  About: "من نحن",
  Services: "الخدمات",
  Projects: "المشاريع",
  Industries: "القطاعات",
  Careers: "الوظائف",
  Blog: "المدونة",
  Contact: "اتصل بنا",
  Approval: "الموافقات",
  Approvals: "الموافقات",
  Resources: "الموارد",
  "HTML Sitemap": "خريطة الموقع",
  "Cookie Policy": "سياسة ملفات تعريف الارتباط",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms & Conditions": "الشروط والأحكام",
  "Free Quote": "عرض سعر",
  "Get a Free Quote": "اطلب عرض سعر",
  "Get a quote, request a site visit or speak to Emitronix today.": "اطلب عرض سعر أو زيارة للموقع أو تحدث مع فريق Emitronix اليوم.",
  "Request a Quote": "اطلب عرض سعر",
  "Request a Quotation": "اطلب عرض سعر",
  "Request consultation": "اطلب استشارة",
  "Request Support": "اطلب الدعم",
  "Request Approval Support": "اطلب دعم الموافقات",
  "Request a Site Visit": "اطلب زيارة للموقع",
  "View Projects": "عرض المشاريع",
  "View projects": "عرض المشاريع",
  "View Portfolio": "عرض المشاريع",
  "View industries": "عرض القطاعات",
  "Explore Portfolio": "استكشف المشاريع",
  "Explore Services": "استكشف الخدمات",
  "Explore services": "استكشف الخدمات",
  "Explore scope": "استكشف النطاق",
  "Explore main contracting": "استكشف المقاولات الرئيسية",
  "View approval services": "عرض خدمات الموافقات",
  "Review project management": "راجع إدارة المشاريع",
  "All Approval Services": "كل خدمات الموافقات",
  "All Approvals": "كل الموافقات",
  "Complete services platform": "منصة الخدمات الكاملة",
  "Complete Services Platform": "منصة الخدمات الكاملة",
  "Contact Emitronix": "تواصل مع Emitronix",
  "Contact the team": "تواصل مع الفريق",
  "Talk to Emitronix": "تحدث مع Emitronix",
  "Talk to Emitronix.": "تحدث مع Emitronix.",
  "Discuss this scope": "ناقش هذا النطاق",
  "Discuss your Dubai project.": "ناقش مشروعك في دبي.",
  "WhatsApp Us": "راسلنا عبر واتساب",
  WhatsApp: "واتساب",
  "Call Now": "اتصل الآن",
  "Call now": "اتصل الآن",
  "Need Help?": "تحتاج مساعدة؟",
  "Read more": "اقرأ المزيد",
  "Open page": "افتح الصفحة",
  "View portfolio": "عرض ملف المشروع",
  "More resources": "موارد إضافية",
  "Start this scope": "ابدأ هذا النطاق",
  "Start a project": "ابدأ مشروعك",
  "Start a project.": "ابدأ مشروعك.",
  "Quick quote": "طلب سريع",
  "Fast enquiry path": "مسار استفسار سريع",
  "Company introduction": "تعريف الشركة",
  "Company credibility": "موثوقية الشركة",
  "Company standard": "معيار الشركة",
  "Site coordination": "تنسيق الموقع",
  "Operating principles": "مبادئ العمل",
  "What we do": "ماذا نقدم",
  "Core services": "الخدمات الأساسية",
  "Emitronix Service": "خدمة Emitronix",
  "Dubai approval menu": "قائمة موافقات دبي",
  "Service delivery model": "نموذج تقديم الخدمة",
  "Service selection": "اختيار الخدمة",
  "Local project pathways": "مسارات المشاريع المحلية",
  "Authority bodies": "الجهات والدوائر",
  "Service trust": "الثقة في الخدمة",
  "Company trust": "ثقة الشركة",
  "About Emitronix": "عن Emitronix",
  "Building contractor in Dubai": "مقاول بناء في دبي",
  "Excellence in": "التميز في",
  "Every Structure": "كل مشروع",
  "Authority visibility": "وضوح الموافقات",
  "Civil + fit-out control": "ضبط الأعمال المدنية والتشطيبات",
  "Dubai delivery intelligence": "ذكاء تسليم المشاريع في دبي",
  "Authority-aware planning": "تخطيط يراعي الجهات",
  "Premium scope control": "ضبط احترافي للنطاق",
  "Handover-ready coordination": "تنسيق جاهز للتسليم",
  "Project enquiry": "استفسار مشروع",
  "Submit Enquiry": "إرسال الاستفسار",
  "Submit Project Enquiry": "إرسال طلب المشروع",
  "Submitting": "جاري الإرسال",
  "Submitting Enquiry": "جاري إرسال الطلب",
  Name: "الاسم",
  "Full name": "الاسم الكامل",
  Company: "الشركة",
  Mobile: "رقم الهاتف",
  Email: "البريد الإلكتروني",
  "Project location": "موقع المشروع",
  Phone: "الهاتف",
  "Call Emitronix": "اتصل ب Emitronix",
  "Email Team": "راسل الفريق",
  "Contact process": "خطوات التواصل",
  "Contact trust": "ثقة التواصل",
  "Service required": "الخدمة المطلوبة",
  "Service Required": "الخدمة المطلوبة",
  Message: "الرسالة",
  "Project details": "تفاصيل المشروع",
  "Select service": "اختر الخدمة",
  "Other Construction Scope": "نطاق إنشاءات آخر",
  Contents: "المحتويات",
  "Table of contents": "فهرس المحتوى",
  FAQ: "الأسئلة الشائعة",
  "Common questions": "أسئلة شائعة",
  "Useful links": "روابط مفيدة",
  Categories: "التصنيفات",
  "Featured guide": "دليل مميز",
  "Read guide": "اقرأ الدليل",
  "Read article": "اقرأ المقال",
  "Article library": "مكتبة المقالات",
  Read: "اقرأ",
  Share: "مشاركة",
  "Related articles": "مقالات ذات صلة",
  "Related projects": "مشاريع ذات صلة",
  "Related services": "خدمات ذات صلة",
  "Related approvals": "موافقات ذات صلة",
  Previous: "السابق",
  Next: "التالي",
  "Previous and next articles": "المقالات السابقة والتالية",
  "Local market focus": "تركيز على سوق دبي",
  "Civil contracting scope": "نطاق مقاولات مدنية",
  "Authority-ready planning": "تخطيط جاهز للموافقات",
  "Project enquiry coverage": "تغطية طلبات المشاريع",
  "Primary delivery market": "سوق التنفيذ الأساسي",
  "Building contracting scope": "نطاق مقاولات البناء",
  "Authority coordination": "تنسيق الجهات",
  "Business service area": "نطاق خدمة الأعمال",
  coordination: "التنسيق",
  Coordination: "التنسيق",
  delivery: "التسليم",
  Delivery: "التسليم",
  Work: "العمل",
  "Scope clarity": "وضوح النطاق",
  "Authority readiness": "جاهزية الموافقات",
  "Engineering coordination": "تنسيق هندسي",
  "Handover control": "ضبط التسليم",
  Input: "المدخلات",
  System: "النظام",
  Output: "المخرجات",
  "Scope intelligence": "ذكاء النطاق",
  "Delivery orchestration": "تنظيم التسليم",
  "Decision-ready path": "مسار جاهز للقرار",
  "Published service lines": "الخدمات المنشورة",
  "Verified service areas": "مناطق خدمة موثقة",
  "Business service coverage": "تغطية خدمة الأعمال",
  "Authority coordination routes": "مسارات تنسيق الجهات",
  "Authority approval coordination": "تنسيق موافقات الجهات",
  "Construction standards mindset": "منهجية معايير البناء",
  "Consultant and stakeholder rhythm": "إيقاع الاستشاري والأطراف",
  "Compliance without inflated claims": "امتثال بدون ادعاءات مبالغ فيها",
  "Authority jurisdiction focus": "تركيز على جهات دبي",
  "Submission package control": "ضبط ملف التقديم",
  "Response coordination": "تنسيق الردود",
  "Inspection readiness": "جاهزية التفتيش",
  "Projects / Portfolio": "المشاريع / ملف الأعمال",
  "Dubai project experience": "خبرة مشاريع دبي",
  "Featured project": "مشروع مميز",
  "Before and after": "قبل وبعد",
  Gallery: "المعرض",
  Authorities: "الجهات",
  "Showing 10 project profiles": "عرض 10 ملفات مشاريع",
  "Scope of work": "نطاق العمل",
  "Page guide": "دليل الصفحة",
  Overview: "نظرة عامة",
  Methodology: "منهجية العمل",
  Process: "العملية",
  "Dubai Standards": "معايير دبي",
  "Timeline & Cost": "المدة والتكلفة",
  Mistakes: "الأخطاء",
  "What it means": "ماذا يعني ذلك",
  "Who needs it": "من يحتاج هذه الخدمة",
  "Industries served": "القطاعات المخدومة",
  "Dubai local SEO": "تغطية دبي والإمارات",
  "Quality standards": "معايير الجودة",
  "Dubai regulations": "متطلبات الجهات في دبي",
  "Timeline and cost": "المدة والتكلفة",
  "Mistakes to avoid": "أخطاء يجب تجنبها",
  "Control points": "نقاط التحكم",
  "Trust section": "الثقة والوضوح",
  "Authority trust": "الثقة في الموافقات",
  "Approval enquiry": "طلب موافقات",
  "Service overview": "نظرة عامة على الخدمة",
  "Approval process": "خطوات الموافقة",
  "Document readiness": "جاهزية المستندات",
  "Why Emitronix": "لماذا Emitronix",
  "Approval readiness": "جاهزية الموافقات",
  "Premium execution": "تنفيذ احترافي",
  "Phase": "المرحلة",
  "Typical Duration": "المدة المتوقعة",
  "What Changes It": "ما الذي يؤثر عليها",
  "Cost factors": "عوامل التكلفة",
  "What affects pricing.": "ما الذي يؤثر في التسعير.",
  "Civil Works": "أعمال مدنية",
  "MEP Works": "أعمال MEP",
  "Interior Fit-Out": "تشطيبات داخلية",
  "Commercial Renovation": "تجديد تجاري",
  Maintenance: "صيانة",
  "Authority Approvals": "موافقات الجهات",
  "Building Contracting": "مقاولات البناء",
  "Warehouse Construction": "إنشاء المستودعات",
  "Villa Construction": "إنشاء الفلل",
  "Commercial Buildings": "المباني التجارية",
  "Construction Tips": "نصائح البناء",
  "Project Management": "إدارة المشاريع",
  "Dubai Construction News": "أخبار البناء في دبي",
  All: "الكل",
  "Representative profile": "ملف تمثيلي",
  "Featured representative project": "مشروع تمثيلي مميز",
  "Projects Completed": "المشاريع المنجزة",
  "Years of Experience": "سنوات الخبرة",
  "Happy Clients": "العملاء",
  "Authorities Worked With": "الجهات ذات الصلة",
  "Verified on request": "يتم التحقق عند الطلب",
  "Dubai-focused": "تركيز على دبي",
  "Client-approved only": "حسب موافقة العميل",
  "Our Projects": "مشاريعنا",
  "Project filters": "تصنيف المشاريع",
  Scope: "نطاق العمل",
  Status: "الحالة",
  Location: "الموقع",
  "Published": "تاريخ النشر",
  "Updated": "آخر تحديث",
  January: "يناير",
  February: "فبراير",
  March: "مارس",
  April: "أبريل",
  May: "مايو",
  June: "يونيو",
  July: "يوليو",
  August: "أغسطس",
  September: "سبتمبر",
  October: "أكتوبر",
  November: "نوفمبر",
  December: "ديسمبر",
  "January 2026": "يناير 2026",
  "min read": "دقائق قراءة",
  "9 min read": "9 دقائق قراءة",
  "8 min read": "8 دقائق قراءة",
  "7 min read": "7 دقائق قراءة",
  "6 min read": "6 دقائق قراءة",
  "Emitronix Editorial Team": "فريق تحرير Emitronix",
  "Your name": "اكتب اسمك",
  "Company name": "اسم الشركة",
  "name@example.com": "name@example.com",
  "Dubai, JAFZA, Dubai South, villa community...": "دبي، جافزا، دبي الجنوب، مجتمع فلل...",
  "Share drawings available, authority status, site condition, timeline, budget stage and any consultant or landlord comments.":
    "شارك الرسومات المتاحة، حالة الموافقات، حالة الموقع، الجدول الزمني، مرحلة الميزانية وأي تعليقات من الاستشاري أو المالك.",
  "Share your location, drawings, authority status and project scope.":
    "شارك الموقع والرسومات وحالة الموافقات ونطاق المشروع.",
  "Search approvals, warehouses, civil works...": "ابحث عن الموافقات أو المستودعات أو الأعمال المدنية...",
  "Close enquiry form": "إغلاق نموذج الاستفسار",
  "Close cookie preferences": "إغلاق تفضيلات ملفات تعريف الارتباط",
  "Accept All Cookies": "قبول جميع ملفات تعريف الارتباط",
  "Reject Non-Essential Cookies": "رفض غير الضرورية",
  "Customize Preferences": "تخصيص التفضيلات",
  "Cookie Settings": "إعدادات ملفات تعريف الارتباط",
  Dubai: "دبي",
  UAE: "الإمارات",
  "Dubai, UAE": "دبي، الإمارات",
  "United Arab Emirates": "الإمارات العربية المتحدة",
  "Dubai industrial area": "منطقة صناعية في دبي",
  "Business Bay": "الخليج التجاري",
  "Al Quoz": "القوز",
  Jumeirah: "جميرا",
  JAFZA: "جافزا",
  "Dubai South": "دبي الجنوب",
  "Dubai Investment Park 02, Dubai, UAE": "مجمع دبي للاستثمار 02، دبي، الإمارات",
};

const allowedLatin = [
  "Emitronix",
  "DEWA",
  "DCD",
  "DDA",
  "DIFC",
  "DMCC",
  "RTA",
  "MEP",
  "NOC",
  "JAFZA",
  "G+4",
  "PDF",
  "DOC",
  "DOCX",
  "LinkedIn",
  "Twitter",
  "WhatsApp",
  "Google",
  "Meta",
  "Microsoft",
  "Cloudflare",
  "Hotjar",
  "CRM",
  "GDPR",
  "PDPL",
  "HVAC",
  "DM",
  "Concordia",
  "info@emitronix.ae",
  "emitronix.ae",
];

function collapse(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function serviceArabicDescription(title: string) {
  return `دعم احترافي لخدمة ${title} في دبي والإمارات مع تنسيق النطاق، الرسومات، الموقع، الجهات، الأعمال المرتبطة وجاهزية التسليم.`;
}

function serviceArabicParagraph(title: string, field: string, index: number) {
  const paragraphs: Record<string, string[]> = {
    overview: [
      `تحتاج خدمة ${title} في دبي إلى وضوح مبكر في الموقع والرسومات وحالة الموافقات ومسؤوليات المالك والاستشاري والمقاول قبل بدء التنفيذ.`,
      `تنظم Emitronix متطلبات ${title} ضمن مسار واحد يربط الأعمال المدنية والإنشائية وMEP والتشطيبات والمستندات حتى تقل المفاجآت في الموقع.`,
      `يناسب هذا المسار مشاريع دبي والإمارات التي تحتاج مقاولات عملية وتواصلا موثقا ورؤية واضحة للمخاطر قبل الالتزام بالبرنامج والتكلفة.`,
    ],
    whoNeeds: [
      `الملاك والمطورون والاستشاريون الذين يخططون لنطاق ${title} ويحتاجون فهما واضحا للموقع والرسومات والجهات.`,
      "الفرق التجارية والصناعية التي تريد تنفيذ الأعمال مع تقليل التعطيل والحفاظ على جاهزية التشغيل والتسليم.",
      "فرق المشاريع التي تحتاج طرفا واحدا يربط النطاق، الموافقات، التوريد، التفتيش، والتسليم بطريقة عملية.",
    ],
    methodology: [
      "نبدأ بمراجعة الموقع والرسومات والاستخدام المقصود وحالة الموافقات والقيود التشغيلية قبل تثبيت الافتراضات التجارية.",
      "تتم مراجعة الواجهات بين الأعمال المدنية والإنشائية وMEP والتشطيبات حتى تظهر فجوات التنسيق مبكرا.",
      "يتم ترتيب التنفيذ حول الوصول للموقع، التفتيش، التوريد، تعليقات الاستشاري ومتطلبات التسليم النهائي.",
    ],
    workflow: [
      `مراجعة موجز ${title} والموقع والرسومات والاستخدام المقصود والوصول للموقع وحالة الجهات.`,
      "توضيح مسؤوليات المالك والاستشاري والجهات والمقاول قبل التسعير أو التحريك للموقع.",
      "تنسيق الأعمال المدنية والإنشائية وMEP والتوريد والتفتيش والتسليم ضمن إيقاع موثق.",
      "الإغلاق عبر ضبط الملاحظات، معلومات ما بعد التنفيذ، مستندات الجهات، ودعم التسليم العملي.",
    ],
    qualityStandards: [
      "توثيق النطاق والافتراضات والاستثناءات قبل اتخاذ قرارات التنفيذ.",
      "متابعة الرسومات والتعليقات والتعليمات الفنية حتى لا يعمل فريق الموقع على معلومات غير مكتملة.",
      "مراجعة واجهات الأعمال المدنية والإنشائية وMEP والتشطيبات كمنظومة واحدة.",
      "اعتبار جاهزية التفتيش ومعالجة الملاحظات ونظافة الموقع ومستندات التسليم جزءا من جودة التنفيذ.",
    ],
    dubaiRegulations: [
      "قد تؤثر متطلبات بلدية دبي على التصاريح والرسومات والتقديمات الإنشائية ومسارات الإكمال.",
      "قد تؤثر متطلبات الدفاع المدني في دبي على الوصول، أنظمة السلامة، الفواصل المقاومة للحريق واستخدام المستودعات.",
      "قد تكون متطلبات DEWA أو RTA أو تراخيص أو DDA أو JAFZA أو المطور أو المالك ذات صلة حسب الموقع ونوع الأصل.",
      "يجب تأكيد متطلبات الجهات لكل مشروع مع الاستشاري المعين والجهة المختصة.",
    ],
    costFactors: [
      "نضج التصميم واكتمال الرسومات والتغييرات المتأخرة.",
      "حالة الموقع والوصول والهدم والأعمال التمهيدية وقيود ساعات العمل.",
      "النظام الإنشائي والخرسانة والحديد والتشطيبات وواجهات MEP والمواد الخاصة.",
      "تعليقات الجهات ومتطلبات التفتيش وتنسيق الخدمات ومستندات التسليم.",
      "مدد التوريد وضغط البرنامج وسرعة قرارات الأطراف.",
    ],
    commonMistakes: [
      "طلب عرض سعر قبل وضوح الاستخدام والرسومات وحالة الجهات وحدود النطاق.",
      "التعامل مع الموافقات كمهمة منفصلة يمكن حلها بعد بدء العمل في الموقع.",
      "مقارنة المقاولين بالسعر فقط دون مراجعة الافتراضات والاستثناءات ومسؤوليات التسليم.",
      "اختيار المواد أو المخططات في وقت متأخر مما يؤدي إلى تأخير التوريد وإعادة العمل.",
    ],
  };

  return paragraphs[field]?.[index] ?? `توفر Emitronix دعما منظما لخدمة ${title} في دبي مع وضوح في النطاق والمستندات والتسليم.`;
}

function approvalArabicParagraph(title: string, field: string, index: number) {
  const paragraphs: Record<string, string[]> = {
    overview: [
      `تعد ${title} جزءا مهما من مسار البناء أو التشطيبات أو التعديل في دبي، لذلك يبدأ العمل بفهم الموقع ونوع الأصل والمسؤوليات والمستندات المتاحة.`,
      "تدعم Emitronix العملاء والاستشاريين عبر مراجعة فجوات المستندات وتنسيق التعليقات وربط الموافقات بجاهزية الموقع والتسليم.",
    ],
    process: [
      "تأكيد الجهة المختصة ونوع المشروع والمسار المناسب.",
      "مراجعة التصميم والاستخدام المقصود ونطاق الأعمال المدنية أو الداخلية.",
      "تجهيز الرسومات والنماذج والمستندات الداعمة بالتنسيق مع الاستشاري.",
      "متابعة التعليقات وتنسيق التعديلات أو الإيضاحات المطلوبة.",
      "دعم جاهزية التفتيش والإغلاق ومستندات الموافقة النهائية.",
    ],
    documents: [
      "بيانات المالك أو المستأجر والتفويضات المطلوبة.",
      "الرخصة التجارية والهوية أو جواز السفر عند الحاجة.",
      "الرسومات الحالية والمقترحة.",
      "تفاصيل الأعمال المدنية أو الإنشائية ذات الصلة.",
      "خطابات NOC من المالك أو المطور إن وجدت.",
      "بيانات تعيين الاستشاري والمقاول والمراسلات السابقة.",
    ],
    whyChoose: [
      "فريق في دبي يفهم ارتباط الموافقات بالتنفيذ في الموقع.",
      "مراجعة واضحة لفجوات المستندات قبل التقديم.",
      "تنسيق عملي بين العميل والاستشاري وفريق الموقع.",
      "متابعة من مرحلة المستندات حتى التفتيش والإغلاق.",
    ],
  };

  return paragraphs[field]?.[index] ?? `توفر Emitronix تنسيقا عمليا لمسار ${title} في دبي مع وضوح في المستندات والتعليقات والتسليم.`;
}

function blogParagraph(post: BlogPost, sectionTitle: string, index: number) {
  const title = arabicBlogTitle(post);
  const section = sectionTitle ? `قسم "${sectionTitle}"` : "هذا القسم";
  const variants = [
    `${section} في مقال ${title} يوضح النقاط العملية التي يحتاجها المالك أو الاستشاري قبل اتخاذ قرار البناء أو الموافقات في دبي.`,
    "يركز المحتوى على الموقع والرسومات وحالة الجهات ومسؤوليات الأطراف وواجهات الأعمال المدنية وMEP والتشطيبات حتى يتم التخطيط بثقة أكبر.",
    "يساعد هذا التوضيح على تقليل إعادة العمل والتأخير من خلال تحويل المتطلبات إلى نطاق واضح ومعلومات قابلة للمتابعة قبل ضغط التنفيذ.",
    "تختلف التفاصيل النهائية حسب نوع المشروع وموقعه والجهة المختصة والاستشاري، لذلك يجب مراجعة كل حالة بناء على مستنداتها الفعلية.",
  ];
  return variants[index % variants.length];
}

function blogFaqAnswer(post: BlogPost, index: number) {
  const title = arabicBlogTitle(post);
  const variants = [
    `ابدأ بتجهيز الموقع والرسومات والاستخدام المقصود وحالة الموافقات حتى يمكن تحديد المسار المناسب المرتبط بموضوع ${title}.`,
    "قد تختلف متطلبات الجهات حسب الموقع ونوع الأصل ونطاق التعديل، لذلك يجب تأكيد المتطلبات مع الاستشاري والجهة المختصة.",
    "قارن بين المقاولين عبر وضوح النطاق، متابعة المستندات، فهم الجهات، خطة التنفيذ، وجاهزية التسليم وليس السعر المختصر فقط.",
    "يمكن لفريق Emitronix مراجعة تفاصيل المشروع ومساعدة العميل على تحديد الخطوة العملية التالية للأعمال المدنية أو التشطيبات أو الموافقات.",
  ];
  return variants[index % variants.length];
}

function projectArabicDescription(category: string) {
  const categoryAr = commonText[category] ?? category;
  return `ملف مشروع تمثيلي ضمن ${categoryAr} يوضح نوع النطاق الذي تدعمه Emitronix في دبي مع مراعاة الموقع والرسومات والموافقات والتسليم.`;
}

function makeTextMap() {
  const map: Record<string, string> = { ...commonText };

  for (const filter of projectFilters) map[filter] = commonText[filter] ?? filter;

  stats.forEach((stat) => {
    map[stat.value] = commonText[stat.value] ?? stat.value;
    map[stat.label] = commonText[stat.label] ?? stat.label.replace("Dubai", "دبي").replace("UAE", "الإمارات");
  });

  verifiedMetrics.forEach((metric) => {
    map[metric.value] = commonText[metric.value] ?? metric.value.replace("Dubai / UAE", "دبي / الإمارات");
    map[metric.label] = commonText[metric.label] ?? metric.label;
    map[metric.description] = "معلومة موثقة من بيانات الموقع تساعد العميل على فهم نطاق الخدمات والتغطية ومراحل التنسيق في دبي والإمارات.";
  });

  complianceHighlights.forEach((item) => {
    map[item.title] = commonText[item.title] ?? item.title;
    map[item.description] = "يتم التعامل مع الرسومات والموقع والجهات والتفتيش ومستندات الإغلاق كعناصر تحكم عملية في تسليم المشروع.";
  });

  trustPillars.forEach((item) => {
    map[item] = commonText[item] ?? item;
  });

  whyChoose.forEach((item) => {
    map[item.title] = commonText[item.title] ?? item.title
      .replace("Dubai authority-aware planning", "تخطيط يراعي جهات دبي")
      .replace("DEWA and approval coordination", "تنسيق DEWA والموافقات")
      .replace("Engineering coordination", "تنسيق هندسي")
      .replace("Document-controlled delivery", "تسليم مضبوط بالمستندات")
      .replace("Design and build support", "دعم التصميم والبناء")
      .replace("Handover readiness focus", "تركيز على جاهزية التسليم");
  });

  authorities.forEach((authority) => {
    map[authority.name] = commonText[authority.name] ?? authority.name;
    map[authority.description] = authority.description
      .replace("Power and water approval coordination", "تنسيق موافقات الكهرباء والمياه")
      .replace("Building and planning submissions", "تقديمات البناء والتخطيط")
      .replace("Fire and life safety approvals", "موافقات السلامة والحماية من الحريق")
      .replace("Roads and transport authority interfaces", "واجهات هيئة الطرق والمواصلات")
      .replace("Free zone and development approvals", "موافقات المناطق الحرة والتطوير")
      .replace("Master developer and DDA workflows", "مسارات المطور الرئيسي وDDA");
  });

  localSeoBlocks.forEach((block) => {
    map[block.title] = block.title
      .replace("Building contracting in Dubai", "مقاولات البناء في دبي")
      .replace("Authority approvals in Dubai", "موافقات الجهات في دبي")
      .replace("Project management Dubai coordination", "تنسيق إدارة المشاريع في دبي")
      .replace("Warehouse construction Dubai", "إنشاء المستودعات في دبي")
      .replace("Villa construction Dubai", "إنشاء الفلل في دبي")
      .replace("Interior fit-out Dubai", "التشطيبات الداخلية في دبي");
    map[block.description] = "مدخل عملي يساعد الملاك والاستشاريين على اختيار النطاق الصحيح وفهم الرسومات والموقع والموافقات ومتطلبات التسليم في دبي.";
    map[block.linkLabel] = commonText[block.linkLabel] ?? "استكشف المسار";
  });

  for (const service of services) {
    const title = arabicServiceTitle(service.href);
    map[service.title] = title;
    map[service.shortTitle] = title;
    map[`${service.title} Dubai`] = `${title} في دبي`;
    map[`Emitronix ${service.shortTitle}`] = `Emitronix ${title}`;
    map[service.description] = serviceArabicDescription(title);
    map[service.details] = serviceArabicDescription(title);
    map[service.searchIntent] = `${title} في دبي`;
    map[service.imageAlt] = `${title} في دبي من Emitronix`;
    map[service.imageTitle] = `${title} في دبي - تنفيذ وتنسيق`;
    service.highlights.forEach((item, index) => {
      map[item] = ["وضوح النطاق", "تنسيق الموقع والجهات", "جاهزية التسليم"][index % 3];
    });
    service.keywords.forEach((item) => {
      map[item] = `${title} في دبي`;
    });
    service.overview.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "overview", index);
    });
    service.whoNeeds.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "whoNeeds", index);
    });
    service.methodology.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "methodology", index);
    });
    service.workflow.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "workflow", index);
    });
    service.qualityStandards.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "qualityStandards", index);
    });
    service.dubaiRegulations.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "dubaiRegulations", index);
    });
    service.costFactors.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "costFactors", index);
    });
    service.commonMistakes.forEach((item, index) => {
      map[item] = serviceArabicParagraph(title, "commonMistakes", index);
    });
    service.timeline.forEach((item, index) => {
      map[item.phase] = ["مراجعة النطاق", "تنسيق التصميم والجهات", "التوريد والتحريك", "التنفيذ والتسليم"][index] ?? "مرحلة المشروع";
      map[item.typicalDuration] = ["2-7 أيام عمل", "1-6 أسابيع أو أكثر", "1-4 أسابيع", "حسب المشروع"][index] ?? "حسب المشروع";
      map[item.notes] = "تعتمد المدة على جاهزية الرسومات، حالة الموقع، تعليقات الجهات، التوريد، قرارات الأطراف ومتطلبات التسليم.";
    });
    service.faqs.forEach((item, index) => {
      map[item.question] = `ما الذي يجب معرفته عن ${title} في دبي؟`;
      map[item.answer] = blogFaqAnswer({ ...blogPosts[0], title } as BlogPost, index);
    });

    // Page-template strings rendered by ServiceDetailPage with the service
    // name interpolated. Keys must match the rendered English exactly.
    const lower = service.title.toLowerCase();
    const lowerShort = service.shortTitle.toLowerCase();
    map[`A premium ${lower} workflow for Dubai projects.`] = `منهجية عمل احترافية لخدمة ${title} في مشاريع دبي.`;
    map[
      `This page is structured for buyers evaluating ${service.searchIntent}. It explains the scope, decision points, Dubai authority considerations, timeline variables, cost factors and practical mistakes to avoid.`
    ] = `صممت هذه الصفحة لمن يقيم خدمة ${title} في دبي، وهي تشرح النطاق ونقاط القرار واعتبارات الجهات في دبي ومتغيرات الجدول الزمني وعوامل التكلفة والأخطاء العملية التي ينبغي تجنبها.`;
    map[`Need ${lower} in Dubai?`] = `هل تحتاج ${title} في دبي؟`;
    map[`${service.title} in Dubai, explained for owners and consultants.`] = `${title} في دبي: شرح عملي للملاك والاستشاريين.`;
    map[`${service.title} process designed for Dubai decision clarity.`] = `منهجية ${title} مصممة لوضوح القرار في دبي.`;
    map[`How Emitronix approaches ${service.shortTitle}.`] = `كيف تتعامل Emitronix مع ${title}.`;
    map[`${service.title} across Dubai project environments.`] = `${title} عبر مختلف بيئات المشاريع في دبي.`;
    map[
      `${service.title} support for project owners who need clear scope, construction planning, authority visibility and premium communication before site commitments are made.`
    ] = `دعم ${title} لملاك المشاريع الذين يحتاجون وضوح النطاق وتخطيط الإنشاءات ورؤية الموافقات وتواصلا احترافيا قبل الالتزام بأعمال الموقع.`;
    map[`${service.title} with authority-ready control.`] = `${title} مع ضبط جاهز لمتطلبات الجهات.`;
    map[`${service.title} support for owners, consultants and commercial teams.`] = `دعم ${title} للملاك والاستشاريين والفرق التجارية.`;
    map[
      `Emitronix Contracting LLC supports ${lower} enquiries across Dubai and the UAE with practical engineering coordination, clear communication and documented project controls.`
    ] = `تدعم Emitronix Contracting LLC استفسارات ${title} في دبي والإمارات من خلال تنسيق هندسي عملي وتواصل واضح وضوابط مشاريع موثقة.`;
    map[`${service.title} planning variables buyers should understand.`] = `متغيرات التخطيط في ${title} التي ينبغي للعملاء فهمها.`;
    map[`Common ${lower} mistakes in Dubai.`] = `أخطاء شائعة في ${title} داخل دبي.`;
    map[`Representative project profiles for ${lower}.`] = `ملفات مشاريع تمثيلية لخدمة ${title}.`;
    map[`Plan ${lower} with the right supporting scopes.`] = `خطط لخدمة ${title} مع النطاقات المساندة المناسبة.`;
    map[`Request ${lowerShort} consultation.`] = `اطلب استشارة حول ${title}.`;
    map[
      `Share your project location, drawings status, authority comments and timeline. Emitronix will review the ${lower} enquiry and respond with the practical next step.`
    ] = `شارك موقع المشروع وحالة الرسومات وتعليقات الجهات والجدول الزمني، وسيراجع فريق Emitronix استفسار ${title} ويرد عليك بالخطوة العملية التالية.`;
    map[`${service.title} Dubai FAQ.`] = `الأسئلة الشائعة حول ${title} في دبي.`;
  }

  for (const approval of approvalServices) {
    const title = arabicApprovalTitle(approval.href);
    map[approval.menuLabel] = title;
    map[approval.seoTitle] = `${title} | Emitronix`;
    map[approval.metaDescription] = `تنسيق ${title} لمشاريع دبي مع مراجعة المستندات والتعليقات وجاهزية التفتيش والإغلاق.`;
    map[approval.h1] = `${title} في دبي`;
    map[approval.eyebrow] = title;
    map[approval.heroText] = `دعم منظم لمسار ${title} في دبي عبر تجهيز المستندات ومتابعة التعليقات وربط الموافقات بالتنفيذ.`;
    map[approval.overviewTitle] = `تنسيق ${title} بوضوح منظم.`;
    approval.overview.forEach((item, index) => {
      map[item] = approvalArabicParagraph(title, "overview", index);
    });
    approval.process.forEach((item, index) => {
      map[item] = approvalArabicParagraph(title, "process", index);
    });
    approval.documents.forEach((item, index) => {
      map[item] = approvalArabicParagraph(title, "documents", index);
    });
    approval.whyChoose.forEach((item, index) => {
      map[item] = approvalArabicParagraph(title, "whyChoose", index);
    });
    approval.keywords.forEach((item) => {
      map[item] = title;
    });

    // Page-template strings rendered by ApprovalServicePage.
    map[`Need ${approval.menuLabel} support in Dubai?`] = `هل تحتاج دعم ${title} في دبي؟`;
    map[`${approval.menuLabel} planning before submission pressure builds.`] = `التخطيط لمسار ${title} قبل أن يشتد ضغط التقديم.`;
    map[
      `The ${approval.menuLabel} route starts by confirming the authority path, project category, location and stakeholders involved.`
    ] = `يبدأ مسار ${title} بتأكيد جهة الاختصاص وفئة المشروع والموقع والأطراف المعنية.`;
    map[`Request ${approval.menuLabel} support.`] = `اطلب دعم ${title}.`;
    map[`${approval.menuLabel} FAQ.`] = `الأسئلة الشائعة حول ${title}.`;
    map[`When is ${approval.menuLabel} support useful?`] = `متى يكون دعم ${title} مفيدا؟`;
    map[
      `${approval.menuLabel} support is useful when a Dubai project needs clearer document coordination, authority comment follow-up, inspection readiness or connection between approval work and construction execution.`
    ] = `يكون دعم ${title} مفيدا عندما يحتاج مشروع في دبي إلى تنسيق أوضح للمستندات ومتابعة تعليقات الجهة وجاهزية التفتيش وربط أعمال الموافقة بالتنفيذ الإنشائي.`;
    map[`What information helps start ${approval.menuLabel}?`] = `ما المعلومات التي تساعد على بدء ${title}؟`;
  }

  for (const post of blogPosts) {
    const title = arabicBlogTitle(post);
    map[post.title] = title;
    map[post.seoTitle] = title;
    map[post.metaDescription] = `دليل عربي عملي حول ${title} لمساعدة ملاك المشاريع والاستشاريين على فهم النطاق والموافقات والتسليم في دبي.`;
    map[post.excerpt] = `ملخص عملي حول ${title} مع نقاط تساعد على التخطيط والقرار قبل بدء الأعمال في دبي والإمارات.`;
    map[post.category] = commonText[post.category] ?? "مقالات البناء";
    map[post.imageAlt] = `صورة توضيحية لمقال ${title}`;
    map[post.imageTitle] = title;
    post.categories.forEach((category) => {
      map[category] = commonText[category] ?? "مقالات البناء";
    });
    post.targetKeywords.forEach((keyword) => {
      map[keyword] = `${title} في دبي`;
    });
    post.intro.forEach((paragraph, index) => {
      map[paragraph] = blogParagraph(post, "المقدمة", index);
    });
    post.sections.forEach((section, sectionIndex) => {
      map[section.title] = sectionIndex === 0 ? "النقاط الرئيسية التي يجب فهمها" : `محور عملي رقم ${sectionIndex + 1}`;
      section.paragraphs.forEach((paragraph, index) => {
        map[paragraph] = blogParagraph(post, map[section.title], index);
      });
      section.bullets?.forEach((bullet, index) => {
        map[bullet] = blogParagraph(post, map[section.title], index);
      });
    });
    post.faqs.forEach((faq, index) => {
      map[faq.question] = `سؤال شائع حول ${title}`;
      map[faq.answer] = blogFaqAnswer(post, index);
    });
    post.internalLinks.forEach((link) => {
      map[link.label] = arabicPathLabel(link.href.startsWith("/ar") ? link.href : `/ar${link.href === "/" ? "" : link.href}`);
    });
    map[`Who should read ${post.title}?`] = `لمن يوجه مقال «${title}»؟`;
  }

  for (const project of portfolioProjects) {
    map[project.title] = project.title
      .replace("Villa Renovation Works", "أعمال تجديد فيلا")
      .replace("Warehouse Civil & MEP Upgrade", "ترقية أعمال مدنية وMEP لمستودع")
      .replace("Office Fit-Out Works", "أعمال تشطيبات مكتب")
      .replace("Building Maintenance Works", "أعمال صيانة مبنى")
      .replace("DEWA Approval Support Works", "دعم موافقات DEWA")
      .replace("Commercial Shop Renovation", "تجديد محل تجاري")
      .replace("Industrial Facility Modification", "تعديل منشأة صناعية")
      .replace("MEP Coordination Works", "أعمال تنسيق MEP")
      .replace("Authority Approval & NOC Support", "دعم موافقات الجهات وNOC")
      .replace("Civil Repair & Maintenance Works", "أعمال إصلاح وصيانة مدنية")
      .replace("Dubai", "دبي")
      .replace("Business Bay", "الخليج التجاري")
      .replace("Al Quoz", "القوز")
      .replace("Jumeirah", "جميرا")
      .replace("JAFZA", "جافزا")
      .replace("Dubai South", "دبي الجنوب");
    map[project.location] = commonText[project.location] ?? project.location;
    map[project.category] = commonText[project.category] ?? project.category;
    map[project.scope] = `نطاق يشمل ${commonText[project.category] ?? "أعمال المشروع"} مع تنسيق الموقع والرسومات وواجهات الجهات والتسليم.`;
    map[project.status] = commonText[project.status] ?? "ملف تمثيلي";
    map[project.description] = projectArabicDescription(project.category);
    map[project.imageAlt] = `صورة مشروع تمثيلي في دبي ضمن ${commonText[project.category] ?? "أعمال البناء"}`;
    map[project.imageTitle] = map[project.title];
  }

  // Hand-written page copy translations take precedence over generated entries.
  Object.assign(map, arabicPageStaticText);

  return map;
}

const textMap = makeTextMap();
const lowerTextMap = Object.fromEntries(Object.entries(textMap).map(([key, value]) => [key.toLowerCase(), value]));

function preserveSpacing(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function hasUntranslatedLatin(value: string) {
  let cleaned = value;
  for (const word of allowedLatin) {
    cleaned = cleaned.replace(new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), "");
  }
  return /[A-Za-z]{3,}/.test(cleaned);
}

const arabicMonths: Record<string, string> = {
  Jan: "يناير",
  Feb: "فبراير",
  Mar: "مارس",
  Apr: "أبريل",
  May: "مايو",
  Jun: "يونيو",
  Jul: "يوليو",
  Aug: "أغسطس",
  Sep: "سبتمبر",
  Oct: "أكتوبر",
  Nov: "نوفمبر",
  Dec: "ديسمبر",
};

function patternTranslate(value: string): string | null {
  const date = value.match(/^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* (\d{4})$/);
  if (date) return `${date[1]} ${arabicMonths[date[2]]} ${date[3]}`;

  const readTime = value.match(/^(\d+) min read$/);
  if (readTime) return `قراءة ${readTime[1]} دقائق`;

  const articleCount = value.match(/^(\d+) construction articles$/);
  if (articleCount) return `${articleCount[1]} مقالا في البناء`;

  return null;
}

function applyTermReplacements(value: string) {
  return value
    .replace(/\bRequest\b/g, "اطلب")
    .replace(/\bSupport\b/g, "الدعم")
    .replace(/\bDubai\b/g, "دبي")
    .replace(/\bUAE\b/g, "الإمارات")
    .replace(/\bConstruction\b/g, "البناء")
    .replace(/\bContracting\b/g, "المقاولات")
    .replace(/\bContractor\b/g, "مقاول")
    .replace(/\bCivil\b/g, "مدني")
    .replace(/\bAuthority\b/g, "الجهات")
    .replace(/\bApprovals\b/g, "الموافقات")
    .replace(/\bApproval\b/g, "موافقة")
    .replace(/\bProject\b/g, "المشروع")
    .replace(/\bProjects\b/g, "المشاريع")
    .replace(/\bServices\b/g, "الخدمات")
    .replace(/\bService\b/g, "الخدمة")
    .replace(/\bWorks\b/g, "الأعمال")
    .replace(/\bWorks\b/g, "الأعمال")
    .replace(/\bFit-Out\b/g, "التشطيبات")
    .replace(/\bRenovation\b/g, "التجديد")
    .replace(/\bWarehouse\b/g, "المستودع")
    .replace(/\bVilla\b/g, "الفيلا")
    .replace(/\bCommercial\b/g, "التجاري")
    .replace(/\bInterior\b/g, "الداخلي")
    .replace(/\bPlanning\b/g, "التخطيط")
    .replace(/\bJanuary\b/g, "يناير")
    .replace(/\bFebruary\b/g, "فبراير")
    .replace(/\bMarch\b/g, "مارس")
    .replace(/\bApril\b/g, "أبريل")
    .replace(/\bMay\b/g, "مايو")
    .replace(/\bJune\b/g, "يونيو")
    .replace(/\bJuly\b/g, "يوليو")
    .replace(/\bAugust\b/g, "أغسطس")
    .replace(/\bSeptember\b/g, "سبتمبر")
    .replace(/\bOctober\b/g, "أكتوبر")
    .replace(/\bNovember\b/g, "نوفمبر")
    .replace(/\bDecember\b/g, "ديسمبر")
    .replace(/\bGuide\b/g, "دليل")
    .replace(/\bGuide\b/g, "دليل")
    .replace(/\bPortfolio\b/g, "ملف الأعمال");
}

export function translateArabicText(input: string, context: ArabicTextContext, tagName?: string) {
  void context;
  void tagName;
  const trimmed = collapse(input);
  if (!trimmed || !/[A-Za-z]/.test(trimmed)) return input;

  const direct = textMap[trimmed] ?? lowerTextMap[trimmed.toLowerCase()];
  if (direct) return preserveSpacing(input, direct);

  const withoutColon = trimmed.replace(/:$/, "");
  if (textMap[withoutColon]) {
    return preserveSpacing(input, `${textMap[withoutColon]}${trimmed.endsWith(":") ? ":" : ""}`);
  }

  const pattern = patternTranslate(trimmed);
  if (pattern) return preserveSpacing(input, pattern);

  const replaced = applyTermReplacements(trimmed);
  if (!hasUntranslatedLatin(replaced)) return preserveSpacing(input, replaced);

  // No confident translation: keep the original text rather than substituting
  // generic filler that would repeat across the page.
  return input;
}
