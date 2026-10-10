// ---------------------------------------------------------------------------
// Fassungen eines Blatts beim Drucken. Die Stufe legt das Layout fest; die
// Fachkraft kann es für ein Kind anpassen:
//   - Standard         wie in der Sammlung
//   - Größer           das Layout der nächstjüngeren Stufe (mehr Platz, große Schrift)
//   - Wenig schreiben  Schreibflächen verkürzt, Zusatzaufgaben weggelassen
// Reine Funktionen ohne PDF-Code (die Seite lädt den Renderer erst beim Drucken).
// Es wird nie Inhalt umgeschrieben – nur weggelassen oder verkürzt. Vorbild für die
// Idee: `kernBlattInhalt` mit `wenigSchreiben` in src/passgenau/kern/blatt.ts.
// ---------------------------------------------------------------------------

import type { Baustein, Blatt, BlattInhalt, Layout } from './typen'
import { blattLayout } from './katalog'

export type Fassung = 'standard' | 'groesser' | 'wenigSchreiben'

export const FASSUNGEN: { id: Fassung; label: string; hinweis: string }[] = [
  { id: 'standard', label: 'Standard', hinweis: 'So, wie das Blatt in der Sammlung steht.' },
  { id: 'groesser', label: 'Größer', hinweis: 'Mehr Platz und große Schrift (das Layout der nächstjüngeren Stufe). Das Blatt braucht dann oft eine Seite mehr.' },
  { id: 'wenigSchreiben', label: 'Wenig schreiben', hinweis: 'Halb so viele Schreiblinien, Zusatzaufgaben (Stern, Stufe 3) fallen weg. Die Texte bleiben unverändert.' },
]

export function istFassung(x: unknown): x is Fassung {
  return x === 'standard' || x === 'groesser' || x === 'wenigSchreiben'
}

/** Kurzer Name für Dateinamen und Listen („größer“, „wenig schreiben“); Standard: leer. */
export function fassungKurz(f: Fassung | undefined): string {
  return f === 'groesser' ? 'größer' : f === 'wenigSchreiben' ? 'wenig schreiben' : ''
}

// --- Größer ---------------------------------------------------------------------------------

/** Layouts vom sachlichsten zum größten – „Größer“ ist der nächste Schritt. */
const REIHE: Layout[] = ['jugend', 'mittel', 'gross', 'bild']

/** Das nächstgrößere Layout; null, wenn das Blatt schon im größten gedruckt wird. */
export function groesseresLayout(b: Pick<Blatt, 'layout' | 'bereich' | 'stufen'>): Layout | null {
  const i = REIHE.indexOf(blattLayout(b))
  return i >= 0 && i < REIHE.length - 1 ? REIHE[i + 1] : null
}

// --- Wenig schreiben --------------------------------------------------------------------------

/** Aufgaben, die über das Pflichtprogramm hinausgehen: Stern-Aufgabe (Spielschule), Stufe 3 „Plus“ (Mathe). */
function istZusatz(b: Baustein): boolean {
  return b.art === 'aufgabe' && (b.niveau === 'stern' || b.stufe === 3)
}

/** Diese Arten beenden den Antwortbereich einer Aufgabe: Was danach kommt, gehört nicht mehr zu ihr. */
const ENDE_DER_AUFGABE = new Set<Baustein['art']>(['aufgabe', 'text', 'info', 'geschichte', 'wortspeicher', 'abstand', 'seitenumbruch', 'einschaetzung', 'rueckblick', 'notfall'])

/** Welche Zusatzaufgaben dürfen entfallen? Nur die letzten: Die Lösungen auf der Lehrerseite („4) …“) verweisen auf die
 *  Nummern; fiele eine Aufgabe in der Mitte weg, stimmten alle folgenden nicht mehr. Hat ein Blatt nur Zusatzaufgaben,
 *  bleibt es unverändert. */
function wegzulassen(liste: Baustein[]): Set<Baustein> {
  const aufgaben: Baustein[] = []
  const gehe = (l: Baustein[]) => {
    for (const b of l) {
      if (b.art === 'aufgabe') aufgaben.push(b)
      else if (b.art === 'spalten') {
        gehe(b.links)
        gehe(b.rechts)
      }
    }
  }
  gehe(liste)
  let ende = aufgaben.length
  while (ende > 0 && istZusatz(aufgaben[ende - 1])) ende--
  return ende === 0 ? new Set() : new Set(aufgaben.slice(ende))
}

/** Zusatzaufgaben samt ihrem Antwortbereich (Linien, Feld, Päckchen …) entfernen, auch in Spalten. */
function ohneZusatz(liste: Baustein[], weg: Set<Baustein>): Baustein[] {
  const out: Baustein[] = []
  for (let i = 0; i < liste.length; i++) {
    const b = liste[i]
    if (weg.has(b)) {
      while (i + 1 < liste.length && !ENDE_DER_AUFGABE.has(liste[i + 1].art)) i++
      continue
    }
    if (b.art === 'spalten') {
      const links = ohneZusatz(b.links, weg)
      const rechts = ohneZusatz(b.rechts, weg)
      if (!links.length && !rechts.length) continue
      out.push(links.length === b.links.length && rechts.length === b.rechts.length ? b : { ...b, links, rechts })
    } else out.push(b)
  }
  return out
}

/** Seitenumbrüche am Anfang, am Ende und doppelte entfernen (nach dem Weglassen blieben sonst leere Seiten). */
function umbrueche(liste: Baustein[]): Baustein[] {
  const out: Baustein[] = []
  for (const b of liste) {
    if (b.art === 'seitenumbruch' && (!out.length || out[out.length - 1].art === 'seitenumbruch')) continue
    out.push(b)
  }
  while (out.length && out[out.length - 1].art === 'seitenumbruch') out.pop()
  return out
}

