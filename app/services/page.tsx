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
      <section className="relative h-[500px] sm:h-[540px] md:h-[400px] lg:h-[440px] w-full overflow-hidden bg-slate-50 border-b border-border-subtle">
        <div className="absolute inset-0 flex flex-col-reverse md:flex-row">
          {/* Left Side: Wording & Background Color */}
          <div className="w-full md:w-[45%] lg:w-[50%] h-[50%] md:h-full bg-gradient-to-br from-[#F4D7CD] to-[#e3c2b8] flex flex-col justify-center items-center md:items-start px-6 py-6 sm:px-12 lg:px-20 text-center md:text-left space-y-3.5 md:space-y-4 z-20 relative">
            <Reveal delay={0.05}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight leading-[1.1]">
                Services built for your brand
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-xs sm:text-sm md:text-sm text-ink leading-relaxed max-w-md mx-auto md:mx-0">
                Custom banners, decals, apparel, and bulk merchandise—crafted with ultimate precision and quality.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="pt-1 flex flex-row justify-center md:justify-start gap-3">
              <Link
                href="/design"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm"
              >
                <span>Design Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#services-list-section"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border-medium bg-white text-ink font-bold rounded-full hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm cursor-pointer"
              >
                Explore Services
              </a>
            </Reveal>
          </div>

          {/* Right Side: Full-height Embroidery Video */}
          <div className="w-full md:w-[55%] lg:w-[50%] h-[50%] md:h-full relative overflow-hidden bg-slate-900 z-10">
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