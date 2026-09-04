import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Upload } from 'lucide-react';
import type { StoreSettings } from '../../types';
import { DEFAULT_STORE_SETTINGS } from '../../constants/config';

export const StoreSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  const handleInputChange = (field: keyof Omit<StoreSettings, 'socialLinks'>, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform: keyof StoreSettings['socialLinks'], value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة الصفحة */}
      <header className="pb-5 border-b border-[#E5DFD3]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#171816] tracking-tight">
          إعدادات المتجر
        </h1>
        <p className="text-xs sm:text-sm text-[#5D5F58] mt-1">
          إدارة هوية المتجر الأساسية، بيانات التواصل، وروابط المنصات الاجتماعية.
        </p>
      </header>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* 1. هوية المتجر */}
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardHeader>
            <CardTitle as="h2">هوية المتجر</CardTitle>
            <CardDescription>
              البيانات التعريفية والصور الرسمية الممثلة للعلامة التجارية في واجهة المتجر.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Input
              id="store-name"
              label="اسم المتجر"
              placeholder="أدخل اسم المتجر الرسمي"
              value={settings.storeName}
              onChange={(e) => handleInputChange('storeName', e.target.value)}
              required
            />

            <div className="w-full flex flex-col gap-1.5 text-start">
              <label
                htmlFor="store-description"
                className="text-xs sm:text-sm font-medium text-[#171816] select-none"
              >
                وصف مختصر
              </label>
              <textarea
                id="store-description"
                rows={3}
                value={settings.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="نبذة موجزة تعبر عن فلسفة المتجر ومنتجاته الصحية"
                className="w-full px-3.5 py-2.5 rounded-[2px] text-xs sm:text-sm text-[#171816] bg-[#FAF7F2] border border-[#DCD5C6] hover:border-[#C5BEB1] focus:border-[#9E7D3B] focus:ring-1 focus:ring-[#9E7D3B] focus:outline-none placeholder:text-[#8E9089] resize-none transition-colors duration-150"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* الشعار Logo */}
              <div className="w-full flex flex-col gap-1.5 text-start">
                <label className="text-xs sm:text-sm font-medium text-[#171816] select-none">
                  الشعار (Logo)
                </label>
                <div className="flex items-center gap-3 p-3.5 rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
                  <div className="w-10 h-10 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center shrink-0 text-[#7D7F77]">
                    <Upload className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#171816]">ملف الشعار</p>
                    <p className="text-[11px] text-[#7D7F77]">PNG أو SVG بخلفية شفافة</p>
                  </div>
                  <Button variant="secondary" size="sm" type="button">
                    اختيار ملف
                  </Button>
                </div>
              </div>

              {/* صورة الهوية الرئيسية */}
              <div className="w-full flex flex-col gap-1.5 text-start">
                <label className="text-xs sm:text-sm font-medium text-[#171816] select-none">
                  صورة الهوية الرئيسية
                </label>
                <div className="flex items-center gap-3 p-3.5 rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
                  <div className="w-10 h-10 rounded-[2px] border border-[#E5DFD3] bg-[#F4EFE5] flex items-center justify-center shrink-0 text-[#7D7F77]">
                    <Upload className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#171816]">صورة الغلاف</p>
                    <p className="text-[11px] text-[#7D7F77]">نسبة العرض 16:9 بدقة عالية</p>
                  </div>
                  <Button variant="secondary" size="sm" type="button">
                    اختيار ملف
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. بيانات التواصل */}
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardHeader>
            <CardTitle as="h2">بيانات التواصل</CardTitle>
            <CardDescription>
              معلومات الاتصال المعتمدة لخدمة العملاء والاستفسارات العامة.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="contact-email"
                type="email"
                label="البريد الإلكتروني"
                placeholder="contact@store.com"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                dir="ltr"
                className="text-start"
              />
              <Input
                id="contact-phone"
                type="tel"
                label="رقم الهاتف"
                placeholder="+966 50 000 0000"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                dir="ltr"
                className="text-start"
              />
            </div>

            <Input
              id="contact-address"
              type="text"
              label="العنوان"
              placeholder="المدينة، الحي، الشارع"
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </CardContent>
        </Card>

        {/* 3. روابط التواصل */}
        <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
          <CardHeader>
            <CardTitle as="h2">روابط التواصل</CardTitle>
            <CardDescription>
              الحسابات الرسمية للمتجر على شبكات التواصل الاجتماعي.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="social-instagram"
                type="url"
                label="Instagram"
                placeholder="https://instagram.com/account"
                value={settings.socialLinks.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                dir="ltr"
                className="text-start"
              />
              <Input
                id="social-x"
                type="url"
                label="X"
                placeholder="https://x.com/account"
                value={settings.socialLinks.x}
                onChange={(e) => handleSocialChange('x', e.target.value)}
                dir="ltr"
                className="text-start"
              />
              <Input
                id="social-facebook"
                type="url"
                label="Facebook"
                placeholder="https://facebook.com/account"
                value={settings.socialLinks.facebook}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                dir="ltr"
                className="text-start"
              />
              <Input
                id="social-tiktok"
                type="url"
                label="TikTok"
                placeholder="https://tiktok.com/@account"
                value={settings.socialLinks.tiktok}
                onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                dir="ltr"
                className="text-start"
              />
            </div>
          </CardContent>
        </Card>

        {/* زر الإجراء الأساسي */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="primary" size="md" type="button">
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
};

