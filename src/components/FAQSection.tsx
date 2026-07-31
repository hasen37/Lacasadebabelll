import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, HelpCircle, Send } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 bg-[#0b0c10] border-b border-red-950/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-600 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span>إجابات على تساؤلات الطلاب</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Readex_Pro']">
            الأسئلة الشائعة حول القناة والكروبات 💬
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            كل ما تحتاجه لمعرفته حول طريقة الانضمام، نظام الانضباط، والتواصل مع الإدارة.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#12141c] border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-red-600 shadow-xl shadow-red-950/40' : 'border-red-900/30 hover:border-red-700/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg focus:outline-none"
                >
                  <span className="flex items-center gap-3 font-['Readex_Pro']">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0"></span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/60 bg-black/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram Direct CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-red-950 via-[#18090c] to-red-950 rounded-3xl border border-red-700/60 shadow-2xl space-y-4">
          <h3 className="text-2xl font-black text-white font-['Readex_Pro']">
            جاهز للانضمام لسرقة المعدل العالي؟ 🏆
          </h3>
          <p className="text-red-200 text-xs sm:text-sm max-w-xl mx-auto">
            انضم الآن إلى قناة الدراسة الرئيسية واستمتع ببيئة تحفيزية خالصة للمذاكرة والتفوق.
          </p>
          <a
            href="https://t.me/study_lacasa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-xl shadow-red-950 hover:shadow-red-600/50 transition-all text-sm"
          >
            <Send className="w-5 h-5" />
            <span>الانضمام للقناة الرئيسية الآن</span>
          </a>
        </div>

      </div>
    </section>
  );
};
