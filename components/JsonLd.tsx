/**
 * LocalBusiness structured data (JSON-LD).
 * This is what powers the business info card in Google search results.
 *
 *  >>> REPLACE every value below with your REAL business details. <<<
 *  Name, address, phone, and URL must match exactly what you use on
 *  Google Business Profile and everywhere else online (consistent NAP).
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vinyl Supplies & More",
    description:
      "Premium custom vinyl printing for businesses, teams, and events — banners, vehicle wraps, apparel, decals, and event signage.",
    url: "https://your-domain.com", // REPLACE
    telephone: "+1-555-010-2024", // REPLACE
    email: "hello@vinylsuppliesandmore.com", // REPLACE
    image: "https://your-domain.com/og.jpg", // REPLACE
    address: {
      "@type": "PostalAddress",
      streetAddress: "128 Press Lane", // REPLACE
      addressLocality: "Brooklyn", // REPLACE
      addressRegion: "NY", // REPLACE
      postalCode: "11201", // REPLACE
      addressCountry: "US",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
