/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Palette, Layers, Code, Bot, TrendingUp, 
  Video, Check, ArrowLeftRight, Sparkles, Megaphone,
  Printer, Award, Share2, Goal, ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ServiceItem {
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

export default function ServicesView() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'digital' | 'production'>('digital');
  const [activeServiceId, setActiveServiceId] = useState(0);

  const rawServices: ServiceItem[] = [
    // Category 1: Digital & Transformation
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
      title: "الذكاء الاصطناعي والأتمتة واستوديو الابتكار",
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
      englishTitle: "Growth Marketing, SEO & Strategy Analytics",
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
      englishTitle: "Cinematic Corporate Media & Storytelling",
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

    // Category 2: Traditional & Execution
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
        "إدارة ونشر دوري وجدولة ذكية للحسابات والتفاعلات اليومية",
        "تقارير دورية لقياس كفاءة تنامي الحسابات وتحليل الاندماج"
      ],
      gradient: "from-[#FFD000]/20 to-[#FFD000]/10",
      businessValue: "العناية بالحضور الرقمي تحمي سمعة الجهة، وتحافظ على التواصل التفاعلي المباشر مع المجتمع وتحقق أهداف التوعية وبناء الثقة التاريخية.",
      websiteCopy: "منصاتكم هي واجهتكم المفتوحة للعالم الرقمي، ووجودنا فيها ضمان لترجمة نبل مسيرتكم وصوتكم الهادئ في كل حرف وتغريدة."
    },
    {
      id: 11,
      category: "production",
      icon: Award,
      title: "العلاقات العامة وتنظيم الفعاليات",
      englishTitle: "Strategic PR & Elite Events",
      description: "هندسة المحافل والمؤتمرات الكبرى وصناعة حضور إعلامي دولي مهيب يليق بكم.",
      detailedDesc: "نعدّ وننظم المؤتمرات والملتقيات السنوية والافتتاحية لعلاماتكم لتستقبل ضيوفها بكامل بريق الفخامة والأصالة السعودي، بجانب الإشراف على صياغة الملفات الإعلامية والبيانات الصحفية الشاملة.",
      deliverables: [
        "تصميم هندسي وديكوري للفعاليات والمؤتمرات والملتقيات الكبرى",
        "تنظيم وفود الاستقبال والمراسم النخبوية والخدمات البروتوكولية",
        "كتابة وصياغة البيانات الصحفية والملفات الترويجية للإطلاق",
        "تصميم وتوزيع الهدايا التذكارية الفاخرة المخصصة للكيان"
      ],
      gradient: "from-[#C85A17]/20 to-[#FFD000]/5",
      businessValue: "توثيق العلاقات رفيعة المستوى وتكثيف التغطيات الإعلامية المرموقة بما يضاعف القيمة الريادية للجهة أمام صناع القرار وممثلي القطاع العام.",
      websiteCopy: "الفخامة تبدأ من اللحظة الأولى للترحاب وتكتمل بالانطباع الراسخ الذي يترصع بالذكريات الدائمة بعد انقضاء اللقاء."
    },
    {
      id: 12,
      category: "production",
      icon: Megaphone,
      title: "التسويق الرقمي والأداء العالي",
      englishTitle: "Performance Marketing",
      description: "توجيه الإنفاق في حملات إشهارية دقيقة بمؤشرات عائد استثماري واضحة وقابلة للقياس.",
      detailedDesc: "نوجه استثماركم وحملاتكم الإعلانية عبر المنصات الرقمية بدقة متناهية، مستندين على قراءة تحركات السوق وتحليلات المنصات السلوكية لترسيم أفضل الكفاءات ونقاط الوصول.",
      deliverables: [
        "حملات إعلانية ممولة دقيقة وموجهة عبر محركات البحث وشبكات النشر",
        "تهيئة الظهور الاستراتيجي وتحسين الظهور بمحركات البحث SEO",
        "برمجة صفحات الهبوط الذكية عالية الجاذبية ونسب التحويل المستهدفة",
        "بناء منصات التحليل وتتبع سلوك الجمهور والوصول الفني المرغوب"
      ],
      gradient: "from-[#FFD000]/20 to-[#C85A17]/5",
      businessValue: "تحقيق أعلى عوائد ممكنة لكل ريال إعلاني مدفوع مع خفض ملحوظ في تكلفة العميل الجديد والمهتمين بالخدمات الرسمية للكيان.",
      websiteCopy: "لا نؤمن بالإنفاق العشوائي ولا الأرقام المظللة؛ فكل حملة إشهار نصيغها تنطلق بغاية رقمية نصل إليها بيقين الدراسات والحسابات."
    },
    {
      id: 13,
      category: "production",
      icon: Printer,
      title: "المطبوعات الفاخرة واللوحات الخارجية",
      englishTitle: "High-End Prints & OOH Media",
      description: "تجسيد أثر علامتكم المادي بجودة ملموسة مذهبة من كتيبات وتقارير سنوية فخمة.",
      detailedDesc: "الأثر الملموس هو دليل وقار علامتكم وجسور ثقتها المادية. نصمم ونشرف على طباعة دفاتركم وصياغة تقاريركم السنوية، وهداياكم المعبرة وحقائب المشتريات والقرطاسية المذهبة واللوحات الراقية.",
      deliverables: [
        "طباعة الكتب الفاخرة والتقرير السنوي والمجلات بتغليف ملكي فخم",
        "انتاج وتطبيق اللوحات والواجهات الخارجية الشامخة لمقرات العمل",
        "علب التغليف والهدايا التذكارية المذهّبة وعناصر الهوية المادية",
        "تجهيز وصياغة أصول وقوالب الطباعة بدقة الرموز والحبار الفاخرة"
      ],
      gradient: "from-[#C85A17]/10 to-[#FFF6CD]/5",
      businessValue: "ترجمة هوية الكيان في عالم مادي ملموس يعطي ثقلاً وهيبة فريدة ملموسة في أيدي الشركاء، لتثبت في الذاكرة الجمعية لعقود طويلة رصينة.",
      websiteCopy: "لمسة الورق الفخم وحبر الذهب المنقوش ليست تفاصيل عبثية؛ إنها رسائل صامتة بالغة الهيبة والامتياز ينطق بها ملمس هداياكم التذكارية."
    }
  ];

  const getTranslatedService = (item: ServiceItem): ServiceItem => {
    if (lang === 'ar') return item;
    const enDetails: Record<number, Partial<ServiceItem>> = {
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
      },
      11: {
        title: "Strategic PR & Elite Events",
        description: "Engineering massive summits and organizing memorable press experiences.",
        detailedDesc: "We coordinate and direct central inaugurations and annual summits with premium designs, protocol arrangement, and professional media kits for the global press.",
        deliverables: [
          "Interior Layout & Concept Architecture for High-End Galas",
          "Dignitary Protocol Organization & VIP Meet Operations",
          "Corporate Press Release Writing, Media Kits & Press Briefings",
          "Bespoke Ultra-Luxury Gifting & Crafted Souvenirs Design"
        ],
        businessValue: "Consolidates deep relationships with VIP sectors, and triggers massive media write-ups, boosting partner trust index scores.",
        websiteCopy: "Prestige starts at the welcome gate and lives long after the farewell with beautifully designed premium souvenirs."
      },
      12: {
        title: "Performance Marketing",
        description: "Optimizing digital spend with visible and calculated ROI benchmarks.",
        detailedDesc: "We drive your advertising budgets across major modern channels, using high-end optimization software to capture organic interests and boost web conversions.",
        deliverables: [
          "Targeted Digital Ads across Premium Networks & Engines",
          "Sovereign Campaign Outlines & Dynamic Web Flow Optimizations",
          "Highly Optimized Custom Landing Pages Built for Conversions",
          "Advanced User Tracking Modules & ROI Dashboards"
        ],
        businessValue: "Optimizes advertising spend, leading to a visible drop in customer acquisition costs while targeting premier sectors.",
        websiteCopy: "We bypass marketing fluff. Every campaign we launch is backed by solid research to achieve measurable results."
      },
      13: {
        title: "High-End Prints & OOH Media",
        description: "Translating your identity into royal physical materials and exterior landmarks.",
        detailedDesc: "Tactile print is the absolute proof of organizational stature. We supervise the manufacturing of gilded books, corporate annual statements, embossed stationery, and exterior signs.",
        deliverables: [
          "Gold-Leaf Book Binding, Royalty Corporate Reports & Annual Books",
          "Durable Architectural Landmarks & Exterior Building Signages",
          "Embossed Stationery, Gilded Corporate Boxes & Packaging Sets",
          "High-Precision Printing Quality Control Operations"
        ],
        businessValue: "Exports your brand into the tactile physical world, building an imposing authority and elegance that lasts for decades.",
        websiteCopy: "An embossed texture and gilded engraving are not tiny details; they are silent messengers of absolute leadership."
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

  // Helper to handle switching categories and resetting active item safe
  const selectCategory = (cat: 'digital' | 'production') => {
    setActiveCategory(cat);
    // Find first item of that category
    const firstItem = services.find(s => s.category === cat);
    if (firstItem) {
      setActiveServiceId(firstItem.id);
    }
  };

  const filteredServices = services.filter(s => s.category === activeCategory);
  const activeService = services.find(s => s.id === activeServiceId) || services[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services-sec" className="py-24 relative overflow-hidden px-6 max-w-6xl mx-auto">
      <div className="ltr:text-left rtl:text-right mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#FFF6CD]/5">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-[#FFD000]">{t('services.section_title')}</h2>
          <span className="text-xs uppercase tracking-widest text-[#A39E8C] font-semibold mt-2 block">{t('services.section_tag')}</span>
        </div>

        {/* Categories Tab Selector with Premium Sliding Pill Styling */}
        <div className="flex bg-[#0F1012] p-1.5 rounded-full border border-[#FFF6CD]/10 self-start md:self-end">
          <button
            onClick={() => selectCategory('digital')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all relative ${
              activeCategory === 'digital'
                ? 'bg-[#C85A17] text-[#FFF6CD] shadow-md shadow-amber-950/20' 
                : 'text-[#A39E8C] hover:text-[#FFF6CD]'
            }`}
          >
            {t('services.cat_digital')}
          </button>
          <button
            onClick={() => selectCategory('production')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all relative ${
              activeCategory === 'production'
                ? 'bg-[#C85A17] text-[#FFF6CD] shadow-md shadow-amber-950/20' 
                : 'text-[#A39E8C] hover:text-[#FFF6CD]'
            }`}
          >
            {t('services.cat_production')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Bento Grid List (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = activeServiceId === service.id;
            
            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-4 rounded-xl border cursor-pointer select-none ltr:text-left rtl:text-right flex items-center justify-between gap-4 transition-all luxury-breath-flat ${
                  isActive 
                    ? 'bg-[#121316] border-[#C85A17]/40 ring-1 ring-[#C85A17]/10 shadow-lg shadow-black/40' 
                    : 'bg-[#0F1012]/40 border-[#FFF6CD]/5 hover:border-[#FFF6CD]/15'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Glowing Icon Wrapper */}
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-[#C85A17] text-[#FFF6CD]' 
                      : 'bg-[#080809] text-[#A39E8C]'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h4 className={`text-sm md:text-base font-bold transition-all ${
                      isActive ? 'text-[#FFD000]' : 'text-[#FFF6CD]'
                    }`}>
                      {service.title}
                    </h4>
                    <span className="text-[10px] text-[#A39E8C] font-mono uppercase tracking-wider">{service.englishTitle}</span>
                  </div>
                </div>

                <div className="text-[#C85A17] text-xs font-bold font-mono px-2">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Viewer (7 columns) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0F1012]/40 border border-[#FFF6CD]/5 backdrop-blur-xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[480px]">
          {/* Faint dynamic gradient behind */}
          <div className={`absolute -inset-10 bg-gradient-to-tr ${activeService.gradient} blur-3xl opacity-30 select-none pointer-events-none transition-all duration-700`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 relative z-10"
            >
              {/* Pillar Header */}
              <div className="flex justify-between items-start pb-4 border-b border-[#FFF6CD]/5">
                <div className="rtl:text-right ltr:text-left">
                  <span className="text-[10px] font-bold text-[#C85A17] uppercase tracking-wider">
                    {lang === 'ar' 
                      ? `${activeCategory === 'digital' ? 'ركيزة الابتكار الرقمي' : 'ركيزة التنفيذ والهوية'} رقم ${(filteredServices.findIndex(s => s.id === activeServiceId) + 1).toString().padStart(2, '0')}`
                      : `${activeCategory === 'digital' ? 'Digital Innovation Pillar' : 'Branding & Execution Pillar'} No. ${(filteredServices.findIndex(s => s.id === activeServiceId) + 1).toString().padStart(2, '0')}`
                    }
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#FFD000]">{activeService.title}</h3>
                  <p className="text-[11px] font-mono text-[#A39E8C]/80 uppercase tracking-widest font-semibold">{activeService.englishTitle}</p>
                </div>
                <ActiveIcon className="w-10 h-10 text-[#C85A17] stroke-[1.5]" />
              </div>

              {/* Explanatory text */}
              <div className="space-y-3">
                <p className="text-sm text-[#FFF6CD]/95 leading-relaxed text-justify">
                  {activeService.detailedDesc}
                </p>
              </div>

              {/* Scope option loop */}
              <div className="space-y-3.5 pt-4">
                <span className="text-xs text-[#FFD000] font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'روافد ومخرجات الركيزة المضمونة:' : 'Guaranteed Pillar Deliverables & Outflow:'}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#080809]/60 px-3.5 py-2.5 rounded border border-[#FFF6CD]/5 text-xs text-[#FFF6CD]">
                      <div className="w-4 h-4 rounded-full bg-[#C85A17]/10 flex items-center justify-center text-[#FFD000] shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-medium rtl:text-right ltr:text-left leading-relaxed">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Insights (Business Value & Web Copy) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 border-t border-[#FFF6CD]/5">
                <div className="space-y-1.5 p-4 rounded-xl bg-[#C85A17]/5 border border-[#C85A17]/10 rtl:text-right ltr:text-left">
                  <span className="text-[11px] text-[#C85A17] font-black uppercase tracking-wider block">
                    {lang === 'ar' ? 'العائد الاستثماري (Business Value):' : 'ROI & Business Value:'}
                  </span>
                  <p className="text-xs text-[#FFF6CD]/80 leading-relaxed">{activeService.businessValue}</p>
                </div>
                <div className="space-y-1.5 p-4 rounded-xl bg-[#FFD000]/5 border border-[#FFD000]/10 rtl:text-right ltr:text-left">
                  <span className="text-[11px] text-[#FFD000] font-black uppercase tracking-wider block">
                    {lang === 'ar' ? 'من ميثاق المنصة (Website Copy):' : 'Brand Covenant (Website Copy):'}
                  </span>
                  <p className="text-xs italic text-[#FFF6CD]/80 leading-relaxed">
                    {lang === 'ar' ? `« ${activeService.websiteCopy} »` : `"${activeService.websiteCopy}"`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action guidance */}
          <div className="pt-6 mt-8 border-t border-[#FFF6CD]/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:rtl:text-right sm:ltr:text-left relative z-10">
            <span className="text-xs text-[#A39E8C]">
              {lang === 'ar' 
                ? 'هل تود استكشاف نطاق السعر والزمن المجمع لهذه الركائز؟' 
                : 'Would you like to explore the bundled price and timeframe for these pillars?'}
            </span>
            <a 
              href="#builder-container"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD000] hover:text-[#C85A17] transition-colors font-sans"
            >
              {lang === 'ar' ? 'افتح أداة هندسة النطاقات' : 'Open Scope Estimator Tool'}
              <ArrowLeftRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
