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
        validation: (rule) =>
          rule.custom((alt, ctx) =>
            !alt && (ctx.parent as { asset?: unknown } | undefined)?.asset
              ? "Consigliato per Google Immagini: descrivi cosa si vede (es. \"drago dorato con cacciatore\")."
              : true
          ).warning(),
      }),
    ],
    validation: options.required ? (rule) => rule.required() : undefined,
  });
}
