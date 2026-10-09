// Passgenau – „Das weiß ich schon“ (2.2): alles aus dem Dossier, jede Angabe per Klick korrigierbar.
import { useState } from 'react'
import type { Auftrag, Profil } from '../typen'
import { usePg, useProfil, type Korrekturen } from './zustand'
import { Ic } from './zeichen'
import { Chip, HeikelBanner, Pill, PgDialog, Seg } from './Teile'
import { BILD, INTERESSEN, LAYOUT_NAME, LESEN, QUELLE_ZIEL, SCHREIBEN, SPRACHE_NAME, STUFEN, THEMA_ART, VORSICHT_NAME, datumKurz, heuteIso, themaName, zielKurz } from './texte'

function Zeile({ label, unter, children }: { label: React.ReactNode; unter?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="pg-pzeile">
      <span className="pl">
        {label}
        {unter && <small>{unter}</small>}
      </span>
      <span className="pr">{children}</span>
    </div>
  )
}

const HEIKEL: [NonNullable<Auftrag['heikel']>[number], string, string][] = [
  ['sexualitaet', 'Körper & Grenzen', 'Nur mit klarem Auftrag und nach Absprache mit der Responsable. Keine eigenen Erlebnisse erfragen; bei Hinweisen auf Grenzverletzungen das Verfahren des Hauses einhalten.'],
  ['kinderschutz', 'Gewalt/Vernachlässigung', 'Passgenau ersetzt keine Abklärung. Bei Hinweisen auf Gefährdung: dokumentieren, Leitung informieren, nicht selbst ermitteln.'],
  ['suizid', 'Selbstverletzung/Suizid', 'Keine Unterrichtsbausteine – nur die Hilfe-Zeile mit Notrufnummern und der Hinweis auf den Krisenplan. Bei akuter Gefahr: 112.'],
]

