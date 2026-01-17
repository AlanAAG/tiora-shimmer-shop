import productRing from "@/assets/product-ring.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  comparePrice: number;
  image: string;
  images: string[];
  category: "rings" | "earrings" | "bracelets" | "necklaces";
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  materials: ("gold" | "silver")[];
  bundles: Bundle[];
}

export interface Bundle {
  id: string;
  name: string;
  image: string;
  products: string[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export const allProducts: Product[] = [
  // Rings
  {
    id: 1,
    slug: "wave-sculpt-ring",
    name: "Wave Sculpt Ring",
    price: 4500,
    comparePrice: 6000,
    image: productRing,
    images: [productRing, productRing, productRing, productRing, productRing, productRing],
    category: "rings",
    isNew: true,
    isBestSeller: true,
    rating: 4.5,
    reviewCount: 15,
    description: "This collection embraces soft, flowing shapes that feel both feminine and bold. A selection of the pieces is highlighted by a natural edged open circle. The organic, fluid lines are a testament to the imperfect perfection that gives these pieces their individual charm.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productRing, products: ["Wave Sculpt Ring", "Liquid Twist Ring"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productRing, products: ["Wave Sculpt Ring", "Fluid Band Ring", "Molten Edge Ring"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productRing, products: ["Wave Sculpt Ring", "Wave Cuff"] },
    ],
  },
  {
    id: 2,
    slug: "liquid-twist-ring",
    name: "Liquid Twist Ring",
    price: 3800,
    comparePrice: 5000,
    image: productRing,
    images: [productRing, productRing, productRing, productRing, productRing, productRing],
    category: "rings",
    isNew: false,
    isBestSeller: false,
    rating: 4.2,
    reviewCount: 8,
    description: "With versatile silhouettes, this collection effortlessly transitions from sunrise to sunset, offering an elegant yet striking look for any occasion. Discover the allure of unique beauty and let each piece speak to your individuality.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productRing, products: ["Wave Sculpt Ring", "Liquid Twist Ring"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productRing, products: ["Liquid Twist Ring", "Fluid Band Ring"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productRing, products: ["Liquid Twist Ring", "Wave Cuff"] },
    ],
  },
  {
    id: 3,
    slug: "fluid-band-ring",
    name: "Fluid Band Ring",
    price: 5200,
    comparePrice: 6800,
    image: productRing,
    images: [productRing, productRing, productRing, productRing, productRing, productRing],
    category: "rings",
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 22,
    description: "Each piece designed from hand drawing artists in Los Angeles. This collection embraces soft, flowing shapes that feel both feminine and bold.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productRing, products: ["Fluid Band Ring", "Wave Sculpt Ring"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productRing, products: ["Fluid Band Ring", "Liquid Twist Ring", "Molten Edge Ring"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productRing, products: ["Fluid Band Ring", "Wave Cuff"] },
    ],
  },
  {
    id: 4,
    slug: "molten-edge-ring",
    name: "Molten Edge Ring",
    price: 4200,
    comparePrice: 5500,
    image: productRing,
    images: [productRing, productRing, productRing, productRing, productRing, productRing],
    category: "rings",
    isNew: false,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 18,
    description: "The organic, fluid lines are a testament to the imperfect perfection that gives these pieces their individual charm.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productRing, products: ["Molten Edge Ring", "Wave Sculpt Ring"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productRing, products: ["Molten Edge Ring", "Fluid Band Ring"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productRing, products: ["Molten Edge Ring", "Wave Cuff"] },
    ],
  },
  // Earrings
  {
    id: 5,
    slug: "cascade-earrings",
    name: "Cascade Earrings",
    price: 5800,
    comparePrice: 7500,
    image: productEarrings,
    images: [productEarrings, productEarrings, productEarrings, productEarrings, productEarrings, productEarrings],
    category: "earrings",
    isNew: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 32,
    description: "This collection embraces soft, flowing shapes that feel both feminine and bold. Perfect for any occasion.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productEarrings, products: ["Cascade Earrings", "Drop Flow Earrings"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productEarrings, products: ["Cascade Earrings", "Sculpted Hoops", "Liquid Studs"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productEarrings, products: ["Cascade Earrings", "Wave Cuff"] },
    ],
  },
  {
    id: 6,
    slug: "drop-flow-earrings",
    name: "Drop Flow Earrings",
    price: 6200,
    comparePrice: 8000,
    image: productEarrings,
    images: [productEarrings, productEarrings, productEarrings, productEarrings, productEarrings, productEarrings],
    category: "earrings",
    isNew: false,
    isBestSeller: false,
    rating: 4.3,
    reviewCount: 12,
    description: "With versatile silhouettes, this collection effortlessly transitions from sunrise to sunset.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productEarrings, products: ["Drop Flow Earrings", "Cascade Earrings"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productEarrings, products: ["Drop Flow Earrings", "Sculpted Hoops"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productEarrings, products: ["Drop Flow Earrings", "Wave Cuff"] },
    ],
  },
  {
    id: 7,
    slug: "sculpted-hoops",
    name: "Sculpted Hoops",
    price: 7500,
    comparePrice: 9500,
    image: productEarrings,
    images: [productEarrings, productEarrings, productEarrings, productEarrings, productEarrings, productEarrings],
    category: "earrings",
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 45,
    description: "Each piece designed from hand drawing artists in Los Angeles. The organic, fluid lines are a testament to the imperfect perfection.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productEarrings, products: ["Sculpted Hoops", "Cascade Earrings"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productEarrings, products: ["Sculpted Hoops", "Liquid Studs"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productEarrings, products: ["Sculpted Hoops", "Wave Cuff"] },
    ],
  },
  {
    id: 8,
    slug: "liquid-studs",
    name: "Liquid Studs",
    price: 3500,
    comparePrice: 4500,
    image: productEarrings,
    images: [productEarrings, productEarrings, productEarrings, productEarrings, productEarrings, productEarrings],
    category: "earrings",
    isNew: false,
    isBestSeller: false,
    rating: 4.1,
    reviewCount: 6,
    description: "Discover the allure of unique beauty and let each piece speak to your individuality.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productEarrings, products: ["Liquid Studs", "Cascade Earrings"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productEarrings, products: ["Liquid Studs", "Sculpted Hoops"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productEarrings, products: ["Liquid Studs", "Wave Cuff"] },
    ],
  },
  // Bracelets
  {
    id: 9,
    slug: "fluid-link-bracelet",
    name: "Fluid Link Bracelet",
    price: 7200,
    comparePrice: 9500,
    image: productBracelet,
    images: [productBracelet, productBracelet, productBracelet, productBracelet, productBracelet, productBracelet],
    category: "bracelets",
    isNew: false,
    isBestSeller: false,
    rating: 4.4,
    reviewCount: 14,
    description: "This collection embraces soft, flowing shapes that feel both feminine and bold.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productBracelet, products: ["Fluid Link Bracelet", "Wave Cuff"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productBracelet, products: ["Fluid Link Bracelet", "Liquid Chain Bracelet", "Molten Bangle"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productBracelet, products: ["Fluid Link Bracelet", "Wave Sculpt Ring"] },
    ],
  },
  {
    id: 10,
    slug: "wave-cuff",
    name: "Wave Cuff",
    price: 8500,
    comparePrice: 11000,
    image: productBracelet,
    images: [productBracelet, productBracelet, productBracelet, productBracelet, productBracelet, productBracelet],
    category: "bracelets",
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 38,
    description: "With versatile silhouettes, this collection effortlessly transitions from sunrise to sunset, offering an elegant yet striking look for any occasion.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productBracelet, products: ["Wave Cuff", "Fluid Link Bracelet"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productBracelet, products: ["Wave Cuff", "Liquid Chain Bracelet"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productBracelet, products: ["Wave Cuff", "Wave Sculpt Ring"] },
    ],
  },
  {
    id: 11,
    slug: "liquid-chain-bracelet",
    name: "Liquid Chain Bracelet",
    price: 6800,
    comparePrice: 8800,
    image: productBracelet,
    images: [productBracelet, productBracelet, productBracelet, productBracelet, productBracelet, productBracelet],
    category: "bracelets",
    isNew: false,
    isBestSeller: false,
    rating: 4.2,
    reviewCount: 9,
    description: "Each piece designed from hand drawing artists in Los Angeles.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productBracelet, products: ["Liquid Chain Bracelet", "Wave Cuff"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productBracelet, products: ["Liquid Chain Bracelet", "Molten Bangle"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productBracelet, products: ["Liquid Chain Bracelet", "Wave Sculpt Ring"] },
    ],
  },
  {
    id: 12,
    slug: "molten-bangle",
    name: "Molten Bangle",
    price: 9200,
    comparePrice: 12000,
    image: productBracelet,
    images: [productBracelet, productBracelet, productBracelet, productBracelet, productBracelet, productBracelet],
    category: "bracelets",
    isNew: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 28,
    description: "The organic, fluid lines are a testament to the imperfect perfection that gives these pieces their individual charm.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productBracelet, products: ["Molten Bangle", "Wave Cuff"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productBracelet, products: ["Molten Bangle", "Fluid Link Bracelet", "Liquid Chain Bracelet"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productBracelet, products: ["Molten Bangle", "Wave Sculpt Ring"] },
    ],
  },
  // Necklaces
  {
    id: 13,
    slug: "liquid-flow-necklace",
    name: "Liquid Flow Necklace",
    price: 9500,
    comparePrice: 12500,
    image: productNecklace,
    images: [productNecklace, productNecklace, productNecklace, productNecklace, productNecklace, productNecklace],
    category: "necklaces",
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 17,
    description: "This collection embraces soft, flowing shapes that feel both feminine and bold. Perfect for any occasion.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productNecklace, products: ["Liquid Flow Necklace", "Cascade Pendant"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productNecklace, products: ["Liquid Flow Necklace", "Wave Chain Necklace", "Fluid Choker"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productNecklace, products: ["Liquid Flow Necklace", "Wave Cuff"] },
    ],
  },
  {
    id: 14,
    slug: "cascade-pendant",
    name: "Cascade Pendant",
    price: 7800,
    comparePrice: 10000,
    image: productNecklace,
    images: [productNecklace, productNecklace, productNecklace, productNecklace, productNecklace, productNecklace],
    category: "necklaces",
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 52,
    description: "With versatile silhouettes, this collection effortlessly transitions from sunrise to sunset.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productNecklace, products: ["Cascade Pendant", "Liquid Flow Necklace"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productNecklace, products: ["Cascade Pendant", "Wave Chain Necklace"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productNecklace, products: ["Cascade Pendant", "Wave Cuff"] },
    ],
  },
  {
    id: 15,
    slug: "wave-chain-necklace",
    name: "Wave Chain Necklace",
    price: 8200,
    comparePrice: 10500,
    image: productNecklace,
    images: [productNecklace, productNecklace, productNecklace, productNecklace, productNecklace, productNecklace],
    category: "necklaces",
    isNew: false,
    isBestSeller: false,
    rating: 4.3,
    reviewCount: 11,
    description: "Each piece designed from hand drawing artists in Los Angeles. The organic, fluid lines are a testament to the imperfect perfection.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productNecklace, products: ["Wave Chain Necklace", "Cascade Pendant"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productNecklace, products: ["Wave Chain Necklace", "Fluid Choker"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productNecklace, products: ["Wave Chain Necklace", "Wave Cuff"] },
    ],
  },
  {
    id: 16,
    slug: "fluid-choker",
    name: "Fluid Choker",
    price: 6500,
    comparePrice: 8500,
    image: productNecklace,
    images: [productNecklace, productNecklace, productNecklace, productNecklace, productNecklace, productNecklace],
    category: "necklaces",
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 24,
    description: "Discover the allure of unique beauty and let each piece speak to your individuality.",
    materials: ["gold", "silver"],
    bundles: [
      { id: "bundle-1", name: "Abstract Minimalist Bundle", image: productNecklace, products: ["Fluid Choker", "Cascade Pendant"] },
      { id: "bundle-2", name: "Fully Stacked Golden Bundle", image: productNecklace, products: ["Fluid Choker", "Liquid Flow Necklace", "Wave Chain Necklace"] },
      { id: "bundle-3", name: "Golden Arm Party Bundle", image: productNecklace, products: ["Fluid Choker", "Wave Cuff"] },
    ],
  },
];

