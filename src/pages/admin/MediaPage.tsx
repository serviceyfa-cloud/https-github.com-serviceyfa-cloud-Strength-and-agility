import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Search, Plus, Image as ImageIcon } from 'lucide-react';
import type { MediaAsset, MediaType } from '../../types';

type FilterType = 'all' | MediaType;

interface FilterOption {
  id: FilterType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'الكل' },
  { id: 'image', label: 'الصور' },
  { id: 'video', label: 'الفيديو' },
  { id: 'document', label: 'المستندات' },
];

export const MediaPage: React.FC = () => {
  const [mediaAssets] = useState<MediaAsset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<FilterType>('all');

  const filteredAssets = useMemo(() => {
    return mediaAssets.filter((asset) => {
      const matchesType = selectedType === 'all' || asset.type === selectedType;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery === '' ||
        asset.name.toLowerCase().includes(normalizedQuery) ||
        asset.alt.toLowerCase().includes(normalizedQuery);

      return matchesType && matchesSearch;
    });
  }, [mediaAssets, selectedType, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              الوسائط والصور
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              بانتظار خادم التخزين السحابي
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            إدارة وتنظيم أصول الصور والملفات الخاصة بالمتجر في مكان مركزي.
          </p>
        </div>
      </header>

      {/* شريط أدوات الفلترة والبحث */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* حقل البحث */}
        <div className="w-full md:max-w-xs">
          <Input
            id="media-search"
            type="search"
            placeholder="البحث بالاسم أو النص البديل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startElement={<Search className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />}
          />
        </div>

        {/* أزرار فلترة النوع */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {FILTER_OPTIONS.map((option) => {
            const isActive = selectedType === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedType(option.id)}
                className={`min-h-[48px] px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-[#1257D6] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* مساحة عرض الوسائط */}
      {mediaAssets.length === 0 ? (
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader className="sr-only">
            <CardTitle as="h2">مكتبة الوسائط</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-12">
            <div className="py-12 sm:py-16 px-4 text-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] flex items-center justify-center mx-auto mb-3.5 text-[#1257D6]">
                <ImageIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] mb-1.5">
                لا توجد وسائط مسجلة حالياً
              </h3>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                ستظهر أصول الصور والملفات المرفوعة هنا فور ربط خدمة التخزين السحابي (Cloud Storage Bucket).
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="bg-[#FFFFFF] border-[#E2E8F0] overflow-hidden">
              <div className="aspect-square bg-[#F8FAFC] relative">
                <img
                  src={asset.url}
                  alt={asset.alt || asset.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-bold text-[#0F172A] truncate" title={asset.name}>
                  {asset.name}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
