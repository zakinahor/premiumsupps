import React from 'react';
import { ShieldCheck, Truck, FlaskConical, MapPin } from 'lucide-react';

interface CtaHeroStripProps {
  onShopAll: () => void;
}

export const CtaHeroStrip: React.FC<CtaHeroStripProps> = ({ onShopAll }) => {
  return (
    <section
      id="cta-hero-strip"
      className="relative w-full min-h-[420px] sm:min-h-[580px] bg-black text-white overflow-hidden flex flex-col justify-between py-12 sm:py-16"
    >
      {/* Background Image */}
      <picture className="absolute inset-0 z-0 pointer-events-none">
        <source
          media="(max-width: 749px)"
          srcSet="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/bg-mobile.png?v=1780044361"
        />
        <source
          media="(min-width: 750px)"
          srcSet="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/bg-desktop.png?v=1780044362"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/bg-desktop.png?v=1780044362"
          alt="Stop buying supplements you cannot trust"
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
      </picture>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-1" />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 my-auto">
        <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-bold text-[#e6c96b] uppercase tracking-widest block">
          UP TO 50% OFF — SITEWIDE
        </span>

        <h2 className="font-['Instrument_Sans'] text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05]">
          STOP BUYING SUPPLEMENTS YOU CAN'T TRUST.
        </h2>

        <p className="text-stone-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
          Every ingredient. Every dose. Every certificate. All on the label, all backed by a third-party lab.
        </p>

        <div className="pt-4">
          <button
            onClick={() => {
              document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#e6c96b] hover:bg-[#d8b855] text-black font-['Instrument_Sans'] font-extrabold text-sm uppercase tracking-wider py-4 px-10 rounded-full shadow-2xl transition-all transform hover:-translate-y-0.5"
          >
            SHOP ALL PRODUCTS
          </button>
        </div>
      </div>

      {/* Bottom 4 Trust Items Grid */}
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-10 border-t border-white/20 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          
          <div className="flex items-center gap-2.5 text-stone-300">
            <ShieldCheck className="w-5 h-5 text-[#edd065] flex-shrink-0" />
            <span className="font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider text-white">
              30-DAY GUARANTEE
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-stone-300">
            <Truck className="w-5 h-5 text-[#edd065] flex-shrink-0" />
            <span className="font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider text-white">
              FREE SHIPPING $150+
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-stone-300">
            <FlaskConical className="w-5 h-5 text-[#edd065] flex-shrink-0" />
            <span className="font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider text-white">
              LAB TESTED
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-stone-300">
            <MapPin className="w-5 h-5 text-[#edd065] flex-shrink-0" />
            <span className="font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider text-white">
              AUSTRALIAN MADE
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
