import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { Material } from '../types/material'

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
    </Document>
  )
}
