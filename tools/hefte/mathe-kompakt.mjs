// Mathe-Modulheft KOMPAKT (Rückmeldung der Mathelehrerin der Annexe, 25.11.2026, Modul 3):
// „Das neue Heft ist ausführlicher (Erklärungen gefallen), aber das kompakte Format von vorher war besser, und die schönen
//  Übungen mit Bildern fehlen. In der Mathe verlieren sich die Schüler, wenn so viel Platz ist wie in den Sprachheften.“
//
// Darum: Grundlage sind die alten Toolbox-Blätter des Moduls (daten/mathe-mN-alt.json – Regel, Thermometer, Diagramme,
// Strichlisten, Kästchen, Umfang oder Fläche …). Dazu kommt aus dem Mathe-Programm (daten/mathe-programm.json):
//   · „Schritt für Schritt“ (die Erklärung) · eine Musterlösung und „Noch mehr Beispiele“ (gerechnet)
//   · „Jetzt du“ (wie in den Beispielen) und ein „Übungspäckchen“ – nur wo Aufgaben ohne Bild Sinn machen
//   · „Fit bleiben“ NICHT in jeder Lektion, sondern alle drei Lektionen einmal – dafür mehr Aufgaben
//   · kein „Los geht’s“
// Lektions-Wünsche (Notizen der Lehrerin) stehen unten in EXTRA.
// Aufruf: node tools/hefte/mathe-kompakt.mjs 3   → schreibt die Blätter in src/data/blaetter/mathe-2.json (nur Deutsch; Französisch bleibt)
import { readFileSync, writeFileSync } from 'node:fs'
import { erzeuge } from './mathe-gen.mjs'

const ROOT = new URL('../../', import.meta.url)
const nr = +(process.argv[2] || 3)
const P = JSON.parse(readFileSync(new URL('tools/hefte/daten/mathe-programm.json', ROOT), 'utf8'))
const ALT = JSON.parse(readFileSync(new URL(`tools/hefte/daten/mathe-m${nr}-alt.json`, ROOT), 'utf8'))
const ZIEL = new URL('src/data/blaetter/mathe-2.json', ROOT)

// Programm-Lektionen des Moduls in Reihenfolge → passen der Reihe nach zu den alten Blättern
const M = P.module[nr - 1]
const PL = M.themen.flatMap((t) => t.lektionen)
if (PL.length !== ALT.length) throw new Error(`Modul ${nr}: ${PL.length} Lektionen im Programm, ${ALT.length} alte Blätter`)

const minus = (s) => String(s ?? '').replace(/(^|[\s(;=:→])-(?=\d)/g, '$1−')
const kurz = (l) => minus(String(l).replace(/\s*\([^)]*\)\s*$/, '').replace(/^≈\s*/, '').trim())
const BR = (s) => String(s).replace(/\[\[([^\]/]+)\/([^\]/]+)\]\]/g, '$1/$2').replace(/÷/g, ':')   // geteilt wie im Unterricht: „:“
  .replace(/\s*✓/g, ' – passt').replace(/\|{4}\u0336/g, '4 Striche + 1 Querstrich')   // Zeichen, die die Heft-Schriften nicht haben
