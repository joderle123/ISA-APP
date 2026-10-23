// ---------------------------------------------------------------------------
// Figuren für Bildgeschichten: feste Kinder, Jugendliche und Erwachsene im
// selben Strich wie die Gefühlsgesichter. Gefühl und Haltung sind wählbar:
//   'figur:mia:froh:winken', 'figur:noah:wuetend:verschraenkt'
// Raster 100 × 160 (Füße auf y = 152). Kinder (3 Kopfhöhen, runder Kopf, kurze
// Beine) und Jugendliche/Erwachsene (kleinerer Kopf, lange Beine, schmaler
// Körper, Kleidung nach Rolle) haben je eine eigene Zeichenfunktion.
// ---------------------------------------------------------------------------

import type { Gefuehl } from './typen'
import type { Form, Zeichnung } from './zeichnung'
import { gesichtsZuege, istGefuehl } from './gesichter'

export type Pose =
  | 'stehen' | 'winken' | 'verschraenkt' | 'zeigen' | 'jubeln' | 'melden' | 'stopp' | 'haende-gesicht' | 'geben'
  // zusätzlich: Handy halten, auf Stuhl sitzen, gehen, Hand am Kinn, halb abgewandt (Ausgrenzung)
  | 'handy' | 'sitzen' | 'gehen' | 'nachdenken' | 'abwenden'

export const POSEN: Pose[] = ['stehen', 'winken', 'verschraenkt', 'zeigen', 'jubeln', 'melden', 'stopp', 'haende-gesicht', 'geben', 'handy', 'sitzen', 'gehen', 'nachdenken', 'abwenden']

/** Haltungen, die für alle Figuren (auch Kinder) über die gemeinsame Zeichenfunktion laufen; die älteren Haltungen
 *  der Kinder bleiben unverändert. */
const NEUE_POSEN: Pose[] = ['handy', 'sitzen', 'gehen', 'nachdenken', 'abwenden']

export type Haar =
  | 'kurz' | 'lang' | 'zopf' | 'locken' | 'tuch' | 'kappe' | 'dutt' | 'glatze-bart'
  // Jugendliche und Erwachsene
  | 'glatt' | 'tolle' | 'kurzlocken' | 'pferd' | 'hijab' | 'bob' | 'scheitel'

/** Oberteil der Jugendlichen und Erwachsenen (Details siehe `oberteilZuege`). */
export type Oberteil = 'shirt' | 'hoodie' | 'pulli' | 'hemd' | 'kittel' | 'schuerze' | 'jacke' | 'strick' | 'tshirt'

export interface Typ {
  haar: Haar
  haarFarbe: string
  haut: string
  shirt: string
  hose: string
  /** Proportionen: Kind, Jugendliche/r, Erwachsene/r */
  alter: 'kind' | 'jugend' | 'erwachsen'
  extra?: string
  /** Nur Jugendliche und Erwachsene: Oberteil, zweite Farbe (Krawatte, Schürze, Innenshirt, Streifen), Ärmel, Brille
   *  (Rahmenfarbe), Bartstoppeln, Körperbau, Schuhfarbe, Hörgerät, Rollstuhl. */
  ober?: Oberteil
  ober2?: string
  aermel?: 'lang' | 'kurz'
  brille?: string
  bart?: boolean
  bau?: 'zierlich' | 'normal' | 'kraeftig'
  schuh?: string
  /** Vielfalt als Merkmal: Hörgerät hinter dem Ohr; Rollstuhl (die Figur sitzt dann in jeder Haltung). */
  hoergeraet?: boolean
  rollstuhl?: boolean
}

export const FIGUREN: Record<string, Typ> = {
  mia: { haar: 'lang', haarFarbe: '#4A3426', haut: '#F2D2B6', shirt: '#E59E57', hose: '#4F6D99', alter: 'kind' },
  noah: { haar: 'kurz', haarFarbe: '#2A2522', haut: '#DDB08A', shirt: '#6C8FC6', hose: '#3E4A60', alter: 'kind' },
  lea: { haar: 'zopf', haarFarbe: '#D5AE5E', haut: '#F6DDC8', shirt: '#86B477', hose: '#4F6D99', alter: 'kind' },
  sami: { haar: 'locken', haarFarbe: '#231E1C', haut: '#9C6A48', shirt: '#D8899A', hose: '#3E4A60', alter: 'kind' },
  amira: { haar: 'tuch', haarFarbe: '#5C6FA8', haut: '#D6A57F', shirt: '#9B87C8', hose: '#4A4F66', alter: 'kind' },
  tom: { haar: 'kappe', haarFarbe: '#7A5236', haut: '#F0CDAD', shirt: '#DDBF55', hose: '#4F6D99', alter: 'kind', extra: '#C2554A' },
  // Kind (um 8) im Rollstuhl – Gegenstück zu nele für junge Stufen; sitzt in jeder Haltung
  lio: { haar: 'kurzlocken', haarFarbe: '#3B2A21', haut: '#E2B48F', shirt: '#4E9E86', hose: '#3E4A60', alter: 'kind', rollstuhl: true, schuh: '#D9574A' },
  // Jugendliche (um 14): größer, schlanker, kleinerer Kopf, Kleidung statt Kinderhemd
  jana: { haar: 'glatt', haarFarbe: '#6B4630', haut: '#C58C66', shirt: '#5E9F9C', hose: '#36405A', alter: 'jugend', ober: 'hoodie', schuh: '#F4F6F9' },
  ben: { haar: 'tolle', haarFarbe: '#8A6440', haut: '#F2D3BA', shirt: '#7C8698', hose: '#36405A', alter: 'jugend', ober: 'pulli', ober2: '#DCE2EC', schuh: '#2B3550' },
  lina: { haar: 'hijab', haarFarbe: '#C98BA0', haut: '#E3B890', shirt: '#8A9E6B', hose: '#4A4F66', alter: 'jugend', ober: 'jacke', schuh: '#F4F6F9' },
  yusuf: { haar: 'kurzlocken', haarFarbe: '#1E1A19', haut: '#966242', shirt: '#E8A23C', hose: '#3E4A60', alter: 'jugend', ober: 'tshirt', ober2: '#FFF3D6', schuh: '#F4F6F9' },
  // Vielfalt als Merkmal (nicht als Hauptmerkmal): Rollstuhl, Hörgerät
  nele: { haar: 'bob', haarFarbe: '#C9A04E', haut: '#F2D3BA', shirt: '#E0777D', hose: '#4A4F66', alter: 'jugend', ober: 'pulli', ober2: '#FBE9E6', rollstuhl: true, schuh: '#F4F6F9' },
  finn: { haar: 'scheitel', haarFarbe: '#A67C45', haut: '#EFC9A6', shirt: '#6FA3C7', hose: '#3E4A60', alter: 'jugend', ober: 'tshirt', ober2: '#EAF3FA', hoergeraet: true, schuh: '#2B3550' },
  chloe: { haar: 'pferd', haarFarbe: '#B5532F', haut: '#F6DDC8', shirt: '#E2B04A', hose: '#4F6D99', alter: 'jugend', ober: 'strick', ober2: '#F6F2EA', brille: '#2F5D6B', extra: '#6C8FC6', schuh: '#2B3550' },
  // Erwachsene im Alltag und Beruf
  lehrerin: { haar: 'dutt', haarFarbe: '#5A4032', haut: '#EFCFB3', shirt: '#B36B6B', hose: '#3E4A60', alter: 'erwachsen', ober: 'strick', ober2: '#F3E9DD', schuh: '#4A3A34' },
  lehrer: { haar: 'glatze-bart', haarFarbe: '#3A2B22', haut: '#8C5A3E', shirt: '#5C7A9A', hose: '#3A4254', alter: 'erwachsen', ober: 'hemd', bau: 'kraeftig', schuh: '#3A2B22' },
  mutter: { haar: 'glatt', haarFarbe: '#5B3B2A', haut: '#EBC4A2', shirt: '#7FA47D', hose: '#4F6D99', alter: 'erwachsen', ober: 'pulli', bau: 'zierlich', schuh: '#F4F6F9' },
  vater: { haar: 'scheitel', haarFarbe: '#3B2E26', haut: '#D2A07A', shirt: '#7FA0C8', hose: '#4A4F66', alter: 'erwachsen', ober: 'jacke', bart: true, bau: 'kraeftig', schuh: '#2B3550' },
  verkaeuferin: { haar: 'bob', haarFarbe: '#8A3F2C', haut: '#F1D3B8', shirt: '#F4F1EA', hose: '#3A4254', alter: 'erwachsen', ober: 'schuerze', ober2: '#4E9A68', schuh: '#2B3550' },
  arzthelferin: { haar: 'pferd', haarFarbe: '#2A2420', haut: '#E7BE9A', shirt: '#7CC4B4', hose: '#E6EBEE', alter: 'erwachsen', ober: 'kittel', bau: 'zierlich', schuh: '#F4F6F9' },
  chef: { haar: 'scheitel', haarFarbe: '#8E8E96', haut: '#F0CCAE', shirt: '#DDE6F0', hose: '#2F3748', alter: 'erwachsen', ober: 'hemd', ober2: '#9C3D4B', brille: '#1B2233', bau: 'kraeftig', schuh: '#3A2B22' },
}

