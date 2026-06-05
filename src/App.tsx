/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'motion/react';
import { 
  Sparkles, Menu, X, ArrowUpRight, HelpCircle, 
  ChevronUp, Languages, ArrowLeftRight, Check, BookOpen
} from 'lucide-react';

import Preloader from './components/Preloader';
import HomeHero from './components/HomeHero';
import PillarsView from './components/PillarsView';
import ServicesView from './components/ServicesView';
import ProjectBuilder from './components/ProjectBuilder';
import AIConsultant from './components/AIConsultant';
import PortfolioView from './components/PortfolioView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import DussurLogo from './components/DussurLogo';
import MobileTabletView from './components/MobileTabletView';
import { useLanguage } from './LanguageContext';
import GoldDustSeparator from './components/GoldDustSeparator';
import MagneticWrapper from './components/MagneticWrapper';
import NarrativeNavigation from './components/NarrativeNavigation';

interface ScrollSectionRevealProps {
  children: React.ReactNode;
  delay?: number;
}

const ScrollSectionReveal = ({ children, delay = 0 }: ScrollSectionRevealProps) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the raw velocity to avoid sudden frame jumps on high-frequency scrolling mice
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 160,
    mass: 0.6
  });

  // Dynamically map velocity to 3D scaling (breathe/zoom), rotational tilt, and depth position (Z-axis compression)
  // Low scroll speed (0px/sec) yields native, pristine scale (1), flat tilt (0deg), and frontmost depth (0px)
  const scale = useTransform(smoothVelocity, [-4500, 0, 4500], [0.97, 1, 0.97]);
  const rotateX = useTransform(smoothVelocity, [-3500, 0, 3500], [2.8, 0, -2.8]);
  const z = useTransform(smoothVelocity, [-4500, 0, 4500], [-12, 0, -12]);

  // Recursively inspect and wrap primitive element structures to apply staggered framer animations
  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(node)) return node;

    const el = node as React.ReactElement<any>;
    const type = el.type;
    const isPrimitive = typeof type === 'string' || type === React.Fragment;

    if (isPrimitive && el.props && el.props.children) {
      const array = React.Children.toArray(el.props.children);
      if (array.length > 1) {
        return React.cloneElement(
          el,
          { ...el.props },
          ...array.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="w-full"
            >
              {processNode(child)}
            </motion.div>
          ))
        );
      }
    }

    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }
        }}
        className="w-full"
      >
        {node}
      </motion.div>
    );
  };

  return (
    <div className="w-full relative origin-center" style={{ perspective: "1400px" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.16,
              delayChildren: delay,
            }
          }
        }}
        style={{
          scale,
          rotateX,
          z,
          transformStyle: "preserve-3d"
        }}
        className="w-full relative"
      >
        {React.Children.map(children, child => processNode(child))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-sec");

  // Mouse trajectory tracking variables
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(true);

  // Active section tracking for dynamic fixed ship animation
  useEffect(() => {
    if (isMobileOrTablet) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sectionIds = [
      "hero-sec",
      "about-sec",
      "services-sec",
      "builder-container",
      "ai-consultant-sec",
      "portfolio-sec",
      "contact-sec"
    ];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isPreloaded, isMobileOrTablet]);

  const getShipAnimate = () => {
    switch (activeSection) {
      case "hero-sec":
        return {
          y: [0, -18, 0],
          rotate: [0, 1.2, 0],
          scale: 1,
          opacity: 0.38
        };
      case "about-sec":
        return {
          y: [-15, -35, -15],
          rotate: [1, -1.2, 1],
          scale: 1.05,
          opacity: 0.28
        };
      case "services-sec":
        return {
          y: [12, -8, 12],
          rotate: [-1.2, 0.8, -1.2],
          scale: 0.94,
          opacity: 0.2
        };
      case "builder-container":
        return {
          y: [-6, -26, -6],
          rotate: [0.8, -1, 0.8],
          scale: 1.04,
          opacity: 0.25
        };
      case "ai-consultant-sec":
        return {
          y: [15, -5, 15],
          rotate: [-1.4, 0.6, -1.4],
          scale: 0.88,
          opacity: 0.17
        };
      case "portfolio-sec":
        return {
          y: [-10, -28, -10],
          rotate: [1, -0.8, 1],
          scale: 1.12,
          opacity: 0.22
        };
      case "contact-sec":
        return {
          y: [20, 0, 20],
          rotate: [-1.8, 1, -1.8],
          scale: 0.93,
          opacity: 0.3
        };
      default:
        return {
          y: [0, -18, 0],
          rotate: [0, 1, 0],
          scale: 1,
          opacity: 0.35
        };
    }
  };


  useEffect(() => {
    // 1. Calculate page scroll percentages for custom linear navigation indicator
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    // 2. Trailing cursor pointer setups (only for fine pointers - actual PCs)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Check device width for specialized mobile/tablet rendering
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize();

    // Sensor checks
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    if (!hasTouch) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (!hasTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Lag offset calculations loop for outer orange anchor trailing ring
  useEffect(() => {
    if (isTouch) return;
    
    let animationFrameId: number;
    const lerp = (start: number, end: number, speed: number) => {
      return start + (end - start) * speed;
    };

    const updateTrail = () => {
      setTrailPos(prev => ({
        x: lerp(prev.x, mousePos.x, 0.08),
        y: lerp(prev.y, mousePos.y, 0.08)
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos, isTouch]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stable gold dust background coordinates
  const [goldDustParticles] = useState(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1.2, // 1.2px to 3.7px
      x: Math.random() * 100, // random start horizontal
      y: Math.random() * 100, // random vertical
      delay: Math.random() * -30, // negative delay so they start animated
      duration: Math.random() * 25 + 20, // 20s to 45s slow drift
      opacity: Math.random() * 0.35 + 0.15
    }))
  );

  return (
    <div className="relative min-h-screen bg-[#060607] text-[#FFF6CD] antialiased overflow-x-hidden selection:bg-[#C85A17] selection:text-white pb-0">
      
      {/* Cinematic Luxury Ambient Canvas Background - replaces flat black */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Rich deep royal charcoal & gold backdrop radial blends */}
        <div className="absolute top-0 inset-x-0 h-screen bg-gradient-to-b from-[#111216]/80 via-[#060607] to-transparent opacity-65" />
        
        {/* Soft rotating ambient glow nodes */}
        <div className="absolute top-[15%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-[#C85A17]/8 to-[#FFD000]/3 blur-[120px] mix-blend-screen opacity-70 animate-pulse pointer-events-none" style={{ animationDuration: '14s' }} />
        <div className="absolute top-[45%] right-[5%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-[#C85A17]/6 via-slate-900/40 to-transparent blur-[140px] mix-blend-screen opacity-65 pointer-events-none" />
        <div className="absolute bottom-[20%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-[#FFD000]/4 to-[#C85A17]/5 blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
        
        {/* Architectural Pillars grid backdrop - symbolizes dussur anchors */}
        <div className="absolute inset-0 bg-grid-gold opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

        {/* Floating majestic gold stroke line-art sailing ship (سفينة شراعية بستروك ذهبي غامر) */}
        <motion.img 
          src="/gold_stroke_ship.png"
          alt="Sovereign Gold Stroke Sailing Ship"
          className="absolute w-[120vw] md:w-[82vw] max-w-[1250px] h-auto pointer-events-none select-none"
          style={{ 
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            mixBlendMode: 'screen', 
            filter: 'contrast(1.6) brightness(0.9) saturate(1.1)',
            backgroundColor: 'transparent',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          animate={getShipAnimate()}
          transition={{ 
            duration: 1.5,
            ease: "easeOut",
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          }}
          referrerPolicy="no-referrer"
        />

        {/* Live floating gold dust particles (غبار الذهب المترامي) */}
        <div className="absolute inset-0">
          {goldDustParticles.map((pt) => (
            <div
              key={pt.id}
              className="gold-dust-particle absolute rounded-full bg-gradient-to-r from-[#FFD000] to-[#C85A17]"
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                '--dur': `${pt.duration}s`,
                '--delay': `${pt.delay}s`,
                '--op': pt.opacity,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* 1. Cinematic Entry Preloader Wrapper */}
      <AnimatePresence mode="wait">
        {!isPreloaded && (
          <Preloader onComplete={() => setIsPreloaded(true)} />
        )}
      </AnimatePresence>

      {/* Main app assets reveal once loaded entirely */}
      {isPreloaded && (
        isMobileOrTablet ? (
          <MobileTabletView />
        ) : (
          <>
          {/* 2. Custom trailing cursor elements (disabled dynamically on Mobile) */}
          {!isTouch && (
            <>
              {/* Inner tight gold point */}
              <div 
                className="fixed w-2 h-2 rounded-full bg-[#FFD000] pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 select-none"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
              {/* Outer lazy orange ring */}
              <div 
                className="fixed w-10 h-10 rounded-full border border-[#C85A17]/70 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 select-none transition-transform duration-100 ease-out"
                style={{ left: `${trailPos.x}px`, top: `${trailPos.y}px` }}
              />
              {/* Giant atmospheric lag-trailing light bubble */}
              <div 
                className="fixed w-[45vw] h-[45vw] rounded-full pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 select-none opacity-45 bg-[radial-gradient(circle,rgba(200,90,23,0.06)_0%,transparent_70%)] blur-[120px]"
                style={{ left: `${trailPos.x}px`, top: `${trailPos.y}px` }}
              />
            </>
          )}

          {/* 2b. Majestic Side Narrative Navigation (Desktop fixed dots indicator) */}
          <NarrativeNavigation />

          {/* 3. Luxury Sticky Header Navigation */}
          <header className="fixed top-0 inset-x-0 bg-[#080809]/40 backdrop-blur-md z-50 border-b border-[#FFF6CD]/5 select-none h-28 md:h-36">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
              
              {/* Logo (Arabic or English) */}
              <div className="flex items-center">
                <a href="#hero-sec" onClick={(e) => { e.preventDefault(); scrollToSection("hero-sec"); }} className="flex items-center select-none focus:outline-none">
                  <img 
                    src={lang === 'ar' ? '/logo-ar.svg' : '/logo-en.svg'} 
                    alt="Dussur" 
                    className="h-24 md:h-32 w-auto object-contain hover:brightness-110 hover:scale-105 active:scale-95 transition-all drop-shadow-[0_2px_12px_rgba(200,90,23,0.25)]"
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>

              {/* Middle Navigation - Desktop Layout */}
              <nav className="hidden lg:flex items-center gap-8">
                <MagneticWrapper>
                  <button onClick={() => scrollToSection("hero-sec")} className="text-xs font-semibold text-[#A39E8C] hover:text-[#FFF6CD] cursor-pointer transition-colors">{t('nav.home')}</button>
                </MagneticWrapper>
                <MagneticWrapper>
                  <button onClick={() => scrollToSection("about-sec")} className="text-xs font-semibold text-[#A39E8C] hover:text-[#FFF6CD] cursor-pointer transition-colors">{t('nav.about')}</button>
                </MagneticWrapper>
                <MagneticWrapper>
                  <button onClick={() => scrollToSection("services-sec")} className="text-xs font-semibold text-[#A39E8C] hover:text-[#FFF6CD] cursor-pointer transition-colors">{t('nav.pillars')}</button>
                </MagneticWrapper>
                <MagneticWrapper>
                  <button onClick={() => scrollToSection("builder-container")} className="text-xs font-semibold text-[#A39E8C] hover:text-[#FFF6CD] cursor-pointer transition-colors">{t('nav.builder')}</button>
                </MagneticWrapper>
                <MagneticWrapper>
                  <button onClick={() => scrollToSection("portfolio-sec")} className="text-xs font-semibold text-[#A39E8C] hover:text-[#FFF6CD] cursor-pointer transition-colors">{t('nav.portfolio')}</button>
                </MagneticWrapper>
                
                {/* AI co-pilot link spotlighted with yellow bullet */}
                <MagneticWrapper strength={0.25}>
                  <button 
                    onClick={() => scrollToSection("ai-consultant-sec")} 
                    className="relative text-xs font-bold text-[#FFD000] hover:text-[#FFF6CD] cursor-pointer transition-colors flex items-center gap-1 bg-[#C85A17]/10 px-3 py-1.5 rounded-lg border border-[#C85A17]/20 animate-none"
                  >
                    <Sparkles className="w-3 h-3 text-[#FFD000] animate-pulse" />
                    {t('nav.ai')}
                  </button>
                </MagneticWrapper>
              </nav>

              {/* Left Side utilities and mobile triggers */}
              <div className="flex items-center gap-3">
                {/* Language Switcher for all devices */}
                <button 
                  onClick={toggleLanguage}
                  className="w-10 h-10 rounded-lg bg-[#0F1012] border border-[#FFF6CD]/10 flex items-center justify-center text-[#FFF6CD] hover:text-[#FFD000] hover:border-[#FFD000]/35 transition-all cursor-pointer select-none"
                  title={lang === 'ar' ? 'English' : 'العربية'}
                >
                  <span className="text-xs font-bold font-mono text-[#FFD000] uppercase">
                    {lang === 'ar' ? 'EN' : 'AR'}
                  </span>
                </button>

                <a 
                  href="#contact-sec" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact-sec");
                  }}
                  className="hidden md:flex items-center gap-1 bg-[#FFD000] text-[#080809] hover:bg-[#C85A17] hover:text-[#FFF6CD] text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
                >
                  {t('nav.contact')}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {/* Mobile Hamburger menu */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden w-10 h-10 rounded-lg bg-[#0F1012] border border-[#FFF6CD]/10 flex items-center justify-center text-[#FFF6CD] cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </div>

            {/* Custom Horizontal Scroll Indicator Progress bar */}
            <div 
              className={`absolute bottom-0 h-0.5 bg-gradient-to-l from-[#C85A17] via-[#FFD000] to-transparent transition-all duration-75 ${lang === 'ar' ? 'right-0' : 'left-0'}`}
              style={{ width: `${scrollProgress}%` }}
            />
          </header>

          {/* 4. Sliding Mobile menu Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="fixed top-24 md:top-28 inset-x-0 bg-[#0F1012] border-b border-[#FFF6CD]/10 z-40 lg:hidden overflow-hidden select-none"
              >
                <div className={`p-6 flex flex-col gap-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <button onClick={() => scrollToSection("hero-sec")} className="text-sm font-semibold text-[#A39E8C] py-2 border-b border-white/5">{t('nav.home')}</button>
                  <button onClick={() => scrollToSection("about-sec")} className="text-sm font-semibold text-[#A39E8C] py-2 border-b border-white/5">{t('nav.about')}</button>
                  <button onClick={() => scrollToSection("services-sec")} className="text-sm font-semibold text-[#A39E8C] py-2 border-b border-white/5">{t('nav.pillars')}</button>
                  <button onClick={() => scrollToSection("builder-container")} className="text-sm font-semibold text-[#A39E8C] py-2 border-b border-white/5 flex items-center justify-between">
                    <span>{t('nav.builder')}</span>
                    <ArrowLeftRight className="w-4 h-4 text-[#C85A17]" />
                  </button>
                  <button onClick={() => scrollToSection("portfolio-sec")} className="text-sm font-semibold text-[#A39E8C] py-2 border-b border-white/5">{t('nav.portfolio')}</button>
                  <button onClick={() => scrollToSection("ai-consultant-sec")} className="text-sm font-bold text-[#FFD000] py-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[#FFD000]" />
                      {t('nav.mobile_ai_gate')}
                    </span>
                    <Check className="w-4 h-4 text-[#FFD000]" />
                  </button>
                  <button onClick={() => scrollToSection("contact-sec")} className="w-full bg-[#FFD000] text-[#080809] font-bold py-3 mt-2 rounded-lg text-center text-sm">
                    {t('nav.contact_cta')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. Content Layout Viewport stack (تأثير تراكب الصفحات الأنيق) */}
          <main className="relative">
            
            {/* View A: Majestic Hero View */}
            <div id="hero-sec" className="relative w-full bg-transparent pt-12 pb-16 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <HomeHero />
                </div>
              </ScrollSectionReveal>
            </div>

            <GoldDustSeparator />

            {/* View B: Philosophy About Section + Incremental Counting Stats */}
            <div id="about-sec" className="relative w-full bg-transparent py-16 md:py-24 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <PillarsView />
                </div>
              </ScrollSectionReveal>
            </div>

            <GoldDustSeparator />

            {/* View C: Services Seven Pillars interactive Bento Selector Dashboard */}
            <div id="services-sec" className="relative w-full bg-transparent py-16 md:py-24 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <ServicesView />
                </div>
              </ScrollSectionReveal>
            </div>

            <GoldDustSeparator />

            {/* View D: Interactive scope and timeline configurator */}
            <div id="builder-container" className="relative w-full bg-transparent py-16 md:py-24 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <div className="max-w-4xl mx-auto text-center space-y-2 mb-8">
                    <span className="text-[10px] tracking-widest font-bold text-[#C85A17] uppercase">{t('builder.sec_tag')}</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#FFF6CD]">{t('builder.sec_title')}</h3>
                    <p className="text-xs md:text-sm text-[#A39E8C]">{t('builder.sec_desc')}</p>
                  </div>
                  <ProjectBuilder />
                </div>
              </ScrollSectionReveal>
            </div>

            <GoldDustSeparator />

            {/* View E: Co-Pilot AI Consultancy Strategic Portal */}
            <div id="ai-consultant-sec" className="relative w-full bg-transparent py-16 md:py-24 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <div className="max-w-4xl mx-auto text-center space-y-2 mb-8">
                    <span className="text-[10px] tracking-widest font-bold text-[#FFD000] uppercase">{t('ai.sec_tag')}</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#FFF6CD]">{t('ai.sec_title')}</h3>
                    <p className="text-xs md:text-sm text-[#A39E8C]">{t('ai.sec_desc')}</p>
                  </div>
                  <AIConsultant />
                </div>
              </ScrollSectionReveal>
            </div>

            <GoldDustSeparator />

            {/* View F: Nation-tier portfolio showcase */}
            <div id="portfolio-sec" className="relative w-full bg-transparent py-16 md:py-24 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <PortfolioView />
                </div>
              </ScrollSectionReveal>
            </div>

            <GoldDustSeparator />

            {/* View G: Contact Form section */}
            <div id="contact-sec" className="relative w-full bg-transparent py-16 md:py-24 scroll-mt-24">
              <ScrollSectionReveal>
                <div className="max-w-7xl mx-auto w-full px-6">
                  <ContactView />
                </div>
              </ScrollSectionReveal>
            </div>

          </main>

          {/* 6. Luxury Footer */}
          <Footer />

          {/* 7. Scroll back to top bubble utility */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 w-11 h-11 rounded-full bg-[#0F1012] border border-[#FFF6CD]/10 flex items-center justify-center text-[#FFD000] hover:bg-[#C85A17] hover:text-white transition-all shadow-2xl cursor-pointer z-50 hover:translate-y-[-2px] ${lang === 'ar' ? 'right-6' : 'left-6'}`}
                title={t('nav.scroll_top')}
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )
    )}
  </div>
  );
}
