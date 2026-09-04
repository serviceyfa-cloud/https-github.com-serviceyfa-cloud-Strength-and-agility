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
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

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

const SECTIONS_WITH_CREATE: AdminSectionId[] = [
  'products',
  'categories',
  'orders',
  'customers',
  'promotions',
  'content',
  'media',
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#171816] flex flex-col" dir="rtl">
      {/* شريط الإدارة العلوي (Admin Topbar) */}
      <header className="h-16 bg-[#F6F2E9] border-b border-[#E5DFD3] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* زر القائمة للشاشات الصغيرة */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center rounded-[2px] text-[#171816] hover:bg-[#ECE5D8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E7D3B]"
            aria-label={isMobileMenuOpen ? 'إغلاق قائمة الإدارة' : 'فتح قائمة الإدارة'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-base font-bold text-[#171816] tracking-tight">
              لوحة تحكم المتجر
            </span>
            <Badge variant="gold" size="sm">
              Super Admin
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToStore ? (
            <button
              type="button"
              onClick={onNavigateToStore}
              className="inline-flex items-center gap-1.5 text-xs text-[#5D5F58] hover:text-[#171816] transition-colors py-2 px-2.5 rounded-[2px] hover:bg-[#ECE5D8]"
            >
              <span>عرض المتجر</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          ) : (
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#5D5F58] hover:text-[#171816] transition-colors py-2 px-2.5 rounded-[2px] hover:bg-[#ECE5D8]"
            >
              <span>عرض المتجر</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
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
          className={`fixed lg:static top-16 bottom-0 start-0 z-40 w-64 bg-[#F6F2E9] border-e border-[#E5DFD3] flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
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
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-[2px] text-xs sm:text-sm font-medium transition-colors text-start ${
                    isActive
                      ? 'bg-[#1F3327] text-[#FAF7F2]'
                      : 'text-[#2E302B] hover:bg-[#ECE5D8] hover:text-[#171816]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FAF7F2]' : 'text-[#5D5F58]'}`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#E5DFD3] text-start">
            <p className="text-[11px] text-[#7D7F77]">صلاحيات الإدارة الكاملة</p>
            <p className="text-xs font-medium text-[#171816]">admin@store.local</p>
          </div>
        </aside>

        {/* منطقة المحتوى الرئيسية القابلة للتوسع (Expandable Content Area) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* ترويسة القسم النشط */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[#E5DFD3]">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#171816] tracking-tight">
                  {currentNav.label}
                </h1>
                <p className="text-xs sm:text-sm text-[#5D5F58] mt-1">
                  إدارة وتنظيم بيانات قسم {currentNav.label} في المتجر.
                </p>
              </div>

              {SECTIONS_WITH_CREATE.includes(activeSection) && (
                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm">
                    إضافة عنصر جديد
                  </Button>
                </div>
              )}
            </div>

            {/* مساحة العمل والحاوية الرئيسية (Main Workspace Container) */}
            <Card className="bg-[#F6F2E9] border-[#E5DFD3]">
              <CardHeader>
                <CardTitle as="h2">منطقة العمل</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="py-12 sm:py-16 px-4 text-center rounded-[2px] border border-dashed border-[#DCD5C6] bg-[#FAF7F2]">
                  <currentNav.icon className="w-8 h-8 text-[#7D6126] mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-sm sm:text-base font-semibold text-[#171816] mb-1">
                    قسم {currentNav.label}
                  </h3>
                  <p className="text-xs text-[#5D5F58] max-w-md mx-auto leading-relaxed">
                    لا توجد عناصر مضافة حالياً ضمن هذا القسم.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
