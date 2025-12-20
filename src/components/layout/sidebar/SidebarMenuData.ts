import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  PlusCircle,
  List,
  UserPlus,
  Bell,
  FilePlus,
  ReceiptText,
  Wallet,
} from 'lucide-react';

export const sidebarMenu = [
  {
    title: 'داشبورد',
    icon: LayoutDashboard,
    link: '/dashboard',
  },
  {
    title: 'محصولات',
    icon: Package,
    submenu: [
      { title: 'اضافه نمودن محصول', icon: PlusCircle, link: '/products/add' },
      { title: 'لیست محصول', icon: List, link: '/products/list' },
    ],
  },
  {
    title: 'فروشات',
    icon: ShoppingBag,
    submenu: [
      { title: 'فروش مورد جدید', icon: PlusCircle, link: '/sales/create' },
      { title: 'لیست فروشات', icon: List, link: '/sales/list' },
    ],
  },
  {
    title: 'مصارف',
    icon: Wallet,
    submenu: [
      { title: 'ثبت مصرف', icon: FilePlus, link: '/consumption/create' },
      { title: 'لیست مصارف', icon: ReceiptText, link: '/consumption/list' },
    ],
  },
  {
    title: 'کاربران',
    icon: Users,
    submenu: [
      { title: 'افزودن کاربر جدید', icon: UserPlus, link: '/users/add' },
      { title: 'لیست کاربران', icon: List, link: '/users/list' },
    ],
  },
  {
    title: 'اعلانات',
    icon: Bell,
    link: '/notifications',
  },
  {
    title: 'گزارشات',
    icon: FileText,
    link: '/reports',
  },
];
