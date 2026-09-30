// Prüft das Förderfach (src/data/foerderfach): Jahrespläne, ausgearbeitete Einheiten,
// Handbuchtexte und Schülerblätter – Aufbau, Nummern, Trimester, beide Sprachen gleich
// aufgebaut, lückenlose Minuten, vorhandene Blätter, geprüfte Quellen und Stil.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-pruefen.ts [--streng]
// Fehler → Exit-Code 1. Hinweise (Stil) werden nur gezeigt; mit --streng zählen sie als Fehler.
import { EINHEITEN, HANDBUCH, PLAENE, BLAETTER, VORLAGEN, blattById } from '../src/foerderfach/daten'
import { KOMPETENZEN, PHASEN } from '../src/foerderfach/fach'
import { QUELLEN_TEXTE } from '../src/blatt/quellen'
import type { EinheitText, Phase, Sprache } from '../src/foerderfach/typen'

const streng = process.argv.includes('--streng')
let fehler = 0
let hinweise = 0
function melde(art: 'F' | 'H', wo: string, text: string) {
  if (art === 'F' || streng) fehler++
  else hinweise++
  console.log(`${art === 'F' ? '✗' : '·'} ${wo}: ${text}`)
}

const SPRACHEN: Sprache[] = ['de', 'fr']
const KOMP = new Set(KOMPETENZEN.map((k) => k.id))

