"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, BookOpen, Briefcase, Package, Tag, Flag, Gift, Printer } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getProductSlug } from "@/components/Navbar";

const categories = [
  {
    label: "Marketing Materials",
    slug: "marketing-materials",
    Icon: BookOpen,
    description: "Custom banners, flyers, and promotional prints designed to capture attention and elevate your brand presence.",
    image: "/hero-vinyl.jpg",
    tab: "marketing",
    products: [
      "Business Flyers",
      "Club Flyers",
      "Custom Flyers",
      "Direct Mail",
      "Every Door Direct Mail",
      "Event Flyers",
      "Flyers",
      "Folded Cards",
      "Greeting Cards",
      "Invitations",
      "Magnets",
      "Mailing Flyers",
      "Menus",
      "Postcards",
      "Sell Sheets",
      "Sticker Sheets",
      "Vinyl Banners"
    ]
  },
  {
    label: "Business Essentials",
    slug: "business-essentials",
    Icon: Briefcase,
    description: "Operate professionally with premium custom business cards, letterhead, folders, envelopes, and carbonless forms.",
    image: "/org-vinyl.jpg",
    tab: "business",
    products: [
      "Appointment Cards",
      "Business Cards",
      "Business Flyers",
      "Carbonless Forms",
      "Direct Mail",
      "Every Door Direct Mail",
      "Envelopes",
      "Flyers",
      "Letterhead",
      "Loyalty Cards",
      "Mailing Flyers",
      "Mailing Services",
      "Postcards",
      "Presentation Folders",
      "Self-Seal Envelopes",
      "Sell Sheets",
      "Silk Presentation Folders",
      "Square Business Cards",
      "Standard Business Cards",
      "Sticker Sheets",
      "Company Apparel"
    ]
  },
  {
    label: "Boxes & Packaging",
    slug: "boxes-and-packaging",
    Icon: Package,
    description: "Elevate your unboxing experience with custom mailer boxes, product packaging, and shipping cartons.",
    image: "/rolls-vinyl.jpg",
    tab: "packaging",
    products: [
      "Custom Pouches",
      "Mailer Boxes",
      "Product Boxes",
      "Shipping Boxes",
      "Product Labels",
      "Hang Tags",
      "Header Cards",
      "Paper Bags",
      "Mailer Envelopes",
      "Tissue Paper",
      "Wrapping Paper",
      "All Packaging"
    ]
  },
  {
    label: "Label and Stickers",
    slug: "label-and-stickers",
    Icon: Tag,
    description: "Contour-cut sticker sheets, custom vinyl decals, and durable apparel transfer decals.",
    image: "/personal-vinyl.jpg",
    tab: "stickers",
    products: [
      "Custom Stickers",
      "Sticker Sheets",
      "Bumper Stickers",
      "Clear Stickers",
      "Vinyl Stickers",
      "Oval Stickers",
      "Rectangle Stickers",
      "Round Stickers",
      "Square Stickers",
      "DTF Transfers",
      "Return Address Labels",
      "All Labels",
      "All Stickers"
    ]
  },
  {
    label: "Banner & Signs",
    slug: "banner-and-signs",
    Icon: Flag,
    description: "Outdoor vinyl banners, large fabric backdrops, yard signage, mounted posters, A-frame sign boards, and retractable banners.",
    image: "/window-vinyl.jpg",
    tab: "signage",
    products: [
      "A-Frame Signs",
      "Backdrops",
      "Banners",
      "Canvas Prints",
      "Deluxe Retractable Banners",
      "Mesh Banners",
      "Mounted Posters",
      "Pole Banners",
      "Posters",
      "Retractable Banners",
      "Rolled Canvas",
      "Stretched Canvas",
      "Vinyl Banners",
      "Wall Decals",
      "Window Clings",
      "Window Decals",
      "X-Banners",
      "Yard Signs",
      "All Banners",
      "All Signs"
    ]
  },
  {
    label: "Promotional Items",
    slug: "promotional-items",
    Icon: Gift,
    description: "Custom hoodies and t-shirts, embroidered hats, ceramic mugs, tote bags, and promotional gifts.",
    image: "/merch-vinyl.jpg",
    tab: "promo",
    products: [
      "Custom Apparel",
      "Embroidered Hats",
      "Ceramic Mugs",
      "Logo Tote Bags",
      "Branded Gifts",
      "T-Shirts",
      "Hoodies",
      "Polo Shirts",
      "Drawstring Bags",
      "Stress Balls"
    ]
  }
];

