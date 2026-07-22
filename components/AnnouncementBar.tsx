'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Star, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  { icon: Truck, text: '🚚 Free Shipping Above ₹999 across 19,000+ Indian Pincodes' },
  { icon: Star, text: '⭐ 100,000+ Happy Indian Homes Organized & Transformed' },
  { icon: RotateCcw, text: '🔄 Easy 7-Day Doorstep Returns & Instant Refunds' },
  { icon: ShieldCheck, text: '💵 Cash On Delivery (COD) & UPI Extra 5% OFF Available' },
];

export const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = ANNOUNCEMENTS[index].icon;

  return (
    <div className="bg-[#222222] text-[#FAF8F5] text-xs font-medium py-2 px-4 border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-[#2E7D32]" /> Free Shipping &gt; ₹999</span>
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400" /> 4.9/5 Rating</span>
        </div>

        <div className="flex-1 flex justify-center items-center gap-2 transition-all duration-500">
          <CurrentIcon className="w-4 h-4 text-[#C96A3D] animate-pulse" />
          <span className="tracking-wide text-center">{ANNOUNCEMENTS[index].text}</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <span className="text-gray-300">Use Code <strong className="text-white bg-primary/40 px-1.5 py-0.5 rounded">WELCOME10</strong></span>
          <a href="/track-order" className="hover:text-primary-light flex items-center gap-0.5 transition-colors">
            Track Order <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
