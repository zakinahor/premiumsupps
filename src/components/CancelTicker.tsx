import React from 'react';

export const CancelTicker: React.FC = () => {
  const items = [
    'Banned Substances',
    'Proprietary Blends',
    'Hidden Fillers',
    'Under-Dosed Formulas',
    'Cheap Imports',
    'Label Math',
  ];

  return (
    <div className="bg-[#edd065] text-[#111111] py-3.5 overflow-hidden border-y border-stone-300 select-none">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] gap-10 font-['Instrument_Sans'] font-bold text-base sm:text-lg uppercase tracking-wider">
        {[...Array(6)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {items.map((item, itemIdx) => (
              <div key={itemIdx} className="inline-flex items-center gap-3.5">
                <span>{item}</span>
                {/* Red Cancel Icon SVG */}
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#d0473e] stroke-current stroke-2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M5.5 5.5l13 13" />
                  </svg>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
