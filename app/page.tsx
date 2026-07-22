'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Truck, Sparkles, CheckCircle2, RotateCcw, Play, Heart, Gift, MessageCircle } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { BLOG_POSTS } from '@/data/blogs';
import { ProductCard } from '@/components/ProductCard';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';

const ROOM_CATEGORIES = [
  {
    id: 'Kitchen',
    title: 'Kitchen & Spice Pantry',
    subtitle: 'Airtight borosilicate jars, lazy susans & spice racks',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
    itemsCount: '18 Products',
  },
  {
    id: 'Storage',
    title: 'Pantry Containers',
    subtitle: 'Stackable BPA-free containers for Atta, Rice & Dals',
    img: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1000&auto=format&fit=crop',
    itemsCount: '12 Products',
  },
  {
    id: 'Bathroom',
    title: 'Bathroom Storage',
    subtitle: 'Rust-proof self-adhesive aluminum shower racks',
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    itemsCount: '9 Products',
  },
  {
    id: 'Laundry',
    title: 'Laundry & Living',
    subtitle: 'Foldable linen hampers & under-bed saree organizers',
    img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000&auto=format&fit=crop',
    itemsCount: '14 Products',
  },
];

export default function HomePage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const filteredProducts = activeCategoryTab === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategoryTab);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-secondary overflow-hidden py-12 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-xs font-semibold text-primary">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Scandinavian Elegance • Designed for Indian Homes</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-dark leading-[1.15] tracking-tight">
              Crafting <span className="text-primary italic font-serif">Better</span> Homes.
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
              Smart, aesthetic home organization products thoughtfully designed for modern Indian kitchens, wardrobes, and living spaces.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/shop"
                className="bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-4 rounded-2xl shadow-float hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                Shop Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#transformations"
                className="bg-white hover:bg-gray-100 text-dark font-heading font-semibold px-7 py-4 rounded-2xl border border-gray-200 transition-colors flex items-center gap-2"
              >
                Explore Transformations
              </Link>
            </div>

            {/* Social Proof Metric Bar */}
            <div className="pt-6 border-t border-gray-300/60 flex items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center border-2 border-white text-[10px]">R</div>
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center border-2 border-white text-[10px]">S</div>
                  <div className="w-8 h-8 rounded-full bg-stone-700 text-white font-bold flex items-center justify-center border-2 border-white text-[10px]">A</div>
                </div>
                <div>
                  <div className="flex items-center text-amber-500">
                    {'★'.repeat(5)} <span className="text-dark font-bold ml-1">4.9/5</span>
                  </div>
                  <span className="text-gray-500 text-[11px]">100,000+ Happy Homes</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <strong className="text-dark block font-semibold">19,000+ Pincodes</strong>
                <span className="text-gray-500 text-[11px]">COD & Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Lifestyle Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
                alt="Organized Indian Kitchen"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Feature Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-xs text-dark">Borosilicate Spice Jars</h4>
                    <p className="text-[10px] text-gray-500">100% Moisture Proof Silicone Bamboo Seal</p>
                  </div>
                </div>
                <Link href="/product/gharcraft-spice-jars-12" className="text-xs font-bold text-primary hover:underline">
                  Shop ₹1,499 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY ROOM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Thoughtful Spaces</span>
              <h2 className="font-heading font-bold text-3xl text-dark tracking-tight mt-1">Shop By Room</h2>
            </div>
            <Link href="/shop" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 mt-2 sm:mt-0">
              View All Room Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOM_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-gray-100"
              >
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">{cat.itemsCount}</span>
                  <h3 className="font-heading font-bold text-xl leading-tight">{cat.title}</h3>
                  <p className="text-xs text-gray-300 font-sans line-clamp-1">{cat.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Customer Favorites</span>
            <h2 className="font-heading font-bold text-3xl text-dark tracking-tight mt-1">Best Selling Organizers</h2>
            <p className="text-gray-500 text-sm mt-2">Tested and loved by over 100,000 Indian households.</p>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['All', 'Kitchen', 'Storage', 'Bathroom', 'Laundry'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    activeCategoryTab === tab
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE BEFORE & AFTER SLIDER */}
      <div id="transformations">
        <BeforeAfterSlider />
      </div>

      {/* 5. ORGANIZATION GUIDES & TIPS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Home Inspiration</span>
              <h2 className="font-heading font-bold text-3xl text-dark tracking-tight mt-1">Organization Guides & Hacks</h2>
            </div>
            <Link href="/blog" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 mt-2 sm:mt-0">
              Read All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="group bg-brandBg rounded-3xl overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-soft transition-all">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-dark text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] text-gray-400 font-medium">{post.date} • {post.readTime}</span>
                    <h3 className="font-heading font-bold text-base text-dark group-hover:text-primary transition-colors mt-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link href={`/blog#${post.id}`} className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline pt-2 border-t border-gray-200/60">
                    Read Full Hack Guide &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY 10,000+ INDIAN HOMES CHOOSE GHARCRAFT */}
      <section className="py-20 bg-secondary border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Craftsmanship & Purpose</span>
            <h2 className="font-heading font-bold text-3xl text-dark tracking-tight mt-1">Designed for Indian Homes</h2>
            <p className="text-gray-600 text-sm mt-2">Generic imported organizers don't fit Indian spices or large utensils. We built GharCraft differently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">Tailored for Indian Utensils & Spices</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Our drawer dividers easily store long Belan rolling pins, Chimta tongs, and large Kadais. Borosilicate jars prevent turmeric stains and moisture ruin.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">100% Rust-Proof & BPA-Free</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Built with 304 Grade Stainless Steel, anodized Space Aluminum, and food-grade non-toxic polymers that endure heavy Indian kitchen wear.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">Pan-India COD & 2-4 Day Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Shipped directly from our Mumbai & Delhi logistics centers across 19,000+ pincodes with doorstep Cash on Delivery and instant returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="px-3 py-1 bg-white/10 text-primary-light rounded-full text-xs font-semibold uppercase tracking-wider">
            Join The GharCraft Club
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Get Home Inspiration Delivered Weekly</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Subscribe to receive exclusive space-saving hacks, early access to new arrivals, and a 10% discount code on your first order.
          </p>

          {emailSubscribed ? (
            <div className="bg-primary/20 border border-primary text-primary-light p-4 rounded-2xl max-w-md mx-auto text-sm font-semibold">
              🎉 Thank you for joining! Check your inbox for code <strong>WELCOME10</strong>.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm rounded-2xl px-5 py-3.5 outline-none focus:border-primary flex-1"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white font-heading font-semibold px-6 py-3.5 rounded-2xl transition-colors shrink-0"
              >
                Claim 10% OFF
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
