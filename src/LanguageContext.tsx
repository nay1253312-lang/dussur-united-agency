import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isAr: boolean;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Rich professional translations dictionary
const dictionary: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation / Header
    "nav.home": "البداية",
    "nav.about": "من نحن",
    "nav.pillars": "ركائزنا الإستراتيجية",
    "nav.builder": "هندسة النطاق",
    "nav.portfolio": "شركاؤنا",
    "nav.ai": "المستشار الذكي AI",
    "nav.contact": "تواصل معنا",
    "nav.scroll_top": "عد للقمة",
    "nav.mobile_ai_gate": "بوابة التخطيط مستشار دسر AI",
    "nav.contact_cta": "تواصل معنا لتأصيل منشأتك",

    // Hero Section
    "hero.tag": "دُسُر المتحدة للهوية الرقمية والتحول التجريبي | ركائز استراتيجية متكاملة",
    "hero.word1": "دُسُر..",
    "hero.word2": "حيث نجمع شتات ",
    "hero.word2_highlight": "الرؤى",
    "hero.word3": "نهندس منها تجارب ",
    "hero.word3_highlight": "لا تُنسى",
    "hero.desc": "في دُسُر المتحدة، لا نتوقف عند صياغة تصاميم عابرة؛ نحن نربط ونثبّت حضور علامتك التجارية بركائز استشارية حديثة مصبوبة بقوالب ذكاء تفاعلي وحلول أتمتة دقيقة، كدسر مشدودة تحمي كيانك المؤسسي وتنمو به بوقار وثبات مستمر.",
    "hero.btn_ai": "جرّب مستشار الهوية والابتكار (AI)",
    "hero.btn_pillars": "تفقد ركائزنا الإستراتيجية المتكاملة",
    "hero.scroll_down": "انزل للمزيد",

    // About / PillarsView
    "about.tag": "رسالة وهوية دُسُر المتحدة",
    "about.quran": "«وَحَمَلْنَاهُ عَلَىٰ ذَاتِ أَلْوَاحٍ وَدُسُرٍ»",
    "about.quran_desc": "وش سالفة دُسُر؟ في قواميس لغتنا الشريفة، الدُسُر هي الروافد والروابط العريضة والحبال المتينة التي تشدّ أطراف السفينة العظمى لترسي في عاتي الموج ومواجهة البحار المظلمة دون أن تميل أو تنفرط ألواحها.",
    "about.philosophy": "ومن هذا المعنى القرآني السامي استلهمنا فلسفتنا الاستراتيجية والتصميمية: نحن لا نلقي لعملائنا بحملات دعائية عابرة تتلاقفها رياح الإنترنت، بل نشدّ علاماتهم ونربط حضورهم المؤسسي بركائز دقيقة ودُسُر استشارية رصينة تدوم وتثبت في الأذهان على مدار السنين.",
    "about.card1_title": "ثبات لا يلين",
    "about.card1_desc": "تأصيل الهوية واستراتيجيات متينة تصمد طويلاً في المنافسات التنافسية.",
    "about.card2_title": "أصالة وجاذبية",
    "about.card2_desc": "صياغة محتوى وهوية بصرية فخمة تنبع من عراقتنا وهويتنا السعودية الأصيلة.",
    "about.counter_label": "عاماً من الريادة الاستشارية",
    "about.counter_desc": "ربع قرن من الريادة والتمكين، شددنا خلالها ركائز كيانات حكومية كبرى وشركات عملاقة، وابتكرنا مخرجات ونظماً استراتيجية تتوارثها الأذهان وتدوم بوقار وإتقان.",

    // Services View
    "services.section_title": "منظومة ركائز دُسُر المتكاملة:",
    "services.section_tag": "هندسة الأثر البصري ونبض التحول لتمكين الكيانات والجهات الوطنية الكبرى",
    "services.cat_digital": "التحول الرقمي الإبداعي",
    "services.cat_production": "الإنتاج والتنفيذ الإبداعي",
    "services.deliverables": "المخرجات الفنية والتنفيذية النخبوية:",
    "services.biz_value": "العائد الإستراتيجي وقيمة الأثر:",
    "services.cta": "هندسة scope من هذه الركيزة",
    "services.deliverable_indicator": "مخرج تنفيذي",

    // Project Builder
    "builder.tag": "أول مهندس تفاعلي لنطاق المشاريع",
    "builder.title": "هندسة نطاق مشروعك التسويقي",
    "builder.desc": "حدد متطلباتك ومخرجاتك من ركائز دُسُر بدقة، لنقوم بحساب الجداول الزمنية وهندسة المخرج المناسب.",
    "builder.sec_tag": "تنظيم تجريبي قبل البدء",
    "builder.sec_title": "أداة هندسة النطاقات وصياغة المخرجات",
    "builder.sec_desc": "تحكم بتوليف متطلبات منشأتك لتحديد الأولويات الاستراتيجية والجدولة الزمنية الافتراضية بموثوقية.",
    "builder.step_a": "اكتب تفاصيل الكيان",
    "builder.step_b": "اختر ركائز التمكين",
    "builder.step_c": "صياغة نطاق العمل والجدول",
    "builder.form_client_placeholder": "اسم الكيان أو المؤسسة المستهدفة...",
    "builder.form_client_lbl": "اسم الجهة المستهدفة",
    "builder.category_lbl": "تصنيف الركائز المعتمدة",
    "builder.selected_pillars": "الركائز المختارة",
    "builder.next_step": "الاستمرار للمرحلة التالية",
    "builder.prev_step": "الرجوع لخلف",
    "builder.build_scope": "ابتكار وتصدير وثيقة النطاق",
    "builder.reset": "إعادة التهيئة",
    "builder.timeline_estimations": "التقديرات الزمنية للنظام الموزّع",
    "builder.weeks": "أسبوع",
    "builder.total_weeks": "إجمالي الجدول الزمني المقدر لفترة التسليم:",
    "builder.summary_title": "ملخص وثيقة هندسة النطاق المعماري للمشروع",
    "builder.scope_doc_desc": "هذه الوثيقة ناتجة عن أداة هندسة النطاقات لدُسُر المتحدة؛ لتحديد المعالم المبدئية قبل التصميم الفعلي وصبّ الأكواد.",
    "builder.client_name": "الكيان المستفيد:",
    "builder.service_desc": "تفاصيل الركيزة",
    "builder.deliv_to_receive": "المخرجات والمقتنيات المحددة للركيزة:",
    "builder.select_all_deliverables": "تضمين كامل المخرجات الفرعية المقترحة للركيزة واحتساب زمن التنفيذ تلقائياً",

    // AI Consultant
    "ai.sec_tag": "محركات الذكاء الاستراتيجي من دُسُر",
    "ai.sec_title": "المستشار الإستراتيجي المساعد (AI)",
    "ai.sec_desc": "عقل اصطناعي مبرمج بهوية وفلسفة دُسُر المتحدة؛ ليصوغ لك استبانة إطلاق ريادية فورية لعلامتك التجارية الفاخرة.",
    "ai.tag": "مستشار الهوية والتحول لـ دُسُر",
    "ai.title": "البوابة الذكية للتخطيط الاستراتيجي الفاخر",
    "ai.desc": "أدخل ملامح ومؤشرات علامتك التجارية، ليقوم مستشار المساعد الذكي لهندسة دُسُر بتحليل علامتك وتأصيل مكانتها بنماذج رصينة.",
    "ai.form_name": "اسم الكيان التجاري أو المشروع الرائد",
    "ai.form_name_placeholder": "مثال: دُسُر، القدية، مركز فهد الثقافي...",
    "ai.form_sector": "القطاع الإستراتيجي أو التجاري",
    "ai.form_sector_placeholder": "مثال: التطوير العقاري الفاخر، التقنيات الحكومية، السياحة الوطنية...",
    "ai.form_audience": "الفئة والجمهور المستهدف بدقة ذكية",
    "ai.form_audience_placeholder": "مثال: شباب رواد الأعمال، النخبة وصناع القرار، فئات عالية الثروة...",
    "ai.form_tone": "نبرة الصوت وهوية المخاطبة",
    "ai.form_tone_professional": "وقور ورصين واحترافي رفيع",
    "ai.form_tone_creative": "إبداعي وخارج عن المألوف وجذاب",
    "ai.form_tone_bold": "ثوري وجريء يبني تأثيراً كاسحاً",
    "ai.form_tone_luxury": "فاخر ونخبوي وحصري للغاية",
    "ai.form_budget": "مستوى النطاق الميزاني التقديري",
    "ai.form_budget_startup": "ميزانية رشيقة / شركات ناشئة طامحة",
    "ai.form_budget_medium": "ميزانية متكاملة / كيانات واعدة وتوسعية",
    "ai.form_budget_enterprise": "ميزانية سيادية استراتيجية كبرى / قطاع وطني وحكومي",
    "ai.form_goal": "الغاية الكبرى والمشهد المستهدف للمستقبل",
    "ai.form_goal_placeholder": "مثال: تصدر ريادة القطاع الفاخر، تحويل تجربة العملاء، التوسع الدولي...",
    "ai.btn_generate": "استشارة العقل الاصطناعي وصياغة ركيزتك",
    "ai.btn_reset": "جلسة استراتيجية جديدة",
    "ai.copy_success": "تم نسخ وثيقة الاستراتيجية بنجاح!",
    "ai.btn_copy": "نسخ وثيقة الاستراتيجية وتخزينها",
    "ai.result_brand": "الكيان المستهدف:",
    "ai.result_slogan": "العبارة الاستراتيجية لعلامتكم:",
    "ai.result_tagline": "الشعار الرديف المساعد لعلامتكم:",
    "ai.result_brief": "الموجز والخطة الاستراتيجية:",
    "ai.result_pillars": "ركائز الهوية الأساسية المقترحة:",
    "ai.result_visual": "المفهوم والروح الهوية البصرية الأنسب والأعرق:",
    "ai.result_campaign": "فكرة التجربة والتفاعل الرقمي الأول:",
    "ai.result_recommended": "الركائز الإستراتيجية الموصى بها للتفعيل الفوري:",

    // Portfolio
    "portfolio.tag": "شركاء أصلنا معهم الهيبة حضوراً ممتداً",
    "portfolio.title": "رواد رسمنا معاً ملامح الأثر والسيادة",
    "portfolio.desc": "فخورون بالجهود وصناعة المآثر الكبرى جنباً إلى جنب مع كبرى المنشآت والشركاء الإستراتيجيين والجهات السيادية والوطنية الكبرى.",

    // Contact
    "contact.tag": "بناء الأثر يستحق التأصيل المتأني",
    "contact.title": "دعنا نهيكل المخرج الفريد التالي لعلامتك",
    "contact.desc": "مستعدون لاستقبال استفسارات الكيانات الفخمة والجهات الحكومية الكبرى عبر قنواتنا الحصرية. حدد وسيلتك، لنبحر معاً.",
    "contact.form_title": "أرسل برقية استفسارك للنخبة",
    "contact.form_name": "الاسم الثلاثي المعتمد للاتصال",
    "contact.form_email": "البريد الإلكتروني للجهة الرسمية",
    "contact.form_phone": "رقم الهاتف للتواصل الهاتفي",
    "contact.form_service": "الركيزة الأساسية المطلوب طلائها أو دراستها",
    "contact.form_service_placeholder": "اختر الركيزة أو الخدمة المقترحة...",
    "contact.form_msg": "وصف المتطلبات، تطلعات الكيان والرؤية العامة لحجم مخرجكم",
    "contact.form_msg_placeholder": "يرجى كتابة لمحة عن مشروعكم أو المخرج المطلوب صياغته وهندسته...",
    "contact.btn_send": "إرسال وتوثيق الطلب",
    "contact.send_success": "تم استلام برقية الاتصال وتوثيقها بوقار. سنقوم بالاتصال بكم قريباً عبر ممثلنا الإستراتيجي للمشاريع.",
    "contact.phone_lbl": "الاتصال الهاتفي والمراسلات الحية",
    "contact.email_lbl": "صندوق البريد الإلكتروني للتوثيق الإداري",
    "contact.address_lbl": "المقر الرئيسي لدُسُر المتحدة للأعمال",
    "contact.address_text": "المملكة العربية السعودية، الرياض، تلال الياسمين الإستراتيجية",

    // Preloader
    "loader.text": "أهلاً بك في دُسُر المتحدة للأعمال..."
  },
  en: {
    // Navigation / Header
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.pillars": "Strategic Pillars",
    "nav.builder": "Scope Engineering",
    "nav.portfolio": "Our Partners",
    "nav.ai": "Smart AI Consultant",
    "nav.contact": "Contact Us",
    "nav.scroll_top": "Back to Top",
    "nav.mobile_ai_gate": "Planning Gateway | Dussur AI Consultant",
    "nav.contact_cta": "Connect to Anchor Your Entity",

    // Hero Section
    "hero.tag": "DUSSUR UNITED FOR DIGITAL IDENTITY & EXPERIMENTAL TRANSFORMATION | INTEGRATED STRATEGIC PILLARS",
    "hero.word1": "Dussur..",
    "hero.word2": "Where We Gather Scattered ",
    "hero.word2_highlight": "Visions",
    "hero.word3": "To Engineer Unforgettable ",
    "hero.word3_highlight": "Experiences",
    "hero.desc": "At Dussur United, we do not stop at crafting fleeting designs. We anchor and solidify your brand's presence with modern strategic pillars cast in interactive intelligence and precise automation, shielding and elevating your luxury corporate entity with stable, continuous growth.",
    "hero.btn_ai": "Try AI Identity & Innovation Consultant",
    "hero.btn_pillars": "Explore Our Integrated Strategic Pillars",
    "hero.scroll_down": "Scroll For More",

    // About / PillarsView
    "about.tag": "THE VISION & IDENTITY OF DUSSUR UNITED",
    "about.quran": "«We bore him on an vessel of planks and Dussur»",
    "about.quran_desc": "What is the meaning of Dussur? In classical Arabic dictionaries, Dussur (Nails & Fiber Ties) are the broad support beams, solid ties, and firm ropes that tightly bind the ship's planks to safely weather raging waves and navigate dark seas without splitting.",
    "about.philosophy": "Inspired by this noble Quranic word, we founded our strategic and design philosophy: We never place our clients in fleeting advertising campaigns, but rather anchor their institutional presence with precise strategic pillars and solid consultancy dussur that endure in public minds for decades with timeless style.",
    "about.card1_title": "Unyielding Stability",
    "about.card1_desc": "Deep identity anchoring and robust strategies designed to withstand highly competitive market conditions.",
    "about.card2_title": "Heritage & Charisma",
    "about.card2_desc": "Crafting majestic visual languages and premium content originating from Saudi heritage and Saudi Vision 2030's forward ambition.",
    "about.counter_label": "Years of Consulting Leadership",
    "about.counter_desc": "A quarter-century of strategic guidance and enablement, during which we have anchored major government entities and corporate giants, forging visual assets and systems that endure with timeless dignity.",

    // Services View
    "services.section_title": "Dussur's Integrated Pillars Ecosystem",
    "services.section_tag": "Engineering visual impact and digital transformation for sovereign entities and leading national bodies",
    "services.cat_digital": "Creative Digital Transformation",
    "services.cat_production": "Creative Production & Execution",
    "services.deliverables": "Elite Executive Deliverables:",
    "services.biz_value": "Strategic Value & Impact:",
    "services.cta": "Engineer Scope for this Pillar",
    "services.deliverable_indicator": "Deliverable",

    // Project Builder
    "builder.tag": "The Premier Interactive Scope Planner",
    "builder.title": "Engineering Your Project's Scope",
    "builder.desc": "Specify your requirements and deliverables from Dussur's pillars to automatically calculate timelines and build your scope of work.",
    "builder.sec_tag": "EXPERIMENTAL PLANNING BEFORE INCEPTION",
    "builder.sec_title": "Scope Engineering & Deliverables Synthesizer",
    "builder.sec_desc": "Configure your entity's requirements to define strategic priorities and map out reliable launch timelines.",
    "builder.step_a": "Entity Information",
    "builder.step_b": "Strategic Pillars Selection",
    "builder.step_c": "Scope Document & Chronology",
    "builder.form_client_placeholder": "Target entity or enterprise name...",
    "builder.form_client_lbl": "Target Entity Name",
    "builder.category_lbl": "Approved Pillars Category",
    "builder.selected_pillars": "Selected Pillars",
    "builder.next_step": "Next Step",
    "builder.prev_step": "Previous Step",
    "builder.build_scope": "Synthesize & Export Scope Document",
    "builder.reset": "Reset Configurations",
    "builder.timeline_estimations": "Distributed System Timeline Estimations",
    "builder.weeks": "weeks",
    "builder.total_weeks": "Estimated Delivery & Completion Chronology:",
    "builder.summary_title": "Executive Project Scope Document",
    "builder.scope_doc_desc": "This document is auto-engineered by Dussur United's platform; configuring pre-development deliverables before designing and coding.",
    "builder.client_name": "Sovereign Beneficiary:",
    "builder.service_desc": "Pillar Information",
    "builder.deliv_to_receive": "Assigned Deliverables:",
    "builder.select_all_deliverables": "Include all suggested deliverables and calculate timeline automatically",

    // AI Consultant
    "ai.sec_tag": "Dussur Strategic Intelligence Engine",
    "ai.sec_title": "Strategic AI Consultant",
    "ai.sec_desc": "An artificial intelligence trained in Dussur United's methodologies; drafting a bespoke strategic launch brief for your luxury brand.",
    "ai.tag": "Dussur AI Identity & Strategy Coach",
    "ai.title": "Exquisite Strategy Portal",
    "ai.desc": "Input your brand specifications and allow Dussur's strategic AI engine to analyze your brand and anchor its competitive position with robust models.",
    "ai.form_name": "Target Entity or Enterprise Name",
    "ai.form_name_placeholder": "e.g., Dussur, Qiddiya, King Fahd Cultural Center...",
    "ai.form_sector": "Strategic Business Sector",
    "ai.form_sector_placeholder": "e.g., Luxury Real Estate, GovTech, National Tourism...",
    "ai.form_audience": "Precision Target Audience",
    "ai.form_audience_placeholder": "e.g., Young Entrepreneurs, HNWI, Executive Decision Makers...",
    "ai.form_tone": "Brand Communication Tone",
    "ai.form_tone_professional": "Majestic, Regal & Highly Professional",
    "ai.form_tone_creative": "Creative, Disruptive & Engaging",
    "ai.form_tone_bold": "Revolutionary, Bold & High-Impact",
    "ai.form_tone_luxury": "Ultra-Luxury, Prestigious & Highly Exclusive",
    "ai.form_budget": "Estimated Capital & Resource Level",
    "ai.form_budget_startup": "Agile Budget / Ambitious Growing Venture",
    "ai.form_budget_medium": "Integrated Capital / Growing Scale-Ups",
    "ai.form_budget_enterprise": "Sovereign Strategic Capital / National Government",
    "ai.form_goal": "Grand Goal & Targeted Future Vision",
    "ai.form_goal_placeholder": "e.g., Elevate Luxury Class, Global Expansion...",
    "ai.btn_generate": "Consult AI Strategist & Forge Strategy Brief",
    "ai.btn_reset": "New Strategy Session",
    "ai.copy_success": "Strategy document copied successfully!",
    "ai.btn_copy": "Copy Strategic Plan & Save",
    "ai.result_brand": "Target Entity:",
    "ai.result_slogan": "Strategic Brand Tagline:",
    "ai.result_tagline": "Secondary Brand Hook:",
    "ai.result_brief": "Strategic Executive Assessment:",
    "ai.result_pillars": "Bespoke Brand Pillars:",
    "ai.result_visual": "Visual Identity Concept & Royal Aesthetic:",
    "ai.result_campaign": "Interactive Launch & First Engagement Idea:",
    "ai.result_recommended": "Core Operational Pillars Recommended for Immediate Launch:",

    // Portfolio
    "portfolio.tag": "OUR HISTORICAL REVERED PARTNERS",
    "portfolio.title": "Leaders With Whom We Carved True Legacies",
    "portfolio.desc": "We take massive pride in driving major initiatives, visual transformations, and creative models alongside the Kingdom's most respected ministries, sovereign entities, and elite institutions.",

    // Contact
    "contact.tag": "CRAFTING LASTING LEGACIES",
    "contact.title": "Let us architect the next masterpiece for your brand",
    "contact.desc": "We are fully prepared to receive exclusive business inquiries from sovereign bodies and prestigious national brands. Select your preferred channel below and let us start the journey.",
    "contact.form_title": "Send Diplomatic Inquiries",
    "contact.form_name": "Full Diplomatic / Corporate Representative Name",
    "contact.form_email": "Official Corporate Post Address",
    "contact.form_phone": "Authorized Voice Line Point",
    "contact.form_service": "Prioritized Strategic Pillar to Activate",
    "contact.form_service_placeholder": "Select your priority pillar or task...",
    "contact.form_msg": "Required deliverables, target scope, and overarching entity vision",
    "contact.form_msg_placeholder": "Describe brief outlines about your venture, requested timeline, and scope...",
    "contact.btn_send": "Send & Validate Proposal",
    "contact.send_success": "Your proposal has been highly validated and archived. Our senior strategic representative will request contact with you shortly.",
    "contact.phone_lbl": "Authorized Voice Line & Live Chat",
    "contact.email_lbl": "Secure Corporate Inbox for Official Communications",
    "contact.address_lbl": "Dussur United Headquarters",
    "contact.address_text": "Kingdom of Saudi Arabia, Riyadh, Al-Yasmin Strategic Hills",

    // Preloader
    "loader.text": "Welcome to Dussur United..."
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    // Check localStorage or default to 'ar'
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('dussur_lang') as Language;
      return savedLang === 'en' || savedLang === 'ar' ? savedLang : 'ar';
    }
    return 'ar';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('dussur_lang', newLang);
  };

  useEffect(() => {
    // Dynamically update document layout direction & lang attribute
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return dictionary[lang][key] || dictionary['ar'][key] || key;
  };

  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isAr, isEn }}>
      <div className={lang === 'en' ? 'font-sans' : 'font-sans text-right'} style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
