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
    <section className="py-24 px-6 lg:px-12 bg-paper-cool grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <Reveal className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Capabilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-ink">
            Services built for <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">your brand</span>
          </h1>
          <p className="text-lg text-ink-light leading-relaxed">
            From single decals to full corporate event packages, we handle every detail with ultimate precision, color matching, and premium finish quality.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="service-card premium-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="w-14 h-14 bg-paper-cool border border-border-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                <Icon className="w-7 h-7 text-brand-blue" />
              </div>
              <h2 className="text-xl font-bold mb-3 text-ink">{title}</h2>
              <p className="text-ink-light text-sm leading-relaxed mb-6">{description}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-cyan-dark hover:gap-3 transition-all"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-28">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full mb-4">
              <span className="text-[10px] font-bold text-brand-cyan-dark uppercase tracking-widest">Workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
              Our Simple <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">Process</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map(({ step, title, text }, i) => (
              <Reveal key={step} delay={i * 0.1} className="relative bg-white rounded-3xl p-8 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-brand-blue/20">
                  {step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-ink">{title}</h3>
                <p className="text-sm text-ink-light leading-relaxed">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
