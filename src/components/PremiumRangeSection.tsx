import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { Star, Eye, Minus, Plus } from 'lucide-react';

interface PremiumRangeSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  addedProductId?: number | null;
}

export const PremiumRangeSection: React.FC<PremiumRangeSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
  addedProductId,
}) => {
  const [activeTab, setActiveTab] = useState<'Best Sellers' | 'Stacks' | 'Pre-Workouts'>('Best Sellers');
  
  // Track selected variant per product ID
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  // Track quantity per product ID
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Filter products for the active tab matching the live HTML dump
  const getTabProducts = () => {
    if (activeTab === 'Best Sellers') {
      // Bacteriostatic Water, Creatine Monohydrate, Warrior Pre-Workout, L-Carnitine
      return products.filter((p) =>
        [8843671109912, 8560679158040, 8589894615320, 8589785104664].includes(p.id)
      );
    } else if (activeTab === 'Stacks') {
      // Anabolic Stack, Essentials Stack, Hydration Stack, Performance Stack
      return products.filter((p) =>
        [10126901903640, 10126833451288, 10126899151128, 10126784725272].includes(p.id)
      );
    } else {
      // Pre-Workouts: Night Warrior, Warrior Pre-Workout, Warrior KING Ultra High-Stim
      return products.filter((p) =>
        [8853091123480, 8589894615320, 10057714729240].includes(p.id)
      );
    }
  };

  const currentProducts = getTabProducts();

  const handleQtyChange = (productId: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleVariantSelect = (productId: number, variantId: number) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const getViewAllHref = () => {
    if (activeTab === 'Best Sellers') return 'https://premiumsupps.net/collections/best-seller';
    if (activeTab === 'Stacks') return 'https://premiumsupps.net/collections/stacks';
    return 'https://premiumsupps.net/collections/pre-workouts';
  };

  return (
    <section id="premium-range" className="py-12 sm:py-16 md:py-20 bg-[#f7f7f7] border-b border-stone-200 overflow-hidden">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="font-['Instrument_Sans'] text-xs sm:text-sm font-semibold text-[#e75924] uppercase tracking-widest mb-1.5">
            THE PREMIUM RANGE
          </p>
          <h2 className="font-['Instrument_Sans'] text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
            FUEL YOUR POTENTIAL
          </h2>
        </div>

        {/* Toolbar: Navigation Tabs & View All */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 pb-2">
          {/* Spacer on left for desktop alignment */}
          <div className="hidden sm:block w-32" />

          {/* Centered Filter Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 bg-white p-1.5 rounded-full border border-stone-200 shadow-sm">
            {(['Best Sellers', 'Stacks', 'Pre-Workouts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-['Instrument_Sans'] text-xs sm:text-sm font-bold uppercase transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#e6c466] text-[#111111] shadow-sm'
                    : 'bg-transparent text-stone-700 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View All Link on Right */}
          <div className="flex items-center">
            <a
              href={getViewAllHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-['Instrument_Sans'] text-xs sm:text-sm font-bold text-[#111111] hover:text-[#e75924] border-b border-[#edd065] pb-1 uppercase tracking-wider transition-colors"
            >
              <span>View All {activeTab}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-stone-900 stroke-current stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => {
            // Determine active variant
            const selectedVariantId = selectedVariants[product.id] || product.variants[0]?.id;
            const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
            const currentQty = quantities[product.id] || 1;
            const isAdded = addedProductId === product.id;

            // Price calculation
            const displayPrice = currentVariant ? currentVariant.price : product.price;
            const displayComparePrice = currentVariant?.compare_at_price || product.compare_at_price;
            const isAvailable = currentVariant?.available ?? true;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E2E2DE] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative group"
              >
                {/* Floating Top Badge: "Upto 50% Off" */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-[#e75924] text-white text-[11px] font-['Instrument_Sans'] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                    Upto 50% Off
                  </span>
                </div>

                <div>
                  {/* Image Container with secondary hover image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-50 mb-3 flex items-center justify-center p-2">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Quick View Floating Button */}
                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute bottom-3 right-3 w-10 h-10 bg-white hover:bg-stone-900 text-stone-700 hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      aria-label="Quick View"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rating with Loox Stars */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex text-[#EDD065]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#EDD065] text-[#EDD065]" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 font-medium">
                      ({product.review_count || 120})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Instrument_Sans'] font-bold text-sm sm:text-[15px] uppercase text-[#111111] line-clamp-1 mb-2 hover:text-[#e75924] transition-colors cursor-pointer" onClick={() => onQuickView(product)}>
                    {product.title}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-['Instrument_Sans'] font-black text-lg text-[#111111]">
                      ${displayPrice.toFixed(2)} AUD
                    </span>
                    {displayComparePrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ${displayComparePrice.toFixed(2)} AUD
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Variant Selection & Add to Cart Controls */}
                <div className="mt-2 pt-2 border-t border-stone-100 space-y-3">
                  
                  {/* Variant Dropdown if product has options */}
                  {product.options && product.options.length > 0 && product.variants.length > 1 && (
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-stone-600 uppercase">
                        {product.options[0].name}: <span className="text-black font-extrabold">{currentVariant?.title}</span>
                      </label>
                      <select
                        value={selectedVariantId}
                        onChange={(e) => handleVariantSelect(product.id, Number(e.target.value))}
                        className="w-full bg-[#efefef] border-0 rounded-full px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
                      >
                        {product.variants.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.title} {v.available === false ? '- (Out of Stock)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Quantity Stepper & Add to Cart Action */}
                  <div className="flex items-center gap-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-[#efefef] rounded-full border-0 px-2 py-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-700 hover:text-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-stone-800">
                        {currentQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-700 hover:text-black"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Yellow Add to Cart Button */}
                    <button
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => onAddToCart(product, currentVariant, currentQty)}
                      className={`flex-1 h-9 rounded-full font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all ${
                        !isAvailable
                          ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                          : isAdded
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-[#e2bf58] hover:bg-[#d4b24d] text-stone-900 shadow-sm active:scale-95'
                      }`}
                    >
                      {isAdded ? 'Added!' : !isAvailable ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