/** Halbe Zahl, mindestens `min` – eine Zahl, die schon höchstens `min` ist, bleibt. */
function halb(n: number, min = 1): number {
  return n <= min ? n : Math.max(min, Math.ceil(n / 2))
}

/** Feld `key` auf `neu` setzen – dasselbe Objekt, wenn sich nichts ändert (so erkennt `kuerzbar`, ob es etwas zu kürzen gibt). */
function mit<T extends Baustein>(b: T, key: string, alt: number, neu: number): T {
  return neu === alt ? b : ({ ...b, [key]: neu } as T)
}

/** Schreibflächen eines Bausteins verkürzen (Linien, Zeilen, Höhe von Textfeldern, freie Zeilen). */
function kuerzeEins(b: Baustein): Baustein {
  switch (b.art) {
    case 'linien':
      return mit(b, 'anzahl', b.anzahl, halb(b.anzahl))
    case 'frage':
      return mit(b, 'linien', b.linien ?? 2, halb(b.linien ?? 2))
    case 'satzanfaenge':
      return mit(b, 'linien', b.linien ?? 1, halb(b.linien ?? 1))
    // Zeichenfelder bleiben: Malen ist kein Schreiben
    case 'feld':
      return b.zeichnen ? b : mit(b, 'hoehe', b.hoehe ?? 4, halb(b.hoehe ?? 4, 2))
    case 'tabelle':
      return mit(b, 'zeilen', b.zeilen, halb(b.zeilen, 2))
    case 'wennDann':
      return mit(b, 'zeilen', b.zeilen, halb(b.zeilen))
    case 'ampel':
      return mit(b, 'linien', b.linien ?? 2, halb(b.linien ?? 2))
    case 'thermometer':
      return mit(b, 'linien', b.linien ?? 1, halb(b.linien ?? 1))
    case 'batterie':
      return mit(b, 'linien', b.linien ?? 4, halb(b.linien ?? 4))
    case 'schritte':
      return mit(b, 'linien', b.linien ?? 1, halb(b.linien ?? 1))
    case 'waage':
      return mit(b, 'zeilen', b.zeilen ?? 4, halb(b.zeilen ?? 4))
    // freie Zeilen zum Selbst-Ergänzen
    case 'ankreuzen':
      return b.frei ? mit(b, 'frei', b.frei, halb(b.frei)) : b
    case 'gefuehle':
      return b.leer ? mit(b, 'leer', b.leer, halb(b.leer)) : b
    case 'tagesplan':
      return b.leer ? mit(b, 'leer', b.leer, halb(b.leer)) : b
    case 'glaeser':
      return b.leer ? mit(b, 'leer', b.leer, halb(b.leer)) : b
    case 'spalten': {
      const links = kuerze(b.links)
      const rechts = kuerze(b.rechts)
      return links === b.links && rechts === b.rechts ? b : { ...b, links, rechts }
    }
    default:
      return b
  }
}

/** Liste verkürzen – dieselbe Liste, wenn nichts zu kürzen war. */
function kuerze(liste: Baustein[]): Baustein[] {
  const neu = liste.map(kuerzeEins)
  return neu.some((b, i) => b !== liste[i]) ? neu : liste
}

function inhaltKuerzen(inhalt: BlattInhalt): BlattInhalt {
  const weg = wegzulassen(inhalt.bausteine)
  const rest = weg.size ? umbrueche(ohneZusatz(inhalt.bausteine, weg)) : inhalt.bausteine
  const kurz = kuerze(rest)
  return kurz === inhalt.bausteine ? inhalt : { ...inhalt, bausteine: kurz }
}

/** Gibt es auf diesem Blatt etwas zu kürzen? (Ohne Schreibflächen und Zusatzaufgaben sähe „Wenig schreiben“ gleich aus.) */
export function kuerzbar(b: Blatt): boolean {
  return !b.passgenau?.teile && [b.de, b.fr].some((i) => !!i && inhaltKuerzen(i) !== i)
}

/** Die Fassung eines Blatts als Kopie. „Wenig schreiben“: Linien halbiert (mindestens eine), Textfelder und freie Zeilen
 *  kürzer, Zusatzaufgaben (`niveau: 'stern'`, `stufe: 3`) samt Antwortbereich weg – nur am Ende des Blatts, damit die Nummern
 *  stimmen. Die Lehrerseite bleibt, wie sie ist. „Standard“ und „Größer“ ändern den Inhalt nicht (Größer wirkt über das
 *  Layout, siehe `fassungDruck`) – dann kommt dasselbe Blatt zurück. */
export function blattVariante<T extends Blatt>(b: T, f: Fassung): T {
  // Passgenau-Blätter führen ihre Teile nach der Stelle im Blatt – dort wird nichts weggelassen
  if (f !== 'wenigSchreiben' || b.passgenau?.teile) return b
  return { ...b, de: inhaltKuerzen(b.de), fr: b.fr ? inhaltKuerzen(b.fr) : b.fr }
}

/** Blatt und Layout-Override für den Druck in der gewählten Fassung. */
export function fassungDruck<T extends Blatt>(b: T, f: Fassung = 'standard'): { blatt: T; layout?: Layout } {
  const layout = f === 'groesser' ? groesseresLayout(b) : null
  return { blatt: blattVariante(b, f), layout: layout ?? undefined }
}
