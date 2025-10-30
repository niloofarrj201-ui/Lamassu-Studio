import React, { useState, useEffect } from 'react';
import { ServiceCard } from './components/ServiceCard';
import { InstagramIcon } from './components/InstagramIcon';
import { Header } from './components/Header';
import { LocationPinIcon } from './components/LocationPinIcon';
import { ContactIcon } from './components/ContactIcon';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { OrderForm } from './components/OrderForm';
import { SocialMediaHelper } from './components/SocialMediaHelper';

const services = [
  { title: "عکاسی", description: "ثبت لحظات خاص شما با بالاترین کیفیت" },
  { title: "فیلمبرداری", description: "ساخت ویدیوهای حرفه‌ای و جذاب" },
  { title: "تیزرهای تبلیغاتی", description: "معرفی برند شما به بهترین شکل" },
  { title: "تولید محتوا", description: "خلق محتوای خلاقانه برای شبکه‌های اجتماعی" }
];

const App: React.FC = () => {
  const [isKeySelected, setIsKeySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      // The `window.aistudio` object is provided by the execution environment.
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsKeySelected(hasKey);
      } else {
        console.warn('AI Studio context not found. Assuming local development.');
        // For local dev, you might want to bypass this check.
        // Here, we default to showing the key selector if the context is missing.
      }
      setIsLoading(false);
    };

    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Per guidelines, assume selection is successful to avoid race conditions
      // and immediately render the app.
      setIsKeySelected(true);
    }
  };

  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen w-full"
        style={{ backgroundColor: '#46236A' }}
      >
        <div className="text-center text-white">
          <svg className="animate-spin h-8 w-8 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-display text-2xl">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isKeySelected) {
    return (
       <div 
        className="relative min-h-screen w-full flex items-center justify-center p-4"
        style={{
          backgroundColor: '#46236A',
          backgroundImage: "url('/images/pattern.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-center text-white p-8 max-w-lg mx-auto bg-black/40 backdrop-blur-sm rounded-xl border border-amber-200/30 animate-fade-in-up">
          <h1 className="font-display text-4xl text-amber-50 mb-4">
            تنظیم کلید API
          </h1>
          <p className="text-white/80 mb-6 leading-relaxed">
            برای استفاده از قابلیت‌های هوش مصنوعی این برنامه، لطفاً کلید Gemini API خود را انتخاب کنید.
          </p>
          <button 
            onClick={handleSelectKey}
            className="w-full flex-shrink-0 flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-full text-purple-900 font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            انتخاب کلید Gemini API
          </button>
          <p className="text-xs text-white/60 mt-4">
            با ادامه، شما با شرایط استفاده و صورت‌حساب مربوط به استفاده از API موافقت می‌کنید. 
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
              اطلاعات بیشتر درباره صورت‌حساب
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative min-h-screen w-full"
      style={{
        backgroundColor: '#46236A',
        backgroundImage: "url('/images/pattern.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="relative z-20 flex flex-col min-h-screen text-white">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center w-full px-6 sm:px-8 py-16 md:py-20">
            <div className="animate-fade-in-down">
              <h1 className="font-display text-6xl md:text-8xl text-amber-50 drop-shadow-lg">
                Lamassu Studio
              </h1>
              <p className="mt-4 text-lg md:text-xl text-amber-100/80">
                با لاماسو شروع‌کن، بزرگ فکرکن، دیده شو
              </p>
            </div>
          </section>

          {/* Services Section */}
          <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 pb-20 md:pb-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={service.title} 
                  title={service.title} 
                  description={service.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </section>

          <section id="about" className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: '#3c145a' }}>
              <div 
                  className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-5 pointer-events-none"
              ></div>
              <div className="relative z-10 container mx-auto px-6 sm:px-8 text-center animate-fade-in-up">
                  <h2 className="font-display text-4xl md:text-5xl text-amber-50 mb-6">درباره ما</h2>
                  <div className="max-w-2xl mx-auto">
                      <p className="text-white/80 text-lg leading-relaxed mb-4">
                      استودیو لاماسو، با مدیریت نیلوفر رجبی، با هدف خلق آثاری بی‌نظیر و ماندگار در زمینه عکاسی و فیلم‌سازی تاسیس شد.
                      </p>
                      <p className="text-white/80 text-lg leading-relaxed">
                      ما باور داریم که هر برند و هر فردی داستانی برای گفتن دارد و وظیفه ما به تصویر کشیدن این داستان‌ها با خلاقیت و هنر است. تیم ما با استفاده از جدیدترین تجهیزات و نگاهی هنرمندانه، به شما کمک می‌کند تا بهترین وجه خود را به نمایش بگذارید و در دنیای پررقابت امروز، متمایز باشید.
                      </p>
                  </div>
              </div>
          </section>

          <SocialMediaHelper />

          <OrderForm />
        </main>

        <footer className="w-full text-white" style={{ background: 'linear-gradient(90deg, #3c145a 0%, #8c1c6f 100%)' }}>
          <div className="container mx-auto px-6 sm:px-8 py-6 text-center sm:text-right">
            {/* Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Column 1: Lamassu Studio */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-display text-xl mb-4">لامآسو استودیو</h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    تبلیغات یعنی درگیر کردن احساس مخاطب. برند شدن ارایه یک هویت است؛ هویتی که از یک رویا شکل می‌گیرد.
                    </p>
                     <ul className="space-y-3 text-sm text-white/80 mb-4 text-left">
                        <li className="flex items-center justify-center sm:justify-start gap-3">
                            <LocationPinIcon className="w-5 h-5 flex-shrink-0"/>
                            <span>شاهین شهر</span>
                        </li>
                        <li className="flex items-center justify-center sm:justify-start gap-3">
                            <ContactIcon className="w-5 h-5 flex-shrink-0"/>
                            <span>contact@lamassu.studio</span>
                        </li>
                    </ul>
                    <div className="flex items-center gap-4 mt-auto">
                        <a href="https://wa.me/+989123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/80 hover:text-white transition-colors"><WhatsAppIcon className="w-7 h-7" /></a>
                        <a href="https://www.instagram.com/lamassu_studio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors"><InstagramIcon className="w-7 h-7" /></a>
                    </div>
                </div>

                {/* Column 2: Other Pages */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-display text-xl mb-4">سایر صفحات</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-white/80 hover:text-white transition-colors">خانه</a></li>
                        <li><a href="https://www.instagram.com/niloofar_rajabi_/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">دوره های آموزشی</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">نمونه کارها</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">مقالات آموزشی</a></li>
                        <li><a href="#about" className="text-white/80 hover:text-white transition-colors">درباره ما</a></li>
                        <li><a href="#order-form" className="text-white/80 hover:text-white transition-colors">تماس با ما</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10 my-6"></div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Column 3: Collaboration Forms */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-display text-xl mb-4">فرم های همکاری</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">پرسشنامه شناخت برند</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">پرسشنامه ثبت سفارش عکاسی</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">پرسشنامه ثبت سفارش ویدیو</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">پرسشنامه ثبت سفارش گرافیک</a></li>
                    </ul>
                </div>

                {/* Column 4: More Links */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-display text-xl mb-4">لینک های بیشتر</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">شرایط خدمات دهی</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white transition-colors">سوالات متداول</a></li>
                    </ul>
                </div>
            </div>
          </div>
          <div className="border-t border-white/10 bg-black/20">
              <div className="container mx-auto px-6 sm:px-8 h-12 flex justify-center items-center text-sm">
                  <p className="text-white/70 text-xs sm:text-sm">
                      کلیه حقوق متعلق به استودیو لامآسو می باشد. © ۱۴۰۴
                  </p>
              </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
