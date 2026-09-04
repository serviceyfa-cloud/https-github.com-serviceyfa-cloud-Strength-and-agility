import React from 'react';
import {
  ShoppingBag,
  Package,
  Tags,
  Image as ImageIcon,
  Settings,
  CircleDot,
  SlidersHorizontal,
} from 'lucide-react';
import { BaseComponentProps } from '../../types';
import { STORE_CONFIG } from '../../constants/config';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

export interface MainLayoutProps extends BaseComponentProps {
  currentPath?: string;
  navigate?: (to: string) => void;
}

interface AppNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const BOTTOM_NAV_ITEMS: AppNavItem[] = [
  { id: 'shop', label: 'المتجر', href: '/shop', icon: ShoppingBag },
  { id: 'products', label: 'المنتجات', href: '/admin/products', icon: Package },
  { id: 'categories', label: 'التصنيفات', href: '/admin/categories', icon: Tags },
  { id: 'media', label: 'الوسائط', href: '/admin/media', icon: ImageIcon },
  { id: 'admin', label: 'الإدارة', href: '/admin', icon: SlidersHorizontal },
];

const SIDEBAR_NAV_ITEMS: AppNavItem[] = [
  { id: 'shop', label: 'المتجر الرئيسي', href: '/shop', icon: ShoppingBag },
  { id: 'products', label: 'إدارة المنتجات', href: '/admin/products', icon: Package },
  { id: 'categories', label: 'التصنيفات', href: '/admin/categories', icon: Tags },
  { id: 'media', label: 'مكتبة الوسائط', href: '/admin/media', icon: ImageIcon },
  { id: 'settings', label: 'إعدادات المتجر', href: '/admin/settings', icon: Settings },
  { id: 'admin', label: 'لوحة التحكم', href: '/admin', icon: SlidersHorizontal },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPath = '/shop', navigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (navigate) {
      navigate(href);
    } else if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '/shop') {
      return currentPath === '/' || currentPath === '/shop';
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <div
      dir={STORE_CONFIG.direction}
      lang={STORE_CONFIG.locale}
      className="min-h-screen flex flex-col md:flex-row bg-[#FAF8F5] text-[#161A18] min-w-[360px]"
    >
      {/* ========================================================================= */}
      {/* Desktop / Tablet: Navigation Rail (تحويل الملاحة لشريط جانبي متسق مع التطبيق) */}
      {/* ========================================================================= */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0 bg-[#FFFFFF] border-l border-[#E5E1DA] min-h-screen sticky top-0 h-screen overflow-y-auto select-none"
        aria-label="شريط تنقل التطبيق"
      >
        {/* ترويسة التطبيق الجانبية */}
        <div className="p-5 border-b border-[#E5E1DA]">
          <a
            href="/shop"
            onClick={(e) => handleLinkClick(e, '/shop')}
            className="flex items-center gap-3 min-h-[48px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1A4736] text-[#FAF8F5] flex items-center justify-center shrink-0 border border-[#14372A]">
              <CircleDot className="w-5 h-5 text-[#9A7B38]" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-[#161A18] leading-tight">
                {STORE_CONFIG.name}
              </span>
              <span className="text-[11px] text-[#4B534E] font-normal leading-none mt-1">
                تطبيق العافية والصحة
              </span>
            </div>
          </a>
        </div>

        {/* قائمة تنقل الشاشات الكبيرة */}
        <nav className="flex-1 p-3 space-y-1.5" aria-label="أقسام التطبيق الرئيسية">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  'min-h-[48px] px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]',
                  active
                    ? 'bg-[#EBF3EF] text-[#1A4736] font-semibold'
                    : 'text-[#4B534E] hover:text-[#161A18] hover:bg-[#FAF8F5]'
                )}
              >
                <Icon
                  className={cn('w-5 h-5 shrink-0', active ? 'text-[#1A4736]' : 'text-[#4B534E]')}
                  strokeWidth={active ? 2.2 : 1.9}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* تذييل جانبي بسيط للشاشات الكبيرة */}
        <div className="p-4 border-t border-[#E5E1DA] text-xs text-[#4B534E]">
          <p className="font-normal leading-relaxed">
            نسخة التطبيق الهجين (Web App)
          </p>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* المساحة الرئيسية: Top App Bar + Content + Footer                           */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar على الجوال والشاشات */}
        <Header currentPath={currentPath} navigate={navigate} />

        {/* محتوى الصفحة القابل للتمرير (مع مساحة سفلية pb-20 على الجوال لمنع حجب المحتوى) */}
        <main className="flex-1 flex flex-col pb-20 md:pb-0">
          {children}
        </main>

        <Footer />
      </div>

      {/* ========================================================================= */}
      {/* Mobile: Bottom Navigation Bar ثابت يدعم Safe Area وأهداف لمسية ≥ 48px   */}
      {/* ========================================================================= */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FFFFFF] border-t border-[#E5E1DA] pb-safe select-none"
        aria-label="شريط التنقل السفلي"
      >
        <div className="flex items-center justify-around h-16 px-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  'flex-1 min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]',
                  active ? 'text-[#1A4736]' : 'text-[#4B534E] hover:text-[#161A18]'
                )}
                aria-current={active ? 'page' : undefined}
              >
                <div
                  className={cn(
                    'w-9 h-7 rounded-full flex items-center justify-center transition-colors',
                    active ? 'bg-[#EBF3EF]' : 'bg-transparent'
                  )}
                >
                  <Icon
                    className={cn('w-5 h-5', active ? 'text-[#1A4736]' : 'text-[#4B534E]')}
                    strokeWidth={active ? 2.2 : 1.8}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] sm:text-[11px] leading-none whitespace-nowrap',
                    active ? 'font-bold text-[#1A4736]' : 'font-normal text-[#4B534E]'
                  )}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
