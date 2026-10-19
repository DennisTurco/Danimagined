import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import type { Landing, Settings } from "@/lib/types";

export default function CtaBand({ landing, settings }: { landing: Landing; settings: Settings }) {
  const image = landing.ctaImage;
  return (
    <section id="cta" className="relative py-28 md:py-52 px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0">
        {image && (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-60 animate-kenburns"
            style={{ objectPosition: image.position ?? "center" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/55 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(36,34,32,0.55)_0%,rgba(36,34,32,0.85)_65%,#242220_100%)]" />
      </div>

      <div className="glow-accent w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="eyebrow-gold mb-8 inline-flex items-center gap-3">
            <span className="relative flex w-2 h-2">
              {settings.commissionsOpen && (
                <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />
              )}
              <span
                className={`relative w-2 h-2 rounded-full ${settings.commissionsOpen ? "bg-gold" : "bg-taupe"}`}
              />
            </span>
            {settings.commissionsOpen ? "Commissioni aperte" : "Commissioni chiuse"}
          </p>
          <h2 className="font-serif font-light text-5xl md:text-8xl mb-8 leading-[1.02] text-white">
            {landing.ctaTitle}
            {landing.ctaTitleAccent && (
              <>
                {" "}
                <span className="italic text-shimmer animate-shimmer">{landing.ctaTitleAccent}</span>
              </>
            )}
            {landing.ctaTitleEnd && <> {landing.ctaTitleEnd}</>}
          </h2>
          {landing.ctaText && (
            <p className="text-white/65 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              {landing.ctaText}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic>
              <Link href="/contatti" className="btn-solid">
                Richiedi una commissione
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contatti#prenota" className="btn-outline">
                Prenota una call
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
