'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, DollarSign, ShoppingBag, Users, Tag, Package, ArrowUpRight, CheckCircle2, Clock, Truck, Edit3, Copy, Download, FileSpreadsheet, Check, Lock, Plus, Trash2, X, RefreshCw, LogOut, Image as ImageIcon, Layout, Save, QrCode } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore, CustomerOrder } from '@/context/StoreContext';

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    blogs,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    siteContent,
    updateSiteContent,
    orders,
    updateOrderStatus,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
  } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [passError, setPassError] = useState('');

  const [activeTab, setActiveTab] = useState<'guides' | 'banners' | 'inventory' | 'orders' | 'overview'>('guides');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Site Content Form State
  const [bannersForm, setBannersForm] = useState(siteContent);
  const [bannersSavedNotice, setBannersSavedNotice] = useState(false);

  // Add Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Kitchen' | 'Storage' | 'Bathroom' | 'Laundry' | 'Living'>('Kitchen');
  const [newProdPrice, setNewProdPrice] = useState('1499');
  const [newProdMrp, setNewProdMrp] = useState('2299');
  const [newProdMaterial, setNewProdMaterial] = useState('Glass & Bamboo');
  const [newProdImg1, setNewProdImg1] = useState('https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop');
  const [newProdDescription, setNewProdDescription] = useState('Premium space-saving home organizer engineered for modern Indian living.');
  const [newProdFeatures, setNewProdFeatures] = useState('BPA-Free, Moisture Proof Seal, Easy to Clean');

  // Add Guide Modal State
  const [showAddGuideModal, setShowAddGuideModal] = useState(false);
  const [guideTitle, setGuideTitle] = useState('');
  const [guideCategory, setGuideCategory] = useState('Kitchen Organization');
  const [guideExcerpt, setGuideExcerpt] = useState('');
  const [guideContent, setGuideContent] = useState('');
  const [guideImage, setGuideImage] = useState('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop');
  const [guideAuthor, setGuideAuthor] = useState('Senior Home Stylist');
  const [guideReadTime, setGuideReadTime] = useState('4 min read');

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passwordInput);
    if (!success) {
      setPassError('Invalid Admin Password. Try "admin123" or "admin".');
    } else {
      setPassError('');
    }
  };

  const handleSaveBanners = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(bannersForm);
    setBannersSavedNotice(true);
    setTimeout(() => setBannersSavedNotice(false), 3000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    addProduct({
      name: newProdName,
      tagline: newProdTagline || 'Smart space saver for Indian homes',
      category: newProdCategory,
      price: Number(newProdPrice),
      mrp: Number(newProdMrp),
      images: [newProdImg1],
      description: newProdDescription,
      features: newProdFeatures.split(',').map((s) => s.trim()),
      specifications: {
        'Material': newProdMaterial,
        'Origin': 'Made for Indian Homes',
      },
      stockStatus: 'In Stock',
      material: newProdMaterial,
      rating: 5.0,
      reviewsCount: 1,
    });

    setShowAddModal(false);
    setNewProdName('');
    setNewProdTagline('');
  };

  const handleCreateGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideTitle || !guideContent) return;

    addBlogPost({
      title: guideTitle,
      category: guideCategory,
      excerpt: guideExcerpt || guideContent.slice(0, 100),
      content: guideContent,
      image: guideImage,
      author: guideAuthor,
      readTime: guideReadTime,
    });

    setShowAddGuideModal(false);
    setGuideTitle('');
    setGuideExcerpt('');
    setGuideContent('');
  };

  const copyDispatchTicket = (ord: CustomerOrder) => {
    const text = `DISPATCH TICKET for ${ord.id}
Customer Name: ${ord.customerName}
Phone: ${ord.phone}
Email: ${ord.email}
Address: ${ord.address}, ${ord.city}, ${ord.state} - ${ord.pincode}
Payment Method: ${ord.paymentMethod.toUpperCase()} ${ord.upiUtr ? `(UPI Ref/UTR: ${ord.upiUtr})` : ''} (Total Amount: ₹${ord.totalAmount})
Items to Ship:
${ord.items.map((it) => `- ${it.productName} (Qty: ${it.quantity}${it.color ? `, Color: ${it.color}` : ''})`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedId(ord.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Address', 'City', 'State', 'Pincode', 'Payment Method', 'UPI UTR', 'Items', 'Total Amount', 'Status'];
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
      o.upiUtr || 'N/A',
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

  // ADMIN PASSWORD LOCK SCREEN
  if (!isAdminAuthenticated) {
    return (
      <div className="bg-brandBg min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-3xl border border-gray-200 shadow-2xl space-y-6 animate-slide-up text-center">
          <div className="w-16 h-16 bg-dark text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Protected Merchant Access
            </span>
            <h1 className="font-heading font-bold text-2xl text-dark mt-2">GharCraft Admin Portal</h1>
            <p className="text-xs text-gray-500 mt-1">Enter your merchant password to manage guides, banners, products, and orders.</p>
          </div>

          <form onSubmit={handleAdminAuthSubmit} className="space-y-4 text-xs text-left">
            <div>
              <label className="font-semibold text-dark block mb-1">Admin Password</label>
              <input
                type="password"
                required
                placeholder="Enter password (e.g. admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary font-mono"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Default password: <strong>admin123</strong></span>
            </div>

            {passError && <p className="text-red-500 text-xs font-bold">{passError}</p>}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3.5 rounded-2xl transition-all shadow-md text-xs"
            >
              Unlock Merchant Dashboard &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

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
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Merchant Operations Portal</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mt-1">GharCraft Control Center</h1>
            <p className="text-xs text-gray-400 mt-1">Configure Free UPI Payment Gateway, edit guides, banners, products, and dispatch tickets.</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowAddGuideModal(true)}
              className="bg-accent hover:bg-accent-hover text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Guide & Hack
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
            <button
              onClick={exportCSV}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={adminLogout}
              className="bg-white/10 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock Admin
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          {[
            { id: 'guides', label: `Organization Guides & Hacks (${blogs.length})` },
            { id: 'banners', label: 'Site Banners & Free UPI Gateway Editor' },
            { id: 'inventory', label: `Product Catalog (${products.length})` },
            { id: 'orders', label: `Customer Dispatch Tickets (${orders.length})` },
            { id: 'overview', label: 'Analytics Overview' },
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

        {/* TAB 1: GUIDES & HACKS MANAGER (BLOG POSTS) */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-xs">
              <span className="font-bold text-dark text-sm">Published Home Guides & Hacks ({blogs.length})</span>
              <button
                onClick={() => setShowAddGuideModal(true)}
                className="bg-accent hover:bg-accent-hover text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> Write New Guide & Hack
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft flex flex-col justify-between space-y-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 bg-brandBg rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                      <Image src={b.image} alt={b.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 text-xs">
                      <span className="text-[10px] font-bold uppercase text-accent bg-accent/10 px-2.5 py-0.5 rounded">
                        {b.category}
                      </span>
                      <h3 className="font-heading font-bold text-dark text-sm leading-snug">{b.title}</h3>
                      <p className="text-[11px] text-gray-500 line-clamp-2">{b.excerpt}</p>
                      <span className="text-[10px] text-gray-400 block pt-1">{b.date} • {b.readTime} by {b.author}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                    <button
                      onClick={() => {
                        const newTitle = prompt('Edit Guide Title:', b.title);
                        if (newTitle) updateBlogPost(b.id, { title: newTitle });
                      }}
                      className="text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Quick Edit Title
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete guide "${b.title}"?`)) deleteBlogPost(b.id);
                      }}
                      className="text-red-500 hover:text-red-700 font-semibold p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SITE BANNERS & FREE NON-GST UPI GATEWAY EDITOR */}
        {activeTab === 'banners' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-emerald-600" /> Free Non-GST UPI Gateway & Banners Configuration
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Set your personal or business UPI VPA ID (e.g. shreyash@upi) to receive 100% direct bank deposits with 0% gateway fees and no GST number requirement!</p>
              </div>

              {bannersSavedNotice && (
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5" /> Saved & Updated Live!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveBanners} className="space-y-6 text-xs">
              {/* Section A: Free Non-GST UPI Configuration */}
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <h3 className="font-heading font-bold text-sm text-emerald-900 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-700" /> 1. Your Personal / Business UPI VPA ID (No GST Needed)
                </h3>
                <p className="text-emerald-700 text-[11px]">Money paid by customers will land directly into your HDFC, SBI, ICICI, Google Pay, or Paytm Bank Account instantly.</p>
                <div>
                  <label className="font-semibold text-dark block mb-1">Your UPI ID (VPA)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. shreyash@upi or 9876543210@paytm"
                    value={bannersForm.merchantUpiId || ''}
                    onChange={(e) => setBannersForm({ ...bannersForm, merchantUpiId: e.target.value })}
                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-600 font-mono font-bold text-sm"
                  />
                </div>
              </div>

              {/* Section B: Hero Banner */}
              <div className="p-5 bg-brandBg rounded-2xl border border-gray-200 space-y-3">
                <h3 className="font-heading font-bold text-sm text-dark flex items-center gap-2">
                  <Layout className="w-4 h-4 text-primary" /> 2. Homepage Hero Banner & Headlines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-dark block mb-1">Hero Image URL</label>
                    <input
                      type="url"
                      required
                      value={bannersForm.heroBannerImg}
                      onChange={(e) => setBannersForm({ ...bannersForm, heroBannerImg: e.target.value })}
                      className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-dark block mb-1">Hero Title Headline</label>
                    <input
                      type="text"
                      required
                      value={bannersForm.heroHeadline}
                      onChange={(e) => setBannersForm({ ...bannersForm, heroHeadline: e.target.value })}
                      className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none focus:border-primary font-heading font-bold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-semibold text-dark block mb-1">Hero Subheading</label>
                    <input
                      type="text"
                      required
                      value={bannersForm.heroSubheading}
                      onChange={(e) => setBannersForm({ ...bannersForm, heroSubheading: e.target.value })}
                      className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Section C: About Us Page Image */}
              <div className="p-5 bg-brandBg rounded-2xl border border-gray-200 space-y-3">
                <h3 className="font-heading font-bold text-sm text-dark flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-accent" /> 3. About Us Brand Story Image
                </h3>
                <div>
                  <label className="font-semibold text-dark block mb-1">About Us Image URL</label>
                  <input
                    type="url"
                    required
                    value={bannersForm.aboutImg}
                    onChange={(e) => setBannersForm({ ...bannersForm, aboutImg: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-md transition-all text-xs"
              >
                <Save className="w-4 h-4" /> Save Settings & UPI Gateway
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-xs">
              <span className="font-bold text-dark text-sm">Real Products Database ({products.length} Active Products)</span>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Product To Store
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-soft flex gap-4 items-center justify-between">
                  <div className="relative w-20 h-20 bg-brandBg rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                    <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {prod.category}
                    </span>
                    <h3 className="font-heading font-bold text-dark text-sm line-clamp-1">{prod.name}</h3>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-bold text-dark font-mono">Price: ₹{prod.price}</span>
                      <span className="text-gray-400 line-through font-mono text-[11px]">MRP: ₹{prod.mrp}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => updateProduct(prod.id, { stockStatus: prod.stockStatus === 'In Stock' ? 'Low Stock' : 'In Stock' })}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          prod.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {prod.stockStatus} (Click to Toggle)
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const newPrice = prompt(`Enter new selling price (₹) for ${prod.name}:`, String(prod.price));
                        if (newPrice && !isNaN(Number(newPrice))) {
                          updateProduct(prod.id, { price: Number(newPrice) });
                        }
                      }}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                      title="Edit Price"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${prod.name}" from your store?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER DISPATCH TICKETS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
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

            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center text-xs text-gray-500">
                No orders match filter "{statusFilter}". Customer orders placed on checkout will appear here!
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-soft hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono font-bold text-base text-dark bg-brandBg px-3 py-1 rounded-xl border border-gray-200">
                          {ord.id}
                        </span>
                        <span className="text-xs text-gray-400">{ord.date}</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200">
                          Payment: {ord.paymentMethod.toUpperCase()} (₹{ord.totalAmount})
                        </span>
                        {ord.upiUtr && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                            UPI UTR Ref: {ord.upiUtr}
                          </span>
                        )}
                      </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-brandBg p-5 rounded-2xl border border-gray-200/80">
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
                        </div>
                      </div>

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

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                      <span className="text-[11px] text-gray-400">
                        Copy ticket and paste into Roposo Clout or Shiprocket.
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
                            <Check className="w-4 h-4" /> Address & Order Copied!
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

        {/* TAB 5: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-2">
                <span className="text-xs font-semibold text-gray-400">Total Revenue</span>
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
      </div>

      {/* ADD REAL PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setShowAddModal(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl z-10 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-dark">Add Real Product To Store</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-dark">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-dark block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Expandable Wooden Spice Rack"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-dark block mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Moisture-sealed bamboo organizer"
                  value={newProdTagline}
                  onChange={(e) => setNewProdTagline(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-dark block mb-1">Room Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                  >
                    <option value="Kitchen">Kitchen</option>
                    <option value="Storage">Storage</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Living">Living</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-dark block mb-1">Material</label>
                  <input
                    type="text"
                    value={newProdMaterial}
                    onChange={(e) => setNewProdMaterial(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-dark block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-dark block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdMrp}
                    onChange={(e) => setNewProdMrp(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-dark block mb-1">Image URL (Unsplash or Direct Link) *</label>
                <input
                  type="url"
                  required
                  value={newProdImg1}
                  onChange={(e) => setNewProdImg1(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3 rounded-2xl transition-colors shadow-md text-xs mt-2"
              >
                Publish Product To Store Catalog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD GUIDE & HACK MODAL */}
      {showAddGuideModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setShowAddGuideModal(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl z-10 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-dark">Add New Home Guide & Hack</h3>
              <button onClick={() => setShowAddGuideModal(false)} className="text-gray-400 hover:text-dark">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGuide} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-dark block mb-1">Guide Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Secrets to an Organized Indian Kitchen Pantry"
                  value={guideTitle}
                  onChange={(e) => setGuideTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-dark block mb-1">Category</label>
                  <input
                    type="text"
                    value={guideCategory}
                    onChange={(e) => setGuideCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-semibold text-dark block mb-1">Read Time</label>
                  <input
                    type="text"
                    value={guideReadTime}
                    onChange={(e) => setGuideReadTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-dark block mb-1">Short Excerpt *</label>
                <input
                  type="text"
                  required
                  placeholder="Brief 1-sentence summary"
                  value={guideExcerpt}
                  onChange={(e) => setGuideExcerpt(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-dark block mb-1">Feature Image URL *</label>
                <input
                  type="url"
                  required
                  value={guideImage}
                  onChange={(e) => setGuideImage(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-dark block mb-1">Full Guide Content *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write full article body..."
                  value={guideContent}
                  onChange={(e) => setGuideContent(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-white font-heading font-semibold py-3 rounded-2xl transition-colors shadow-md text-xs mt-2"
              >
                Publish Guide & Hack
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
