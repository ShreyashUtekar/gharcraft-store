'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';

const POPULAR_SEARCHES = ['Borosilicate Spice Jars', 'Under Sink Rack', 'Lazy Susan', 'Bathroom Shelf', 'Laundry Basket', 'Airtight Container'];

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 px-4 pb-20">
        <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3 bg-brandBg">
            <Search className="w-6 h-6 text-primary shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search spices, pantry jars, bathroom racks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-dark font-medium text-base sm:text-lg outline-none placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-xs text-gray-400 hover:text-dark">
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-gray-400 hover:text-dark rounded-full hover:bg-gray-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Live Search Results */}
            {query.trim() !== '' ? (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Matching Results ({filteredProducts.length})
                </h3>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No home organizers found for "{query}".</p>
                    <p className="text-xs text-gray-400 mt-1">Try searching for "Glass Jars", "Rack", or "Storage".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setQuickViewProduct(prod);
                        }}
                        className="flex gap-3 p-2.5 bg-brandBg hover:bg-primary/5 rounded-2xl border border-gray-100 cursor-pointer transition-all group"
                      >
                        <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-heading font-semibold text-xs text-dark line-clamp-1 group-hover:text-primary">
                            {prod.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 mt-0.5">{prod.category}</span>
                          <span className="text-xs font-bold text-primary mt-1">₹{prod.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Suggestions & Popular Searches */
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-accent" /> Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-xs bg-brandBg hover:bg-primary hover:text-white text-dark px-3 py-1.5 rounded-full border border-gray-200 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Featured Trending Organizers
                  </h3>
                  <div className="space-y-2">
                    {PRODUCTS.slice(0, 3).map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-brandBg border border-transparent hover:border-gray-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden border border-gray-200 shrink-0">
                            <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="font-heading font-semibold text-xs text-dark group-hover:text-primary">
                              {prod.name}
                            </h4>
                            <p className="text-[10px] text-gray-500 line-clamp-1">{prod.tagline}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-primary flex items-center gap-1 shrink-0">
                          ₹{prod.price} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