// Aufgabe aus dem Erzeuger → [Päckchen-Zeile mit ___, kurze Lösung]
const FORM = {
  rundenEinheit: (x) => [`${/Runde ([\d,]+)/.exec(x.a)[1]} ≈ ___`, kurz(x.l)],
  dezimalMalGanz: (x) => [x.a.replace(/=\s*$/, '= ___'), kurz(x.l)],
  dezimalDurchGanz: (x) => [x.a.replace('÷', ':').replace(/=\s*$/, '= ___'), kurz(x.l)],
  flaecheRechteck: (x) => { const r = /Länge ([\d,]+) (\w+), Breite ([\d,]+)/.exec(x.a), q = /Quadrat mit Seite ([\d,]+) (\w+)/.exec(x.a), e = (r || q)[2];
    return [r ? `${r[1]} ${e} × ${r[3]} ${e}:  A = ___ ${e}²` : `Quadrat ${q[1]} ${e}:  A = ___ ${e}²`, x.l.split('=').pop().trim()] },
  flaecheEinheit: (x) => [x.a, kurz(x.l)],
  tempAenderung: (x) => { const m = /Morgens (-?[\d,]+) °C, mittags (-?[\d,]+) °C/.exec(x.a); return [`${minus(m[1])} °C → ${minus(m[2])} °C:   ___`, kurz(x.l)] },
  mittelwert: (x) => [`${/von: (.*)\.$/.exec(x.a)[1]}  →  Ø = ___`, x.l.split('=').pop().trim()],
}
const allgemein = (x) => { const a = BR(minus(x.a)).replace('÷', ':').replace('▢', '___'); return [/___/.test(a) ? a : /=\s*\??\s*$/.test(a) ? a.replace(/=\s*\??\s*$/, '= ___') : a + '   ___', kurz(BR(x.l))] }
const zeile = (gen, x) => (FORM[gen.type] || allgemein)(x)
const wuerfle = (gen, n, niveau, seed) => erzeuge(gen, n, niveau, seed).map((x) => zeile(gen, x))
// Beispiel mit Lösung: steht die Einheit schon hinter der Lücke („A = ___ cm²“), nicht noch einmal einsetzen
const gefuellt = ([a, l]) => { const e = /___\s*([^\s:;,]+)/.exec(a)?.[1]; const w = e && String(l).endsWith(' ' + e) ? String(l).slice(0, -e.length - 1) : l; return a.replace('___', '{' + w + '}') }
const lsg = (liste) => liste.map(([, l], i) => 'abcdefghijklmnop'[i] + ') ' + l).join(' · ')

// „Fit bleiben“: Lektion 1, 4, 7 … – Aufgaben aus den drei Lektionen davor (bei Lektion 1: aus dem Modul davor)
const ALLE = P.module.flatMap((m, i) => m.themen.flatMap((t) => t.lektionen.map((l) => ({ nr: i + 1, l }))))
function fitBleiben(k) {
  const g = ALLE.findIndex((a) => a.nr === nr && a.l.nr === PL[k].nr)
  const frueher = ALLE.slice(Math.max(0, g - 4), g).filter((a) => a.l.gen).slice(-3)
  if (!frueher.length) return null
  const je = Math.ceil(12 / frueher.length)
  const items = frueher.flatMap((a, j) => wuerfle(a.l.gen, je, j === frueher.length - 1 ? 'kern' : 'basis', nr * 1000 + k * 37 + j)).slice(0, 12)
  return { bausteine: [{ art: 'aufgabe', stufe: 1, text: 'Fit bleiben – Aufgaben aus den letzten Lektionen. Rechne allein, ohne Hilfe.' }, { art: 'paeckchen', spalten: 3, items: items.map(([a]) => a), buchstaben: true }], loes: ['Fit bleiben: ' + lsg(items)] }
}

