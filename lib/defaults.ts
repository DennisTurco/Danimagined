// Contenuti di esempio: usati quando Sanity non è configurato e come base per
// l'importazione iniziale (scripts/seed-sanity.ts). Solo import relativi, così lo
// script di importazione può leggerli anche fuori da Next.
import type { About, Category, Landing, Package, Settings, Work } from "./types";

export const categories = {
  creatureDesign: { title: "Creature design", filterLabel: "Creature", slug: "creature-design" },
  scenaNarrativa: { title: "Scena narrativa", filterLabel: "Scene", slug: "scena-narrativa" },
  characterDesign: { title: "Character design", filterLabel: "Character", slug: "character-design" },
  ritratto: { title: "Ritratto", filterLabel: "Ritratti", slug: "ritratto" },
} satisfies Record<string, Category>;

export const defaultWorks: Work[] = [
  {
    title: "Il patto del sovrano dorato",
    slug: "il-patto-del-sovrano-dorato",
    image: { src: "/images/works/drago.jpg", width: 8004, height: 4500 },
    category: categories.scenaNarrativa,
    featured: true,
    description:
      "Un cacciatore in piedi sulla coda del drago che avrebbe dovuto ucciderlo. Il patto è già stato firmato: nessuno dei due lo dirà mai ad alta voce.",
    year: 2025,
    technique: "Digitale",
    price: 150,
  },
  {
    title: "L'ultimo respiro del labirinto",
    slug: "l-ultimo-respiro-del-labirinto",
    image: { src: "/images/works/minotauro.jpg", width: 1920, height: 1080 },
    category: categories.scenaNarrativa,
    featured: true,
    description:
      "La bestia è a terra, il vincitore non esulta. Ho lavorato la scena come un dipinto di storia: torce, pietra umida, una vittoria che pesa.",
    year: 2025,
    technique: "Digitale",
    price: 150,
  },
  {
    title: "Caccia nella neve bianca",
    slug: "caccia-nella-neve-bianca",
    image: { src: "/images/works/witcher.jpg", width: 2520, height: 1800 },
    category: categories.scenaNarrativa,
    featured: true,
    description:
      "Neve, corna, un teschio che guarda dall'alto. Tutta la tavola è costruita sul contrasto tra il bianco del bosco e la sagoma nera che lo abita.",
    year: 2024,
    technique: "Digitale",
    price: 150,
  },
  {
    title: "La mano sulla bestia",
    slug: "la-mano-sulla-bestia",
    image: { src: "/images/works/illustrazione1.jpg", width: 1080, height: 680 },
    category: categories.scenaNarrativa,
    featured: true,
    description:
      "Una creatura enorme e una ragazza che invece di scappare la tocca. Il momento esatto in cui la paura diventa un'altra cosa.",
    year: 2024,
    technique: "Digitale",
    price: 150,
  },
  {
    title: "Il sacerdote dagli occhi di ghiaccio",
    slug: "il-sacerdote-dagli-occhi-di-ghiaccio",
    image: { src: "/images/works/character.jpg", width: 806, height: 1080 },
    category: categories.characterDesign,
    featured: true,
    description:
      "Character design per un antagonista: spalle d'oro, rune incise sulla pelle, due fessure di luce al posto dello sguardo.",
    year: 2025,
    technique: "Digitale",
    price: 70,
  },
  {
    title: "Rinoceronte coleottero",
    slug: "rinoceronte-coleottero",
    image: { src: "/images/works/rinoceronte.jpg", width: 1080, height: 1353 },
    category: categories.creatureDesign,
    featured: true,
    description:
      "Ibrido tra rinoceronte e coleottero: corazza chitinosa, corno iridescente, andatura pesante. Anatomia reale, istinto inventato.",
    year: 2024,
    technique: "Digitale",
    price: 90,
  },
  {
    title: "Falco koala",
    slug: "falco-koala",
    image: { src: "/images/works/falco-koala.jpg", width: 1163, height: 801 },
    category: categories.creatureDesign,
    featured: true,
    description:
      "Un predatore che non fa paura: apertura alare da rapace, faccia da koala. Studio su quanto il muso cambi la lettura di una creatura.",
    year: 2024,
    technique: "Digitale",
    price: 90,
  },
  {
    title: "Orso beluga",
    slug: "orso-beluga",
    image: { src: "/images/works/orso-beluga.jpg", width: 1163, height: 801 },
    category: categories.creatureDesign,
    featured: true,
    description:
      "Pelliccia bianca, coda da cetaceo, una tormenta intorno. Progettato per un bestiario polare.",
    year: 2024,
    technique: "Digitale",
    price: 90,
  },
  {
    title: "Sguardo di lato",
    slug: "sguardo-di-lato",
    image: { src: "/images/works/portrait1.jpg", width: 1200, height: 1500 },
    category: categories.ritratto,
    featured: false,
    description:
      "Studio di ritratto dal vero: pennellate lasciate grezze sui capelli, pelle costruita per passaggi di temperatura.",
    year: 2025,
    technique: "Digitale",
    price: 50,
  },
];

