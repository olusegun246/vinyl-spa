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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
            <Link href="/" className="flex items-center group">
            <Image
            src="/logo.png"
            alt="Vinyl Supply & More"
            width={1081}
            height={200}
            priority
            className="h-9 md:h-10 w-auto"
         />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link px-4 py-2 text-sm font-medium transition-colors relative ${
                isActive(link.href) ? "active text-ink" : "text-gray-500 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/store"
            className="ml-4 px-5 py-2.5 bg-ink text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50 ${
                  isActive(link.href) ? "text-ink" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/store"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-ink text-white text-sm font-medium rounded-lg text-center"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
