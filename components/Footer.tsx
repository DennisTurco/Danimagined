import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/content";

export default async function Footer() {
  const settings = await getSettings();
  return (
    <footer className="relative bg-darkest border-t border-white/10 overflow-hidden">
      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[18vw] leading-none text-white/[0.03] tracking-tight"
      >
        DANIMAGINED
      </p>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-9 h-9">
              <Image
                src="/images/logo.png"
                alt=""
                width={34}
                height={34}
                className="object-contain"
              />
            </span>
            <span className="font-serif text-lg tracking-[0.15em] text-white">
              DANIMAGINED
            </span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Illustrazione e concept art fantasy. Uomo e creatura, una
            pennellata alla volta.
          </p>
        </div>

        <div>
          <p className="eyebrow-gold mb-5">Naviga</p>
          <ul className="space-y-3 text-sm text-white/60">
            <li>
              <Link href="/opere" className="link-underline hover:text-gold transition-colors">
                Opere
              </Link>
            </li>
            <li>
              <Link href="/#pacchetti" className="link-underline hover:text-gold transition-colors">
                Pacchetti
              </Link>
            </li>
            <li>
              <Link href="/#about" className="link-underline hover:text-gold transition-colors">
                Chi sono
              </Link>
            </li>
            <li>
              <Link href="/contatti" className="link-underline hover:text-gold transition-colors">
                Contatti
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow-gold mb-5">Seguimi</p>
          <ul className="space-y-3 text-sm text-white/60">
            {settings.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-gold transition-colors"
                >
                  {s.label}{s.handle ? ` - ${s.handle}` : ""}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="link-underline hover:text-gold transition-colors"
              >
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow-gold mb-5">Commissioni</p>
          <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
            <span className={`w-2 h-2 rounded-full ${settings.commissionsOpen ? "bg-gold" : "bg-taupe"}`} />
            {settings.commissionsOpen
              ? `Aperte - risposta in ${settings.responseTime}`
              : "Chiuse al momento"}
          </div>
          <Link href="/contatti" className="btn-outline">
            Scrivimi
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left text-xs text-white/40">
          <p>© {new Date().getFullYear()} Danimagined · Tutti i diritti riservati</p>
          <p>Le opere sono protette da copyright e non possono essere riutilizzate senza permesso.</p>
        </div>
      </div>
    </footer>
  );
}
