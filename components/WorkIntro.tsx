import Reveal from "@/components/Reveal";
import type { Landing } from "@/lib/types";

const gridCols: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export default function WorkIntro({ landing }: { landing: Landing }) {
  const { introEyebrow, introTitle, introTitleAccent, introParagraphs, services } = landing;

  return (
    <section className="relative bg-bg py-24 md:py-40 px-5 md:px-10 overflow-hidden">
      {introEyebrow && <span className="section-label">{introEyebrow}</span>}

      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-10 top-10 font-serif italic text-[22vw] leading-none text-outline opacity-40"
      >
        segno
      </p>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          <Reveal className="lg:col-span-7">
            {introEyebrow && <p className="eyebrow mb-8">{introEyebrow}</p>}
            <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1.05] text-white">
              {introTitle}
              {introTitleAccent && (
                <>
                  {" "}
                  <span className="italic text-shimmer animate-shimmer">{introTitleAccent}</span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:pt-16">
            <div className="space-y-6 text-white/65 text-lg leading-relaxed">
              {introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        {services.length > 0 && (
          <div
            className={`grid grid-cols-1 ${gridCols[services.length] ?? "md:grid-cols-3"} border-t border-white/10`}
          >
            {services.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <div
                  className={`group relative h-full pt-10 pb-4 ${
                    i === 0 ? "md:pr-8" : "md:px-8 md:border-l border-white/10"
                  }`}
                >
                  <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:w-full" />
                  <span className="block font-serif font-light text-7xl md:text-8xl leading-none text-gold/25 mb-6 transition-colors duration-500 group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="eyebrow text-white/90 text-xs mb-3">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/50 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
