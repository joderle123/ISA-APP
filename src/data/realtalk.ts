// REAL TALK: das Heft der Jugendlichen zu jedem Modul von Kursjahr 1 (Quelle: dossiers/).
// Die PDFs liegen als eigene Dateien neben der Toolbox (offline/real-talk/ → im Hub apps/real-talk/).

export interface RealTalkHeft {
  nr: string
  thema: string
  datei: string
  /** Film des Trimesters steht in diesem Heft */
  kino?: string
}

const ORDNER = 'real-talk'

/** Heft je Modul (Modul 8 und 9 teilen sich die letzte Ausgabe). */
const HEFTE: Record<string, RealTalkHeft> = {
  'j1-m0': { nr: '00', thema: 'Neu hier', datei: 'Real-Talk-00-Neu-hier' },
  'j1-m1': { nr: '01', thema: 'Ich', datei: 'Real-Talk-01-Ich', kino: 'Spider-Man: A New Universe' },
  'j1-m2': { nr: '02', thema: 'Gefühle', datei: 'Real-Talk-02-Gefuehle' },
  'j1-m3': { nr: '03', thema: 'Druck', datei: 'Real-Talk-03-Druck', kino: 'Creed' },
  'j1-m4': { nr: '04', thema: 'Gedanken', datei: 'Real-Talk-04-Gedanken' },
  'j1-m5': { nr: '05', thema: 'Grenzen', datei: 'Real-Talk-05-Grenzen' },
  'j1-m6': { nr: '06', thema: 'Ärger', datei: 'Real-Talk-06-Aerger' },
  'j1-m7': { nr: '07', thema: 'Netz', datei: 'Real-Talk-07-Netz', kino: 'Nerve' },
  'j1-m8': { nr: '08', thema: 'Akku', datei: 'Real-Talk-08-Akku' },
  'j1-m9': { nr: '08', thema: 'Akku', datei: 'Real-Talk-08-Akku' },
}

export const realTalkHeft = (modulId: string): RealTalkHeft | undefined => HEFTE[modulId]
export const realTalkLink = (datei: string): string => `${ORDNER}/${datei}.pdf`
export const REAL_TALK_JAHRESPLAN = realTalkLink('Real-Talk-Jahresplan')
