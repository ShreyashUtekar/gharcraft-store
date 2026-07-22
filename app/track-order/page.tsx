'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck, CheckCircle2, Package, MapPin, Clock, Search, ShieldCheck } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialAwb = searchParams.get('awb') || 'GHAR-98412';

  const [inputOrder, setInputOrder] = useState(initialAwb);
  const [searched, setSearched] = useState(true);

  const steps = [
    { label: 'Order Confirmed', date: 'Jul 22, 10:30 AM', completed: true },
    { label: 'Packed & Sealed', date: 'Jul 22, 02:15 PM', completed: true },
    { label: 'Shipped via Delhivery Express', date: 'Jul 22, 06:00 PM', completed: true, active: true },
    { label: 'Out for Delivery', date: 'Expected Tomorrow', completed: false },
    { label: 'Delivered', date: 'Expected Jul 24', completed: false },
  ];

  return (
    <div className="bg-brandBg min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Real-Time Logistics</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-dark tracking-tight mt-1">Track Your Order</h1>
          <p className="text-xs text-gray-500 mt-2">Enter your Order ID (e.g. GHAR-98412) or Mobile Number to view live shipment status.</p>
        </div>

        {/* Tracking Search Input */}
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-soft mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(true);
            }}
            className="flex gap-2"
          >
            <div className="flex-1 flex items-center gap-2 bg-brandBg px-4 py-3 rounded-2xl border border-gray-200">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Order ID or AWB Tracking Number"
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

        {/* Live Timeline Result */}
        {searched && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-soft space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  In Transit • Air Express
                </span>
                <h2 className="font-heading font-bold text-xl text-dark mt-2">Shipment ID: {inputOrder}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Courier Partner: <strong>Delhivery Surface Air</strong> (AWB: 88492019412)</p>
              </div>

              <div className="bg-brandBg p-3 rounded-2xl border border-gray-200 text-right text-xs">
                <span className="text-gray-500 block">Expected Arrival:</span>
                <strong className="text-primary text-sm font-bold">Friday, 24th July</strong>
              </div>
            </div>

            {/* Visual Step-by-Step Progress */}
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-dark">Shipment Progress Timeline</h3>
              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                        step.active
                          ? 'bg-primary text-white border-primary ring-4 ring-primary/20 animate-pulse'
                          : step.completed
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-400 border-gray-300'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 bg-brandBg p-4 rounded-2xl border border-gray-100 flex justify-between items-center text-xs">
                      <div>
                        <h4 className={`font-heading font-bold ${step.active ? 'text-primary' : step.completed ? 'text-dark' : 'text-gray-400'}`}>
                          {step.label}
                        </h4>
                        {step.active && (
                          <p className="text-[11px] text-gray-500 mt-0.5">Arrived at Delhivery Sorting Facility (Bhiwandi Hub, Maharashtra)</p>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-gray-400 shrink-0">{step.date}</span>
                    </div>
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
              <a href="tel:+919876543210" className="text-primary font-semibold hover:underline">
                Call Support: +91 98765 43210
              </a>
            </div>
          </div>
        )}
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
