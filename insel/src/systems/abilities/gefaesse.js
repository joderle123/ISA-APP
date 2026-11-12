// Blick-Stufe „Gläser“ (QUELLE, j1-e04): Zeichnen der Gefäße einer Figur als kleine Tafel über ihrem Kopf.
// Reine String-Bausteine (ohne DOM, testbar): Höhe = wie wichtig, Füllung = wie voll, die größte Lücke leuchtet,
// ein Riss (Blitz-Motor) tropft sichtbar. Formen je Figur: dose (Tun), tintenfass (Jolie), laternenglas (Ilda), glas.
//   vesselSVG(g, form) → '<svg …>' · shelfHTML(glasses, { form, color, icon }) → HTML der Tafel · holdHTML() · folgeHTML(icon, iconFn)
//   GEF_CSS (einmal einhängen) · vesselHeight(wichtig) → Pixel
export const VB = { w: 52, h: 118 };
export const vesselHeight = (wichtig) => Math.round(34 + 70 * Math.max(0, Math.min(1, Number(wichtig) || 0)));
const n1 = (v) => Math.round(v * 10) / 10;

// Körper je Form: äußerer Umriss (Pfad), Innenraum für die Füllung (x, y, w, h), Deko (Metallringe, Korken, Henkel)
function shape(form, hv) {
  const B = VB.h - 4;          // Boden
  const T = B - hv;            // Oberkante
  const cx = VB.w / 2;
  if (form === 'dose') {
    const x = 8, w = 36;
    return {
      outline: `M${x} ${T + 3} Q${x} ${T} ${x + 3} ${T} L${x + w - 3} ${T} Q${x + w} ${T} ${x + w} ${T + 3} L${x + w} ${B - 3} Q${x + w} ${B} ${x + w - 3} ${B} L${x + 3} ${B} Q${x} ${B} ${x} ${B - 3} Z`,
      inner: { x: x + 2, y: T + 3, w: w - 4, h: hv - 5 },
      deco: `<ellipse cx="${cx}" cy="${T + 1.5}" rx="${w / 2}" ry="2.6" class="gf-metal-top"/>` +
        [0.3, 0.68].map((k) => `<line x1="${x}" x2="${x + w}" y1="${n1(T + hv * k)}" y2="${n1(T + hv * k)}" class="gf-ridge"/>`).join('') +
        `<path d="M${cx - 3} ${T - 1} q3 -5 7 -1" class="gf-tab"/>`,
      stroke: 'gf-metal',
    };
  }
  if (form === 'tintenfass') {
    const neck = Math.max(10, hv * 0.22), bodyT = T + neck;
    const x = 5, w = 42, nx = cx - 8, nw = 16;
    return {
      outline: `M${nx} ${T} L${nx + nw} ${T} L${nx + nw} ${bodyT - 2} Q${x + w} ${bodyT - 1} ${x + w} ${bodyT + 9} L${x + w} ${B - 6} Q${x + w} ${B} ${x + w - 6} ${B} L${x + 6} ${B} Q${x} ${B} ${x} ${B - 6} L${x} ${bodyT + 9} Q${x} ${bodyT - 1} ${nx} ${bodyT - 2} Z`,
      inner: { x: x + 2, y: T + 2, w: w - 4, h: hv - 4 },
      deco: `<rect x="${nx + 1.5}" y="${T - 6}" width="${nw - 3}" height="7" rx="2" class="gf-korken"/><path d="M${x + 6} ${bodyT + 8} q4 -4 10 -4" class="gf-glanz"/>`,
      stroke: 'gf-glass',
    };
  }
  if (form === 'laternenglas') {
    const x = 9, w = 34, cap = 8;
    const gT = T + cap;
    return {
      outline: `M${x} ${gT + 5} Q${x} ${gT} ${x + 5} ${gT} L${x + w - 5} ${gT} Q${x + w} ${gT} ${x + w} ${gT + 5} L${x + w} ${B - 4} L${x} ${B - 4} Z`,
      inner: { x: x + 2, y: gT + 2, w: w - 4, h: hv - cap - 6 },
      deco: `<path d="M${x - 2} ${gT} L${x + 4} ${T} L${x + w - 4} ${T} L${x + w + 2} ${gT} Z" class="gf-cap"/><rect x="${x - 3}" y="${B - 4}" width="${w + 6}" height="4" rx="1" class="gf-cap"/>` +
        `<path d="M${cx - 7} ${T} Q${cx} ${T - 10} ${cx + 7} ${T}" class="gf-henkel"/>` +
        [0.33, 0.66].map((k) => `<line x1="${n1(x + w * k)}" x2="${n1(x + w * k)}" y1="${gT}" y2="${B - 4}" class="gf-draht"/>`).join(''),
      stroke: 'gf-glass',
    };
  }
  const x = 8, w = 36;
  return {
    outline: `M${x} ${T} L${x + w} ${T} L${x + w} ${B - 5} Q${x + w} ${B} ${x + w - 5} ${B} L${x + 5} ${B} Q${x} ${B} ${x} ${B - 5} Z`,
    inner: { x: x + 2, y: T + 2, w: w - 4, h: hv - 4 },
    deco: `<rect x="${x - 1}" y="${T - 4}" width="${w + 2}" height="5" rx="2" class="gf-cap"/>`,
    stroke: 'gf-glass',
  };
}

