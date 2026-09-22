import React, { useMemo } from 'react';
import { Product } from '../types';
import { Star, Eye, ShoppingCart, Check } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  activeSort: string;
  onSelectSort: (sort: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  addedProductId?: number | null;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
  onQuickView,
  onAddToCart,
  addedProductId,
}) => {
  const categories = [
    'All Products',
    'Best Sellers',
    'Pre-Workouts',
    'Creatine',
    'Stacks',
    'Raw Compounds',
    'Health',
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (activeCategory === 'Best Sellers') {
      list = list.filter(
        (p) =>
          p.badge === 'BEST SELLER' ||
          p.collections.includes('Best Sellers') ||
          p.review_count > 90
      );
    } else if (activeCategory !== 'All Products') {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Sort
    if (activeSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'reviews') {
      list.sort((a, b) => b.review_count - a.review_count);
    }

    return list;
  }, [products, activeCategory, activeSort]);

  const getBadgeStyle = (badge: string) => {
    if (badge.includes('75%') || badge.includes('Clearance')) {
      return 'bg-red-600 text-white';
    }
    if (badge.includes('SAVE')) {
      return 'bg-[#E75924] text-white';
    }
    if (badge === 'BEST SELLER') {
      return 'bg-[#111111] text-amber-400';
    }
    return 'bg-[#3456E6] text-white';
  };

  return (
    <section id="shop" className="py-16 md:py-24 bg-[#FBF6E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Filters and Sort */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-stone-300 pb-6">
          <div>
            <span className="text-xs uppercase font-['Instrument_Sans'] font-black text-[#D0473E] tracking-widest">
              Formulated For Maximum Biological Potency
            </span>
            <h2 className="text-3xl sm:text-4xl font-['Instrument_Sans'] font-black text-stone-900 mt-1 tracking-tight">
              FUEL YOUR PERFORMANCE
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Showing {filteredProducts.length} clinical strength formulations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-dropdown" className="text-xs font-['Instrument_Sans'] font-bold text-stone-600 uppercase">
                Sort:
              </label>
              <select
                id="sort-dropdown"
                value={activeSort}
                onChange={(e) => onSelectSort(e.target.value)}
                className="bg-white border border-stone-300 rounded-full px-4 py-2 text-xs font-['Instrument_Sans'] font-bold uppercase text-stone-800 focus:outline-none focus:border-stone-900 cursor-pointer shadow-sm hover:border-stone-400 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs font-['Instrument_Sans'] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-sm ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/70 rounded-3xl border border-stone-300 p-8">
            <h3 className="text-xl font-['Instrument_Sans'] font-bold text-stone-700 uppercase mb-2">
              No products found in this category
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Try switching back to All Products to view our full Australian catalog.
            </p>
            <button
              onClick={() => onSelectCategory('All Products')}
              className="bg-stone-900 text-white font-['Instrument_Sans'] font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#D0473E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;
              const hasComparePrice = Boolean(
                product.compare_at_price && product.compare_at_price > product.price
              );

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 flex flex-col h-full relative group hover:-translate-y-1.5 hover:shadow-xl hover:border-red-300 transition-all duration-300"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`text-[10px] font-['Instrument_Sans'] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${getBadgeStyle(
                          product.badge
                        )}`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product Image Media Container */}
                  <div className="relative aspect-square w-full rounded-xl bg-[#faf8f2] p-4 flex items-center justify-center overflow-hidden mb-4 border border-stone-100">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-2 group-hover:scale-106 transition-transform duration-300 drop-shadow-sm"
                    />

                    {/* Quick View Button (hover reveal on desktop, always accessible) */}
                    <button
                      id={`quick-view-btn-${product.id}`}
                      onClick={() => onQuickView(product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-stone-900/90 hover:bg-[#D0473E] text-white text-xs font-['Instrument_Sans'] font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 backdrop-blur-sm whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Quick View
                    </button>
                  </div>

                  {/* Content Details */}
                  <div className="flex flex-col flex-grow">
                    <div className="text-[11px] uppercase font-['Instrument_Sans'] font-semibold tracking-wider text-stone-500 mb-1">
                      {product.category}
                    </div>

                    <h3
                      className="font-['Instrument_Sans'] font-bold text-base text-stone-900 mb-1.5 line-clamp-2 min-h-[2.75rem] group-hover:text-[#D0473E] transition-colors"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    {/* Reviews Row */}
                    <div className="flex items-center gap-1.5 text-xs mb-3">
                      <div className="flex text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                      </div>
                      <span className="font-bold text-stone-800 text-xs">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        ({product.review_count})
                      </span>
                    </div>

                    {/* Price Row */}
                    <div className="mt-auto pt-3 border-t border-stone-100 flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-['Instrument_Sans'] font-black text-xl text-[#D0473E]">
                          ${product.price.toFixed(2)}
                        </span>
                        {hasComparePrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ${product.compare_at_price?.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">
                        AUD
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      id={`add-to-cart-btn-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      className={`w-full py-3 px-4 rounded-full text-xs font-['Instrument_Sans'] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-stone-900 hover:bg-[#D0473E] text-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add To Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
