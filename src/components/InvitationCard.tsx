import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Share2,
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
  RotateCcw,
  Check,
  Heart
} from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { RSVPForm } from './RSVPForm';
import { sound } from '../utils/audio';

interface InvitationCardProps {
  onResetGate: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ onResetGate }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(sound.isMusicPlaying());
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Listen to song play/pause updates from sound manager
    const unsubscribe = sound.onSongStateChange((playing) => {
      setIsMusicPlaying(playing);
    });
    // Check initial state
    setIsMusicPlaying(sound.isMusicPlaying());
    return unsubscribe;
  }, []);

  // Target Wedding Date (Friday, October 23, 2026, 20:30)
  const weddingDate = new Date('2026-10-23T20:30:00');
  const dateFormattedArabic = 'الجمعة، 23 أكتوبر 2026';
  const timeFormattedArabic = 'الساعة 8:30 مساءً';
  const venueName = 'قصر الثريا الملكي للأفراح - القاعة الكبرى';
  const venueLocationUrl = 'https://maps.google.com/?q=Royal+Palace+Wedding+Hall';

  const toggleMusic = () => {
    const playing = sound.toggleSong();
    setIsMusicPlaying(playing);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'دعوة زفاف فاخرة | محمد & فاطمة',
      text: `يسرنا ويشرفنا دعوتكم لحضور حفل زفاف محمد وفاطمة في ${venueName} يوم ${dateFormattedArabic}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Google Calendar link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'حفل زفاف محمد وفاطمة'
  )}&dates=20261023T173000Z/20261023T213000Z&details=${encodeURIComponent(
    'يسرنا ويشرفنا دعوتكم لحضور حفل زفافنا المبارك'
  )}&location=${encodeURIComponent(venueName)}`;

  return (
    <div
      id="screen-invitation-container"
      className="w-full min-h-screen py-10 px-4 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-1000 relative"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #111a2f 0%, #080c16 60%, #030509 100%)',
      }}
    >
      {/* Background Floating Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/10 w-64 h-64 bg-[#fef08a]/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Control Bar */}
      <header className="fixed top-4 left-4 right-4 max-w-4xl mx-auto flex items-center justify-between z-40 pointer-events-auto">
        {/* Left Side: Reset Door */}
        <button
          type="button"
          id="reset-portal-btn"
          onClick={onResetGate}
          title="إعادة غلق البوابة لتجربة الدخول مرة أخرى"
          className="p-2.5 px-4 rounded-full luxury-glass text-[#ffd700] hover:text-white border border-[#d4af37]/50 hover:border-[#ffd700] transition-colors flex items-center gap-2 text-xs font-cairo shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>بوابة الدخول الملكية</span>
        </button>

        {/* Right Side: Rahma Riad Music Player Widget */}
        <div className="flex items-center gap-2">
          <div
            id="rahma-riad-music-badge"
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full luxury-glass border border-[#d4af37] shadow-lg"
          >
            <button
              type="button"
              id="toggle-song-btn"
              onClick={toggleMusic}
              className="w-7 h-7 rounded-full bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#1a1204] flex items-center justify-center hover:scale-105 transition-transform"
              title={isMusicPlaying ? 'إيقاف الأغنية مؤقتاً' : 'تشغيل أغنية رحمة رياض'}
            >
              {isMusicPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>

            <div className="flex flex-col text-right">
              <div className="flex items-center gap-1.5">
                <Music className="w-3 h-3 text-[#ffd700]" />
                <span className="text-[11px] font-bold text-[#fff3cf] font-cairo">
                  رحمة رياض - الكوكب
                </span>
              </div>
              <span className="text-[9px] text-[#cfb06d] font-cairo">
                {isMusicPlaying ? 'الأغنية قيد التشغيل 🎶' : 'انقر للتشغيل'}
              </span>
            </div>

            {/* Equalizer animation */}
            {isMusicPlaying && (
              <div className="flex items-end gap-0.5 h-3.5 ml-1">
                <span className="w-0.5 bg-[#ffd700] rounded-full animate-pulse h-3" />
                <span className="w-0.5 bg-[#ffd700] rounded-full animate-bounce h-3.5" />
                <span className="w-0.5 bg-[#ffd700] rounded-full animate-pulse h-2" />
              </div>
            )}
          </div>

          <button
            type="button"
            id="toggle-mute-btn"
            onClick={toggleMute}
            className="p-2.5 rounded-full luxury-glass text-[#d4af37] hover:text-white border border-[#d4af37]/40 transition-colors shadow-lg"
            title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Glassmorphism Wedding Invitation Card */}
      <main className="w-full max-w-xl mx-auto my-8 mt-16 z-10">
        <div className="relative rounded-3xl luxury-glass p-6 sm:p-10 border border-[#d4af37]/50 shadow-2xl text-center overflow-hidden">
          {/* Ornamental Arabesque Corner Accents */}
          <div className="absolute top-2 left-2 text-[#d4af37]/40 text-lg pointer-events-none select-none">
            ❖
          </div>
          <div className="absolute top-2 right-2 text-[#d4af37]/40 text-lg pointer-events-none select-none">
            ❖
          </div>
          <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-lg pointer-events-none select-none">
            ❖
          </div>
          <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-lg pointer-events-none select-none">
            ❖
          </div>

          {/* Golden Outer Margin Line */}
          <div className="absolute inset-3.5 rounded-[22px] border border-[#d4af37]/20 pointer-events-none" />

          {/* Bismillah Calligraphy Header */}
          <div className="mb-4">
            <span className="font-amiri text-2xl sm:text-3xl text-[#ffd700] drop-shadow-sm font-bold tracking-wider">
              بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Quranic Verse */}
          <div className="relative my-4 max-w-md mx-auto px-4">
            <p className="font-amiri text-sm sm:text-base text-[#ded5c2] leading-relaxed italic">
              "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 opacity-60">
              <span className="h-[1px] w-8 bg-[#d4af37]" />
              <span className="text-[#ffd700] text-xs">سورة الروم</span>
              <span className="h-[1px] w-8 bg-[#d4af37]" />
            </div>
          </div>

          {/* Welcoming Message */}
          <div className="my-6">
            <p className="text-xs sm:text-sm text-[#d1c5ad] font-cairo font-medium mb-1">
              يسرنا ويشرفنا دعوتكم لحضور حفل زفاف
            </p>
            <p className="text-xs text-[#a89b82] font-cairo">
              وتناول طعام العشاء ومشاركتنا فرحتنا الكبرى
            </p>
          </div>

          {/* Bride & Groom Names in Luxurious Calligraphy */}
          <div className="my-6 py-2">
            <div className="inline-flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
              <h1 className="font-amiri text-3xl sm:text-5xl font-bold gold-text-gradient drop-shadow-md">
                محمد العلي
              </h1>
              <span className="font-amiri text-2xl sm:text-3xl text-[#ffd700] float-gentle">
                &
              </span>
              <h1 className="font-amiri text-3xl sm:text-5xl font-bold gold-text-gradient drop-shadow-md">
                فاطمة المنصور
              </h1>
            </div>
          </div>

          {/* Date, Time & Venue Details */}
          <div className="my-6 p-4 rounded-2xl luxury-glass-subtle border border-[#d4af37]/30 max-w-md mx-auto space-y-2.5">
            <div className="flex items-center justify-center gap-2 text-[#fff4d1] font-cairo text-sm sm:text-base font-semibold">
              <Calendar className="w-4 h-4 text-[#ffd700]" />
              <span>{dateFormattedArabic}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#cfc2a8] font-cairo">
              <span className="text-[#ffd700]">✦</span>
              <span>{timeFormattedArabic}</span>
              <span className="text-[#ffd700]">✦</span>
            </div>

            <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#f5eedc] font-cairo">
              <MapPin className="w-4 h-4 text-[#ffd700] shrink-0" />
              <span>{venueName}</span>
            </div>
          </div>

          {/* Real-time Countdown Timer */}
          <CountdownTimer targetDate={weddingDate} />

          {/* Action Buttons: Google Maps & Add to Calendar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto my-6">
            {/* Google Maps Button */}
            <a
              id="google-maps-link"
              href={venueLocationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#aa771c] hover:opacity-95 text-[#140e02] font-cairo font-bold text-xs sm:text-sm shadow-[0_4px_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <MapPin className="w-4 h-4 text-[#140e02]" />
              <span>موقع القاعة على الخريطة</span>
            </a>

            {/* Google Calendar Event Button */}
            <a
              id="add-to-calendar-link"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl luxury-glass-subtle border border-[#d4af37]/50 hover:border-[#ffd700] text-[#fff] font-cairo font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#ffd700]" />
              <span>حفظ الموعد بالتقويم</span>
            </a>
          </div>

          {/* Share Invitation Link Button */}
          <div className="max-w-md mx-auto mb-6">
            <button
              type="button"
              id="share-invitation-btn"
              onClick={handleShare}
              className="w-full py-2.5 px-4 rounded-xl border border-[#d4af37]/30 hover:border-[#d4af37] text-xs text-[#cfc2a8] hover:text-white font-cairo flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#ffd700]" />}
              <span>{copiedLink ? 'تم نسخ رابط الدعوة بنجاح!' : 'مشاركة بطاقة الدعوة مع الأصدقاء'}</span>
            </button>
          </div>

          {/* Interactive RSVP Form */}
          <RSVPForm
            brideGroomNames="محمد العلي & فاطمة المنصور"
            eventDate={`${dateFormattedArabic} - ${timeFormattedArabic}`}
            weddingHostWhatsApp="966501234567"
          />

          {/* Warm Closing Note */}
          <div className="mt-8 pt-6 border-t border-[#d4af37]/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#d4af37]/80 font-amiri text-sm">
              <span>دامت دياركم عامرة بالأفراح والمسرات</span>
              <Heart className="w-3.5 h-3.5 text-[#ffd700] fill-[#ffd700]" />
            </div>
            <p className="text-[11px] text-[#8e8574] font-cairo mt-1">
              الداعون: عائلة العلي & عائلة المنصور
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

