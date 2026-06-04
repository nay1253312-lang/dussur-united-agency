/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Loader2, Sparkles, Phone, Mail, MapPin, 
  CheckCircle2, X, ClipboardCheck, AlertCircle, RefreshCw 
} from 'lucide-react';
import { ContactMessage } from '../types';
import { useLanguage } from '../LanguageContext';

export default function ContactView() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage(
        lang === 'ar' 
          ? "الرجاء التحقق من تعبئة كافة البيانات الأساسية المرموقة لتلقي الاتصال."
          : "Please check and complete all required prestigious details to initiate contact."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setAiResponse(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 
          (lang === 'ar' 
            ? "تعذَّر استكمال توصيل البيانات للخادم الفني العام لدُسُر."
            : "Could not establish transmission with Dussur's central routing engines.")
        );
      }

      // Handle translated response if present or fallback
      const successfulTransmission = lang === 'ar' 
        ? "تم استلام طلبكم وتوصيله بخوادم الإرساء بنجاح!" 
        : "Your inquiry has been successfully transmitted and anchored!";

      setSuccessMsg(lang === 'ar' ? data.message : successfulTransmission);
      
      // Attempt to provide English tips if we have standard ones, or leave it to server translation
      setAiResponse(data.aiAdvice);
      
      // Clear form inputs on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (err: any) {
      setErrorMessage(
        err.message || 
        (lang === 'ar' 
          ? "حدث تداخل غير متوقع أثناء معالجة الاتصال بخوادم دُسُر المتحدة."
          : "An unexpected routing discrepancy occurred with Dussur Unified central servers.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-sec" className="py-24 relative overflow-hidden px-6 max-w-6xl mx-auto">
      {/* Decorative anchors lights */}
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-[#C85A17]/5 blur-[130px] select-none pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Address Details and Info (5 columns) */}
        <div className="lg:col-span-5 space-y-8 ltr:text-left rtl:text-right">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#FFD000] uppercase tracking-widest block">
              {lang === 'ar' ? 'مجالس التواصل المباشر' : 'Direct Assembly Coordinates'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#FFF6CD]">
              {lang === 'ar' ? 'نسعد بخدمتكم وتأصيل علاماتكم' : 'We anchor your vision to iron-clad foundations'}
            </h2>
            <p className="text-sm text-[#A39E8C] leading-relaxed">
              {lang === 'ar' 
                ? 'فريق دُسُر الاستشاري والإبداعي متواجد دوماً لربط منشأتك بأسس من حديد؛ تواصل معنا لمناقشة مشروعك التسويقي القادم.'
                : 'Dussur\'s elite strategic and design suite is always on watch, ready to tie your milestones to sovereign grounds. Let\'s chart your expansion route.'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Tel */}
            <div className="flex gap-4 items-center bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5 hover:border-[#C85A17]/15 transition-all luxury-breath-flat justify-start">
              <div className="w-10 h-10 rounded-lg bg-[#C85A17]/15 flex items-center justify-center text-[#FFD000] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="ltr:text-left rtl:text-right">
                <span className="text-[10px] text-[#A39E8C] block uppercase tracking-wide">
                  {lang === 'ar' ? 'هاتف الاتصال والواتساب' : 'Inquiries & WhatsApp'}
                </span>
                <span className="text-sm font-semibold text-[#FFF6CD] tracking-wider" style={{ direction: 'ltr', display: 'inline-block' }}>0548971306</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-center bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5 hover:border-[#C85A17]/15 transition-all luxury-breath-flat justify-start">
              <div className="w-10 h-10 rounded-lg bg-[#C85A17]/15 flex items-center justify-center text-[#FFD000] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="ltr:text-left rtl:text-right">
                <span className="text-[10px] text-[#A39E8C] block uppercase tracking-wide">
                  {lang === 'ar' ? 'البريد الإلكتروني المعتمد' : 'Sovereign Digital Mail'}
                </span>
                <span className="text-sm font-semibold text-[#FFF6CD] tracking-wider">info@dussur.com</span>
              </div>
            </div>

            {/* Location */}
            <a 
              href="https://maps.app.goo.gl/xCz45dsGa6UE5g2J9" 
              target="_blank" 
              rel="referrer"
              className="flex gap-4 items-center bg-[#0F1012] p-4 rounded-xl border border-[#FFF6CD]/5 hover:border-[#FFD000]/15 transition-all text-right group decoration-transparent hover:decoration-transparent luxury-breath-flat justify-start"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C85A17]/15 flex items-center justify-center text-[#FFD000] group-hover:bg-[#C85A17] transition-all shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="ltr:text-left rtl:text-right">
                <span className="text-[10px] text-[#A39E8C] block uppercase tracking-wide group-hover:text-[#FFD000] transition-colors">
                  {lang === 'ar' ? 'الموقع والمقر الرئيسي' : 'Headquarters & Location'}
                </span>
                <p className="text-xs md:text-sm font-semibold text-[#FFF6CD] leading-normal leading-relaxed">
                  {lang === 'ar' 
                    ? 'جادة 30 مكتب 12 | أبها طريق الملك عبدالعزيز الحزام الدائري'
                    : 'Jadah 30, Office 12 | Abha, King Abdulaziz Road, Ring Road'}
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Form View (7 columns) */}
        <div className="lg:col-span-7 bg-[#0F1012]/40 rounded-2xl border border-[#FFF6CD]/5 p-6 md:p-8 backdrop-blur-md relative shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-[#FFF6CD] mb-6 border-b border-[#FFF6CD]/5 pb-4 ltr:text-left rtl:text-right">
             {lang === 'ar' ? 'استمارة طلب الاتصال والتأصيل' : 'Inquiry & Brand Anchoring Brief'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-xl text-xs text-red-300 flex items-center gap-2.5 justify-start">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="ltr:text-left rtl:text-right">{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5 ltr:text-left rtl:text-right">
                <label htmlFor="client-name" className="text-xs font-semibold text-[#FFF6CD]/90">
                  {lang === 'ar' ? 'الاسم الكريم بالكامل *' : 'Honored Full Name *'}
                </label>
                <input 
                  type="text"
                  id="client-name"
                  required
                  placeholder={lang === 'ar' ? 'أدخل اسمك الثلاثي' : 'Please type your full name'}
                  className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-xs text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/30 ltr:text-left rtl:text-right"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 ltr:text-left rtl:text-right">
                <label htmlFor="client-email" className="text-xs font-semibold text-[#FFF6CD]/90">
                  {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                </label>
                <input 
                  type="email"
                  id="client-email"
                  required
                  placeholder="name@example.com"
                  className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-xs text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/30 ltr:text-left rtl:text-right"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone */}
              <div className="flex flex-col gap-1.5 ltr:text-left rtl:text-right">
                <label htmlFor="client-phone" className="text-xs font-semibold text-[#FFF6CD]/90">
                  {lang === 'ar' ? 'رقم الجوال (واتساب) *' : 'Mobile Number (WhatsApp) *'}
                </label>
                <input 
                  type="tel"
                  id="client-phone"
                  required
                  placeholder="05xxxxxxxx"
                  className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-xs text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/30 ltr:text-left rtl:text-right"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Service Select options */}
              <div className="flex flex-col gap-1.5 ltr:text-left rtl:text-right">
                <label htmlFor="service-select" className="text-xs font-semibold text-[#FFF6CD]/90">
                  {lang === 'ar' ? 'نوع الركيزة / الخدمة المطلوبة' : 'Pillar Specialty / Area of Need'}
                </label>
                <select 
                  id="service-select"
                  className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-xs text-[#FFF6CD] outline-none transition-all cursor-pointer ltr:text-left rtl:text-right"
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="" disabled>{lang === 'ar' ? 'اختر ركيزتك المنشودة...' : 'Select your desired route...'}</option>
                  <option value="strat">{lang === 'ar' ? 'الركيزة 1: استراتيجية الهوية وتكامل المكانة' : 'Pillar 1: Brand Strategy & Positioning'}</option>
                  <option value="design">{lang === 'ar' ? 'الركيزة 2: ابتكار نظم التصميم والرموز البصرية' : 'Pillar 2: Identity Systems & Visual Codes'}</option>
                  <option value="media">{lang === 'ar' ? 'الركيزة 3: تصميم المنتجات وتجارب الاستخدام UX/UI' : 'Pillar 3: UX/UI & Digital Products'}</option>
                  <option value="social">{lang === 'ar' ? 'الركيزة 4: تصميم وتطوير المواقع والمنصات الفاخرة' : 'Pillar 4: Premium Web Development'}</option>
                  <option value="pr">{lang === 'ar' ? 'الركيزة 5: الذكاء الاصطناعي واستوديو الابتكار' : 'Pillar 5: AI Custom Agents & Labs'}</option>
                  <option value="digital">{lang === 'ar' ? 'الركيزة 6: التسويق بالنمو المتسارع والتحليل' : 'Pillar 6: Growth Strategies & BI'}</option>
                  <option value="print">{lang === 'ar' ? 'الركيزة 7: الإنتاج السينمائي والسرد القصصي' : 'Pillar 7: Cinematic Narrative & Recording'}</option>
                  <option value="adv_campaigns">{lang === 'ar' ? 'الركيزة 8: التخطيط الإستراتيجي والحملات الإعلانية' : 'Pillar 8: Ad Campaigns & Spend Mapping'}</option>
                  <option value="classic_branding">{lang === 'ar' ? 'الركيزة 9: التصميم الإبداعي والهوية المؤسسية' : 'Pillar 9: Classical Corporate Branding'}</option>
                  <option value="classic_prod">{lang === 'ar' ? 'الركيزة 10: الإنتاج المرئي والمحتوى السينمائي' : 'Pillar 10: Video Production & Cinematic Reels'}</option>
                  <option value="social_mgmt">{lang === 'ar' ? 'الركيزة 11: إدارة الشبكات والاتصال الرقمي' : 'Pillar 11: Corporate Social Management'}</option>
                  <option value="pr_events">{lang === 'ar' ? 'الركيزة 12: العلاقات العامة وتنظيم الفعاليات' : 'Pillar 12: Public Relations & VIP Events'}</option>
                  <option value="performance">{lang === 'ar' ? 'الركيزة 13: التسويق الرقمي والأداء العالي' : 'Pillar 13: Paid Media Performance'}</option>
                  <option value="print_ooh">{lang === 'ar' ? 'الركيزة 14: المطبوعات الفاخرة واللوحات الخارجية' : 'Pillar 14: Royal Print & OOH Landmarks'}</option>
                  <option value="other">{lang === 'ar' ? 'الركيزة 15: أخرى / ركيزة مخصصة' : 'Pillar 15: Custom Tailored Pillar Opportunity'}</option>
                </select>
              </div>
            </div>

            {/* Message payload text area */}
            <div className="flex flex-col gap-1.5 ltr:text-left rtl:text-right">
              <label htmlFor="client-message" className="text-xs font-semibold text-[#FFF6CD]/90">
                {lang === 'ar' ? 'تفاصيل فكرتك أو استفسارك الموقر *' : 'Honored Outline of Ideas or Challenges *'}
              </label>
              <textarea 
                id="client-message"
                required
                rows={4}
                placeholder={
                  lang === 'ar' 
                    ? "اكتب لنا تفاصيل مشروعك أو التحديات التسويقية التي تواجهك لنقوم بدراستها قبل الاتصال الهاتفي..."
                    : "Formulate details of your intended expansion area, or existing bottlenecks so our partners can review them prior to scheduling live meetings..."
                }
                className="bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#FFD000] rounded-lg px-4 py-3 text-xs text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/30 resize-none leading-relaxed ltr:text-left rtl:text-right leading-loose bg-[#080809]/80"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FFD000] disabled:opacity-40 text-[#080809] font-bold rounded-lg cursor-pointer hover:bg-[#C85A17] hover:text-[#FFF6CD] transition-all transform hover:-translate-y-0.5 shadow-lg text-xs md:text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#080809]" />
                    <span>{lang === 'ar' ? 'سحب وتوصيل الركائز...' : 'Anchoring Scope Coordinates...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال الطلب واعتماد النطاق' : 'Submit & Secure Request'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Cinematic Diagnosis AI Recommendation Success Overlay Modal */}
      <AnimatePresence>
        {successMsg && aiResponse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#0F1012] border border-[#FFF6CD]/15 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative text-right"
            >
              <div className="p-1 bg-gradient-to-l from-[#C85A17] to-[#FFD000]" />
              
              <div className="p-6 md:p-8 space-y-6 ltr:text-left rtl:text-right">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-[#FFF6CD]/5 flex-row-reverse ltr:flex-row">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FFD000] pulsing-glow" />
                    <h4 className="text-base md:text-lg font-bold text-[#FFD000]">
                      {lang === 'ar' ? 'نصيحة دُسُر الاستراتيجية الأولية' : 'Dussur Co-Pilot Strategic Assessment'}
                    </h4>
                  </div>
                  <button 
                    onClick={() => {
                      setSuccessMsg(null);
                      setAiResponse(null);
                    }}
                    className="w-7 h-7 rounded-full bg-[#080809] border border-[#FFF6CD]/10 flex items-center justify-center text-[#A39E8C] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center md:text-justify py-2 ltr:text-left rtl:text-right">
                  <div className="w-10 h-10 rounded-full bg-emerald-950/20 border border-emerald-500 flex items-center justify-center mx-auto md:mx-0 mb-3 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h5 className="text-base font-bold text-[#FFF6CD]">{successMsg}</h5>
                  <p className="text-xs text-[#A39E8C] mt-1">
                    {lang === 'ar'
                      ? 'لقد درس عقلنا الإعلاني تفاصيل ما كتبته، وصاغ لك هذه المخرجات التوجيهية الفورية:'
                      : 'Our algorithmic model analyzed your inquiry details and formulated these immediate guidelines for your roadmap:'}
                  </p>
                </div>

                {/* AI advice */}
                <div className="bg-[#080809] border border-[#FFF6CD]/5 p-5 rounded-xl space-y-3 relative overflow-hidden ltr:text-left rtl:text-right">
                  <div className="absolute top-2 left-2 text-[8px] font-semibold text-[#C85A17]/70 uppercase tracking-widest select-none">
                     {lang === 'ar' ? 'توصية المنسق الآلي' : 'CO-PILOT PRESCRIPTION'}
                  </div>
                  <p className="text-xs md:text-sm text-[#FFF6CD]/90 leading-relaxed text-justify leading-loose whitespace-pre-wrap">
                    {aiResponse}
                  </p>
                </div>

                {/* Footer notes */}
                <div className="pt-2 flex justify-end">
                  <button 
                    onClick={() => {
                      setSuccessMsg(null);
                      setAiResponse(null);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#FFD000] text-[#080809] font-bold rounded-lg text-xs hover:bg-[#C85A17] hover:text-white transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? 'مفهوم، أشكر دُسُر' : 'Acknowledge Strategic Guidance'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
