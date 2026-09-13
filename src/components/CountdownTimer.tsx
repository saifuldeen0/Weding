import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'يوم', value: timeLeft.days },
    { label: 'ساعة', value: timeLeft.hours },
    { label: 'دقيقة', value: timeLeft.minutes },
    { label: 'ثانية', value: timeLeft.seconds },
  ];

  return (
    <div id="countdown-timer-section" className="w-full my-6">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
          الوقت المتبقي حتى ليلة العمر
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl luxury-glass border border-[#d4af37]/30 shadow-inner group hover:border-[#ffd700] transition-colors"
          >
            <span className="font-amiri text-2xl sm:text-3xl font-bold gold-text-gradient drop-shadow-sm tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-[#dcd1be] font-cairo mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
