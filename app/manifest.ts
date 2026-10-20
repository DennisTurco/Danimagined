import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Danimagined - Illustrazione & Concept Art",
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: "#242220",
    theme_color: "#242220",
    lang: "it",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
