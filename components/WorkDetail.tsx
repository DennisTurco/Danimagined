import Image from "next/image";
import Link from "next/link";
import { works, type Work } from "@/lib/works";
import Magnetic from "@/components/Magnetic";

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
          <h1 className="font-serif font-light text-4xl md:text-6xl text-white max-w-3xl">
            {work.title}
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div className="relative w-full aspect-[4/5] overflow-hidden group">
            <Image
              src={work.img}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
            />
          </div>

          <div>
            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              {work.desc}
            </p>

            <div className="grid grid-cols-3 border border-white/10 mb-10">
              <div className="p-5 border-r border-white/10">
                <p className="eyebrow mb-2">Anno</p>
                <p className="text-white">{work.year}</p>
              </div>
              <div className="p-5 border-r border-white/10">
                <p className="eyebrow mb-2">Tecnica</p>
                <p className="text-white">Digitale</p>
              </div>
              <div className="p-5">
                <p className="eyebrow mb-2">Simile da</p>
                <p className="text-gold">{work.price}</p>
              </div>
            </div>

            <Magnetic>
              <Link href="/contatti" className="btn-solid">
                Richiedi un&apos;opera simile
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="flex items-center justify-between mt-24 pt-10 border-t border-white/10">
          <Link
            href={`/opere/${prevWork.id}`}
            className="group max-w-[45%]"
          >
            <p className="eyebrow mb-2">← Precedente</p>
            <p className="font-serif text-xl text-white/70 group-hover:text-gold transition-colors truncate">
              {prevWork.title}
            </p>
          </Link>
          <Link
            href={`/opere/${nextWork.id}`}
            className="group max-w-[45%] text-right"
          >
            <p className="eyebrow mb-2">Successiva →</p>
            <p className="font-serif text-xl text-white/70 group-hover:text-gold transition-colors truncate">
              {nextWork.title}
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
