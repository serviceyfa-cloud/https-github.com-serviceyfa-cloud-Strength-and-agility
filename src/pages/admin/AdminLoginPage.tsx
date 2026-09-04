import React, { useState } from 'react';
import { Lock, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { STORE_CONFIG } from '../../constants/config';

export interface AdminLoginPageProps {
  onNavigateHome: () => void;
}

/**
 * بوابة الدخول الإدارية (Admin Access Gate)
 * 
 * تحمي منطقة الإدارة معمارياً بحيث لا يُسمح بالوصول إلى لوحة الإدارة
 * بدون مصادقة حقيقية عبر خادم مركزي (Backend Auth API).
 * لا تتيح هذه البوابة أي تجاوز تجريبي (No Sandbox Bypass)،
 * ولا تعتمد على أي اعتمادات أو كلمات مرور وهمية.
 */
export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigateHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // لا يوجد Backend Auth حالياً — نوضح للمستخدم بمهنية أن بوابة الدخول غير مفعلة
    setAuthNotice(
      'خدمة تسجيل الدخول بانتظار ربط خادم الأمان والمصادقة (Backend Auth API). لا يمكن تسجيل الدخول أو تجاوز هذه البوابة بدون التحقق الفعلي من الخادم.'
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 text-start select-none"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8">
          {/* رأس بطاقة الدخول */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center mb-3.5">
              <Lock className="w-7 h-7" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-[#1257D6] tracking-wider uppercase mb-1">
              {STORE_CONFIG.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              بوابة الدخول الإدارية
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              منطقة مخصصة لإدارة المتجر ومحمية بنظام التحقق المعماري.
            </p>
          </div>

          {/* تنبيه عند محاولة تسجيل الدخول بدون خادم */}
          {authNotice && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-start flex items-start gap-2.5 text-xs text-[#1E40AF] leading-relaxed"
            >
              <AlertCircle className="w-4 h-4 text-[#1257D6] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{authNotice}</span>
            </div>
          )}

          {/* نموذج تسجيل الدخول الإداري */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5 text-start">
              <label
                htmlFor="admin-username"
                className="text-xs sm:text-sm font-semibold text-[#0F172A]"
              >
                اسم المستخدم أو البريد الإلكتروني
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@example.com"
                dir="ltr"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1257D6] focus:ring-1 focus:ring-[#1257D6] focus:outline-none transition-colors"
                autoComplete="username"
              />
            </div>

            <div className="space-y-1.5 text-start">
              <label
                htmlFor="admin-password"
                className="text-xs sm:text-sm font-semibold text-[#0F172A]"
              >
                كلمة المرور
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1257D6] focus:ring-1 focus:ring-[#1257D6] focus:outline-none transition-colors"
                autoComplete="current-password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-[48px] px-4 py-2.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 select-none"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                <span>تسجيل الدخول</span>
              </button>
            </div>
          </form>

          {/* إيضاح أمني معماري موجز */}
          <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center space-y-3">
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              هذه البوابة تتطلب ربط خدمة المصادقة الخلفية (Backend Auth) للتحقق من بيانات الدخول. لا تتوفر أي آليات تجاوز محلية أو تجريبية لضمان سلامة الإجراءات الأمنية.
            </p>

            <button
              type="button"
              onClick={onNavigateHome}
              className="w-full min-h-[44px] px-4 py-2 bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold text-xs sm:text-sm rounded-xl border border-[#E2E8F0] transition-colors inline-flex items-center justify-center gap-2 select-none"
            >
              <ArrowLeft className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
              <span>العودة للمتجر الرئيسي</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