// --- Stil ----------------------------------------------------------------------------------
const FLOSKELN: Record<Sprache, [RegExp, string][]> = {
  de: [
    [/In dieser Einheit/i, '„In dieser Einheit …“'],
    [/tauchen wir ein/i, '„Heute tauchen wir ein …“'],
    [/\bspannend/i, '„spannend“'],
    [/\bReise\b|Entdeckungsreise/i, '„Reise“-Metapher'],
    [/magisch|Superkraft|ganzheitlich|Zauber/i, 'Modewort'],
    [/\blass(t)? uns\b/i, '„Lass uns …“'],
    [/Viel Spa(ß|ss)/i, '„Viel Spaß“'],
    [/Wusstest du/i, '„Wusstest du …“'],
    [/Mindset/i, '„Mindset“'],
    [/Es ist (sehr )?wichtig,? (zu|dass)/i, '„Es ist wichtig …“'],
    [/Gefühle sind wichtig|Kommunikation ist der Schlüssel/i, 'Allgemeinplatz'],
    [/«|»/, 'französische Anführungszeichen im deutschen Text'],
  ],
  fr: [
    [/Dans cette séance/i, '« Dans cette séance… »'],
    [/voyage|aventure/i, 'métaphore du voyage'],
    [/magique|super-pouvoir|holistique/i, 'mot à la mode'],
    [/Amusez-vous bien|Bon amusement/i, '« Amusez-vous bien »'],
    [/Saviez-vous|Le saviez-vous/i, '« Le saviez-vous »'],
    [/Il est (très )?important de/i, '« Il est important de… »'],
    [/„/, 'guillemets allemands dans le texte français'],
  ],
}
const GEMEINSAM: [RegExp, string][] = [
  [/!{2,}|\?{2,}/, 'doppelte Satzzeichen'],
  [/"/, 'gerade Anführungszeichen'],
  [/ - /, 'Bindestrich statt Gedankenstrich (–)'],
  [/\.\.\./, 'drei Punkte statt …'],
  [/\s{2,}/, 'doppelte Leerzeichen'],
  [/ [,.]/, 'Leerzeichen vor Komma oder Punkt'],
]
/** Vor : ; ! ? steht im Französischen ein Leerzeichen (das Programm macht es geschützt), im Deutschen nie. */
const DE_VOR_ZEICHEN: [RegExp, string] = [/ [;:!?]/, 'Leerzeichen vor Satzzeichen']
const EMOJI = /\p{Extended_Pictographic}/u
/** Latin-1, typografische Zeichen, im Französischen zusätzlich œ und Œ. */
const ERLAUBT = /^[ -~ -ÿ–—‘’‚“”„…·œŒ\n]*$/

function stil(wo: string, x: string | undefined, sprache: Sprache) {
  if (!x) return
  if (EMOJI.test(x)) melde('F', wo, `Emoji: „${x.slice(0, 50)}“`)
  if (!ERLAUBT.test(x)) {
    const fremd = [...new Set([...x].filter((c) => !ERLAUBT.test(c)))].join(' ')
    melde('H', wo, `ungewöhnliche Zeichen ${fremd}: „${x.slice(0, 50)}“`)
  }
  const regeln = [...FLOSKELN[sprache], ...GEMEINSAM, ...(sprache === 'de' ? [DE_VOR_ZEICHEN] : [])]
  for (const [re, name] of regeln) if (re.test(x)) melde('H', wo, `${name}: „${x.slice(0, 70)}“`)
}

function spanne(s: string): [number, number] | null {
  const m = /^(\d+)–(\d+)$/.exec(s)
  return m ? [Number(m[1]), Number(m[2])] : null
}

// --- Jahrespläne -----------------------------------------------------------------------------
const planIds = new Set<string>()
for (const plan of PLAENE) {
  const wo = `plan-${plan.klasse}`
  for (const s of SPRACHEN) {
    for (const [feld, x] of [['titel', plan.titel[s]], ['untertitel', plan.untertitel[s]], ['faden', plan.faden[s]]] as const) {
      if (!x?.trim()) melde('F', wo, `${feld} (${s}) fehlt`)
      stil(`${wo} ${feld} ${s}`, x, s)
    }
    for (const k of KOMPETENZEN) {
      const z = plan.ziele[k.id]?.[s]
      if (!z?.trim()) melde('F', wo, `Jahresziel ${k.id} (${s}) fehlt`)
      else if (/^[A-ZÄÖÜÉÈ]/.test(z)) melde('H', wo, `Jahresziel ${k.id} (${s}) mit Verb (klein) beginnen`)
      stil(`${wo} Ziel ${k.id} ${s}`, z, s)
    }
  }
  // Kapitel: Nummern 1…n, Trimester steigend
  let letztesTrimester = 1
  plan.kapitel.forEach((k, i) => {
    const kw = `${wo} ${k.id}`
    if (k.nr !== i + 1) melde('F', kw, `Kapitel-Nr. ${k.nr}, erwartet ${i + 1}`)
    if (![1, 2, 3].includes(k.trimester)) melde('F', kw, 'Trimester 1–3')
    if (k.trimester < letztesTrimester) melde('F', kw, 'Trimester nicht in Reihenfolge')
    letztesTrimester = k.trimester
    if (!k.bild.startsWith('icon:')) melde('F', kw, 'Bild als icon:… angeben')
    for (const s of SPRACHEN) {
      if (!k.titel[s]?.trim() || !k.leitfrage[s]?.trim()) melde('F', kw, `Titel oder Leitfrage (${s}) fehlt`)
      stil(`${kw} ${s}`, k.titel[s], s)
      stil(`${kw} ${s}`, k.leitfrage[s], s)
    }
    if (!plan.einheiten.some((e) => e.kapitel === k.id)) melde('F', kw, 'Kapitel ohne Einheiten')
  })
  // Einheiten: lückenlose Nummern bis 35, Kapitel in Reihenfolge
  let naechste = 1
  let kapIndex = 0
  for (const e of plan.einheiten) {
    const ew = `${wo} ${e.id}`
    if (planIds.has(e.id)) melde('F', ew, 'Id doppelt')
    planIds.add(e.id)
    if (!new RegExp(`^ff${plan.klasse[0]}-e\\d{2}$`).test(e.id)) melde('F', ew, `Id im Format ff${plan.klasse[0]}-e01`)
    if (e.nr !== naechste) melde('F', ew, `Nr. ${e.nr}, erwartet ${naechste}`)
    naechste += e.termine ?? 1
    const ki = plan.kapitel.findIndex((k) => k.id === e.kapitel)
    if (ki < 0) melde('F', ew, `Kapitel ${e.kapitel} gibt es nicht`)
    else if (ki < kapIndex) melde('F', ew, 'Kapitel nicht in Reihenfolge')
    else kapIndex = ki
    if (!e.kompetenzen.length || e.kompetenzen.length > 3) melde('F', ew, '1–3 Kompetenzbereiche')
    for (const k of e.kompetenzen) if (!KOMP.has(k)) melde('F', ew, `Kompetenz „${k}“ gibt es nicht`)
    if (!e.basis && !e.neu) melde('H', ew, 'weder „basis“ (Skills-Kurs) noch „neu“')
    for (const s of SPRACHEN) {
      if (!e.titel[s]?.trim() || !e.kurz[s]?.trim()) melde('F', ew, `Titel oder Kurztext (${s}) fehlt`)
      if (e.kurz[s]?.length > 115) melde('H', ew, `Kurztext (${s}) über 115 Zeichen – passt nicht in eine Zeile`)
      if (e.titel[s]?.length > 48) melde('H', ew, `Titel (${s}) lang (${e.titel[s].length} Zeichen)`)
      if (e.hinweis && !e.hinweis[s]?.trim()) melde('F', ew, `Hinweis (${s}) fehlt`)
      stil(`${ew} ${s}`, e.titel[s], s)
      stil(`${ew} ${s}`, e.kurz[s], s)
      stil(`${ew} ${s}`, e.hinweis?.[s], s)
    }
  }
  if (naechste - 1 !== 35) melde('H', wo, `${naechste - 1} Doppelstunden statt 35`)
  const jeTrimester = [1, 2, 3].map((tr) =>
    plan.einheiten.filter((e) => plan.kapitel.find((k) => k.id === e.kapitel)?.trimester === tr).reduce((n, e) => n + (e.termine ?? 1), 0),
  )
  const kompetenzZahl = Object.fromEntries(KOMPETENZEN.map((k) => [k.id, plan.einheiten.filter((e) => e.kompetenzen.includes(k.id)).length]))
  for (const [k, n] of Object.entries(kompetenzZahl)) if (n < 6) melde('H', wo, `Kompetenzbereich ${k} nur in ${n} Einheiten`)
  console.log(`${wo}: ${plan.kapitel.length} Kapitel, ${naechste - 1} Doppelstunden (Trimester ${jeTrimester.join(' / ')}), Wahl: ${plan.einheiten.filter((e) => e.wahl).length}, neu: ${plan.einheiten.filter((e) => e.neu).length}`)
}

// --- Ausgearbeitete Einheiten ------------------------------------------------------------------
const PHASEN_LISTE = Object.keys(PHASEN) as Phase[]
for (const e of EINHEITEN) {
  const wo = `einheiten-${e.klasse} ${e.id}`
  const plan = PLAENE.find((p) => p.klasse === e.klasse)
  const pe = plan?.einheiten.find((u) => u.id === e.id)
  if (!pe) melde('F', wo, 'steht in keinem Jahresplan')
  for (const id of e.blaetter) if (!blattById.has(id)) melde('F', wo, `Schülerblatt „${id}“ gibt es nicht`)
  const texte: Record<Sprache, EinheitText> = { de: e.de, fr: e.fr }
  for (const s of SPRACHEN) {
    const x = texte[s]
    const sw = `${wo} ${s}`
    if (pe && x.titel !== pe.titel[s]) melde('H', sw, `Titel weicht vom Jahresplan ab („${pe.titel[s]}“)`)
    if (!x.ziele?.length || x.ziele.length > 4) melde('F', sw, '1–4 Ziele')
    if (!x.material?.length) melde('F', sw, 'Material fehlt')
    // Ablauf lückenlos
    let bis = 0
    for (const z of x.ablauf) {
      const sp = spanne(z.min)
      if (!sp) {
        melde('F', sw, `Ablauf: „${z.min}“ nicht im Format 10–25`)
        continue
      }
      if (sp[0] !== bis) melde('F', sw, `Ablauf: Lücke oder Überschneidung bei ${z.min}`)
      bis = sp[1]
      if (!PHASEN_LISTE.includes(z.phase)) melde('F', sw, `Phase „${z.phase}“ gibt es nicht`)
      stil(sw, z.titel, s)
    }
    if (bis !== e.dauer) melde('F', sw, `Ablauf endet bei ${bis}, Dauer ${e.dauer}`)
    const summe = x.schritte.reduce((a, st) => a + st.dauer, 0)
    if (summe !== e.dauer) melde('F', sw, `Schritte ergeben ${summe} Min., Dauer ${e.dauer}`)
    x.schritte.forEach((st, i) => {
      const stw = `${sw} Schritt ${i + 1}`
      if (st.blatt && !e.blaetter.includes(st.blatt)) melde('F', stw, `Blatt „${st.blatt}“ fehlt in „blaetter“`)
      if (st.text.length < 120) melde('H', stw, 'Anleitung sehr knapp')
      for (const y of st.sagen ?? []) if (/^[„“"«]|[“"»]$/.test(y.trim())) melde('H', stw, '„sagen“ ohne Anführungszeichen schreiben')
      for (const y of [st.titel, st.text, ...(st.sagen ?? []), ...(st.punkte ?? []), st.tipp, st.wennEsKippt, ...(st.tabelle?.zeilen.flat() ?? [])]) stil(stw, y, s)
    })
    for (const q of x.quellen ?? []) if (!QUELLEN_TEXTE.has(q)) melde('F', sw, `Quelle nicht in src/blatt/quellen.ts: „${q.slice(0, 60)}“`)
    if (x.hintergrund && (x.hintergrund.length < 300 || x.hintergrund.length > 1000)) melde('H', sw, `Hintergrund ${x.hintergrund.length} Zeichen (300–900)`)
    if (!x.achtung) melde('H', sw, '„achtung“ fehlt')
    for (const y of [x.titel, x.kurz, ...x.ziele, ...x.material, ...(x.vorbereitung ?? []), x.bruecke, x.hintergrund, x.achtung]) stil(sw, y, s)
  }
  // Beide Sprachen gleich gebaut
  const [a, b] = [e.de, e.fr]
  if (a.ablauf.length !== b.ablauf.length) melde('F', wo, 'Ablauf DE/FR ungleich lang')
  a.ablauf.forEach((z, i) => {
    const y = b.ablauf[i]
    if (y && (z.min !== y.min || z.phase !== y.phase)) melde('F', wo, `Ablauf-Zeile ${i + 1}: Minuten oder Phase DE/FR verschieden`)
  })
  if (a.schritte.length !== b.schritte.length) melde('F', wo, 'Schritte DE/FR ungleich viele')
  a.schritte.forEach((st, i) => {
    const y = b.schritte[i]
    if (!y) return
    if (st.dauer !== y.dauer || st.phase !== y.phase || st.blatt !== y.blatt) melde('F', wo, `Schritt ${i + 1}: Dauer, Phase oder Blatt DE/FR verschieden`)
    if ((st.sagen?.length ?? 0) !== (y.sagen?.length ?? 0) || (st.punkte?.length ?? 0) !== (y.punkte?.length ?? 0)) melde('F', wo, `Schritt ${i + 1}: Anzahl Impulse oder Punkte DE/FR verschieden`)
    if (!!st.tipp !== !!y.tipp || !!st.wennEsKippt !== !!y.wennEsKippt || !!st.tabelle !== !!y.tabelle) melde('F', wo, `Schritt ${i + 1}: Tipp, „Wenn es kippt“ oder Tabelle nur in einer Sprache`)
  })
  if (a.ziele.length !== b.ziele.length || a.material.length !== b.material.length || (a.vorbereitung?.length ?? 0) !== (b.vorbereitung?.length ?? 0)) melde('F', wo, 'Ziele, Material oder Vorbereitung DE/FR ungleich viele')
  if (JSON.stringify(a.quellen) !== JSON.stringify(b.quellen)) melde('F', wo, 'Quellen DE/FR verschieden')
}

// --- Handbuch (Teil A) -----------------------------------------------------------------------------
function texteIn(x: unknown, out: string[] = []): string[] {
  if (typeof x === 'string') out.push(x)
  else if (Array.isArray(x)) x.forEach((y) => texteIn(y, out))
  else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => k !== 'phase' && k !== 'min' && k !== 'nummer' && k !== 'zahl' && texteIn(v, out))
  return out
}
const aufbau = (x: unknown): unknown => (Array.isArray(x) ? x.map(aufbau) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, aufbau(v)])) : typeof x)
if (JSON.stringify(aufbau(HANDBUCH.de)) !== JSON.stringify(aufbau(HANDBUCH.fr))) melde('F', 'handbuch', 'DE und FR sind nicht gleich aufgebaut')
for (const s of SPRACHEN) for (const v of [HANDBUCH[s].vorwort.mitEinheit, HANDBUCH[s].vorwort.ohneEinheit]) if (!v.includes('{klasse}')) melde('F', `handbuch ${s}`, 'Vorwort ohne Platzhalter {klasse}')
for (const id of VORLAGEN) if (!blattById.has(id)) melde('F', 'daten.ts', `Kopiervorlage „${id}“ gibt es nicht`)
for (const s of SPRACHEN) for (const x of texteIn(HANDBUCH[s])) stil(`handbuch ${s}`, x, s)

