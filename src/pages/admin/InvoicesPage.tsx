import React, { useState } from 'react';
import { FileText, Search, ShieldCheck, AlertCircle, FileCheck, Receipt } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';

type InvoiceStatusFilter = 'all' | 'issued' | 'paid' | 'pending' | 'cancelled';

export const InvoicesPage: React.FC = () => {
  // لا توجد بيانات وهمية - المصفوفة فارغة تماماً
  const [invoices] = useState<unknown[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatusFilter>('all');

  const statusFilters: { id: InvoiceStatusFilter; label: string }[] = [
    { id: 'all', label: 'كافة الفواتير' },
    { id: 'issued', label: 'صادرة' },
    { id: 'paid', label: 'مدفوعة' },
    { id: 'pending', label: 'قيد المراجعة' },
    { id: 'cancelled', label: 'ملغاة' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-start" dir="rtl">
      {/* ترويسة إدارة الفواتير */}
      <header className="pb-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              الفواتير والسجلات المالية
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              0 فواتير
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            سجلات الفواتير الضريبية ومتابعة الامتثال المالي والفوترة الإلكترونية فور اكتمال دورة الشراء.
          </p>
        </div>
      </header>

      {/* إشعار معماري وقانوني صريح حول الفوترة الإلكترونية والدفع */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#1257D6] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-bold text-xs sm:text-sm text-[#0F172A] block mb-1">
              متطلبات تفعيل الفوترة الإلكترونية والدفع الإلكتروني:
            </span>
            <p className="text-xs text-[#475569] leading-relaxed">
              الهيكل البرمجي مهيأ للتعامل مع بيانات الفواتير (رقم الفاتورة، رقم الطلب المرتبط، بيانات العميل، تفاصيل المنتجات، الإجمالي، وحساب ضريبة القيمة المضافة). إصدار الفواتير الإلكترونية المعتمدة (E-Invoicing) يتطلب وجود خادم وسيط (Backend Service)، وبوابة دفع معتمدة، والتكامل الفعلي مع نظام الفوترة المعتمد. لا يعتبر النظام متوافقاً أو مكتملاً للفوترة الحية بدون هذه الروابط الفعلية.
            </p>
          </div>
        </div>
      </div>

      {/* أدوات البحث والتصفية */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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

        <div className="relative min-w-[240px]">
          <input
            type="search"
            placeholder="بحث برقم الفاتورة أو رقم الطلب..."
            disabled
            className="w-full min-h-[44px] ps-9 pe-3 py-2 text-xs bg-[#F8FAFC] text-[#0F172A] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-xl cursor-default"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* مساحة العرض الرئيسية: Empty State */}
      <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
        <CardContent className="py-20 sm:py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE] flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">
            لا توجد فواتير صادرة حالياً
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed mb-6">
            ستظهر هنا الفواتير المسجلة تلقائياً وتفاصيلها المالية عند إتمام أول عملية دفع وتأكيد الطلب.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-[#94A3B8] bg-[#F8FAFC] px-4 py-2 rounded-xl border border-[#E2E8F0]">
            <FileCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>بانتظار ربط مزود الدفع وإتمام أول عملية شراء</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
