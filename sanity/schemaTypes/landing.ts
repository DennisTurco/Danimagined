import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { imageField } from "./imageWithAlt";

export const landing = defineType({
  name: "landing",
  title: "Landing (home)",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Apertura", default: true },
    { name: "intro", title: "Il lavoro" },
    { name: "marquee", title: "Fascia scorrevole" },
    { name: "pricing", title: "Pacchetti" },
    { name: "cta", title: "Invito finale" },
  ],
  fields: [
    imageField("heroImage", "Immagine di apertura", {
      required: true,
      group: "hero",
      description: "Grande immagine a tutto schermo. Usa il punto focale per scegliere cosa resta visibile su mobile.",
    }),
    defineField({ name: "heroEyebrow", title: "Sopratitolo", type: "string", group: "hero" }),
    defineField({
      name: "heroTitle",
      title: "Titolo",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitleAccent",
      title: "Parte del titolo in evidenza",
      type: "string",
      description: "Va a capo in corsivo dorato dopo il titolo.",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Descrizione",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCover",
      title: "Opera in copertina",
      type: "reference",
      to: [{ type: "opera" }],
      description: "Link \"In copertina\" in basso a destra. Di solito è l'opera dell'immagine di apertura.",
      group: "hero",
    }),

    defineField({ name: "introEyebrow", title: "Sopratitolo", type: "string", group: "intro" }),
    defineField({ name: "introTitle", title: "Titolo", type: "string", group: "intro" }),
    defineField({
      name: "introTitleAccent",
      title: "Parte del titolo in evidenza",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introParagraphs",
      title: "Paragrafi",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "intro",
    }),
    defineField({
      name: "services",
      title: "Servizi",
      type: "array",
      group: "intro",
      validation: (rule) => rule.max(4),
      of: [
        {
          type: "object",
          name: "servizio",
          fields: [
            defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Descrizione", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "marqueeWords",
      title: "Parole",
      type: "array",
      of: [{ type: "string" }],
      group: "marquee",
    }),

    defineField({ name: "pricingTitle", title: "Titolo", type: "string", group: "pricing" }),
    defineField({ name: "pricingIntro", title: "Introduzione", type: "text", rows: 2, group: "pricing" }),
    defineField({
      name: "pricingNote",
      title: "Nota in fondo",
      type: "string",
      description: "Es. tempi di consegna e acconto.",
      group: "pricing",
    }),

    defineField({ name: "ctaTitle", title: "Titolo", type: "string", group: "cta" }),
    defineField({ name: "ctaTitleAccent", title: "Parola in evidenza", type: "string", group: "cta" }),
    defineField({ name: "ctaTitleEnd", title: "Fine del titolo", type: "string", group: "cta" }),
    defineField({ name: "ctaText", title: "Testo", type: "text", rows: 3, group: "cta" }),
    imageField("ctaImage", "Immagine di sfondo", { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Landing (home)" }) },
});
