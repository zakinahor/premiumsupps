import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    '100% PURE CLINICAL DOSING',
    'NO ARTIFICIAL FILLERS OR PROPRIETARY BLENDS',
    'AUSTRALIAN MADE & BOTTLED',
    'INDEPENDENT HPLC LAB TESTED',
    'FREE AU EXPRESS SHIPPING OVER $100',
    '36,000+ ATHLETES TRUST US',
    'SAME-DAY DISPATCH BEFORE 2PM AEST',
    '30-DAY MONEY BACK SATISFACTION GUARANTEE',
  ];

  return (
    <div id="marquee-ticker-bar" className="bg-[#111111] text-[#FBF6E0] py-3.5 border-y border-stone-800 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-6">
            <span className="font-['Instrument_Sans'] font-black text-xs sm:text-sm tracking-wider uppercase">
              {item}
            </span>
            <span className="text-[#D0473E] text-base font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