const tabs = [
  { id: "all", label: "All Categories" },
  { id: "marketing", label: "Marketing" },
  { id: "business", label: "Business" },
  { id: "packaging", label: "Packaging" },
  { id: "stickers", label: "Stickers & Labels" },
  { id: "signage", label: "Banners & Signs" },
  { id: "promo", label: "Promotional" }
];

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories = categories.filter(
    (cat) => activeTab === "all" || cat.tab === activeTab
  );

  return (
    <>
      {/* Filter Tabs Row (Clean White Background) */}
      <div className="pt-8 pb-6 px-6 lg:px-12 bg-white relative border-b border-border-subtle z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 text-xs md:text-sm font-extrabold rounded-full transition-all duration-300 shadow-sm border cursor-pointer ${
                activeTab === tab.id
                  ? "bg-brand-blue text-white border-brand-blue scale-[1.02]"
                  : "bg-white text-ink-light border-border-subtle hover:bg-slate-50 hover:text-brand-blue"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Services Cards Section (Clay Peach Background behind Cards) */}
      <section className="py-16 px-6 lg:px-12 bg-[#D2E2EC]/40 relative border-t border-border-subtle">
        {/* Soft grid background */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-[0.05]" />
        
        {/* Ambient radial glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Categories Grid (Tab is All) vs Catalog Grid (Tab is Selected) */}
          {activeTab === "all" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(({ Icon, label, slug, description, image, products }) => (
                <Reveal
                  key={label}
                  className="group/card bg-white border border-border-subtle rounded-2xl p-5 hover:shadow-xl hover:shadow-ink/5 hover:border-brand-blue/20 transition-all duration-300 flex flex-col items-stretch text-left relative overflow-hidden"
                >
                  {/* Media Container with Product Sample Image */}
                  <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-slate-100 mb-3.5 border border-border-subtle/50 shadow-inner">
                    <Image
                      src={image}
                      alt={label}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />

                    {/* Symbol Container overlay on bottom-left */}
                    <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/95 backdrop-blur-sm border border-border-subtle/30 rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-base font-extrabold mb-1.5 text-ink group-hover/card:text-brand-blue transition-colors duration-300 tracking-tight">
                    {label}
                  </h2>
                  
                  <p className="text-ink-light text-[11px] leading-relaxed mb-3 flex-1">
                    {description}
                  </p>

                  {/* Popular Products Checklist Grid (Capped preview of top 8) */}
                  <div className="pt-3 border-t border-border-subtle/40 space-y-1.5 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold text-ink-muted uppercase tracking-wider block">
                        Popular Products
                      </span>
                      <button
                        onClick={() => setActiveTab(slug === "marketing-materials" ? "marketing" : slug === "business-essentials" ? "business" : slug === "boxes-and-packaging" ? "packaging" : slug === "label-and-stickers" ? "stickers" : slug === "banner-and-signs" ? "signage" : "promo")}
                        className="text-[9px] font-extrabold text-brand-blue uppercase hover:underline"
                      >
                        View All {products.length}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                      {products.slice(0, 8).map((prod) => (
                        <Link
                          key={prod}
                          href={getProductSlug(prod)}
                          className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-light hover:text-brand-blue truncate"
                        >
                          <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                          <span className="truncate">{prod}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* View Details Link */}
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => setActiveTab(slug === "marketing-materials" ? "marketing" : slug === "business-essentials" ? "business" : slug === "boxes-and-packaging" ? "packaging" : slug === "label-and-stickers" ? "stickers" : slug === "banner-and-signs" ? "signage" : "promo")}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-blue hover:text-brand-blue/80 transition-colors cursor-pointer"
                    >
                      <span>Explore {products.length} Products</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
        ) : (
          /* Show expanded category detail with all products listed as clean links */
          <div className="space-y-12 text-left">
            {filteredCategories.map(({ Icon, label, slug, description, image, products }) => (
              <div key={label} className="space-y-8 animate-in fade-in duration-300">
                {/* Category Header Card (Split Layout) */}
                <div className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-border-subtle/50 flex-shrink-0">
                    <Image
                      src={image}
                      alt={label}
                      fill
                      sizes="(max-w-768px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/95 backdrop-blur-sm border border-border-subtle/30 rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl md:text-3xl font-black text-ink tracking-tight">
                      {label}
                    </h2>
                    <p className="text-ink-light text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {description}
                    </p>
                    <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider bg-slate-50 border border-border-subtle/50 px-3 py-1 rounded-full inline-block">
                      Currently offering {products.length} products
                    </div>
                  </div>
                </div>

                {/* Sub-grid of every single product */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-border-subtle/50 pb-2">
                    <h3 className="text-[10px] font-extrabold text-ink-muted uppercase tracking-widest">
                      Select a product to view specifications & upload files
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((prodName) => (
                      <Link
                        key={prodName}
                        href={getProductSlug(prodName)}
                        className="group bg-white border border-border-subtle hover:border-brand-blue/30 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors flex-shrink-0">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-ink group-hover:text-brand-blue transition-colors truncate">
                            {prodName}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Custom CTA Block */}
        <Reveal delay={0.2} className="mt-32">
          <div className="bg-gradient-to-r from-[#0d1326] via-[#090d16] to-[#0d1326] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-xl shadow-ink/10">
            {/* Ambient circular glow background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
              <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Custom Orders welcome
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                Ready to Design Your Prints?
              </h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
                Use our interactive Template.io online editor to build your designs directly on our site, or drag-and-drop any print-ready PDF file you already have.
              </p>
              <div className="pt-4">
                <Link
                  href="/design"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/95 transition-all shadow-lg shadow-brand-blue/30 hover:scale-105 duration-300"
                >
                  Start Designing Online
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}
