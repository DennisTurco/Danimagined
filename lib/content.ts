import "server-only";
import { cache } from "react";
import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";
import {
  defaultAbout,
  defaultLanding,
  defaultPackages,
  defaultSettings,
  defaultWorks,
} from "@/lib/defaults";
import type { About, Category, Img, Landing, Package, Settings, Work } from "@/lib/types";

// Tag usato per tutte le richieste: il webhook /api/revalidate lo invalida a ogni
// pubblicazione, così il sito mostra subito le modifiche fatte nello Studio.
export const SANITY_TAG = "sanity";

const isDev = process.env.NODE_ENV === "development";

// Niente CDN di Sanity: la cache la gestisce Next (revalidate + webhook). Con la CDN il
// webhook potrebbe rileggere dati non ancora aggiornati e tenerli in cache per un'ora.
// In sviluppo niente cache: le modifiche fatte nello Studio si vedono al primo refresh.
const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: isDev ? 0 : 3600, tags: [SANITY_TAG] },
    });
  } catch (error) {
    console.error("[sanity] richiesta fallita:", error);
    return null;
  }
}

// ---------- Immagini ----------

const IMAGE = `{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt,
  hotspot
}`;

type RawImg = Omit<Img, "position"> & { hotspot?: { x: number; y: number } | null };

function toImg(raw: RawImg | null | undefined, fallbackAlt = ""): Img | undefined {
  if (!raw?.src) return undefined;
  const { hotspot, ...rest } = raw;
  return {
    ...rest,
    alt: rest.alt || fallbackAlt,
    lqip: rest.lqip ?? undefined,
    position: hotspot ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%` : undefined,
  };
}

// Toglie i null restituiti da GROQ, così i valori di esempio coprono solo i campi vuoti.
function compact<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
  ) as Partial<T>;
}

// ---------- Opere ----------

const WORK = `{
  title,
  "slug": slug.current,
  "image": image${IMAGE},
  "category": category->{ title, "filterLabel": coalesce(filterLabel, title), "slug": slug.current },
  "featured": coalesce(featured, false),
  description,
  year,
  technique,
  price,
  "updatedAt": _updatedAt
}`;

type RawWork = Omit<Work, "image"> & { image: RawImg };

function toWork(raw: RawWork): Work | null {
  const image = toImg(raw.image, raw.title);
  if (!raw.slug || !image || !raw.category?.slug) return null;
  return { ...raw, ...compact(raw), image } as Work;
}

export const getWorks = cache(async (): Promise<Work[]> => {
  const raw = await fetchSanity<RawWork[]>(
    groq`*[_type == "opera" && defined(slug.current) && defined(image.asset)]
      | order(coalesce(order, 9999) asc, _createdAt desc) ${WORK}`
  );
  if (!raw) return defaultWorks;
  return raw.map(toWork).filter((w): w is Work => w !== null);
});

export async function getWork(slug: string): Promise<Work | undefined> {
  const works = await getWorks();
  return works.find((w) => w.slug === slug);
}

export async function getFeaturedWorks(): Promise<Work[]> {
  const works = await getWorks();
  const featured = works.filter((w) => w.featured);
  return featured.length > 0 ? featured : works.slice(0, 8);
}

// Categorie che hanno almeno un'opera, nell'ordine scelto nello Studio.
export async function getCategories(): Promise<Category[]> {
  const works = await getWorks();
  const used = new Set(works.map((w) => w.category.slug));
  const raw = await fetchSanity<Category[]>(
    groq`*[_type == "categoria" && defined(slug.current)] | order(coalesce(order, 9999) asc, title asc){
      title, "filterLabel": coalesce(filterLabel, title), "slug": slug.current
    }`
  );
  const list = raw ?? [...new Map(works.map((w) => [w.category.slug, w.category])).values()];
  return list.filter((c) => used.has(c.slug));
}

// ---------- Pacchetti ----------

export const getPackages = cache(async (): Promise<Package[]> => {
  const raw = await fetchSanity<Package[]>(
    groq`*[_type == "pacchetto"] | order(coalesce(order, 9999) asc, price asc){
      name, price, description, "bullets": coalesce(bullets, []), "highlight": coalesce(highlight, false)
    }`
  );
  return raw && raw.length > 0 ? raw : defaultPackages;
});

// ---------- Documenti unici ----------

export const getLanding = cache(async (): Promise<Landing> => {
  const raw = await fetchSanity<Record<string, unknown> | null>(
    groq`*[_id == "landing"][0]{
      ...,
      "heroImage": heroImage${IMAGE},
      "ctaImage": ctaImage${IMAGE},
      "heroCover": heroCover->{ title, "slug": slug.current }
    }`
  );
  if (!raw) return defaultLanding;
  const { heroImage, ctaImage, heroCover, ...rest } = raw as Record<string, never>;
  return {
    ...defaultLanding,
    ...compact(rest),
    heroImage: toImg(heroImage) ?? defaultLanding.heroImage,
    ctaImage: toImg(ctaImage) ?? toImg(heroImage) ?? defaultLanding.ctaImage,
    heroCover: (heroCover as Landing["heroCover"]) ?? undefined,
  };
});

export const getAbout = cache(async (): Promise<About> => {
  const raw = await fetchSanity<Record<string, unknown> | null>(
    groq`*[_id == "chiSono"][0]{ ..., "image": image${IMAGE} }`
  );
  if (!raw) return defaultAbout;
  const { image, ...rest } = raw as Record<string, never>;
  return {
    ...defaultAbout,
    ...compact(rest),
    image: toImg(image, "Ritratto dell'artista") ?? defaultAbout.image,
  };
});

export const getSettings = cache(async (): Promise<Settings> => {
  const raw = await fetchSanity<Record<string, unknown> | null>(
    groq`*[_id == "impostazioni"][0]{ ..., "ogImage": ogImage${IMAGE} }`
  );
  if (!raw) return defaultSettings;
  const { ogImage, bookingUrl, socials, ...rest } = raw as Record<string, never>;
  return {
    ...defaultSettings,
    ...compact(rest),
    // Campi che, se lasciati vuoti, devono restare vuoti (niente valori di esempio).
    bookingUrl: bookingUrl ?? undefined,
    socials: socials ?? [],
    ogImage: toImg(ogImage) ?? defaultSettings.ogImage,
  };
});
