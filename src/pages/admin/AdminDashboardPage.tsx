import React, { useState } from 'react';
import {
  LayoutGrid,
  Package,
  Tags,
  ShoppingBag,
  Users,
  Percent,
  FileText,
  Image as ImageIcon,
  Settings,
  Search,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';

export type AdminSectionId =
  | 'overview'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'promotions'
  | 'content'
  | 'media'
  | 'settings'
  | 'seo'
  | 'permissions';

interface NavItem {
  id: AdminSectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'الرئيسية', icon: LayoutGrid },
  { id: 'products', label: 'المنتجات', icon: Package },
  { id: 'categories', label: 'التصنيفات', icon: Tags },
  { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
  { id: 'customers', label: 'العملاء', icon: Users },
  { id: 'promotions', label: 'العروض والكوبونات', icon: Percent },
  { id: 'content', label: 'المحتوى', icon: FileText },
  { id: 'media', label: 'الصور والوسائط', icon: ImageIcon },
  { id: 'settings', label: 'إعدادات المتجر', icon: Settings },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'permissions', label: 'المستخدمون والصلاحيات', icon: ShieldCheck },
];

export interface AdminDashboardPageProps {
  onNavigateToStore?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigateToStore,
}) => {
  const [activeSection, setActiveSection] = useState<AdminSectionId>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentNav = NAV_ITEMS.find((item) => item.id === activeSection) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#161A18] flex flex-col select-none" dir="rtl">
      {/* شريط الإدارة العلوي (Admin Topbar) */}
      <header className="h-16 bg-[#FFFFFF] border-b border-[#E5E1DA] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* زر القائمة للشاشات الصغيرة */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden min-w-[48px] min-h-[48px] p-2.5 inline-flex items-center justify-center rounded-lg text-[#161A18] hover:bg-[#EBF3EF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            aria-label={isMobileMenuOpen ? 'إغلاق قائمة الإدارة' : 'فتح قائمة الإدارة'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-base font-bold text-[#161A18] tracking-tight">
              لوحة تحكم المتجر
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToStore ? (
            <button
              type="button"
              onClick={onNavigateToStore}
              className="min-h-[48px] inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4B534E] hover:text-[#161A18] transition-colors px-3 py-2 rounded-lg hover:bg-[#EBF3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            >
              <span>عرض المتجر</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <a
              href="/"
              className="min-h-[48px] inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4B534E] hover:text-[#161A18] transition-colors px-3 py-2 rounded-lg hover:bg-[#EBF3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736]"
            >
              <span>عرض المتجر</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      {/* الهيكل الرئيسي (Sidebar + Main Content Area) */}
      <div className="flex-1 flex w-full relative">
        {/* خلفية معتمة للجوال عند فتح القائمة */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-x-0 top-16 bottom-0 bg-black/25 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* الشريط الجانبي (Sidebar Navigation) */}
        <aside
          className={`fixed lg:static top-16 bottom-0 start-0 z-40 w-64 bg-[#FFFFFF] border-e border-[#E5E1DA] flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="p-3 space-y-1" aria-label="أقسام لوحة التحكم">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeSection;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4736] ${
                    isActive
                      ? 'bg-[#1A4736] text-[#FAF8F5]'
                      : 'text-[#4B534E] hover:bg-[#EBF3EF] hover:text-[#161A18]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FAF8F5]' : 'text-[#4B534E]'}`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#E5E1DA] text-start">
            <p className="text-xs font-semibold text-[#161A18]">إدارة المتجر</p>
            <p className="text-[11px] text-[#4B534E] mt-0.5">الرشاقة والقوة</p>
          </div>
        </aside>

        {/* منطقة المحتوى الرئيسية */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* ترويسة القسم النشط */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[#E5E1DA]">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#161A18] tracking-tight">
                  {currentNav.label}
                </h1>
                <p className="text-xs sm:text-sm text-[#4B534E] mt-1">
                  إدارة وتنظيم بيانات قسم {currentNav.label} في المتجر.
                </p>
              </div>
            </div>

            {/* بطاقة عرض محتوى القسم (Empty State النظيف) */}
            <Card className="bg-[#FFFFFF] border-[#E5E1DA] rounded-xl">
              <CardContent className="py-16 sm:py-20 px-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] flex items-center justify-center mx-auto mb-3 text-[#1A4736]">
                  <currentNav.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-[#161A18] mb-1">
                  قسم {currentNav.label}
                </h2>
                <p className="text-xs sm:text-sm text-[#4B534E] max-w-md mx-auto leading-relaxed">
                  لا توجد عناصر مضافة حالياً ضمن هذا القسم.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