let uid = 0;
export function vesselSVG(g, form = 'glas') {
  const hv = vesselHeight(g.wichtig);
  const S = shape(form, hv);
  const id = 'gf' + (++uid);
  const fillH = Math.max(0, Math.min(1, Number(g.voll) || 0)) * S.inner.h;
  const fy = S.inner.y + S.inner.h - fillH;
  const col = g.color || '#ffd166';
  const crack = g.riss ? `<path d="M${S.inner.x + S.inner.w * 0.62} ${S.inner.y + 4} l-5 9 l6 5 l-4 10 l5 7" class="gf-riss"/>` : '';
  const drops = g.riss ? `<circle cx="${S.inner.x + S.inner.w * 0.62}" cy="${VB.h - 3}" r="2.2" class="gf-drop" style="fill:${col}"/><circle cx="${S.inner.x + S.inner.w * 0.62}" cy="${VB.h - 3}" r="1.8" class="gf-drop gf-drop2" style="fill:${col}"/>` : '';
  return `<svg class="gf-svg" viewBox="0 0 ${VB.w} ${VB.h}" width="${VB.w}" height="${VB.h}" aria-hidden="true">` +
    `<defs><clipPath id="${id}"><path d="${S.outline}"/></clipPath></defs>` +
    `<path d="${S.outline}" class="gf-body"/>` +
    `<g clip-path="url(#${id})"><rect x="0" y="${n1(fy)}" width="${VB.w}" height="${n1(fillH + 6)}" style="fill:${col}" class="gf-fill"/>` +
    (fillH > 1 ? `<rect x="0" y="${n1(fy)}" width="${VB.w}" height="2.2" class="gf-surface"/>` : '') + `</g>` +
    `<path d="${S.outline}" class="gf-outline ${S.stroke}"/>${S.deco}${crack}${drops}</svg>`;
}

// Tafel: eine Reihe Gefäße, darunter Symbol (Bedürfnis-Farbe) und Name; unten zwei Mini-Legenden „wichtig“ / „voll“
export function shelfHTML(glasses, { form = 'glas', color = '#7ff0ff', icon = null } = {}) {
  const ic = (name, size) => (icon ? icon(name, { size }) : '');
  const cols = glasses.map((g) => `<div class="gf-col${g.gross ? ' is-gross' : ''}${g.riss ? ' is-riss' : ''}" data-need="${g.id}" style="--c:${g.color}">` +
    `${vesselSVG(g, form)}<span class="gf-ico">${ic(g.icon, 18)}</span><span class="gf-name">${g.name}</span></div>`).join('');
  const legend = `<div class="gf-legend"><span><svg viewBox="0 0 20 16" width="20" height="16"><rect x="2" y="8" width="5" height="7" rx="1"/><rect x="11" y="1" width="5" height="14" rx="1"/></svg>wichtig</span>` +
    `<span><svg viewBox="0 0 20 16" width="20" height="16"><rect x="6" y="1" width="8" height="14" rx="1.5" class="gf-l-out"/><rect x="7" y="8" width="6" height="6.5" class="gf-l-in"/></svg>voll</span></div>`;
  return `<div class="gf-shelf" style="--npc:${color}"><div class="gf-row">${cols}</div>${legend}</div>`;
}
// Ring „länger hinschauen“ (füllt sich, dann erscheinen die Gefäße)
export function holdHTML(iconHtml = '') {
  const r = 24, C = +(2 * Math.PI * r).toFixed(1);
  return `<svg viewBox="0 0 60 60" width="60" height="60"><circle cx="30" cy="30" r="${r}" class="gf-hold-bg"/><circle cx="30" cy="30" r="${r}" class="gf-hold-fg" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-c="${C}" transform="rotate(-90 30 30)"/></svg><span class="gf-hold-ico">${iconHtml}</span>`;
}
// Folge ohne Ort in der Welt: kleines wackelndes Zeichen über der Figur (z. B. Seil = Winde klemmt)
export function folgeHTML(iconHtml = '') { return `<span class="gf-folge-ico">${iconHtml}</span><span class="gf-folge-x"></span>`; }

