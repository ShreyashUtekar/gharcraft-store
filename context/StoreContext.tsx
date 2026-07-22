'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';

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

export interface CustomerOrder {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    color?: string;
    price: number;
  }[];
  paymentMethod: 'upi' | 'cod' | 'card' | 'netbanking';
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  status: 'Processing' | 'Placed on Supplier' | 'Shipped' | 'Delivered';
  gstDetails?: {
    companyName: string;
    gstin: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const VALID_COUPONS: Record<string, Coupon> = {
  'WELCOME10': { code: 'WELCOME10', discountPercent: 10, description: '10% OFF on your first home transformation order' },
  'GHAR20': { code: 'GHAR20', discountPercent: 20, description: '20% OFF Special Festival Discount' },
};

interface StoreContextType {
  // Products Management
  products: Product[];
  addProduct: (newProduct: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;

  // Checkout & Coupons
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

  // User Auth & Session
  currentUser: UserProfile | null;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (name: string, email: string, pass: string, phone?: string) => boolean;
  logoutUser: () => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Orders
  orders: CustomerOrder[];
  addOrder: (order: CustomerOrder) => void;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;

  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['gharcraft-spice-jars-12']);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
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

  // User Auth & Admin Auth
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Orders
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  // Load Persisted Session & Data from LocalStorage on mount
  useEffect(() => {
    try {
      // Products
      const savedProducts = localStorage.getItem('gharcraft_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      // Cart
      const savedCart = localStorage.getItem('gharcraft_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([
          { product: DEFAULT_PRODUCTS[0], quantity: 1, selectedColor: 'Natural Bamboo' },
          { product: DEFAULT_PRODUCTS[1], quantity: 1, selectedColor: 'Nordic White' },
        ]);
      }

      // Wishlist
      const savedWishlist = localStorage.getItem('gharcraft_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      // User Session
      const savedUser = localStorage.getItem('gharcraft_session_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }

      // Admin Auth Session
      const savedAdminAuth = localStorage.getItem('gharcraft_admin_auth');
      if (savedAdminAuth === 'true') {
        setIsAdminAuthenticated(true);
      }

      // Orders
      const savedOrders = localStorage.getItem('gharcraft_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([
          {
            id: 'GHAR-98412',
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            customerName: 'Rahul Sharma',
            phone: '9876543210',
            email: 'rahul.sharma@example.com',
            address: 'Flat 402, Green Acres Heights, Off Linking Road, Bandra West',
            pincode: '400001',
            city: 'Mumbai',
            state: 'Maharashtra',
            items: [
              { productId: 'gharcraft-spice-jars-12', productName: 'Borosilicate Glass Spice Jar Set with Bamboo Lids (Set of 12)', quantity: 1, color: 'Natural Bamboo', price: 1499 },
              { productId: 'gharcraft-under-sink-organizer', productName: '2-Tier Expandable Under-Sink Storage Rack', quantity: 1, color: 'Nordic White', price: 1899 },
            ],
            paymentMethod: 'upi',
            subtotal: 3398,
            discountAmount: 0,
            shippingFee: 0,
            totalAmount: 3398,
            status: 'Processing',
          },
        ]);
      }
    } catch (e) {
      console.error('Error restoring localStorage session', e);
    }
  }, []);

  // Sync Cart to LocalStorage
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('gharcraft_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync Wishlist to LocalStorage
  const saveWishlistToStorage = (updatedWishlist: string[]) => {
    setWishlist(updatedWishlist);
    try {
      localStorage.setItem('gharcraft_wishlist', JSON.stringify(updatedWishlist));
    } catch (e) {
      console.error(e);
    }
  };

  // Product Management Functions
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const generatedId = `gharcraft-custom-${Date.now()}`;
    const fullProduct: Product = {
      ...newProduct,
      id: generatedId,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => {
      const updated = [fullProduct, ...prev];
      try {
        localStorage.setItem('gharcraft_products', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      try {
        localStorage.setItem('gharcraft_products', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('gharcraft_products', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // User Auth Functions
  const loginUser = (email: string, pass: string): boolean => {
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: email,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem('gharcraft_session_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  const registerUser = (name: string, email: string, pass: string, phone?: string): boolean => {
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name,
      email: email,
      phone: phone,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem('gharcraft_session_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('gharcraft_session_user');
    } catch (e) {
      console.error(e);
    }
  };

  // Admin Auth Functions (Default Password: "admin123" or "gharcraft2026")
  const adminLogin = (password: string): boolean => {
    if (password === 'admin123' || password === 'gharcraft2026' || password === 'admin') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('gharcraft_admin_auth', 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('gharcraft_admin_auth');
    } catch (e) {
      console.error(e);
    }
  };

  // Orders Functions
  const addOrder = (newOrder: CustomerOrder) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('gharcraft_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status } : o));
      try {
        localStorage.setItem('gharcraft_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const addToCart = (product: Product, quantity: number = 1, color?: string) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [...cart, { product, quantity, selectedColor: color || product.colors?.[0]?.name }];
    }
    saveCartToStorage(updated);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(updated);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    saveCartToStorage(updated);
  };

  const clearCart = () => saveCartToStorage([]);

  const toggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    saveWishlistToStorage(updated);
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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        wishlist,
        compareList,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
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
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        orders,
        addOrder,
        updateOrderStatus,
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
