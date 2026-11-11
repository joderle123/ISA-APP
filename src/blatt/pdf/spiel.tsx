// ---------------------------------------------------------------------------
// Skills-Kurs, Look „spiel“ (11/2026): Blätter, die nach Tun aussehen statt nach Schule.
//
//   Aufkleber-Stil: kräftiger Umriss in Tinte, harter versetzter Schatten in der Modulfarbe, runde Ecken, große Schrift.
//   In Schwarz-Weiß tragen Umriss und Text den Kontrast; Flächen bleiben hell (wenig Toner).
//
//   Kopf (SpielKopf), Aufgabe und Info-Kasten in diesem Stil, dazu Bausteine zum Spielen:
//   bingo, entwederOder, mission, wuerfel, stempelweg, rangliste, balken.
//   Ein Blatt schaltet den Look mit `"look": "spiel"` ein (typen.ts); die Farbe kommt vom Thema (design.ts: SPIEL_FARBEN).
// ---------------------------------------------------------------------------
import { View, Text, Svg, Path, Circle, Rect } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Baustein, Blatt, BlattInhalt, Sprache } from '../typen'
import { iconZeichnung, NEUTRAL, type Palette } from '../zeichnung'
import { themaLabel } from '../katalog'
import { Zeichnen } from './Zeichnen'
import { SCHRIFT, TEXTE, typo, type Masse } from './stil'
import { textBreite } from './textbreite'
import { Bild, Fliess, type Ctx } from './bausteine'

const t = (c: Ctx, s: string | undefined) => (s ? typo(s, c.sprache) : '')
const TINTE = NEUTRAL.tinte

/** Feste Texte des Looks (DE/FR). */
const WORT: Record<Sprache, { kurs: string; mission: string; geschafft: string; stempel: string; oder: string; ziel: string; start: string; joker: string; mitbringen: string; leer: string; voll: string }> = {
  de: { kurs: 'Skills-Kurs', mission: 'Mission der Woche', geschafft: 'geschafft', stempel: 'Stempel', oder: 'oder', ziel: 'Ziel', start: 'Start', joker: 'Joker', mitbringen: 'Nächstes Mal', leer: 'leer', voll: 'voll' },
  fr: { kurs: 'Cours Skills', mission: 'Mission de la semaine', geschafft: 'fait', stempel: 'Tampon', oder: 'ou', ziel: 'Arrivée', start: 'Départ', joker: 'Joker', mitbringen: 'La prochaine fois', leer: 'vide', voll: 'plein' },
}

// --- Grundformen ----------------------------------------------------------------------------------------------------------

/** Aufkleber: Fläche mit Umriss und hartem Schatten nach rechts unten. */
export function Sticker({ farbe = '#FFFFFF', schatten, radius = 12, versatz = 3, rand = 1.4, dreh, breite, children, flex }: { farbe?: string; schatten: string; radius?: number; versatz?: number; rand?: number; dreh?: number; breite?: number; children?: ReactNode; flex?: number }) {
  return (
    <View style={{ paddingRight: versatz, paddingBottom: versatz, width: breite, flex, transform: dreh ? `rotate(${dreh}deg)` : undefined }}>
      <View style={{ position: 'absolute', left: versatz, top: versatz, right: 0, bottom: 0, backgroundColor: schatten, borderRadius: radius }} />
      <View style={{ backgroundColor: farbe, borderWidth: rand, borderColor: TINTE, borderRadius: radius }}>{children}</View>
    </View>
  )
}

/** Kleines Etikett in Versalien. */
function Etikett({ text, farbe, schrift = '#FFFFFF', rand }: { text: string; farbe: string; schrift?: string; rand?: boolean }) {
  return (
    <View style={{ backgroundColor: farbe, borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2.6, borderWidth: rand ? 1 : 0, borderColor: TINTE }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, letterSpacing: 1, color: schrift }}>{text.toUpperCase()}</Text>
    </View>
  )
}

