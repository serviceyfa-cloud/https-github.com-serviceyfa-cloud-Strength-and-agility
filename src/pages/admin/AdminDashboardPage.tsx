import React from 'react';
import {
  Package,
  Plus,
  Tags,
  Image as ImageIcon,
  ShoppingBag,
  Receipt,
  Settings,
  ArrowLeft,
  Server,
  CreditCard,
  FileCheck,
  ShieldCheck,
  Store,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';

export interface AdminDashboardPageProps {
  onNavigate: (href: string) => void;
  onNavigateToStore?: () => void;
}

interface ManagementModule {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  actionLabel: string;
  statusBadge: string;
}

const MODULES: ManagementModule[] = [
  {
    id: 'products',
    title: 'المنتجات والمخزون',
    description: 'إدارة كتالوج المنتجات، الأسعار، المواصفات، وتحديث حالات التوفر.',
    href: '/admin/products',
    icon: Package,
    actionLabel: 'إدارة المنتجات',
    statusBadge: 'جاهز للإضافة',
  },
  {
    id: 'categories',
    title: 'تصنيفات المتجر',
    description: 'تنظيم أقسام المتجر (المكملات، البروتينات، الفيتامينات) وتحديد الهيكل.',
    href: '/admin/categories',
    icon: Tags,
    actionLabel: 'إدارة التصنيفات',
    statusBadge: 'الهيكل مهيأ',
  },
  {
    id: 'media',
    title: 'الوسائط والصور',
    description: 'مكتبة الأصول المرئية وصور المنتجات لضمان جودة العرض البصري.',
    href: '/admin/media',
    icon: ImageIcon,
    actionLabel: 'مكتبة الوسائط',
    statusBadge: 'مكتبة فارغة',
  },
  {
    id: 'orders',
    title: 'سجل الطلبات',
    description: 'متابعة ومعالجة الطلبات الواردة من العملاء وحالات الدفع والشحن.',
    href: '/admin/orders',
    icon: ShoppingBag,
    actionLabel: 'استعراض الطلبات',
    statusBadge: '0 طلبات',
  },
  {
    id: 'invoices',
    title: 'الفواتير والفوترة',
    description: 'سجلات الفواتير الضريبية وتجهيز الربط مع منظومة الفوترة الإلكترونية.',
    href: '/admin/invoices',
    icon: Receipt,
    actionLabel: 'استعراض الفواتير',
    statusBadge: '0 فواتير',
  },
  {
    id: 'settings',
    title: 'إعدادات المتجر',
    description: 'تعديل البيانات الأساسية، هوية المتجر، خيارات التواصل والتسليم.',
    href: '/admin/settings',
    icon: Settings,
    actionLabel: 'ضبط الإعدادات',
    statusBadge: 'بيانات أولية',
  },
];

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  onNavigateToStore,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 text-start" dir="rtl">
      {/* ترويسة لوحة الإدارة */}
      <header className="pb-6 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              الرئيسية — لوحة الإدارة
            </h1>
            <span className="text-xs px-3 py-1 rounded-full font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              متجر الرشاقة والقوة
            </span>
          </div>
          <p className="text-sm text-[#64748B] max-w-2xl leading-relaxed">
            مركز العمليات وإدارة الكتالوج التجاري. يمكنك الوصول المباشر لكافة أقسام المتجر من هذه اللوحة.
          </p>
        </div>

        {/* أزرار سريعة رئيسية */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('/admin/products/new')}
            className="min-h-[44px] px-4 py-2.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2 select-none shadow-none"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>إضافة منتج جديد</span>
          </button>

          {onNavigateToStore && (
            <button
              type="button"
              onClick={onNavigateToStore}
              className="min-h-[44px] px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold text-xs sm:text-sm rounded-xl border border-[#E2E8F0] transition-colors inline-flex items-center gap-2 select-none"
            >
              <Store className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
              <span>عرض المتجر</span>
            </button>
          )}
        </div>
      </header>

      {/* أقسام الإدارة الحقيقية المعتمدة */}
      <section aria-labelledby="modules-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="modules-heading" className="text-lg font-bold text-[#0F172A] tracking-tight">
            أقسام إدارة المتجر
          </h2>
          <span className="text-xs text-[#64748B]">
            6 أقسام تشغيلية رئيسية
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-colors text-start"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">
                      {module.statusBadge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">
                    {module.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                    {module.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(module.href)}
                  className="w-full min-h-[44px] px-4 py-2 bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#1257D6] font-bold text-xs sm:text-sm rounded-xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors inline-flex items-center justify-between select-none"
                >
                  <span>{module.actionLabel}</span>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* بطاقة الشفافية التقنية والجاهزية المعمارية (بدون أرقام أو إحصائيات وهمية) */}
      <section aria-labelledby="readiness-heading">
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1257D6]" aria-hidden="true" />
                <h2 id="readiness-heading" className="text-base font-bold text-[#0F172A]">
                  حالة الجاهزية التشغيلية والتكامل
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#64748B]">
                تقرير حالة الأنظمة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. خادم البيانات */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                  <Server className="w-4 h-4 text-[#1257D6]" aria-hidden="true" />
                  <span>قاعدة البيانات / Backend</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  <span className="font-semibold text-[#94A3B8] block">غير متصل</span>
                  يتطلب ربط API لحفظ المنتجات
                </div>
              </div>

              {/* 2. بوابة الدفع */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                  <CreditCard className="w-4 h-4 text-[#1257D6]" aria-hidden="true" />
                  <span>بوابة الدفع الإلكتروني</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  <span className="font-semibold text-[#94A3B8] block">بانتظار التهيئة</span>
                  يتطلب مزود دفع معتمد (Mada/Visa)
                </div>
              </div>

              {/* 3. الفوترة الإلكترونية */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                  <FileCheck className="w-4 h-4 text-[#1257D6]" aria-hidden="true" />
                  <span>الفوترة الإلكترونية</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  <span className="font-semibold text-[#94A3B8] block">الهيكل جاهز</span>
                  يتطلب التكامل مع مزود الفوترة
                </div>
              </div>

              {/* 4. المصادقة */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#1257D6]" aria-hidden="true" />
                  <span>مصادقة المسؤول</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  <span className="font-semibold text-[#1257D6] block">جلسة معاينة نشطة</span>
                  تتطلب Auth Server للإنتاج
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
