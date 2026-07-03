"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Slide {
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const slides: Slide[] = [
  {
    image: "/hero-vinyl.jpg",
    category: "Banners",
    title: "Custom Banner Printing",
    description: "Weatherproof vinyl banners for retail grand openings, promotions, and outdoor events.",
    link: "/services/custom-banner-printing",
    linkText: "Order Custom Banners",
  },
  {
    image: "/merch-vinyl.jpg",
    category: "Merchandise",
    title: "Custom Merchandise",
    description: "Branded corporate gifts, customized mugs, keychains, and high-quality printed accessories.",
    link: "/services/custom-merchandise",
    linkText: "Order Custom Merch",
  },
  {
    image: "/window-vinyl.jpg",
    category: "Window Vinyl",
    title: "Custom Window Graphics",
    description: "Perforated window film, frosted privacy glass, and contour cut retail window lettering.",
    link: "/services/custom-window-graphics",
    linkText: "Order Window Graphics",
  },
  {
    image: "/personal-vinyl.jpg",
    category: "Stickers",
    title: "Custom Stickers & Decals",
    description: "Die-cut weatherproof vinyl decals and stickers in any shape, matte or gloss laminates.",
    link: "/services/custom-stickers",
    linkText: "Order Stickers",
  },
  {
    image: "/apparel-vinyl.jpg",
    category: "Apparel",
    title: "Custom T-shirt Printing",
    description: "Premium apparel prints. High-resolution vinyl film and custom DTF graphics for shirts and hoodies.",
    link: "/services/custom-tshirt-printing",
    linkText: "Order Custom Tees",
  },
  {
    image: "/org-vinyl.jpg",
    category: "Bulk Apparel",
    title: "Custom Organizational T-shirts",
    description: "Bulk orders for community clubs, schools, church groups, sports teams, and company events.",
    link: "/services/custom-organizational-tshirts",
    linkText: "Order Bulk Tees",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-play cycling
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(handleNext, 7000);
    return () => clearInterval(interval);
  }, [paused, handleNext]);

  return (
    <div
      className="relative w-full bg-white border-b border-border-subtle shadow-sm z-20 overflow-hidden group h-[100px] md:h-[80px] flex flex-col justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Service Categories Showcase"
    >
      {/* Blue radial glow, top-right corner */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

      {/* Slides Container */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`w-full h-full px-6 md:px-16 flex items-center gap-4 transition-all duration-700 ease-in-out absolute inset-0 ${
            idx === current
              ? "opacity-100 scale-100 translate-x-0 z-10"
              : "opacity-0 scale-95 translate-x-8 pointer-events-none z-0"
          }`}
          aria-hidden={idx !== current}
        >
          {/* Image thumbnail */}
          <div className="flex-shrink-0">
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-border-subtle bg-paper-cool shadow-sm">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="60px"
                priority={idx === 0}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start text-left min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-blue/5 border border-brand-blue/10 rounded-full text-[9px] font-bold text-brand-blue uppercase tracking-wider">
                <span className="w-1 h-1 rounded-full bg-brand-blue animate-pulse" />
                {slide.category}
              </div>
              <h2 className="text-sm md:text-base font-bold text-ink leading-none truncate">
                {slide.title}
              </h2>
            </div>
            <p className="text-[11px] md:text-xs text-ink-light leading-snug line-clamp-1 w-full">
              {slide.description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0 hidden sm:block">
            <Link
              href={slide.link}
              className="group/btn px-4 py-1.5 bg-brand-blue text-white text-xs font-semibold rounded-full hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/10 flex items-center gap-1 hover:scale-[1.02] duration-300 whitespace-nowrap"
            >
              {slide.linkText}
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      ))}

      {/* Left/Right Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full border border-border-subtle bg-white text-ink shadow-md hover:bg-paper-cool transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full border border-border-subtle bg-white text-ink shadow-md hover:bg-paper-cool transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group/dot relative h-1 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
            style={{ width: idx === current ? "24px" : "8px" }}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === current ? "true" : undefined}
          >
            <span className="absolute inset-0 bg-border-medium group-hover/dot:bg-ink-muted rounded-full" />
            <span
              className={`absolute top-0 left-0 h-full bg-brand-blue rounded-full transition-all ${
                idx === current ? "w-full" : "w-0"
              }`}
              style={{
                transitionDuration: idx === current && !paused ? "7000ms" : "300ms",
                transitionTimingFunction: "linear",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}