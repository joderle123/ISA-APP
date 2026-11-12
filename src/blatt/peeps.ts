// ---------------------------------------------------------------------------
// „Peeps“: handgezeichnete Jugendliche und Erwachsene für Arbeitsblätter
// (Open Peeps von Pablo Stanley, openpeeps.com, Lizenz CC0 – frei nutzbar).
// Die Bausteine (Kopf, Gesicht, Körper, Haltung, Bart, Brille) liegen als Formen
// in src/blatt/bilder/peeps.json (erzeugt mit tools/peeps/peeps.py).
//
//   'peep:<wer>[:<gefuehl>[:<haltung>]]'   z. B. 'peep:jana:froh', 'peep:yusuf:wuetend:stehen-verschraenkt'
//
// <wer>     feste Person aus PEEPS (gleiche Namen wie die bisherigen Figuren, wo es passt)
// <gefuehl> ein Gefühl aus GEFUEHLE (Standard: neutral)
// <haltung> 'brust' (Standard), eine Brustbild-Haltung (handy, zeigen, verschraenkt …) oder ganze Figur
//           (stehen, gehen, sitzen, rollstuhl …) – siehe PEEP_HALTUNGEN
// ---------------------------------------------------------------------------

import DATEN from './bilder/peeps.json'
import type { Gefuehl } from './typen'
import type { Form, Zeichnung } from './zeichnung'

type Art = 'brust' | 'stehen' | 'sitzen'
type RolleP = 'koerper' | 'kopf' | 'gesicht' | 'bart' | 'brille'
interface Teil { b: number; h: number; k: number[]; f: Form[] }
interface Platz { rolle: RolleP; x: number; y: number; b: number; h: number; standard: string }
const D = DATEN as unknown as { teile: Record<string, Teil>; person: Record<Art, { b: number; h: number; plaetze: Platz[] }> }

export interface Peep {
  /** Kopf mit Frisur, z. B. 'bun-2' (Liste: PEEP_KOEPFE) */
  kopf: string
  haut: string
  /** Farbe der Kleidung (helle, freundliche Töne drucken am besten) */
  kleid: string
  /** Oberteil im Brustbild, z. B. 'hoodie' */
  ober: string
  /** Ganze Figur: Haltung im Stehen und im Sitzen */
  stehen: string
  sitzen: string
  bart?: string
  brille?: string
  /** nur für die wenigen Frisuren mit eigener Haarfarbe (graue Köpfe, Mützen) */
  haar?: string
}

