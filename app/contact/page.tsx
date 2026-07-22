"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Sparkles, Compass, Clock, Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Instagram, Twitter, Facebook, Youtube } from "@/components/SocialIcons";
import Reveal from "@/components/Reveal";

const slides = [
  {
    title: "Visit Our Houston Storefront",
    description: "Located at 12111 Jones Road in Houston. Stop by for materials, consultation, and local print pickup.",
    image: "/Vinyl-Storefront.webp",
    tag: "STOREFRONT LOCATION",
    bgColor: "from-[#CBDCD3] to-[#b8cabf]" // Modern sage green
  },
  {
    title: "Interior Print Showroom",
    description: "Explore our collection of banner materials, custom decals, heat-transfer films, and premium print options.",
    image: "/Vinyl-Storefront-2.webp",
    tag: "IN-STORE SHOWROOM",
    bgColor: "from-[#ECC59E] to-[#deb38a]" // Warm sand/copper
  },
  {
    title: "State-of-the-Art Production",
    description: "Our local workshop runs high-precision Roland plotter cutters and direct-to-film printers for optimal quality.",
    image: "/Vinyl-Storefront-3.webp",
    tag: "LOCAL PRINT WORKSHOP",
    bgColor: "from-[#F4E2D2] to-[#e6d0bf]" // Warm white/cream
  }
];

const social = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function ContactPage() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleContactScroll = () => {
    const target = document.getElementById("contact-info-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <>
      {/* Hero Carousel Section */}
      <section 
        className="relative h-[500px] sm:h-[540px] md:h-[400px] lg:h-[440px] w-full overflow-hidden bg-slate-50 border-b border-border-subtle"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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
              
              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-4.5xl font-black text-black tracking-tight leading-[1.1] pt-4 md:pt-0">
                  {slide.title}
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-xs sm:text-sm md:text-sm text-slate-800 leading-relaxed max-w-md line-clamp-2 md:line-clamp-none mx-auto md:mx-0">
                  {slide.description}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="pt-1 flex flex-row justify-center md:justify-start">
                <button
                  onClick={handleContactScroll}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm cursor-pointer border-none"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Reveal>

              {/* Slider Pagination Dots */}
              <div className="flex gap-1.5 pt-2">
                {slides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrent(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                      dotIdx === current ? "w-5 bg-brand-blue" : "w-1.5 bg-slate-800/20 hover:bg-slate-800/40"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Storefront Photo */}
            <div className="w-full md:w-[55%] lg:w-[50%] h-[50%] md:h-full relative overflow-hidden bg-slate-900 z-10">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none z-20" />
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-slate-850 flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-105 border-none cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-slate-800" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev + 1) % slides.length);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-slate-850 flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-105 border-none cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-slate-800" />
        </button>
      </section>

      {/* Main Content Info Section */}
      <section id="contact-info-section" className="py-16 md:py-24 px-6 lg:px-12 bg-paper-cool min-h-screen">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Bento Bubble Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Contact Info & Map */}
            <div className="space-y-8">
              
              {/* Bubble 1: Contact Info */}
              <Reveal className="bg-white border border-border-subtle rounded-3xl p-8 shadow-sm shadow-ink/5 text-left space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-ink border-b border-border-subtle pb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-blue" />
                  Contact Details
                </h2>
                
                <div className="space-y-6">
                  {/* Visit Us */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-paper-cool border border-border-subtle rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-0.5">Visit Us</div>
                      <a 
                        href="https://maps.google.com/?q=12111+Jones+Road+Houston+Texas+77070" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-ink hover:text-brand-blue transition-colors text-sm md:text-base"
                      >
                        12111 Jones Road Houston, Texas 77070
                      </a>
                    </div>
                  </div>

                  {/* Call Us */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-paper-cool border border-border-subtle rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-0.5">Call Us</div>
                      <a 
                        href="tel:346-218-0615" 
                        className="font-bold text-ink hover:text-brand-blue transition-colors text-sm md:text-base"
                      >
                        346-218-0615
                      </a>
                    </div>
                  </div>

                  {/* Email Us */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-paper-cool border border-border-subtle rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-0.5">Email Us</div>
                      <a 
                        href="mailto:VinylSupplyMore@gmail.com" 
                        className="font-bold text-ink hover:text-brand-blue transition-colors text-sm md:text-base break-all"
                      >
                        VinylSupplyMore@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4 border-t border-border-subtle pt-6">
                    <div className="w-11 h-11 bg-paper-cool border border-border-subtle rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-0.5">Store Hours</div>
                      <div className="text-sm font-semibold text-ink leading-relaxed">
                        Monday - Friday: 9:00 AM - 6:00 PM <br />
                        Saturday: 10:00 AM - 4:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="flex items-center gap-3 pt-6 border-t border-border-subtle">
                  {social.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 border border-border-subtle rounded-full bg-white flex items-center justify-center text-ink-light hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* Bubble 2: Google Maps Embed */}
              <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 shadow-sm shadow-ink/5 text-left space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-ink text-sm uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-4 h-4 text-brand-blue" />
                    Map Location
                  </h3>
                  <a 
                    href="https://maps.google.com/?q=12111+Jones+Road+Houston+Texas+77070" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-brand-blue hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-border-subtle bg-paper-cool shadow-inner w-full h-[280px]">
                  <iframe
                    src="https://maps.google.com/maps?q=12111%20Jones%20Road%20Houston%20Texas%2077070&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Vinyl Supplies & More Houston location"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right Column: About Us & Storefront Gallery */}
            <div className="space-y-8">
              
              {/* Bubble 3: About Us */}
              <Reveal className="bg-white border border-border-subtle rounded-3xl p-8 shadow-sm shadow-ink/5 text-left space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-ink border-b border-border-subtle pb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-blue" />
                  About Our Shop
                </h2>
                <p className="text-sm md:text-base text-ink-light leading-relaxed">
                  At <strong>Vinyl Supplies & More</strong>, we provide Houston and the surrounding areas with professional-grade vinyl printing, custom decals, bulk apparel, and storefront window graphics.
                </p>
                <p className="text-sm md:text-base text-ink-light leading-relaxed">
                  Family-owned and locally operated, our workshop utilizes high-precision vinyl cutters and DTF heat-press systems to bring your concepts to life. We stand for ultimate alignment, rich color accuracy, and reliable 24–48hr turnaround times.
                </p>
              </Reveal>

              {/* Bubble 4: Storefront Gallery */}
              <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 shadow-sm shadow-ink/5 text-left space-y-6">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider flex items-center gap-2">
                  <Image src="/logo.png" alt="Vinyl Supplies & More" width={20} height={20} className="w-5 h-auto object-contain" />
                  Our Storefront
                </h3>
                
                {/* Photo Bento Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Large Top Image */}
                  <div className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden border border-border-subtle shadow-sm group">
                    <Image
                      src="/Vinyl-Storefront.webp"
                      alt="Vinyl Supplies & More Houston Storefront"
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* Bottom Left Image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border-subtle shadow-sm group">
                    <Image
                      src="/Vinyl-Storefront-2.webp"
                      alt="Vinyl Supplies & More interior print materials"
                      fill
                      sizes="(max-width: 768px) 50vw, 260px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* Bottom Right Image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border-subtle shadow-sm group">
                    <Image
                      src="/Vinyl-Storefront-3.webp"
                      alt="Vinyl Supplies & More plotter plotting room"
                      fill
                      sizes="(max-width: 768px) 50vw, 260px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}