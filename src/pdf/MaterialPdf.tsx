import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Svg,
  Path,
  Circle,
  Rect,
  Polygon,
  Line,
} from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Material, WorksheetBlock } from '../types/material'

// Disable automatic hyphenation so goal ids like "[SOZ-5]" never break into
// "[-SOZ-5]". Words wrap at spaces only.
Font.registerHyphenationCallback((word) => [word])
import {
  ageLevels,
  eldibBands,
  eldibDomains,
  goalsInBand,
  materialTypes,
  participantModes,
  themeLabel,
  etepStufen,
} from '../data/taxonomy'

// ---------------------------------------------------------------------------
// Reproduction of the original "ISA – Material" template, built entirely with
// @react-pdf primitives. Uses the standard Helvetica family (no network fonts)
// so generation works fully offline. Checkboxes AND theme icons are drawn as
// vector SVG (not glyphs/images) so the PDF stays self-contained and offline.
// ---------------------------------------------------------------------------

const C = {
  blue: '#dbe5f1',
  blueDeep: '#2f5597',
  gray: '#ededed',
  salmon: '#fbe4d5',
  green: '#e2efda',
  greenDeep: '#548235',
  border: '#bfc7d2',
  ink: '#1f2733',
  faint: '#8a93a0',
}

// Per-theme accent (deep = icon/foreground, light = banner background).
const THEME_COLOR: Record<string, { deep: string; light: string }> = {
  selbstwahrnehmung: { deep: '#2f5597', light: '#dbe5f1' },
  fremdwahrnehmung: { deep: '#2e75b6', light: '#deebf7' },
  selbstwertgefuehl: { deep: '#c55a11', light: '#fbe4d5' },
  identitaet: { deep: '#7030a0', light: '#e7dcf2' },
  kommunikation: { deep: '#548235', light: '#e2efda' },
  beziehungsaufbau: { deep: '#bf8f00', light: '#fff2cc' },
  kooperation: { deep: '#1f8a8a', light: '#d7f0f0' },
  achtsamkeit: { deep: '#4472c4', light: '#dbe5f1' },
  konfliktloesung: { deep: '#7030a0', light: '#e7dcf2' },
  bewegung: { deep: '#548235', light: '#e2efda' },
  'spiel-spass': { deep: '#d18f00', light: '#fff2cc' },
  resilienz: { deep: '#2f6b3c', light: '#dcebe1' },
  impulskontrolle: { deep: '#c55a11', light: '#fbe4d5' },
  emotionen: { deep: '#c00000', light: '#f8dada' },
  stressbewaeltigung: { deep: '#3a8f8f', light: '#d7f0f0' },
  ressourcen: { deep: '#bf8f00', light: '#fff2cc' },
  kreativitaet: { deep: '#9933cc', light: '#efe0f7' },
  grenzen: { deep: '#806000', light: '#f0e6c8' },
  disziplin: { deep: '#44546a', light: '#d6dce5' },
  mobbing: { deep: '#a52a2a', light: '#f3dada' },
  motivation: { deep: '#c55a11', light: '#fbe4d5' },
  gerechtigkeit: { deep: '#44546a', light: '#d6dce5' },
  gewalt: { deep: '#843c0c', light: '#f0dccd' },
  medien: { deep: '#2e75b6', light: '#deebf7' },
  sexualitaet: { deep: '#b0367a', light: '#f6dcea' },
  'etep-epu': { deep: '#2f5597', light: '#dbe5f1' },
}
const themeColor = (id?: string) =>
  (id && THEME_COLOR[id]) || { deep: C.blueDeep, light: C.blue }

// Map each theme to one of a small set of drawn icons.
const THEME_ICON: Record<string, string> = {
  selbstwahrnehmung: 'self', identitaet: 'self', fremdwahrnehmung: 'eye',
  selbstwertgefuehl: 'star', ressourcen: 'star',
  kommunikation: 'talk', beziehungsaufbau: 'team', kooperation: 'team', mobbing: 'team',
  achtsamkeit: 'mind', stressbewaeltigung: 'mind', 'etep-epu': 'mind',
  emotionen: 'heart', sexualitaet: 'heart',
  impulskontrolle: 'shield', grenzen: 'shield', gewalt: 'shield',
  konfliktloesung: 'peace', gerechtigkeit: 'peace',
  bewegung: 'bolt', 'spiel-spass': 'play',
  kreativitaet: 'idea', resilienz: 'mountain', motivation: 'flag',
  disziplin: 'target', medien: 'screen',
}

