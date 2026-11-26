// Culture générale VP: Zusammensetzung der neun Module nach dem Programm CULGE (CNES, 30/06/2026) – Prüfung 26.11.2026.
// Drei Domänen × drei Niveaus: D1 „Mein Leben, mein Körper, mein Wohlbefinden“ (M1 1.1 · M4 1.2 · M7 1.3),
// D2 „Erde, Natur und Umwelt“ (M2 2.1 · M5 2.2 · M8 2.3), D3 „Leben in der Gesellschaft früher und heute“ (M3 3.1 · M6 3.2 · M9 3.3).
// Die Lektionen stammen aus culge-quelle1…9 (die alten Hefte ordneten Geschichte M1/M4/M7 zu – das Programm will D3 in M3/M6/M9);
// neue Lektionen für fehlende Pflichtkompetenzen in culge-neu.mjs.
import { sachModul } from './sachfach-gemeinsam.mjs'
import * as Q1 from './culge-quelle1.mjs'
import * as Q2 from './culge-quelle2.mjs'
import * as Q3 from './culge-quelle3.mjs'
import * as Q4 from './culge-quelle4.mjs'
import * as Q5 from './culge-quelle5.mjs'
import * as Q6 from './culge-quelle6.mjs'
import * as Q7 from './culge-quelle7.mjs'
import * as Q8 from './culge-quelle8.mjs'
import * as Q9 from './culge-quelle9.mjs'
import { NEU } from './culge-neu.mjs'

const Q = [null, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9]
// [Quellmodul, Lektion (ab 1)] oder 'neu:<id>'
const L = (q, l) => Q[q].LEKTIONEN[l - 1]
const T = (de, fr, icon, n) => ({ titel: { de, fr }, icon, lektionen: n })
const alt = (q) => Q[q].MODUL

