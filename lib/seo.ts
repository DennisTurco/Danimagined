import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import type { Img } from "@/lib/types";
import { site } from "@/lib/site";

// Next sostituisce per intero openGraph e twitter del layout quando una pagina li
// definisce: questo helper rimette sempre nome del sito, lingua e immagine di anteprima.
export async function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: Img;
  type?: "website" | "article";
}): Promise<Metadata> {
  const settings = await getSettings();
  const img = image ?? settings.ogImage;
  const images = img ? [{ url: img.src, width: img.width, height: img.height, alt: img.alt || title }] : undefined;
  const fullTitle = `${title} - ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images?.map((i) => i.url) },
  };
}