/** Draw a theme icon in a 0..24 viewBox. */
function Icon({ name, size = 22, color = '#fff' }: { name: string; size?: number; color?: string }) {
  const sw = 1.7
  let body: ReactNode = null
  switch (name) {
    case 'self':
      body = (<>
        <Circle cx={12} cy={8} r={3.4} fill={color} />
        <Path d="M5 20c0-4 3.4-6.2 7-6.2s7 2.2 7 6.2" fill="none" stroke={color} strokeWidth={sw} />
      </>); break
    case 'eye':
      body = (<>
        <Path d="M2 12c2.6-4.2 6-6.3 10-6.3S19.4 7.8 22 12c-2.6 4.2-6 6.3-10 6.3S4.6 16.2 2 12z" fill="none" stroke={color} strokeWidth={sw} />
        <Circle cx={12} cy={12} r={3} fill={color} />
      </>); break
    case 'star':
      body = <Polygon points="12,2 14.7,8.6 21.8,9.2 16.4,13.8 18.1,20.8 12,17 5.9,20.8 7.6,13.8 2.2,9.2 9.3,8.6" fill={color} />; break
    case 'talk':
      body = <Path d="M4 4.5h16c1 0 1.6.7 1.6 1.6v8c0 .9-.7 1.6-1.6 1.6H10l-4.6 4v-4H4c-1 0-1.6-.7-1.6-1.6v-8C2.4 5.2 3 4.5 4 4.5z" fill={color} />; break
    case 'team':
      body = (<>
        <Circle cx={8} cy={8} r={2.7} fill={color} />
        <Circle cx={16} cy={8} r={2.7} fill={color} />
        <Path d="M2.5 19c0-3 2.3-4.8 5.5-4.8M21.5 19c0-3-2.3-4.8-5.5-4.8M8.2 19.2c0-3.2 1.8-4.8 3.8-4.8s3.8 1.6 3.8 4.8" fill="none" stroke={color} strokeWidth={sw} />
      </>); break
    case 'mind':
      body = (<>
        <Circle cx={12} cy={12} r={8.2} fill="none" stroke={color} strokeWidth={sw} />
        <Path d="M12 12c0-2 1.6-2.4 1.6-3.9 0-1-.8-1.8-1.9-1.8-1 0-1.8.7-1.9 1.7" fill="none" stroke={color} strokeWidth={sw} />
        <Circle cx={12} cy={15.4} r={1} fill={color} />
      </>); break
    case 'heart':
      body = (<>
        <Circle cx={8.2} cy={9} r={3.3} fill={color} />
        <Circle cx={15.8} cy={9} r={3.3} fill={color} />
        <Polygon points="5,10.7 19,10.7 12,20" fill={color} />
      </>); break
    case 'shield':
      body = <Path d="M12 2.2l8 3v6c0 5-3.5 8.8-8 10.8-4.5-2-8-5.8-8-10.8v-6z" fill={color} />; break
    case 'peace':
      body = (<>
        <Line x1={12} y1={4} x2={12} y2={20} stroke={color} strokeWidth={sw} />
        <Line x1={5} y1={7} x2={19} y2={7} stroke={color} strokeWidth={sw} />
        <Path d="M5 7l-2.6 5h5.2zM19 7l-2.6 5h5.2z" fill="none" stroke={color} strokeWidth={sw} />
        <Line x1={8} y1={20} x2={16} y2={20} stroke={color} strokeWidth={sw} />
      </>); break
    case 'bolt':
      body = <Polygon points="13,2 4,13.5 10.5,13.5 9,22 20,9 13,9" fill={color} />; break
    case 'play':
      body = (<>
        <Circle cx={12} cy={12} r={9} fill="none" stroke={color} strokeWidth={sw} />
        <Polygon points="10,8 16,12 10,16" fill={color} />
      </>); break
    case 'idea':
      body = (<>
        <Circle cx={12} cy={9.5} r={5.2} fill={color} />
        <Rect x={9.5} y={14} width={5} height={4.2} rx={1} fill={color} />
        <Line x1={9.8} y1={20} x2={14.2} y2={20} stroke={color} strokeWidth={sw} />
      </>); break
    case 'mountain':
      body = <Polygon points="2,20 9,6.5 13.2,13 16,9 22,20" fill={color} />; break
    case 'flag':
      body = (<>
        <Line x1={6} y1={3} x2={6} y2={21} stroke={color} strokeWidth={sw} />
        <Path d="M6 4h12l-3 3.4 3 3.4H6z" fill={color} />
      </>); break
    case 'target':
      body = (<>
        <Circle cx={12} cy={12} r={9} fill="none" stroke={color} strokeWidth={sw} />
        <Circle cx={12} cy={12} r={5.2} fill="none" stroke={color} strokeWidth={sw} />
        <Circle cx={12} cy={12} r={1.8} fill={color} />
      </>); break
    case 'screen':
      body = (<>
        <Rect x={3} y={4.5} width={18} height={12} rx={1.6} fill="none" stroke={color} strokeWidth={sw} />
        <Line x1={9} y1={19.5} x2={15} y2={19.5} stroke={color} strokeWidth={sw} />
        <Line x1={12} y1={16.5} x2={12} y2={19.5} stroke={color} strokeWidth={sw} />
      </>); break
    default:
      body = <Circle cx={12} cy={12} r={8} fill={color} />
  }
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      {body}
    </Svg>
  )
}

