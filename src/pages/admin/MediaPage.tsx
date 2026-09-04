import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Search, Plus, Image as ImageIcon, Video, FileText, File } from 'lucide-react';
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
  { id: 'other', label: 'أخرى' },
];

const TYPE_LABELS: Record<MediaType, string> = {
  image: 'صورة',
  video: 'فيديو',
  document: 'مستند',
  other: 'ملف',
};

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

  const renderMediaPreview = (asset: MediaAsset) => {
    if (asset.type === 'image') {
      return (
        <img
          src={asset.url}
          alt={asset.alt || asset.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );
    }

    if (asset.type === 'video') {
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-[#7D6126]">
          <Video className="w-8 h-8" aria-hidden="true" />
          <span className="text-[11px] font-medium text-[#5D5F58]">فيديو</span>
        </div>
      );
    }

    if (asset.type === 'document') {
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-[#7D6126]">
          <FileText className="w-8 h-8" aria-hidden="true" />
          <span className="text-[11px] font-medium text-[#5D5F58]">مستند</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center gap-2 p-4 text-[#7D6126]">
        <File className="w-8 h-8" aria-hidden="true" />
        <span className="text-[11px] font-medium text-[#5D5F58]">ملف</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E5DFD3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171816] tracking-tight">
            الصور والوسائط
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5F58] mt-1">
            إدارة وتنظيم أصول الصور والملفات الخاصة بالمتجر في مكان مركزي.
          </p>
        </div>

        {/* زر إضافة وسائط - واجهة فقط */}
        <div className="flex items-center shrink-0">
          <Button
            variant="primary"
            size="md"
            type="button"
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          >
            إضافة وسائط
          </Button>
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
            startElement={<Search className="w-4 h-4 text-[#7D7F77]" aria-hidden="true" />}
          />
        </div>

        {/* أزرار فلترة النوع */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {FILTER_OPTIONS.map((option) => {
            const isActive = selectedType === option.id;
            return (
              <Button
                key={option.id}
                type="button"
                variant={isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedType(option.id)}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* محتوى مكتبة الوسائط */}
      {mediaAssets.length === 0 ? (
        /* حالة الفراغ العامة عندما لا توجد وسائط */
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardHeader className="sr-only">
            <CardTitle as="h2">مكتبة الوسائط</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-12">
            <div className="py-12 sm:py-16 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
              <div className="w-12 h-12 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center mx-auto mb-3.5 text-[#7D6126]">
                <ImageIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1.5">
                لا توجد وسائط مضافة حالياً
              </h3>
              <p className="text-xs text-[#5D5F58] max-w-md mx-auto leading-relaxed">
                يمكنك رفع وتنظيم صور المنتجات، الشعارات، وأصول الهوية البصرية للوصول إليها واستخدامها بسهولة في أقسام المتجر.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : filteredAssets.length === 0 ? (
        /* حالة الفراغ عند عدم وجود نتائج مطابقة للبحث أو الفلتر */
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardContent className="p-6 sm:p-12">
            <div className="py-10 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
              <Search className="w-6 h-6 text-[#7D7F77] mx-auto mb-2" aria-hidden="true" />
              <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-xs text-[#5D5F58]">
                لم يتم العثور على وسائط تطابق معايير البحث أو الفلتر المحدد.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* شبكة عرض الوسائط */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredAssets.map((asset) => (
            <Card
              key={asset.id}
              variant="interactive"
              className="bg-[#F6F2E9] border-[#E5DFD3] flex flex-col overflow-hidden"
            >
              {/* معاينة الوسيط */}
              <div className="relative aspect-square w-full bg-[#F4EFE5] border-b border-[#E5DFD3] flex items-center justify-center overflow-hidden">
                {renderMediaPreview(asset)}
              </div>

              {/* بيانات الوسيط */}
              <div className="p-3 flex flex-col gap-1.5 flex-1 justify-between text-start">
                <div className="space-y-0.5">
                  <p
                    className="text-xs sm:text-sm font-medium text-[#171816] truncate"
                    title={asset.name}
                  >
                    {asset.name}
                  </p>
                  {asset.alt && (
                    <p
                      className="text-[11px] text-[#7D7F77] truncate"
                      title={asset.alt}
                    >
                      {asset.alt}
                    </p>
                  )}
                </div>

                <div className="pt-1 flex items-center justify-between gap-1">
                  <Badge variant="default" size="sm">
                    {TYPE_LABELS[asset.type] || asset.type}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

