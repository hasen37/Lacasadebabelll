import React, { useState } from 'react';
import {
  Send,
  Radio,
  BookOpen,
  Bot,
  Trophy,
  GraduationCap,
  ShieldAlert,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  HeartOff,
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  X,
  MessageSquareText,
  Info,
  ChevronLeft,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

import heroImg from './assets/images/la_casa_hero_1785497230120.jpg';
import daliAvatar from './assets/images/dali_mask_avatar_1785497244195.jpg';

export default function App() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showAskBotModal, setShowAskBotModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'study' | 'sixth' | 'bot'>('all');
  const [pledged, setPledged] = useState(false);

  // Ask Bot Form States
  const [studentStage, setStudentStage] = useState('السادس الإعدادي');
  const [subject, setSubject] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [botCopyNotice, setBotCopyNotice] = useState(false);

  // Telegram Direct Links
  const telegramLinks = [
    {
      id: 'main-study',
      title: 'قناة  الدراسة الرئيسية',
      desc: 'القناة الرسمية لتحديات المذاكرة اليومية، النماذج الامتحانية، وجداول تنظيم الوقت لجميع المراحل.',
      url: 'https://t.me/study_lacasa',
      handle: '@study_lacasa',
      category: 'study',
      icon: BookOpen,
      badge: 'القناة الرئيسية 🔥',
      featured: true,
    },
    {
      id: 'sixth-grade',
      title: 'قناة كل شيء تحتاجه بالسادس',
      desc: 'المصدر الأقوى لطلاب السادس الإعدادي: وزاريات، ملازم منقحة، خطط مراجعة مركزة لضمان معدل 100%.',
      url: 'https://t.me/swwrw',
      handle: '@swwrw',
      category: 'sixth',
      icon: GraduationCap,
      badge: 'خاص بالسادس 🎓',
      featured: true,
    },
    {
      id: 'ask-bot',
      title: 'رابط بوت الأسئلة والاستفسارات',
      desc: 'لإرسال أسئلتك الدراسية، ، أو الإبلاغ عن أي مشكلة بالكروب مباشرة للأدمنية.',
      url: 'https://t.me/lacasa_askbot',
      handle: '@lacasa_askbot',
      category: 'bot',
      icon: Bot,
      badge: 'البوت الرسمي 🤖',
      featured: true,
    },
    {
      id: 'achievements',
      title: 'قناة الإنجازات والمهام الدراسية',
      desc: 'كتابة المهام والإنجازات : توثيق ساعات الدراسة اليومية،  .',
      url: 'https://t.me/Robbery_lacasa',
      handle: '@Robbery_lacasa',
      category: 'study',
      icon: Trophy,
      badge: 'سجل الإنجازات 🏆',
      featured: false,
    },
    {
      id: 'telecom',
      title: ' قناة التجمع للاستفسارات العلمية بين الطلبة ',
      desc: 'الاستفسارات العلمية بين الطلبة. والمناقشات الدراسية . والتحديات .',
      url: 'https://t.me/lacasa66',
      handle: '@lacasa66',
      category: 'bot',
      icon: Radio,
      badge: 'الدعم الدراسي📚',
      featured: false,
    },
    {
      id: 'discord',
      title: ' سيرفر الدسكورد الرسمي للقناة ',
      desc: 'الاستفسارات العلمية بين الطلبة. والبثوث الدراسية . والتحديات .',
      url: 'https://discord.gg/MAMMhfKgG4',
      handle: '@discord',
      category: 'bot',
      icon: Radio,
      badge: ' سيرفر الدسكورد📃',
      featured: false,
    },
  ];

  // Rules list
  const rulesList = [
    {
      id: 1,
      title: 'ممنوع الدخول خاص نهائياً (القانون الحاسم) 🛑',
      desc: 'أنتَ جاي تدرس لو تتعرف؟ ممنوع أي ولد أو بنية يدخل خاص لأحد. إذا دخل طرف وجاوبه الطرف الثاني تنطردون أثنينكم! حتى لو نيتكم دراسة وتحديات، خلوا كل اتفاقكم ومواضيعكم بالكروب العام. الخاص يسبب علاقات وتعلّق وبالتالي يدمر مستقبلك ودراستك ، كبّر عقلك واترك مشاعرك على صفحة.',
      severity: 'طرد مباشر ونهائي للطرفين',
      highlight: true,
    },
    {
      id: 2,
      title: 'ممنوع الكلام الجانبي والخارج عن الدراسة 🚫',
      desc: 'الكروب مخصص للتحديات والأسئلة الدراسية فقط. أي كلام جانبي خارج إطار المذاكرة ممنوع منعاً باتاً.',
      severity: 'كتم يوم كامل (24 ساعة)',
      highlight: false,
    },
    {
      id: 3,
      title: 'ممنوع السكرينات وتداول محادثات الكروب 📸',
      desc: 'أي سكرين للمحادثات يوصل للبروفيسور أو الأدمنية، سيتم طرد كافة أعضاء الكروب المشاركين في السكرين حماية للخصوصية.',
      severity: 'طرد كلي لجميع أى أطراف السكرين',
      highlight: false,
    },
    {
      id: 4,
      title: 'ممنوع الهمسات والرسائل المخفية 💬',
      desc: 'الهمسات والرسائل السرية بالكروب غير مسموح بها إطلاقاً لضمان بيئة دراسية ناصعة وشفافة للجميع.',
      severity: 'حظر الرسالة وطرد العضو',
      highlight: false,
    },
    {
      id: 5,
      title: 'ممنوع الكلام عن الطائفية والسياسة 🛑',
      desc: 'الكلام في الطائفية أو السياسة أو الإساءة لأي شخص ممنوع تماماً. تجمعنا علمي وأخوي خالص للنجاح والتفوق.',
      severity: 'طرد مباشر ودائم',
      highlight: false,
    },
    {
      id: 6,
      title: 'الاحترام المتبادل وعدم الإساءة لأي طالب 🤝',
      desc: 'ممنوع إطلاقاً أي إساءة لأي طالب أو عضو. كلكم طلاب وكبار وواعين والهدف دعم بعضنا البعض في مشوار النجاح.',
      severity: 'طرد مباشر بدون إنذار',
      highlight: false,
    },
  ];

  const filteredLinks = telegramLinks.filter((link) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'study') return link.category === 'study';
    if (activeCategory === 'sixth') return link.category === 'sixth';
    if (activeCategory === 'bot') return link.category === 'bot';
    return true;
  });

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d90429', '#ef233c', '#ffffff'],
    });
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handlePledge = () => {
    setPledged(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#d90429', '#ef233c', '#ffffff'],
    });
  };

  const handleSendToBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const formattedQuery = `📚 *استفسار دراسي - لاكاسا للدراسة*\n👤 المرحلة: ${studentStage}\n📘 المادة: ${subject || 'عام'}\n❓ السؤال: ${questionText.trim()}\n\n🔗 عبر منصة لاكاسا: https://t.me/study_lacasa`;

    navigator.clipboard.writeText(formattedQuery);
    setBotCopyNotice(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#d90429', '#ef233c', '#ffffff'],
    });

    setTimeout(() => {
      window.open('https://t.me/lacasa_askbot', '_blank');
      setShowAskBotModal(false);
      setBotCopyNotice(false);
      setQuestionText('');
      setSubject('');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-100 font-['Cairo',sans-serif] selection:bg-red-600 selection:text-white dir-rtl relative overflow-x-hidden pb-12">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-96 bg-red-600/15 blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-red-950/20 blur-[120px] pointer-events-none -z-10"></div>

      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-red-950 via-[#18080b] to-red-950 border-b border-red-800/70 px-4 py-2.5 text-center text-xs text-red-200 flex items-center justify-center gap-2 shadow-lg">
        <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse flex-shrink-0" />
        <span className="font-extrabold text-red-200">
          🚨 تنبيه مهم: المراسلة بالخاص بين الطلاب ممنوع نهائياً وتؤدي للعقوبة والطرد الفوري للطرفين!
        </span>
        <button
          onClick={() => setShowRulesModal(true)}
          className="bg-red-600 hover:bg-red-500 text-white font-black px-3 py-1 rounded-md text-[11px] transition-colors mr-1 shadow"
        >
          اقرأ القوانين 📜
        </button>
      </div>

      {/* Main Single Page Hub */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-6 sm:pt-8 space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-[#0e1017] border-2 border-red-700/80 rounded-3xl p-6 shadow-2xl shadow-red-950/40 relative overflow-hidden text-center space-y-4">
          
          {/* Header Cover Banner */}
          <div className="relative -mx-6 -mt-6 h-36 sm:h-44 overflow-hidden border-b border-red-800/60">
            <img
              src={heroImg}
              alt="La Casa Study Banner"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/50 to-transparent"></div>
          </div>

          {/* Dali Avatar Badge */}
          <div className="relative -mt-16 sm:-mt-20 inline-block">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-red-900 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={daliAvatar}
                alt="Salvador Dali Mask"
                className="relative w-26 h-26 sm:w-28 sm:h-28 rounded-full border-4 border-red-600 object-cover shadow-2xl mx-auto bg-black"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-1 right-1 bg-red-600 text-white p-1.5 rounded-full border-2 border-[#0e1017]" title="موثق">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Titles & Description */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Readex_Pro'] flex items-center justify-center gap-2">
              <span>موقع قناة  لاكاسا الرسمي للدراسة والتحديات</span>
            </h1>
            
            <div className="inline-flex items-center gap-1.5 bg-red-950/80 text-red-400 border border-red-700/60 text-xs font-black px-3.5 py-1 rounded-full shadow-inner">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>هدفنا تحفيز للدراسة علمود كلنا ندرس سوة 💥</span>
            </div>

            <p className="text-xs text-gray-300 max-w-lg mx-auto pt-1 leading-relaxed">
              تجمع دراسي متكامل لجميع المراحل (متوسطة - إعدادية - جامعي). بيئة ناصعة بدون تشتت، بدون كلام جانبي وبدون تعارف.
            </p>
          </div>

          {/* Direct Action Modal Triggers */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-800/80">
            <button
              onClick={() => setShowRulesModal(true)}
              className="w-full bg-red-950/90 hover:bg-red-900 text-red-300 border border-red-700/60 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>دستور الكروب (6 قوانين)</span>
            </button>

            <button
              onClick={() => setShowAskBotModal(true)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700/80 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
            >
              <Bot className="w-4 h-4 text-red-500" />
              <span>طرح سؤال للبوت 🤖</span>
            </button>
          </div>

        </div>

        {/* Categories Bar for Links */}
        <div className="flex items-center justify-between text-xs text-gray-400 font-bold px-1">
          <span className="flex items-center gap-1.5 text-red-400">
            <Send className="w-4 h-4" />
            <span>روابط القنوات والخدمات المباشرة:</span>
          </span>

          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'study', label: 'الدراسة 📚' },
              { id: 'sixth', label: 'السادس 🎓' },
              { id: 'bot', label: 'البوتات 🤖' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Telegram Direct Links Cards Stream */}
        <div className="space-y-3">
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.id}
                className={`group bg-[#0e1017] rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:-translate-y-0.5 space-y-3 ${
                  link.featured
                    ? 'border-red-600/90 shadow-xl shadow-red-950/30'
                    : 'border-gray-800/90 hover:border-red-800/60'
                }`}
              >
                {/* Info Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-red-950/80 rounded-2xl border border-red-700/60 text-red-500 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-extrabold text-white font-['Readex_Pro'] group-hover:text-red-400 transition-colors">
                          {link.title}
                        </h2>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed mt-1">
                        {link.desc}
                      </p>
                    </div>
                  </div>

                  <span className="bg-red-950 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded border border-red-800/40 flex-shrink-0">
                    {link.badge}
                  </span>
                </div>

                {/* Bottom Buttons Bar */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-800/60">
                  <span className="text-xs text-red-400 font-mono font-bold dir-ltr">
                    {link.handle}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
                    >
                      <span>دخول للقناة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleCopyLink(link.url, link.id)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center ${
                        copiedLink === link.id
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                          : 'bg-gray-900 border-gray-800 text-gray-300 hover:text-white hover:border-red-600'
                      }`}
                      title="نسخ الرابط"
                    >
                      {copiedLink === link.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Rule #1 (الخاص ممنوع نهائياً) */}
        <div className="bg-gradient-to-r from-red-950 via-[#18080b] to-red-950 border-2 border-red-600 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between border-b border-red-800/60 pb-2">
            <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded flex items-center gap-1">
              <HeartOff className="w-3.5 h-3.5" />
              <span>القانون الذهبي والأهم بالكروب</span>
            </span>
            <span className="text-xs text-red-300 font-bold">حظر الخاص الفوري 🛑</span>
          </div>

          <h3 className="text-lg font-black text-white font-['Readex_Pro']">
            "أنتَ جاي تدرس لو تتعرف؟ ممنوع إي أحد يدخل خاص لأحد!"
          </h3>

          <p className="text-xs text-red-200 leading-relaxed font-semibold">
            الولد إذا دخل أو البنية دخلت إله وكان رد من أي طرف من عندكم راح تنطردون أثنينكم! حتلو نيتكم دراسة وتحديات، خلوا كل اتفاقكم ومواضيعكم بالتجمع الخاص بالكروب العام. الخاص يسبب علاقات وتعلّق وبالتالي يدمر مستقبلك ودراستك بالسادس، كبّر عقلك وعف مشاعرك على صفحة.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-red-900/60">
            <button
              onClick={handlePledge}
              disabled={pledged}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                pledged
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 cursor-default'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-md'
              }`}
            >
              {pledged ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تم التعهد والالتزام بالقانون 🎖️</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>أتعهد بعدم المراسلة بالخاص نهائياً 📜</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowRulesModal(true)}
              className="text-xs text-red-300 hover:text-white underline font-bold"
            >
              عرض كافة القوانين (6 قوانين) ←
            </button>
          </div>
        </div>

        {/* Quick Ask Bot Express Banner */}
        <div className="bg-[#0e1017] border border-red-900/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div className="space-y-0.5">
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-red-500" />
              <span>عندك سؤال أو استفسار دراسي؟</span>
            </div>
            <div className="text-[11px] text-gray-400">
              أرسل سؤالك لبوت الاستفسارات <strong className="text-red-400">@lacasa_askbot</strong>
            </div>
          </div>

          <button
            onClick={() => setShowAskBotModal(true)}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>كتابة سؤال للبوت</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center pt-6 pb-4 text-xs text-gray-500 space-y-1.5 border-t border-gray-900">
          <p className="font-extrabold text-gray-300">
            موقع لاكاسا الرسمي  للدراسة • La Casa Study Hub 🎓
          </p>
          <p className="text-[11px] text-gray-500">
            جميع الحقوق محفوظة © 2026 لموقع لاكاسا الرسمي للدارسة
            Developer:  Hussein
          </p>
        </footer>

      </div>

      {/* Rules Modal Popup */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0e1017] border-2 border-red-600 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-black text-white font-['Readex_Pro']">
                  قوانين الكروب والقناة الرسمية
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1.5 bg-gray-900 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-right">
              {rulesList.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    rule.highlight
                      ? 'bg-red-950/40 border-red-600'
                      : 'bg-gray-900/80 border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white font-['Readex_Pro']">{rule.title}</span>
                    <span className="bg-red-950 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded border border-red-800/40">
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold py-3 rounded-xl text-xs mt-2 shadow-md"
            >
              فهمت القوانين وأتعهد بالالتزام 📜
            </button>

          </div>
        </div>
      )}

      {/* Ask Bot Modal Popup */}
      {showAskBotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0e1017] border-2 border-red-600 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-black text-white font-['Readex_Pro']">
                  تنسيق سؤال وإرساله للبوت
                </h3>
              </div>
              <button
                onClick={() => setShowAskBotModal(false)}
                className="p-1.5 bg-gray-900 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendToBot} className="space-y-3 text-right">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">المرحلة الدراسية:</label>
                <select
                  value={studentStage}
                  onChange={(e) => setStudentStage(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="السادس الإعدادي">السادس الإعدادي</option>
                  <option value="المرحلة المتوسطة">المرحلة المتوسطة</option>
                  <option value="المرحلة الجامعية">المرحلة الجامعية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">المادة الدراسية:</label>
                <input
                  type="text"
                  placeholder="مثال: رياضيات / فيزياء / عربي..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">السؤال أو الاستفسار:</label>
                <textarea
                  rows={4}
                  placeholder="اكتب سؤالك هنا بوضوح ليتم تنسيقه وإرساله للأدمنية..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-xl p-3 text-xs text-white leading-relaxed"
                ></textarea>
              </div>

              {botCopyNotice && (
                <div className="p-2.5 bg-emerald-950 text-emerald-300 text-xs rounded-xl font-bold border border-emerald-500">
                  ✓ تم تنسيق السؤال محلياً! جاري تحويلك للبوت الآن...
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>نسخ وتوجه إلى البوت @lacasa_askbot 🚀</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
