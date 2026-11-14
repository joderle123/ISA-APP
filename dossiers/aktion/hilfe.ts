// Übernimmt Farbe, Video und Warnhinweis aus dem vollen SOLO-Heft, damit beides zusammenpasst.
import type { Clip } from '../typen'
import type { Solo } from '../solo-typen'

export function clipVon(s: Solo, frage?: string): Clip {
  for (const seite of s.seiten) for (const b of seite.bloecke) if (b.art === 'clip') return frage ? { ...b.clip, frage } : b.clip
  throw new Error('kein Video in ' + s.id)
}
export const MEHR = (s: Solo) => `Fall, Hintergrund, Quiz und Gesprächsfragen stehen im Heft SOLO #${s.nr} ${s.thema}.`
