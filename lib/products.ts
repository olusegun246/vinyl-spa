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

// Placeholder images use picsum.photos so they render immediately.
// Replace `image` with your own product photos in /public when ready.
export const products: Product[] = [
  {
    id: 1,
    name: "Custom Banner 3'x6'",
    category: "banner",
    price: 45,
    image: "https://picsum.photos/seed/banner1/600/600",
    tag: "New",
    description: "Full color 13oz vinyl banner",
  },
  {
    id: 2,
    name: "Team Jersey Set",
    category: "apparel",
    price: 35,
    image: "https://picsum.photos/seed/jersey2/600/600",
    tag: "Popular",
    description: "Custom heat-press vinyl print",
  },
  {
    id: 3,
    name: "Die-Cut Decal Pack",
    category: "decal",
    price: 12,
    image: "https://picsum.photos/seed/decal3/600/600",
    description: "Weatherproof vinyl stickers (50 pk)",
  },
  {
    id: 4,
    name: "Roll-Up Banner Stand",
    category: "banner",
    price: 89,
    image: "https://picsum.photos/seed/rollup4/600/600",
    description: '33"x80" retractable display',
  },
  {
    id: 5,
    name: "A-Frame Sidewalk Sign",
    category: "banner",
    price: 65,
    image: "https://picsum.photos/seed/aframe5/600/600",
    description: '24"x36" outdoor metal frame',
  },
  {
    id: 6,
    name: "Custom Tee (Your Design)",
    category: "apparel",
    price: 22,
    image: "https://picsum.photos/seed/tee6/600/600",
    tag: "New",
    description: "100% cotton, vinyl heat press",
  },
  {
    id: 7,
    name: "Vehicle Door Magnet",
    category: "decal",
    price: 18,
    image: "https://picsum.photos/seed/magnet7/600/600",
    description: '12"x18" magnetic vehicle sign',
  },
  {
    id: 8,
    name: "Wall Decal Set",
    category: "decal",
    price: 30,
    image: "https://picsum.photos/seed/wall8/600/600",
    tag: "Popular",
    description: "Removable vinyl wall graphics",
  },
];
