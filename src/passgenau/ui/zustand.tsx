// Passgenau – Zustand der Oberfläche: Verbindung zum Hub, Profil mit Korrekturen, Plan, Vorlieben, Ereignisse,
// Dialoge. Alle Ansichten lesen ihn über usePg(). Rechnen tut der Kern (./kern), speichern der Hub (./hub).
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Auftrag, Ereignis, KatalogEintrag, Plan, PraxisVorlage, Profil, Rueckmeldung, Sprache, Stufe, VorliebenKind, VorliebenTeam } from '../typen'
import * as K from './kern'
import * as hub from './hub'
import { laden as vorliebenLaden, sichern as vorliebenSichern, type FachkraftVorlieben, alsVorlage } from './vorlieben'
import { schalterLesen, SCHALTER_VORGABE, type Schalter } from './erweitert'
import { altersbandFest, blobSpeichern, dateiname, istBlattSchritt, tagsVon, textDatei, uhrzeit } from './anzeige'
import { LAYOUT_FUER_STUFE, heuteIso } from './texte'
import { aktuellerNutzer } from '../../lib/nutzer'

export type Ansicht = 'start' | 'wissen' | 'ohnekind' | 'gruendlich' | 'schnell' | 'leicht' | 'ergebnis' | 'vorschau' | 'baukasten' | 'gelernt' | 'praxis'

/** Korrekturen aus „Das weiß ich schon“ (bleiben beim Kind, d.passgenau.kind.korrekturen) */
export interface Korrekturen {
  ziele?: Record<string, boolean>
  reihe?: string[]
  themen?: Record<string, boolean>
  zugang?: Partial<Pick<Profil['zugang'], 'lesen' | 'schreiben' | 'bild' | 'tempo' | 'struktur'>>
  stufe?: Stufe
  sprache?: Sprache
  /** „nur Französisch“ statt „Französisch bevorzugt, Deutsch möglich“ (T-M4) */
  nurFr?: boolean
  woerter?: boolean
  interessen?: string[]
  frei?: Record<string, boolean>
  vorsicht?: Record<string, boolean>
  hilft?: Record<string, boolean>
  vorname?: boolean
  /** Datum der Bestätigung „Lesen · Schreiben · Bilder stimmt“ (P4) */
  zugangBestaetigt?: string
  lernen?: boolean
}

export interface Druck {
  vorname: boolean
  ziel: boolean
  ohneWarum: boolean
}

export type Ort = { sitzung: number; schritt?: number; blatt?: number }

export type Dialog =
  | { art: 'ersetzen'; ort: Ort }
  | { art: 'nachher'; nr: number }
  | { art: 'teilen' }
  | { art: 'uebernehmen'; vorlage: PraxisVorlage }
  | { art: 'melden'; vorlage: PraxisVorlage }
  | { art: 'kuratieren'; vorlage: PraxisVorlage }
  | { art: 'heikel' }

export interface Hinweis {
  id: number
  text: string
  art?: 'ok' | 'info' | 'warn'
  knopf?: { label: string; aktion: () => void }
}

type ProfilRoh = hub.ProfilVomHub & { team?: VorliebenTeam | null }

const VORSICHT_ALLE = ['familie', 'trauer', 'koerper', 'heikel', 'reiz', 'trauma'] as const
const HILFT_ALLE = ['stundenleiste', 'bewegungspausen', 'reizarm', 'bildplan'] as const

