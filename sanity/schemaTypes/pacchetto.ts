import { defineField, defineType } from "sanity";
import { TagsIcon } from "@sanity/icons";

export const pacchetto = defineType({
  name: "pacchetto",
  title: "Pacchetto",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Prezzo di partenza (€)",
      type: "number",
      description: "Mostrato come \"da 50€\".",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bullets",
      title: "Cosa include",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "highlight",
      title: "Più richiesto",
      type: "boolean",
      description: "Evidenzia il pacchetto con il bordo dorato e l'etichetta \"Più richiesto\".",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      description: "I numeri più bassi compaiono prima.",
    }),
  ],
  orderings: [{ title: "Ordine", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", price: "price", highlight: "highlight" },
    prepare: ({ title, price, highlight }) => ({
      title,
      subtitle: `da ${price ?? "?"}€${highlight ? " · ★ Più richiesto" : ""}`,
    }),
  },
});
