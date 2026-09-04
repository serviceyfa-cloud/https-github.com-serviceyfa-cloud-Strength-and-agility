import React from 'react';
import {
  Home,
  ShoppingBag,
  LayoutGrid,
  Tag,
  ShoppingCart,
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

interface CustomerNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const CUSTOMER_BOTTOM_NAV_ITEMS: CustomerNavItem[] = [
  { id: 'home', label: 'الرئيسية', href: '/', icon: Home },
  { id: 'shop', label: 'المتجر', href: '/shop', icon: ShoppingBag },
  { id: 'categories', label: 'الأقسام', href: '/shop#categories', icon: LayoutGrid },
  { id: 'offers', label: 'العروض', href: '/shop#offers', icon: Tag },
  { id: 'cart', label: 'السلة', href: '/cart', icon: ShoppingCart },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPath = '/shop', navigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('/shop#')) {
      const hash = href.split('#')[1];
      if (currentPath !== '/shop' && currentPath !== '/') {
        if (navigate) {
          navigate('/shop');
        } else {
          window.history.pushState({}, '', '/shop');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (navigate) {
      navigate(href);
    } else if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return currentPath === '/' && (typeof window === 'undefined' || !window.location.hash);
    }
    if (href === '/shop') {
      return currentPath === '/shop' && (typeof window === 'undefined' || !window.location.hash);
    }
    if (href.startsWith('/shop#')) {
      const hash = href.split('#')[1];
      return typeof window !== 'undefined' && window.location.hash === `#${hash}`;
    }
    return currentPath === href;
  };

  return (
    <div
      dir={STORE_CONFIG.direction}
      lang={STORE_CONFIG.locale}
      className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#161A18] min-w-[360px]"
    >
      {/* ========================================================================= */}
      {/* Header الرئيسي للمتجر (يعرض ملاحة أفقية للشاشات الكبيرة + أدوات المتجر) */}
      {/* ========================================================================= */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* ========================================================================= */}
      {/* مساحة المحتوى التجاري المفتوحة للعميل (دون تضييق بشريط إداري جانبي)       */}
      {/* مساحة أمان سفلية pb-20 على الهاتف لضمان عدم حجب المحتوى بواسطة شريط التنقل*/}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col pb-20 md:pb-0 w-full">
        {children}
      </main>

      {/* ========================================================================= */}
      {/* تذييل المتجر الإلكتروني (Footer)                                          */}
      {/* ========================================================================= */}
      <Footer />

      {/* ========================================================================= */}
      {/* شريط التنقل السفلي المخصص للعميل على الجوال (Customer Bottom Navigation) */}
      {/* أهداف لمسية قياسية لا تقل عن 48px وتصميم فخم بالهوية الداكنة والذهبية   */}
      {/* ========================================================================= */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#050505] border-t border-[#1E1E1E] pb-safe select-none shadow-lg"
        aria-label="شريط تنقل متجر الرشاقة والقوة"
      >
        <div className="flex items-center justify-around h-16 px-1">
          {CUSTOMER_BOTTOM_NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  'flex-1 min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12]',
                  active ? 'text-[#D89B12]' : 'text-[#777777] hover:text-[#FFFFFF]'
                )}
                aria-current={active ? 'page' : undefined}
                aria-label={item.label}
              >
                <div
                  className={cn(
                    'w-9 h-7 rounded-md flex items-center justify-center transition-colors',
                    active ? 'bg-[#141414] text-[#D89B12]' : 'bg-transparent text-[#777777]'
                  )}
                >
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={active ? 2.3 : 1.8}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] sm:text-[11px] leading-none whitespace-nowrap',
                    active ? 'font-bold text-[#D89B12]' : 'font-normal text-[#777777]'
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
