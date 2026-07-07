const items = [
  "CUSTOM VINYL PRINTING",
  "BANNERS & SIGNS",
  "APPAREL PRINTING",
  "EVENT SIGNAGE",
  "FAST TURNAROUND",
];

export default function Marquee() {
  // Duplicated so the -50% translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="border-y border-gray-100 py-4 overflow-hidden bg-white">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-sm font-medium text-gray-400 tracking-wide">{item}</span>
            <span className="text-sm text-gray-300">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
