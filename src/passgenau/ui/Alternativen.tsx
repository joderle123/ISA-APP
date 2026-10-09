// Passgenau – Antippen → 3–5 gleichwertige Alternativen → ein Klick ersetzt (2.6, 5.8).
import { useMemo, useState } from 'react'
import type { Alternative, KatalogEintrag } from '../typen'
import * as K from './kern'
import { usePg, useProfil, type Ort } from './zustand'
import { Ic } from './zeichen'
import { Daumen, PgDialog, Pill, RolleBadge, Warum } from './Teile'
import { Miniatur } from './A4'
import { inhaltVon } from './blattTeile'
import { warumListe } from './anzeige'
import { FORMAT_NAME, ROLLE_NAME } from './texte'

export function Alternativen({ ort }: { ort: Ort }) {
  const pg = usePg()
  const p = useProfil()
  const plan = pg.plan!
  const k = pg.katalog!
  const [mehr, setMehr] = useState(false)
  const sitzung = plan.sitzungen.find((s) => s.nr === ort.sitzung)!
  const istBlatt = ort.blatt !== undefined
  const schritt = ort.schritt !== undefined ? sitzung.schritte[ort.schritt] : undefined
  const teil = istBlatt ? sitzung.blatt?.bausteine[ort.blatt!] : undefined
  const ref = schritt?.ref ?? teil?.ref ?? ''
  const jetzt = K.eintrag(k, ref)
  const alle = useMemo(() => K.alternativen(k, p, plan, ort, pg.vor, 8), [k, p, plan, ort, pg.vor])
  const zeigen = mehr ? alle.slice(0, 5) : alle.slice(0, 3)
  const wc = { profil: p, vorname: pg.vorname, plan }
  const blattRef = sitzung.blatt
  const bereich = useMemo(() => (istBlatt ? K.kinderblatt(k, p, plan, ort.sitzung, p.sprache.blatt).bereich : 'verhalten'), [istBlatt, k, p, plan, ort.sitzung])

  const tauschen = (a: Alternative) => {
    const alt = jetzt
    const neu = K.ersetzen(plan, ort, a.eintrag)
    pg.setPlan(neu, { merken: true })
    pg.setGetauscht((g) => ({ ...g, [plan.id]: (g[plan.id] ?? 0) + 1 }))
    if (alt) pg.melde('ersetzt', { sitzung: ort.sitzung, baustein: alt.id, h: alt.h, tags: pg.tagsVon(alt, schritt?.rolle), wert: -0.3, ersatz: a.eintrag.id }, alt)
    pg.melde('ersetzt', { sitzung: ort.sitzung, baustein: a.eintrag.id, h: a.eintrag.h, tags: pg.tagsVon(a.eintrag, schritt?.rolle), wert: 0.3 }, a.eintrag)
    pg.setDlg(null)
    const ritual = schritt && (schritt.rolle === 'ankommen' || schritt.rolle === 'abschluss') && plan.n > 1
    pg.hinweisZeigen(`Ersetzt: „${K.textVon(a.eintrag, p.sprache.blatt).titel}“${ritual ? ' – für alle Sitzungen der Folge' : ''}. ${istBlatt ? 'Blatt und Seiten angepasst.' : 'Zeiten und Plan angepasst.'}`, 'ok', { label: 'Rückgängig', aktion: () => pg.setPlan(plan) })
  }

  const karte = (e: KatalogEintrag, a?: Alternative) => {
    const tx = K.textVon(e, p.sprache.blatt)
    const minuten = !a && schritt ? schritt.min : e.dauer.typ
    const nurDe = p.sprache.blatt === 'fr' && !e.sprache.fr
    return (
      <div key={e.id} className={'pg-alt' + (a ? '' : ' jetzt')}>
        <div className="inhalt">
          <div className="zeile1">
            {!a && <Pill>jetzt</Pill>}
            {istBlatt ? <Pill>{tx.text}</Pill> : schritt && <RolleBadge rolle={schritt.rolle} />}
            <span className="pg-quelle">{istBlatt ? `aus „${tx.quelle}“` : tx.quelle}</span>
            {nurDe && <Pill art="warn">nur DE</Pill>}
          </div>
          {istBlatt ? (
            <Miniatur bausteine={inhaltVon(k, p, plan, ort.sitzung, e, p.sprache.blatt)} layout={p.layout} bereich={bereich} breite={Math.min(420, window.innerWidth - 120)} />
          ) : (
            <>
              <h3>{tx.titel}</h3>
              <p>{tx.text}</p>
            </>
          )}
          <div className="pg-meta">
            {!istBlatt && (
              <Pill icon="uhr">
                {minuten} Min.{!a ? ' geplant' : ''}
              </Pill>
            )}
            {istBlatt && e.typ === 'baustein' && <Pill>~{e.hoehe[p.layout] ?? '?'} mm</Pill>}
            {e.format.slice(0, 3).map((f) => (
              <Pill key={f}>{FORMAT_NAME[f] ?? f}</Pill>
            ))}
          </div>
          {a && <Warum texte={warumListe(a.warum, wc)} />}
        </div>
        {a ? (
          <button type="button" className="pg-btn primaer klein" onClick={() => tauschen(a)} aria-label={`Ersetzen durch: ${tx.titel}`}>
            <Ic n="tausch" />
            Ersetzen
          </button>
        ) : (
          <Daumen schluessel={`${plan.id}:${ort.sitzung}:${istBlatt ? 'b' + ort.blatt : 's' + ort.schritt}:${e.id}`} titel={tx.titel} eintrag={e} ort={{ sitzung: ort.sitzung }} rolle={schritt?.rolle} />
        )}
      </div>
    )
  }

  return (
    <PgDialog
      titel={istBlatt ? 'Baustein ersetzen' : 'Gleichwertige Alternativen'}
      unter={
        istBlatt
          ? `Gleiche Stelle im Blatt „${blattRef?.titel ?? ''}“, gleiches Ziel oder Thema, passt aufs Blatt.`
          : `Gleiche Rolle (${schritt ? ROLLE_NAME[schritt.rolle] : ''}), gleiches Ziel oder Thema, ähnliche Dauer, passend für ${pg.vorname} (${p.alterJahre} J.).`
      }
      onClose={() => pg.setDlg(null)}
      breit
      fuss={
        <>
          <span className="links">{istBlatt ? 'Bausteine aus verschiedenen Blättern – kombinierbar' : 'Sortiert nach Passung, verschiedene Formate zuerst'}</span>
          {!mehr && alle.length > 3 && (
            <button type="button" className="pg-btn" onClick={() => setMehr(true)}>
              Weitere zeigen ({Math.min(5, alle.length) - 3})
            </button>
          )}
          <button type="button" className="pg-btn" onClick={() => pg.setDlg(null)}>
            Behalten
          </button>
        </>
      }
    >
      {jetzt ? karte(jetzt) : <p className="pg-leise">Dieser Teil ist nicht mehr im Katalog: {schritt?.t ?? teil?.t}</p>}
      {zeigen.length ? zeigen.map((a) => karte(a.eintrag, a)) : <p className="pg-leise">Keine gleichwertige Alternative im Katalog. Im Baukasten kannst du frei suchen.</p>}
    </PgDialog>
  )
}