function Titelzeile({ c, text, icon }: { c: Ctx; text: string; icon?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
      {icon ? (
        <View style={{ marginRight: 6 }}>
          <Zeichnen z={iconZeichnung(icon)} p={{ ...c.p, tinte: TINTE }} breite={15} />
        </View>
      ) : null}
      <Etikett text={t(c, text)} farbe={TINTE} />
    </View>
  )
}

// --- Kopf -----------------------------------------------------------------------------------------------------------------

/** Breite der letzten Zeile eines Titels bei gegebener Spaltenbreite (für den Marker-Strich darunter). */
function letzteZeile(text: string, gr: number, breite: number): { zeilen: number; breite: number } {
  const leer = textBreite(' ', 'titel', gr)
  let zeilen = 1
  let x = 0
  for (const wort of text.split(/\s+/)) {
    const w = textBreite(wort, 'titel', gr)
    if (x > 0 && x + leer + w > breite) {
      zeilen++
      x = w
    } else x += (x > 0 ? leer : 0) + w
  }
  return { zeilen, breite: Math.min(breite, x) }
}

function NameLinie({ label, breite }: { label: string; breite: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 12 }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, color: NEUTRAL.leise, marginRight: 5 }}>{label}</Text>
      <View style={{ width: breite, borderBottomWidth: 0.9, borderBottomColor: NEUTRAL.linie, height: 12 }} />
    </View>
  )
}

/** Kopf der Schülerseite im Look „spiel“: Etiketten, großer Titel mit Marker-Strich, Leitbild als schräger Aufkleber. */
export function SpielKopf({ blatt, inhalt, sprache, p, m, c }: { blatt: Blatt; inhalt: BlattInhalt; sprache: Sprache; p: Palette; m: Masse; c: Ctx }) {
  const tx = TEXTE[sprache]
  const bild = blatt.bild ?? 'icon:star'
  const kachel = 60
  const spalte = c.breite - kachel - 26
  const titel = typo(inhalt.titel, sprache)
  // sehr lange Titel etwas kleiner, damit höchstens zwei Zeilen entstehen
  let gr = m.titel
  while (gr > 20 && letzteZeile(titel, gr, spalte).zeilen > 2) gr -= 1
  const lz = letzteZeile(titel, gr, spalte)
  const thema = blatt.passgenau ? '' : themaLabel(blatt.bereich, blatt.thema, sprache)
  return (
    <View style={{ marginBottom: m.abstand * 0.9 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Etikett text={WORT[sprache].kurs} farbe={TINTE} />
        {thema ? (
          <View style={{ marginLeft: 5 }}>
            <Etikett text={thema} farbe={p.mittel} schrift={TINTE} />
          </View>
        ) : null}
        <View style={{ flex: 1 }} />
        <NameLinie label={tx.name} breite={112} />
        <NameLinie label={tx.datum} breite={58} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <View style={{ width: spalte, paddingRight: 8 }}>
          <View>
            {/* Marker-Strich unter der letzten Titelzeile: liegt hinter der Schrift */}
            <View style={{ position: 'absolute', left: -3, bottom: gr * 0.08, width: lz.breite + 8, height: gr * 0.36, backgroundColor: p.mittel, borderRadius: 3 }} />
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: gr, lineHeight: 1.1, color: TINTE, letterSpacing: -0.5 }}>{titel}</Text>
          </View>
          {inhalt.untertitel ? <Text style={{ fontFamily: m.schrift, fontSize: m.untertitel, lineHeight: 1.38, color: NEUTRAL.leise, marginTop: 6 }}>{typo(inhalt.untertitel, sprache)}</Text> : null}
        </View>
        <View style={{ flex: 1 }} />
        <Sticker farbe={p.mittel} schatten={TINTE} radius={15} versatz={3.5} rand={1.6} dreh={5} breite={kachel + 3.5}>
          <View style={{ width: kachel - 3.2, height: kachel - 3.2, alignItems: 'center', justifyContent: 'center' }}>
            <Bild c={{ ...c, p: { ...p, zart: '#FFFFFF', mittel: '#FFFFFF' } }} id={bild} breite={36} hoehe={36} />
          </View>
        </Sticker>
      </View>
    </View>
  )
}

