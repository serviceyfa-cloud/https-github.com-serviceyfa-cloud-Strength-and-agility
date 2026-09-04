import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft, Store, KeyRound, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/common/Button';

export interface AdminLoginPageProps {
  onAuthenticate: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onAuthenticate,
  onNavigateHome,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attemptError, setAttemptError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // النظام لا يحتوي على بيانات دخول ثابتة أو وهمية
    setAttemptError(
      'لم يتم ربط خادم مصادقة حقيقي (Backend Authentication API) بعد للتحقق من بيانات الاعتماد المدخلة. يمكنك تفعيل جلسة المعاينة الإدارية لاستعراض الهيكل المعماري بأمان.'
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 text-start select-none"
      dir="rtl"
    >
      <div className="w-full max-w-lg">
        {/* بطاقة الدخول المعتمدة بنمط White + Blue */}
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          {/* الشعار والترويسة */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center mb-4">
              <Lock className="w-7 h-7" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-[#1257D6] tracking-wider uppercase mb-1">
              منطقة المسؤول
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              بوابة إدارة المتجر
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-sm leading-relaxed">
              هذه المنطقة مخصصة لإدارة العمليات التجارية لمتجر الرشاقة والقوة وغير متاحة للتصفح العام.
            </p>
          </div>

          {/* تنبيه أمني معماري شفاف وصريح */}
          <div className="mb-6 p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF]">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#1257D6] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold text-[#0F172A] mb-1">تنبيه أمني ومعماري:</p>
                <p className="text-[#334155]">
                  مسارات الإدارة محمية بالكامل بواسطة حارس التحقق (Admin Guard). المصادقة الإنتاجية
                  تتطلب ربط خادم مصادقة مركزي (Backend Auth API). الكود لا يحتوي على أي كلمات مرور
                  أو حسابات ثابتة مسبقاً.
                </p>
              </div>
            </div>
          </div>

          {/* رسالة الخطأ عند محاولة إدخال بيانات دون backend */}
          {attemptError && (
            <div className="mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs leading-relaxed">{attemptError}</p>
              </div>
            </div>
          )}

          {/* نموذج إدخال بيانات الاعتماد */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5"
              >
                اسم المستخدم أو البريد الإداري
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                placeholder="أدخل المعرّف الإداري"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1257D6] focus:border-[#1257D6] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5"
              >
                كلمة المرور
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1257D6] focus:border-[#1257D6] transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full min-h-[48px] font-bold"
              >
                تسجيل الدخول (يتطلب اتصال الخادم)
              </Button>

              <button
                type="button"
                onClick={onAuthenticate}
                className="w-full min-h-[48px] px-4 py-2.5 bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[#1257D6] rounded-xl text-xs sm:text-sm font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" aria-hidden="true" />
                <span>دخول وضع المعاينة الإدارية (Sandbox Mode)</span>
              </button>
            </div>
          </form>

          {/* روابط سريعة للعودة */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 hover:text-[#0F172A] font-medium transition-colors"
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>العودة للمتجر الرئيسي</span>
            </button>

            <span className="text-[11px] text-[#94A3B8]">إصدار إدارة المتجر 1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
