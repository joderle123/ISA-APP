// ---------------------------------------------------------------------------
// Deep links for the CDSE Hub. The hub opens the Toolbox in an <iframe> with a
// URL hash, e.g.
//   ISA-App.html#eldib=V-13            → materials for ELDiB goal V-13
//   ISA-App.html#eldib=K-16,SOZ-32     → materials for any of these goals
//   ISA-App.html#material=<id>         → open that material's detail view
// Optional: alter=C3 (Altersstufe, kommagetrennt), q=<Suchtext>. Several
// parameters combine with "&". See offline/README.md.
// ---------------------------------------------------------------------------
import type { AgeLevel } from '../types/material'

export interface DeepLink {
  /** Normalised ELDiB codes, e.g. ["K-16", "SOZ-32"]. */
  eldib: string[]
  /** Material id to open, or null. */
  material: string | null
  /** Age levels to pre-select. */
  alter: AgeLevel[]
  /** Search text, or null. */
  q: string | null
}

const AGE_IDS: AgeLevel[] = ['C1', 'C2', 'C3', 'C4', 'ES']
const CODE_RE = /^(V|K|SOZ|KOG)\s*[-–_]?\s*0*(\d{1,2})$/i

/** "v13", "V-13", "soz 32", "KOG–05" → "V-13", "SOZ-32", "KOG-5"; else null. */
export function normaliseEldibCode(raw: string): string | null {
  const m = raw.trim().match(CODE_RE)
  if (!m) return null
  return `${m[1].toUpperCase()}-${Number(m[2])}`
}

function decode(v: string): string {
  try {
    return decodeURIComponent(v.replace(/\+/g, ' '))
  } catch {
    return v
  }
}

export function parseHash(hash: string): DeepLink {
  const out: DeepLink = { eldib: [], material: null, alter: [], q: null }
  const body = hash.replace(/^#/, '').replace(/^[/?]+/, '')
  if (!body) return out
  for (const part of body.split('&')) {
    const eq = part.indexOf('=')
    if (eq < 1) continue
    const key = part.slice(0, eq).trim().toLowerCase()
    const value = decode(part.slice(eq + 1))
    if (key === 'eldib') {
      for (const tok of value.split(/[\s,;]+/)) {
        const code = normaliseEldibCode(tok)
        if (code && !out.eldib.includes(code)) out.eldib.push(code)
      }
    } else if (key === 'material') {
      const id = value.trim()
      if (id) out.material = id
    } else if (key === 'alter') {
      for (const tok of value.split(/[\s,;]+/)) {
        const a = tok.trim().toUpperCase() as AgeLevel
        if (AGE_IDS.includes(a) && !out.alter.includes(a)) out.alter.push(a)
      }
    } else if (key === 'q') {
      const q = value.trim()
      if (q) out.q = q
    }
  }
  return out
}

export function isEmptyLink(l: DeepLink): boolean {
  return !l.eldib.length && !l.material && !l.alter.length && !l.q
}

/** Canonical hash for the state the hub cares about ('' = no hash). */
export function buildHash(eldib: string[], material: string | null): string {
  const parts: string[] = []
  if (eldib.length) parts.push('eldib=' + eldib.join(','))
  if (material) parts.push('material=' + encodeURIComponent(material))
  return parts.length ? '#' + parts.join('&') : ''
}

/** Replace the URL hash without a history entry and without a hashchange
 *  event (so the hub's back button is not affected). */
export function writeHash(hash: string): void {
  try {
    if (window.location.hash === hash || (!hash && !window.location.hash)) return
    const url = window.location.href.replace(/#.*$/, '') + hash
    window.history.replaceState(window.history.state, '', url)
  } catch {
    /* e.g. sandboxed frame – the deep link still worked, only the URL stays */
  }
}
