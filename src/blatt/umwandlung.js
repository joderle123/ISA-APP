// Umwandlungstabelle („abaque“, Programm VP Mathematik): bei JEDER Umwandlung wird die Tabelle benutzt (Auftrag 26.11.2026).
// Einheiten wie im amtlichen Programm. Die Zahl der Spalten je Einheit ist die Zahl der Nullen des Faktors:
//   Länge km hm dam m dm cm mm (×10 → 1 Spalte) · Hohlmaße l dl cl ml (×10 → 1) · Masse t kg g (×1000 → 3)
//   Fläche km² ha a m² dm² cm² mm² (×100 → 2) · Volumen m³ dm³ cm³ mm³ (×1000 → 3; dm³ = l, cm³ = ml)
// So sieht die Tabelle auch im Unterricht aus (Foto der Lehrerin: Einheiten oben, Unterspalten gestrichelt).

export const ABAKUS = {
  laenge: { titel: 'Längen', einheiten: ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'], spalten: 1, namen: ['Kilometer', 'Hektometer', 'Dekameter', 'Meter', 'Dezimeter', 'Zentimeter', 'Millimeter'] },
  hohlmass: { titel: 'Hohlmaße', einheiten: ['l', 'dl', 'cl', 'ml'], spalten: 1, namen: ['Liter', 'Deziliter', 'Zentiliter', 'Milliliter'] },
  masse: { titel: 'Massen', einheiten: ['t', 'kg', 'g'], spalten: 3, namen: ['Tonne', 'Kilogramm', 'Gramm'] },
  flaeche: { titel: 'Flächen', einheiten: ['km²', 'ha', 'a', 'm²', 'dm²', 'cm²', 'mm²'], spalten: 2, namen: ['Quadratkilometer', 'Hektar', 'Ar', 'Quadratmeter', 'Quadratdezimeter', 'Quadratzentimeter', 'Quadratmillimeter'] },
  volumen: { titel: 'Volumen', einheiten: ['m³', 'dm³', 'cm³', 'mm³'], spalten: 3, namen: ['Kubikmeter', 'Kubikdezimeter (= Liter)', 'Kubikzentimeter (= Milliliter)', 'Kubikmillimeter'], neben: { 'dm³': 'l', 'cm³': 'ml' } },
}
const ALIAS = { l: ['volumen', 'dm³'], ml: ['volumen', 'cm³'] }   // im Volumen-Abakus: Liter steht bei dm³, Milliliter bei cm³

/** Welche Tabelle passt zu einer Einheit? (Liter → Hohlmaße; im Volumen-Zusammenhang über `art` erzwingen) */
export function artVon(einheit, art) {
  if (art && ABAKUS[art] && (ABAKUS[art].einheiten.includes(einheit) || (art === 'volumen' && ALIAS[einheit]))) return art
  for (const [a, d] of Object.entries(ABAKUS)) if (d.einheiten.includes(einheit)) return a
  return null
}
const spalteE = (d, u) => {   // letzte Spalte (Einer) einer Einheit
  let i = d.einheiten.indexOf(u)
  if (i < 0 && d.neben) i = d.einheiten.findIndex((x) => d.neben[x] === u)
  return i < 0 ? -1 : (i + 1) * d.spalten - 1
}

const EINH = '(km²|mm²|cm²|dm²|m²|km|hm|dam|mm|cm|dm|m³|dm³|cm³|mm³|ha|a|m|t|kg|g|l|dl|cl|ml)'
const ZAHL = '(\\d{1,3}(?:\\.\\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)'
const RE_AUFGABE = new RegExp(`^\\s*${ZAHL}\\s*${EINH}(?:\\s+${ZAHL}\\s*${EINH})?\\s*(?:=|→|in)\\s*(?:_{2,}|\\?|▢|…|\\.\\.\\.)?\\s*${EINH}\\s*\\.?\\s*$`)

/**
 * Eine Umwandlungsaufgabe („3,5 m = ___ cm“, „2 km 300 m = ___ m“, „750 g → kg“) in die Tabelle legen.
 * → { art, ziffern: { spalte: Ziffer }, nullen: [Spalten mit ergänzten Nullen], kommaNach: Spalte (Einer der Zieleinheit), ergebnis: '350 cm' } oder null
 */
const WORT = { ar: 'a', hektar: 'ha', gramm: 'g', kilogramm: 'kg', tonnen: 't', liter: 'l', milliliter: 'ml', zentiliter: 'cl', deziliter: 'dl', meter: 'm', zentimeter: 'cm', millimeter: 'mm', kilometer: 'km' }
// Sachaufgabe: „Ein Zaun ist 2 m 50 cm lang. Wie viele cm?“ → die erste Größe und die gefragte Einheit
const RE_SACH = new RegExp(`${ZAHL}\\s*${EINH}(?:\\s+${ZAHL}\\s*${EINH})?(?![a-zäöü])[^?]*?Wie viele\\s+([A-Za-zäöü²³]+)`)
export function eintragen(aufgabe, artWunsch) {
  const roh = String(aufgabe).replace(/ | /g, ' ').replace(/[*\\]/g, '')
    .replace(/^\s*(?:Wandle um|Rechne um|Umwandeln)\s*:\s*/i, '').replace(/\s*\([^)]*\)\s*$/, '').replace(/\s*[?.]\s*$/, '')
  let m = RE_AUFGABE.exec(roh)
  if (!m) { const s = RE_SACH.exec(roh); if (s) m = [s[0], s[1], s[2], s[3], s[4], WORT[s[5].toLowerCase()] || s[5]] }
  if (!m) return null
  const teile = [[m[1], m[2]]]; if (m[3]) teile.push([m[3], m[4]])
  const ziel = m[5]
  const art = artVon(ziel, artWunsch) || artVon(teile[0][1], artWunsch)
  if (!art || teile.some(([, u]) => artVon(u, art) !== art) || artVon(ziel, art) !== art) return null
  const d = ABAKUS[art], n = d.einheiten.length * d.spalten
  const ziffern = {}
  for (const [zahl, u] of teile) {
    const [g, k = ''] = zahl.replace(/\./g, '').split(',')
    const e = spalteE(d, u); if (e < 0) return null
    g.split('').forEach((z, i) => { const s = e - (g.length - 1 - i); if (s >= 0) ziffern[s] = z; else ziffern.ueber = true })
    k.split('').forEach((z, i) => { const s = e + 1 + i; if (s < n) ziffern[s] = z; else ziffern.ueber = true })
  }
  if (ziffern.ueber) return null
  delete ziffern.ueber
  const besetzt = Object.keys(ziffern).map(Number), links = Math.min(...besetzt), rechts = Math.max(...besetzt)
  const kommaNach = spalteE(d, ziel); if (kommaNach < 0) return null
  // Lücken zwischen den Ziffern und bis zur Zieleinheit mit Nullen füllen (die schreibt man in der Tabelle dazu)
  const nullen = []
  for (let s = Math.min(links, kommaNach); s <= Math.max(rechts, kommaNach); s++) if (ziffern[s] === undefined) { ziffern[s] = '0'; nullen.push(s) }
  const von = Math.min(links, kommaNach), bis = Math.max(rechts, kommaNach)
  let ganz = '', nach = ''
  for (let s = von; s <= bis; s++) (s <= kommaNach ? (ganz += ziffern[s]) : (nach += ziffern[s]))
  ganz = ganz.replace(/^0+(?=\d)/, ''); nach = nach.replace(/0+$/, '')
  const tsd = (x) => x.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return { art, ziffern, nullen, kommaNach, spalten: n, ergebnis: tsd(ganz) + (nach ? ',' + nach : '') + ' ' + ziel }
}

