import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Sparkles, Compass, Clock, Globe } from "lucide-react";
import { Instagram, Twitter, Facebook, Youtube } from "@/components/SocialIcons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact & About Us",
  description:
    "Visit Vinyl Supplies & More in Houston, Texas. High-quality banner, apparel, and decal printing. Fast 24-48hr turnaround.",
};

const social = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 bg-paper-cool grid-bg min-h-screen">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Page Header */}
        <Reveal className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Connect With Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 text-ink leading-none">
            About & Contact
          </h1>
          <p className="text-base md:text-lg text-ink-light leading-relaxed">
            Visit our Houston store location for materials, pickup custom banners and decals, or email us your vector design files directly.
          </p>
        </Reveal>

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
                At **Vinyl Supplies & More**, we provide Houston and the surrounding areas with professional-grade vinyl printing, custom decals, bulk apparel, and storefront window graphics.
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
  );
}