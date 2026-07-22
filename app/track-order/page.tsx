'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck, CheckCircle2, Package, MapPin, Clock, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialAwb = searchParams.get('awb') || '';
  const { orders } = useStore();

  const [inputOrder, setInputOrder] = useState(initialAwb);
  const [searchedOrder, setSearchedOrder] = useState<any>(
    initialAwb ? orders.find((o) => o.id.toLowerCase() === initialAwb.toLowerCase()) : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputOrder.trim().toLowerCase();
    if (!clean) return;

    const matched = orders.find(
      (o) => o.id.toLowerCase() === clean || o.phone.includes(clean) || o.email.toLowerCase() === clean
    );
    setSearchedOrder(matched || null);
  };

  const getStepProgress = (status: string) => {
    if (status === 'Delivered') return 4;
    if (status === 'Shipped') return 3;
    if (status === 'Placed on Supplier') return 2;
    return 1;
  };

  return (
    <div className="bg-brandBg min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Real-Time Logistics</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-dark tracking-tight mt-1">Track Your Order</h1>
          <p className="text-xs text-gray-500 mt-2">Enter your Order ID (e.g. GHAR-98412) or Mobile Phone Number to view live status.</p>
        </div>

        {/* Tracking Search Input */}
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-soft mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-brandBg px-4 py-3 rounded-2xl border border-gray-200">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Order ID or Mobile Number"
                value={inputOrder}
                onChange={(e) => setInputOrder(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-dark outline-none font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-6 py-3 rounded-2xl transition-colors text-xs flex items-center gap-1.5"
            >
              Track Order <Truck className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Search Result */}
        {searchedOrder ? (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-soft space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Status: {searchedOrder.status}
                </span>
                <h2 className="font-heading font-bold text-xl text-dark mt-2">Order ID: {searchedOrder.id}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Recipient: <strong>{searchedOrder.customerName}</strong> ({searchedOrder.city})</p>
              </div>

              <div className="bg-brandBg p-3 rounded-2xl border border-gray-200 text-right text-xs">
                <span className="text-gray-500 block">Total Collected:</span>
                <strong className="text-primary text-sm font-bold">₹{searchedOrder.totalAmount} ({searchedOrder.paymentMethod.toUpperCase()})</strong>
              </div>
            </div>

            {/* Visual Step-by-Step Progress */}
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-dark">Shipment Progress Timeline</h3>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                <div className={`p-3 rounded-2xl border ${getStepProgress(searchedOrder.status) >= 1 ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-400'}`}>
                  1. Order Placed
                </div>
                <div className={`p-3 rounded-2xl border ${getStepProgress(searchedOrder.status) >= 2 ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-400'}`}>
                  2. Processing
                </div>
                <div className={`p-3 rounded-2xl border ${getStepProgress(searchedOrder.status) >= 3 ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-400'}`}>
                  3. In Transit
                </div>
                <div className={`p-3 rounded-2xl border ${getStepProgress(searchedOrder.status) >= 4 ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-400'}`}>
                  4. Delivered
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-heading font-bold text-xs uppercase text-dark mb-2">Items Included</h4>
              <div className="space-y-1 text-xs text-gray-600">
                {searchedOrder.items.map((it: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>• {it.productName} (x{it.quantity})</span>
                    <span className="font-bold">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support footer */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Need help with this shipment? Email <strong>support@gharcraft.in</strong></span>
              </div>
            </div>
          </div>
        ) : inputOrder ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center text-xs text-gray-500 space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="font-bold text-dark text-sm">No order found matching "{inputOrder}"</p>
            <p>Please double-check your Order ID or phone number, or check your confirmation email.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold text-gray-500">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
