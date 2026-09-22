import React, { useState } from 'react';
import { Star, Play, Check, X } from 'lucide-react';

export const LiveVideoReviews: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{
    id: number;
    title: string;
    customer: string;
    location: string;
    product: string;
    quote: string;
    poster: string;
  } | null>(null);

  const videoReviews = [
    {
      id: 1,
      customer: 'Jake T.',
      location: 'Bondi, NSW',
      product: 'Warrior KING Ultra High-Stim',
      title: 'Pumps are insane, no post-workout crash',
      quote: 'Switched from a high-priced US brand to Warrior KING. 10g L-Citrulline is noticeable immediately on arm day. Dosing is transparent and taste is super clean.',
      poster: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/preview_images/b9d2b8aa2b1244febfaef68613b0aa33.thumbnail.0000000000.jpg?v=1780078714',
    },
    {
      id: 2,
      customer: 'Sam M.',
      location: 'Melbourne, VIC',
      product: 'Micronised Creatine 200 Mesh',
      title: 'Dissolves completely with zero grit',
      quote: 'The 200-mesh micronised creatine is superior to anything at the local chemist. No stomach cramps, dissolves in cold water instantly.',
      poster: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/preview_images/c402cc5490214ac8aef9219e34096e63.thumbnail.0000000000.jpg?v=1780078629',
    },
    {
      id: 3,
      customer: 'Liam K.',
      location: 'Brisbane, QLD',
      product: 'Anabolic Stack',
      title: 'Best stack value in Australia',
      quote: 'Stacking the night warrior with pure creatine and shilajit. Recovery has doubled and sleep is uninterrupted. 50% bundle savings are legit.',
      poster: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/preview_images/adfa69546af34dca88b7c2017c6a31f7.thumbnail.0000000000.jpg?v=1780078621',
    },
    {
      id: 4,
      customer: 'Courtney B.',
      location: 'Perth, WA',
      product: 'Protein Water Passionfruit',
      title: 'Refreshing, zero milky texture',
      quote: 'Can not stand heavy milky whey after summer training. Protein water is light, tastes like real passionfruit and hits 25g protein per serve.',
      poster: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/preview_images/efaf8b1f14b547b9b173a947c7620216.thumbnail.0000000000.jpg?v=1780078630',
    },
    {
      id: 5,
      customer: 'Marcus H.',
      location: 'Gold Coast, QLD',
      product: 'Bacteriostatic Water 30ml',
      title: 'Pharmacy grade quality with HPLC certs',
      quote: 'Clean vials, sterile, benzyl alcohol exact 0.9%. Always delivered in 2 business days via Australia Post Express.',
      poster: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/preview_images/abb1dc84470641f1b81425fa816d4ae9.thumbnail.0000000000.jpg?v=1780078627',
    },
    {
      id: 6,
      customer: 'Dave P.',
      location: 'Adelaide, SA',
      product: 'Himalayan Shilajit Resin',
      title: 'Clean energy and mental clarity',
      quote: 'Mineral-rich resin with full heavy metals lab test verification. Gives me steady morning drive without caffeine dependency.',
      poster: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/preview_images/5a932166e02e4887bfe39887ee5c7f3c.thumbnail.0000000000.jpg?v=1780078624',
    },
  ];

  return (
    <section id="live-reviews" className="py-14 sm:py-20 bg-[#f5f5f5] border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Text Header */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest block">
              LIVE REVIEWS
            </span>

            <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight leading-[1.15]">
              JOIN 36,000+ AUSTRALIANS TRAINING HARDER
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Real people. Real results. See what our customers are saying about their training since switching to PremiumSupps.
            </p>

            {/* Stars Rating Score */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex text-[#e6b422]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#e6b422] text-[#e6b422]" />
                ))}
              </div>
              <span className="text-sm font-['Instrument_Sans'] font-bold text-[#111111]">
                <strong>4.9</strong> <span className="text-stone-500 font-normal">/ 1,200+ verified reviews</span>
              </span>
            </div>

            <div className="pt-2">
              <a
                href="https://premiumsupps.net/pages/reviews"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-['Instrument_Sans'] text-sm font-bold text-[#111111] hover:text-[#e75924] border-b border-[#c9a227] pb-1 uppercase tracking-wider transition-colors"
              >
                <span>Read All Reviews</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column Video Cards Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {videoReviews.map((rev) => (
                <div
                  key={rev.id}
                  onClick={() => setActiveVideo(rev)}
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-800 shadow-md cursor-pointer group transform hover:-translate-y-1 transition-all duration-300 border border-stone-200"
                >
                  <img
                    src={rev.poster}
                    alt={rev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                  {/* Verified Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 bg-black/80 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    <Check className="w-3 h-3 text-[#e6b422]" />
                    <span>VERIFIED CUSTOMER</span>
                  </div>

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-xl bg-stone-900/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-8 h-8 rounded-full bg-[#e6b422] text-black flex items-center justify-center pl-0.5 shadow-lg">
                        <Play className="w-4 h-4 fill-black text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Text Preview */}
                  <div className="absolute bottom-3 inset-x-3 text-white text-left z-10">
                    <p className="text-xs font-bold font-['Instrument_Sans'] line-clamp-2 leading-snug">
                      "{rev.title}"
                    </p>
                    <span className="text-[10px] text-stone-300 block mt-1">
                      {rev.customer} • {rev.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl z-10 border border-stone-200">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-black rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-1.5 text-[#e6b422] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#e6b422]" />
              ))}
              <span className="text-xs text-stone-500 font-bold ml-1">5.0 Verified Review</span>
            </div>

            <h3 className="font-['Instrument_Sans'] font-black text-xl text-stone-900 mb-2">
              "{activeVideo.title}"
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed mb-5">
              {activeVideo.quote}
            </p>

            <div className="bg-[#fafafa] p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">{activeVideo.customer}</p>
                <p className="text-[11px] text-stone-500">{activeVideo.location} • Verified Buyer</p>
              </div>
              <span className="text-xs font-bold text-[#e75924] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                {activeVideo.product}
              </span>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveVideo(null)}
                className="bg-stone-900 hover:bg-[#e75924] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
