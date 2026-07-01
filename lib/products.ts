export type Category = "banner" | "apparel" | "decal";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  tag?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Custom Vinyl Banner (3' x 6')",
    category: "banner",
    price: 45,
    image: "https://picsum.photos/seed/bannerprint/600/600",
    tag: "Popular",
    description: "Heavy-duty outdoor 13oz vinyl banner",
  },
  {
    id: 2,
    name: "Custom Team T-Shirt (HTV)",
    category: "apparel",
    price: 24,
    image: "https://picsum.photos/seed/teehtv/600/600",
    tag: "New",
    description: "Custom heat-transfer vinyl print shirts",
  },
  {
    id: 3,
    name: "Die-Cut Branding Decal Pack",
    category: "decal",
    price: 15,
    image: "https://picsum.photos/seed/decalbrand/600/600",
    description: "Weatherproof contour-cut logo stickers (50pk)",
  },
  {
    id: 4,
    name: "Retractable Banner & Stand",
    category: "banner",
    price: 95,
    image: "https://picsum.photos/seed/rollupstand/600/600",
    description: '33"x80" lightweight aluminum display stand',
  },
  {
    id: 5,
    name: "A-Frame Double-Sided Sign",
    category: "banner",
    price: 75,
    image: "https://picsum.photos/seed/aframesign/600/600",
    description: 'Heavy-duty 24"x36" pavement curb sign',
  },
  {
    id: 6,
    name: "Matte Sign-Making Vinyl Roll",
    category: "decal",
    price: 29,
    image: "/rolls-vinyl.jpg",
    tag: "Best Seller",
    description: "12in x 50ft premium adhesive plotter vinyl",
  },
  {
    id: 7,
    name: "Vehicle Magnetic Door Sign",
    category: "decal",
    price: 20,
    image: "https://picsum.photos/seed/vehiclemag/600/600",
    description: '12"x18" heavy-duty magnetic vehicle graphic',
  },
  {
    id: 8,
    name: "Custom Team Uniform Print",
    category: "apparel",
    price: 35,
    image: "https://picsum.photos/seed/sportjersey/600/600",
    tag: "Bulk Discount",
    description: "Durable heat-press numbers & logo jerseys",
  },
];
