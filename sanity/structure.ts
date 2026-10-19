import type { StructureResolver } from "sanity/structure";
import { CogIcon, HomeIcon, ImageIcon, TagIcon, TagsIcon, UserIcon } from "@sanity/icons";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: typeof HomeIcon) =>
  S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      singleton(S, "landing", "Landing (home)", HomeIcon),
      singleton(S, "chiSono", "Chi sono", UserIcon),
      S.divider(),
      S.listItem()
        .title("Opere")
        .icon(ImageIcon)
        .child(S.documentTypeList("opera").title("Opere").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem()
        .title("Categorie")
        .icon(TagIcon)
        .child(S.documentTypeList("categoria").title("Categorie").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem()
        .title("Pacchetti")
        .icon(TagsIcon)
        .child(S.documentTypeList("pacchetto").title("Pacchetti").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      singleton(S, "impostazioni", "Impostazioni", CogIcon),
    ]);
