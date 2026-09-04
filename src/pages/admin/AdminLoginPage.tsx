import React from 'react';
import { Lock, ShieldAlert, ArrowLeft, Server, KeyRound } from 'lucide-react';
import { Button } from '../../components/common/Button';

export interface AdminLoginPageProps {
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
}

/**
 * صفحة إيضاح بنية المصادقة الإدارية
 * توضح بوضوح انفصال واجهة الإدارة (Admin UI) عن خادم المصادقة (Backend Auth)
 * دون تخزين أي كلمات مرور أو ادعاء وجود حماية إنتاجية محلية.
 */
export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onNavigateHome,
  onNavigateAdmin,
}) => {
  return (
    <div
      className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 text-start select-none"
      dir="rtl"
    >
      <div className="w-full max-w-lg">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center mb-4">
              <Lock className="w-7 h-7" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-[#1257D6] tracking-wider uppercase mb-1">
              إدارة المتجر
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              بنية التحقق والمصادقة
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-sm leading-relaxed">
              توضيح معمارية الأمان والربط الفعلي لخادم المصادقة (Backend Auth API).
            </p>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] space-y-3">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#1257D6] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold text-[#0F172A] mb-1">انفصال واجهة الإدارة عن المصادقة:</p>
                <p className="text-[#475569]">
                  لا يحتوي هذا الكود على أي كلمات مرور، ولا حساب مدير وهمي، ولا نظام JWT محلي.
                  الأمان والتحقق الفعلي يتطلبان ربط خادم وسيط (Backend Authentication Service) يتعامل مع جلسات آمنة (HttpOnly Cookies أو Bearer Tokens).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={onNavigateAdmin}
              className="w-full min-h-[48px] font-bold"
            >
              الانتقال إلى واجهة لوحة الإدارة (UI Only)
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onNavigateHome}
              className="w-full min-h-[48px] font-semibold"
            >
              العودة للمتجر الرئيسي
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
