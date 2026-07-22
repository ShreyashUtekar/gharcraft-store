'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { cart, wishlist, setIsCartOpen, setIsSearchOpen, setIsAuthOpen, currentUser } = useStore();
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-gray-200/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-dark p-2 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-2xl tracking-tight text-dark flex items-center gap-1">
              Ghar<span className="text-primary font-normal">Craft</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 -mt-1">
              Crafting Better Homes
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm text-dark">
          <Link href="/" className={`hover:text-primary transition-colors ${pathname === '/' ? 'text-primary font-semibold' : ''}`}>
            Home
          </Link>

          {/* Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <Link
              href="/shop"
              className="flex items-center gap-1 hover:text-primary transition-colors py-2"
            >
              Shop By Room <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-primary' : ''}`} />
            </Link>

            {/* Mega Menu Dropdown */}
            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6 animate-fade-in z-50">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-primary mb-3">Kitchen & Dining</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="/shop?category=Kitchen" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Spice Jars & Organizers</Link></li>
                    <li><Link href="/shop?category=Kitchen" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Pantry Airtight Containers</Link></li>
                    <li><Link href="/shop?category=Kitchen" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Under-Sink Racks</Link></li>
                    <li><Link href="/shop?category=Kitchen" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Lazy Susans & Turntables</Link></li>
                    <li><Link href="/shop?category=Kitchen" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Dish Drainers</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-accent mb-3">Wardrobe & Living</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="/shop?category=Storage" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Drawer Dividers</Link></li>
                    <li><Link href="/shop?category=Living" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Under-Bed Storage Bags</Link></li>
                    <li><Link href="/shop?category=Laundry" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Laundry Dampers & Baskets</Link></li>
                    <li><Link href="/shop?category=Bathroom" className="hover:text-dark hover:translate-x-1 inline-block transition-transform">Self-Adhesive Bathroom Racks</Link></li>
                  </ul>
                </div>

                <div className="bg-secondary p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-md mb-2">Featured Collection</span>
                    <h5 className="font-heading font-semibold text-dark text-base">Monsoon Pantry Proofing</h5>
                    <p className="text-xs text-gray-500 mt-1">Keep spices & dals 100% dry with borosilicate seals.</p>
                  </div>
                  <Link href="/shop?category=Kitchen" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline mt-4">
                    Explore Collection &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/shop" className={`hover:text-primary transition-colors ${pathname === '/shop' ? 'text-primary font-semibold' : ''}`}>
            All Products
          </Link>

          <Link href="/blog" className={`hover:text-primary transition-colors ${pathname === '/blog' ? 'text-primary font-semibold' : ''}`}>
            Guides & Hacks
          </Link>

          <Link href="/about" className={`hover:text-primary transition-colors ${pathname === '/about' ? 'text-primary font-semibold' : ''}`}>
            Our Story
          </Link>

          <Link href="/track-order" className="hover:text-primary transition-colors">
            Track Order
          </Link>
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Instant Search Launcher */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-dark hover:text-primary hover:bg-secondary rounded-full transition-colors"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Account / Auth Modal Launcher */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="p-2 text-dark hover:text-primary hover:bg-secondary rounded-full transition-colors relative flex items-center gap-1"
            title={currentUser ? `Account: ${currentUser.name}` : 'Sign In'}
          >
            <User className="w-5 h-5" />
            {currentUser && (
              <span className="hidden sm:inline text-xs font-bold text-primary max-w-[80px] truncate">
                {currentUser.name}
              </span>
            )}
          </button>

          {/* Wishlist Icon */}
          <Link
            href="/shop?wishlist=true"
            className="p-2 text-dark hover:text-primary hover:bg-secondary rounded-full transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-dark hover:text-primary hover:bg-secondary rounded-full transition-colors relative flex items-center gap-1.5"
            title="Cart Drawer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-gray-200 p-6 space-y-4 shadow-xl z-50">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsAuthOpen(true);
            }}
            className="w-full text-left py-2 text-primary font-bold border-b border-gray-100 flex items-center gap-2"
          >
            <User className="w-4 h-4" /> {currentUser ? `Hi, ${currentUser.name}` : 'Sign In / Register'}
          </button>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-dark font-medium border-b border-gray-100"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-dark font-medium border-b border-gray-100"
          >
            Shop All Products
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-dark font-medium border-b border-gray-100"
          >
            Organization Guides & Hacks
          </Link>
          <Link
            href="/track-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-dark font-medium border-b border-gray-100"
          >
            Track My Order
          </Link>
        </div>
      )}
    </header>
  );
};
