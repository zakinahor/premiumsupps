import React from 'react';
import { Eye, ShieldCheck, MapPin, ArrowUpRight } from 'lucide-react';

interface WhyPremiumSuppsProps {
  onOpenLabTests: () => void;
}

export const WhyPremiumSupps: React.FC<WhyPremiumSuppsProps> = ({ onOpenLabTests }) => {
  return (
    <section id="why-supps" className="py-14 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest block">
              WHY PREMIUMSUPPS
            </span>

            <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-tight leading-[1.1]">
              PURE DOSES. NO FILLERS.
              <br />
              NO EXCUSES.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              The Australian supplement shelf is full of products that look strong on the front and fall apart
              when you flip the tub. We built PremiumSupps because we were tired of buying products we couldn't trust.
            </p>

            {/* 3 Feature Cards */}
            <div className="space-y-4 pt-2">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fafafa] border border-stone-200 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#edd065] flex items-center justify-center flex-shrink-0 text-[#e75924]">
                  <Eye className="w-6 h-6 stroke-current stroke-2" />
                </div>
                <div>
                  <h3 className="font-['Instrument_Sans'] font-bold text-sm sm:text-base text-[#111111] uppercase">
                    FULL INGREDIENT TRANSPARENCY
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                    Every active ingredient listed by exact dose. Full transparency across all of our formulas. No label math.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fafafa] border border-stone-200 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#edd065] flex items-center justify-center flex-shrink-0 text-[#e75924]">
                  <ShieldCheck className="w-6 h-6 stroke-current stroke-2" />
                </div>
                <div>
                  <h3 className="font-['Instrument_Sans'] font-bold text-sm sm:text-base text-[#111111] uppercase">
                    TRUSTED QUALITY ASSURANCE
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                    Manufactured and tested to deliver reliable quality and ingredient integrity.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fafafa] border border-stone-200 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#edd065] flex items-center justify-center flex-shrink-0 text-[#e75924]">
                  <MapPin className="w-6 h-6 stroke-current stroke-2" />
                </div>
                <div>
                  <h3 className="font-['Instrument_Sans'] font-bold text-sm sm:text-base text-[#111111] uppercase">
                    FORMULATED IN AUSTRALIA
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                    Developed, manufactured, and quality-checked in Australia. Built here, for Australian athletes.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={onOpenLabTests}
                className="inline-flex items-center gap-1.5 font-['Instrument_Sans'] text-sm font-bold text-[#111111] hover:text-[#e75924] border-b-2 border-[#111111] pb-1 uppercase tracking-wider transition-colors"
              >
                <span>Our Story &amp; Lab Standards</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Image Collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg bg-[#f7f7f7] rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md">
              
              <img
                src="https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Premium_Supps_product.png"
                alt="Premium Supplements Australian Formulations"
                className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
                loading="lazy"
              />

              {/* Lab Tested Overlay Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-black text-white p-4 rounded-2xl border-2 border-[#edd065] shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#edd065] flex items-center justify-center text-black font-black text-xs">
                  HPLC
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    INDEPENDENT ASSAY
                  </span>
                  <span className="font-['Instrument_Sans'] font-black text-sm text-[#edd065] uppercase">
                    99%+ PURITY TESTED
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-stone-200">
          <div className="bg-[#fafafa] rounded-2xl p-5 text-center border border-stone-200">
            <span className="font-['Instrument_Sans'] font-black text-3xl sm:text-4xl text-[#111111] block mb-1">
              36K+
            </span>
            <span className="font-['Instrument_Sans'] font-semibold text-xs text-stone-600 uppercase tracking-wider">
              Australian Customers
            </span>
          </div>

          <div className="bg-[#fafafa] rounded-2xl p-5 text-center border border-stone-200">
            <span className="font-['Instrument_Sans'] font-black text-3xl sm:text-4xl text-[#e75924] block mb-1">
              4.9★
            </span>
            <span className="font-['Instrument_Sans'] font-semibold text-xs text-stone-600 uppercase tracking-wider">
              Average Review Score
            </span>
          </div>

          <div className="bg-[#fafafa] rounded-2xl p-5 text-center border border-stone-200">
            <span className="font-['Instrument_Sans'] font-black text-3xl sm:text-4xl text-[#111111] block mb-1">
              100%
            </span>
            <span className="font-['Instrument_Sans'] font-semibold text-xs text-stone-600 uppercase tracking-wider">
              Transparent Formulas
            </span>
          </div>

          <div className="bg-[#fafafa] rounded-2xl p-5 text-center border border-stone-200">
            <span className="font-['Instrument_Sans'] font-black text-3xl sm:text-4xl text-[#111111] block mb-1">
              16+
            </span>
            <span className="font-['Instrument_Sans'] font-semibold text-xs text-stone-600 uppercase tracking-wider">
              Products In Range
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
