/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, ChevronRight, Sparkles, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface PartnerProject {
  company: string;
  role: string;
  scope: string;
  deliverable: string;
  stat: string;
  metaRole: string;
}

export default function PortfolioView() {
  const { lang } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isAr = lang === 'ar';

  const projects: PartnerProject[] = [
    {
      company: isAr ? "stc | الشركة السعودية للاتصالات" : "stc | Saudi Telecom Company",
      role: isAr ? "المطبوعات الإعلامية الفاخرة" : "Luxury Media & Corporate Publications",
      scope: isAr 
        ? "صياغة وإخراج المجلات التعريفية والكتيبات المؤسسية الدورية الفاخرة للشركة." 
        : "Drafting and designing periodically published fine corporate brochures and profiles.",
      deliverable: isAr
        ? "هندسة وإخراج التقارير الربعية وصحيفة اتصالات سدير والخطوط البصرية الداخلية للشركة."
        : "Orchestrating quarterly reports, Sudair Telecom Gazette, and unified corporate visual assets.",
      stat: isAr ? "أكثر من 24 إصدار فخم" : "24+ Premium Series Issues",
      metaRole: "Mags & Publications"
    },
    {
      company: isAr ? "SIDF | صندوق التنمية الصناعية السعودي" : "SIDF | Saudi Industrial Development Fund",
      role: isAr ? "التقارير السنوية الشاملة" : "Comprehensive Annual Reporting",
      scope: isAr
        ? "إعادة بناء وتوجيه محاور التميز والتقارير المالية السنوية الفاخرة المطبوعة والرقمية."
        : "Reconstructing financial alignment pathways and corporate annual reports in print and digital.",
      deliverable: isAr
        ? "إعادة تطوير وبناء محاور العرض ومخططات الإنتاج لتقارير الإنجاز المالي والائتماني للصندوق."
        : "Re-developing presentation themes and production guidelines for credit accomplishment briefs.",
      stat: isAr ? "4 سنوات متتالية" : "4 consecutive terms",
      metaRole: "Annual Corporate Reporting"
    },
    {
      company: isAr ? "GACA | الهيئة العامة للطيران المدني" : "GACA | General Authority of Civil Aviation",
      role: isAr ? "إدارة البيانات والأثر البصري" : "Data Management & Visual Impact",
      scope: isAr
        ? "سرد وتأطير الهوية المؤسسية وحملات التعريف الرقمي الاستراتيجي وتصميم البيانات."
        : "Adapting corporate branding systems, visual communication frameworks, and strategic campaigns.",
      deliverable: isAr
        ? "إخراج وتنسيق كتب الريادة الجوية وتصميم تقارير الانطلاق الرقمية الاستراتيجية المتكاملة."
        : "Structuring civil aviation directories and designing state-of-the-art launch publications.",
      stat: isAr ? "تغطية وعمل وطني ريادي" : "National-tier coverage",
      metaRole: "Interactive Launch Strategies & PR"
    },
    {
      company: isAr ? "وزارة الثقافة والإعلام" : "Ministry of Culture and Information",
      role: isAr ? "الإصدارات الوثائقية الرسمية" : "Official Publications & State Portfolios",
      scope: isAr
        ? "إعداد وتصميم الكتب الوثائقية والكتيبات الرسمية الممثلة لنهضة وفخر المملكة الإبداعي."
        : "Designing historical books and official publications that reflect the Kingdom's legacy and pride.",
      deliverable: isAr
        ? "تصميم وطباعة فاخرة ومراجعة الترابطات اللغوية للكتب والكتيبات الممثلة للمملكة في المسارح الخارجية."
        : "Premium design, exquisite printing, and editing of official books representing the Kingdom globally.",
      stat: isAr ? "محافل تمثيلية رسمية" : "State representation",
      metaRole: "Official Publications"
    }
  ];

  return (
    <section id="portfolio-sec" className="py-24 relative overflow-hidden px-6 max-w-6xl mx-auto">
      {/* Visual background anchor */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#C85A17]/5 blur-[120px] select-none pointer-events-none" />

      <div className={`mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 ${isAr ? 'text-right' : 'text-left'}`}>
        <div>
          <span className="text-xs font-bold text-[#C85A17] uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C85A17]" />
            {isAr ? "شواهد تميز دسر المتحدة" : "Testimonies of Dussur United"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#FFD000] mt-2">
            {isAr ? "كيانات وطنية عظيمة وثقت بركائزنا:" : "Great National Entities Supporting Our Journey:"}
          </h2>
          <p className="text-sm text-[#A39E8C] mt-2">
            {isAr 
              ? "نهندس الأثر، ونثبت محاور الإشهار البصري لكبرى الكيانات الحكومية والشركات العملاقة في المملكة."
              : "We engineer impact and anchor visual communication guidelines for the Kingdom's largest public entities and industry giants."}
          </p>
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {projects.map((project, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div 
              key={idx}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              className="premium-card-border rounded-2xl p-6 md:p-8 flex flex-col justify-between cursor-pointer select-none relative group overflow-hidden shadow-xl"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Subtle luxury glow effect on hover */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#C85A17]/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-4 relative z-10 w-full">
                {/* Partner Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#FFF6CD]/5 w-full">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#FFD000] pulsing-glow" />
                    <h4 className="text-base md:text-lg font-black text-[#FFF6CD] group-hover:text-[#FFD000] transition-colors text-right">
                      {project.company}
                    </h4>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#A39E8C] group-hover:text-[#FFD000] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#FFD000]' : ''}`} />
                </div>

                {/* Always-visible basic role */}
                <div className="space-y-1">
                  <span className={`text-[10px] sm:text-[11px] font-bold text-[#C85A17] tracking-wider block uppercase ${isAr ? 'text-right' : 'text-left'}`}>
                    {project.role}
                  </span>
                  {!isExpanded && (
                    <p className={`text-[11px] text-[#A39E8C] italic ${isAr ? 'text-right' : 'text-left'}`}>
                      {isAr ? "اضغط لتوسيع تفاصيل الأثر والمخرج الاستراتيجي..." : "Click to expand impact and strategic deliverable details..."}
                    </p>
                  )}
                </div>

                {/* Animated Accordion Segment */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-1 space-y-3 border-t border-[#FFF6CD]/5 mt-2">
                        <div className={`rounded-xl bg-[#C85A17]/5 border border-[#C85A17]/10 p-4 ${isAr ? 'text-right' : 'text-left'}`}>
                          <span className="text-[10px] text-[#FFD000] font-bold block mb-1">
                            {isAr ? "المخرج الفعلي (Deliverable):" : "Actual Deliverable:"}
                          </span>
                          <p className="text-xs text-[#FFF6CD]/95 leading-relaxed text-justify">
                            {project.deliverable}
                          </p>
                        </div>
                        <div className={`rounded-xl bg-[#FFD000]/5 border border-[#FFD000]/10 p-4 ${isAr ? 'text-right' : 'text-left'}`}>
                          <span className="text-[10px] text-[#C85A17] font-bold block mb-1">
                            {isAr ? "نطاق التمكين (Scope):" : "Scope of Empowerment:"}
                          </span>
                          <p className="text-xs text-[#FFF6CD]/90 leading-relaxed text-justify">
                            {project.scope}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom status indicator ribbon */}
              <div className="mt-6 pt-4 border-t border-[#FFF6CD]/5 flex items-center justify-between text-xs font-semibold text-[#FFD000] relative z-10 w-full">
                <span className={`flex items-center gap-1.5 text-xs text-[#A39E8C] ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {project.stat}
                </span>
                <span className="text-[9px] font-mono text-[#C85A17] uppercase tracking-wider">
                  {project.metaRole}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Decorative prompt connection */}
      <div className={`mt-12 p-6 bg-[#0F1012]/40 rounded-xl border border-[#FFF6CD]/5 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto ${isAr ? 'text-right' : 'text-left'}`}>
        <span className="text-xs text-[#A39E8C] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFD000]" />
          {isAr 
            ? "انضم إلى ركب الريادة، واجعل علامتك ترسي في صدارة الموج."
            : "Join the fleet of excellence, and anchor your brand at the forefront of the industry wave."}
        </span>
        <a 
          href="#contact-sec"
          className="text-xs font-bold text-[#FFD000] hover:text-[#C85A17] flex items-center gap-1 cursor-pointer transition-colors"
        >
          {isAr ? "اطلب موعداً تمهيدياً لمناقشة هويتك" : "Request an introductory meeting to discuss your brand"}
          <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : 'rotate-0'}`} />
        </a>
      </div>

    </section>
  );
}
