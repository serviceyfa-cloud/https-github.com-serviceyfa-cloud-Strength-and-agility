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
  Store,
  Inbox,
  Boxes,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';

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
}

const MODULES: ManagementModule[] = [
  {
    id: 'products',
    title: 'المنتجات والمخزون',
    description: 'إدارة كتالوج المنتجات، الأسعار، المواصفات، وتحديث كميات المخزون.',
    href: '/admin/products',
    icon: Package,
    actionLabel: 'إدارة المنتجات',
  },
  {
    id: 'orders',
    title: 'سجل الطلبات',
    description: 'متابعة ومعالجة الطلبات الواردة من العملاء وحالات الدفع والشحن.',
    href: '/admin/orders',
    icon: ShoppingBag,
    actionLabel: 'سجل الطلبات',
  },
  {
    id: 'invoices',
    title: 'الفواتير والمالية',
    description: 'استعراض سجلات الفواتير والعمليات المالية المرتبطة بالطلبات.',
    href: '/admin/invoices',
    icon: Receipt,
    actionLabel: 'سجل الفواتير',
  },
  {
    id: 'categories',
    title: 'تصنيفات المتجر',
    description: 'تنظيم أقسام المتجر (المكملات الغذائية، الأغذية العضوية، الفيتامينات).',
    href: '/admin/categories',
    icon: Tags,
    actionLabel: 'إدارة التصنيفات',
  },
  {
    id: 'media',
    title: 'الوسائط والصور',
    description: 'مكتبة الأصول المرئية وصور المنتجات لضمان جودة العرض التجاري.',
    href: '/admin/media',
    icon: ImageIcon,
    actionLabel: 'مكتبة الوسائط',
  },
  {
    id: 'settings',
    title: 'إعدادات المتجر',
    description: 'تعديل البيانات الأساسية، هوية المتجر، وخيارات التواصل والتسليم.',
    href: '/admin/settings',
    icon: Settings,
    actionLabel: 'إعدادات المتجر',
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
              لوحة الإدارة
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              متجر الرشاقة والقوة
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] max-w-2xl leading-relaxed">
            الوصول المباشر إلى وظائف إدارة المتجر والمنتجات والطلبات والسجلات.
          </p>
        </div>

        {/* أزرار الإجراءات السريعة */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('/admin/products/new')}
            className="min-h-[48px] px-4 py-2.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2 select-none"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>إضافة منتج جديد</span>
          </button>

          {onNavigateToStore && (
            <button
              type="button"
              onClick={onNavigateToStore}
              className="min-h-[48px] px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold text-xs sm:text-sm rounded-xl border border-[#E2E8F0] transition-colors inline-flex items-center gap-2 select-none"
            >
              <Store className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
              <span>عرض المتجر العام</span>
            </button>
          )}
        </div>
      </header>

      {/* أقسام الإدارة الأساسية */}
      <section aria-labelledby="modules-heading" className="space-y-4">
        <h2 id="modules-heading" className="text-base font-bold text-[#0F172A] tracking-tight">
          أقسام المتجر
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between text-start hover:border-[#CBD5E1] transition-colors"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
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
                  className="w-full min-h-[48px] px-4 py-2 bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#1257D6] font-bold text-xs sm:text-sm rounded-xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors inline-flex items-center justify-between select-none"
                >
                  <span>{module.actionLabel}</span>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* حالات الفراغ لنشاط المتجر (بدون أرقام أو بيانات وهمية) */}
      <section aria-labelledby="activity-heading" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* حالة الطلبات الحديثة */}
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader className="border-b border-[#E2E8F0] pb-3.5 flex flex-row items-center justify-between">
            <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">
              الطلبات الحديثة
            </CardTitle>
            <button
              type="button"
              onClick={() => onNavigate('/admin/orders')}
              className="text-xs font-semibold text-[#1257D6] hover:underline"
            >
              عرض الكل
            </button>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold text-[#0F172A] mb-1">
              لا توجد طلبات جديدة حالياً
            </p>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
              ستظهر الطلبات الواردة فور إتمام العملاء لعمليات الشراء عبر المتجر.
            </p>
          </CardContent>
        </Card>

        {/* حالة المنتجات والمخزون */}
        <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
          <CardHeader className="border-b border-[#E2E8F0] pb-3.5 flex flex-row items-center justify-between">
            <CardTitle as="h2" className="text-base font-bold text-[#0F172A]">
              كتالوج المنتجات
            </CardTitle>
            <button
              type="button"
              onClick={() => onNavigate('/admin/products')}
              className="text-xs font-semibold text-[#1257D6] hover:underline"
            >
              إدارة المنتجات
            </button>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] flex items-center justify-center mx-auto mb-3">
              <Boxes className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold text-[#0F172A] mb-1">
              جاهز لإدارة المخزون
            </p>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed mb-4">
              يمكنك إضافة منتجات جديدة أو تعديل المنتجات الحالية من قسم المنتجات.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/admin/products/new')}
              className="min-h-[40px] px-4 py-2 bg-[#1257D6] text-[#FFFFFF] text-xs font-bold rounded-xl hover:bg-[#0E46AF] transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>إضافة منتج</span>
            </button>
          </CardContent>
        </Card>
      </section>

      {/* ملاحظة معمارية تقنية موجزة وهادئة للمطور */}
      <footer className="pt-2 text-center text-xs text-[#64748B]">
        <span>نظام الإدارة الداخلي — يتطلب الربط الحي اتصال خادم المصادقة وقاعدة البيانات</span>
      </footer>
    </div>
  );
};
