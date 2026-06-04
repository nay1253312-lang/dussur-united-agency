/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Building2, Target, Palette, DollarSign, Goal, 
  Send, RotateCcw, Download, CheckCircle2, Copy, FileText, ArrowRight, Loader2
} from 'lucide-react';
import { AIConsultationPayload, AIConsultationResult } from '../types';
import { useLanguage } from '../LanguageContext';

export default function AIConsultant() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState<AIConsultationPayload>({
    businessName: '',
    businessSector: '',
    targetAudience: '',
    tone: 'professional',
    marketingBudget: 'medium',
    primaryGoal: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AIConsultationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadingMessagesAr = [
    "جارٍ دراسة المعطيات وتحديد فئة الجمهور الرديف...",
    "جارٍ تحليل اتجاهات السوق والمنافسين المحليين...",
    "جارٍ نسج الروابط والتصاميم البصرية المناسبة لعلامتك السامقة...",
    "جارٍ صياغة ركائز الهوية وحلول التحول الرقمي المتكاملة...",
    "يكتمل الإتقان الآن، نضع اللمسات الأخيرة..."
  ];

  const loadingMessagesEn = [
    "Analyzing business coordinates and core demographics...",
    "Auditing Saudi domestic market trends and competitors...",
    "Drafting brand guidelines and responsive visual grids...",
    "Architecting full-stack digital experiences and solutions...",
    "Perfecting strategic outputs, polishing details..."
  ];

  const loadingMessages = lang === 'en' ? loadingMessagesEn : loadingMessagesAr;

  // Cycles through premium calming messages while AI is computing
  const runLoadingTicks = (duration: number) => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      if (tick < loadingMessages.length) {
        setLoadingStep(tick);
      } else {
        clearInterval(interval);
      }
    }, duration);
    return interval;
  };

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.businessSector) {
      setErrorMessage(
        lang === 'ar' 
          ? "الرجاء تحديد كلاً من اسم جهة العمل والقطاع التجاري بدقة."
          : "Please specify both your official brand name and sector accurately."
      );
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);
    setErrorMessage(null);
    setResult(null);

    const loaderInterval = runLoadingTicks(1800);

    try {
      const response = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang })
      });

      const data = await response.json();
      clearInterval(loaderInterval);

      if (!response.ok) {
        throw new Error(
          data.error || data.details || 
          (lang === 'ar' 
            ? "عفواً، تعذر توليد الاستراتيجية في هذا الوقت."
            : "Apologies, could not generate strategic intelligence pathways.")
        );
      }

      setResult(data);
    } catch (err: any) {
      setErrorMessage(
        err.message || 
        (lang === 'ar' 
          ? "حدث تداخل غير متوقع أثناء الاتصال بالخادم الرئيسي لإدارة دُسُر AI."
          : "An unexpected communication mismatch occurred with Dussur AI core.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopyAr = `
العلامة التجارية: ${formData.businessName}
العبارة الاستراتيجية لعلامتكم: ${result.slogan}
الشعار الرديف المساعد: ${result.suggestedTagline}

الموجز والخطة الاستراتيجية:
${result.strategicBrief}

ركائز الهوية الأساسية المقترحة:
${result.brandIdentityPillars.map((p, i) => `${i + 1}- ${p}`).join('\n')}

المفهوم والروح الهوية البصرية:
${result.visualIdentityConcept}

فكرة التجربة والتفاعل الرقمي الأول:
${result.digitalCampaignIdea}

الخدمات التنفيذية الموصى بها من دسر المتحدة:
${result.recommendedServices.join(' | ')}
    `.trim();

    const textToCopyEn = `
Brand Entity: ${formData.businessName}
Strategic Slogan: ${result.slogan}
Suggested Auxiliary Tagline: ${result.suggestedTagline}

Strategic Narrative Assessment:
${result.strategicBrief}

Proposed Brand Identity Pillars:
${result.brandIdentityPillars.map((p, i) => `${i + 1}- ${p}`).join('\n')}

Art Direction & Visual Concept:
${result.visualIdentityConcept}

Digital Launch Activation Campaign:
${result.digitalCampaignIdea}

Recommended Solutions & Services:
${result.recommendedServices.join(' | ')}
    `.trim();

    navigator.clipboard.writeText(lang === 'ar' ? textToCopyAr : textToCopyEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      businessName: '',
      businessSector: '',
      targetAudience: '',
      tone: 'professional',
      marketingBudget: 'medium',
      primaryGoal: ''
    });
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="w-full relative py-12 px-2">
      {/* Light subtle container card */}
      <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#0F1012]/40 border border-[#FFF6CD]/5 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="p-1 bg-gradient-to-l from-[#C85A17] to-[#FFD000] opacity-75" />
        
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#FFF6CD]/5 flex-row-reverse ltr:flex-row">
            <div className="ltr:text-left rtl:text-right">
              <div className="flex items-center gap-2 mb-2 justify-start">
                <Sparkles className="w-6 h-6 text-[#FFD000]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#FFD000]">
                  {lang === 'ar' ? 'مستشار الهوية والتحول لـ دُسُر' : 'Dussur Strategic AI Co-Pilot'}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#FFF6CD]">
                {lang === 'ar' ? 'بوابة التخطيط والريادة الاستراتيجية' : 'Strategic Brand Planning Portal'}
              </h3>
              <p className="text-sm text-[#A39E8C] mt-2 leading-relaxed">
                {lang === 'ar' 
                  ? 'اصنع استراتيجيتك، وعزز تواصلك الرقمي بثبات تام في دقيقة واحدة بمساعدة المحرك الاستشاري لـ دُسُر المتحدة (AI).' 
                  : 'Formulate custom growth tactics, brand architectures, and visual alignments in seconds with Dussur\'s automated strategic engine (AI).'}
              </p>
            </div>
            
            {result && (
              <button 
                onClick={resetForm}
                className="flex items-center gap-2 text-xs text-[#A39E8C] hover:text-[#FFD000] bg-[#080809]/60 px-4 py-2.5 rounded-lg border border-[#FFF6CD]/5 transition-all self-start shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                {lang === 'ar' ? 'استشارة جديدة' : 'New Consultation'}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* Loading Overlay */}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-16 flex flex-col items-center justify-center text-center gap-6"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-t-[#FFD000] border-r-transparent border-b-[#C85A17] border-l-transparent"
                  />
                  <Sparkles className="w-6 h-6 text-[#FFD000] absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <p className="text-base font-medium text-[#FFF6CD]">{loadingMessages[loadingStep]}</p>
                  <p className="text-xs text-[#A39E8C]">
                    {lang === 'ar' ? 'سنرسخ حضور علامتك بدقة الرؤى الاستشارية...' : 'Designing your brand foundations with strategic precision...'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {!isLoading && errorMessage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 border border-red-900/40 bg-red-950/20 rounded-xl text-center flex flex-col items-center gap-3"
              >
                <span className="text-sm text-red-200">{errorMessage}</span>
                <button 
                  onClick={() => setErrorMessage(null)} 
                  className="text-xs bg-[#0F1012] px-4 py-2 border border-red-500/20 text-[#FFF6CD] rounded hover:bg-neutral-900 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'حاول مجدداً' : 'Try Again'}
                </button>
              </motion.div>
            )}

            {/* Step 1: Input Form */}
            {!isLoading && !result && !errorMessage && (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleConsult}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Name */}
                  <div className="flex flex-col gap-2 ltr:text-left rtl:text-right">
                    <label className="text-sm font-semibold text-[#FFF6CD] flex items-center gap-2 justify-start">
                      <Building2 className="w-4 h-4 text-[#C85A17]" />
                      {lang === 'ar' ? 'اسم علامتك التجارية أو فكرتك المقترحة *' : 'Your Brand Name or Intended Entity *'}
                    </label>
                    <input 
                      type="text"
                      className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/40 ltr:text-left rtl:text-right bg-[#080809]/80"
                      placeholder={lang === 'ar' ? 'امثلة: تالين الفاخرة، كيان لوجستك...' : 'e.g., Talin Luxury, Kayan Logistics...'}
                      required
                      value={formData.businessName}
                      onChange={e => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>

                  {/* Sector */}
                  <div className="flex flex-col gap-2 ltr:text-left rtl:text-right">
                    <label className="text-sm font-semibold text-[#FFF6CD] flex items-center gap-2 justify-start">
                      <Target className="w-4 h-4 text-[#C85A17]" />
                      {lang === 'ar' ? 'القطاع التجاري أو مجال التخصص *' : 'Industry, Sector, or Specialty Field *'}
                    </label>
                    <input 
                      type="text"
                      className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/40 ltr:text-left rtl:text-right bg-[#080809]/80"
                      placeholder={lang === 'ar' ? 'امثلة: الضيافة النجدية الأصيلة، التطوير العقاري، المتاجر الرقمية...' : 'e.g., Authentic Hospitality, Real Estate, E-Commerce...'}
                      required
                      value={formData.businessSector}
                      onChange={e => setFormData({...formData, businessSector: e.target.value})}
                    />
                  </div>

                  {/* Target Audience */}
                  <div className="flex flex-col gap-2 ltr:text-left rtl:text-right">
                    <label className="text-sm font-semibold text-[#FFF6CD] flex items-center gap-2 justify-start">
                      <Target className="w-4 h-4 text-[#FFD000]" />
                      {lang === 'ar' ? 'الجمهور المستهدف بالتحديد' : 'Target Demographics / Key Audience'}
                    </label>
                    <input 
                      type="text"
                      className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/40 ltr:text-left rtl:text-right bg-[#080809]/80"
                      placeholder={lang === 'ar' ? 'امثلة: صناع القرار المالي، سيدات المجتمع السعودي، جيل الشباب الواعد...' : 'e.g., Saudi corporate decision-makers, high-end consumers, promising youth...'}
                      value={formData.targetAudience}
                      onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                    />
                  </div>

                  {/* Primary Goal */}
                  <div className="flex flex-col gap-2 ltr:text-left rtl:text-right">
                    <label className="text-sm font-semibold text-[#FFF6CD] flex items-center gap-2 justify-start">
                      <Goal className="w-4 h-4 text-[#FFD000]" />
                      {lang === 'ar' ? 'الهدف الاستراتيجي الأبرز لعلامتكم *' : 'Primary Strategic Metric / Ultimate Goal *'}
                    </label>
                    <input 
                      type="text"
                      className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/40 ltr:text-left rtl:text-right bg-[#080809]/80"
                      placeholder={lang === 'ar' ? 'مثال: زيادة الثقة وبناء هوية تعكس العراقة النجدية والوصول للمنافسة...' : 'e.g., Anchor enterprise trust, build heritage-inspired identity, and gain competitive edge...'}
                      value={formData.primaryGoal}
                      onChange={e => setFormData({...formData, primaryGoal: e.target.value})}
                    />
                  </div>

                  {/* Tone Choice */}
                  <div className="flex flex-col gap-2 ltr:text-left rtl:text-right">
                    <label className="text-sm font-semibold text-[#FFF6CD] flex items-center gap-2 justify-start">
                      <Palette className="w-4 h-4 text-[#C85A17]" />
                      {lang === 'ar' ? 'نبرة الخطاب ولغة الهوية المفضلة' : 'Identity Voice & Communication Tone'}
                    </label>
                    <select 
                      className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all cursor-pointer ltr:text-left rtl:text-right bg-[#080809]/80"
                      value={formData.tone}
                      onChange={e => setFormData({...formData, tone: e.target.value as any})}
                    >
                      <option value="professional">{lang === 'ar' ? 'رصين ومؤسسي بوقار رفيع' : 'Prestigious, Solid & Corporate'}</option>
                      <option value="luxury">{lang === 'ar' ? 'فاخر، فخم، موجه للنخبة والصفوة' : 'Ultra-Luxury, Exclusive & Bespoke'}</option>
                      <option value="creative">{lang === 'ar' ? 'إبداعي خارج الصندوق مشوق' : 'Immersive, Creative & Conversational'}</option>
                      <option value="bold">{lang === 'ar' ? 'ثوري، جريء ومختلف كلياً' : 'Bold, Revolutionary & Disruptive'}</option>
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div className="flex flex-col gap-2 ltr:text-left rtl:text-right">
                    <label className="text-sm font-semibold text-[#FFF6CD] flex items-center gap-2 justify-start">
                      <DollarSign className="w-4 h-4 text-[#C85A17]" />
                      {lang === 'ar' ? 'مستوى الميزانية والتحدي الاستراتيجي' : 'Investment Volume & Market Scale'}
                    </label>
                    <select 
                      className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all cursor-pointer ltr:text-left rtl:text-right bg-[#080809]/80"
                      value={formData.marketingBudget}
                      onChange={e => setFormData({...formData, marketingBudget: e.target.value as any})}
                    >
                      <option value="startup">{lang === 'ar' ? 'ميزانية للمشاريع الناشئة والتحقق الأولي' : 'Launch Budget / Market Entry Seed'}</option>
                      <option value="medium">{lang === 'ar' ? 'ميزانية نمو تنافسية متوسطة' : 'Competitive Growth Scale'}</option>
                      <option value="enterprise">{lang === 'ar' ? 'ميزانية تشغيلية لقيادة القطاع أو كبرى الكيانات' : 'Enterprise / Industry Leadership Scale'}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#C25514] to-[#E5AB00] text-[#080809] font-bold rounded-lg cursor-pointer transition-all shadow-lg hover:shadow-orange-500/10 text-sm md:text-base"
                  >
                    {lang === 'ar' ? 'صياغة الاستراتيجية الذكية الآن' : 'Generate Live Strategy Blueprint'}
                    <ArrowRight className="w-5 h-5 ltr:rotate-0 rtl:rotate-180" />
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Display Generated AI Strategic Brief */}
            {!isLoading && result && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Result header & utilities */}
                <div className="flex justify-between items-center bg-[#080809]/50 p-4 rounded-xl border border-[#FFF6CD]/5 flex-row-reverse ltr:flex-row">
                  <span className="text-xs text-[#A39E8C] flex items-center gap-2 justify-start">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD000]" />
                    {lang === 'ar' ? 'تم صياغة المخرجات وربطها بركائز دُسُر بنجاح.' : 'Strategic blueprint successfully formulated and tied to Dussur\'s pillars.'}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs bg-[#0F1012] px-3.5 py-2 border border-[#FFF6CD]/5 text-[#FFF6CD] rounded-md hover:bg-neutral-950 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                          <span>{lang === 'ar' ? 'تم نسخ الملف' : 'Blueprint Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#FFD000]" />
                          <span>{lang === 'ar' ? 'نسخ الملخص' : 'Copy Blueprint Summary'}</span>
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => window.print()}
                      className="hidden sm:flex items-center gap-1.5 text-xs bg-[#0F1012] px-3.5 py-2 border border-[#FFF6CD]/5 text-[#FFF6CD] rounded-md hover:bg-neutral-950 transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {lang === 'ar' ? 'طباعة' : 'Print Report'}
                    </button>
                  </div>
                </div>

                {/* Main Hero Slogan Box */}
                <div className="text-center p-8 bg-[radial-gradient(circle_at_center,rgba(200,90,23,0.06)_0%,transparent_100%)] rounded-xl border border-[#C85A17]/10 relative z-10 overflow-hidden">
                  <div className="absolute top-2 right-2 text-[10px] font-semibold text-[#C85A17] select-none tracking-widest uppercase opacity-75">
                    {lang === 'ar' ? 'الشعار الإشهاري المقترح الأساسي' : 'Proposed Primary Master Slogan'}
                  </div>
                  <h4 className="text-3xl md:text-5xl font-extrabold text-[#FFD000] tracking-tight leading-tight mb-3">
                    {result.slogan}
                  </h4>
                  <p className="text-base md:text-lg italic font-medium text-[#FFF6CD]/80">
                     {result.suggestedTagline}
                  </p>
                </div>

                {/* Dashboard layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Strategic Brief (takes 2 cols) */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Brief */}
                    <div className="bg-[#080809]/40 p-6 rounded-xl border border-[#FFF6CD]/5 space-y-3 ltr:text-left rtl:text-right">
                      <h5 className="text-base font-bold text-[#FFD000] border-b border-[#FFF6CD]/5 pb-3 ltr:text-left rtl:text-right">
                        {lang === 'ar' ? 'البوصلة والرؤية الرياضية والمدخل الاستراتيجي' : 'Sovereign Strategic Assessment & Vision'}
                      </h5>
                      <p className="text-sm text-[#FFF6CD]/95 leading-relaxed text-justify whitespace-pre-wrap leading-loose">{result.strategicBrief}</p>
                    </div>

                    {/* Digital campaign */}
                    <div className="bg-[#080809]/40 p-6 rounded-xl border border-[#FFF6CD]/5 space-y-3 ltr:text-left rtl:text-right">
                      <h5 className="text-base font-bold text-[#C85A17] border-b border-[#FFF6CD]/5 pb-3 ltr:text-left rtl:text-right">
                        {lang === 'ar' ? 'حملة الانطلاق الرقمية الفيروسية الأولى' : 'First Digital Expansion & Marketing Campaign'}
                      </h5>
                      <p className="text-sm text-[#A39E8C] leading-relaxed whitespace-pre-wrap leading-loose">{result.digitalCampaignIdea}</p>
                    </div>
                  </div>

                  {/* Column 2: Specific visual identity / recommendations (takes 1 col) */}
                  <div className="space-y-6">
                    {/* Visual concept */}
                    <div className="bg-[#080809]/40 p-6 rounded-xl border border-[#FFF6CD]/5 space-y-3 h-fit ltr:text-left rtl:text-right">
                      <h5 className="text-base font-bold text-[#FFD000] border-b border-[#FFF6CD]/5 pb-3 ltr:text-left rtl:text-right">
                        {lang === 'ar' ? 'تجسيد الهوية والاتجاه الفني' : 'Art Direction & Aesthetic Guidelines'}
                      </h5>
                      <p className="text-xs text-[#FFF6CD]/90 leading-relaxed text-justify leading-loose">{result.visualIdentityConcept}</p>
                    </div>

                    {/* Recommended services */}
                    <div className="bg-[#080809]/40 p-6 rounded-xl border border-[#FFF6CD]/5 space-y-3 ltr:text-left rtl:text-right">
                      <h5 className="text-base font-bold text-[#C85A17] border-b border-[#FFF6CD]/5 pb-2 ltr:text-left rtl:text-right">
                        {lang === 'ar' ? 'ركائز الحلول الموصى بها' : 'Recommended Action Pillars'}
                      </h5>
                      <div className="flex flex-col gap-2 pt-2">
                        {result.recommendedServices.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-[#080809]/80 px-3.5 py-2.5 rounded border border-[#FFF6CD]/5 text-xs font-semibold text-[#FFD000] justify-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C85A17] shrink-0" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillars listing */}
                <div className="space-y-4 ltr:text-left rtl:text-right">
                  <h5 className="text-sm uppercase tracking-widest font-semibold text-[#A39E8C] ltr:text-left rtl:text-right">
                    {lang === 'ar' ? 'محاور صناعة الهوية الأساسية الثلاثة' : 'Core Identity Anchors'}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.brandIdentityPillars.map((pillar, idx) => (
                      <div key={idx} className="bg-[#0F1012] p-5 rounded-xl border border-[#FFF6CD]/5 hover:border-[#FFD000]/15 transition-all ltr:text-left rtl:text-right">
                        <div className="w-8 h-8 rounded-full bg-[#C85A17]/10 flex items-center justify-center font-bold text-[#FFD000] text-sm mb-3">
                          {idx + 1}
                        </div>
                        <p className="text-sm font-semibold text-[#FFF6CD] line-clamp-3 leading-relaxed">{pillar}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next steps action advisor call */}
                <div className="p-6 bg-[#C85A17]/15 rounded-xl border border-[#C85A17]/25 flex flex-col sm:flex-row items-center justify-between gap-4 ltr:flex-row rtl:flex-row-reverse">
                  <div className="space-y-1 text-center ltr:text-left rtl:text-right">
                    <h6 className="text-sm font-bold text-[#FFD000]">
                      {lang === 'ar' ? 'هل ترغب في تحويل هذه الرؤية والخطط إلى واقع ملموس؟' : 'Ready to manifest this strategic outline into tangible corporate growth?'}
                    </h6>
                    <p className="text-xs text-[#FFF6CD]/80">
                      {lang === 'ar'
                        ? 'فريق دُسُر المتحدة من المصممين والمنتجين الاستراتيجيين يبسطون هذه الركائز عملياً لنجاح ملموس.'
                        : 'The Dussur Unified collective of designers and strategists is ready to deploy these strategic frameworks into real-world market leadership.'}
                    </p>
                  </div>
                  <a 
                    href="#contact-sec"
                    className="bg-[#FFD000] text-[#080809] hover:bg-[#C85A17] hover:text-[#FFF6CD] cursor-pointer text-xs font-bold px-6 py-3 rounded-lg transition-all shrink-0 text-center"
                  >
                    {lang === 'ar' ? 'تواصل معنا لتطبيق الاستراتيجية' : 'Engage Dussur to Execute'}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
