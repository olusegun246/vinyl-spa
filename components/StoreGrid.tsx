"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { products, type Category } from "@/lib/products";

const filters: { label: string; value: "all" | Category }[] = [
  { label: "All Items", value: "all" },
  { label: "Banners & Signs", value: "banner" },
  { label: "Custom Apparel", value: "apparel" },
  { label: "Decals & Plotter Rolls", value: "decal" },
];

export default function StoreGrid() {
  const [active, setActive] = useState<"all" | Category>("all");

  const visible =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Catalog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            The <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">Store</span>
          </h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                active === f.value
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                  : "bg-white border border-border-medium text-ink-light hover:border-brand-blue/30 hover:text-brand-blue hover:bg-paper-cool"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {visible.map((product) => (
          <div
            key={product.id}
            className="product-card group bg-white rounded-3xl overflow-hidden border border-border-subtle hover:border-brand-blue/20 hover:shadow-2xl transition-all duration-500 cursor-pointer shadow-sm relative flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square overflow-hidden bg-paper-cool m-2 rounded-2xl border border-border-subtle/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="product-image object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm border border-border-subtle z-10">
                    {product.tag}
                  </span>
                )}
                <button
                  aria-label={`Add ${product.name} to bag`}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg shadow-brand-blue/25 hover:bg-brand-cyan-dark z-10 duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
              <div className="px-5 pt-3 pb-2">
                <div className="text-[10px] text-brand-cyan-dark font-bold uppercase tracking-wider mb-1">
                  {product.category}
                </div>
                <h3 className="font-bold text-base mb-1 text-ink group-hover:text-brand-blue transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-xs text-ink-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
            
            <div className="px-5 pb-5 pt-2 flex items-center justify-between mt-auto">
              <span className="text-xl font-black text-ink">${product.price}</span>
              <div className="flex items-center gap-0.5 text-brand-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