export const sampleReviews: Review[] = [
  {
    id: 1,
    author: "Priya S.",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely stunning!",
    content: "This piece exceeded my expectations. The craftsmanship is impeccable and it looks even better in person. I've received so many compliments!",
    verified: true,
  },
  {
    id: 2,
    author: "Ananya M.",
    rating: 4,
    date: "1 month ago",
    title: "Beautiful but runs small",
    content: "Love the design and quality. Just wish I had sized up. The gold plating is gorgeous and hasn't tarnished at all.",
    verified: true,
  },
  {
    id: 3,
    author: "Riya K.",
    rating: 5,
    date: "3 weeks ago",
    title: "Perfect gift",
    content: "Bought this for my sister's birthday and she absolutely loved it. The packaging was beautiful too!",
    verified: true,
  },
  {
    id: 4,
    author: "Meera J.",
    rating: 5,
    date: "1 week ago",
    title: "Worth every rupee",
    content: "I was hesitant about the price but this is truly a statement piece. The weight feels luxurious and it elevates any outfit.",
    verified: true,
  },
];

export const faqItems = [
  {
    question: "What materials are used?",
    answer: "Our pieces are crafted with 18K gold plating over brass or sterling silver. We use hypoallergenic materials to ensure comfort for sensitive skin.",
  },
  {
    question: "How do I care for my jewelry?",
    answer: "Store your pieces in a cool, dry place away from direct sunlight. Avoid contact with water, perfume, and lotions. Clean gently with a soft cloth.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer free returns within 14 days of delivery. Items must be unworn and in original packaging. Contact our support team to initiate a return.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Free shipping on orders above ₹3,000.",
  },
  {
    question: "Are your pieces nickel-free?",
    answer: "Yes! All our jewelry is nickel-free and hypoallergenic, making them safe for sensitive skin.",
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return allProducts.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter((p) => p.category === category);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};
