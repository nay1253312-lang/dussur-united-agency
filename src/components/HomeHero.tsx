/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function HomeHero() {
  const { lang, t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero-sec" className="relative flex flex-col justify-center min-height-screen py-24 md:py-32 overflow-hidden px-6">
      {/* Absolute visual graphic elements for depth (Cosmic atmosphere) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#C85A17]/10 blur-[130px] select-none pointer-events-none animation-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-[#FFD000]/5 blur-[150px] select-none pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full ltr:text-left rtl:text-right relative z-10"
      >
        {/* Sparkle Agency Tag */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C85A17]/10 border border-[#C85A17]/20 text-[#FFD000] text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 fill-[#FFD000]" />
          <span>{t('hero.tag')}</span>
        </motion.div>

        {/* Primary Header Hero Titles */}
        <div className="space-y-4 md:space-y-6">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black tracking-tight text-[#FFF6CD] leading-[1.1] mb-2"
          >
            <span className="text-[#C85A17] text-glow-orange select-none">{t('hero.word1')}</span>
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-7xl font-bold tracking-tight text-[#FFF6CD]"
          >
            {lang === 'ar' ? (
              <>حيث نجمع شتات <span className="text-[#FFD000] border-b-4 border-[#C85A17]/40">الرؤى</span></>
            ) : (
              <>Where We Gather Scattered <span className="text-[#FFD000] border-b-4 border-[#C85A17]/40">Visions</span></>
            )}
          </motion.h2>

          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-6xl font-bold tracking-tight text-[#FFF6CD]/95"
          >
            {lang === 'ar' ? (
              <>نهندس منها تجارب <span className="text-[#FFD000]">لا تُنسى</span></>
            ) : (
              <>To Engineer Unforgettable <span className="text-[#FFD000]">Experiences</span></>
            )}
          </motion.h3>
        </div>

        {/* Detailed Agency Slogan Paragraph */}
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-xl text-[#A39E8C] max-w-3xl leading-relaxed mt-8 font-medium text-justify"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Quick CTA Anchors Links */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-10 md:mt-12"
        >
          <a 
            href="#ai-consultant-sec"
            className="px-8 py-4 rounded-lg bg-[#FFD000] text-[#080809] font-bold text-sm md:text-base cursor-pointer hover:bg-[#C85A17] hover:text-[#FFF6CD] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-yellow-500/10"
          >
            {t('hero.btn_ai')}
          </a>
          <a 
            href="#services-sec"
            className="px-8 py-4 rounded-lg border border-[#FFF6CD]/10 text-[#FFF6CD] font-semibold text-sm md:text-base cursor-pointer hover:bg-white/5 transition-all"
          >
             {t('hero.btn_pillars')}
          </a>
        </motion.div>
      </motion.div>

      {/* Down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#A39E8C] flex flex-col items-center gap-1 opacity-60">
        <span className="text-[10px] tracking-widest font-bold uppercase">{t('hero.scroll_down')}</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
