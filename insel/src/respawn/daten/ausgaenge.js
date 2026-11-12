// RESPAWN – Ausgänge eines Durchgangs. Der erste passende gilt (Reihenfolge = Vorrang). Im Album steht ein Ausgang
// erst mit Namen, wenn man ihn einmal erreicht hat; vorher nur der Hinweis.
import { hat, bond, besteBindung } from '../run.js';

const schwer = (R) => ['kasse', 'spray', 'boot', 'auto', 'clip', 'schubsen', 'schlag', 'mitfahren.erwischt', 'tasche'].filter((a) => R.akte.includes(a)).length;
const schuetzt = (R) => ['video.geloescht', 'pit.geholfen', 'neue.geschuetzt', 'fest.geblieben', 'fest.hilfe', 'fest.gemeldet', 'mitfahren.gestoppt', 'luege.begleitet'].filter((f) => hat(R, f)).length;
// freies Spiel: etwas angestellt / von sich aus zugegeben / ein anderer steht dafür gerade
const MIST = ['kasse.geklaut', 'spray', 'boot.genommen', 'auto.genommen', 'markt.geklaut'];
const zugegeben = (R) => ['kasse', 'spray', 'boot', 'auto', 'markt'].filter((k) => hat(R, 'gestanden.' + k)).length;
const andererBuesst = (R) => hat(R, 'kasse.pitverdacht') || hat(R, 'spray.tunschuld') || hat(R, 'markt.noorverdacht');
const aerger = (R) => hat(R, 'schlag') || hat(R, 'luege.gelogen') || hat(R, 'video.geteilt') || hat(R, 'mitfahren.erwischt') || hat(R, 'kontrolle.laut') || MIST.some((f) => hat(R, f));
const gutgemacht = (R) => zugegeben(R) > 0 || hat(R, 'luege.gestanden') || hat(R, 'gespraech.eigen') || hat(R, 'pit.geholfen') || hat(R, 'fest.geblieben') || hat(R, 'fest.gemeldet');
const freunde = (R) => ['jolie', 'tun', 'pit', 'noor', 'maelle', 'tiago'].filter((w) => bond(R, w) >= 3).length;

export const AUSGAENGE = [
  { id: 'geflogen', titel: 'Von der Insel geflogen', bild: 'faehre', farbe: '#ff5a3d', hinweis: 'Wenn zu viel zusammenkommt.',
    wenn: (R) => (hat(R, 'schlag') && (hat(R, 'mitfahren.erwischt') || hat(R, 'tasche') || R.akte.length >= 5)) || schwer(R) >= 4,
    text: ['Die Fähre nimmt dich mit. Diesmal ohne Rückfahrt.', 'In der Akte steht alles. Nur nicht, warum.'] },
  { id: 'allein', titel: 'Allein auf der Insel', bild: 'nebel', farbe: '#b9b2e0', hinweis: 'Alles machen, was man will. Mit jedem.',
    wenn: (R) => Object.values(R.bond).filter((b) => b <= -2).length >= 3,
    text: ['Du hast gemacht, was du wolltest. Mit allen.', 'Am Steg ist Platz neben dir. Viel Platz.'] },
  { id: 'krater', titel: 'Mikas rechte Hand', bild: 'flamme', farbe: '#ff8c42', hinweis: 'Am Krater ist immer Platz.',
    wenn: (R) => R.ruf.krater >= 4 && (hat(R, 'tasche') || hat(R, 'mitfahren.schmiere')),
    text: ['Du gehörst zur Crew. Alle grüßen dich.', 'Mika ruft an. Immer nachts. Du gehst immer ran.'] },
  { id: 'davongekommen', titel: 'Davongekommen', bild: 'nebel', farbe: '#7d8aa0', hinweis: 'Nicht erwischt werden. Egal, wer zahlt.',
    wenn: (R) => andererBuesst(R),
    text: ['Dich hat keiner erwischt. Glückwunsch.', 'Bezahlt hat ein anderer. Das weißt nur du.'] },
  { id: 'dazwischen', titel: 'Geht dazwischen', bild: 'schild', farbe: '#4d8cff', hinweis: 'Für andere einstehen. Mehr als einmal.',
    wenn: (R) => schuetzt(R) >= 3,
    text: ['Auf der Insel sagen sie: Frag die Person vom Steg.', 'Wenn es brennt, schauen sie zu dir.'] },
  { id: 'werft', titel: 'Lehrstelle in der Werft', bild: 'hammer', farbe: '#d8a26b', hinweis: 'Arbeiten. Und drei Tage, die zählen.',
    wenn: (R) => hat(R, 'prakt.gut') && hat(R, 'job') && bond(R, 'fraenz') >= 3 && !hat(R, 'mitfahren.erwischt'),
    text: ['Fränz legt dir einen Vertrag hin.', 'Im Herbst fängst du an. Um sieben.'] },
  { id: 'leute', titel: 'Deine Leute', bild: 'herz', farbe: '#ff4f8b', hinweis: 'Zwei, auf die du zählen kannst.',
    wenn: (R) => freunde(R) >= 2,
    text: ['Am Steg warten sie auf dich. Jeden Abend.', 'Die Fähre fährt ohne dich. Du bleibst.'] },
  { id: 'abgehauen', titel: 'Abgehauen mit dem Boot', bild: 'boot', farbe: '#8fa3ff', hinweis: 'Viel Druck. Keiner, der hält.',
    wenn: (R) => R.druck >= 70 && !besteBindung(R),
    text: ['Nachts machst du ein Boot los.', 'Hinter dir wird die Insel klein. Keiner ruft.'] },
  { id: 'zweite', titel: 'Zweite Chance', bild: 'kreis', farbe: '#7ed957', hinweis: 'Mist bauen. Und dazu stehen.',
    wenn: (R) => aerger(R) && gutgemacht(R),
    text: ['Es lief nicht alles gut. Das weißt du.', 'Ilda sagt: Wer dazu steht, darf bleiben.'] },
  { id: 'kiosk', titel: 'Kiosk-König', bild: 'muenzen', farbe: '#ffd23f', hinweis: 'Sparen, sparen, sparen.',
    wenn: (R) => R.geld >= 110,
    text: ['Du hast mehr Geld als alle am Hafen.', 'Fränz fragt, ob du den Kiosk übernimmst.'] },
  { id: 'unsichtbar', titel: 'Unsichtbar', bild: 'nebel', farbe: '#9aa3b2', hinweis: 'Kein Ärger. Und sonst?',
    wenn: (R) => !R.akte.length && !besteBindung(R),
    text: ['Keiner hat etwas gegen dich.', 'Keiner kennt dich.'] },
  { id: 'offen', titel: 'Noch ein Jahr', bild: 'sonne', farbe: '#39d0c8', hinweis: 'Weder Held noch Ärger.',
    wenn: () => true,
    text: ['Das Jahr war okay. Nicht mehr, nicht weniger.', 'Ilda sagt: Bleib noch eins. Dann sehen wir.'] },
];
