import React, { useState } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ArrowUpRight, ShoppingBag } from 'lucide-react';

interface StacksSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const StacksSection: React.FC<StacksSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bundleCards = [
    {
      title: 'Performance Stack',
      price: '$99.95 AUD',
      comparePrice: '$219.85 AUD',
      save: 'Save 55%',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Content44.png',
      productId: 10126784725272,
    },
    {
      title: 'Hydration Stack',
      price: '$79.95 AUD',
      comparePrice: '$161.85 AUD',
      save: 'Save 50%',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Content88.png',
      productId: 10126899151128,
    },
    {
      title: 'Vitality Stack',
      price: '$89.95 AUD',
      comparePrice: '$179.85 AUD',
      save: 'Save 50%',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Content00.png',
      productId: 10126906523928,
    },
    {
      title: 'Essentials Stack',
      price: '$79.00 AUD',
      comparePrice: '$149.85 AUD',
      save: 'Save 47%',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/Content55.png',
      productId: 10126833451288,
    },
    {
      title: 'Precision Mind Stack',
      price: '$84.95 AUD',
      comparePrice: '$169.90 AUD',
      save: 'Save 50%',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/WhatsApp_Image_2026-03-17_at_11.28.09_5.jpg',
      productId: 10126893154584,
    },
    {
      title: 'Anabolic Stack',
      price: '$99.95 AUD',
      comparePrice: '$204.80 AUD',
      save: 'Save 51%',
      img: 'https://cdn.shopify.com/s/files/1/0811/8701/2888/files/WhatsApp_Image_2026-03-17_at_11.28.10_3.jpg',
      productId: 10126901903640,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= bundleCards.length - 2 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? Math.max(0, bundleCards.length - 3) : prev - 1));
  };

  const handleCardClick = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      onQuickView(product);
    }
  };

  return (
    <section id="stacks" className="py-14 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Navigation Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest block mb-1.5">
              STACK BUNDLE
            </span>
            <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
              BUNDLE &amp; SAVE UP TO 50%
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Shop customer-favourite best sellers
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#e75924] text-[#e75924] hover:bg-orange-50 flex items-center justify-center transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#e75924] text-[#e75924] hover:bg-orange-50 flex items-center justify-center transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bundle Cards Grid / Swiper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundleCards.slice(currentIndex, currentIndex + 3).map((bundle, idx) => (
            <div
              key={idx}
              className="group relative bg-[#f9f9f9] rounded-3xl overflow-hidden border border-stone-200 p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              onClick={() => handleCardClick(bundle.productId)}
            >
              {/* Top Floating Badge */}
              <div className="flex items-center justify-between mb-3 z-10">
                <span className="bg-[#e75924] text-white text-[11px] font-['Instrument_Sans'] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {bundle.save}
                </span>
                <span className="text-xs font-bold text-stone-500">
                  Clinical Bundle
                </span>
              </div>

              {/* Bundle Graphic Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white p-2 flex items-center justify-center">
                <img
                  src={bundle.img}
                  alt={bundle.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Floating Orange Hover Button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#e75924] text-white flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-['Instrument_Sans'] font-bold text-base text-[#111111] uppercase group-hover:text-[#e75924] transition-colors">
                    {bundle.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-['Instrument_Sans'] font-black text-lg text-[#111111]">
                      {bundle.price}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {bundle.comparePrice}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const prod = products.find((p) => p.id === bundle.productId);
                    if (prod) onAddToCart(prod);
                  }}
                  className="bg-[#e2bf58] hover:bg-[#d4b24d] text-black text-xs font-['Instrument_Sans'] font-bold uppercase px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
