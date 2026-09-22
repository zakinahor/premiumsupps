import React from 'react';

export const SuperSaverBanner: React.FC = () => {
  return (
    <section id="super-saver-banner" className="py-8 sm:py-12 bg-white overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[360px] sm:min-h-[440px] flex items-center justify-center p-6 sm:p-12 shadow-xl">
          
          {/* Responsive Background Images */}
          <picture className="absolute inset-0 z-0 pointer-events-none">
            <source
              media="(max-width: 749px)"
              srcSet="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Cardmin_1.png?v=1780052917&width=750"
            />
            <source
              media="(min-width: 750px)"
              srcSet="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Card22_1.png?v=1780052850&width=1600"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Card22_1.png?v=1780052850"
              alt="Super Saver Sale"
              className="w-full h-full object-cover object-center opacity-85"
              loading="lazy"
            />
          </picture>

          {/* Dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />

          {/* Content Overlay */}
          <div className="relative z-20 max-w-xl text-left mr-auto space-y-4">
            <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-bold text-[#edd065] uppercase tracking-widest block">
              SUPER SAVER SALE
            </span>

            <h2 className="font-['Instrument_Sans'] text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
              Save Up To <strong className="text-[#edd065]">50%</strong>
            </h2>

            <p className="text-stone-200 text-sm sm:text-base font-medium leading-relaxed max-w-md">
              Open any product page to unlock maximum discounts sitewide. No promo code required.
            </p>

            <div className="pt-3">
              <button
                onClick={() => {
                  document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#edd065] hover:bg-[#d8b855] text-[#111111] font-['Instrument_Sans'] font-extrabold text-sm uppercase tracking-wider py-4 px-9 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Shop The Sale
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
