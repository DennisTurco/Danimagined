import Link from "next/link";
import Reveal from "@/components/Reveal";

const packages = [
  {
    name: "Ritratto",
    price: "da 50€",
    desc: "Testa e spalle, sfondo neutro. Il volto lavorato a pennellata piena, luce studiata sul soggetto.",
    bullets: [
      "1 bozzetto di impostazione",
      "2 giri di revisione",
      "File digitale ad alta risoluzione",
    ],
    highlight: false,
  },
  {
    name: "Half-body",
    price: "da 70€",
    desc: "Mezzo busto con posa, abiti e armatura. Lo spazio giusto per dare un carattere al personaggio.",
    bullets: [
      "2 bozzetti di posa",
      "2 giri di revisione",
      "Studio di colore incluso",
    ],
    highlight: false,
  },
  {
    name: "Creature design",
    price: "da 90€",
    desc: "Una creatura originale o un ibrido, progettata sull'anatomia reale: come si muove, come caccia, come respira.",
    bullets: [
      "3 proposte di silhouette",
      "3 giri di revisione",
      "Vista finale + dettagli",
    ],
    highlight: true,
  },
  {
    name: "Illustrazione",
    price: "da 150€",
    desc: "Scena completa: personaggio, creatura e ambiente. Una storia intera dentro un'unica inquadratura.",
    bullets: [
      "Thumbnail di composizione",
      "Revisioni illimitate in bozza",
      "Formato stampa fino a 60×40 cm",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pacchetti" className="relative bg-panel py-28 px-6 md:px-10 scroll-mt-24">
      <span className="section-label">Listino</span>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6 text-center">Commissioni</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-center mb-6">
            Pacchetti
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-16 leading-relaxed">
            Prezzi di partenza. Il preventivo finale dipende da complessità,
            numero di soggetti e uso finale — commerciale o personale.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 100}>
              <div
                className={`group relative p-8 h-full flex flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] hover:-translate-y-2 ${
                  pkg.highlight
                    ? "border-2 border-gold md:-my-4 md:py-12 bg-bg/40 shadow-[0_20px_60px_-20px_rgba(197,164,109,0.35)] hover:shadow-[0_30px_80px_-20px_rgba(197,164,109,0.5)]"
                    : "hover:bg-bg/30 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
                }`}
              >
                <div className="pointer-events-none absolute -inset-x-10 -top-10 h-32 bg-gradient-to-b from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {pkg.highlight && (
                  <span className="absolute top-4 right-4 eyebrow-gold text-[9px] bg-gold/10 border border-gold/30 px-2 py-1">
                    ✦ Più richiesto
                  </span>
                )}
                <h3 className="relative font-serif text-2xl font-light mb-2">
                  {pkg.name}
                </h3>
                <p className="relative text-gold text-lg mb-4">{pkg.price}</p>
                <p className="relative text-white/50 text-sm leading-relaxed mb-6">
                  {pkg.desc}
                </p>
                <ul className="relative space-y-2 mb-8 text-sm text-white/60">
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-gold">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contatti"
                  className={`relative mt-auto text-center ${
                    pkg.highlight ? "btn-solid" : "btn-outline"
                  }`}
                >
                  Richiedi
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-white/40 text-xs mt-10 tracking-wide">
          Consegna tipica 7–21 giorni · Acconto 30% all&apos;accettazione ·
          Disponibile in digitale o su tela
        </p>
      </div>
    </section>
  );
}
