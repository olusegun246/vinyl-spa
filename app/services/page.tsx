import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ServicesList from "@/components/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom vinyl printing services: banner printing, vehicle wraps, apparel printing, decals & stickers, event signage, and team merchandise. Fast 24–48hr turnaround.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Services Split Hero - matching the style of the homepage hero */}
      <section className="relative h-[360px] sm:h-[400px] lg:h-[440px] w-full overflow-hidden bg-slate-50 border-b border-border-subtle">
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {/* Left Side: Wording & Background Color */}
          <div className="w-full md:w-[45%] lg:w-[50%] h-[55%] md:h-full bg-gradient-to-br from-[#c86b51] to-[#a3523b] flex flex-col justify-center px-6 py-6 sm:px-12 lg:px-20 text-left space-y-3.5 md:space-y-4 z-20 relative">
            <Reveal delay={0.05}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.1]">
                Services built for <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">your brand</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-xs sm:text-sm md:text-sm text-white/80 leading-relaxed max-w-md">
                Custom banners, decals, apparel, and bulk merchandise—crafted with ultimate precision and quality.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="pt-1 flex flex-row gap-3">
              <Link
                href="/design"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-blue/90 shadow-md shadow-brand-blue/15 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm"
              >
                <span>Design Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/25 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm"
              >
                Get a Quote
              </Link>
            </Reveal>
          </div>

          {/* Right Side: Full-height Embroidery Video */}
          <div className="w-full md:w-[55%] lg:w-[50%] h-[45%] md:h-full relative overflow-hidden bg-slate-900 z-10">
            <video
              src="/embroidery-video.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Interactive Category List Grid & Filters (Option A) */}
      <ServicesList />
    </>
  );
}