import React from 'react';
import { Container } from '../components/common/Container';
import { ArrowLeft } from 'lucide-react';

export interface HomePageProps {
  navigate?: (to: string) => void;
}

// مجالات عمل شركة الرشاقة والقوة
const COMPANY_DOMAINS = [
  {
    id: 'nutrition',
    title: 'التغذية الرياضية',
    description: 'توفير مكملات غذائية وحلول تغذوية مدروسة لمساندة الأداء البدني وتسريع الاستشفاء العضلي.',
  },
  {
    id: 'organic',
    title: 'الأغذية العضوية والطبيعية',
    description: 'منتجات غذائية طبيعية ومكونات عضوية نقية تدعم توازن الجسم ونمط الحياة الصحي اليومي.',
  },
  {
    id: 'wellness',
    title: 'الصحة العامة والعافية',
    description: 'فيتامينات أساسية ومستخلصات طبيعية لتعزيز المناعة، الحيوية، والنشاط المستدام.',
  },
];

// ركائز القيمة الأساسية
const CORE_PILLARS = [
  {
    id: 'standards',
    title: 'انتقاء دقيق ومعايير واضحة',
    description: 'نلتزم باختيار منتجات ذات مكونات نقية وموثوقة تواكب احتياج الرياضيين ومتبعي النمط الصحي.',
  },
  {
    id: 'focus',
    title: 'تخصص في الأداء واللياقة',
    description: 'نوجه اهتمامنا إلى دعم النشاط البدني وتوفير ما يحتاجه الممارس لتحقيق أهدافه الرياضية.',
  },
  {
    id: 'experience',
    title: 'تجربة ميسرة وموثوقة',
    description: 'منصة رقمية سلسة تتيح الاطلاع على تفاصيل المنتجات والوصول إلى متجرنا التجاري بسهولة.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const handleNavigateToShop = () => {
    if (navigate) {
      navigate('/shop');
    } else {
      window.history.pushState({}, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="w-full text-start" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. Hero: واجهة افتتاحية هادئة واحترافية بدون خلفيات سوداء أو ألوان صفراء  */}
      {/* ========================================================================= */}
      <section className="bg-[#F8FAFC] text-[#0F172A] border-b border-[#E2E8F0] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl space-y-5">
            <span className="inline-block px-3 py-1 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1257D6] tracking-wider select-none">
              شركة الرشاقة والقوة
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.3] text-[#0F172A]">
              ريادة متخصصة في التغذية الرياضية ونمط الحياة الصحي
            </h1>

            <p className="text-sm sm:text-base font-normal text-[#475569] leading-relaxed max-w-2xl">
              وجهة متخصصة تُعنى بتقديم حلول غذائية ورياضية متكاملة لدعم اللياقة البدنية والنشاط اليومي من خلال خيارات موثوقة ومختارة بعناية.
            </p>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[48px] px-7 py-3 bg-[#1257D6] hover:bg-[#1B64EB] active:bg-[#0E46AF] text-[#FFFFFF] font-semibold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6] select-none"
              >
                <span>اكتشف المتجر</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. من نحن: صياغة تحريرية واضحة ومفتوحة دون حاويات مغلقة                  */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20" aria-label="من نحن">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold text-[#1257D6] tracking-wider block mb-2">
                من نحن
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight leading-snug">
                نعمل على تمكين نمط حياة رياضي وصحي متوازن
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base font-normal text-[#475569] leading-relaxed max-w-2xl">
              <p>
                تأسست «الرشاقة والقوة» لتكون وجهة موثوقة للمهتمين بالنشاط البدني والتغذية السليمة، حيث نعمل على توفير خيارات غذائية ومكملات تساهم في تحقيق التوازن الصحي والأداء الرياضي المنشود.
              </p>
              <p>
                نؤمن بأن كل تقدم رياضي يبدأ من أسس غذائية صحيحة؛ لذلك نوجه اهتمامنا نحو تقديم منتجات واضحة المعايير ومناسبة لمختلف مستويات اللياقة.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. مجالاتنا: تقسيم معماري متزن بالأعمدة والمساحات دون أيقونات عشوائية    */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20 border-t border-[#E2E8F0]" aria-label="مجالاتنا">
        <Container>
          <div className="mb-10 sm:mb-12 max-w-2xl">
            <span className="text-xs font-bold text-[#1257D6] tracking-wider block mb-2">
              مجالاتنا
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-2">
              ركائز عملنا واهتمامنا
            </h2>
            <p className="text-sm font-normal text-[#475569] leading-relaxed">
              المحاور الأساسية التي نركز عليها لخدمة الرياضيين والمهتمين بالصحة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {COMPANY_DOMAINS.map((domain) => (
              <div key={domain.id} className="space-y-2.5">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                  {domain.title}
                </h3>
                <p className="text-sm font-normal text-[#475569] leading-relaxed">
                  {domain.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. لماذا الرشاقة والقوة: تسلسل بصري نظيف يستند على الخطوط والمحاذاة      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20 border-t border-[#E2E8F0]" aria-label="لماذا الرشاقة والقوة">
        <Container>
          <div className="mb-10 sm:mb-12 max-w-2xl">
            <span className="text-xs font-bold text-[#1257D6] tracking-wider block mb-2">
              قيمنا ومعاييرنا
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-2">
              لماذا الرشاقة والقوة؟
            </h2>
            <p className="text-sm font-normal text-[#475569] leading-relaxed">
              مبادئنا الثابتة في تقديم تجربة موثوقة تلائم احتياجاتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {CORE_PILLARS.map((pillar) => (
              <div key={pillar.id} className="space-y-2.5">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm font-normal text-[#475569] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. CTA نهائي: دعوة واضحة ومباشرة بدون خلفية سوداء                         */}
      {/* ========================================================================= */}
      <section className="bg-[#F8FAFC] text-[#0F172A] border-t border-[#E2E8F0] py-16 sm:py-20 text-center" aria-label="دعوة لزيارة المتجر">
        <Container>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              تفضل بزيارة متجرنا التجاري
            </h2>
            <p className="text-sm sm:text-base font-normal text-[#475569] leading-relaxed">
              استكشف تشكيلة المكملات الغذائية، الأغذية العضوية، ومستلزمات اللياقة المتاحة لدى الرشاقة والقوة.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[48px] px-8 py-3 bg-[#1257D6] hover:bg-[#1B64EB] active:bg-[#0E46AF] text-[#FFFFFF] font-semibold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6] select-none"
              >
                <span>تصفح المتجر</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
