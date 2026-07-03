import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Polotno on Next.js 15/16 — the editor doesn't
  // support React StrictMode yet (known upstream issue).
  reactStrictMode: false,

  images: {
    // Allows next/image to load the placeholder photos.
    // When you switch to real product images, put them in /public
    // and you can remove this remotePatterns block entirely.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;