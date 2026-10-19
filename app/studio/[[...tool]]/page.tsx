import { NextStudio } from "next-sanity/studio";
import { isSanityConfigured } from "@/sanity/env";
import config from "../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-bg text-white/80">
        <div className="max-w-lg">
          <p className="eyebrow-gold mb-4">Gestionale non configurato</p>
          <h1 className="font-serif text-4xl text-white mb-6">Collega il progetto Sanity</h1>
          <p className="leading-relaxed text-white/60">
            Imposta <code className="text-gold">NEXT_PUBLIC_SANITY_PROJECT_ID</code> e{" "}
            <code className="text-gold">NEXT_PUBLIC_SANITY_DATASET</code> nel file{" "}
            <code className="text-gold">.env.local</code> (vedi <code>.env.example</code> e il README),
            poi riavvia il server.
          </p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
