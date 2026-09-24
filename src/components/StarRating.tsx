import { useState } from 'react'

function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={filled ? '#F2B230' : 'none'}
      stroke={filled ? '#A87300' : '#8C96A8'}
      strokeWidth={1.6}
      strokeLinejoin="round"
    >
      <path d="m12 3.2 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />
    </svg>
  )
}

interface Props {
  value: number
  onChange?: (n: number) => void
  size?: number
  readOnly?: boolean
  /** Label for screen readers, e.g. the material title. */
  label?: string
  className?: string
}

/** 5-Sterne-Bewertung (nur auf diesem Gerät gespeichert). Ein gesetzter Stern
 *  nochmals angeklickt setzt die Bewertung zurück. */
export function StarRating({ value, onChange, size = 16, readOnly = false, label, className = '' }: Props) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  if (readOnly)
    return (
      <span
        role="img"
        aria-label={value ? `Bewertung ${value} von 5` : 'Noch nicht bewertet'}
        className={`inline-flex items-center gap-px ${className}`}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled={n <= value} size={size} />
        ))}
      </span>
    )
  return (
    <div
      role="group"
      aria-label={label ? `Meine Bewertung: ${label}` : 'Meine Bewertung'}
      className={`inline-flex items-center ${className}`}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} von 5 Sternen${value === n ? ' (nochmals klicken zum Zurücksetzen)' : ''}`}
          aria-pressed={n <= value}
          title={value === n ? 'Bewertung zurücksetzen' : `${n} von 5 Sternen`}
          onMouseEnter={() => setHover(n)}
          onFocus={() => setHover(0)}
          onClick={(e) => {
            e.stopPropagation()
            onChange?.(value === n ? 0 : n)
          }}
          className="grid min-h-6 min-w-6 place-items-center rounded-md p-[3px] transition-transform hover:scale-110"
        >
          <Star filled={n <= shown} size={size} />
        </button>
      ))}
    </div>
  )
}
