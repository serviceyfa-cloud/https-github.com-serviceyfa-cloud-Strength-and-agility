import React, { useState } from 'react';
import { CircleDot, Menu, X, ShoppingBag, Search } from 'lucide-react';
import { STORE_CONFIG, INITIAL_NAV_ITEMS } from '../../constants/config';
import { Container } from '../common/Container';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2] border-b border-[#E8E2D5]">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* الشعار واسم المتجر */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[3px] bg-[#1F3327] text-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#16251C]">
              <CircleDot className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#C5A059]" strokeWidth={2.2} />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-[#171816] block leading-tight">
                {STORE_CONFIG.name}
              </span>
              <span className="text-[11px] text-[#666861] hidden sm:block font-normal">
                {STORE_CONFIG.tagline}
              </span>
            </div>
          </div>

          {/* روابط التصفح للشاشات الكبيرة */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {INITIAL_NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-medium text-[#4A4C46] hover:text-[#171816] hover:bg-[#F2ECE1] rounded-[2px] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* أزرار الإجراءات السريعة في الهيدر */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              aria-label="بحث"
              className="p-2 text-[#4A4C46] hover:text-[#171816] hover:bg-[#F2ECE1] rounded-[2px] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="سلة المشتريات"
              className="relative p-2 text-[#4A4C46] hover:text-[#171816] hover:bg-[#F2ECE1] rounded-[2px] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-2 start-2 w-1.5 h-1.5 bg-[#9E7D3B] rounded-full"></span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="القائمة"
              className="p-2 text-[#4A4C46] hover:text-[#171816] hover:bg-[#F2ECE1] rounded-[2px] md:hidden transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* القائمة المتجاوبة للأجهزة المحمولة */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#E8E2D5] space-y-1">
            {INITIAL_NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 text-xs font-medium text-[#2E302B] hover:bg-[#F2ECE1] rounded-[2px] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
};
