import React from 'react';
import { Container } from '../components/common/Container';

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
    <div className="w-full bg-[#FFFFFF] text-start" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. Hero: واجهة رئيسية ذات حضور قوي وتيبوغرافيا عربية متزنة               */}
      {/* ========================================================================= */}
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-36 bg-[#FFFFFF]">
        <Container>
          <div className="max-w-4xl space-y-8">
            <div className="inline-block">
              <span className="text-sm font-bold text-[#1257D6] tracking-wide select-none">
                شركة الرشاقة والقوة
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-[1.35] sm:leading-[1.3] tracking-tight">
              ريادة متخصصة في التغذية الرياضية ونمط الحياة الصحي
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-normal text-[#334155] leading-[1.8] sm:leading-[1.9] max-w-2xl">
              وجهة متخصصة تُعنى بتقديم حلول غذائية ورياضية متكاملة لدعم اللياقة البدنية والنشاط اليومي من خلال خيارات موثوقة ومختارة بعناية.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[52px] px-8 py-3.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-base rounded-xl transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6] focus-visible:ring-offset-2 select-none"
              >
                اكتشف المتجر
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. من نحن: صياغة تحريرية مريحة بتسلسل طباعي وتوزيع رحب                    */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC]" aria-label="من نحن">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-sm font-bold text-[#1257D6] tracking-wide block">
                من نحن
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] leading-[1.35] tracking-tight">
                نعمل على تمكين نمط حياة رياضي وصحي متوازن
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg font-normal text-[#334155] leading-[1.85]">
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
      {/* 3. مجالاتنا: هيكل معماري ثلاثي بمحاذاة نقية ومساحات متباعدة                */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#FFFFFF]" aria-label="مجالاتنا">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-20 space-y-4">
            <span className="text-sm font-bold text-[#1257D6] tracking-wide block">
              مجالاتنا
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] leading-[1.35] tracking-tight">
              ركائز عملنا واهتمامنا
            </h2>
            <p className="text-base sm:text-lg font-normal text-[#475569] leading-[1.8]">
              المحاور الأساسية التي نركز عليها لخدمة الرياضيين والمهتمين بالصحة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {COMPANY_DOMAINS.map((domain) => (
              <div key={domain.id} className="space-y-4">
                <div className="w-8 h-1 bg-[#1257D6] rounded-full" />
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                  {domain.title}
                </h3>
                <p className="text-base font-normal text-[#475569] leading-[1.8]">
                  {domain.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. لماذا الرشاقة والقوة: ركائز واضحة بترتيب بصري مريح                      */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F8FAFC]" aria-label="لماذا الرشاقة والقوة">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-20 space-y-4">
            <span className="text-sm font-bold text-[#1257D6] tracking-wide block">
              قيمنا ومعاييرنا
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] leading-[1.35] tracking-tight">
              لماذا الرشاقة والقوة؟
            </h2>
            <p className="text-base sm:text-lg font-normal text-[#475569] leading-[1.8]">
              مبادئنا الثابتة في تقديم تجربة موثوقة تلائم احتياجاتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {CORE_PILLARS.map((pillar) => (
              <div key={pillar.id} className="space-y-4">
                <div className="w-8 h-1 bg-[#1257D6] rounded-full" />
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-base font-normal text-[#475569] leading-[1.8]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. CTA نهائي: دعوة واضحة ومباشرة بأسلوب تجاري راقٍ                        */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#FFFFFF] text-center" aria-label="دعوة لزيارة المتجر">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] leading-[1.35] tracking-tight">
              تفضل بزيارة متجرنا التجاري
            </h2>
            <p className="text-base sm:text-lg font-normal text-[#475569] leading-[1.8]">
              استكشف تشكيلة المكملات الغذائية، الأغذية العضوية، ومستلزمات اللياقة المتاحة لدى الرشاقة والقوة.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[52px] px-9 py-3.5 bg-[#1257D6] hover:bg-[#0E46AF] active:bg-[#0C3B94] text-[#FFFFFF] font-bold text-base rounded-xl transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6] focus-visible:ring-offset-2 select-none"
              >
                تصفح المتجر
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