/** Profil mit den Korrekturen der Fachkraft */
export function mitKorrekturen(p: Profil, k: Korrekturen, vorname: boolean): Profil {
  const reihe = k.reihe ?? p.ziele.map((z) => z.code)
  const ziele = [...p.ziele]
    .filter((z) => k.ziele?.[z.code] !== false)
    .sort((a, b) => (reihe.indexOf(a.code) + 1 || 99) - (reihe.indexOf(b.code) + 1 || 99))
    .map((z, i) => ({ ...z, prio: i + 1 }))
  const stufe = k.stufe
  const vorsicht = VORSICHT_ALLE.filter((v) => (k.vorsicht?.[v] !== undefined ? k.vorsicht[v] : p.vorsicht.includes(v)))
  const hilft = HILFT_ALLE.filter((h) => (k.hilft?.[h] !== undefined ? k.hilft[h] : (p.hilft ?? []).includes(h)))
  const zugang = { ...p.zugang, ...k.zugang }
  if (hilft.includes('stundenleiste')) zugang.struktur = 'hoch'
  return {
    ...p,
    anrede: vorname ? (p.vorname ?? p.anrede ?? null) : null,
    stufen: stufe ? [stufe] : p.stufen,
    layout: stufe ? (p.alterJahre >= 12 && LAYOUT_FUER_STUFE[stufe] !== 'jugend' ? 'jugend' : LAYOUT_FUER_STUFE[stufe]) : p.layout,
    sprache: { blatt: k.sprache ?? p.sprache.blatt, woerter: k.woerter === false ? [] : p.sprache.woerter },
    zugang,
    ziele,
    themen: p.themen.filter((t) => k.themen?.[t.key] !== false),
    interessen: k.interessen ?? p.interessen,
    gemacht: p.gemacht.filter((g) => !k.frei?.[g.id]),
    vorsicht,
    hilft,
    lernen: k.lernen ?? p.lernen,
    zugangBestaetigt: !!k.zugangBestaetigt || p.zugangBestaetigt,
  }
}

/** Darf „Fürs Team teilen“ angeboten werden? (E-M8) */
export function teilenErlaubt(plan: Plan | null, getauscht: number): boolean {
  if (!plan) return false
  const gehalten = plan.sitzungen.filter((s) => s.status === 'gehalten').length
  return plan.n > 1 ? gehalten >= 3 : getauscht > 0
}

function useWert<T>(v: T) {
  const r = useRef(v)
  r.current = v
  return r
}

let hinweisId = 1

