import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import { X, Star, CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: product.id,
      title: 'Default Title',
      price: product.price,
      sku: '',
      available: true,
    }
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedVariant(
      product.variants[0] || {
        id: product.id,
        title: 'Default Title',
        price: product.price,
        sku: '',
        available: true,
      }
    );
    setQuantity(1);
  }, [product]);

  const handleSelectOption = (value: string) => {
    const matched = product.variants.find(
      (v) =>
        v.title.includes(value) ||
        v.option1 === value ||
        v.option2 === value ||
        v.option3 === value
    );
    if (matched) {
      setSelectedVariant(matched);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
  };

  const currentPrice = selectedVariant.price || product.price;
  const comparePrice = selectedVariant.compare_at_price || product.compare_at_price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FBF6E0] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-300">
        
        {/* Close Button */}
        <button
          id="close-quick-view-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 hover:bg-stone-900 hover:text-white text-stone-700 rounded-full flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Media Section */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 aspect-square flex items-center justify-center overflow-hidden mb-4 shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl bg-white p-1 border-2 overflow-hidden flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#D0473E] ring-2 ring-red-500/30'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="text-xs uppercase font-['Instrument_Sans'] font-bold tracking-widest text-[#D0473E] mb-1">
              {product.vendor} • {product.category}
            </div>

            <h2 className="text-2xl sm:text-3xl font-['Instrument_Sans'] font-black text-stone-900 mb-2 leading-tight">
              {product.title}
            </h2>

            {/* Rating & Stock */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-stone-300">•</span>
              <span className="text-stone-600 font-medium">
                {product.review_count} Verified Customer Reviews
              </span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full text-[11px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> In Stock &amp; Ready
              </span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mb-6 bg-white/70 p-4 rounded-2xl border border-stone-200">
              <span className="text-3xl font-['Instrument_Sans'] font-black text-[#D0473E]">
                ${currentPrice.toFixed(2)}{' '}
                <span className="text-xs font-bold text-stone-500">AUD</span>
              </span>

              {comparePrice && comparePrice > currentPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ${comparePrice.toFixed(2)} AUD
                </span>
              )}

              {product.badge && (
                <span className="ml-auto bg-[#E75924] text-white text-[10px] font-['Instrument_Sans'] font-extrabold uppercase px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Variant Option Pickers */}
            {product.options && product.options.length > 0 && product.options[0].values.length > 1 && (
              <div className="space-y-4 mb-6">
                {product.options.map((option) => (
                  <div key={option.id}>
                    <label className="block font-['Instrument_Sans'] text-xs font-bold uppercase text-stone-700 mb-2">
                      Select {option.name}:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((val) => {
                        const isSelected =
                          selectedVariant.title.includes(val) ||
                          selectedVariant.option1 === val ||
                          selectedVariant.option2 === val;
                        return (
                          <button
                            key={val}
                            onClick={() => handleSelectOption(val)}
                            className={`text-xs font-['Instrument_Sans'] font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                              isSelected
                                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                                : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & Add Button */}
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center border border-stone-300 rounded-full bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-11 flex items-center justify-center font-bold text-lg hover:bg-stone-100 rounded-l-full text-stone-600 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-11 flex items-center justify-center font-bold text-lg hover:bg-stone-100 rounded-r-full text-stone-600 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                id="modal-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 bg-[#D0473E] hover:bg-[#b83a32] text-white py-3.5 px-6 rounded-full font-['Instrument_Sans'] font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:shadow-red-900/40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart • ${(currentPrice * quantity).toFixed(2)} AUD</span>
              </button>
            </div>

            {/* Quality Checklist */}
            <div className="border-t border-stone-200/80 pt-4 mb-6 space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Pure Clinical Doses • Zero Fillers or Binders</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Formulated &amp; Packaged in Australian GMP Certified Facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Same-Day Dispatch on Australian orders before 2:00 PM AEST</span>
              </div>
            </div>

            {/* Description Text */}
            <div className="border-t border-stone-200/80 pt-4 text-xs text-stone-600 leading-relaxed max-h-48 overflow-y-auto pr-2">
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="prose prose-sm prose-stone"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
