import React, { useState } from 'react';
import { Star, Check, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface ReviewsSectionProps {
  onViewAllReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onViewAllReviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      author: 'Mustafa A.',
      verified: true,
      date: '23/06/2025',
      title: 'Amazing Pre-Workout – Highly Recommend!',
      text: 'Warrior delivers clean, lasting energy without jitters or crashes. It tastes great, mixes well, and provides intense vascular pumps throughout the session.',
      productTitle: 'Acetyl-L-Carnitine HCL',
      price: '$23.06',
      productThumb: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Acetyl_1KG_1000S.jpg',
      visual: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Protein_powder.png',
    },
    {
      id: 2,
      author: 'Maija S.',
      verified: true,
      date: '21/06/2025',
      title: "These one's really look legit.",
      text: "Real monohydrate, you can actually taste and feel the purity. Unlike other companies selling scam gummies with zero active creatine, PremiumSupps is 100% verified.",
      productTitle: 'Creatine Gummies – Batch CG1',
      price: '$10.00',
      productThumb: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/IMG-20250724-WA0021.jpg',
      visual: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Reviews_Premiumsupps.jpg',
    },
    {
      id: 3,
      author: 'Mark R.',
      verified: true,
      date: '23/01/2026',
      title: 'Great product',
      text: 'Great product, clean and easy to use, nice energy boost and an antioxidant to boot. Dissolves seamlessly without clumping in my shaker.',
      productTitle: 'Pure Taurine 1KG',
      price: '$13.97',
      productThumb: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Taurine_1KG_400S.jpg',
      visual: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Premiumsupps_Reviews.jpg',
    },
    {
      id: 4,
      author: 'Kurt E.',
      verified: true,
      date: '23/06/2025',
      title: 'Such great quality',
      text: 'Such great quality supps. The pre-workout and protein powders taste great. Definitely feeling stronger in the gym and faster recovery next morning.',
      productTitle: 'Warrior High-Stimulant Pre-workout',
      price: '$41.97',
      productThumb: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Warrior_Grape.png?v=1780554891',
      visual: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Reviews_Premiumsupps_1.jpg',
    },
    {
      id: 5,
      author: 'Angela P.',
      verified: true,
      date: '23/12/2025',
      title: 'Gives a perfect boost',
      text: 'Gives a perfect caffeine boost for my early morning workout plus nice refreshing taste, not overly sweet or artificial like commercial brands.',
      productTitle: 'Warrior High-Stimulant Pre-workout',
      price: '$41.97',
      productThumb: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Warrior_Grape.png?v=1780554891',
      visual: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Reviews_Premiumsupps_2.jpg',
    },
    {
      id: 6,
      author: 'Bryan P.',
      verified: true,
      date: '13/12/2025',
      title: 'Really enjoying the refreshing flavours',
      text: 'Just finished my Pineapple and started the Passionfruit today. It has become a morning ritual now, really enjoying the refreshing flavours and fast dispatch.',
      productTitle: 'Protein Water 990g',
      price: '$48.97',
      productThumb: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/ProteinWater_Passionfruit_990g.png',
      visual: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Reviews_Premiumsupps_3.jpg',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= reviews.length - 2 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? Math.max(0, reviews.length - 3) : prev - 1));
  };

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-[#FBF6E0] border-b border-stone-300/80 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-stone-300">
          <div>
            <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest block mb-1">
              SOCIAL PROOF
            </span>
            <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] uppercase tracking-tight">
              WHAT OUR CUSTOMERS SAY
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewAllReviews}
              className="inline-flex items-center gap-1.5 font-['Instrument_Sans'] text-sm font-bold text-[#111111] hover:text-[#e75924] border-b border-[#111111] pb-0.5 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>All Reviews (1,666+)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white border border-stone-300 hover:border-[#e75924] text-[#e75924] flex items-center justify-center shadow-sm transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white border border-stone-300 hover:border-[#e75924] text-[#e75924] flex items-center justify-center shadow-sm transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(currentIndex, currentIndex + 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Media Image Thumbnail */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-100 mb-5">
                  <img
                    src={item.visual}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#EDD065] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EDD065] text-[#EDD065]" />
                  ))}
                </div>

                {/* Review Title & Body */}
                <h3 className="font-['Instrument_Sans'] font-bold text-base sm:text-lg text-[#111111] mb-2 leading-snug">
                  "{item.title}"
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {item.text}
                </p>
              </div>

              {/* Bottom Customer Info & Product Card */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 font-['Instrument_Sans']">
                    <span>{item.author}</span>
                    {item.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[#008236] bg-green-50 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-stone-400 text-[11px]">{item.date}</span>
                </div>

                {/* Purchased product pill */}
                <div className="flex items-center gap-2.5 p-2 bg-[#fafafa] rounded-xl border border-stone-200">
                  <img
                    src={item.productThumb}
                    alt={item.productTitle}
                    className="w-9 h-9 object-contain rounded-lg bg-white p-0.5 border border-stone-200 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-stone-800 truncate">
                      {item.productTitle}
                    </p>
                    <span className="text-[10px] font-bold text-[#e75924]">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Reviews CTA */}
        {onViewAllReviews && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewAllReviews}
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#e75924] text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span>View All 1,666+ Verified Customer Reviews</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
