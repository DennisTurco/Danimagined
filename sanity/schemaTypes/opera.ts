import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { imageField } from "./imageWithAlt";

export const opera = defineType({
  name: "opera",
  title: "Opera",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Indirizzo della pagina",
      type: "slug",
      description: "Generato dal titolo: diventa /opere/indirizzo. Evita di cambiarlo dopo la pubblicazione.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    imageField("image", "Immagine", { required: true }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      type: "boolean",
      description: "Le opere in evidenza compaiono nel carosello della home.",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 4,
      description: "Usata nella pagina dell'opera e come descrizione per Google.",
    }),
    defineField({
      name: "year",
      title: "Anno",
      type: "number",
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: "technique",
      title: "Tecnica",
      type: "string",
      initialValue: "Digitale",
    }),
    defineField({
      name: "price",
      title: "Prezzo indicativo di un'opera simile (€)",
      type: "number",
      description: "Mostrato come \"Simile da\". Lascia vuoto per non mostrarlo.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      description: "I numeri più bassi compaiono prima. Senza ordine, le più recenti vanno in fondo.",
    }),
  ],
  orderings: [
    { title: "Ordine", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "Più recenti", name: "recent", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", category: "category.title", featured: "featured", media: "image" },
    prepare: ({ title, category, featured, media }) => ({
      title,
      subtitle: [category, featured ? "★ In evidenza" : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
