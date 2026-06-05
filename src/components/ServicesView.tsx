/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, ArrowLeftRight, Sparkles
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { servicesData } from '../data/servicesData';

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
  const [activeServiceId, setActiveServiceId] = useState(0);

  const services: ServiceItem[] = servicesData.map(s => ({
    id: s.numericId,
    category: s.category,
    icon: s.icon,
    title: lang === 'ar' ? s.titleAr : s.titleEn,
    englishTitle: s.titleEn,
    description: lang === 'ar' ? s.descriptionAr : s.descriptionEn,
    detailedDesc: lang === 'ar' ? s.detailedDescAr : s.detailedDescEn,
    deliverables: lang === 'ar' ? s.deliverablesAr : s.deliverablesEn,
    gradient: s.gradient,
    businessValue: lang === 'ar' ? s.businessValueAr : s.businessValueEn,
    websiteCopy: lang === 'ar' ? s.websiteCopyAr : s.websiteCopyEn,
  }));

  const activeService = services.find(s => s.id === activeServiceId) || services[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services-sec" className="py-24 relative overflow-hidden px-6 max-w-6xl mx-auto">
      <div className="ltr:text-left rtl:text-right mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#FFF6CD]/5">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-[#FFD000]">{t('services.section_title')}</h2>
          <span className="text-xs uppercase tracking-widest text-[#A39E8C] font-semibold mt-2 block">{t('services.section_tag')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
        
        {/* Left Interactive Bento Grid List (all 8 services) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[560px] overflow-y-auto pr-1">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = activeServiceId === service.id;
            
            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-4 rounded-xl border cursor-pointer select-none ltr:text-left rtl:text-right flex items-center justify-between gap-4 transition-all luxury-breath-flat ${
                  isActive 
                    ? 'bg-[#121316]/35 border-[#C85A17]/40 ring-1 ring-[#C85A17]/10 shadow-lg shadow-black/40' 
                    : 'bg-[#0F1012]/08 border-[#FFF6CD]/5 hover:border-[#FFF6CD]/15'
                }`}
              >
                <div className="flex items-center gap-3.5">
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
        <div className="lg:col-span-7 rounded-2xl bg-[#0F1012]/08 border border-[#FFF6CD]/5 backdrop-blur-md p-8 flex flex-col justify-between relative overflow-hidden min-h-[480px]">
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
                      ? `الركيزة رقم ${(activeServiceId + 1).toString().padStart(2, '0')}`
                      : `Pillar No. ${(activeServiceId + 1).toString().padStart(2, '0')}`
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
                  {lang === 'ar' ? 'المخرجات المضمونة للركيزة:' : 'Guaranteed Pillar Deliverables:'}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
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

              {/* Simplified Business Value (Saves space and looks much simpler/cleaner) */}
              <div className="pt-4 border-t border-[#FFF6CD]/5 rtl:text-right ltr:text-left">
                <span className="text-[11px] text-[#C85A17] font-black uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'العائد لمشروعك:' : 'ROI & Value:'}
                </span>
                <p className="text-xs text-[#FFF6CD]/80 leading-relaxed italic">
                  {activeService.businessValue}
                </p>
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
