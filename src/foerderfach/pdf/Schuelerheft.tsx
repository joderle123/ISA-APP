// ---------------------------------------------------------------------------
// Schülerheft des Förderfachs als PDF: Deckblatt mit Namensfeldern, dann die
// Blätter in fester Reihenfolge – zuerst die Seiten für jede Stunde (So
// funktioniert das Fach, Gefühlsrad, Skills-Pass), danach die Blätter der
// Einheiten. Die Blätter sind normale Toolbox-Blätter (BlattSeiten im
// Heft-Modus) in der Farbe der Klassenstufe.
// ---------------------------------------------------------------------------

import { Document } from '@react-pdf/renderer'
import type { Blatt } from '../../blatt/typen'
import { BlattSeiten } from '../../blatt/pdf/BlattDokument'
import { URHEBER_NAME } from '../../lib/urheber'
import { FACH, STUFE_FARBEN, TX } from '../fach'
import type { Einheit, Jahresplan, Sprache } from '../typen'
import { Deckblatt, type Marken } from './teile'

/** Blätter, die in jeder Stunde gebraucht werden – sie stehen vorn im Heft. */
export const JEDE_STUNDE = ['ff-gefuehlsrad', 'ff-skills-pass']
export const EINSTIEG = 'ff-das-fach'

export interface HeftEintrag {
  id: string
  /** Reiter oben links */
  reiter: string
  /** Zeile neben dem Reiter */
  meta: string
}

/** Reihenfolge der Blätter im Heft: Einstieg, Blätter für jede Stunde, dann die Blätter der Einheiten. */
export function heftInhalt(plan: Jahresplan, einheiten: Einheit[], sprache: Sprache): HeftEintrag[] {
  const t = TX[sprache]
  const basis = `${FACH.name}  ·  ${plan.klasse}`
  const liste: HeftEintrag[] = [
    { id: EINSTIEG, reiter: sprache === 'fr' ? 'La matière' : 'Das Fach', meta: basis },
    ...JEDE_STUNDE.map((id) => ({ id, reiter: t.jedeStunde, meta: basis })),
  ]
  const schon = new Set(liste.map((x) => x.id))
  for (const e of einheiten) {
    const pe = plan.einheiten.find((u) => u.id === e.id)
    const kap = plan.kapitel.find((k) => k.id === pe?.kapitel)
    for (const id of e.blaetter) {
      if (schon.has(id)) continue
      schon.add(id)
      liste.push({ id, reiter: `${t.einheit} ${pe?.nr ?? ''}`, meta: `${basis}  ·  ${t.kapitel} ${kap?.nr ?? ''} · ${kap?.titel[sprache] ?? ''}` })
    }
  }
  return liste
}

export function heftTitel(plan: Jahresplan, sprache: Sprache): string {
  return `${FACH.name} – ${TX[sprache].schuelerheft} ${plan.klasse}`
}

export function SchuelerheftDokument({ plan, einheiten, blaetter, sprache, seiten }: { plan: Jahresplan; einheiten: Einheit[]; blaetter: Map<string, Blatt>; sprache: Sprache; seiten?: Marken }) {
  const inhalt = heftInhalt(plan, einheiten, sprache)
  return (
    <Document title={heftTitel(plan, sprache)} author={URHEBER_NAME} creator="CDSE" producer="CDSE" language={sprache}>
      <Deckblatt plan={plan} sprache={sprache} art="heft" felder />
      {inhalt.map((x) => {
        const b = blaetter.get(x.id)
        if (!b) return null
        return (
          <BlattSeiten
            key={x.id}
            blatt={b}
            opt={{
              sprache,
              schueler: true,
              lehrer: false,
              farben: STUFE_FARBEN[plan.klasse],
              heft: { reiter: x.reiter, meta: x.meta, fuss: `${FACH.name} · ${plan.klasse}` },
              seite: seiten
                ? (n) => {
                    const alt = seiten.get(x.id)
                    if (alt === undefined || n < alt) seiten.set(x.id, n)
                  }
                : undefined,
            }}
          />
        )
      })}
    </Document>
  )
}

