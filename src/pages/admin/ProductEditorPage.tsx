import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ArrowLeft, Save, CheckCircle, Image as ImageIcon, AlertCircle } from 'lucide-react';
import type { Product, ProductStatus, Category } from '../../types';

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
  images: { mediaId: string; url: string; alt?: string }[];
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

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'draft', label: 'مسودة (Draft)' },
  { value: 'active', label: 'نشط (Active)' },
  { value: 'inactive', label: 'غير نشط (Inactive)' },
  { value: 'out_of_stock', label: 'نفد المخزون (Out of Stock)' },
];

export const ProductEditorPage: React.FC = () => {
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

  const [categories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال اسم المنتج';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'يرجى إدخال الرابط المختصر';
    }

    if (formData.price.trim() === '') {
      newErrors.price = 'يرجى إدخال سعر المنتج';
    } else {
      const parsedPrice = Number(formData.price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        newErrors.price = 'يرجى إدخال سعر صالح وغير سالب';
      }
    }

    if (formData.compareAtPrice.trim() !== '') {
      const parsedCompare = Number(formData.compareAtPrice);
      if (isNaN(parsedCompare) || parsedCompare < 0) {
        newErrors.compareAtPrice = 'يرجى إدخال سعر سابق صالح وغير سالب';
      }
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'يرجى إدخال رمز SKU';
    }

    if (formData.stock.trim() === '') {
      newErrors.stock = 'يرجى تحديد كمية المخزون';
    } else {
      const parsedStock = Number(formData.stock);
      if (isNaN(parsedStock) || !Number.isInteger(parsedStock) || parsedStock < 0) {
        newErrors.stock = 'يرجى إدخال رقم صحيح غير سالب للمخزون';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSuccessMessage(
      'تم التحقق من صحة حقول المنتج بنجاح (واجهة مستخدم فقط - يلزم ربط خادم Backend لحفظ السجل في قاعدة البيانات).'
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              إضافة منتج جديد
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              نموذج إدخال محلي
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            أدخل تفاصيل ومواصفات المنتج الجديد لتهيئته للإضافة إلى قاعدة البيانات.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/admin/products"
            className="min-h-[48px] px-4 py-2 text-xs font-semibold text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
            <span>العودة للمنتجات</span>
          </a>

          <button
            type="submit"
            onClick={handleSave}
            className="min-h-[48px] px-5 py-2.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2 select-none"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>حفظ المنتج (محلياً)</span>
          </button>
        </div>
      </header>

      {/* رسالة النجاح المحلية */}
      {successMessage && (
        <div
          role="status"
          className="p-4 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] text-[#1E40AF] flex items-center gap-3 text-xs sm:text-sm"
        >
          <CheckCircle className="w-5 h-5 text-[#1257D6] shrink-0" aria-hidden="true" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* نموذج إدخال بيانات المنتج */}
      <form onSubmit={handleSave} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* العمود الرئيسي */}
          <div className="lg:col-span-2 space-y-6">
            {/* معلومات المنتج */}
            <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
              <CardHeader className="border-b border-[#E2E8F0] pb-3.5">
                <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">
                  معلومات المنتج
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <Input
                  id="product-name"
                  label="اسم المنتج"
                  required
                  placeholder="مثال: مسحوق البروتين النباتي النقي"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                />

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

                <div className="flex flex-col gap-1.5 text-start">
                  <label
                    htmlFor="product-description"
                    className="text-xs sm:text-sm font-semibold text-[#0F172A]"
                  >
                    الوصف
                  </label>
                  <textarea
                    id="product-description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="وصف تفصيلي لمكونات المنتج وفوائده وطريقة الاستخدام..."
                    className="w-full p-3 rounded-xl text-xs sm:text-sm text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1257D6] focus:ring-1 focus:ring-[#1257D6] focus:outline-none transition-colors duration-150 resize-y placeholder:text-[#94A3B8]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* التسعير والمخزون */}
            <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
              <CardHeader className="border-b border-[#E2E8F0] pb-3.5">
                <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">
                  التسعير والمخزون
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    endElement={<span className="text-xs text-[#64748B]">ر.س</span>}
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    error={errors.price}
                  />

                  <Input
                    id="product-compare-price"
                    label="السعر السابق (اختياري)"
                    type="number"
                    min="0"
                    step="0.01"
                    dir="ltr"
                    className="font-mono text-start"
                    placeholder="0.00"
                    endElement={<span className="text-xs text-[#64748B]">ر.س</span>}
                    value={formData.compareAtPrice}
                    onChange={(e) => handleChange('compareAtPrice', e.target.value)}
                    error={errors.compareAtPrice}
                    helpText="يظهر مشطوباً إلى جانب السعر الحالي"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

            {/* صور المنتج */}
            <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
              <CardHeader className="border-b border-[#E2E8F0] pb-3.5">
                <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">
                  صور المنتج
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="py-8 px-4 text-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="w-10 h-10 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] flex items-center justify-center mx-auto mb-2.5 text-[#1257D6]">
                    <ImageIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                    لا توجد صور مضافة لهذا المنتج حالياً
                  </p>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                    ستتاح إدارة الصور واختيارها من مكتبة الوسائط المركزية لاحقاً.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* العمود الجانبي */}
          <div className="space-y-6">
            <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
              <CardHeader className="border-b border-[#E2E8F0] pb-3.5">
                <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">
                  الحالة والتصنيف
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col gap-1.5 text-start">
                  <label
                    htmlFor="product-status"
                    className="text-xs sm:text-sm font-semibold text-[#0F172A]"
                  >
                    حالة المنتج
                  </label>
                  <select
                    id="product-status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as ProductStatus)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1257D6] focus:ring-1 focus:ring-[#1257D6] focus:outline-none transition-colors duration-150"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-start">
                  <label
                    htmlFor="product-category"
                    className="text-xs sm:text-sm font-semibold text-[#0F172A]"
                  >
                    التصنيف
                  </label>
                  {categories.length === 0 ? (
                    <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#64748B]">
                      لا توجد تصنيفات متاحة حالياً
                    </div>
                  ) : (
                    <select
                      id="product-category"
                      value={formData.categoryId}
                      onChange={(e) => handleChange('categoryId', e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1257D6] focus:ring-1 focus:ring-[#1257D6] focus:outline-none transition-colors duration-150"
                    >
                      <option value="">اختر تصنيفاً للمنتج...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] mt-4">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="product-featured"
                      className="text-xs sm:text-sm font-semibold text-[#0F172A] cursor-pointer"
                    >
                      منتج مميز
                    </label>
                    <p className="text-[11px] text-[#64748B]">
                      إبراز المنتج في قسم المنتجات المميزة
                    </p>
                  </div>
                  <input
                    id="product-featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    className="w-5 h-5 accent-[#1257D6] rounded cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
