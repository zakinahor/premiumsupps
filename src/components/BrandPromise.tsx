import React from 'react';
import { FlaskConical, Award, Globe, Zap, ArrowRight, ShieldAlert } from 'lucide-react';

interface BrandPromiseProps {
  onOpenLabTests: () => void;
}

export const BrandPromise: React.FC<BrandPromiseProps> = ({ onOpenLabTests }) => {
  return (
    <section id="why-us" className="py-20 bg-[#111111] text-white border-y border-stone-800 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-['Instrument_Sans'] font-extrabold uppercase tracking-widest text-[#D0473E]">
            THE PURITY STANDARD
          </span>
          <h2 className="text-3xl sm:text-5xl font-['Instrument_Sans'] font-black text-white mt-2 tracking-tight">
            PURE DOSES. NO FILLERS. NO EXCUSES.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            We eliminate deceptive proprietary blends, under-dosed marketing gimmicks, and artificial fillers.
            Every compound is formulated to clinical potency so you get raw, measurable results in the gym.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="bg-stone-900/80 rounded-2xl p-7 border border-stone-800 text-center hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-red-600/20 text-[#D0473E] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-500/30">
              <FlaskConical className="w-7 h-7" />
            </div>
            <h3 className="font-['Instrument_Sans'] font-bold text-lg text-white mb-2">
              100% Clinical Dosing
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Every single active ingredient is dosed at the exact clinical threshold verified in published scientific literature.
            </p>
          </div>

          <div className="bg-stone-900/80 rounded-2xl p-7 border border-stone-800 text-center hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-500/30">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-['Instrument_Sans'] font-bold text-lg text-white mb-2">
              HPLC Lab Verified
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Independent laboratory certificates verify raw powder purity, heavy metal exclusion, and zero cross-contamination.
            </p>
          </div>

          <div className="bg-stone-900/80 rounded-2xl p-7 border border-stone-800 text-center hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="font-['Instrument_Sans'] font-bold text-lg text-white mb-2">
              Australian Formulated
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Crafted and bottled in registered Australian cGMP facilities under strict TGA and environmental standards.
            </p>
          </div>

          <div className="bg-stone-900/80 rounded-2xl p-7 border border-stone-800 text-center hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-500/30">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-['Instrument_Sans'] font-bold text-lg text-white mb-2">
              Lightning Fast AU Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Orders placed before 2:00 PM AEST weekdays dispatch the same day via Australia Post Express.
            </p>
          </div>

        </div>

        {/* Lab Test CTA Banner */}
        <div className="bg-stone-950 rounded-3xl p-6 sm:p-8 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-blue-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-['Instrument_Sans'] font-bold text-base text-white">
                Want to see the independent lab test certificates?
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                We publish full HPLC chromatography batch analysis for creatine, bacteriostatic water, and amino acids.
              </p>
            </div>
          </div>

          <button
            id="view-lab-reports-btn"
            onClick={onOpenLabTests}
            className="bg-white hover:bg-stone-100 text-stone-900 font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full flex items-center gap-2 whitespace-nowrap shadow-md transition-colors"
          >
            <span>Inspect Batch Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
