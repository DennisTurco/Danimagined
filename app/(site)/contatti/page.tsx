import type { Metadata } from "next";
import BookCallPanel from "@/components/BookCallPanel";
import ContactForm from "@/components/ContactForm";
import { getPackages, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contatti e commissioni",
  description:
    "Richiedi un'illustrazione fantasy su commissione o prenota una call con Danimagined: ritratti da 50€, creature design, scene narrative. Risposta entro 48 ore.",
  alternates: { canonical: "/contatti" },
  openGraph: {
    url: "/contatti",
    title: "Contatti e commissioni - Danimagined",
  },
};

export default async function ContattiPage() {
  const [settings, packages] = await Promise.all([getSettings(), getPackages()]);
  return (
    <main className="relative pt-36 md:pt-44 pb-24 md:pb-32 px-5 md:px-10 bg-bg min-h-screen overflow-hidden">
      <div className="glow-accent w-[520px] h-[520px] -top-20 left-1/3 opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20 max-w-4xl">
          <p className="eyebrow-gold mb-6">
            {settings.commissionsOpen ? "Commissioni aperte" : "Commissioni chiuse"}
          </p>
          <h1 className="font-serif font-light text-5xl sm:text-6xl md:text-8xl leading-[0.98] text-white">
            Raccontami{" "}
            <span className="italic text-shimmer animate-shimmer">la tua creatura</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
          <div className="lg:col-span-2">
            <ContactForm
              email={settings.email}
              packages={packages}
              responseTime={settings.responseTime}
            />
          </div>

          <aside className="space-y-10 self-start">
            <BookCallPanel
              bookingUrl={settings.bookingUrl}
              email={settings.email}
              responseTime={settings.responseTime}
            />

            <div>
              <p className="eyebrow mb-4">Contatti diretti</p>
              <ul className="space-y-3 text-white/60 text-sm">
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
          </aside>
        </div>
      </div>
    </main>
  );
}