const themeIconName = (id?: string) => (id && THEME_ICON[id]) || 'self'

const s = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 44,
    paddingHorizontal: 42,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: C.ink,
    lineHeight: 1.4,
  },
  // Visual title banner
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  kicker: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  bannerTitle: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: C.ink, marginTop: 1 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 5 },
  badge: {
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#fff',
  },
  badgeOutline: {
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 8,
    borderWidth: 1,
  },
  // Theme chips (with mini icon)
  themeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 3,
  },
  themeChipText: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', marginLeft: 3 },
  // Colored info blocks
  block: { padding: 8, marginBottom: 10, borderRadius: 4 },
  blockBlue: { backgroundColor: C.blue },
  blockGray: { backgroundColor: C.gray },
  blockSalmon: { backgroundColor: C.salmon },
  row: { flexDirection: 'row', marginBottom: 3 },
  label: { width: 120, fontFamily: 'Helvetica-Bold', color: C.blueDeep },
  labelInk: { width: 120, fontFamily: 'Helvetica-Bold' },
  value: { flex: 1 },
  // Checkboxes
  cbRow: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  box: {
    width: 9,
    height: 9,
    borderWidth: 1,
    borderColor: '#5a6473',
    marginRight: 4,
    marginTop: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFill: { width: 5, height: 5, backgroundColor: C.blueDeep },
  inlineChecks: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  sectionLabel: { fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  sectionAccent: { width: 4, height: 14, borderRadius: 2, marginRight: 6 },
  para: { marginBottom: 6 },
  // Ablauf
  ablaufBox: {
    borderWidth: 1,
    borderColor: C.border,
    borderLeftWidth: 4,
    padding: 8,
    marginBottom: 8,
    borderRadius: 3,
  },
  phaseTitle: { fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  metaRow: { flexDirection: 'row', borderWidth: 1, borderColor: C.border, borderRadius: 3 },
  metaCell: { padding: 6, borderRightWidth: 1, borderRightColor: C.border },
  // ELDiB grid
  gridHeader: { flexDirection: 'row', marginTop: 6 },
  gridHeadCell: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 4,
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#fff',
    marginRight: 2,
  },
  band: { flexDirection: 'row', marginTop: 2 },
  bandCell: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 4,
    marginRight: 2,
  },
  goal: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 1.5 },
  goalText: { fontSize: 7.5, flex: 1, lineHeight: 1.25 },
  link: { color: C.blueDeep, fontSize: 9 },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 42,
    right: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: C.faint,
  },
  // Worksheet (student-facing, printable)
  wsBand: { flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 8, borderBottomWidth: 2 },
  wsKicker: { fontSize: 9, fontFamily: 'Helvetica-Bold' },
  wsTitle: { fontSize: 15, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  wsNameRow: { flexDirection: 'row', marginTop: 6, fontSize: 9, color: C.faint },
  wsIntro: { fontSize: 10, marginBottom: 6, color: C.ink },
  wsHeading: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', marginTop: 10, marginBottom: 3 },
  wsInstruction: { fontSize: 9.5, color: '#5a6473', marginBottom: 3 },
  wsQuestion: { fontSize: 10, marginTop: 6, marginBottom: 3 },
  wsLine: { borderBottomWidth: 1, borderBottomColor: '#c2c9d2', height: 17 },
  wsBox: { borderWidth: 1, borderColor: '#c2c9d2', borderRadius: 3, marginVertical: 3 },
  wsCheckItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  wsScaleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 3 },
  wsScaleBox: { flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 3 },
  wsTableRow: { flexDirection: 'row' },
  wsTableCell: { flex: 1, borderWidth: 0.5, borderColor: '#c2c9d2', paddingVertical: 5, paddingHorizontal: 4, fontSize: 9 },
  wsTableHead: { backgroundColor: '#eef2f7', fontFamily: 'Helvetica-Bold' },
})

