import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed video background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-vinyl.jpg"
        >
          <source src="/Printing-Machine-Hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />

        {/* Content over the video */}
        <div className="relative z-10 w-full px-6 lg:px-12 flex justify-center py-20">

          {/* White bubble containing title + subtitle + buttons */}
          <Reveal delay={0.05} className="w-full max-w-2xl lg:max-w-3xl">
           <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 px-6 py-8 md:px-8 md:py-10 flex flex-col items-center text-center">

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-ink leading-tight mb-4">
                Vinyl Supplies <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">& More</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-ink-light leading-relaxed mb-8 max-w-xl">
                Industrial custom printing, banners, vehicle graphics, heat-transfer apparel decals, and high-performance plotting materials. Made to endure.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/store"
                  className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/10 flex items-center gap-2 hover:scale-[1.03] duration-300"
                >
                  Browse Store
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 border border-border-medium text-ink font-semibold rounded-full hover:bg-paper-cool transition-all hover:scale-[1.03] duration-300"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* Services preview */}
      <section className="pt-12 pb-28 px-6 lg:px-12 bg-paper relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <Reveal className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-ink">
                Services built for <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">your brand</span>
              </h2>
              <p className="text-lg text-ink-light leading-relaxed">
                From precision custom decals to full vehicle wraps, we execute every project with ultimate print alignment and vibrant accuracy.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex-shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/90 transition-all shadow-md hover:scale-105"
              >
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map(({ Icon, title, description }) => (
              <div
                key={title}
                className="service-card bg-paper-cool border border-border-subtle rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white border border-border-subtle rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-ink">{title}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}