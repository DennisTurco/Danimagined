import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/types";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function WorkDetail({ work, works }: { work: Work; works: Work[] }) {
  const index = works.findIndex((w) => w.slug === work.slug);
  const nextWork = works[(index + 1) % works.length];
  const prevWork = works[(index - 1 + works.length) % works.length];
  const facts = [
    work.year && { label: "Anno", value: String(work.year) },
    work.technique && { label: "Tecnica", value: work.technique },
    work.price != null && { label: "Simile da", value: `${work.price}€`, gold: true },
  ].filter(Boolean) as { label: string; value: string; gold?: boolean }[];

  return (
    <main className="bg-bg min-h-screen">
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={work.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover blur-[2px] scale-105 animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-black/50" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-10 pb-14">
          <Link
            href="/opere"
            className="inline-block eyebrow link-underline mb-8 hover:!text-gold transition-colors"
          >
            ← Tutte le opere
          </Link>
          <p className="eyebrow-gold mb-4">{work.category.title}</p>
          <h1 className="font-serif font-light text-5xl md:text-8xl leading-[0.98] text-white max-w-4xl drop-shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
            {work.title}
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal variant="wipe" className="lg:col-span-7">
            <a
              href={work.image.src}
              target="_blank"
              rel="noopener"
              aria-label={`Apri ${work.title} a piena risoluzione`}
              className="group relative block overflow-hidden bg-panel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] cursor-zoom-in"
            >
              <Image
                src={work.image.src}
                alt={work.image.alt ?? work.title}
                width={work.image.width}
                height={work.image.height}
                placeholder={work.image.lqip ? "blur" : "empty"}
                blurDataURL={work.image.lqip}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
            </a>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:sticky lg:top-28">
            {work.description && (
              <p className="font-serif italic text-2xl md:text-3xl text-white/85 leading-snug mb-12">
                {work.description}
              </p>
            )}

            {facts.length > 0 && (
              <div
                className="grid gap-px bg-white/10 border border-white/10 mb-12"
                style={{ gridTemplateColumns: `repeat(${facts.length}, minmax(0, 1fr))` }}
              >
                {facts.map((f) => (
                  <div key={f.label} className="p-4 md:p-5 bg-bg">
                    <p className="eyebrow mb-3">{f.label}</p>
                    <p className={`font-serif text-2xl md:text-3xl ${f.gold ? "text-gold" : "text-white"}`}>
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <Magnetic>
              <Link href="/contatti" className="btn-solid">
                Richiedi un&apos;opera simile
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        {works.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 mt-20 md:mt-28 border border-white/10">
          {[
            { w: prevWork, label: "← Precedente", align: "items-start text-left" },
            { w: nextWork, label: "Successiva →", align: "items-end text-right" },
          ].map(({ w, label, align }) => (
            <Link
              key={label}
              href={`/opere/${w.slug}`}
              className={`group relative flex flex-col justify-end ${align} h-40 md:h-56 p-6 md:p-8 overflow-hidden bg-bg`}
            >
              <Image
                src={w.image.src}
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
        )}
      </section>
    </main>
  );
}
