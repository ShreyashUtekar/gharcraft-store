'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, RefreshCw, X, Heart } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const showWishlistOnly = searchParams.get('wishlist') === 'true';

  const { wishlist } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  const materials = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(p.material));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (showWishlistOnly && !wishlist.includes(p.id)) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (selectedMaterial !== 'All' && p.material !== selectedMaterial) return false;
      if (inStockOnly && p.stockStatus !== 'In Stock') return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, maxPrice, selectedMaterial, inStockOnly, sortBy, showWishlistOnly, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(5000);
    setSelectedMaterial('All');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="bg-brandBg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
              {showWishlistOnly ? <Heart className="w-4 h-4 text-accent fill-accent" /> : null}
              {showWishlistOnly ? 'Saved Favorites' : 'Product Collection'}
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-dark mt-1">
              {showWishlistOnly ? 'Your Wishlist' : selectedCategory === 'All' ? 'All Home Organizers' : `${selectedCategory} Collection`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Showing {filteredProducts.length} handcrafted products engineered for Indian living.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-dark shadow-sm"
            >
              <Filter className="w-4 h-4 text-primary" /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-dark shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-semibold text-gray-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-3xl border border-gray-200/80 shadow-soft h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-heading font-bold text-sm text-dark flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Filter Products
              </h3>
              <button onClick={resetFilters} className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Room Category</h4>
              <div className="space-y-1.5 text-xs font-medium">
                {['All', 'Kitchen', 'Storage', 'Bathroom', 'Laundry', 'Living'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex justify-between items-center ${
                      selectedCategory === cat ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] text-gray-400">
                      {cat === 'All' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs font-bold text-dark mb-2">
                <span>Max Price</span>
                <span className="text-primary font-mono">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Material Filter */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Material</h4>
              <div className="space-y-1.5 text-xs">
                {materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      selectedMaterial === mat ? 'bg-dark text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                In Stock Only
              </label>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
                <h3 className="font-heading font-bold text-dark text-lg">No products match your criteria</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing filters or adjusting your price slider to discover other organizers.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold text-gray-500">Loading GharCraft catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
