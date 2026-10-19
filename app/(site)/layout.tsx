import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import { getAbout, getPackages, getSettings } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const og = settings.ogImage;
  const xHandle = settings.socials.find((s) => /x\.com|twitter\.com/.test(s.url))?.handle;
  return {
    title: { default: settings.seoTitle, template: "%s - Danimagined" },
    description: settings.seoDescription,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [
      "concept art",
      "illustrazione fantasy",
      "illustratore su commissione",
      "character design",
      "creature design",
      "illustrazione digitale",
      "ritratto digitale su commissione",
      "copertine libri fantasy",
      "illustrazioni giochi di ruolo",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: "/",
      siteName: site.name,
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: og ? [{ url: og.src, width: og.width, height: og.height, alt: og.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: og ? [og.src] : undefined,
      creator: xHandle,
      site: xHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, about, packages] = await Promise.all([getSettings(), getAbout(), getPackages()]);
  const prices = packages.map((p) => p.price);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              url: site.url,
              name: site.name,
              description: settings.seoDescription,
              inLanguage: "it-IT",
              publisher: { "@id": `${site.url}/#artist` },
            },
            {
              "@type": ["Person", "ProfessionalService"],
              "@id": `${site.url}/#artist`,
              name: site.name,
              url: site.url,
              email: settings.email,
              image: about.image.src.startsWith("http") ? about.image.src : `${site.url}${about.image.src}`,
              logo: `${site.url}/images/logo.png`,
              jobTitle: "Illustratore e concept artist",
              description: settings.seoDescription,
              areaServed: "IT",
              priceRange: prices.length ? `€${Math.min(...prices)} - €${Math.max(...prices)}+` : undefined,
              knowsAbout: ["Concept art", "Character design", "Creature design", "Illustrazione digitale"],
              sameAs: settings.socials.map((s) => s.url),
            },
          ],
        }}
      />
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-gold focus:text-bg focus:px-5 focus:py-3 text-xs uppercase tracking-[0.22em]"
      >
        Vai al contenuto
      </a>
      <div className="grain-overlay" />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <div id="contenuto">{children}</div>
      <Footer />
    </>
  );
}
