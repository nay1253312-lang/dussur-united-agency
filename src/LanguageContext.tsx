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
    "nav.home": "الرئيسية",
    "nav.about": "من حنا؟",
    "nav.pillars": "خدماتنا",
    "nav.builder": "فصّل مشروعك",
    "nav.portfolio": "أعمالنا",
    "nav.ai": "دُسُر AI",
    "nav.contact": "تواصل معنا",
    "nav.scroll_top": "فوق",
    "nav.mobile_ai_gate": "حلل مشروعك | دُسُر AI",
    "nav.contact_cta": "تواصل معنا لتبدأ",

    // Hero Section
    "hero.tag": "دُسُر | نضبط هويتك الرقمية ونطوّر مشروعك ببساطة",
    "hero.word1": "دُسُر..",
    "hero.word2": "حيث نجمع شتات ",
    "hero.word2_highlight": "الرؤى",
    "hero.word3": "نهندس منها تجارب ",
    "hero.word3_highlight": "تذكرها الناس",
    "hero.desc": "في دُسُر، ما نسوي لك تصاميم عادية وبس؛ حنا نبني لعلامتك التجارية هيبة رقمية قوية، ونطوّر لك حلول ذكاء اصطناعي وأتمتة تريحك وتكبّر شغلك وتثبّت وجودك بالسوق السعودي.",
    "hero.btn_ai": "جرّب دُسُر AI للتحليل والخدمات",
    "hero.btn_pillars": "شوف ركائزنا وخدماتنا مباشرة",
    "hero.scroll_down": "انزل تحت",

    // About / PillarsView
    "about.tag": "قصتنا باختصار ومين حنا",
    "about.quran": "«وَحَمَلْنَاهُ عَلَىٰ ذَاتِ أَلْوَاحٍ وَدُسُرٍ»",
    "about.quran_desc": "وش يعني دُسُر؟ الدُسُر هي الحبال القوية والروابط المتينة اللي تمسك ألواح السفينة وتخليها واقفة وثابتة وسط الأمواج الصعبة. ومن هالمعنى أخذنا اسمنا، لأننا نربط مشروعك بحلول ثابتة تقوّيه وتحميه.",
    "about.philosophy": "شعارنا واضح وبسيط: ما نضيّع ميزانياتك في إعلانات تروح مع الهواء، حنا نربط حضورك بالسوق بأفكار ذكية وتصاميم فخمة تثبت ببال الناس وتعيش للابد.",
    "about.card1_title": "قوة وثبات",
    "about.card1_desc": "نبني هويتك على أساس متين يخليك متميز وواقف بوجه أي منافس.",
    "about.card2_title": "لمسة سعودية فخمة",
    "about.card2_desc": "تصاميم تعكس أصالتنا وثقافتنا السعودية بروح شابة وعصرية.",
    "about.counter_label": "سنة من الخبرة والتمكين",
    "about.counter_desc": "ربع قرن وحنا نشتغل مع كبار الجهات الحكومية والشركات، نساعدهم يثبتون حضورهم بأقوى التقنيات والحلول الفعّالة.",

    // Services View
    "services.section_title": "وش نقدر نسوي لك بالظبط؟",
    "services.section_tag": "خدماتنا مقسمة لثمانية ركائز أساسية تغطي كل تفاصيل نمو مشروعك:",
    "services.cat_digital": "خدمات رقمية وذكاء عالي",
    "services.cat_production": "إنتاج وتصميم وتغطيات",
    "services.deliverables": "وش بنسلمك بالظبط؟",
    "services.biz_value": "الفائدة الحقيقية لمشروعك:",
    "services.cta": "فصّل مخرجات هالخدمة بمشروعك",
    "services.deliverable_indicator": "مخرج جاهز للتسليم",

    // Project Builder
    "builder.tag": "رتب مشروعك وميزانيتك بثواني",
    "builder.title": "فصّل نطاق مشروعك بنفسك وببساطة",
    "builder.desc": "حدد وش الخدمات اللي تبيها منّا، وحنا بنحسب لك تلقائياً الوقت المتوقع للعمل والمخرجات اللي بنقوم بتسليمها لك بكل وضوح.",
    "builder.sec_tag": "خطط ورتب قبل ما تبدأ",
    "builder.sec_title": "أداة تفصيل المشاريع الذكية وحساب المخرجات",
    "builder.sec_desc": "تقدر تتحكم بخدماتك، وتعرف كم بتاخذ وقت، وتحدد وش أولوياتك بدون أي تعقيد أو حوسة.",
    "builder.step_a": "معلومات مشروعك",
    "builder.step_b": "اختر الخدمات المطلوبة",
    "builder.step_c": "الخطة والجدول المقدر",
    "builder.form_client_placeholder": "اسم شركتك أو الجهة المستفيدة...",
    "builder.form_client_lbl": "اسم الشركة / الجهة",
    "builder.category_lbl": "نوع ركائز العمل المطلوبة",
    "builder.selected_pillars": "الركائز المختارة",
    "builder.next_step": "الخطوة التالية",
    "builder.prev_step": "الرجوع للخلف",
    "builder.build_scope": "احسب الخطة والجدول الزمني فوراً",
    "builder.reset": "ابدأ التخطيط من جديد",
    "builder.timeline_estimations": "الوقت المتوقع لتنفيذ مشروعك",
    "builder.weeks": "أسبوع",
    "builder.total_weeks": "إجمالي الوقت التقريبي لتسجيل وتسليم كامل المخرجات:",
    "builder.summary_title": "مخطط وميزان مشروعك المبتكر",
    "builder.scope_doc_desc": "هذي الخطة مرئية وتقريبية تساعدك تطلب خدماتك بوضوح وبأسهل شكل ممكن.",
    "builder.client_name": "الشركة المباشرة:",
    "builder.service_desc": "عن هذه الخدمة:",
    "builder.deliv_to_receive": "المخرجات اللي بنسلمها لك في هذي الخدمة:",
    "builder.select_all_deliverables": "تضمين كل المخرجات التقريبية وحساب الوقت تلقائيًا",

    // AI Consultant
    "ai.sec_tag": "مستشار دُسُر الذكي",
    "ai.sec_title": "دُسُر AI للمشاريع تحت خدمتك",
    "ai.sec_desc": "عقل اصطناعي مبرمج بذكاء وفلسفة دُسُر، يكتب لك خطة عمل وهوية تسويقية واضحة ومختصرة لعلامتك برمشة عين.",
    "ai.tag": "مستشار دسر الذكي للهويات",
    "ai.title": "خطة هويتك الاستراتيجية بضغطة زر",
    "ai.desc": "اكتب تفاصيل مشروعك البسيطة، وخلي ذكاء دُسُر يحلل علامتك ويكتب لك خطة تسويقية واضحة ومختصرة وجاهزة للتطبيق.",
    "ai.form_name": "اسم مشروعك أو شركتك الرائدة",
    "ai.form_name_placeholder": "مثال: قهوة نجد، شقق تالين، كافيه ديرتنا...",
    "ai.form_sector": "مجال الشغل / القطاع التجاري",
    "ai.form_sector_placeholder": "مثال: مطور عقاري، ضيافة سعودية، متجر عطور...",
    "ai.form_audience": "مين تبي تستهدف بالظبط بمنتجك؟",
    "ai.form_audience_placeholder": "مثال: الشباب، العائلات، صناع القرار بجهات العمل...",
    "ai.form_tone": "كيف تبي الناس تشوف أسلوبك ونبرتك؟",
    "ai.form_tone_professional": "رسمي ووقور ومؤسسي واضح",
    "ai.form_tone_creative": "إبداعي وجذاب وغريب يلفت الانتباه",
    "ai.form_tone_bold": "قوي، قريب للقلب ويبني انطباع سريع",
    "ai.form_tone_luxury": "فاخر، نخبوي، وموجه للصفوة",
    "ai.form_budget": "الميزانية اللي ناوي تحطها للعمل",
    "ai.form_budget_startup": "ميزانية مجربة وبسيطة (شغل خفيف في البداية)",
    "ai.form_budget_medium": "ميزانية نمو ممتازة وتنافسية (شغل متكامل ورائع)",
    "ai.form_budget_enterprise": "ميزانية سيادية ضخمة (للمشاريع والشركات الكبيرة جداً)",
    "ai.form_goal": "وش هدفك الأساسي والأبرز الحين؟",
    "ai.form_goal_placeholder": "مثال: نبي نكون الرقم واحد بالمنطقة، نجذب زباين أكثر، إلخ...",
    "ai.btn_generate": "عطني الخطة والتحليل بالذكاء الاصطناعي الحين",
    "ai.btn_reset": "خطط لمشروع جديد",
    "ai.copy_success": "تم نسخ خطتك الذكية بنجاح!",
    "ai.btn_copy": "نسخ الخطة السريعة لتخزينها عندك",
    "ai.result_brand": "المشروع المستهدف:",
    "ai.result_slogan": "شعارك التسويقي المقترح:",
    "ai.result_tagline": "شعارك الرديف المساعد:",
    "ai.result_brief": "التحليلي والخطة الاستراتيجية المقترحة لمشروعك:",
    "ai.result_pillars": "ركائز هويتك الأساسية اللي بتركز عليها:",
    "ai.result_visual": "الشكل وروح التصميم الأنسب لعين زبونك:",
    "ai.result_campaign": "فكرة أول حملة تسويقية تطلقها للناس بالرياض وسوقك:",
    "ai.result_recommended": "خدمات ننصحك تبدأ فيها مع دُسُر فوراً للتنفيذ:",

    // Portfolio
    "portfolio.tag": "شركاء نجاحنا اللي نعتز فيهم",
    "portfolio.title": "جهات وطنية وشركات كبرنا معهم",
    "portfolio.desc": "فخورون بشغلنا وبأننا كنا جُزء أساسي من قصة نجاح كبرى الجهات والشركات بالسوق السعودي بالقطاعين الحكومي والخاص.",

    // Contact
    "contact.tag": "النجاح يبدأ من استشارة طيبة",
    "contact.title": "يلا، خلنا نحول فكرتك لواقع الحين ونكبرها!",
    "contact.desc": "تبي نشتغل معك ونضبط هويتك الرقمية ومشروعك على سنقة عشر؟ بس اختر الطريقة اللي تريحك وتواصل معنا الحين مباشرة وبثواني.",
    "contact.form_title": "أرسل لنا متطلباتك مباشرة وبشكل بسيط",
    "contact.form_name": "اسمك الكريم",
    "contact.form_email": "بريدك الإلكتروني (او بريد شركتك الأصلي)",
    "contact.form_phone": "رقم جوالك للاتصال الهاتفي",
    "contact.form_service": "وش الخدمة أو الركيزة اللي تبي تسأل عنها بالظبط؟",
    "contact.form_service_placeholder": "اختر وش الخدمة المناسبة الحين...",
    "contact.form_msg": "اكتب لنا وش تبي نسوي لك بأبسط الكلمات وبدون تعقيد",
    "contact.form_msg_placeholder": "مثال: نبي نفتتح قهوة جديدة وبنحتاج تصميم شعار وكأسات وهوية وموقع انترنت بسيط...",
    "contact.btn_send": "أرسل طلبك الحين وبنكلمك فوراً",
    "contact.send_success": "يا هلا بك، استلمنا طلبك بكل ترحاب وصدر رحب وبنكلمك هاتفياً خلال 24 ساعة لوضع ركائز هالشغل ونبحر معاً ببساطة.",
    "contact.phone_lbl": "اتصال مباشر وخدمة سريعة هاتفياً",
    "contact.email_lbl": "صندوق بريدنا الرسمي للمراسلات المعمدة",
    "contact.address_lbl": "مقرنا الأساسي بالرياض الحبيبة",
    "contact.address_text": "المملكة العربية السعودية، الرياض، حي الياسمين المشرق",

    // Preloader
    "loader.text": "أهلاً بك في دُسُر المتحدة.. ثواني ونفتح لك البوابة..."
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