// --- Aufgabe und Info im Aufkleber-Stil -------------------------------------------------------------------------------------

export function SpielAufgabe({ c, n, text, hinweis, symbole }: { c: Ctx; n?: number; text: string; hinweis?: string; symbole?: ReactNode }) {
  const g = c.m.nummer
  return (
    <View wrap={false} style={{ marginTop: c.m.abstand * 0.95, marginBottom: c.m.abstand * 0.55 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {n !== undefined ? (
          <View style={{ width: g, height: g, borderRadius: 7, backgroundColor: c.p.tief, borderWidth: 1.3, borderColor: TINTE, alignItems: 'center', justifyContent: 'center', transform: 'rotate(-4deg)' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: g * 0.58, color: '#FFFFFF', lineHeight: 1 }}>{String(n)}</Text>
          </View>
        ) : null}
        {symbole}
        <View style={{ flex: 1, marginLeft: 10, paddingTop: Math.max(0, (g - (c.m.basis + 1) * c.m.lh) / 2) }}>
          <Fliess c={c} fett groesse={c.m.basis + 1} farbe={TINTE}>
            {t(c, text)}
          </Fliess>
          {hinweis ? (
            <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ marginTop: 1.5 }}>
              {t(c, hinweis)}
            </Fliess>
          ) : null}
        </View>
      </View>
    </View>
  )
}

const INFO_ICON = { tipp: 'bulb', wissen: 'book', achtung: 'alert-triangle', merke: 'bookmark', hilfe: 'lifebuoy' } as const

export function SpielInfo({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'info' }> }) {
  const sym = b.symbol ?? 'wissen'
  const titel = b.titel ?? TEXTE[c.sprache][sym]
  return (
    <View wrap={false}>
      <Sticker farbe={c.p.zart} schatten={c.p.tief} radius={12} versatz={3}>
        <View style={{ flexDirection: 'row', padding: 11 }}>
          <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#FFFFFF', borderWidth: 1.2, borderColor: TINTE, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
            <Zeichnen z={iconZeichnung(INFO_ICON[sym])} p={{ ...c.p, tinte: TINTE }} breite={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Fliess c={c} fett farbe={TINTE} style={{ marginBottom: 2 }}>
              {t(c, titel)}
            </Fliess>
            {b.text ? <Fliess c={c}>{t(c, b.text)}</Fliess> : null}
            {(b.punkte ?? []).map((x, i) => (
              <View key={i} style={{ flexDirection: 'row', marginTop: 2.5 }}>
                <View style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: c.p.tief, marginTop: c.m.basis * 0.5, marginRight: 8, transform: 'rotate(45deg)' }} />
                <Fliess c={c} style={{ flex: 1 }}>
                  {t(c, x)}
                </Fliess>
              </View>
            ))}
          </View>
        </View>
      </Sticker>
    </View>
  )
}

// --- Bingo ----------------------------------------------------------------------------------------------------------------

function passt(text: string, breite: number, gr: number, min: number, zeilen: number): number {
  // Schrift so groß wie möglich, dass der Text in `zeilen` Zeilen der Breite passt
  for (let g = gr; g > min; g -= 0.4) {
    const leer = textBreite(' ', 'jugend', g) * 1.05
    let z = 1
    let x = 0
    let ok = true
    for (const w of text.split(/\s+/)) {
      const b = textBreite(w, 'jugend', g) * 1.05
      if (b > breite) ok = false
      if (x > 0 && x + leer + b > breite) {
        z++
        x = b
      } else x += (x > 0 ? leer : 0) + b
    }
    if (ok && z <= zeilen) return g
  }
  return min
}

