'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, Check, ShieldCheck, Truck, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, checkPincode, pincodeInfo, pincode } = useStore();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [inputPincode, setInputPincode] = useState(pincode);

  if (!quickViewProduct) return null;

  const activeColor = selectedColor || quickViewProduct.colors?.[0]?.name;
  const inWishlist = isInWishlist(quickViewProduct.id);
  const discountPercent = Math.round(((quickViewProduct.mrp - quickViewProduct.price) / quickViewProduct.mrp) * 100);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(inputPincode);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-100 animate-slide-up">
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md text-gray-500 hover:text-dark rounded-full shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery View */}
          <div className="p-6 bg-brandBg flex flex-col justify-between">
            <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={quickViewProduct.images[selectedImgIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 justify-center">
              {quickViewProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImgIndex(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImgIndex === i ? 'border-primary scale-105 shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{quickViewProduct.category}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {quickViewProduct.rating} ({quickViewProduct.reviewsCount})
                </div>
              </div>

              <h2 className="font-heading font-bold text-xl text-dark leading-snug">{quickViewProduct.name}</h2>
              <p className="text-xs text-gray-500 mt-1">{quickViewProduct.tagline}</p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-heading font-bold text-2xl text-primary">₹{quickViewProduct.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{quickViewProduct.mrp}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Save ₹{quickViewProduct.mrp - quickViewProduct.price}
                </span>
              </div>

              {/* Color Selection */}
              {quickViewProduct.colors && (
                <div className="mt-4">
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Color: <span className="text-gray-500 font-normal">{activeColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          activeColor === c.name ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {activeColor === c.name && <Check className="w-3 h-3 text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode Delivery Check */}
              <div className="mt-5 p-3 bg-brandBg rounded-2xl border border-gray-100">
                <form onSubmit={handlePincodeSubmit} className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary shrink-0" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter Indian Pincode (e.g. 110001)"
                    value={inputPincode}
                    onChange={(e) => setInputPincode(e.target.value)}
                    className="text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-primary flex-1"
                  />
                  <button
                    type="submit"
                    className="text-xs bg-dark text-white px-3 py-1.5 rounded-lg hover:bg-primary font-semibold transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeInfo && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Delivered in {pincodeInfo.days} days to {pincodeInfo.location}. COD Available!
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <div className="flex items-center border border-gray-200 rounded-2xl px-3 py-2 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-dark px-1 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold px-3 text-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-dark px-1 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity, activeColor);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all duration-300 transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-2xl border transition-colors ${
                    inWishlist ? 'bg-accent/10 border-accent text-accent' : 'border-gray-200 text-gray-500 hover:text-accent'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-accent' : ''}`} />
                </button>
              </div>

              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-xs text-center font-semibold text-primary hover:underline flex items-center justify-center gap-1 pt-1"
              >
                View Full Product Specs & Customer Photos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