export const FIGUR_NAMEN = Object.keys(FIGUREN)

const T = '#1B2233'

/** Farbe aufhellen (f > 0, Richtung Weiß) oder abdunkeln (f < 0, Richtung Schwarz). */
export function ton(hex: string, f: number): string {
  const n = parseInt(hex.slice(1), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(f >= 0 ? v + (255 - v) * f : v * (1 + f)))
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('')
}

export function tube(d: string, farbe: string, dicke: number): Form[] {
  return [
    { t: 'path', d, s: T, f: 'none', w: dicke + 3 },
    { t: 'path', d, s: farbe, f: 'none', w: dicke },
  ]
}

function hand(x: number, y: number, haut: string, r = 5): Form {
  return { t: 'circle', cx: x, cy: y, r, f: haut, s: T, w: 2.2 }
}

export interface Mass {
  kx: number
  ky: number
  kr: number
  schulterY: number
  shirtUnten: number
  fussY: number
  breite: number
}

export function masse(alter: Typ['alter']): Mass {
  if (alter === 'jugend') return bauFuer({ alter: 'jugend' } as Typ)
  if (alter === 'erwachsen') return { kx: 50, ky: 24, kr: 17.5, schulterY: 45, shirtUnten: 102, fussY: 152, breite: 22 }
  return { kx: 50, ky: 36, kr: 23, schulterY: 63, shirtUnten: 112, fussY: 152, breite: 19 }
}

export function haarHinten(t: Typ, m: Mass): Form[] {
  const { kx: x, ky: y, kr: r } = m
  const hf = t.haarFarbe
  switch (t.haar) {
    case 'lang':
      return [{ t: 'path', d: `M${x - r - 3} ${y + 2} Q${x - r - 4} ${y - r - 3} ${x} ${y - r - 3} Q${x + r + 4} ${y - r - 3} ${x + r + 3} ${y + 2} L${x + r + 4} ${y + r + 12} Q${x + r - 6} ${y + r + 16} ${x + r - 10} ${y + r + 4} L${x - r + 10} ${y + r + 4} Q${x - r + 6} ${y + r + 16} ${x - r - 4} ${y + r + 12} Z`, f: hf, s: T, w: 2.2 }]
    case 'zopf':
      return [{ t: 'path', d: `M${x + r - 4} ${y - r + 6} Q${x + r + 16} ${y - r + 2} ${x + r + 13} ${y + 8} Q${x + r + 10} ${y + 20} ${x + r + 3} ${y + 12} Q${x + r + 8} ${y} ${x + r - 2} ${y - 6} Z`, f: hf, s: T, w: 2.2 }]
    case 'tuch':
      return [{ t: 'path', d: `M${x - r - 4} ${y + 4} Q${x - r - 5} ${y - r - 6} ${x} ${y - r - 6} Q${x + r + 5} ${y - r - 6} ${x + r + 4} ${y + 4} Q${x + r + 6} ${y + r + 10} ${x + r - 2} ${y + r + 14} L${x - r + 2} ${y + r + 14} Q${x - r - 6} ${y + r + 10} ${x - r - 4} ${y + 4} Z`, f: hf, s: T, w: 2.2 }]
    case 'dutt':
      // bei kleinerem Kopf (Jugendliche, Erwachsene) kleiner und tiefer, damit er im Raster bleibt
      return [{ t: 'circle', cx: x, cy: y - r - (r < 20 ? 3.2 : 5), r: r < 20 ? 7 : 8, f: hf, s: T, w: 2.2 }]
    case 'glatt':
      return [{ t: 'path', d: `M${x - r - 3} ${y + 2} Q${x - r - 3.5} ${y - r - 2.4} ${x} ${y - r - 2.4} Q${x + r + 3.5} ${y - r - 2.4} ${x + r + 3} ${y + 2} L${x + r + 4} ${y + r + 14} Q${x + r + 2} ${y + r + 20} ${x + r - 5} ${y + r + 19} L${x - r + 5} ${y + r + 19} Q${x - r - 2} ${y + r + 20} ${x - r - 4} ${y + r + 14} Z`, f: hf, s: T, w: 2.2 }]
    case 'bob':
      return [{ t: 'path', d: `M${x - r - 4} ${y + 2} Q${x - r - 5} ${y - r - 4} ${x} ${y - r - 4} Q${x + r + 5} ${y - r - 4} ${x + r + 4} ${y + 2} L${x + r + 5} ${y + r + 3} Q${x + r + 4} ${y + r + 8} ${x + r - 2} ${y + r + 8} L${x - r + 2} ${y + r + 8} Q${x - r - 4} ${y + r + 8} ${x - r - 5} ${y + r + 3} Z`, f: hf, s: T, w: 2.2 }]
    case 'pferd':
      return [
        { t: 'path', d: `M${x + r - 8} ${y - r + 1} Q${x + r + 9} ${y - r - 9} ${x + r + 14} ${y + 2} Q${x + r + 17} ${y + 14} ${x + r + 8} ${y + r + 7} Q${x + r + 10} ${y + 6} ${x + r + 3} ${y - 2} Q${x + r - 2} ${y - 8} ${x + r - 8} ${y - r + 1} Z`, f: hf, s: T, w: 2.2 },
        { t: 'ellipse', cx: x + r - 5, cy: y - r + 1, rx: 3.4, ry: 4.4, f: t.extra ?? ton(hf, -0.25), s: T, w: 1.6 },
      ]
    case 'hijab':
      return [{ t: 'path', d: `M${x - r - 5} ${y + 4} Q${x - r - 7} ${y - r - 7} ${x} ${y - r - 8} Q${x + r + 7} ${y - r - 7} ${x + r + 5} ${y + 4} Q${x + r + 8} ${y + r + 6} ${x + r + 4} ${y + r + 15} L${x - r - 4} ${y + r + 15} Q${x - r - 8} ${y + r + 6} ${x - r - 5} ${y + 4} Z`, f: hf, s: T, w: 2.2 }]
    default:
      return []
  }
}

/** Haare oder Tuch vor dem Oberkörper (Strähnen auf den Schultern, Tuch über Schultern und Brust) – hinter dem Kopf. */
export function haarDavor(t: Typ, m: Mass): Form[] {
  const { kx: x, ky: y, kr: r, schulterY: sy, breite: b } = m
  const hf = t.haarFarbe
  switch (t.haar) {
    case 'glatt':
      return [
        { t: 'path', d: `M${x - r + 2} ${y + 4} Q${x - r - 3} ${y + r + 6} ${x - r + 1} ${sy + 20} Q${x - r + 8} ${sy + 24} ${x - r + 9} ${sy + 14} Q${x - r + 8} ${y + r + 2} ${x - r + 7} ${y + 4} Z`, f: hf, s: T, w: 2 },
        { t: 'path', d: `M${x + r - 2} ${y + 4} Q${x + r + 3} ${y + r + 6} ${x + r - 1} ${sy + 20} Q${x + r - 8} ${sy + 24} ${x + r - 9} ${sy + 14} Q${x + r - 8} ${y + r + 2} ${x + r - 7} ${y + 4} Z`, f: hf, s: T, w: 2 },
      ]
    case 'hijab':
      return [
        { t: 'path', d: `M${x - r + 3} ${y + r - 7} Q${x - r - 4} ${y + r + 4} ${x - b - 1} ${sy + 8} Q${x - b - 2} ${sy + 17} ${x - 6} ${sy + 20} Q${x} ${sy + 22} ${x + 6} ${sy + 20} Q${x + b + 2} ${sy + 17} ${x + b + 1} ${sy + 8} Q${x + r + 4} ${y + r + 4} ${x + r - 3} ${y + r - 7} Z`, f: hf, s: T, w: 2.2 },
        { t: 'path', d: `M${x - 5} ${y + r + 6} Q${x - 8} ${sy + 11} ${x - 4} ${sy + 18}`, f: 'none', s: ton(hf, -0.3), w: 1.5 },
        { t: 'path', d: `M${x + 5} ${y + r + 6} Q${x + 8} ${sy + 11} ${x + 4} ${sy + 18}`, f: 'none', s: ton(hf, -0.3), w: 1.5 },
      ]
    default:
      return []
  }
}

