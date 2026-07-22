export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'organized-indian-kitchen-pantry-hacks',
    title: '5 Golden Rules for an Organized Indian Kitchen Pantry',
    excerpt: 'From turmeric spice preservation to bulk flour containment, discover how modular glass and air-tight storage keeps food fresh through monsoon and summer.',
    category: 'Kitchen Organization',
    readTime: '4 min read',
    date: 'July 18, 2026',
    author: 'Ananya Sharma (Senior Home Stylist)',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
    content: `
      Indian cooking involves a vibrant array of spices, pulses, grains, and oils. However, humidity and pests can compromise ingredient freshness if not stored correctly.
      
      1. **Switch to Borosilicate Glass Jars for Daily Spices**: Plastic containers absorb spice odors and stain with turmeric. High borosilicate glass with silicone-sealed bamboo lids preserves volatile oils in garam masala, cumin, and cardamom.
      2. **Implement Lazy Susans in Corner Cabinets**: Don't let oil bottles or ghee tubs leak onto marble countertops. A 360-degree rotating turntable keeps heavy oil containers accessible without mess.
      3. **Group Dals & Grains by Usage Frequency**: Place daily staples like Toor Dal, Chana Dal, and Basmati Rice in uniform stackable modular containers at eye level.
      4. **Decant Spices Immediately**: Dump plastic grocery pouches into designated jars as soon as you shop to maintain a clutter-free cabinet aesthetic.
    `,
  },
  {
    id: 'under-sink-storage-guide-indian-homes',
    title: 'Mastering Under-Sink Storage in Indian Bathrooms & Kitchens',
    excerpt: 'Overcome awkward plumbing pipes with 2-tier expandable racks and rust-resistant aluminum hanging organizer shelves.',
    category: 'Space Optimization',
    readTime: '5 min read',
    date: 'July 12, 2026',
    author: 'Rohan Mehta (Product Architect)',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    content: `
      Under-sink spaces are frequently neglected in Indian homes because of U-trap plumbing pipes and dampness.
      
      Using expandable carbon steel organizers allows you to adjust shelf width around plumbing traps while doubling vertical storage space for dishwashing liquids, scrubbers, and floor cleaners.
    `,
  },
  {
    id: 'ethnic-wear-wardrobe-storage-guide',
    title: 'Silk Sarees & Heavy Ethnic Wear: Wardrobe Storage Hacks',
    excerpt: 'Protect expensive Zari silk sarees, Sherwanis, and heavy dupattas from dust, moisture, and silverfish without plastic discoloration.',
    category: 'Wardrobe & Living',
    readTime: '6 min read',
    date: 'July 05, 2026',
    author: 'Priya Nambiar (Textile Care Specialist)',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c5173?q=80&w=1000&auto=format&fit=crop',
    content: `
      Heavy Zari embroidery in Kanjeevarams and Banarasi silks requires breathable storage. Avoid PVC plastic bags which trap moisture and oxidize metallic threads over time.
      
      Use breathable 3-ply non-woven storage bags with transparent viewing windows. Always refold silk sarees every 3 months to prevent permanent crease breaks.
    `,
  },
];
