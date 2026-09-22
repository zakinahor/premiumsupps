import React from 'react';
import { Zap, Activity, Brain, ShieldCheck } from 'lucide-react';

interface IngredientsStandardProps {
  onOpenLabTests: () => void;
}

export const IngredientsStandard: React.FC<IngredientsStandardProps> = ({ onOpenLabTests }) => {
  return (
    <section
      id="ingredients-standard"
      className="py-16 sm:py-24 bg-white border-b border-stone-200 overflow-hidden relative"
      style={{
        backgroundImage: `url('https://cdn.shopify.com/s/files/1/0811/8701/2888/files/bkjbjk.png?v=1780065662')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Soft Overlay */}
      <div className="absolute inset-0 bg-white/92 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest block mb-1.5">
            THE STANDARD WE SET
          </span>
          <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl md:text-5xl font-black text-[#0d0d0d] uppercase tracking-tight leading-tight">
            DOSED FOR RESULTS. NOT FOR THE LABEL.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            We formulate every product at the dose the research actually uses. Not a fraction of it.
          </p>
        </div>

        {/* Primary Feature Card: 6,000mg L-Citrulline */}
        <div className="bg-[#edd065] rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-300 mb-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Stat Left */}
          <div className="text-center lg:text-left flex-shrink-0 lg:border-r lg:border-stone-800/20 lg:pr-10">
            <span className="font-['Instrument_Sans'] font-black text-5xl sm:text-6xl text-[#0d0d0d] block leading-none">
              6,000mg
            </span>
            <span className="font-['Instrument_Sans'] font-extrabold text-xs sm:text-sm text-stone-800 uppercase tracking-wider mt-2 block">
              PURE L-CITRULLINE PER SERVE
            </span>
          </div>

          {/* Description Center */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-['Instrument_Sans'] font-black text-xl sm:text-2xl text-[#0d0d0d] uppercase mb-2">
              NOT CITRULLINE MALATE. PURE CITRULLINE.
            </h3>
            <p className="text-stone-900 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
              Citrulline malate 2:1 gives you ~4g of actual citrulline from a 6g label. We use pure L-Citrulline so every gram drives nitric oxide, blood flow, and muscle fullness.
            </p>
          </div>

          {/* Action Right */}
          <div className="flex-shrink-0">
            <button
              onClick={onOpenLabTests}
              className="bg-[#0d0d0d] hover:bg-[#e75924] text-white font-['Instrument_Sans'] font-bold text-xs sm:text-sm uppercase tracking-wider py-4 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>See Lab Tests</span>
            </button>
          </div>

        </div>

        {/* Secondary Grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 400mg Caffeine */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#e75924] mb-5">
                <Zap className="w-6 h-6 stroke-current stroke-2" />
              </div>

              <h4 className="font-['Instrument_Sans'] font-black text-xl text-[#0d0d0d] uppercase mb-2">
                400mg Caffeine
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Paired 2:1 with L-Theanine. Drives energy, focus, and performance without crash or jitters. That's the full 400mg — not 200, not 250.
              </p>
            </div>
          </div>

          {/* Card 2: 4,000mg Beta Alanine */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#e75924] mb-5">
                <Activity className="w-6 h-6 stroke-current stroke-2" />
              </div>

              <h4 className="font-['Instrument_Sans'] font-black text-xl text-[#0d0d0d] uppercase mb-2">
                4,000mg Beta Alanine
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Full clinical dose. Buffers lactic acid so you push past the burn and hold intensity through the heaviest sets.
              </p>
            </div>
          </div>

          {/* Card 3: 1,000mg L-Tyrosine */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#e75924] mb-5">
                <Brain className="w-6 h-6 stroke-current stroke-2" />
              </div>

              <h4 className="font-['Instrument_Sans'] font-black text-xl text-[#0d0d0d] uppercase mb-2">
                1,000mg L-Tyrosine
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Supports neurotransmitter production under stress. Less fog, sharper sets, better mind-muscle connection throughout your session.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
