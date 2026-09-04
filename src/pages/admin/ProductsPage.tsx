import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Search, Plus, Package } from 'lucide-react';
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
      <header className="pb-5 border-b border-[#E5DFD3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171816] tracking-tight">
            المنتجات
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5F58] mt-1">
            إدارة قائمة منتجات المتجر، ومتابعة المخزون والأسعار والحالات.
          </p>
        </div>

        {/* زر إضافة منتج - واجهة فقط */}
        <div className="flex items-center shrink-0">
          <Button
            variant="primary"
            size="md"
            type="button"
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          >
            إضافة منتج
          </Button>
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
            startElement={<Search className="w-4 h-4 text-[#7D7F77]" aria-hidden="true" />}
          />
        </div>

        {/* أزرار فلترة الحالة */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {STATUS_FILTERS.map((filter) => {
            const isActive = selectedStatus === filter.id;
            return (
              <Button
                key={filter.id}
                type="button"
                variant={isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStatus(filter.id)}
              >
                {filter.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* مساحة عرض المنتجات */}
      {products.length === 0 ? (
        /* حالة الفراغ العامة عندما لا توجد منتجات مضافة */
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardHeader className="sr-only">
            <CardTitle as="h2">قائمة المنتجات</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-12">
            <div className="py-12 sm:py-16 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
              <div className="w-12 h-12 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center mx-auto mb-3.5 text-[#7D6126]">
                <Package className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1.5">
                لا توجد منتجات مضافة حالياً
              </h3>
              <p className="text-xs text-[#5D5F58] max-w-md mx-auto leading-relaxed">
                يمكنك البدء بإضافة المنتجات وتحديد الأسعار والمخزون وربطها بالتصنيفات لتبدأ في الظهور بواجهة المتجر.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : filteredProducts.length === 0 ? (
        /* حالة الفراغ عند عدم وجود نتائج مطابقة للبحث أو الفلتر */
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardContent className="p-6 sm:p-12">
            <div className="py-10 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
              <Search className="w-6 h-6 text-[#7D7F77] mx-auto mb-2" aria-hidden="true" />
              <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-xs text-[#5D5F58]">
                لم يتم العثور على أي منتج يطابق معايير البحث أو الفلتر المحدد.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* جدول وبطاقات عرض المنتجات */
        <div className="space-y-4">
          {/* عرض الجدول للشاشات المتوسطة والكبيرة */}
          <div className="hidden md:block overflow-hidden border border-[#E5DFD3] rounded-[2px] bg-[#FAF7F2]">
            <table className="w-full text-start text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5DFD3] bg-[#F4EFE5] text-[#5D5F58]">
                  <th scope="col" className="py-3 px-4 text-start font-medium">المنتج</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">SKU</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">السعر</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">المخزون</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">الحالة</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">التصنيف</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">مميز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {filteredProducts.map((product) => {
                  const statusInfo = STATUS_BADGE_CONFIG[product.status];
                  return (
                    <tr key={product.id} className="hover:bg-[#F6F2E9] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {product.images?.[0]?.url ? (
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].alt || product.name}
                              className="w-10 h-10 object-cover rounded-[2px] border border-[#E5DFD3] shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center shrink-0 text-[#7D7F77]">
                              <Package className="w-4 h-4" aria-hidden="true" />
                            </div>
                          )}
                          <span className="font-medium text-[#171816] truncate max-w-xs" title={product.name}>
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#5D5F58] font-mono text-xs" dir="ltr">
                        {product.sku}
                      </td>
                      <td className="py-3 px-4 font-medium text-[#171816]">
                        {product.price} ر.س
                      </td>
                      <td className="py-3 px-4 text-[#5D5F58]">
                        {product.stock}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#5D5F58]">
                        {product.categoryId}
                      </td>
                      <td className="py-3 px-4">
                        {product.featured ? (
                          <Badge variant="gold" size="sm">
                            مميز
                          </Badge>
                        ) : (
                          <span className="text-[#8E9089] text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* عرض البطاقات لشاشات الجوال والأجهزة الصغيرة */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredProducts.map((product) => {
              const statusInfo = STATUS_BADGE_CONFIG[product.status];
              return (
                <Card key={product.id} className="bg-[#F6F2E9] border-[#E5DFD3] p-3.5 space-y-3">
                  <div className="flex items-start gap-3">
                    {product.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        className="w-14 h-14 object-cover rounded-[2px] border border-[#E5DFD3] shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center shrink-0 text-[#7D7F77]">
                        <Package className="w-5 h-5" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs sm:text-sm font-semibold text-[#171816] truncate" title={product.name}>
                          {product.name}
                        </h3>
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-[#7D7F77] font-mono mt-0.5" dir="ltr">
                        {product.sku}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5DFD3]">
                        <span className="text-xs font-bold text-[#171816]">
                          {product.price} ر.س
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-[#5D5F58]">
                          <span>المخزون: {product.stock}</span>
                          {product.featured && (
                            <Badge variant="gold" size="sm">
                              مميز
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
