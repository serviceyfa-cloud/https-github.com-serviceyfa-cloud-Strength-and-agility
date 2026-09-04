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
    <div className="w-full py-6 sm:py-10">
      <Container>
        {/* ترويسة الصفحة (Editorial Header) */}
        <header className="mb-8 sm:mb-10 text-start">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171816] tracking-tight leading-tight mb-2">
            المتجر
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5F58] leading-relaxed max-w-xl">
            تشكيلة مختارة من المكملات العضوية والمستخلصات الطبيعية لدعم الحيوية والتوازن الصحي اليومي.
          </p>
        </header>

        {/* شريط الفئات (Categories Bar) */}
        <section className="mb-6 sm:mb-8" aria-label="أقسام المتجر">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat, index) => (
              <button
                key={cat.id}
                type="button"
                className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap border select-none ${
                  index === 0
                    ? 'bg-[#1F3327] text-[#FAF7F2] border-[#16251C]'
                    : 'bg-[#F4EFE5] text-[#2E302B] border-[#DCD5C6] hover:bg-[#EBE4D6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* شريط أدوات التصفية والترتيب (Filters & Sorting Toolbar Placeholders) */}
        <section
          className="mb-6 flex items-center justify-between gap-3 flex-wrap pt-2 pb-4 border-b border-[#E8E2D5]"
          aria-label="خيارات العرض والترتيب"
        >
          {/* زر التصفية (Placeholder) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-medium text-[#171816] bg-[#F4EFE5] border border-[#DCD5C6] rounded-[2px] hover:bg-[#EBE4D6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E7D3B]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#5D5F58]" aria-hidden="true" />
              <span>تصفية</span>
            </button>
            <span className="text-xs text-[#666861] hidden sm:inline">
              {products.length > 0 ? `${products.length} منتج` : 'كافة المنتجات'}
            </span>
          </div>

          {/* زر الترتيب (Placeholder) */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666861] hidden sm:inline">ترتيب حسب:</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-medium text-[#171816] bg-[#F4EFE5] border border-[#DCD5C6] rounded-[2px] hover:bg-[#EBE4D6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E7D3B]"
            >
              <span>المميزة</span>
              <ArrowUpDown className="w-4 h-4 text-[#5D5F58]" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* منطقة المنتجات (ProductGrid) */}
        <section aria-label="قائمة المنتجات">
          <ProductGrid items={products}>
            {products.length === 0 && (
              <div className="col-span-full py-16 sm:py-20 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#F6F2E9]/60">
                <p className="text-sm text-[#5D5F58]">
                  لا توجد منتجات معروضة حالياً ضمن هذا القسم
                </p>
              </div>
            )}
          </ProductGrid>
        </section>
      </Container>
    </div>
  );
};
