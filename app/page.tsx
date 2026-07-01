import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Printer, Zap, ShieldCheck } from "lucide-react";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

const stats = [
  { value: "15K+", label: "Projects Printed" },
  { value: "500+", label: "Happy Clients" },
  { value: "48hr", label: "Avg. Turnaround" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center pb-16 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <Reveal className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-600">Now accepting custom orders</span>
            </div>
           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Vinyl Supply <span className="italic font-light">& More</span>
                
            </h1>
            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              Premium custom vinyl printing for businesses, teams, and events. From banners to
              apparel, we bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/store"
                className="group px-7 py-3.5 bg-ink text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 flex items-center gap-2"
              >
                Browse Store
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="px-7 py-3.5 border border-gray-200 text-ink font-medium rounded-full hover:bg-gray-50 transition-all"
              >
                Our Services
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-8">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <div className="text-3xl font-bold">{s.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                  </div>
                  {i < stats.length - 1 && <div className="w-px h-12 bg-gray-200" />}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right */}
          <Reveal delay={0.2} className="relative">
            <div className="relative aspect-[4/3] max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="https://picsum.photos/seed/vinylprinter/1024/768"
                alt="Professional vinyl printer in operation"
                fill
                sizes="(max-width: 1024px) 100vw, 512px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Printer className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Professional Grade Printing</div>
                    <div className="text-white/70 text-sm">State-of-the-art vinyl printers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 md:-left-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 floating-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Fast Turnaround</div>
                  <div className="text-xs text-gray-400">24-48hr Production</div>
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-4 -right-4 md:-right-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 floating-card"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Weatherproof</div>
                  <div className="text-xs text-gray-400">UV-Resistant Vinyl</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* Services preview */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-16">
            <div className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-3">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Services built for <span className="italic font-light">your brand</span>
            </h2>
            <p className="text-lg text-gray-500">
              From single decals to full event packages, we handle every detail with precision and
              care.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map(({ Icon, title, description }) => (
              <div
                key={title}
                className="service-card group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-ink group-hover:text-white transition-all duration-500">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
