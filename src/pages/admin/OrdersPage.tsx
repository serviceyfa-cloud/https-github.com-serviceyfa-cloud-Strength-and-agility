import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';

type OrderStatusFilter = 'all' | 'pending_payment' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export const OrdersPage: React.FC = () => {
  // لا توجد بيانات وهمية - المصفوفة فارغة تماماً
  const [orders] = useState<unknown[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusFilter>('all');

  const statusFilters: { id: OrderStatusFilter; label: string }[] = [
    { id: 'all', label: 'كافة الطلبات' },
    { id: 'pending_payment', label: 'بانتظار الدفع' },
    { id: 'processing', label: 'قيد التجهيز' },
    { id: 'shipped', label: 'تم الشحن' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'cancelled', label: 'ملغي' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة إدارة الطلبات */}
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              إدارة الطلبات
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              0 طلبات
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            متابعة ومعالجة طلبات المتجر، وحالات الدفع والشحن فور اكتمال دورة الشراء.
          </p>
        </div>
      </header>

      {/* تنبيه معماري حول متطلبات ربط الطلبات */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#1257D6] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-[#475569] leading-relaxed">
          <span className="font-bold text-[#0F172A] block mb-0.5">جاهزية بنية الطلبات:</span>
          النظام المعماري مهيأ لاستقبال بيانات الطلبات (رقم الطلب، تاريخ الطلب، بيانات العميل، المنتجات، الإجمالي، حالة الدفع، وحالة الشحن) تلقائياً بمجرد تفعيل واجهة برمجة التطبيقات (Orders API) ونظام قاعدة البيانات.
        </div>
      </div>

      {/* أدوات البحث والتصفية (هيكل واجهة معتمد) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* شريط التصنيفات للطلبات */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {statusFilters.map((filter) => {
            const isActive = selectedStatus === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedStatus(filter.id)}
                className={`min-h-[44px] px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap select-none ${
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

        {/* حقل البحث التجريبي للطلبات */}
        <div className="relative min-w-[240px]">
          <input
            type="search"
            placeholder="بحث برقم الطلب أو اسم العميل..."
            disabled
            className="w-full min-h-[44px] ps-9 pe-3 py-2 text-xs bg-[#F8FAFC] text-[#0F172A] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-xl cursor-default"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* مساحة العرض الرئيسية: Empty State النظيف المهني */}
      <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
        <CardContent className="py-20 sm:py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">
            لا توجد طلبات مسجلة حالياً
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed mb-6">
            ستظهر الطلبات الجديدة وتفاصيلها الكاملة فور إتمام العملاء لعمليات الشراء وربط خادم المتجر (Backend API).
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-[#94A3B8] bg-[#F8FAFC] px-4 py-2 rounded-xl border border-[#E2E8F0]">
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>بانتظار تسجيل أول طلب حقيقي عبر المتجر</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
