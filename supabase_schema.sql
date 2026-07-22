-- ========================================================
-- GHARCRAFT E-COMMERCE SUPABASE POSTGRESQL DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (supabase.com)
-- ========================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  mrp NUMERIC NOT NULL,
  rating NUMERIC DEFAULT 4.9,
  reviews_count INT DEFAULT 10,
  images TEXT[] NOT NULL,
  stock_status TEXT DEFAULT 'In Stock',
  description TEXT,
  features TEXT[],
  material TEXT DEFAULT 'Premium',
  specifications JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  address TEXT NOT NULL,
  pincode TEXT NOT NULL,
  city TEXT,
  state TEXT,
  items JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  upi_utr TEXT,
  subtotal NUMERIC NOT NULL,
  discount_amount NUMERIC DEFAULT 0,
  shipping_fee NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Processing',
  gst_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Site Content / Settings Table (For Merchant UPI ID & Banners)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Enable Public Read/Write Row Level Security (RLS) Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to products" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow public access to orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow public access to site_content" ON public.site_content FOR ALL USING (true);
