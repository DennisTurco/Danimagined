import type { Metadata } from "next";
import WorksGallery from "@/components/WorksGallery";
import JsonLd from "@/components/JsonLd";
import { getCategories, getWorks } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const works = await getWorks();
  const cover = works[0]?.image;
  return {
    title: "Le opere: portfolio di illustrazione fantasy",
    description:
      "Portfolio di illustrazione e concept art fantasy: creature ibride, scene narrative e ritratti digitali realizzati da Danimagined.",
    alternates: { canonical: "/opere" },
    openGraph: {
      url: "/opere",
      title: "Le opere - Danimagined",
      description: "Creature ibride, scene narrative e ritratti fantasy: il portfolio di Danimagined.",
      images: cover ? [{ url: cover.src, width: cover.width, height: cover.height }] : undefined,
    },
  };
}

export default async function OperePage() {
  const [works, categories] = await Promise.all([getWorks(), getCategories()]);

  return (
    <main className="relative pt-36 md:pt-44 pb-24 md:pb-32 px-5 md:px-10 bg-bg min-h-screen overflow-hidden">
      <span className="section-label !top-44">Galleria</span>
      <div className="glow-accent w-[520px] h-[520px] -top-20 left-1/4 opacity-50" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Le opere - Danimagined",
          url: `${site.url}/opere`,
          inLanguage: "it-IT",
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: works.map((w, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/opere/${w.slug}`,
              name: w.title,
            })),
          },
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="eyebrow-gold mb-6">Showcase</p>
            <h1 className="font-serif font-light text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-white whitespace-nowrap">
              Le{" "}
              <span className="italic text-shimmer animate-shimmer">opere</span>
            </h1>
          </div>
          <p className="text-white/55 max-w-sm leading-relaxed lg:pb-4">
            {works.length === 0
              ? "Nuove tavole in arrivo: torna a trovarmi presto."
              : `${works.length === 1 ? "Una tavola" : `${works.length} tavole`} tra ${categories
                  .map((c) => c.title.toLowerCase())
                  .join(", ")
                  .replace(/, ([^,]*)$/, " e $1")}. Clicca per entrare nell'opera.`}
          </p>
        </div>

        <WorksGallery works={works} categories={categories} />
      </div>
    </main>
  );
}
