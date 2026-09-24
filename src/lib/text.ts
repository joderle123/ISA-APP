// Text helpers shared by the app and the build scripts (scripts/toolbox-index.mjs).

// Abkürzungen, deren Punkt kein Satzende ist (deutsch + luxemburgisch).
const ABBREVIATIONS = [
  'z. B.', 'z.B.', 'u. a.', 'u.a.', 'd. h.', 'd.h.', 'o. ä.', 'o.ä.', 'u. U.', 'z. T.', 'z.T.',
  'bzw.', 'ca.', 'evtl.', 'ggf.', 'usw.', 'etc.', 'bspw.', 'vgl.', 'Nr.', 'inkl.', 'max.', 'min.',
  'Min.', 'Std.', 'sog.', 'mind.', 'insb.', 'jew.', 'Kl.', 'Dr.', 'Abb.', 'S.', 'resp.', 'asw.',
]

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const ABBR_RE = new RegExp(
  '(^|[^\\p{L}])(' + ABBREVIATIONS.map(escapeRe).join('|') + ')',
  'giu',
)

/**
 * First sentence of a text, at most `max` characters (cut at a word boundary
 * with "…" if longer). Abbreviations such as „z. B.“, initials and ordinal
 * numbers („4. Klasse“) do not end a sentence.
 */
export function firstSentence(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim()
  // Same-length copy in which non-final dots are masked, so indices line up.
  const masked = t
    .replace(ABBR_RE, (all) => all.replace(/\./g, '\u0001'))
    .replace(/(^|[\s(])(\p{Lu})\.(?=\s)/gu, (all) => all.replace('.', '\u0001'))
    .replace(/(\d)\.(?=\s)/g, '$1\u0001')
  const end = /[.!?…]+["“”»’']?(?=\s+["„“»(‚'’]?[\p{Lu}\d])/u.exec(masked)
  let s = end ? t.slice(0, end.index + end[0].length) : t
  if (s.length > max) {
    const cut = s.slice(0, max - 1)
    const sp = cut.lastIndexOf(' ')
    s = (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,;:–—-]+$/, '') + '…'
  }
  return s
}
