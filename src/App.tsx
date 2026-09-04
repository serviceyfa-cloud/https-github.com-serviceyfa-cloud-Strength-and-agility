import React, { useState, useEffect, useCallback } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Badge } from './components/common/Badge';
import { Container } from './components/common/Container';
import { Button } from './components/common/Button';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { cn } from './utils/cn';

// الصفحات الموجودة فعلياً في المشروع
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProductsPage } from './pages/admin/ProductsPage';
import { ProductEditorPage } from './pages/admin/ProductEditorPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { MediaPage } from './pages/admin/MediaPage';
import { StoreSettingsPage } from './pages/admin/StoreSettingsPage';

interface AdminNavLink {
  href: string;
  label: string;
}

const ADMIN_NAV_LINKS: AdminNavLink[] = [
  { href: '/admin', label: 'لوحة التحكم' },
  { href: '/admin/products', label: 'المنتجات' },
  { href: '/admin/products/new', label: 'إضافة منتج' },
  { href: '/admin/categories', label: 'التصنيفات' },
  { href: '/admin/media', label: 'الوسائط' },
  { href: '/admin/settings', label: 'الإعدادات' },
];

const normalizePath = (path: string): string => {
  const clean = path.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean || '/';
};

interface CartPageProps {
  onNavigateToShop: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="w-full py-10 sm:py-20 flex-1 flex items-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-8 sm:p-12">
            <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" aria-hidden="true" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#161A18] mb-2 tracking-tight">
              سلة المشتريات
            </h1>
            <p className="text-sm text-[#4B534E] mb-6 leading-relaxed">
              سلتك فارغة حالياً. تصفح تشكيلتنا من المنتجات الصحية والرياضية لإضافة ما يناسبك.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={onNavigateToShop}
              className="min-w-[160px]"
            >
              تصفح المتجر
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="w-full py-16 sm:py-24 flex-1 flex items-center bg-[#FFFFFF] text-start" dir="rtl">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 sm:p-12">
            <span className="text-xs sm:text-sm font-bold text-[#1257D6] tracking-wide block mb-3 select-none">
              404
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
              الصفحة غير موجودة
            </h1>
            <p className="text-sm sm:text-base text-[#475569] mb-8 leading-relaxed">
              عذراً، الصفحة التي تحاول الوصول إليها غير متاحة أو قد تم نقلها.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={onNavigateHome}
              className="min-w-[160px]"
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navigate: (to: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPath, navigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#161A18] flex flex-col" dir="rtl">
      {/* شريط الملاحة الخاص بالإدارة */}
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E5E1DA] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 gap-3">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-sm sm:text-base text-[#161A18] tracking-tight">
                إدارة المتجر
              </span>
              <Badge variant="gold" size="sm">
                Admin
              </Badge>
            </div>

            {/* روابط أقسام الإدارة */}
            <nav className="flex items-center gap-1 overflow-x-auto py-1" aria-label="أقسام الإدارة">
              {ADMIN_NAV_LINKS.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.href);
                    }}
                    className={cn(
                      'px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap select-none',
                      isActive
                        ? 'bg-[#1A4736] text-[#FAF8F5]'
                        : 'text-[#4B534E] hover:text-[#161A18] hover:bg-[#EBF3EF]'
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* زر العودة للمتجر */}
          <div className="flex items-center shrink-0">
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                navigate('/shop');
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#4B534E] hover:text-[#1A4736] font-medium py-1.5 px-3 rounded-lg hover:bg-[#EBF3EF] transition-colors"
            >
              <span>عرض المتجر</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      {/* مساحة المحتوى الإداري */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );

  const navigate = useCallback((to: string) => {
    const [pathPart, hashPart] = to.split('#');
    const normalized = normalizePath(pathPart);
    const fullTarget = hashPart ? `${normalized}#${hashPart}` : normalized;

    if (window.location.pathname !== normalized || (hashPart && window.location.hash !== `#${hashPart}`)) {
      window.history.pushState({}, '', fullTarget);
    }
    setCurrentPath(normalized);

    if (hashPart) {
      setTimeout(() => {
        const element = document.getElementById(hashPart);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // الاستماع لأحداث الرجوع والتقدم في المتصفح
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      if (window.location.hash) {
        const hash = window.location.hash.slice(1);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // معالجة النقر على الروابط الداخلية لدعم تجربة SPA سلسة
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (target.hasAttribute('download') || target.getAttribute('target') === '_blank') return;

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [navigate]);

  // تحديد الصفحة المعروضة بناءً على المسار
  const renderContent = () => {
    switch (currentPath) {
      case '/admin':
        return (
          <div dir="rtl" className="min-h-screen flex flex-col">
            {/* شريط سريع للتنقل بين شاشات الإدارة من داخل لوحة التحكم */}
            <div className="bg-[#1A4736] text-[#FAF8F5] px-4 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#14372A]">
              <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                <span className="font-semibold text-[#D6E4DC] shrink-0">
                  مسارات الإدارة المتاحة:
                </span>
                <a
                  href="/admin/products"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/products');
                  }}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap"
                >
                  المنتجات
                </a>
                <a
                  href="/admin/products/new"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/products/new');
                  }}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap"
                >
                  إضافة منتج
                </a>
                <a
                  href="/admin/categories"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/categories');
                  }}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap"
                >
                  التصنيفات
                </a>
                <a
                  href="/admin/media"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/media');
                  }}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap"
                >
                  الوسائط
                </a>
                <a
                  href="/admin/settings"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/settings');
                  }}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap"
                >
                  الإعدادات
                </a>
              </div>
              <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/shop');
                }}
                className="text-[#D6E4DC] hover:text-white font-medium inline-flex items-center gap-1 shrink-0"
              >
                <span>عرض المتجر</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
            <AdminDashboardPage onNavigateToStore={() => navigate('/shop')} />
          </div>
        );

      case '/admin/products':
        return (
          <AdminLayout currentPath={currentPath} navigate={navigate}>
            <ProductsPage />
          </AdminLayout>
        );

      case '/admin/products/new':
        return (
          <AdminLayout currentPath={currentPath} navigate={navigate}>
            <ProductEditorPage />
          </AdminLayout>
        );

      case '/admin/categories':
        return (
          <AdminLayout currentPath={currentPath} navigate={navigate}>
            <CategoriesPage />
          </AdminLayout>
        );

      case '/admin/media':
        return (
          <AdminLayout currentPath={currentPath} navigate={navigate}>
            <MediaPage />
          </AdminLayout>
        );

      case '/admin/settings':
        return (
          <AdminLayout currentPath={currentPath} navigate={navigate}>
            <StoreSettingsPage />
          </AdminLayout>
        );

      case '/cart':
        return (
          <MainLayout currentPath={currentPath} navigate={navigate}>
            <CartPage onNavigateToShop={() => navigate('/shop')} />
          </MainLayout>
        );

      case '/':
        return (
          <MainLayout currentPath={currentPath} navigate={navigate}>
            <HomePage navigate={navigate} />
          </MainLayout>
        );

      case '/shop':
        return (
          <MainLayout currentPath={currentPath} navigate={navigate}>
            <ShopPage />
          </MainLayout>
        );

      default:
        return (
          <MainLayout currentPath={currentPath} navigate={navigate}>
            <NotFoundPage onNavigateHome={() => navigate('/')} />
          </MainLayout>
        );
    }
  };

  return <>{renderContent()}</>;
}
