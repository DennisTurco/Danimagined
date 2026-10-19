import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
import { imageField } from "./imageWithAlt";

export const impostazioni = defineType({
  name: "impostazioni",
  title: "Impostazioni",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contatti", title: "Contatti", default: true },
    { name: "commissioni", title: "Commissioni" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contatti",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "socials",
      title: "Social",
      type: "array",
      group: "contatti",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", title: "Piattaforma", type: "string", validation: (r) => r.required() }),
            defineField({ name: "handle", title: "Nome utente", type: "string" }),
            defineField({
              name: "url",
              title: "Link al profilo",
              type: "url",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "handle" } },
        },
      ],
    }),
    defineField({
      name: "bookingUrl",
      title: "Link prenotazione Google Calendar",
      type: "url",
      group: "commissioni",
      description:
        "Google Calendar → Programmazione appuntamenti → Condividi → Pagina di prenotazione. Se vuoto, la call si richiede via email.",
    }),
    defineField({
      name: "commissionsOpen",
      title: "Commissioni aperte",
      type: "boolean",
      group: "commissioni",
      description: "Se disattivato, il sito mostra \"Commissioni chiuse\".",
      initialValue: true,
    }),
    defineField({
      name: "responseTime",
      title: "Tempo di risposta",
      type: "string",
      group: "commissioni",
      description: "Es. \"48 ore\".",
      initialValue: "48 ore",
    }),
    defineField({
      name: "seoTitle",
      title: "Titolo del sito per Google",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(70).warning("Oltre 70 caratteri Google lo taglia."),
    }),
    defineField({
      name: "seoDescription",
      title: "Descrizione del sito per Google",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(170).warning("Oltre 160 caratteri Google la taglia."),
    }),
    imageField("ogImage", "Immagine di anteprima per i social", {
      group: "seo",
      description: "Mostrata quando il sito viene condiviso. Ideale 1200×630.",
    }),
  ],
  preview: { prepare: () => ({ title: "Impostazioni" }) },
});
