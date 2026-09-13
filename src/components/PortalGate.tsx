import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, KeyRound, Volume2, VolumeX, Music } from 'lucide-react';
import { Butterfly } from '../types';
import { sound } from '../utils/audio';

interface PortalGateProps {
  onUnlock: () => void;
}

export const PortalGate: React.FC<PortalGateProps> = ({ onUnlock }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const clickTimerRef = useRef<number | null>(null);

  // Generate 34 luxurious golden butterflies
  const generateButterflies = () => {
    const items: Butterfly[] = [];
    const colors = [
      '#FFDF73', '#FFD700', '#F5DEB3', '#FFE5B4', '#E6C280', '#D4AF37'
    ];

    for (let i = 0; i < 34; i++) {
      const angle = (Math.PI * 2 * i) / 34 + (Math.random() * 0.4 - 0.2);
      const distance = 260 + Math.random() * 460;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance - 80;

      items.push({
        id: i,
        x: 0,
        y: 0,
        targetX,
        targetY,
        size: 16 + Math.random() * 24,
        delay: Math.random() * 0.25,
        duration: 1.4 + Math.random() * 1.2,
        rotation: (Math.random() - 0.5) * 60,
        scale: 0.8 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setButterflies(items);
  };

  const handleDoorActivate = () => {
    if (isShaking || isOpen) return;

    // Play knocking sound
    sound.playDoorKnock();
    setIsShaking(true);

    // After 400ms shake, butterflies burst out, chimes sound, and Rahma Riad song begins
    setTimeout(() => {
      sound.playMagicChimes();
      sound.playRahmaSong();
      generateButterflies();
      setIsOpen(true);
      setIsShaking(false);

      // Fade out gate smoothly after butterflies disperse
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onUnlock();
        }, 850);
      }, 1800);
    }, 450);
  };

  // Handle double-click for desktop, and touch double-tap for mobile
  const handleDoorClick = () => {
    if (isOpen) return;

    setClickCount((prev) => prev + 1);

    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
    }

    if (clickCount + 1 >= 2) {
      setClickCount(0);
      handleDoorActivate();
    } else {
      clickTimerRef.current = window.setTimeout(() => {
        setClickCount(0);
      }, 400);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        window.clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      id="portal-gate-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #0e1526 0%, #070a13 55%, #020408 100%)'
      }}
    >
      {/* Subtle Background Golden Star Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/6 left-1/5 w-1.5 h-1.5 rounded-full bg-[#d4af37] blur-[1px] animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#fef08a] blur-[1px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#d4af37] blur-[1px] animate-ping" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 right-1/6 w-1 h-1 rounded-full bg-[#e6c280] blur-[1px] animate-pulse" />
      </div>

      {/* Top Header info & audio button */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <button
          id="toggle-audio-gate-btn"
          type="button"
          onClick={toggleSound}
          className="p-3 rounded-full luxury-glass text-[#d4af37] hover:text-[#fff] hover:border-[#d4af37] transition-colors flex items-center gap-2 text-xs font-cairo shadow-lg"
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ffd700]" />}
          <span className="hidden sm:inline">{isMuted ? 'الصوت مكتوم' : 'المؤثرات والأغنية مفعلة'}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="text-center px-4 py-1.5 rounded-full luxury-glass-subtle border border-[#d4af37]/40 flex items-center gap-2">
            <Music className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-[#ffd700] font-semibold font-cairo">
              أغنية الدخول: رحمة رياض
            </span>
          </div>
        </div>
      </div>

      {/* The Royal Arch & Doors Container */}
      <div className="relative flex flex-col items-center justify-center p-4 max-w-sm sm:max-w-md w-full">
        {/* Real Moroccan / Andalusian Arch Frame */}
        <div className="relative w-72 sm:w-84 h-[400px] sm:h-[480px] perspective-1200 flex items-center justify-center">
          {/* Outer Palace Arch Border with Royal Keystone */}
          <div className="absolute -inset-3.5 sm:-inset-4.5 rounded-t-full border-2 border-[#d4af37]/70 shadow-[0_0_45px_rgba(212,175,55,0.3)] pointer-events-none z-20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0c1322] border border-[#d4af37] px-4 py-1 rounded-full text-[11px] text-[#ffd700] font-amiri tracking-widest shadow-lg">
              ✦ قصر الفرح الملكي ✦
            </div>
          </div>

          {/* Glowing Backlight when doors open */}
          <div
            className={`absolute inset-2 rounded-t-full bg-radial from-[#ffe494]/95 via-[#d4af37]/60 to-[#121929] transition-opacity duration-1000 flex flex-col items-center justify-center z-0 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center font-amiri text-[#2a1c02] text-2xl font-bold drop-shadow-md">
              أهلاً بكم في قصر الفرح
            </div>
            <div className="text-xs text-[#523807] font-cairo font-semibold mt-1">
              🎶 بصوت الفنانة رحمة رياض
            </div>
          </div>

          {/* Interactive Palace Door Structure using Real Door Photo */}
          <div
            id="palace-door"
            onClick={handleDoorClick}
            onDoubleClick={handleDoorActivate}
            className={`relative w-full h-full cursor-pointer select-none rounded-t-full overflow-hidden border border-[#d4af37]/50 shadow-2xl flex z-10 ${
              isShaking ? 'door-shaking' : ''
            }`}
            style={{
              background: '#0a0e18',
            }}
          >
            {/* Left Door Leaf (Using Real Left Half of Photograph) */}
            <div
              className="relative w-1/2 h-full border-r border-[#d4af37]/60 overflow-hidden transition-transform duration-1000 origin-left"
              style={{
                transform: isOpen ? 'perspective(1200px) rotateY(-115deg)' : 'none',
                boxShadow: isOpen ? '-10px 0 25px rgba(0,0,0,0.8)' : 'none',
              }}
            >
              <img
                src="/images/royal_palace_door.jpg"
                alt="باب القصر الملكي الحقيقي"
                referrerPolicy="no-referrer"
                className="absolute top-0 bottom-0 left-0 w-[200%] h-full object-cover pointer-events-none transition-transform duration-500 hover:scale-105"
                style={{
                  maxWidth: 'none',
                  objectPosition: 'left center',
                }}
              />
              {/* Subtle Real Wood Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />
              {/* Golden name plaque left */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/70 border border-[#d4af37]/60 text-[11px] text-[#ffd700] font-amiri tracking-wider pointer-events-none backdrop-blur-xs">
                محمد
              </div>
            </div>

            {/* Right Door Leaf (Using Real Right Half of Photograph) */}
            <div
              className="relative w-1/2 h-full border-l border-[#d4af37]/60 overflow-hidden transition-transform duration-1000 origin-right"
              style={{
                transform: isOpen ? 'perspective(1200px) rotateY(115deg)' : 'none',
                boxShadow: isOpen ? '10px 0 25px rgba(0,0,0,0.8)' : 'none',
              }}
            >
              <img
                src="/images/royal_palace_door.jpg"
                alt="باب القصر الملكي الحقيقي"
                referrerPolicy="no-referrer"
                className="absolute top-0 bottom-0 left-0 w-[200%] h-full object-cover pointer-events-none transition-transform duration-500 hover:scale-105"
                style={{
                  maxWidth: 'none',
                  marginLeft: '-100%',
                  objectPosition: 'right center',
                }}
              />
              {/* Subtle Real Wood Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/20 pointer-events-none" />
              {/* Golden name plaque right */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/70 border border-[#d4af37]/60 text-[11px] text-[#ffd700] font-amiri tracking-wider pointer-events-none backdrop-blur-xs">
                فاطمة
              </div>
            </div>

            {/* Center Seam Golden Molding Line */}
            <div
              className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#ffd700] via-[#aa771c] to-[#ffd700] shadow-[0_0_8px_rgba(212,175,55,0.7)] pointer-events-none z-10 transition-opacity duration-500 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>

          {/* 34 Flittering Golden Butterflies exploding in 3D on unlock */}
          {butterflies.map((b) => (
            <div
              key={b.id}
              className="absolute pointer-events-none z-30 transition-all ease-out flex items-center justify-center"
              style={{
                left: '50%',
                top: '50%',
                transform: isOpen
                  ? `translate3d(${b.targetX}px, ${b.targetY}px, 0) scale(${b.scale}) rotate(${b.rotation}deg)`
                  : 'translate3d(0, 0, 0) scale(0)',
                opacity: isOpen ? 0 : 1,
                transitionDuration: `${b.duration}s`,
                transitionDelay: `${b.delay}s`,
              }}
            >
              {/* Fluttering Butterfly SVG */}
              <div className="relative flex items-center justify-center drop-shadow-[0_0_12px_rgba(255,215,0,0.85)]">
                {/* Left Wing */}
                <svg
                  className="butterfly-wing-left"
                  width={b.size}
                  height={b.size}
                  viewBox="0 0 24 24"
                  fill={b.color}
                >
                  <path d="M12 12C10 7 5 3 2 6C-1 9 2 16 12 17C12 17 8 21 6 22C4 23 8 24 12 18Z" />
                </svg>
                {/* Butterfly Body */}
                <div
                  className="w-1 h-3 rounded-full bg-[#523c0b] -mx-0.5 z-10"
                  style={{ height: b.size * 0.55 }}
                />
                {/* Right Wing */}
                <svg
                  className="butterfly-wing-right"
                  width={b.size}
                  height={b.size}
                  viewBox="0 0 24 24"
                  fill={b.color}
                >
                  <path d="M12 12C14 7 19 3 22 6C25 9 22 16 12 17C12 17 16 21 18 22C20 23 16 24 12 18Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Pulsing Instruction Callout */}
        <div className="mt-8 flex flex-col items-center text-center space-y-3">
          <div
            onClick={handleDoorActivate}
            className="royal-pulse cursor-pointer px-6 py-2.5 rounded-full luxury-glass border border-[#d4af37] flex items-center gap-2 group hover:border-[#ffd700] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#ffd700] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-cairo text-sm sm:text-base font-medium text-[#fff6d5] tracking-wide">
              اضغط على الباب مرتين لدخول قصر الفرح
            </span>
          </div>

          <button
            id="open-door-direct-btn"
            type="button"
            onClick={handleDoorActivate}
            className="text-xs text-[#d4af37]/80 hover:text-[#ffd700] underline underline-offset-4 flex items-center gap-1 font-cairo transition-colors pt-1"
          >
            <KeyRound className="w-3.5 h-3.5" />
            أو انقر هنا مباشرة لفتح البوابة الملكية
          </button>
        </div>
      </div>
    </div>
  );
};

