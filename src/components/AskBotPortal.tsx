import React, { useState } from 'react';
import { Bot, Send, HelpCircle, Check, Copy, Sparkles, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AskBotPortal: React.FC = () => {
  const [studentStage, setStudentStage] = useState<'سادس إعدادي' | 'متوسطة' | 'جامعي'>('سادس إعدادي');
  const [subject, setSubject] = useState<string>('رياضيات');
  const [questionText, setQuestionText] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const subjectsList = ['رياضيات', 'فيزياء', 'كيمياء', 'أحياء', 'اللغة العربية', 'اللغة الإنكليزية', 'التربية الإسلامية', 'استفسار عام'];

  const handleFormatAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const formattedQuery = `📚 *استفسار دراسي - لاكاسا للدراسة*\n👤 المرحلة: ${studentStage}\n📘 المادة: ${subject}\n❓ السؤال: ${questionText.trim()}\n\n🔗 عبر منصة لاكاسا للدراسة: https://t.me/study_lacasa`;

    navigator.clipboard.writeText(formattedQuery);
    setSubmittedMessage(formattedQuery);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#d90429', '#ef233c', '#ffffff'],
    });

    // Open telegram bot link
    window.open('https://t.me/lacasa_askbot', '_blank');
  };

  return (
    <section id="ask-bot" className="py-16 bg-[#0e1017] border-b border-red-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-600 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            <Bot className="w-4 h-4 text-red-500" />
            <span>تجمع أسئلة الطلاب والبوت الرسمي</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Readex_Pro']">
            أرسل سؤالك إلى @lacasa_askbot 🤖
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            هل لديك سؤال دراسي أو تحتاج إلى ملزمة أو استفسار؟ صِغ سؤالك هنا ليتم تنسيقه وإرساله مباشرة لبوت التواصل والأسئلة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#12141c] border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-sm font-extrabold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-500" />
                صياغة السؤال العلمي
              </span>
              <span className="text-xs text-red-400 font-bold bg-red-950 px-2.5 py-1 rounded-md border border-red-800/50">
                البوت الرسمي: @lacasa_askbot
              </span>
            </div>

            <form onSubmit={handleFormatAndSend} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stage */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">المرحلة الدراسية:</label>
                  <select
                    value={studentStage}
                    onChange={(e) => setStudentStage(e.target.value as any)}
                    className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="سادس إعدادي">السادس الإعدادي (علمي/أدبي)</option>
                    <option value="متوسطة">المرحلة المتوسطة</option>
                    <option value="جامعي">المرحلة الجامعية</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">المادة الدراسية:</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600"
                  >
                    {subjectsList.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Textarea */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">نص السؤال أو الاستفسار بالتفصيل:</label>
                <textarea
                  rows={5}
                  placeholder="اكتب سؤالك هنا (مثال: أحتاج مراجعة مركزة لوزاريات الفيزياء الفصل الثاني أو توضيح في موضوع النفي بالعربي)..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 leading-relaxed"
                ></textarea>
              </div>

              {/* Notice */}
              <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  عند الضغط على الزر، سيتم نسخ صيغة السؤال تلقائياً وفتح البوت <strong>@lacasa_askbot</strong> لتقوم بإرساله مباشرة إلى الأدمنية.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-xl shadow-red-950 flex items-center justify-center gap-2 text-sm transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />
                <span>تنسيق السؤال وإرساله للبوت @lacasa_askbot 🚀</span>
              </button>

            </form>

            {submittedMessage && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-600/60 rounded-2xl text-xs space-y-2">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  تم نسخ الصيغة وتوجيهك إلى البوت بنجاح!
                </div>
                <pre className="bg-black/60 p-3 rounded-lg text-gray-300 font-mono text-[11px] whitespace-pre-wrap border border-gray-800">
                  {submittedMessage}
                </pre>
              </div>
            )}

          </div>

          {/* Info Side: Question Guidelines & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#12141c] border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Readex_Pro']">
                <BookOpen className="w-5 h-5 text-red-500" />
                إرشادات طرح الأسئلة في القناة
              </h3>

              <ul className="space-y-3 text-xs text-gray-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 text-red-400 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>حَدِّد المادة والمرحلة الدراسية بدقة لسهولة توجيه السؤال للأستاذ المختص.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 text-red-400 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>تجنب الأسئلة العامة جداً؛ حدد الفصل أو التمرين أو النقطة غير الواضحة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 text-red-400 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>لإرسال صور التمارين أو الوزاريات، يمكنك إرسال الصورة مباشرة للبوت @lacasa_askbot.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-gray-800 space-y-2">
                <div className="text-xs font-bold text-white">قناة كل شيء تحتاجه بالسادس:</div>
                <a
                  href="https://t.me/swwrw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 hover:bg-gray-800 border border-red-800/50 rounded-xl flex items-center justify-between text-xs text-red-400 font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    زيارة قناة السادس الشاملة @swwrw
                  </span>
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