export function haarVorne(t: Typ, m: Mass): Form[] {
  const { kx: x, ky: y, kr: r } = m
  const hf = t.haarFarbe
  switch (t.haar) {
    case 'kurz':
      return [{ t: 'path', d: `M${x - r - 1} ${y + 1} Q${x - r - 2} ${y - r - 2} ${x + 2} ${y - r - 2} Q${x + r + 2} ${y - r} ${x + r + 1} ${y + 1} Q${x + r - 2} ${y - r + 9} ${x + r - 9} ${y - r + 9} Q${x + 2} ${y - r + 13} ${x - 8} ${y - r + 7} Q${x - r + 3} ${y - r + 10} ${x - r - 1} ${y + 1} Z`, f: hf, s: T, w: 2.2 }]
    case 'lang':
    case 'zopf':
      return [{ t: 'path', d: `M${x - r} ${y - 2} Q${x - r + 1} ${y - r - 1} ${x} ${y - r - 1} Q${x + r - 1} ${y - r - 1} ${x + r} ${y - 2} Q${x + r - 6} ${y - r + 9} ${x + 4} ${y - r + 10} Q${x - 6} ${y - r + 8} ${x - r} ${y - 2} Z`, f: hf, s: T, w: 2.2 }]
    case 'locken': {
      const out: Form[] = []
      const n = 9
      for (let i = 0; i < n; i++) {
        const a = Math.PI * (1.08 + (0.84 * i) / (n - 1))
        out.push({ t: 'circle', cx: x + Math.cos(a) * (r - 1), cy: y - 2 + Math.sin(a) * (r - 1), r: r * 0.36, f: hf, s: T, w: 2 })
      }
      out.push({ t: 'path', d: `M${x - r + 2} ${y - 4} Q${x} ${y - r - 6} ${x + r - 2} ${y - 4} Q${x} ${y - r + 6} ${x - r + 2} ${y - 4} Z`, f: hf, s: 'none' })
      return out
    }
    case 'tuch':
      return [{ t: 'path', d: `M${x - r + 1} ${y - 3} Q${x - r + 3} ${y - r - 2} ${x} ${y - r - 2} Q${x + r - 3} ${y - r - 2} ${x + r - 1} ${y - 3} Q${x + r - 8} ${y - r + 7} ${x} ${y - r + 7} Q${x - r + 8} ${y - r + 7} ${x - r + 1} ${y - 3} Z`, f: hf, s: T, w: 2.2 }]
    case 'kappe':
      return [
        { t: 'path', d: `M${x - r + 1} ${y - 9} Q${x - r} ${y - r - 4} ${x} ${y - r - 4} Q${x + r} ${y - r - 4} ${x + r - 1} ${y - 9} Z`, f: t.extra ?? '#C2554A', s: T, w: 2.2 },
        { t: 'path', d: `M${x - r - 2} ${y - 9} Q${x} ${y - 3} ${x + r + 2} ${y - 9} Q${x + r + 2} ${y - 13} ${x + r - 2} ${y - 13} Q${x} ${y - 8} ${x - r + 2} ${y - 13} Q${x - r - 2} ${y - 13} ${x - r - 2} ${y - 9} Z`, f: t.extra ?? '#C2554A', s: T, w: 2.2 },
        { t: 'circle', cx: x, cy: y - r - 4, r: 2.2, f: T, s: 'none' },
      ]
    case 'dutt':
      return [{ t: 'path', d: `M${x - r - 1} ${y + 2} Q${x - r - 1} ${y - r - 2} ${x} ${y - r - 2} Q${x + r + 1} ${y - r - 2} ${x + r + 1} ${y + 2} Q${x + r - 4} ${y - r + 8} ${x} ${y - r + 8} Q${x - r + 4} ${y - r + 8} ${x - r - 1} ${y + 2} Z`, f: t.haarFarbe, s: T, w: 2.2 }]
    case 'glatze-bart':
      return [
        { t: 'path', d: `M${x - r + 1} ${y + 3} Q${x - r + 1} ${y + r + 3} ${x} ${y + r + 3} Q${x + r - 1} ${y + r + 3} ${x + r - 1} ${y + 3} Q${x + r - 5} ${y + 12} ${x} ${y + 12} Q${x - r + 5} ${y + 12} ${x - r + 1} ${y + 3} Z`, f: t.haarFarbe, s: T, w: 2 },
        { t: 'path', d: `M${x - r} ${y - 3} Q${x - r + 2} ${y - r + 1} ${x - r + 8} ${y - r + 3}`, s: t.haarFarbe, f: 'none', w: 3.5 },
        { t: 'path', d: `M${x + r} ${y - 3} Q${x + r - 2} ${y - r + 1} ${x + r - 8} ${y - r + 3}`, s: t.haarFarbe, f: 'none', w: 3.5 },
      ]
    case 'glatt':
    case 'bob':
    case 'pferd':
      // Seitenscheitel: Pony fällt von rechts oben schräg über die Stirn
      return [{ t: 'path', d: `M${x - r} ${y + 5} Q${x - r - 1} ${y - r - 1} ${x + 2} ${y - r - 2} Q${x + r + 1} ${y - r - 1} ${x + r} ${y + 5} Q${x + r - 2} ${y - 4} ${x + r - 5} ${y - 8} Q${x + 6} ${y - r + 5} ${x + 1} ${y - r + 4} Q${x - 8} ${y - r + 9} ${x - r + 3} ${y - 2} Q${x - r + 1} ${y + 1} ${x - r} ${y + 5} Z`, f: hf, s: T, w: 2.2 }]
    case 'tolle':
      return [{ t: 'path', d: `M${x - r - 1} ${y + 3} Q${x - r - 3} ${y - r - 1} ${x - 5} ${y - r - 3} Q${x + 3} ${y - r - 11} ${x + 12} ${y - r - 4} Q${x + r + 4} ${y - r - 2} ${x + r + 1} ${y + 3} Q${x + r - 2} ${y - r + 8} ${x + r - 9} ${y - r + 9} Q${x + 4} ${y - r + 4} ${x - 6} ${y - r + 9} Q${x - r + 4} ${y - r + 10} ${x - r - 1} ${y + 3} Z`, f: hf, s: T, w: 2.2 }]
    case 'scheitel':
      return [
        { t: 'path', d: `M${x - r - 0.5} ${y + 4} Q${x - r - 2} ${y - r - 2} ${x} ${y - r - 3} Q${x + r + 2} ${y - r - 2} ${x + r + 0.5} ${y + 4} Q${x + r - 1} ${y - 3} ${x + r - 4} ${y - 7} Q${x + 4} ${y - r + 6} ${x - 5} ${y - r + 6} Q${x - r + 5} ${y - r + 7} ${x - r + 1} ${y - 3} Q${x - r} ${y} ${x - r - 0.5} ${y + 4} Z`, f: hf, s: T, w: 2.2 },
        { t: 'path', d: `M${x - 5} ${y - r + 6} Q${x - 5} ${y - r + 1} ${x - 2} ${y - r - 2}`, f: 'none', s: ton(hf, -0.35), w: 1.3 },
      ]
    case 'kurzlocken': {
      const out: Form[] = [{ t: 'path', d: `M${x - r + 1} ${y + 3} Q${x - r} ${y - r - 2} ${x} ${y - r - 3} Q${x + r} ${y - r - 2} ${x + r - 1} ${y + 3} Q${x + r - 3} ${y - r + 9} ${x} ${y - r + 9} Q${x - r + 3} ${y - r + 9} ${x - r + 1} ${y + 3} Z`, f: hf, s: 'none' }]
      const n = 11
      for (let i = 0; i < n; i++) {
        const a = Math.PI * (1.06 + (0.88 * i) / (n - 1))
        out.push({ t: 'circle', cx: x + Math.cos(a) * (r - 0.5), cy: y - 1 + Math.sin(a) * (r - 0.5), r: r * 0.27, f: hf, s: T, w: 1.5 })
      }
      out.push({ t: 'path', d: `M${x - r + 3} ${y - r + 8} Q${x} ${y - r + 4} ${x + r - 3} ${y - r + 8}`, f: 'none', s: 'none' })
      return out
    }
    case 'hijab':
      // Rahmen ums Gesicht: Außenkontur im Uhrzeigersinn, Öffnung gegenläufig (Loch)
      return [{ t: 'path', d: `M${x - r - 2.4} ${y + 4} Q${x - r - 3} ${y - r - 4.2} ${x} ${y - r - 4.4} Q${x + r + 3} ${y - r - 4.2} ${x + r + 2.4} ${y + 4} Q${x + r + 2.6} ${y + r + 3} ${x} ${y + r + 5.5} Q${x - r - 2.6} ${y + r + 3} ${x - r - 2.4} ${y + 4} Z M${x - r + 1.1} ${y - 3} Q${x - r + 0.4} ${y + r - 4} ${x} ${y + r - 1.5} Q${x + r - 0.4} ${y + r - 4} ${x + r - 1.1} ${y - 3} Q${x + r - 1.2} ${y - r + 3.6} ${x} ${y - r + 4} Q${x - r + 1.2} ${y - r + 3.6} ${x - r + 1.1} ${y - 3} Z`, f: hf, s: T, w: 2.2 }]
    default:
      return []
  }
}

