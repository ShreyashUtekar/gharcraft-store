export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Kitchen' | 'Storage' | 'Bathroom' | 'Laundry' | 'Living';
  price: number;
  mrp: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  images: string[];
  colors?: { name: string; hex: string }[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stockStatus: 'In Stock' | 'Low Stock' | 'Only 3 Left';
  boughtTogetherId?: string;
  material: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'gharcraft-spice-jars-12',
    name: 'Borosilicate Glass Spice Jar Set with Bamboo Lids (Set of 12)',
    tagline: 'Airtight silicone moisture seal tailored for Indian masalas & spices.',
    category: 'Kitchen',
    price: 1499,
    mrp: 2299,
    rating: 4.9,
    reviewsCount: 342,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Natural Bamboo', hex: '#D2B48C' },
      { name: 'Matte Charcoal', hex: '#222222' },
    ],
    description: 'Elevate your spice rack with high-grade borosilicate glass jars designed to keep Indian turmeric, garam masala, coriander, and cumin 100% moisture-free even during monsoon seasons. Comes with waterproof customizable vinyl spice labels.',
    features: [
      '100% Lead-Free Borosilicate Glass (-20°C to 150°C resistant)',
      'Natural Sustainable Bamboo Lid with Food-Grade Silicone Ring',
      'Includes 36 Waterproof Pre-Printed Indian Spice Labels + Blank Stickers',
      'Wide mouth design for effortless spoon scooping',
      'Dishwasher Safe (Glass body)',
    ],
    specifications: {
      'Capacity': '250 ml per jar',
      'Dimensions': '6.5 cm x 11 cm',
      'Material': 'High Borosilicate Glass + FSC Certified Bamboo',
      'Weight': '1.8 kg (Full Set)',
      'Origin': 'Designed & Crafted for Indian Homes',
    },
    stockStatus: 'In Stock',
    boughtTogetherId: 'gharcraft-lazy-susan-bamboo',
    material: 'Glass & Bamboo',
  },
  {
    id: 'gharcraft-under-sink-organizer',
    name: '2-Tier Expandable Under-Sink Storage Rack',
    tagline: 'Modular height-adjustable shelf designed to fit around drainage plumbing traps.',
    category: 'Kitchen',
    price: 1899,
    mrp: 2799,
    rating: 4.8,
    reviewsCount: 215,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Nordic White', hex: '#FFFFFF' },
      { name: 'Stainless Slate', hex: '#4A4A4A' },
    ],
    description: 'Transform cluttered under-sink cabinets into clean, double-tier storage spaces. Removable sliding panels allow seamless placement around U-bend pipes and garbage disposals.',
    features: [
      'Expandable width from 40 cm to 70 cm',
      'Adjustable shelf height across 4 levels',
      'Heavy-duty powder coated carbon steel (Holds up to 20 kg)',
      'Rust-proof moisture coating for wet Indian kitchen environments',
    ],
    specifications: {
      'Dimensions': '40-70 cm (W) x 26 cm (D) x 38 cm (H)',
      'Material': 'Rust-Resistant Carbon Steel + ABS Panels',
      'Weight Capacity': '20 kg total',
      'Warranty': '2 Years Anti-Rust Guarantee',
    },
    stockStatus: 'In Stock',
    boughtTogetherId: 'gharcraft-spice-jars-12',
    material: 'Carbon Steel',
  },
  {
    id: 'gharcraft-lazy-susan-bamboo',
    name: '360° Rotatable Bamboo Lazy Susan Turntable',
    tagline: 'Smooth ball-bearing rotating organizer for oil bottles, ghee tins & condiments.',
    category: 'Kitchen',
    price: 1199,
    mrp: 1799,
    rating: 4.9,
    reviewsCount: 188,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Honey Oak', hex: '#C68B59' },
    ],
    description: 'No more searching at the back of deep kitchen cabinets! Bring every mustard bottle, ghee pot, and pickle jar to your fingertips with effortless 360-degree rotation.',
    features: [
      'Dual stainless-steel ball bearing smooth rotation mechanism',
      'Raised 1.5-inch safety rim prevents bottle tipping',
      'Water-repellent beeswax finish',
      'Non-slip silicone feet protect countertop marble',
    ],
    specifications: {
      'Diameter': '28 cm (11 inches)',
      'Height': '4.5 cm',
      'Material': '100% Organic Moso Bamboo',
      'Care': 'Wipe clean with damp cloth',
    },
    stockStatus: 'Low Stock',
    boughtTogetherId: 'gharcraft-spice-jars-12',
    material: 'Organic Bamboo',
  },
  {
    id: 'gharcraft-pantry-containers-8',
    name: 'Modular Stackable Pantry Airtight Container Set (Set of 8)',
    tagline: 'BPA-free crystal clear containers for Atta, Rice, Dals & Snacks.',
    category: 'Storage',
    price: 2499,
    mrp: 3599,
    rating: 4.9,
    reviewsCount: 512,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Clear White Lids', hex: '#F0F0F0' },
      { name: 'Emerald Accent', hex: '#2E7D32' },
    ],
    description: 'Engineered specifically for Indian bulk grocery storage. Four-sided locking lids with thick silicone gaskets create an airtight barrier against humidity and insects.',
    features: [
      'Includes 2 Extra Large (3.2L), 2 Large (2.0L), 2 Medium (1.4L), 2 Small (0.8L)',
      'Stackable space-saving design increases cabinet capacity by 40%',
      'Free measuring cups & chalkboard marker included',
      '100% BPA Free Food Grade Tritan-look Plastic',
    ],
    specifications: {
      'Total Set Weight': '2.4 kg',
      'Material': 'Food-Grade Shatterproof Polypropylene',
      'Temperature Range': '-20°C to 100°C',
    },
    stockStatus: 'In Stock',
    boughtTogetherId: 'gharcraft-bamboo-cutlery-tray',
    material: 'BPA-Free Acrylic',
  },
  {
    id: 'gharcraft-bamboo-cutlery-tray',
    name: 'Expandable Bamboo Drawer Cutlery & Belan Divider',
    tagline: 'Customizable 6 to 8 slot organizer fitted for Indian cutlery & kitchen tools.',
    category: 'Kitchen',
    price: 1699,
    mrp: 2499,
    rating: 4.7,
    reviewsCount: 164,
    images: [
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Natural Grain', hex: '#D2B48C' },
    ],
    description: 'Fits standard Indian kitchen drawers. Deep compartments easily accommodate long rolling pins (Belan), spatulas, chimta tongs, spoons, and knives.',
    features: [
      'Smooth sliding side wings expand width from 33 cm to 50 cm',
      'Reinforced base prevents sagging',
      'Eco-friendly bamboo with natural anti-bacterial properties',
    ],
    specifications: {
      'Dimensions': '33-50 cm (W) x 44 cm (D) x 6 cm (H)',
      'Material': 'Premium Moso Bamboo',
      'Weight': '1.5 kg',
    },
    stockStatus: 'In Stock',
    material: 'Organic Bamboo',
  },
  {
    id: 'gharcraft-bathroom-shelves-2',
    name: 'Self-Adhesive Waterproof Bathroom Shelf Rack (Set of 2)',
    tagline: 'No-drill heavy load wall organizer with built-in towel rod & hook rail.',
    category: 'Bathroom',
    price: 1299,
    mrp: 1999,
    rating: 4.8,
    reviewsCount: 289,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Space Black', hex: '#222222' },
      { name: 'Brushed Silver', hex: '#C0C0C0' },
    ],
    description: 'Drill-free installation for Indian tile and marble walls. Ultra-strong waterproof adhesive pads hold up to 10 kg without damaging tile grout.',
    features: [
      'Includes 2 Racks + 4 Powerful Adhesive Magic Hooks',
      'Hollow drainage slots prevent soap scum and standing water',
      'Anodized Space Aluminum - 100% Anti-Rust & Corrosion Proof',
    ],
    specifications: {
      'Dimensions': '30 cm x 13 cm x 5.5 cm',
      'Material': 'Space Grade Anodized Aluminum',
      'Adhesive Hold': 'Up to 10 kg',
    },
    stockStatus: 'In Stock',
    material: 'Anodized Aluminum',
  },
  {
    id: 'gharcraft-laundry-basket-canvas',
    name: 'Foldable Cotton Linen Laundry Hamper with Leather Handles',
    tagline: 'Breathable 75L capacity basket with waterproof PE inner coating.',
    category: 'Laundry',
    price: 999,
    mrp: 1599,
    rating: 4.9,
    reviewsCount: 405,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F7F3ED' },
      { name: 'Forest Green Accent', hex: '#2E7D32' },
    ],
    description: 'Stands upright even when empty thanks to wire-rimmed top border. Waterproof lining prevents damp clothes from emitting odors.',
    features: [
      'Large 75L Volume (Holds up to 2 weeks of laundry)',
      'Reinforced PU Leather carrying handles for heavy loads',
      'Folds flat down to 2 inches for effortless storage',
    ],
    specifications: {
      'Dimensions': '40 cm (D) x 50 cm (H)',
      'Material': 'Natural Linen Fabric + PE Moisture Barrier',
      'Capacity': '75 Liters',
    },
    stockStatus: 'In Stock',
    material: 'Linen & Leather',
  },
  {
    id: 'gharcraft-over-sink-dish-rack',
    name: 'Heavy-Duty Over-Sink Stainless Steel Dish Drying Drainer',
    tagline: 'All-in-one counter saver for Indian cookware, Kadais & Thalis.',
    category: 'Kitchen',
    price: 3499,
    mrp: 4999,
    rating: 4.9,
    reviewsCount: 194,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Matte Black', hex: '#1C1C1C' },
    ],
    description: 'Drips water directly into your sink basin, eliminating wet countertops. Includes dedicated modules for Thalis, bowls, cutlery, chopping board, and detergent.',
    features: [
      'Fits single or double sink configurations (Width: 85 cm)',
      '304 Grade Stainless Steel with High-Temp Baking Paint',
      'Non-slip suction cups grip marble & granite countertops securely',
    ],
    specifications: {
      'Dimensions': '85 cm (L) x 32 cm (W) x 52 cm (H)',
      'Weight Capacity': '35 kg total load',
      'Material': 'SUS 304 Stainless Steel',
    },
    stockStatus: 'In Stock',
    material: 'Stainless Steel',
  },
  {
    id: 'gharcraft-underbed-storage-organizer',
    name: 'Clear Window Under-Bed Clothes & Blanket Storage Bag (Set of 3)',
    tagline: 'Heavy-duty non-woven fabric bag for Indian sarees, suits & winter quilts.',
    category: 'Living',
    price: 1399,
    mrp: 2199,
    rating: 4.8,
    reviewsCount: 230,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c5173?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#4A4A4A' },
      { name: 'Sand Beige', hex: '#EFE8DE' },
    ],
    description: 'Keep expensive silk sarees, bridal wear, and heavy blankets dust-free. Reinforced dual #5 zippers and transparent front window for instant item identification.',
    features: [
      'Set of 3 Large 90L capacity storage containers',
      'Breathable 3-ply non-woven fabric guards against silverfish and dust',
      'Sturdy dual handles sewn with double-stitched load seams',
    ],
    specifications: {
      'Dimensions': '100 cm x 50 cm x 18 cm (Per Bag)',
      'Capacity': '90 Liters per bag',
      'Material': 'Odourless 3-Ply Non-Woven Fabric',
    },
    stockStatus: 'In Stock',
    material: 'Non-Woven Fabric',
  },
];
