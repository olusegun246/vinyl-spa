"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/design", label: "Design Online" },
  { href: "/contact", label: "Contact" },
];

export const getProductSlug = (name: string) => {
  const lower = name.toLowerCase();
  if (lower === "vinyl banners" || lower === "banners" || lower === "all banners") return "/services/custom-banner-printing";
  if (lower === "custom stickers" || lower === "all stickers" || lower === "die-cut stickers") return "/services/custom-stickers";
  if (lower === "custom apparel" || lower === "company apparel") return "/services/custom-tshirt-printing";
  if (lower === "window clings" || lower === "window decals") return "/services/custom-window-graphics";
  if (lower === "silk presentation folders" || lower === "presentation folders") return "/services/custom-organizational-tshirts";
  return `/services/${lower.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
};

const categories = [
  {
    label: "Marketing Materials",
    displayLabel: "Marketing Materials",
    cols: 3,
    products: [
      { name: "Booklets", href: "/services" },
      { name: "Brochures", href: "/services" },
      { name: "Business Flyers", href: "/services" },
      { name: "Calendars", href: "/services" },
      { name: "Catalogs", href: "/services" },
      { name: "Club Flyers", href: "/services" },
      { name: "Comp Cards", href: "/services" },
      { name: "Custom Flyers", href: "/services" },
      { name: "Die Cut Printing", href: "/services" },
      { name: "Direct Mail", href: "/services" },
      { name: "Door Hangers", href: "/services" },
      { name: "Every Door Direct Mail", href: "/services" },
      { name: "Event Flyers", href: "/services" },
      { name: "Flyers", href: "/services" },
      { name: "Folded Cards", href: "/services" },
      { name: "Greeting Cards", href: "/services" },
      { name: "Invitations", href: "/services" },
      { name: "Magnets", href: "/services" },
      { name: "Mailing Flyers", href: "/services" },
      { name: "Menus", href: "/services" },
      { name: "Postcards", href: "/services" },
      { name: "Rack Cards", href: "/services" },
      { name: "Roll Stickers", href: "/services/custom-stickers" },
      { name: "Sell Sheets", href: "/services" },
      { name: "Sticker Sheets", href: "/services/custom-stickers" },
      { name: "Table Tents", href: "/services" },
      { name: "Take Out Menus", href: "/services" },
      { name: "Vinyl Banners", href: "/services/custom-banner-printing" }
    ]
  },
  {
    label: "Business Essentials",
    displayLabel: "Business Essentials",
    cols: 3,
    products: [
      { name: "Appointment Cards", href: "/services" },
      { name: "Business Cards", href: "/services" },
      { name: "Business Flyers", href: "/services" },
      { name: "Carbonless Forms", href: "/services" },
      { name: "Catalogs", href: "/services" },
      { name: "Direct Mail", href: "/services" },
      { name: "Every Door Direct Mail", href: "/services" },
      { name: "Envelopes", href: "/services" },
      { name: "Flyers", href: "/services" },
      { name: "Key Card Holders", href: "/services" },
      { name: "Letterhead", href: "/services" },
      { name: "Loyalty Cards", href: "/services" },
      { name: "Mailing Flyers", href: "/services" },
      { name: "Mailing Services", href: "/services" },
      { name: "Plastic Business Cards", href: "/services" },
      { name: "Postcards", href: "/services" },
      { name: "Presentation Folders", href: "/services" },
      { name: "Rack Cards", href: "/services" },
      { name: "Round Business Cards", href: "/services" },
      { name: "Self-Seal Envelopes", href: "/services" },
      { name: "Sell Sheets", href: "/services" },
      { name: "Silk Presentation Folders", href: "/services" },
      { name: "Square Business Cards", href: "/services" },
      { name: "Standard Business Cards", href: "/services" },
      { name: "Roll Stickers", href: "/services/custom-stickers" },
      { name: "Sticker Sheets", href: "/services/custom-stickers" },
      { name: "Custom Boxes", href: "/services" },
      { name: "Packaging Tape", href: "/services" },
      { name: "Company Apparel", href: "/services/custom-tshirt-printing" }
    ]
  },
  {
    label: "Boxes & Packaging",
    displayLabel: "Boxes & Packaging",
    cols: 2,
    products: [
      { name: "Custom Boxes", href: "/services" },
      { name: "Custom Pouches", href: "/services" },
      { name: "Mailer Boxes", href: "/services" },
      { name: "Product Boxes", href: "/services" },
      { name: "Shipping Boxes", href: "/services" },
      { name: "Packaging Tape", href: "/services" },
      { name: "Product Labels", href: "/services/custom-stickers" },
      { name: "Hang Tags", href: "/services" },
      { name: "Header Cards", href: "/services" },
      { name: "Paper Bags", href: "/services" },
      { name: "Mailer Envelopes", href: "/services" },
      { name: "Tissue Paper", href: "/services" },
      { name: "Wrapping Paper", href: "/services" },
      { name: "All Packaging", href: "/services" }
    ]
  },
  {
    label: "Label and Stickers",
    displayLabel: "Label and Stickers",
    cols: 3,
    products: [
      { name: "Custom Stickers", href: "/services/custom-stickers" },
      { name: "Roll Stickers", href: "/services/custom-stickers" },
      { name: "Sticker Sheets", href: "/services/custom-stickers" },
      { name: "Bumper Stickers", href: "/services/custom-stickers" },
      { name: "Clear Stickers", href: "/services/custom-stickers" },
      { name: "Vinyl Stickers", href: "/services/custom-stickers" },
      { name: "Metallic Stickers", href: "/services/custom-stickers" },
      { name: "Oval Stickers", href: "/services/custom-stickers" },
      { name: "Rectangle Stickers", href: "/services/custom-stickers" },
      { name: "Round Stickers", href: "/services/custom-stickers" },
      { name: "Square Stickers", href: "/services/custom-stickers" },
      { name: "Die-Cut Stickers", href: "/services/custom-stickers" },
      { name: "Custom Labels", href: "/services/custom-stickers" },
      { name: "Product Labels", href: "/services/custom-stickers" },
      { name: "Food Labels", href: "/services/custom-stickers" },
      { name: "Water Bottle Labels", href: "/services/custom-stickers" },
      { name: "Wine Labels", href: "/services/custom-stickers" },
      { name: "Beer Labels", href: "/services/custom-stickers" },
      { name: "Jar Labels", href: "/services/custom-stickers" },
      { name: "Hand Sanitizer Labels", href: "/services/custom-stickers" },
      { name: "Hand Sanitizer Stickers", href: "/services/custom-stickers" },
      { name: "DTF Transfers", href: "/services/custom-tshirt-printing" },
      { name: "Return Address Labels", href: "/services/custom-stickers" },
      { name: "Reflective Stickers", href: "/services/custom-stickers" },
      { name: "Label Sets", href: "/services/custom-stickers" },
      { name: "All Labels", href: "/services/custom-stickers" },
      { name: "All Stickers", href: "/services/custom-stickers" }
    ]
  },
  {
    label: "Banner & Signs",
    displayLabel: "Banner & Signs",
    cols: 3,
    products: [
      { name: "A-Frame Signs", href: "/services" },
      { name: "Aluminum Signs", href: "/services" },
      { name: "Backdrops", href: "/services" },
      { name: "Banners", href: "/services/custom-banner-printing" },
      { name: "Canvas Prints", href: "/services" },
      { name: "Car Magnets", href: "/services" },
      { name: "Deluxe Retractable Banners", href: "/services" },
      { name: "Fabric Banners", href: "/services/custom-banner-printing" },
      { name: "Feather Flags", href: "/services" },
      { name: "Mesh Banners", href: "/services/custom-banner-printing" },
      { name: "Mounted Posters", href: "/services" },
      { name: "Pole Banners", href: "/services" },
      { name: "Posters", href: "/services" },
      { name: "Retractable Banners", href: "/services" },
      { name: "Rolled Canvas", href: "/services" },
      { name: "Stretched Canvas", href: "/services" },
      { name: "Teardrop Flags", href: "/services" },
      { name: "Vinyl Banners", href: "/services/custom-banner-printing" },
      { name: "Wall Decals", href: "/services" },
      { name: "Window Clings", href: "/services/custom-window-graphics" },
      { name: "Window Decals", href: "/services/custom-window-graphics" },
      { name: "X-Banners", href: "/services" },
      { name: "Yard Signs", href: "/services" },
      { name: "All Banners", href: "/services/custom-banner-printing" },
      { name: "All Signs", href: "/services" }
    ]
  },
  {
    label: "Promotional Items",
    displayLabel: "Promotional Items",
    cols: 2,
    products: [
      { name: "Custom Apparel", href: "/services/custom-tshirt-printing" },
      { name: "Embroidered Hats", href: "/services/custom-tshirt-printing" },
      { name: "Branded Drinkware", href: "/services/custom-merchandise" },
      { name: "Custom Ceramic Mugs", href: "/services/custom-merchandise" },
      { name: "Laser Engraved Tumblers", href: "/services/custom-merchandise" },
      { name: "Tote Bags", href: "/services/custom-merchandise" },
      { name: "Notebooks & Agendas", href: "/services/custom-merchandise" },
      { name: "Keychains & Lanyards", href: "/services/custom-merchandise" },
      { name: "Logo Pens", href: "/services/custom-merchandise" },
      { name: "All Promotional Items", href: "/services/custom-merchandise" }
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white border-b border-border-subtle shadow-sm transition-all duration-300">
      
      {/* Tier 1: Logo & Utility links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center group py-1.5">
          <Image
            src="/logo.png"
            alt="Vinyl Supplies & More"
            width={1081}
            height={200}
            priority
            className="h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop nav utilities */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link px-4 py-2 text-xs lg:text-sm font-semibold transition-colors relative ${
                isActive(link.href) ? "active text-brand-blue" : "text-ink-light hover:text-brand-blue"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/gallery"
            className={`nav-link px-4 py-2 text-xs lg:text-sm font-semibold transition-colors relative ${
              isActive("/gallery") ? "active text-brand-blue" : "text-ink-light hover:text-brand-blue"
            }`}
          >
            Our Work
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2 text-ink hover:text-brand-blue transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Tier 2: Product Categories & Dropdown Menus */}
      <div className="bg-ink text-white hidden md:block border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-center h-10">
          
          {/* Categories Horizontal Stack */}
          <div className="flex items-center justify-center gap-1 lg:gap-2 w-full">
            {categories.map((cat, idx) => {
              let alignClass = "left-1/2 -translate-x-1/2";
              if (idx === 0) {
                alignClass = "left-0";
              } else if (idx === 1) {
                alignClass = "left-[-60px]";
              } else if (idx === 2) {
                alignClass = "left-[-80px]";
              } else if (idx === 3) {
                alignClass = "right-[-120px] left-auto";
              } else if (idx === 4) {
                alignClass = "right-[-60px] left-auto";
              } else if (idx === 5) {
                alignClass = "right-0 left-auto";
              }

              return (
                <div key={cat.label} className="relative group/menu py-2.5">
                  
                  {/* Category button */}
                  <button className="flex items-center gap-1 px-3 py-1 text-[11px] lg:text-xs font-extrabold text-white hover:bg-white/10 border border-transparent rounded-lg transition-all duration-300 cursor-pointer">
                    <span>{cat.displayLabel}</span>
                    <span className="text-[8px] text-white group-hover/menu:rotate-180 transition-transform duration-300">▼</span>
                  </button>

                  {/* Hover Dropdown Menu Overlay - Multi-column grid */}
                  <div className={`absolute top-[95%] bg-white border border-border-subtle rounded-2xl shadow-xl p-4 opacity-0 scale-95 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:scale-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300 z-50 text-ink ${alignClass} ${
                    cat.cols === 3 ? "w-[580px]" : "w-[400px]"
                  }`}>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-extrabold text-ink-muted uppercase tracking-wider px-2.5 pb-2 border-b border-border-subtle/50 mb-2.5 block text-left">
                        {cat.label}
                      </span>
                      
                      {/* Multi-column Grid wrapper */}
                      <div className={`grid gap-x-4 gap-y-1.5 ${cat.cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                        {cat.products.map((prod) => (
                          <Link
                            key={prod.name}
                            href={getProductSlug(prod.name)}
                            className="px-2 py-0.5 text-[11px] font-semibold text-ink-light hover:text-brand-blue hover:bg-slate-50 rounded-md transition-all block text-left truncate"
                          >
                            {prod.name}
                          </Link>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}

            {/* View all products button (Moved in-line with the other category buttons) */}
            <div className="py-2.5">
              <Link
                href="/services"
                className="flex items-center gap-1 px-3 py-1 text-[11px] lg:text-xs font-extrabold text-white/95 hover:text-white hover:bg-white/10 border border-white/20 rounded-lg transition-all duration-300 cursor-pointer ml-2 bg-white/5"
              >
                View all products
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border-subtle animate-in fade-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left block ${
                  isActive(link.href)
                    ? "bg-brand-blue/5 text-brand-blue"
                    : "text-ink-light hover:bg-paper-cool hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left block ${
                isActive("/gallery")
                  ? "bg-brand-blue/5 text-brand-blue"
                  : "text-ink-light hover:bg-paper-cool hover:text-brand-blue"
              }`}
            >
              Our Work
            </Link>

            {/* Mobile Categories accordion */}
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <span className="text-[10px] font-extrabold text-ink-muted uppercase tracking-wider px-4 mb-2.5 block text-left">
                Product Categories
              </span>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <div key={cat.label} className="w-full">
                    <div className="px-4 py-1 text-xs font-bold text-ink-light text-left">
                      {cat.displayLabel}
                    </div>
                    <div className="pl-6 mt-1 flex flex-col gap-1.5 border-l border-border-subtle ml-4">
                      {cat.products.map((prod) => (
                        <Link
                          key={prod.name}
                          href={getProductSlug(prod.name)}
                          onClick={() => setOpen(false)}
                          className="py-1 text-xs text-ink-muted hover:text-brand-blue text-left block"
                        >
                          {prod.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}