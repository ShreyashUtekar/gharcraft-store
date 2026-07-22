'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-2 flex items-center justify-between shadow-lg">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 ${
          pathname === '/' ? 'text-primary font-semibold' : 'text-gray-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </Link>

      <Link
        href="/shop"
        className={`flex flex-col items-center gap-1 ${
          pathname === '/shop' ? 'text-primary font-semibold' : 'text-gray-500'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">Shop</span>
      </Link>

      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">Search</span>
      </button>

      <Link
        href="/shop?wishlist=true"
        className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary relative"
      >
        <Heart className="w-5 h-5" />
        <span className="text-[10px]">Wishlist</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </Link>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary relative"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px]">Cart</span>
        {totalCartCount > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {totalCartCount}
          </span>
        )}
      </button>
    </div>
  );
};