export const PEEPS: Record<string, Peep> = {
  // Jugendliche
  jana: { kopf: 'medium-1', haut: '#C58C66', kleid: '#8FD3C8', ober: 'hoodie', stehen: 'shirt-1', sitzen: 'crossed-legs' },
  ben: { kopf: 'pomp', haut: '#F2D3BA', kleid: '#B9C4D6', ober: 'sweater', stehen: 'easing-1', sitzen: 'mid-1' },
  lina: { kopf: 'hijab', haut: '#E3B890', kleid: '#B7D38F', ober: 'turtleneck', stehen: 'resting-1', sitzen: 'closed-legs-1', haar: '#D9A5B5' },
  yusuf: { kopf: 'flat-top', haut: '#966242', kleid: '#F4B860', ober: 'thunder-t-shirt', stehen: 'crossed-arms-1', sitzen: 'one-leg-up-1' },
  nele: { kopf: 'medium-bangs', haut: '#F2D3BA', kleid: '#F2A0A5', ober: 'striped-tee', stehen: 'resting-2', sitzen: 'wheelchair' },
  finn: { kopf: 'short-1', haut: '#EFC9A6', kleid: '#9BC3E6', ober: 'tee-1', stehen: 'walking-1', sitzen: 'hands-back-1' },
  chloe: { kopf: 'bun-2', haut: '#F6DDC8', kleid: '#F0CE6E', ober: 'sweater-dots', stehen: 'shirt-2', sitzen: 'closed-legs-2', brille: 'glasses-2' },
  sami: { kopf: 'twists', haut: '#9C6A48', kleid: '#E8A0B4', ober: 'gym-shirt', stehen: 'robot-dance-1', sitzen: 'mid-2' },
  mia: { kopf: 'long-bangs', haut: '#F2D2B6', kleid: '#F2B27A', ober: 'tee-2', stehen: 'walking-2', sitzen: 'crossed-legs' },
  noah: { kopf: 'short-3', haut: '#DDB08A', kleid: '#9DB7E8', ober: 'striped-pocket-tee', stehen: 'easing-2', sitzen: 'one-leg-up-2' },
  lea: { kopf: 'buns', haut: '#F6DDC8', kleid: '#A9D39A', ober: 'sporty-tee', stehen: 'pointing-finger-1', sitzen: 'hands-back-2' },
  amira: { kopf: 'long-curly', haut: '#D6A57F', kleid: '#C3B1E8', ober: 'dress', stehen: 'shirt-3', sitzen: 'closed-legs-1' },
  tom: { kopf: 'hat-beanie', haut: '#F0CDAD', kleid: '#E9D27A', ober: 'whatever', stehen: 'walking-3', sitzen: 'mid-1', haar: '#D9705F' },
  lio: { kopf: 'afro', haut: '#B98561', kleid: '#8CCDB8', ober: 'gaming', stehen: 'crossed-arms-2', sitzen: 'wheelchair' },
  // Erwachsene
  lehrerin: { kopf: 'bun', haut: '#EFCFB3', kleid: '#E3A9A9', ober: 'button-shirt-1', stehen: 'blazer-1', sitzen: 'closed-legs-2', brille: 'glasses' },
  lehrer: { kopf: 'no-hair-1', haut: '#8C5A3E', kleid: '#A9C0DA', ober: 'polo-and-sweater', stehen: 'shirt-4', sitzen: 'mid-2', bart: 'full-2' },
  mutter: { kopf: 'medium-straight', haut: '#EBC4A2', kleid: '#A9CFA6', ober: 'shirt-and-coat', stehen: 'blazer-2', sitzen: 'crossed-legs' },
  vater: { kopf: 'short-2', haut: '#D2A07A', kleid: '#A9C4E6', ober: 'button-shirt-2', stehen: 'blazer-3', sitzen: 'one-leg-up-1', bart: 'full' },
  oma: { kopf: 'gray-bun', haut: '#F1D3B8', kleid: '#D9C2E8', ober: 'sweater', stehen: 'polka-dots', sitzen: 'closed-legs-1', haar: '#D9DCE3', brille: 'glasses-3' },
  opa: { kopf: 'gray-short', haut: '#E7BE9A', kleid: '#C9D4B0', ober: 'polo-and-sweater', stehen: 'resting-1', sitzen: 'mid-1', haar: '#D9DCE3', bart: 'moustache-3' },
  aerztin: { kopf: 'doctor-nurse-2', haut: '#C58C66', kleid: '#A8DAD0', ober: 'jacket', stehen: 'doctor-nurse-02', sitzen: 'closed-legs-2', haar: '#A8DAD0' },
  chef: { kopf: 'short-5', haut: '#F0CCAE', kleid: '#DDE6F0', ober: 'blazer-black-tee', stehen: 'blazer-4', sitzen: 'mid-2', brille: 'glasses-4' },
}
export const PEEP_NAMEN = Object.keys(PEEPS)

/** Gefühl → Gesicht */
export const PEEP_GESICHT: Record<Gefuehl, string> = {
  froh: 'smile',
  traurig: 'solemn',
  wuetend: 'very-angry',
  aengstlich: 'fear',
  ueberrascht: 'awe',
  angeekelt: 'contempt',
  ruhig: 'calm',
  stolz: 'smile-big',
  verlegen: 'cute',
  muede: 'tired',
  nervoes: 'hectic',
  enttaeuscht: 'concerned',
  gelangweilt: 'blank',
  verwirrt: 'suspicious',
  aufgeregt: 'smile-lol',
  besorgt: 'concerned-fear',
  neutral: 'serious',
}

