import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube } from "@/components/SocialIcons";

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
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Vinyl Press<span className="text-gray-500 font-light"> Studio</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Premium custom vinyl printing for businesses, teams, and events. From banners to
              apparel, we bring your vision to life.
            </p>
            <div className="flex items-center gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-ink transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/store" className="hover:text-white transition-colors">Store</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Vinyl Press Studio. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">Made with ♥ for great design</p>
        </div>
      </div>
    </footer>
  );
}
