// Passgenau – A4-Vorschau des Kinderblatts im Browser (HTML, gleiche Gestaltung wie BlattDokument, nur genähert).
// Jeder Mikro-Baustein ist eine Gruppe, die nicht über eine Seite bricht; Gruppen werden gemessen und auf A4-Seiten
// verteilt. Das echte PDF entsteht mit dem Renderer der Toolbox (react-pdf).
import { Fragment, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import type { Baustein, Layout } from '../../blatt/typen'
import { BEREICHE, bereichById } from '../../blatt/katalog'
import { bildZeichnung, iconZeichnung, palette, type Palette } from '../../blatt/zeichnung'
import { ZeichnungSvg } from '../../blatt/ZeichnungSvg'
import { GEFUEHL_WORT } from '../../blatt/gesichter'
import type { Gefuehl } from '../../blatt/typen'
import { Ic, SYMBOL_ZEICHEN } from './zeichen'
import type { ZerlegtesBlatt } from './blattTeile'

export const MM = 96 / 25.4

const FARBE: Record<string, string> = {
  rot: '#D04A4A', orange: '#E8892F', gelb: '#E3C33A', gruen: '#5DA84A', blau: '#2E8FCB', lila: '#8A5BB5', grau: '#9AA2B1',
  braun: '#8B5E3C', schwarz: '#1B2233', weiss: '#FFFFFF', rosa: '#E89BB5', hellblau: '#8CC5E8',
}

function T({ t }: { t?: string }): ReactNode {
  if (!t) return null
  const teile = t.split(/\{(rot|orange|gelb|gruen|blau|lila|grau|braun|schwarz|weiss|rosa|hellblau)\}/)
  return teile.map((x, i) => (i % 2 ? <i key={i} className="pga-punkt" style={{ background: FARBE[x] }} aria-label={x} /> : <Fragment key={i}>{x}</Fragment>))
}

function Bild({ id, p, className }: { id: string; p: Palette; className?: string }) {
  const z = bildZeichnung(id)
  if (!z.formen.length) return <span className={'pga-bildleer ' + (className ?? '')} />
  return <ZeichnungSvg z={id.startsWith('icon:') ? { ...z, w: 1.6 } : z} p={p} className={className} />
}

function Linien({ n }: { n: number }) {
  return (
    <>
      {Array.from({ length: Math.max(0, n) }, (_, i) => (
        <div key={i} className="pga-linie" />
      ))}
    </>
  )
}

function Gesicht({ g, p }: { g: string; p: Palette }) {
  return <Bild id={'gesicht:' + g} p={p} className="pga-gesicht" />
}

/** Ein Baustein des Kinderblatts als HTML (Näherung an src/blatt/pdf/bausteine.tsx) */
export function BausteinHtml({ b, nr, p }: { b: Baustein; nr: number; p: Palette }): ReactNode {
  const x = b as unknown as Record<string, unknown>
  switch (b.art) {
    case 'aufgabe':
      return (
        <div className="pga-aufg">
          {nr > 0 && <span className="anr">{nr}</span>}
          {(b.symbole ?? []).map((s) => (
            <span key={s} className="sym" title={s}>
              <Ic n={SYMBOL_ZEICHEN[s] ?? 'kreis'} />
            </span>
          ))}
          <b>
            <T t={b.text} />
            {b.hinweis && <small>{b.hinweis}</small>}
          </b>
        </div>
      )
    case 'text':
      return <p className={b.klein ? 'pga-klein' : 'pga-text'}><T t={b.text} /></p>
    case 'info':
      return (
        <div className="pga-info">
          {b.titel && <b>{b.titel}</b>}
          {b.text && <span><T t={b.text} /></span>}
          {b.punkte && <ul>{b.punkte.map((t, i) => <li key={i}><T t={t} /></li>)}</ul>}
        </div>
      )
    case 'geschichte':
      return (
        <div className="pga-box pga-geschichte">
          {b.bild && <Bild id={b.bild} p={p} className="pga-gbild" />}
          <div>
            {b.titel && <b>{b.titel}</b>}
            <p><T t={b.text} /></p>
          </div>
        </div>
      )
    case 'bild': {
      const g = { s: 22, m: 36, l: 56, xl: 78 }[b.groesse ?? 'm']
      return (
        <div className="pga-bild" style={{ justifyContent: b.ausrichtung === 'links' ? 'flex-start' : b.ausrichtung === 'rechts' ? 'flex-end' : 'center' }}>
          <Bild id={b.bild} p={p} className="pga-img" />
          <style>{''}</style>
          {b.text && <span>{b.text}</span>}
          <span className="pga-groesse" style={{ width: g + 'mm' }} />
        </div>
      )
    }
    case 'spalten':
      return (
        <div className="pga-spalten" style={{ gridTemplateColumns: b.verhaeltnis === '2:1' ? '2fr 1fr' : b.verhaeltnis === '1:2' ? '1fr 2fr' : '1fr 1fr' }}>
          <div>{b.links.map((y, i) => <BausteinHtml key={i} b={y} nr={0} p={p} />)}</div>
          <div>{b.rechts.map((y, i) => <BausteinHtml key={i} b={y} nr={0} p={p} />)}</div>
        </div>
      )
    case 'abstand':
      return <div style={{ height: (b.hoehe ?? 6) + 'mm' }} />
    case 'seitenumbruch':
      return null
    case 'linien':
      return (
        <div>
          {b.label && <div className="pga-label">{b.label}</div>}
          <Linien n={b.anzahl} />
        </div>
      )
    case 'frage':
      return (
        <div>
          <div className="pga-frage"><T t={b.text} /></div>
          <Linien n={b.linien ?? 2} />
        </div>
      )
    case 'satzanfaenge':
      return (
        <div className="pga-sa">
          {b.items.map((t, i) => (
            <div key={i}>
              <span><T t={t} /></span>
              <i />
            </div>
          ))}
        </div>
      )
    case 'feld':
      return (
        <div className="pga-malfeld" style={{ height: (b.hoehe ?? 40) + 'mm' }}>
          {b.beispiel && <span className="bsp">{b.beispiel}</span>}
          <span className="lab">{b.label ?? (b.zeichnen ? 'Platz zum Malen' : '')}</span>
        </div>
      )
    case 'tabelle':
      return (
        <table className="pga-tabelle">
          <thead>
            <tr>{b.spalten.map((s, i) => <th key={i}>{s}</th>)}</tr>
          </thead>
          <tbody>
            {b.beispiel && <tr>{b.beispiel.map((s, i) => <td key={i} className="bsp">{s}</td>)}</tr>}
            {Array.from({ length: b.zeilen }, (_, r) => (
              <tr key={r}>{b.spalten.map((_, i) => <td key={i} />)}</tr>
            ))}
          </tbody>
        </table>
      )
    case 'wennDann':
      return (
        <div className="pga-wd">
          <div className="kopfz">{b.wenn ?? 'Wenn …'}</div>
          <div className="kopfz">{b.dann ?? '… dann'}</div>
          {(b.beispiele ?? []).map((y, i) => (
            <Fragment key={i}>
              <div className="bsp">{y.wenn}</div>
              <div className="bsp">{y.dann}</div>
            </Fragment>
          ))}
          {Array.from({ length: b.zeilen }, (_, i) => (
            <Fragment key={'z' + i}>
              <div />
              <div />
            </Fragment>
          ))}
        </div>
      )
    case 'dialog':
      return (
        <div className="pga-sa">
          {b.zeilen.map((z, i) => (
            <div key={i}>
              <span>{z.wer}:</span>
              {z.text ? <span className="pga-text">{z.text}</span> : <i />}
            </div>
          ))}
        </div>
      )
    case 'vertrag':
      return (
        <div className="pga-box">
          {b.titel && <b>{b.titel}</b>}
          <p><T t={b.text} /></p>
          <div className="pga-unterschriften">{b.unterschriften.map((u, i) => <span key={i}><i />{u}</span>)}</div>
        </div>
      )
    case 'ankreuzen':
      return (
        <div>
          {b.titel && <div className="pga-label">{b.titel}</div>}
          <div className="pga-kreuz" style={{ gridTemplateColumns: `repeat(${b.spalten ?? 1}, 1fr)` }}>
            {b.items.map((t, i) => <span key={i}><T t={t} /></span>)}
            {Array.from({ length: b.frei ?? 0 }, (_, i) => <span key={'f' + i}><i className="pga-frei" /></span>)}
          </div>
        </div>
      )
    case 'bilder':
      return (
        <div className={'pga-bildwahl' + (b.klein ? ' klein' : '')} style={{ gridTemplateColumns: `repeat(${b.spalten ?? Math.min(4, b.bilder.length)}, 1fr)` }}>
          {b.bilder.map((y, i) => (
            <div key={i}>
              <Bild id={y.bild} p={p} className="pga-img" />
              {y.text && <span>{y.text}</span>}
              {b.modus === 'ankreuzen' && <i className="pga-kasten" />}
            </div>
          ))}
        </div>
      )
    case 'wortspeicher':
      return (
        <div>
          {b.titel && <div className="pga-label">{b.titel}</div>}
          <div className="pga-ws">{b.items.map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
      )
    case 'skala': {
      const n = b.stufen ?? 5
      const g: Gefuehl[] = n === 5 ? ['ruhig', 'neutral', 'besorgt', 'wuetend', 'wuetend'] : []
      return (
        <div>
          {b.frage && <div className="pga-frage">{b.frage}</div>}
          <div className="pga-skala">
            {Array.from({ length: n }, (_, i) => (
              <div key={i}>
                {b.gesichter && g[i] ? <Gesicht g={g[i]} p={p} /> : <span className="zahl">{n === 11 ? i : i + 1}</span>}
                <span className="pga-kasten" />
                <small>{i === 0 ? b.von : i === n - 1 ? b.bis : ''}</small>
              </div>
            ))}
          </div>
        </div>
      )
    }
    case 'einschaetzung':
      return (
        <table className="pga-einsch">
          <thead>
            <tr><th />{b.optionen.map((o, i) => <th key={i}>{o}</th>)}</tr>
          </thead>
          <tbody>
            {b.items.map((t, i) => (
              <tr key={i}><td>{t}</td>{b.optionen.map((_, j) => <td key={j}><span /></td>)}</tr>
            ))}
          </tbody>
        </table>
      )
    case 'zuordnen':
      return (
        <div className="pga-zuordnen">
          <div>{b.links.map((t, i) => <span key={i}>{t}<i /></span>)}</div>
          <div>{b.rechts.map((t, i) => <span key={i}><i />{t}</span>)}</div>
        </div>
      )
    case 'gefuehle':
      return (
        <div className="pga-gefgrid">
          {b.gefuehle.map((g, i) => (
            <div key={i}>
              <Gesicht g={g} p={p} />
              {b.modus !== 'nur' && <span>{b.woerter?.[i] ?? GEFUEHL_WORT[g]?.de ?? g}</span>}
              {b.modus === 'nur' && <span>{GEFUEHL_WORT[g]?.de ?? g}</span>}
            </div>
          ))}
          {Array.from({ length: b.leer ?? 0 }, (_, i) => (
            <div key={'l' + i}><span className="pga-gesicht leer" /><i className="pga-linie kurz" /></div>
          ))}
        </div>
      )
    case 'ampel': {
      const farben = ['#D04A4A', '#E3B23A', '#5DA84A']
      return (
        <div className="pga-ampel">
          {b.stufen.map((s, i) => (
            <div key={i} className="st">
              <i style={{ background: farben[i] }} />
              <div>
                <b>{s.titel}</b>
                {s.text && <span className="pga-leise">{s.text}</span>}
                <Linien n={b.linien ?? 1} />
              </div>
            </div>
          ))}
        </div>
      )
    }
    case 'thermometer':
      return (
        <div className="pga-therm">
          <div className="roehre" />
          <div className="stufen">
            {b.stufen.map((s, i) => (
              <div key={i}>
                <b>{s.titel}</b>
                {s.text && <span className="pga-leise">{s.text}</span>}
                <i />
              </div>
            ))}
          </div>
        </div>
      )
    case 'vulkan':
    case 'eisberg':
    case 'koerper':
    case 'batterie':
    case 'waage': {
      const motiv = b.art === 'batterie' ? 'batterie' : b.art
      const zeilen: string[] =
        b.art === 'vulkan' ? (b.stufen ?? [{ titel: 'Ausbruch' }, { titel: 'Es brodelt' }, { titel: 'Ruhig' }]).map((s) => s.titel)
          : b.art === 'eisberg' ? [b.oben, b.unten]
            : b.art === 'batterie' ? [b.laden, b.leeren]
              : b.art === 'waage' ? [b.links, b.rechts]
                : (b.legende ?? []).map((l) => l.text)
      return (
        <div className="pga-modell">
          <Bild id={'motiv:' + motiv} p={p} className="pga-motiv" />
          <div className="zeilen">
            {b.art === 'koerper' && b.legende ? (
              <div className="pga-legende">{b.legende.map((l, i) => <span key={i}><i style={{ background: FARBE[l.farbe] }} />{l.text}</span>)}</div>
            ) : (
              zeilen.map((z, i) => (
                <div key={i}>
                  <b>{z}</b>
                  <Linien n={2} />
                </div>
              ))
            )}
            {b.art === 'koerper' && b.frage && <div className="pga-frage">{b.frage}</div>}
          </div>
        </div>
      )
    }
    case 'leiter':
    case 'zielscheibe':
    case 'hand':
    case 'mindmap':
      return (
        <div className="pga-box pga-generisch">
          <b>{b.art === 'leiter' ? (b.oben ?? 'Leiter') : b.art === 'zielscheibe' ? (b.mitte ?? 'Zielscheibe') : b.art === 'hand' ? (b.mitte ?? 'Hand') : b.mitte}</b>
          <Linien n={3} />
        </div>
      )
    case 'schritte':
      return (
        <ol className="pga-schritte">
          {b.items.map((s, i) => (
            <li key={i}>
              <b>{s.titel}</b>
              {s.text && <span className="pga-leise"> {s.text}</span>}
              <Linien n={b.linien ?? 0} />
            </li>
          ))}
        </ol>
      )
    case 'plan':
      return (
        <table className="pga-einsch">
          <thead>
            <tr><th>{b.ziel ?? ''}</th>{(b.tage ?? ['Mo', 'Di', 'Mi', 'Do', 'Fr']).map((t) => <th key={t}>{t}</th>)}</tr>
          </thead>
          <tbody>
            {b.zeilen.map((z, i) => (
              <tr key={i}><td>{z}</td>{(b.tage ?? ['Mo', 'Di', 'Mi', 'Do', 'Fr']).map((t) => <td key={t}><span /></td>)}</tr>
            ))}
          </tbody>
        </table>
      )
    case 'tagesplan':
      return (
        <div className="pga-sa">
          {b.zeilen.map((z, i) => (
            <div key={i}><span>{z.zeit}</span><span className="pga-text">{z.text}</span></div>
          ))}
        </div>
      )
    case 'atmen':
      return (
        <div className="pga-info">
          <b>Atmen: {b.uebung}</b>
          <span>Langsam ein – kurz halten – langsam aus.</span>
        </div>
      )
    case 'comic':
      return (
        <div className="pga-comic" style={{ gridTemplateColumns: `repeat(${b.spalten ?? Math.min(3, b.felder.length)}, 1fr)` }}>
          {b.felder.map((f, i) => (
            <div key={i} className="feld">
              {!f.leer && f.blase !== 'keine' && f.text !== undefined && <div className={'blase' + (f.text ? '' : ' leer')}>{f.text}</div>}
              {!f.leer && (
                <div className="figuren">
                  {(f.figuren ?? []).map((fig, j) => <Bild key={j} id={fig} p={p} className="fig" />)}
                </div>
              )}
              {f.untertitel && <span className="unter">{f.untertitel}</span>}
            </div>
          ))}
        </div>
      )
    case 'karten':
      return (
        <div className="pga-kartenreihe" style={{ gridTemplateColumns: `repeat(${b.spalten ?? Math.min(3, b.karten.length)}, 1fr)` }}>
          {b.karten.map((k, i) => (
            <div key={i}>
              {k.bild && <Bild id={k.bild} p={p} className="pga-kbild" />}
              {k.titel && <b>{k.titel}</b>}
              {k.text && <span>{k.text}</span>}
            </div>
          ))}
        </div>
      )
    case 'rueckblick':
      return (
        <div className="pga-rb">
          <b>{b.frage ?? 'So war die Stunde für mich:'}</b>
          <span className="gs">
            {(['froh', 'neutral', 'traurig'] as const).map((g) => <Gesicht key={g} g={g} p={p} />)}
          </span>
          <span className="gs-text">
            {['gut', 'okay', 'schwer'].map((t) => (
              <span key={t}>
                <i className="pga-kasten" />
                {t}
              </span>
            ))}
          </span>
        </div>
      )
    case 'notfall':
      return (
        <div className="pga-box">
          <b>Wenn es mir nicht gut geht</b>
          {b.text && <p>{b.text}</p>}
          {(b.eintraege ?? []).map((e, i) => <div key={i}>{e.name}: {e.nummer}</div>)}
          <Linien n={2} />
        </div>
      )
    default:
      break
  }
  // Neue Bausteinarten (Konzept 10) und alles Unbekannte
  const art = String(x.art)
  if (art === 'zielkarte') {
    return (
      <div className="pga-zielkarte">
        <div className="t">
          <small>Mein Ziel</small>
          <b>{String(x.text ?? x.ich ?? '')}</b>
        </div>
        <div className="kaestchen">{Array.from({ length: Number(x.kaestchen ?? 3) }, (_, i) => <span key={i} />)}</div>
      </div>
    )
  }
  if (art === 'wahlkarte') {
    const opt = (x.optionen as { bild?: string; text?: string }[] | undefined) ?? []
    return (
      <div>
        <div className="pga-frage">{String(x.text ?? x.titel ?? 'Heute möchte ich zuerst …')}</div>
        <div className="pga-bildwahl gross" style={{ gridTemplateColumns: `repeat(${Math.max(2, opt.length)}, 1fr)` }}>
          {(opt.length ? opt : [{ text: '' }, { text: '' }, { text: '' }]).map((o, i) => (
            <div key={i}>
              {o.bild ? <Bild id={o.bild} p={p} className="pga-img" /> : <span className="pga-bildleer" />}
              <span>{o.text}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (art === 'stundenleiste') {
    const s = (x.schritte as { bild?: string; text?: string }[] | undefined) ?? []
    return (
      <div className="pga-leiste">
        {s.map((y, i) => (
          <div key={i}>
            {y.bild && <Bild id={y.bild} p={p} className="pga-lbild" />}
            <span>{y.text}</span>
          </div>
        ))}
      </div>
    )
  }
  if (art === 'checkin') {
    return (
      <div className="pga-rb">
        <b>{String(x.text ?? x.frage ?? 'Wie geht es mir gerade?')}</b>
        <span className="gs">{(['froh', 'neutral', 'traurig', 'wuetend'] as const).map((g) => <Gesicht key={g} g={g} p={p} />)}</span>
      </div>
    )
  }
  if (art === 'abhaken') {
    const items = (x.items as string[] | undefined) ?? []
    return (
      <div className="pga-kreuz" style={{ gridTemplateColumns: '1fr' }}>
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    )
  }
  return (
    <div className="pga-box pga-generisch">
      <small>{art}</small>
      {typeof x.titel === 'string' && <b>{x.titel}</b>}
      {typeof x.text === 'string' && <p>{x.text}</p>}
      {Array.isArray(x.items) && <ul>{(x.items as string[]).map((t, i) => <li key={i}>{String(t)}</li>)}</ul>}
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------
// Seiten
// ---------------------------------------------------------------------------------------------------------------

interface Gruppe {
  teil: number
  bausteine: Baustein[]
}

export interface A4Props {
  zerlegt: ZerlegtesBlatt
  layout: Layout
  /** Zeile oben, z. B. „Passgenau · C3 · Üben“ */
  kopfzeile: string
  vorname?: string | null
  /** Blattnummern der Quellen („G-04 · S-18“) */
  quellen: string
  breite: number
  nurErste?: boolean
  onTeil?: (i: number) => void
  markiert?: number
  /** Name eines Teils für Screenreader */
  teilName?: (i: number) => string
  hinweis?: string
  /** „Mein Ziel“-Zeile (nur wenn die Fachkraft es einschaltet, E-M13) */
  ziel?: string | null
}

function bereichDef(id: string) {
  return bereichById.get(id as never) ?? BEREICHE[1]
}

function Kopf({ titel, untertitel, bereich, p, kopfzeile, vorname, erste, ziel }: { titel: string; untertitel?: string; bereich: ReturnType<typeof bereichDef>; p: Palette; kopfzeile: string; vorname?: string | null; erste: boolean; ziel?: string | null }) {
  const nd = (
    <span className="nd">
      <span>
        Name <i>{vorname ? <em>{vorname}</em> : null}</i>
      </span>
      <span>
        Datum <i className="k" />
      </span>
    </span>
  )
  if (!erste)
    return (
      <div className="pga-skopf">
        <span className="tag">Passgenau</span>
        <span>{titel}</span>
        {nd}
      </div>
    )
  return (
    <>
      <div className="pga-skopf">
        <span className="tag">Passgenau</span>
        <span>{kopfzeile}</span>
        {nd}
      </div>
      <div className="pga-strich" />
      <div className="pga-stitel">
        <div>
          <h1>{titel}</h1>
          {untertitel && <p>{untertitel}</p>}
        </div>
        <div className="leitbild">
          <ZeichnungSvg z={{ ...iconZeichnung(bereich.icon), w: 1.5 }} p={{ ...p, tinte: bereich.farben.tief }} />
        </div>
      </div>
      {ziel && (
        <div className="pga-zielzeile">
          <b>Mein Ziel:</b> {ziel}
        </div>
      )}
    </>
  )
}

export function A4Blatt(props: A4Props) {
  const { zerlegt, layout, kopfzeile, vorname, quellen, breite, nurErste, onTeil, markiert, teilName, hinweis, ziel } = props
  const blatt = zerlegt.blatt
  const bereich = bereichDef(blatt.bereich)
  const p = useMemo(() => palette(bereich.farben), [bereich])
  const inhalt = blatt.de
  const gruppen: Gruppe[] = useMemo(
    () => [
      ...zerlegt.kopf.map((b) => ({ teil: -1, bausteine: [b] })),
      ...zerlegt.teile.map((bs, i) => ({ teil: i, bausteine: bs })),
      ...zerlegt.fuss.map((b) => ({ teil: -1, bausteine: [b] })),
    ],
    [zerlegt],
  )
  // Nummern der Aufgaben fortlaufend über das ganze Blatt
  const nummern = useMemo(() => {
    let n = 0
    return gruppen.map((g) => g.bausteine.map((b) => (b.art === 'aufgabe' ? ++n : 0)))
  }, [gruppen])

  const messRef = useRef<HTMLDivElement>(null)
  const schluessel = JSON.stringify([blatt.de.titel, blatt.de.untertitel, gruppen, layout, vorname, ziel])
  const [seiten, setSeiten] = useState<{ key: string; seiten: number[][]; fuell: number[] }>({ key: '', seiten: [gruppen.map((_, i) => i)], fuell: [] })

  useLayoutEffect(() => {
    let aus = false
    const messen = () => {
      const el = messRef.current
      if (!el || aus) return
      const inh = el.querySelector<HTMLElement>('.pga-sinhalt')
      if (!inh) return
      const kopfH = inh.offsetTop
      const hs = Array.from(inh.children).map((c) => (c as HTMLElement).offsetHeight)
      const unten = (297 - 19) * MM
      const gap = 5 * MM
      const cap1 = unten - kopfH
      const capN = unten - 22 * MM
      const s: number[][] = [[]]
      const used = [0]
      hs.forEach((h, i) => {
        const k = s.length - 1
        const cap = k === 0 ? cap1 : capN
        const add = (s[k].length ? gap : 0) + h
        if (used[k] + add > cap && s[k].length) {
          s.push([i])
          used.push(h)
        } else {
          s[k].push(i)
          used[k] += add
        }
      })
      setSeiten({ key: schluessel, seiten: s, fuell: used.map((u, i) => u / (i === 0 ? cap1 : capN)) })
    }
    messen()
    document.fonts?.ready.then(() => !aus && messen()).catch(() => {})
    return () => {
      aus = true
    }
  }, [schluessel])

  const z = breite / (210 * MM)
  const n = seiten.seiten.length
  const zeigen = nurErste ? seiten.seiten.slice(0, 1) : seiten.seiten

  const gruppeHtml = (gi: number, klickbar: boolean) => {
    const g = gruppen[gi]
    const inhaltG = g.bausteine.map((b, j) => <BausteinHtml key={j} b={b} nr={nummern[gi][j]} p={p} />)
    if (!klickbar || g.teil < 0 || !onTeil)
      return (
        <div key={gi} className="pga-b">
          {inhaltG}
        </div>
      )
    const los = () => onTeil(g.teil)
    return (
      <div
        key={gi}
        className={'pga-b klick' + (markiert === g.teil ? ' markiert' : '')}
        role="button"
        tabIndex={0}
        data-teil={g.teil}
        aria-label={(teilName ? teilName(g.teil) : `Teil ${g.teil + 1}`) + ' – antippen zum Ersetzen'}
        data-hinweis={hinweis ?? 'Antippen: ersetzen'}
        onClick={los}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            los()
          }
        }}
      >
        {inhaltG}
      </div>
    )
  }

  const stil = { '--bf': bereich.farben.tief, '--bf-m': bereich.farben.mittel, '--bf-z': bereich.farben.zart } as React.CSSProperties
  return (
    <div className="pga-wrap">
      <div ref={messRef} className="pga-messen" aria-hidden="true">
        <div className={'pga-seite ' + layout} style={stil}>
          <Kopf titel={inhalt.titel} untertitel={inhalt.untertitel} bereich={bereich} p={p} kopfzeile={kopfzeile} vorname={vorname} erste ziel={ziel} />
          <div className="pga-sinhalt">{gruppen.map((_, i) => gruppeHtml(i, false))}</div>
        </div>
      </div>
      {zeigen.map((idx, s) => (
        <div key={s} className="pga-huelle" style={{ width: breite, height: 297 * MM * z }}>
          <div className={'pga-seite ' + layout} style={{ ...stil, transform: `scale(${z})` }} aria-label={`${inhalt.titel}, Seite ${s + 1} von ${n}`} role="group">
            <Kopf titel={inhalt.titel} untertitel={inhalt.untertitel} bereich={bereich} p={p} kopfzeile={kopfzeile} vorname={vorname} erste={s === 0} ziel={ziel} />
            <div className="pga-sinhalt">{idx.map((gi) => gruppeHtml(gi, true))}</div>
            <div className="pga-sfuss">
              <span className="logo" />
              <div>
                <b>CDSE Toolbox</b> · Passgenau · {inhalt.titel}
                {quellen && (
                  <>
                    <br />
                    Bausteine aus: {quellen}
                  </>
                )}
              </div>
              <span className="rechts">{n > 1 ? `Seite ${s + 1} / ${n}` : ''}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Miniatur eines einzelnen Bausteins (Alternativen, Suche) */
export function Miniatur({ bausteine, layout, bereich, breite = 300 }: { bausteine: Baustein[]; layout: Layout; bereich: string; breite?: number }) {
  const b = bereichDef(bereich)
  const p = palette(b.farben)
  const innen = 180
  const z = breite / (innen * MM)
  const ref = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(40 * MM)
  useLayoutEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight)
  }, [bausteine, layout])
  let n = 0
  return (
    <div className="pga-mini" style={{ width: breite, height: h * z + 2 }} aria-hidden="true">
      <div ref={ref} className={'pga-seite pga-seite-mini ' + layout} style={{ '--bf': b.farben.tief, '--bf-m': b.farben.mittel, '--bf-z': b.farben.zart, transform: `scale(${z})`, width: innen + 'mm' } as React.CSSProperties}>
        <div className="pga-sinhalt">
          <div className="pga-b">
            {bausteine.map((x, i) => (
              <BausteinHtml key={i} b={x} nr={x.art === 'aufgabe' ? ++n : 0} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
