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
    <div className="border-y border-[#F4E2D2]/40 py-4 overflow-hidden bg-[#F4E2D2]/15">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-sm font-extrabold text-ink tracking-wider">{item}</span>
            <span className="text-sm text-ink-muted/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}