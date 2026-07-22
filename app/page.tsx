"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

const slides = [
  {
    title: "Custom Banners & Signage",
    description: "Large-format weatherproof vinyl banners for promotions, storefronts, and outdoor events. Built to get noticed.",
    image: "/hero-vinyl.jpg",
    link: "/services/custom-banner-printing",
    linkText: "Shop Banners",
    tag: "WEATHERPROOF VINYL",
    bgColor: "from-[#ECC59E] to-[#deb38a]"
  },
  {
    title: "Premium Apparel Decals",
    description: "Vibrant Direct-to-Film transfer decals and custom graphics pressed on hoodies, tees, and sportswear.",
    image: "/apparel-vinyl.jpg",
    link: "/services/custom-tshirt-printing",
    linkText: "Shop Apparel",
    tag: "DTF TRANSFERS",
    bgColor: "from-[#F4E2D2] to-[#e6d0bf]"
  },
  {
    title: "Die-Cut Custom Stickers",
    description: "Weatherproof contour-cut vinyl decals in matte or gloss finishes. High resolution with clean release.",
    image: "/personal-vinyl.jpg",
    link: "/services/custom-stickers",
    linkText: "Shop Stickers",
    tag: "CONTOUR DECALS",
    bgColor: "from-[#CBDCD3] to-[#b8cabf]"
  }
];

const processSteps = [
  {
    number: "1",
    title: "Choose Your Product",
    desc: "Select from our top-selling catalog of banners, stickers, business cards, apparel, and mugs.",
    colorClass: "bg-brand-blue/10 text-brand-blue"
  },
  {
    number: "2",
    title: "Submit Your Design",
    desc: "Upload your print-ready PDF file or build it directly using our simple online template editor.",
    colorClass: "bg-brand-cyan/10 text-brand-cyan"
  },
  {
    number: "3",
    title: "Fast Production",
    desc: "Our print professionals review your file resolution, calibrate colors, and output your order.",
    colorClass: "bg-emerald-500/10 text-emerald-600"
  }
];

