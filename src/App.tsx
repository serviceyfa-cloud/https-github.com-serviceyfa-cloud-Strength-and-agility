import React, { useState, useEffect, useCallback } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Container } from './components/common/Container';
import { Button } from './components/common/Button';
import { ShoppingBag } from 'lucide-react';

// الصفحات العامة
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';

// صفحات لوحة الإدارة
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProductsPage } from './pages/admin/ProductsPage';
import { ProductEditorPage } from './pages/admin/ProductEditorPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { MediaPage } from './pages/admin/MediaPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { InvoicesPage } from './pages/admin/InvoicesPage';
import { StoreSettingsPage } from './pages/admin/StoreSettingsPage';

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
    <div className="w-full py-10 sm:py-20 flex-1 flex items-center bg-[#FFFFFF] text-start" dir="rtl">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 sm:p-12">
            <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1257D6] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" aria-hidden="true" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2 tracking-tight">
              سلة المشتريات
            </h1>
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
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

  // الاستماع لأحداث التنقل في المتصفح
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

  // معالجة النقر على الروابط الداخلية لدعم تجربة SPA متسقة
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

  // التحقق مما إذا كان المسار يتبع منطقة الإدارة
  const isAdminRoute = currentPath.startsWith('/admin');

  // حالة المصادقة الإدارية المعمارية
  // في هذه المرحلة لا يوجد Backend Auth، لذا القيمة false دائماً ولا يوجد تجاوز تجريبي
  const [isAdminAuthenticated] = useState<boolean>(false);

  // تحديد الصفحة المعروضة بناءً على المسار
  const renderContent = () => {
    // 1. مسارات الإدارة (منطقة محمية معمارياً)
    if (isAdminRoute) {
      // حجب لوحة الإدارة وعرض بوابة الدخول إذا لم تكن هناك مصادقة حقيقية
      if (!isAdminAuthenticated) {
        return <AdminLoginPage onNavigateHome={() => navigate('/')} />;
      }

      // في حال توفر مصادقة حقيقية مستقبلاً، يُسمح بالوصول إلى لوحة الإدارة
      switch (currentPath) {
        case '/admin':
          return (
            <AdminLayout currentPath={currentPath} navigate={navigate}>
              <AdminDashboardPage
                onNavigate={navigate}
                onNavigateToStore={() => navigate('/shop')}
              />
            </AdminLayout>
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

        case '/admin/orders':
          return (
            <AdminLayout currentPath={currentPath} navigate={navigate}>
              <OrdersPage />
            </AdminLayout>
          );

        case '/admin/invoices':
          return (
            <AdminLayout currentPath={currentPath} navigate={navigate}>
              <InvoicesPage />
            </AdminLayout>
          );

        case '/admin/settings':
          return (
            <AdminLayout currentPath={currentPath} navigate={navigate}>
              <StoreSettingsPage />
            </AdminLayout>
          );

        default:
          return (
            <AdminLayout currentPath={currentPath} navigate={navigate}>
              <NotFoundPage onNavigateHome={() => navigate('/admin')} />
            </AdminLayout>
          );
      }
    }

    // 2. مسارات الموقع التجاري العام (باستخدام MainLayout)
    switch (currentPath) {
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

      case '/cart':
        return (
          <MainLayout currentPath={currentPath} navigate={navigate}>
            <CartPage onNavigateToShop={() => navigate('/shop')} />
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
