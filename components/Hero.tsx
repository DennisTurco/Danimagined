"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fade = Math.max(0, 1 - offset / 500);
  const blur = Math.min(8, offset / 60);
  const translate = Math.min(60, offset * 0.25);
  const parallax = Math.min(120, offset * 0.35);

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden flex items-end justify-start pt-28 pb-36">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image
            src="/images/works/drago.jpg"
            alt="Illustrazione di un drago"
            fill
            priority
            sizes="100vw"
            className="object-cover animate-kenburns"
            style={{ transform: `translateY(${parallax}px)` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/60" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/10 to-transparent" />
      </div>

      <div className="glow-accent w-[420px] h-[420px] top-1/3 left-1/4 -z-0" />

      <div
        className="relative z-10 w-full max-w-6xl px-6 md:px-16 lg:px-24 text-left"
        style={{
          opacity: fade,
          filter: `blur(${blur}px)`,
          transform: `translateY(${translate}px)`,
        }}
      >
        <p className="eyebrow-gold mb-6 text-sm md:text-base">Illustrazione &amp; Concept Art</p>
        <h1 className="font-serif font-light text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-white mb-8 drop-shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
          Dove l&apos;uomo incontra
          <br />
          <span className="italic text-shimmer animate-shimmer pr-2">
            la sua creatura
          </span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Pennellate digitali, bestie nate dal mito e ritratti che guardano
          indietro. Ogni tavola è una scena: qualcuno sta per decidere
          qualcosa, e la creatura davanti a lui lo sa.
        </p>
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4">
          <Magnetic>
            <Link href="/opere" className="btn-solid">
              Guarda le opere
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contatti" className="btn-outline">
              Richiedi una commissione
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="eyebrow text-[10px]">Scorri</span>
        <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-float" />
      </div>

      <Link
        href="/opere/0"
        className="group absolute bottom-10 right-6 md:right-16 lg:right-24 z-10 hidden md:flex items-center gap-4 text-right"
        style={{ opacity: fade }}
      >
        <span>
          <span className="eyebrow block text-[10px] mb-1">In copertina</span>
          <span className="font-serif italic text-lg text-white/80 group-hover:text-gold transition-colors">
            Il patto del sovrano dorato
          </span>
        </span>
        <span className="w-10 h-px bg-gold/60 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
      </Link>
    </section>
  );
}
