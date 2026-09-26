// Halt-Ring (WP14, HUD): erscheint nur beim Klettern über der Figur. Segmente = Wurzeln (Basis 3, max. 12):
// gefüllte Segmente tragen, das aktuelle leert sich, auf Simsen füllt es sich. Segmentformen (Marker) statt nur Farbe:
// wurzel = glatt · mensch = Kreis · ort = Quadrat · tier = Dreieck · karte = Raute, damit der Ring ohne Farbsehen lesbar ist.
//   const ring = createHaltRing({ root, game, events }); ring.setKinds([...]); ring.update() (jedes Bild)
const CSS = `
.haltring{position:absolute;left:0;top:0;width:118px;height:118px;margin:-59px 0 0 -59px;z-index:9;pointer-events:none;opacity:0;transition:opacity .25s ease;filter:drop-shadow(0 2px 4px rgba(0,0,0,.55))}
.haltring.is-on{opacity:1}
.haltring svg{width:118px;height:118px;display:block;overflow:visible}
.haltring .hr-bg{fill:none;stroke:rgba(20,10,40,.55);stroke-width:11}
.haltring .hr-seg{fill:none;stroke:#9fe8b0;stroke-width:9;stroke-linecap:butt;transition:stroke .2s ease}
.haltring .hr-seg.is-empty{stroke:rgba(255,255,255,.16)}
.haltring .hr-seg.is-part{stroke:#ffd166}
.haltring.is-ledge .hr-seg{stroke:#7ff0ff}
.haltring.is-sliding .hr-seg{stroke:#ff8c8c}
.haltring .hr-mark{fill:#fff;stroke:rgba(0,0,0,.5);stroke-width:1}
.haltring .hr-txt{fill:#fff;font:900 14px var(--font,system-ui);text-anchor:middle;dominant-baseline:middle}
.haltring .hr-sub{fill:#fff;font:800 10px var(--font,system-ui);text-anchor:middle;dominant-baseline:middle;opacity:.85}
`;
const MARK = {
  wurzel: null,
  mensch: (x, y) => `<circle class="hr-mark" cx="${x}" cy="${y}" r="3.2"/>`,
  ort: (x, y) => `<rect class="hr-mark" x="${x - 3}" y="${y - 3}" width="6" height="6"/>`,
  tier: (x, y) => `<path class="hr-mark" d="M${x} ${y - 3.6} L${x + 3.4} ${y + 2.6} L${x - 3.4} ${y + 2.6} Z"/>`,
  karte: (x, y) => `<path class="hr-mark" d="M${x} ${y - 3.8} L${x + 3.4} ${y} L${x} ${y + 3.8} L${x - 3.4} ${y} Z"/>`,
};

export function createHaltRing({ root, game, events }) {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);
  const el = document.createElement('div');
  el.className = 'haltring';
  el.setAttribute('aria-hidden', 'true');
  root.appendChild(el);
  let kinds = ['wurzel', 'wurzel', 'wurzel'];
  let cur = 3, max = 3, ledge = false, sliding = false, visible = false, hideT = 0, lastKey = '';
  const R = 46, C = 59;

  function arc(a0, a1) {
    const p = (a) => `${(C + Math.cos(a) * R).toFixed(1)} ${(C + Math.sin(a) * R).toFixed(1)}`;
    return `M ${p(a0)} A ${R} ${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)}`;
  }
  function render() {
    const key = `${max}|${cur.toFixed(2)}|${ledge}|${sliding}|${kinds.join(',')}`;
    if (key === lastKey) return;
    lastKey = key;
    const n = Math.max(1, max);
    const gap = 0.07;
    let html = `<svg viewBox="0 0 118 118"><circle class="hr-bg" cx="${C}" cy="${C}" r="${R}"/>`;
    for (let i = 0; i < n; i++) {
      const a0 = -Math.PI / 2 + (i / n) * Math.PI * 2 + gap / 2, a1 = -Math.PI / 2 + ((i + 1) / n) * Math.PI * 2 - gap / 2;
      const fill = Math.max(0, Math.min(1, cur - i));
      if (fill <= 0) html += `<path class="hr-seg is-empty" d="${arc(a0, a1)}"/>`;
      else if (fill >= 0.999) html += `<path class="hr-seg" d="${arc(a0, a1)}"/>`;
      else { html += `<path class="hr-seg is-empty" d="${arc(a0, a1)}"/><path class="hr-seg is-part" d="${arc(a0, a0 + (a1 - a0) * fill)}"/>`; }
      const k = kinds[i] || 'wurzel';
      const m = MARK[k] || MARK.karte;
      if (m) { const am = (a0 + a1) / 2; html += m(C + Math.cos(am) * R, C + Math.sin(am) * R); }
    }
    html += `<text class="hr-txt" x="${C}" y="${C - 4}">${Math.ceil(cur - 0.001)}/${max}</text><text class="hr-sub" x="${C}" y="${C + 12}">${sliding ? 'rutscht' : ledge ? 'Sims' : 'Halt'}</text></svg>`;
    el.innerHTML = html;
    el.classList.toggle('is-ledge', ledge && !sliding);
    el.classList.toggle('is-sliding', sliding);
  }
  events.on('halt:change', (e) => {
    cur = e.current; max = e.max; ledge = !!e.ledge; sliding = !!e.sliding;
    if (e.climbing) { visible = true; hideT = 0; }
    render();
  });
  events.on('climb:start', () => { visible = true; hideT = 0; el.classList.add('is-on'); });
  events.on('climb:end', () => { hideT = 0.9; });

  const v = { x: 0, y: 0, z: 0 };
  const api = {
    el,
    get visible() { return visible; },
    setKinds(list) { kinds = list && list.length ? list.slice(0, 12) : ['wurzel']; lastKey = ''; render(); },
    // jedes Bild: über der Figur platzieren (Projektion), Ausblenden nach dem Klettern
    update(dt) {
      if (hideT > 0) { hideT -= dt; if (hideT <= 0) { visible = false; el.classList.remove('is-on'); } }
      if (!visible) return;
      el.classList.add('is-on');
      const p = game.player.position;
      const cam = game.camera;
      v.x = p.x; v.y = p.y + 2.35; v.z = p.z;
      const ndc = new game.THREE.Vector3(v.x, v.y, v.z).project(cam);
      const W = root.clientWidth, H = root.clientHeight;
      const sx = (ndc.x * 0.5 + 0.5) * W, sy = (-ndc.y * 0.5 + 0.5) * H;
      const behind = ndc.z > 1;
      el.style.left = (behind ? W / 2 : Math.max(70, Math.min(W - 70, sx))) + 'px';
      el.style.top = (behind ? 120 : Math.max(80, Math.min(H - 80, sy))) + 'px';
    },
  };
  render();
  return api;
}
