import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, ProductVariant, CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCircles } from './components/CategoryCircles';
import { CancelTicker } from './components/CancelTicker';
import { PremiumRangeSection } from './components/PremiumRangeSection';
import { WhyPremiumSupps } from './components/WhyPremiumSupps';
import { LiveVideoReviews } from './components/LiveVideoReviews';
import { StacksSection } from './components/StacksSection';
import { SuperSaverBanner } from './components/SuperSaverBanner';
import { WhyWarriorWorks } from './components/WhyWarriorWorks';
import { ReviewsSection } from './components/ReviewsSection';
import { IngredientsStandard } from './components/IngredientsStandard';
import { FaqSection } from './components/FaqSection';
import { BlogPostsSection } from './components/BlogPostsSection';
import { CtaHeroStrip } from './components/CtaHeroStrip';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { LabTestsModal } from './components/LabTestsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MysteryGiftModal } from './components/MysteryGiftModal';
import { Toast } from './components/Toast';
import { ReviewsPage } from './pages/ReviewsPage';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('premium_supps_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'reviews'>(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.hash === '#reviews' ||
        window.location.hash.includes('reviews') ||
        window.location.pathname.includes('/reviews')
      ) {
        return 'reviews';
      }
    }
    return 'home';
  });

  const [activeCategory, setActiveCategory] = useState('All Products');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLabTestsOpen, setIsLabTestsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  // Sync hash change for page navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#reviews' || window.location.hash.includes('reviews')) {
        setCurrentPage('reviews');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '' || window.location.hash === '#') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToReviews = () => {
    setCurrentPage('reviews');
    window.location.hash = '#reviews';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    if (window.location.hash === '#reviews') {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setCurrentPage('home');
    if (window.location.hash === '#reviews') {
      history.pushState(null, '', window.location.pathname);
    }
    setTimeout(() => {
      document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('premium_supps_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleAddToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1
  ) => {
    const selectedVariant =
      variant ||
      product.variants[0] || {
        id: product.id,
        title: 'Default Title',
        price: product.price,
        sku: '',
        available: true,
      };

    setCart((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.productId === product.id && item.variantId === selectedVariant.id
      );

      if (index > -1) {
        const next = [...prev];
        next[index] = {
          ...next[index],
          quantity: next[index].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            variantId: selectedVariant.id,
            title: product.title,
            variantTitle: selectedVariant.title,
            price: selectedVariant.price,
            image: product.images[0],
            quantity,
          },
        ];
      }
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
    showToast(`Added ${quantity}x "${product.title}" to cart!`);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const updatedQty = next[index].quantity + delta;
      if (updatedQty <= 0) {
        return next.filter((_, i) => i !== index);
      } else {
        next[index] = { ...next[index], quantity: updatedQty };
        return next;
      }
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart.');
  };

  const handleOrderComplete = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const warriorKingProduct =
    products.find((p) => p.title.includes('Warrior KING')) || products[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] selection:bg-[#edd065] selection:text-black">
      
      {/* 1. Top Bar, Scrolling Marquee Ticker, & Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLabTests={() => setIsLabTestsOpen(true)}
        onOpenReviews={navigateToReviews}
        onGoHome={navigateToHome}
        onSelectCategory={(cat) => {
          if (currentPage !== 'home') {
            setCurrentPage('home');
          }
          setActiveCategory(cat);
          setTimeout(() => {
            const el = document.getElementById('premium-range');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
      />

      {currentPage === 'reviews' ? (
        /* DEDICATED REVIEWS PAGE - Stays 100% on our website */
        <ReviewsPage
          products={products}
          onGoHome={navigateToHome}
          onContinueShopping={handleContinueShopping}
          onSelectProduct={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod) => {
            handleAddToCart(prod);
            setIsCartOpen(true);
          }}
        />
      ) : (
        <main className="flex-grow">
          {/* 2. Hero Section matching Glozin Template */}
          <Hero
            featuredProduct={warriorKingProduct}
            onExplorePreWorkouts={() => {
              document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreStacks={() => {
              document.getElementById('stacks')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* 3. Circular Category Navigation (6 Circles) */}
          <CategoryCircles
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
            }}
          />

          {/* 4. Cancel Ticker (Yellow Ribbon with Red Cancel Icon) */}
          <CancelTicker />

          {/* 5. The Premium Range: Fuel Your Potential (Tabs + Inline Variants + Yellow Add to Cart) */}
          <PremiumRangeSection
            products={products}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            addedProductId={addedProductId}
          />

          {/* 6. Why PremiumSupps: Pure Doses. No Fillers. No Excuses. + 99%+ Purity Tested */}
          <WhyPremiumSupps onOpenLabTests={() => setIsLabTestsOpen(true)} />

          {/* 7. Live Video Reviews: Join 36,000+ Australians Training Harder */}
          <LiveVideoReviews onViewAllReviews={navigateToReviews} />

          {/* 8. Stack Bundle: Bundle & Save Up to 50% */}
          <StacksSection
            products={products}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
          />

          {/* 9. Super Saver Sale Promo Banner */}
          <SuperSaverBanner />

          {/* 10. What Sets Us Apart: No Fluff. No Fillers. Just Results. */}
          <WhyWarriorWorks />

          {/* 11. Social Proof: What Our Customers Say (6 Verified Customer Reviews) */}
          <ReviewsSection onViewAllReviews={navigateToReviews} />

          {/* 12. The Standard We Set: Dosed For Results (6,000mg L-Citrulline Hero Card) */}
          <IngredientsStandard onOpenLabTests={() => setIsLabTestsOpen(true)} />

          {/* 13. Frequently Asked Questions (2-Column with Side Banner) */}
          <FaqSection />

          {/* 14. From The Blog (3 Featured Guides) */}
          <BlogPostsSection />

          {/* 15. CTA Hero Strip: Stop Buying Supplements You Can't Trust */}
          <CtaHeroStrip
            onShopAll={() => {
              document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* 16. Comprehensive Footer */}
      <Footer
        onSelectCategory={(cat) => {
          if (currentPage !== 'home') setCurrentPage('home');
          setActiveCategory(cat);
          setTimeout(() => {
            document.getElementById('premium-range')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onOpenLabTests={() => setIsLabTestsOpen(true)}
        onOpenReviews={navigateToReviews}
      />

      {/* 17. Floating Bottom-Left Mystery Gift Trigger & Modal */}
      <MysteryGiftModal />

      {/* Slide-out Cart Drawer with Free Express Shipping Bar ($150 AUD threshold) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, variant, qty) => {
          handleAddToCart(prod, variant, qty);
          setQuickViewProduct(null);
          setIsCartOpen(true);
        }}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(prod) => {
          setQuickViewProduct(prod);
        }}
      />

      {/* HPLC Laboratory Tests Certificate Modal */}
      <LabTestsModal
        isOpen={isLabTestsOpen}
        onClose={() => setIsLabTestsOpen(false)}
      />

      {/* Secure Australian Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderComplete={handleOrderComplete}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
