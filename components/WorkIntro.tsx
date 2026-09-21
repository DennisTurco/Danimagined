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
    <section className="relative bg-bg py-28 px-6 md:px-10">
      <span className="section-label">Il lavoro</span>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6 text-center">Il lavoro</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-center leading-tight mb-10">
            Non disegno soggetti.
            <br />
            Disegno <span className="italic text-goldlight">l&apos;istante prima</span>.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-2xl mx-auto text-center space-y-5 text-white/60 leading-relaxed mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 120}>
              <div className="group relative border-t border-white/10 pt-6 transition-colors duration-500 hover:border-gold/60">
                <span className="eyebrow-gold block mb-4 transition-transform duration-500 group-hover:-translate-y-1">
                  {item.n}
                </span>
                <h3 className="font-serif text-2xl font-light mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
