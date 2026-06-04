/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Sparkles, Heart, X, Shield, FileText, Info } from 'lucide-react';
import DussurLogo from './DussurLogo';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const isAr = lang === 'ar';

  return (
    <footer className="w-full pt-12 pb-16 px-6 relative z-10 overflow-hidden">
      {/* Outer bounding luxury container */}
      <div className="max-w-6xl mx-auto bg-[#0F1012] border border-[#FFF6CD]/5 rounded-2xl p-8 md:p-12 space-y-12 shadow-2xl relative">
        
        {/* Subtle grid line backdrop backing */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,90,23,0.04)_0%,transparent_70%)] pointer-events-none select-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Logo brand block (5 columns) with premium English brand logo */}
          <div className={`md:col-span-5 space-y-4 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center select-none ${isAr ? 'justify-start' : 'justify-start'}`}>
              <img 
                src={isAr ? "/logo-en.svg" : "/logo-ar.svg"} 
                alt="Dussur United Logo" 
                className="h-20 md:h-26 w-auto object-contain hover:brightness-110 transition-all drop-shadow-[0_2px_8px_rgba(200,90,23,0.15)]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className={`text-xs text-[#A39E8C] leading-relaxed max-w-sm ${isAr ? 'text-right' : 'text-left'}`}>
               {isAr 
                 ? "نحكم أساس علاماتكم، ونصيغ أفكاركم الإبداعية بوضوح تام، لنبني معاً مستقبلاً تسويقياً راسخاً لا يُهزم ولا يميل مع عاتي الأمواج."
                 : "We anchor the foundations of your brands and craft your creative ideas with absolute clarity, building together a robust marketing future that is undefeated and unyielding against raging waves."}
            </p>
          </div>

          {/* Links Column A (3 columns) */}
          <div className={`md:col-span-3 space-y-3 ${isAr ? 'text-right' : 'text-left'}`}>
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#FFD000]">
              {isAr ? "روابط الوصول السريع" : "Quick Navigation Links"}
            </h5>
            <div className="flex flex-col gap-2.5">
              <a href="#hero-sec" className="text-xs text-[#A39E8C] hover:text-[#FFF6CD] transition-colors decoration-transparent hover:decoration-transparent">
                {isAr ? "البداية والمطلع" : "Home & Top"}
              </a>
              <a href="#about-sec" className="text-xs text-[#A39E8C] hover:text-[#FFF6CD] transition-colors decoration-transparent hover:decoration-transparent">
                {isAr ? "من نحن وعقيدتنا" : "Who We Are & Philosophy"}
              </a>
              <a href="#services-sec" className="text-xs text-[#A39E8C] hover:text-[#FFF6CD] transition-colors decoration-transparent hover:decoration-transparent">
                {isAr ? "منظومة ركائز دُسُر الإستراتيجية" : "Dussur Strategic Pillars"}
              </a>
              <a href="#ai-consultant-sec" className="text-xs text-[#A39E8C] hover:text-[#FFF6CD] transition-colors decoration-transparent hover:decoration-transparent font-medium text-[#FFD000]/90">
                {isAr ? "المستشار الإعلاني الذكي" : "Smart AI Consultant"}
              </a>
            </div>
          </div>

          {/* Newsletter Box Column B (4 columns) */}
          <div className={`md:col-span-4 space-y-3 ${isAr ? 'text-right' : 'text-left'}`}>
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#FFD000]">
              {isAr ? "النشرة الإستراتيجية" : "Strategic Newsletter"}
            </h5>
            <p className="text-xs text-[#A39E8C] leading-normal">
              {isAr 
                ? "السّجل الإبداعي والدروس التسويقية الحصرية؛ تواصل معنا لتبقى مطلعاً:"
                : "The creative registry and exclusive marketing insights. Connect with us to stay informed:"}
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 relative">
              <input 
                type="email" 
                required
                className={`w-full bg-[#080809] border border-[#FFF6CD]/10 focus:border-[#C85A17] rounded-lg px-3.5 py-2.5 text-xs text-[#FFF6CD] outline-none transition-all placeholder-[#A39E8C]/30 ${isAr ? 'text-right' : 'text-left'}`}
                placeholder={isAr ? "بريد الجهة الموقرة" : "Official Corporate Email"}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="px-4 py-2.5 bg-[#C85A17] hover:bg-[#FFD000] text-white hover:text-[#080809] rounded-lg cursor-pointer transition-colors shrink-0"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            
            <AnimatePresence>
              {subscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5 pt-1"
                >
                  <Sparkles className="w-3 h-3 text-[#FFD000]" />
                  {isAr 
                    ? "تم تسجيل بريدك في النشرة بوقار تام." 
                    : "Your email has been registered with utmost prestige."}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Brand secondary links & legal systems row */}
        <div className="pt-8 border-t border-[#FFF6CD]/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          {/* Middle links: Privacy, Terms, Cookies policies */}
          <div className="flex flex-wrap gap-4 items-center justify-center font-semibold text-[#A39E8C]">
            <button 
              onClick={() => setActiveModal('privacy')} 
              className="text-xs hover:text-[#FFD000] transition-colors cursor-pointer animate-none"
            >
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </button>
            <span className="text-white/10 select-none">|</span>
            <button 
              onClick={() => setActiveModal('terms')} 
              className="text-xs hover:text-[#FFD000] transition-colors cursor-pointer animate-none"
            >
              {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
            </button>
            <span className="text-white/10 select-none">|</span>
            <button 
              onClick={() => setActiveModal('cookies')} 
              className="text-xs hover:text-[#FFD000] transition-colors cursor-pointer animate-none"
            >
              {isAr ? "سياسة ملفات الارتباط" : "Cookies Policy"}
            </button>
          </div>

          {/* Social connections */}
          <div className="flex gap-4 items-center justify-center">
            <a href="https://wa.me/966548971306" target="_blank" rel="noopener noreferrer" className="text-xs text-[#A39E8C] hover:text-[#C85A17] hover:underline transition-all">
              {isAr ? "واتساب" : "WhatsApp"}
            </a>
            <a href="#" className="text-xs text-[#A39E8C] hover:text-[#C85A17] hover:underline transition-all">
              {isAr ? "لينكدإن" : "LinkedIn"}
            </a>
            <a href="#" className="text-xs text-[#A39E8C] hover:text-[#C85A17] hover:underline transition-all">
              {isAr ? "سناب شات" : "Snapchat"}
            </a>
            <a href="#" className="text-xs text-[#A39E8C] hover:text-[#C85A17] hover:underline transition-all">
              {isAr ? "المنصة إكس" : "X Platform"}
            </a>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-center sm:text-right">
          <p className="text-[10px] text-[#A39E8C] flex items-center gap-1">
             {isAr 
               ? "جميع الحقوق محفوظة لشركة دُسُر المتحدة © 2026. صنع بشغف نجد وعراقة أبها"
               : "All rights reserved to Dussur United © 2026. Crafted with Najdi passion & Abha heritage"}
            <Heart className="w-3.5 h-3.5 fill-[#C85A17] text-[#C85A17]" />
          </p>
        </div>

      </div>

      {/* LUXURY REGULATORY DIALOG MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop layout mask */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#080809]/95 backdrop-blur-xl pointer-events-auto"
            />

            {/* Premium regulatory card container paper box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#0F1012] border border-[#FFF6CD]/10 w-full max-w-3xl rounded-2xl relative z-10 pointer-events-auto overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header inside modal */}
              <div className="p-6 md:p-8 border-b border-[#FFF6CD]/5 flex items-center justify-between bg-[#111216]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C85A17]/10 flex items-center justify-center border border-[#C85A17]/20 text-[#FFD000]">
                    {activeModal === 'privacy' && <Shield className="w-5 h-5" />}
                    {activeModal === 'terms' && <FileText className="w-5 h-5" />}
                    {activeModal === 'cookies' && <Info className="w-5 h-5" />}
                  </div>
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <h3 className="text-lg font-black text-[#FFF6CD]">
                      {activeModal === 'privacy' && (isAr ? "سياسة الخصوصية لدُسُر" : "Dussur Privacy Policy")}
                      {activeModal === 'terms' && (isAr ? "الشروط والأحكام العامة" : "General Terms & Conditions")}
                      {activeModal === 'cookies' && (isAr ? "سياسة ملفات الارتباط (Cookies)" : "Cookies & Analytics Policy")}
                    </h3>
                    <span className="text-[10px] text-[#A39E8C] font-mono block">
                      {isAr ? "آخر تحديث: يونيو 2026" : "Last updated: June 2026"}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full border border-[#FFF6CD]/10 hover:border-[#FFD000]/30 text-[#A39E8C] hover:text-[#FFF6CD] flex items-center justify-center transition-all cursor-pointer bg-[#080809]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable text block container */}
              <div className={`p-6 md:p-8 overflow-y-auto text-sm leading-relaxed text-[#A39E8C] space-y-6 max-h-[60vh] custom-modal-scrollbar ${isAr ? 'text-right' : 'text-left'}`}>
                {activeModal === 'privacy' && (
                  isAr ? (
                    <div className="space-y-6">
                      <p className="text-[#FFF6CD] font-medium">في دسر، نحترم خصوصية زوار الموقع وعملائنا، ونلتزم بحماية المعلومات التي يتم مشاركتها معنا.</p>
                      
                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">المعلومات التي نجمعها</h4>
                        <p>قد نقوم بجمع المعلومات التالية:</p>
                        <ul className="list-disc list-inside space-y-1.5 pr-4 text-xs">
                          <li>الاسم الكامل لممثل الجهة</li>
                          <li>البريد الإلكتروني للعمل</li>
                          <li>رقم الهاتف للتواصل المباشر</li>
                          <li>اسم الشركة أو المؤسسة وطبيعة النشاط</li>
                          <li>أي معلومات أو ملفات يتم إرسالها عبر نماذج التواصل وتصميم المشاريع</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">كيفية استخدام المعلومات</h4>
                        <p>نستخدم المعلومات من أجل البناء والتمكين الاستراتيجي الفخم:</p>
                        <ul className="list-disc list-inside space-y-1.5 pr-4 text-xs">
                          <li>الرد والاستجابة المباشرة للاستفسارات الواردة</li>
                          <li>تقديم وتقييم الخدمات والحلول المطلوبة</li>
                          <li>تحسين وتطوير تجربة المستخدم وسهولة الاستكشاف</li>
                          <li>التواصل الإداري والاستشاري بشأن المشاريع وأطرام التأسيس</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">حماية البيانات</h4>
                        <p>نتخذ الإجراءات المتقدمة والمناسبة لحماية المعلومات من الوصول غير المصرح به، أو التعديل، أو الإفصاح، أو الإتلاف العشوائي بما يتماشى مع الأنظمة القومية لحوكمة البيانات وحمايتها.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">مشاركة المعلومات</h4>
                        <p>لا تقوم دسر ببيع، أو تأجير، أو مشاركة البيانات الشخصية والسرية مع أي أطراف خارجية إلا عند وجود متطلب قانوني نظامي من الجهات المختصة، أو بموجب موافقة خطية صريحة ومسبقة من صاحب البيانات.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">ملفات الارتباط</h4>
                        <p>قد يستخدم الموقع ملفات الارتباط وتقنيات التحليل الرقمية المتقدمة لتحسين الكفاءة وفهم سلوك الزوار لتقديم تجربة تصفح متجانسة وفاخرة.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">تحديث السياسة</h4>
                        <p>يجوز تحديث هذه السياسة عند الحاجة تماشياً مع اللوائح، وسيتم نشر النسخة المحدثة بمجرد اعتمادها مباشرة عبر هذا الموقع.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">التواصل والاستفسار</h4>
                        <p>لأي استفسارات أو طلبات تتعلق بخصوصية بياناتكم الموقرة وحقوقكم الرقمية، يمكنكم التواصل معنا عبر البريد الإلكتروني الرسمي للشركة.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-[#FFF6CD] font-medium">At Dussur, we respect the privacy of our visitors and clients, and are committed to protecting all data shared with us.</p>
                      
                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Information We Collect</h4>
                        <p>We may collect the following data points:</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-4 text-xs">
                          <li>Full name of the corporate representative</li>
                          <li>Official work email address</li>
                          <li>Direct contact telephone number</li>
                          <li>Company name, entity, and nature of activity</li>
                          <li>Any references or specifications sent via interactive project planners</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">How We Use Information</h4>
                        <p>We leverage gathered insights to engineer sovereign brand positioning:</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-4 text-xs">
                          <li>Responding directly to incoming corporate requests</li>
                          <li>Delivering and evaluating requested branding proposals</li>
                          <li>Optimizing overall user journey flow and digital exploration ease</li>
                          <li>Conducting strategic advisory and timeline planning sessions</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Data Protection</h4>
                        <p>We enforce strict technological mechanisms to protect stored information from unauthorized access, modification, or exposure in alignment with national data governance guidelines.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Data Sharing</h4>
                        <p>Dussur United protects absolute confidentiality. We never sell, lease, or distribute private contact information to third parties except under explicit regulatory orders from local judicial authorities.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Cookies & Analytical Telemetry</h4>
                        <p>This web gateway uses tracking identifiers to calculate traffic load, analyze behavior, and supply suggestions via the dynamic AI Consultant.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Changes to this Policy</h4>
                        <p>We reserve the right to modify this statement periodically to map to updating cybersecurity standards. The latest version is always pinned on this gateway.</p>
                      </div>
                    </div>
                  )
                )}

                {activeModal === 'terms' && (
                  isAr ? (
                    <div className="space-y-6">
                      <p className="text-[#FFF6CD] font-medium">مرحباً بكم في موقع دسر. باستخدام هذا الموقع فإنكم توافقون صراحة على الامتثال للشروط والأحكام التالية:</p>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">استخدام الموقع</h4>
                        <p>يُسمح باستخدام الموقع للاستكشاف والخدمات المشروعة فقط. ويحظر تماماً أي استخدام قد يسبب ضرراً مادياً أو معنوياً للموقع، أو يؤثر على أمنه وكفاءة بنيته البرمجية، أو على تصفح المستخدمين الآخرين.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">الملكية الفكرية والعقائدية</h4>
                        <p>جميع حقوق وبنى المحتويات المعروضة في موقع دسر المتحدة، بما في ذلك النصوص، المخرجات البصرية، التقارير الاستشارية، التصاميم، الصور، الأيقونات الفاخرة، الشعارات وكافة العناصر التوجيهية، هي ملكية حصرية وخاصة لشركة دسر المتحدة أو مرخصة وفقاً لأعلى المعايير ولا يجوز بأي حال من الأحوال نسخها أو استخدامها دون موافقة كتابية صريحة ومسبقة.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">الأعمال والمشاريع المعروضة</h4>
                        <p>المشاريع والحلول المعروضة في ثنايا الموقع هي لأغراض تعريفية وتوثيقية للرؤى الرائدة، وقد يتم تحديثها، أو تعديل تفاصيلها، أو إزالتها في أي وقت بما يتسق مع معايير وخصوصيات منشآت عملائنا الكرام وثبات نجاحاتهم.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">الروابط الخارجية</h4>
                        <p>قد يحتوي الموقع على روابط رقمية تأخذكم لمواقع خارجية موقرة. لا تتحمل دسر المتحدة أي مسؤولية عن موثوقية المحتوى المنشور أو سياسات الخصوصية الخاصة بتلك الكيانات الخارجية.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">حدود المسؤولية</h4>
                        <p>تبذل دسر المتحدة جهوداً منهجية فائقة ودقيقة لضمان صحة وشمولية المعلومات المنشورة عبر منصتها، إلا أنها لا تقدم أي ضمانات مطلقة وخالية التمام بشأن الخلو التام من الأخطاء العابرة، أو الانقطاع البرمجي خارج نطاق إرادتنا.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">التعديلات على البنود</h4>
                        <p>يجوز تحديث هذه الشروط في أي وقت يقتضيه الموقف المنهجي، ويعتبر استمرار تصفحكم للموقع قبولاً صريحاً ومكتمل الأركان بهذه التحديثات.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">القانون والتشريعات المطبقة</h4>
                        <p>تخضع هذه الشروط والأحكام وجميع النزاعات الناشئة عنها، للأنظمة واللوائح القضائية النافذة والمعمول بها في المملكة العربية السعودية.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-[#FFF6CD] font-medium">Welcome to Dussur United. By visiting this platform, you explicitly agree to comply with and be bound by the following Terms of Use:</p>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Usage License</h4>
                        <p>Exploring this website is solely permitted for legitimate strategic inquiries. Any attempts to inject malicious script, compromise code security, or degrade performance for online guests is strictly prohibited.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Sovereign Intellectual Property</h4>
                        <p>All designs, text layouts, structural frameworks, interactive applets, corporate briefs, icons, emblems, graphic alignments, and logos displayed on this gateway are the exclusive property of Dussur United. Reproduction, extraction, or distribution is forbidden without express written authorization.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Accuracy of Publications</h4>
                        <p>Case studies and partner records represent past advisory achievements. We reserve the right to revise displayed modules, description text, or technical metrics at any point to safeguard organizational secrecy.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Liability Limits</h4>
                        <p>Dussur takes absolute care to secure information completeness. However, we hold no liability for transient regional network pauses, external DNS outages, or unintentional visual spelling errors.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Governing Jurisdictions</h4>
                        <p>These terms and any legal motions resulting from use are fully governed by and interpreted under the judicial laws of the Kingdom of Saudi Arabia.</p>
                      </div>
                    </div>
                  )
                )}

                {activeModal === 'cookies' && (
                  isAr ? (
                    <div className="space-y-6">
                      <p className="text-[#FFF6CD] font-medium">يستخدم موقع دسر ملفات الارتباط (Cookies) والتقنيات التحليلية المتقدمة لتهيئة وتوفير مسار تصفح ذكي وفائق السهولة مخصص لتطلعاتكم.</p>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">ما هي ملفات الارتباط؟</h4>
                        <p>هي ملفات نصية صغيرة آمنة ومريحة يتم حفظها جزئياً في متصفحاتكم لتذكر تفضيلات الحوار واستقبال الاقتراحات من المستشار الإعلاني الذكي دون جهد إضافي من جانبكم.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">أغراض استخدام ملفات الارتباط</h4>
                        <p>يتم توظيف هذه الملفات بدقة بالغة وبأقل مشاركة للذاكرة من أجل:</p>
                        <ul className="list-disc list-inside space-y-1.5 pr-4 text-xs">
                          <li>تحليل وتقييم الأداء العام للموقع وسلوك الحركة</li>
                          <li>قياس الكفاءة التشغيلية وأعداد الزوار الكلية للجهة الموقرة</li>
                          <li>تحسين المحتوى والخدمات وتخصيص مستويات العرض</li>
                          <li>تعزيز سرعة الاستجابة وخصوصيات معالجة المشاريع</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-r-2 border-[#C85A17]/50 pr-2">خيارات التحكم</h4>
                        <p>يملك السادة زوارنا الحق التام والتحكم الكامل في ملفات الارتباط عبر أي تعديل بسيط في إعدادات برامج التصفح الخاصة بهم لتعطيلها أو حذفها متى شاؤوا دون أي انقاص في كفاءة العرض الأساسية.</p>
                      </div>

                      <p className="text-[#FFF6CD] text-xs pt-4 italic">إن مواصلة تصفحكم واستخدامكم لموقع دسر يُعد إقراراً وقبولاً وموافقة تامة منكم على توظيف ملفات الارتباط وفق ما نصت عليه هذه السياسة المصانة.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-[#FFF6CD] font-medium">This web application utilizes secure cookies and related tracking tokens to establish a responsive, intelligent, and optimized consulting exploration path.</p>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">What Are Cookies?</h4>
                        <p>Cookies are minute, safe text sequences temporarily cached by your web browser to preserve user context, streamline form submittals, and customize advisor interactions without resetting preferences.</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">Usage Goals</h4>
                        <p>We process cookie tokens to achieve the following outcomes:</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-4 text-xs">
                          <li>Reviewing layout interactions to remove operation friction</li>
                          <li>Tracking aggregate visitor metrics and system traffic trends</li>
                          <li>Preserving active language and scope options</li>
                          <li>Caching AI consultant dialogue logs for consistent assistance</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[#FFD000] font-bold text-base border-l-2 border-[#C85A17]/50 pl-2">User Control Options</h4>
                        <p>Our esteemed visitors maintain full control. You can disable, filter, or delete cookies at any time via your browser settings. Caching adjustments will not impair baseline gateway performance.</p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Close Button Footer action bar */}
              <div className={`p-4 bg-[#111216]/50 border-t border-[#FFF6CD]/5 flex ${isAr ? 'justify-end' : 'justify-end'}`}>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2 bg-[#C85A17] hover:bg-[#FFD000] text-white hover:text-[#080809] rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer animate-none"
                >
                  {isAr ? "إغلاق مستند السياسة" : "Close Document"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
