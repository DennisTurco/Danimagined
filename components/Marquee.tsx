const words = [
  "Character design",
  "Creature design",
  "Scene narrative",
  "Ritratti",
  "Cover & editoria",
];

function Row({ outline = false }: { outline?: boolean }) {
  return (
    <span className="flex items-center shrink-0">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span
            className={`font-serif font-light uppercase tracking-[0.12em] px-8 md:px-10 text-4xl md:text-6xl ${
              outline ? "italic text-outline" : "text-white/85"
            }`}
          >
            {w}
          </span>
          <span className="text-gold text-2xl md:text-3xl">✦</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div
      aria-label="Character design, creature design, scene narrative, ritratti, cover e editoria"
      className="relative bg-marquee border-y border-white/10 py-10 md:py-14 overflow-hidden space-y-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div aria-hidden="true" className="flex w-max animate-marquee-slow">
        <Row />
        <Row />
      </div>
      <div aria-hidden="true" className="flex w-max animate-marquee-reverse">
        <Row outline />
        <Row outline />
      </div>
    </div>
  );
}
