// Mathe-Modulhefte (Voie de préparation, Module 1–9) – gemeinsamer Baukasten.
// Grundlage: das Mathe-Programm des Klassenbuchs (daten/mathe-programm.json, nach dem CNES-Referenzrahmen
// „Mathématiques – voie préparatoire“). Jede Lektion wird zu: Los geht’s (gemeinsam rechnen) · Verstehen (Erklärung
// zum Mitlesen) · Rechnen im Alltag (Szene zum Lesen) · Merken (Merksatz, Vorgehen, Musterlösungen, weitere Beispiele) ·
// Üben (Jetzt du, Basis, Kern, Übungspäckchen, Plus, Exit-Ticket) · Erklären · Kurz-Check. Dazu „Fit bleiben“ (Aufgaben
// von früher) am Anfang und nach jedem Thema eine Wiederholung. Ohne Hörtexte (Auftrag 23.11.2026).

import { readFileSync } from 'node:fs'
import { erzeuge } from '../mathe-gen.mjs'
import { eintragen, passt } from '../umwandlung.mjs'
import { umwandlungstabelle, umwandlungAnleitung } from './mathe-bilder.mjs'

export const PROGRAMM = JSON.parse(readFileSync(new URL('../daten/mathe-programm.json', import.meta.url), 'utf8'))

