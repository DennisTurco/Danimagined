import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export default function CtaBand() {
  return (
    <section id="cta" className="relative py-36 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/works/drago.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60 animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/55 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(36,34,32,0.55)_0%,rgba(36,34,32,0.85)_65%,#242220_100%)]" />
      </div>

      <div className="glow-accent w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <Reveal>
          <p className="eyebrow-gold mb-6">Commissioni aperte</p>
          <h2 className="font-serif font-light text-4xl md:text-6xl mb-6 leading-tight">
            Hai una creatura in testa che non esiste ancora?
          </h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Raccontamela. Bastano due righe, qualche reference e il formato
            che ti serve — ti rispondo con tempi e preventivo entro 48 ore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic>
              <Link href="/contatti" className="btn-solid">
                Richiedi una commissione
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contatti" className="btn-outline">
                Prenota una call
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
