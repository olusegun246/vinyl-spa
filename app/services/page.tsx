import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { services, processSteps } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom vinyl printing services: banner printing, vehicle wraps, apparel printing, decals & stickers, event signage, and team merchandise. Fast 24–48hr turnaround.",
};

export default function ServicesPage() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#f1f5f9] min-h-screen grid-bg relative overflow-hidden">
      {/* Top Header Ambient radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Soft Brand Ambient radial glows (Starts below hero) */}
      <div className="absolute top-[480px] right-0 w-[700px] h-[700px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none translate-x-1/4" />
      <div className="absolute bottom-[200px] left-0 w-[600px] h-[600px] bg-brand-cyan/15 rounded-full blur-[120px] pointer-events-none -translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <Reveal className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-tight">
              Services built for <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">your brand</span>
            </h1>
            <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
              Custom banners, decals, apparel, and bulk merchandise—crafted with ultimate precision and quality.
            </p>
          </Reveal>

          {/* Right Column: Autoplay Printing video */}
          <Reveal delay={0.2} className="lg:col-span-5 w-full">
             <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-xl shadow-black/40 group">
              <video
                src="/Printing-Machine-Hero-2.mp4"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ Icon, title, description, tag, slug, machineVideo }) => (
            <div
              key={title}
              className="group/card bg-white border border-border-subtle rounded-3xl p-6 hover:shadow-xl hover:shadow-ink/5 hover:border-brand-blue/20 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden"
            >
              {/* Media Container with Autoplay Video */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 mb-5 border border-border-subtle/50 shadow-inner">
                {machineVideo ? (
                  <video
                    src={machineVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white/50 text-[10px]">
                    No Video Preview
                  </div>
                )}
                {/* Category Tag overlay on top-right */}
                <div className="absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-bold text-brand-cyan uppercase tracking-widest">
                  {tag}
                </div>
                {/* Symbol Container overlay on bottom-left */}
                <div className="absolute bottom-3 left-3 w-9 h-9 bg-white/95 backdrop-blur-sm border border-border-subtle/30 rounded-xl flex items-center justify-center shadow-md">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-lg font-extrabold mb-2.5 text-ink group-hover/card:text-brand-blue transition-colors duration-300 tracking-tight">
                {title}
              </h2>
              
              <p className="text-ink-light text-[12px] leading-relaxed mb-5 flex-1">{description}</p>
              
              {/* View Details Link */}
              <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-blue hover:text-brand-blue/80 transition-colors"
              >
                <span>View Process & Specs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mt-32">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black leading-tight">
              Our Simple <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">Process</span>
            </h2>
          </Reveal>

          {/* Workflow Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map(({ step, title, text }, i) => (
              <Reveal key={step} delay={i * 0.1} className="relative bg-white rounded-3xl p-8 border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300">
                {/* Connecting track (hidden on mobile, visible on desktop between steps) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-[52px] left-[100px] w-full h-[2px] bg-border-subtle -z-10" />
                )}
                
                {/* Step Circle indicator */}
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-brand-blue/20">
                  {step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-ink">{title}</h3>
                <p className="text-sm text-ink-light leading-relaxed">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Custom CTA Block */}
        <Reveal delay={0.2} className="mt-32">
          <div className="bg-gradient-to-r from-[#0d1326] via-[#090d16] to-[#0d1326] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-xl shadow-ink/10">
            {/* Ambient circular glow background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
              <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Custom Orders welcome
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                Have a Custom Print Project?
              </h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
                We accommodate bulk orders, specialized dimensions, and custom decals tailored exactly to your brand specs. Get a responsive estimate.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/95 transition-all shadow-lg shadow-brand-blue/30 hover:scale-105 duration-300"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
