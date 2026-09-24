import type { Metadata } from "next";
import WorksGallery from "@/components/WorksGallery";

export const metadata: Metadata = {
  title: "Le opere — Danimagined",
  description:
    "Nove tavole tra creature ibride, scene narrative e ritratti fantasy.",
};

export default function OperePage() {
  return (
    <main className="relative pt-44 pb-32 px-6 md:px-10 bg-bg min-h-screen overflow-hidden">
      <span className="section-label !top-44">Galleria</span>
      <div className="glow-accent w-[520px] h-[520px] -top-20 left-1/4 opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="eyebrow-gold mb-6">Showcase</p>
            <h1 className="font-serif font-light text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-white">
              Le{" "}
              <span className="italic text-shimmer animate-shimmer pr-3">opere</span>
            </h1>
          </div>
          <p className="text-white/55 max-w-sm leading-relaxed md:pb-4">
            Nove tavole tra creature ibride, scene narrative e ritratti.
            Clicca per entrare nell&apos;opera.
          </p>
        </div>

        <WorksGallery />
      </div>
    </main>
  );
}
