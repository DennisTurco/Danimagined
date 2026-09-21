"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { works } from "@/lib/works";
import Reveal from "@/components/Reveal";

const slides = works.slice(0, 8);

export default function PortfolioCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section id="opere" className="relative bg-bg py-28 px-6 md:px-10">
      <span className="section-label">Portfolio</span>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow mb-4">Selezione</p>
              <h2 className="font-serif font-light text-5xl md:text-7xl">
                Opere in evidenza
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Opera precedente"
                className="w-11 h-11 flex items-center justify-center border border-white/25 hover:border-gold hover:text-gold hover:-translate-x-0.5 transition-[border-color,color,transform] duration-300"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Opera successiva"
                className="w-11 h-11 flex items-center justify-center border border-white/25 hover:border-gold hover:text-gold hover:translate-x-0.5 transition-[border-color,color,transform] duration-300"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="relative w-full aspect-video overflow-hidden bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {slides.map((work, i) => (
              <div
                key={work.id}
                className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.16,.84,.28,1)] ${
                  i === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.04] pointer-events-none"
                }`}
              >
                <Link href={`/opere/${work.id}`} className="block w-full h-full relative overflow-hidden">
                  <Image
                    key={`${work.id}-${i === index ? "on" : "off"}`}
                    src={work.img}
                    alt={work.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className={`object-cover ${i === index ? "animate-slowzoom" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="eyebrow-gold mb-2 text-sm">{work.cat}</p>
                      <h3 className="font-serif text-3xl md:text-5xl text-white font-light">
                        {work.title}
                      </h3>
                    </div>
                    <span className="text-white/60 text-base md:text-lg tracking-widest">
                      {String(i + 1).padStart(2, "0")} / 08
                    </span>
                  </div>
                </Link>
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
              <div
                key={index}
                className={`h-full bg-gold ${
                  paused ? "" : "animate-[slideProgress_5s_linear_forwards]"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((work, i) => (
              <button
                key={work.id}
                onClick={() => setIndex(i)}
                aria-label={`Vai alla slide ${i + 1}`}
                className={`h-[2px] transition-all duration-300 ${
                  i === index ? "w-8 bg-gold" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/opere"
              className="eyebrow-gold link-underline hover:text-goldlight transition-colors"
            >
              Vedi tutte le opere →
            </Link>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
