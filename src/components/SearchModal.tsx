import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, X, Star, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];

    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.tags.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl z-10 border border-stone-200 overflow-hidden">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pre-workout, creatine, shilajit, water..."
            className="flex-grow text-sm sm:text-base font-medium text-stone-900 focus:outline-none placeholder-stone-400 bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-700 uppercase font-bold"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-stone-100">
          {!query.trim() ? (
            <div className="py-8 text-center text-stone-400">
              <p className="text-xs font-['Instrument_Sans'] font-bold uppercase tracking-wider mb-2 text-stone-500">
                Popular Searches:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Warrior KING', 'Creatine Monohydrate', 'Shilajit', 'Bacteriostatic Water', 'Methylene Blue', 'Night Warrior'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-full transition-colors font-medium"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm font-['Instrument_Sans'] font-bold uppercase text-stone-700 mb-1">
                No matching formulations found
              </p>
              <p className="text-xs text-stone-400">
                Try checking the spelling or search for general categories like "Creatine" or "Pre-workout".
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 hover:bg-stone-50 rounded-2xl cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#faf8f2] p-1 border border-stone-200 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <span className="text-[10px] uppercase font-['Instrument_Sans'] font-bold text-[#D0473E] tracking-wider block">
                    {product.category}
                  </span>
                  <h4 className="font-['Instrument_Sans'] font-bold text-sm text-stone-900 truncate group-hover:text-[#D0473E] transition-colors">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                      {product.rating}
                    </span>
                    <span>•</span>
                    <span>{product.review_count} reviews</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-['Instrument_Sans'] font-black text-sm text-[#D0473E] block">
                    ${product.price.toFixed(2)} AUD
                  </span>
                  <span className="text-[10px] text-stone-400 flex items-center justify-end gap-0.5 group-hover:text-stone-900 font-medium">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
