import {useEffect, useState} from 'react';
import {Check} from 'lucide-react';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {ProductCatalog, type SortOption} from './components/ProductCatalog';
import {OrchardStory} from './components/OrchardStory';
import {BlogSection} from './components/BlogSection';
import {Footer} from './components/Footer';
import {ProductDetailModal} from './components/ProductDetailModal';
import {BlogArticleModal} from './components/BlogArticleModal';
import {CartDrawer, type CartItem} from './components/CartDrawer';
import {useDynamicSeo} from './hooks/useDynamicSeo';
import {BLOG_POSTS, type BlogPost} from './data/blog';
import {
  FRUIT_PRODUCTS,
  type FruitCategory,
  type FruitProduct,
  type FruitVariant,
} from './data/fruits';

const CART_STORAGE_KEY = 'muaqua_cart_v1';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FruitCategory>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeProduct, setActiveProduct] = useState<FruitProduct | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dynamic SEO meta tags, canonical URL, and Schema.org JSON-LD
  useDynamicSeo(activeProduct, activeArticle);

  // Support deep-linking via URL hash (#blog/<slug> or #san-pham/<id>)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        const found = BLOG_POSTS.find((p) => p.slug === slug) ?? null;
        setActiveArticle(found);
        setActiveProduct(null);
      } else if (hash.startsWith('#san-pham/')) {
        const id = hash.replace('#san-pham/', '');
        const found = FRUIT_PRODUCTS.find((p) => p.id === id) ?? null;
        setActiveProduct(found);
        setActiveArticle(null);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const openProduct = (product: FruitProduct) => {
    setActiveProduct(product);
    window.history.replaceState(null, '', `#san-pham/${product.id}`);
  };

  const closeProduct = () => {
    setActiveProduct(null);
    if (window.location.hash.startsWith('#san-pham/')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const openArticle = (article: BlogPost) => {
    setActiveArticle(article);
    window.history.replaceState(null, '', `#blog/${article.slug}`);
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (window.location.hash.startsWith('#blog/')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Array<{
        productId: string;
        variantId: string;
        quantity: number;
      }>;
      return parsed
        .map((entry) => {
          const product = FRUIT_PRODUCTS.find((p) => p.id === entry.productId);
          if (!product) return null;
          const variant =
            product.variants.find((v) => v.id === entry.variantId) ?? product.variants[0];
          return {
            key: `${product.id}__${variant.id}`,
            product,
            variant,
            quantity: Math.max(1, entry.quantity),
          };
        })
        .filter((x): x is CartItem => x !== null);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const compact = cartItems.map((item) => ({
        productId: item.product.id,
        variantId: item.variant.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [cartItems]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: FruitProduct,
    variant: FruitVariant,
    quantity = 1,
  ) => {
    const key = `${product.id}__${variant.id}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? {...item, quantity: item.quantity + quantity} : item,
        );
      }
      return [...prev, {key, product, variant, quantity}];
    });
    setToastMessage(`Đã thêm ${product.name} (${variant.weightLabel}) vào giỏ`);
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? {...item, quantity: item.quantity + delta} : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#18221B]">
      <Header
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectNavCategory={(cat) => setSelectedCategory(cat)}
      />

      <main className="flex-1">
        <Hero
          onExploreCatalog={() =>
            document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})
          }
          onJumpToSeason={() =>
            document.getElementById('orchard-story')?.scrollIntoView({behavior: 'smooth'})
          }
        />

        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenProduct={openProduct}
          onQuickAdd={(product, variant) => handleAddToCart(product, variant, 1)}
        />

        <OrchardStory />

        <BlogSection onOpenArticle={openArticle} />
      </main>

      <Footer onSelectCategory={setSelectedCategory} />

      <ProductDetailModal
        product={activeProduct}
        onClose={closeProduct}
        onAddToCart={handleAddToCart}
      />

      <BlogArticleModal
        article={activeArticle}
        onClose={closeArticle}
        onSelectProduct={openProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Non-blocking subtle cart confirmation toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 px-4 py-3 bg-[#18221B] text-white text-sm rounded-lg shadow-lg border border-[#2F3D33]"
        >
          <Check className="w-4 h-4 text-[#8EBE58] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 text-xs font-semibold text-[#C5DF8D] hover:underline whitespace-nowrap cursor-pointer"
          >
            Xem giỏ
          </button>
        </div>
      )}
    </div>
  );
}
