// Passgenau – Nach der Stunde (2.7): ein Klick, höchstens vier. Nichts ist vorbelegt (P6/E-M1); in die Notiz kommt nur,
// was geklickt wurde. Krisentage und Weg 3 mit eigenen Ergebnissen, nie negativ (P10). Stimme des Kindes (E-M15).
import { useState } from 'react'
import type { Plan, Rueckmeldung } from '../typen'
import * as K from './kern'
import * as hub from './hub'
import { teilenErlaubt, usePg, useProfil } from './zustand'
import { Ic, type Zeichen } from './zeichen'
import { Chip, PgDialog, Seg } from './Teile'
import { istBlattSchritt, uhrzeit } from './anzeige'
import { BEOBACHTUNGEN, heuteIso, zielKurz } from './texte'

type Ergebnis = Rueckmeldung['ergebnis']
const WERT: Record<Ergebnis, number> = { geklappt: 3, teils: 0, nicht: -3, beruhigt: 1, dabei: 1, 'nur-da': 0, abgebrochen: 0 }
const RICHTUNG_WERT = { gelingt: 1, 'mit-hilfe': 0.5, 'noch-nicht': -0.5 } as const

export function krisentag(plan: Plan): boolean {
  return plan.weg === 'leicht' || (plan.auftrag?.heute?.stimmung ?? 4) <= 2
}

export function useRueckmeldung() {
  const pg = usePg()
  const speichern = async (plan: Plan, nr: number, r: Rueckmeldung) => {
    const p = pg.profil
    const k = pg.katalog
    if (!p || !k) return
    const s = plan.sitzungen.find((x) => x.nr === nr)
    if (!s) return
    const krise = krisentag(plan)
    let wert = WERT[r.ergebnis]
    if (krise && wert < 0) wert = 0
    // Ereignisse: je nicht-rituellem Schritt und Blatt-Teil (Rituale nehmen am Stundensignal nicht teil)
    for (const x of s.schritte) {
      if (istBlattSchritt(x) || x.rolle === 'ankommen' || x.rolle === 'abschluss') continue
      const e = K.eintrag(k, x.ref)
      pg.melde(r.ergebnis, { sitzung: nr, baustein: x.ref, h: x.h, tags: pg.tagsVon(e, x.rolle), wert, krisentag: krise, erkundung: x.erkundung }, e)
    }
    for (const b of s.blatt?.bausteine ?? []) {
      const e = K.eintrag(k, b.ref)
      pg.melde(r.ergebnis, { sitzung: nr, baustein: b.ref, h: b.h, tags: pg.tagsVon(e), wert, krisentag: krise }, e)
    }
    const kern = s.schritte.find((x) => x.rolle === 'kern')
    for (const z of r.ziele ?? []) {
      pg.melde('ziel_richtung', { sitzung: nr, ziel: z.code, richtung: z.richtung, baustein: kern?.ref ?? null, wert: RICHTUNG_WERT[z.richtung] }, kern ? K.eintrag(k, kern.ref) : undefined)
    }
    if (r.kind?.wahl) {
      const gewaehlt = s.schritte.find((x) => K.eintrag(k, x.ref) && K.textVon(K.eintrag(k, x.ref)!, p.sprache.blatt).titel === r.kind!.wahl)
      pg.melde('kind_wahl', { sitzung: nr, baustein: gewaehlt?.ref ?? null, wert: 1.5 }, gewaehlt ? K.eintrag(k, gewaehlt.ref) : undefined)
    }
    if (r.kind?.daumen) pg.melde('kind_daumen', { sitzung: nr, wert: r.kind.daumen === 'hoch' ? 1 : -1 })

    // Plan fortschreiben; nicht gehaltene Folgesitzung passt sich an (5.6) – Zugang ändert sich nur per Klick (E-M14)
    let neu: Plan = { ...plan, sitzungen: plan.sitzungen.map((x) => (x.nr === nr ? { ...x, status: 'gehalten', datum: heuteIso(), rueckmeldung: r } : x)) }
    const naechste = neu.sitzungen.find((x) => x.nr === nr + 1)
    let angepasst = false
    if (naechste && naechste.status !== 'gehalten' && (r.ergebnis === 'teils' || r.ergebnis === 'nicht')) {
      neu = K.sitzungNeu(k, p, neu, nr + 1, pg.vor)
      neu = { ...neu, sitzungen: neu.sitzungen.map((x) => (x.nr === nr + 1 ? { ...x, status: 'angepasst', hinweise: [`Sitzung ${nr + 1} angepasst, weil Sitzung ${nr} ${r.ergebnis === 'teils' ? 'nur teils' : 'nicht'} geklappt hat.`] } : x)) }
      angepasst = true
    }
    if (pg.plan?.id === plan.id) pg.setPlan(neu)
    pg.setVerlauf((v) => ({ ...v, plaene: [neu, ...v.plaene.filter((x) => x.id !== neu.id)] }))
    const notiz = K.notizText(p, neu, nr, r)
    const quellen = [...new Set((s.blatt?.bausteine ?? []).map((b) => K.eintrag(k, b.ref)).flatMap((e) => (e?.typ === 'baustein' ? ['blatt:' + e.quelle.blatt] : [])))]
    let gespeichert = false
    if (pg.darfRueckmelden && pg.ref) {
      const stapel = pg.stapelNehmen()
      pg.setSpeicherStatus({ art: 'laeuft', text: 'wird gespeichert …' })
      try {
        await hub.rueckmeldung({
          ref: pg.ref, planId: neu.id, sitzung: nr, ergebnis: r.ergebnis, ziele: r.ziele ?? [], chips: r.chips ?? [], ereignisse: stapel, notiz, gemacht: quellen,
          plan: neu, vorlieben: pg.lernenKind ? pg.vor.kind : undefined, kind: r.kind,
        })
        gespeichert = true
        pg.setGespeichert((g) => ({ ...g, [neu.id]: uhrzeit() }))
        pg.setSpeicherStatus({ art: 'ok', text: 'Gespeichert ' + uhrzeit() })
      } catch (e) {
        pg.stapelZurueck(stapel)
        pg.setSpeicherStatus({ art: 'fehler', text: 'nicht gespeichert – erneut versuchen' })
        pg.hinweisZeigen('Rückmeldung nicht gespeichert: ' + (e instanceof Error ? e.message : 'Hub antwortet nicht'), 'warn')
        return
      }
    }
    const weiter = naechste ? (angepasst ? ` · Sitzung ${nr + 1} wurde angepasst` : ` · Sitzung ${nr + 1} baut darauf auf`) : ''
    const teilen = r.ergebnis === 'geklappt' && pg.schalter.teilen && pg.hubDa && teilenErlaubt(neu, pg.getauscht[neu.id] ?? 0)
    pg.hinweisZeigen(
      (gespeichert ? 'Notiz im Dossier gespeichert' : pg.ohneKind ? 'Ohne Hub: Rückmeldung nur in dieser Planung' : 'Rückmeldung vermerkt (ohne Schreibrecht keine Notiz)') + weiter + '.',
      'ok',
      teilen ? { label: 'Fürs Team teilen', aktion: () => pg.setDlg({ art: 'teilen' }) } : undefined,
    )
  }
  return {
    speichern,
    schnell: (plan: Plan, nr: number, ergebnis: Ergebnis) => speichern(plan, nr, { ergebnis, am: heuteIso() }),
  }
}

