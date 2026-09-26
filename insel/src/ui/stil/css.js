// Stil-Studio: Stile (werden vom Plugin als <style> eingefügt). Touch-Ziele ≥ 64 px, Hoch- und Querformat.
export const STIL_CSS = `
.ov-stil .ov-card { width: 100%; height: 100%; max-height: 100%; }
.ov-stil .ov-body { padding: 0; display: flex; overflow: hidden; }
.st-wrap { display: flex; width: 100%; height: 100%; min-height: 0; min-width: 0; }
.st-left { flex: 0 0 40%; display: flex; flex-direction: column; min-width: 0; min-height: 0; border-right: 1px solid rgba(255,255,255,0.12); }
.st-preview { position: relative; flex: 1; min-height: 0; background: radial-gradient(ellipse at 50% 70%, rgba(255,107,107,0.22), transparent 60%), radial-gradient(ellipse at 50% 20%, rgba(88,196,255,0.22), transparent 55%), linear-gradient(180deg, #2a1850, #1b1033); }
.st-preview canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; touch-action: none; cursor: grab; }
.st-turn { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
.st-turn .btn { min-width: 64px; padding: 0 16px; background: rgba(24,14,44,0.55); }
.st-handle { position: absolute; top: 10px; left: 12px; right: 12px; display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 14px; border-radius: 18px; background: rgba(24,14,44,0.62); border: 1px solid rgba(255,255,255,0.16); }
.st-handle small { display: block; font-size: calc(12px * var(--txt-scale)); font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-gold); }
.st-handle b { display: block; font-size: calc(20px * var(--txt-scale)); font-weight: 900; line-height: 1.1; }
.st-handle .st-handle-text { flex: 1; min-width: 0; }
.st-handle .btn { min-width: 56px; min-height: 56px; padding: 0 12px; }
.st-emotes { flex: none; display: flex; gap: 8px; padding: 10px 12px; overflow-x: auto; border-top: 1px solid rgba(255,255,255,0.1); }
.st-emotes .st-opt { flex: none; }
.st-right { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.st-tabs { flex: none; display: flex; gap: 6px; padding: 10px 12px 6px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.st-tab { flex: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-width: 84px; min-height: 64px; padding: 4px 10px; border-radius: 16px; color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); border: 2px solid transparent; font-size: calc(13px * var(--txt-scale)); font-weight: 800; }
.st-tab.is-on { color: #fff; background: rgba(255,255,255,0.14); border-color: var(--c-gold); }
.st-tab.is-new::after { content: "Neu"; position: absolute; }
.st-panel { flex: 1; min-height: 0; padding: 6px 16px 18px; }
.st-group { margin: 0 0 14px; }
.st-group h4 { display: flex; align-items: center; gap: 8px; margin: 10px 0 8px; font-size: calc(14px * var(--txt-scale)); font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-gold); }
.st-group h4 .st-hint { margin-left: auto; font-size: calc(13px * var(--txt-scale)); letter-spacing: 0; text-transform: none; color: rgba(255,255,255,0.7); font-weight: 700; }
.st-opts { display: flex; flex-wrap: wrap; gap: 8px; }
.st-opt { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 64px; min-width: 64px; padding: 0 16px; border-radius: 18px; color: #fff; background: rgba(255,255,255,0.09); border: 2px solid rgba(255,255,255,0.14); font-size: calc(16px * var(--txt-scale)); font-weight: 800; transition: transform 0.08s ease; }
.st-opt:active { transform: scale(0.96); }
.st-opt.is-on { background: var(--c-mint); color: var(--ink); border-color: transparent; }
.st-opt.is-locked { opacity: 0.55; border-style: dashed; }
.st-opt.is-locked .st-lock { color: var(--c-gold); }
.st-opt .st-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--c); border: 2px solid rgba(255,255,255,0.6); flex: none; }
.st-opt.is-item { flex-direction: column; gap: 4px; min-width: 112px; max-width: 150px; padding: 10px 10px 8px; text-align: center; line-height: 1.15; }
.st-opt.is-item small { font-size: calc(12px * var(--txt-scale)); font-weight: 700; opacity: 0.75; }
.st-opt.is-item.is-on small { opacity: 0.85; }
.st-swatches { display: flex; flex-wrap: wrap; gap: 10px; }
.st-swatch { position: relative; width: 56px; height: 56px; border-radius: 50%; background: var(--c); border: 3px solid rgba(255,255,255,0.22); box-shadow: inset 0 -6px 12px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.35); }
.st-swatch.is-on { border-color: #fff; box-shadow: 0 0 0 4px var(--c-gold), inset 0 -6px 12px rgba(0,0,0,0.25); }
.st-swatch.is-new::after { content: ""; position: absolute; top: -4px; right: -4px; width: 14px; height: 14px; border-radius: 50%; background: var(--c-coral); border: 2px solid #fff; }
.st-slider { display: flex; align-items: center; gap: 12px; min-height: 64px; }
.st-slider span { flex: none; min-width: 64px; font-size: calc(15px * var(--txt-scale)); font-weight: 800; opacity: 0.85; text-align: center; }
.st-slider input[type=range] { flex: 1; min-width: 0; height: 56px; margin: 0; -webkit-appearance: none; appearance: none; background: transparent; }
.st-slider input[type=range]::-webkit-slider-runnable-track { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.18); }
.st-slider input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 40px; height: 40px; margin-top: -14px; border-radius: 50%; background: var(--c-gold); border: 3px solid #fff; box-shadow: 0 3px 8px rgba(0,0,0,0.4); }
.st-slider input[type=range]::-moz-range-track { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.18); }
.st-slider input[type=range]::-moz-range-thumb { width: 40px; height: 40px; border-radius: 50%; background: var(--c-gold); border: 3px solid #fff; }
.st-foot { flex: none; display: flex; align-items: center; gap: 10px; padding: 10px 16px calc(10px + var(--safe-b)); border-top: 1px solid rgba(255,255,255,0.12); }
.st-foot .st-spacer { flex: 1; }
.st-note { margin: 6px 0 0; font-size: calc(14px * var(--txt-scale)); font-weight: 700; opacity: 0.7; }
.stil-card .btn { margin-left: auto; }
.stil-extras { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
@media (max-aspect-ratio: 1/1) {
  .st-wrap { flex-direction: column; }
  .st-left { flex: 0 0 44%; border-right: 0; border-bottom: 1px solid rgba(255,255,255,0.12); }
  /* Hochformat: Spielname kompakt oben links, damit der Kopf der Figur frei bleibt */
  .st-handle { left: 10px; right: auto; max-width: 46%; padding: 6px 6px 6px 12px; }
  .st-handle b { font-size: calc(17px * var(--txt-scale)); }
}
@media (max-width: 700px) {
  .st-opt { min-width: 56px; padding: 0 12px; }
  .st-tab { min-width: 74px; }
}
`;
