"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, BookOpen, Briefcase, Package, Tag, Flag, Gift, Printer } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getProductSlug } from "@/components/Navbar";

const categories = [
  {
    label: "Print Products",
    slug: "print-products",
    Icon: Briefcase,
    description: "Professional custom business cards, flyers, envelopes, brochures, letterhead, folders, carbonless forms, and invitations.",
    image: "/org-vinyl.jpg",
    tab: "print",
    products: [
      "Standard Business Cards",
      "Square Business Cards",
      "Business Cards",
      "Appointment Cards",
      "Loyalty Cards",
      "Business Flyers",
      "Club Flyers",
      "Custom Flyers",
      "Event Flyers",
      "Flyers",
      "Mailing Flyers",
      "Sell Sheets",
      "Postcards",
      "Folded Cards",
      "Greeting Cards",
      "Invitations",
      "Envelopes",
      "Self-Seal Envelopes",
      "Letterhead",
      "Presentation Folders",
      "Silk Presentation Folders",
      "Carbonless Forms",
      "Direct Mail",
      "Every Door Direct Mail",
      "Mailing Services",
      "Menus",
      "Magnets"
    ]
  },
  {
    label: "Banners & Signs",
    slug: "banner-and-signs",
    Icon: Flag,
    description: "Outdoor vinyl banners, large fabric backdrops, yard signage, mounted posters, A-frame sign boards, and retractable banners.",
    image: "/window-vinyl.jpg",
    tab: "banners",
    products: [
      "Banners",
      "Mesh Banners",
      "Retractable Banners",
      "Deluxe Retractable Banners",
      "A-Frame Signs",
      "Yard Signs",
      "Posters",
      "Mounted Posters",
      "Window Decals",
      "Window Clings",
      "Wall Decals",
      "Backdrops",
      "Canvas Prints",
      "Stretched Canvas",
      "Rolled Canvas",
      "Pole Banners",
      "X-Banners",
      "All Banners",
      "All Signs"
    ]
  },
  {
    label: "Stickers & Labels",
    slug: "label-and-stickers",
    Icon: Tag,
    description: "Contour-cut sticker sheets, custom vinyl decals, bumper stickers, and weatherproof stickers in any shape.",
    image: "/personal-vinyl.jpg",
    tab: "stickers",
    products: [
      "Custom Stickers",
      "Sticker Sheets",
      "Vinyl Stickers",
      "Clear Stickers",
      "Return Address Labels",
      "Bumper Stickers",
      "Round Stickers",
      "Oval Stickers",
      "Square Stickers",
      "Rectangle Stickers",
      "All Labels",
      "All Stickers"
    ]
  },
  {
    label: "Promotional Items",
    slug: "promotional-items",
    Icon: Gift,
    description: "Custom printed promotional gifts, bags, drinkware, table cloths, bookmarks, patches, tickets, and office items.",
    image: "/merch-vinyl.jpg",
    tab: "promotional",
    products: [
      "Bookmarks",
      "Bags",
      "Table Cloths",
      "Patches",
      "Drinkware",
      "Office & Stationery",
      "Notepads",
      "Business Card Magnets",
      "Gift Certificates",
      "CD/DVD Insert Printing",
      "CD Products",
      "DVD Products",
      "Auto & Safety",
      "Outdoor & Leisure",
      "Technology",
      "Tickets",
      "Health & Wellness",
      "Metallic Save-the-Date Cards"
    ]
  }
];

const tabs = [
  { id: "all", label: "All Categories" },
  { id: "print", label: "Print Products" },
  { id: "banners", label: "Banners & Signs" },
  { id: "stickers", label: "Stickers & Labels" },
  { id: "promotional", label: "Promotional Items" }
];

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories = categories.filter(
    (cat) => activeTab === "all" || cat.tab === activeTab
  );

  return (
    <>
      {/* Filter Tabs Row (Clean White Background) */}
      <div id="services-list-section" className="pt-8 pb-6 px-6 lg:px-12 bg-white relative border-b border-border-subtle z-20">
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
          {activeTab === "all" ? (
            /* Compact layout for All Categories to see everything upfront */
            <div className="space-y-12 text-left">
              {filteredCategories.map(({ Icon, label, description, products }) => (
                <div key={label} className="space-y-4 animate-in fade-in duration-300">
                  {/* Compact Category Header */}
                  <div className="border-b border-border-subtle/50 pb-2.5 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <h2 className="text-lg md:text-xl font-extrabold text-ink tracking-tight">
                      {label}
                    </h2>
                    <span className="text-[9px] font-bold text-ink-muted bg-slate-100 border border-border-subtle/30 px-2 py-0.5 rounded-full ml-1">
                      {products.length} Products
                    </span>
                  </div>

                  {/* Compact Description */}
                  <p className="text-ink-light text-[11px] leading-relaxed max-w-3xl -mt-1.5 mb-2">
                    {description}
                  </p>

                  {/* Sub-grid of every single product */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {products.map((prodName) => (
                      <Link
                        key={prodName}
                        href={getProductSlug(prodName)}
                        className="group bg-white border border-border-subtle hover:border-brand-blue/20 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer min-w-0"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-md bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors flex-shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-bold text-ink group-hover:text-brand-blue transition-colors truncate">
                            {prodName}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-ink-muted group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Show expanded category detail with split image header card for individual tabs */
            <div className="space-y-12 text-left">
              {filteredCategories.map(({ Icon, label, description, image, products }) => (
                <div key={label} className="space-y-8 animate-in fade-in duration-300">
                  {/* Category Header Card (Split Layout) */}
                  <div className="bg-white border border-border-subtle rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-5 items-center">
                    <div className="relative w-full md:w-[200px] aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-border-subtle/50 flex-shrink-0">
                      <Image
                        src={image}
                        alt={label}
                        fill
                        sizes="(max-w-768px) 100vw, 25vw"
                        className="object-cover"
                      />
                      <div className="absolute bottom-2.5 left-2.5 w-8 h-8 bg-white/95 backdrop-blur-sm border border-border-subtle/30 rounded-lg flex items-center justify-center shadow-md">
                        <Icon className="w-4.5 h-4.5 text-brand-blue" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 text-left w-full">
                      <h2 className="text-lg md:text-xl font-extrabold text-ink tracking-tight">
                        {label}
                      </h2>
                      <p className="text-ink-light text-xs sm:text-xs leading-relaxed max-w-2xl">
                        {description}
                      </p>
                      <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wider bg-slate-50 border border-border-subtle/50 px-2.5 py-0.5 rounded-full inline-block">
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {products.map((prodName) => (
                        <Link
                          key={prodName}
                          href={getProductSlug(prodName)}
                          className="group bg-white border border-border-subtle hover:border-brand-blue/20 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer min-w-0"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-md bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors flex-shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-bold text-ink group-hover:text-brand-blue transition-colors truncate">
                              {prodName}
                            </span>
                          </div>
                          <ArrowRight className="w-3 h-3 text-ink-muted group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
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