/** Aussprache für die Stimme (Python-Regex, nach den deutschen Grundregeln angewendet) */
const GROSS = ['UND', 'NICHT', 'RECHTS', 'SIEHT', 'EINER', 'NUR', 'SENKRECHT', 'ALLE', 'WELCHE', 'WO', 'LINKS', 'SOFORT', 'LETZTE', 'AUF', 'OBEN', 'UNTEN', 'NIE', 'KLEINER', 'HINTER', 'TIEFER', 'WÄRMER', 'DURCH', 'SEHEN', 'PLUS', 'MINUS', 'VOR', 'JEDES']
export const MATHE_AUSSPRACHE = {
  '\\s·\\s': ' · ', // Grundregel ausschalten: · wird unten passend gelesen
  '\\\\(?=[\\[\\]])': '', '\\|\\|\\|\\|\u0336': 'vier Striche und ein Querstrich', '⌐': '', '\\bbzw\\.': 'beziehungsweise', '→ ✗': '→ nein',
  '\\bkm²': 'Quadratkilometer', '\\bdm²': 'Quadratdezimeter', '\\bcm²': 'Quadratzentimeter', '\\bmm²': 'Quadratmillimeter', '(?<![\\d ])\\bm²': 'Quadratmeter',
  '≥': ' größer oder gleich ', '≤': ' kleiner oder gleich ', '≠': ' ungleich ', '∈ \\{': 'ist eine der Zahlen ', '[{}]': '',
  '\\(<\\s?': '(kleiner als ', '\\(>\\s?': '(größer als ', '\\bx/100\\b': 'x Hundertstel', '\\bha \\(Hektar\\)': 'Hektar', '(\\d) ?ha\\b': '\\1 Hektar', '(\\d) h\\b': '\\1 Stunden',
  ...Object.fromEntries(GROSS.map((w) => [`\\b${w}\\b`, w.toLowerCase()])), '\\bGRÖSSER\\b': 'größer', '\\bAUSSERHALB\\b': 'außerhalb',
  '\\((?:HT|ZT|T|H|Z|E)\\)': '', '(\\d (?:HT|ZT|T|H|Z|E)) · ': '\\1, ',
  '×/÷': ' mal oder geteilt durch ', '\\bmal/geteilt\\b': 'mal oder geteilt durch', '·': ' mal ', '×': ' mal ', '÷': ' geteilt durch ', '(\\d) : (\\d)': '\\1 geteilt durch \\2', '\\)/\\(': ') durch (',
  '(\\d)\\.(?=\\d{3}\\b)': '\\1', '−': ' minus ', '\\+': ' plus ', '≈': ' ungefähr ', '=': ' gleich ', '([A-Za-zäöüß]) → (?![A-Za-zäöüß]*\\s+gleich)': '\\1 zu ', '→': ', also ', '⇒': ', also ',
  ' < ': ' kleiner als ', ' > ': ' größer als ', '▢': ' Lücke ', '✅|❌|✓|✗|🟢|🟡|🔵': '',
  '(\\d+),(\\d\\d) ?€': '\\1 Euro \\2', '(\\d+) ?€': '\\1 Euro', '€': 'Euro', '(\\d) ?%': '\\1 Prozent', '°C': ' Grad', '°': ' Grad',
  '(\\d) ?km²': '\\1 Quadratkilometer', '(\\d) ?m²': '\\1 Quadratmeter', '(\\d) ?dm²': '\\1 Quadratdezimeter', '(\\d) ?cm²': '\\1 Quadratzentimeter', '(\\d) ?mm²': '\\1 Quadratmillimeter',
  '([A-Za-zäöü]{3,}) \\((?:km|m|dm|cm|mm|l|dl|cl|ml|t|kg|g)\\)': '\\1', '\\b1 t\\b': 'eine Tonne', '(?<=[Vv]on )t\\b': 'Tonnen', '(?<=nach )g\\b': 'Gramm', '(?<=nach )l\\b': 'Liter',
  '\\bkm\\b': 'Kilometer', '\\bdm\\b': 'Dezimeter', '\\bcm\\b': 'Zentimeter', '\\bmm\\b': 'Millimeter', '\\bkg\\b': 'Kilogramm', '\\bml\\b': 'Milliliter', '\\bcl\\b': 'Zentiliter', '\\bdl\\b': 'Deziliter',
  '(\\d) ?m\\b': '\\1 Meter', '(\\d) ?g\\b': '\\1 Gramm', '(\\d) ?l\\b': '\\1 Liter', '(\\d) ?t\\b': '\\1 Tonnen', '(\\d) ?min\\b': '\\1 Minuten',
  '(?<=, )m(?=,)': 'Meter', '\\bzu m\\b': 'zu Meter', '\\bt, Kilogramm\\b': 'Tonne, Kilogramm', '\\bKilogramm und g\\b': 'Kilogramm und Gramm', '\\bl, Deziliter\\b': 'Liter, Deziliter',
  '\\bHT\\b': 'Hunderttausender', '\\bZT\\b': 'Zehntausender', '(\\d) T\\b': '\\1 Tausender', '(\\d) H\\b': '\\1 Hunderter', '(\\d) Z\\b': '\\1 Zehner', '(\\d) E\\b': '\\1 Einer',
  '\\b1/2\\b': 'ein halb', '(\\d+)/2\\b': '\\1 Halbe', '(\\d+)/3\\b': '\\1 Drittel', '(\\d+)/4\\b': '\\1 Viertel', '(\\d+)/5\\b': '\\1 Fünftel', '(\\d+)/6\\b': '\\1 Sechstel', '(\\d+)/7\\b': '\\1 Siebtel',
  '(\\d+)/8\\b': '\\1 Achtel', '(\\d+)/9\\b': '\\1 Neuntel', '(\\d+)/10\\b': '\\1 Zehntel', '(\\d+)/12\\b': '\\1 Zwölftel', '(\\d+)/100\\b': '\\1 Hundertstel', '(\\d+)/1000\\b': '\\1 Tausendstel',
  '\\b1 (Drittel|Viertel|Fünftel|Sechstel|Siebtel|Achtel|Neuntel|Zehntel|Zwölftel|Hundertstel|Tausendstel)\\b': 'ein \\1',
  '\\[([A-Z])([A-Z])[\\]\\)]': '\\1 \\2', '\\(([A-Z])([A-Z])\\)': '\\1 \\2', ' / ': ' oder ', '(\\d)²': '\\1 hoch zwei', '\\b([a-z])²': '\\1 hoch zwei', '(\\d+)/(\\d+)': '\\1 durch \\2', '([a-zäöüß])/([A-Za-zäöüß])': '\\1 oder \\2', '\\|': ', ', '\\bz\\. ?B\\.': 'zum Beispiel',
}

