'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';
import { supabase } from '@/lib/supabase';

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

export interface SiteContent {
  heroBannerImg: string;
  heroHeadline: string;
  heroSubheading: string;
  aboutImg: string;
  roomKitchenImg: string;
  roomStorageImg: string;
  roomBathroomImg: string;
  roomLaundryImg: string;
}

const DEFAULT_SITE_CONTENT: SiteContent = {
  heroBannerImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
  heroHeadline: 'Crafting Better Homes.',
  heroSubheading: 'Smart, aesthetic home organization products thoughtfully designed for modern Indian living.',
  aboutImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
  roomKitchenImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
  roomStorageImg: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1000&auto=format&fit=crop',
  roomBathroomImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
  roomLaundryImg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000&auto=format&fit=crop',
};

const VALID_COUPONS: Record<string, Coupon> = {
  'WELCOME10': { code: 'WELCOME10', discountPercent: 10, description: '10% OFF on your first home transformation order' },
  'GHAR20': { code: 'GHAR20', discountPercent: 20, description: '20% OFF Special Festival Discount' },
};

interface StoreContextType {
  // Products Management
  products: Product[];
  addProduct: (newProduct: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Site Banners & Content Management
  siteContent: SiteContent;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;

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
  addOrder: (order: CustomerOrder) => Promise<void>;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => Promise<void>;

  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  isSupabaseConnected: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
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
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  // Orders initialized clean (no dummy data)
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  // Initial Load from Supabase DB or fallback to LocalStorage
  useEffect(() => {
    const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.includes('supabase.co');
    setIsSupabaseConnected(isConfigured);

    const initData = async () => {
      // 1. Fetch Products from Supabase DB
      if (isConfigured) {
        try {
          const { data } = await supabase.from('products').select('*');
          if (data && data.length > 0) {
            const formatted: Product[] = data.map((d: any) => ({
              id: d.id,
              name: d.name,
              tagline: d.tagline || 'Smart home organizer',
              category: d.category,
              price: Number(d.price),
              mrp: Number(d.mrp),
              rating: Number(d.rating || 4.9),
              reviewsCount: Number(d.reviews_count || 10),
              images: Array.isArray(d.images) ? d.images : [d.images],
              stockStatus: d.stock_status || 'In Stock',
              description: d.description || '',
              features: d.features || ['BPA-Free', 'Durable'],
              specifications: d.specifications || { Material: d.material || 'Premium' },
              material: d.material || 'Premium',
            }));
            setProducts(formatted);
          }
        } catch (err) {
          console.log('Using default product catalog', err);
        }

        // 2. Fetch Orders from Supabase DB
        try {
          const { data: orderData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
          if (orderData && orderData.length > 0) {
            const formattedOrders: CustomerOrder[] = orderData.map((o: any) => ({
              id: o.id,
              date: new Date(o.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
              customerName: o.customer_name,
              phone: o.customer_phone,
              email: o.customer_email || '',
              address: o.address,
              pincode: o.pincode,
              city: o.city || '',
              state: o.state || '',
              items: o.items || [],
              paymentMethod: o.payment_method || 'upi',
              subtotal: Number(o.subtotal || o.total_amount),
              discountAmount: Number(o.discount_amount || 0),
              shippingFee: Number(o.shipping_fee || 0),
              totalAmount: Number(o.total_amount),
              status: o.status || 'Processing',
              gstDetails: o.gst_details,
            }));
            setOrders(formattedOrders);
          }
        } catch (err) {
          console.log('Using local orders state', err);
        }
      }

      // Fallback Local Storage Sync
      try {
        const savedSiteContent = localStorage.getItem('gharcraft_site_content');
        if (savedSiteContent) {
          setSiteContent(JSON.parse(savedSiteContent));
        }

        const savedCart = localStorage.getItem('gharcraft_cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem('gharcraft_wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const savedUser = localStorage.getItem('gharcraft_session_user');
        if (savedUser) setCurrentUser(JSON.parse(savedUser));

        const savedAdminAuth = localStorage.getItem('gharcraft_admin_auth');
        if (savedAdminAuth === 'true') setIsAdminAuthenticated(true);

        const savedOrders = localStorage.getItem('gharcraft_orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    };

    initData();
  }, []);

  const updateSiteContent = (newContent: Partial<SiteContent>) => {
    setSiteContent((prev) => {
      const updated = { ...prev, ...newContent };
      try {
        localStorage.setItem('gharcraft_site_content', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('gharcraft_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error(e);
    }
  };

  const saveWishlistToStorage = (updatedWishlist: string[]) => {
    setWishlist(updatedWishlist);
    try {
      localStorage.setItem('gharcraft_wishlist', JSON.stringify(updatedWishlist));
    } catch (e) {
      console.error(e);
    }
  };

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    const generatedId = `gharcraft-${Date.now()}`;
    const fullProduct: Product = {
      ...newProduct,
      id: generatedId,
      rating: 5.0,
      reviewsCount: 1,
    };

    setProducts((prev) => [fullProduct, ...prev]);

    if (isSupabaseConnected) {
      try {
        await supabase.from('products').insert([
          {
            id: generatedId,
            name: fullProduct.name,
            tagline: fullProduct.tagline,
            category: fullProduct.category,
            price: fullProduct.price,
            mrp: fullProduct.mrp,
            images: fullProduct.images,
            description: fullProduct.description,
            features: fullProduct.features,
            material: fullProduct.material,
            stock_status: fullProduct.stockStatus,
            rating: 5.0,
            reviews_count: 1,
          },
        ]);
      } catch (e) {
        console.error('Supabase product insert error', e);
      }
    }

    try {
      localStorage.setItem('gharcraft_products', JSON.stringify([fullProduct, ...products]));
    } catch (e) {
      console.error(e);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));

    if (isSupabaseConnected) {
      try {
        const payload: any = {};
        if (updatedFields.price !== undefined) payload.price = updatedFields.price;
        if (updatedFields.mrp !== undefined) payload.mrp = updatedFields.mrp;
        if (updatedFields.stockStatus !== undefined) payload.stock_status = updatedFields.stockStatus;
        if (updatedFields.name !== undefined) payload.name = updatedFields.name;

        await supabase.from('products').update(payload).eq('id', id);
      } catch (e) {
        console.error('Supabase product update error', e);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConnected) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase product delete error', e);
      }
    }
  };

  const addOrder = async (newOrder: CustomerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);

    if (isSupabaseConnected) {
      try {
        await supabase.from('orders').insert([
          {
            id: newOrder.id,
            customer_name: newOrder.customerName,
            customer_phone: newOrder.phone,
            customer_email: newOrder.email,
            address: newOrder.address,
            pincode: newOrder.pincode,
            city: newOrder.city,
            state: newOrder.state,
            items: newOrder.items,
            payment_method: newOrder.paymentMethod,
            subtotal: newOrder.subtotal,
            discount_amount: newOrder.discountAmount,
            shipping_fee: newOrder.shippingFee,
            total_amount: newOrder.totalAmount,
            status: newOrder.status,
            gst_details: newOrder.gstDetails,
          },
        ]);
      } catch (e) {
        console.error('Supabase order insert error', e);
      }
    }

    try {
      localStorage.setItem('gharcraft_orders', JSON.stringify([newOrder, ...orders]));
    } catch (e) {
      console.error(e);
    }
  };

  const updateOrderStatus = async (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));

    if (isSupabaseConnected) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId);
      } catch (e) {
        console.error('Supabase order status update error', e);
      }
    }
  };

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
        siteContent,
        updateSiteContent,
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
        isSupabaseConnected,
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
