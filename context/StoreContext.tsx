'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

const VALID_COUPONS: Record<string, Coupon> = {
  'WELCOME10': { code: 'WELCOME10', discountPercent: 10, description: '10% OFF on your first home transformation order' },
  'GHAR20': { code: 'GHAR20', discountPercent: 20, description: '20% OFF Special Festival Discount' },
};

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  pincode: string;
  pincodeInfo: { isCod: boolean; days: number; location: string } | null;
  checkPincode: (code: string) => void;
  isGstInvoice: boolean;
  setIsGstInvoice: (val: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['gharcraft-spice-jars-12']);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string>('110001');
  const [pincodeInfo, setPincodeInfo] = useState<{ isCod: boolean; days: number; location: string } | null>({
    isCod: true,
    days: 3,
    location: 'Delhi Metro',
  });
  const [isGstInvoice, setIsGstInvoice] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Seed cart with 2 default items for vibrant demo
  useEffect(() => {
    setCart([
      { product: PRODUCTS[0], quantity: 1, selectedColor: 'Natural Bamboo' },
      { product: PRODUCTS[1], quantity: 1, selectedColor: 'Nordic White' },
    ]);
    setRecentlyViewed([PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]]);
  }, []);

  const addToCart = (product: Product, quantity: number = 1, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color || product.colors?.[0]?.name }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const applyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (VALID_COUPONS[formatted]) {
      setAppliedCoupon(VALID_COUPONS[formatted]);
      setCouponError(null);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or GHAR20');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const checkPincode = (code: string) => {
    setPincode(code);
    const clean = code.trim();
    if (clean.length === 6 && /^\d+$/.test(clean)) {
      const firstDigit = clean[0];
      const cityMap: Record<string, string> = {
        '1': 'Delhi NCR',
        '2': 'Uttar Pradesh / UK',
        '3': 'Rajasthan / Punjab',
        '4': 'Mumbai / Maharashtra',
        '5': 'Bengaluru / Karnataka',
        '6': 'Chennai / Kerala',
        '7': 'Kolkata / WB',
        '8': 'Bihar / Jharkhand',
      };
      setPincodeInfo({
        isCod: true,
        days: firstDigit === '1' || firstDigit === '4' || firstDigit === '5' ? 2 : 4,
        location: cityMap[firstDigit] || 'Pan-India',
      });
    } else {
      setPincodeInfo(null);
    }
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const shippingFee = subtotal >= 999 || cart.length === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        pincode,
        pincodeInfo,
        checkPincode,
        isGstInvoice,
        setIsGstInvoice,
        giftMessage,
        setGiftMessage,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