// ---------------- Wünsche der Lehrerin je Lektion (Index im Modul, ab 0) ----------------
const EXTRA = {
  1: {
    // gerundete Ergebnisse mit ≈ (die Schritte erklären das Zeichen); „4 → ab“ bleibt ein Pfeil
    zeichen: (t) => t.replace(/(\d+,\d+|___) → (\d+|___)/g, '$1 ≈ $2')
      .replace('Das Zeichen für „ungefähr gleich“ (zwei Wellenlinien) an die Tafel schreiben; auf dem Blatt steht dafür der Pfeil →.', 'Das Zeichen ≈ für „ungefähr gleich“ (zwei Wellenlinien) an die Tafel schreiben – so steht es auch im Heft.'),
  },
  3: {
    // Lektion 3: „eine Wiederholung von :10, :100, :1000 am Anfang“
    vorne: [{
      bausteine: [
        { art: 'aufgabe', stufe: 1, text: 'Wiederholung: Geteilt durch 10, 100 und 1000. Das Komma springt nach links – so viele Stellen, wie Nullen da sind.' },
        { art: 'kommasprung', spalten: 3, items: [{ zahl: '45,6', op: ':', faktor: 10, label: 'a)', boegen: true }, { zahl: '382', op: ':', faktor: 100, label: 'b)', boegen: true }, { zahl: '1250', op: ':', faktor: 1000, label: 'c)', boegen: true }] },
        { art: 'paeckchen', spalten: 3, items: ['7,5 : 10 = ___', '64 : 100 = ___', '3200 : 1000 = ___', '0,9 : 10 = ___', '12,5 : 100 = ___', '450 : 1000 = ___'], buchstaben: true },
      ],
      loes: ['Wiederholung: a) 4,56 · b) 3,82 · c) 1,25 – Päckchen: 0,75 · 0,64 · 3,2 · 0,09 · 0,125 · 0,45'],
    }],
  },
  6: {
    // Temperatur: „+ Hilfestellung Thermometer“ – das Thermometer steht neben den Übungen
    thermometer: true,
  },
  7: {
    // Diagramme: Übungen mit echten Diagrammen statt Zahlen im Text („die von vorher waren wesentlich besser“)
    hinten: [
      {
        bausteine: [
          { art: 'aufgabe', stufe: 2, text: 'Lieblingsfarbe in der 5e. Lies ab und rechne.' },
          { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [{ art: 'diagramm', kategorien: ['Grün', 'Schwarz', 'Blau', 'Rot'], werte: [10, 2, 9, 6], max: 12, schritt: 2, achsen: ['Farbe', 'Anzahl'] }],
            rechts: [{ art: 'paeckchen', spalten: 1, items: ['Wie viele mehr bei Grün als bei Schwarz?   ___', 'Grün und Rot zusammen:   ___', 'So viele wurden befragt:   ___', 'Am beliebtesten ist:   ___'], buchstaben: true }] },
        ],
        loes: ['Lieblingsfarbe: a) 10 − 2 = 8 · b) 16 · c) 27 · d) Grün'],
      },
      {
        bausteine: [
          { art: 'aufgabe', stufe: 2, text: 'Weg zur Schule. Die Balken liegen. Lies unten ab.' },
          { art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [{ art: 'diagramm', liegend: true, kategorien: ['Auto', 'Zug', 'zu Fuß', 'Bus'], werte: [7, 6, 5, 9], max: 10, schritt: 2, achsen: ['Weg', 'Anzahl'] }],
            rechts: [{ art: 'paeckchen', spalten: 1, items: ['Am beliebtesten ist:   ___', 'Wie viele mehr mit dem Auto als mit dem Zug?   ___', 'Wie viele kommen nicht mit dem Bus?   ___', 'Alle zusammen:   ___'], buchstaben: true }] },
        ],
        loes: ['Weg zur Schule: a) Bus · b) 1 · c) 18 · d) 27'],
      },
    ],
  },
  9: {
    // Durchschnitt: „mehr Beispiele“ und „wann macht ein Mittelwert Sinn? – Noten, Schuhgröße …“
    ohneJetztDu: true,   // die erste alte Aufgabe („Berechne den Mittelwert wie im Beispiel“) ist schon das Nachmachen
    paeckchen: 8,        // drei alte Rechen-Aufgaben üben schon dasselbe
    nachRegel: [{ art: 'spalten', zusammen: true, verhaeltnis: '1:1', links: [{ art: 'info', symbol: 'tipp', titel: 'Beispiel aus dem Alltag', text: 'Punkte in vier Spielen: 12, 15, 9 und 14.', punkte: ['Summe: 12 + 15 + 9 + 14 = 50', 'Anzahl: 4 Spiele', 'Mittelwert: 50 : 4 = 12,5 Punkte pro Spiel', 'Probe: 12,5 liegt zwischen 9 und 15 – passt'] }],
      rechts: [{ art: 'info', symbol: 'achtung', titel: 'Wann macht ein Mittelwert Sinn?', punkte: ['Wenn die Werte Zahlen sind, die man zusammenzählen kann: Noten, Punkte, Temperaturen, Minuten.', 'Wenn kein Wert ganz aus der Reihe fällt.', 'Sonst sagt er wenig: Schuhgröße 38,6 gibt es nicht.'] }] }],
    hinten: [{
      bausteine: [
        { art: 'aufgabe', stufe: 2, text: 'Wann macht ein Mittelwert Sinn? Kreuze an. Schreib kurz, warum.' },
        // andere Beispiele als im Kasten „Wann macht ein Mittelwert Sinn?“: übertragen statt abschreiben
        { art: 'tabelle', spalten: ['Daten', 'sinnvoll', 'nicht sinnvoll', 'Warum?'], breiten: [2.6, 0.9, 1.1, 2.2], zeilen: 0, werte: [
          ['Minuten Schulweg: 10, 15, 20, 5', '', '', ''], ['Körpergröße in cm: 148, 152, 155, 161', '', '', ''], ['Lieblingsfarben: rot, blau, rot, grün', '', '', ''],
          ['Trikotnummern im Team: 7, 10, 23, 99', '', '', ''], ['Taschengeld: 10 €, 10 €, 12 € und 200 €', '', '', '']] },
      ],
      loes: ['Sinnvoll: Schulweg (12,5 min), Körpergröße (154 cm). Nicht sinnvoll: Lieblingsfarben (keine Zahlen), Trikotnummern (Nummern sind Namen, keine Mengen). Vorsicht: Taschengeld (200 € verzieht den Mittelwert auf 58 € – das bekommt fast niemand).'],
    }],
  },
}

