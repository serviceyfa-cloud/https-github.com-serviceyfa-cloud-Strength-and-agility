import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Search, Plus, FolderTree } from 'lucide-react';
import type { Category, CategoryStatus } from '../../types';

type StatusFilter = 'all' | CategoryStatus;

interface FilterOption {
  id: StatusFilter;
  label: string;
}

const STATUS_FILTERS: FilterOption[] = [
  { id: 'all', label: 'الكل' },
  { id: 'active', label: 'نشط' },
  { id: 'inactive', label: 'غير نشط' },
];

const STATUS_BADGE_CONFIG: Record<
  CategoryStatus,
  { label: string; variant: 'default' | 'success' }
> = {
  active: { label: 'نشط', variant: 'success' },
  inactive: { label: 'غير نشط', variant: 'default' },
};

export const CategoriesPage: React.FC = () => {
  const [categories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesStatus = selectedStatus === 'all' || category.status === selectedStatus;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery === '' ||
        category.name.toLowerCase().includes(normalizedQuery) ||
        category.slug.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesSearch;
    });
  }, [categories, selectedStatus, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E5DFD3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171816] tracking-tight">
            التصنيفات
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5F58] mt-1">
            إدارة وتصنيف أقسام المتجر لتنظيم هيكل المنتجات وسهولة التصفح.
          </p>
        </div>

        {/* زر إضافة تصنيف - واجهة فقط */}
        <div className="flex items-center shrink-0">
          <Button
            variant="primary"
            size="md"
            type="button"
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          >
            إضافة تصنيف
          </Button>
        </div>
      </header>

      {/* شريط أدوات الفلترة والبحث */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* حقل البحث */}
        <div className="w-full md:max-w-xs">
          <Input
            id="categories-search"
            type="search"
            placeholder="البحث بالاسم أو الرابط..."
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

      {/* مساحة عرض التصنيفات */}
      {categories.length === 0 ? (
        /* حالة الفراغ العامة عندما لا توجد تصنيفات مضافة */
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardHeader className="sr-only">
            <CardTitle as="h2">قائمة التصنيفات</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-12">
            <div className="py-12 sm:py-16 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
              <div className="w-12 h-12 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center mx-auto mb-3.5 text-[#7D6126]">
                <FolderTree className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1.5">
                لا توجد تصنيفات مضافة حالياً
              </h3>
              <p className="text-xs text-[#5D5F58] max-w-md mx-auto leading-relaxed">
                يمكنك البدء بإنشاء التصنيفات الرئيسية والفرعية لترتيب منتجات المتجر وتسهيل تجربة التسوق للعملاء.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : filteredCategories.length === 0 ? (
        /* حالة الفراغ عند عدم وجود نتائج مطابقة للبحث أو الفلتر */
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardContent className="p-6 sm:p-12">
            <div className="py-10 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
              <Search className="w-6 h-6 text-[#7D7F77] mx-auto mb-2" aria-hidden="true" />
              <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-xs text-[#5D5F58]">
                لم يتم العثور على أي تصنيف يطابق معايير البحث أو الفلتر المحدد.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* جدول وبطاقات عرض التصنيفات */
        <div className="space-y-4">
          {/* عرض الجدول للشاشات المتوسطة والكبيرة */}
          <div className="hidden md:block overflow-hidden border border-[#E5DFD3] rounded-[2px] bg-[#FAF7F2]">
            <table className="w-full text-start text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5DFD3] bg-[#F4EFE5] text-[#5D5F58]">
                  <th scope="col" className="py-3 px-4 text-start font-medium">التصنيف</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">الرابط (Slug)</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">الحالة</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">التصنيف الأب</th>
                  <th scope="col" className="py-3 px-4 text-start font-medium">ترتيب العرض</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {filteredCategories.map((category) => {
                  const statusInfo = STATUS_BADGE_CONFIG[category.status];
                  return (
                    <tr key={category.id} className="hover:bg-[#F6F2E9] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {category.image?.url ? (
                            <img
                              src={category.image.url}
                              alt={category.image.alt || category.name}
                              className="w-10 h-10 object-cover rounded-[2px] border border-[#E5DFD3] shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center shrink-0 text-[#7D7F77]">
                              <FolderTree className="w-4 h-4" aria-hidden="true" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-[#171816] truncate max-w-xs" title={category.name}>
                              {category.name}
                            </p>
                            {category.description && (
                              <p className="text-[11px] text-[#7D7F77] truncate max-w-xs">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#5D5F58] font-mono text-xs" dir="ltr">
                        {category.slug}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#5D5F58]">
                        {category.parentId || '-'}
                      </td>
                      <td className="py-3 px-4 text-[#5D5F58] font-mono text-xs">
                        {category.sortOrder}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* عرض البطاقات لشاشات الجوال والأجهزة الصغيرة */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredCategories.map((category) => {
              const statusInfo = STATUS_BADGE_CONFIG[category.status];
              return (
                <Card key={category.id} className="bg-[#F6F2E9] border-[#E5DFD3] p-3.5 space-y-3">
                  <div className="flex items-start gap-3">
                    {category.image?.url ? (
                      <img
                        src={category.image.url}
                        alt={category.image.alt || category.name}
                        className="w-12 h-12 object-cover rounded-[2px] border border-[#E5DFD3] shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center shrink-0 text-[#7D7F77]">
                        <FolderTree className="w-5 h-5" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs sm:text-sm font-semibold text-[#171816] truncate" title={category.name}>
                          {category.name}
                        </h3>
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-[#7D7F77] font-mono mt-0.5" dir="ltr">
                        {category.slug}
                      </p>
                      {category.description && (
                        <p className="text-xs text-[#5D5F58] mt-1 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5DFD3] text-[11px] text-[#5D5F58]">
                        <span>التصنيف الأب: {category.parentId || '-'}</span>
                        <span>الترتيب: {category.sortOrder}</span>
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
