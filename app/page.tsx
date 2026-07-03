import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";
import HeroCarousel from "@/components/HeroCarousel";

export default function HomePage() {
  return (
    <>
      {/* Hero Carousel — full width, at the very top */}
      <HeroCarousel />

      {/* Hero Section — video background with title over it */}
      <section className="relative py-16 md:py-24 px-6 lg:px-12 overflow-hidden flex flex-col items-center justify-center text-center min-h-[45vh]">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/minimal-vinyl-bg.jpg"
        >
          <source src="/Printing-Machine-Hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
          {/* Heading */}
          <Reveal delay={0.05} className="mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-tight">
              Vinyl Supplies <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">& More</span>
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.1} className="mb-8 max-w-2xl">
            <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed">
              Industrial custom printing, banners, vehicle graphics, heat-transfer apparel decals, and high-performance plotting materials. Made to endure.
            </p>
          </Reveal>

          {/* Action buttons */}
          <Reveal delay={0.15} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/design"
              className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/95 transition-all shadow-xl shadow-brand-blue/30 flex items-center gap-2 hover:scale-[1.03] duration-300"
            >
              Design Online
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/25 transition-all bg-white/10 backdrop-blur-md hover:scale-[1.03] duration-300 shadow-lg shadow-black/10"
            >
              Our Services
            </Link>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* Services preview */}
      <section className="pt-20 pb-28 px-6 lg:px-12 bg-paper relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <Reveal className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-ink leading-tight">
                Services built for <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">your brand</span>
              </h2>
              <p className="text-base md:text-lg text-ink-light leading-relaxed">
                From precision custom decals and banners to custom T-shirts and merchandise, we execute every project with ultimate print alignment and vibrant accuracy.
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
            {services.map(({ title, tag, image, slug }, i) => (
              <Reveal key={slug} delay={i * 0.05}>
                <Link
                  href={`/services/${slug}`}
                  className="group/card relative aspect-[16/11] sm:aspect-square w-full rounded-3xl overflow-hidden flex flex-col justify-end p-8 text-left border border-border-subtle shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-black"
                >
                  {/* Background product image */}
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                  
                  {/* Dark vignette overlay mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 group-hover/card:via-black/45 transition-colors duration-300" />
                  
                  {/* Overlaid contents (bottom-left) */}
                  <div className="relative z-10 space-y-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-white/10 border border-white/25 rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
                      {tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight group-hover/card:text-brand-cyan transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white/70 uppercase tracking-widest pt-1 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Storefront & Contact Information Section */}
      <section className="pb-24 px-6 lg:px-12 bg-paper-cool border-t border-border-subtle relative">
        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Store Info Cards (Bento style) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-4">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Visit Our Shop</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-ink mb-2">
                  Come See Us in Houston
                </h2>
                <p className="text-sm md:text-base text-ink-light leading-relaxed mb-6">
                  Stop by our retail location on Jones Road to browse vinyl rolls, check out sample apparel, or collect your finished custom banners and decals.
                </p>
              </Reveal>

              {/* Information Bubble Card */}
              <Reveal delay={0.1} className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 space-y-4 shadow-sm shadow-ink/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ink-muted w-16 uppercase">Address:</span>
                    <a
                      href="https://maps.google.com/?q=12111+Jones+Road+Houston+Texas+77070"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-ink hover:text-brand-blue transition-colors flex-1"
                    >
                      12111 Jones Road Houston, TX 77070
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ink-muted w-16 uppercase">Phone:</span>
                    <a
                      href="tel:346-218-0615"
                      className="text-sm font-bold text-ink hover:text-brand-blue transition-colors"
                    >
                      346-218-0615
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ink-muted w-16 uppercase">Email:</span>
                    <a
                      href="mailto:VinylSupplyMore@gmail.com"
                      className="text-sm font-bold text-ink hover:text-brand-blue transition-colors break-all"
                    >
                      VinylSupplyMore@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3 border-t border-border-subtle pt-4 mt-2">
                    <span className="text-xs font-bold text-ink-muted w-16 uppercase mt-0.5">Hours:</span>
                    <div className="text-xs font-semibold text-ink-light leading-relaxed">
                      Mon - Fri: 9am - 6pm <br />
                      Sat: 10am - 4pm
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Storefront Photos Bento Grid */}
            <div className="lg:col-span-7">
              <Reveal delay={0.2} className="grid grid-cols-2 gap-4">
                {/* Large main photo */}
                <div className="col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden border border-border-subtle shadow-md group bg-paper-cool">
                  <Image
                    src="/Vinyl-Storefront.webp"
                    alt="Vinyl Supplies & More Storefront View"
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                {/* Bottom left */}
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border-subtle shadow-md group bg-paper-cool">
                  <Image
                    src="/Vinyl-Storefront-2.webp"
                    alt="Vinyl Supplies & More interior inventory"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                {/* Bottom right */}
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border-subtle shadow-md group bg-paper-cool">
                  <Image
                    src="/Vinyl-Storefront-3.webp"
                    alt="Vinyl Supplies & More workspace"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}