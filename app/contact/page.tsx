import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Instagram, Twitter, Facebook, Youtube } from "@/components/SocialIcons";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vinyl Press Studio for a custom vinyl printing quote. We respond within 24 hours.",
};

const contactInfo = [
  { Icon: Mail, label: "Email Us", value: "hello@vinylpress.studio" },
  { Icon: Phone, label: "Call Us", value: "+1 (555) 010-2024" },
  { Icon: MapPin, label: "Visit Us", value: "128 Press Lane, Brooklyn, NY 11201" },
];

const social = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function ContactPage() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <Reveal>
            <div className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-3">
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Let&apos;s make
              <br />
              something <span className="italic font-light">bold</span>
            </h1>
            <p className="text-lg text-gray-500 mb-10">
              Have a project in mind? Fill out the form and our team will get back to you within 24
              hours.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{label}</div>
                    <div className="font-medium">{value}</div>
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
                  className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-all"
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
