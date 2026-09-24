import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import BookCallPanel from "@/components/BookCallPanel";

export const metadata: Metadata = {
  title: "Contatti — Danimagined",
  description:
    "Richiedi una commissione o prenota una call con Danimagined, illustratore e concept artist fantasy.",
};

export default function ContattiPage() {
  return (
    <main className="relative pt-44 pb-32 px-6 md:px-10 bg-bg min-h-screen overflow-hidden">
      <div className="glow-accent w-[520px] h-[520px] -top-20 left-1/3 opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-20 max-w-4xl">
          <p className="eyebrow-gold mb-6">Commissioni aperte</p>
          <h1 className="font-serif font-light text-6xl md:text-8xl leading-[0.98] text-white">
            Raccontami{" "}
            <span className="italic text-shimmer animate-shimmer pr-3">la tua creatura</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-10">
            <BookCallPanel />

            <div>
              <p className="eyebrow mb-4">Contatti diretti</p>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Instagram — @danimagined
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    LinkedIn — Dani Imagined
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@danimagined.com"
                    className="hover:text-gold transition-colors"
                  >
                    hello@danimagined.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