export function Bingo({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'bingo' }> }) {
  const sp = b.spalten ?? (b.felder.length > 9 ? 4 : 3)
  const luecke = 7
  const w = (c.breite - luecke * (sp - 1)) / sp
  const namen = b.namen !== false
  const h = (sp === 3 ? 62 : 56) + (namen ? 16 : 0)
  const reihen: string[][] = []
  for (let i = 0; i < b.felder.length; i += sp) reihen.push(b.felder.slice(i, i + sp))
  return (
    <View wrap={false}>
      {b.titel ? <Titelzeile c={c} text={b.titel} icon="layout-grid" /> : null}
      {reihen.map((reihe, r) => (
        <View key={r} style={{ flexDirection: 'row', marginBottom: r < reihen.length - 1 ? luecke : 0 }}>
          {reihe.map((text, i) => {
            const joker = text === '*'
            const hell = (r + i) % 2 === 0
            const inhalt = joker ? WORT[c.sprache].joker : t(c, text)
            const gr = passt(inhalt, w - 16, sp === 3 ? 10.6 : 9.4, 7.6, 3)
            return (
              <View key={i} style={{ width: w, height: h, marginRight: i < reihe.length - 1 ? luecke : 0, borderWidth: 1.3, borderColor: TINTE, borderRadius: 10, backgroundColor: joker ? c.p.mittel : hell ? '#FFFFFF' : c.p.zart, paddingHorizontal: 7, paddingTop: 6, paddingBottom: 5 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {joker ? (
                    <View style={{ marginBottom: 2 }}>
                      <Zeichnen z={iconZeichnung('star')} p={{ ...c.p, tinte: TINTE }} breite={18} />
                    </View>
                  ) : null}
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: gr, lineHeight: 1.22, color: TINTE, textAlign: 'center' }}>{inhalt}</Text>
                </View>
                {namen && !joker ? <View style={{ height: 11, borderBottomWidth: 0.9, borderBottomColor: NEUTRAL.linie, marginHorizontal: 6 }} /> : null}
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

// --- Entweder – oder --------------------------------------------------------------------------------------------------------

export function EntwederOder({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'entwederOder' }> }) {
  const pille = (text: string, hell: boolean) => (
    <View style={{ flex: 1, borderWidth: 1.3, borderColor: TINTE, borderRadius: 17, backgroundColor: hell ? '#FFFFFF' : c.p.zart, paddingVertical: 7, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', minHeight: 32 }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: c.m.basis, color: TINTE, textAlign: 'center', lineHeight: 1.2 }}>{t(c, text)}</Text>
    </View>
  )
  return (
    <View wrap={false}>
      {b.titel ? <Titelzeile c={c} text={b.titel} icon="arrows-shuffle" /> : null}
      {b.paare.map(([l, r], i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: i < b.paare.length - 1 ? 6 : 0 }}>
          {pille(l, i % 2 === 0)}
          <View style={{ width: 34, alignItems: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, letterSpacing: 0.6, color: c.p.tief }}>{WORT[c.sprache].oder.toUpperCase()}</Text>
          </View>
          {pille(r, i % 2 === 1)}
        </View>
      ))}
    </View>
  )
}

// --- Mission der Woche ------------------------------------------------------------------------------------------------------

export function Mission({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'mission' }> }) {
  const w = WORT[c.sprache]
  const tage = Math.max(0, Math.min(7, b.tage ?? 0))
  return (
    <View wrap={false}>
      <Sticker farbe={c.p.zart} schatten={TINTE} radius={14} versatz={3.5} rand={1.6}>
        <View style={{ flexDirection: 'row', paddingVertical: 9, paddingHorizontal: 12 }}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <View style={{ marginRight: 6 }}>
                <Zeichnen z={iconZeichnung('target')} p={{ ...c.p, tinte: TINTE }} breite={17} />
              </View>
              <Etikett text={t(c, b.titel ?? w.mission)} farbe={c.p.tief} />
            </View>
            <Fliess c={c} fett groesse={c.m.basis + 0.6} farbe={TINTE}>
              {t(c, b.text)}
            </Fliess>
            {b.beweis ? (
              <Fliess c={c} klein farbe={NEUTRAL.leise} style={{ marginTop: 4 }}>
                {`${w.mitbringen}: ${t(c, b.beweis)}`}
              </Fliess>
            ) : null}
            {tage > 0 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                {Array.from({ length: tage }, (_, i) => (
                  <View key={i} style={{ width: 17, height: 17, borderRadius: 5, borderWidth: 1.3, borderColor: TINTE, backgroundColor: '#FFFFFF', marginRight: 5 }} />
                ))}
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: c.m.klein, color: NEUTRAL.leise, marginLeft: 3 }}>{w.geschafft}</Text>
              </View>
            ) : null}
          </View>
          <View style={{ width: 62, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1.4, borderColor: c.p.tief, borderStyle: 'dashed', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)' }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.8, color: c.p.mittel }}>{w.stempel.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </Sticker>
    </View>
  )
}

// --- Würfelkarte ------------------------------------------------------------------------------------------------------------

const AUGEN: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.27, 0.27], [0.73, 0.73]],
  3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  4: [[0.27, 0.27], [0.73, 0.27], [0.27, 0.73], [0.73, 0.73]],
  5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
  6: [[0.27, 0.23], [0.73, 0.23], [0.27, 0.5], [0.73, 0.5], [0.27, 0.77], [0.73, 0.77]],
}

function Wuerfelbild({ n, g, farbe }: { n: number; g: number; farbe: string }) {
  return (
    <Svg width={g} height={g} viewBox="0 0 30 30">
      <Rect x={1.2} y={1.2} width={27.6} height={27.6} rx={6.5} fill="#FFFFFF" stroke={TINTE} strokeWidth={1.7} />
      {AUGEN[n].map(([x, y], i) => (
        <Circle key={i} cx={x * 30} cy={y * 30} r={2.7} fill={farbe} />
      ))}
    </Svg>
  )
}

export function Wuerfel({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'wuerfel' }> }) {
  const luecke = 8
  const w = (c.breite - luecke) / 2
  const zeilen = b.zeilen.slice(0, 6)
  return (
    <View wrap={false}>
      {b.titel ? <Titelzeile c={c} text={b.titel} icon="dice-5" /> : null}
      {[0, 1, 2].map((r) => (
        <View key={r} style={{ flexDirection: 'row', marginBottom: r < 2 ? 6 : 0 }}>
          {[r, r + 3].map((i, k) => (
            <View key={i} style={{ width: w, marginRight: k === 0 ? luecke : 0, flexDirection: 'row', alignItems: 'center', borderWidth: 1.3, borderColor: TINTE, borderRadius: 11, backgroundColor: (r + k) % 2 === 0 ? c.p.zart : '#FFFFFF', paddingVertical: 6, paddingHorizontal: 8, minHeight: 44 }}>
              <Wuerfelbild n={i + 1} g={28} farbe={c.p.tief} />
              <Text style={{ flex: 1, marginLeft: 9, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: c.m.basis - 0.8, lineHeight: 1.25, color: TINTE }}>{t(c, zeilen[i] ?? '')}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Stempelweg -------------------------------------------------------------------------------------------------------------

/** Töne der Etappen (hell, unterscheidbar; in Schwarz-Weiß weiß bis hellgrau). */
const ETAPPEN_TOENE = ['#E3F7F4', '#FFF1DE', '#FFEBF2', '#E4F8EC', '#EEEAFF', '#E6F1FF', '#FFECE7', '#EAECFF', '#F1F9DC', '#FFF6D6']

export function Stempelweg({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'stempelweg' }> }) {
  const n = Math.max(4, Math.min(40, b.felder))
  const sp = n <= 12 ? 4 : n <= 20 ? 5 : n <= 30 ? 6 : 8
  const reihen = Math.ceil((n + 1) / sp) // + Zielfeld
  const zelle = c.breite / sp
  const d = Math.min(zelle - 12, 66)
  const etappenHoehe = b.etappen?.length ? 12 : 0
  const zh = d + 16 + etappenHoehe
  const etappen = [...(b.etappen ?? [])].sort((x, y) => x.ab - y.ab)
  const etappeVon = (nr: number) => {
    let k = -1
    etappen.forEach((e, i) => {
      if (nr >= e.ab) k = i
    })
    return k
  }
  // Mittelpunkt des Felds i (0-basiert; Feld n ist das Ziel) auf dem Schlangenweg
  const ort = (i: number) => {
    const r = Math.floor(i / sp)
    const k = i % sp
    const spalte = r % 2 === 0 ? k : sp - 1 - k
    return { x: spalte * zelle + zelle / 2, y: r * zh + etappenHoehe + 8 + d / 2 }
  }
  let weg = ''
  for (let i = 0; i <= n; i++) {
    const o = ort(i)
    weg += `${i === 0 ? 'M' : 'L'}${o.x.toFixed(1)} ${o.y.toFixed(1)} `
  }
  const hoehe = reihen * zh + 2
  return (
    <View wrap={false} style={{ height: hoehe, width: c.breite }}>
      <Svg width={c.breite} height={hoehe} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Path d={weg} stroke={c.p.mittel} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d={weg} stroke={TINTE} strokeWidth={1.1} strokeDasharray="1 5" strokeLinecap="round" fill="none" />
      </Svg>
      {Array.from({ length: n + 1 }, (_, i) => {
        const o = ort(i)
        const ziel = i === n
        const e = etappeVon(i + 1)
        const beginn = !ziel && e >= 0 && etappen[e].ab === i + 1
        return (
          <View key={i} style={{ position: 'absolute', left: o.x - zelle / 2, top: o.y - d / 2 - etappenHoehe - 2, width: zelle, alignItems: 'center' }}>
            <View style={{ height: etappenHoehe, justifyContent: 'flex-end' }}>
              {beginn ? (
                // weißer Grund: der Weg läuft an den Kehren hinter dem Etikett durch
                <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 3, borderRadius: 2 }}>
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, letterSpacing: 0.4, color: c.p.tief, textAlign: 'center', maxLines: 1 }}>{t(c, etappen[e].titel).toUpperCase()}</Text>
                </View>
              ) : null}
            </View>
            {ziel ? (
              <View style={{ width: d, height: d, borderRadius: d * 0.28, backgroundColor: c.p.mittel, borderWidth: 1.6, borderColor: TINTE, alignItems: 'center', justifyContent: 'center', transform: 'rotate(5deg)', marginTop: 2 }}>
                <Zeichnen z={iconZeichnung('trophy')} p={{ ...c.p, tinte: TINTE }} breite={d * 0.42} />
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, letterSpacing: 0.6, color: TINTE, marginTop: 1 }}>{t(c, b.ziel ?? WORT[c.sprache].ziel).toUpperCase()}</Text>
              </View>
            ) : (
              <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: e >= 0 ? ETAPPEN_TOENE[e % ETAPPEN_TOENE.length] : '#FFFFFF', borderWidth: 1.3, borderColor: TINTE, marginTop: 2 }}>
                <Text style={{ position: 'absolute', top: d * 0.1, left: 0, right: 0, textAlign: 'center', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: Math.max(7, d * 0.17), color: NEUTRAL.sehrLeise }}>{String(i + 1)}</Text>
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

// --- Rangliste (Tier-List) --------------------------------------------------------------------------------------------------

export function Rangliste({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'rangliste' }> }) {
  const n = b.stufen.length
  const h = Math.max(30, (b.hoehe ?? 2) * 19)
  const ton = (i: number) => (i === 0 ? c.p.tief : i === 1 ? c.p.mittel : i === n - 1 && n > 3 ? '#FFFFFF' : c.p.zart)
  return (
    <View wrap={false}>
      {b.items?.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 }}>
          {b.items.map((x, i) => (
            <View key={i} style={{ borderWidth: 1.1, borderColor: TINTE, borderRadius: 11, backgroundColor: '#FFFFFF', paddingHorizontal: 9, paddingVertical: 3.2, marginRight: 5, marginBottom: 5 }}>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: c.m.basis - 1.2, color: TINTE }}>{t(c, x)}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={{ borderWidth: 1.4, borderColor: TINTE, borderRadius: 12, overflow: 'hidden' }}>
        {b.stufen.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', minHeight: h, borderTopWidth: i ? 1.2 : 0, borderTopColor: TINTE }}>
            <View style={{ width: 96, backgroundColor: ton(i), borderRightWidth: 1.2, borderRightColor: TINTE, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.4, color: i === 0 ? '#FFFFFF' : TINTE, textAlign: 'center', lineHeight: 1.15 }}>{t(c, s)}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
          </View>
        ))}
      </View>
    </View>
  )
}

// --- Balken (Werte wie in einem Spiel) --------------------------------------------------------------------------------------

export function Balken({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'balken' }> }) {
  const st = b.stufen ?? 5
  const zeilen = [...b.items, ...Array.from({ length: b.leer ?? 0 }, () => '')]
  const label = Math.min(190, c.breite * 0.4)
  const segB = (c.breite - label - 8 - (st - 1) * 3) / st
  const pole = b.pole ?? [WORT[c.sprache].leer, WORT[c.sprache].voll]
  return (
    <View wrap={false}>
      <View style={{ flexDirection: 'row', marginBottom: 3, paddingLeft: label + 8 }}>
        <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: c.m.klein - 0.6, color: NEUTRAL.leise }}>{t(c, pole[0])}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: c.m.klein - 0.6, color: NEUTRAL.leise }}>{t(c, pole[1])}</Text>
      </View>
      {zeilen.map((x, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: i < zeilen.length - 1 ? 6 : 0 }}>
          <View style={{ width: label, marginRight: 8 }}>
            {x ? (
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: c.m.basis - 0.4, color: TINTE, lineHeight: 1.2 }}>{t(c, x)}</Text>
            ) : (
              <View style={{ height: 15, borderBottomWidth: 0.9, borderBottomColor: NEUTRAL.linie }} />
            )}
          </View>
          {Array.from({ length: st }, (_, k) => (
            <View key={k} style={{ width: segB, height: 17, marginRight: k < st - 1 ? 3 : 0, borderWidth: 1.2, borderColor: TINTE, borderRadius: 4, backgroundColor: '#FFFFFF', borderTopLeftRadius: k === 0 ? 8.5 : 4, borderBottomLeftRadius: k === 0 ? 8.5 : 4, borderTopRightRadius: k === st - 1 ? 8.5 : 4, borderBottomRightRadius: k === st - 1 ? 8.5 : 4 }} />
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Regler im Aufkleber-Stil (ersetzt im Look „spiel“ den zarten Regler aus reflexion.tsx) ------------------------------------

export function SpielRegler({ c, b }: { c: Ctx; b: Extract<Baustein, { art: 'regler' }> }) {
  const st = b.stufen ?? 5
  const label = Math.min(150, c.breite * 0.3)
  const spur = c.breite - 2 * label - 20
  const d = 21
  const schritt = (spur - d) / (st - 1)
  const text = (x: string, rechts: boolean) => (
    <View style={{ width: label }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: c.m.basis - 0.2, color: TINTE, textAlign: rechts ? 'left' : 'right', lineHeight: 1.2 }}>{t(c, x)}</Text>
    </View>
  )
  return (
    <View wrap={false}>
      {b.paare.map(([l, r], i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: i < b.paare.length - 1 ? 9 : 0 }}>
          {text(l, false)}
          <View style={{ width: spur, height: d, marginHorizontal: 10 }}>
            <View style={{ position: 'absolute', left: d / 2, right: d / 2, top: d / 2 - 3, height: 6, backgroundColor: c.p.mittel, borderRadius: 3 }} />
            {Array.from({ length: st }, (_, k) => (
              <View key={k} style={{ position: 'absolute', left: k * schritt, top: 0, width: d, height: d, borderRadius: d / 2, borderWidth: 1.3, borderColor: TINTE, backgroundColor: '#FFFFFF' }} />
            ))}
          </View>
          {text(r, true)}
        </View>
      ))}
    </View>
  )
}
