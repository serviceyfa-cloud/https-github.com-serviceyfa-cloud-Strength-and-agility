import React, { useState } from 'react';
import { Search, AlertCircle, FileCheck, Receipt } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';

export type InvoicePaymentStatus = 'pending' | 'paid' | 'refunded';
export type InvoiceStatus = 'draft' | 'issued' | 'cancelled';

export interface InvoiceCustomerInfo {
  name: string;
  taxNumber?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

/**
 * بنية سجل الفاتورة (Invoice Schema Contract)
 * مهيأة معمارياً لاستقبال بيانات الفواتير الحقيقية فور ربط منظومة الفوترة وبوابة الدفع.
 */
export interface Invoice {
  invoiceNumber: string;
  orderNumber: string;
  customerInformation: InvoiceCustomerInfo;
  items: InvoiceItem[];
  amount: number;
  vatAmount?: number;
  vatRate?: number;
  paymentStatus: InvoicePaymentStatus;
  invoiceStatus: InvoiceStatus;
  issuedAt?: string;
}

type InvoiceStatusFilter = 'all' | InvoiceStatus;

export const InvoicesPage: React.FC = () => {
  // لا توجد سجلات وهمية - مصفوفة فارغة تماماً
  const [invoices] = useState<Invoice[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatusFilter>('all');

  const statusFilters: { id: InvoiceStatusFilter; label: string }[] = [
    { id: 'all', label: 'كافة الفواتير' },
    { id: 'issued', label: 'فواتير صادرة' },
    { id: 'draft', label: 'مسودات' },
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
            <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE]">
              بانتظار نظام الفوترة الحقيقي
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            سجلات الفواتير ومتابعة المعاملات المالية المعتمدة فور اكتمال دورة الشراء والدفع.
          </p>
        </div>
      </header>

      {/* تنبيه معماري وقانوني صريح حول الفوترة الإلكترونية */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#1257D6] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs text-[#475569] leading-relaxed">
            <span className="font-bold text-[#0F172A] block mb-1">
              متطلبات وتوضيح الفوترة الإلكترونية:
            </span>
            <p className="mb-1.5">
              لا يدّعي النظام حالياً إصدار فواتير إلكترونية معتمدة قانونياً، ولا يحتوي على أي شهادات امتثال أو أختام رسمية. 
            </p>
            <p>
              الهيكل البرمجي مهيأ فقط كواجهة وعقد بيانات (رقم الفاتورة، رقم الطلب، بيانات العميل، تفاصيل البنود، المبلغ الإجمالي، وحساب الضريبة إن وجدت). تشغيل الفوترة الحية يتطلب استكمال الربط الفعلي مع:
              <strong className="text-[#0F172A]"> الخادم (Backend)</strong>، 
              <strong className="text-[#0F172A]"> بوابة الدفع (Payment Provider)</strong>، 
              و<strong className="text-[#0F172A]"> مزود خدمة الفوترة المعتمد</strong>.
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
                className={`min-h-[48px] px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap select-none ${
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

        <div className="relative min-w-[260px]">
          <input
            type="search"
            placeholder="بحث برقم الفاتورة أو رقم الطلب..."
            disabled
            className="w-full min-h-[48px] ps-9 pe-3 py-2 text-xs bg-[#FFFFFF] text-[#0F172A] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-xl cursor-default"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* مساحة العرض الرئيسية: حالة الفراغ المهنية */}
      <Card className="bg-[#FFFFFF] border-[#E2E8F0] rounded-2xl shadow-none">
        <CardContent className="py-20 sm:py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#1257D6] border border-[#BFDBFE] flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">
            لا توجد فواتير مسجلة حالياً
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed mb-6">
            ستظهر الفواتير الصادرة وتفاصيلها المالية تلقائياً فور إتمام أول عملية شراء ودفع إلكتروني حقيقي عبر المتجر.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-[#64748B] bg-[#F8FAFC] px-4 py-2 rounded-xl border border-[#E2E8F0]">
            <FileCheck className="w-3.5 h-3.5 text-[#1257D6]" aria-hidden="true" />
            <span>بانتظار ربط مزود الدفع ونظام الفوترة الفعلي</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
