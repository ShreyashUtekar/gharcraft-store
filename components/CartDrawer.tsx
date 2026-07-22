'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck, Gift, FileText } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    isGstInvoice,
    setIsGstInvoice,
    giftMessage,
    setGiftMessage,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput) {
      applyCoupon(couponCodeInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-up">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brandBg">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-lg text-dark">Your Shopping Bag</h2>
              <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-dark hover:bg-gray-200/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-primary/5 p-4 border-b border-primary/10">
            <div className="flex items-center justify-between text-xs font-medium text-dark mb-1.5">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-primary" />
                {remainingForFreeShipping > 0
                  ? `Add ₹${remainingForFreeShipping} more for FREE Shipping!`
                  : '🎉 You have unlocked FREE Express Shipping!'}
              </span>
              <span className="text-primary font-bold">{Math.round(freeShippingPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-dark text-base">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    Start organizing your home today with our handcrafted aesthetic products.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
                >
                  Explore Best Sellers
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-brandBg rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                >
                  <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200/60">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-heading font-semibold text-xs text-dark line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.selectedColor && (
                        <p className="text-[10px] text-gray-500 mt-0.5">Color: {item.selectedColor}</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:text-dark"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-gray-600 hover:text-dark"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-dark">₹{item.product.price * item.quantity}</span>
                        <span className="text-[10px] text-gray-400 line-through block">
                          ₹{item.product.mrp * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Extras: Coupon & Options */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                {/* Coupon Code section */}
                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-primary" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-500 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 uppercase outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="bg-dark text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-red-500 pl-1">{couponError}</p>}

                {/* Additional Toggles */}
                <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                  <button
                    onClick={() => setShowGiftInput(!showGiftInput)}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Gift className="w-3.5 h-3.5" /> Add Gift Message
                  </button>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGstInvoice}
                      onChange={(e) => setIsGstInvoice(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> GST Invoice</span>
                  </label>
                </div>

                {showGiftInput && (
                  <textarea
                    placeholder="Write a special home gift note..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-gray-200 rounded-xl p-2 outline-none focus:border-primary"
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-dark">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Express Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-primary uppercase">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-dark pt-2 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-primary text-base">₹{grandTotal}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all duration-300 transform active:scale-95"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Encrypted Payment & Guaranteed Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
