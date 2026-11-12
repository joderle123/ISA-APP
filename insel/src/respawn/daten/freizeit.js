// RESPAWN – freie Nachmittage. Einmal je Jahreszeit sucht man sich aus, wohin man geht. Nichts davon ist eine Übung:
// Es sind die Dinge, die Jugendliche wirklich tun. Jedes kostet etwas.
import { hatKarte } from '../run.js';
export const FREIZEIT = [
  { id: 'wasser', titel: 'Allein ans Wasser', bild: 'welle', ort: 'strandHuette', uhr: 18.4, satz: 'Wellen. Sonst nichts. Dein Kopf wird leiser.',
    e: (R) => ({ druck: hatKarte(R, 'zwei') ? -15 : -20 }) },
  { id: 'job', titel: 'Am Kiosk jobben', bild: 'muenzen', ort: 'snackStand', uhr: 15.2, satz: 'Vier Stunden Pommes. Fränz zahlt bar.',
    e: (R) => ({ geld: hatKarte(R, 'allein') ? 25 : 20, druck: 5, bond: { fraenz: 1 }, flag: 'job' }) },
  { id: 'hafen', titel: 'Mit Tun und Jolie abhängen', bild: 'herz', ort: 'dorfplatz', uhr: 16.6, satz: 'Ihr sitzt am Brunnen und redet über nichts.',
    e: () => ({ druck: -10, bond: { tun: 1, jolie: 1 }, ruf: { hafen: 1 } }) },
  { id: 'krater', titel: 'Hoch zum Krater', bild: 'flamme', ort: 'kraterRand', uhr: 21.8, satz: 'Musik aus einer Box. Mikas Crew macht dir Platz.',
    e: () => ({ druck: -15, ruf: { krater: 1 }, bond: { yara: 1 }, spaet: 1 }) },
  { id: 'zocken', titel: 'Zocken bis nachts', bild: 'pad', ort: 'bootshaus', uhr: 23.4, satz: 'Noch eine Runde. Und noch eine. Halb drei.',
    e: (R) => ({ druck: hatKarte(R, 'oma') ? -20 : -25, spaet: 1 }) },
  { id: 'pit', titel: 'Mit Pit Tricks üben', bild: 'brett', ort: 'dorfplatz', uhr: 15.5, satz: 'Du fällst zehnmal. Pit lacht nicht einmal.',
    e: () => ({ druck: -15, bond: { pit: 1 } }) },
];
// Je Jahreszeit vier Angebote (Reihenfolge fest, damit jede Runde anders aussieht, aber planbar bleibt)
export const FREIZEIT_JE = { herbst: ['wasser', 'job', 'hafen', 'zocken'], winter: ['job', 'hafen', 'krater', 'zocken'], fruehling: ['wasser', 'job', 'pit', 'krater'], sommer: ['wasser', 'hafen', 'pit', 'krater'] };
