import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Radio, Sparkles, RefreshCw } from 'lucide-react';
import { ChannelInfo } from '../types';

interface AdminCustomizerModalProps {
  channelInfo: ChannelInfo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedInfo: ChannelInfo) => void;
}

export const AdminCustomizerModal: React.FC<AdminCustomizerModalProps> = ({
  channelInfo,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ChannelInfo>(channelInfo);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#12141c] border-2 border-red-600 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold text-white font-['Readex_Pro']">
              لوحة التحكم وتحديث معلومات لاكاسا
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white hover:bg-red-950"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">عنوان المنصة والقناة:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Slogan */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">الشعار الرسمي (Slogan):</label>
            <input
              type="text"
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Announcement */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">شريط التنبيهات والأخبار العاجلة:</label>
            <textarea
              rows={2}
              value={formData.announcement}
              onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
              className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600"
            ></textarea>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center justify-between">
              <span>رابط صورة الغلاف الرئيسية (Money Heist Cover):</span>
              <span className="text-[10px] text-gray-500">يمكنك وضع أي رابط صورة أونلاين</span>
            </label>
            <input
              type="text"
              value={formData.coverImageUrl}
              onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
              className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 dir-ltr text-left"
            />
          </div>

          {/* Avatar Image URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">رابط صورة الرمزية (Dali Mask Logo):</label>
            <input
              type="text"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 dir-ltr text-left"
            />
          </div>

          {/* Bot Username */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">معرف البوت الرسمي:</label>
            <input
              type="text"
              value={formData.botUsername}
              onChange={(e) => setFormData({ ...formData, botUsername: e.target.value })}
              className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 dir-ltr text-left"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold text-xs"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-950"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات الحية</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
