'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, DollarSign, ShoppingBag, Users, Tag, Package, ArrowUpRight, CheckCircle2, Clock, Truck, Edit3, Copy, Download, FileSpreadsheet, Check } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useStore, CustomerOrder } from '@/context/StoreContext';

export default function AdminPage() {
  const { orders, updateOrderStatus } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'overview' | 'inventory' | 'coupons'>('orders');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const copyDispatchTicket = (ord: CustomerOrder) => {
    const text = `DISPATCH TICKET for ${ord.id}
Customer Name: ${ord.customerName}
Phone: ${ord.phone}
Email: ${ord.email}
Address: ${ord.address}, ${ord.city}, ${ord.state} - ${ord.pincode}
Payment Method: ${ord.paymentMethod.toUpperCase()} (Total Amount: ₹${ord.totalAmount})
Items to Ship:
${ord.items.map((it) => `- ${it.productName} (Qty: ${it.quantity}${it.color ? `, Color: ${it.color}` : ''})`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedId(ord.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Address', 'City', 'State', 'Pincode', 'Payment Method', 'Items', 'Total Amount', 'Status'];
    const rows = orders.map((o) => [
      o.id,
      o.date,
      `"${o.customerName}"`,
      o.phone,
      o.email,
      `"${o.address}"`,
      o.city,
      o.state,
      o.pincode,
      o.paymentMethod.toUpperCase(),
      `"${o.items.map((i) => `${i.productName} (x${i.quantity})`).join('; ')}"`,
      o.totalAmount,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GharCraft_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="bg-brandBg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-dark text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Merchant Manual Dispatch Portal</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mt-1">GharCraft Orders & Logistics Dispatch</h1>
            <p className="text-xs text-gray-400 mt-1">View customer addresses, copy fulfillment tickets for Roposo/Shiprocket, and export CSV.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export CSV Spreadsheet
            </button>
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              Live Storefront &rarr;
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          {[
            { id: 'orders', label: `Customer Dispatch Tickets (${orders.length})` },
            { id: 'overview', label: 'Analytics Overview' },
            { id: 'inventory', label: 'Product Inventory' },
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

        {/* TAB 1: CUSTOMER DISPATCH TICKETS (PRIMARY FOR DROPSHIPPING) */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Status Filters */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Filter Status:</span>
                {['All', 'Processing', 'Placed on Supplier', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      statusFilter === st ? 'bg-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <span className="text-gray-400 font-mono">Showing {filteredOrders.length} orders</span>
            </div>

            {/* Orders Dispatch Cards List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center text-xs text-gray-500">
                No orders match filter "{statusFilter}". Place a test order on the storefront to test manual dispatch!
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft hover:shadow-md transition-all space-y-4"
                  >
                    {/* Header bar of card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-base text-dark bg-brandBg px-3 py-1 rounded-xl border border-gray-200">
                          {ord.id}
                        </span>
                        <span className="text-xs text-gray-400">{ord.date}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.paymentMethod === 'cod'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          Payment: {ord.paymentMethod.toUpperCase()} (₹{ord.totalAmount})
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 font-semibold">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-brandBg font-bold text-dark border border-gray-300 rounded-xl px-3 py-1.5 outline-none cursor-pointer focus:border-primary"
                        >
                          <option value="Processing">Processing (New)</option>
                          <option value="Placed on Supplier">Placed on Supplier (Roposo)</option>
                          <option value="Shipped">Shipped via Delhivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Info & Address Box */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-brandBg p-5 rounded-2xl border border-gray-200/80">
                      {/* Customer Address Details */}
                      <div className="md:col-span-7 space-y-2 text-xs">
                        <h4 className="font-heading font-bold text-sm text-dark flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-primary" /> Customer Shipping Address
                        </h4>
                        <div className="space-y-1 text-gray-700 font-sans">
                          <p><strong className="text-dark">Name:</strong> {ord.customerName}</p>
                          <p><strong className="text-dark">Phone:</strong> <a href={`tel:${ord.phone}`} className="text-primary font-mono font-bold hover:underline">{ord.phone}</a></p>
                          <p><strong className="text-dark">Email:</strong> {ord.email}</p>
                          <p><strong className="text-dark">Full Address:</strong> {ord.address}</p>
                          <p><strong className="text-dark">City / State:</strong> {ord.city}, {ord.state} - <strong className="font-mono text-dark">{ord.pincode}</strong></p>
                          {ord.gstDetails && (
                            <p className="text-emerald-800 bg-emerald-50 p-1.5 rounded text-[11px] font-medium mt-1">
                              <strong>GST Invoicing:</strong> {ord.gstDetails.companyName} (GSTIN: {ord.gstDetails.gstin})
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Items Ordered List */}
                      <div className="md:col-span-5 space-y-2 text-xs border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                        <h4 className="font-heading font-bold text-sm text-dark flex items-center gap-1.5">
                          <Package className="w-4 h-4 text-accent" /> Items To Dispatch
                        </h4>
                        <div className="space-y-2">
                          {ord.items.map((item, i) => (
                            <div key={i} className="p-2 bg-white rounded-xl border border-gray-200 flex justify-between items-center">
                              <div>
                                <h5 className="font-semibold text-dark line-clamp-1">{item.productName}</h5>
                                {item.color && <span className="text-[10px] text-gray-500">Color: {item.color}</span>}
                              </div>
                              <span className="font-bold text-primary shrink-0 ml-2">Qty: {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button: Copy formatted text for manual supplier order */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                      <span className="text-[11px] text-gray-400">
                        Copy this ticket and paste into Roposo Clout, Shiprocket, or SMS.
                      </span>

                      <button
                        onClick={() => copyDispatchTicket(ord)}
                        className={`w-full sm:w-auto text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                          copiedId === ord.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-dark hover:bg-primary text-white shadow-sm'
                        }`}
                      >
                        {copiedId === ord.id ? (
                          <>
                            <Check className="w-4 h-4" /> Address & Order Copied To Clipboard!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy Ticket For Roposo / Shiprocket
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <span className="text-xs font-semibold text-gray-400">Total Revenue Collected</span>
                <div className="font-heading font-bold text-3xl text-dark">₹{totalRevenue}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <span className="text-xs font-semibold text-gray-400">Total Customer Orders</span>
                <div className="font-heading font-bold text-3xl text-dark">{orders.length}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <span className="text-xs font-semibold text-gray-400">Average Order Value</span>
                <div className="font-heading font-bold text-3xl text-dark">
                  ₹{orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-soft space-y-4">
            <h2 className="font-heading font-bold text-lg text-dark">Active SKUs ({PRODUCTS.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {PRODUCTS.map((prod) => (
                <div key={prod.id} className="p-4 bg-brandBg rounded-2xl border border-gray-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-dark">{prod.name}</h4>
                    <span className="font-bold text-primary">₹{prod.price}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {prod.stockStatus}
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
