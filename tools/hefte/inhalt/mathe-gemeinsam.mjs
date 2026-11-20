// Mathe-Modulhefte (Voie de préparation, Module 1–6) – gemeinsamer Baukasten.
// Grundlage: das Mathe-Programm des Klassenbuchs (daten/mathe-programm.json, nach dem CNES-Referenzrahmen
// „Mathématiques – voie préparatoire“). Jede Lektion wird zu: Los geht’s (gemeinsam rechnen) · Verstehen (Erklärung
// zum Mitlesen und Anhören) · Hören und rechnen (Alltagsszene, eigene Texte je Modul) · Merken (Merksatz, Vorgehen,
// Musterlösungen) · Üben (Basis, Kern, Plus, Exit-Ticket) · Erklären (Schreibauftrag) · Kurz-Check.

import { readFileSync } from 'node:fs'

export const PROGRAMM = JSON.parse(readFileSync(new URL('../daten/mathe-programm.json', import.meta.url), 'utf8'))

/** Aussprache für die Stimme (Python-Regex, nach den deutschen Grundregeln angewendet) */
export const MATHE_AUSSPRACHE = {
  '\\s·\\s': ' mal ', '·': ' mal ', '×': ' mal ', '÷': ' geteilt durch ', '(\\d) : (\\d)': '\\1 geteilt durch \\2',
  '(\\d)\\.(?=\\d{3}\\b)': '\\1', '−': ' minus ', '\\+': ' plus ', '≈': ' ungefähr ', '=': ' gleich ', '→': ', also ', '⇒': ', also ',
  ' < ': ' ist kleiner als ', ' > ': ' ist größer als ', '▢': ' Lücke ', '✅|❌|✓|✗|🟢|🟡|🔵': '',
  '(\\d+),(\\d\\d) ?€': '\\1 Euro \\2', '(\\d+) ?€': '\\1 Euro', '€': 'Euro', '(\\d) ?%': '\\1 Prozent', '°C': ' Grad', '°': ' Grad',
  '(\\d) ?km²': '\\1 Quadratkilometer', '(\\d) ?m²': '\\1 Quadratmeter', '(\\d) ?dm²': '\\1 Quadratdezimeter', '(\\d) ?cm²': '\\1 Quadratzentimeter', '(\\d) ?mm²': '\\1 Quadratmillimeter',
  '\\bkm\\b': 'Kilometer', '\\bdm\\b': 'Dezimeter', '\\bcm\\b': 'Zentimeter', '\\bmm\\b': 'Millimeter', '\\bkg\\b': 'Kilogramm', '\\bml\\b': 'Milliliter', '\\bcl\\b': 'Zentiliter', '\\bdl\\b': 'Deziliter',
  '(\\d) ?m\\b': '\\1 Meter', '(\\d) ?g\\b': '\\1 Gramm', '(\\d) ?l\\b': '\\1 Liter', '(\\d) ?t\\b': '\\1 Tonnen', '(\\d) ?min\\b': '\\1 Minuten',
  '\\bHT\\b': 'Hunderttausender', '\\bZT\\b': 'Zehntausender', '(\\d) T\\b': '\\1 Tausender', '(\\d) H\\b': '\\1 Hunderter', '(\\d) Z\\b': '\\1 Zehner', '(\\d) E\\b': '\\1 Einer', '\\((?:HT|ZT|T|H|Z|E)\\)': '',
  '\\b1/2\\b': 'ein halb', '(\\d+)/2\\b': '\\1 Halbe', '(\\d+)/3\\b': '\\1 Drittel', '(\\d+)/4\\b': '\\1 Viertel', '(\\d+)/5\\b': '\\1 Fünftel', '(\\d+)/6\\b': '\\1 Sechstel', '(\\d+)/7\\b': '\\1 Siebtel',
  '(\\d+)/8\\b': '\\1 Achtel', '(\\d+)/9\\b': '\\1 Neuntel', '(\\d+)/10\\b': '\\1 Zehntel', '(\\d+)/12\\b': '\\1 Zwölftel', '(\\d+)/100\\b': '\\1 Hundertstel', '(\\d+)/1000\\b': '\\1 Tausendstel',
  '\\b1 (Drittel|Viertel|Fünftel|Sechstel|Siebtel|Achtel|Neuntel|Zehntel|Zwölftel|Hundertstel|Tausendstel)\\b': 'ein \\1',
  '\\[([A-Z])([A-Z])[\\]\\)]': '\\1 \\2', '\\(([A-Z])([A-Z])\\)': '\\1 \\2', ' / ': ' oder ', '(\\d)²': '\\1 hoch zwei', '\\|': ', ', '\\bz\\. ?B\\.': 'zum Beispiel',
}

