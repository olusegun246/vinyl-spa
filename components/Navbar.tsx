"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-border-subtle shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group py-2">
          <Image
            src="/logo.png"
            alt="Vinyl Supplies & More"
            width={1081}
            height={200}
            priority
            className="h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link px-4 py-2 text-sm font-semibold transition-colors relative ${
                isActive(link.href) ? "active text-brand-blue" : "text-ink-light hover:text-brand-blue"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/store"
            className="ml-4 px-5 py-2.5 bg-brand-blue text-white text-sm font-semibold rounded-full hover:bg-brand-blue/90 shadow-md shadow-brand-blue/10 hover:shadow-lg hover:shadow-brand-blue/20 transition-all hover:scale-105 duration-300"
          >
            Shop Now
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border-subtle animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  isActive(link.href)
                    ? "bg-brand-blue/5 text-brand-blue"
                    : "text-ink-light hover:bg-paper-cool hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/store"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-brand-blue text-white text-sm font-semibold rounded-xl text-center shadow-md shadow-brand-blue/10 hover:bg-brand-blue/90"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
