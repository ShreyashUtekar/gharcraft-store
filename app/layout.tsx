import type { Metadata } from 'next';
import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchModal } from '@/components/SearchModal';
import { QuickViewModal } from '@/components/QuickViewModal';
import { AuthModal } from '@/components/AuthModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GharCraft | Crafting Better Homes for Modern India',
  description: 'Premium home organization & storage solutions designed for Indian kitchens, wardrobes, and living spaces. Free shipping above ₹999.',
  keywords: ['GharCraft', 'Home Organization India', 'Kitchen Storage', 'Borosilicate Spice Jars', 'Pantry Containers', 'Lazy Susan', 'Under Sink Rack'],
  openGraph: {
    title: 'GharCraft | Crafting Better Homes',
    description: 'Smart, aesthetic home organization products thoughtfully engineered for Indian households.',
    url: 'https://gharcraft.in',
    siteName: 'GharCraft',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
      <body className="antialiased selection:bg-primary selection:text-white flex flex-col min-h-screen">
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
          <AuthModal />
        </StoreProvider>
      </body>
    </html>
  );
}
