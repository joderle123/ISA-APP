// Passgenau – Linien-Symbole (24er-Raster, wie im Hub). Eingebettete SVGs, offline, ohne Emojis.
const P: Record<string, string> = {
  hoch: 'M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3a4 4 0 0 0 4-4V6a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1-2 2h-7a3 3 0 0 1-3-3',
  runter: 'M7 13V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2-2l-1-5a2 3 0 0 0-2-2h-7a3 3 0 0 0-3 3',
  tausch: 'M21 17H3M6 10 3 7l3-3M3 7h18M18 20l3-3-3-3',
  stift: 'M4 20h4L18.5 9.5a2.83 2.83 0 0 0-4-4L4 16v4M13.5 6.5l4 4',
  muell: 'M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3',
  auf: 'M12 19V5M6 11l6-6 6 6',
  ab: 'M12 5v14M6 13l6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M18 6 6 18M6 6l12 12',
  check: 'm5 12 5 5L20 7',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 8h.01M11 12h1v4h1',
  drucken: 'M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4M8 13h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1',
  uhr: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7v5l3 3',
  blitz: 'M13 3v7h6l-8 11v-7H5l8-11',
  liste: 'M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01',
  wolke: 'M6.66 18a4.5 4.5 0 0 1-.66-8.95 5.5 5.5 0 0 1 10.6-1.55A4 4 0 0 1 17 18Z',
  herz: 'M19.5 12.57 12 20l-7.5-7.43A5 5 0 1 1 12 6.01a5 5 0 1 1 7.5 6.57',
  lauf: 'M14 2.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4M4 17l5 1 .75-1.5M15 21v-4l-4-3 1-6M7 12V9l5-1 3 3 3 1',
  sprechblase: 'M8 9h8M8 13h6M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z',
  stern: 'm12 17.75-6.17 3.24 1.18-6.87-5-4.86 6.9-1L12 2l3.09 6.26 6.9 1-5 4.86 1.18 6.87Z',
  buch: 'M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6v13M12 6v13M21 6v13',
  person: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2',
  gruppe: 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85',
  pfeil: 'M5 12h14M13 18l6-6M13 6l6 6',
  zurueck: 'M19 12H5M11 18l-6-6M11 6l-6 6',
  lupe: 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14M21 21l-6-6',
  birne: 'M3 12h1M12 3v1M20 12h1M5.6 5.6l.7.7M18.4 5.6l-.7.7M9 16a5 5 0 1 1 6 0 3.5 3.5 0 0 0-1 3 2 2 0 0 1-4 0 3.5 3.5 0 0 0-1-3M9.7 17h4.6',
  ziel: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2',
  griff: 'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
  speichern: 'M6 4h10l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4M14 4v4H8V4',
  teilen: 'M6 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M18 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4',
  schloss: 'M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2M8 11V7a4 4 0 0 1 8 0v4',
  fahne: 'M5 21V4M5 4h11l-2 4 2 4H5',
  feder: 'M20 4c-8 0-13 5-13 13M4 20l3-3M7 17c6 0 11-4 11-11',
  augen: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  kopie: 'M10 8h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2',
  datei: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5',
  rueckgaengig: 'M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11',
  werkzeug: 'M7 10h3V7L6.5 3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1-3 3l-6-6a6 6 0 0 1-8-8L7 10',
  stern_leer: 'm12 17.75-6.17 3.24 1.18-6.87-5-4.86 6.9-1L12 2l3.09 6.26 6.9 1-5 4.86 1.18 6.87Z',
  hub: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM9 21h6M12 17v4',
  schild: 'M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6z',
  welle: 'M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0',
  pinsel: 'M3 21v-4a4 4 0 1 1 4 4H3M21 3A16 16 0 0 0 8.2 13.2M21 3a16 16 0 0 1-10.2 12.8M10.6 9a9 9 0 0 1 4.4 4.4',
  schere: 'M6 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6M8.6 8.6 19 19M8.6 15.4 19 5',
  kreuz: 'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m3 8 2 2 4-4',
  kreis: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',
  zeigen: 'M8 13V4.5a1.5 1.5 0 0 1 3 0V12M11 11.5v-2a1.5 1.5 0 0 1 3 0V12M14 10.5a1.5 1.5 0 0 1 3 0V12M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a7 7 0 0 1-5-3l-2.7-5.25a1.5 1.5 0 0 1 2.4-1.75L8 15',
  partner: 'M9 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M16 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 21v-2a4 4 0 0 1 4-4h4M13 15h4a4 4 0 0 1 4 4v2',
  ohr: 'M6 8.5a6 6 0 1 1 12 0c0 2.5-1.5 3.5-3 5-1 1-1.5 2-1.5 3.5a3 3 0 0 1-5.5 1.5M9 9a3 3 0 0 1 6 0',
  kleber: 'M9 3h6v4H9zM8 7h8l1 14H7z',
  linie: 'M4 18h16M4 12h10',
}

export type Zeichen = keyof typeof P | string

export function Ic({ n, className = 'ic', titel }: { n: Zeichen; className?: string; titel?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden={titel ? undefined : true} role={titel ? 'img' : undefined} aria-label={titel}>
      <path d={P[n] ?? P.kreis} />
    </svg>
  )
}

/** Arbeitsanweisungs-Symbol (Blatt) → Zeichen */
export const SYMBOL_ZEICHEN: Record<string, Zeichen> = {
  malen: 'pinsel',
  schreiben: 'stift',
  lesen: 'buch',
  schneiden: 'schere',
  kleben: 'kleber',
  ankreuzen: 'kreuz',
  einkreisen: 'kreis',
  verbinden: 'linie',
  sprechen: 'sprechblase',
  zuhoeren: 'ohr',
  nachdenken: 'birne',
  zeigen: 'zeigen',
  partner: 'partner',
  gruppe: 'gruppe',
}
