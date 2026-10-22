// Passgenau – Planen nach Aktivität (22.10.2026): „Ich will mit den Kindern ein Experiment machen – zum Thema Wut.“
// Kachel antippen (Form), dann entweder ein Förderziel oder ein Thema, Ort, Dauer, Gruppe – der Planer baut die Stunde im
// Bogen der Form (kern/formen.ts).
import { useState } from 'react'
import type { Auftrag } from '../typen'
import * as K from './kern'
import { usePg, useProfil } from './zustand'
import { Ic } from './zeichen'
import { Chip, Seg, VersionsBanner } from './Teile'
import { SOZIALFORM_NAME, THEMA_NAME, heuteIso, zielKurz } from './texte'
import { ZeichnungSvg } from '../../blatt/ZeichnungSvg'
import { bildZeichnung, palette } from '../../blatt/zeichnung'
import { dauerVorgabe } from './Wege'

type Dauer = Auftrag['dauer']
const THEMEN: [string, string][] = [
  ['kompetenz:Gefühle erkennen', 'Gefühle'],
  ['wut', 'Wut'],
  ['angst', 'Angst & Mut'],
  ['freundschaft', 'Freundschaft'],
  ['kompetenz:Konflikte', 'Streit lösen'],
  ['kompetenz:Kooperation', 'Zusammenarbeit'],
  ['kompetenz:Kommunikation', 'Sich mitteilen'],
  ['selbstwert', 'Selbstwert'],
  ['kompetenz:Selbstregulation', 'Ruhig werden'],
  ['kompetenz:Impulskontrolle', 'Stopp sagen'],
  ['konzentration', 'Konzentration'],
  ['medien', 'Handy & Medien'],
  ['veraenderung', 'Veränderung'],
  ['trauer', 'Trauer & Abschied'],
]

function mische(a: string, b: string, t: number): string {
  const n = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const x = n(a)
  const y = n(b)
  return '#' + x.map((v, i) => Math.round(v * (1 - t) + y[i] * t).toString(16).padStart(2, '0')).join('')
}

function FormBild({ f }: { f: K.Unterrichtsform }) {
  const z = bildZeichnung(('motiv:' + f.motiv) as Parameters<typeof bildZeichnung>[0])
  const fa = { tief: f.farbe[0], mittel: mische(f.farbe[0], f.farbe[1], 0.55), zart: f.farbe[1] }
  return (
    <span className="pg-fo-bild" style={{ background: '#fff', borderColor: fa.mittel }} aria-hidden="true">
      {z.formen.length ? <ZeichnungSvg z={z} p={palette(fa)} /> : <Ic n="stern" />}
    </span>
  )
}

