"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star } from "lucide-react";
import { products, type Category } from "@/lib/products";

const filters: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "Banners", value: "banner" },
  { label: "Apparel", value: "apparel" },
  { label: "Decals", value: "decal" },
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
          <div className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-3">
            Shop
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="italic font-light">Store</span>
          </h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                active === f.value
                  ? "bg-ink text-white"
                  : "bg-white border border-gray-200 text-ink hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visible.map((product) => (
          <div
            key={product.id}
            className="product-card group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="product-image object-cover"
              />
              {product.tag && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-white text-ink text-xs font-medium rounded-full shadow-sm z-10">
                  {product.tag}
                </span>
              )}
              <button
                aria-label={`Add ${product.name} to bag`}
                className="absolute bottom-3 right-3 w-10 h-10 bg-ink text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {product.category}
              </div>
              <h3 className="font-semibold text-base mb-1">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
