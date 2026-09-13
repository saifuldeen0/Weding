import React, { useState } from 'react';
import { Send, CheckCircle2, User, Users, HeartHandshake } from 'lucide-react';
import { RSVPData } from '../types';

interface RSVPFormProps {
  weddingHostWhatsApp?: string;
  brideGroomNames: string;
  eventDate: string;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({
  weddingHostWhatsApp = '966501234567',
  brideGroomNames,
  eventDate
}) => {
  const [formData, setFormData] = useState<RSVPData>({
    guestName: '',
    attendanceStatus: 'attending',
    companionsCount: 0,
    notes: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWhatsAppRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.guestName.trim()) {
      setErrorMsg('فضلاً أدخل الاسم الكريم لتأكيد الحضور');
      return;
    }

    setErrorMsg('');

    const statusText =
      formData.attendanceStatus === 'attending'
        ? 'يشرفني ويسعدني تأكيد الحضور لحفل الزفاف المبارك 💍✨'
        : 'أعتذر بكل محبة وتقدير لظروف تمنعني من الحضور، وأتمنى للعروسين دوام السعادة والبركة 🤍';

    const companionsText =
      formData.attendanceStatus === 'attending'
        ? formData.companionsCount === 0
          ? 'بدون مرافقين (شخص واحد)'
          : formData.companionsCount === 1
          ? 'مرافق واحد (شخصان)'
          : formData.companionsCount === 2
          ? 'مرافقان (3 أشخاص)'
          : `${formData.companionsCount} مرافقين`
        : 'غير متاح';

    const message =
      `السلام عليكم ورحمة الله وبركاته،\n\n` +
      `دعوة زفاف: ${brideGroomNames}\n` +
      `الموعد: ${eventDate}\n\n` +
      `الاسم الكريم: *${formData.guestName.trim()}*\n` +
      `حالة الحضور: *${statusText}*\n` +
      (formData.attendanceStatus === 'attending' ? `عدد المرافقين: *${companionsText}*\n` : '') +
      (formData.notes.trim() ? `تهنئة / ملاحظة: ${formData.notes.trim()}\n\n` : '\n') +
      `بارك الله لهما وبارك عليهما وجمع بينهما في خير 🕊️✨`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${weddingHostWhatsApp}&text=${encodedMessage}`;

    setIsSuccess(true);

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="rsvp-form-container" className="w-full mt-8 pt-6 border-t border-[#d4af37]/30">
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-2">
          <HeartHandshake className="w-5 h-5 text-[#ffd700]" />
        </div>
        <h3 className="font-amiri text-xl sm:text-2xl font-bold gold-text-gradient">
          تأكيد الحضور (RSVP)
        </h3>
        <p className="text-xs text-[#cfc2a8] font-cairo mt-1">
          يسعدنا مشاركتكم فرحتنا، يرجى تأكيد الحضور للتنظيم والضيافة
        </p>
      </div>

      <form onSubmit={handleWhatsAppRSVP} className="space-y-4 max-w-md mx-auto text-right">
        {/* Guest Name */}
        <div>
          <label htmlFor="guest-name" className="block text-xs font-semibold text-[#f0e6d2] mb-1.5 font-cairo">
            الاسم الكريم *
          </label>
          <div className="relative">
            <input
              id="guest-name"
              type="text"
              required
              placeholder="اكتب اسمك الكريم هنا..."
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              className="w-full px-4 py-3 pl-10 rounded-xl luxury-glass-subtle border border-[#d4af37]/40 text-[#f5eedc] placeholder-[#9a907d] focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] text-sm font-cairo transition-all"
            />
            <User className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Attendance Status Radios */}
        <div>
          <label className="block text-xs font-semibold text-[#f0e6d2] mb-1.5 font-cairo">
            حالة الحضور
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="rsvp-status-attending"
              onClick={() => setFormData({ ...formData, attendanceStatus: 'attending' })}
              className={`py-2.5 px-3 rounded-xl border text-xs font-cairo transition-all flex items-center justify-center gap-1.5 ${
                formData.attendanceStatus === 'attending'
                  ? 'bg-[#d4af37]/20 border-[#ffd700] text-[#fff6d5] shadow-md font-semibold'
                  : 'luxury-glass-subtle border-[#d4af37]/25 text-[#aaa] hover:text-[#eee]'
              }`}
            >
              <span>يشرفني الحضور</span>
              {formData.attendanceStatus === 'attending' && <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd700]" />}
            </button>

            <button
              type="button"
              id="rsvp-status-apologetic"
              onClick={() => setFormData({ ...formData, attendanceStatus: 'apologetic' })}
              className={`py-2.5 px-3 rounded-xl border text-xs font-cairo transition-all flex items-center justify-center gap-1.5 ${
                formData.attendanceStatus === 'apologetic'
                  ? 'bg-red-950/40 border-amber-600/60 text-[#ffe4e4] shadow-md font-semibold'
                  : 'luxury-glass-subtle border-[#d4af37]/25 text-[#aaa] hover:text-[#eee]'
              }`}
            >
              <span>أعتذر بكل مودة</span>
              {formData.attendanceStatus === 'apologetic' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Companions Count (Visible if attending) */}
        {formData.attendanceStatus === 'attending' && (
          <div>
            <label htmlFor="companions-count" className="block text-xs font-semibold text-[#f0e6d2] mb-1.5 font-cairo">
              عدد المرافقين
            </label>
            <div className="relative">
              <select
                id="companions-count"
                value={formData.companionsCount}
                onChange={(e) => setFormData({ ...formData, companionsCount: parseInt(e.target.value, 10) })}
                className="w-full px-4 py-3 pl-10 rounded-xl luxury-glass-subtle border border-[#d4af37]/40 text-[#f5eedc] focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] text-sm font-cairo transition-all appearance-none cursor-pointer bg-[#0f172a]"
              >
                <option value={0} className="bg-[#0b101c] text-[#f5eedc]">شخص واحد فقط (بدون مرافقين)</option>
                <option value={1} className="bg-[#0b101c] text-[#f5eedc]">مرافق واحد (شخصان)</option>
                <option value={2} className="bg-[#0b101c] text-[#f5eedc]">مرافقان (3 أشخاص)</option>
                <option value={3} className="bg-[#0b101c] text-[#f5eedc]">3 مرافقين (4 أشخاص)</option>
                <option value={4} className="bg-[#0b101c] text-[#f5eedc]">4 مرافقين (5 أشخاص)</option>
                <option value={5} className="bg-[#0b101c] text-[#f5eedc]">5 مرافقين أو أكثر</option>
              </select>
              <Users className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Optional Congratulation / Note */}
        <div>
          <label htmlFor="rsvp-notes" className="block text-xs font-semibold text-[#f0e6d2] mb-1.5 font-cairo">
            رسالة تهنئة للعروسين (اختياري)
          </label>
          <textarea
            id="rsvp-notes"
            rows={2}
            placeholder="أجمل التهاني والتبريكات بمناسبة الزفاف المبارك..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 rounded-xl luxury-glass-subtle border border-[#d4af37]/40 text-[#f5eedc] placeholder-[#9a907d] focus:outline-none focus:border-[#ffd700] text-xs font-cairo resize-none"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-amber-300 font-cairo text-center animate-pulse">
            {errorMsg}
          </p>
        )}

        {/* WhatsApp Submit Button */}
        <button
          id="confirm-rsvp-whatsapp-btn"
          type="submit"
          className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] hover:opacity-95 text-white font-cairo font-bold text-sm shadow-[0_4px_20px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>تأكيد الحضور عبر واتساب</span>
        </button>

        {isSuccess && (
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-center">
            <span className="text-xs text-emerald-300 font-cairo">
              تم تجهيز رسالة التأكيد وفتح تطبيق واتساب! شكراً لتشريفكم.
            </span>
          </div>
        )}
      </form>
    </div>
  );
};
