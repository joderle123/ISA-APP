// Passgenau – Kurs-Bibliothek (22.10.2026): alle Einzelkurse nach Thema und Alter, jeder Kurs als Ganzes mit Sitzungen, Blättern,
// Tausch-Übungen, Ritualen, Begründung und Quellen; „Kurs starten“ baut die Folge genau mit diesem Kurs (Auftrag.kurs).
// Rückmeldung: „fertige Kurse zu allen Themen – ich habe sie nie gefunden“.
import { useEffect, useMemo, useState } from 'react'
import type { Auftrag, Sprache } from '../typen'
import * as K from './kern'
import { usePg } from './zustand'
import { Ic } from './zeichen'
import { Chip, Seg } from './Teile'
import { heuteIso, zielKurz } from './texte'
import { ZeichnungSvg } from '../../blatt/ZeichnungSvg'
import { bildZeichnung, palette } from '../../blatt/zeichnung'
import { dauerVorgabe } from './Wege'
import { HilfenBlock } from './Stundenbild'
import { pdfOeffnen } from './anzeige'

const BAENDER: [number, number][] = [
  [4, 6],
  [7, 9],
  [10, 12],
  [13, 16],
]

function mische(a: string, b: string, t: number): string {
  const n = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const x = n(a)
  const y = n(b)
  return '#' + x.map((v, i) => Math.round(v * (1 - t) + y[i] * t).toString(16).padStart(2, '0')).join('')
}

/** Titelbild eines Kurses: das Motiv des Themas auf seiner Farbe */
export function KursBild({ thema, gross }: { thema: string; gross?: boolean }) {
  const t = K.kursThema(thema)
  const z = bildZeichnung(('motiv:' + t.motiv) as Parameters<typeof bildZeichnung>[0])
  const f = { tief: t.farbe[0], mittel: mische(t.farbe[0], t.farbe[1], 0.55), zart: t.farbe[1] }
  return (
    <span className={'pg-kb-bild' + (gross ? ' gross' : '')} style={{ background: `radial-gradient(circle at 30% 25%, #fff 0%, ${f.zart} 62%)`, borderColor: f.mittel }} aria-hidden="true">
      {z.formen.length ? <ZeichnungSvg z={z} p={palette(f)} /> : <Ic n="buch" />}
    </span>
  )
}

/** Kurs, den die Startseite öffnen will (Karte „Passend für …“) */
let kursOeffnen: string | null = null

function band(k: K.KursInfo): string {
  return `${k.von}–${k.bis} J.`
}

