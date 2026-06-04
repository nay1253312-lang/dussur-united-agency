import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

const SECTIONS = [
  { id: 'hero-sec', labelAr: 'البداية والقصة', labelEn: 'Home & Narrative' },
  { id: 'about-sec', labelAr: 'عقيدة دُسُر', labelEn: 'Dussur Philosophy' },
  { id: 'services-sec', labelAr: 'الركائز الإستراتيجية', labelEn: 'Strategic Pillars' },
  { id: 'builder-container', labelAr: 'هندسة النطاقات', labelEn: 'Scope Builder' },
  { id: 'ai-consultant-sec', labelAr: 'مستشار دُسُر AI', labelEn: 'Dussur AI' },
  { id: 'portfolio-sec', labelAr: 'شواهد التميز', labelEn: 'Our Portfolio' },
  { id: 'contact-sec', labelAr: 'التواصل والتأصيل', labelEn: 'Contact Hub' },
];

export default function NarrativeNavigation() {
  const { isAr } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero-sec');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // focused in the active reading area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDotClick = (id: string) => {
    // Synthesize a faint, luxury-toned tactile high-end haptic click using browser Web Audio API
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        const ctx = new AudioCtxClass();
        const now = ctx.currentTime;

        // Sound component A: Warm, woody tactile low-resonance base
        const baseOsc = ctx.createOscillator();
        const baseGain = ctx.createGain();
        baseOsc.type = 'triangle';
        baseOsc.frequency.setValueAtTime(190, now);
        baseOsc.frequency.exponentialRampToValueAtTime(95, now + 0.09);
        baseGain.gain.setValueAtTime(0.035, now);
        baseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

        // Sound component B: Pristine crisp high-frequency physical tick
        const tickOsc = ctx.createOscillator();
        const tickGain = ctx.createGain();
        tickOsc.type = 'sine';
        tickOsc.frequency.setValueAtTime(1600, now);
        tickOsc.frequency.exponentialRampToValueAtTime(700, now + 0.025);
        tickGain.gain.setValueAtTime(0.012, now);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        // Connect and fire
        baseOsc.connect(baseGain);
        tickOsc.connect(tickGain);
        baseGain.connect(ctx.destination);
        tickGain.connect(ctx.destination);

        baseOsc.start(now);
        tickOsc.start(now);
        baseOsc.stop(now + 0.1);
        tickOsc.stop(now + 0.03);
      }
    } catch (e) {
      // Graceful fallback if audio context is blocked or restricted
    }

    const element = document.getElementById(id);
    if (element) {
      // Offset scrolling slightly to accommodate for the sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Put on left side on Arabic and right side on English
  const sideClass = isAr ? 'left-8 md:left-10' : 'right-8 md:right-10';
  const tooltipAlignClass = isAr ? 'right-7 origin-right' : 'left-7 origin-left';

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 z-[999] hidden lg:flex flex-col items-center select-none ${sideClass}`}>
      
      {/* Tall sleek vertical premium pillar line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FFD000]/25 to-transparent pointer-events-none" />

      {/* Narrative Dots Group */}
      <div className="relative flex flex-col gap-6 py-8 items-center z-10">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const label = isAr ? sec.labelAr : sec.labelEn;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-center cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleDotClick(sec.id)}
            >
              {/* Outer Golden Pulsing Orbit (Active Only) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-orbit"
                    className="absolute w-5 h-5 rounded-full border border-[#FFD000]/40 bg-[#FFD000]/5"
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 rounded-full border border-[#C85A17]/30 animate-ping opacity-60"
                      style={{ animationDuration: '3s' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Central Premium Brass Node */}
              <motion.div
                className={`w-2.5 h-2.5 rotate-45 transition-colors duration-500 z-10 ${
                  isActive 
                    ? 'bg-[#FFD000] shadow-[0_0_8px_#FFD000]' 
                    : 'bg-[#A39E8C]/40 border border-[#FFF6CD]/20 group-hover:bg-[#FFF6CD]'
                }`}
                animate={{
                  scale: isActive ? 1.15 : 0.85,
                  rotate: isActive ? 135 : 45,
                }}
                transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
              />

              {/* Sophisticated Golden Slide-out Tooltip */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: isAr ? 15 : -15, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: isAr ? 10 : -10, scale: 0.9 }}
                    transition={{ duration: 0.22, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className={`absolute flex items-center whitespace-nowrap pointer-events-none z-20 ${tooltipAlignClass}`}
                  >
                    {/* Tiny connector pointer */}
                    <div className={`w-1.5 h-1.5 rotate-45 bg-[#0F1012] border-t border-r border-[#FFD000]/30 absolute ${isAr ? '-right-[3px]' : '-left-[3px]'}`} />
                    
                    {/* Luxurious Glassmorphic Badge container */}
                    <div className="bg-[#0F1012]/95 border border-[#FFD000]/30 shadow-[0_4px_20px_rgba(0,0,0,0.8)] text-[#FFF6CD] px-3.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md flex items-center gap-2">
                      <div className="w-1 h-1 rotate-45 bg-[#FFD000]" />
                      <span className="tracking-wide">
                        {label}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
