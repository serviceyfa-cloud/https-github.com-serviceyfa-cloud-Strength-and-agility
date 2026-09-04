import React from 'react';
import { Activity, ShoppingBag, Search } from 'lucide-react';
import { STORE_CONFIG } from '../../constants/config';
import { Container } from '../common/Container';

export interface HeaderProps {
  currentPath?: string;
  navigate?: (to: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/shop', navigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (navigate) {
      navigate(href);
    } else if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E5E1DA] pt-safe select-none">
      <Container>
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* الشعار واسم التطبيق - Top App Bar Brand */}
          <a
            href="/shop"
            onClick={(e) => handleLinkClick(e, '/shop')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer min-h-[48px] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
            aria-label={`${STORE_CONFIG.name} - الصفحة الرئيسية`}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1A4736] text-[#FAF8F5] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-[#FAF8F5]" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#161A18] leading-tight">
                {STORE_CONFIG.name}
              </span>
              <span className="text-[11px] text-[#4B534E] hidden sm:block font-normal leading-none mt-0.5">
                {STORE_CONFIG.tagline}
              </span>
            </div>
          </a>

          {/* أزرار الإجراءات السريعة - أهداف لمسية لا تقل عن 48px وخالية من النقاط الزخرفية */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="البحث في المنتجات"
              className="min-h-[48px] min-w-[48px] p-2 text-[#4B534E] hover:text-[#161A18] hover:bg-[#EBF3EF] active:bg-[#EBF3EF] rounded-xl transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="سلة المشتريات"
              className="min-h-[48px] min-w-[48px] p-2 text-[#4B534E] hover:text-[#161A18] hover:bg-[#EBF3EF] active:bg-[#EBF3EF] rounded-xl transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
