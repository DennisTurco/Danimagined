export type CatFilter = "creature" | "scena" | "ritratto";

export interface Work {
  id: number;
  img: string;
  imgCutout?: string;
  cat: string;
  catFilter: CatFilter;
  title: string;
  year: string;
  price: string;
  desc: string;
}

export const works: Work[] = [
  {
    id: 0,
    img: "/images/works/drago.jpg",
    imgCutout: "/images/works/cutout/drago.png",
    cat: "Scena narrativa",
    catFilter: "scena",
    title: "Il patto del sovrano dorato",
    year: "2025",
    price: "150€",
    desc: "Un cacciatore in piedi sulla coda del drago che avrebbe dovuto ucciderlo. Il patto è già stato firmato: nessuno dei due lo dirà mai ad alta voce.",
  },
  {
    id: 1,
    img: "/images/works/minotauro.jpg",
    imgCutout: "/images/works/cutout/minotauro.png",
    cat: "Scena narrativa",
    catFilter: "scena",
    title: "L'ultimo respiro del labirinto",
    year: "2025",
    price: "150€",
    desc: "La bestia è a terra, il vincitore non esulta. Ho lavorato la scena come un dipinto di storia: torce, pietra umida, una vittoria che pesa.",
  },
  {
    id: 2,
    img: "/images/works/witcher.jpg",
    imgCutout: "/images/works/cutout/witcher.png",
    cat: "Scena narrativa",
    catFilter: "scena",
    title: "Caccia nella neve bianca",
    year: "2024",
    price: "150€",
    desc: "Neve, corna, un teschio che guarda dall'alto. Tutta la tavola è costruita sul contrasto tra il bianco del bosco e la sagoma nera che lo abita.",
  },
  {
    id: 3,
    img: "/images/works/illustrazione1.jpg",
    imgCutout: "/images/works/cutout/illustrazione1.png",
    cat: "Scena narrativa",
    catFilter: "scena",
    title: "La mano sulla bestia",
    year: "2024",
    price: "150€",
    desc: "Una creatura enorme e una ragazza che invece di scappare la tocca. Il momento esatto in cui la paura diventa un'altra cosa.",
  },
  {
    id: 4,
    img: "/images/works/character.jpg",
    imgCutout: "/images/works/cutout/character.png",
    cat: "Character design",
    catFilter: "ritratto",
    title: "Il sacerdote dagli occhi di ghiaccio",
    year: "2025",
    price: "70€",
    desc: "Character design per un antagonista: spalle d'oro, rune incise sulla pelle, due fessure di luce al posto dello sguardo.",
  },
  {
    id: 5,
    img: "/images/works/rinoceronte.jpg",
    imgCutout: "/images/works/cutout/rinoceronte.png",
    cat: "Creature design",
    catFilter: "creature",
    title: "Rinoceronte coleottero",
    year: "2024",
    price: "90€",
    desc: "Ibrido tra rinoceronte e coleottero: corazza chitinosa, corno iridescente, andatura pesante. Anatomia reale, istinto inventato.",
  },
  {
    id: 6,
    img: "/images/works/falco-koala.jpg",
    imgCutout: "/images/works/cutout/falco-koala.png",
    cat: "Creature design",
    catFilter: "creature",
    title: "Falco koala",
    year: "2024",
    price: "90€",
    desc: "Un predatore che non fa paura: apertura alare da rapace, faccia da koala. Studio su quanto il muso cambi la lettura di una creatura.",
  },
  {
    id: 7,
    img: "/images/works/orso-beluga.jpg",
    imgCutout: "/images/works/cutout/orso-beluga.png",
    cat: "Creature design",
    catFilter: "creature",
    title: "Orso beluga",
    year: "2024",
    price: "90€",
    desc: "Pelliccia bianca, coda da cetaceo, una tormenta intorno. Progettato per un bestiario polare.",
  },
  {
    id: 8,
    img: "/images/works/portrait1.jpg",
    cat: "Ritratto",
    catFilter: "ritratto",
    title: "Sguardo di lato",
    year: "2025",
    price: "50€",
    desc: "Studio di ritratto dal vero: pennellate lasciate grezze sui capelli, pelle costruita per passaggi di temperatura.",
  },
];

export function getWork(id: number): Work | undefined {
  return works.find((w) => w.id === id);
}
