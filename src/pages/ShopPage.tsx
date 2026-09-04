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
          <div
            className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
            role="list"
          >
            {CATEGORIES.map((cat, index) => (
              <span
                key={cat.id}
                role="listitem"
                className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap select-none ${
                  index === 0
                    ? 'bg-[#1257D6] text-[#FFFFFF]'
                    : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                {cat.label}
              </span>
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
              disabled
              aria-disabled="true"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl cursor-default select-none"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />
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
              disabled
              aria-disabled="true"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl cursor-default select-none"
            >
              <span>المميزة</span>
              <ArrowUpDown className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* منطقة المنتجات والمحتوى التجاري (تستقبل رابط الربط الملاحي) */}
        <section
          id="offers"
          className="scroll-mt-24"
          aria-label="قائمة المنتجات"
        >
          <ProductGrid items={products}>
            {products.length === 0 && (
              <div className="col-span-full py-20 sm:py-24 px-6 text-center rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC]">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">
                  لا توجد منتجات معروضة حالياً
                </h3>
                <p className="text-sm sm:text-base text-[#64748B] max-w-md mx-auto leading-relaxed">
                  سيتم عرض المنتجات والمكملات الغذائية في هذا القسم عند إضافتها إلى المتجر.
                </p>
              </div>
            )}
          </ProductGrid>
        </section>
      </Container>
    </div>
  );
};