function Box({ checked }: { checked: boolean }) {
  return <View style={s.box}>{checked ? <View style={s.boxFill} /> : null}</View>
}

function Check({ checked, label }: { checked: boolean; label: string }) {
  return (
    <View style={s.cbRow}>
      <Box checked={checked} />
      <Text>{label}</Text>
    </View>
  )
}

/** Small heading with a colored accent bar. */
function SectionHead({ children, color }: { children: ReactNode; color: string }) {
  return (
    <View style={s.sectionHead}>
      <View style={[s.sectionAccent, { backgroundColor: color }]} />
      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 12 }}>{children}</Text>
    </View>
  )
}

function WriteLines({ n }: { n: number }) {
  return (
    <>
      {Array.from({ length: Math.max(1, n) }).map((_, i) => (
        <View key={i} style={s.wsLine} />
      ))}
    </>
  )
}

function WsBlock({ block }: { block: WorksheetBlock }) {
  const { kind, text, lines, items } = block
  if (kind === 'heading') return <Text style={s.wsHeading}>{text}</Text>
  if (kind === 'instruction') return <Text style={s.wsInstruction}>{text}</Text>
  if (kind === 'question')
    return (
      <View wrap={false}>
        <Text style={s.wsQuestion}>{text}</Text>
        <WriteLines n={lines ?? 2} />
      </View>
    )
  if (kind === 'lines')
    return (
      <View>
        {text ? <Text style={s.wsQuestion}>{text}</Text> : null}
        <WriteLines n={lines ?? 3} />
      </View>
    )
  if (kind === 'box')
    return (
      <View wrap={false}>
        {text ? <Text style={s.wsQuestion}>{text}</Text> : null}
        <View style={[s.wsBox, { height: (lines ?? 4) * 16 }]} />
      </View>
    )
  if (kind === 'checklist')
    return (
      <View style={{ marginTop: 3 }}>
        {(items ?? []).map((it, i) => (
          <View key={i} style={s.wsCheckItem}>
            <Box checked={false} />
            <Text style={{ flex: 1 }}>{it}</Text>
          </View>
        ))}
      </View>
    )
  if (kind === 'scale')
    return (
      <View style={{ marginTop: 4 }} wrap={false}>
        {text ? <Text style={s.wsQuestion}>{text}</Text> : null}
        <View style={s.wsScaleRow}>
          {(items ?? []).map((lab, i) => (
            <View key={i} style={s.wsScaleBox}>
              <Box checked={false} />
              <Text style={{ fontSize: 9 }}>{lab}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  if (kind === 'table') {
    const cols = items ?? []
    const rows = lines ?? 3
    return (
      <View style={{ marginTop: 4 }}>
        <View style={s.wsTableRow}>
          {cols.map((c, i) => (
            <Text key={i} style={[s.wsTableCell, s.wsTableHead]}>
              {c}
            </Text>
          ))}
        </View>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={r} style={s.wsTableRow} wrap={false}>
            {cols.map((_, c) => (
              <Text key={c} style={[s.wsTableCell, { minHeight: 22 }]}>
                {' '}
              </Text>
            ))}
          </View>
        ))}
      </View>
    )
  }
  return null
}

function WorksheetPage({ material: m }: { material: Material }) {
  const w = m.worksheet!
  const tc = themeColor(m.themes[0])
  return (
    <Page size="A4" style={s.page}>
      <View style={[s.wsBand, { borderBottomColor: tc.deep }]}>
        <View style={[s.bannerIcon, { width: 38, height: 38, borderRadius: 19, backgroundColor: tc.deep, marginRight: 10 }]}>
          <Icon name={themeIconName(m.themes[0])} size={20} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.wsKicker, { color: tc.deep }]}>ARBEITSBLATT</Text>
          <Text style={s.wsTitle}>{w.title || m.title}</Text>
        </View>
      </View>
      <View style={s.wsNameRow}>
        <Text>Numm: ____________________________</Text>
        <Text>     Datum: ______________</Text>
      </View>
      {w.intro ? <Text style={[s.wsIntro, { marginTop: 6 }]}>{w.intro}</Text> : null}
      {w.blocks.map((b, i) => (
        <WsBlock key={i} block={b} />
      ))}
      <Text
        style={s.footer}
        render={({ pageNumber, totalPages }) =>
          `ISA-App · Arbeitsblatt · ${m.title}                          ${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>
  )
}

export function MaterialDocument({ material: m }: { material: Material }) {
  const has = <T,>(arr: T[], v: T) => arr.includes(v)
  const goalSet = new Set(m.eldibGoals)
  const tc = themeColor(m.themes[0])

  return (
    <Document
      title={m.title}
      author={m.author || 'ISA-App'}
      subject={m.themes.map(themeLabel).join(', ')}
      keywords={m.tags.join(', ')}
    >
      {/* ---------------- Page 1 · Deckblatt ---------------- */}
      <Page size="A4" style={s.page}>
        {/* Visual title banner with theme icon + badges */}
        <View style={[s.banner, { backgroundColor: tc.light, borderLeftWidth: 5, borderLeftColor: tc.deep }]}>
          <View style={[s.bannerIcon, { backgroundColor: tc.deep }]}>
            <Icon name={themeIconName(m.themes[0])} size={26} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.kicker, { color: tc.deep }]}>ISA · MATERIAL</Text>
            <Text style={s.bannerTitle}>{m.title}</Text>
            <View style={s.badgeRow}>
              {m.ageLevels.map((a) => (
                <Text key={a} style={[s.badge, { backgroundColor: tc.deep }]}>{a}</Text>
              ))}
              {m.type.map((t) => (
                <Text key={t} style={[s.badgeOutline, { borderColor: tc.deep, color: tc.deep }]}>
                  {materialTypes.find((x) => x.id === t)?.labelDe ?? t}
                </Text>
              ))}
              {m.worksheet ? (
                <Text style={[s.badge, { backgroundColor: C.greenDeep }]}>+ Arbeitsblatt</Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* Blue block: Titel / Autor / Altersstuf */}
        <View style={[s.block, s.blockBlue]}>
          <View style={s.row}>
            <Text style={s.label}>Titel:</Text>
            <Text style={[s.value, { fontFamily: 'Helvetica-Bold' }]}>{m.title}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Duerchgefouert vum</Text>
            <Text style={s.value}>{m.author || '—'}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Altersstuf:</Text>
            <View style={[s.value, s.inlineChecks]}>
              {ageLevels.map((a) => (
                <Check key={a.id} checked={has(m.ageLevels, a.id)} label={a.label} />
              ))}
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={s.sectionLabel}>Kuerz Beschreiwung:</Text>
        <Text style={s.para}>{m.shortDescription}</Text>

        {/* Gray block: Typ + Participants */}
        <View style={[s.block, s.blockGray]}>
          <View style={[s.inlineChecks, { marginBottom: 6 }]}>
            {materialTypes.map((t) => (
              <Check key={t.id} checked={has(m.type, t.id)} label={t.id} />
            ))}
          </View>
          <View style={s.row}>
            <Text style={s.labelInk}>Participants:</Text>
            <View style={s.value}>
              {participantModes.map((p) => {
                const found = m.participants.find((x) => x.mode === p.id)
                const lbl = found?.note ? `${p.id} (${found.note})` : p.id
                return <Check key={p.id} checked={!!found} label={lbl} />
              })}
            </View>
          </View>
        </View>

        {/* Salmon block: Tags + Themeberäich (with mini icons) */}
        <View style={[s.block, s.blockSalmon]}>
          <View style={s.row}>
            <Text style={s.labelInk}>Tags:</Text>
            <Text style={s.value}>
              {m.tags.length ? m.tags.map((t) => `#${t}`).join(' ') : '—'}
            </Text>
          </View>
          <View style={[s.row, { alignItems: 'center' }]}>
            <Text style={s.labelInk}>Themeberäich:</Text>
            <View style={[s.value, { flexDirection: 'row', flexWrap: 'wrap' }]}>
              {m.themes.length
                ? m.themes.map((t) => {
                    const c = themeColor(t)
                    return (
                      <View key={t} style={[s.themeChip, { backgroundColor: c.light, borderWidth: 1, borderColor: c.deep }]}>
                        <Icon name={themeIconName(t)} size={11} color={c.deep} />
                        <Text style={[s.themeChipText, { color: c.deep }]}>{themeLabel(t)}</Text>
                      </View>
                    )
                  })
                : <Text>—</Text>}
            </View>
          </View>
        </View>

        <Text
          style={s.footer}
          render={({ pageNumber, totalPages }) =>
            `ISA-App · ${m.title}                                    ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* ---------------- Page 2 · Oflaf + Ziler ---------------- */}
      <Page size="A4" style={s.page}>
        <SectionHead color={tc.deep}>Oflaf</SectionHead>

        {m.ablauf.map((phase, i) => (
          <View key={i} style={[s.ablaufBox, { borderLeftColor: tc.deep }]} wrap>
            {phase.title ? <Text style={s.phaseTitle}>{phase.title}</Text> : null}
            <Text>{phase.text}</Text>
          </View>
        ))}

        {/* Dauer / Material */}
        <View style={[s.metaRow, { marginTop: 2, marginBottom: 8 }]}>
          <View style={[s.metaCell, { flex: 1 }]}>
            <Text style={s.phaseTitle}>Dauer</Text>
            <Text>{m.duration || '—'}</Text>
          </View>
          <View style={[s.metaCell, { flex: 2, borderRightWidth: 0 }]}>
            <Text style={s.phaseTitle}>Material</Text>
            <Text>{m.materialsNeeded || '—'}</Text>
          </View>
        </View>

        {m.remark ? (
          <View style={[s.ablaufBox, { marginBottom: 8, borderLeftColor: C.faint }]}>
            <Text style={s.phaseTitle}>Umierkung</Text>
            <Text>{m.remark}</Text>
          </View>
        ) : null}

        {/* ETEP-Stuf */}
        <Text style={s.sectionLabel}>Méiglech ETEP-Stuf:</Text>
        <View style={[s.inlineChecks, { marginBottom: 8 }]}>
          {etepStufen.map((e) => (
            <Check key={e.id} checked={has(m.etepStufen, e.id)} label={e.label} />
          ))}
        </View>

        {/* ELDiB grid */}
        <Text style={s.sectionLabel}>Méiglech ELDiB-Ziler:</Text>
        <View style={s.gridHeader}>
          {eldibDomains.map((d) => (
            <Text
              key={d.id}
              style={[s.gridHeadCell, { backgroundColor: d.color }]}
            >
              {d.label}
            </Text>
          ))}
        </View>
        {eldibBands.map((band, bi) => (
          <View key={bi} style={s.band} wrap={false}>
            {eldibDomains.map((d) => (
              <View key={d.id} style={s.bandCell}>
                {goalsInBand(band, d.id).map((g) => (
                  <View key={g.id} style={s.goal}>
                    <Box checked={goalSet.has(g.id)} />
                    <Text style={s.goalText}>
                      {g.label} [{g.id}]
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}

        {/* Weider passend Piècen */}
        {m.attachments?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={s.sectionLabel}>Weider passend Piècen:</Text>
            {m.attachments.map((a, i) => (
              <Text key={i} style={s.link}>
                • {a.label} — {a.href}
              </Text>
            ))}
          </View>
        ) : null}

        <Text
          style={s.footer}
          render={({ pageNumber, totalPages }) =>
            `ISA-App · ${m.title}                                    ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* ---------------- Page 3 · Arbeitsblatt (optional) ---------------- */}
      {m.worksheet ? <WorksheetPage material={m} /> : null}
    </Document>
  )
}
