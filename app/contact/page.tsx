import type { Metadata } from "next";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { Instagram, Twitter, Facebook, Youtube } from "@/components/SocialIcons";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vinyl Supplies & More for a custom vinyl printing quote. We respond within 24 hours.",
};

const contactInfo = [
  { Icon: Mail, label: "Email Us", value: "hello@vinylsuppliesandmore.com" },
  { Icon: Phone, label: "Call Us", value: "+1 (555) 010-2024" },
  { Icon: MapPin, label: "Visit Us", value: "128 Supply Way, Brooklyn, NY 11201" },
];

const social = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function ContactPage() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-paper-cool grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Connect</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-ink">
              Let&apos;s make
              <br />
              something <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">bold</span>
            </h1>
            <p className="text-lg text-ink-light mb-10 leading-relaxed">
              Have a project in mind? Fill out the form and our design team will get back to you within 24 hours with an estimate and custom proof options.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-border-subtle rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm text-brand-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">{label}</div>
                    <div className="font-semibold text-ink">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-10">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 border border-border-medium rounded-full bg-white flex items-center justify-center text-ink-light hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Right */}
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
