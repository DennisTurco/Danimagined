import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const categoria = defineType({
  name: "categoria",
  title: "Categoria",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      description: "Es. Creature design, Scena narrativa, Ritratto.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "filterLabel",
      title: "Etichetta del filtro",
      type: "string",
      description:
        "Testo del pulsante filtro nella pagina Opere (es. \"Creature\"). Se vuoto, si usa il nome.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      description: "I numeri più bassi compaiono prima nei filtri.",
    }),
  ],
  orderings: [{ title: "Ordine", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