const ANLEITUNG = [
  'Jede Lektion: **Los geht’s**, **Fit bleiben** (Aufgaben von früher), **Verstehen**, **Rechnen im Alltag**, **Merken** mit vielen **Beispielen**, **Üben** und **Erklären**. Am Ende steht ein **Kurz-Check**, nach jedem Thema eine **Wiederholung**.',
  'Schau dir die **Beispiele** genau an. Dann rechnest du bei **Jetzt du** genau so. Im **Übungspäckchen** übst du, bis es sitzt.',
  'Die Punkte zeigen das Niveau: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an. Rechne in den **Kästchen** – dort ist viel Platz.',
  'Die französischen Fachwörter stehen neben jeder Erklärung und hinten in der **Wörterliste**.',
]

const mische = (hex, ziel, anteil) => '#' + [0, 2, 4].map((i) => Math.round(parseInt(hex.slice(1 + i, 3 + i), 16) * (1 - anteil) + ziel * anteil).toString(16).padStart(2, '0')).join('')

/** Grunddaten eines Mathe-Moduls (Deckblatt, Farben, Teile) aus dem Programm, ergänzt um Angaben des Moduls */
export function matheModul(nr, extra) {
  const m = PROGRAMM.module[nr - 1]
  const tief = extra.farbe || m.farbe
  return {
    id: `mathe-m${nr}`, kuerzel: `ma${nr}`, nr, sprache: 'de', niveau: `Modul ${nr} von ${PROGRAMM.module.length}`, klasse: 'Voie de préparation',
    dateiname: `Mathe_Modul-${nr}`,
    fach: { de: 'Mathematik', fr: 'Mathématiques' },
    titel: { de: m.titel.replace(/ & /g, ' und '), fr: extra.titelFr },
    untertitel: { de: m.unter, fr: extra.unterFr || '' },
    farben: { tief, mittel: mische(tief, 255, 0.55), zart: mische(tief, 255, 0.92), dunkel: mische(tief, 0, 0.35) },
    deckbild: extra.deckbild, blasen: extra.blasen,
    themen: m.themen.map((t, i) => ({ titel: { de: t.titel.replace(/ & /g, ' und '), fr: '' }, icon: extra.themenIcons?.[i] || 'math', lektionen: t.lektionen.length })),
    anleitung: ANLEITUNG, checkMitSchreiben: true, ohneAudio: true,
    teile: { lesen: { de: 'Verstehen', icon: 'book' }, hoeren: { de: 'Rechnen im Alltag', icon: 'message-dots' }, regel: { de: 'Merken', icon: 'bulb' }, ueben: { de: 'Üben', icon: 'pencil' }, schreiben: { de: 'Erklären', icon: 'message-2' } },
    medien: [['book', 'var(--lesen)', 'Verstehen', 'Schritt für Schritt'], ['repeat', 'var(--hoeren)', 'Wiederholen', 'Fit bleiben und Päckchen'], ['bulb', 'var(--regel)', 'Merken', 'kurz und klar'], ['pencil', 'var(--schreiben)', 'Üben', 'mit Rechenkästchen']],
    aussprache: { ...MATHE_AUSSPRACHE, ...(extra.aussprache || {}) },
  }
}

