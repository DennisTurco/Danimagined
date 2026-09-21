import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-cream text-aboutdark py-28 px-6 md:px-10 scroll-mt-24"
    >
      <span className="section-label">Il percorso</span>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/40 -z-0" />
            <div
              className="relative w-full aspect-[4/5] overflow-hidden"
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
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-6 text-taupe">Chi sono</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-bg mb-8 leading-tight">
            Nel 2023 ho scelto di{" "}
            <span className="italic" style={{ color: "#8a6a31" }}>
              tornare a disegnare
            </span>
            .
          </h2>

          <div className="space-y-5 leading-relaxed">
            <p>
              <span className="float-left font-serif text-6xl leading-[0.8] pr-3 pt-1 text-gold">
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

          <blockquote className="border-l-2 border-gold pl-6 italic my-8 text-lg">
            «Disegno finché la bestia non decide da sola come guardarmi.»
          </blockquote>

          <a
            href="/contatti"
            className="eyebrow-gold link-underline hover:opacity-70 transition-opacity"
          >
            La storia completa →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
