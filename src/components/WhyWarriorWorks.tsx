import React from 'react';

export const WhyWarriorWorks: React.FC = () => {
  const cards = [
    {
      title: 'Clinical Doses',
      desc: 'Every active ingredient is dosed at the exact levels backed by clinical research. No under-dosed shortcuts.',
      iconUrl: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/crt.svg?v=1780050765',
    },
    {
      title: 'Full Transparency',
      desc: 'Clear, honest labeling. Every single active ingredient dosage is fully disclosed, so you know exactly what is fueling your body.',
      iconUrl: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/ico-eye_c897d2d5-1bca-4769-a34b-e3d25e396c6f.svg?v=1780045074',
    },
    {
      title: 'Built for Lifters',
      desc: 'Engineered for athletes who demand more from their training. Formulated for real performance, not marketing hype.',
      iconUrl: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/hash.svg?v=1780050799',
    },
    {
      title: 'Made in Australia',
      desc: 'Formulated, blended, and packed locally right here in Australia to meet strict high-quality standards.',
      iconUrl: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/location_1b338658-5847-425e-906e-59b790ea9c38.svg?v=1780049480',
    },
  ];

  return (
    <section id="why-warrior-works" className="py-16 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e85e34] uppercase tracking-widest block mb-2">
            What Sets Us Apart
          </span>
          <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d0d0d] uppercase tracking-tight leading-tight">
            No fluff. No fillers. Just results.
          </h2>
          <p className="text-[#646360] text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Most supplement brands are marketing companies that happen to sell powder. We're the opposite —
            performance scientists who focus entirely on premium formulas delivered straight to you.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#fafafa] rounded-2xl p-6 sm:p-7 border border-stone-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Subtle top right decorative circle */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#edd065]/10 rounded-full blur-xl pointer-events-none" />

              <div>
                {/* Yellow Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-[#edd065] flex items-center justify-center mb-6 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src={card.iconUrl}
                    alt={card.title}
                    className="w-6 h-6 object-contain"
                    loading="lazy"
                  />
                </div>

                <h3 className="font-['Instrument_Sans'] font-bold text-lg text-[#0d0d0d] uppercase tracking-tight mb-3">
                  {card.title}
                </h3>

                <p className="text-[#646360] text-sm leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