// --- Schülerblätter ------------------------------------------------------------------------------------
for (const b of BLAETTER) {
  if (!b.fr) melde('F', `Blatt ${b.id}`, 'Französisch fehlt')
  else if (JSON.stringify(b.de.bausteine.map((x) => x.art)) !== JSON.stringify(b.fr.bausteine.map((x) => x.art))) melde('F', `Blatt ${b.id}`, 'Bausteine DE/FR verschieden')
  for (const s of SPRACHEN) {
    const inhalt = s === 'fr' ? b.fr : b.de
    if (!inhalt) continue
    for (const x of texteIn(inhalt.bausteine)) stil(`Blatt ${b.id} ${s}`, x, s)
    for (const q of inhalt.lehrer.quellen ?? []) if (!QUELLEN_TEXTE.has(q)) melde('F', `Blatt ${b.id} ${s}`, `Quelle nicht geprüft: „${q.slice(0, 60)}“`)
  }
  const genutzt = EINHEITEN.some((e) => e.blaetter.includes(b.id)) || VORLAGEN.includes(b.id)
  if (!genutzt) melde('H', `Blatt ${b.id}`, 'wird in keiner Einheit verwendet')
}

console.log(`\n${EINHEITEN.length} ausgearbeitete Einheit(en), ${BLAETTER.length} Schülerblätter`)
console.log(`${fehler} Fehler, ${hinweise} Hinweise`)
process.exit(fehler ? 1 : 0)
