import { Flag, Car, Shirt, Tag, Calendar, Trophy, type LucideIcon } from "lucide-react";

export interface Service {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    Icon: Flag,
    title: "Banner Printing",
    description:
      "Large format vinyl banners for events, promotions, and storefronts. Weather-resistant and built to last.",
  },
  {
    Icon: Car,
    title: "Vehicle Wraps",
    description:
      "Full and partial vehicle wraps using premium cast vinyl. Turn any vehicle into a moving billboard.",
  },
  {
    Icon: Shirt,
    title: "Apparel Printing",
    description:
      "Custom heat-press vinyl printing for shirts, jerseys, and uniforms. Vibrant colors that won't crack or fade.",
  },
  {
    Icon: Tag,
    title: "Decals & Stickers",
    description:
      "Custom die-cut vinyl decals and stickers in any shape, size, or color. Perfect for branding and promotions.",
  },
  {
    Icon: Calendar,
    title: "Event Signage",
    description:
      "Complete signage packages for events, trade shows, and conferences. Banners, stands, and displays of all sizes.",
  },
  {
    Icon: Trophy,
    title: "Sports & Teams",
    description:
      "Custom vinyl printing for jerseys, helmets, and team merchandise. Show your team pride with durable prints.",
  },
];

export const processSteps = [
  { step: "01", title: "Send Design", text: "Upload your artwork or work with our design team." },
  { step: "02", title: "Review & Approve", text: "We send a digital proof for your approval before printing." },
  { step: "03", title: "We Print", text: "Your order is printed, cut, and quality-checked." },
  { step: "04", title: "Delivered", text: "Shipped or ready for pickup, on time every time." },
];
