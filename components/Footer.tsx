'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, RotateCcw, Heart, Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-24 md:pb-12 border-t border-white/10">
      {/* Top Trust Pillars Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm">Free Express Delivery</h4>
            <p className="text-xs text-gray-400">On all orders above ₹999</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm">7-Day Easy Returns</h4>
            <p className="text-xs text-gray-400">No questions asked pick-up</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm">Encrypted Payments</h4>
            <p className="text-xs text-gray-400">100% Buyer Protection</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm">BPA Free & Durable</h4>
            <p className="text-xs text-gray-400">Engineered for Indian homes</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Newsletter Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight">
              Ghar<span className="text-primary-light font-normal">Craft</span>
            </span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Crafting Better Homes for Indian families with Scandinavian-inspired, functional, and durable organization products designed for everyday living.
          </p>

          <div className="pt-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Join 50,000+ Subscribers</h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors flex-1"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1 transition-colors shrink-0"
              >
                Join <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-primary-light mb-4">Shop Categories</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link href="/shop?category=Kitchen" className="hover:text-white transition-colors">Kitchen & Spice Jars</Link></li>
            <li><Link href="/shop?category=Storage" className="hover:text-white transition-colors">Pantry Containers</Link></li>
            <li><Link href="/shop?category=Bathroom" className="hover:text-white transition-colors">Bathroom Organizers</Link></li>
            <li><Link href="/shop?category=Laundry" className="hover:text-white transition-colors">Laundry Baskets</Link></li>
            <li><Link href="/shop?category=Living" className="hover:text-white transition-colors">Under-Bed Storage</Link></li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-primary-light mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Our Brand</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Organization Guides</Link></li>
            <li><a href="mailto:support@gharcraft.in" className="hover:text-white transition-colors">support@gharcraft.in</a></li>
          </ul>
        </div>

        {/* Payment & Localization */}
        <div>
          <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-primary-light mb-4">Accepted Payments</h4>
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
            <span className="px-2.5 py-1 bg-white/10 rounded-md font-mono">UPI / GPay</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md font-mono">PhonePe</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md font-mono">Paytm</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md font-mono">Razorpay</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md font-mono">Visa / MC</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md font-mono">NetBanking</span>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400">
            <p><strong>Customer Support:</strong></p>
            <p>Mon - Sat (9:00 AM - 7:00 PM IST)</p>
            <p className="text-primary-light font-semibold mt-1">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© 2026 GharCraft Living Technologies Pvt Ltd. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> for Indian Homes
        </p>
      </div>
    </footer>
  );
};
