// Passgenau – Inhalt eines Mikro-Bausteins aus seinem Blatt holen (Konzept 4.2).
// `quelle.pfad` sind die Stellen in de.bausteine; die französische Fassung hat dieselben Bausteine in derselben
// Reihenfolge, Seitenumbrüche und Abstände können anders liegen – deshalb wird über die Inhalts-Reihenfolge
// (ohne `seitenumbruch`/`abstand`) zugeordnet.
import type { Baustein, Blatt, Sprache } from '../../blatt/typen'

const LEER = new Set<Baustein['art']>(['seitenumbruch', 'abstand'])

/** Stellen der inhaltlichen Bausteine (ohne Umbruch/Abstand). */
export function inhaltsStellen(liste: Baustein[]): number[] {
  const out: number[] = []
  liste.forEach((b, i) => {
    if (!LEER.has(b.art)) out.push(i)
  })
  return out
}

/** Passt die französische Fassung Baustein für Baustein zur deutschen? */
export function frParallel(blatt: Blatt): boolean {
  if (!blatt.fr) return false
  const de = inhaltsStellen(blatt.de.bausteine).map((i) => blatt.de.bausteine[i].art)
  const fr = inhaltsStellen(blatt.fr.bausteine).map((i) => blatt.fr!.bausteine[i].art)
  return de.length === fr.length && de.every((a, i) => a === fr[i])
}

/** Die Bausteine eines Pakets in der gewünschten Sprache (FR nur, wenn parallel; sonst DE). */
export function paketBausteine(blatt: Blatt, pfad: number[], sprache: Sprache): Baustein[] {
  if (sprache === 'fr' && blatt.fr && frParallel(blatt)) {
    const de = inhaltsStellen(blatt.de.bausteine)
    const fr = inhaltsStellen(blatt.fr.bausteine)
    return pfad.map((p) => blatt.fr!.bausteine[fr[de.indexOf(p)]]).filter(Boolean)
  }
  return pfad.map((p) => blatt.de.bausteine[p]).filter(Boolean)
}

/** Felder, die keine Texte fürs Kind sind (Bilder, Symbole, Schalter). */
const KEIN_TEXT = new Set([
  'art', 'bild', 'symbole', 'figuren', 'requisit', 'farbe', 'modus', 'stil', 'form', 'uebung', 'vorlage', 'szene', 'blase',
  'ausrichtung', 'groesse', 'verhaeltnis', 'niveau', 'symbol', 'gefuehle', 'kleider', 'ohren', 'farben', 'figur', 'paar', 'klappe',
])

/** Alle Texte eines Bausteins mit Pfad (für Textfelder, Platzhalter, Wörter zählen). Bild-Ids zählen nicht. */
export function texte(b: unknown, pfad = '', out: { pfad: string; text: string }[] = []): { pfad: string; text: string }[] {
  if (typeof b === 'string') {
    if (!/^(icon|gesicht|figur|motiv|forschen):/.test(b)) out.push({ pfad, text: b })
  } else if (Array.isArray(b)) {
    b.forEach((x, i) => texte(x, pfad ? `${pfad}.${i}` : String(i), out))
  } else if (b && typeof b === 'object') {
    for (const [k, v] of Object.entries(b)) {
      if (KEIN_TEXT.has(k)) continue
      texte(v, pfad ? `${pfad}.${k}` : k, out)
    }
  }
  return out
}

/** Einen Text an einem Pfad (z. B. '1.items.2') in einer Kopie der Bausteine ersetzen. */
export function setzeText(liste: Baustein[], pfad: string, text: string): Baustein[] {
  const kopie = JSON.parse(JSON.stringify(liste)) as Baustein[]
  const teile = pfad.split('.')
  let ziel: Record<string, unknown> | unknown[] = kopie as unknown as unknown[]
  for (let i = 0; i < teile.length - 1; i++) {
    const k = teile[i]
    const weiter = (ziel as Record<string, unknown>)[k]
    if (weiter === undefined || weiter === null || typeof weiter !== 'object') return kopie
    ziel = weiter as Record<string, unknown>
  }
  const letzter = teile[teile.length - 1]
  if (typeof (ziel as Record<string, unknown>)[letzter] === 'string') (ziel as Record<string, unknown>)[letzter] = text
  return kopie
}