function arme(pose: Pose, t: Typ, m: Mass): { hinten: Form[]; vorne: Form[] } {
  const sy = m.schulterY + 4
  const lx = m.kx - m.breite + 3
  const rx = m.kx + m.breite - 3
  const d = t.alter === 'kind' ? 8.5 : 8
  const unten = m.shirtUnten - 8
  const H = t.haut
  const arm = (pfad: string, hx: number, hy: number) => [...tube(pfad, t.shirt, d), hand(hx, hy, H)]
  const links_unten = arm(`M${lx} ${sy} Q${lx - 7} ${sy + 18} ${lx - 6} ${unten}`, lx - 6, unten + 3)
  const rechts_unten = arm(`M${rx} ${sy} Q${rx + 7} ${sy + 18} ${rx + 6} ${unten}`, rx + 6, unten + 3)
  switch (pose) {
    case 'winken':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 14} ${sy - 4} ${rx + 16} ${sy - 26}`, rx + 17, sy - 30)] }
    case 'melden':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 6} ${sy - 14} ${rx + 6} ${sy - 36}`, rx + 6, sy - 40)] }
    case 'jubeln':
      return {
        hinten: [],
        vorne: [
          ...arm(`M${lx} ${sy} Q${lx - 12} ${sy - 8} ${lx - 16} ${sy - 30}`, lx - 17, sy - 34),
          ...arm(`M${rx} ${sy} Q${rx + 12} ${sy - 8} ${rx + 16} ${sy - 30}`, rx + 17, sy - 34),
        ],
      }
    case 'zeigen':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 12} ${sy + 4} ${rx + 26} ${sy + 2}`, rx + 29, sy + 2)] }
    case 'geben':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 8} ${sy + 14} ${rx + 22} ${sy + 14}`, rx + 25, sy + 13)] }
    case 'stopp':
      return {
        hinten: [],
        vorne: [
          ...links_unten,
          ...tube(`M${rx} ${sy} Q${rx + 12} ${sy + 2} ${rx + 22} ${sy - 6}`, t.shirt, d),
          { t: 'g', tf: `translate(${rx + 23} ${sy - 12}) rotate(-12)`, formen: [
            { t: 'rect', x: -3.6, y: 1, b: 13, h: 5.5, rx: 2.75, f: H, s: T, w: 2 },
            { t: 'rect', x: -7, y: -10, b: 11, h: 19, rx: 5.2, f: H, s: T, w: 2.2 },
            { t: 'line', x1: -3.4, y1: -9.5, x2: -3.4, y2: -4, s: T, w: 1.2 },
            { t: 'line', x1: 0.2, y1: -9.5, x2: 0.2, y2: -4, s: T, w: 1.2 },
          ] },
        ],
      }
    case 'verschraenkt':
      return {
        hinten: [],
        vorne: [
          ...tube(`M${lx} ${sy} Q${lx - 4} ${sy + 18} ${m.kx + 8} ${sy + 20}`, t.shirt, d),
          ...tube(`M${rx} ${sy} Q${rx + 4} ${sy + 16} ${m.kx - 8} ${sy + 16}`, t.shirt, d),
          hand(m.kx + 10, sy + 19, H, 4.2),
          hand(m.kx - 10, sy + 15, H, 4.2),
        ],
      }
    case 'haende-gesicht':
      return {
        hinten: [],
        vorne: [
          ...arm(`M${lx} ${sy} Q${lx - 8} ${sy + 8} ${m.kx - m.kr + 4} ${m.ky + 8}`, m.kx - m.kr + 4, m.ky + 5),
          ...arm(`M${rx} ${sy} Q${rx + 8} ${sy + 8} ${m.kx + m.kr - 4} ${m.ky + 8}`, m.kx + m.kr - 4, m.ky + 5),
        ],
      }
    default:
      return { hinten: [], vorne: [...links_unten, ...rechts_unten] }
  }
}

