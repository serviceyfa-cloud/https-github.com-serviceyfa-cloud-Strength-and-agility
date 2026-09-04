/**
 * بنية التحقق والمصادقة الإدارية (Admin Authentication Architecture)
 * 
 * ملاحظة معمارية هامة:
 * هذا الملف يحدد العقود والأنماط البرمجية (Types & Interfaces) المطلوبة لربط لوحة الإدارة
 * بخادم مصادقة مركزي حقيقي (Backend Authentication API).
 * 
 * لا يحتوي هذا المشروع على:
 * - أي حساب مدير وهمي أو أسماء مستخدمين ثابتة
 * - أي كلمات مرور مشفرة أو مخزنة داخل المتصفح (Frontend)
 * - أي نظام JWT محلي وهمي أو محاكاة أمان كاذبة
 * 
 * واجهة الإدارة الحالية تعمل كطبقة عرض (UI Only) بانتظار التكامل مع خادم مصادقة فعلي.
 */

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'store_manager';
  permissions: string[];
}

export type AuthIntegrationStatus = 
  | 'unconfigured'      // لا يوجد Backend متصل حالياً
  | 'connecting'        // جاري الاتصال بالخادم
  | 'authenticated'     // تم التحقق بنجاح عبر الخادم
  | 'unauthenticated';   // لم يتم تسجيل الدخول

export interface AdminAuthContract {
  /** حالة الاتصال بالخادم */
  status: AuthIntegrationStatus;
  /** بيانات المستخدم المسجل بعد تحقق الخادم الفعلي */
  currentUser: AdminUser | null;
  /** هل يوجد خادم مصادقة نشط حالياً */
  isBackendAuthConnected: boolean;
  /** تنبيه الشفافية المعمارية */
  securityNotice: string;
}

export const ADMIN_AUTH_DEFAULT_STATE: AdminAuthContract = {
  status: 'unconfigured',
  currentUser: null,
  isBackendAuthConnected: false,
  securityNotice:
    'واجهة الإدارة غير متصلة بخادم مصادقة بعد (Backend Auth API). الواجهة تعمل حالياً في وضع واجهة المستخدم (UI Only) دون ادعاء وجود حماية أمنية إنتاجية.',
};
