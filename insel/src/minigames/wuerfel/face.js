// Gesicht der Gegenspielerin/des Gegenspielers beim Mäxchen (WP39): ein stilisiertes SVG-Porträt in der Figurenfarbe,
// das den Tell zeigt (grinst einseitig, Blick links unten, Schulter hoch, kratzt sich am Nacken, blinzelt, schaut weg,
// zupft am Ärmel, kaut auf der Lippe). amp 0..1 = Stärke (Profi subtil).
//   faceSvg({ color, skin, hair, tell, amp, mood }) → SVG-String  (mood: 'neutral'|'froh'|'ertappt')
export const TELLS = ['grinst-einseitig', 'blick-links-unten', 'schulter-hoch', 'kratzt-nacken', 'blinzelt', 'blick-weg', 'zupft-aermel', 'kaut-lippe'];

export function faceSvg({ color = '#ffd23f', skin = '#f0c09a', hair = '#3b2a20', tell = null, amp = 0, mood = 'neutral' } = {}) {
  const a = Math.max(0, Math.min(1, amp));
  const t = tell && a > 0 ? tell : null;
  // Augen: Blick (dx, dy), Lidschluss
  let ex = 0, ey = 0, lid = 0, browL = 0, browR = 0, shoulderL = 0, shoulderR = 0, mouth = 'neutral', hand = null, lip = 0;
  if (t === 'blick-links-unten') { ex = -5 * a; ey = 4 * a; }
  if (t === 'blick-weg') { ex = 7 * a; ey = -1 * a; }
  if (t === 'blinzelt') lid = 0.6 * a;
  if (t === 'grinst-einseitig') mouth = 'einseitig';
  if (t === 'schulter-hoch') shoulderR = 9 * a;
  if (t === 'kratzt-nacken') hand = 'nacken';
  if (t === 'zupft-aermel') hand = 'aermel';
  if (t === 'kaut-lippe') lip = a;
  if (mood === 'froh') mouth = 'froh';
  if (mood === 'ertappt') { mouth = 'klein'; browL = -3; browR = -3; }
  const eye = (cx) => `<circle cx="${cx}" cy="70" r="7" fill="#fff"/><circle cx="${cx + ex}" cy="${70 + ey}" r="3.6" fill="#2b1d2e"/>${lid ? `<rect x="${cx - 8}" y="${63}" width="16" height="${14 * lid}" fill="${skin}"/>` : ''}`;
  const mouthPath = mouth === 'einseitig' ? `<path d="M62 96 Q75 ${100 + 6 * a} 90 ${92 - 8 * a}" stroke="#7a3b3b" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : mouth === 'froh' ? `<path d="M60 94 Q75 110 90 94" stroke="#7a3b3b" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
      : mouth === 'klein' ? `<path d="M68 98 Q75 96 82 98" stroke="#7a3b3b" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
        : `<path d="M63 96 Q75 ${99 - 4 * lip} 87 96" stroke="#7a3b3b" stroke-width="3.5" fill="none" stroke-linecap="round"/>${lip ? `<rect x="70" y="94" width="10" height="${4 * lip}" rx="2" fill="#fff"/>` : ''}`;
  const handSvg = hand === 'nacken' ? `<g transform="translate(${100 + 6 * a} ${118 - 10 * a})"><ellipse cx="0" cy="0" rx="9" ry="7" fill="${skin}"/><path d="M-6 -3 L-10 -14" stroke="${skin}" stroke-width="7" stroke-linecap="round"/></g>`
    : hand === 'aermel' ? `<g transform="translate(${44 - 6 * a} ${138})"><ellipse cx="0" cy="0" rx="8" ry="6" fill="${skin}"/><rect x="-14" y="-6" width="10" height="14" rx="3" fill="${color}" opacity=".8"/></g>` : '';
  return `<svg viewBox="0 0 150 150" width="100%" height="100%" aria-hidden="true">
    <circle cx="75" cy="75" r="72" fill="${color}" opacity=".18"/>
    <path d="M22 ${150 - shoulderL} Q40 ${112 - shoulderL} 75 112 Q110 ${112 - shoulderR} 128 ${150 - shoulderR} Z" fill="${color}"/>
    <rect x="65" y="98" width="20" height="18" fill="${skin}"/>
    <ellipse cx="75" cy="72" rx="30" ry="34" fill="${skin}"/>
    <path d="M45 62 Q50 30 75 30 Q100 30 105 62 Q98 44 75 44 Q52 44 45 62 Z" fill="${hair}"/>
    <path d="M55 ${58 + browL} Q62 ${54 + browL} 69 ${58 + browL}" stroke="#3b2a20" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M81 ${58 + browR} Q88 ${54 + browR} 95 ${58 + browR}" stroke="#3b2a20" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${eye(62)}${eye(88)}
    ${mouthPath}
    ${handSvg}
  </svg>`;
}
