import Reveal from "@/components/Reveal";

const items = [
  {
    n: "01",
    title: "Character design",
    desc: "Figure umane, armature, volti che raccontano un passato.",
  },
  {
    n: "02",
    title: "Creature design",
    desc: "Ibridi credibili: anatomia vera, istinto inventato.",
  },
  {
    n: "03",
    title: "Scene narrative",
    desc: "Ambiente, luce e conflitto in una sola inquadratura.",
  },
];

export default function WorkIntro() {
  return (
    <section className="relative bg-bg py-32 md:py-40 px-6 md:px-10 overflow-hidden">
      <span className="section-label">Il lavoro</span>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-10 top-10 font-serif italic text-[22vw] leading-none text-outline opacity-40"
      >
        segno
      </p>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-8">Il lavoro</p>
            <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1.05] text-white">
              Non disegno soggetti.
              <br />
              Disegno{" "}
              <span className="italic text-shimmer animate-shimmer pr-2">
                l&apos;istante prima
              </span>
              .
            </h2>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:pt-16">
            <div className="space-y-6 text-white/65 text-lg leading-relaxed">
              <p>
                Lavoro in digitale con una pennellata volutamente visibile: la
                texture resta, il segno resta. È il modo in cui costruisco
                atmosfera — nebbia, neve, torce, il peso di una bestia che
                respira.
              </p>
              <p>
                Realizzo character design, creature e ibridi, scene narrative e
                ritratti su commissione — per giochi di ruolo, progetti indie,
                editoria e collezionisti privati.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 120}>
              <div
                className={`group relative h-full pt-10 pb-4 ${
                  i === 0 ? "md:pr-8" : "md:px-8 md:border-l border-white/10"
                }`}
              >
                <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:w-full" />
                <span className="block font-serif font-light text-7xl md:text-8xl leading-none text-gold/25 mb-6 transition-colors duration-500 group-hover:text-gold">
                  {item.n}
                </span>
                <h3 className="eyebrow text-white/90 text-xs mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
