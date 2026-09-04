import React, { useState } from 'react';
import {
  LayoutGrid,
  Package,
  Plus,
  Tags,
  Image as ImageIcon,
  ShoppingBag,
  Receipt,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { STORE_CONFIG } from '../../constants/config';
import { cn } from '../../utils/cn';

export interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navigate: (to: string) => void;
  onLogout?: () => void;
}

interface AdminNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { href: '/admin', label: 'الرئيسية', icon: LayoutGrid },
  { href: '/admin/products', label: 'المنتجات', icon: Package },
  { href: '/admin/products/new', label: 'إضافة منتج', icon: Plus },
  { href: '/admin/categories', label: 'التصنيفات', icon: Tags },
  { href: '/admin/media', label: 'الوسائط', icon: ImageIcon },
  { href: '/admin/orders', label: 'الطلبات', icon: ShoppingBag },
  { href: '/admin/invoices', label: 'الفواتير', icon: Receipt },
  { href: '/admin/settings', label: 'إعدادات المتجر', icon: Settings },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentPath,
  navigate,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans select-none"
    >
      {/* الشريط العلوي للإدارة (Admin Topbar) */}
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto gap-3">
          <div className="flex items-center gap-3">
            {/* زر فتح القائمة للشاشات الصغيرة */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-w-[48px] min-h-[48px] p-2.5 rounded-xl border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]"
              aria-label={isMobileMenuOpen ? 'إغلاق قائمة الإدارة' : 'فتح قائمة الإدارة'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#0F172A]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0F172A]" />
              )}
            </button>

            {/* هوية لوحة الإدارة */}
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0F172A]">
                {STORE_CONFIG.name}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
                لوحة الإدارة
              </span>
            </div>
          </div>

          {/* إجراءات سريعة في الشريط العلوي */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/shop"
              onClick={(e) => handleNavClick(e, '/shop')}
              className="min-h-[44px] px-3.5 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]"
            >
              <span>عرض المتجر</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" aria-hidden="true" />
            </a>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="min-h-[44px] min-w-[44px] px-3 py-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#DC2626] bg-[#FFFFFF] hover:bg-[#FEF2F2] border border-[#FECACA] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                title="قفل جلسة الإدارة"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">قفل الجلسة</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* الهيكل الرئيسي (شريط جانبي + مساحة المحتوى) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* خلفية معتمة للجوال عند فتح القائمة */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* الشريط الجانبي (Sidebar Navigation) */}
        <aside
          className={cn(
            'fixed lg:sticky top-16 bottom-0 start-0 z-40 w-64 bg-[#FFFFFF] border-e border-[#E2E8F0] flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 h-[calc(100vh-4rem)]',
            isMobileMenuOpen ? 'translate-x-0 shadow-lg' : 'translate-x-full lg:translate-x-0'
          )}
        >
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              أقسام الإدارة
            </div>

            <nav className="space-y-1" aria-label="أقسام لوحة التحكم">
              {ADMIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]',
                      isActive
                        ? 'bg-[#EFF6FF] text-[#1257D6] font-bold border-s-4 border-[#1257D6]'
                        : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0',
                        isActive ? 'text-[#1257D6]' : 'text-[#64748B]'
                      )}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] text-start">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#1257D6]" aria-hidden="true" />
              <span>جلسة مسؤول نشطة</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              منطقة إدارية مخصصة لصاحب المتجر.
            </p>
          </div>
        </aside>

        {/* مساحة المحتوى الإداري */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
