import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/content";
import { site } from "@/lib/site";

const absolute = (src: string) => (src.startsWith("http") ? src : `${site.url}${src}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks();
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/opere`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contatti`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...works.map((w) => ({
      url: `${site.url}/opere/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [absolute(w.image.src)],
    })),
  ];
}
