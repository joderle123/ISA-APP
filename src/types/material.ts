// ---------------------------------------------------------------------------
// Core data model for an ISA material.
//
// A single Material object is the one source of truth: it feeds both the
// filterable library cards AND the generated PDF (which reproduces the
// original "ISA – Material" template).
// ---------------------------------------------------------------------------

/** Luxembourg education cycles + secondary. */
export type AgeLevel = 'C1' | 'C2' | 'C3' | 'C4' | 'ES'

/** Format of the material (kept in Luxembourgish to match the template). */
export type MaterialType = 'Aktivitéit' | 'ganz Stonn' | 'Projet' | 'Hospi'

/** Social setting. */
export type ParticipantMode = 'Individuel' | 'Grupp' | 'Klass'

/** ETEP developmental stages 1–5. */
export type EtepStufe = 1 | 2 | 3 | 4 | 5

/** ELDiB developmental domains. */
export type EldibDomain = 'V' | 'K' | 'SOZ' | 'KOG'

/** Working language of the material's content. */
export type Language = 'de' | 'lb' | 'en' | 'fr'

export interface ParticipantInfo {
  mode: ParticipantMode
  /** Free-text size note, e.g. "+/- 8 Kanner". */
  note?: string
}

export interface AblaufPhase {
  /** Optional sub-heading, e.g. "Einstieg", "Hauptteil", "Abschluss". */
  title?: string
  /** Body text. Newlines are preserved when rendered. */
  text: string
}

export interface Attachment {
  label: string
  /** Bundled reference PDF path or an external URL. */
  href: string
  kind: 'pdf' | 'link' | 'video'
}

export interface Material {
  id: string
  title: string
  author?: string

  ageLevels: AgeLevel[]
  type: MaterialType[]
  participants: ParticipantInfo[]

  /** Theme-area ids (see taxonomy `themes`). */
  themes: string[]
  /** Free hashtags without the leading '#'. */
  tags: string[]

  shortDescription: string
  ablauf: AblaufPhase[]

  duration?: string
  materialsNeeded?: string
  remark?: string

  etepStufen: EtepStufe[]
  /** ELDiB goal ids, e.g. "V-19", "K-15", "SOZ-32", "KOG-7". */
  eldibGoals: string[]

  attachments?: Attachment[]

  language: Language
  /** Provenance: digitised original vs. AI-generated for the library. */
  source: 'original' | 'generated'
}
