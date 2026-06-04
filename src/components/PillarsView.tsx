/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote, ShieldCheck, History, Landmark } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function PillarsView() {
  const { lang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [yearsCount, setYearsCount] = useState(0);

  // Smooth incremental ticking for standard 25+ years from load/scroll intersection
  useEffect(() => {
    if (isInView) {
      let current = 0;
      const target = 25;
      const duration = 1500; // ms
      const stepTime = Math.floor(duration / target);

      const timer = setInterval(() => {
        current += 1;
        setYearsCount(current);
        if (current >= target) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section id="about-sec" ref={containerRef} className="py-24 relative overflow-hidden px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Quran quote & semantic meaning (8 cols) */}
        <div className="lg:col-span-7 space-y-6 ltr:text-left rtl:text-right">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFD000] uppercase tracking-wider justify-start">
            <Quote className="w-4 h-4 text-[#C85A17]" />
            <span>{t('about.tag')}</span>
          </div>

          {/* Majestic Quranic quote highlight */}
          <div className="relative pt-4">
            <Quote className={`w-16 h-16 text-[#C85A17]/10 absolute -top-4 -z-10 fill-current ${lang === 'ar' ? 'right-0' : 'left-0'}`} />
            <h2 className="text-2xl md:text-5xl font-black text-[#FFD000] leading-tight select-none">
              {t('about.quran')}
            </h2>
          </div>

          <p className="text-base md:text-lg text-[#FFF6CD]/95 leading-relaxed text-justify">
            {t('about.quran_desc')}
          </p>

          <p className="text-sm md:text-base text-[#A39E8C] leading-relaxed text-justify">
            {t('about.philosophy')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex gap-3 bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5 hover:border-[#FFD000]/10 transition-all">
              <ShieldCheck className="w-8 h-8 text-[#FFD000] shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#FFF6CD]">{t('about.card1_title')}</h4>
                <p className="text-xs text-[#A39E8C] mt-1">{t('about.card1_desc')}</p>
              </div>
            </div>

            <div className="flex gap-3 bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5 hover:border-[#C85A17]/20 transition-all">
              <Landmark className="w-8 h-8 text-[#C85A17] shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#FFF6CD]">{t('about.card2_title')}</h4>
                <p className="text-xs text-[#A39E8C] mt-1">{t('about.card2_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Counter (5 cols) */}
        <div id="exp-sec" className="lg:col-span-5 flex flex-col justify-center items-center text-center p-8 rounded-2xl bg-gradient-to-br from-[#0F1012] to-[#080809] border border-[#FFF6CD]/5 relative overflow-hidden shadow-2xl">
          {/* Subtle cosmic circle lines overlay */}
          <div className="absolute w-72 h-72 rounded-full border border-[#C85A17]/5 -top-10 -left-10" />
          <div className="absolute w-44 h-44 rounded-full border border-[#FFD000]/5 -bottom-10 -right-10 animate-pulse" />

          <History className="w-10 h-10 text-[#C85A17] mb-4" />

          {/* Big ticking number */}
          <div className="relative">
            <span className="text-7xl md:text-8xl font-black text-[#FFD000] block tracking-tight leading-none">
              {yearsCount}+
            </span>
            <span className="text-xl md:text-2xl font-bold text-[#FFF6CD] block mt-4">{t('about.counter_label')}</span>
          </div>

          <div className="w-16 h-1 bg-[#C85A17] my-6 rounded" />

          <p className="text-xs md:text-sm text-[#A39E8C] leading-relaxed max-w-sm">
            {t('about.counter_desc')}
          </p>
        </div>

      </div>
    </section>
  );
}
