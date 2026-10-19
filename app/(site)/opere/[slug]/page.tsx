import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWork, getWorks } from "@/lib/content";
import WorkDetail from "@/components/WorkDetail";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const absolute = (src: string) => (src.startsWith("http") ? src : `${site.url}${src}`);

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return { title: "Opera non trovata" };
  const url = `/opere/${work.slug}`;
  const description = work.description ?? `${work.category.title} di Danimagined.`;
  const image = { url: work.image.src, width: work.image.width, height: work.image.height, alt: work.title };
  return {
    title: `${work.title} - ${work.category.title}`,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${work.title} - Danimagined`, description, images: [image] },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} - Danimagined`,
      description,
      images: [work.image.src],
    },
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const [work, works] = await Promise.all([getWork(slug), getWorks()]);
  if (!work) notFound();

  const url = `${site.url}/opere/${work.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "VisualArtwork",
              "@id": `${url}#artwork`,
              name: work.title,
              description: work.description,
              url,
              image: {
                "@type": "ImageObject",
                url: absolute(work.image.src),
                width: work.image.width,
                height: work.image.height,
              },
              artform: "Illustrazione digitale",
              artMedium: work.technique ?? "Pittura digitale",
              genre: work.category.title,
              dateCreated: work.year ? String(work.year) : undefined,
              inLanguage: "it-IT",
              creator: { "@id": `${site.url}/#artist` },
              copyrightHolder: { "@id": `${site.url}/#artist` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Opere", item: `${site.url}/opere` },
                { "@type": "ListItem", position: 3, name: work.title, item: url },
              ],
            },
          ],
        }}
      />
      <WorkDetail work={work} works={works} />
    </>
  );
}
