// RESPAWN – Stil der Oberfläche (wird als <style data-rs> eingefügt). Dunkles Glas über der Welt, große Ziele (≥ 48 px),
// Schrift ≥ 15 px. Farben: Druck grün → gelb → rot; Karten in ihrer eigenen Farbe (--kf).
export const STIL = `
.mode-respawn .hud-btn-power,.mode-respawn .glimm-badge,.mode-respawn .quest-objective,.mode-respawn .objective,.mode-respawn [data-objective]{display:none !important;}
.mode-respawn.rs-szene .joystick,.mode-respawn.rs-szene .hud-buttons,.mode-respawn.rs-szene .compass{opacity:0 !important;pointer-events:none !important;}
.mode-respawn .choices.rs-wahl{bottom:calc(22px + var(--safe-b,0px));width:min(720px,calc(100vw - 32px));}
.rs-leiste{position:absolute;left:50%;top:max(12px,env(safe-area-inset-top));transform:translateX(-50%);transition:left .3s,transform .3s;display:flex;align-items:center;gap:10px;padding:7px 8px 7px 14px;
  background:rgba(16,14,34,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.14);border-radius:999px;color:#fff;font-size:15px;font-weight:700;z-index:30;white-space:nowrap;}
.rs-leiste.is-hidden{display:none;}
.rs-szene .rs-leiste{left:max(14px,env(safe-area-inset-left));transform:none;}
.rs-szene .rs-jz,.rs-szene .rs-kraft{display:none;}
.rs-jz{opacity:.85;font-weight:600;}
.rs-druck{display:flex;align-items:center;gap:8px;}
.rs-druck b{font-size:13px;letter-spacing:.06em;text-transform:uppercase;opacity:.8;}
.rs-druck i{display:block;width:clamp(90px,16vw,170px);height:12px;border-radius:99px;background:rgba(255,255,255,.16);overflow:hidden;}
.rs-druck u{display:block;height:100%;border-radius:99px;background:#5fe08a;transition:width .6s cubic-bezier(.2,.8,.2,1),background .4s;text-decoration:none;}
.rs-leiste[data-zone="gelb"] .rs-druck u{background:#ffcf4a;}
.rs-leiste[data-zone="rot"] .rs-druck u{background:#ff4d4d;animation:rs-puls .7s ease-in-out infinite alternate;}
@keyframes rs-puls{from{filter:brightness(1)}to{filter:brightness(1.5)}}
.rs-geld{font-variant-numeric:tabular-nums;}
.rs-handy{position:relative;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.14);font-size:21px;cursor:pointer;}
.rs-handy em{position:absolute;right:4px;top:4px;width:12px;height:12px;border-radius:50%;background:#ff4f8b;border:2px solid #100e22;}
.rs-rot{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .8s;z-index:4;background:radial-gradient(ellipse at center,transparent 52%,rgba(255,40,40,.42) 100%);}
.rs-rot.is-gelb{opacity:.35;background:radial-gradient(ellipse at center,transparent 60%,rgba(255,190,40,.3) 100%);}
.rs-rot.is-rot{opacity:1;animation:rs-herz 1s ease-in-out infinite;}
@keyframes rs-herz{0%,100%{opacity:.75}18%{opacity:1}36%{opacity:.8}}
.rs-meld{position:absolute;left:50%;top:calc(max(12px,env(safe-area-inset-top)) + 64px);transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;z-index:31;pointer-events:none;}
.rs-m{padding:6px 14px;border-radius:99px;background:rgba(16,14,34,.82);color:#fff;font-size:15px;font-weight:600;animation:rs-rein .3s ease-out;transition:opacity .45s,transform .45s;}
.rs-m.is-weg{opacity:0;transform:translateY(-8px);}
.rs-m.ist-hoch{color:#ff9c8a;}.rs-m.ist-runter{color:#8ff0b0;}.rs-m.ist-gut{color:#ffd9e6;}.rs-m.ist-schlecht{color:#c9c2e8;}
@keyframes rs-rein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.rs-zeile{position:absolute;left:50%;bottom:max(26px,env(safe-area-inset-bottom));transform:translate(-50%,14px);width:min(680px,calc(100% - 32px));padding:16px 46px 16px 20px;border-radius:18px;cursor:pointer;
  background:rgba(16,14,34,.86);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.14);color:#fff;opacity:0;transition:opacity .16s,transform .16s;z-index:32;}
.rs-zeile.is-da{opacity:1;transform:translate(-50%,0);}
.rs-zeile p{margin:0;font-size:clamp(18px,2.4vw,22px);line-height:1.35;font-weight:600;}
.rs-zeile small{display:block;font-size:13px;letter-spacing:.07em;text-transform:uppercase;font-weight:700;opacity:.9;margin-bottom:4px;}
.rs-zeile.ist-ged{background:rgba(34,26,66,.88);border-style:dashed;}
.rs-zeile.ist-ged p{font-style:italic;font-weight:500;}
.rs-zeile.ist-ged small{color:#b9b2e0;}
.rs-weiter{position:absolute;right:16px;bottom:12px;font-size:20px;opacity:.7;animation:rs-tipp 1s ease-in-out infinite alternate;}
@keyframes rs-tipp{to{transform:translateX(4px);opacity:1}}
.rs-wahl .choice.tone-rs-hart{--tile:#ff6b57;}
.rs-wahl .choice.tone-rs-mut{--tile:#4d8cff;}
.rs-wahl .choice .choice-icon{font-size:24px;display:grid;place-items:center;}
.rs-wahl .choice.is-disabled{opacity:.5;filter:saturate(.3);}
.rs-wahl .choice small{display:block;font-size:13px;font-weight:600;opacity:.85;margin-top:2px;}
.rs-wahl .choice.rs-karte{box-shadow:inset 0 0 0 2px var(--tile,#fff);}
.rs-uhr{height:8px;border-radius:99px;background:rgba(255,255,255,.18);overflow:hidden;margin:0 0 10px;}
.rs-uhr i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#ff4d4d,#ffcf4a);transform-origin:left;animation:rs-uhr linear forwards;}
@keyframes rs-uhr{from{transform:scaleX(1)}to{transform:scaleX(0)}}
.rs-naechst{position:absolute;right:max(18px,env(safe-area-inset-right));top:calc(max(12px,env(safe-area-inset-top)) + 70px);z-index:30;font:inherit;font-weight:800;font-size:17px;min-height:52px;padding:0 20px;border-radius:99px;border:0;color:#fff;cursor:pointer;
  background:linear-gradient(180deg,#ff8a5c,#ff5a7a);box-shadow:0 10px 24px -10px #ff5a7a;animation:rs-rein .4s ease-out,rs-wink 1.6s ease-in-out 1.2s infinite;}
@keyframes rs-wink{0%,100%{transform:none}50%{transform:translateY(-3px)}}
.rs-voll{position:absolute;inset:0;z-index:40;display:grid;place-items:center;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom));overflow:auto;
  background:linear-gradient(180deg,rgba(14,11,34,.9),rgba(22,14,48,.94));color:#fff;opacity:0;transition:opacity .3s;}
.rs-voll.is-da{opacity:1;}
.rs-voll.ist-titel{background:rgba(10,8,24,.72);cursor:pointer;}
.rs-voll.ist-start{background:linear-gradient(180deg,rgba(14,11,34,.5),rgba(22,14,48,.86));}
.rs-tk{text-align:center;animation:rs-rein .5s ease-out;}
.rs-tk small{font-size:16px;letter-spacing:.2em;text-transform:uppercase;opacity:.75;}
.rs-tk h2{margin:6px 0 0;font-size:clamp(46px,9vw,92px);letter-spacing:-.02em;line-height:1;}
.rs-kz,.rs-ende,.rs-start{width:min(900px,100%);display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;}
.rs-voll h1{margin:0;font-size:clamp(52px,11vw,110px);letter-spacing:.04em;line-height:1;background:linear-gradient(180deg,#fff,#ffb38a);-webkit-background-clip:text;background-clip:text;color:transparent;}
.rs-voll h2{margin:0;font-size:clamp(26px,4.4vw,38px);}
.rs-voll h3{margin:0 0 8px;font-size:18px;}
.rs-lead{margin:0;font-size:17px;opacity:.85;}
.rs-klein{margin:6px 0 0;font-size:14px;opacity:.65;max-width:46ch;}
.rs-reihe{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;width:100%;}
.rs-karte{flex:1 1 200px;max-width:260px;padding:16px 14px;border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:2px solid var(--kf);text-align:center;box-shadow:0 12px 30px -14px var(--kf);animation:rs-karte .5s cubic-bezier(.2,.9,.2,1) backwards;}
.rs-karte:nth-child(2){animation-delay:.12s}.rs-karte:nth-child(3){animation-delay:.24s}
@keyframes rs-karte{from{opacity:0;transform:translateY(24px) rotate(-3deg) scale(.94)}to{opacity:1;transform:none}}
.rs-kz.ist-selbst .rs-karte{cursor:pointer;border-style:dashed;}
.rs-karte small{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--kf);font-weight:800;}
.rs-kb{display:block;font-size:42px;line-height:1.2;margin:4px 0;}
.rs-karte h3{font-size:19px;margin:0 0 8px;}
.rs-karte p{margin:6px 0 0;font-size:15px;line-height:1.35;text-align:left;padding-left:22px;position:relative;}
.rs-schwer::before{content:'–';position:absolute;left:4px;color:#ff9c8a;font-weight:800;}
.rs-stark::before{content:'+';position:absolute;left:4px;color:#8ff0b0;font-weight:800;}
.rs-reihe.ist-klein .rs-karte{flex-basis:160px;padding:10px;}
.rs-reihe.ist-klein .rs-kb{font-size:30px;}
.rs-knoepfe{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:6px;}
.rs-knoepfe.ist-spalte{flex-direction:column;width:min(340px,100%);}
.rs-voll button,.rs-tabs button{font:inherit;font-weight:700;font-size:17px;min-height:52px;padding:0 22px;border-radius:14px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.1);color:#fff;cursor:pointer;}
.rs-voll button.ist-haupt{background:linear-gradient(180deg,#ff8a5c,#ff5a7a);border-color:transparent;box-shadow:0 10px 24px -10px #ff5a7a;}
.rs-voll button:active{transform:scale(.97);}
.rs-frei{flex:1 1 170px;max-width:210px;display:flex !important;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:16px 10px !important;min-height:130px !important;}
.rs-frei b{font-size:16px;line-height:1.25;}
.rs-ausgang{width:100%;padding:18px;border-radius:20px;border:2px solid var(--kf);background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.03));box-shadow:0 16px 40px -18px var(--kf);}
.rs-ausgang small{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--kf);font-weight:800;}
.rs-ausgang p{margin:6px 0 0;font-size:17px;}
.rs-akte,.rs-andere{width:100%;text-align:left;padding:14px 16px;border-radius:16px;background:rgba(255,255,255,.06);}
.rs-akte table{width:100%;border-collapse:collapse;font-size:15px;}
.rs-akte th{text-align:left;font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.7;padding:0 8px 6px 0;}
.rs-akte td{vertical-align:top;padding:8px 8px 8px 0;border-top:1px solid rgba(255,255,255,.12);width:50%;line-height:1.35;}
.rs-akte td:first-child{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;color:#d9d3f5;}
.rs-akte td:last-child{font-weight:600;}
.rs-andere details{border-top:1px solid rgba(255,255,255,.12);padding:8px 0;}
.rs-andere summary{cursor:pointer;font-weight:700;font-size:16px;min-height:32px;}
.rs-andere p{margin:6px 0 0 14px;font-size:16px;font-style:italic;}
.rs-album{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px;}
.rs-aus{padding:12px 8px;border-radius:14px;text-align:center;border:2px dashed rgba(255,255,255,.22);opacity:.75;display:flex;flex-direction:column;gap:2px;}
.rs-aus.ist-da{border:2px solid var(--kf);opacity:1;background:rgba(255,255,255,.06);}
.rs-aus .rs-kb{font-size:32px;}
.rs-aus b{font-size:15px;line-height:1.2;}
.rs-aus small{font-size:13px;opacity:.75;line-height:1.25;}
.rs-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.rs-tabs button{min-height:44px;font-size:15px;padding:0 14px;color:inherit;border-color:rgba(127,127,127,.4);background:transparent;}
.rs-tabs button.ist-an{background:#2a2350;color:#fff;border-color:#2a2350;}
.rs-chat{padding:10px 12px;border-radius:14px 14px 14px 4px;background:rgba(127,127,160,.16);margin:0 0 8px;max-width:88%;}
.rs-chat b{font-size:13px;opacity:.75;}
.rs-chat p{margin:2px 0 0;font-size:16px;}
.rs-leut{display:grid;grid-template-columns:1fr auto;gap:0 10px;padding:8px 0;border-bottom:1px solid rgba(127,127,127,.25);}
.rs-leut b{font-size:16px;}.rs-leut i{font-style:normal;letter-spacing:2px;color:#ff4f8b;}.rs-leut i.ist-minus{color:#8a8aa8;}
.rs-leut small{grid-column:1/-1;font-size:14px;opacity:.75;}
.rs-kraft{letter-spacing:1px;font-size:14px;}
.rs-seite h4{margin:10px 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.7;}
.rs-hin{display:flex;flex-direction:column;align-items:flex-start;width:100%;min-height:52px;margin:0 0 6px;padding:8px 14px;border-radius:12px;border:1px solid rgba(127,127,127,.35);background:rgba(127,127,160,.12);font:inherit;color:inherit;cursor:pointer;text-align:left;}
.rs-hin b{font-size:16px;}.rs-hin small{font-size:13px;opacity:.7;}
.rs-marke{position:absolute;z-index:6;transform:translate(-50%,-100%);pointer-events:none;font-size:15px;font-weight:800;color:#fff;padding:5px 11px;border-radius:99px;background:linear-gradient(180deg,#ff8a5c,#ff5a7a);box-shadow:0 6px 16px -6px #ff5a7a;white-space:nowrap;animation:rs-wink 1.6s ease-in-out infinite;}
.rs-marke.ist-ort{background:rgba(16,14,34,.72);box-shadow:none;animation:none;font-weight:700;font-size:14px;}
.rs-marke small{opacity:.8;font-weight:600;margin-left:6px;}
.rs-hilfe p{font-size:17px;margin:0 0 10px;}
@media (max-width:560px){.rs-leiste{gap:7px;font-size:14px;padding-left:10px}.rs-jz{display:none}.rs-karte{flex-basis:100%;max-width:none}}
`;
