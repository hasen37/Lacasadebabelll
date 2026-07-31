import React, { useState } from 'react';
import { ShieldAlert, Radio, Send, BookOpen, Bot, Award, Menu, X, Settings, Volume2, VolumeX } from 'lucide-react';
import { ChannelInfo } from '../types';

interface HeaderProps {
  channelInfo: ChannelInfo;
  onOpenAdmin: () => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  channelInfo,
  onOpenAdmin,
  audioEnabled,
  setAudioEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/95 backdrop-blur-md border-b border-red-900/40 shadow-lg shadow-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={channelInfo.avatarUrl}
                alt="La Casa Mask"
                className="relative w-12 h-12 rounded-full border-2 border-red-600 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-['Readex_Pro']">
                  LA CASA <span className="text-red-600">STUDY</span>
                </h1>
                <span className="bg-red-950/80 text-red-400 text-xs font-semibold px-2 py-0.5 rounded border border-red-700/50">
                  مقر الدراسة
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                منصة التحديات والأسئلة لجميع المراحل
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => scrollToSection('telegram-links')}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 text-red-500" />
              روابط التليجرام
            </button>
            <button
              onClick={() => scrollToSection('rules')}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-red-500" />
              قوانين الكروب
            </button>
            <button
              onClick={() => scrollToSection('study-vault')}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-red-500" />
              مؤقت المذاكرة
            </button>
            <button
              onClick={() => scrollToSection('ask-bot')}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-red-500" />
              أسئلة الطلاب
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-red-500" />
              الأسئلة الشائعة
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              title={audioEnabled ? 'إيقاف الأصوات التفاعلية' : 'تفعيل الأصوات التفاعلية'}
              className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-red-600 transition-colors"
            >
              {audioEnabled ? <Volume2 className="w-5 h-5 text-red-500" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
            </button>

            {/* Admin Customize Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-red-600 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="تعديل الروابط والمعلومات"
            >
              <Settings className="w-4 h-4 text-red-500" />
              <span className="hidden lg:inline">لوحة التحكم</span>
            </button>

            {/* Direct Telegram Channel Link */}
            <a
              href="https://t.me/study_lacasa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg shadow-md shadow-red-900/50 hover:shadow-red-600/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>انضم للتليجرام</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1017] border-b border-red-900/50 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => scrollToSection('telegram-links')}
            className="w-full text-right px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-red-950/40 rounded-lg flex items-center gap-3"
          >
            <Send className="w-5 h-5 text-red-500" />
            روابط التليجرام والقنوات
          </button>
          <button
            onClick={() => scrollToSection('rules')}
            className="w-full text-right px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-red-950/40 rounded-lg flex items-center gap-3"
          >
            <ShieldAlert className="w-5 h-5 text-red-500" />
            قوانين الكروب والشروط
          </button>
          <button
            onClick={() => scrollToSection('study-vault')}
            className="w-full text-right px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-red-950/40 rounded-lg flex items-center gap-3"
          >
            <BookOpen className="w-5 h-5 text-red-500" />
            غرفة ومؤقت المذاكرة
          </button>
          <button
            onClick={() => scrollToSection('ask-bot')}
            className="w-full text-right px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-red-950/40 rounded-lg flex items-center gap-3"
          >
            <Bot className="w-5 h-5 text-red-500" />
            تجمع أسئلة الطلاب والبوت
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-right px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-red-950/40 rounded-lg flex items-center gap-3"
          >
            <Award className="w-5 h-5 text-red-500" />
            الأسئلة الشائعة
          </button>
          <div className="pt-2">
            <a
              href="https://t.me/study_lacasa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg text-center"
            >
              <Send className="w-5 h-5" />
              انضم لمقر التليجرام الآن
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