// Texte aus dem Programm: [[3/4]] → Bruch {{3/4}}, andere eckige Klammern (Strecke [AB]) bleiben Klammern (keine Lücken)
const E = (s) => (typeof s === 'string' ? s.replace(/✅/g, '✓').replace(/❌/g, '✗').replace(/\[\[([^\]/]+)\/([^\]/]+)\]\]/g, '{{$1/$2}}').replace(/\[/g, '\\[').replace(/\]/g, '\\]') : s)
const P = (s) => (typeof s === 'string' ? s.replace(/✅/g, '✓').replace(/❌/g, '✗').replace(/\[\[([^\]/]+)\/([^\]/]+)\]\]/g, '$1/$2') : s)
const saetze = (s) => s.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ0-9„(])/).filter(Boolean)
// Kästchenhöhe: mindestens so groß, dass die Lösung (Handschrift) hineinpasst – auch mehr Platz zum Rechnen
const raumFuer = (l, raum = 1) => Math.max(raum, Math.ceil(String(l || '').length / 30))
const posten = (it) => ({ a: E(it.a), l: P(it.l || '').replace(/\.$/, ''), raum: it.tbl ? undefined : raumFuer(P(it.l), it.raum ?? 1), tbl: it.tbl })
const exitPosten = (x) => { const m = /^(.*)\(([^()]*)\)\s*$/.exec(x); return m ? { a: E(m[1].trim()), l: P(m[2]).replace(/^Lösung: /, '').replace(/\.$/, ''), raum: raumFuer(m[2], 1.6) } : { a: E(x), l: '', raum: 1.6 } }

/**
 * Lektionen eines Moduls. `extras[i]` (je Lektion, in Programm-Reihenfolge):
 *   fr (Lernziel französisch), bild, hoeren, erklaeren (Schreibauftrag), erklBild (HTML unter der Erklärung),
 *   lesenAufgaben, ueben (zusätzliche Aufgaben nach Basis/Kern/Plus), check (zusätzliche Punkte)
 */
// Merksatz: sind alle Sätze schon nummeriert („1) …“), als nummerierte Liste ohne doppelte Zeichen
const merksatzKasten = (punkte) => {
  const n = punkte.findIndex((p) => !/^\d+[.)]\s/.test(p)), k = n < 0 ? punkte.length : n
  if (k < 2 || punkte.slice(k).some((p) => /^\d+[.)]\s/.test(p))) return { titel: 'Merksatz', punkte }
  return { titel: 'Merksatz', nummern: true, punkte: punkte.slice(0, k).map((p) => p.replace(/^\d+[.)]\s+/, '')), text: punkte.slice(k).join(' ') || undefined }
}