export function Nachher({ nr }: { nr: number }) {
  const pg = usePg()
  const p = useProfil()
  const plan = pg.plan!
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const leicht = s.phase === 'leicht'
  const krise = krisentag(plan)
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null)
  const [ziele, setZiele] = useState<Record<string, 'gelingt' | 'mit-hilfe' | 'noch-nicht' | undefined>>({})
  const [chips, setChips] = useState<string[]>([])
  const [wahl, setWahl] = useState<string | undefined>()
  const [daumen, setDaumen] = useState<'hoch' | 'runter' | undefined>()
  const rm = useRueckmeldung()
  const k = pg.katalog!
  const titel = (ref: string) => {
    const e = K.eintrag(k, ref)
    return e ? K.textVon(e, p.sprache.blatt).titel : ref
  }
  const wahlOptionen = leicht ? [...s.schritte.filter((x) => x.rolle === 'spiel' || x.rolle === 'bewegung').map((x) => titel(x.ref)), 'einfach da sein'] : []
  const r: Rueckmeldung | null = ergebnis
    ? {
        ergebnis,
        am: heuteIso(),
        ziele: Object.entries(ziele).filter(([, v]) => !!v).map(([code, richtung]) => ({ code, richtung: richtung! })),
        chips,
        ...(wahl || daumen ? { kind: { ...(wahl ? { wahl } : {}), ...(daumen ? { daumen } : {}) } } : {}),
      }
    : null
  const notiz = r ? K.notizText(p, plan, nr, r) : ''
  const quellen = new Set((s.blatt?.bausteine ?? []).map((b) => K.eintrag(k, b.ref)).filter((e) => e?.typ === 'baustein' && !/^[PWF]-/.test(e.quelle.nr)).map((e) => e!.id.split(':')[1]))
  const beobachtung = !!r && ((r.ziele?.length ?? 0) > 0 || chips.length > 0)
  const ERG: [Ergebnis, string, Zeichen][] = krise
    ? [['beruhigt', 'Hat sich beruhigt', 'welle'], ['dabei', 'War dabei', 'person'], ['nur-da', 'Wollte nur da sein', 'herz'], ['abgebrochen', 'Abgebrochen', 'x']]
    : [['geklappt', 'Hat geklappt', 'hoch'], ['teils', 'Teils', 'tausch'], ['nicht', 'Hat nicht geklappt', 'runter']]
  const zielListe = leicht ? [] : plan.ziele.slice(0, 3)
  return (
    <PgDialog
      titel={(leicht ? 'Leichte Stunde' : plan.n > 1 ? `Sitzung ${nr}` : 'Stunde') + ' gehalten – wie war es?'}
      unter="Ein Klick reicht. Alles darunter ist freiwillig."
      onClose={() => pg.setDlg(null)}
      schmal
      fuss={
        <>
          <span className="links">
            Haken „gemacht“ für {quellen.size} {quellen.size === 1 ? 'Quellblatt' : 'Quellblätter'}
            {plan.n > 1 ? ' · nächste Sitzung passt sich an' : ''}
          </span>
          <button type="button" className="pg-btn" onClick={() => pg.setDlg(null)}>
            Später
          </button>
          <button
            type="button"
            className="pg-btn primaer"
            disabled={!r}
            onClick={() => {
              if (!r) return
              pg.setDlg(null)
              rm.speichern(plan, nr, r)
            }}
          >
            <Ic n="check" />
            Notiz speichern
          </button>
        </>
      }
    >
      <div className={'pg-gross3' + (krise ? ' vier' : '')} role="group" aria-label="Wie war die Stunde?">
        {ERG.map(([e, t, icon]) => (
          <button key={e} type="button" className={e + (ergebnis === e ? ' an' : '')} aria-pressed={ergebnis === e} onClick={() => setErgebnis(ergebnis === e ? null : e)}>
            <Ic n={icon} />
            {t}
          </button>
        ))}
      </div>
      {!krise && <p className="pg-leise pg-klein pg-m0">„Hat geklappt“ heißt: Die Stunde ist gut gelaufen. Ob das Ziel näher rückt, siehst du bei „je Ziel“.</p>}
      {krise && <p className="pg-leise pg-klein pg-m0">An schweren Tagen zählt nichts davon negativ – weder für {pg.vorname} noch für dich.</p>}
      {zielListe.length > 0 && (
        <div>
          <b className="pg-klein-titel">Optional je Ziel</b>
          {zielListe.map((code) => (
            <div key={code} className="pg-zielreihe">
              <span>
                <b>{code}</b> {zielKurz(code)}
              </span>
              <Seg
                label={`Ziel ${code}`}
                wert={ziele[code]}
                optionen={[['gelingt', 'gelingt'], ['mit-hilfe', 'mit Hilfe'], ['noch-nicht', 'noch nicht']]}
                onWahl={(v) => setZiele((z) => ({ ...z, [code]: z[code] === v ? undefined : v }))}
              />
            </div>
          ))}
        </div>
      )}
      <div>
        <b className="pg-klein-titel">Beobachtet (optional)</b>
        <div className="pg-chips pg-mt">
          {BEOBACHTUNGEN.map((c) => (
            <Chip key={c} an={chips.includes(c)} onClick={() => setChips((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]))}>
              {c}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <b className="pg-klein-titel">Stimme von {pg.vorname} (optional)</b>
        {wahlOptionen.length > 0 && (
          <div className="pg-zielreihe">
            <span>{pg.vorname} hat gewählt:</span>
            <div className="pg-chips">
              {wahlOptionen.map((w) => (
                <Chip key={w} an={wahl === w} onClick={() => setWahl(wahl === w ? undefined : w)}>
                  {w}
                </Chip>
              ))}
            </div>
          </div>
        )}
        <div className="pg-zielreihe">
          <span>Daumen von {pg.vorname} am Schluss:</span>
          <div className="pg-chips">
            <Chip an={daumen === 'hoch'} onClick={() => setDaumen(daumen === 'hoch' ? undefined : 'hoch')}>
              hoch
            </Chip>
            <Chip an={daumen === 'runter'} onClick={() => setDaumen(daumen === 'runter' ? undefined : 'runter')}>
              runter
            </Chip>
          </div>
        </div>
      </div>
      <div className="pg-notizvorschau" aria-live="polite">
        <small>
          {r ? `Notiz ins Dossier · Art „${beobachtung ? 'Beobachtung' : 'Notiz'}“${!leicht && plan.ziele[0] && r.ziele?.length ? ' · Bezug ' + r.ziele[0].code : ''}` : 'Notiz-Vorschau'}
        </small>
        {r ? notiz : 'Erst ein Ergebnis wählen – dann steht hier die Notiz.'}
      </div>
      {!pg.darfRueckmelden && !pg.ohneKind && <p className="pg-leise pg-klein pg-m0">Ohne Recht zur Rückmeldung wird nichts ins Dossier geschrieben.</p>}
      {!pg.lernenKind && !pg.ohneKind && <p className="pg-leise pg-klein pg-m0">Passgenau lernt bei {pg.vorname} nicht mit – die Notiz wird trotzdem gespeichert.</p>}
    </PgDialog>
  )
}
