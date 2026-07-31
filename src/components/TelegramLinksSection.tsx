import React, { useState } from 'react';
import { Send, Radio, BookOpen, Bot, Trophy, GraduationCap, Copy, Check, ExternalLink, Sparkles, Image as ImageIcon, Edit2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TelegramLinkItem } from '../types';

interface TelegramLinksSectionProps {
  links: TelegramLinkItem[];
  onUpdateLink?: (id: string, newUrl: string, newTitle: string) => void;
}

export const TelegramLinksSection: React.FC<TelegramLinksSectionProps> = ({ links, onUpdateLink }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'study' | 'bot' | 'sixth'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio':
        return <Radio className="w-6 h-6 text-red-500" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-red-500" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-red-500" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-red-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-red-500" />;
      default:
        return <Send className="w-6 h-6 text-red-500" />;
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d90429', '#ef233c', '#ffffff'],
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredLinks = links.filter((link) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'study') return link.category === 'study' || link.category === 'main';
    if (activeFilter === 'bot') return link.category === 'bot';
    if (activeFilter === 'sixth') return link.category === 'sixth' || link.category === 'achievements';
    return true;
  });

  const handleSaveEdit = (id: string) => {
    if (onUpdateLink && editUrl.trim() && editTitle.trim()) {
      onUpdateLink(id, editUrl, editTitle);
      setEditingId(null);
    }
  };

  return (
    <section id="telegram-links" className="py-16 bg-[#0b0c10] border-b border-red-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-700/60 text-red-400 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <Send className="w-4 h-4 text-red-500" />
            <span>شبكة قنوات وبوتات لاكاسا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Readex_Pro']">
            روابط القنوات والخدمات المباشرة 🔗
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            اضغط على أي زر للانتقال المباشر إلى التليجرام أو انسخ رابط القناة لمشاركته مع زملائك في الدراسة.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'جميع الروابط' },
              { id: 'study', label: 'قنوات الدراسة والاتصالات' },
              { id: 'bot', label: 'بوت الاستفسارات' },
              { id: 'sixth', label: 'السادس والإنجازات' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                    : 'bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Links Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link) => (
            <div
              key={link.id}
              className={`group relative bg-[#12141c] rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                link.isBot
                  ? 'border-red-600 shadow-xl shadow-red-950/50 glow-red'
                  : 'border-red-900/30 hover:border-red-600/60 shadow-lg'
              }`}
            >
              {/* Badge */}
              {link.badge && (
                <div className="absolute top-4 left-4 bg-red-950 text-red-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-red-700/50 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-500" />
                  <span>{link.badge}</span>
                </div>
              )}

              {/* Header Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-red-950/80 rounded-xl border border-red-700/50 group-hover:scale-110 transition-transform">
                  {getIcon(link.iconName)}
                </div>
                <div className="pr-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors font-['Readex_Pro']">
                    {link.title}
                  </h3>
                  <span className="text-xs text-red-400 font-mono dir-ltr block mt-0.5">
                    {link.url.replace('https://', '')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 min-h-[40px]">
                {link.description}
              </p>

              {/* Edit Mode Inline */}
              {editingId === link.id ? (
                <div className="space-y-2 p-3 bg-gray-900 rounded-xl border border-red-600 mb-4 text-xs">
                  <div>
                    <label className="text-gray-400 font-bold block mb-1">اسم القناة/البوت:</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded px-2 py-1 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-bold block mb-1">الرابط:</label>
                    <input
                      type="text"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded px-2 py-1 text-white dir-ltr text-left"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleSaveEdit(link.id)}
                      className="bg-red-600 text-white font-bold px-3 py-1 rounded hover:bg-red-500"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-800 text-gray-300 font-bold px-3 py-1 rounded hover:bg-gray-700"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-800/80">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>انتقال للتليجرام</span>
                </a>

                <button
                  onClick={() => handleCopy(link.id, link.url)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                    copiedId === link.id
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                      : 'bg-gray-900 border-gray-800 text-gray-300 hover:text-white hover:border-red-600'
                  }`}
                  title="نسخ رابط التليجرام"
                >
                  {copiedId === link.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="hidden sm:inline">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">نسخ</span>
                    </>
                  )}
                </button>

                {onUpdateLink && (
                  <button
                    onClick={() => {
                      setEditingId(link.id);
                      setEditUrl(link.url);
                      setEditTitle(link.title);
                    }}
                    className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-600"
                    title="تعديل الرابط"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