export function figurZeichnung(typName: string, gefuehl?: string, pose?: string): Zeichnung {
  const t = FIGUREN[typName]
  if (!t) return { vb: [0, 0, 100, 160], formen: [] }
  const g: Gefuehl = gefuehl && istGefuehl(gefuehl) ? gefuehl : 'neutral'
  const p: Pose = (POSEN as string[]).includes(pose ?? '') ? (pose as Pose) : 'stehen'
  if (t.alter !== 'kind' || t.rollstuhl || NEUE_POSEN.includes(p)) return { vb: [0, 0, 100, 160], formen: figurGross(t, g, p), w: 2.4 }
  const m = masse(t.alter)
  const { kx, ky, kr, schulterY, shirtUnten, fussY, breite } = m
  const formen: Form[] = []

  // Bodenschatten
  formen.push({ t: 'ellipse', cx: 50, cy: fussY + 3, rx: 26, ry: 3.2, f: 'hellgrau', s: 'none' })

  // Beine
  const hueftY = shirtUnten - 4
  formen.push(...tube(`M${kx - 8} ${hueftY} L${kx - 9} ${fussY - 4}`, t.hose, 10))
  formen.push(...tube(`M${kx + 8} ${hueftY} L${kx + 9} ${fussY - 4}`, t.hose, 10))
  formen.push({ t: 'path', d: `M${kx - 19} ${fussY + 1} Q${kx - 19} ${fussY - 7} ${kx - 10} ${fussY - 7} Q${kx - 4} ${fussY - 7} ${kx - 4} ${fussY + 1} Z`, f: T, s: T, w: 1.5 })
  formen.push({ t: 'path', d: `M${kx + 19} ${fussY + 1} Q${kx + 19} ${fussY - 7} ${kx + 10} ${fussY - 7} Q${kx + 4} ${fussY - 7} ${kx + 4} ${fussY + 1} Z`, f: T, s: T, w: 1.5 })

  // Haare hinten, Hals
  formen.push(...haarHinten(t, m))
  formen.push({ t: 'rect', x: kx - 5, y: ky + kr - 4, b: 10, h: schulterY - ky - kr + 8, f: t.haut, s: T, w: 2 })

  const a = arme(p, t, m)
  formen.push(...a.hinten)

  // Oberkörper
  const b = breite
  formen.push({
    t: 'path',
    d: `M${kx - b} ${schulterY + 6} Q${kx - b} ${schulterY} ${kx - b + 7} ${schulterY - 1} L${kx + b - 7} ${schulterY - 1} Q${kx + b} ${schulterY} ${kx + b} ${schulterY + 6} L${kx + b + 2} ${shirtUnten - 3} Q${kx + b + 2} ${shirtUnten} ${kx + b - 2} ${shirtUnten} L${kx - b + 2} ${shirtUnten} Q${kx - b - 2} ${shirtUnten} ${kx - b - 2} ${shirtUnten - 3} Z`,
    f: t.shirt,
    s: T,
    w: 2.4,
  })
  formen.push({ t: 'path', d: `M${kx - 6} ${schulterY - 1} Q${kx} ${schulterY + 6} ${kx + 6} ${schulterY - 1}`, f: t.haut, s: T, w: 2 })

  // Kopf mit Ohren
  formen.push({ t: 'circle', cx: kx - kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  formen.push({ t: 'circle', cx: kx + kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  formen.push({ t: 'circle', cx: kx, cy: ky, r: kr, f: t.haut, s: T, w: 2.4 })
  formen.push(...haarVorne(t, m))

  // Gesicht (100er-Raster → Kopf)
  const k = (kr * 0.96) / 43
  formen.push({ t: 'g', tf: `translate(${kx - 50 * k} ${ky + 2 - 52 * k}) scale(${k})`, formen: gesichtsZuege(g, ['dampf', 'zzz', 'frage', 'funken', 'schweiss']) })

  formen.push(...a.vorne)
  return { vb: [0, 0, 100, 160], formen, w: 2.4 }
}

// --- Jugendliche und Erwachsene ------------------------------------------------------------------
// Eigene Proportionen (Kopf kleiner, Hals und Beine länger, Schultern schmaler, Arme dünner), Kleidung nach Rolle.

interface Bau extends Mass {
  halsB: number
  /** halbe Breite der Schultern und des Saums */
  sb: number
  hb: number
  hueft: number
  beinD: number
  beinX: number
  fussX: number
  armD: number
  handR: number
  /** Armlänge im Verhältnis zu den Kinderarmen */
  ar: number
  /** Größe der Gesichtszüge im Kopf (kleiner = älter) und senkrechte Lage des Gesichts im Kopf */
  gk: number
  gy: number
  /** Abstand der Knöchel zur Bodenlinie */
  fussHoch: number
}

function bauFuer(t: Typ): Bau {
  if (t.alter === 'kind')
    return { kx: 50, ky: 36, kr: 23, schulterY: 63, shirtUnten: 112, fussY: 152, breite: 19, halsB: 5, sb: 19, hb: 19.5, hueft: 108, beinD: 10, beinX: 8, fussX: 9, armD: 8.5, handR: 5, ar: 1, gk: 1, gy: 2, fussHoch: 4 }
  const jugend = t.alter === 'jugend'
  const k = t.bau === 'zierlich' ? 0.93 : t.bau === 'kraeftig' ? 1.1 : 1
  const sb = (jugend ? 18 : 21) * k
  const hb = (jugend ? 16.5 : 19) * (t.bau === 'kraeftig' ? 1.12 : k)
  return {
    kx: 50,
    ky: jugend ? 30 : 28,
    kr: jugend ? 16.5 : 15.8,
    schulterY: jugend ? 51 : 49,
    shirtUnten: jugend ? 99 : 100,
    fussY: 152,
    breite: sb,
    halsB: jugend ? 4.4 : 4.9,
    sb,
    hb,
    hueft: jugend ? 94 : 95,
    beinD: (jugend ? 9.4 : 10.2) * Math.sqrt(k),
    beinX: jugend ? 7 : 7.8,
    fussX: jugend ? 8.8 : 9.4,
    armD: (jugend ? 7.4 : 8.2) * Math.sqrt(k),
    handR: jugend ? 4.6 : 4.9,
    ar: jugend ? 1.06 : 1.1,
    gk: jugend ? 0.9 : 0.92,
    gy: 3,
    fussHoch: 5,
  }
}

type V = [number, number]
const pt = (v: V) => `${+v[0].toFixed(2)} ${+v[1].toFixed(2)}`

/** Teilstück einer quadratischen Kurve (Start p0, Kontrollpunkt c, Ende e) zwischen den Parametern a und b (0 ≤ a < b ≤ 1). */
function stueck(p0: V, c: V, e: V, a: number, b: number): string {
  const lerp = (u: V, v: V, x: number): V => [u[0] + (v[0] - u[0]) * x, u[1] + (v[1] - u[1]) * x]
  const punkt = (x: number): V => lerp(lerp(p0, c, x), lerp(c, e, x), x)
  const c1 = lerp(p0, c, b) // Kontrollpunkt des Stücks [0, b]
  const e1 = punkt(b)
  return `M${pt(punkt(a))} Q${pt(lerp(c1, e1, a / b))} ${pt(e1)}`
}

/** Kurzer Ärmel: Vieleck um den Anfang des Arms mit geradem Saum (wie ein Ärmelbündchen). */
function kurzAermel(p0: V, c: V, e: V, farbe: string, d: number, bis = 0.42): Form {
  const links: V[] = []
  const rechts: V[] = []
  const n = 4
  let t0: V = [0, 0]
  let u0: V = [0, 0]
  for (let i = 0; i <= n; i++) {
    const t = (bis * i) / n
    const x = (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c[0] + t * t * e[0]
    const y = (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c[1] + t * t * e[1]
    const tx = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (e[0] - c[0])
    const ty = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (e[1] - c[1])
    const l = Math.hypot(tx, ty) || 1
    const nx = -ty / l
    const ny = tx / l
    const w = (d + 3.6 - 2.2 * (i / n)) / 2
    if (i === 0) {
      t0 = [tx / l, ty / l]
      u0 = [x, y]
    }
    links.push([x + nx * w, y + ny * w])
    rechts.push([x - nx * w, y - ny * w])
  }
  const kappe: V = [u0[0] - t0[0] * (d / 2 + 2), u0[1] - t0[1] * (d / 2 + 2)]
  const dpfad = `M${pt(links[0])} ${links.slice(1).map((q) => `L${pt(q)}`).join(' ')} L${pt(rechts[n])} ${rechts
    .slice(0, n)
    .reverse()
    .map((q) => `L${pt(q)}`)
    .join(' ')} Q${pt(kappe)} ${pt(links[0])} Z`
  return { t: 'path', d: dpfad, f: farbe, s: T, w: 1.9 }
}

function schuhe(t: Typ, b: Bau): Form[] {
  const { kx, fussY: fy, fussX } = b
  const farbe = t.schuh ?? '#2B3550'
  const sohle = t.alter === 'jugend' ? 'papier' : 'hellgrau'
  const out: Form[] = []
  if (t.alter === 'kind') {
    out.push({ t: 'path', d: `M${kx - 19} ${fy + 1} Q${kx - 19} ${fy - 7} ${kx - 10} ${fy - 7} Q${kx - 4} ${fy - 7} ${kx - 4} ${fy + 1} Z`, f: T, s: T, w: 1.5 })
    out.push({ t: 'path', d: `M${kx + 19} ${fy + 1} Q${kx + 19} ${fy - 7} ${kx + 10} ${fy - 7} Q${kx + 4} ${fy - 7} ${kx + 4} ${fy + 1} Z`, f: T, s: T, w: 1.5 })
    return out
  }
  for (const s of [-1, 1]) {
    const X = kx + s * fussX
    const von = (dx: number) => X + s * dx // dx: nach außen positiv
    out.push({ t: 'path', d: `M${von(11)} ${fy + 0.5} Q${von(11)} ${fy - 7.5} ${von(2.4)} ${fy - 7.5} Q${von(-4.6)} ${fy - 7.5} ${von(-4.6)} ${fy + 0.5} Z`, f: farbe, s: T, w: 1.8 })
    out.push({ t: 'rect', x: Math.min(von(11.8), von(-5.4)), y: fy - 1.4, b: 17.2, h: 4.4, rx: 2.2, f: sohle, s: T, w: 1.6 })
    out.push({ t: 'path', d: `M${von(10)} ${fy - 2.8} Q${von(9.4)} ${fy - 6} ${von(5)} ${fy - 6.6}`, f: 'none', s: ton(farbe, 0.4), w: 1.2 })
  }
  return out
}

/** Details auf dem Oberkörper (nach dem Grundumriss, vor Kopf und Armen). */
function oberteilZuege(t: Typ, b: Bau): Form[] {
  const { kx, schulterY: sy, shirtUnten: sa, sb, hb } = b
  const H = t.haut
  const S = t.shirt
  const o = t.ober ?? 'shirt'
  const dunkel = ton(S, -0.16)
  const hell = ton(S, 0.5)
  const out: Form[] = []
  // Kanten des Oberkörpers bei Höhe y (zwischen Schulterrundung und Saum)
  const kante = (y: number): V => {
    const f = (y - (sy + 7)) / (sa - 3 - (sy + 7))
    const xl = kx - sb + f * (kx - hb - 1.5 - (kx - sb))
    return [xl, 2 * kx - xl]
  }
  const streifen = (y1: number, y2: number, farbe: string) => {
    const [a1, b1] = kante(y1)
    const [a2, b2] = kante(y2)
    out.push({ t: 'path', d: `M${pt([a1, y1])} L${pt([b1, y1])} L${pt([b2, y2])} L${pt([a2, y2])} Z`, f: farbe, s: T, w: 1.4 })
  }
  const saumBund = () => {
    const [a, c] = kante(sa - 5)
    out.push({ t: 'path', d: `M${pt([a - 0.4, sa - 5])} L${pt([c + 0.4, sa - 5])} L${kx + hb + 1.5} ${sa - 3} Q${kx + hb + 1.5} ${sa} ${kx + hb - 2} ${sa} L${kx - hb + 2} ${sa} Q${kx - hb - 1.5} ${sa} ${kx - hb - 1.5} ${sa - 3} Z`, f: dunkel, s: T, w: 1.6 })
  }
  const rund = () => out.push({ t: 'path', d: `M${kx - 5.8} ${sy - 1} Q${kx} ${sy + 6} ${kx + 5.8} ${sy - 1}`, f: H, s: T, w: 2 })
  const ring = (tief: number, farbe: string) => {
    out.push({ t: 'path', d: `M${kx - 8.6} ${sy - 1.5} Q${kx} ${sy + tief} ${kx + 8.6} ${sy - 1.5} L${kx + 5.8} ${sy - 1} Q${kx} ${sy + 6} ${kx - 5.8} ${sy - 1} Z`, f: farbe, s: T, w: 1.8 })
  }
  const kragen = (tiefe: number, f: string) => {
    out.push({ t: 'path', d: `M${kx - 5.2} ${sy - 1} L${kx} ${sy + tiefe} L${kx + 5.2} ${sy - 1} Z`, f: H, s: T, w: 1.8 })
    for (const s of [-1, 1]) {
      out.push({ t: 'path', d: `M${kx + s * 5.2} ${sy - 1.6} L${kx + s * 12} ${sy + 4} L${kx + s * 1.4} ${sy + tiefe + 1.5} L${kx} ${sy + tiefe} Z`, f, s: T, w: 1.7 })
    }
  }
  switch (o) {
    case 'hoodie':
      out.push({ t: 'path', d: `M${kx - 11.5} ${sy - 3} Q${kx - 11.5} ${sy + 14} ${kx} ${sy + 15} Q${kx + 11.5} ${sy + 14} ${kx + 11.5} ${sy - 3} Q${kx + 8} ${sy + 1} ${kx + 5.8} ${sy - 1} Q${kx} ${sy + 6} ${kx - 5.8} ${sy - 1} Q${kx - 8} ${sy + 1} ${kx - 11.5} ${sy - 3} Z`, f: dunkel, s: T, w: 1.9 })
      rund()
      out.push({ t: 'path', d: `M${kx - 4} ${sy + 10} L${kx - 5} ${sy + 24}`, f: 'none', s: T, w: 1.3 })
      out.push({ t: 'path', d: `M${kx + 4} ${sy + 10} L${kx + 5} ${sy + 23}`, f: 'none', s: T, w: 1.3 })
      out.push({ t: 'circle', cx: kx - 5, cy: sy + 25, r: 1.5, f: 'papier', s: T, w: 1 })
      out.push({ t: 'circle', cx: kx + 5, cy: sy + 24, r: 1.5, f: 'papier', s: T, w: 1 })
      saumBund()
      out.push({ t: 'path', d: `M${kx - 10.5} ${sa - 22} L${kx + 10.5} ${sa - 22} L${kx + 13.5} ${sa - 6} L${kx - 13.5} ${sa - 6} Z`, f: ton(S, -0.07), s: T, w: 1.6 })
      break
    case 'pulli':
      ring(10, dunkel)
      rund()
      if (t.ober2) {
        streifen(sy + 16, sy + 20, t.ober2)
        streifen(sy + 23.5, sy + 27.5, t.ober2)
      }
      saumBund()
      break
    case 'hemd':
      kragen(t.ober2 ? 10.5 : 11, hell)
      out.push({ t: 'line', x1: kx, y1: sy + 11.5, x2: kx, y2: sa, s: T, w: 1.2 })
      if (!t.ober2) for (const y of [sy + 19, sy + 28, sy + 37]) out.push({ t: 'circle', cx: kx + 0.1, cy: y, r: 1.2, f: hell, s: T, w: 0.9 })
      if (t.ober2) {
        out.push({ t: 'path', d: `M${kx - 3} ${sy + 8.5} L${kx + 3} ${sy + 8.5} L${kx + 2.4} ${sy + 13.5} L${kx - 2.4} ${sy + 13.5} Z`, f: t.ober2, s: T, w: 1.5 })
        out.push({ t: 'path', d: `M${kx - 2.4} ${sy + 13} L${kx + 2.4} ${sy + 13} L${kx + 4.8} ${sa - 14} L${kx} ${sa - 8} L${kx - 4.8} ${sa - 14} Z`, f: t.ober2, s: T, w: 1.7 })
      }
      break
    case 'kittel':
      out.push({ t: 'path', d: `M${kx - 7.6} ${sy - 1.5} L${kx} ${sy + 15.5} L${kx + 7.6} ${sy - 1.5}`, f: 'none', s: hell, w: 3.4 })
      out.push({ t: 'path', d: `M${kx - 6.2} ${sy - 1} L${kx} ${sy + 13.5} L${kx + 6.2} ${sy - 1} Z`, f: H, s: T, w: 1.8 })
      out.push({ t: 'rect', x: kx + 4.6, y: sy + 19, b: 10, h: 11, rx: 1.6, f: ton(S, -0.05), s: T, w: 1.5 })
      out.push({ t: 'line', x1: kx + 8, y1: sy + 16.5, x2: kx + 8.6, y2: sy + 22, s: T, w: 1.2 })
      out.push({ t: 'line', x1: kx, y1: sy + 14, x2: kx, y2: sa, s: ton(S, -0.3), w: 1.1 })
      break
    case 'schuerze': {
      kragen(6.5, ton(S, -0.05))
      const [a1] = kante(sa - 14)
      const sc = t.ober2 ?? '#4E9A68'
      out.push(...tube(`M${kx - 9.5} ${sy + 11} Q${kx - 8.5} ${sy + 3} ${kx - 5.5} ${sy - 1.5}`, sc, 2.4))
      out.push(...tube(`M${kx + 9.5} ${sy + 11} Q${kx + 8.5} ${sy + 3} ${kx + 5.5} ${sy - 1.5}`, sc, 2.4))
      out.push({ t: 'path', d: `M${kx - 10.5} ${sy + 11} L${kx + 10.5} ${sy + 11} L${2 * kx - a1 + 1} ${sa - 14} L${kx + hb + 3.2} ${sa + 14} Q${kx} ${sa + 17} ${kx - hb - 3.2} ${sa + 14} L${a1 - 1} ${sa - 14} Z`, f: sc, s: T, w: 2 })
      out.push({ t: 'rect', x: kx - 9.5, y: sa - 4, b: 19, h: 10, rx: 2, f: ton(sc, -0.1), s: T, w: 1.4 })
      out.push({ t: 'rect', x: kx + 2.5, y: sy + 15.5, b: 8.5, h: 5, rx: 1.2, f: 'papier', s: T, w: 1.1 })
      break
    }
    case 'jacke':
      ring(9, dunkel)
      rund()
      out.push({ t: 'line', x1: kx, y1: sy + 4, x2: kx, y2: sa, s: T, w: 1.6 })
      out.push({ t: 'rect', x: kx - 1.5, y: sy + 3, b: 3, h: 6, rx: 1, f: ton(S, 0.5), s: T, w: 0.9 })
      for (const s of [-1, 1]) out.push({ t: 'path', d: `M${kx + s * 12.5} ${sa - 21} L${kx + s * 11} ${sa - 8}`, f: 'none', s: T, w: 1.3 })
      saumBund()
      break
    case 'strick': {
      const inner = t.ober2 ?? '#F3E9DD'
      const px = (y: number) => 5.6 + ((y - sy) / (sa - sy)) * 3.4
      out.push({ t: 'path', d: `M${kx - px(sy)} ${sy - 1} L${kx - px(sa)} ${sa} L${kx + px(sa)} ${sa} L${kx + px(sy)} ${sy - 1} Z`, f: inner, s: T, w: 1.8 })
      out.push({ t: 'path', d: `M${kx - 5.6} ${sy - 1} Q${kx} ${sy + 5.5} ${kx + 5.6} ${sy - 1}`, f: H, s: T, w: 1.8 })
      for (const y of [sy + 15, sy + 25, sy + 35]) out.push({ t: 'circle', cx: kx + px(y) + 2.2, cy: y, r: 1.3, f: dunkel, s: T, w: 0.9 })
      break
    }
    case 'tshirt':
      ring(7.5, dunkel)
      rund()
      if (t.ober2) {
        streifen(sy + 19, sy + 24, t.ober2)
      }
      break
    default:
      rund()
  }
  return out
}

/** Schuh im Profil (Spitze nach rechts), Ursprung = Knöchel; Fußsohle liegt 8 Einheiten darunter. */
function schuhProfil(ax: number, ay: number, farbe: string, sohle: string, drehung = 0): Form {
  return {
    t: 'g',
    tf: `translate(${+ax.toFixed(2)} ${+ay.toFixed(2)})${drehung ? ` rotate(${drehung})` : ''}`,
    formen: [
      { t: 'path', d: 'M-5.2 5 L-5.2 -3 Q-5.2 -5 -2.5 -5 L3 -5 Q5.5 0 11.5 1.5 Q14 2 14 5 Z', f: farbe, s: T, w: 1.8 },
      { t: 'rect', x: -5.6, y: 3.6, b: 19.8, h: 4.4, rx: 2.2, f: sohle, s: T, w: 1.6 },
    ],
  }
}

/** Untere Körperhälfte im Gehen: hinteres Bein mit angehobener Ferse, vorderes Bein gestreckt, Schuhe im Profil. */
function beineGehen(t: Typ, b: Bau): Form[] {
  const { kx, hueft, beinD, fussY } = b
  const farbe = t.schuh ?? (t.alter === 'kind' ? T : '#2B3550')
  const sohle = t.alter === 'jugend' ? 'papier' : 'hellgrau'
  const hk = (fussY - 5 - hueft) / 53 // Beinlänge im Verhältnis zu den Jugendlichen
  return [
    ...tube(`M${kx - b.beinX} ${hueft} L${kx - 9} ${hueft + 28 * hk} L${kx - 19} ${fussY - 12}`, ton(t.hose, -0.1), beinD),
    schuhProfil(kx - 19, fussY - 12, farbe, sohle, -22),
    ...tube(`M${kx + b.beinX} ${hueft} L${kx + 15} ${fussY - 5}`, t.hose, beinD),
    schuhProfil(kx + 15, fussY - 5, farbe, sohle),
  ]
}

/** Sitzen (Stuhl oder Rollstuhl): Beine nach rechts, Körper um `dy` nach unten. */
interface Sitz {
  dy: number
  hinten: Form[]
  beine: Form[]
  vorne: Form[]
}

function sitzUnten(t: Typ, b: Bau): Sitz {
  const { kx, hueft, beinD, fussY, sb } = b
  const rolli = !!t.rollstuhl
  const farbe = t.schuh ?? (t.alter === 'kind' ? T : '#2B3550')
  const sohle = t.alter === 'jugend' ? 'papier' : 'hellgrau'
  const ank = rolli ? fussY - 8 : fussY - 5
  const shin = 0.68 * (fussY - 5 - hueft)
  const yh = ank - shin
  const dy = yh - hueft
  const thigh = 0.5 * (fussY - 5 - hueft) + 2
  const hx = kx + 2
  const kn = hx + thigh
  const ys = yh + beinD / 2 // Oberkante der Sitzfläche
  const hinten: Form[] = []
  const vorne: Form[] = []
  const holz = '#D2B48C'
  const metall = '#6B7488'
  const rueck = kx - sb - 6
  if (!rolli) {
    hinten.push({ t: 'rect', x: rueck - 2.5, y: yh - 36, b: 5, h: 38 + (ys - yh), rx: 2, f: holz, s: T, w: 1.8 })
    hinten.push(...tube(`M${rueck} ${ys + 2} L${rueck - 1} ${fussY + 1}`, holz, 3.4))
    hinten.push({ t: 'rect', x: rueck - 2, y: ys, b: kn - rueck + 7, h: 5.4, rx: 2.2, f: holz, s: T, w: 1.8 })
    hinten.push(...tube(`M${kn + 2} ${ys + 4} L${kn + 3} ${fussY + 1}`, holz, 3.4))
  } else {
    // Kinder haben kurze Beine: das Rad nicht mit der Beinlänge schrumpfen lassen, sonst ist der Rollstuhl klein kaum zu erkennen
    const rd = t.alter === 'kind' ? 17 : 18.5 * (fussY - 5 - hueft) / 53
    hinten.push(...tube(`M${rueck} ${ys + 2} L${rueck} ${yh - 33} L${rueck - 8} ${yh - 33}`, metall, 3))
    hinten.push({ t: 'circle', cx: kn - 5, cy: fussY - 3.5, r: 4.6, f: 'hellgrau', s: T, w: 1.8 })
    hinten.push(...tube(`M${kn - 5} ${fussY - 8} L${kn - 4} ${ys + 3}`, metall, 2.6))
    hinten.push({ t: 'rect', x: rueck - 2, y: ys, b: kn - rueck + 3, h: 5.4, rx: 2.2, f: metall, s: T, w: 1.8 })
    hinten.push(...tube(`M${kn + 1} ${ys + 3} L${kn + 5} ${ank + 3}`, metall, 2.6))
    hinten.push({ t: 'rect', x: kn - 3, y: ank + 3, b: 15, h: 3, rx: 1.4, f: metall, s: T, w: 1.4 })
    // großes Rad: vor dem Becken, durchsichtig mit Speichen
    const cx = kx - 3
    const cy = fussY + 3 - rd - 1
    vorne.push({ t: 'circle', cx, cy, r: rd, f: 'none', s: T, w: 4.6 })
    vorne.push({ t: 'circle', cx, cy, r: rd, f: 'none', s: '#C9D0DA', w: 2.6 })
    vorne.push({ t: 'circle', cx, cy, r: rd - 4, f: 'none', s: metall, w: 1.1 })
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8 + 0.3
      vorne.push({ t: 'line', x1: cx + Math.cos(a) * 3, y1: cy + Math.sin(a) * 3, x2: cx + Math.cos(a) * (rd - 4), y2: cy + Math.sin(a) * (rd - 4), s: metall, w: 0.9 })
    }
    vorne.push({ t: 'circle', cx, cy, r: 3, f: metall, s: T, w: 1.5 })
  }
  const bein = (dx: number, dh: number, f: string): Form[] => [
    ...tube(`M${hx + dx} ${yh + dh} L${kn + dx} ${yh + dh} L${kn + dx + 1} ${ank}`, f, beinD),
    schuhProfil(kn + dx + 1, ank, farbe, sohle),
  ]
  return { dy, hinten, beine: [...bein(-5, 0, ton(t.hose, -0.12)), ...bein(0, 0, t.hose)], vorne }
}

function figurGross(t: Typ, g: Gefuehl, p: Pose): Form[] {
  const b0 = bauFuer(t)
  const sitz = p === 'sitzen' || !!t.rollstuhl
  const weg = p === 'abwenden'
  // Abwenden: Körper halb gedreht – schmaler
  const b: Bau = weg ? { ...b0, sb: b0.sb * 0.74, hb: b0.hb * 0.74, breite: b0.sb * 0.74 } : b0
  const { kx, ky, kr, schulterY: sy, shirtUnten: sa, sb, hb, fussY } = b
  const formen: Form[] = []

  // Bodenschatten und untere Körperhälfte
  let dy = 0
  if (sitz) {
    const s = sitzUnten(t, b)
    dy = s.dy
    formen.push({ t: 'ellipse', cx: 62, cy: fussY + 3, rx: 34, ry: 3, f: 'hellgrau', s: 'none' })
    formen.push(...s.hinten, ...s.beine, ...s.vorne)
  } else {
    formen.push({ t: 'ellipse', cx: 50, cy: fussY + 3, rx: p === 'gehen' ? 30 : 24, ry: 3, f: 'hellgrau', s: 'none' })
    if (p === 'gehen') formen.push(...beineGehen(t, b))
    else {
      formen.push(...tube(`M${kx - b.beinX} ${b.hueft} L${kx - b.fussX} ${fussY - b.fussHoch}`, t.hose, b.beinD))
      formen.push(...tube(`M${kx + b.beinX} ${b.hueft} L${kx + b.fussX} ${fussY - b.fussHoch}`, t.hose, b.beinD))
      formen.push(...schuhe(t, b))
    }
  }

  // Oberkörper und Kopf (beim Sitzen nach unten verschoben)
  const k: Form[] = []
  k.push(...haarHinten(t, b))
  k.push({ t: 'rect', x: kx - b.halsB, y: ky + kr - 4, b: 2 * b.halsB, h: sy - ky - kr + 7, f: t.haut, s: T, w: 2 })
  k.push({
    t: 'path',
    d: `M${kx - sb} ${sy + 7} Q${kx - sb} ${sy} ${kx - sb + 7} ${sy - 1} L${kx + sb - 7} ${sy - 1} Q${kx + sb} ${sy} ${kx + sb} ${sy + 7} L${kx + hb + 1.5} ${sa - 3} Q${kx + hb + 1.5} ${sa} ${kx + hb - 2} ${sa} L${kx - hb + 2} ${sa} Q${kx - hb - 1.5} ${sa} ${kx - hb - 1.5} ${sa - 3} Z`,
    f: t.shirt,
    s: T,
    w: 2.4,
  })
  if (weg) k.push({ t: 'path', d: `M${kx - 5} ${sy - 0.5} Q${kx} ${sy + 2} ${kx + 5} ${sy - 0.5}`, f: 'none', s: ton(t.shirt, -0.25), w: 1.6 })
  else k.push(...oberteilZuege(t, b))
  k.push(...haarDavor(t, b))

  const kf = (kr * 0.96 * b.gk) / 43
  const tf = `translate(${kx - 50 * kf} ${ky + b.gy - 52 * kf}) scale(${kf})`
  const hijab = t.haar === 'hijab' || t.haar === 'tuch'
  if (!hijab && !weg) {
    k.push({ t: 'circle', cx: kx - kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
    k.push({ t: 'circle', cx: kx + kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  }
  k.push({ t: 'circle', cx: kx, cy: ky, r: kr, f: t.haut, s: T, w: 2.4 })
  if (t.hoergeraet && !weg)
    k.push(
      { t: 'path', d: `M${kx + kr - 1.5} ${ky - 4} Q${kx + kr + 4.8} ${ky - 6} ${kx + kr + 4.6} ${ky + 2} Q${kx + kr + 4.4} ${ky + 8} ${kx + kr + 1.2} ${ky + 8}`, f: 'none', s: '#9FB7D1', w: 2.6 },
      { t: 'ellipse', cx: kx + kr + 2.2, cy: ky + 3, rx: 2.4, ry: 5, f: '#9FB7D1', s: T, w: 1.3 },
    )
  if (t.bart && !weg)
    k.push({ t: 'path', d: `M${kx - kr + 1.5} ${ky + 3} Q${kx - kr + 2} ${ky + kr - 1} ${kx} ${ky + kr + 0.3} Q${kx + kr - 2} ${ky + kr - 1} ${kx + kr - 1.5} ${ky + 3} Q${kx + kr - 5} ${ky + 8.5} ${kx} ${ky + 9} Q${kx - kr + 5} ${ky + 8.5} ${kx - kr + 1.5} ${ky + 3} Z`, f: t.haarFarbe, s: 'none', o: 0.24 })
  if (weg) {
    // Kopf nach links gedreht: Haare bedecken die rechte Hälfte, am linken Rand bleibt ein schmaler Gesichtsstreifen
    const hf = t.haar === 'kappe' ? (t.extra ?? '#C2554A') : t.haarFarbe
    k.push({ t: 'path', d: `M${kx} ${ky - kr - 0.4} A${kr + 0.4} ${kr + 0.4} 0 0 1 ${kx} ${ky + kr + 0.4} A${kr * 0.42} ${kr + 0.4} 0 0 1 ${kx} ${ky - kr - 0.4} Z`, f: hf, s: T, w: 2.2 })
    const sx = kf * 0.5
    const tfw = `translate(${kx - kr * 0.74 - 50 * sx} ${ky + b.gy - 52 * kf}) scale(${sx} ${kf})`
    k.push({ t: 'g', tf: tfw, formen: gesichtsZuege(g, ['dampf', 'zzz', 'frage', 'funken', 'schweiss']) })
  } else {
    k.push(...haarVorne(t, b))
    k.push({ t: 'g', tf, formen: gesichtsZuege(g, ['dampf', 'zzz', 'frage', 'funken', 'schweiss']) })
    if (t.brille) k.push({ t: 'g', tf, formen: brilleZuege(t.brille) })
  }
  k.push(...armeGross(t.rollstuhl && (p === 'stehen' || p === 'gehen') ? 'sitzen' : p, t, b))

  if (dy) formen.push({ t: 'g', tf: `translate(0 ${+dy.toFixed(2)})`, formen: k })
  else formen.push(...k)
  return formen
}

function brilleZuege(rahmen: string): Form[] {
  return [
    { t: 'rect', x: 21.5, y: 30.5, b: 25, h: 23, rx: 9, f: '#EAF3FA', s: rahmen, w: 3.4, o: 0.35 },
    { t: 'rect', x: 53.5, y: 30.5, b: 25, h: 23, rx: 9, f: '#EAF3FA', s: rahmen, w: 3.4, o: 0.35 },
    { t: 'rect', x: 21.5, y: 30.5, b: 25, h: 23, rx: 9, f: 'none', s: rahmen, w: 3.4 },
    { t: 'rect', x: 53.5, y: 30.5, b: 25, h: 23, rx: 9, f: 'none', s: rahmen, w: 3.4 },
    { t: 'path', d: 'M46.5 40 Q50 36.5 53.5 40', f: 'none', s: rahmen, w: 3.2 },
    { t: 'path', d: 'M21.5 38 L12 35', f: 'none', s: rahmen, w: 3.2 },
    { t: 'path', d: 'M78.5 38 L88 35', f: 'none', s: rahmen, w: 3.2 },
  ]
}

function armeGross(pose: Pose, t: Typ, b: Bau): Form[] {
  const { kx, ky, kr, schulterY, sb, ar, armD: d, handR } = b
  const sy = schulterY + 4
  const lx = kx - sb + 3
  const rx = kx + sb - 3
  const o = t.ober ?? 'shirt'
  const kurz = (t.aermel ?? (['tshirt', 'kittel', 'schuerze'].includes(o) ? 'kurz' : 'lang')) === 'kurz'
  const manschette = !kurz && ['hoodie', 'pulli', 'jacke'].includes(o)
  const H = t.haut
  const hand = (x: number, y: number, r = handR): Form => ({ t: 'circle', cx: x, cy: y, r, f: H, s: T, w: 2.2 })
  /** Arm von der Schulter (sx) mit Kontrollpunkt und Ende, relativ zur Schulter und nach außen gerichtet (s = ±1). */
  const arm = (s: number, c: V, e: V, h: V = [0, 3]): Form[] => {
    const p0: V = [s > 0 ? rx : lx, sy]
    // seitliche Reichweite so begrenzen, dass die Hand nicht über den Rand des Rasters ragt
    const reich = (s > 0 ? 98.4 - handR - p0[0] : p0[0] - 1.6 - handR) / Math.max(0.01, (e[0] + h[0]) * ar)
    const f = Math.min(1, reich)
    const C: V = [p0[0] + s * c[0] * ar * f, p0[1] + c[1] * ar]
    const E: V = [p0[0] + s * e[0] * ar * f, p0[1] + e[1] * ar]
    return armAbs(p0, C, E, [E[0] + s * h[0] * ar * f, E[1] + h[1] * ar])
  }
  const armAbs = (p0: V, C: V, E: V, hp: V): Form[] => {
    const pfad = `M${pt(p0)} Q${pt(C)} ${pt(E)}`
    const out: Form[] = []
    if (kurz) {
      out.push(...tube(pfad, H, d - 0.8))
      out.push(kurzAermel(p0, C, E, t.shirt, d))
    } else {
      out.push(...tube(pfad, t.shirt, d))
      if (manschette) out.push(...tube(stueck(p0, C, E, 0.8, 1), ton(t.shirt, -0.16), d + 0.7))
    }
    out.push(hand(hp[0], hp[1]))
    return out
  }
  const ohneHand = (f: Form[]) => f.slice(0, -1)
  const unten = (s: number) => arm(s, [5.5, 19], [4.6, 36.5])
  switch (pose) {
    case 'winken':
      return [...unten(-1), ...arm(1, [14, -4], [16, -26], [1, -4])]
    case 'melden':
      return [...unten(-1), ...arm(1, [6, -14], [6, -36], [0, -4])]
    case 'jubeln':
      return [...arm(-1, [12, -8], [16, -30], [1, -4]), ...arm(1, [12, -8], [16, -30], [1, -4])]
    case 'zeigen':
      return [...unten(-1), ...arm(1, [11, 4], [23.5, 2], [2.4, 0])]
    case 'geben':
      return [...unten(-1), ...arm(1, [8, 14], [22, 14], [3, -1])]
    case 'stopp': {
      const e: V = [Math.min(rx + 22 * ar, 88.4), sy - 6 * ar]
      return [
        ...unten(-1),
        ...ohneHand(armAbs([rx, sy], [rx + 12 * ar, sy + 2 * ar], e, [e[0] + 1, e[1] - 6])),
        {
          t: 'g',
          tf: `translate(${e[0] + 1} ${e[1] - 6}) rotate(-12) scale(${(handR / 5).toFixed(3)})`,
          formen: [
            { t: 'rect', x: -3.6, y: 1, b: 13, h: 5.5, rx: 2.75, f: H, s: T, w: 2 },
            { t: 'rect', x: -7, y: -10, b: 11, h: 19, rx: 5.2, f: H, s: T, w: 2.2 },
            { t: 'line', x1: -3.4, y1: -9.5, x2: -3.4, y2: -4, s: T, w: 1.2 },
            { t: 'line', x1: 0.2, y1: -9.5, x2: 0.2, y2: -4, s: T, w: 1.2 },
          ],
        },
      ]
    }
    case 'verschraenkt': {
      const y1 = sy + 19 * ar
      const y2 = sy + 15 * ar
      return [
        ...ohneHand(armAbs([lx, sy], [lx - 3, sy + 18 * ar], [kx + 8, y1], [kx + 10, y1 - 1])),
        ...ohneHand(armAbs([rx, sy], [rx + 3, sy + 16 * ar], [kx - 8, y2], [kx - 10, y2 - 1])),
        hand(kx + 10, y1 - 1, handR - 0.5),
        hand(kx - 10, y2 - 1, handR - 0.5),
      ]
    }
    case 'haende-gesicht': {
      const hy = ky + 6
      return [
        ...armAbs([lx, sy], [lx - 8, sy + 8], [kx - kr + 3, hy + 2], [kx - kr + 3, hy - 1]),
        ...armAbs([rx, sy], [rx + 8, sy + 8], [kx + kr - 3, hy + 2], [kx + kr - 3, hy - 1]),
      ]
    }
    case 'handy': {
      // beide Hände halten ein Handy vor die Brust (Bildschirm leer)
      const y1 = sy + 17 * ar
      return [
        ...ohneHand(armAbs([lx, sy], [lx - 2, sy + 17 * ar], [kx - 8, y1 + 2], [kx - 8, y1 + 2])),
        ...ohneHand(armAbs([rx, sy], [rx + 2, sy + 15 * ar], [kx + 8, y1], [kx + 8, y1])),
        {
          t: 'g',
          tf: `translate(${kx + 0.5} ${y1 - 1}) rotate(-8)`,
          formen: [
            { t: 'rect', x: -5.8, y: -9.5, b: 11.6, h: 19, rx: 2.4, f: '#2B3550', s: T, w: 1.8 },
            { t: 'rect', x: -4.4, y: -7.4, b: 8.8, h: 13.6, rx: 1, f: '#CFE3F2', s: 'none' },
            { t: 'path', d: 'M-4.4 -1 L2.6 -7.4 L4.4 -7.4 L4.4 -5 L-4 2.4 Z', f: 'papier', s: 'none', o: 0.45 },
          ],
        },
        hand(kx - 7, y1 + 3, handR - 0.4),
        hand(kx + 7, y1 + 1, handR - 0.4),
      ]
    }
    case 'nachdenken': {
      // rechte Hand am Kinn, linker Arm stützt den Ellbogen
      const kinn: V = [kx + 5, ky + kr - 0.5]
      return [
        ...armAbs([lx, sy], [lx - 1, sy + 24 * ar], [kx + 11, sy + 22 * ar], [kx + 14, sy + 22 * ar]),
        ...armAbs([rx, sy], [rx + 9, sy + 17 * ar], kinn, [kinn[0] - 0.5, kinn[1] + 0.5]),
      ]
    }
    case 'gehen':
      return [...arm(-1, [4, 16], [10, 33], [0, 3]), ...arm(1, [9, 16], [15, 31], [1, 3])]
    case 'sitzen': {
      // rechte Hand liegt auf dem Oberschenkel, der linke Arm hängt
      const bein = b.hueft - b.beinD / 2
      return [...unten(-1), ...armAbs([rx, sy], [rx + 7, sy + 24 * ar], [kx + 17, bein - 1], [kx + 19, bein - 3])]
    }
    case 'abwenden':
      return [...unten(-1), ...unten(1)]
    default:
      return [...unten(-1), ...unten(1)]
  }
}
