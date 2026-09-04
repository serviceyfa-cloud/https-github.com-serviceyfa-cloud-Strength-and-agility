import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { STORE_CONFIG } from '../../constants/config';
import { Container } from '../common/Container';
import { cn } from '../../utils/cn';

export interface HeaderProps {
  currentPath?: string;
  navigate?: (to: string) => void;
}

interface NavLinkItem {
  label: string;
  href: string;
}

const CUSTOMER_NAV_LINKS: NavLinkItem[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المتجر', href: '/shop' },
  { label: 'الأقسام', href: '/shop#categories' },
  { label: 'العروض', href: '/shop#offers' },
];

export const Header: React.FC<HeaderProps> = ({ currentPath = '/shop', navigate }) => {
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
    <header className="sticky top-0 z-40 w-full bg-[#050505] border-b border-[#1E1E1E] pt-safe select-none">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* ========================================================================= */}
          {/* اليمين: هوية المتجر التيبوغرافية الفاخرة «الرشاقة والقوة»                     */}
          {/* ========================================================================= */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2 min-h-[48px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] group shrink-0"
            aria-label={`${STORE_CONFIG.name} - الصفحة الرئيسية`}
          >
            <span className="font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight text-[#FFFFFF] leading-none select-none">
              الرشاقة <span className="text-[#D89B12]">والقوة</span>
            </span>
          </a>

          {/* ========================================================================= */}
          {/* الوسط على Desktop: روابط التنقل التجارية الرئيسية                         */}
          {/* ========================================================================= */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="أقسام المتجر الرئيسية"
          >
            {CUSTOMER_NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    'min-h-[48px] px-3 lg:px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12]',
                    active
                      ? 'text-[#D89B12] font-bold bg-[#141414] border border-[#262626]'
                      : 'text-[#E0E0E0] font-medium hover:text-[#FFFFFF] hover:bg-[#141414]'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* ========================================================================= */}
          {/* اليسار: أدوات المتجر (البحث التجاري الواضح + سلة المشتريات)               */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* حقل البحث التجاري الواضح للشاشات الكبيرة (Desktop Search Field) */}
            <div className="relative w-44 md:w-56 lg:w-64 xl:w-72 hidden md:block">
              <input
                type="search"
                placeholder="ابحث عن منتج أو تصنيف..."
                aria-label="البحث في المتجر"
                className="w-full h-12 bg-[#141414] text-xs lg:text-sm text-[#FFFFFF] placeholder-[#777777] rounded-lg ps-10 pe-3.5 border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#D89B12] focus:border-[#D89B12] transition-colors"
                readOnly
              />
              <Search
                className="w-4 h-4 text-[#777777] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* زر البحث للموبايل (48x48px touch target) */}
            <button
              type="button"
              aria-label="البحث في المنتجات"
              className="md:hidden min-h-[48px] min-w-[48px] p-2 text-[#E0E0E0] hover:text-[#FFFFFF] hover:bg-[#141414] active:bg-[#1C1C1C] rounded-lg border border-transparent hover:border-[#262626] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12]"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* زر سلة المشتريات التجاري (مع أيقونة وتسمية واضحة دون أرقام وهمية) */}
            <a
              href="/cart"
              onClick={(e) => handleLinkClick(e, '/cart')}
              aria-label="سلة المشتريات"
              className="min-h-[48px] min-w-[48px] px-3 py-2 text-[#FFFFFF] bg-[#141414] hover:bg-[#1C1C1C] active:bg-[#222222] border border-[#262626] rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12]"
            >
              <ShoppingBag className="w-5 h-5 text-[#D89B12] shrink-0" aria-hidden="true" />
              <span className="text-xs lg:text-sm font-semibold hidden sm:inline select-none">
                السلة
              </span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
};
