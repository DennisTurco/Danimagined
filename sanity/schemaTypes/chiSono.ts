import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";
import { imageField } from "./imageWithAlt";

export const chiSono = defineType({
  name: "chiSono",
  title: "Chi sono",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Sopratitolo", type: "string" }),
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "titleAccent", title: "Parte del titolo in evidenza", type: "string" }),
    imageField("image", "Foto", { required: true }),
    defineField({
      name: "paragraphs",
      title: "Paragrafi",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "La prima lettera del primo paragrafo diventa un capolettera.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "quote", title: "Citazione", type: "text", rows: 2 }),
    defineField({
      name: "linkLabel",
      title: "Testo del link finale",
      type: "string",
      description: "Il link porta alla pagina Contatti.",
    }),
  ],
  preview: { prepare: () => ({ title: "Chi sono" }) },
});
