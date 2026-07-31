import React from 'react';
import { Send, Bot, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { ChannelInfo } from '../types';

interface FooterProps {
  channelInfo: ChannelInfo;
}

export const Footer: React.FC<FooterProps> = ({ channelInfo }) => {
  return (
    <footer className="bg-[#07080b] border-t border-red-950 text-gray-400 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-3 text-right">
            <div className="flex items-center gap-3">
              <img
                src={channelInfo.avatarUrl}
                alt="La Casa Mask"
                className="w-10 h-10 rounded-full border border-red-600 object-cover"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-xl font-extrabold text-white font-['Readex_Pro']">
                LA CASA <span className="text-red-600">STUDY</span>
              </h3>
            </div>
            <p className="text-xs text-red-400 font-bold">
              "{channelInfo.slogan}"
            </p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              المنصة والتجمع الأول لطلاب جميع المراحل الدراسية لتطوير مستوى المذاكرة، حل الأسئلة، وتحقيق أفضل النتائج بدون تشتت.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2 text-right">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-['Readex_Pro']">
              روابط التليجرام المباشرة 🔗
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://t.me/study_lacasa" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-red-500" />
                  قناة خدمات الدراسة الرئيسية
                </a>
              </li>
              <li>
                <a href="https://t.me/lacasa66" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-red-500" />
                  قناة الاتصالات والمعلومات @lacasa66
                </a>
              </li>
              <li>
                <a href="https://t.me/Robbery_lacasa" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-red-500" />
                  قناة الإنجازات والسرقات @Robbery_lacasa
                </a>
              </li>
              <li>
                <a href="https://t.me/swwrw" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-red-500" />
                  كل شيء تحتاجه بالسادس @swwrw
                </a>
              </li>
            </ul>
          </div>

          {/* Bot & Support */}
          <div className="md:col-span-3 space-y-3 text-right">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-['Readex_Pro']">
              البوت والأدمنية 🤖
            </h4>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-red-500" />
                <span>{channelInfo.botUsername}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                لإرسال الأسئلة والاستفسارات وحل مشاكل الكروب مباشرة.
              </p>
              <a
                href="https://t.me/lacasa_askbot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-red-400 hover:text-red-300 font-bold underline"
              >
                تواصل مع البوت الآن ←
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <div className="flex items-center gap-1">
            <span>جميع الحقوق محفوظة لقناة لاكاسا للدراسة</span>
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <span>تم التطوير بحب وإتقان لجميع الطلاب</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
