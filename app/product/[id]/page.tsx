'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Truck, ShieldCheck, Heart, ShoppingBag, Check, RotateCw, ChevronRight, Plus, ThumbsUp, MessageCircle, AlertCircle } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return notFound();
  }

  const { addToCart, toggleWishlist, isInWishlist, checkPincode, pincodeInfo, pincode, addRecentlyViewed } = useStore();
  const inWishlist = isInWishlist(product.id);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [inputPincode, setInputPincode] = useState(pincode);
  const [addBundle, setAddBundle] = useState(true);

  // Track recently viewed
  React.useEffect(() => {
    addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Bundle logic
  const complementaryProduct = product.boughtTogetherId
    ? PRODUCTS.find((p) => p.id === product.boughtTogetherId)
    : PRODUCTS.find((p) => p.id !== product.id);

  const bundleTotalMRP = product.mrp + (complementaryProduct ? complementaryProduct.mrp : 0);
  const bundleTotalPrice = Math.round((product.price + (complementaryProduct ? complementaryProduct.price : 0)) * 0.9); // Extra 10% bundle discount

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(inputPincode);
  };

  return (
    <div className="bg-brandBg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-soft">
          {/* Left Column: Gallery & 360 View */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full bg-brandBg rounded-3xl overflow-hidden border border-gray-200 shadow-sm group">
              {is360Mode ? (
                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const angle = Math.floor((x / rect.width) * 360);
                    setRotationAngle(angle);
                  }}
                  className="w-full h-full flex flex-col items-center justify-center cursor-ew-resize bg-dark text-white p-6 relative"
                >
                  <Image
                    src={product.images[0]}
                    alt="360 View"
                    fill
                    className="object-cover transition-transform duration-100"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                  />
                  <div className="absolute bottom-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 z-10">
                    <RotateCw className="w-3.5 h-3.5 text-primary-light animate-spin" /> Drag mouse left/right for 360° Interactive Angle ({rotationAngle}°)
                  </div>
                </div>
              ) : (
                <Image
                  src={product.images[activeImgIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              {/* 360 Mode Toggle Button */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all z-10 ${
                  is360Mode ? 'bg-primary text-white' : 'bg-white/90 text-dark hover:bg-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" /> {is360Mode ? 'Standard Photo' : '360° Interactive View'}
              </button>

              <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImgIndex(idx);
                    setIs360Mode(false);
                  }}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImgIndex === idx && !is360Mode
                      ? 'border-primary ring-2 ring-primary/20 scale-105'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`thumb-${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Buying Box & Specifications */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                  ● {product.stockStatus}
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-dark leading-tight">{product.name}</h1>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">{product.tagline}</p>

              {/* Star Ratings */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {product.rating} / 5
                </div>
                <span className="text-xs text-gray-500">Based on {product.reviewsCount} verified Indian home reviews</span>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-brandBg rounded-2xl border border-gray-200/80 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-3xl text-primary">₹{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">MRP ₹{product.mrp}</span>
                  </div>
                  <span className="text-xs text-emerald-700 font-medium block mt-0.5">
                    Inclusive of all taxes. Free Shipping &gt; ₹999.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                    You Save ₹{product.mrp - product.price}
                  </span>
                </div>
              </div>

              {/* Color Options */}
              {product.colors && (
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Select Color Finish: <span className="text-gray-500 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-dark'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode & COD Availability Check */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                <label className="text-xs font-semibold text-dark flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-primary" /> Delivery & COD Checker
                </label>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter Pincode (e.g. 400001)"
                    value={inputPincode}
                    onChange={(e) => setInputPincode(e.target.value)}
                    className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-dark hover:bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeInfo && (
                  <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl font-medium space-y-1">
                    <p className="flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-4 h-4" /> Delivered in {pincodeInfo.days} Days to {pincodeInfo.location}
                    </p>
                    <p className="text-gray-600">✓ Cash On Delivery (COD) Available • Easy Doorstep Pickup Returns</p>
                  </div>
                )}
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <div className="flex items-center border border-gray-200 rounded-2xl px-3 py-2 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-dark px-2 text-base font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold px-3 text-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-dark px-2 text-base font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity, selectedColor)}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-float transition-all duration-300 transform active:scale-95 text-sm"
                >
                  <ShoppingBag className="w-5 h-5" /> Add To Shopping Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-2xl border transition-all ${
                    inWishlist ? 'bg-accent/10 border-accent text-accent' : 'border-gray-200 text-gray-500 hover:text-accent'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-accent' : ''}`} />
                </button>
              </div>
            </div>

            {/* Key Features Bullet List */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark">Why You'll Love It</h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER BUNDLE BUILDER */}
        {complementaryProduct && (
          <div className="mt-12 bg-white p-8 rounded-3xl border border-gray-200/80 shadow-soft">
            <h3 className="font-heading font-bold text-xl text-dark mb-2">Frequently Bought Together</h3>
            <p className="text-xs text-gray-500 mb-6">Combine organizers and unlock an extra 10% Bundle Discount.</p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Main Item */}
                <div className="flex items-center gap-3 p-3 bg-brandBg rounded-2xl border border-gray-200">
                  <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-xs text-dark line-clamp-1">{product.name}</h4>
                    <span className="text-xs font-bold text-primary">₹{product.price}</span>
                  </div>
                </div>

                <Plus className="w-5 h-5 text-gray-400" />

                {/* Complementary Item */}
                <div className="flex items-center gap-3 p-3 bg-brandBg rounded-2xl border border-gray-200">
                  <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0">
                    <Image src={complementaryProduct.images[0]} alt={complementaryProduct.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-xs text-dark line-clamp-1">{complementaryProduct.name}</h4>
                    <span className="text-xs font-bold text-primary">₹{complementaryProduct.price}</span>
                  </div>
                </div>
              </div>

              {/* Bundle Pricing CTA */}
              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-xs text-gray-400 line-through">Total: ₹{bundleTotalMRP}</span>
                  <div className="font-heading font-bold text-2xl text-accent">Bundle Price: ₹{bundleTotalPrice}</div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Extra 10% Off Bundle Applied
                  </span>
                </div>
                <button
                  onClick={() => {
                    addToCart(product, 1, selectedColor);
                    addToCart(complementaryProduct, 1);
                  }}
                  className="bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all"
                >
                  Add Both To Bag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SPECIFICATIONS & DIMENSIONS TABLE */}
        <div className="mt-12 bg-white p-8 rounded-3xl border border-gray-200/80 shadow-soft">
          <h3 className="font-heading font-bold text-xl text-dark mb-6">Technical Specifications & Care</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100 text-xs">
                  <span className="font-semibold text-gray-500">{key}</span>
                  <span className="font-bold text-dark text-right">{val}</span>
                </div>
              ))}
            </div>
            <div className="bg-brandBg p-6 rounded-2xl border border-gray-200/60 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">Indian Home Care Guide</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Wipe clean with a damp soft microfiber cloth. For borosilicate glass body, hand wash or use top rack dishwasher cycle. Do not boil natural bamboo lids in hot water.
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS */}
        <div className="mt-12 bg-white p-8 rounded-3xl border border-gray-200/80 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-dark">Verified Customer Reviews</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-xs font-bold text-dark">{product.rating} out of 5</span>
                <span className="text-xs text-gray-400">• {product.reviewsCount} reviews</span>
              </div>
            </div>
            <button className="bg-dark hover:bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-brandBg rounded-2xl border border-gray-200/60 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-heading font-bold text-xs text-dark">Pooja Sharma (Mumbai)</h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">Verified Buyer • 6 days ago</span>
                </div>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Absolute game changer for my kitchen pantry in Mumbai humidity! The bamboo lid seal is 100% airtight. Turmeric and Garam Masala stay completely dry."
              </p>
            </div>

            <div className="p-4 bg-brandBg rounded-2xl border border-gray-200/60 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-heading font-bold text-xs text-dark">Vikram Sengupta (Bengaluru)</h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">Verified Buyer • 2 weeks ago</span>
                </div>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "The quality feels like Muji or IKEA but priced perfectly for Indian homes. Delivery was super fast via Delhivery in 3 days."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
