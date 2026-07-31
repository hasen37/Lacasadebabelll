import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, UserX, MessageSquareX, Lock, ShieldCheck, HeartOff, Camera, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RuleItem } from '../types';

interface RulesSectionProps {
  rules: RuleItem[];
}

export const RulesSection: React.FC<RulesSectionProps> = ({ rules }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [pledged, setPledged] = useState(false);

  const getSeverityBadge = (severity: RuleItem['severity'], punishment: string) => {
    switch (severity) {
      case 'extreme':
        return (
          <span className="bg-red-950 text-red-400 border border-red-600 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>عقوبة حازمة: {punishment}</span>
          </span>
        );
      case 'strict':
        return (
          <span className="bg-orange-950 text-orange-400 border border-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            <span>{punishment}</span>
          </span>
        );
      default:
        return (
          <span className="bg-yellow-950 text-yellow-400 border border-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{punishment}</span>
          </span>
        );
    }
  };

  const handlePledge = () => {
    setPledged(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#d90429', '#ff4d6d', '#ffffff'],
    });
  };

  const filteredRules = rules.filter((rule) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'private') return rule.category === 'private';
    if (activeCategory === 'behavior') return rule.category === 'behavior';
    if (activeCategory === 'chat') return rule.category === 'chat';
    return true;
  });

  return (
    <section id="rules" className="py-16 bg-[#0e1017] border-b border-red-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-600 text-red-400 text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-red-950">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>قوانين الكروب والقناة الرسمية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Readex_Pro']">
            دستور لاكاسا للدراسة والتحديات 📜
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            الهدف الأساسي للقناة هو خلق بيئة دراسية خالية تماماً من التشتت والتعارف والمواضيع الجانبية. يرجى قراءة القوانين والالتزام بها.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'جميع القوانين (6)' },
              { id: 'private', label: '🚨 حظر الخاص (مهم جداً)' },
              { id: 'behavior', label: 'الكلام الجانبي والأسلوب' },
              { id: 'chat', label: 'السكرينات والهمسات' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner: Rule #2 (No DMs / الخاص ممنوع نهائياً) */}
        <div className="mb-10 bg-gradient-to-r from-red-950 via-[#18090c] to-red-950 border-2 border-red-600 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/70 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
                <HeartOff className="w-4 h-4" />
                <span>القانون الذهبي: حظر التواصل الخاص</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Readex_Pro']">
                "أنتَ جاي تدرس لو تتعرف؟" 🛑
              </h3>

              <p className="text-red-200 text-sm sm:text-base leading-relaxed font-semibold">
                ممنوع إي أحد يدخل خاص لأحد. الولد إذا دخل أو البنية دخلت إله وكان رد من أي طرف من عندكم راح تنطردون أثنينكم! حتى لو نيتكم دراسة وتحديات.
              </p>

              <div className="p-4 bg-black/50 rounded-xl border border-red-800/60 text-xs sm:text-sm text-gray-300 space-y-2">
                <p className="font-bold text-red-400">💡 لماذا نمنع التراسل الخاص بهذه الشدة؟</p>
                <p>
                  لأننا نعلم تماماً ما يحدث بعدها من علاقات وتعلّق تسبب تشتت الذهن وتدمر مستقبلك الدراسي. كبّر عقلك وعف مشاعرك على صفحة، السادس والمراحل الدراسية مرحلة مصيرية لا تخاطر بها من أجل كلمات عابرة!
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 text-center p-4 bg-red-950/80 rounded-2xl border border-red-700/60 flex flex-col items-center justify-center space-y-3">
              <UserX className="w-16 h-16 text-red-500 animate-pulse" />
              <div className="text-sm font-black text-white">العقوبة المباشرة:</div>
              <div className="text-xs font-bold text-red-300 bg-red-900/90 px-3 py-1.5 rounded-lg border border-red-500/50">
                طرد النهائي للطرفين فوراً بدون إنذار 🚫
              </div>

              <button
                onClick={handlePledge}
                disabled={pledged}
                className={`w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                  pledged
                    ? 'bg-emerald-900/90 text-emerald-300 border border-emerald-500 cursor-default'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/80'
                }`}
              >
                {pledged ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>تم التعهد والالتزام بالقانون 🎖️</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>أتعهد بالالتزام وعدم المراسلة بالخاص 📜</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-[#12141c] rounded-2xl p-6 border border-red-900/40 hover:border-red-600/80 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-red-950 border border-red-700 text-red-400 font-extrabold text-sm flex items-center justify-center">
                    #{rule.number}
                  </span>
                  {getSeverityBadge(rule.severity, rule.punishment)}
                </div>

                <h3 className="text-lg font-bold text-white font-['Readex_Pro']">
                  {rule.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1 text-red-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  منع المخالفات
                </span>
                <a
                  href="#ask-bot"
                  className="text-xs font-bold text-gray-300 hover:text-white underline decoration-red-600"
                >
                  إبلاغ الأدمنية
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Admins Banner */}
        <div className="mt-12 p-6 bg-gray-900/90 border border-red-800/50 rounded-2xl text-center space-y-3">
          <h4 className="text-lg font-bold text-white font-['Readex_Pro']">
            واجهتك مشكلة أو إساءة داخل الكروب؟ 💜
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            تواصل مباشرة مع أحد الأدمنية أو عبر البوت المخصص لحل المشاكل وتلقي الاستفسارات.
          </p>
          <div className="pt-1 flex items-center justify-center gap-3">
            <a
              href="https://t.me/lacasa_askbot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-red-950"
            >
              <MessageSquareX className="w-4 h-4" />
              <span>مراسلة البوت @lacasa_askbot</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
