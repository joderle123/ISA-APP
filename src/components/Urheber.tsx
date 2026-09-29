// Urheber-Vermerk (Text: lib/urheber.ts) mit dem CDSE-Logo davor – in der Ansicht und im Druck,
// wie in der Fußzeile der PDFs. Das Logo ist Schmuck (alt=""): der Vermerk nennt das CDSE schon.
import { CDSE_LOGO } from '../lib/cdse-logo'

export function Urheber({ text, className = 'urheber', lang }: { text: string; className?: string; lang?: string }) {
  return (
    <p className={className} lang={lang}>
      <img className="urheber-logo" src={CDSE_LOGO} alt="" />
      {text}
    </p>
  )
}
