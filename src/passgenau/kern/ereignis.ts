// Passgenau – Ereignisse (6.9, E-M10): stabile Id (ULID, zeitlich sortierbar), nie ein Kind- oder Fachkraft-Pseudonym
// im Dossier-Ereignis (kind/fachkraft bleiben null; hub-weit zählt der Hub nur Zähler).
import type { Ereignis } from '../typen'

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

function zufall(n: number): Uint8Array {
  const b = new Uint8Array(n)
  const c = (globalThis as { crypto?: { getRandomValues?: (a: Uint8Array) => Uint8Array } }).crypto
  if (c?.getRandomValues) c.getRandomValues(b)
  else for (let i = 0; i < n; i++) b[i] = Math.floor(Math.random() * 256)
  return b
}

let letzteZeit = -1
let letzterZufall: number[] = []

/** ULID: 48 Bit Zeit (ms) + 80 Bit Zufall, 26 Zeichen Crockford-Base32; innerhalb derselben Millisekunde monoton. */
export function ulid(zeit = Date.now()): string {
  let t = zeit
  const kopf: string[] = []
  for (let i = 0; i < 10; i++) {
    kopf.unshift(CROCKFORD[t % 32])
    t = Math.floor(t / 32)
  }
  let r: number[]
  if (zeit === letzteZeit && letzterZufall.length) {
    r = [...letzterZufall]
    for (let i = r.length - 1; i >= 0; i--) {
      if (r[i] < 31) {
        r[i]++
        break
      }
      r[i] = 0
    }
  } else {
    const b = zufall(16)
    r = Array.from(b, (x) => x % 32)
  }
  letzteZeit = zeit
  letzterZufall = r
  return kopf.join('') + r.map((x) => CROCKFORD[x]).join('')
}

const STANDARD_WERT: Partial<Record<Ereignis['art'], number>> = {
  geklappt: 3, teils: 0, nicht: -3, daumen_hoch: 1, daumen_runter: -1, ersetzt: -0.3, geloescht: -0.5, gedruckt: 0,
  beruhigt: 1, dabei: 1, 'nur-da': 0, abgebrochen: 0, kind_wahl: 1.5, kind_daumen: 1.5,
}

function jetzt(): string {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

/** Ein Ereignis mit stabiler Id. `kind` und `fachkraft` sind immer null (E-M10) – auch wenn übergeben. */
export function ereignis(art: Ereignis['art'], daten: Partial<Ereignis>): Ereignis {
  const wert =
    daten.wert ??
    (art === 'ziel_richtung'
      ? daten.richtung === 'gelingt'
        ? 1
        : daten.richtung === 'mit-hilfe'
          ? 0.5
          : daten.richtung === 'noch-nicht'
            ? -0.5
            : 0
      : (STANDARD_WERT[art] ?? 0))
  const e: Ereignis = {
    id: 'ev-' + ulid(),
    v: 1,
    t: daten.t ?? jetzt(),
    art,
    kind: null,
    fachkraft: null,
    kinder: daten.kinder ?? 1,
    plan: daten.plan ?? null,
    sitzung: daten.sitzung ?? null,
    weg: daten.weg ?? null,
    baustein: daten.baustein ?? null,
    h: daten.h ?? null,
    vorlage: daten.vorlage ?? null,
    tags: daten.tags ?? {},
    ziel: daten.ziel ?? null,
    richtung: daten.richtung ?? null,
    // Krisentag: nie negativ (P10)
    wert: daten.krisentag || daten.weg === 'leicht' ? Math.max(0, wert) : wert,
    grund: daten.grund ?? null,
    ersatz: daten.ersatz ?? null,
    tagesform: daten.tagesform ?? null,
    altersband: daten.altersband ?? null,
  }
  if (daten.krisentag || (daten.tagesform && daten.tagesform.s <= 2) || daten.weg === 'leicht') e.krisentag = true
  if (daten.erkundung) e.erkundung = true
  return e
}
