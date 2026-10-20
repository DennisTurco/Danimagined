// Dati fissi del sito. Contatti, social e testi si gestiscono da Sanity (Impostazioni).
export const site = {
  // Dominio di produzione: usato per canonical, sitemap, Open Graph e dati strutturati.
  url: "https://www.danimagined.com",
  name: "Danimagined",
  locale: "it_IT",
};

export function mailto(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
