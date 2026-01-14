'use client';
import { useState } from 'react';
import clsx from 'clsx';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import SidebarItem from './SidebarItem';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';


import { sidebarMenuSuperAdmin } from './sidebar-menu/SuperAdmin';
import { sidebarMenuAdmin } from './sidebar-menu/Admin';
import { sidebarMenuStaff } from './sidebar-menu/Staff';
import { sidebarMenuBranch } from './sidebar-menu/Branch';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const toggleCollapse = () => setCollapsed(!collapsed);
  const pathname = usePathname();


  const { userData } = useAuth();
  const role: string = userData?.user?.role || 'superadmin';

  const sidebarMenu =
    role === 'superadmin'
      ? sidebarMenuSuperAdmin
      : role === 'admin'
        ? sidebarMenuAdmin
        : role === 'staff'
          ? sidebarMenuStaff
          : role === 'branch'
            ? sidebarMenuBranch
            : sidebarMenuStaff;

  // اضافه شد ↓↓↓
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <aside
      className={clsx(
        'bg-linear-to-b from-slate-900 h-screen to-gray-900 shadow-sm border-r border-gray-200 flex flex-col justify-between transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarHeader collapsed={collapsed} onToggle={toggleCollapse} />

      <nav className="flex-1 overflow-y-auto px-2 space-y-2 no-scroll pb-4">
        {sidebarMenu.map((item) => (
          <SidebarItem
            key={item.title}
            {...item}
            pathname={pathname}
            collapsed={collapsed}
            isOpen={openMenu === item.title}
            onToggle={() => {
              setOpenMenu(openMenu === item.title ? null : item.title);
            }}
          />
        ))}
      </nav>

      <SidebarFooter collapsed={collapsed} pathname={pathname} />
    </aside>
  );
};

export default Sidebar;
