'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100/80 shadow-soft hover:shadow-float transition-all duration-300 flex flex-col justify-between relative">
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-brandBg overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-primary text-white text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-amber-500 text-white text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              New Arrival
            </span>
          )}
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-max">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            inWishlist
              ? 'bg-white text-accent shadow-md scale-110'
              : 'bg-white/70 text-gray-600 hover:text-accent hover:bg-white'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-accent' : ''}`} />
        </button>

        {/* Quick View Floating Button */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 flex gap-2">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 bg-white/90 hover:bg-white backdrop-blur-md text-dark font-heading font-semibold text-xs py-2.5 px-3 rounded-2xl shadow-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-primary" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-primary/80 uppercase tracking-wider text-[10px]">{product.category}</span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating} <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-heading font-bold text-sm text-dark line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-1 mt-1 font-sans">
            {product.tagline}
          </p>
        </div>

        {/* Price & Add To Cart */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-base text-dark">₹{product.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              Save ₹{product.mrp - product.price}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-2xl transition-all duration-300 shadow-sm flex items-center gap-1 text-xs font-semibold"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