export const AUFBAU = {
  1: { kopf: { titel: 'Mein Körper, mein Wohlbefinden', titelFr: 'Mon corps, mon bien-être',
      unter: 'Mein Körper und was er mir sagt, groß werden, meine Grenzen, gut essen, schlafen und sich bewegen – und sicher mit Handy und Bildern im Netz.',
      unterFr: 'Mon corps, grandir, mes limites, bien manger, dormir, bouger – et être en sécurité avec le portable et les images.',
      farbe: alt(2).farben.tief, deckbild: ['lea:froh:stehen-zeigen', 'yusuf:froh:stehen', 'mia:froh:tasse'], blasen: [{ t: 'Mein Körper!', x: 16, y: 112 }, { t: 'Stopp – nein!', x: 118, y: 98 }, { t: 'Gute Nacht!', x: 164, y: 150 }] },
    themen: [T('Mein Körper', 'Mon corps', 'heartbeat', 3), T('Gesund leben', 'Vivre en bonne santé', 'apple', 3), T('Sicher im Netz', 'En sécurité sur Internet', 'shield-lock', 2)],
    lektionen: () => [NEU.koerper, L(5, 5), NEU.grenzen, L(2, 5), L(2, 6), L(2, 7), L(3, 7), L(3, 8)] },
  2: { kopf: { titel: 'Natur entdecken – Luxemburg erkunden', titelFr: 'Découvrir la nature et le Luxembourg',
      unter: 'Was lebt? Pflanzen im Versuch, Pflanzen- und Fleischfresser im Wald, Nahrungsketten, Karten lesen, Ösling und Gutland, Wasser – und Müll vermeiden.',
      unterFr: 'Le vivant, les plantes, la forêt et les chaînes alimentaires, lire une carte, le Luxembourg, l’eau – et réduire les déchets.',
      farbe: '#3d8a3a', deckbild: alt(2).deckbild, blasen: [{ t: 'Lebt das?', x: 16, y: 112 }, { t: 'Wo ist Norden?', x: 118, y: 98 }, { t: 'Was frisst wer?', x: 164, y: 150 }] },
    themen: [T('Lebewesen', 'Les êtres vivants', 'plant-2', 4), T('Luxemburg auf der Karte', 'Le Luxembourg sur la carte', 'map-2', 2), T('Wasser und Umwelt', 'L’eau et l’environnement', 'droplet', 2)],
    lektionen: () => [L(2, 1), L(2, 2), L(2, 3), L(2, 4), L(3, 1), L(3, 2), L(3, 5), L(2, 8)] },
  3: { kopf: { ...kopfVon(1) }, themen: alt(1).themen, lektionen: () => Q1.LEKTIONEN },
  4: { kopf: { titel: 'So funktioniert mein Körper', titelFr: 'Comment fonctionne mon corps',
      unter: 'Knochen und Muskeln, Herz, Atmung und Verdauung, wie ein Baby entsteht und wo man Hilfe findet, Sucht und Erste Hilfe – und Werbung und Daten durchschauen.',
      unterFr: 'Squelette, cœur, respiration, digestion, la reproduction et où trouver de l’aide, dépendances, premiers secours – publicité et données.',
      farbe: alt(5).farben.tief, deckbild: alt(5).deckbild, blasen: alt(5).blasen },
    themen: [T('So funktioniert mein Körper', 'Mon corps', 'heartbeat', 5), T('Gesund und sicher', 'Santé et sécurité', 'first-aid-kit', 2), T('Medien durchschauen', 'Comprendre les médias', 'device-mobile', 2)],
    lektionen: () => [L(5, 1), L(5, 2), L(5, 3), L(5, 4), NEU.fortpflanzung, L(5, 6), L(5, 7), L(6, 7), L(6, 8)] },
  5: { kopf: { titel: 'Europa, Natur und Technik', titelFr: 'L’Europe, la nature et la technique',
      unter: 'Länder und Hauptstädte, die Europäische Union und unsere Nachbarn – Magnete, Schwimmen und Sinken, Energie, Licht, Wetter und Strom im Versuch – und das Klima schützen.',
      unterFr: 'Pays et capitales, l’Union européenne, nos voisins – aimants, flotter et couler, énergie, lumière, météo et électricité – protéger le climat.',
      farbe: alt(6).farben.tief, deckbild: alt(6).deckbild, blasen: alt(6).blasen },
    themen: [T('Europa', 'L’Europe', 'world', 3), T('Natur und Technik', 'Nature et technique', 'flask', 6), T('Klima', 'Le climat', 'temperature', 1)],
    lektionen: () => [L(6, 1), L(6, 2), L(3, 3), L(6, 3), L(6, 4), L(6, 5), L(6, 6), L(3, 4), L(3, 6), L(5, 8)] },
  6: { kopf: { ...kopfVon(4) }, themen: alt(4).themen, lektionen: () => Q4.LEKTIONEN },
  7: { kopf: { titel: 'Gut leben – sicher und kritisch', titelFr: 'Bien vivre – en sécurité et avec esprit critique',
      unter: 'Stress und Entspannung, Liebe, Einverständnis und Schutz, Risiken von Alkohol und Drogen, Gefahren im Haushalt – und künstliche Intelligenz und Fake News kritisch prüfen.',
      unterFr: 'Stress et détente, amour, consentement et protection, alcool et drogues, dangers à la maison – IA et fausses informations.',
      farbe: alt(8).farben.tief, deckbild: alt(8).deckbild, blasen: alt(8).blasen },
    themen: [T('Ich und die anderen', 'Moi et les autres', 'users', 4), T('Sicher leben', 'Vivre en sécurité', 'alert-triangle', 1), T('Kritisch im Netz', 'Esprit critique sur Internet', 'robot', 2)],
    lektionen: () => [L(8, 1), L(8, 2), NEU.schutz, L(8, 3), L(9, 5), L(9, 7), L(9, 8)] },
  8: { kopf: { titel: 'Die Erde schützen – die Welt verstehen', titelFr: 'Protéger la Terre – comprendre le monde',
      unter: 'Extremwetter, Trinkwasser, Bienen, ein T-Shirt auf Weltreise, Lebensmittel retten – Kontinente und Klimazonen, Rohstoffe im Handy, Strom sparen und Chemie im Alltag.',
      unterFr: 'Climat extrême, eau potable, abeilles, commerce équitable, gaspillage – continents, zones climatiques, matières premières, électricité et chimie.',
      farbe: alt(9).farben.tief, deckbild: alt(9).deckbild, blasen: alt(9).blasen },
    themen: [T('Natur schützen', 'Protéger la nature', 'leaf', 3), T('Fair konsumieren', 'Consommer équitable', 'shirt', 2), T('Die Welt verstehen', 'Comprendre le monde', 'world', 5)],
    lektionen: () => [L(8, 4), L(8, 5), L(8, 6), L(8, 7), L(8, 8), L(9, 1), L(9, 2), L(9, 3), L(9, 4), L(9, 6)] },
  9: { kopf: { ...kopfVon(7) }, themen: alt(7).themen, lektionen: () => Q7.LEKTIONEN },
}
function kopfVon(q) {
  const m = Q[q].MODUL
  return { titel: m.titel.de, titelFr: m.titel.fr, unter: m.untertitel.de, unterFr: m.untertitel.fr, farbe: m.farben.tief, deckbild: m.deckbild, blasen: m.blasen }
}

export function culgeModul(nr) {
  const a = AUFBAU[nr], lektionen = a.lektionen().filter(Boolean)
  const themen = a.themen.map((t) => ({ ...t }))
  // Themen an die tatsächliche Zahl der Lektionen anpassen (falls eine neue Lektion noch fehlt)
  let rest = lektionen.length; themen.forEach((t, i) => { t.lektionen = i === themen.length - 1 ? rest : Math.min(t.lektionen, rest); rest -= t.lektionen })
  // Quellenangaben (Kartengrundlagen u. a.) der Hefte übernehmen, aus denen die Lektionen stammen
  const herkunft = [...new Set(lektionen.map((l) => Q.findIndex((q) => q && q.LEKTIONEN.includes(l))).filter((q) => q > 0))]
  const quellen = [...new Set(herkunft.map((q) => Q[q].MODUL.quellen).filter(Boolean))].join(' ')
  const MODUL = { ...sachModul('culge', nr, { ...a.kopf, themen: themen.filter((t) => t.lektionen > 0) }), quellen }
  return { MODUL, LEKTIONEN: lektionen }
}