export function Formen() {
  const pg = usePg()
  const p = useProfil()
  const k = pg.kind
  const [form, setForm] = useState<K.FormId | null>(null)
  const f = K.formVon(form ?? undefined)
  const [wozu, setWozu] = useState<'ziel' | 'thema'>(p.ziele.length ? 'ziel' : 'thema')
  const [ziele, setZiele] = useState<string[]>(() => p.ziele.slice(0, 1).map((z) => z.code))
  const [thema, setThema] = useState<string[]>([])
  const [dauer, setDauer] = useState<Dauer>(() => dauerVorgabe(p, pg.hallo?.ich?.funktion))
  const [ort, setOrt] = useState<'raum' | 'turnhalle' | 'draussen' | 'kueche'>('raum')
  const [blatt, setBlatt] = useState<'mit' | 'ohne'>('ohne')
  const waehle = (x: K.Unterrichtsform) => {
    setForm(x.id)
    setOrt(x.ort ?? 'raum')
    setBlatt(p.alterJahre <= 5 ? 'ohne' : x.blatt)
    window.setTimeout(() => document.getElementById('pg-fo-wahl')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }
  const bereit = !!f && (wozu === 'ziel' ? ziele.length > 0 : thema.length > 0)
  const bauen = () => {
    if (!f) return
    pg.planBauen(
      {
        weg: 'schnell', ziele: wozu === 'ziel' ? ziele : [], n: 1, dauer, sozialform: pg.sozialform, blatt, sprache: p.sprache.blatt, datum: heuteIso(),
        heute: { energie: 4, konzentration: 4, stimmung: 4 }, form: f.id, thema: wozu === 'thema' ? thema : undefined, ort: ort === 'raum' ? undefined : [ort],
      },
      { profilOhneFolge: true },
    )
  }
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Nach Aktivität planen</div>
          <h1>{pg.ohneKind ? 'Was wollt ihr heute machen?' : `Was machst du heute mit ${k.dat}?`}</h1>
          <p className="pg-lead">Tippe an, was ihr machen wollt – Passgenau baut die Stunde in dieser Form, zum Förderziel oder zu einem Thema.</p>
        </div>
      </section>
      <VersionsBanner />
      <div className="pg-fo-raster" role="group" aria-label="Unterrichtsform">
        {K.FORMEN.map((x) => {
          const zuJung = !!x.ab && p.alterJahre < x.ab
          return (
            <button key={x.id} type="button" className={'pg-fo-kachel' + (form === x.id ? ' an' : '')} aria-pressed={form === x.id} disabled={zuJung} title={zuJung ? `ab ${x.ab} Jahren` : undefined} onClick={() => waehle(x)} style={{ ['--fo-t' as string]: x.farbe[0], ['--fo-z' as string]: x.farbe[1] }}>
              <FormBild f={x} />
              <b>{x.name.de}</b>
              <small>{zuJung ? `ab ${x.ab} Jahren` : x.satz.de}</small>
              {form === x.id && (
                <span className="pg-fo-haken" aria-hidden="true">
                  <Ic n="check" />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {f && (
        <div id="pg-fo-wahl" className="pg-fgrid pg-mt2">
          <div className="pg-card">
            <div className="pg-fblock">
              <h3>
                <span className="nr">1</span>Wozu?
              </h3>
              <Seg label="Wozu" wert={wozu} optionen={[['ziel', 'Förderziel'], ['thema', 'Thema']]} onWahl={setWozu} />
              {wozu === 'ziel' ? (
                p.ziele.length ? (
                  <div className="pg-chips pg-mt">
                    {p.ziele.map((z) => {
                      const i = ziele.indexOf(z.code)
                      return (
                        <Chip key={z.code} an={i >= 0} onClick={() => setZiele((l) => (i >= 0 ? l.filter((c) => c !== z.code) : l.length < 2 ? [...l, z.code] : [l[1], z.code]))}>
                          <b>{z.code}</b>&nbsp;{zielKurz(z.code)}
                        </Chip>
                      )
                    })}
                  </div>
                ) : (
                  <p className="pg-leise pg-klein pg-mt">Noch keine Förderziele – wähle ein Thema.</p>
                )
              ) : (
                <div className="pg-chips pg-mt">
                  {THEMEN.map(([key, name]) => (
                    <Chip key={key} an={thema.includes(key)} onClick={() => setThema((l) => (l.includes(key) ? l.filter((x) => x !== key) : l.length < 2 ? [...l, key] : [l[1], key]))}>
                      {name}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
            <div className="pg-fblock">
              <h3>
                <span className="nr">2</span>Rahmen
              </h3>
              <div className="pg-chips pg-mb" role="group" aria-label="Dauer">
                {([15, 20, 30, 45, 60] as Dauer[]).map((d) => (
                  <Chip key={d} an={dauer === d} onClick={() => setDauer(d)}>
                    {d} Min.
                  </Chip>
                ))}
              </div>
              <div className="pg-chips pg-mb" role="group" aria-label="Ort">
                {(
                  [
                    ['raum', 'im Raum'],
                    ['turnhalle', 'Turnhalle'],
                    ['draussen', 'draußen'],
                    ['kueche', 'Küche'],
                  ] as const
                ).map(([o, t]) => (
                  <Chip key={o} an={ort === o} onClick={() => setOrt(o)}>
                    {t}
                  </Chip>
                ))}
              </div>
              <div className="pg-chips pg-mb" role="group" aria-label="Gruppe">
                {(['einzeln', 'zu-zweit', 'kleingruppe'] as const).map((s) => (
                  <Chip key={s} an={pg.sozialform === s} onClick={() => pg.setSozialform(s)}>
                    {SOZIALFORM_NAME[s]}
                  </Chip>
                ))}
              </div>
              <div className="pg-chips" role="group" aria-label="Blatt">
                <Chip an={blatt === 'mit'} onClick={() => setBlatt('mit')}>
                  mit Blatt
                </Chip>
                <Chip an={blatt === 'ohne'} onClick={() => setBlatt('ohne')}>
                  ohne Blatt
                </Chip>
              </div>
            </div>
            {f.vorher && (
              <div className="pg-hinweisbox gelb">
                <Ic n="info" />
                <div>{f.vorher.de}</div>
              </div>
            )}
          </div>
          <div className="pg-card pg-sticky pg-fo-vorschau" style={{ ['--fo-t' as string]: f.farbe[0], ['--fo-z' as string]: f.farbe[1] }}>
            <div className="pg-fo-vkopf">
              <FormBild f={f} />
              <div>
                <h2>{f.name.de}</h2>
                <p className="pg-leise pg-klein">{f.satz.de}</p>
              </div>
            </div>
            <h3 className="pg-fo-h">So wird die Stunde</h3>
            <ol className="pg-fo-bogen">
              {K.formSlots(f, dauer, 3, 3, blatt === 'mit').map((b, i, l) => (
                <li key={b.name.de} className={i > 0 && i < l.length - 1 ? 'mitte' : ''}>
                  {b.name.de}
                </li>
              ))}
            </ol>
            <p className="pg-leise pg-klein">
              {dauer} Min. · {SOZIALFORM_NAME[pg.sozialform]} · {wozu === 'ziel' ? (ziele.length ? ziele.join(', ') : 'Ziel wählen') : thema.length ? thema.map((t) => THEMEN.find((x) => x[0] === t)?.[1] ?? THEMA_NAME[t] ?? t).join(', ') : 'Thema wählen'}
            </p>
            <button type="button" className="pg-btn primaer gross breit pg-mt" disabled={!bereit} onClick={bauen}>
              <Ic n="blitz" />
              Stunde vorbereiten
            </button>
          </div>
        </div>
      )}
    </>
  )
}
