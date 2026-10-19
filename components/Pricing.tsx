import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Landing, Package } from "@/lib/types";

const gridCols: Record<number, string> = {
  1: "md:grid-cols-1 max-w-md mx-auto",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export default function Pricing({ packages, landing }: { packages: Package[]; landing: Landing }) {
  if (packages.length === 0) return null;
  return (
    <section id="pacchetti" className="relative bg-panel py-24 md:py-40 px-5 md:px-10 scroll-mt-24 overflow-hidden">
      <span className="section-label">Listino</span>
      <div className="glow-accent w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-60" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <div>
              <p className="eyebrow mb-6">Commissioni</p>
              <h2 className="font-serif font-light text-5xl md:text-7xl leading-none">
                {landing.pricingTitle ?? "Pacchetti"}
              </h2>
            </div>
            {landing.pricingIntro && (
              <p className="text-white/50 max-w-sm leading-relaxed">{landing.pricingIntro}</p>
            )}
          </div>
        </Reveal>

        <div
          className={`grid grid-cols-1 ${
            gridCols[packages.length] ?? "md:grid-cols-2 lg:grid-cols-3"
          } gap-px bg-white/10 border border-white/10`}
        >
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 100} className="h-full">
              <div
                className={`group relative p-8 lg:p-9 h-full flex flex-col overflow-hidden transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] hover:-translate-y-2 ${
                  pkg.highlight
                    ? "bg-bg outline outline-1 outline-gold/70 -outline-offset-1 shadow-[0_30px_80px_-25px_rgba(197,164,109,0.45)] hover:shadow-[0_40px_100px_-25px_rgba(197,164,109,0.6)] z-10"
                    : "bg-panel hover:bg-bg hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.7)]"
                }`}
              >
                <div className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-gradient-to-b from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {pkg.highlight && (
                  <span className="absolute top-0 right-0 bg-gold text-bg text-[9px] uppercase tracking-[0.28em] px-3 py-2">
                    Più richiesto
                  </span>
                )}

                <div className="relative flex items-baseline gap-3 mb-8">
                  <span
                    className={`font-serif font-light text-5xl leading-none transition-colors duration-500 ${
                      pkg.highlight ? "text-goldlight/60" : "text-gold/30 group-hover:text-gold/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`eyebrow text-[10px] ${pkg.highlight ? "!text-goldlight" : ""}`}
                  >
                    {pkg.name}
                  </h3>
                </div>

                <p className="relative flex items-baseline gap-2 mb-6">
                  <span className="text-xs text-taupe">da</span>
                  <span
                    className={`font-serif text-6xl leading-none ${
                      pkg.highlight ? "text-shimmer animate-shimmer" : "text-gold"
                    }`}
                  >
                    {pkg.price}€
                  </span>
                </p>
                <p className="relative text-white/60 text-sm leading-relaxed mb-8">
                  {pkg.description}
                </p>
                <ul
                  className={`relative mt-auto space-y-3 mb-8 pt-6 border-t text-sm ${
                    pkg.highlight ? "border-gold/30 text-goldlight/90" : "border-white/10 text-white/55"
                  }`}
                >
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-gold text-xs mt-0.5">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contatti?pacchetto=${encodeURIComponent(pkg.name)}#richiesta`}
                  className={`relative text-center ${
                    pkg.highlight ? "btn-solid" : "btn-outline"
                  }`}
                >
                  Richiedi
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {landing.pricingNote && (
          <p className="text-center text-taupe text-xs mt-12 tracking-[0.15em] uppercase leading-relaxed">
            {landing.pricingNote}
          </p>
        )}
      </div>
    </section>
  );
}
