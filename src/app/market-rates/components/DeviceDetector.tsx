
'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

const DeviceDetector = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  const getDeviceName = () => {
    switch (deviceType) {
      case 'mobile': return 'موبایل';
      case 'tablet': return 'تبلت';
      default: return 'دسکتاپ';
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 ">
        <span className='text-primary-400'>
      {getDeviceIcon()}

        </span>
      <span className='text-gray-700 pb-1'>صفحه‌نمایش {getDeviceName()}</span>
    </div>
  );
};

export default DeviceDetector;