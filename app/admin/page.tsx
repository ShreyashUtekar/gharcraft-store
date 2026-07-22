'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, DollarSign, ShoppingBag, Users, Tag, Package, ArrowUpRight, CheckCircle2, Clock, Truck, Edit3, Plus } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';

const SAMPLE_ORDERS = [
  { id: 'GHAR-98412', customer: 'Rahul Sharma', city: 'Mumbai', items: 2, total: 3398, payment: 'UPI (GPay)', status: 'Shipped', date: 'Jul 22, 2026' },
  { id: 'GHAR-98411', customer: 'Pooja Verma', city: 'Delhi NCR', items: 1, total: 1499, payment: 'COD', status: 'Processing', date: 'Jul 22, 2026' },
  { id: 'GHAR-98410', customer: 'Anish Nambiar', city: 'Bengaluru', items: 3, total: 4697, payment: 'Razorpay Card', status: 'Delivered', date: 'Jul 21, 2026' },
  { id: 'GHAR-98409', customer: 'Deepika Roy', city: 'Kolkata', items: 1, total: 999, payment: 'UPI (PhonePe)', status: 'Delivered', date: 'Jul 21, 2026' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'coupons'>('overview');
  const [ordersList, setOrdersList] = useState(SAMPLE_ORDERS);
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME10', discount: '10%', usage: '842 times', status: 'Active' },
    { code: 'GHAR20', discount: '20%', usage: '310 times', status: 'Active' },
    { code: 'MONSOON15', discount: '15%', usage: '128 times', status: 'Active' },
  ]);

  const toggleOrderStatus = (orderId: string) => {
    setOrdersList((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const nextStatus = o.status === 'Processing' ? 'Shipped' : o.status === 'Shipped' ? 'Delivered' : 'Processing';
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  };

  const updateProductStock = (id: string, newStock: 'In Stock' | 'Low Stock') => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockStatus: newStock } : p))
    );
  };

  return (
    <div className="bg-brandBg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-dark text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Live Merchant Portal</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mt-1">GharCraft Operations Dashboard</h1>
            <p className="text-xs text-gray-400 mt-1">Real-time inventory management, order fulfillment, and coupon controls.</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              View Live Storefront &rarr;
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Analytics Overview' },
            { id: 'orders', label: 'Order Fulfillment' },
            { id: 'inventory', label: 'Product Inventory' },
            { id: 'coupons', label: 'Coupons & Promos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview Metrics */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                  <span>Gross Monthly Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-heading font-bold text-3xl text-dark">₹14,89,500</div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                  <ArrowUpRight className="w-3 h-3" /> +24% vs last month
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                  <span>Total Orders Processed</span>
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
                <div className="font-heading font-bold text-3xl text-dark">1,240</div>
                <span className="text-[11px] text-gray-500 font-medium">98.4% On-time Delhivery dispatch</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                  <span>Average Order Value</span>
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div className="font-heading font-bold text-3xl text-dark">₹1,201</div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                  <ArrowUpRight className="w-3 h-3" /> +12% from Bundles
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                  <span>Active Subscribers</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div className="font-heading font-bold text-3xl text-dark">52,410</div>
                <span className="text-[11px] text-gray-500 font-medium">Weekly Home Hack Subscribers</span>
              </div>
            </div>

            {/* Quick Orders Summary Table */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-lg text-dark">Recent Customer Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-wider">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Destination</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ordersList.map((ord) => (
                      <tr key={ord.id} className="hover:bg-brandBg">
                        <td className="py-3.5 font-mono font-bold text-dark">{ord.id}</td>
                        <td className="py-3.5 font-semibold text-dark">{ord.customer}</td>
                        <td className="py-3.5 text-gray-600">{ord.city}</td>
                        <td className="py-3.5 text-gray-600">{ord.payment}</td>
                        <td className="py-3.5 font-bold text-primary">₹{ord.total}</td>
                        <td className="py-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Fulfillment */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft space-y-6">
            <h2 className="font-heading font-bold text-lg text-dark">Order Management & Status Updater</h2>
            <div className="space-y-4">
              {ordersList.map((ord) => (
                <div key={ord.id} className="p-4 bg-brandBg rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-dark text-sm">{ord.id}</span>
                      <span className="text-gray-400">• {ord.date}</span>
                    </div>
                    <p className="text-gray-600 mt-0.5">Customer: <strong>{ord.customer}</strong> ({ord.city}) • {ord.payment}</p>
                    <p className="text-primary font-bold mt-1">Total: ₹{ord.total}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500">Status: <strong className="text-dark">{ord.status}</strong></span>
                    <button
                      onClick={() => toggleOrderStatus(ord.id)}
                      className="bg-dark hover:bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      Advance Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inventory */}
        {activeTab === 'inventory' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-lg text-dark">Product Catalog & Inventory Levels</h2>
              <span className="text-xs font-semibold text-gray-400">{productList.length} Active SKUs</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productList.map((prod) => (
                <div key={prod.id} className="p-4 bg-brandBg rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-primary uppercase font-bold">{prod.category}</span>
                    <h4 className="font-heading font-bold text-dark text-sm line-clamp-1">{prod.name}</h4>
                    <span className="font-mono font-bold text-dark">₹{prod.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateProductStock(prod.id, prod.stockStatus === 'In Stock' ? 'Low Stock' : 'In Stock')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[10px] ${
                        prod.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {prod.stockStatus} (Toggle)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Coupons */}
        {activeTab === 'coupons' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft space-y-6">
            <h2 className="font-heading font-bold text-lg text-dark">Active Discount Coupons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {coupons.map((c) => (
                <div key={c.code} className="p-6 bg-brandBg rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="font-mono font-bold text-lg text-dark">{c.code}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-semibold">{c.discount} Discount • Used {c.usage}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