// ---- Mehr Beispiele und mehr Wiederholung (Auftrag 23.11.2026: „mehr Beispiele, nicht genug Wiederholung“) ----
// Die Aufgaben würfeln die Erzeuger des Klassenbuchs (tools/hefte/mathe-gen.mjs) mit festem Startwert: jedes Mal dieselben,
// mit gerechneter Lösung. Lektionen ohne Erzeuger im Programm bekommen eigene (mathe-gen-extra.js):
const GEN_EXTRA = {
  '1-14': { type: 'symmetrie' }, '2-10': { type: 'streckeMitte' }, '3-7': { type: 'diagrammLesen' }, '3-8': { type: 'strichliste' },
  '4-15': { type: 'hoeheDreieck' }, '5-4': { type: 'propTabelle' }, '5-5': { type: 'propGraph' }, '5-8': { type: 'koordinaten' },
  '5-9': { type: 'geraden' }, '5-13': { type: 'zusammengesetzt' }, '6-5': { type: 'termAufstellen' },
}
export const genVon = (nr, l) => l.gen || GEN_EXTRA[`${nr}-${l.nr}`]
// alle Lektionen aller Module der Reihe nach – für „Fit bleiben“ auch über die Modulgrenze hinweg
const ALLE = PROGRAMM.module.flatMap((m, i) => m.themen.flatMap((t) => t.lektionen.map((l) => ({ nr: i + 1, l, gen: genVon(i + 1, l) }))))
const minusZeichen = (s) => String(s ?? '').replace(/(^|[\s(;=:])-(?=\d)/g, '$1−')
const gewuerfelt = (gen, n, niveau, seed) => erzeuge(gen, n, niveau, seed).map((x) => ({ a: minusZeichen(x.a), l: minusZeichen(x.l) }))
const spaltenFuer = (items) => (items.some((it) => String(it.a).length > 75 || String(it.l).length > 60) ? 1 : 2)

function mehrUebung(nr, m, L) {
  let j = 0
  for (const t of m.themen) {
    const imThema = []
    for (const l of t.lektionen) {
      const lek = L[j++], gen = genVon(nr, l), s = nr * 1000 + l.nr * 10
      if (gen) {
        const basis = gewuerfelt(gen, 13, 'basis', s + 1)
        const kern = gewuerfelt(gen, 14, 'kern', s + 2).filter((k) => !basis.some((b) => b.a === k.a))
        const bsp = basis.slice(0, 3), jetzt = basis.slice(3, 7), paeckchen = [...basis.slice(7, 13), ...kern.slice(0, 6)]
        // drei weitere vorgerechnete Beispiele unter den Musterlösungen
        lek.regel.reihen.push([{ art: 'beispiel', titel: 'Noch mehr Beispiele', nummern: true, punkte: bsp.map((b) => `${E(b.a)} → **${E(b.l)}**`) }])
        const ue = lek.ueben
        ue.unshift({ art: 'rechnen', auftrag: '**Jetzt du** – rechne genau wie in den Beispielen.', stufe: 1, items: jetzt.map(posten), spalten: spaltenFuer(jetzt) })
        const plus = ue.findIndex((a) => /^\*\*Plus\*\*/.test(a.auftrag || ''))
        ue.splice(plus < 0 ? ue.length - 1 : plus, 0, { art: 'rechnen', auftrag: '**Übungspäckchen** – übe, bis es sitzt. Erst die leichten, dann die schwereren.', stufe: 2, items: paeckchen.map(posten), spalten: spaltenFuer(paeckchen) })
      }
      // Fit bleiben: Aufgaben aus Lektionen von früher (1, 2, 4 und 7 Lektionen zurück – auch aus dem Modul davor)
      const g = ALLE.findIndex((a) => a.nr === nr && a.l.nr === l.nr)
      const frueher = [1, 2, 4, 7].map((d) => ALLE[g - d]).filter((a) => a && a.gen)
      if (frueher.length) {
        const fit = frueher.flatMap((a, k) => gewuerfelt(a.gen, frueher.length < 3 ? 2 : 1, 'basis', s + 50 + k * 7))
        lek.fit = [{ art: 'rechnen', auftrag: 'Rechne allein. Das kennst du schon!', stufe: 1, items: fit.map(posten), spalten: spaltenFuer(fit) }]
        lek.fitWas = 'Aufgaben von früher'
      }
      imThema.push({ l, gen })
    }
    // Wiederholung am Ende des Themas: gemischte Aufgaben aus allen Lektionen des Themas
    const mitGen = imThema.filter((x) => x.gen)
    if (mitGen.length) {
      const je = Math.max(2, Math.ceil(8 / mitGen.length))
      const listen = mitGen.map((x) => gewuerfelt(x.gen, je, 'kern', nr * 1000 + x.l.nr * 10 + 9))
      const gemischt = []
      for (let r = 0; r < je; r++) listen.forEach((li) => li[r] && gemischt.push(li[r]))
      const thema = P(t.titel).replace(/ & /g, ' und '), letzte = L[j - 1], auswahl = gemischt.slice(0, 16)
      letzte.wiederholung = [{ art: 'rechnen', auftrag: `**Gemischt** – Aufgaben aus ${mitGen.length > 1 ? 'allen Lektionen' : 'der Lektion'} zum Thema „${thema}“. Was kannst du schon sicher?`, stufe: 2, items: auswahl.map(posten), spalten: spaltenFuer(auswahl) }]
      letzte.wiederholungWas = thema
    }
  }
}

export function matheLektionen(nr, extras) {
  const m = PROGRAMM.module[nr - 1]
  const L = []
  let i = 0
  for (const t of m.themen) for (const l of t.lektionen) {
    const x = extras[i++] || {}
    const woerter = (l.wortschatz || []).map((w) => [P(w.de), P(w.fr)])
    L.push({
      thema: P(t.titel).replace(/ & /g, ' und '), titel: E(l.titel), untertitel: x.unter || E(l.einstieg.text),
      ziel: { de: E(l.lernziel), fr: x.fr || '' },
      // lange Titel / sehr lange Wörter: weniger Figuren, sonst wird der Kopf zu breit
      bild: x.bild && (Math.max(...l.titel.split(/\s+/).map((w) => w.length)) >= 17 ? undefined : l.titel.length > 40 ? x.bild.slice(0, 1) : x.bild),
      start: { was: E(l.einstieg.titel), aufgaben: [{ art: 'rechnen', auftrag: 'Rechnet gemeinsam. Sprecht laut, wie ihr rechnet.', stufe: 1, items: l.gemeinsam.map((g) => posten({ ...g, raum: 1 })) }] },
      lesen: {
        was: 'Die Erklärung', art: 'erklaerung', stimme: 'w1', titel: E(l.einstieg.titel), quelle: `Mathe · Modul ${nr} · ${t.titel.replace(/ & /g, ' und ')}`,
        def: { begriff: E(l.def.begriff) + ':', text: E(l.def.text) }, schritte: l.erklaerung.map((s) => ({ titel: E(s.titel), text: E(s.text), beispiel: E(s.beispiel) })), bild: x.erklBild,
        woerter, karte: { titel: 'Erklärung anhören', unter: 'Hör zu und lies mit.' }, aufgaben: x.lesenAufgaben || [],
      },
      hoeren: x.hoeren,
      regel: {
        reihen: [
          [merksatzKasten(saetze(E(l.merksatz))), { titel: 'So gehst du vor', nummern: true, punkte: l.vorgehen.map((v) => E(v).replace(/^\d+\.\s*/, '')) }],
          l.musterl.slice(0, 2).map((mu, j) => ({ art: j === 0 ? 'tipp' : 'beispiel', titel: mu.titel ? `Musterlösung: ${E(mu.titel)}` : 'Musterlösung', vor: `**Aufgabe:** ${E(mu.a)}`, nummern: true, punkte: mu.schritte.map(E), text: `**Ergebnis:** ${E(mu.erg)}` })),
        ],
      },
      ueben: [
        { art: 'rechnen', auftrag: '**Basis** – Schritt für Schritt.', stufe: 1, items: l.aufgaben.basis.items.map(posten) },
        { art: 'rechnen', auftrag: '**Kern** – das Niveau des Moduls.', stufe: 2, items: l.aufgaben.kern.items.map(posten) },
        { art: 'rechnen', auftrag: '**Plus** – zum Knobeln.', stufe: 3, items: l.aufgaben.plus.items.map(posten), spalten: l.aufgaben.plus.items.some((p) => (p.raum || 1) > 1 || p.tbl) ? 1 : 2 },
        ...(x.ueben || []),
        { art: 'rechnen', auftrag: '**Exit-Ticket** – allein lösen, ohne Hilfe.', stufe: 2, items: [exitPosten(l.exit)], spalten: 1 },
      ],
      schreiben: x.erklaeren ? [{ art: 'schreiben', stufe: 2, zeilen: 5, ...x.erklaeren }] : [],
      check: [E(l.lernziel), ...(x.check || [])],
      foerdertipp: l.foerdertipp, spiel: l.spiel,
    })
  }
  mehrUebung(nr, m, L)
  mitUmwandlungstabelle(nr, m, L)
  return L
}

// ---- Umwandlungstabelle bei JEDER Umwandlung (Auftrag 26.11.2026; Programm VP: „Connaître l’abaque des mesures …“) ----
// Jede Rechenaufgabe, die eine Umwandlung ist (auch Sachaufgaben wie „1,5 l. Wie viele ml?“), wird in eine Tabelle gelegt:
// im Heft leer, im Lösungsheft mit Ziffern, Nullen und dem roten Komma. In den Umwandlungs-Lektionen steht unter der
// Erklärung eine ausgefüllte Tabelle mit Beispielen und „So benutzt du die Tabelle“.
const GEN_ART = { laenge: 'laenge', kapazitaet: 'hohlmass', masse: 'masse', flaecheEinheit: 'flaeche', volumen: 'volumen' }
const BEISPIELE = {
  laenge: ['2 km = ___ m', '12 m = ___ cm', '3 m 45 cm = ___ cm', '5 cm = ___ mm'],   // Modul 1: nur in die kleinere Einheit
  hohlmass: ['3 l = ___ cl', '1,5 l = ___ ml', '300 ml = ___ dl', '25 cl = ___ l'],
  masse: ['4 kg = ___ g', '1,5 t = ___ kg', '2.500 g = ___ kg', '750 g = ___ kg'],
  flaeche: ['3 m² = ___ dm²', '5 ha = ___ a', '2,5 ha = ___ m²', '450 cm² = ___ dm²'],
  volumen: ['2 m³ = ___ dm³', '1,5 l = ___ cm³', '4.000 cm³ = ___ dm³', '3 cm³ = ___ mm³'],
}
// Lektionen ohne eigenen Umwandlungs-Erzeuger, in denen das Programm trotzdem Umwandlungen verlangt
// (M2: Längen mit Komma in beide Richtungen – Programm VP Mathematik, Modul 2)
const BEISPIELE_EXTRA = { '2-10': { art: 'laenge', aufgaben: ['5,6 cm = ___ mm', '125 mm = ___ cm', '2,35 m = ___ cm', '850 m = ___ km'] } }
function tabellenBloecke(liste) {
  if (!Array.isArray(liste)) return liste
  const neu = []
  for (const a of liste) {
    if (!a || a.art !== 'rechnen' || !Array.isArray(a.items)) { neu.push(a); continue }
    const rest = [], gruppen = {}
    for (const it of a.items) { const e = eintragen(it.a); if (e && (!it.l || passt(e, it.l))) (gruppen[e.art] = gruppen[e.art] || []).push(it.a); else rest.push(it) }
    if (!Object.keys(gruppen).length) { neu.push(a); continue }
    if (rest.length) neu.push({ ...a, items: rest })
    Object.entries(gruppen).forEach(([art, aufg], i) => neu.push({ art: 'frei', stufe: a.stufe,
      auftrag: (rest.length || i ? '**Mit der Umwandlungstabelle** – ' : String(a.auftrag || '').replace(/\s*$/, '').replace(/([^.!?:])$/, '$1.') + ' **Mit der Umwandlungstabelle:** ') + 'Trag jede Zahl ein, ergänze Nullen und lies in der neuen Einheit ab.',
      html: umwandlungstabelle(art, aufg) }))
  }
  return neu
}
function mitUmwandlungstabelle(nr, m, L) {
  let j = 0
  for (const t of m.themen) for (const l of t.lektionen) {
    const lek = L[j++], art = GEN_ART[(genVon(nr, l) || {}).type]
    if (art) lek.lesen.bild = umwandlungstabelle(art, BEISPIELE[art].map((a) => ({ aufgabe: a, zeige: true }))) + umwandlungAnleitung(art)
    const extra = BEISPIELE_EXTRA[`${nr}-${l.nr}`]
    if (extra && lek.lesen) lek.lesen.bild = (lek.lesen.bild || '') + umwandlungstabelle(extra.art, extra.aufgaben.map((a) => ({ aufgabe: a, zeige: true }))) + umwandlungAnleitung(extra.art)
    if (lek.start) lek.start.aufgaben = tabellenBloecke(lek.start.aufgaben)
    lek.fit = tabellenBloecke(lek.fit); lek.ueben = tabellenBloecke(lek.ueben); lek.wiederholung = tabellenBloecke(lek.wiederholung)
    if (lek.lesen) lek.lesen.aufgaben = tabellenBloecke(lek.lesen.aufgaben)
  }
}