function usePassgenauZustand(startHash: hub.PassgenauStart | null, aktiv: boolean) {
  const [status, setStatus] = useState<'warten' | 'verbinden' | 'bereit' | 'abgeschaltet'>('warten')
  const [hallo, setHallo] = useState<hub.Hallo | null>(null)
  const [version, setVersion] = useState<{ ok: boolean; speichern: boolean; hinweis: string | null }>({ ok: true, speichern: true, hinweis: null })
  const [schalter, setSchalter] = useState<Schalter>(SCHALTER_VORGABE)
  const [katalog, setKatalog] = useState<K.Katalog | null>(null)
  const [roh, setRoh] = useState<ProfilRoh | null>(null)
  const [ref, setRef] = useState<string | null>(null)
  const [ohneKind, setOhneKind] = useState(false)
  const [fehler, setFehler] = useState<string | null>(null)
  const [korr, setKorr] = useState<Korrekturen>({})
  const [druck, setDruck] = useState<Druck>({ vorname: false, ziel: false, ohneWarum: true })
  const [vor, setVor] = useState<K.Vorlieben>(() => ({ kind: null, ich: vorliebenLaden(), team: null }))
  const [verlauf, setVerlauf] = useState<K.Verlauf>({ plaene: [], ereignisse: [] })
  const [plan, setPlanZustand] = useState<Plan | null>(null)
  const [si, setSi] = useState(0)
  const [ansicht, setAnsichtZustand] = useState<Ansicht>('start')
  const [herkunft, setHerkunft] = useState<Ansicht>('start')
  const [gespeichert, setGespeichert] = useState<Record<string, string>>({})
  const [speicherStatus, setSpeicherStatus] = useState<{ art: 'ok' | 'laeuft' | 'fehler'; text: string } | null>(null)
  const [getauscht, setGetauscht] = useState<Record<string, number>>({})
  const [heikel, setHeikel] = useState<NonNullable<Auftrag['heikel']>>([])
  const [startZiel, setStartZiel] = useState<string | null>(null)
  const [dlg, setDlg] = useState<Dialog | null>(null)
  const [hinweis, setHinweisZustand] = useState<Hinweis | null>(null)
  const [praxis, setPraxis] = useState<{ laedt: boolean; liste: PraxisVorlage[]; fehler: string | null; geladen: boolean }>({ laedt: false, liste: [], fehler: null, geladen: false })
  const [rueckgaengig, setRueckgaengig] = useState<Plan[]>([])
  const offen = useRef<Ereignis[]>([])
  const letzterFlush = useRef(0)
  const flushTimer = useRef<number | null>(null)

  const nutzer = useMemo(() => aktuellerNutzer(), [])
  const hubDa = !!hallo && !ohneKind
  const profil = useMemo(() => (roh ? mitKorrekturen(roh, korr, druck.vorname) : null), [roh, korr, druck.vorname])
  const vorname = roh?.vorname ?? (ohneKind ? 'das Kind' : 'das Kind')
  const darfSpeichern = hubDa && !!ref && !!profil?.rechte.speichern && version.speichern
  const darfRueckmelden = hubDa && !!ref && !!profil?.rechte.rueckmelden && version.speichern
  const lernenKind = schalter.lernen && !ohneKind && profil?.lernen !== false
  const ich = { name: hallo?.ich?.name ?? (nutzer.name || 'ich'), team: hallo?.ich?.team ?? '' }
  const kuratieren = !!hallo?.rechte.kuratieren || nutzer.rolle === 'admin' || nutzer.rolle === 'responsable'

  const refs = useWert({ vor, ref, plan, profil, katalog, darfSpeichern, gespeichert, lernenKind })
  const druckRef = useWert(druck)
  const [daumenStand, setDaumenStand] = useState<Record<string, 'hoch' | 'runter'>>({})

  const hinweisZeigen = useCallback((text: string, art: Hinweis['art'] = 'ok', knopf?: Hinweis['knopf'], ms = 4500) => {
    const id = hinweisId++
    setHinweisZustand({ id, text, art, knopf })
    window.setTimeout(() => setHinweisZustand((h) => (h?.id === id ? null : h)), knopf ? Math.max(ms, 10000) : ms)
  }, [])

  const setAnsicht = useCallback((a: Ansicht) => {
    setAnsichtZustand((alt) => {
      if (a === 'wissen' && alt !== 'wissen') setHerkunft(alt)
      return a
    })
    setDlg(null)
    window.scrollTo({ top: 0 })
  }, [])

  // Fachkraft-Vorlieben: sofort in localStorage (→ persönlicher Tresor)
  useEffect(() => {
    vorliebenSichern(vor.ich as FachkraftVorlieben)
  }, [vor.ich])

  // --- Start und Verbindung -----------------------------------------------------------------------------------
  const gestartet = useRef<string | null>(null)
  // hallo, solange es unterwegs ist, nur einmal fragen (ein abgebrochener Start – Reiterwechsel, StrictMode – hängt sich an)
  const halloLauf = useRef<Promise<hub.Hallo> | null>(null)
  useEffect(() => {
    if (!aktiv) return
    const schluessel = JSON.stringify(startHash ?? {})
    if (gestartet.current === schluessel) return
    gestartet.current = schluessel
    let aus = false
    let fertig = false
    setStatus('verbinden')
    setFehler(null)
    K.ladeKatalog().then((k) => !aus && setKatalog(k))
    const fenster = hub.hubFenster()
    const ohne = () => {
      if (aus) return
      fertig = true
      setHallo(null)
      setSchalter(schalterLesen(null))
      setOhneKind(true)
      setRoh(null)
      setStatus('bereit')
      setAnsichtZustand('ohnekind')
    }
    if (!fenster) {
      ohne()
      return
    }
    let lauf = halloLauf.current
    if (!lauf) {
      const neu = hub.hallo(1500)
      halloLauf.current = lauf = neu
      neu.then(
        () => halloLauf.current === neu && (halloLauf.current = null),
        () => halloLauf.current === neu && (halloLauf.current = null),
      )
    }
    lauf
      .then(async (h) => {
        if (aus) return
        setHallo(h)
        const s = schalterLesen(h.schalter)
        setSchalter(s)
        setVersion(hub.versionAbgleich(h))
        if (!s.an) {
          fertig = true
          setStatus('abgeschaltet')
          return
        }
        const r = startHash?.ref
        if (!r) {
          ohne()
          setHallo(h)
          return
        }
        try {
          const p = (await hub.profil(r)) as ProfilRoh
          if (aus) return
          setRef(r)
          setOhneKind(false)
          setRoh(p)
          const k = (p.kind?.korrekturen ?? {}) as Korrekturen
          setKorr(k)
          setDruck((d) => ({ ...d, vorname: !!p.kind?.vorname }))
          setVor((v) => ({ ...v, kind: p.vorlieben ?? null, team: p.team ?? null }))
          setVerlauf({ plaene: p.verlauf?.plaene ?? [], ereignisse: p.verlauf?.ereignisse ?? [] })
          setStartZiel(startHash?.ziel ?? null)
          fertig = true
          setStatus('bereit')
          setAnsichtZustand(startHash?.weg ?? 'start')
          if ((p.achtung?.length || p.vorsicht.includes('heikel')) && startHash?.weg !== 'leicht') setDlg(null)
        } catch (e) {
          if (aus) return
          setFehler(e instanceof Error ? e.message : 'Profil nicht verfügbar')
          ohne()
          setHallo(h)
        }
      })
      .catch(() => ohne())
    return () => {
      aus = true
      // mitten im Verbinden abgebrochen: beim nächsten Lauf neu anfangen (sonst bliebe „Verbinde …“ stehen)
      if (!fertig) gestartet.current = null
    }
  }, [aktiv, startHash])

  // --- Korrekturen ans Kind (gebündelt, entprellt) ----------------------------------------------------------
  const korrTimer = useRef<number | null>(null)
  const korrektur = useCallback(
    (f: (k: Korrekturen) => Korrekturen, meldung?: string) => {
      setKorr((alt) => {
        const neu = f(alt)
        if (korrTimer.current) window.clearTimeout(korrTimer.current)
        korrTimer.current = window.setTimeout(() => {
          const r = refs.current
          if (!r.ref || !r.darfSpeichern) return
          hub.vorlieben(r.ref, { kind: { korrekturen: neu as Record<string, unknown>, interessen: neu.interessen, vorname: druckRef.current.vorname } }).catch(() => {})
        }, 700)
        return neu
      })
      if (meldung) hinweisZeigen(meldung + (refs.current.darfSpeichern ? '' : ohneKind ? '' : ' (gilt nur für diese Planung – kein Schreibrecht)'))
    },
    [druckRef, hinweisZeigen, ohneKind, refs],
  )

  // --- Ereignisse sammeln, gebündelt schreiben (T-M9) ---------------------------------------------------------
  const flush = useCallback(async (): Promise<void> => {
    const r = refs.current
    if (!r.ref || !offen.current.length || !r.lernenKind || !r.darfSpeichern) return
    const stapel = offen.current.splice(0)
    letzterFlush.current = Date.now()
    setSpeicherStatus({ art: 'laeuft', text: 'wird gespeichert …' })
    try {
      await hub.vorlieben(r.ref, { vorlieben: r.vor.kind, ereignisse: stapel })
      setSpeicherStatus({ art: 'ok', text: 'Gespeichert ' + uhrzeit() })
    } catch {
      offen.current.unshift(...stapel)
      setSpeicherStatus({ art: 'fehler', text: 'nicht gespeichert – erneut versuchen' })
    }
  }, [refs])

  const flushPlanen = useCallback(() => {
    if (flushTimer.current) return
    const warte = Math.max(30000 - (Date.now() - letzterFlush.current), 30000)
    flushTimer.current = window.setTimeout(() => {
      flushTimer.current = null
      const r = refs.current
      // automatisch nur, wenn der Plan schon gespeichert ist; sonst beim nächsten Speichern mit
      if (r.plan && r.gespeichert[r.plan.id]) flush()
    }, warte)
  }, [flush, refs])

  useEffect(() => {
    const weg = () => {
      const r = refs.current
      if (offen.current.length && r.plan && r.gespeichert[r.plan.id]) flush()
    }
    window.addEventListener('pagehide', weg)
    return () => window.removeEventListener('pagehide', weg)
  }, [flush, refs])

  /** gesammelte Ereignisse für einen gebündelten Aufruf herausnehmen (T-M9) */
  const stapelNehmen = useCallback((): Ereignis[] => offen.current.splice(0), [])
  const stapelZurueck = useCallback((l: Ereignis[]) => offen.current.unshift(...l), [])

  const melde = useCallback(
    (art: Ereignis['art'], daten: Partial<Ereignis>, eintrag?: KatalogEintrag) => {
      const r = refs.current
      if (!r.profil || !schalter.lernen) return null
      const e = K.ereignis(art, {
        kind: null,
        fachkraft: null,
        kinder: 1,
        plan: r.plan?.id ?? null,
        weg: r.plan?.weg ?? null,
        altersband: altersbandFest(r.profil.alterJahre),
        tagesform: r.plan?.auftrag?.heute ? { e: r.plan.auftrag.heute.energie, k: r.plan.auftrag.heute.konzentration, s: r.plan.auftrag.heute.stimmung } : null,
        ...daten,
      })
      setVor((v) => {
        const neu = K.rueckmelden(v, e, eintrag)
        return { ...neu, kind: r.lernenKind ? neu.kind : v.kind }
      })
      if (r.lernenKind && !ohneKind) {
        offen.current.push(e)
        flushPlanen()
      }
      return e
    },
    [flushPlanen, ohneKind, refs, schalter.lernen],
  )

  // --- Plan ----------------------------------------------------------------------------------------------------
  const setPlan = useCallback((p: Plan | null, opt: { merken?: boolean } = {}) => {
    setPlanZustand((alt) => {
      if (opt.merken && alt) setRueckgaengig((l) => [...l.slice(-29), alt])
      return p
    })
  }, [])
  const planAendern = useCallback(
    (f: (p: Plan) => Plan, opt: { merken?: boolean } = { merken: true }) => {
      setPlanZustand((alt) => {
        if (!alt) return alt
        if (opt.merken) setRueckgaengig((l) => [...l.slice(-29), alt])
        return f(alt)
      })
    },
    [],
  )
  const zurueck = useCallback(() => {
    setRueckgaengig((l) => {
      if (!l.length) return l
      setPlanZustand(l[l.length - 1])
      return l.slice(0, -1)
    })
  }, [])

  const sitzung = plan?.sitzungen[si] ?? null

  const planBauen = useCallback(
    (a: Auftrag, opt: { profilOhneFolge?: boolean } = {}) => {
      const r = refs.current
      if (!r.katalog || !r.profil) return
      const t0 = performance.now()
      const p = opt.profilOhneFolge ? { ...r.profil, folge: null } : r.profil
      const auftrag: Auftrag = { ...a, heikel: heikel.length ? heikel : a.heikel }
      const neu = K.planen(r.katalog, p, auftrag, r.vor, verlauf)
      setPlan(neu)
      setRueckgaengig([])
      const i = neu.sitzungen.findIndex((s) => s.status !== 'gehalten')
      setSi(i < 0 ? 0 : i)
      setAnsichtZustand('ergebnis')
      setDlg(null)
      window.scrollTo({ top: 0 })
      const ms = Math.max(1, Math.round(performance.now() - t0))
      hinweisZeigen(
        neu.n > 1 && a.weg === 'gruendlich'
          ? `Folge mit ${neu.n} Sitzungen gebaut in ${ms} ms – noch nicht gespeichert.`
          : `Stunde gebaut in ${ms} ms – ${refs.current.darfSpeichern ? 'gespeichert wird beim Drucken oder per Knopf.' : 'ohne Hub nur als Datei.'}`,
      )
      // Vorlieben merken: Dauer
      setVor((v) => ({ ...v, ich: { ...v.ich, dauer: a.dauer } as FachkraftVorlieben }))
    },
    [heikel, hinweisZeigen, refs, setPlan, verlauf],
  )

  const planSichern = useCallback(
    async (p: Plan, grund: 'knopf' | 'druck' | 'gehalten', still = false): Promise<boolean> => {
      const r = refs.current
      if (!r.ref || ohneKind || !hallo) {
        if (grund === 'knopf') {
          textDatei(JSON.stringify({ v: 1, passgenau: 'plan', plan: p }, null, 1), `Passgenau-Plan-${p.n}-Sitzungen.json`)
          hinweisZeigen('Ohne Hub: Plan als Datei gesichert (nur Verweise, ohne Kinddaten).')
        }
        return false
      }
      if (!r.darfSpeichern) {
        // Ohne Schreibrecht: Plan im persönlichen Tresor (localStorage der Toolbox)
        setVor((v) => {
          const ich = v.ich as FachkraftVorlieben & { plaene?: Plan[] }
          return { ...v, ich: { ...ich, plaene: [p, ...(ich.plaene ?? []).filter((x) => x.id !== p.id)].slice(0, 10) } as FachkraftVorlieben }
        })
        if (!still) hinweisZeigen('Kein Schreibrecht im Dossier: Plan in deinem persönlichen Tresor gesichert.', 'info')
        return false
      }
      const stapel = r.lernenKind ? offen.current.splice(0) : []
      setSpeicherStatus({ art: 'laeuft', text: 'wird gespeichert …' })
      try {
        await hub.speichern(r.ref, p, { ereignisse: stapel, vorlieben: r.lernenKind ? r.vor.kind : undefined, grund })
        letzterFlush.current = Date.now()
        setGespeichert((g) => ({ ...g, [p.id]: uhrzeit() }))
        setVerlauf((v) => ({ ...v, plaene: [p, ...v.plaene.filter((x) => x.id !== p.id)] }))
        setSpeicherStatus({ art: 'ok', text: 'Gespeichert ' + uhrzeit() })
        if (!still) hinweisZeigen(grund === 'druck' ? 'Gedruckt und beim Kind gespeichert.' : 'Beim Kind gespeichert (verschlüsselt im Dossier).')
        return true
      } catch (e) {
        offen.current.unshift(...stapel)
        setSpeicherStatus({ art: 'fehler', text: 'nicht gespeichert – erneut versuchen' })
        hinweisZeigen('Speichern nicht möglich: ' + (e instanceof Error ? e.message : 'Hub antwortet nicht'), 'warn')
        return false
      }
    },
    [hallo, hinweisZeigen, ohneKind, refs],
  )

  const pdfErzeugen = useCallback(
    async (nr: number | 'folge') => {
      const r = refs.current
      if (!r.plan || !r.katalog || !r.profil) return
      const opt = { sprache: r.profil.sprache.blatt, warum: !druckRef.current.ohneWarum, karten: true, ziel: druckRef.current.ziel && r.profil.alterJahre < 12, vorname: druckRef.current.vorname }
      hinweisZeigen('PDF wird erstellt …', 'info')
      try {
        const blob = nr === 'folge' ? await K.pdfFolge(r.katalog, r.profil, r.plan, opt) : await K.pdfSitzung(r.katalog, r.profil, r.plan, nr, opt)
        blobSpeichern(blob, dateiname(r.plan, nr === 'folge' ? undefined : nr))
        const jetzt = new Date().toISOString().slice(0, 16)
        const neu: Plan = {
          ...r.plan,
          gedruckt: jetzt,
          sitzungen: r.plan.sitzungen.map((s) => (nr === 'folge' || s.nr === nr ? { ...s, gedruckt: jetzt } : s)),
        }
        setPlanZustand(neu)
        melde('gedruckt', { sitzung: nr === 'folge' ? null : nr, wert: 0 })
        // P7: gedruckt ist gespeichert
        await planSichern(neu, 'druck')
      } catch (e) {
        hinweisZeigen('PDF nicht möglich: ' + (e instanceof Error ? e.message : String(e)), 'warn')
      }
    },
    [druckRef, hinweisZeigen, melde, planSichern, refs],
  )

  const alsEigeneVorlage = useCallback(() => {
    const r = refs.current
    if (!r.plan) return
    const v = alsVorlage(r.plan, r.plan.titel)
    setVor((x) => ({ ...x, ich: { ...x.ich, eigeneVorlagen: [v, ...(x.ich.eigeneVorlagen ?? [])].slice(0, 30) } }))
    hinweisZeigen(`Als eigene Vorlage gesichert: „${r.plan.titel}“ (nur für dich, ohne Kind).`)
  }, [hinweisZeigen, refs])

  // --- Praxis ----------------------------------------------------------------------------------------------------
  const praxisLaden = useCallback(async () => {
    if (!hallo?.praxis || !schalter.teilen) {
      setPraxis({ laedt: false, liste: [], fehler: hallo ? null : 'ohne-hub', geladen: true })
      return
    }
    setPraxis((p) => ({ ...p, laedt: true, fehler: null }))
    try {
      const l = await hub.praxisListe()
      setPraxis({ laedt: false, liste: Array.isArray(l) ? l : [], fehler: null, geladen: true })
    } catch (e) {
      setPraxis({ laedt: false, liste: [], fehler: e instanceof Error ? e.message : 'nicht erreichbar', geladen: true })
    }
  }, [hallo, schalter.teilen])

  return {
    // Verbindung
    status, hallo, hubDa, version, schalter, fehler, ref, ohneKind, setOhneKind, kuratieren, ich, nutzer,
    speicherStatus, setSpeicherStatus, flush, stapelNehmen, stapelZurueck, setGespeichert,
    // Kind
    katalog, roh, setRoh, profil, korr, korrektur, vorname, darfSpeichern, darfRueckmelden, lernenKind, druck, setDruck,
    heikel, setHeikel, startZiel,
    // Vorlieben, Ereignisse
    vor, setVor, melde, verlauf, setVerlauf,
    // Plan
    plan, setPlan, planAendern, zurueck, rueckgaengig, si, setSi, sitzung, planBauen, planSichern, pdfErzeugen, alsEigeneVorlage,
    gespeichert, getauscht, setGetauscht, daumenStand, setDaumenStand,
    // Ansicht, Dialoge, Hinweise
    ansicht, setAnsicht, herkunft, dlg, setDlg, hinweis, hinweisZeigen, setHinweis: setHinweisZustand,
    // Praxis
    praxis, setPraxis, praxisLaden,
    // Hilfen
    istBlattSchritt, tagsVon,
  }
}

export type Pg = ReturnType<typeof usePassgenauZustand>
const Kontext = createContext<Pg | null>(null)

export function PgAnbieter({ startHash, aktiv, children }: { startHash: hub.PassgenauStart | null; aktiv: boolean; children: ReactNode }) {
  const pg = usePassgenauZustand(startHash, aktiv)
  return <Kontext.Provider value={pg}>{children}</Kontext.Provider>
}

export function usePg(): Pg {
  const pg = useContext(Kontext)
  if (!pg) throw new Error('usePg außerhalb von PgAnbieter')
  return pg
}

/** Profil (gesichert vorhanden) – nur in Ansichten nach dem Start benutzen */
export function useProfil(): Profil {
  const pg = usePg()
  if (!pg.profil) throw new Error('kein Profil')
  return pg.profil
}

export const heute = heuteIso
export type { Rueckmeldung, VorliebenKind }
