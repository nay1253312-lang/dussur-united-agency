/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Calendar, ClipboardCheck, ArrowUpRight, 
  Settings2, Sparkles
} from 'lucide-react';
import { MarketingPillar, BuilderServiceSelection } from '../types';
import { useLanguage } from '../LanguageContext';
import { servicesData } from '../data/servicesData';

export default function ProjectBuilder() {
  const { lang, t } = useLanguage();

  const pillars: MarketingPillar[] = servicesData.map(s => ({
    id: s.id,
    number: s.number,
    title: lang === 'ar' ? s.titleAr : s.titleEn,
    arabicTitle: s.titleAr,
    description: lang === 'ar' ? s.descriptionAr : s.descriptionEn,
    deliverables: lang === 'ar' ? s.deliverablesAr : s.deliverablesEn
  }));

  // Selected state tracker
  const [selectedServices, setSelectedServices] = useState<BuilderServiceSelection[]>([]);
  const [clientName, setClientName] = useState("");
  const [proposalCreated, setProposalCreated] = useState(false);

  // Toggle selection of a service
  const toggleService = (serviceId: string) => {
    const exists = selectedServices.some(s => s.serviceId === serviceId);
    if (exists) {
      setSelectedServices(selectedServices.filter(s => s.serviceId !== serviceId));
    } else {
      setSelectedServices([...selectedServices, {
        serviceId,
        selectedOptions: [...pillars.find(p => p.id === serviceId)!.deliverables], // Select all by default
        timelineWeeks: 3 // Set initial weight
      }]);
    }
  };

  // Toggle deliverable option within selected service
  const toggleDeliverable = (serviceId: string, option: string) => {
    setSelectedServices(selectedServices.map(s => {
      if (s.serviceId === serviceId) {
        const optionExists = s.selectedOptions.includes(option);
        const nextOptions = optionExists 
          ? s.selectedOptions.filter(o => o !== option)
          : [...s.selectedOptions, option];
        
        // Dynamic timeline calculation based on selected options in that category:
        const nextTimeline = Math.max(1, Math.ceil(nextOptions.length * 1.0));

        return {
          ...s,
          selectedOptions: nextOptions,
          timelineWeeks: nextTimeline
        };
      }
      return s;
    }));
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) return;
    setProposalCreated(true);
  };

  // Timeline summing calculations (staggered slightly for realism)
  const totalWeeks = selectedServices.reduce((sum, s) => sum + s.timelineWeeks, 0);
  // Mitigate simple summing for overlapped work tasks
  const calculatedTimeline = selectedServices.length > 1 ? Math.ceil(totalWeeks * 0.70) : totalWeeks;

  return (
    <div className="w-full relative py-12 px-2" id="builder-container">
      <div className="max-w-5xl mx-auto rounded-2xl bg-[#0F1012]/08 border border-[#FFF6CD]/5 backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="p-1 bg-gradient-to-r from-[#FFD000] to-[#C85A17] opacity-75" />

        <div className="p-6 md:p-10">
          <div className="mb-8 pb-6 border-b border-[#FFF6CD]/5 ltr:text-left rtl:text-right">
            <div className="flex items-center gap-2 mb-2 justify-start">
              <Settings2 className="w-4 h-4 text-[#C85A17]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A39E8C]">
                {lang === 'ar' ? 'أول مهندس تفاعلي لنطاق المشاريع' : 'First Interactive Project Scope Architect'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#FFF6CD]">
              {lang === 'ar' ? 'هندسة نطاق مشروعك التسويقي' : 'Engineering Your Project Scope'}
            </h3>
            <p className="text-sm text-[#A39E8C] mt-2">
              {lang === 'ar' 
                ? 'حدد متطلباتك ومخرجاتك من ركائز دُسُر بدقة، لنقوم بحساب الجداول الزمنية وهندسة المخرج المناسب.' 
                : 'Define your desired deliverables from Dussur\'s pillars, and we will package your scope and timelines seamlessly.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!proposalCreated ? (
              <motion.form 
                key="builder-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCreateProposal}
                className="space-y-8"
              >
                {/* Step A: Choose Name */}
                <div className="flex flex-col gap-2 max-w-md ltr:text-left rtl:text-right">
                   <label className="text-sm font-semibold text-[#FFF6CD]">
                     {lang === 'ar' ? 'اسم منشأتك الموقرة أو اسمك الكريم' : 'Name of Your Esteemed Entity or Your Name'}
                   </label>
                   <input 
                     type="text"
                     required
                     className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-sm text-[#FFF6CD] outline-none transition-all ltr:text-left rtl:text-right"
                     placeholder={lang === 'ar' ? 'شريك مستقبل دُسُر' : "Partner of Dussur's Future"}
                     value={clientName}
                     onChange={e => setClientName(e.target.value)}
                   />
                </div>

                {/* Step B: Combined Rakaez Selection Grid */}
                <div className="space-y-6 ltr:text-left rtl:text-right">
                  <label className="text-sm font-bold text-[#FFF6CD] block">
                    {lang === 'ar' ? 'اختر الركائز المطلوبة لتشكيل نطاق التنفيذ مباشرة:' : 'Select required pillars to form your execution scope:'}
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pillars.map((p) => {
                      const isSelected = selectedServices.some(s => s.serviceId === p.id);
                      const currentSelection = selectedServices.find(s => s.serviceId === p.id);

                      return (
                        <div 
                          key={p.id}
                          className={`rounded-xl border transition-all luxury-breath-flat p-4 ${
                            isSelected 
                              ? 'bg-[#121316]/90 border-[#C85A17]/40 ring-1 ring-[#0C0D0E]' 
                              : 'bg-[#080809]/40 border-[#FFF6CD]/5 hover:border-[#FFF6CD]/15'
                          }`}
                        >
                          {/* Inner Header */}
                          <div 
                            className="flex items-center justify-between cursor-pointer select-none"
                            onClick={() => toggleService(p.id)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[#C85A17]">{p.number}.</span>
                              <div className="ltr:text-left rtl:text-right">
                                <h4 className="text-sm md:text-base font-bold text-[#FFF6CD]">{p.title}</h4>
                                <span className="text-[10px] uppercase tracking-wider text-[#A39E8C] font-semibold block">
                                  {p.arabicTitle}
                                </span>
                              </div>
                            </div>
                            
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                              isSelected 
                                ? 'bg-[#FFD000] border-[#FFD000] text-[#080809]' 
                                : 'border-[#FFF6CD]/20 text-transparent'
                            }`}>
                              <Check className="w-3.5 h-3.5 stroke-[4.5]" />
                            </div>
                          </div>

                          {/* Options container when selected */}
                          <AnimatePresence>
                            {isSelected && currentSelection && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden border-t border-[#FFF6CD]/5 bg-[#080809]/40 mt-3 pt-3"
                              >
                                <p className="text-xs text-[#A39E8C] mb-3 leading-relaxed ltr:text-left rtl:text-right">{p.description}</p>
                                <div className="space-y-2">
                                  {p.deliverables.map((deliv, idx) => {
                                    const devSelected = currentSelection.selectedOptions.includes(deliv);
                                    return (
                                      <div 
                                        key={idx}
                                        onClick={() => toggleDeliverable(p.id, deliv)}
                                        className="flex items-center gap-2.5 cursor-pointer text-xs select-none hover:text-[#FFF6CD] transition-colors justify-start"
                                      >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                                          devSelected 
                                            ? 'bg-[#C85A17] border-[#C85A17] text-[#FFF6CD]' 
                                            : 'border-[#FFF6CD]/10 text-transparent'
                                        }`}>
                                          <Check className="w-3 h-3 stroke-[4]" />
                                        </div>
                                        <span className={`ltr:text-left rtl:text-right ${devSelected ? "text-[#FFF6CD]" : "text-[#A39E8C]"}`}>
                                          {deliv}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Config bottom status ribbon */}
                <div className="bg-[#080809]/80 p-5 rounded-xl border border-[#FFF6CD]/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex gap-8 items-center flex-wrap justify-center text-center">
                    <div>
                      <div className="text-[10px] text-[#A39E8C] uppercase tracking-wider font-semibold mb-1">
                        {lang === 'ar' ? 'الركائز المختارة' : 'Selected Pillars'}
                      </div>
                      <div className="text-xl font-bold text-[#FFD000]">
                        {selectedServices.length} {lang === 'ar' ? 'ركائز' : selectedServices.length === 1 ? 'pillar' : 'pillars'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-[#A39E8C] uppercase tracking-wider font-semibold mb-1">
                        {lang === 'ar' ? 'الجدول الزمني التقريبي' : 'Approximate Timeline'}
                      </div>
                      <div className="text-xl font-bold text-[#C85A17] flex items-center gap-1 justify-center">
                        <Calendar className="w-4 h-4 text-[#C85A17]" />
                        {calculatedTimeline > 0 ? (lang === 'ar' ? `${calculatedTimeline} أسبوع` : `${calculatedTimeline} ${calculatedTimeline === 1 ? 'week' : 'weeks'}`) : '—'}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={selectedServices.length === 0}
                    className="flex items-center gap-1.5 px-6 py-3 bg-[#FFD000] disabled:opacity-40 text-[#080809] hover:bg-[#C85A17] hover:text-[#FFF6CD] cursor-pointer font-bold rounded-lg transition-all text-xs"
                  >
                    {lang === 'ar' ? 'تجميع النطاق وبناء وثيقة العمل' : 'Assemble Scope & Generate SOW'}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Step 2: Display Compiled Proposal */
              <motion.div 
                key="proposal-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Header status */}
                <div className="flex items-center justify-between bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl ltr:text-left rtl:text-right">
                  <span className="text-xs text-emerald-200 flex items-center gap-2">
                    <Check className="w-4 h-4 stroke-[3] text-emerald-400" />
                    {lang === 'ar' 
                      ? 'تم تجميع نطاقك الاستراتيجي وهندسة جداوله الزمنية بنجاح.' 
                      : 'Your strategic scope and engineered timelines have been successfully calculated.'}
                  </span>
                  <button 
                    onClick={() => setProposalCreated(false)}
                    className="text-xs font-semibold text-[#FFD000] hover:underline cursor-pointer"
                  >
                    {lang === 'ar' ? 'تعديل النطاق' : 'Modify Scope'}
                  </button>
                </div>

                {/* Corporate Scope Sheet Graphic Paper layout */}
                <div className="bg-[#080809] border border-[#FFF6CD]/5 rounded-xl p-8 relative overflow-hidden space-y-6">
                  {/* Watermarked backdrop design */}
                  <div className="absolute top-4 left-4 text-[9px] font-mono text-[#A39E8C]/25 tracking-widest select-none uppercase">
                    DUSSUR UNITED SCOPE DOCUMENT v1.0
                  </div>

                  {/* Header Title sheet details */}
                  <div className="border-b border-[#FFF6CD]/5 pb-6 space-y-2 ltr:text-left rtl:text-right">
                    <span className="text-[10px] font-semibold text-[#C85A17] uppercase tracking-wider">
                      {lang === 'ar' ? 'وثيقة مبدئية لتحديد أطر العمل وتقدير النطاق' : 'Initial Statement of Scope & Estimated Timelines'}
                    </span>
                    <h4 className="text-2xl font-bold text-[#FFF6CD]">
                      {lang === 'ar' ? 'مشروع: ' : 'Project: '}{clientName || (lang === 'ar' ? "شريك مستقبل دُسُر" : "Dussur Partner")}
                    </h4>
                    
                    <div className="flex gap-4 items-center flex-wrap pt-2">
                      <span className="text-xs text-[#A39E8C]">{lang === 'ar' ? 'تاريخ الإصدار: 2026-06-01' : 'Date of Issue: 2026-06-01'}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFF6CD]/10" />
                      <span className="text-xs text-[#A39E8C]">
                        {lang === 'ar' ? 'الجدول الزمني الكلي التقديري للمسار: ' : 'Estimated Path Overall Timeline: '}
                        <strong className="text-[#FFD000]">
                          {lang === 'ar' ? `${calculatedTimeline} أسبوع` : `${calculatedTimeline} ${calculatedTimeline === 1 ? 'week' : 'weeks'}`}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Config Services Items Loop */}
                  <div className="space-y-6">
                    {selectedServices.map((selection, idx) => {
                      const detail = pillars.find(p => p.id === selection.serviceId)!;
                      return (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#FFF6CD]/5 pb-5 last:border-b-0 last:pb-0 ltr:text-left rtl:text-right">
                          {/* Col 1 */}
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-[#C85A17]">{detail.number}</span>
                            <h5 className="text-sm font-bold text-[#FFF6CD]">{detail.title}</h5>
                            <p className="text-[10px] text-[#A39E8C] font-semibold uppercase">{detail.title}</p>
                            <p className="text-xs text-[#A39E8C] pt-1 font-medium flex items-center gap-1.5">
                              ⌛ {lang === 'ar' ? 'زمن الركيزة: ' : 'Pillar Timeline: '} 
                              {selection.timelineWeeks} {lang === 'ar' ? (selection.timelineWeeks > 2 ? 'أسبوع' : 'أسبوع') : (selection.timelineWeeks === 1 ? 'week' : 'weeks')}
                            </p>
                          </div>
                          
                          {/* Col 2 takes most space */}
                          <div className="md:col-span-2">
                            <span className="text-xs text-[#FFD000] font-semibold block mb-2">
                              {lang === 'ar' ? 'المخرجات والخدمات التفصيلية المستهدفة في النطاق:' : 'Targeted Scope Detailed Deliverables & Roadmap:'}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selection.selectedOptions.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-2 text-xs text-[#FFF6CD]/80 bg-[#0F1012] p-2.5 rounded border border-[#FFF6CD]/5 justify-start">
                                  <ClipboardCheck className="w-3.5 h-3.5 text-[#C85A17] shrink-0" />
                                  <span className="ltr:text-left rtl:text-right leading-relaxed">{opt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Call to action connecting builder setup to contact message form pre-fill */}
                <div className="p-6 bg-gradient-to-l from-[#C85A17]/20 to-[#FFD000]/5 rounded-xl border border-[#C85A17]/20 flex flex-col md:flex-row items-center justify-between gap-6 ltr:text-left rtl:text-right">
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-[#FFD000] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FFD000]" />
                      {lang === 'ar' ? 'اعتمد هذا النطاق مع فريق دُسُر للتنفيذ بوقار' : 'Submit This Scope to the Dussur Execution Team'}
                    </h5>
                    <p className="text-xs text-[#A39E8C]">
                      {lang === 'ar' 
                        ? 'عند الضغط على الزر، سيتم تسجيل نطاقك بالخادم ومطابقتها بهوية تواصلك مباشرة.' 
                        : 'Clicking this button maps your calculated scope details seamlessly into our live communication form below.'}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        // Prefill chosen service context inside standard message of contact-form
                        const messageInput = document.getElementById("client-message") as HTMLTextAreaElement | null;
                        const serviceSelect = document.getElementById("service-select") as HTMLSelectElement | null;
                        const nameInput = document.getElementById("client-name") as HTMLInputElement | null;
                        
                        if (messageInput) {
                          const deliverablesText = selectedServices.map(s => {
                            const p = pillars.find(pil => pil.id === s.serviceId)!;
                            return `- ${p.title} (${s.selectedOptions.join(", ")})`;
                          }).join("\n");
                          
                          if (lang === 'ar') {
                            messageInput.value = `أرغب بمناقشة مشروعنا معكم في دُسُر المتحدة. لدينا نطاقة مهندسة كالتالي:\nاسم المنشأة: ${clientName}\nالنطاق:\n${deliverablesText}\nالزمن المقدر: ${calculatedTimeline} أسبوع.`;
                          } else {
                            messageInput.value = `I'd like to consult Dussur regarding our brand expansion. We have engineered the following scope:\nEntity Name: ${clientName}\nCalculated Scope:\n${deliverablesText}\nEstimated Timeline: ${calculatedTimeline} weeks.`;
                          }
                          const event = new Event('input', { bubbles: true });
                          messageInput.dispatchEvent(event);
                        }
                        if (serviceSelect) {
                          const targetVal = selectedServices.length > 0 ? selectedServices[0].serviceId : "other";
                          serviceSelect.value = targetVal;
                          const event = new Event('change', { bubbles: true });
                          serviceSelect.dispatchEvent(event);
                        }
                        if (nameInput && clientName) {
                          nameInput.value = clientName;
                          const event = new Event('input', { bubbles: true });
                          nameInput.dispatchEvent(event);
                        }

                        // Scroll cleanly to form
                        const target = document.getElementById("contact-sec");
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-6 py-3 bg-[#FFD000] hover:bg-[#C85A17] text-[#080809] hover:text-[#FFF6CD] font-bold rounded-lg text-xs cursor-pointer transition-all"
                    >
                      {lang === 'ar' ? 'تضمين البيانات في نموذج الاتصال' : 'Map Options to Contact Form'}
                    </button>
                    
                    <button 
                      onClick={() => window.print()}
                      className="px-5 py-3 border border-[#FFF6CD]/10 text-[#FFF6CD] hover:bg-neutral-900 font-bold rounded-lg text-xs cursor-pointer transition-all"
                    >
                      {lang === 'ar' ? 'تحميل الوثيقة' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
