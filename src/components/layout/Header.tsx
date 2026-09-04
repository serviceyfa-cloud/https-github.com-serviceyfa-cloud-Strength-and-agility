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
          navigate(href);
        } else {
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } else {
        const element = typeof document !== 'undefined' ? document.getElementById(hash) : null;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          if (window.location.hash !== `#${hash}`) {
            window.history.pushState({}, '', href);
          }
        }
      }
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
      return (
        currentPath === '/shop' &&
        (typeof window === 'undefined' ||
          !window.location.hash ||
          !(typeof document !== 'undefined' && document.getElementById(window.location.hash.slice(1))))
      );
    }
    if (href.startsWith('/shop#')) {
      const hash = href.split('#')[1];
      return (
        currentPath === '/shop' &&
        typeof window !== 'undefined' &&
        window.location.hash === `#${hash}` &&
        Boolean(typeof document !== 'undefined' && document.getElementById(hash))
      );
    }
    return currentPath === href;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E2E8F0] pt-safe select-none">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* ========================================================================= */}
          {/* اليمين: هوية المتجر التيبوغرافية الفاخرة «الرشاقة والقوة»                     */}
          {/* ========================================================================= */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2 min-h-[48px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6] group shrink-0"
            aria-label={`${STORE_CONFIG.name} - الصفحة الرئيسية`}
          >
            <span className="font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight text-[#0F172A] leading-none select-none">
              الرشاقة <span className="text-[#1257D6]">والقوة</span>
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
                    'min-h-[48px] px-3 lg:px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]',
                    active
                      ? 'text-[#1257D6] font-bold bg-[#EFF6FF] border border-[#BFDBFE]'
                      : 'text-[#475569] font-medium hover:text-[#0F172A] hover:bg-[#F1F5F9]'
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
                className="w-full h-12 bg-[#F8FAFC] text-xs lg:text-sm text-[#0F172A] placeholder-[#94A3B8] rounded-lg ps-10 pe-3.5 border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1257D6] focus:border-[#1257D6] transition-colors"
                readOnly
              />
              <Search
                className="w-4 h-4 text-[#64748B] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* زر البحث للموبايل (48x48px touch target) */}
            <button
              type="button"
              aria-label="البحث في المنتجات"
              className="md:hidden min-h-[48px] min-w-[48px] p-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] rounded-lg border border-transparent hover:border-[#E2E8F0] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* زر سلة المشتريات التجاري (مع أيقونة وتسمية واضحة دون أرقام وهمية) */}
            <a
              href="/cart"
              onClick={(e) => handleLinkClick(e, '/cart')}
              aria-label="سلة المشتريات"
              className="min-h-[48px] min-w-[48px] px-3.5 py-2 text-[#0F172A] bg-[#FFFFFF] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]"
            >
              <ShoppingBag className="w-5 h-5 text-[#1257D6] shrink-0" aria-hidden="true" />
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
