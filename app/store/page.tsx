import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoreGrid from "@/components/StoreGrid";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop ready-to-order vinyl products: custom banners, retractable banner stands, team apparel, die-cut decals, vehicle magnets, and wall graphics.",
};

export default function StorePage() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <StoreGrid />

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Looking for a custom print?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105"
          >
            Get a Custom Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
