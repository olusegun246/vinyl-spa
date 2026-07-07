import { Flag, Trophy, Grid, Tag, Shirt, Users, type LucideIcon } from "lucide-react";

export interface MachineVideo {
  title: string;
  url: string;
}

export interface Service {
  slug: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  image: string;
  machineImage: string;
  machineName: string;
  machineVideo?: string;
  machineVideos?: MachineVideo[];
  longDescription: string;
  specifications: string[];
}

export const services: Service[] = [
  {
    slug: "custom-banner-printing",
    Icon: Flag,
    title: "Custom Banner Printing",
    description:
      "Large-format weatherproof vinyl banners for promotions, grand openings, outdoor events, and retail storefronts.",
    tag: "Weatherproof",
    image: "/hero-vinyl.jpg",
    machineImage: "/hero-vinyl.jpg",
    machineName: "Roland TrueVIS VG3-640 Plotter-Printer",
    machineVideo: "/Roland-Machine-1.mp4",
    machineVideos: [
      { title: "Roland Wide-Format Printer", url: "/Roland-Machine-1.mp4" }
    ],
    longDescription:
      "Our high-speed banner printing service outputs vibrant prints on 13oz scrim vinyl and premium mesh vinyl substrates. Perfect for building banners, promotional storefront events, and weather-resistant signage.",
    specifications: [
      "Heavy-duty 13oz scrim vinyl substrate",
      "Nickel grommets placed every 24 inches for simple mounting",
      "Weatherproof, scratch-resistant latex ink layers",
      "Available in custom sizes up to 10ft x 50ft",
    ],
  },
  {
    slug: "custom-merchandise",
    Icon: Trophy,
    title: "Custom Merchandise",
    description:
      "Branded corporate gifts, customized mugs, keychains, and high-quality printed promotional accessories.",
    tag: "Promo Gear",
    image: "/merch-vinyl.jpg",
    machineImage: "/merch-vinyl.jpg",
    machineName: "Mutoh ValueJet 626UF Flatbed UV Printer",
    machineVideo: "/Heat-Press-Machine-Cups (1).mp4",
    machineVideos: [
      { title: "Mug Heat Press", url: "/Mugs-Heat-Press-Machine (1).mp4" },
      { title: "Cup Heat Press", url: "/Heat-Press-Machine-Cups (1).mp4" },
      { title: "Hat Heat Press", url: "/Hat-Heat-Press-Machine (1).mp4" }
    ],
    longDescription:
      "Get high-end branded corporate gifts, customized mugs, thermal bottles, notebooks, and promotional accessories. Using advanced flatbed UV-cured inks, we deliver sharp text and logos that will not peel or scratch.",
    specifications: [
      "Ultra-sharp print resolution up to 1440 dpi",
      "UV-cured scratch-proof ink technology",
      "Full-color print + white ink layer support",
      "Fits cylindrical objects and flat solid substrates",
    ],
  },
  {
    slug: "custom-window-graphics",
    Icon: Grid,
    title: "Custom Window Graphics",
    description:
      "Perforated window film, frosted privacy glass signage, and custom contour cut vinyl window lettering.",
    tag: "Storefronts",
    image: "/window-vinyl.jpg",
    machineImage: "/window-vinyl.jpg",
    machineName: "Graphtec FC9000-160 High-Precision Vinyl Cutter",
    machineVideo: "/Printing-Machine-Hero.mp4",
    machineVideos: [
      { title: "Graphtec Vinyl Cutter Plotter", url: "/Printing-Machine-Hero.mp4" }
    ],
    longDescription:
      "Maximize your storefront presence with premium window graphics. We design perforated window films (displays that allow you to see out but block visibility in), frosted privacy logos, and crisp white vinyl lettering cut to exact contours.",
    specifications: [
      "Perforated 60/40 window film visibility options",
      "Acid-etched frosted look privacy vinyl wraps",
      "High-performance Oracal 651 cast vinyl lettering",
      "Clear professional alignment tape backing included",
    ],
  },
  {
    slug: "custom-stickers",
    Icon: Tag,
    title: "Custom Stickers",
    description:
      "Die-cut contour vinyl decals and weatherproof stickers in any shape, available in matte or gloss finishes.",
    tag: "Matte & Gloss",
    image: "/personal-vinyl.jpg",
    machineImage: "/personal-vinyl.jpg",
    machineName: "Summa S One D140 Contour Vinyl Cutter",
    machineVideo: "/Printing-Machine-Hero-2.mp4",
    machineVideos: [
      { title: "Summa Contour Sticker Cutter", url: "/Printing-Machine-Hero-2.mp4" }
    ],
    longDescription:
      "Premium die-cut vinyl stickers and gear decals cut exactly to your custom artwork's boundary shape. Protected with waterproof laminates, they endure rain, sunlight, and everyday scratching.",
    specifications: [
      "Thick 6mil weatherproof vinyl film layers",
      "Optional UV-matte or high-gloss protective laminates",
      "Die-cut (cut through backing) or kiss-cut sheet configurations",
      "Zero residue clean-release adhesive backing",
    ],
  },
  {
    slug: "custom-tshirt-printing",
    Icon: Shirt,
    title: "Custom T-shirt Printing",
    description:
      "Premium apparel customization. High-resolution vinyl film and custom DTF graphics for shirts and hoodies.",
    tag: "DTF & Heat Press",
    image: "/Back-to-the-90s.jpeg",
    machineImage: "/apparel-vinyl.jpg",
    machineName: "Hotronix Fusion IQ Heat Press & Direct-to-Film System",
    machineVideo: "/Shirt-Heat-Press-Machine (1).mp4",
    machineVideos: [
      { title: "Shirt Heat Press Machine", url: "/Shirt-Heat-Press-Machine (1).mp4" },
      { title: "DTF Film Printing Press", url: "/DTF-Machine (1).mp4" }
    ],
    longDescription:
      "Professional custom t-shirt customization. Using state-of-the-art Direct-to-Film (DTF) transfer technology and premium heat-transfer vinyls, we press vibrant, elastic, and washproof graphics onto hoodies, tees, and sportswear.",
    specifications: [
      "Vibrant full-color DTF prints matching vector colors",
      "Elastic heat press vinyl that will not crack or peel",
      "Pressed on premium ring-spun cotton & poly-blends",
      "Vibrant colors tested up to 50+ wash cycles",
    ],
  },
  {
    slug: "custom-organizational-tshirts",
    Icon: Users,
    title: "Custom Organizational T-shirts",
    description:
      "Bulk apparel orders for community clubs, churches, schools, sports teams, and corporate organizations.",
    tag: "Bulk Orders",
    image: "/company-shirt.jpeg",
    machineImage: "/org-vinyl.jpg",
    machineName: "Stahls' Dual Air Fusion IQ Bulk Production Press",
    machineVideo: "/DTF-Machine (1).mp4",
    machineVideos: [
      { title: "Bulk DTF Fabric Press", url: "/DTF-Machine (1).mp4" },
      { title: "Shirt Heat Press Machine", url: "/Shirt-Heat-Press-Machine (1).mp4" }
    ],
    longDescription:
      "Cost-effective bulk custom apparel printing for community clubs, schools, church retreats, corporate workforces, and non-profits. We specialize in fast turnarounds for high-volume orders with crisp logo alignment.",
    specifications: [
      "Bulk order volume discount pricing layers",
      "Precision alignment templates across all shirt sizes",
      "Custom vector art checks before production",
      "Individual folded and bagged packing options available",
    ],
  },
];

export const processSteps = [
  { step: "01", title: "Send Design", text: "Upload your artwork or work with our design team." },
  { step: "02", title: "Review & Approve", text: "We send a digital proof for your approval before printing." },
  { step: "03", title: "We Print", text: "Your order is printed, cut, and quality-checked." },
  { step: "04", title: "Delivered", text: "Shipped or ready for pickup, on time every time." },
];
