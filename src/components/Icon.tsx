import type { ReactNode } from 'react'

// Dünne Linien-Icons (24er-Raster, 1,75 px Strich) im Stil des CDSE Hub.
// Bewusst als eingebettete SVGs – keine Icon-Schrift, keine Emojis, offline.
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.6-4.6" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  download: <path d="M12 3.5v11.5M7 10.5l5 5 5-5M5 20.5h14" />,
  upload: <path d="M12 20.5V9M7 13.5l5-5 5 5M5 3.5h14" />,
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  folder: <path d="M3.5 7.5a2 2 0 0 1 2-2h3.8l2 2.2h7.2a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />,
  filter: <path d="M3.5 6h17M7 12h10M10.5 18h3" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" />
    </>
  ),
  sparkles: (
    <>
      <path d="M11 3.5 12.6 8l4.4 1.6-4.4 1.6L11 15.7l-1.6-4.5L5 9.6 9.4 8z" />
      <path d="M18 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M5 20c0-3.8 3.1-6.3 7-6.3s7 2.5 7 6.3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 9 4.8-9 4.8-9-4.8z" />
      <path d="m3 12.3 9 4.8 9-4.8M3 16.3l9 4.8 9-4.8" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.3 12.3 2.6 2.6 5-5.2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.2M12 7.8v.01" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 4.3 2.9 17.5a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
      <path d="M12 9.5v4.2M12 17v.01" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.2" />
      <path d="M8.5 7V5.3A1.8 1.8 0 0 1 10.3 3.5h3.4a1.8 1.8 0 0 1 1.8 1.8V7M3 12.5h18M10.5 12.5v2h3v-2" />
    </>
  ),
  trash: <path d="M4 7h16M9.5 7V4.5h5V7M6.2 7l.9 12.2a1.5 1.5 0 0 0 1.5 1.3h6.8a1.5 1.5 0 0 0 1.5-1.3L17.8 7M10 11v6M14 11v6" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.5M12 16.8v.01" />
    </>
  ),
  reset: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5" />
      <path d="M3.5 3.5v5h5" />
    </>
  ),
  send: <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9.5" rx="2" />
      <path d="M8.5 11V7.5a3.5 3.5 0 0 1 7 0V11" />
    </>
  ),
  book: <path d="M4.5 4.8A1.8 1.8 0 0 1 6.3 3H19.5v14.5H6.3a1.8 1.8 0 0 0-1.8 1.8zM4.5 19.3A1.8 1.8 0 0 0 6.3 21h13.2v-3.5" />,
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3z" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof PATHS

export function Icon({ name, className = 'ic', title }: { name: IconName; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  )
}