const bestSellers = [
  {
    title: "Vinyl Banners",
    tag: "Best Seller",
    image: "/hero-vinyl.jpg",
    slug: "custom-banner-printing",
    description: "Durable, weatherproof outdoor vinyl banners with nickel grommets. Built to get noticed."
  },
  {
    title: "Custom Stickers",
    tag: "Best Seller",
    image: "/personal-vinyl.jpg",
    slug: "custom-stickers",
    description: "Contour-cut vinyl decals in gloss or matte scratch-resistant finishes."
  },
  {
    title: "Custom T-Shirts",
    tag: "Popular",
    image: "/apparel-vinyl.jpg",
    slug: "custom-tshirt-printing",
    description: "Premium cotton tees printed with high-resolution DTF transfers."
  },
  {
    title: "Standard Business Cards",
    tag: "Essential",
    image: "/org-vinyl.jpg",
    slug: "standard-business-cards",
    description: "Chic, high-density cardstock business cards in matte or gloss finishes."
  },
  {
    title: "Embroidered Hats",
    tag: "Popular",
    image: "/hats-vinyl.jpg",
    slug: "embroidered-hats",
    description: "Custom caps and trucker hats with direct high-density embroidery."
  },
  {
    title: "Custom Ceramic Mugs",
    tag: "Best Seller",
    image: "/merch-vinyl.jpg",
    slug: "custom-ceramic-mugs",
    description: "Classic coffee mugs with vibrant wrap-around sublimation printing."
  }
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      setActiveStep((prev) => Math.min(prev + 1, processSteps.length - 1));
    }
    if (distance < -minSwipeDistance) {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const [heroTouchStart, setHeroTouchStart] = useState<number | null>(null);
  const [heroTouchEnd, setHeroTouchEnd] = useState<number | null>(null);

  const onHeroTouchStart = (e: React.TouchEvent) => {
    setHeroTouchEnd(null);
    setHeroTouchStart(e.targetTouches[0].clientX);
  };

  const onHeroTouchMove = (e: React.TouchEvent) => {
    setHeroTouchEnd(e.targetTouches[0].clientX);
  };

  const onHeroTouchEnd = () => {
    if (!heroTouchStart || !heroTouchEnd) return;
    const distance = heroTouchStart - heroTouchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    }
    if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <>
      <section 
        className="relative h-[500px] sm:h-[540px] md:h-[400px] lg:h-[440px] w-full overflow-hidden bg-slate-50 border-b border-border-subtle"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onHeroTouchStart}
        onTouchMove={onHeroTouchMove}
        onTouchEnd={onHeroTouchEnd}
      >
        {/* Soft grid mat overlay */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-[0.08] z-20" />

        {/* Slides */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex flex-col-reverse md:flex-row transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={idx !== current}
          >
            {/* Left Side: Wording & Background Color */}
            <div className={`w-full md:w-[45%] lg:w-[50%] h-[50%] md:h-full bg-gradient-to-br ${slide.bgColor} flex flex-col justify-center items-center md:items-start px-6 py-6 sm:px-12 lg:px-20 text-center md:text-left space-y-3.5 md:space-y-4 z-20 relative font-poppins`}>
              
              <Reveal delay={0.05}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight leading-[1.1]">
                  {slide.title}
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-xs sm:text-sm md:text-sm text-ink leading-relaxed max-w-md line-clamp-2 md:line-clamp-none mx-auto md:mx-0">
                  {slide.description}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="pt-1 flex flex-row justify-center md:justify-start gap-3">
                <Link
                  href={slide.link}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm"
                >
                  <span>{slide.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border-medium bg-white text-ink font-bold rounded-full hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm"
                >
                  Our Services
                </Link>
              </Reveal>

              {/* Slider Pagination Dots (Brought inside left-hand text column) */}
              <div className="flex gap-1.5 pt-2">
                {slides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrent(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                      dotIdx === current ? "w-5 bg-brand-blue" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Full-height Picture */}
            <div className="w-full md:w-[55%] lg:w-[50%] h-[50%] md:h-full relative overflow-hidden bg-slate-900 z-10">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="(max-w-768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-[6000ms] ease-out ${
                  idx === current ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Navigation Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full border border-white/20 bg-white/80 hover:bg-white text-ink shadow-md transition-all hover:scale-105 cursor-pointer hidden md:block"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full border border-white/20 bg-white/80 hover:bg-white text-ink shadow-md transition-all hover:scale-105 cursor-pointer hidden md:block"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      <Marquee />

      {/* How Our Process Works Section */}
      <section className="pt-12 pb-16 px-6 lg:px-12 bg-white relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Desktop Grid Layout (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 0.05} className="space-y-4 relative flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl ${step.colorClass} flex items-center justify-center font-black text-lg shadow-sm`}>
                  {step.number}
                </div>
                <h3 className="font-extrabold text-lg text-ink">{step.title}</h3>
                <p className="text-xs text-ink-light leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Mobile Swipeable Slider (hidden on desktop) */}
          <div className="md:hidden space-y-6 relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {processSteps.map((step, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4 flex flex-col items-center space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${step.colorClass} flex items-center justify-center font-black text-lg shadow-sm`}>
                    {step.number}
                  </div>
                  <h3 className="font-extrabold text-lg text-ink">{step.title}</h3>
                  <p className="text-xs text-ink-light leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Slider Pagination Indicator Dots */}
            <div className="flex justify-center gap-1.5 pt-2">
              {processSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                    i === activeStep ? "w-5 bg-brand-blue" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="pt-12 pb-16 px-6 lg:px-12 bg-[#F4E2D2]/15 relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-ink leading-tight">
                Best Selling Products
              </h2>
              <p className="text-sm md:text-base text-ink leading-relaxed">
                Explore our most popular, high-demand custom print products, crafted with precision quality and fast turnaround.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map(({ title, tag, image, slug }, i) => (
              <Reveal key={slug} delay={i * 0.05}>
                <Link
                  href={`/services/${slug}`}
                  className="group/card relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden flex flex-col justify-end p-5 sm:p-6 text-left border border-border-subtle shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-black"
                >
                  {/* Background product image */}
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-w-768px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                  
                  {/* Dark vignette overlay mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 group-hover/card:via-black/45 transition-colors duration-300" />
                  
                  {/* Overlaid contents (bottom-left) */}
                  <div className="relative z-10 space-y-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-white/10 border border-white/25 rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
                      {tag}
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight group-hover/card:text-brand-cyan transition-colors">
                      Shop {title}
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

          {/* Shop All Products Bottom Button */}
          <Reveal delay={0.2} className="flex justify-center pt-10">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 shadow-lg shadow-slate-950/10 hover:scale-[1.02] transition-all duration-300 text-sm"
            >
              <span>Shop all products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
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