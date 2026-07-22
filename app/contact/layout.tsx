import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & About Us",
  description:
    "Visit Vinyl Supplies & More in Houston, Texas. High-quality banner, apparel, and decal printing. Fast 24-48hr turnaround.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
