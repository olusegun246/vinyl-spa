import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube } from "@/components/SocialIcons";
import Image from "next/image";

const social = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Vinyl Supplies & More"
                width={1081}
                height={200}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Premium custom vinyl printing for businesses, teams, and events. From large banners to custom apparel wraps, we bring your vision to life.
            </p>
            <div className="flex items-center gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-brand-cyan tracking-wider text-sm uppercase">Pages</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Our Work</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-brand-cyan tracking-wider text-sm uppercase">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get Quote</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Vinyl Supplies & More. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">Precision Custom Printing Studio</p>
        </div>
      </div>
    </footer>
  );
}