export function Wissen() {
  const pg = usePg()
  const p = useProfil()
  const roh = pg.roh as Profil
  const k = pg.korr
  const v = pg.vorname
  const [heikelFrage, setHeikelFrage] = useState<(typeof HEIKEL)[number] | null>(null)
  const quelle = (gruppe: string) => roh.wissen?.filter((w) => w.gruppe === gruppe).map((w) => w.text + (w.datum ? ` (${datumKurz(w.datum)})` : '') + (w.quelle && !w.text.includes(w.quelle) ? ` · ${w.quelle}` : ''))[0]
  const setZugang = (feld: 'lesen' | 'schreiben' | 'bild', w: number) =>
    pg.korrektur((x) => ({ ...x, zugang: { ...x.zugang, [feld]: w }, zugangBestaetigt: heuteIso() }), 'Gemerkt – gilt bei ' + v + ', bis eine neue Quelle kommt.')
  const umschalten = (f: (x: Korrekturen) => Korrekturen, m?: string) => pg.korrektur(f, m)
  const testAbgeleitet = roh.zugang.quelle.some((q) => q.startsWith('test'))
  const bestaetigt = p.zugangBestaetigt
  const ziele = [...roh.ziele].sort((a, b) => {
    const r = k.reihe ?? roh.ziele.map((z) => z.code)
    return (r.indexOf(a.code) + 1 || 99) - (r.indexOf(b.code) + 1 || 99)
  })
  const zurueckZiel = pg.herkunft === 'gruendlich' || pg.herkunft === 'schnell' || pg.herkunft === 'leicht' ? pg.herkunft : 'schnell'
  const zurueckText = { gruendlich: 'Gründlich planen', schnell: 'Schnell für heute', leicht: 'Heute geht nicht viel' }[zurueckZiel]
  const stufeAlt = roh.stufen[0]
  const iStufe = STUFEN.indexOf(p.stufen[0])
  const themenKeys = [...new Set(roh.themen.map((t) => t.key))]
  const heikelOffen = (p.achtung?.length ?? 0) > 0 || roh.vorsicht.includes('heikel')

  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Passgenau · {v}</div>
          <h1>Das weiß ich schon</h1>
          <p className="pg-lead">Alles kommt aus dem Dossier. Ein Klick korrigiert – die Korrektur bleibt bei {v} gespeichert, bis eine neue Quelle kommt.</p>
        </div>
        <div className="pg-btnrow">
          <button type="button" className="pg-btn" onClick={() => pg.setAnsicht(pg.herkunft === 'wissen' ? 'start' : pg.herkunft)}>
            <Ic n="zurueck" />
            Zurück
          </button>
          <button type="button" className="pg-btn primaer" onClick={() => pg.setAnsicht(zurueckZiel)}>
            Weiter: {zurueckText}
            <Ic n="pfeil" />
          </button>
        </div>
      </section>
      <HeikelBanner />
      <div className="pg-pgrid">
        <div className="pg-card pg-pkarte">
          <h3>
            <Ic n="person" />
            Alter und Gestaltung
          </h3>
          <Zeile label={`${roh.alterJahre} Jahre`} unter={quelle('alter') ?? 'Fiche de renseignement'}>
            <Pill>{p.stufen.join(', ')}</Pill>
          </Zeile>
          <Zeile label="Stufe des Blatts" unter={p.stufen[0] !== stufeAlt ? `korrigiert (aus dem Hub: ${stufeAlt})` : 'aus Alter und Klasse'}>
            <Seg
              label="Stufe"
              wert={p.stufen[0]}
              optionen={STUFEN.filter((_, i) => Math.abs(i - STUFEN.indexOf(stufeAlt)) <= 1).map((s) => [s, s] as [typeof s, string])}
              onWahl={(s) => umschalten((x) => ({ ...x, stufe: s === stufeAlt ? undefined : s }), `Stufe ${s} – Gestaltung „${LAYOUT_NAME[p.alterJahre >= 12 ? 'jugend' : s === 'C1' ? 'bild' : s === 'C2' ? 'gross' : 'mittel']}“.`)}
            />
          </Zeile>
          <Zeile label="Blatt-Gestaltung" unter={iStufe >= 0 ? 'Jugendliche bekommen nie kindliche Blätter' : ''}>
            <Pill art="akz">{LAYOUT_NAME[p.layout]}</Pill>
          </Zeile>
          <Zeile label="Sprache des Blatts" unter={quelle('sprache') ?? 'Fiche'}>
            <Seg label="Sprache des Blatts" wert={p.sprache.blatt} optionen={[['de', 'DE'], ['fr', 'FR']]} onWahl={(s) => umschalten((x) => ({ ...x, sprache: s }), s === 'fr' ? 'Französisch bevorzugt – wo es kein FR gibt, Abzeichen „nur DE“.' : 'Blatt auf Deutsch.')} />
          </Zeile>
          {p.sprache.blatt === 'fr' && (
            <Zeile label="Französisch" unter="„bevorzugt“: Bausteine nur auf Deutsch zählen weniger">
              <Seg label="Französisch" wert={k.nurFr ? 'nur' : 'bevorzugt'} optionen={[['bevorzugt', 'bevorzugt'], ['nur', 'nur FR']]} onWahl={(w) => umschalten((x) => ({ ...x, nurFr: w === 'nur' }))} />
            </Zeile>
          )}
          {roh.sprache.woerter.length > 0 && (
            <Zeile label="Wörterstreifen" unter="Wortspeicher auch in der Familiensprache">
              <Chip an={k.woerter !== false} onClick={() => umschalten((x) => ({ ...x, woerter: x.woerter === false }))}>
                {roh.sprache.woerter.map((w) => SPRACHE_NAME[w] ?? w.toUpperCase()).join(', ')}
              </Chip>
            </Zeile>
          )}
        </div>

        <div className={'pg-card pg-pkarte' + (testAbgeleitet && !bestaetigt ? ' pg-pruefen' : '')}>
          <h3>
            <Ic n="buch" />
            Lesen, Schreiben, Bilder
          </h3>
          <p className="pg-leise pg-klein pg-m0">{quelle('zugang') ?? (testAbgeleitet ? 'aus einem Testergebnis – die Werte bleiben im Hub' : 'aus Alter und Stufe')}</p>
          {testAbgeleitet && !bestaetigt && (
            <div className="pg-hinweisbox gelb">
              <Ic n="info" />
              <div>
                <b>Bitte einmal prüfen.</b> Aus einem Test abgeleitet – stimmt das für {v}? Erst nach deinem Klick wirkt es beim Planen.
                <div className="pg-btnrow pg-mt">
                  <button type="button" className="pg-btn klein primaer" onClick={() => umschalten((x) => ({ ...x, zugangBestaetigt: heuteIso() }), 'Bestätigt – gespeichert bei ' + v + '.')}>
                    <Ic n="check" />
                    Stimmt so
                  </button>
                </div>
              </div>
            </div>
          )}
          <Zeile label="Lesen">
            <Seg label="Lesen" wert={p.zugang.lesen} optionen={LESEN.map((t, i) => [i, t] as [number, string])} onWahl={(w) => setZugang('lesen', w)} />
          </Zeile>
          <Zeile label="Schreiben">
            <Seg label="Schreiben" wert={p.zugang.schreiben} optionen={SCHREIBEN.map((t, i) => [i, t] as [number, string])} onWahl={(w) => setZugang('schreiben', w)} />
          </Zeile>
          <Zeile label="Bilder">
            <Seg label="Bilder" wert={p.zugang.bild} optionen={BILD.slice(1).map((t, i) => [i + 1, t] as [number, string])} onWahl={(w) => setZugang('bild', w)} />
          </Zeile>
          <Zeile label="Tempo" unter="ruhig: kürzere Schritte, Beispiele Pflicht">
            <Chip an={p.zugang.tempo === 'ruhig'} onClick={() => umschalten((x) => ({ ...x, zugang: { ...x.zugang, tempo: p.zugang.tempo === 'ruhig' ? 'normal' : 'ruhig' } }))}>
              ruhig
            </Chip>
          </Zeile>
        </div>

        <div className="pg-card pg-pkarte">
          <h3>
            <Ic n="ziel" />
            Förderziele (ELDiB / PEI)
          </h3>
          {ziele.length === 0 && <p className="pg-leise">Noch keine Förderziele im Dossier. Beim Planen: „Worum soll es heute gehen?“</p>}
          {ziele.map((z, i) => {
            const an = k.ziele?.[z.code] !== false
            return (
              <Zeile key={z.code} label={<><b>{z.code}</b> {zielKurz(z.code)}</>} unter={`${QUELLE_ZIEL[z.quelle] ?? z.quelle}${z.seit ? ', ' + datumKurz(z.seit) : ''}`}>
                {i > 0 && (
                  <button type="button" className="pg-ibtn" aria-label={`${z.code} nach vorn`} title="nach vorn (Priorität)" onClick={() => umschalten((x) => { const r = [...ziele.map((y) => y.code)]; r.splice(i, 1); r.splice(i - 1, 0, z.code); return { ...x, reihe: r } })}>
                    <Ic n="auf" />
                  </button>
                )}
                <Chip an={an} onClick={() => umschalten((x) => ({ ...x, ziele: { ...x.ziele, [z.code]: !an } }), `Korrektur gespeichert bei ${v}.`)}>
                  {an ? 'an' : 'aus'}
                </Chip>
              </Zeile>
            )
          })}
          {roh.erreicht.length > 0 && (
            <Zeile label="Erreicht (Voraussetzungen)" unter="aus der letzten Einschätzung">
              <span className="pg-klein pg-leise">{roh.erreicht.join(' · ')}</span>
            </Zeile>
          )}
        </div>

        <div className="pg-card pg-pkarte">
          <h3>
            <Ic n="sprechblase" />
            Themen und Vorsicht
          </h3>
          {themenKeys.length === 0 && <p className="pg-leise">Keine Themen in den letzten 60 Tagen.</p>}
          {themenKeys.map((key) => {
            const an = k.themen?.[key] !== false
            const q = roh.themen.filter((t) => t.key === key).map((t) => `${THEMA_ART[t.art] ?? t.art} ${datumKurz(t.datum)}`).join(' · ')
            return (
              <Zeile key={key} label={themaName(key)} unter={q + ' · lokal erkannt, der Text bleibt im Hub'}>
                <Chip an={an} onClick={() => umschalten((x) => ({ ...x, themen: { ...x.themen, [key]: !an } }))}>
                  {an ? 'an' : 'aus'}
                </Chip>
              </Zeile>
            )
          })}
          {heikelOffen && (
            <Zeile label="Vorsicht: heikles Thema" unter="Hinweis im Dossier – nie automatisch als Stundenthema">
              <Pill art="warn">offen</Pill>
            </Zeile>
          )}
          {(['familie', 'trauer', 'koerper', 'reiz', 'trauma'] as const).map((key) => {
            const [name, text] = VORSICHT_NAME[key] ?? [key === 'reiz' ? 'Reize' : 'Trauma', key === 'reiz' ? 'leise, keine lauten Spiele, wenig Reize' : 'kein Wettkampf, keine Berührung, keine Gewaltbilder']
            const an = p.vorsicht.includes(key)
            const ausHub = roh.vorsicht.includes(key)
            if (!an && !ausHub && (key === 'familie' || key === 'trauer' || key === 'koerper')) {
              // Familie/Trauer/Körper kommen aus dem Hub; zeigen nur, wenn gesetzt oder korrigiert
              if (k.vorsicht?.[key] === undefined) return null
            }
            return (
              <Zeile key={key} label={`Vorsicht: ${name}`} unter={text + (ausHub ? ' · aus dem Dossier' : ' · nur du setzt es')}>
                <Chip an={an} onClick={() => umschalten((x) => ({ ...x, vorsicht: { ...x.vorsicht, [key]: !an } }))}>
                  {an ? 'an' : 'aus'}
                </Chip>
              </Zeile>
            )
          })}
          <div className="pg-pzeile spalte">
            <span className="pl">
              Heikle Themen freischalten
              <small>nur für diese Stunde, wird nicht beim Kind gespeichert</small>
            </span>
            <div className="pg-chips">
              {HEIKEL.map((h) => (
                <Chip key={h[0]} an={pg.heikel.includes(h[0])} onClick={() => (pg.heikel.includes(h[0]) ? pg.setHeikel(pg.heikel.filter((x) => x !== h[0])) : setHeikelFrage(h))}>
                  {h[1]}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="pg-card pg-pkarte">
          <h3>
            <Ic n="schild" />
            Was {v} hilft
          </h3>
          <p className="pg-leise pg-klein pg-m0">Nur du setzt das – nie automatisch aus Berichten.</p>
          {(
            [
              ['stundenleiste', 'Stundenleiste', 'Ablauf als Bilder fürs Kind, oben auf dem Blatt'],
              ['bewegungspausen', 'Bewegungspausen', 'nach jedem Block über 8 Min. eine kurze Pause'],
              ['reizarm', 'leise/reizarm', 'keine lauten Spiele, ruhiger Raum'],
              ['bildplan', 'Bildplan', 'Plan mit Piktogrammen für das Kind'],
            ] as const
          ).map(([key, name, text]) => {
            const an = (p.hilft ?? []).includes(key)
            return (
              <Zeile key={key} label={name} unter={text}>
                <Chip an={an} onClick={() => umschalten((x) => ({ ...x, hilft: { ...x.hilft, [key]: !an } }), `${name}: ${an ? 'aus' : 'an'} – gespeichert bei ${v}.`)}>
                  {an ? 'an' : 'aus'}
                </Chip>
              </Zeile>
            )
          })}
        </div>

        <div className="pg-card pg-pkarte">
          <h3>
            <Ic n="herz" />
            Interessen
          </h3>
          <p className="pg-leise pg-klein pg-m0">Einmal angeklickt, bleiben sie bei {v}. Sie dürfen aufs Blatt (Beispiele, Bilder).</p>
          <div className="pg-chips pg-mt">
            {INTERESSEN.map(([key, name]) => {
              const an = p.interessen.includes(key)
              return (
                <Chip key={key} an={an} onClick={() => umschalten((x) => ({ ...x, interessen: an ? p.interessen.filter((i) => i !== key) : [...p.interessen, key] }))}>
                  {name}
                </Chip>
              )
            })}
          </div>
        </div>

        <div className="pg-card pg-pkarte">
          <h3>
            <Ic n="check" />
            Schon gemacht und gelernt
          </h3>
          {roh.gemacht.length === 0 && <p className="pg-leise">Noch nichts gemacht.</p>}
          {roh.gemacht.map((g) => {
            const frei = !!k.frei?.[g.id]
            return (
              <Zeile key={g.id} label={g.id.replace(/^blatt:/, '').replace(/-/g, ' ')} unter={`gemacht am ${datumKurz(g.am)} · 42 Tage kein Vorschlag`}>
                <Chip an={frei} onClick={() => umschalten((x) => ({ ...x, frei: { ...x.frei, [g.id]: !frei } }))}>
                  {frei ? 'darf wieder' : 'gesperrt'}
                </Chip>
              </Zeile>
            )
          })}
          <Zeile label={`Was bei ${v} funktioniert`} unter="aus Rückmeldungen nach Stunden">
            <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('gelernt')}>
              Ansehen
            </button>
          </Zeile>
          <Zeile label={`Passgenau lernt bei ${v} mit`} unter={pg.schalter.lernen ? 'aus: keine Rückmeldungen und Vorlieben beim Kind – Plan und Notiz bleiben' : 'im Hub ausgeschaltet'}>
            <Chip an={pg.lernenKind} disabled={!pg.schalter.lernen} onClick={() => umschalten((x) => ({ ...x, lernen: !pg.lernenKind }), pg.lernenKind ? `Passgenau lernt bei ${v} nicht mehr mit.` : `Passgenau lernt bei ${v} wieder mit.`)}>
              {pg.lernenKind ? 'an' : 'aus'}
            </Chip>
          </Zeile>
        </div>
      </div>
      <div className="pg-hinweisbox pg-mt2">
        <Ic n="schloss" />
        <div>
          <b>Was aufs Blatt des Kindes darf:</b> nur der Ich-Satz des Ziels, Interessen, das Wochenziel – und der Vorname, wenn du es einschaltest.
          <div className="pg-chips pg-mt">
            <Chip an={pg.druck.vorname} onClick={() => { pg.setDruck((d) => ({ ...d, vorname: !d.vorname })); umschalten((x) => ({ ...x, vorname: !pg.druck.vorname })) }}>
              Vorname einsetzen: {pg.druck.vorname ? 'an' : 'aus'}
            </Chip>
            <Chip an={pg.druck.ziel} disabled={p.alterJahre >= 12} titel={p.alterJahre >= 12 ? 'bei Jugendlichen nie' : undefined} onClick={() => pg.setDruck((d) => ({ ...d, ziel: !d.ziel }))}>
              „Mein Ziel“ aufs Blatt: {pg.druck.ziel && p.alterJahre < 12 ? 'an' : 'aus'}
            </Chip>
          </div>
          <span className="pg-leise">Testwerte, Diagnosen, Familie und Notiztexte verlassen den Hub nie. Die Toolbox bekommt nur „eher wenig Text, viele Bilder“ – nicht warum.</span>
        </div>
      </div>
      {heikelFrage && (
        <PgDialog
          titel={`Heikles Thema: ${heikelFrage[1]}`}
          unter="Nur für diese Stunde – wird nicht beim Kind gespeichert."
          onClose={() => setHeikelFrage(null)}
          schmal
          fuss={
            <>
              <button type="button" className="pg-btn" onClick={() => setHeikelFrage(null)}>
                Abbrechen
              </button>
              <button
                type="button"
                className="pg-btn primaer"
                onClick={() => {
                  pg.setHeikel([...pg.heikel, heikelFrage[0]])
                  setHeikelFrage(null)
                  pg.hinweisZeigen(`${heikelFrage[1]}: nur für diese Stunde freigeschaltet.`, 'info')
                }}
              >
                Nur für diese Stunde freischalten
              </button>
            </>
          }
        >
          <div className="pg-hinweisbox gelb">
            <Ic n="schild" />
            <div>{heikelFrage[2]}</div>
          </div>
        </PgDialog>
      )}
    </>
  )
}
