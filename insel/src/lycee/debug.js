// Annexe Junglinster – Testwerkzeuge, nur mit ?debug in der Adresse sichtbar (Etappe 0, „nächstes Niveau“).
//   · Bilder pro Sekunde (Mittel über 1 s, dazu der schlechteste Wert der letzten 10 s)
//   · Kapitel-/Schritt-Sprung (Liste aller Schritte der Geschichte)
//   · Dialog-Autoplay: klickt Gespräche, Auswahlen und Karten automatisch weiter (Auswahl: zufällig oder immer die erste)
//   · Durchspielen: erledigt zusätzlich den aktuellen Auftrag (zur Person/zum Ort springen) – so läuft ein Kapitel bis zum Ende
// Nichts davon wird gespeichert oder verschickt.

export function debugWerkzeuge() {
  const L = () => window.LYCEE;
  const box = document.createElement('div');
  box.className = 'ly-debug';
  box.innerHTML = '<b>DEBUG</b> <span data-d="fps">– fps</span>' +
    '<select data-d="schritt"><option value="">Schritt wählen …</option></select>' +
    '<label><input type="checkbox" data-d="auto"> Dialog-Autoplay</label>' +
    '<label><input type="checkbox" data-d="lauf"> Durchspielen</label>' +
    '<select data-d="wahl"><option value="zufall">Antwort: zufällig</option><option value="0">Antwort: immer 1.</option><option value="letzte">Antwort: immer letzte</option></select>' +
    '<span data-d="info"></span>';
  document.body.appendChild(box);
  const $ = (k) => box.querySelector('[data-d="' + k + '"]');
  const st = document.createElement('style');
  st.textContent = '.ly-debug{position:fixed;left:8px;bottom:8px;z-index:99999;display:flex;flex-wrap:wrap;gap:6px;align-items:center;max-width:min(96vw,620px);padding:6px 8px;border-radius:10px;background:rgba(20,24,32,.82);color:#e8eef6;font:12px/1.3 system-ui,sans-serif}.ly-debug select,.ly-debug input{font:inherit}.ly-debug select{max-width:210px}.ly-debug b{color:#ffd166}';
  document.head.appendChild(st);

  // Bilder pro Sekunde
  let n = 0, t0 = performance.now(), letzte = [];
  const fps = () => {
    n++; const t = performance.now();
    if (t - t0 >= 1000) { const f = Math.round((n * 1000) / (t - t0)); letzte.push(f); if (letzte.length > 10) letzte.shift(); $('fps').textContent = f + ' fps (min ' + Math.min(...letzte) + ')'; n = 0; t0 = t; }
    requestAnimationFrame(fps);
  };
  requestAnimationFrame(fps);

  // Schritt-Liste füllen, sobald das Spiel da ist
  const fuelle = () => {
    const S = L() && L().daten && L().daten.SCHRITTE; if (!S) return setTimeout(fuelle, 500);
    $('schritt').insertAdjacentHTML('beforeend', S.map((s, i) => '<option value="' + i + '">K' + (s.kap || 1) + ' · ' + (s.tag ? s.tag + ' · ' : '') + s.titel + '</option>').join(''));
  };
  fuelle();
  $('schritt').onchange = async (e) => { if (e.target.value === '' || !L()) return; await L().springe(+e.target.value); e.target.value = ''; };

  // Autoplay: Taste E simulieren, Auswahl klicken, Karten weiterschalten
  const taste = (code) => { const ev = { code, key: code === 'KeyE' ? 'e' : code.replace('Digit', ''), bubbles: true, cancelable: true }; document.dispatchEvent(new KeyboardEvent('keydown', ev)); setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', ev)), 40); };   // bubbelt bis window };
  const klick = (el) => { if (el) { el.click(); return true; } return false; };
  const sichtbar = (sel) => { const e = document.querySelector(sel); return e && e.offsetParent !== null ? e : null; };
  const waehle = (knoepfe) => { const v = $('wahl').value; return v === 'zufall' ? knoepfe[Math.floor(Math.random() * knoepfe.length)] : v === 'letzte' ? knoepfe[knoepfe.length - 1] : knoepfe[0]; };
  let schritte = 0;
  const gefragt = { schritt: '', ids: [] };
  let pause = 0;
  const tick = () => {
    const l = L();
    if (!l || (!$('auto').checked && !$('lauf').checked)) return;
    if (document.querySelector('.ly-wurf')) { taste('Space'); return; }   // Basketball am Korb: einfach werfen
    const eb = document.querySelector('.ly-ebene:not([hidden])');
    if (eb) {
      // Bohnen-Wette: erst alle fünf Bohnen legen (der Knopf kommt erst danach)
      const becher = [...document.querySelectorAll('.ly-ebene .sz-becher [data-i]:not([disabled])')];
      if (becher.length && !sichtbar('.ly-ebene [data-a="w"]')) { klick(becher[Math.floor(Math.random() * becher.length)]); return; }
      // Karten: erst „Weiter/Fertig/Verstanden“, sonst eine Auswahl, sonst Taste E
      const weiter = sichtbar('.ly-ebene [data-a="w"]') || sichtbar('.ly-ebene [data-a="ok"]') || sichtbar('.ly-ebene [data-a="weiter"]') || sichtbar('.ly-ebene [data-a="sagen"]') || sichtbar('.ly-ebene [data-a="weg"]');
      if (klick(weiter)) return;
      const opt = [...document.querySelectorAll('.ly-ebene .ly-d-optionen button:not([disabled]), .ly-ebene [data-j]:not([disabled]), .ly-ebene [data-k]:not([disabled]), .ly-ebene .ly-skala [data-s]')].filter((b) => b.offsetParent !== null);
      if (opt.length) { klick(waehle(opt)); return; }
      taste('KeyE'); return;
    }
    const d = document.querySelector('.ly-dialog:not([hidden])');
    if (d) {
      const opt = [...d.querySelectorAll('.ly-d-optionen button')];
      if (opt.length) klick(waehle(opt)); else taste('KeyE');
      return;
    }
    if ($('lauf').checked && l.probe) l.mutTempo = 30;   // Mutprobe (Kapitel 6) im Zeitraffer
    if (!$('lauf').checked || l.imGespraech || performance.now() < pause) return;
    pause = performance.now() + 1600;   // nach einer Aktion kurz warten, bis das Gespräch startet
    // Durchspielen: den aktuellen Auftrag erledigen
    const s = l.daten.SCHRITTE.find((x) => x.id === l.schritt); if (!s || !s.fertig) return;
    const f = s.fertig;
    if (f.reden && l.leute[f.reden] && l.leute[f.reden].f.group.visible) { const p = l.leute[f.reden].pos; l.teleport({ x: p.x + 0.9, z: p.z + 0.3 }); setTimeout(() => { if (!l.imGespraech) l.rede(f.reden); }, 300); }
    else if (f.ort && l.welt.orte[f.ort]) l.teleport(l.welt.orte[f.ort]);
    else if (f.eins || f.bingo) {
      // nacheinander alle sichtbaren Personen ansprechen (Bingo: bis die Karte voll ist)
      if (gefragt.schritt !== l.schritt) { gefragt.schritt = l.schritt; gefragt.ids = []; }
      const kandidaten = (f.eins || []).concat(Object.keys(l.leute).filter((x) => l.leute[x].f.group.visible && !(l.leute[x].def && l.leute[x].def.erwachsen)));
      const id = kandidaten.find((x) => l.leute[x] && l.leute[x].f.group.visible && !gefragt.ids.includes(x)) || (gefragt.ids = [], kandidaten[0]);
      if (id) { gefragt.ids.push(id); const p = l.leute[id].pos; l.teleport({ x: p.x + 0.9, z: p.z + 0.3 }); setTimeout(() => { if (!l.imGespraech) l.rede(id); }, 300); }
    }
    $('info').textContent = 'Schritt: ' + l.schritt + ' (' + (++schritte) + ')';
  };
  setInterval(tick, 260);
}
