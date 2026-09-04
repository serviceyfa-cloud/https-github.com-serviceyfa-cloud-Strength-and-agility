import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Search, Plus, Package, AlertCircle } from 'lucide-react';
import type { Product, ProductStatus } from '../../types';

type StatusFilter = 'all' | ProductStatus;

interface FilterOption {
  id: StatusFilter;
  label: string;
}

const STATUS_FILTERS: FilterOption[] = [
  { id: 'all', label: 'الكل' },
  { id: 'draft', label: 'مسودة' },
  { id: 'active', label: 'نشط' },
  { id: 'inactive', label: 'غير نشط' },
  { id: 'out_of_stock', label: 'نفد المخزون' },
];

const STATUS_BADGE_CONFIG: Record<
  ProductStatus,
  { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' | 'gold' }
> = {
  draft: { label: 'مسودة', variant: 'default' },
  active: { label: 'نشط', variant: 'success' },
  inactive: { label: 'غير نشط', variant: 'default' },
  out_of_stock: { label: 'نفد المخزون', variant: 'destructive' },
};

export const ProductsPage: React.FC = () => {
  const [products] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery === '' ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesSearch;
    });
  }, [products, selectedStatus, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              إدارة المنتجات
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              لا توجد بيانات متصلة حاليًا
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            إدارة قائمة منتجات المتجر، ومتابعة المخزون والأسعار وحالات التوفر.
          </p>
        </div>

        {/* زر إضافة منتج */}
        <div className="flex items-center shrink-0">
          <a
            href="/admin/products/new"
            className="min-h-[48px] px-4 py-2.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2 select-none"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>إضافة منتج جديد</span>
          </a>
        </div>
      </header>

      {/* شريط أدوات الفلترة والبحث */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* حقل البحث */}
        <div className="w-full md:max-w-xs">
          <Input
            id="products-search"
            type="search"
            placeholder="البحث بالاسم أو رمز SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startElement={<Search className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />}
          />
        </div>

        {/* أزرار فلترة الحالة */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {STATUS_FILTERS.map((filter) => {
            const isActive = selectedStatus === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedStatus(filter.id)}
                className={`min-h-[48px] px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-[#1257D6] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* مساحة عرض المنتجات */}
      {products.length === 0 ? (
        /* حالة الفراغ العامة عندما لا توجد منتجات مضافة */
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader className="sr-only">
            <CardTitle as="h2">قائمة المنتجات</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-12">
            <div className="py-12 sm:py-16 px-4 text-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] flex items-center justify-center mx-auto mb-3.5 text-[#1257D6]">
                <Package className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] mb-1.5">
                لا توجد منتجات مسجلة حالياً
              </h3>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed mb-4">
                قائمة المنتجات فارغة بانتظار ربط قاعدة البيانات أو إضافة أول منتج عبر نموذج الإدخال.
              </p>
              <a
                href="/admin/products/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1257D6] text-[#FFFFFF] text-xs font-bold rounded-xl hover:bg-[#0E46AF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>إضافة أول منتج</span>
              </a>
            </div>
          </CardContent>
        </Card>
      ) : filteredProducts.length === 0 ? (
        /* حالة الفراغ عند عدم وجود نتائج مطابقة للبحث أو الفلتر */
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardContent className="p-6 sm:p-12">
            <div className="py-10 px-4 text-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
              <Search className="w-6 h-6 text-[#94A3B8] mx-auto mb-2" aria-hidden="true" />
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] mb-1">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-xs text-[#64748B]">
                لم يتم العثور على أي منتج يطابق معايير البحث أو الفلتر المحدد.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* جدول المنتجات */
        <div className="space-y-4">
          <div className="hidden md:block overflow-hidden border border-[#E2E8F0] rounded-xl bg-[#FFFFFF]">
            <table className="w-full text-start text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                  <th scope="col" className="py-3 px-4 text-start font-bold">المنتج</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">SKU</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">السعر</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">المخزون</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">الحالة</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">التصنيف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredProducts.map((product) => {
                  const statusInfo = STATUS_BADGE_CONFIG[product.status];
                  return (
                    <tr key={product.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#0F172A] truncate max-w-xs block" title={product.name}>
                          {product.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#64748B] font-mono text-xs" dir="ltr">
                        {product.sku}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#0F172A]">
                        {product.price} ر.س
                      </td>
                      <td className="py-3 px-4 text-[#64748B]">
                        {product.stock}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#64748B]">
                        {product.categoryId}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
