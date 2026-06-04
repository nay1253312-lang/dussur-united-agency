/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Palette, Layers, Code, Bot, TrendingUp, 
  Video, Check, ArrowLeftRight, Phone, MessageSquare, Menu, X, Landmark, 
  History, ShieldCheck, Quote, ChevronDown, ChevronUp, BookOpen, Send, UserCheck, HelpCircle,
  Goal, Share2, Languages
} from 'lucide-react';
import HomeHero from './HomeHero';
import PillarsView from './PillarsView';
import ProjectBuilder from './ProjectBuilder';
import AIConsultant from './AIConsultant';
import PortfolioView from './PortfolioView';
import ContactView from './ContactView';
import Footer from './Footer';
import GoldDustSeparator from './GoldDustSeparator';
import { useLanguage } from '../LanguageContext';

// Mobile-specific services array (matching desktop keys for unified content)
interface MobileServiceItem {
  id: number;
  category: 'digital' | 'production';
  icon: any;
  title: string;
  englishTitle: string;
  description: string;
  detailedDesc: string;
  deliverables: string[];
  gradient: string;
  businessValue: string;
  websiteCopy: string;
}

interface MobileTabletViewProps {}

export default function MobileTabletView({}: MobileTabletViewProps) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero-m');
  const [activeCategory, setActiveCategory] = useState<'digital' | 'production'>('digital');
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(0);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Experience Counter state (replicated and optimized for mobile triggers)
  const [yearsCount, setYearsCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  const isAr = lang === 'ar';

  const rawServices: MobileServiceItem[] = [
    {
      id: 0,
      category: "digital",
      icon: Compass,
      title: "استراتيجية الهوية وتكامل المكانة",
      englishTitle: "Brand Strategy & Positioning",
      description: "هندسة المستقبل البصري ومحاذاة التموضع لتمكين الكيانات من قيادة فئتها الفاخرة.",
      detailedDesc: "لا يقتصر ابتكار الهويات لدينا على الجماليات البصرية الفاخرة؛ بل نعتبر الهوية البصرية الحمض النووي للكيان وصوته الهادر. نحن ننسج الرؤى الاستشرافية لعلامتك مع دراسات الديموغرافيا والتوجه الإستراتيجي، لنبتكر أنظمة متكاملة تعيد هندسة تصور الجمهور لعلامتك التجارية الفاخرة ومكانتها في قيادة المشهد.",
      deliverables: [
        "دليل الهوية المستقبلي الشامل (Brand Guidelines)",
        "معمارية العلامة والتموضع الاستراتيجي (Brand Positioning)",
        "صياغة الميثاق اللفظي ونبرة الصوت (Tone of Voice Manual)",
        "حزمة أصول المطبوعات الإدارية النخبوية (Elite Identity Pack)"
      ],
      gradient: "from-[#C85A17]/25 to-[#FFD000]/10",
      businessValue: "بناء هيبة فورية ومستقرة وميزة تنافسية لا تُجاري، قادرة على اجتذاب العملاء الرائدين والشركاء الإستراتيجيين، ورفع القيمة التقديرية للكيان بنسبة هائلة في الطروحات والاكتتابات.",
      websiteCopy: "العلامات العظيمة لا تخاطب العقول بالحسابات المتغيرة، بل تصافح الوجدان بالرموز الثابتة. في دُسُر، نصنع لعلامتكم بريقاً مستمداً من تطلعات الغد ورصانة الإنجاز اليوم."
    },
    {
      id: 1,
      category: "digital",
      icon: Palette,
      title: "ابتكار نظم التصميم والرموز البصرية",
      englishTitle: "Brand Identity Systems & Design Systems",
      description: "تخليق لغات بصرية شاملة وأدلة مستجيبة لتنظيم الأثر الفني عبر كافة وسائط العرض.",
      detailedDesc: "نصمم النماذج الإبداعية المتكاملة التي تضمن اتساق علامتكم عبر الفضاءات المادية والرقمية. نضع القوانين البصرية للنسب الذهبية للرموز والخطوط والتجاوب اللوني، لنخلق لغة تواصل بصري رفيعة وموحدة تترك انطباعًا فريدًا بالسيادة والامتياز.",
      deliverables: [
        "ابتكار الرموز والشعارات الهندسية المتراكبة",
        "مكتبة الأنماط البصرية الحركية والفنية",
        "تطبيق الهوية الشامل على الهدايا والتذكارات المصممة",
        "دليل التوافق الفني وتطبيقات الويب والبيئة المحيطة"
      ],
      gradient: "from-[#FFD000]/20 to-[#C85A17]/10",
      businessValue: "توفير لغة بصرية متناسقة تضمن خفض تكلفة تصميم المواد التسويقية بمعدل 50%، وتسريع زمن طرح المنتجات بصريًا في الأسواق مع تعزيز حضور العلامة في الذاكرة الجمعية.",
      websiteCopy: "إننا لا نرسم خطوطاً عشوائية؛ بل نهيكل رموزاً وطنية رصينة تجسّد عراقة الماضي السعودي وتتناغم مع ريادة رؤية المملكة التنموية."
    },
    {
      id: 2,
      category: "digital",
      icon: Layers,
      title: "تصميم المنتجات وتجارب الاستخدام UX/UI",
      englishTitle: "UX/UI & Digital Product Design",
      description: "تصميم واجهات منصات وتجارب تفاعلية غامرة فائقة السهولة والجمال لترسيخ الروابط الرقمية.",
      detailedDesc: "نحن ندمج الفن الرقمي المبتكر مع الفهم العميق لعلم النفس البشري وسلوكيات التفاعل الرقمي. نصمم واجهات استخدام وتجارب حية تمتاز بالانسيابية الفائقة وعنايتها بأدق التفاصيل، وتضمن تحويل السلوك العشوائي إلى رحلات رقمية منظمة تبسط أعمالكم وتلبي طموحات عملائكم المعاصرة.",
      deliverables: [
        "هندسة رحلات المستخدم ومخططات السلوك (User Journey)",
        "تصميم واجهات منصات الويب وتطبيقات الجوال (High-Fi UI)",
        "نماذج واجهات برمجية واختبار تفاعلي حي (Interactive Prototype)",
        "نظم التصميم الرقمية المعمارية الشاملة (Design Systems)"
      ],
      gradient: "from-[#C85A17]/20 to-[#C85A17]/10",
      businessValue: "تحسين تجربة العميل الرقمية يساهم بصورة فورية في رفع رضا المستخدمين بنسبة 80%، بجانب الحد من الدعم الفني، ورفع معدل التفاعل والاعتماد على الخدمات الرقمية الذاتية.",
      websiteCopy: "التجربة الرقمية ليست مجرد ألوان تلمع، بل هي المسارات الصامتة السلسلة التي تحول الاستخدام المعقد إلى تجربة إنسانية غاية في الإمتاع والانسياب."
    },
    {
      id: 3,
      category: "digital",
      icon: Code,
      title: "تصميم وتطوير المواقع والمنصات الفاخرة",
      englishTitle: "High-End Web Design & Development",
      description: "بناء بوابات ويب متينة وسريعة، تدمج التصاميم المستقبلية بأحدث الأكواد المستقرة والآمنة.",
      detailedDesc: "نصمم ونطور الواجهات الأمامية والأنظمة الخلفية للبوابات الرقمية للجهات الحكومية والشركات الكبرى. نستخدم تقنيات الويب السحابية المعاصرة لضمان أداء مستقر وسرعة استجابة فائقة تحت الأحمال الضخمة، مع الالتزام بأقصى تدابير الحماية والأمن السيبراني.",
      deliverables: [
        "بناء الواجهات التفاعلية الحديثة (React/TypeScript)",
        "بوابات النخبة الرقمية للجهات والشركات الكبرى",
        "أنظمة إدارة محتوى مخصصة فائقة الأمان (Headless CMS)",
        "التوافق الرقمي والاندماج مع خدمات الحوسبة السحابية"
      ],
      gradient: "from-[#FFD000]/20 to-[#FFD000]/10",
      businessValue: "تأسيس حضور رقمي رسمي مستقل وسريع يوثق الموثوقية السيادية للجهة، مع حماية أمنية وتوافق فني كامل يقلل من نفقات الصيانة والتطوير على المدى الطويل.",
      websiteCopy: "أكوادنا البرمجية تُغزل بوزن الأمان والسرعة. نمنح بوابتكم الرسمية حضورًا مهيبًا يليق بتقدير الكيان وقوة تأثيره في عالم الويب."
    },
    {
      id: 4,
      category: "digital",
      icon: Bot,
      title: "الذكاء الاصطناعي الأتمتة والابتكار",
      englishTitle: "AI Solutions, Automation & Innovation",
      description: "توظيف التقنيات الذكية للابتكار وتسهيل العمليات وابتكار روبوتات ذكية توفر الوقت والجهد.",
      detailedDesc: "نحن ندمج خدمات الذكاء الاصطناعي التوليدي والأنظمة الذكية في عمق سير أعمال شركتكم. نصمم لكم نماذج أتمتة حية ومساعدين أذكياء يحلون عناء المهام اليدوية، لزيادة الكفاءة التشغيلية، ومضاعفة إنتاجية الكادر البشري للتركيز على الابتكار الاستراتيجي الفاخر.",
      deliverables: [
        "استشارات دمج الذكاء الاصطناعي وخطط الأتمتة للعمليات",
        "تطوير عملاء ومساعدين ذكاء اصطناعي تفاعليين (AI Agents)",
        "أتمتة خطوط الإنتاج والربط بين الأنظمة المتباينة",
        "مختبر الابتكار وتسريع النماذج الرقمية الأولية (R&D Labs)"
      ],
      gradient: "from-[#C85A17]/20 to-[#FFD000]/5",
      businessValue: "تقليص الأخطاء البشرية وأتمتة 40% من العمليات الروتينية، مما يوفر آلاف ساعات العمل الإداري ويعزز من سرعة الرد والاستجابة مع توفير رؤى تحليلية فورية للرؤساء التنفيذيين.",
      websiteCopy: "الذكاء الاصطناعي ليس مجرد معادلات؛ هو ذراعكم التنفيذية الكفؤ في سباق المستقبل. نهندس الحل الذكي ليخدم استقرار ونمو أعمالكم اليوم وطوال السنوات القادمة."
    },
    {
      id: 5,
      category: "digital",
      icon: TrendingUp,
      title: "التسويق بالنمو المتسارع وتحليلات البيانات",
      englishTitle: "Growth Marketing & SEO",
      description: "ترجمة لغة الأرقام وأداء الويب إلى فرص حية للامتياز وتجاوز قنوات المنافسة التقليدية.",
      detailedDesc: "نصنع حملات استراتيجية تنطلق من يقين الأرقام والبيانات السلوكية. لا نهدر ميزانياتكم في حملات عشوائية؛ بل نهيكل مسارات واضحة وحلول تهيئة عضوية تضمن تصدر بواباتكم لمحركات البحث مع ربط المنصات بقياسات سلوكية دقيقة تلهم صناع القرار.",
      deliverables: [
        "خطط تحسين الظهور الاستراتيجي بمحركات البحث (Enterprise SEO)",
        "بناء لوحات بيانات القياس والوصول الرقمي والمؤشرات (BI)",
        "حملات الاستقطاب والتسويق عالي الدقة والأداء الرقمي",
        "اختبارات نمو القنوات الرقمية ومضاعفة نسب التحويل (CRO)"
      ],
      gradient: "from-[#FFD000]/20 to-[#C85A17]/5",
      businessValue: "تعظيم كفاءة الإنفاق التسويقي الرقمي بنسبة تفوق الضعف، والحصول على تدفق طبيعي مستدام من المهتمين بقنواتكم دون الاعتماد الدائم والمطلق على التمويل المدفوع.",
      websiteCopy: "الأرقام تروي تفضيلات الجمهور بصمت. نقرأ سجلات تصفح منصاتكم لنضع لكم خرائط توجيه مالي دقيقة تضمن تحقيق أهدافكم الكبرى بوقت قياسي."
    },
    {
      id: 6,
      category: "digital",
      icon: Video,
      title: "الإنتاج الإعلامي السينمائي والسرد القصصي",
      englishTitle: "Cinematic Media & Storytelling",
      description: "إخراج وثائقي وصوتيات بجودة سينمائية كاملة يخلّد المنجزات ويعبر عن هيبة الكيان.",
      detailedDesc: "من خلال استوديوهاتنا الإبداعية، نصنع أفلاماً وثائقية ومواد إعلانية بجودة سينمائية فائقة تزيد من كبرياء علامتكم. نهتم بكل ركن إخراجي وتعديل لوني وهندسة مسارات الصوت والموسيقى الحصرية لنقدم عملاً يرسخ مآثر الكيان الوطني وتطلعاته الاستراتيجية.",
      deliverables: [
        "إنتاج الأفلاف السنوية والوثائقية للمنجزات الكبرى",
        "صياغة وإنتاج المحتوى ثلاثي وثنائي الأبعاد والمعالجات الصورية",
        "عروض مرئية مذهلة للشاشات التفاعلية والفعاليات الكبرى",
        "تأليف الموسيقى الرسمية الخاصة والهويات الصوتية النخبوية"
      ],
      gradient: "from-[#C85A17]/10 to-[#FFF6CD]/5",
      businessValue: "تأثير عميق يحرك الأذواق والولاء، يبرز تميز علامتكم في المؤتمرات والفعاليات الكبرى والمحافل الرسمية بصورة تبهج النفوس وتمنح الكيان ثقته الإعلامية المستحقة.",
      websiteCopy: "الصورة المرئية هي مرآة العزيمة والهمم. نصور إنجازاتكم بروح سينمائية تجمع بين بريق الذهب وواقعية الأثر على الأرض الحبيبة لبلادنا."
    },
    {
      id: 7,
      category: "production",
      icon: Goal,
      title: "التخطيط الإستراتيجي والحملات الإعلانية",
      englishTitle: "Strategic Marketing & Ad Campaigns",
      description: "إعداد الدراسات الاستكشافية ورسم خرائط الإنفاق الإعلاني الدقيق لضمان دقة الوصول.",
      detailedDesc: "نقوم بدراسة أبعاد علامتكم التجارية وتفضيلات منافسيكم في السوق المحلي والإقليمي، لنصيغ لكم دليلاً استشارياً متكاملاً وخططاً إشهاريّة دقيقة تضمن أعلى معدلات الثبات والوصول لرسالتكم الإعلانية.",
      deliverables: [
        "دراسة سلوك المستهلك وتفضيلاته المحلية",
        "توزيع الميزانيات وتطوير الجدول الزمني للحملات",
        "صياغة الرسائل الترويجية واختيار قنوات النشر",
        "بناء مؤشرات قياس كفاءة الأداء الإعلاني"
      ],
      gradient: "from-[#C85A17]/20 to-[#FFD000]/10",
      businessValue: "تفادي الهدر العشوائي للميزانيات وتطوير نماذج إنتاج تضمن خفض تكلفة الوصول إلى النخبة المستهدفة وتعزيز فاعلية كل ريال مستثمر.",
      websiteCopy: "التخطيط ليس ترف التفكير، بل لغة الأرقام الصارمة التي تحمي الاستثمار من رياح الارتجال وتضمن ريادة الحضور."
    },
    {
      id: 8,
      category: "production",
      icon: Palette,
      title: "التصميم الإبداعي والهوية المؤسسية",
      englishTitle: "Creative Branding & Visual Identity",
      description: "ابتكار شعارات وشخصيات ونظم بصرية كلاسيكية بوزن الفخامة السعودية والأصالة.",
      detailedDesc: "الهوية الإبداعية الفخمة ليست مجرد تركيب ألوان؛ بل ننسج لكم رموزاً شديدة البلاغة والوضوح تعكس قوة وجاذبية منشأتكم وصلاحياتها في الأسواق مع صياغة الدليل الاسترشادي الشامل للاستخدام اللوني والرمزي الفاخر.",
      deliverables: [
        "تصميم الشعار وتراصيف الكيان الرسمية",
        "أدلة الألوان والهوية البصرية المتفردة والخطوط",
        "تصميم النشرات المطبوعة والملفات البروفايلية للشركة",
        "قوالب وتطبيقات الهوية البصرية على المنصات الرقمية"
      ],
      gradient: "from-[#FFD000]/20 to-[#C85A17]/10",
      businessValue: "تمثيل الكيان بمظهر مهيب يرسخ الثقة المطلقة لدى المستثمرين والعملاء، ويبني أصالة معترف بها تمنع المنافسين من تقليد حضوركم الكلي.",
      websiteCopy: "الهوية البصرية المثالية تدوم لعقود؛ لأننا نغزلها بأبعاد هندسية ونسب مرسومة لا يقوى الزمن على محوها."
    },
    {
      id: 9,
      category: "production",
      icon: Video,
      title: "الإنتاج المرئي والمحتوى السينمائي",
      englishTitle: "Cinematic Content Production",
      description: "وروي قصة الكيان الإبداعية بجودة سينمائية وصور وثائقية مهيبة تخلد الإنجازات.",
      detailedDesc: "من كتابة السيناريو الإبداعي وتخطيط لقطات الإخراج، إلى المونتاج والهندسة التوافقية والتلوين السينمائي 4K، لنصنع أعمالاً وثائقية وإعلانية تفوق التوقعات وتلفت وجدان المتلقين.",
      deliverables: [
        "الأفلام الوثائقية والإنتاجات السنوية للمنجزات الكبرى",
        "المقاطع الإعلانية والترويجية السينمائية للمشاريع",
        "فيديوهات موشن جرافيك فخمة وثنائية وثلاثية الأبعاد",
        "دوبلاج وتأليف المؤثرات الصوتية والمونتاج السينمائي"
      ],
      gradient: "from-[#C85A17]/20 to-[#C85A17]/10",
      businessValue: "تخليد منجزات الكيان عبر مخرجات سمعية بصرية فائقة تؤثر بالعملاء الكبار وصناع القرار وتصنع ولاء مطلقاً للعلامة.",
      websiteCopy: "تُنحت معالم النجاح بعدسات ترسم الضوء ببراعة وتنسج من تطلعات الحاضر قصصاً تلهم الغد."
    },
    {
      id: 10,
      category: "production",
      icon: Share2,
      title: "إدارة الشبكات والاتصال الرقمي",
      englishTitle: "Social Media Management",
      description: "إدارة وتنشيط قنوات التواصل الرقمية للكيان بنبرة وقورة ومحتوى يومي متفاعل.",
      detailedDesc: "ندير تواصلكم وشبكات علاماتكم الرسمية على مدار الساعة، مصممين ومصنفين محتوى يليق بالنبرة والهوية التي حددناها، مع مراقبة تفاعل الجمهور والتحويل المستمر لمعدلات النمو والوصول الفني المتكامل.",
      deliverables: [
        "صياغة المحتويات اليومية بالنبرة المؤسسية الرسمية المعتمدة",
        "تصميم الإنفوجرافيك والمواد الحركية المتسقة مع دليل الهوية",
        "جدولة المنشورات والتخطيط الاستراتيجي لقنوات البث الرقمية",
        "تزويد صناع القرار بتقارير رقمية حيوية وعنصري أداء"
      ],
      gradient: "from-[#FFD000]/20 to-[#C85A17]/5",
      businessValue: "حراسة وتوجيه السمعة العامة للجهة، وزيادة ترابطات المجتمع والشركاء مع المخرجات الرسمية بنبرة صادقة وهادئة.",
      websiteCopy: "النافذة الاجتماعية لعلامتكم هي وسيلة التلاقي الأسرع؛ لذلك نرسخ كل كلمة تطبع بها بوقار ودقة تامة."
    }
  ];

  // Map translations to Raw Services identically to desktop
  const getTranslatedService = (item: MobileServiceItem): MobileServiceItem => {
    if (isAr) return item;
    const enDetails: Record<number, Partial<MobileServiceItem>> = {
      0: {
        title: "Brand Strategy & Positioning",
        description: "Engineering visual futures and strategic alignments to enable entities to lead their luxury sector.",
        detailedDesc: "Our brand strategies transcend aesthetics. We treat identity as an organization's DNA and authentic voice. We weave forward-looking insights with demographic studies and strategic positioning to create integrated systems that redefine the public's perception of your premium brand.",
        deliverables: [
          "Comprehensive Brand & Logo Guidelines (Brand Manual)",
          "Brand Architecture & Strategic Positioning Plan",
          "Verbal Identity & Core Tone of Voice Manuals",
          "Elite Corporate Collateral Identity Packs"
        ],
        businessValue: "Establish immediate prestige, robust credibility, and an unrivaled competitive edge, attracting premium clients and boosting market valuation.",
        websiteCopy: "Great brands do not speak to minds with changing mathematics; they greet hearts with timeless symbols. In Dussur, we shape a brilliance built on tomorrow's ideals."
      },
      1: {
        title: "Brand Systems & Design Guidelines",
        description: "Crafting comprehensive design guidelines and responsive visual components for multiple mediums.",
        detailedDesc: "We design integrated visual systems that ensure your brand remains consistent across both physical and digital spaces. We establish geometric rules for layouts, fonts, and responsive grids, carving a high-end corporate identity with absolute consistency and excellence.",
        deliverables: [
          "Bespoke Geometric Logos & Structured Emblems",
          "Digital Kinetic Design Systems & Component Libraries",
          "Luxury Corporate Gifting & Merchandise Visual Guidelines",
          "Environmental Signage & Physical Retail Design Guidelines"
        ],
        businessValue: "Unified visual standard reduces asset delivery friction by 50% while magnifying brand memorability in public consciousness across multiple touchpoints.",
        websiteCopy: "We do not draw random arcs. We engineer sovereign symbols reflecting cultural legacy aligned with the forward-looking vision of the Kingdom."
      },
      2: {
        title: "UX/UI & Digital Product Design",
        description: "Designing seamless user visual journeys and interactive flows to bind digital connections.",
        detailedDesc: "We merge interactive digital design with the science of consumer psychology and behavioral analysis. By mapping out highly intuitive journeys, we transform standard online interactions into delightful experiences that simplify operation and capture customer delight.",
        deliverables: [
          "User Journey Mapping & Interactive Flow Charts",
          "State-Of-The-Art Mobile & Web Interface Designs (High-Fi UI)",
          "Fully Realized Interactive Prototypes for Behavioral Verification",
          "Scalable Digital UI Framework Specification Sheets"
        ],
        businessValue: "Improving custom digital pathways improves overall user index scores by 80%, reducing customer care overhead and boosting transaction confidence.",
        websiteCopy: "A stellar web journey isn't composed of flashy gradients; it is the silent, flawless highway transforming complex processes into moments of sheer ease."
      },
      3: {
        title: "Web Design & Secure Infrastructure",
        description: "Formulating blazing fast portals merging future layouts with robust codes.",
        detailedDesc: "We build secure frontend assets and modular backend portals for ministries, national agencies, and leading brands. Leveraging modern cloud architectures, we ensure flawless, reliable performances under high demand scales with severe cybersecurity integrations.",
        deliverables: [
          "Next-Gen Responsive Web User Interfaces (React / TypeScript)",
          "Elite Centralized Digital Gateways & Administration Hubs",
          "Sovereign Decoupled High-Safety Headless CMS Setups",
          "Cloud Migration & Resilient Scalability Systems Orchestration"
        ],
        businessValue: "Secures a rapid sovereign online footprint, ensuring reliable uptime and airtight safety while curbing maintenance overhead.",
        websiteCopy: "Our codes are bound by precision, safety, and loading velocity. We grant your gateway a regal presence that mirrors the power of your organization."
      },
      4: {
        title: "AI Integrations, Agents & Automation",
        description: "Leveraging custom machine intelligence to simplify workflows and boost throughput.",
        detailedDesc: "We deploy custom generative artificial intelligence and workflow automations into your enterprise operations. By automating repetitive processes, we boost workforce efficiency while unlocking critical hours to spend on strategy and innovation.",
        deliverables: [
          "AI-Readiness Assessment & Process Automation Mapping",
          "Custom Intelligent Conversational Agents & Task Orchestrator Bots",
          "Distributed Systems Interconnectivity & Microservices Automations",
          "Corporate Innovation Experiments & Rapid Research Prototypes"
        ],
        businessValue: "Reduces manual entry errors, automates up to 40% of standard operations, and equips C-level executives with instant business summaries.",
        websiteCopy: "Artificial Intelligence isn't a theory; it is your highly productive partner. We build smart solutions to secure and accelerate your operations today."
      },
      5: {
        title: "Growth Marketing & SEO Engineering",
        description: "Converting behavioral telemetry data into organic brand acquisitions.",
        detailedDesc: "We formulate marketing campaigns rooted in precise demographic analytics and user intent. We do not burn capital in random pools; we optimize your index presence on search engine nodes while mounting behavioral dashboards to guide executive growth decisions.",
        deliverables: [
          "Enterprise Search Engine Optimization Strategies (Enterprise SEO)",
          "Corporate BI Analytics & Executive KPI Reporting Systems",
          "High-Precision Customer Acquisition Campaigns & Direct Conversion",
          "Conversion Rate Optimization (CRO) & Interactive Path Testing"
        ],
        businessValue: "Maximizes digital marketing return-on-equity by over 2x, building high organic inbound flows that thrive without relying on endless ad spend.",
        websiteCopy: "Data speaks the true voice of the consumer. We read online interactions to give you clear guidance and drive maximum audience loyalty."
      },
      6: {
        title: "Cinematic Corporate Media & Storytelling",
        description: "Crafting beautiful documentaries expressing organizational authority.",
        detailedDesc: "Through our cinematic production studios, we build films and promotional materials that preserve national accomplishments and brand goals. We handle script writing, professional color grading, cinematic sound designs, and custom orchestral soundtracks.",
        deliverables: [
          "High-End Institutional Annual Documentaries & Video Summaries",
          "Custom 3D Animations & CGI Visual Treatments",
          "Stunning Visual Presentations for Dynamic Large-Scale Event Screens",
          "Elite Custom Sonic Logotypes & Executive Orchestrated Soundtracks"
        ],
        businessValue: "Builds deep emotional bonds, showcasing your accomplishments in global summits with a majestic elegance that earns complete institutional prestige.",
        websiteCopy: "Creative video is the reflection of vision and high ambitions. We record your milestones with a brilliant style that captures hearts."
      },
      7: {
        title: "Strategic Marketing & Ad Campaigns",
        description: "Drafting market studies and organizing capital spend to trigger reach.",
        detailedDesc: "We analyze competitor directions and local behaviors to draft cohesive launching programs, ensuring your commercial messaging lands with unyielding stability and high recall.",
        deliverables: [
          "Consumer Insights & Saudi Local Behavioral Trend Studies",
          "Ad Budget Allotment & Phased Campaign Launch Roadmaps",
          "Value Proposition Refining & Dynamic Channel Selection",
          "Campaign ROI Analytics & Customer Engagement KPIs"
        ],
        businessValue: "Precludes budget dissipation, designing delivery tracks that guarantee direct connections with choice audience segments.",
        websiteCopy: "Strategy isn't visual fluff; it and precise budgeting protect your capital from trends and secure long-term leadership."
      },
      8: {
        title: "Creative Branding & Visual Identity",
        description: "Developing iconic logos, guidelines, and corporate systems reflecting heritage.",
        detailedDesc: "Corporate identity is your organization's signature. We assemble clear, powerful guidelines indicating logo placement, palette pairing, custom fonts, and high-quality printed assets.",
        deliverables: [
          "Bespoke Emblem Crafting & Golden-Ratio Geometry Logos",
          "Timeless Color Palettes & Premium Typographic Handbooks",
          "Luxury Printed Profiles & Embossed Entity Brochures",
          "Dynamic Adaptations for Physical Signage & Online Portals"
        ],
        businessValue: "Presents your brand with timeless majesty, reinforcing trust from institutional partners and shielding your identity from imitation.",
        websiteCopy: "We believe an excellent graphic identity stands decades because we build it on golden proportions that resist the decay of time."
      },
      9: {
        title: "Cinematic Content Production",
        description: "Telling your story with majestic 4K cinematography celebrating milestones.",
        detailedDesc: "From meticulous storyboarding to post-production coloring and dynamic editing, we manufacture visual pieces that exceed contemporary expectations.",
        deliverables: [
          "Annual Multi-Phased Milestones & Keynote Showcase Videos",
          "3D Architectural Overlays & High-Response Explainer Videos",
          "Custom Multi-Camera Cinematic Productions in Full 4K HDR",
          "Professional Voiceovers & Premium Orchestras Layouts"
        ],
        businessValue: "Immortalizes your story via premium audio-visual assets that impress board members and secure legendary heritage.",
        websiteCopy: "We shape light, color, and pacing to spin your current achievements into stories that inspire generations to come."
      },
      10: {
        title: "Social Media Management",
        description: "Managing corporate channels with a dignified voice and daily material.",
        detailedDesc: "We manage your official networks around the clock, implementing precise monthly schedules and visual infographics aligned to your brand manuals, with periodic reports of user growth.",
        deliverables: [
          "Professional Daily Copywriting Aligned to Corporate Guidelines",
          "Custom Vector Infographics & Styled Motion Clips",
          "Smart Channel Scheduling & Proactive Community Care",
          "Monthly Telemetry Reports detailing Engagement & Reach"
        ],
        businessValue: "Guards and shapes public reputation, fostering real-time interactions with community sectors with dignified clarity.",
        websiteCopy: "Social channels are your transparent windows to the world. We ensure every word is typed with composed dignity."
      }
    };
    const targetDetails = enDetails[item.id] || {};
    return {
      ...item,
      title: targetDetails.title || item.englishTitle,
      description: targetDetails.description || item.description,
      detailedDesc: targetDetails.detailedDesc || item.detailedDesc,
      deliverables: targetDetails.deliverables || item.deliverables,
      businessValue: targetDetails.businessValue || item.businessValue,
      websiteCopy: targetDetails.websiteCopy || item.websiteCopy
    };
  };

  const services = rawServices.map((s) => getTranslatedService(s));

  useEffect(() => {
    // 1. Mobile touch tracking indicators
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent((window.scrollY / docHeight) * 100);
      }

      // Automatically sync active sections as the user scrolls past guidelines
      const sections = ['hero-m', 'about-m', 'services-m', 'builder-m', 'ai-m', 'portfolio-m', 'contact-m'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Optimized counter trigger with IntersectionObserver (performs beautifully on mobile chipsets)
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        let currentIter = 0;
        const targetNumber = 25;
        const speedInterval = setInterval(() => {
          currentIter += 1;
          setYearsCount(currentIter);
          if (currentIter >= targetNumber) {
            clearInterval(speedInterval);
          }
        }, 35);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToMobileSection = (id: string) => {
    setPhoneMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // account for sticky header height
      const yLocation = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yLocation, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const filteredServices = services.filter(s => s.category === activeCategory);

  return (
    <div className={`relative min-h-screen bg-[#080809] text-[#FFF6CD] antialiased overflow-x-hidden ${isAr ? 'rtl' : 'ltr'}`}>
      
      {/* 1. Sticky Mobile Header */}
      <header className="fixed top-0 inset-x-0 h-20 bg-[#080809]/80 backdrop-blur-xl border-b border-[#FFF6CD]/5 z-50 flex items-center justify-between px-4 sm:px-6 select-none">
        <a 
          href="#hero-m" 
          onClick={(e) => { e.preventDefault(); scrollToMobileSection("hero-m"); }}
          className="flex items-center focus:outline-none"
        >
          <img 
            src={isAr ? "/logo-ar.svg" : "/logo-en.svg"} 
            alt="Dussur" 
            className="h-14 w-auto object-contain hover:brightness-110 active:scale-95 transition-all drop-shadow-[0_2px_10px_rgba(200,90,23,0.15)] animate-none"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Direct Contact triggers on mobile bar */}
        <div className="flex items-center gap-2">
          {/* Language Switcher for all devices */}
          <button 
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-lg bg-[#0F1012] border border-[#FFF6CD]/10 flex items-center justify-center text-[#FFF6CD] hover:text-[#FFD000] active:scale-95 transition-all cursor-pointer select-none"
            title={isAr ? 'English' : 'العربية'}
          >
            <span className="text-[11px] font-bold font-mono text-[#FFD000] uppercase">
              {isAr ? 'EN' : 'AR'}
            </span>
          </button>

          {/* Quick AI Consultant shortcut button */}
          <button 
            onClick={() => scrollToMobileSection("ai-m")}
            className="flex items-center gap-1 bg-[#C85A17]/20 border border-[#C85A17]/40 text-[#FFD000] text-[11px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            <Sparkles className="w-3 h-3 text-[#FFD000] animate-pulse" />
            <span>{isAr ? 'مستشار AI' : 'AI Agent'}</span>
          </button>

          <button 
            onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
            className="w-10 h-10 rounded-lg bg-[#0F1012] border border-[#FFF6CD]/10 flex items-center justify-center text-[#FFF6CD]"
          >
            {phoneMenuOpen ? <X className="w-5 h-5 text-[#FFD000]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Floating linear progress border top line */}
        <div 
          className={`absolute bottom-0 h-0.5 bg-gradient-to-l from-[#C85A17] via-[#FFD000] to-transparent transition-all duration-75 ${isAr ? 'right-0' : 'left-0'}`}
          style={{ width: `${scrollPercent}%` }}
        />
      </header>

      {/* 2. Sliding Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {phoneMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 inset-x-0 bg-[#0F1012] border-b border-[#FFF6CD]/10 z-40 overflow-hidden box-shadow-2xl"
          >
            <div className={`p-6 flex flex-col gap-3.5 ${isAr ? 'text-right' : 'text-left'}`}>
              <button 
                onClick={() => scrollToMobileSection("hero-m")}
                className="w-full text-sm font-bold text-[#A39E8C] py-2 border-b border-white/5 active:text-[#FFD000]"
              >
                {isAr ? "البداية والواجهة الريادية" : "Home & Leadership Front"}
              </button>
              <button 
                onClick={() => scrollToMobileSection("about-m")}
                className="w-full text-sm font-bold text-[#A39E8C] py-2 border-b border-white/5 active:text-[#FFD000]"
              >
                {isAr ? "فلسفتنا وعقيدة دُسُر" : "Philosophy & Dussur Belief"}
              </button>
              <button 
                onClick={() => scrollToMobileSection("services-m")}
                className="w-full text-sm font-bold text-[#A39E8C] py-2 border-b border-white/5 active:text-[#FFD000]"
              >
                {isAr ? "منظومة ركائزنا المتكاملة" : "Our Integrated Pillars"}
              </button>
              <button 
                onClick={() => scrollToMobileSection("builder-m")}
                className="w-full text-sm font-bold text-[#A39E8C] py-2 border-b border-white/5 active:text-[#FFD000] flex items-center justify-between"
              >
                <span>{isAr ? "أداة صياغة النطاق التفاعلية" : "Interactive Scope Builder"}</span>
                <ArrowLeftRight className="w-4 h-4 text-[#C85A17]" />
              </button>
              <button 
                onClick={() => scrollToMobileSection("ai-m")}
                className="w-full text-sm font-bold text-[#FFD000] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#FFD000]" />
                  {isAr ? "المستشار الذكي المساعد (AI)" : "Smart AI Strategic Advisor"}
                </span>
                <Check className="w-4 h-4 text-[#FFD000]" />
              </button>
              <button 
                onClick={() => scrollToMobileSection("portfolio-m")}
                className="w-full text-sm font-bold text-[#A39E8C] py-2 border-b border-white/5 active:text-[#FFD000]"
              >
                {isAr ? "شركاء النجاح" : "Partners of Success"}
              </button>
              <button 
                onClick={() => scrollToMobileSection("contact-m")}
                className="w-full bg-[#FFD000] text-[#080809] font-bold py-3 mt-2 rounded-xl text-center text-sm active:scale-98 transition-transform flex items-center justify-center gap-2"
              >
                <span>{isAr ? "تواصل لتأصيل منشأتك" : "Contact to Anchor Your Brand"}</span>
                <span className="w-2 h-2 rounded-full bg-[#C85A17] animate-ping" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Touch Viewport Stack */}
      <main className="pt-28 px-4 sm:px-6 space-y-20">
        
        {/* -- SECTION A: Pure Custom Landing Hero -- */}
        <motion.section 
          id="hero-m" 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`py-12 flex flex-col justify-center relative overflow-hidden ${isAr ? 'text-right' : 'text-left'}`}
        >
          {/* Visual glow nodes optimized to occupy less system render threads (smooth on older phone processors) */}
          <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-[#C85A17]/10 blur-[90px] pointer-events-none select-none" />
          <div className="absolute bottom-[10%] left-[5%] w-60 h-60 rounded-full bg-[#FFD000]/5 blur-[100px] pointer-events-none select-none" />

          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C85A17]/10 border border-[#C85A17]/25 text-[#FFD000] text-[10px] font-bold uppercase tracking-wide">
              <Sparkles className="w-3 h-3 fill-[#FFD000]" />
              <span>{isAr ? "دُسُر المتحدة للهوية الرقمية والتحول" : "Dussur United for Digital Identity & Transformation"}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-black text-[#FFF6CD] leading-none">
                <span className="text-[#C85A17] block mb-1">{isAr ? "دُسُر.." : "Dussur.."}</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFF6CD]">
                {isAr ? (
                  <>حيث نجمع شتات <span className="text-[#FFD000] border-b-2 border-[#C85A17]/50">الرؤى</span></>
                ) : (
                  <>Where we gather scattered <span className="text-[#FFD000] border-b-2 border-[#C85A17]/50">visions</span></>
                )}
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFF6CD]">
                {isAr ? (
                  <>نهندس منها تجارب <span className="text-[#FFD000]">لا تُنسى</span></>
                ) : (
                  <>And engineer unforgettable <span className="text-[#FFD000]">experiences</span></>
                )}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#A39E8C] leading-relaxed text-justify">
              {isAr 
                ? "في دُسُر المتحدة، لا نتوقف عند صياغة تصاميم عابرة؛ نحن نربط ونثبّت حضور علامتكم التجارية بركائز استشارية حديثة مصبوبة بقوالب ذكاء تفاعلي وحلول أتمتة دقيقة، كدسر مشدودة تحمي كيانكم المؤسسي وتنمو به بوقار وثبات مستمر."
                : "At Dussur United, we do not settle for transient designs; we anchor and reinforce your brand's presence with modern advisory pillars molded in interactive intelligence and precise automation, like tight bolts that shield your organization and nurture its perpetual growth."}
            </p>

            <div className="flex flex-col gap-3.5 pt-4">
              <button 
                onClick={() => scrollToMobileSection("ai-m")}
                className="w-full py-4 px-4 rounded-xl bg-[#FFD000] text-[#080809] font-extrabold text-xs shadow-lg shadow-yellow-500/10 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>{isAr ? "جرّب مستشار الهوية والابتكار (AI)" : "Try Brand & Innovation Advisor (AI)"}</span>
              </button>
              <button 
                onClick={() => scrollToMobileSection("services-m")}
                className="w-full py-4 px-4 rounded-xl border border-[#FFF6CD]/10 text-[#FFF6CD] font-bold text-xs bg-white/5 active:scale-[0.97] transition-all"
              >
                {isAr ? "تفقد ركائزنا الإستراتيجية المتكاملة" : "Explore Our Strategic Pillars"}
              </button>
            </div>
          </div>
        </motion.section>

        <GoldDustSeparator />

        {/* -- SECTION B: Quranic Philosophy & Counters -- */}
        <motion.section 
          id="about-m" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`py-4 space-y-8 ${isAr ? 'text-right' : 'text-left'}`}
        >
          <div className="space-y-4">
            <span className="text-[10px] tracking-widest font-black text-[#FFD000]/90 uppercase block">
              {isAr ? "عقيدة دُسُر الاستراتيجية" : "Dussur's Strategic Philosophy"}
            </span>
            
            <h2 className="text-xl sm:text-2xl font-black text-[#FFD000] leading-snug">
              {isAr ? "«وَحَمَلْنَاهُ عَلَىٰ ذَاتِ أَلْوَاحٍ وَدُسُرٍ»" : "«And We carried him on a vessel of planks and nails (Dussur)»"}
            </h2>

            <p className="text-xs sm:text-sm text-[#FFF6CD]/95 leading-relaxed text-justify">
              {isAr 
                ? "وش سالفة دُسُر؟ في قواميس لغتنا الشريفة، الدُسُر هي الروافد والروابط العريضة والحبال المتينة التي تشدّ أطراف السفينة العظمى لترسي في عاتي الموج ومواجهة البحار المظلمة دون أن تميل أو تنفرط ألواحها."
                : "What is Dussur? In our noble Arabic dictionaries, 'Dussur' represents the wide reinforcements, strong anchors, and sturdy ropes that secure the ship's frames to keep it steady amidst high waves and dark seas without tilting or breaking apart."}
            </p>

            <p className="text-xs sm:text-sm text-[#A39E8C] leading-relaxed text-justify">
              {isAr 
                ? "ومن هذا المعنى القرآني السامي استلهمنا فلسفتنا الاستراتيجية والتصميمية: نحن لا نلقي لعملائنا بحملات دعائية عابرة تتلاقفها رياح الإنترنت، بل نشدّ علاماتهم ونربط حضورهم المؤسسي بركائز دقيقة ودُسُر استشارية رصينة تدوم وتثبت في الأذهان على مدار السنين."
                : "Inspired by this lofty Quranic meaning, we formed our strategic and design philosophy: we do not cast fleeting advertising campaigns to be swayed by internet winds; rather, we fasten your brand identity with rigorous consulting and robust anchors ('Dussur') that endure over the years."}
            </p>
          </div>

          {/* Core Values grid */}
          <div className="grid grid-cols-1 gap-3.5 pt-2">
            <div className="flex gap-3 bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5">
              <ShieldCheck className="w-6 h-6 text-[#FFD000] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#FFF6CD]">
                  {isAr ? "ثبات لا يلين وعزيمة مستقرة" : "Unyielding Definiteness & Composed Resolve"}
                </h4>
                <p className="text-[11px] text-[#A39E8C] mt-1 leading-relaxed">
                  {isAr 
                    ? "تأصيل الهوية واستراتيجيات متينة تصمد طويلاً في المنافسات التنافسية."
                    : "Constructing authentic identity and robust strategies that endure under heavy industrial competition."}
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5">
              <Landmark className="w-6 h-6 text-[#C85A17] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#FFF6CD]">
                  {isAr ? "أصالة وجاذبية وطنية ملموسة" : "Tactile Authenticity & National Essence"}
                </h4>
                <p className="text-[11px] text-[#A39E8C] mt-1 leading-relaxed">
                  {isAr 
                    ? "صياغة محتوى وهوية بصرية فخمة تنبع من عراقتنا وهويتنا السعودية الأصيلة."
                    : "Crafting copy and premium designs rooted in our rich Saudi heritage and national identity."}
                </p>
              </div>
            </div>
          </div>

          {/* Exp Circle Block with Dynamic Trigger */}
          <div ref={counterRef} className="p-6 rounded-xl bg-gradient-to-br from-[#0F1012] to-[#080809] border border-[#FFF6CD]/5 text-center relative overflow-hidden">
            <div className="absolute w-44 h-44 rounded-full border border-[#C85A17]/5 -bottom-10 -right-10 overflow-hidden" />
            
            <History className="w-7 h-7 text-[#C85A17] mx-auto mb-2" />
            <span className="text-5xl font-black text-[#FFD000] tracking-tight">{yearsCount}+</span>
            <span className="text-sm font-bold text-[#FFF6CD] block mt-1.5">
              {isAr ? "عاماً من الريادة الاستشارية والتحول" : "Years of Advisory & Transformation Leadership"}
            </span>
            <div className="w-10 h-0.5 bg-[#C85A17] mx-auto my-3 rounded" />
            <p className="text-[11px] text-[#A39E8C] leading-relaxed max-w-xs mx-auto">
              {isAr 
                ? "ربع قرن من الريادة والتمكين، شددنا خلالها ركائز كيانات حكومية كبرى وشركات عملاقة، وابتكرنا مخرجات ونظماً استراتيجية تتوارثها الأذهان."
                : "A quarter-century of empowerment, securing the foundations of major state organizations and national enterprises, crafting legendary legacies."}
            </p>
          </div>
        </motion.section>

        <GoldDustSeparator />

        {/* -- SECTION C: Mobile-First Services Accordion (حل ركائز دسر للأجهزة الذكية) -- */}
        <motion.section 
          id="services-m" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`py-4 space-y-6 ${isAr ? 'text-right' : 'text-left'}`}
        >
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#FFD000]">
              {isAr ? "خدمات دُسُر المتكاملة" : "Dussur Integrated Services"}
            </h2>
            <span className="text-[11px] text-[#A39E8C] font-semibold block leading-relaxed">
              {isAr 
                ? "ركائز استشارية مجهزة لمختلف أحجام الكيانات، اختر الفئة للتصفح اللمسي:"
                : "Strategic pillars configured for all organization scales, touch an option to inspect detail:"}
            </span>
          </div>

          {/* Highly stylized dual category pills */}
          <div className="flex bg-[#0F1012] p-1 rounded-xl border border-[#FFF6CD]/10 w-full mb-4">
            <button
              onClick={() => {
                setActiveCategory('digital');
                setExpandedServiceId(0);
              }}
              className={`flex-1 py-3 rounded-lg text-[11px] font-bold transition-all ${
                activeCategory === 'digital'
                  ? 'bg-[#C85A17] text-[#FFF6CD] shadow-sm' 
                  : 'text-[#A39E8C] hover:text-[#FFF6CD]'
              }`}
            >
              {isAr ? "الركائز الرقمية المتكاملة" : "Digital Strategy Pillars"}
            </button>
            <button
              onClick={() => {
                setActiveCategory('production');
                setExpandedServiceId(7);
              }}
              className={`flex-1 py-3 rounded-lg text-[11px] font-bold transition-all ${
                activeCategory === 'production'
                  ? 'bg-[#C85A17] text-[#FFF6CD] shadow-sm' 
                  : 'text-[#A39E8C] hover:text-[#FFF6CD]'
              }`}
            >
              {isAr ? "نظم الإشهار والإنتاج التقليدي" : "Production & Prints Systems"}
            </button>
          </div>

          {/* Services Stack List */}
          <div className="space-y-3">
            {filteredServices.map((service) => {
              const isExpanded = expandedServiceId === service.id;
              const IconComp = service.icon;

              return (
                <div 
                  key={service.id}
                  className="rounded-xl bg-[#090A0F] border border-[#FFF6CD]/5 p-4 space-y-3 overflow-hidden shadow-md"
                >
                  <div 
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C85A17]/10 flex items-center justify-center text-[#FFD000]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-[#FFF6CD] select-none text-right">
                        {service.title}
                      </h4>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#A39E8C] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#FFD000]' : ''}`} />
                  </div>

                  <p className="text-[11px] text-[#A39E8C] leading-relaxed">
                    {service.description}
                  </p>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden space-y-4 pt-3 border-t border-[#FFF6CD]/5"
                      >
                        {/* 1. Deep Philosophy Context */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FFD000] font-bold block">
                            {isAr ? "فلسفة دُسُر للتأصيل (Philosophy):" : "Sovereign Philosophy:"}
                          </span>
                          <p className="text-xs text-[#FFF6CD]/95 leading-relaxed text-justify">
                            {service.detailedDesc}
                          </p>
                        </div>

                        {/* 2. List of Deliverables with custom bullets */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-[#C85A17] font-bold block">
                            {isAr ? "المخرجات والحلول (Deliverables):" : "Sovereign Deliverables:"}
                          </span>
                          <ul className="space-y-1 text-xs text-[#A39E8C]">
                            {service.deliverables.map((item, index) => (
                              <li key={index} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#FFD000] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. Expected Value Section */}
                        <div className="rounded-lg bg-white/5 p-3 space-y-1.5">
                          <span className="text-[9.5px] text-[#FFD000] font-black uppercase tracking-wider block">
                            {isAr ? "عائد الأثر والأعمال (Business Value):" : "Business Impact & Value:"}
                          </span>
                          <p className="text-[11px] text-[#A39E8C] leading-relaxed">
                            {service.businessValue}
                          </p>
                        </div>

                        {/* 4. Branding copy */}
                        <div className="border-r-2 border-[#C85A17] pr-2.5 py-1">
                          <p className="text-[10.5px] text-[#FFF6CD]/80 italic font-medium leading-relaxed">
                            {service.websiteCopy}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        <GoldDustSeparator />

        {/* -- SECTION D: Project Builder configuration Wrapper -- */}
        <motion.section 
          id="builder-m" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="py-2 text-right"
        >
          <div className="space-y-1 text-center mb-6">
            <span className="text-[9px] tracking-widest font-black text-[#C85A17] uppercase block">
              {isAr ? "أداة حوسبة وتقدير فوري للأعمال" : "Prestige Instant Cost Computing Rule"}
            </span>
            <h3 className="text-lg font-black text-[#FFF6CD]">
              {isAr ? "أداة هندسة النطاقات وصياغة المخرجات" : "Interactive Scope Engineering & Timeline Planner"}
            </h3>
            <p className="text-[10px] text-[#A39E8C] leading-relaxed max-w-sm mx-auto">
              {isAr 
                ? "تحكم بتوليف متمتع ومطابق لمتطلبات منشأتك لتحديد الأولويات الاستراتيجية والجدولة الزمنية الافتراضية بموثوقية."
                : "Control your corporate parameters to configure timeline guides and strategic priorities."}
            </p>
          </div>
          <div className="bg-[#0F1012]/30 border border-[#FFF6CD]/5 rounded-xl p-2 md:p-4">
            <ProjectBuilder />
          </div>
        </motion.section>

        <GoldDustSeparator />

        {/* -- SECTION E: Copilot AI Consultant Portal Wrapper -- */}
        <motion.section 
          id="ai-m" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="py-2 text-right scroll-mt-20"
        >
          <div className="space-y-1 text-center mb-6">
            <span className="text-[9px] tracking-widest font-black text-[#FFD000] uppercase block">
              {isAr ? "الذكاء الاستراتيجي من دُسُر" : "Sovereign Intelligence from Dussur"}
            </span>
            <h3 className="text-lg font-black text-[#FFF6CD]">
              {isAr ? "المستشار الإستراتيجي المساعد (AI)" : "Smart AI Strategic Advisor"}
            </h3>
            <p className="text-[10px] text-[#A39E8C] leading-relaxed max-w-sm mx-auto">
              {isAr 
                ? "عقل اصطناعي مبرمج بهوية وفلسفة دُسُر؛ صاغ لخدمة علامتكم بموجهات فورية ونماذج إطلاق استثنائية وبديهية."
                : "Bespoke AI brain aligned to Dussur's philosophy, built to provide immediate launch directives."}
            </p>
          </div>
          <div className="bg-[#0F1012]/30 border border-[#FFF6CD]/5 rounded-xl p-2 md:p-4">
            <AIConsultant />
          </div>
        </motion.section>

        <GoldDustSeparator />

        {/* -- SECTION F: Nation-tier portfolio showcase Wrapper -- */}
        <motion.section 
          id="portfolio-m" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="py-2 text-right"
        >
          <PortfolioView />
        </motion.section>

        <GoldDustSeparator />

        {/* -- SECTION G: Contact Form section Wrapper -- */}
        <motion.section 
          id="contact-m" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="py-2 text-right"
        >
          <ContactView />
        </motion.section>

        <GoldDustSeparator />

        {/* Unified Luxury Footer for mobile */}
        <div className="pb-24">
          <Footer />
        </div>

      </main>

      {/* 4. Cinematic Glassmorphic Sticky Bottom Navigation bar */}
      <nav className="fixed bottom-4 inset-x-4 bg-[#090a0f]/85 backdrop-blur-2xl rounded-full border border-white/10 p-1.5 z-50 flex items-center justify-between select-none shadow-2xl">
        <button 
          onClick={() => scrollToMobileSection("hero-m")}
          className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
            activeSection === 'hero-m' ? 'text-[#FFD000]' : 'text-[#A39E8C]'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span className="text-[8px] font-black">{isAr ? "الرئيسية" : "Home"}</span>
        </button>

        <button 
          onClick={() => scrollToMobileSection("about-m")}
          className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
            activeSection === 'about-m' ? 'text-[#FFD000]' : 'text-[#A39E8C]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[8px] font-black">{isAr ? "عقيدتنا" : "Belief"}</span>
        </button>

        <button 
          onClick={() => scrollToMobileSection("services-m")}
          className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
            activeSection === 'services-m' ? 'text-[#FFD000]' : 'text-[#A39E8C]'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="text-[8px] font-black">{isAr ? "خدماتنا" : "Pillars"}</span>
        </button>

        <button 
          onClick={() => scrollToMobileSection("builder-m")}
          className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
            activeSection === 'builder-m' ? 'text-[#FFD000]' : 'text-[#A39E8C]'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span className="text-[8px] font-black">{isAr ? "النطاق" : "Scope"}</span>
        </button>

        <button 
          onClick={() => scrollToMobileSection("ai-m")}
          className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
            activeSection === 'ai-m' ? 'text-[#FFD000]' : 'text-[#A39E8C]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#FFD000]" />
          <span className="text-[8px] font-bold">{isAr ? "دسر AI" : "Dussur AI"}</span>
        </button>

        <button 
          onClick={() => scrollToMobileSection("contact-m")}
          className={`flex-1 py-1 px-1 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
            activeSection === 'contact-m' ? 'text-[#FFD000]' : 'text-[#A39E8C]'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span className="text-[8px] font-black">{isAr ? "تواصل" : "Contact"}</span>
        </button>
      </nav>

      {/* 5. Custom Mobile Bottom Float Widgets */}
      <div className={`fixed bottom-20 z-40 flex flex-col gap-2 ${isAr ? 'left-4' : 'right-4'}`}>
        <a 
          href="https://wa.me/966548971306" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-11 h-11 bg-[#25D366] text-[#FFF6CD] rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
          title={isAr ? "تواصل مباشرة عبر واتساب" : "Connect directly via WhatsApp"}
        >
          <MessageSquare className="w-5 h-5 fill-current text-white" />
        </a>
      </div>
    </div>
  );
}