/** Haltung → Bildart und (wenn fest) Baustein. Ohne Baustein gilt die Haltung der Person. */
export const PEEP_HALTUNGEN: Record<string, { art: Art; teil?: string }> = {
  brust: { art: 'brust' },
  handy: { art: 'brust', teil: 'koerper/device' },
  zeigen: { art: 'brust', teil: 'koerper/pointing-up' },
  verschraenkt: { art: 'brust', teil: 'koerper/tee-arms-crossed' },
  erklaeren: { art: 'brust', teil: 'koerper/explaining' },
  zocken: { art: 'brust', teil: 'koerper/gaming' },
  laptop: { art: 'brust', teil: 'koerper/macbook' },
  blatt: { art: 'brust', teil: 'koerper/paper' },
  tasse: { art: 'brust', teil: 'koerper/coffee' },
  egal: { art: 'brust', teil: 'koerper/whatever' },
  stehen: { art: 'stehen' },
  'stehen-verschraenkt': { art: 'stehen', teil: 'stehen/crossed-arms-1' },
  'stehen-zeigen': { art: 'stehen', teil: 'stehen/pointing-finger-1' },
  gehen: { art: 'stehen', teil: 'stehen/walking-1' },
  laessig: { art: 'stehen', teil: 'stehen/easing-1' },
  tanzen: { art: 'stehen', teil: 'stehen/robot-dance-2' },
  sitzen: { art: 'sitzen' },
  schneidersitz: { art: 'sitzen', teil: 'sitzen/crossed-legs' },
  hocken: { art: 'sitzen', teil: 'sitzen/one-leg-up-1' },
  rollstuhl: { art: 'sitzen', teil: 'sitzen/wheelchair' },
  rad: { art: 'sitzen', teil: 'sitzen/bike' },
}

const namenVon = (gruppe: string) => Object.keys(D.teile).filter((k) => k.startsWith(gruppe + '/') && !k.endsWith('/ohne')).map((k) => k.slice(gruppe.length + 1))
export const PEEP_KOEPFE = namenVon('kopf')
export const PEEP_GESICHTER = namenVon('gesicht')
export const PEEP_OBERTEILE = namenVon('koerper')

/** Farbrollen der Bausteine durch die Farben der Person ersetzen. */
function faerbe(formen: Form[], p: Peep): Form[] {
  const neu = (w: string | undefined) => (w === 'haut' ? p.haut : w === 'kleid' ? p.kleid : w === 'haar' ? (p.haar ?? '#D9DCE3') : w)
  return formen.map((f) => (f.t === 'g' ? { ...f, formen: faerbe(f.formen, p) } : { ...f, f: neu(f.f), s: neu(f.s) }) as Form)
}

export function istPeep(wer: string): boolean {
  return Object.prototype.hasOwnProperty.call(PEEPS, wer)
}

/** Zeichnung einer Person. Unbekannte Angaben fallen auf den Standard zurück (das Prüfskript meldet sie). */
export function peepZeichnung(wer: string, gefuehl?: string, haltung?: string): Zeichnung {
  const p = PEEPS[wer] ?? PEEPS.jana
  const h = PEEP_HALTUNGEN[haltung ?? 'brust'] ?? PEEP_HALTUNGEN.brust
  const person = D.person[h.art]
  const gesicht = 'gesicht/' + ((PEEP_GESICHT as Record<string, string>)[gefuehl ?? 'neutral'] ?? (PEEP_GESICHTER.includes(gefuehl ?? '') ? gefuehl : 'serious'))
  const wahl: Record<RolleP, string> = {
    koerper: h.teil ?? (h.art === 'brust' ? 'koerper/' + p.ober : h.art + '/' + (h.art === 'stehen' ? p.stehen : p.sitzen)),
    kopf: 'kopf/' + p.kopf,
    gesicht,
    bart: 'bart/' + (p.bart ?? 'ohne'),
    brille: 'brille/' + (p.brille ?? 'ohne'),
  }
  const formen: Form[] = []
  let k: number[] | null = null
  for (const pl of person.plaetze) {
    const t = D.teile[wahl[pl.rolle]] ?? D.teile[pl.standard]
    if (!t || !t.f.length) continue
    const sx = pl.b / t.b
    const sy = pl.h / t.h
    formen.push({ t: 'g', tf: `translate(${pl.x} ${pl.y}) scale(${+sx.toFixed(4)} ${+sy.toFixed(4)})`, formen: faerbe(t.f, p) })
    const b = [pl.x + t.k[0] * sx, pl.y + t.k[1] * sy, pl.x + t.k[2] * sx, pl.y + t.k[3] * sy]
    k = k ? [Math.min(k[0], b[0]), Math.min(k[1], b[1]), Math.max(k[2], b[2]), Math.max(k[3], b[3])] : b
  }
  const r = 12
  const [x0, y0, x1, y1] = k ?? [0, 0, person.b, person.h]
  return { vb: [Math.floor(x0 - r), Math.floor(y0 - r), Math.ceil(x1 - x0 + 2 * r), Math.ceil(y1 - y0 + 2 * r)], formen, w: 4 }
}