// ---------------- Aufbau einer Lektion ----------------
const zahlAufgaben = (b) => (b.art === 'aufgabe' ? 1 : b.art === 'spalten' ? [...(b.links || []), ...(b.rechts || [])].filter((x) => x.art === 'aufgabe').length : 0)
function baue(alt, k) {
  const pl = PL[k], x = EXTRA[k + 1] || {}, gen = pl.gen && (FORM[pl.gen.type] ? pl.gen : null)
  const B = alt.de.bausteine.filter((b) => b.art !== 'seitenumbruch'), L0 = alt.de.lehrer.loesungen
  const ersteAufgabe = B.findIndex((b) => zahlAufgaben(b) > 0)
  const schlussAb = B.length - 2   // „Kurz-Check: Wie sicher bist du?“ + Einschätzung
  const kopf = B.slice(0, ersteAufgabe)
  // „Kurz-Check“ als Überschrift in die Einschätzung: bleibt zusammen und spart eine Zeile
  const schluss = B[schlussAb]?.art === 'text' && B[schlussAb + 1]?.art === 'einschaetzung' ? [{ ...B[schlussAb + 1], titel: B[schlussAb].text }] : B.slice(schlussAb)
  // alte Aufgaben in Gruppen (jede Gruppe beginnt mit einer Aufgabe) mit ihren Lösungen
  const gruppen = []; let li = 0
  for (const b of B.slice(ersteAufgabe, schlussAb)) {
    const n = zahlAufgaben(b)
    if (n) gruppen.push({ bausteine: [b], loes: L0.slice(li, li + n).map((s) => s.replace(/^\d+\)\s*/, '')) }), li += n
    else gruppen[gruppen.length - 1].bausteine.push(b)
  }
  const exit = L0.slice(li).filter((s) => /^Exit/.test(s))

  // Verstehen: Schritt für Schritt (Erklärung), Musterlösung und noch mehr Beispiele
  const bsp = gen ? wuerfle(gen, 3, 'basis', nr * 1000 + pl.nr * 10 + 1) : []
  const mu = pl.musterl?.[0]
  // Die Regel des alten Moduls und die Schritte sagen dasselbe: nur einmal erklären (Schritte), die Grafik des alten Moduls daneben
  const regelSp = kopf.find((b) => b.art === 'spalten' && b.links.some((y) => y.art === 'info'))
  const grafik = regelSp ? [...regelSp.links.filter((y) => y.art !== 'info'), ...regelSp.rechts] : []
  // Strichliste (drei Spalten) und Fläche in Originalgröße (1 Kästchen = 1 cm) brauchen die halbe Breite
  const verh = grafik.some((g) => ['strichliste', 'tabelle', 'flaeche'].includes(g.art)) ? '1:1' : '2:1'
  const schritte = { art: 'schritte', stil: 'liste', linien: 0, teilbar: true, items: pl.erklaerung.map((s) => ({ titel: BR(s.titel), text: BR(s.text) + (s.beispiel ? '  Beispiel: ' + BR(s.beispiel) : '') })) }
  const verstehen = [
    { art: 'text', text: 'Die Regel – Schritt für Schritt:' },
    grafik.length ? { art: 'spalten', zusammen: true, verhaeltnis: verh, links: [schritte], rechts: grafik } : schritte,
    { art: 'spalten', zusammen: true, verhaeltnis: '1:1',
      links: mu ? [{ art: 'info', symbol: 'tipp', titel: 'Musterlösung' + (mu.titel ? ': ' + BR(mu.titel) : ''), text: BR(mu.a), punkte: [...mu.schritte.map(BR), 'Ergebnis: ' + BR(mu.erg)] }] : [],
      rechts: bsp.length ? [{ art: 'info', symbol: 'merke', titel: 'Noch mehr Beispiele', punkte: bsp.map((b) => gefuellt(b).replace(/[{}]/g, '')) }]
        : pl.musterl?.[1] ? [{ art: 'info', symbol: 'merke', titel: 'Noch ein Beispiel' + (pl.musterl[1].titel ? ': ' + BR(pl.musterl[1].titel) : ''), text: BR(pl.musterl[1].a), punkte: [...pl.musterl[1].schritte.map(BR), 'Ergebnis: ' + BR(pl.musterl[1].erg)] }] : [] },
    ...(x.nachRegel || []),
  ].filter((b) => b.art !== 'spalten' || b.links.length || b.rechts.length)

  const breit = (it) => Math.max(...it.map(([a]) => a.length)) > 22   // lange Aufgaben: zwei Spalten, damit jede in eine Zeile passt
  const thermo = (inhalt) => (x.thermometer ? [{ art: 'spalten', zusammen: true, verhaeltnis: '2:1', links: inhalt, rechts: [{ art: 'temperatur', von: -10, bis: 10, items: [{}] }] }] : inhalt)
  const jetztDu = gen && !x.ohneJetztDu ? (() => { const it = wuerfle(gen, 4, 'basis', nr * 1000 + pl.nr * 10 + 2); return { bausteine: [{ art: 'aufgabe', stufe: 1, text: 'Jetzt du – rechne genau wie in den Beispielen.' }, ...thermo([{ art: 'paeckchen', spalten: x.thermometer ? 1 : 2, items: it.map(([a]) => a), buchstaben: true }])], loes: [lsg(it)] } })() : null
  const paeckchen = gen ? (() => { const h = (x.paeckchen ?? 12) / 2, it = [...wuerfle(gen, h, 'basis', nr * 1000 + pl.nr * 10 + 3), ...wuerfle(gen, h, 'kern', nr * 1000 + pl.nr * 10 + 4)]; return { bausteine: [{ art: 'aufgabe', stufe: 2, text: 'Übungspäckchen – übe, bis es sitzt. Erst die leichten, dann die schwereren.' }, ...thermo([{ art: 'paeckchen', spalten: x.thermometer || breit(it) ? 2 : 3, items: it.map(([a]) => a), buchstaben: true }])], loes: [lsg(it)] } })() : null
  const fit = k % 3 === 0 ? fitBleiben(k) : null

  // Reihenfolge: Bilder und Einstieg · (Fit bleiben) · (Wiederholung) · Regel mit Bild · Schritt für Schritt · Beispiele ·
  //              Jetzt du · alte Aufgaben mit Bildern · (Extras) · Übungspäckchen · Kurz-Check
  const einstieg = kopf.filter((b) => b.art === 'bilder' || b.art === 'text'), regel = kopf.filter((b) => !(b.art === 'bilder' || b.art === 'text') && b !== regelSp)
  const teile = [fit, ...(x.vorne || [])].filter(Boolean)
  const ab = [jetztDu, ...gruppen, ...(x.hinten || []), paeckchen].filter(Boolean)
  // Spalten nie über den Seitenrand teilen (react-pdf schob sonst Tabellen in die Fußzeile)
  const bausteine = [...einstieg, ...teile.flatMap((g) => g.bausteine), ...regel, ...verstehen, ...ab.flatMap((g) => g.bausteine), ...schluss]
    .map((b) => (b.art === 'spalten' && b.zusammen === undefined ? { ...b, zusammen: true } : b))
  const loes = [...teile, ...ab].flatMap((g) => g.loes).map((s, i) => (i + 1) + ') ' + s).concat(exit)

  // Lehrer-Hinweise auf die neuen Aufgabennummern umschreiben (alte Aufgabe n → neue Nummer)
  const aufgabenIn = (liste) => liste.flatMap((b) => (b.art === 'aufgabe' ? [b] : b.art === 'spalten' ? [...b.links, ...b.rechts].filter((y) => y.art === 'aufgabe') : []))
  const altA = aufgabenIn(B), neuA = aufgabenIn(bausteine)
  const neueNr = (n) => neuA.indexOf(altA[n - 1]) + 1 || n
  const paeckNr = paeckchen ? neuA.indexOf(paeckchen.bausteine[0]) + 1 : 0
  const letzte = paeckNr ? paeckNr - 1 : neuA.length
  const erste = aufgabenIn(teile.flatMap((g) => g.bausteine)).length + 1   // nach „Fit bleiben“ / Wiederholung
  const EINZEL = /Aufgaben 1 bis \d+, Aufgabe \d+ für alle, die fertig sind\./
  const umschreiben = (t) => {
    const einzel = EINZEL.test(t)
    const u = String(t).replace(EINZEL, '§EINZEL§')
      .replace(/Den Kasten „[^“]+“ (gemeinsam )?lesen/, (_, g) => `„Die Regel – Schritt für Schritt“ ${g || ''}lesen, Grafik daneben zeigen`)
      .replace(/(Aufgaben?) (\d+(?:(?:, | und | bis )\d+)*)/g, (_, w, z) => w + ' ' + z.replace(/\d+/g, (n) => String(neueNr(+n))))
    return einzel ? u.replace('§EINZEL§', paeckNr ? `Aufgaben ${erste} bis ${letzte}, das Übungspäckchen (Aufgabe ${paeckNr}) für alle, die fertig sind.` : `Aufgaben ${erste} bis ${letzte}; die Aufgaben mit drei Punkten für alle, die fertig sind.`) : u
  }
  const lehrer = { ...alt.de.lehrer }
  lehrer.ablauf = (lehrer.ablauf || []).map(umschreiben)
  if (teile.length) lehrer.ablauf.splice(1, 0, fit ? 'Fit bleiben (5 Min.): Aufgabe 1 allein und ohne Hilfe – Wiederholung der letzten Lektionen. Kurz vergleichen.' : 'Wiederholung (5 Min.): Aufgabe 1 gemeinsam beginnen, dann allein.')
  if (lehrer.differenzierung) lehrer.differenzierung = Object.fromEntries(Object.entries(lehrer.differenzierung).map(([k, v]) => [k, umschreiben(v)]))
  for (const k of ['tipps', 'material', 'impulse']) if (Array.isArray(lehrer[k])) lehrer[k] = lehrer[k].map(umschreiben); else if (typeof lehrer[k] === 'string') lehrer[k] = umschreiben(lehrer[k])
  lehrer.loesungen = loes
  let blatt = { ...alt, de: { ...alt.de, bausteine, lehrer } }
  if (x.zeichen) blatt = JSON.parse(JSON.stringify(blatt, (k, v) => (typeof v === 'string' ? x.zeichen(v) : v)))
  return blatt
}

const neu = ALT.map(baue)
const alle = JSON.parse(readFileSync(ZIEL, 'utf8'))
const ids = new Set(neu.map((b) => b.id))
const raus = alle.map((b) => (ids.has(b.id) ? neu.find((n) => n.id === b.id) : b))
writeFileSync(ZIEL, JSON.stringify(raus, null, 2) + '\n')
for (const b of neu) console.log('✓', b.id, '·', b.de.bausteine.length, 'Bausteine ·', b.de.lehrer.loesungen.length, 'Lösungen')
