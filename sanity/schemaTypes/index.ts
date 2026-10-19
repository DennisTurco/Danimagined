import { opera } from "./opera";
import { categoria } from "./categoria";
import { pacchetto } from "./pacchetto";
import { landing } from "./landing";
import { chiSono } from "./chiSono";
import { impostazioni } from "./impostazioni";

export const schemaTypes = [opera, categoria, pacchetto, landing, chiSono, impostazioni];

// Documenti unici: uno solo per tipo, con ID fisso uguale al nome del tipo.
export const singletonTypes = new Set(["landing", "chiSono", "impostazioni"]);
