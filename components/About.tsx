import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-cream text-aboutdark py-32 md:py-40 px-6 md:px-10 scroll-mt-24 overflow-hidden"
    >
      <span className="section-label !text-taupe">Il percorso</span>

      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        width={640}
        height={640}
        className="pointer-events-none select-none absolute -right-24 top-10 w-[min(46%,560px)] h-auto opacity-[0.06]"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative">
          <div className="absolute -inset-4 md:-inset-5 border border-gold/50 translate-x-3 translate-y-3" />
          <Reveal variant="wipe">
            <div
              className="relative w-full aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-30px_rgba(36,34,32,0.55)]"
              style={{
                clipPath:
                  "polygon(2% 4%, 96% 0%, 100% 92%, 94% 100%, 4% 98%, 0% 8%)",
              }}
            >
              <Image
                src="/images/chi-sono.jpg"
                alt="Ritratto dell'artista, studio dal vero"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover animate-kenburns"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="eyebrow mb-8 !text-taupe">Chi sono</p>
          <h2 className="font-serif font-light text-5xl md:text-7xl text-bg mb-10 leading-[1.02]">
            Nel 2023 ho scelto di{" "}
            <span className="italic" style={{ color: "#8a6a31" }}>
              tornare a disegnare
            </span>
            .
          </h2>

          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              <span
                className="float-left font-serif text-8xl leading-[0.75] pr-3 pt-2"
                style={{ color: "#8a6a31" }}
              >
                M
              </span>
              i sono affidato a un&apos;accademia e ho iniziato a fare quello
              che mi è sempre piaciuto. Ho lasciato indietro una parte
              importante della mia vita, ma da quella parte ho imparato
              molto: gestire la pressione, tenere la disciplina.
            </p>
            <p>
              Quello che mi affascina è l&apos;intero processo creativo: la
              ricerca delle reference, i primi segni sbagliati, il momento in
              cui la figura smette di essere una macchia e comincia a
              guardarti.
            </p>
          </div>

          <blockquote className="relative my-12 pl-8 border-l-2 border-gold font-serif italic text-3xl md:text-4xl leading-snug text-bg">
            <span
              aria-hidden="true"
              className="absolute -top-8 -left-2 font-serif text-8xl leading-none text-gold/30 not-italic"
            >
              “
            </span>
            Disegno finché la bestia non decide da sola come guardarmi.
          </blockquote>

          <a
            href="/contatti"
            className="eyebrow-gold !text-[#8a6a31] link-underline hover:opacity-70 transition-opacity"
          >
            La storia completa →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
