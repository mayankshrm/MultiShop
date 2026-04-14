import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense } from "react";
import FirstPopUp from "@/components/FirstPopUp";
import Link from "next/link";

const trustBadges = [
  { icon: "🚚", title: "Free Delivery", sub: "On orders above ₹499" },
  { icon: "🔒", title: "Secure Payment", sub: "100% safe transactions" },
  { icon: "↩️", title: "Easy Returns", sub: "7-day hassle-free" },
  { icon: "⭐", title: "Top Quality", sub: "Curated products only" },
];

const HomePage = async () => {
  return (
    <div>
      <FirstPopUp />
      <Slider />

      {/* Featured Products */}
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-2xl font-bold text-ink shrink-0">Featured Products</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-lama/30 to-transparent" />
          <Link
            href="/list?cat=all-products"
            className="text-sm font-medium text-lama hover:text-lama-dark flex items-center gap-1 transition-colors shrink-0"
          >
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
        <p className="text-sm text-ink-muted mb-2">Handpicked daily essentials at unbeatable prices</p>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>

      {/* Trust Badges */}
      <div className="mt-16 mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64">
        <div className="py-8 px-6 bg-white rounded-2xl shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex flex-col items-center text-center gap-2">
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-sm font-semibold text-ink">{badge.title}</span>
                <span className="text-xs text-ink-muted">{badge.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Products */}
      <div className="mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-2xl font-bold text-ink shrink-0">New Arrivals</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-lama/30 to-transparent" />
          <Link
            href="/list?cat=all-products"
            className="text-sm font-medium text-lama hover:text-lama-dark flex items-center gap-1 transition-colors shrink-0"
          >
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
        <p className="text-sm text-ink-muted mb-2">Fresh picks just added to our collection</p>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>

      {/* Newsletter */}
      <div className="mt-24 mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 mb-16">
        <div className="bg-gradient-to-r from-lama-light to-pink-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-ink mb-2">Stay in the Loop</h2>
          <p className="text-ink-muted mb-6 max-w-sm mx-auto text-sm">
            Get the best deals straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-surface-muted focus:outline-none focus:ring-2 focus:ring-lama text-sm bg-white"
            />
            <button
              type="submit"
              className="bg-lama text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-lama-dark transition-colors duration-200 shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
