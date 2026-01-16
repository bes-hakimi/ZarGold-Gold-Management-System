'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import DeviceDetector from '../DeviceDetector';

const DateTimeDisplay = () => {
  const [currentDateAF, setCurrentDateAF] = useState<string>(''); // افغانی
  const [currentDateEN, setCurrentDateEN] = useState<string>(''); // میلادی
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateDateTime = () => {
      const now = new Date();

      // تاریخ افغانی / فارسی
      const dateOptionsAF: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setCurrentDateAF(now.toLocaleDateString('fa-AF', dateOptionsAF));

      // تاریخ میلادی
      const dateOptionsEN: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      setCurrentDateEN(now.toLocaleDateString('en-US', dateOptionsEN));

      // ساعت (انگلیسی، 24 ساعته)
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );

    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 w-full">

      {/* تاریخ افغانی */}
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-primary-400" />
        <span className="text-text-secondary pb-1">تاریخ (هجری):</span>
        <span className="font-bold pb-1">{currentDateAF}</span>
      </div>

      {/* تاریخ میلادی */}
      <div className="flex items-center md:justify-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-primary-400" />
        <span className="text-text-secondary pb-1">تاریخ (میلادی):</span>
        <span className="font-bold pb-1">{currentDateEN}</span>
      </div>

      {/* ⏱ ساعت – مشابه MarketSummaryHeader */}
      <div className="flex items-center md:justify-end gap-2 mb-2">
        <Clock className="w-5 h-5 text-primary-400" />
        <span className="text-text-secondary pb-1">ساعت:</span>

        <span className="font-bold font-mono pb-1">
          {isClient ? currentTime : '00:00:00'}
        </span>

        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mb-1" />
      </div>
    </div>
  );
};

export default DateTimeDisplay;
