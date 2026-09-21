import type { Metadata } from "next";
import WorksGallery from "@/components/WorksGallery";

export const metadata: Metadata = {
  title: "Le opere — Danimagined",
  description:
    "Nove tavole tra creature ibride, scene narrative e ritratti fantasy.",
};

export default function OperePage() {
  return (
    <main className="pt-36 pb-28 px-6 md:px-10 bg-bg min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Showcase</p>
          <h1 className="font-serif font-light text-4xl md:text-6xl mb-6">
            Le opere
          </h1>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            Nove tavole tra creature ibride, scene narrative e ritratti.
            Clicca per entrare nell&apos;opera.
          </p>
        </div>

        <WorksGallery />
      </div>
    </main>
  );
}
