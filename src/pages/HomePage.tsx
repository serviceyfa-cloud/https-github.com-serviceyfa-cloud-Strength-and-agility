import React from 'react';
import { Container } from '../components/common/Container';
import { ProductGrid } from '../components/common/ProductGrid';
import type { ProductCardProps } from '../components/common/ProductCard';
import {
  ArrowLeft,
  Package,
  Apple,
  Pill,
  Droplet,
  ShoppingBag,
  Shield,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export interface HomePageProps {
  products?: ProductCardProps[];
  navigate?: (to: string) => void;
}

// الأقسام الأربعة الموجودة فعلياً في المتجر فقط
const STORE_CATEGORIES = [
  {
    id: 'supplements',
    name: 'المكملات الغذائية',
    description: 'خيارات مخصصة لدعم الطاقة، البناء العضلي، والاستشفاء البدني.',
    icon: Package,
  },
  {
    id: 'organic-food',
    name: 'الأغذية العضوية',
    description: 'منتجات غذائية طبيعية ومكونات نقية لنمط حياة صحي ومتوازن.',
    icon: Apple,
  },
  {
    id: 'vitamins',
    name: 'الفيتامينات والمعادن',
    description: 'تركيبات أساسية لتعزيز المناعة والحفاظ على النشاط اليومي.',
    icon: Pill,
  },
  {
    id: 'natural-oils',
    name: 'الزيوت والمستخلصات',
    description: 'مستخلصات نباتية وزيوت نقية تدعم الصحة العامة والحيوية.',
    icon: Droplet,
  },
];

// نقاط القيمة الواقعية للمتجر (دون ادعاءات غير مؤكدة)
const STORE_VALUES = [
  {
    id: 'quality',
    title: 'جودة وانتقاء دقيق',
    description: 'نحرص على توفير منتجات ومكملات ذات معايير واضحة ومكونات موثوقة لدعم صحتك.',
    icon: Shield,
  },
  {
    id: 'fitness',
    title: 'تركيز على الرياضة والنشاط',
    description: 'خيارات مدروسة بعناية لتلبية متطلبات الرياضيين والمهتمين باللياقة البدنية.',
    icon: Activity,
  },
  {
    id: 'shopping',
    title: 'تجربة تسوق ميسرة',
    description: 'منصة تسوق سهلة ومرنة تتيح لك الوصول إلى احتياجاتك الغذائية والرياضية بسلاسة.',
    icon: CheckCircle2,
  },
];

export const HomePage: React.FC<HomePageProps> = ({ products = [], navigate }) => {
  const handleNavigateToShop = () => {
    if (navigate) {
      navigate('/shop');
    } else {
      window.history.pushState({}, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleScrollToCategories = () => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-12" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. Hero Section: واجهة افتتاحية قوية بدون صور وهمية أو Gradients          */}
      {/* ========================================================================= */}
      <section className="bg-[#050505] text-[#FFFFFF] border-b border-[#1E1E1E] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* المحتوى النصي الرئيسي والأزرار */}
            <div className="lg:col-span-7 space-y-5 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-[#D89B12] text-xs font-semibold select-none">
                <span>متجر الرشاقة والقوة</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-[#FFFFFF]">
                قوة في الأداء، <span className="text-[#D89B12]">وتكامل</span> في الرشاقة
              </h1>

              <p className="text-sm sm:text-base text-[#E0E0E0] leading-relaxed max-w-xl">
                وجهتك المتخصصة لتوفير المكملات الغذائية، الأغذية العضوية، والفيتامينات الأساسية لدعم أهدافك الرياضية وصحتك البدنية يومياً.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleNavigateToShop}
                  className="min-h-[48px] px-6 py-3 bg-[#D89B12] hover:bg-[#F0B51B] active:bg-[#B8820E] text-[#050505] font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] select-none"
                >
                  <span>تسوق الآن</span>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToCategories}
                  className="min-h-[48px] px-6 py-3 bg-[#141414] hover:bg-[#1C1C1C] active:bg-[#262626] text-[#FFFFFF] border border-[#262626] font-medium text-sm sm:text-base rounded-xl transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] select-none"
                >
                  <span>استكشف الأقسام</span>
                </button>
              </div>
            </div>

            {/* مساحة بصرية تيبوغرافية راقية بدون صور ستوك أو أرقام وهمية */}
            <div className="lg:col-span-5">
              <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 text-start space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#050505] border border-[#262626] text-[#D89B12] flex items-center justify-center font-black text-sm select-none">
                  ر·ق
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#FFFFFF]">الرشاقة والقوة</h2>
                  <p className="text-xs sm:text-sm text-[#777777] mt-1 leading-relaxed">
                    منظومة متكاملة للياقة البدنية، التغذية الصحية، ونمط الحياة النشط.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-xs text-[#E0E0E0]">
                  <span>التصنيفات المتاحة</span>
                  <span className="font-semibold text-[#D89B12]">4 أقسام رئيسية</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. Categories Section: الأقسام الأربعة فقط                                  */}
      {/* ========================================================================= */}
      <section id="categories" className="scroll-mt-24" aria-label="أقسام المتجر">
        <Container>
          <div className="mb-6 sm:mb-8 text-start">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#161A18] tracking-tight mb-2">
              تسوق حسب القسم
            </h2>
            <p className="text-xs sm:text-sm text-[#4B534E] leading-relaxed">
              تصفح التشكيلات المخصصة لاحتياجاتك الصحية والرياضية اليومية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STORE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={handleNavigateToShop}
                  className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-xl p-5 sm:p-6 text-start flex flex-col justify-between hover:border-[#D89B12] transition-colors cursor-pointer group select-none min-h-[160px]"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5E1DA] text-[#161A18] group-hover:text-[#D89B12] group-hover:border-[#D89B12] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#161A18] group-hover:text-[#D89B12] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#4B534E] mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-[#E5E1DA] flex items-center gap-1 text-xs font-semibold text-[#161A18] group-hover:text-[#D89B12] transition-colors">
                    <span>عرض المنتجات</span>
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. Products Section: المنتجات المختارة من مصدر البيانات الفعلي              */}
      {/* ========================================================================= */}
      <section aria-label="منتجات مختارة">
        <Container>
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 text-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#161A18] tracking-tight mb-2">
                منتجات مختارة
              </h2>
              <p className="text-xs sm:text-sm text-[#4B534E] leading-relaxed">
                تشكيلة مخصصة لدعم نشاطك الرياضي وتوازنك الصحي.
              </p>
            </div>
            <button
              type="button"
              onClick={handleNavigateToShop}
              className="min-h-[48px] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#161A18] hover:text-[#D89B12] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] rounded-lg select-none"
            >
              <span>عرض كل المنتجات</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {products.length > 0 ? (
            <ProductGrid items={products} />
          ) : (
            <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E5E1DA] text-[#D89B12] flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#161A18] mb-1">
                لا توجد منتجات معروضة حالياً
              </h3>
              <p className="text-xs sm:text-sm text-[#4B534E] mb-5 leading-relaxed max-w-md mx-auto">
                يتم تحديث قائمة المنتجات المختارة في المتجر. يمكنك زيارة صفحة المتجر للاطلاع على التحديثات.
              </p>
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[48px] px-5 py-2.5 bg-[#161A18] hover:bg-[#262626] text-[#FFFFFF] text-xs sm:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12]"
              >
                تصفح المتجر
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. Store Values Section: 3 نقاط قيمة واقعية دون أرقام أو شهادات وهمية      */}
      {/* ========================================================================= */}
      <section aria-label="قيم المتجر">
        <Container>
          <div className="mb-6 sm:mb-8 text-start">
            <h2 className="text-xl sm:text-2xl font-bold text-[#161A18] tracking-tight mb-1">
              لماذا متجر الرشاقة والقوة؟
            </h2>
            <p className="text-xs sm:text-sm text-[#4B534E]">
              معاييرنا الأساسية في تقديم المنتجات الرياضية والصحية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {STORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.id}
                  className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-xl p-5 sm:p-6 text-start space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5E1DA] text-[#1257D6] flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#161A18]">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4B534E] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. Final CTA: دعوة للتسوق مباشرة إلى /shop                                */}
      {/* ========================================================================= */}
      <section aria-label="الدعوة للتسوق">
        <Container>
          <div className="bg-[#050505] text-[#FFFFFF] border border-[#1E1E1E] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
              جاهز لبدء رحلتك نحو الرشاقة والقوة؟
            </h2>
            <p className="text-xs sm:text-sm text-[#E0E0E0] max-w-lg mx-auto leading-relaxed">
              استكشف خيارات المكملات والأغذية الصحية المتاحة في متجرنا الآن لدعم أهدافك الرياضية.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[48px] px-8 py-3 bg-[#D89B12] hover:bg-[#F0B51B] active:bg-[#B8820E] text-[#050505] font-bold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] select-none"
              >
                <span>تسوق الآن</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
