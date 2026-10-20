// Forme dei contenuti usate dai componenti, indipendenti da dove arrivano (Sanity o esempio).

export interface Img {
  src: string;
  width: number;
  height: number;
  alt?: string;
  lqip?: string;
  // Punto focale scelto in Sanity, in formato CSS object-position (es. "70% 40%").
  position?: string;
}

export interface Category {
  title: string;
  filterLabel: string;
  slug: string;
}

export interface Work {
  title: string;
  slug: string;
  image: Img;
  category: Category;
  featured: boolean;
  description?: string;
  year?: number;
  technique?: string;
  price?: number;
  // Ultima modifica in Sanity (ISO), usata nella sitemap.
  updatedAt?: string;
}

export interface Package {
  name: string;
  price: number;
  description: string;
  bullets: string[];
  highlight: boolean;
}

export interface Service {
  title: string;
  description?: string;
}

export interface Landing {
  heroImage: Img;
  heroEyebrow?: string;
  heroTitle: string;
  heroTitleAccent?: string;
  heroDescription: string;
  heroCover?: { title: string; slug: string };
  introEyebrow?: string;
  introTitle?: string;
  introTitleAccent?: string;
  introParagraphs: string[];
  services: Service[];
  marqueeWords: string[];
  pricingTitle?: string;
  pricingIntro?: string;
  pricingNote?: string;
  ctaTitle?: string;
  ctaTitleAccent?: string;
  ctaTitleEnd?: string;
  ctaText?: string;
  ctaImage?: Img;
}

export interface About {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  image: Img;
  paragraphs: string[];
  quote?: string;
  linkLabel?: string;
}

export interface Social {
  label: string;
  handle?: string;
  url: string;
}

export interface Settings {
  email: string;
  socials: Social[];
  bookingUrl?: string;
  commissionsOpen: boolean;
  responseTime: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: Img;
}
