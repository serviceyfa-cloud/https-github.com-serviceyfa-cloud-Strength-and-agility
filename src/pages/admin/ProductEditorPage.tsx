import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Image as ImageIcon, CheckCircle } from 'lucide-react';
import type {
  ProductStatus,
  ProductImage,
  Category,
} from '../../types';

interface FormState {
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  stock: string;
  categoryId: string;
  status: ProductStatus;
  featured: boolean;
  sortOrder: number;
  images: ProductImage[];
}

interface FormErrors {
  name?: string;
  slug?: string;
  price?: string;
  compareAtPrice?: string;
  sku?: string;
  stock?: string;
  categoryId?: string;
}

const STATUS_OPTIONS: { value: ProductStatus; label: string; badgeVariant: 'default' | 'success' | 'destructive' }[] = [
  { value: 'draft', label: 'مسودة', badgeVariant: 'default' },
  { value: 'active', label: 'نشط', badgeVariant: 'success' },
  { value: 'inactive', label: 'غير نشط', badgeVariant: 'default' },
  { value: 'out_of_stock', label: 'نفد المخزون', badgeVariant: 'destructive' },
];

export const ProductEditorPage: React.FC = () => {
  // الحالة المحلية للنموذج
  const [formData, setFormData] = useState<FormState>({
    name: '',
    slug: '',
    description: '',
    price: '',
    compareAtPrice: '',
    sku: '',
    stock: '0',
    categoryId: '',
    status: 'draft',
    featured: false,
    sortOrder: 0,
    images: [],
  });

  // مصفوفة التصنيفات الفعلية (فارغة في الحالة الحالية دون أي بيانات وهمية)
  const [categories] = useState<Category[]>([]);

  // حالة الأخطاء المحلية
  const [errors, setErrors] = useState<FormErrors>({});

  // رسالة النجاح المحلية المؤقتة
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // معالجة تغيير الحقول النصية
  const handleChange = (field: keyof FormState, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // مسح الخطأ الخاص بالحقل عند التعديل
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  // التحقق من صحة النموذج
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. الاسم مطلوب
    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال اسم المنتج';
    }

    // 2. slug مطلوب
    if (!formData.slug.trim()) {
      newErrors.slug = 'يرجى إدخال الرابط المختصر';
    }

    // 3. السعر مطلوب ورقم صالح وغير سالب
    if (formData.price.trim() === '') {
      newErrors.price = 'يرجى إدخال سعر المنتج';
    } else {
      const parsedPrice = Number(formData.price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        newErrors.price = 'يرجى إدخال سعر صالح وغير سالب';
      }
    }

    // 4. السعر السابق اختياري وإذا أُدخل يجب أن يكون صالحًا وغير سالب
    if (formData.compareAtPrice.trim() !== '') {
      const parsedCompare = Number(formData.compareAtPrice);
      if (isNaN(parsedCompare) || parsedCompare < 0) {
        newErrors.compareAtPrice = 'يرجى إدخال سعر سابق صالح وغير سالب';
      }
    }

    // 5. SKU مطلوب
    if (!formData.sku.trim()) {
      newErrors.sku = 'يرجى إدخال رمز SKU';
    }

    // 6. المخزون رقم صحيح وغير سالب
    if (formData.stock.trim() === '') {
      newErrors.stock = 'يرجى تحديد كمية المخزون';
    } else {
      const parsedStock = Number(formData.stock);
      if (isNaN(parsedStock) || !Number.isInteger(parsedStock) || parsedStock < 0) {
        newErrors.stock = 'يرجى إدخال كمية مخزون صحيحة وغير سالبة';
      }
    }

    // 7. التصنيف: مطلوب فقط إذا كانت هناك تصنيفات متاحة فعلياً
    if (categories.length > 0 && !formData.categoryId) {
      newErrors.categoryId = 'يرجى اختيار تصنيف للمنتج';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة الضغط على حفظ المنتج
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      setSuccessMessage('تم التحقق من بيانات المنتج بنجاح');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSuccessMessage(null);
    }
  };

  // معالجة الضغط على إلغاء (إعادة تعيين النموذج كواجهة فقط)
  const handleCancel = () => {
    setErrors({});
    setSuccessMessage(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E5DFD3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171816] tracking-tight">
            إضافة منتج
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5F58] mt-1">
            إدخال وتخصيص بيانات المنتج الجديد وتحديد الأسعار وتفاصيل المخزون.
          </p>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleCancel}
          >
            إلغاء
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleSave}
          >
            حفظ المنتج
          </Button>
        </div>
      </header>

      {/* رسالة النجاح المحلية المؤقتة عند اكتمال التحقق بنجاح */}
      {successMessage && (
        <div
          role="status"
          className="p-4 rounded-[2px] border border-[#2E5E4E] bg-[#EBF3EF] text-[#1E3E34] flex items-center gap-3 text-xs sm:text-sm"
        >
          <CheckCircle className="w-5 h-5 text-[#2E5E4E] shrink-0" aria-hidden="true" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* نموذج إدخال بيانات المنتج */}
      <form onSubmit={handleSave} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* العمود الرئيسي: المعلومات الأساسية، التسعير، والمخزون، والصور */}
          <div className="lg:col-span-2 space-y-6">
            {/* بطاقة معلومات المنتج */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader className="border-b border-[#E5DFD3] pb-3.5">
                <CardTitle as="h2" className="text-base font-semibold text-[#171816]">
                  معلومات المنتج
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* اسم المنتج */}
                <Input
                  id="product-name"
                  label="اسم المنتج"
                  required
                  placeholder="مثال: مسحوق البروتين النباتي النقي"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                />

                {/* الرابط المختصر (Slug) */}
                <Input
                  id="product-slug"
                  label="الرابط المختصر (Slug)"
                  required
                  dir="ltr"
                  className="font-mono text-xs sm:text-sm text-start"
                  placeholder="pure-plant-protein"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  error={errors.slug}
                  helpText="يُستخدم في عنوان الرابط المباشر للمنتج في المتجر"
                />

                {/* وصف المنتج */}
                <div className="flex flex-col gap-1.5 text-start">
                  <label
                    htmlFor="product-description"
                    className="text-xs sm:text-sm font-medium text-[#171816]"
                  >
                    الوصف
                  </label>
                  <textarea
                    id="product-description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="وصف تفصيلي لمكونات المنتج وفوائده وطريقة الاستخدام..."
                    className="w-full p-3 rounded-[2px] text-xs sm:text-sm text-[#171816] bg-[#FAF7F2] border border-[#DCD5C6] hover:border-[#C5BEB1] focus:border-[#9E7D3B] focus:ring-1 focus:ring-[#9E7D3B] focus:outline-none transition-colors duration-150 resize-y"
                  />
                </div>
              </CardContent>
            </Card>

            {/* بطاقة التسعير */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader className="border-b border-[#E5DFD3] pb-3.5">
                <CardTitle as="h2" className="text-base font-semibold text-[#171816]">
                  التسعير
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* السعر الحالي */}
                  <Input
                    id="product-price"
                    label="السعر"
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    dir="ltr"
                    className="font-mono text-start"
                    placeholder="0.00"
                    endElement={<span className="text-xs text-[#5D5F58]">ر.س</span>}
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    error={errors.price}
                  />

                  {/* السعر السابق */}
                  <Input
                    id="product-compare-price"
                    label="السعر السابق (اختياري)"
                    type="number"
                    min="0"
                    step="0.01"
                    dir="ltr"
                    className="font-mono text-start"
                    placeholder="0.00"
                    endElement={<span className="text-xs text-[#5D5F58]">ر.س</span>}
                    value={formData.compareAtPrice}
                    onChange={(e) => handleChange('compareAtPrice', e.target.value)}
                    error={errors.compareAtPrice}
                    helpText="يظهر مشطوباً إلى جانب السعر الحالي عند تقديم تخفيض"
                  />
                </div>
              </CardContent>
            </Card>

            {/* بطاقة المخزون */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader className="border-b border-[#E5DFD3] pb-3.5">
                <CardTitle as="h2" className="text-base font-semibold text-[#171816]">
                  المخزون
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* رمز SKU */}
                  <Input
                    id="product-sku"
                    label="رمز المنتج (SKU)"
                    required
                    dir="ltr"
                    className="font-mono text-start uppercase"
                    placeholder="PROD-001"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    error={errors.sku}
                  />

                  {/* الكمية المتاحة */}
                  <Input
                    id="product-stock"
                    label="الكمية المتاحة"
                    required
                    type="number"
                    min="0"
                    step="1"
                    dir="ltr"
                    className="font-mono text-start"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    error={errors.stock}
                  />
                </div>
              </CardContent>
            </Card>

            {/* بطاقة صور المنتج */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader className="border-b border-[#E5DFD3] pb-3.5">
                <CardTitle as="h2" className="text-base font-semibold text-[#171816]">
                  صور المنتج
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {formData.images.length === 0 ? (
                  <div className="py-8 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
                    <div className="w-10 h-10 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center mx-auto mb-2.5 text-[#7D6126]">
                      <ImageIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#171816] mb-1">
                      لا توجد صور مضافة لهذا المنتج حالياً
                    </p>
                    <p className="text-xs text-[#5D5F58] max-w-sm mx-auto leading-relaxed">
                      ستتاح إدارة الصور واختيارها من مكتبة الوسائط المركزية لاحقاً.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formData.images.map((img, idx) => (
                      <div
                        key={img.mediaId || idx}
                        className="aspect-square rounded-[2px] border border-[#E5DFD3] overflow-hidden bg-[#FAF7F2]"
                      >
                        <img
                          src={img.url}
                          alt={img.alt || formData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* العمود الجانبي: التصنيف، الحالة، وإعدادات العرض */}
          <div className="space-y-6">
            {/* بطاقة الحالة والتصنيف */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader className="border-b border-[#E5DFD3] pb-3.5">
                <CardTitle as="h2" className="text-base font-semibold text-[#171816]">
                  الحالة والتصنيف
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* حالة المنتج */}
                <div className="flex flex-col gap-1.5 text-start">
                  <label
                    htmlFor="product-status"
                    className="text-xs sm:text-sm font-medium text-[#171816]"
                  >
                    حالة المنتج
                  </label>
                  <select
                    id="product-status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as ProductStatus)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[2px] text-xs sm:text-sm text-[#171816] bg-[#FAF7F2] border border-[#DCD5C6] hover:border-[#C5BEB1] focus:border-[#9E7D3B] focus:ring-1 focus:ring-[#9E7D3B] focus:outline-none transition-colors duration-150"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* تصنيف المنتج */}
                <div className="flex flex-col gap-1.5 text-start">
                  <label
                    htmlFor="product-category"
                    className="text-xs sm:text-sm font-medium text-[#171816]"
                  >
                    التصنيف
                  </label>
                  {categories.length === 0 ? (
                    <div className="p-3 rounded-[2px] border border-[#E5DFD3] bg-[#FAF7F2] text-xs text-[#5D5F58]">
                      لا توجد تصنيفات متاحة حالياً
                    </div>
                  ) : (
                    <select
                      id="product-category"
                      value={formData.categoryId}
                      onChange={(e) => handleChange('categoryId', e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[2px] text-xs sm:text-sm text-[#171816] bg-[#FAF7F2] border border-[#DCD5C6] hover:border-[#C5BEB1] focus:border-[#9E7D3B] focus:ring-1 focus:ring-[#9E7D3B] focus:outline-none transition-colors duration-150"
                    >
                      <option value="">اختر تصنيفاً للمنتج...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.categoryId && (
                    <p role="alert" className="text-[11px] sm:text-xs text-[#8A2E2B] font-medium leading-tight">
                      {errors.categoryId}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* بطاقة إعدادات العرض */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader className="border-b border-[#E5DFD3] pb-3.5">
                <CardTitle as="h2" className="text-base font-semibold text-[#171816]">
                  إعدادات العرض
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* منتج مميز */}
                <div className="flex items-center justify-between p-3 rounded-[2px] border border-[#E5DFD3] bg-[#FAF7F2]">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="product-featured"
                      className="text-xs sm:text-sm font-medium text-[#171816] cursor-pointer"
                    >
                      منتج مميز
                    </label>
                    <p className="text-[11px] text-[#5D5F58]">
                      إبراز المنتج في قسم المنتجات المميزة بالصفحة الرئيسية
                    </p>
                  </div>
                  <input
                    id="product-featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    className="w-5 h-5 accent-[#2E5E4E] rounded-[2px] border-[#DCD5C6] cursor-pointer"
                  />
                </div>

                {/* ترتيب العرض */}
                <Input
                  id="product-sort-order"
                  label="ترتيب العرض"
                  type="number"
                  step="1"
                  dir="ltr"
                  className="font-mono text-start"
                  value={formData.sortOrder}
                  onChange={(e) => handleChange('sortOrder', Number(e.target.value) || 0)}
                  helpText="الرقم الأقل يظهر أولاً في قوائم العرض"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
