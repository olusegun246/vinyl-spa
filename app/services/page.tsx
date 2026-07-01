import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { services, processSteps } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom vinyl printing services: banner printing, vehicle wraps, apparel printing, decals & stickers, event signage, and team merchandise. Fast 24–48hr turnaround.",
};

export default function ServicesPage() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="max-w-2xl mb-16">
          <div className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-3">
            What We Do
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Services built for <span className="italic font-light">your brand</span>
          </h1>
          <p className="text-lg text-gray-500">
            From single decals to full event packages, we handle every detail with precision and
            care.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="service-card group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-ink group-hover:text-white transition-all duration-500">
                <Icon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold mb-3">{title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm font-medium text-ink hover:gap-3 transition-all w-fit"
              >
                <span>Get a quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-24">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-3">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple <span className="italic font-light">process</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map(({ step, title, text }, i) => (
              <Reveal key={step} delay={i * 0.1} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-ink flex items-center justify-center text-xl font-bold">
                  {step}
                </div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
