import Image from "next/image";
import Link from "next/link";
import { works, type Work } from "@/lib/works";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function WorkDetail({ work }: { work: Work }) {
  const nextWork = works[(work.id + 1) % works.length];
  const prevWork = works[(work.id - 1 + works.length) % works.length];

  return (
    <main className="bg-bg min-h-screen">
      <section className="relative h-[70vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={work.img}
            alt={work.title}
            fill
            priority
            sizes="100vw"
            className="object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-black/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10 pb-14">
          <Link
            href="/"
            className="inline-block eyebrow link-underline mb-8 hover:text-gold transition-colors"
          >
            ← Torna alla home
          </Link>
          <p className="eyebrow-gold mb-4">{work.cat}</p>
          <h1 className="font-serif font-light text-5xl md:text-8xl leading-[0.98] text-white max-w-4xl drop-shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
            {work.title}
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <Reveal variant="wipe">
            <div className="relative w-full aspect-[4/5] overflow-hidden group shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <Image
                src={work.img}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="font-serif italic text-2xl md:text-3xl text-white/85 leading-snug mb-12">
              {work.desc}
            </p>

            <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 mb-12">
              <div className="p-5 bg-bg">
                <p className="eyebrow mb-3">Anno</p>
                <p className="font-serif text-3xl text-white">{work.year}</p>
              </div>
              <div className="p-5 bg-bg">
                <p className="eyebrow mb-3">Tecnica</p>
                <p className="font-serif text-3xl text-white">Digitale</p>
              </div>
              <div className="p-5 bg-bg">
                <p className="eyebrow mb-3">Simile da</p>
                <p className="font-serif text-3xl text-gold">{work.price}</p>
              </div>
            </div>

            <Magnetic>
              <Link href="/contatti" className="btn-solid">
                Richiedi un&apos;opera simile
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/10 mt-28 border border-white/10">
          {[
            { w: prevWork, label: "← Precedente", align: "items-start text-left" },
            { w: nextWork, label: "Successiva →", align: "items-end text-right" },
          ].map(({ w, label, align }) => (
            <Link
              key={label}
              href={`/opere/${w.id}`}
              className={`group relative flex flex-col justify-end ${align} h-44 md:h-56 p-6 md:p-8 overflow-hidden bg-bg`}
            >
              <Image
                src={w.img}
                alt=""
                fill
                sizes="50vw"
                className="object-cover opacity-25 scale-105 transition-all duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:opacity-60 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
              <p className="relative eyebrow mb-2">{label}</p>
              <p className="relative font-serif text-2xl md:text-3xl text-white/85 group-hover:text-gold transition-colors">
                {w.title}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
