import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
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
// so generation works fully offline. Checkboxes are drawn (not glyphs) so they
// never depend on font coverage.
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

const s = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingBottom: 44,
    paddingHorizontal: 42,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: C.ink,
    lineHeight: 1.4,
  },
  h1: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 14,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: C.ink,
  },
  // Colored info blocks
  block: { padding: 8, marginBottom: 10 },
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
  para: { marginBottom: 6 },
  // Ablauf
  ablaufBox: {
    borderWidth: 1,
    borderColor: C.border,
    padding: 8,
    marginBottom: 8,
  },
  phaseTitle: { fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  metaRow: { flexDirection: 'row', borderWidth: 1, borderColor: C.border },
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
  wsBand: { borderBottomWidth: 2, borderBottomColor: C.blueDeep, paddingBottom: 6, marginBottom: 8 },
  wsKicker: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.blueDeep },
  wsTitle: { fontSize: 15, fontFamily: 'Helvetica-Bold', marginTop: 2 },
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
  return (
    <Page size="A4" style={s.page}>
      <View style={s.wsBand}>
        <Text style={s.wsKicker}>ARBEITSBLATT</Text>
        <Text style={s.wsTitle}>{w.title || m.title}</Text>
        <View style={s.wsNameRow}>
          <Text>Numm: ____________________________</Text>
          <Text>     Datum: ______________</Text>
        </View>
      </View>
      {w.intro ? <Text style={s.wsIntro}>{w.intro}</Text> : null}
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

  return (
    <Document
      title={m.title}
      author={m.author || 'ISA-App'}
      subject={m.themes.map(themeLabel).join(', ')}
      keywords={m.tags.join(', ')}
    >
      {/* ---------------- Page 1 · Deckblatt ---------------- */}
      <Page size="A4" style={s.page}>
        <Text style={s.h1}>ISA – Material</Text>

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

        {/* Salmon block: Tags + Themeberäich */}
        <View style={[s.block, s.blockSalmon]}>
          <View style={s.row}>
            <Text style={s.labelInk}>Tags:</Text>
            <Text style={s.value}>
              {m.tags.length ? m.tags.map((t) => `#${t}`).join(' ') : '—'}
            </Text>
          </View>
          <View style={s.row}>
            <Text style={s.labelInk}>Themeberäich:</Text>
            <Text style={s.value}>
              {m.themes.length ? m.themes.map(themeLabel).join('   ') : '—'}
            </Text>
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
        <Text style={[s.sectionLabel, { fontSize: 12, marginBottom: 6 }]}>
          Oflaf
        </Text>

        {m.ablauf.map((phase, i) => (
          <View key={i} style={s.ablaufBox} wrap>
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
          <View style={[s.ablaufBox, { marginBottom: 8 }]}>
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
