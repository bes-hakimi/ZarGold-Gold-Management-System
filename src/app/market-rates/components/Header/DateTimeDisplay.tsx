'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import DeviceDetector from '../DeviceDetector';

const DateTimeDisplay = () => {
  const [currentDateAF, setCurrentDateAF] = useState<string>(''); // افغانی
  const [currentDateEN, setCurrentDateEN] = useState<string>(''); // میلادی
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // تاریخ افغانی / فارسی
      const dateOptionsAF: Intl.DateTimeFormatOptions = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentDateAF(now.toLocaleDateString('fa-AF', dateOptionsAF));

      // تاریخ میلادی
      const dateOptionsEN: Intl.DateTimeFormatOptions = { 
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      setCurrentDateEN(now.toLocaleDateString('en-US', dateOptionsEN));

      // ساعت
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      };
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
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

      {/* ساعت */}
      <div className="flex items-center md:justify-end gap-2 mb-2">
        <Clock className="w-5 h-5 text-primary-400" />
        <span className="text-text-secondary pb-1">ساعت:</span>
        <span className="font-bold pb-1">{currentTime}</span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