/** Prüft, ob die Lösung des Erzeugers zur Tabelle passt (Tausenderpunkte und Zusätze wie „(× 100)“ ignoriert). */
export const passt = (e, loesung) => !!e && String(loesung).replace(/\(.*?\)/g, '').replace(/\./g, '').replace(/\s+/g, ' ').trim().startsWith(e.ergebnis.replace(/\./g, ''))

/**
 * Rechenpäckchen zerlegen: Umwandlungsaufgaben („7 m = ___ dm“, Beispiel „3 m = {300} dm“) kommen in eine Umwandlungstabelle,
 * der Rest bleibt ein Päckchen. `nr` ist die Stelle im Päckchen (für die Buchstaben a), b) … wie in den Lösungen).
 */
export function zerlegePaeckchen(items) {
  const rest = [], gruppen = {}
  items.forEach((s, nr) => {
    const txt = String(s)
    if (txt.includes('\t') || txt.includes('[]') || txt.includes('#')) { rest.push({ text: txt, nr }); return }
    const wert = /\{([^}]*)\}/.exec(txt)?.[1]
    const e = eintragen(txt.replace(/\{[^}]*\}/, '___'))
    const ok = e && (wert === undefined || e.ergebnis.split(' ')[0].replace(/\./g, '') === wert.replace(/\./g, '').replace(/\s.*$/, ''))
    if (!ok) { rest.push({ text: txt, nr }); return }
    ;(gruppen[e.art] = gruppen[e.art] || []).push({ text: txt, nr, beispiel: wert !== undefined, e })
  })
  return { rest, gruppen: Object.entries(gruppen).map(([art, zeilen]) => ({ art, zeilen })) }
}
