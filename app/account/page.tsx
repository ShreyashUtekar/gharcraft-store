'use client';

import React from 'react';
import Link from 'next/link';
import { User, Package, MapPin, LogOut, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AccountPage() {
  const { currentUser, logoutUser, orders, setIsAuthOpen } = useStore();

  if (!currentUser) {
    return (
      <div className="bg-brandBg min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-3xl border border-gray-200 shadow-soft text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-bold text-xl text-dark">Customer Account Sign In</h2>
          <p className="text-xs text-gray-500">Sign in to view your orders, delivery status, and saved home items.</p>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3 rounded-2xl text-xs transition-colors"
          >
            Sign In / Create Account
          </button>
        </div>
      </div>
    );
  }

  // Filter orders for current user email or name
  const userOrders = orders.filter(
    (o) => o.email.toLowerCase() === currentUser.email.toLowerCase() || o.customerName.toLowerCase() === currentUser.name.toLowerCase()
  );

  return (
    <div className="bg-brandBg min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white font-bold text-2xl flex items-center justify-center shadow-md">
              {currentUser.name[0].toUpperCase()}
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl text-dark">{currentUser.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{currentUser.email} {currentUser.phone ? `• ${currentUser.phone}` : ''}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-md">
                Verified GharCraft Member
              </span>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-dark font-heading font-semibold px-5 py-2.5 rounded-2xl text-xs transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Customer Orders History */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> My Order History ({userOrders.length})
            </h2>
            <Link href="/shop" className="text-xs font-semibold text-primary hover:underline">
              Shop Organizers &rarr;
            </Link>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-xs text-gray-500">You haven't placed any home transformation orders yet.</p>
              <Link
                href="/shop"
                className="inline-block bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
              >
                Explore Best Sellers
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((ord) => (
                <div key={ord.id} className="p-4 sm:p-6 bg-brandBg rounded-2xl border border-gray-200 space-y-3 text-xs">
                  <div className="flex justify-between items-start flex-wrap gap-2 border-b border-gray-200 pb-3">
                    <div>
                      <span className="font-mono font-bold text-dark text-sm">{ord.id}</span>
                      <span className="text-gray-400 block text-[11px] mt-0.5">Placed on {ord.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-dark text-sm block">Total: ₹{ord.totalAmount}</span>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between font-medium text-dark">
                        <span>• {item.productName} (x{item.quantity})</span>
                        <span className="font-mono">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-500 text-[11px]">Shipping To: {ord.address}, {ord.city}</span>
                    <Link
                      href={`/track-order?awb=${ord.id}`}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" /> Track Package &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
