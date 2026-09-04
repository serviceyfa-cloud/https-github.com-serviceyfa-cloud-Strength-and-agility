import React from 'react';
import { Container } from '../components/common/Container';
import { ProductGrid } from '../components/common/ProductGrid';
import type { ProductCardProps } from '../components/common/ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export interface ShopPageProps {
  products?: ProductCardProps[];
}

const CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'supplements', label: 'المكملات الغذائية' },
  { id: 'organic-food', label: 'الأغذية العضوية' },
  { id: 'vitamins', label: 'الفيتامينات والمعادن' },
  { id: 'natural-oils', label: 'الزيوت والمستخلصات' },
];

export const ShopPage: React.FC<ShopPageProps> = ({ products = [] }) => {
  return (
    <div className="w-full bg-[#FFFFFF] py-10 sm:py-16 text-start" dir="rtl">
      <Container>
        {/* ترويسة المتجر */}
        <header className="mb-8 sm:mb-12">
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-bold text-[#1257D6] tracking-wide select-none">
              متجر الرشاقة والقوة
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-3">
            المتجر
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-[1.8] max-w-2xl">
            تشكيلة مدروسة من المكملات الغذائية والأغذية الطبيعية لدعم النشاط البدني والتوازن الصحي المستدام.
          </p>
        </header>

        {/* شريط التصنيفات مع المعرّف للربط مع الرأس */}
        <section
          id="categories"
          className="mb-8 sm:mb-10 scroll-mt-24"
          aria-label="أقسام المتجر"
        >
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat, index) => (
              <button
                key={cat.id}
                type="button"
                className={`min-h-[48px] px-5 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6] ${
                  index === 0
                    ? 'bg-[#1257D6] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#EFF6FF] hover:text-[#1257D6] border border-[#E2E8F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* شريط أدوات التصفية والترتيب */}
        <section
          className="mb-8 flex items-center justify-between gap-3 flex-wrap pb-4 border-b border-[#E2E8F0]"
          aria-label="خيارات العرض والترتيب"
        >
          {/* خيار التصفية */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
              <span>تصفية</span>
            </button>
            <span className="text-xs sm:text-sm text-[#64748B]">
              {products.length > 0 ? `${products.length} منتج` : 'كافة المنتجات'}
            </span>
          </div>

          {/* خيار الترتيب */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-[#64748B] hidden sm:inline">ترتيب حسب:</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]"
            >
              <span>المميزة</span>
              <ArrowUpDown className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* منطقة المنتجات والعروض مع معرّف العروض للربط الملاحي */}
        <section
          id="offers"
          className="scroll-mt-24"
          aria-label="قائمة المنتجات والعروض"
        >
          <ProductGrid items={products}>
            {products.length === 0 && (
              <div className="col-span-full py-20 sm:py-24 px-6 text-center rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">
                  لا توجد منتجات معروضة حالياً
                </h3>
                <p className="text-sm sm:text-base text-[#64748B] max-w-md mx-auto leading-relaxed">
                  نعمل حالياً على تجهيز المنتجات والمكملات الغذائية لتوفيرها في المتجر قريباً.
                </p>
              </div>
            )}
          </ProductGrid>
        </section>
      </Container>
    </div>
  );
};
