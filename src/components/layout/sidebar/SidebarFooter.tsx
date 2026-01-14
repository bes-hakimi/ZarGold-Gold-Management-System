'use client';

import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface SidebarFooterProps {
  collapsed: boolean;
  pathname: string;
}

const SidebarFooter = ({ collapsed, pathname }: SidebarFooterProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const isProfileActive = pathname.startsWith('/profile');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="border-t border-gray-200 p-4 space-y-2">

      {/* Profile */}
      <button
        onClick={handleProfile}
        className={clsx(
          'flex items-center space-x-2 w-full p-2 rounded-lg transition',
          isProfileActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-white hover:text-primary-500 hover:bg-primary-100'
        )}
      >
        <User size={20} className="text-current" />
        {!collapsed && <span>پروفایل</span>}
      </button>

      {/* Logout (همیشه danger) */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 w-full text-white hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
      >
        <LogOut size={20} />
        {!collapsed && <span>خروج</span>}
      </button>

    </div>
  );
};

export default SidebarFooter;
