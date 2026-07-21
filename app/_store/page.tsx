import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import StoreGrid from "@/components/StoreGrid";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop ready-to-order vinyl products: custom banners, retractable banner stands, team apparel, die-cut decals, vehicle magnets, and wall graphics.",
};

export default function StorePage() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-paper to-paper-cool/30 grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        <StoreGrid />

        <div className="mt-20 text-center bg-white/70 backdrop-blur-md border border-border-subtle rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Tailored Print</span>
          </div>
          <h3 className="text-2xl font-bold text-ink mb-2">Need a custom dimension or design?</h3>
          <p className="text-ink-light mb-6 text-sm">We provide completely custom widths, contour cuts, and premium material substrates matching your business specifications.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/90 shadow-md shadow-brand-blue/10 hover:shadow-lg hover:shadow-brand-blue/20 transition-all hover:scale-105 duration-300"
          >
            Get a Custom Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}