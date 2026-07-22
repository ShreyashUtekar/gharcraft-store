'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, QrCode, CreditCard, Banknote, Building2, Sparkles } from 'lucide-react';
import { useStore, CustomerOrder } from '@/context/StoreContext';

export default function CheckoutPage() {
  const { cart, subtotal, discountAmount, shippingFee, grandTotal, appliedCoupon, clearCart, addOrder, currentUser } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [needGst, setNeedGst] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<CustomerOrder | null>(null);

  // Form State initialized clean (uses currentUser if logged in)
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    companyName: '',
    gstin: '',
  });

  const handlePincodeChange = (val: string) => {
    setFormData((prev) => ({ ...prev, pincode: val }));
    if (val === '110001') setFormData((prev) => ({ ...prev, city: 'New Delhi', state: 'Delhi' }));
    if (val === '400001') setFormData((prev) => ({ ...prev, city: 'Mumbai', state: 'Maharashtra' }));
    if (val === '560001') setFormData((prev) => ({ ...prev, city: 'Bengaluru', state: 'Karnataka' }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) return;

    const generatedId = `GHAR-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: CustomerOrder = {
      id: generatedId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      pincode: formData.pincode,
      city: formData.city || 'India',
      state: formData.state || 'India',
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        color: item.selectedColor,
        price: item.product.price,
      })),
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      discountAmount: discountAmount,
      shippingFee: shippingFee,
      totalAmount: grandTotal,
      status: 'Processing',
      gstDetails: needGst ? { companyName: formData.companyName, gstin: formData.gstin } : undefined,
    };

    addOrder(newOrder);
    setCreatedOrder(newOrder);
    setOrderConfirmed(true);
    clearCart();
  };

  if (orderConfirmed && createdOrder) {
    return (
      <div className="bg-brandBg min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-xl w-full mx-4 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-2xl text-center space-y-6 animate-slide-up">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
              Order Confirmed & Placed
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-dark mt-3">
              Thank You, {createdOrder.customerName}!
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Your home organization products are being packed with care at our warehouse.
            </p>
          </div>

          <div className="bg-brandBg p-4 rounded-2xl border border-gray-200 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Order ID:</span>
              <strong className="font-mono text-dark text-sm">{createdOrder.id}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Payment Method:</span>
              <strong className="uppercase text-dark">{createdOrder.paymentMethod}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Estimated Delivery:</span>
              <strong className="text-primary font-bold">Within 2-3 Business Days</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="text-dark text-right font-medium">{createdOrder.address}, {createdOrder.city} - {createdOrder.pincode}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/track-order?awb=${createdOrder.id}`}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Truck className="w-4 h-4" /> Live Order Tracking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brandBg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fast & Secure</span>
          <h1 className="font-heading font-bold text-3xl text-dark mt-1">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact & Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                Shipping & Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-dark block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-semibold text-dark block mb-1">Mobile Number (For Delivery OTP & Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-dark block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-dark block mb-1">Flat / House No., Building Name & Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Complete delivery address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-semibold text-dark block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit Indian pincode"
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-dark block mb-1">City / State</label>
                  <input
                    type="text"
                    placeholder="City & State"
                    value={formData.city ? `${formData.city}, ${formData.state}` : ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* GST Invoice Toggle */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark">
                  <input
                    type="checkbox"
                    checked={needGst}
                    onChange={(e) => setNeedGst(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  I need a GST Invoice for Business / Corporate Tax Claim
                </label>
                {needGst && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                    <input
                      type="text"
                      placeholder="Company Registered Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="GSTIN Number (15 Digits)"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                      className="border border-gray-200 rounded-xl px-3 py-2 uppercase outline-none focus:border-primary font-mono"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</span>
                Payment Options (Indian Gateway)
              </h2>

              <div className="space-y-3">
                {/* UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-heading font-semibold text-xs text-dark">UPI Instant Payment</h4>
                        <p className="text-[10px] text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Fastest</span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-gray-200/60 text-xs space-y-3">
                      <div className="flex gap-2">
                        {['gpay', 'phonepe', 'paytm'].map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setUpiApp(app as any)}
                            className={`px-3 py-1.5 rounded-xl border text-xs uppercase font-bold ${
                              upiApp === app ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center font-mono text-[10px] text-gray-400 border">
                          [QR CODE]
                        </div>
                        <p className="text-[11px] text-gray-600">
                          Scan & Pay using <strong>{upiApp.toUpperCase()}</strong>. Instant 5% Extra Prepaid Cashback will be credited.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* COD */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-heading font-semibold text-xs text-dark">Cash On Delivery (COD)</h4>
                      <p className="text-[10px] text-gray-500">Pay cash or scan QR at your doorstep upon arrival</p>
                    </div>
                  </div>
                </div>

                {/* Cards */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-heading font-semibold text-xs text-dark">Credit / Debit Card (Razorpay)</h4>
                      <p className="text-[10px] text-gray-500">Visa, Mastercard, RuPay, Diners Club</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-soft space-y-6 sticky top-24">
              <h2 className="font-heading font-bold text-lg text-dark">Order Summary ({cart.length} items)</h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 text-xs">
                    <div className="relative w-12 h-12 bg-brandBg rounded-xl overflow-hidden shrink-0 border border-gray-200">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark line-clamp-1">{item.product.name}</h4>
                      <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-dark">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-dark">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-primary uppercase">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-dark pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-float transition-all duration-300 transform active:scale-95 text-sm"
              >
                Place Order Now <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Gateway • 100% Buyer Protection</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