export const GEF_CSS = `
.gf-anchor{position:absolute;left:0;top:0;pointer-events:none;z-index:7;transform:translate(-50%,-100%);will-change:transform;transition:opacity .35s ease}
.gf-anchor.is-off{opacity:0}
.gf-shelf{position:relative;isolation:isolate;background:rgba(14,18,40,.8);border-radius:18px;padding:10px 10px 8px;box-shadow:0 0 0 2px var(--npc),0 10px 30px rgba(0,0,0,.35);animation:gfIn .45s cubic-bezier(.2,1.4,.4,1)}
@keyframes gfIn{from{transform:translateY(14px) scale(.85);opacity:0}to{transform:none;opacity:1}}
.gf-row{display:flex;align-items:flex-end;gap:4px}
.gf-col{display:flex;flex-direction:column;align-items:center;width:82px;position:relative;opacity:.88}
.gf-col.is-gross{opacity:1}
.gf-svg{display:block;overflow:visible}
.gf-body{fill:rgba(20,26,52,.9)}
.gf-fill{opacity:.95}
.gf-surface{fill:rgba(255,255,255,.55)}
.gf-outline{fill:none;stroke-width:2.2;stroke-linejoin:round}
.gf-metal{stroke:#dfe7ef}.gf-glass{stroke:#bfe8ff}
.gf-metal-top{fill:rgba(223,231,239,.25);stroke:#dfe7ef;stroke-width:1.6}
.gf-ridge{stroke:rgba(223,231,239,.55);stroke-width:1.3}
.gf-tab{fill:none;stroke:#dfe7ef;stroke-width:1.6}
.gf-korken{fill:#a8743f;stroke:#6b4a30;stroke-width:1}
.gf-glanz{fill:none;stroke:rgba(255,255,255,.5);stroke-width:1.6;stroke-linecap:round}
.gf-cap{fill:#3d3a44;stroke:#9fb3c8;stroke-width:1.2}
.gf-henkel{fill:none;stroke:#9fb3c8;stroke-width:2}
.gf-draht{stroke:rgba(159,179,200,.55);stroke-width:1}
.gf-riss{fill:none;stroke:#fff;stroke-width:1.8;stroke-linejoin:round;filter:drop-shadow(0 0 2px #000)}
.gf-drop{animation:gfDrop 1.1s ease-in infinite}
.gf-drop2{animation-delay:.55s}
@keyframes gfDrop{0%{transform:translateY(-8px);opacity:0}20%{opacity:1}100%{transform:translateY(16px);opacity:0}}
.gf-ico{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--c);color:#14122a;margin-top:4px}
.gf-name{font:800 11px/1.12 system-ui,sans-serif;color:#fff;text-align:center;margin-top:3px;min-height:26px;max-width:82px;overflow-wrap:normal;word-break:keep-all}
.gf-col.is-gross .gf-svg{filter:drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px var(--c)) drop-shadow(0 0 18px var(--c));animation:gfPulse 1.4s ease-in-out infinite}
.gf-col.is-gross .gf-name{color:var(--c);text-shadow:0 0 6px rgba(0,0,0,.8)}
.gf-col.is-gross .gf-ico{box-shadow:0 0 0 3px #fff,0 0 14px 4px var(--c)}
.gf-col.is-gross::before{content:"";position:absolute;left:4px;right:4px;top:-4px;bottom:-2px;border-radius:14px;background:radial-gradient(ellipse at 50% 55%,color-mix(in srgb,var(--c) 30%,transparent),transparent 70%);z-index:-1}
@keyframes gfPulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.gf-legend{display:flex;justify-content:center;gap:14px;margin-top:6px;font:800 12px/1 system-ui,sans-serif;color:rgba(255,255,255,.85)}
.gf-legend span{display:flex;align-items:center;gap:4px}
.gf-legend svg rect{fill:#bfe8ff}.gf-legend .gf-l-out{fill:none;stroke:#bfe8ff;stroke-width:1.5}.gf-legend .gf-l-in{fill:#ffd166}
.gf-hold{width:60px;height:60px;position:relative;transform:translate(-50%,-50%)}
.gf-hold svg{position:absolute;inset:0}
.gf-hold-bg{fill:rgba(14,18,40,.55);stroke:rgba(127,240,255,.3);stroke-width:5}
.gf-hold-fg{fill:none;stroke:#7ff0ff;stroke-width:5;stroke-linecap:round;filter:drop-shadow(0 0 4px #7ff0ff)}
.gf-hold-ico{position:absolute;inset:0;display:grid;place-items:center;color:#7ff0ff}
.gf-folge{width:58px;height:58px;border-radius:50%;background:rgba(14,18,40,.8);box-shadow:0 0 0 3px #ff6b4a,0 0 18px rgba(255,107,74,.7);display:grid;place-items:center;color:#fff;position:relative;animation:gfWobble .5s ease-in-out 4}
.gf-folge-x{position:absolute;right:-4px;top:-4px;width:20px;height:20px;border-radius:50%;background:#ff6b4a;box-shadow:0 0 0 2px #fff}
.gf-folge-x::before,.gf-folge-x::after{content:"";position:absolute;left:4px;right:4px;top:9px;height:2px;background:#fff;transform:rotate(45deg)}
.gf-folge-x::after{transform:rotate(-45deg)}
@keyframes gfWobble{0%,100%{transform:rotate(0)}25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}
html.reduced-fx .gf-shelf,html.reduced-fx .gf-folge,html.reduced-fx .gf-col.is-gross .gf-svg,html.reduced-fx .gf-drop{animation:none}
`;
