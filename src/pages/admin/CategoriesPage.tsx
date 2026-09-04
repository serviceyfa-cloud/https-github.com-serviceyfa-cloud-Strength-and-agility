import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
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
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              تصنيفات المتجر
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              بانتظار اتصال قاعدة البيانات
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            إدارة وتصنيف أقسام المتجر لتنظيم هيكل المنتجات وسهولة التصفح.
          </p>
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

      {/* مساحة عرض التصنيفات */}
      {categories.length === 0 ? (
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader className="sr-only">
            <CardTitle as="h2">قائمة التصنيفات</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-12">
            <div className="py-12 sm:py-16 px-4 text-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] flex items-center justify-center mx-auto mb-3.5 text-[#1257D6]">
                <FolderTree className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] mb-1.5">
                لا توجد تصنيفات مسجلة حالياً
              </h3>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                ستظهر تصنيفات المتجر هنا فور ربط قاعدة البيانات أو إضافتها برمجياً.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="hidden md:block overflow-hidden border border-[#E2E8F0] rounded-xl bg-[#FFFFFF]">
            <table className="w-full text-start text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                  <th scope="col" className="py-3 px-4 text-start font-bold">التصنيف</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">الرابط (Slug)</th>
                  <th scope="col" className="py-3 px-4 text-start font-bold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredCategories.map((category) => {
                  const statusInfo = STATUS_BADGE_CONFIG[category.status];
                  return (
                    <tr key={category.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0F172A]">
                        {category.name}
                      </td>
                      <td className="py-3 px-4 text-[#64748B] font-mono text-xs" dir="ltr">
                        {category.slug}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.label}
                        </Badge>
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
