import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center px-5 md:px-10 pt-32 pb-24 bg-bg overflow-hidden">
      <div className="glow-accent w-[520px] h-[520px] top-1/4 left-1/3 opacity-50" />
      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-6 bottom-0 font-serif italic text-[40vw] md:text-[28vw] leading-none text-outline opacity-40"
      >
        404
      </p>

      <div className="relative max-w-6xl mx-auto w-full">
        <p className="eyebrow-gold mb-6">Pagina non trovata</p>
        <h1 className="font-serif font-light text-5xl sm:text-6xl md:text-8xl leading-[0.98] text-white mb-8 max-w-3xl">
          Questa creatura{" "}
          <span className="italic text-shimmer animate-shimmer">
            non esiste ancora
          </span>
          .
        </h1>
        <p className="text-white/60 text-lg max-w-md mb-10 leading-relaxed">
          La pagina che cerchi è stata spostata o non è mai stata disegnata.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link href="/" className="btn-solid">
            Torna alla home
          </Link>
          <Link href="/opere" className="btn-outline">
            Guarda le opere
          </Link>
        </div>
      </div>
    </main>
  );
}