const ANLEITUNG = [
  'Jede Lektion hat sechs Teile: **Los geht’s**, **Verstehen**, **Hören und rechnen**, **Merken**, **Üben** und **Erklären**. Am Ende steht ein **Kurz-Check**.',
  'Neben jeder Erklärung ist ein **QR-Code**. Scanne ihn mit dem Handy: Du hörst die Erklärung. Du kannst lesen und hören – so oft du willst.',
  'Die Punkte zeigen das Niveau: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an. Rechne in den **Kästchen** – dort ist viel Platz.',
  'Die französischen Fachwörter stehen neben jeder Erklärung und hinten in der **Wörterliste**.',
]

const mische = (hex, ziel, anteil) => '#' + [0, 2, 4].map((i) => Math.round(parseInt(hex.slice(1 + i, 3 + i), 16) * (1 - anteil) + ziel * anteil).toString(16).padStart(2, '0')).join('')

/** Grunddaten eines Mathe-Moduls (Deckblatt, Farben, Teile) aus dem Programm, ergänzt um Angaben des Moduls */
export function matheModul(nr, extra) {
  const m = PROGRAMM.module[nr - 1]
  const tief = extra.farbe || m.farbe
  return {
    id: `mathe-m${nr}`, kuerzel: `ma${nr}`, nr, sprache: 'de', niveau: `Modul ${nr} von 6`, klasse: 'Voie de préparation',
    dateiname: `Mathe_Modul-${nr}`,
    fach: { de: 'Mathematik', fr: 'Mathématiques' },
    titel: { de: m.titel.replace(/ & /g, ' und '), fr: extra.titelFr },
    untertitel: { de: m.unter, fr: extra.unterFr || '' },
    farben: { tief, mittel: mische(tief, 255, 0.55), zart: mische(tief, 255, 0.92), dunkel: mische(tief, 0, 0.35) },
    deckbild: extra.deckbild, blasen: extra.blasen,
    themen: m.themen.map((t, i) => ({ titel: { de: t.titel.replace(/ & /g, ' und '), fr: '' }, icon: extra.themenIcons?.[i] || 'math', lektionen: t.lektionen.length })),
    anleitung: ANLEITUNG, checkMitSchreiben: true,
    teile: { lesen: { de: 'Verstehen', icon: 'book' }, hoeren: { de: 'Hören und rechnen', icon: 'headphones' }, regel: { de: 'Merken', icon: 'bulb' }, ueben: { de: 'Üben', icon: 'pencil' }, schreiben: { de: 'Erklären', icon: 'message-2' } },
    medien: [['book', 'var(--lesen)', 'Verstehen', 'lesen und hören'], ['headphones', 'var(--hoeren)', 'Hören', 'Mathe im Alltag'], ['bulb', 'var(--regel)', 'Merken', 'kurz und klar'], ['pencil', 'var(--schreiben)', 'Üben', 'mit Rechenkästchen']],
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
          [{ titel: 'Merksatz', punkte: saetze(E(l.merksatz)) }, { titel: 'So gehst du vor', punkte: l.vorgehen.map((v, j) => `**${j + 1}.** ${E(v)}`) }],
          l.musterl.slice(0, 2).map((mu, j) => ({ art: j === 0 ? 'tipp' : 'achtung', titel: mu.titel ? `Musterlösung: ${E(mu.titel)}` : 'Musterlösung', text: `**Aufgabe:** ${E(mu.a)} · ${mu.schritte.map(E).join(' · ')} · **Ergebnis:** ${E(mu.erg)}` })),
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
  return L
}
