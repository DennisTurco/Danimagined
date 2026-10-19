import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Danimagined — Illustrazione & Concept Art",
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: "#242220",
    theme_color: "#242220",
    lang: "it",
    icons: [{ src: "/images/logo.png", sizes: "1254x1254", type: "image/png" }],
  };
}
