import React from 'react';
import { Container } from '../components/common/Container';
import {
  ArrowLeft,
  Dumbbell,
  Apple,
  HeartPulse,
  ShieldCheck,
  Target,
  Sparkles,
} from 'lucide-react';

export interface HomePageProps {
  navigate?: (to: string) => void;
}

// مجالات عمل شركة الرشاقة والقوة الواقعية (تغذية، رياضة، صحة)
const COMPANY_DOMAINS = [
  {
    id: 'nutrition',
    title: 'التغذية الرياضية',
    description: 'توفير مكملات غذائية وحلول تغذوية مدروسة لمساندة الأداء البدني وتسريع الاستشفاء العضلي.',
    icon: Dumbbell,
  },
  {
    id: 'organic',
    title: 'الأغذية العضوية والطبيعية',
    description: 'منتجات غذائية طبيعية ومكونات عضوية نقية تدعم توازن الجسم ونمط الحياة الصحي اليومي.',
    icon: Apple,
  },
  {
    id: 'wellness',
    title: 'الصحة العامة والعافية',
    description: 'فيتامينات أساسية ومستخلصات طبيعية لتعزيز المناعة، الحيوية، والنشاط المستدام.',
    icon: HeartPulse,
  },
];

// ركائز القيمة الأساسية الواقعية
const CORE_PILLARS = [
  {
    id: 'standards',
    title: 'انتقاء دقيق ومعايير واضحة',
    description: 'نلتزم باختيار منتجات ذات مكونات نقية وموثوقة تواكب احتياج الرياضيين ومتبعي النمط الصحي.',
    icon: ShieldCheck,
  },
  {
    id: 'focus',
    title: 'تخصص في الأداء واللياقة',
    description: 'نوجه اهتمامنا إلى دعم النشاط البدني وتوفير ما يحتاجه الممارس لتحقيق أهدافه الرياضية.',
    icon: Target,
  },
  {
    id: 'experience',
    title: 'تجربة ميسرة وموثوقة',
    description: 'منصة رقمية سلسة تتيح الاطلاع على تفاصيل المنتجات والوصول إلى متجرنا التجاري بسهولة.',
    icon: Sparkles,
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
    <div className="w-full space-y-12 sm:space-y-16 pb-16" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. Hero: واجهة تعريفية بشركة الرشاقة والقوة                               */}
      {/* ========================================================================= */}
      <section className="bg-[#050505] text-[#FFFFFF] border-b border-[#1E1E1E] py-14 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* المحتوى التعريفي الرئيسي */}
            <div className="lg:col-span-8 space-y-5 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-[#D89B12] text-xs font-semibold select-none">
                <span>شركة الرشاقة والقوة</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-[#FFFFFF]">
                ريادة متخصصة في <span className="text-[#D89B12]">التغذية الرياضية</span> ونمط الحياة الصحي
              </h1>

              <p className="text-sm sm:text-base text-[#E0E0E0] leading-relaxed max-w-2xl">
                وجهة متخصصة تُعنى بتقديم حلول غذائية ورياضية متكاملة لدعم اللياقة البدنية والنشاط اليومي من خلال خيارات موثوقة ومختارة بعناية.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNavigateToShop}
                  className="min-h-[48px] px-7 py-3 bg-[#D89B12] hover:bg-[#F0B51B] active:bg-[#B8820E] text-[#050505] font-bold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] select-none"
                >
                  <span>اكتشف المتجر</span>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* مساحة بصرية تيبوغرافية راقية بدون صور ستوك */}
            <div className="lg:col-span-4">
              <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 text-start space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#050505] border border-[#262626] text-[#D89B12] flex items-center justify-center font-black text-sm select-none">
                  ر·ق
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#FFFFFF]">الرشاقة والقوة</h2>
                  <p className="text-xs sm:text-sm text-[#777777] mt-1.5 leading-relaxed">
                    منظومة سعودية تركز على التكامل بين اللياقة البدنية، الغذاء الطبيعي، والصحة المستدامة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. من نحن: تعريف مختصر ومباشر دون ادعاءات                                 */}
      {/* ========================================================================= */}
      <section aria-label="من نحن">
        <Container>
          <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-6 sm:p-10 lg:p-12 text-start max-w-4xl mx-auto space-y-4">
            <div className="inline-block text-xs font-bold text-[#D89B12] tracking-wide">
              من نحن
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#161A18] tracking-tight leading-snug">
              نعمل على تمكين نمط حياة رياضي وصحي متوازن
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#4B534E] leading-relaxed">
              <p>
                تأسست «الرشاقة والقوة» لتكون وجهة موثوقة للمهتمين بالنشاط البدني والتغذية السليمة، حيث نعمل على توفير خيارات غذائية ومكملات تساهم في تحقيق التوازن الصحي والأداء الرياضي المنشود.
              </p>
              <p>
                نؤمن بأن كل تقدم رياضي يبدأ من أسس غذائية صحيحة؛ لذلك نوجه كل اهتمامنا نحو تقديم منتجات واضحة المعايير ومناسبة لمختلف مستويات اللياقة.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. مجالاتنا: تغذية، رياضة، صحة                                            */}
      {/* ========================================================================= */}
      <section aria-label="مجالاتنا">
        <Container>
          <div className="mb-6 sm:mb-8 text-start">
            <div className="inline-block text-xs font-bold text-[#1257D6] tracking-wide mb-1">
              مجالاتنا
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#161A18] tracking-tight">
              ركائز عملنا واهتمامنا
            </h2>
            <p className="text-xs sm:text-sm text-[#4B534E] mt-1 leading-relaxed">
              المحاور الأساسية التي نركز عليها لخدمة الرياضيين والمهتمين بالصحة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {COMPANY_DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.id}
                  className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-xl p-6 text-start flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5E1DA] text-[#161A18] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-[#161A18]">
                      {domain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B534E] leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. لماذا الرشاقة والقوة: 3 نقاط واقعية ومباشرة                            */}
      {/* ========================================================================= */}
      <section aria-label="لماذا الرشاقة والقوة">
        <Container>
          <div className="mb-6 sm:mb-8 text-start">
            <div className="inline-block text-xs font-bold text-[#D89B12] tracking-wide mb-1">
              قيمنا ومعاييرنا
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#161A18] tracking-tight">
              لماذا الرشاقة والقوة؟
            </h2>
            <p className="text-xs sm:text-sm text-[#4B534E] mt-1 leading-relaxed">
              مبادئنا الثابتة في تقديم تجربة موثوقة تلائم احتياجاتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {CORE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-xl p-6 text-start space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5E1DA] text-[#D89B12] flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#161A18]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B534E] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. CTA نهائي: دعوة واضحة لزيارة المتجر                                    */}
      {/* ========================================================================= */}
      <section aria-label="دعوة لزيارة المتجر">
        <Container>
          <div className="bg-[#050505] text-[#FFFFFF] border border-[#1E1E1E] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
              تفضل بزيارة متجرنا التجاري
            </h2>
            <p className="text-xs sm:text-sm text-[#E0E0E0] max-w-lg mx-auto leading-relaxed">
              استكشف تشكيلة المكملات الغذائية، الأغذية العضوية، ومستلزمات اللياقة المتاحة لدى الرشاقة والقوة.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNavigateToShop}
                className="min-h-[48px] px-8 py-3 bg-[#D89B12] hover:bg-[#F0B51B] active:bg-[#B8820E] text-[#050505] font-bold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89B12] select-none"
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
