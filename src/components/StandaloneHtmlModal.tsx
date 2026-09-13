import React, { useState } from 'react';
import { Copy, Check, Download, Code, X } from 'lucide-react';
import { getStandaloneWeddingInvitationHtml } from '../utils/standaloneHtml';

interface StandaloneHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneHtmlModal: React.FC<StandaloneHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const fullHtml = getStandaloneWeddingInvitationHtml();

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = fullHtml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding_invitation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl luxury-glass border border-[#d4af37] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#d4af37]/30 bg-[#0d1424]">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h3 className="font-amiri text-lg sm:text-xl font-bold gold-text-gradient">
              كود الصفحة المستقل الكامل (HTML + CSS + JS)
            </h3>
            <Code className="w-5 h-5 text-[#ffd700]" />
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-[#090d18]/90 border-b border-[#d4af37]/20 text-xs text-[#cfc2a8] leading-relaxed font-cairo">
          ملف واحد متكامل (Single-file HTML) يحتوي على جميع التنسيقات (CSS)، الخطوط العربية (Google Fonts)، الأكواد التفاعلية (JS)، محاكي الأصوات، وتطاير الفراشات بدون الحاجة لأي مكتبات أو سيرفر خارجي.
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 overflow-auto p-4 bg-[#04060a] text-left font-mono text-xs text-amber-200/90 leading-normal select-all">
          <pre className="whitespace-pre-wrap break-all">
            {fullHtml.slice(0, 1800)}
            {'\n... [باقي الكود البرمجي الكامل متاح بالنسخ أو التحميل مباشرة]'}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#d4af37]/30 bg-[#0d1424] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#d4af37]/50 text-[#fff] bg-[#182236] hover:bg-[#202c46] transition-colors flex items-center justify-center gap-2 text-xs font-cairo font-semibold cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#ffd700]" />
            <span>تحميل ملف wedding_invitation.html</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#120e02] hover:opacity-95 transition-all flex items-center justify-center gap-2 text-xs font-cairo font-bold shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ الكود بنجاح!' : 'نسخ الكود بالكامل الآن'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
