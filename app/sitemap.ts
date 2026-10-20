import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/content";
import { site } from "@/lib/site";

const absolute = (src: string) => (src.startsWith("http") ? src : `${site.url}${src}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks();
  // Date reali di modifica: se cambiano a ogni richiesta Google smette di fidarsi.
  const dates = works.map((w) => w.updatedAt).filter((d): d is string => Boolean(d));
  const latest = dates.length ? new Date(dates.sort().at(-1)!) : undefined;
  return [
    { url: site.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/opere`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contatti`, changeFrequency: "yearly", priority: 0.7 },
    ...works.map((w) => ({
      url: `${site.url}/opere/${w.slug}`,
      lastModified: w.updatedAt ? new Date(w.updatedAt) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [absolute(w.image.src)],
    })),
  ];
}
