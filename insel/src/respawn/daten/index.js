// RESPAWN – alle Inhalte an einer Stelle
import { SITUATIONEN_1 } from './situationen-1.js';
import { SITUATIONEN_2 } from './situationen-2.js';
import { SITUATIONEN_3 } from './situationen-3.js';
export { KARTEN, KARTEN_ART } from './karten.js';
export { AKTE, AKTE_LEER } from './akte.js';
export { AUSGAENGE } from './ausgaenge.js';
export { ORTE, ORT_BEI, ORT_AKTIONEN, LEUTE_AKTIONEN, LEUTE_REIHE, FOLGEN, VERPASST, WICHTIG, GROSSE, statistSagt, TRATSCH_ZEILEN, ideenFuerHeute, IDEEN_ZEILEN } from './welt.js';
export { FIGUREN, STIMMEN } from './figuren.js';
export const SITUATIONEN = SITUATIONEN_1.concat(SITUATIONEN_2, SITUATIONEN_3);
