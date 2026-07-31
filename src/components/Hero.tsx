import React, { useState } from 'react';
import { Send, ShieldAlert, GraduationCap, Flame, AlertTriangle, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { ChannelInfo } from '../types';

interface HeroProps {
  channelInfo: ChannelInfo;
}

export const Hero: React.FC<HeroProps> = ({ channelInfo }) => {
  const [selectedStage, setSelectedStage] = useState<'سادس' | 'متوسطة' | 'جامعي'>('سادس');

  return (
    <section id="hero" className="relative pt-8 pb-16 overflow-hidden heist-grid-bg border-b border-red-950/60">
      {/* Red ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Important Announcement Marquee Banner */}
        {channelInfo.announcement && (
          <div className="mb-8 p-3 bg-red-950/70 border border-red-600/50 rounded-xl flex items-center gap-3 shadow-lg shadow-red-950/40">
            <span className="flex-shrink-0 bg-red-600 text-white p-1.5 rounded-lg animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div className="text-xs sm:text-sm font-semibold text-red-200 line-clamp-1">
              {channelInfo.announcement}
            </div>
            <a
              href="#rules"
              className="mr-auto flex-shrink-0 text-xs bg-red-900/80 hover:bg-red-800 text-white font-bold px-3 py-1.5 rounded-lg border border-red-500/40 transition-colors"
            >
              اقرأ القوانين
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Column: Text & Content (RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 bg-red-950/90 text-red-400 border border-red-700/60 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-inner">
              <Flame className="w-4 h-4 text-red-500 animate-bounce" />
              <span>مقر لاكاسا للدراسة والتحديات الجماعية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-['Readex_Pro']">
              {channelInfo.title}
            </h1>

            <p className="text-lg sm:text-xl font-bold text-red-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <span>"{channelInfo.slogan}"</span>
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              تجمع طلابي متكامل يهدف إلى خلق بيئة دراسية صارمة ونظيفة خالصة للمذاكرة فقط. بدون كلام جانبي، بدون علاقات، وبنظام انضباط حازم لحماية مستقبلك وطموحك الدراسي.
            </p>

            {/* Stages Selector Tabs */}
            <div className="p-4 bg-[#12141c] border border-red-900/30 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <span>اختر مرحلتك الدراسية للتعرف على خدمات القناة:</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['سادس', 'متوسطة', 'جامعي'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      selectedStage === stage
                        ? 'bg-red-600 text-white shadow-md shadow-red-900/60 scale-105'
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {stage === 'سادس' ? 'السادس الإعدادي 🔥' : stage === 'متوسطة' ? 'المرحلة المتوسطة' : 'المرحلة الجامعية'}
                  </button>
                ))}
              </div>

              {/* Stage Specific Note */}
              <div className="pt-1 text-xs text-red-300 bg-red-950/40 p-2.5 rounded-lg border border-red-900/40 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedStage === 'سادس' && 'تغطية شاملة لطلاب السادس: وزاريات، ملازم، ملخصات، ومتابعة يومية عبر قناة @swwrw.'}
                  {selectedStage === 'متوسطة' && 'تحديات مذاكرة يومية، نماذج أسئلة، وتشجيع مستمر لتأسيس معدل عالي.'}
                  {selectedStage === 'جامعي' && 'مساحة دراسية لتنظيم الوقت ومذاكرة المواد الجامعية بدون تشتت.'}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="https://t.me/study_lacasa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-extrabold text-center py-3.5 px-6 rounded-xl shadow-xl shadow-red-950/80 hover:shadow-red-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>الدخول إلى قناة التحديات 🚀</span>
              </a>

              <a
                href="#rules"
                className="flex-1 bg-gray-900 hover:bg-gray-800 border border-red-800/50 text-gray-200 font-bold text-center py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <span>قوانين الكروب الصارمة 📜</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-800/60">
              <div className="text-center p-2 bg-gray-900/60 rounded-lg border border-gray-800">
                <div className="text-lg sm:text-xl font-extrabold text-red-500">100%</div>
                <div className="text-[11px] text-gray-400">دراسة وتحديات</div>
              </div>
              <div className="text-center p-2 bg-gray-900/60 rounded-lg border border-gray-800">
                <div className="text-lg sm:text-xl font-extrabold text-red-500">0%</div>
                <div className="text-[11px] text-gray-400">تراسل خاص أو تشتت</div>
              </div>
              <div className="text-center p-2 bg-gray-900/60 rounded-lg border border-gray-800">
                <div className="text-lg sm:text-xl font-extrabold text-red-500">5+</div>
                <div className="text-[11px] text-gray-400">قنوات وبوتات دمج</div>
              </div>
            </div>

          </div>

          {/* Left Column: Money Heist Cover Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-950 rounded-3xl blur-lg opacity-60"></div>
              
              <div className="relative bg-[#12141c] border-2 border-red-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black">
                
                {/* Header Tag */}
                <div className="bg-red-950 px-4 py-2 border-b border-red-800/60 flex items-center justify-between text-xs font-bold text-red-300">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-red-500" />
                    المقر الرسمي للقناة
                  </span>
                  <span className="bg-red-600/40 text-red-200 px-2 py-0.5 rounded text-[10px]">
                    LA CASA
                  </span>
                </div>

                {/* Main Image */}
                <div className="relative aspect-[16/10] overflow-hidden group">
                  <img
                    src={channelInfo.coverImageUrl}
                    alt="Money Heist La Casa Study"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent"></div>
                  
                  {/* Floating Dalí Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-[#0b0c10]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-600/60 shadow-lg">
                    <img
                      src={channelInfo.avatarUrl}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-red-500 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">البروفيسور الدراسي</div>
                      <div className="text-[10px] text-red-400">خطة النجاح بالسادس</div>
                    </div>
                  </div>
                </div>

                {/* Footer Banner Info inside card */}
                <div className="p-4 space-y-2 text-right">
                  <div className="text-xs text-gray-300 font-semibold leading-relaxed">
                    "الخطة بسيطة: لا تراجع، لا كلام جانبي، والتركيز الكامل على الامتحان الوزاري."
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-gray-800 text-[11px] text-gray-400">
                    <span>البوت الرسمي: <strong className="text-red-400">{channelInfo.botUsername}</strong></span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      متصل الآن
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
