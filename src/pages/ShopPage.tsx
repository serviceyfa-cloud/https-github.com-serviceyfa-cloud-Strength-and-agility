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
        {/* ترويسة الصفحة */}
        <header className="mb-6 sm:mb-8 text-start">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#161A18] tracking-tight leading-tight mb-2">
            المتجر
          </h1>
          <p className="text-xs sm:text-sm text-[#4B534E] leading-relaxed max-w-xl">
            تشكيلة مختارة من المكملات العضوية والمستخلصات الطبيعية لدعم الحيوية والتوازن الصحي اليومي.
          </p>
        </header>

        {/* شريط الفئات */}
        <section className="mb-6 sm:mb-8" aria-label="أقسام المتجر">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat, index) => (
              <button
                key={cat.id}
                type="button"
                className={`min-h-[48px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap border select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736] ${
                  index === 0
                    ? 'bg-[#1A4736] text-[#FAF8F5] border-[#1A4736]'
                    : 'bg-[#FFFFFF] text-[#4B534E] border-[#E5E1DA] hover:bg-[#EBF3EF] hover:text-[#1A4736]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* شريط أدوات التصفية والترتيب */}
        <section
          className="mb-6 flex items-center justify-between gap-3 flex-wrap pt-2 pb-4 border-b border-[#E5E1DA]"
          aria-label="خيارات العرض والترتيب"
        >
          {/* زر التصفية */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 min-h-[48px] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#161A18] bg-[#FFFFFF] border border-[#E5E1DA] rounded-lg hover:bg-[#EBF3EF] hover:text-[#1A4736] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#4B534E]" aria-hidden="true" />
              <span>تصفية</span>
            </button>
            <span className="text-xs text-[#4B534E] hidden sm:inline">
              {products.length > 0 ? `${products.length} منتج` : 'كافة المنتجات'}
            </span>
          </div>

          {/* زر الترتيب */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#4B534E] hidden sm:inline">ترتيب حسب:</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 min-h-[48px] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#161A18] bg-[#FFFFFF] border border-[#E5E1DA] rounded-lg hover:bg-[#EBF3EF] hover:text-[#1A4736] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            >
              <span>المميزة</span>
              <ArrowUpDown className="w-4 h-4 text-[#4B534E]" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* منطقة المنتجات */}
        <section aria-label="قائمة المنتجات">
          <ProductGrid items={products}>
            {products.length === 0 && (
              <div className="col-span-full py-16 sm:py-20 px-4 text-center rounded-xl border border-dashed border-[#E5E1DA] bg-[#FFFFFF]">
                <p className="text-sm text-[#4B534E]">
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
