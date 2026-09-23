import React, { useState, useMemo } from 'react';
import {
  Star,
  Check,
  Search,
  Filter,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  Play,
  Camera,
  ThumbsUp,
  X,
  Share2,
  ChevronDown
} from 'lucide-react';
import { CustomerReview, REVIEWS_DATA } from '../data/reviewsData';
import { Product } from '../types';

interface ReviewsPageProps {
  products: Product[];
  onGoHome: () => void;
  onContinueShopping: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  products,
  onGoHome,
  onContinueShopping,
  onSelectProduct,
  onAddToCart,
}) => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('All');
  const [mediaOnly, setMediaOnly] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');

  // Media lightbox modal
  const [activeMediaReview, setActiveMediaReview] = useState<CustomerReview | null>(null);

  // Write a Review modal
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewProduct, setNewReviewProduct] = useState(products[0]?.id || 8560679158040);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewBody, setNewReviewBody] = useState('');
  const [newReviewPhotoUrl, setNewReviewPhotoUrl] = useState('');
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);

  // Product map for quick lookup
  const productMap = useMemo(() => {
    const map = new Map<number, Product>();
    products.forEach((p) => map.set(p.id, p));
    return map;
  }, [products]);

  // Unique product titles present in the reviews
  const availableProductFilters = useMemo(() => {
    const set = new Set<string>();
    REVIEWS_DATA.forEach((r) => set.add(r.productTitle));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered and sorted reviews
  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((rev) => {
        // Product filter
        if (selectedProductFilter !== 'All' && rev.productTitle !== selectedProductFilter) {
          return false;
        }
        // Media filter
        if (mediaOnly && !rev.mediaUrl) {
          return false;
        }
        // Rating filter
        if (ratingFilter !== 'All' && rev.rating !== ratingFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchAuthor = rev.author.toLowerCase().includes(q);
          const matchBody = rev.body.toLowerCase().includes(q);
          const matchProd = rev.productTitle.toLowerCase().includes(q);
          if (!matchAuthor && !matchBody && !matchProd) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Default: most recent
        return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
      });
  }, [reviewsList, selectedProductFilter, mediaOnly, ratingFilter, searchQuery, sortBy]);

  const handleProductClick = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    const product = productMap.get(productId);
    if (product) {
      onSelectProduct(product);
    } else {
      // Fallback: match by title similarity
      const fallback = products.find((p) => p.id === productId) || products[0];
      if (fallback) onSelectProduct(fallback);
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewBody.trim()) return;

    const matchedProd = productMap.get(Number(newReviewProduct)) || products[0];
    const newRev: CustomerReview = {
      id: `user-${Date.now()}`,
      productId: matchedProd.id,
      productTitle: matchedProd.title,
      productHandle: matchedProd.handle,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      verified: true,
      date: 'Just now',
      isoDate: new Date().toISOString().split('T')[0],
      body: newReviewBody.trim(),
      mediaUrl: newReviewPhotoUrl.trim() || matchedProd.images[0] || '',
      mediaType: 'image',
      price: `$${matchedProd.price.toFixed(2)} AUD`,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsWriteReviewOpen(false);
    setNewReviewAuthor('');
    setNewReviewBody('');
    setNewReviewPhotoUrl('');
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 4000);
  };

  return (
    <div id="dedicated-reviews-page" className="bg-[#fafafa] min-h-screen text-[#111111]">
      {/* TOP RETURN TO HOMEPAGE NAVIGATION STRIP */}
      <nav
        className="bg-white border-b border-stone-200 sticky top-16 sm:top-[68px] z-30 shadow-xs"
        aria-label="Return to homepage navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-[#D0473E] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to homepage</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-stone-500 font-medium">
              4.9/5 Rating from 1,666+ Verified Australians
            </span>
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#e75924] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Continue shopping</span>
            </button>
          </div>
        </div>
      </nav>

      {/* REVIEWS HERO & STATS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        
        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-['Instrument_Sans'] font-black uppercase tracking-tight text-[#111111] mb-3">
            Customer Reviews
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
            Explore unvarnished feedback, delivery experiences, and taste tests from real athletes across Australia.
          </p>
        </div>

        {/* AGGREGATE SUMMARY CARD (Loox Review Header Replication) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Overall Score */}
            <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start justify-center border-b lg:border-b-0 lg:border-r border-stone-100 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl sm:text-6xl font-['Instrument_Sans'] font-black text-[#111111]">
                  4.9
                </span>
                <span className="text-stone-400 font-semibold text-lg">/ 5.0</span>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#edd065] text-[#edd065]" />
                ))}
              </div>

              <p className="text-stone-600 text-sm font-semibold mb-2">
                Overall rating from <span className="text-[#111111] font-bold">1,666 verified reviews</span>
              </p>

              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                <span>99.4% Customer Satisfaction Rate</span>
              </div>
            </div>

            {/* Rating Bars Distribution */}
            <div className="lg:col-span-5 space-y-2 text-xs font-semibold text-stone-700">
              <div className="flex items-center gap-3">
                <span className="w-12 text-right flex items-center justify-end gap-1">
                  5 <Star className="w-3 h-3 fill-stone-400 text-stone-400" />
                </span>
                <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#edd065] h-full rounded-full" style={{ width: '94%' }} />
                </div>
                <span className="w-10 text-stone-500 font-normal">94%</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-12 text-right flex items-center justify-end gap-1">
                  4 <Star className="w-3 h-3 fill-stone-400 text-stone-400" />
                </span>
                <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#edd065] h-full rounded-full" style={{ width: '5%' }} />
                </div>
                <span className="w-10 text-stone-500 font-normal">5%</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-12 text-right flex items-center justify-end gap-1">
                  3 <Star className="w-3 h-3 fill-stone-400 text-stone-400" />
                </span>
                <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#edd065] h-full rounded-full" style={{ width: '1%' }} />
                </div>
                <span className="w-10 text-stone-500 font-normal">1%</span>
              </div>

              <div className="flex items-center gap-3 opacity-50">
                <span className="w-12 text-right flex items-center justify-end gap-1">
                  2 <Star className="w-3 h-3 fill-stone-400 text-stone-400" />
                </span>
                <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#edd065] h-full rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-10 text-stone-500 font-normal">0%</span>
              </div>

              <div className="flex items-center gap-3 opacity-50">
                <span className="w-12 text-right flex items-center justify-end gap-1">
                  1 <Star className="w-3 h-3 fill-stone-400 text-stone-400" />
                </span>
                <div className="flex-1 bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#edd065] h-full rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-10 text-stone-500 font-normal">0%</span>
              </div>
            </div>

            {/* Write a Review Action */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center lg:border-l border-stone-100 lg:pl-8 pt-4 lg:pt-0">
              <p className="text-xs text-stone-500 mb-3">
                Have you trained with PremiumSupps recently? Share your feedback with the community.
              </p>
              <button
                onClick={() => setIsWriteReviewOpen(true)}
                className="w-full sm:w-auto bg-[#111111] hover:bg-[#e75924] text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow"
              >
                Write A Review
              </button>
            </div>

          </div>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews by keyword, product or reviewer..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 rounded-xl text-xs sm:text-sm border border-stone-200 focus:outline-none focus:border-[#edd065] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setMediaOnly(!mediaOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  mediaOnly
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos &amp; Videos Only</span>
              </button>

              {/* Rating dropdown */}
              <div className="relative">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                  aria-label="Filter reviews by rating"
                  className="appearance-none bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-xl px-3 py-2 pr-7 hover:bg-stone-100 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                </select>
                <ChevronDown className="w-3 h-3 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'rating')}
                  aria-label="Sort reviews by"
                  className="appearance-none bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-xl px-3 py-2 pr-7 hover:bg-stone-100 focus:outline-none cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rating</option>
                </select>
                <ChevronDown className="w-3 h-3 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Product Category Pills */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter By:
            </span>
            {availableProductFilters.map((prodName) => (
              <button
                key={prodName}
                onClick={() => setSelectedProductFilter(prodName)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedProductFilter === prodName
                    ? 'bg-[#edd065] text-black font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-black'
                }`}
              >
                {prodName === 'All' ? 'All Products (1,666+)' : prodName}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500 font-medium">
          <span>
            Showing <strong className="text-stone-900">{filteredReviews.length}</strong> customer reviews
            {selectedProductFilter !== 'All' && ` for "${selectedProductFilter}"`}
          </span>
          {(selectedProductFilter !== 'All' || mediaOnly || ratingFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedProductFilter('All');
                setMediaOnly(false);
                setRatingFilter('All');
                setSearchQuery('');
              }}
              className="text-[#D0473E] font-bold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* REVIEWS GRID (Loox Card Recreation) */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
            <p className="text-stone-500 text-sm mb-4">No reviews matched your current filters.</p>
            <button
              onClick={() => {
                setSelectedProductFilter('All');
                setMediaOnly(false);
                setRatingFilter('All');
                setSearchQuery('');
              }}
              className="bg-[#111111] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredReviews.map((rev) => {
              const matchedProduct = productMap.get(rev.productId) || products.find((p) => p.id === rev.productId);

              return (
                <article
                  key={rev.id}
                  id={`review-card-${rev.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Review Photo / Video Thumbnail */}
                    {rev.mediaUrl && (
                      <div
                        onClick={() => setActiveMediaReview(rev)}
                        className="relative aspect-4/3 bg-stone-900 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={rev.mediaUrl}
                          alt={`Customer review by ${rev.author} for ${rev.productTitle}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Video Indicator */}
                        {rev.mediaType === 'video' && (
                          <div className="absolute top-3 left-3 bg-black/75 text-[#edd065] text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-xs">
                            <Play className="w-3 h-3 fill-[#edd065]" />
                            <span>Video Review</span>
                          </div>
                        )}

                        {/* Click to expand badge */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs">
                          Expand view
                        </div>
                      </div>
                    )}

                    {/* Review Content */}
                    <div className="p-4 sm:p-5">
                      {/* Author + Verified Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-['Instrument_Sans'] font-bold text-sm text-[#111111]">
                            {rev.author}
                          </span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                              <Check className="w-2.5 h-2.5" />
                              Verified
                            </span>
                          )}
                        </div>
                        <time className="text-[11px] text-stone-400">{rev.date}</time>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-[#edd065] text-[#edd065]'
                                : 'fill-stone-200 text-stone-200'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-xs text-stone-700 leading-relaxed font-normal">
                        "{rev.body}"
                      </p>
                    </div>
                  </div>

                  {/* Purchased Product Bar (Direct In-Site Navigation) */}
                  <div className="p-3.5 bg-stone-50 border-t border-stone-100 mt-2">
                    <button
                      onClick={(e) => handleProductClick(e, rev.productId)}
                      title={`View ${rev.productTitle} details`}
                      className="w-full text-left flex items-center justify-between gap-3 group/prod p-1.5 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-stone-200"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {matchedProduct?.images[0] ? (
                          <img
                            src={matchedProduct.images[0]}
                            alt={rev.productTitle}
                            className="w-9 h-9 object-contain rounded-lg bg-white p-0.5 border border-stone-200 flex-shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-9 h-9 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-400">
                            PS
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-stone-900 truncate group-hover/prod:text-[#D0473E] transition-colors">
                            {rev.productTitle}
                          </p>
                          <span className="text-[10px] font-extrabold text-[#e75924]">
                            {rev.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 bg-white group-hover/prod:bg-[#111111] group-hover/prod:text-white text-stone-700 text-[10px] font-bold px-2 py-1 rounded-md border border-stone-200 transition-colors shadow-2xs">
                        Details
                      </div>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* BOTTOM RETURN NAVIGATION STRIP */}
      <nav
        className="bg-white border-t border-stone-200 py-6 px-4 sm:px-8 mt-12"
        aria-label="Return to homepage after reading"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-[#D0473E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to homepage</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-bold text-stone-500 hover:text-stone-900 uppercase tracking-wider"
            >
              Back to Top ↑
            </button>
            <button
              onClick={onContinueShopping}
              className="bg-[#111111] hover:bg-[#e75924] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </nav>

      {/* MEDIA LIGHTBOX MODAL */}
      {activeMediaReview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Customer review by ${activeMediaReview.author}`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveMediaReview(null)}
        >
          <div
            className="bg-stone-950 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveMediaReview(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-stone-800 text-white flex items-center justify-center transition-colors border border-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Area */}
            <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[320px] md:min-h-[500px]">
              <img
                src={activeMediaReview.mediaUrl}
                alt={activeMediaReview.productTitle}
                className="max-h-[70vh] md:max-h-[85vh] w-auto max-w-full object-contain"
              />
              {activeMediaReview.mediaType === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#e6b422] text-black flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 fill-black text-black ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Details Area */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-stone-900 text-white overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-['Instrument_Sans'] font-bold text-lg text-white">
                    {activeMediaReview.author}
                  </h3>
                  {activeMediaReview.verified && (
                    <span className="text-[10px] font-bold text-[#e6b422] bg-[#e6b422]/10 border border-[#e6b422]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < activeMediaReview.rating
                          ? 'fill-[#edd065] text-[#edd065]'
                          : 'fill-stone-700 text-stone-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-stone-400 ml-2">{activeMediaReview.date}</span>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed italic mb-6">
                  "{activeMediaReview.body}"
                </p>
              </div>

              {/* Product Card at bottom of modal */}
              <div className="pt-4 border-t border-stone-800">
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mb-2">
                  Reviewed Product
                </p>
                <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 flex items-center justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {activeMediaReview.productTitle}
                    </p>
                    <span className="text-xs font-extrabold text-[#e75924]">
                      {activeMediaReview.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    setActiveMediaReview(null);
                    handleProductClick(e, activeMediaReview.productId);
                  }}
                  className="w-full bg-[#edd065] hover:bg-[#e75924] text-black hover:text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Product On Our Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isWriteReviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Submit a verified customer review"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsWriteReviewOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Instrument_Sans'] font-black text-2xl uppercase tracking-tight text-[#111111] mb-1">
              Write A Verified Review
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Your feedback is displayed on our official Australian reviews directory.
            </p>

            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Select Product</label>
                <select
                  value={newReviewProduct}
                  onChange={(e) => setNewReviewProduct(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl text-xs font-semibold border border-stone-200 focus:outline-none focus:border-[#edd065]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (${p.price.toFixed(2)} AUD)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= newReviewRating
                            ? 'fill-[#edd065] text-[#edd065]'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-600 ml-2">
                    {newReviewRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam K."
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl text-xs border border-stone-200 focus:outline-none focus:border-[#edd065]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Location (State)</label>
                  <input
                    type="text"
                    placeholder="e.g. Sydney, NSW"
                    value={newReviewLocation}
                    onChange={(e) => setNewReviewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl text-xs border border-stone-200 focus:outline-none focus:border-[#edd065]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Review Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about performance, pumps, mixing, delivery speed or results..."
                  value={newReviewBody}
                  onChange={(e) => setNewReviewBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl text-xs border border-stone-200 focus:outline-none focus:border-[#edd065]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Photo URL <span className="font-normal text-stone-400">(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images..."
                  value={newReviewPhotoUrl}
                  onChange={(e) => setNewReviewPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl text-xs border border-stone-200 focus:outline-none focus:border-[#edd065]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-[#e75924] text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors shadow-md mt-2"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Review Submission Success Toast */}
      {reviewSubmittedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-stone-700 animate-bounce">
          <Check className="w-4 h-4 text-[#edd065]" />
          <span className="text-xs font-bold">Thank you! Your verified review has been posted.</span>
        </div>
      )}
    </div>
  );
};
