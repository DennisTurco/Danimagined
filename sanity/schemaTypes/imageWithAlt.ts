import { defineField } from "sanity";

// Immagine con punto focale (hotspot) e testo alternativo per accessibilità e SEO.
export function imageField(
  name: string,
  title: string,
  options: { required?: boolean; description?: string; group?: string } = {}
) {
  return defineField({
    name,
    title,
    type: "image",
    description: options.description,
    group: options.group,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Testo alternativo",
        type: "string",
        description:
          "Descrive l'immagine a chi non può vederla e ai motori di ricerca. Se vuoto, si usa il titolo.",
      }),
    ],
    validation: options.required ? (rule) => rule.required() : undefined,
  });
}
