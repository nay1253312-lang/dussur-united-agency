import { 
  Compass, 
  Layers, 
  Code, 
  Sparkles, 
  Megaphone, 
  TrendingUp, 
  Bot, 
  Video 
} from 'lucide-react';

export interface UnifiedService {
  id: string; // e.g., 'branding'
  number: string; // '01', '02', etc.
  numericId: number; // 0, 1, 2, ...
  category: 'digital' | 'production';
  icon: any;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  detailedDescAr: string;
  detailedDescEn: string;
  deliverablesAr: string[];
  deliverablesEn: string[];
  gradient: string;
  businessValueAr: string;
  businessValueEn: string;
  websiteCopyAr: string;
  websiteCopyEn: string;
}

export const servicesData: UnifiedService[] = [
  {
    id: "branding",
    number: "01",
    numericId: 0,
    category: "digital",
    icon: Compass,
    titleAr: "الهوية واستراتيجية العلامة",
    titleEn: "Brand Strategy & Architecture",
    descriptionAr: "نبني لك هوية كاملة تعبر عن مشروعك، وتخلي الناس تتذكرك وتثق فيك على طول.",
    descriptionEn: "Revising legacy identities with deep strategic alignments to establish sovereign prestige and sector control.",
    detailedDescAr: "مو بس نصمم شعار عادي، حنا نسوي لشغلك شخصية كاملة. نبتكر لك الأسماء التجارية المتاحة في وزارة التجارة، نحدد طريقة كلام علامتك وأسلوبها مع الزباين، ونصنع أدلة بصرية تمشي لشركتك وتمنع تشتت التصميم والطباعة.",
    detailedDescEn: "Our branding methodology transcends superficial styling; we engineer your organization's core visual systems and verbal DNA. From high-level positioning and brand naming inside Saudi markets, to defining custom tone-of-voice covenants and absolute identity systems.",
    deliverablesAr: [
      "نأسس لك شخصية لبراندك ترسم مكانتكم بين المنافسين",
      "نخترع اسم مميز لشركتك يتسجل بوزارة التجارة بدون قروشة",
      "نصيغ نبرة كلام الهوية عشان تفهم زباينك وتعرف تسولف معهم",
      "دليل شامل لهويتكم البصرية وتصميم المطبوعات اللي تبيض الوجه"
    ],
    deliverablesEn: [
      "Brand Strategy & Market Positioning",
      "Sovereign Brand Naming & Compliance",
      "Brand Messaging Formulation & Core Values Directive",
      "Comprehensive Rebranding & System Style Guides"
    ],
    gradient: "from-[#C85A17]/25 to-[#FFD000]/10",
    businessValueAr: "تخلي مشروعك يبان فخم ويستاهل قيمته، ويوفر عليك 40% من نفقات تشتت التسويق بفضل دليل بصري مالي موحد يمنع تكرار الغلط.",
    businessValueEn: "Creates immediate institutional equity that attracts prestige capital and VIP partners, saving up to 40% in asset reproduction friction.",
    websiteCopyAr: "الشركات القوية هي اللي يفهمها الزبون من أول نظرة، وحنا بالظبط نسوي لك هذا الانطباع.",
    websiteCopyEn: "Great brands do not cloud rooms with noise; they greet the subconscious. In Dussur, we sculpt legends to echo across generations."
  },
  {
    id: "experience",
    number: "02",
    numericId: 1,
    category: "digital",
    icon: Layers,
    titleAr: "تصميم تجارب المستخدم UX/UI",
    titleEn: "Digital Experience (DX & UX/UI)",
    descriptionAr: "نصمم واجهات للمواقع والتطبيقات تكون مريحة للعين ومفهومة للزبون يطلب منها بدون تعقيد.",
    descriptionEn: "Engineering seamless interaction design and customer journeys to resolve complexity and secure conversions.",
    detailedDescAr: "ندرس عقل الزبون وكيف يحب يستعمل الجوال والمواقع، ونصمم له شاشات واضحة وأنيقة وسريعة، ونزيح أي تعقيد أو حوسة ممكن تخليه يطلع من موقعك أو تمنعه من الطلب والشراء.",
    detailedDescEn: "We bridge behavioral psychology with state-of-the-art interaction design. By detailing dynamic user journey pathways (UX), creating high-fidelity visual interfaces (UI), and crafting unified customer experiences (CX).",
    deliverablesAr: [
      "نفهم وش يحب زبونك وكيف يتحرك داخل موقعك أو تطبيقك",
      "تصميم شاشات تفتح النفس ومريحة للعين وتفاعلية",
      "تسهيل خطوات الطلب والشراء عشان العميل يخلص بلقطة",
      "فحص وتجربة تطبيقك للتأكد من سهولة الاستخدام لكل أحد"
    ],
    deliverablesEn: [
      "UX Research, Architecture & Behavioral Mapping",
      "Stunning High-Fidelity Responsive UI Mockups",
      "CX Journey Audits & Dynamic Experience Optimization",
      "Digital Accessibility Compliance Controls (WCAG)"
    ],
    gradient: "from-[#FFD000]/20 to-[#C85A17]/10",
    businessValueAr: "يرفع تفاعلك مبيعاتك بالمقاييس الرقمية بأكثر من 70%، ويوفر عليك كثير من اتصالات الدعم الفني وشكاوي حوسة الاستخدام.",
    businessValueEn: "Boosts transaction confidence and user engagement indexes by 70%, drastically decreasing subsequent support center overheads.",
    websiteCopyAr: "تطبيقك الحوس ماله داعي، الواجهات السلسة هي اللي تجيب المبيعات وعملاك بيشكرونك عليها.",
    websiteCopyEn: "A stellar journey is a quiet, seamless highway. We dissolve digital clutter into absolute intuitive ease."
  },
  {
    id: "platforms",
    number: "03",
    numericId: 2,
    category: "digital",
    icon: Code,
    titleAr: "برمجة المواقع والمنصات",
    titleEn: "Websites & Sovereign Platforms",
    descriptionAr: "نبرمج لك موقع أو منصة سريعة وآمنة ومامكن تعطل بوجه عملائك أبداً.",
    descriptionEn: "Formulating bulletproof web portals, secure ecosystems, and high-performance server architectures.",
    detailedDescAr: "شغلنا البرمجي نظيف مئة بالمئة؛ نبرمج لك بوابات ومواقع كبيرة قادرة على تحمل آلاف الزوار بنفس اللحظة، مع حماية تامة وأمان سيبراني مشدد يطابق المتطلبات الحكومية والخاصة مع ربط مباشر بحوسبتك السحابية وبدون اشتراكات شهرية غالية.",
    detailedDescEn: "We draft robust central interfaces, institutional e-portals, and secure administrative command dashboards. Leveraging bleeding-edge cloud-native libraries and decoupled backend architectures.",
    deliverablesAr: [
      "نبرمج موقعك من الصفر بـ كود نظيف وسريع يطير",
      "نسوي لوحة تحكم سهلة تقدر تعدل فيها بروسكم بدون تعقيد",
      "نربط موقعك بسيرفرات سحابية خاصة فيك بدون حوسة",
      "تأمين موقعك وحمايته من الهجمات بأعلى مستوى أمان"
    ],
    deliverablesEn: [
      "Custom Enterprise Website Design & Development",
      "Sovereign E-Portals & Official Entity Directories",
      "Internal Business Dashboards & Integrated CRM Backends",
      "High-Performance Serverless Cloud Infrastructure Setup"
    ],
    gradient: "from-[#C85A17]/20 to-[#C85A17]/10",
    businessValueAr: "استقلالية تامة لشركتك بنسبة 100% بدون الاعتماد على برمجيات تسوير شهرية مكلفة، وأمان عالي يحمي أصولك ومعلومات عملائك.",
    businessValueEn: "Provides 100% infrastructure sovereignty, mitigating expensive annual software lock-ins and securing data behind ironclad setups.",
    websiteCopyAr: "موقع سريع وأمن يعني عملائك يطمنون وهم يتعاملون معك، حنا نبرمج بضمير.",
    websiteCopyEn: "Our engineering guarantees strict functional security and unparalleled performance. We build systems that command absolute web authority."
  },
  {
    id: "products",
    number: "04",
    numericId: 3,
    category: "digital",
    icon: Sparkles,
    titleAr: "تطوير المنتجات وتطبيقات الجوال",
    titleEn: "Digital Products & SaaS Innovation",
    descriptionAr: "نحول فكرتك الكبيرة لتطبيق جوال أو نظام خدمة يدر عليك أرباح حقيقية.",
    descriptionEn: "Transforming high-potential business models into functional applications and highly scalable SaaS products.",
    detailedDescAr: "نساعدك تملك منتج رقمي مرخص باسمك وتطبيقات للجوال تفيد موظفيك أو زباينك مباشرة. حنا نسوي لك نموذج تجريبي شغال تقدر تستخدمه وتجربه قبل ما تصرف مبالغ ضخمة على البرمجة الكاملة، ونرسم لك خطة واضحة لإطلاق تطبيقك بالسوق.",
    detailedDescEn: "We assist visionaries in migrating from manual services to valuable digital asset ownership. We design native and hybrid mobile applications, and establish live clickable prototypes for swift validation before major capital.",
    deliverablesAr: [
      "نصمم ونطور تطبيق لجوالك (آيفون وأندرويد) بقمة الاحترافية",
      "نبني لك سيستم سحابي متكامل يدر عليك دخل مستمر",
      "نسوي لك نسخة تجريبية تشتغل بالجوال عشان تجربها قبل تدفع كثير",
      "ندرس خطة نزول تطبيقك للسوق عشان تضمن بداية قوية"
    ],
    deliverablesEn: [
      "iOS, Android & Hybrid App Architecture & Design",
      "Multi-Tenant SaaS System Blueprinting & Frontend Structures",
      "Interactive High-Fidelity Prototypes & Usability Trials",
      "Product Strategy Formulation & Technology Roadmaps"
    ],
    gradient: "from-[#FFD000]/20 to-[#FFD000]/10",
    businessValueAr: "يفتح لك باب ربح مستمر وجديد بالكامل لمشروعك، وبقلل الوقت اللازم لنزولك بالسوق للنصف بفضل التجريب والتخطيط السريع.",
    businessValueEn: "Unlocks active digital revenue streams and minimizes time-to-market by 50% via intelligent sandbox and verification methodologies.",
    websiteCopyAr: "البرامج الناجحة هي اللي تحل مشاكل الناس وتوفر يومهم، وحنا هنا عشان نبرمج لك الحل بأسهل طريقة.",
    websiteCopyEn: "Successful digital assets do not wait for luck; they replace daily exhaustion with effortless digital workflows."
  },
  {
    id: "communication",
    number: "05",
    numericId: 4,
    category: "production",
    icon: Megaphone,
    titleAr: "الاتصال السمعة والمحتوى",
    titleEn: "Corporate Communication & Reputation",
    descriptionAr: "نكتب لك قصة شركتك وكيف تكلم الناس وعملائك بالشبكات بوقار وهيبة وذكاء.",
    descriptionEn: "Sculpting authoritative verbal narratives and dynamic communication strategies to govern corporate reputation.",
    detailedDescAr: "مكانتك بالسوق يحددها أسلوب كلامك. حنا نصيغ قصة شركتك الرسمية، نسوي لك خطط إدارة السمعة في الأزمات والمحتوى الموثوق، ونرتب لك طريقة كتابة خطابات المسؤولين ورسائل المشروع عشان تبان رائد ومحترم ولك وزنه وهيبته بالسوق.",
    detailedDescEn: "Sovereign stature requires unified, highly strategic communication and composed narratives. We construct your official brand storytelling matrix, develop precise brand-aligned executive statements, and coordinate reputation management.",
    deliverablesAr: [
      "نرتب كلام شركتك وأسلوب تواصلها الداخلي والخارجي مع الكل",
      "نكتب قصة نجاح شركتك وطريقة تقديمها بأسلوب رهيب ومقنع",
      "خطط جاهزة تحمي سمعة شركتك وتصرف أي أزمة بذكاء",
      "نسوي لك خطة محتوى متكاملة تخلي زباينك يحبون يسولفون معك"
    ],
    deliverablesEn: [
      "Sovereign Corporate & Internal Relations Blueprint",
      "Master Brand Storytelling & Core Message Compilation",
      "Reputation Management Framework & Crisis Playbooks",
      "Multi-Channel Editorial & Public Content Strategy"
    ],
    gradient: "from-[#C85A17]/20 to-[#FFD000]/5",
    businessValueAr: "يحمي سمعة شركتك ويبني لك هيبة فورية تريحك وقت ما تخاطب الجهات أو شركائك في العمل والصفقات الكبيرة.",
    businessValueEn: "Inoculates organizational goodwill against negative brand drift, creating a formal communication moat that builds confidence.",
    websiteCopyAr: "الكلمة المدروسة تزن بلد؛ نطلع محتوى يليق باسمك ومكانتك ويعكس إنجازاتك الحقيقية.",
    websiteCopyEn: "The language of leading institutions is composed and deep. Every broadcasted word must carry weight, clarity, and sovereign purpose."
  },
  {
    id: "growth",
    number: "06",
    numericId: 5,
    category: "production",
    icon: TrendingUp,
    titleAr: "التسويق الذكي وتحليل البيانات",
    titleEn: "Growth Marketing & Intelligence",
    descriptionAr: "نوجه حملاتك الإعلانية بالبيانات الحقيقية عشان نجيب لك نمو فعلي ومبيعات بدون هدر ميزانيتك.",
    descriptionEn: "Leveraging diagnostic market research and clean data analytics to maximize marketing return on equity.",
    detailedDescAr: "ما نضيع فلوسك بحملات عشوائية؛ حنا ندرس السوق ونحلل سلوك زباينك، نضبط لك تصدر محركات البحث قوقل (SEO) عشان الناس تلقاك بسهولة، ونوجه حملاتك الإعلانية بدقة تامة مع بناء لوحات إحصائية واضحة تطلع لك أداء كل ريال تصرفه.",
    detailedDescEn: "We strictly abandon basic marketing metrics. Our marketing is driven by performance, utilizing competitor market research, enterprise search mechanics (SEO), and custom analytics.",
    deliverablesAr: [
      "ندرس السوق ونعرف منافسينك وش يسوون عشان تتفوق عليهم",
      "نضبط ترتيب موقعك في قوقل عشان تطلع أول واحد ببلاش",
      "نشغل لك حملات إعلانية مدفوعة تجيب لك الزبون الصامل فوراً",
      "شاشة وحدة تطلع لك كل الإحصائيات والأرباح بوضوح تام"
    ],
    deliverablesEn: [
      "Deep Market Assessment & Competitor Positioning",
      "Enterprise Search Positioning (SEO) & Paid Search (SEM)",
      "High-Performance Digital Growth Campaigns & Funnels",
      "Business Intelligence Dashboards & Analytics Tracking"
    ],
    gradient: "from-[#FFD000]/20 to-[#C85A17]/5",
    businessValueAr: "يوفر ميزانياتك ويرفع كفاءة إعلاناتك، ويضمن تدفق عملاء حقيقيين من قوقل بدون ما تحتاج تصرف مبالغ ضخمة طول الوقت.",
    businessValueEn: "Increases media attribution conversion rates by 150%, unlocking consistent streams of high-intent inquiries while reducing dependency.",
    websiteCopyAr: "التسويق مو كثرة إعلانات تكلّف، التسويق دراسة وأرقام نجيب لك معاها نمو ملموس ومبيعات حقيقية.",
    websiteCopyEn: "Data speaks without vanity. We analyze interaction nodes to chart your exact commercial advancement with mathematical confidence."
  },
  {
    id: "ai",
    number: "07",
    numericId: 6,
    category: "production",
    icon: Bot,
    titleAr: "أنظمة الذكاء الاصطناعي والأتمتة",
    titleEn: "AI & Digital Transformation Solutions",
    descriptionAr: "نبرمج لك مساعدين أذكياء ونأتمت شغلك اليومي عشان توفر أكثر من نصف وقتك ومجهودك.",
    descriptionEn: "Deploying enterprise machine intelligence, deep process automation, and cognitive solutions.",
    detailedDescAr: "نوفر لشركتك أحدث حلول الأتمتة المخصصة للعمليات اليومية، نسوي لك مساعدين رقميين (AI Agents) يجاوبون على الزباين أو ينظمون مستندات شركتك ليرتفع شغل موظفيك للمهام الكبيرة ويتخلصون من الشغل المكرر.",
    detailedDescEn: "Step into future-proof operations today. We design customized machine intelligence configurations, integrate process automation (RPA) workflows to eliminate error, and deploy intelligent conversational agents.",
    deliverablesAr: [
      "نسوي لك بوت ذكي (مساعد ذكاء اصطناعي) يخدم زباينك طول اليوم",
      "نربط أنظمتك ببعض ونخلي الشغل المكرر يشتغل لحاله تلقائياً",
      "نسوي لك مرجع رقمي لملفات شركتك تبحث فيه بضغطة زر ويجيب لك الرد",
      "ندرس وضع شركتك التقني ونرسم لك طريق التحول الرقمي بوضوح"
    ],
    deliverablesEn: [
      "Bespoke Enterprise AI Agents & Intelligent Assistants",
      "System Integration & Intelligent Process Automation (RPA)",
      "Sovereign Institutional Knowledge Bases & Smart Search Engines",
      "Transformation Consulting & Technical Maturity Auditing"
    ],
    gradient: "from-[#FFD000]/20 to-[#FFF6CD]/5",
    businessValueAr: "يوفر عليك 45% من وقتك ومجهودك الإداري، ويختصر الوقت الضائع في تعبئة الملفات والأعمال المتكررة اللي تضيع وقتك.",
    businessValueEn: "Saves up to 45% in administrative operational hours, securing complete systemic error eradication and offering instant decision-making data.",
    websiteCopyAr: "الذكاء الاصطناعي هو الشريك اللي يشتغل مجاناً على مدار الساعة عشان يسهل شغلك وينجزه.",
    websiteCopyEn: "Machine intelligence isn't a theory; it is your ultimate leverage. We adapt its power to build a resilient, smart foundation for your future."
  },
  {
    id: "media_events",
    number: "08",
    numericId: 7,
    category: "production",
    icon: Video,
    titleAr: "التصوير والإنتاج والفعاليات",
    titleEn: "Elite Media Production & High-End Events",
    descriptionAr: "نصور إنجازاتك بأعلى جودة سينمائية وننظم لك فعاليات ومؤتمرات تبهر ضيوفك بتميز.",
    descriptionEn: "Executing majestic cinematic documentaries and orchestrating high-end immersive corporate events.",
    detailedDescAr: "نعيد إبراز هيبتك وإنجازاتك السنوية بالألوان والمرئيات الفخمة؛ نصنع لك أفلاماً وثائقية مميزة، نبتكر رسوم حركية وموشن جرافيك بجودة عالية، وننظم ونشرف على مؤتمراتك ولقاءاتك الكبرى بالتقنيات والبروتوكول السعودي الفخم.",
    detailedDescEn: "We immortalize your corporate legacy through majestic visual storytelling. From directing cinematic brand documentaries, to designing end-to-end layouts for immersive summits.",
    deliverablesAr: [
      "نصور إنجازات شركتك بفيديو وثائقي فخم يجيب الرأس بدقة 4K",
      "نصمم موشن جرافيك وفيديوهات تفاعلية تشرح فكرتك بثواني",
      "تغطية كاملة بالصور والصوت لأي إنجاز أو حفل رسمي تسوونه",
      "نخطط وننظم مؤتمراتك وندواتك الكبرى من الألف للياء بشكل يشرفك"
    ],
    deliverablesEn: [
      "Cinematic Brand Documentaries & Corporate Showcase Films",
      "Premium Motion Graphics & Dynamic Custom CGI Animation",
      "Sovereign Media Content Coverage & Strategic Broadcasts",
      "Grand-Scale Summit, Exhibition & Event Engineering"
    ],
    gradient: "from-[#C85A17]/10 to-[#FFF6CD]/5",
    businessValueAr: "يعزز هيبة علامتك قدام الناس وصناع القرار ويبرز قوة إنجازاتك برتم بصري يبهر المتلقي ويدعم ثقته فيك ويترك انطباعاً فخماً.",
    businessValueEn: "Secures immense emotional resonance and institutional goodwill among state partners, immortalizing your success narratives inside sovereign directories.",
    websiteCopyAr: "اللقطات الفنية الرائعة هي اللي تحفظ إنجازاتك بالصور والذكريات اللي تدوم في بال الناس دايماً.",
    websiteCopyEn: "Transformation is destined to be seen. We capture your milestones with premium aesthetics, crafting modern visual coordinates for the Kingdom's history."
  }
];