export function Kurse() {
  const pg = usePg()
  const p = pg.profil
  const mitKind = !!p && !pg.ohneKind
  const kurse = useMemo(() => (pg.katalog ? K.kursListe(pg.katalog) : []), [pg.katalog])
  const eigenesBand = p ? BAENDER.findIndex(([v, b]) => p.alterJahre >= v && p.alterJahre <= b) : -1
  const [alter, setAlter] = useState<number>(mitKind ? eigenesBand : -1)
  const [thema, setThema] = useState<string | null>(null)
  const [suche, setSuche] = useState('')
  const [offen, setOffen] = useState<string | null>(() => {
    const id = kursOeffnen
    kursOeffnen = null
    return id
  })
  const sichtbar = kurse.filter((k) => {
    if (alter >= 0 && (k.von !== BAENDER[alter][0] || k.bis !== BAENDER[alter][1])) return false
    if (thema && k.thema !== thema) return false
    const q = suche.trim().toLowerCase()
    if (q) {
      const t = K.kursThema(k.thema)
      const text = [k.name.de, k.name.fr, t.de, t.fr, k.ziel?.de, k.stichwort?.de, ...k.sitzungen.map((s) => s.titel.de), ...k.eldib].join(' ').toLowerCase()
      if (!text.includes(q)) return false
    }
    return true
  })
  const themen = [...new Set(kurse.map((k) => k.thema))]
  const offenK = kurse.find((k) => k.id === offen)
  if (!pg.katalog) return <p className="pg-leise pg-mt">Kurse werden geladen …</p>
  if (offenK) return <KursSeite k={offenK} zurueck={() => setOffen(null)} />
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Fertige Kurse</div>
          <h1>Kurse für jedes Thema</h1>
          <p className="pg-lead">
            {kurse.length} Kurse zu {themen.length} Themen. Jeder Kurs ist als Ganzes geschrieben: dieselben Rituale, ein roter Faden, jede Sitzung baut auf der
            letzten auf – mit Anleitung, Blatt und Tausch-Übungen, auf Deutsch und Französisch.
          </p>
        </div>
      </section>
      <div className="pg-card pg-kb-filter">
        <div className="pg-chips" role="group" aria-label="Alter">
          <Chip an={alter < 0} onClick={() => setAlter(-1)}>
            Alle Alter
          </Chip>
          {BAENDER.map(([v, b], i) => (
            <Chip key={v} an={alter === i} klein={i === eigenesBand && mitKind ? pg.kind.nom : undefined} onClick={() => setAlter(i)}>
              {v}–{b} Jahre
            </Chip>
          ))}
        </div>
        <label className="pg-kb-suche">
          <Ic n="lupe" />
          <input type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Thema, Stichwort oder ELDiB-Code" aria-label="Kurse durchsuchen" />
        </label>
        <div className="pg-kb-themen" role="group" aria-label="Thema">
          <button type="button" className={'pg-kb-thema' + (!thema ? ' an' : '')} aria-pressed={!thema} onClick={() => setThema(null)}>
            <span className="pg-kb-thema-alle">
              <Ic n="liste" />
            </span>
            Alle Themen
          </button>
          {themen.map((t) => (
            <button key={t} type="button" className={'pg-kb-thema' + (thema === t ? ' an' : '')} aria-pressed={thema === t} onClick={() => setThema(thema === t ? null : t)}>
              <KursBild thema={t} />
              {K.kursThema(t).de}
            </button>
          ))}
        </div>
      </div>
      {sichtbar.length === 0 ? (
        <p className="pg-leise pg-mt">Kein Kurs passt zu dieser Auswahl.</p>
      ) : (
        <div className="pg-kb-raster">
          {sichtbar.map((k) => (
            <button key={k.id} type="button" className="pg-kb-karte" onClick={() => { setOffen(k.id); window.scrollTo({ top: 0 }) }}>
              <span className="pg-kb-deckel" style={{ background: K.kursThema(k.thema).farbe[1] }}>
                <KursBild thema={k.thema} />
                <span className="pg-kb-band">{band(k)}</span>
              </span>
              <span className="pg-kb-text">
                <small style={{ color: K.kursThema(k.thema).farbe[0] }}>{K.kursThema(k.thema).de}</small>
                <b>{k.name.de}</b>
                {k.ziel && <span className="pg-kb-ziel">{k.ziel.de}</span>}
                <span className="pg-kb-meta">
                  <Ic n="liste" />
                  {k.sitzungen.length} Sitzungen · Blatt je Sitzung · {k.sitzungen.reduce((s, x) => s + x.tausch.length, 0)} Tausch-Übungen
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function KursSeite({ k, zurueck }: { k: K.KursInfo; zurueck: () => void }) {
  const pg = usePg()
  const p = pg.profil
  const mitKind = !!p && !pg.ohneKind
  const t = K.kursThema(k.thema)
  const [sprache, setSprache] = useState<Sprache>(p?.sprache.blatt ?? 'de')
  const [warte, setWarte] = useState(false)
  const passtAlter = !p || pg.ohneKind || (p.alterJahre >= k.von - 1 && p.alterJahre <= k.bis + 1)
  const auftrag = (ziele: string[], dauer: Auftrag['dauer']): Auftrag => ({
    weg: 'gruendlich', ziele, n: Math.min(10, k.sitzungen.length), dauer, sozialform: 'einzeln', blatt: 'mit', sprache, datum: heuteIso(), kurs: k.id,
  })
  // ohne Kind: erst das Profil aus Alter, Sprache und den Zielen des Kurses, dann (nach dem Rendern) die Folge
  useEffect(() => {
    if (!warte || !pg.profil || !pg.ohneKind) return
    setWarte(false)
    pg.planBauen(auftrag(k.eldib.slice(0, 2), dauerVorgabe(pg.profil)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warte, pg.profil, pg.ohneKind])
  const starten = () => {
    if (mitKind && p) {
      const eigene = p.ziele.map((z) => z.code).filter((c) => k.eldib.includes(c))
      pg.planBauen(auftrag(eigene.length ? eigene.slice(0, 3) : k.eldib.slice(0, 2), dauerVorgabe(p)), { profilOhneFolge: true })
      return
    }
    const roh = K.ohneKindProfil({ alterJahre: Math.round((k.von + k.bis) / 2), sprache, ziele: k.eldib.slice(0, 2) })
    pg.setRoh({ ...roh, vorname: undefined })
    pg.setOhneKind(true)
    setWarte(true)
  }
  // Kursmappe direkt (23.10.2026: „fertiger Kurs, wo man loslegen kann“): ohne Kind und ohne Planen die ganze Mappe als PDF –
  // Deckblatt, je Sitzung Startseite, Blatt und Karten, hinten die Zusatzinfo
  const [druckt, setDruckt] = useState(false)
  const [weltAuf, setWeltAuf] = useState(false)
  const mappe = async () => {
    if (!pg.katalog || druckt) return
    setDruckt(true)
    pg.hinweisZeigen(sprache === 'fr' ? 'Le dossier du cours est en préparation …' : 'Die Kursmappe wird erstellt …', 'info')
    try {
      const profil = K.ohneKindProfil({ alterJahre: Math.round((k.von + k.bis) / 2), sprache, ziele: k.eldib.slice(0, 2) })
      const plan = K.planen(pg.katalog, profil, auftrag(k.eldib.slice(0, 2), dauerVorgabe(profil)), pg.vor, { plaene: [], ereignisse: [] })
      const blob = await K.pdfFolge(pg.katalog, profil, plan, { sprache, warum: false })
      const name = `Kursmappe-${k.id.replace(/^kurs-/, '')}-${sprache}.pdf`
      const pdf = pdfOeffnen(blob, name)
      pg.hinweisZeigen(pdf.geoeffnet ? 'Die Kursmappe ist fertig.' : 'Die Kursmappe ist fertig – der Browser hat sie heruntergeladen.', 'ok', { label: 'PDF öffnen', aktion: () => void pdf.nochmal() }, 12000, name)
    } catch {
      pg.hinweisZeigen('Die Kursmappe ließ sich nicht erstellen. Bitte noch einmal versuchen.', 'warn')
    } finally {
      setDruckt(false)
    }
  }
  const sp = sprache
  return (
    <>
      <button type="button" className="pg-link pg-kb-zurueck" onClick={zurueck}>
        <Ic n="zurueck" />
        Alle Kurse
      </button>
      <section className="pg-kb-held" style={{ ['--kb-t' as string]: t.farbe[0], ['--kb-z' as string]: t.farbe[1] }}>
        <KursBild thema={k.thema} gross />
        <div className="pg-kb-held-text">
          <div className="pg-eyebrow">
            Kurs · {t.de} · {band(k)}
          </div>
          <h1>{k.name[sp]}</h1>
          {sp === 'de' && k.name.fr !== k.name.de && <p className="pg-leise pg-kb-fr">{k.name.fr}</p>}
          {k.ziel && <p className="pg-kb-held-ziel">{k.ziel[sp]}</p>}
          {/* die Geschichte des Kurses erst auf Wunsch ganz (23.10.2026: „zu viele Erklärungen, man verliert die Übersicht“) */}
          {k.welt && (
            <p className={'pg-kb-welt' + (weltAuf ? ' auf' : '')}>
              <Ic n="stern" />
              <span>
                <span className="pg-kb-welt-text">{k.welt[sp]}</span>
                <button type="button" className="pg-link pg-kb-welt-mehr" aria-expanded={weltAuf} onClick={() => setWeltAuf(!weltAuf)}>
                  {weltAuf ? 'Weniger' : 'Geschichte ganz lesen'}
                </button>
              </span>
            </p>
          )}
          {k.stichwort && (
            <p className="pg-kb-werkzeug">
              <Ic n="griff" />
              <span>{k.stichwort[sp]}</span>
            </p>
          )}
          <div className="pg-btnrow pg-mt">
            <button type="button" className="pg-btn primaer gross" onClick={starten}>
              <Ic n="pfeil" />
              {mitKind ? `Kurs mit ${pg.kind.dat} starten` : 'Kurs als Folge planen'}
            </button>
            <button type="button" className="pg-btn gross" onClick={() => void mappe()} disabled={druckt} aria-busy={druckt}>
              <Ic n="datei" />
              {druckt ? 'Kursmappe wird erstellt …' : 'Kursmappe als PDF'}
            </button>
            <Seg label="Sprache der Blätter" wert={sprache} optionen={[['de', 'Deutsch'], ['fr', 'Français']]} onWahl={setSprache} />
          </div>
          {mitKind && !passtAlter && <p className="pg-leise pg-klein pg-mt">Dieser Kurs ist für {band(k)} geschrieben – {pg.kind.nom} ist {p!.alterJahre} Jahre alt.</p>}
          <p className="pg-leise pg-klein pg-mt">
            {k.sitzungen.length} Sitzungen · Anfang und Schluss in jeder Sitzung gleich · Passgenau wählt je Sitzung die Variante, die zu Lesen und Schreiben passt
          </p>
        </div>
      </section>
      <div className="pg-kb-zwei">
        <div>
          <h2 className="pg-abschnitt">So läuft der Kurs</h2>
          <ol className="pg-kb-sitzungen">
            {k.sitzungen.map((s) => (
              <li key={s.nr} style={{ ['--kb-t' as string]: t.farbe[0], ['--kb-z' as string]: t.farbe[1] }}>
                <span className="pg-kb-nr">{s.nr}</span>
                <div>
                  <b>{s.titel[sp]}</b>
                  {s.plan && <p>{s.plan[sp]}</p>}
                  <div className="pg-kb-zeile">
                    {s.blatt && (
                      <span className="pg-kb-chip">
                        <Ic n="datei" />
                        Blatt „{s.blatt[sp]}“
                      </span>
                    )}
                    <span className="pg-kb-chip">
                      <Ic n="uhr" />
                      Übung ca. {s.minuten} Min.
                    </span>
                    {s.varianten > 1 && (
                      <span className="pg-kb-chip">
                        <Ic n="tausch" />
                        {s.varianten} Varianten
                      </span>
                    )}
                  </div>
                  {s.hilfen && <HilfenBlock h={(sp === 'fr' ? s.hilfen.fr : undefined) ?? s.hilfen.de} />}
                  {s.tausch.length > 0 && (
                    <p className="pg-kb-tausch">
                      Oder mit einer anderen Methode: {s.tausch.map((x) => (x.titel[sp].startsWith(s.titel[sp]) ? x.titel[sp].slice(s.titel[sp].length).replace(/^[\s:–-]+/, '') : x.titel[sp]) || x.titel[sp]).join(' · ')}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="pg-kb-seite">
          {(k.rituale.ankommen || k.rituale.abschluss) && (
            <div className="pg-card">
              <h3>In jeder Sitzung gleich</h3>
              <ul className="pg-kb-liste">
                {k.rituale.ankommen && (
                  <li>
                    <b>Anfang:</b> {k.rituale.ankommen[sp]}
                  </li>
                )}
                {k.rituale.abschluss && (
                  <li>
                    <b>Schluss:</b> {k.rituale.abschluss[sp]}
                  </li>
                )}
              </ul>
            </div>
          )}
          {k.warum && (
            <div className="pg-card">
              <h3>Warum der Kurs wirkt</h3>
              <p className="pg-kb-absatz">{k.warum[sp]}</p>
              {k.quellen.length > 0 && (
                <details className="pg-kb-quellen">
                  <summary>Quellen ({k.quellen.length})</summary>
                  <ul>
                    {k.quellen.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
          {k.achtung[sp].length > 0 && (
            <div className="pg-card pg-kb-achtung">
              <h3>
                <Ic n="info" />
                Darauf achten
              </h3>
              <ul className="pg-kb-liste">
                {k.achtung[sp].map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="pg-card">
            {k.felder.length > 0 && (
              <>
                <h3>Nationaler Rahmenplan</h3>
                <div className="pg-rp pg-mb">
                  {k.felder.map((id) => {
                    const f = K.FELDER.find((x) => x.id === id)!
                    return (
                      <span key={id} className="pg-rp-feld" style={{ background: f.farbe[1], color: f.farbe[0] }} title={`${f.de} · ${f.fr}`}>
                        {f.kurz}
                      </span>
                    )
                  })}
                </div>
              </>
            )}
            <h3>ELDiB-Ziele</h3>
            <ul className="pg-kb-liste">
              {k.eldib.slice(0, 5).map((c) => (
                <li key={c}>
                  <b>{c}</b> {zielKurz(c)}
                </li>
              ))}
            </ul>
            {k.material.length > 0 && (
              <>
                <h3 className="pg-mt">Material</h3>
                <p className="pg-kb-absatz">{k.material.map((m) => K.materialName(pg.katalog!, m, sp)).join(' · ')}</p>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}

/** Karte auf der Startseite: die Bibliothek sichtbar machen, mit bis zu drei Kursen, die zum Kind passen (Alter, Ziele) */
export function KursHinweis() {
  const pg = usePg()
  const p = pg.profil
  const kurse = useMemo(() => (pg.katalog ? K.kursListe(pg.katalog) : []), [pg.katalog])
  if (!kurse.length) return null
  const mitKind = !!p && !pg.ohneKind
  const passend = p
    ? kurse
        .filter((k) => p.alterJahre >= k.von && p.alterJahre <= k.bis)
        .map((k) => ({ k, w: p.ziele.reduce((s, z, i) => s + (k.eldib.includes(z.code) ? 1 / (i + 1) : 0), 0) }))
        .filter((x) => x.w > 0 || !p.ziele.length)
        .sort((a, b) => b.w - a.w)
        .slice(0, 3)
        .map((x) => x.k)
    : []
  const themen = new Set(kurse.map((k) => k.thema)).size
  return (
    <section className="pg-kb-hinweis" aria-labelledby="pg-kb-hinweis-t">
      <div className="pg-kb-hinweis-kopf">
        <span className="pg-kb-stapel" aria-hidden="true">
          {['gefuehle', 'medien', 'mut'].map((t) => (
            <KursBild key={t} thema={t} />
          ))}
        </span>
        <div>
          <h2 id="pg-kb-hinweis-t">Fertige Kurse</h2>
          <p>
            {kurse.length} Kurse zu {themen} Themen – jeder als Ganzes geschrieben, mit Blatt je Sitzung.
            {mitKind && passend.length ? ` Passend für ${pg.kind.akk}:` : ''}
          </p>
        </div>
        <button type="button" className="pg-btn" onClick={() => pg.setAnsicht('kurse')}>
          <Ic n="buch" />
          Alle Kurse
        </button>
      </div>
      {mitKind && passend.length > 0 && (
        <div className="pg-kb-mini">
          {passend.map((k) => (
            <button key={k.id} type="button" className="pg-kb-minikarte" onClick={() => { kursOeffnen = k.id; pg.setAnsicht('kurse') }}>
              <KursBild thema={k.thema} />
              <span>
                <b>{k.name.de}</b>
                <small>
                  {K.kursThema(k.thema).de} · {k.sitzungen.length} Sitzungen · {k.eldib.filter((c) => p!.ziele.some((z) => z.code === c)).join(', ')}
                </small>
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
