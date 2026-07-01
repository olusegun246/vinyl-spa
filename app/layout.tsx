import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // REPLACE with your real deployed domain once you have it.
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Vinyl Supplies & More — Custom Vinyl Printing",
    template: "%s | Vinyl Supplies & More",
  },
  description:
    "Premium custom vinyl printing for businesses, teams, and events. Banners, vehicle wraps, apparel, decals, and event signage with fast 24–48hr turnaround.",
  keywords: [
    "custom vinyl printing",
    "vinyl banners",
    "vehicle wraps",
    "apparel printing",
    "decals and stickers",
    "event signage",
    "vinyl supply",
    "vinyl supplies",
  ],
  openGraph: {
    type: "website",
    siteName: "Vinyl Supplies & More",
    title: "Vinyl Supplies & More — Custom Vinyl Printing",
    description:
      "Premium custom vinyl printing for businesses, teams, and events. Fast 24–48hr turnaround.",
    url: "https://your-domain.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinyl Supplies & More — Custom Vinyl Printing",
    description:
      "Premium custom vinyl printing for businesses, teams, and events. Fast 24–48hr turnaround.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-paper-cool text-ink font-sans antialiased">
        <JsonLd />
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