export const defaultPackages: Package[] = [
  {
    name: "Ritratto",
    price: 50,
    description:
      "Testa e spalle, sfondo neutro. Il volto lavorato a pennellata piena, luce studiata sul soggetto.",
    bullets: ["1 bozzetto di impostazione", "2 giri di revisione", "File digitale ad alta risoluzione"],
    highlight: false,
  },
  {
    name: "Half-body",
    price: 70,
    description:
      "Mezzo busto con posa, abiti e armatura. Lo spazio giusto per dare un carattere al personaggio.",
    bullets: ["2 bozzetti di posa", "2 giri di revisione", "Studio di colore incluso"],
    highlight: false,
  },
  {
    name: "Creature design",
    price: 90,
    description:
      "Una creatura originale o un ibrido, progettata sull'anatomia reale: come si muove, come caccia, come respira.",
    bullets: ["3 proposte di silhouette", "3 giri di revisione", "Vista finale + dettagli"],
    highlight: true,
  },
  {
    name: "Illustrazione",
    price: 150,
    description:
      "Scena completa: personaggio, creatura e ambiente. Una storia intera dentro un'unica inquadratura.",
    bullets: [
      "Thumbnail di composizione",
      "Revisioni illimitate in bozza",
      "Formato stampa fino a 60×40 cm",
    ],
    highlight: false,
  },
];

export const defaultLanding: Landing = {
  heroImage: {
    src: "/images/works/drago.jpg",
    width: 8004,
    height: 4500,
    alt: "Un cacciatore in piedi sulla coda di un drago dorato",
    position: "70% 50%",
  },
  heroEyebrow: "Illustrazione & Concept Art",
  heroTitle: "Dove l'uomo incontra",
  heroTitleAccent: "la sua creatura",
  heroDescription:
    "Pennellate digitali, bestie nate dal mito e ritratti che guardano indietro. Ogni tavola è una scena: qualcuno sta per decidere qualcosa, e la creatura davanti a lui lo sa.",
  heroCover: { title: "Il patto del sovrano dorato", slug: "il-patto-del-sovrano-dorato" },
  introEyebrow: "Il lavoro",
  introTitle: "Non disegno soggetti. Disegno",
  introTitleAccent: "l'istante prima",
  introParagraphs: [
    "Lavoro in digitale con una pennellata volutamente visibile: la texture resta, il segno resta. È il modo in cui costruisco atmosfera - nebbia, neve, torce, il peso di una bestia che respira.",
    "Realizzo character design, creature e ibridi, scene narrative e ritratti su commissione - per giochi di ruolo, progetti indie, editoria e collezionisti privati.",
  ],
  services: [
    { title: "Character design", description: "Figure umane, armature, volti che raccontano un passato." },
    { title: "Creature design", description: "Ibridi credibili: anatomia vera, istinto inventato." },
    { title: "Scene narrative", description: "Ambiente, luce e conflitto in una sola inquadratura." },
  ],
  marqueeWords: ["Character design", "Creature design", "Scene narrative", "Ritratti", "Cover & editoria"],
  pricingTitle: "Pacchetti",
  pricingIntro:
    "Prezzi di partenza. Il preventivo finale dipende da complessità, numero di soggetti e uso finale - commerciale o personale.",
  pricingNote:
    "Consegna tipica 7–21 giorni · Acconto 30% all'accettazione · Disponibile in digitale o su tela",
  ctaTitle: "Hai una",
  ctaTitleAccent: "creatura",
  ctaTitleEnd: "in testa che non esiste ancora?",
  ctaText:
    "Raccontamela. Bastano due righe, qualche reference e il formato che ti serve - ti rispondo con tempi e preventivo entro 48 ore.",
  ctaImage: { src: "/images/works/drago.jpg", width: 8004, height: 4500, alt: "" },
};

export const defaultAbout: About = {
  eyebrow: "Chi sono",
  title: "Nel 2023 ho scelto di",
  titleAccent: "tornare a disegnare",
  image: {
    src: "/images/chi-sono.jpg",
    width: 1200,
    height: 1600,
    alt: "Ritratto dell'artista mentre disegna su tavoletta grafica",
  },
  paragraphs: [
    "Mi sono affidato a un'accademia e ho iniziato a fare quello che mi è sempre piaciuto. Ho lasciato indietro una parte importante della mia vita, ma da quella parte ho imparato molto: gestire la pressione, tenere la disciplina.",
    "Quello che mi affascina è l'intero processo creativo: la ricerca delle reference, i primi segni sbagliati, il momento in cui la figura smette di essere una macchia e comincia a guardarti.",
  ],
  quote: "Disegno finché la bestia non decide da sola come guardarmi.",
  linkLabel: "Lavoriamo insieme",
};

export const defaultSettings: Settings = {
  email: "hello@danimagined.com",
  socials: [
    { label: "Instagram", handle: "@danimagined", url: "https://www.instagram.com/danimagined/" },
    { label: "X", handle: "@danimagined", url: "https://x.com/danimagined" },
  ],
  bookingUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1C0peF75VEsLM90kXWOO7Ku_ARW822n_XsEDGyUmmFRUII1I1MFEpsXQoTSchgDOzOxPbXmPVp",
  commissionsOpen: true,
  responseTime: "48 ore",
  seoTitle: "Danimagined - Illustrazione & Concept Art fantasy su commissione",
  seoDescription:
    "Illustrazione e concept art fantasy su commissione: character design, creature ibride, scene narrative e ritratti digitali. Preventivo entro 48 ore.",
  ogImage: { src: "/images/og-default.jpg", width: 1200, height: 630, alt: "Danimagined - Concept Art" },
};
