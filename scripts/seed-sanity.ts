/**
 * Importa in Sanity i contenuti di esempio (lib/defaults.ts) con le relative immagini.
 *
 *   npx sanity login
 *   npm run sanity:seed
 *
 * Crea solo i documenti che non esistono ancora: le modifiche fatte nello Studio
 * non vengono sovrascritte. Aggiungi "-- --replace" per forzare la sovrascrittura.
 *
 * Usa il token del login della CLI (o SANITY_AUTH_TOKEN, se impostato).
 */
import { createReadStream, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  categories,
  defaultAbout,
  defaultLanding,
  defaultPackages,
  defaultSettings,
  defaultWorks,
} from "../lib/defaults";
import type { Img } from "../lib/types";

function cliToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN;
  const configDir = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  try {
    const config = JSON.parse(readFileSync(path.join(configDir, "sanity", "config.json"), "utf8"));
    return config.authToken as string | undefined;
  } catch {
    return undefined;
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = cliToken();
if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID mancante in .env.local");
if (!token) throw new Error("Token non trovato: esegui prima `npx sanity login`");

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});
const replace = process.argv.includes("--replace");
const uploaded = new Map<string, string>();

async function image(img: Img | undefined, alt?: string) {
  if (!img) return undefined;
  let assetId = uploaded.get(img.src);
  if (!assetId) {
    const file = path.join(process.cwd(), "public", img.src);
    console.log(`  ↑ ${img.src}`);
    const asset = await client.assets.upload("image", createReadStream(file), {
      filename: path.basename(file),
    });
    assetId = asset._id;
    uploaded.set(img.src, assetId);
  }
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt: alt ?? img.alt ?? undefined,
  };
}

const slug = (current: string) => ({ _type: "slug", current });
const key = (i: number) => `k${i}`;

async function save(doc: { _id: string; _type: string; [k: string]: unknown }) {
  if (replace) await client.createOrReplace(doc);
  else await client.createIfNotExists(doc);
  console.log(`✓ ${doc._type} ${doc._id}`);
}

async function main() {
  console.log(`Importo in ${client.config().projectId}/${client.config().dataset}${replace ? " (sovrascrivo)" : ""}`);

  const categoryList = Object.values(categories);
  for (const [i, c] of categoryList.entries()) {
    await save({
      _id: `categoria-${c.slug}`,
      _type: "categoria",
      title: c.title,
      filterLabel: c.filterLabel,
      slug: slug(c.slug),
      order: i + 1,
    });
  }

  for (const [i, w] of defaultWorks.entries()) {
    await save({
      _id: `opera-${w.slug}`,
      _type: "opera",
      title: w.title,
      slug: slug(w.slug),
      image: await image(w.image),
      category: { _type: "reference", _ref: `categoria-${w.category.slug}` },
      featured: w.featured,
      description: w.description,
      year: w.year,
      technique: w.technique,
      price: w.price,
      order: i + 1,
    });
  }

  for (const [i, p] of defaultPackages.entries()) {
    await save({
      _id: `pacchetto-${i + 1}`,
      _type: "pacchetto",
      name: p.name,
      price: p.price,
      description: p.description,
      bullets: p.bullets,
      highlight: p.highlight,
      order: i + 1,
    });
  }

  const l = defaultLanding;
  await save({
    _id: "landing",
    _type: "landing",
    heroImage: await image(l.heroImage),
    heroEyebrow: l.heroEyebrow,
    heroTitle: l.heroTitle,
    heroTitleAccent: l.heroTitleAccent,
    heroDescription: l.heroDescription,
    heroCover: l.heroCover ? { _type: "reference", _ref: `opera-${l.heroCover.slug}` } : undefined,
    introEyebrow: l.introEyebrow,
    introTitle: l.introTitle,
    introTitleAccent: l.introTitleAccent,
    introParagraphs: l.introParagraphs,
    services: l.services.map((s, i) => ({ _key: key(i), _type: "servizio", ...s })),
    marqueeWords: l.marqueeWords,
    pricingTitle: l.pricingTitle,
    pricingIntro: l.pricingIntro,
    pricingNote: l.pricingNote,
    ctaTitle: l.ctaTitle,
    ctaTitleAccent: l.ctaTitleAccent,
    ctaTitleEnd: l.ctaTitleEnd,
    ctaText: l.ctaText,
    ctaImage: await image(l.ctaImage),
  });

  const a = defaultAbout;
  await save({
    _id: "chiSono",
    _type: "chiSono",
    eyebrow: a.eyebrow,
    title: a.title,
    titleAccent: a.titleAccent,
    image: await image(a.image),
    paragraphs: a.paragraphs,
    quote: a.quote,
    linkLabel: a.linkLabel,
  });

  const s = defaultSettings;
  await save({
    _id: "impostazioni",
    _type: "impostazioni",
    email: s.email,
    socials: s.socials.map((x, i) => ({ _key: key(i), _type: "social", ...x })),
    bookingUrl: s.bookingUrl,
    commissionsOpen: s.commissionsOpen,
    responseTime: s.responseTime,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    ogImage: await image(s.ogImage),
  });

  console.log("Importazione completata.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
