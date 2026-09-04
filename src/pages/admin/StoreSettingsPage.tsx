import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Upload } from 'lucide-react';
import type { StoreSettings } from '../../types';

export const StoreSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: 'الرشاقة والقوة',
    description: 'متجر متخصص في التغذية الرياضية، المكملات الغذائية، والأغذية الصحية العضوية.',
    logoUrl: '',
    heroImageUrl: '',
    email: 'info@fitnesspower.com',
    phone: '+966 50 000 0000',
    address: 'المملكة العربية السعودية، الرياض',
    socialLinks: {
      instagram: 'https://instagram.com',
      x: 'https://x.com',
      facebook: 'https://facebook.com',
      tiktok: 'https://tiktok.com',
    },
  });

  const handleInputChange = (field: keyof StoreSettings, value: string) => {
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
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              إعدادات المتجر
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              واجهة إعدادات محلية
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            إدارة هوية المتجر الأساسية، بيانات التواصل، وروابط المنصات الاجتماعية.
          </p>
        </div>
      </header>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* 1. هوية المتجر */}
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader>
            <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">هوية المتجر</CardTitle>
            <CardDescription className="text-xs text-[#64748B]">
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
                className="text-xs sm:text-sm font-semibold text-[#0F172A] select-none"
              >
                وصف مختصر
              </label>
              <textarea
                id="store-description"
                rows={3}
                value={settings.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="نبذة موجزة تعبر عن فلسفة المتجر ومنتجاته الصحية"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1257D6] focus:ring-1 focus:ring-[#1257D6] focus:outline-none placeholder:text-[#94A3B8] resize-none transition-colors duration-150"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* الشعار Logo */}
              <div className="w-full flex flex-col gap-1.5 text-start">
                <label className="text-xs sm:text-sm font-semibold text-[#0F172A] select-none">
                  الشعار (Logo)
                </label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="w-10 h-10 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] flex items-center justify-center shrink-0 text-[#1257D6]">
                    <Upload className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0F172A]">ملف الشعار</p>
                    <p className="text-[11px] text-[#64748B]">PNG أو SVG بخلفية شفافة</p>
                  </div>
                  <Button variant="secondary" size="sm" type="button">
                    اختيار ملف
                  </Button>
                </div>
              </div>

              {/* صورة الهوية الرئيسية */}
              <div className="w-full flex flex-col gap-1.5 text-start">
                <label className="text-xs sm:text-sm font-semibold text-[#0F172A] select-none">
                  صورة الهوية الرئيسية
                </label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="w-10 h-10 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] flex items-center justify-center shrink-0 text-[#1257D6]">
                    <Upload className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0F172A]">صورة الغلاف</p>
                    <p className="text-[11px] text-[#64748B]">نسبة العرض 16:9 بدقة عالية</p>
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
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader>
            <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">بيانات التواصل</CardTitle>
            <CardDescription className="text-xs text-[#64748B]">
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
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader>
            <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">روابط التواصل</CardTitle>
            <CardDescription className="text-xs text-[#64748B]">
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
          <button
            type="button"
            className="min-h-[48px] px-6 py-2.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-xl transition-colors select-none"
          >
            حفظ التغييرات (واجهة محلية)
          </button>
        </div>
      </form>
    </div>
  );
};
